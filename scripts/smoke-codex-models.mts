import { readFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { codexCoveredUpstreamIds } from '../packages/importers/src/codex-metadata'

/**
 * L3 upstream smoke: send one minimal /v1/responses request for every model
 * that is allowed into the Codex catalog. This needs a running AI Bobby gateway
 * and real provider access; it is intentionally NOT part of CI.
 */
async function main(): Promise<void> {
  const port = process.env['AI_BOBBY_PORT'] ?? '46890'
  const base = process.env['AI_BOBBY_URL'] ?? `http://127.0.0.1:${port}`
  const key =
    process.env['AI_BOBBY_API_KEY'] ??
    (await readFile(join(homedir(), 'Library/Application Support/AI Bobby/api-key'), 'utf8').catch(() => '')).trim()
  if (key === '') throw new Error('No API key: set AI_BOBBY_API_KEY or start AI Bobby once')

  const headers = { authorization: `Bearer ${key}`, 'content-type': 'application/json' }
  const catalog = (await (await fetch(`${base}/v1/models?all=1`, { headers })).json()) as {
    data?: Array<{ id: string }>
  }
  const all = (catalog.data ?? []).map(model => model.id)
  const covered = codexCoveredUpstreamIds()
  let failures = 0

  for (const upstream of covered) {
    const ids = all.filter(id => id.endsWith(`/${upstream}`))
    if (ids.length === 0) {
      console.log(`SKIP ${upstream}: not present in the gateway catalog`)
      continue
    }
    for (const id of ids) {
      const started = Date.now()
      try {
        const response = await fetch(`${base}/v1/responses`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ model: id, input: 'reply with exactly: OK', max_output_tokens: 16 }),
          signal: AbortSignal.timeout(30_000),
        })
        if (!response.ok) throw new Error(`${response.status} ${(await response.text()).slice(0, 160)}`)
        const body = (await response.json()) as { output?: unknown[] }
        if (!Array.isArray(body.output)) throw new Error('missing output')
        console.log(`PASS ${id} (${Date.now() - started}ms)`)
      } catch (error) {
        failures += 1
        console.log(`FAIL ${id}: ${error instanceof Error ? error.message : String(error)}`)
      }
    }
  }
  if (failures > 0) {
    console.log(`\n${failures} model(s) failed the L3 smoke; this is a provider/key issue, not proof of bad metadata.`)
    process.exitCode = 1
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
