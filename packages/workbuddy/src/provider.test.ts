import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { AccountStore, type WorkBuddyAccount } from './accounts'
import { WorkBuddyProvider } from './provider'
import { UpstreamError } from './upstream'
import { WORKBUDDY_VARIANTS } from './variants'
import type { CanonicalRequest } from '@ai-bobby/core'

const CN = WORKBUDDY_VARIANTS[0]!
let dir: string | undefined

afterEach(async () => {
  if (dir) await rm(dir, { recursive: true, force: true })
  dir = undefined
})

function account(uid: string, credits?: WorkBuddyAccount['credits']): WorkBuddyAccount {
  return {
    uid,
    nickname: uid,
    realm: 'cn',
    domain: 'copilot.tencent.com',
    accessToken: 'access',
    refreshToken: 'refresh',
    expiresAtMs: Date.now() + 3_600_000,
    enabled: true,
    ...(credits === undefined ? {} : { credits }),
  }
}

function request(): CanonicalRequest {
  return {
    model: { provider: 'workbuddy', upstreamId: 'hy3', id: 'wb/hy3', displayName: 'WB. Hy3' },
    messages: [{ role: 'user', content: [{ type: 'text', text: 'hi' }] }],
    tools: [],
    toolChoice: 'auto',
    parallelToolCalls: true,
    stream: true,
  }
}

function sseResponse(): Response {
  const chunks = [
    'data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n',
    'data: {"choices":[{"delta":{},"finish_reason":"stop"}]}\n\n',
    'data: [DONE]\n\n',
  ]
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk))
        controller.close()
      },
    }),
  )
}

class FakeClient {
  calls: string[] = []
  constructor(private readonly failFirstWith?: Error) {}

  async fetchCatalog(): Promise<Array<{ id: string; name: string; contextWindow: number; maxTokens: number; supportsImages: boolean }>> {
    return [{ id: 'hy3', name: 'Hy3', contextWindow: 192_000, maxTokens: 64_000, supportsImages: true }]
  }

  async chatStream(account: WorkBuddyAccount): Promise<Response> {
    this.calls.push(account.uid)
    if (this.failFirstWith && this.calls.length === 1) throw this.failFirstWith
    return sseResponse()
  }

  async refresh(): Promise<{ accessToken: string }> {
    return { accessToken: 'new-access' }
  }

  async billing(): Promise<{ total: number; packages: never[]; fetchedAtMs: number }> {
    return { total: 0, packages: [], fetchedAtMs: Date.now() }
  }
}

describe('WorkBuddyProvider', () => {
  it('lists merged models and streams chat', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-wb-'))
    const store = new AccountStore(join(dir, 'accounts.json'))
    await store.upsert(account('u1'))
    const client = new FakeClient()
    const provider = new WorkBuddyProvider({ variant: CN, store, client: client as never })
    const models = await provider.refreshModels()
    expect(models.map(model => model.id)).toEqual(['wb/hy3'])
    const events = []
    for await (const event of provider.chat(request(), new AbortController().signal)) events.push(event)
    expect(events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'start' }),
        { type: 'text', delta: 'Hello' },
        { type: 'finish', reason: 'stop' },
      ]),
    )
    const stored = await store.list('cn')
    expect(stored[0]?.lastUsedAtMs).toBeTypeOf('number')
  })

  it('skips an account whose known credits are exhausted', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-wb-'))
    const store = new AccountStore(join(dir, 'accounts.json'))
    await store.upsert(account('u1', { total: 0, packages: [{ name: 'pro', remain: 0, size: 100 }], fetchedAtMs: Date.now() }))
    await store.upsert(account('u2', { total: 100, packages: [{ name: 'pro', remain: 100, size: 100 }], fetchedAtMs: Date.now() }))
    const client = new FakeClient()
    const provider = new WorkBuddyProvider({ variant: CN, store, client: client as never })
    await provider.refreshModels()
    const events = []
    for await (const event of provider.chat(request(), new AbortController().signal)) events.push(event)
    expect(events).toEqual(expect.arrayContaining([{ type: 'text', delta: 'Hello' }]))
    expect(client.calls).toEqual(['u2'])
  })

  it('fails over to another account on 402 / credit error', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-wb-'))
    const store = new AccountStore(join(dir, 'accounts.json'))
    await store.upsert(account('u1'))
    await store.upsert(account('u2'))
    const client = new FakeClient(new UpstreamError('积分不足', 402, 'credit'))
    const provider = new WorkBuddyProvider({ variant: CN, store, client: client as never })
    await provider.refreshModels()
    const events = []
    for await (const event of provider.chat(request(), new AbortController().signal)) events.push(event)
    expect(events).toEqual(expect.arrayContaining([{ type: 'text', delta: 'Hello' }]))
    expect(client.calls.length).toBe(2)
  })

  it('fails over to another account on 429', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-wb-'))
    const store = new AccountStore(join(dir, 'accounts.json'))
    await store.upsert(account('u1'))
    await store.upsert(account('u2'))
    const client = new FakeClient(new UpstreamError('rate limited', 429, 'rate_limit', 1000))
    const provider = new WorkBuddyProvider({ variant: CN, store, client: client as never })
    await provider.refreshModels()
    const events = []
    for await (const event of provider.chat(request(), new AbortController().signal)) events.push(event)
    expect(events).toEqual(expect.arrayContaining([{ type: 'text', delta: 'Hello' }]))
    expect(client.calls.length).toBe(2)
  })

  it('returns no models without accounts', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-wb-'))
    const store = new AccountStore(join(dir, 'accounts.json'))
    const provider = new WorkBuddyProvider({ variant: CN, store, client: new FakeClient() as never })
    expect(await provider.refreshModels()).toEqual([])
    await expect(
      (async () => {
        for await (const _event of provider.chat(request(), new AbortController().signal)) {
          // drain
        }
      })(),
    ).rejects.toThrow('没有可用账号')
  })
})
