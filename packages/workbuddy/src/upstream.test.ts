import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { afterEach, describe, expect, it } from 'vitest'
import { parseUpstreamSse } from './provider'
import { WorkBuddyClient } from './upstream'
import { WORKBUDDY_VARIANTS, type WorkBuddyVariant } from './variants'
import type { WorkBuddyAccount } from './accounts'

const servers: Array<{ close: () => void }> = []
afterEach(() => {
  for (const server of servers.splice(0)) server.close()
})

function account(): WorkBuddyAccount {
  return {
    uid: 'u1',
    nickname: 'Alice',
    realm: 'cn',
    domain: 'local',
    accessToken: 'token-1',
    refreshToken: 'refresh-1',
    expiresAtMs: Date.now() + 3_600_000,
    enabled: true,
  }
}

async function mockUpstream(): Promise<{ variant: WorkBuddyVariant; seen: Array<{ url: string; headers: IncomingMessage['headers']; body: string }> }> {
  const seen: Array<{ url: string; headers: IncomingMessage['headers']; body: string }> = []
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    let body = ''
    req.on('data', chunk => { body += String(chunk) })
    req.on('end', () => {
      seen.push({ url: req.url ?? '', headers: req.headers, body })
      if (req.url?.startsWith('/v3/config')) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          code: 0,
          data: {
            models: [{ id: 'hy3', name: 'Hy3', maxInputTokens: 192000, maxOutputTokens: 64000, supportsImages: true, supportsReasoning: true, credits: 'x0.00' }],
            agents: [{ name: 'cli', models: ['hy3'] }],
          },
        }))
        return
      }
      if (req.url?.startsWith('/v2/chat/completions')) {
        res.writeHead(200, { 'Content-Type': 'text/event-stream' })
        res.write('data: {"choices":[{"delta":{"content":"hello"}}]}\n\n')
        res.write('data: {"choices":[{"delta":{},"finish_reason":"stop"}]}\n\n')
        res.end('data: [DONE]\n\n')
        return
      }
      if (req.url?.startsWith('/v2/billing/meter/get-user-resource')) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          code: 0,
          data: {
            Response: {
              Data: {
                Accounts: [
                  { PackageName: 'Pack A', CycleCapacitySize: 100, CycleCapacityRemain: 40, CycleCapacityUsed: 60, CapacityRemain: 0, CycleEndTime: '2026-11-01 00:00:00' },
                  { PackageName: 'Pack B', CycleCapacitySize: 0, CycleCapacityRemain: 0, CycleCapacityUsed: 0, CapacityRemain: 25 },
                  { PackageName: 'Used up', CycleCapacitySize: 50, CycleCapacityRemain: 0, CycleCapacityUsed: 50, CapacityRemain: 7 },
                ],
              },
            },
          },
        }))
        return
      }
      if (req.url?.startsWith('/v2/billing/meter/get-enterprise-user-usage')) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ code: 0, data: { limitNum: 500, credit: 120 } }))
        return
      }
      res.writeHead(404).end()
    })
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  servers.push(server)
  const address = server.address()
  const port = typeof address === 'object' && address !== null ? address.port : 0
  const base = `http://127.0.0.1:${port}`
  return { variant: { ...WORKBUDDY_VARIANTS[0]!, base, billingBase: base, origin: base }, seen }
}

describe('WorkBuddy HTTP client', () => {
  it('fetches the catalog and streams chat with real HTTP', async () => {
    const { variant, seen } = await mockUpstream()
    const client = new WorkBuddyClient(variant)
    const models = await client.fetchCatalog(account())
    expect(models.map(model => model.id)).toEqual(['hy3'])
    expect(seen[0]?.headers.authorization).toBe('Bearer token-1')
    expect(seen[0]?.headers.origin).toBe(variant.origin)

    const response = await client.chatStream(account(), {
      model: 'hy3',
      messages: [{ role: 'user', content: 'hi' }],
      stream: true,
    }, new AbortController().signal)
    const events = []
    for await (const event of parseUpstreamSse(response, 'cmpl_test')) events.push(event)
    expect(events).toEqual(expect.arrayContaining([
      { type: 'text', delta: 'hello' },
      { type: 'finish', reason: 'stop' },
    ]))
    const chat = seen.find(item => item.url.startsWith('/v2/chat/completions'))
    expect(chat?.headers.authorization).toBe('Bearer token-1')
    expect(JSON.parse(chat?.body ?? '{}')).toMatchObject({ model: 'hy3', stream: true })
  })

  it('reads package credits with a POST and billing headers', async () => {
    const { variant, seen } = await mockUpstream()
    const client = new WorkBuddyClient(variant)
    const credits = await client.billing(account())
    expect(credits.total).toBe(65)
    expect(credits.packages).toHaveLength(3)
    expect(credits.packages[0]).toMatchObject({ name: 'Pack A', remain: 40, size: 100 })
    expect(credits.packages[1]).toMatchObject({ remain: 25 })
    expect(credits.packages[2]).toMatchObject({ remain: 0 })
    const call = seen.find(item => item.url.startsWith('/v2/billing/meter/get-user-resource'))
    expect(call?.headers.authorization).toBe('Bearer token-1')
    expect(call?.headers['x-user-id']).toBe('u1')
    expect(JSON.parse(call?.body ?? '{}')).toMatchObject({ PageNumber: 1, Status: [0, 3] })
    expect(call?.headers.origin).toBeUndefined()
  })

  it('reads the enterprise cycle quota instead of an empty package list', async () => {
    const { variant } = await mockUpstream()
    const client = new WorkBuddyClient(variant)
    const credits = await client.billing({ ...account(), enterpriseId: 'ent-1' })
    expect(credits.total).toBe(380)
    expect(credits.packages[0]).toMatchObject({ name: 'enterprise', remain: 380, size: 500 })
  })
})
