import { execFile } from 'node:child_process'
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { CODEX_METADATA, codexCatalogEntry } from '../packages/importers/src/codex-metadata'

const run = promisify(execFile)

/**
 * L1 validation for the generated Codex catalog: let Codex itself parse the
 * catalog and dump it back. This catches schema drift and missing fields that
 * a hand-written JSON check would miss.
 */
async function main(): Promise<void> {
  const dir = await mkdtemp(join(tmpdir(), 'ai-bobby-codex-catalog-'))
  const catalogPath = join(dir, 'models.ai-bobby.json')
  const entries = Object.keys(CODEX_METADATA).map(upstreamId =>
    codexCatalogEntry({
      id: `wb/${upstreamId}`,
      name: upstreamId,
      displayName: `WB. ${upstreamId}`,
      upstreamId,
      provider: 'workbuddy',
      groupName: 'WorkBuddy',
      contextWindow: 1_048_576,
      maxOutputTokens: 65_536,
      capabilities: { reasoning: true, images: true, tools: true },
    } as never),
  )
  await writeFile(catalogPath, `${JSON.stringify({ models: entries }, null, 2)}\n`, 'utf8')

  let stdout: string
  try {
    const result = await run('codex', ['debug', 'models', '-c', `model_catalog_json=${JSON.stringify(catalogPath)}`], {
      maxBuffer: 20 * 1024 * 1024,
    })
    stdout = result.stdout
  } catch (error) {
    const err = error as { stdout?: string; stderr?: string; message: string }
    console.error('codex debug models failed:', err.message)
    if (err.stderr) console.error(err.stderr)
    process.exit(1)
  }

  const start = stdout.indexOf('{')
  if (start < 0) throw new Error('codex debug models returned no JSON')
  const parsed = JSON.parse(stdout.slice(start)) as { models?: Array<Record<string, unknown>> }
  const actual = new Set((parsed.models ?? []).map(model => String(model.slug)))
  const expected = entries.map(entry => String(entry.slug))
  const missing = expected.filter(slug => !actual.has(slug))
  if (missing.length > 0) throw new Error(`catalog entries missing after Codex parse: ${missing.join(', ')}`)

  for (const model of parsed.models ?? []) {
    if (model.used_fallback_model_metadata === true) {
      throw new Error(`Codex used fallback metadata for ${String(model.slug)}`)
    }
  }
  console.log(`codex catalog OK: ${expected.length} models (${expected.join(', ')})`)
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
