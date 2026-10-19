import { execFile } from 'node:child_process'
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { CODEX_METADATA, codexCatalogEntry } from '../packages/importers/src/codex-metadata'

const run = promisify(execFile)

/**
 * L2 contract check: Codex normalizes the catalog before using it. Assert that
 * every curated entry survives that normalization with the fields the picker
 * and request builder depend on.
 */
async function main(): Promise<void> {
  const dir = await mkdtemp(join(tmpdir(), 'ai-bobby-codex-contract-'))
  const catalogPath = join(dir, 'models.ai-bobby.json')
  const entries = Object.entries(CODEX_METADATA).map(([upstreamId, entry]) =>
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

  const { stdout } = await run('codex', ['debug', 'models', '-c', `model_catalog_json=${JSON.stringify(catalogPath)}`], {
    maxBuffer: 20 * 1024 * 1024,
  })
  const start = stdout.indexOf('{')
  if (start < 0) throw new Error('codex debug models returned no JSON')
  const parsed = JSON.parse(stdout.slice(start)) as { models?: Array<Record<string, unknown>> }
  const bySlug = new Map((parsed.models ?? []).map(model => [String(model.slug), model]))

  for (const [upstreamId, entry] of Object.entries(CODEX_METADATA)) {
    const slug = `wb/${upstreamId}`
    const model = bySlug.get(slug)
    if (model === undefined) throw new Error(`${slug}: missing after Codex normalization`)
    if (model.used_fallback_model_metadata === true) throw new Error(`${slug}: Codex used fallback metadata`)
    if (model.visibility !== 'list') throw new Error(`${slug}: visibility is ${String(model.visibility)}`)
    if (model.supported_in_api !== true) throw new Error(`${slug}: not supported in API`)
    if (typeof model.context_window !== 'number' || model.context_window <= 0) {
      throw new Error(`${slug}: invalid context_window`)
    }
    if (!Array.isArray(model.input_modalities) || !model.input_modalities.includes('text')) {
      throw new Error(`${slug}: missing text input modality`)
    }
    if (entry.verification === 'schema-valid') {
      if (!Array.isArray(model.supported_reasoning_levels) || model.supported_reasoning_levels.length === 0) {
        throw new Error(`${slug}: no reasoning levels survived normalization`)
      }
    }
  }
  console.log(`codex contract OK: ${Object.keys(CODEX_METADATA).length} entries (L2)`)
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
