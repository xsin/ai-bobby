import { execFile } from 'node:child_process'
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import http from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { CODEX_METADATA, codexCatalogEntry } from '../packages/importers/src/codex-metadata'

const run = promisify(execFile)

/**
 * L2 request-shape check: run the real Codex CLI against a local mock Responses
 * endpoint and inspect the outgoing body. This verifies that the catalog drives
 * model, reasoning, tools and streaming, rather than only checking JSON shape.
 */
async function main(): Promise<void> {
  let captured: Record<string, unknown> | undefined
  const server = http.createServer((req, res) => {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', () => {
      try { captured = JSON.parse(body) as Record<string, unknown> } catch { captured = undefined }
      res.writeHead(200, { 'content-type': 'text/event-stream' })
      const send = (type: string, data: Record<string, unknown>) =>
        res.write(`event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`)
      send('response.created', { response: { id: 'resp_1', object: 'response', created_at: Date.now(), status: 'in_progress', model: 'mock' } })
      send('response.output_text.delta', { item_id: 'msg_1', output_index: 0, content_index: 0, delta: 'OK' })
      send('response.completed', { response: { id: 'resp_1', object: 'response', created_at: Date.now(), status: 'completed', model: 'mock', output: [] } })
      res.end()
    })
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', () => resolve()))
  const address = server.address()
  if (address === null || typeof address === 'string') throw new Error('no mock port')

  try {
    for (const [upstreamId, entry] of Object.entries(CODEX_METADATA)) {
      captured = undefined
      const dir = await mkdtemp(join(tmpdir(), 'ai-bobby-codex-request-'))
      await mkdir(join(dir, '.codex'), { recursive: true })
      const catalogPath = join(dir, '.codex', 'models.ai-bobby.json')
      const slug = `wb/${upstreamId}`
      const catalog = {
        models: [codexCatalogEntry({
          id: slug,
          name: upstreamId,
          displayName: `WB. ${upstreamId}`,
          upstreamId,
          provider: 'workbuddy',
          groupName: 'WorkBuddy',
          contextWindow: 1_048_576,
          maxOutputTokens: 65_536,
          capabilities: { reasoning: true, images: true, tools: true },
        } as never)],
      }
      await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8')
      await writeFile(join(dir, '.codex', 'config.toml'), [
        `model = ${JSON.stringify(slug)}`,
        'model_provider = "mock"',
        `model_catalog_json = ${JSON.stringify(catalogPath)}`,
        'model_reasoning_effort = "high"',
        '',
        '[model_providers.mock]',
        'name = "Mock"',
        `base_url = "http://127.0.0.1:${address.port}/v1"`,
        'wire_api = "responses"',
        'experimental_bearer_token = "sk-test"',
        '',
      ].join('\n'), 'utf8')

      try {
        await run('/bin/sh', ['-c', 'codex exec --skip-git-repo-check "reply exactly: OK" </dev/null'], {
          env: { ...process.env, HOME: dir, CODEX_HOME: join(dir, '.codex') },
          timeout: 60_000,
          stdio: ['ignore', 'pipe', 'pipe'],
        })
      } catch (error) {
        const failure = error as { stdout?: string; stderr?: string; message?: string }
        console.error(`${slug}: codex exited early: ${failure.message ?? ''}`)
        if (failure.stderr) console.error(failure.stderr.slice(-1200))
        if (failure.stdout) console.error(failure.stdout.slice(-600))
        // The request shape is still checked even if Codex exits non-zero
        // because the mock response is intentionally minimal.
      }

      if (captured === undefined) throw new Error(`${slug}: Codex sent no request`)
      const body = captured
      if (body['model'] !== slug) throw new Error(`${slug}: requested model ${String(body['model'])}`)
      if (body['stream'] !== true) throw new Error(`${slug}: expected streaming request`)
      if (!Array.isArray(body['input']) || body['input'].length === 0) throw new Error(`${slug}: empty input`)
      if (!Array.isArray(body['tools']) || body['tools'].length === 0) throw new Error(`${slug}: no tools sent`)
      const reasoning = body['reasoning'] as { effort?: string } | undefined
      if (reasoning?.effort === undefined) throw new Error(`${slug}: missing reasoning.effort`)
      if (entry.verification !== 'behavior-reviewed' && body['parallel_tool_calls'] !== true) {
        throw new Error(`${slug}: parallel_tool_calls not enabled`)
      }
      console.log(`PASS ${slug}: model/stream/tools/reasoning (${reasoning.effort})`)
    }
  } finally {
    server.close()
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
