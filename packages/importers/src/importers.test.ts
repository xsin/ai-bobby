import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { parse as parseToml } from 'smol-toml'
import { parse as parseYaml } from 'yaml'
import { makeModelRef, type ModelDescriptor } from '@ai-bobby/core'
import { ClaudeImporter } from './claude'
import { CodexImporter } from './codex'
import { DshImporter } from './dsh'
import { WorkBuddyImporter } from './workbuddy'
import type { ImportContext } from './types'

let dir: string | undefined

afterEach(async () => {
  if (dir) await rm(dir, { recursive: true, force: true })
  dir = undefined
})

function model(provider: 'opencode' | 'workbuddy' | 'workbuddy-ai', id: string, name: string): ModelDescriptor {
  return {
    ...makeModelRef(provider, id, name),
    groupName: provider === 'workbuddy' ? 'WorkBuddy' : provider === 'workbuddy-ai' ? 'WorkBuddy AI' : 'OpenCode',
    capabilities: { text: true, images: true, tools: true, reasoning: true },
    contextWindow: 200_000,
    maxOutputTokens: 32_000,
    status: 'available',
  }
}

function context(): ImportContext {
  return {
    endpoint: 'http://127.0.0.1:46890',
    apiKey: 'sk-ai-bobby-test',
    models: [
      model('workbuddy', 'hy3', 'Hy3'),
      model('workbuddy-ai', 'glm-5.3', 'GLM-5.3'),
      model('opencode', 'big-pickle', 'Big Pickle'),
    ],
  }
}

describe('WorkBuddy importer', () => {
  it('merges owned entries, excludes the target realm and is idempotent', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-import-'))
    const path = join(dir, '.workbuddy', 'models.json')
    await mkdir(join(dir, '.workbuddy'), { recursive: true })
    await writeFile(path, JSON.stringify([{ id: 'user-model', name: 'User', url: 'https://example.com' }, { id: 'old', name: 'Old', aiBobbyOwner: 'ai-bobby-v1' }], null, 2))
    const importer = new WorkBuddyImporter('workbuddy', dir)
    const selection = { groups: ['workbuddy', 'workbuddy-ai', 'opencode'] as const, modelIds: ['wb/hy3', 'wbi/glm-5.3', 'oc/big-pickle'] }
    const plan = await importer.plan(selection, context())
    expect(plan.changed).toBe(true)
    const applied = await importer.apply(selection, context())
    expect(applied.changed).toBe(true)
    const entries = JSON.parse(await readFile(path, 'utf8')) as Array<Record<string, unknown>>
    expect(entries.some(entry => entry['id'] === 'user-model')).toBe(true)
    expect(entries.some(entry => entry['id'] === 'wb/hy3')).toBe(false)
    expect(entries.some(entry => entry['id'] === 'wbi/glm-5.3')).toBe(true)
    expect(entries.some(entry => entry['aiBobbyOwner'] === 'ai-bobby-v1')).toBe(true)
    expect((await importer.plan(selection, context())).changed).toBe(false)
    await expect(importer.installedModelIds()).resolves.toEqual(
      expect.arrayContaining(['wbi/glm-5.3', 'oc/big-pickle']),
    )
    await expect(importer.installedModelIds()).resolves.not.toContain('wb/hy3')
    await importer.rollback()
    const restored = JSON.parse(await readFile(path, 'utf8')) as Array<Record<string, unknown>>
    expect(restored.some(entry => entry['id'] === 'old')).toBe(true)
  })
})

describe('Codex importer', () => {
  it('writes a marked provider block and preserves other config', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-import-'))
    const path = join(dir, '.codex', 'config.toml')
    await mkdir(join(dir, '.codex'), { recursive: true })
    await writeFile(path, 'model = "gpt-5"\n\n[model_providers.other]\nname = "Other"\n')
    const importer = new CodexImporter(dir)
    const selection = { groups: ['workbuddy'] as const, modelIds: [] }
    const plan = await importer.plan(selection, context())
    expect(plan.diff).toContain('model_providers.ai-bobby')
    await importer.apply(selection, context())
    const text = await readFile(path, 'utf8')
    expect(text).toContain('model = "gpt-5"')
    expect(text).toContain('wire_api = "responses"')
    const parsed = parseToml(text) as Record<string, any>
    expect(parsed.model_providers['ai-bobby'].base_url).toBe('http://127.0.0.1:46890/v1')
    expect(parsed.model_providers.other.name).toBe('Other')
  })

  it('reports the default model when ai-bobby is the default provider', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-import-'))
    const path = join(dir, '.codex', 'config.toml')
    await mkdir(join(dir, '.codex'), { recursive: true })
    await writeFile(path, 'model = "gpt-5"\n')
    const importer = new CodexImporter(dir)
    const selection = {
      groups: ['workbuddy'] as const,
      modelIds: [],
      defaultModelId: 'wb/hy3',
      setAsDefault: true,
    }
    await importer.apply(selection, context())
    await expect(importer.installedModelIds()).resolves.toEqual(['wb/hy3'])
  })
})

describe('Claude Code importer', () => {
  it('merges env and preserves unrelated keys', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-import-'))
    const path = join(dir, '.claude', 'settings.json')
    await mkdir(join(dir, '.claude'), { recursive: true })
    await writeFile(path, JSON.stringify({ theme: 'auto', env: { EXISTING: '1' } }, null, 2))
    const importer = new ClaudeImporter(dir)
    const selection = { groups: ['workbuddy'] as const, modelIds: [], defaultModelId: 'wb/hy3' }
    await importer.apply(selection, context())
    const parsed = JSON.parse(await readFile(path, 'utf8')) as Record<string, any>
    expect(parsed.theme).toBe('auto')
    expect(parsed.env.EXISTING).toBe('1')
    expect(parsed.env.ANTHROPIC_BASE_URL).toBe('http://127.0.0.1:46890')
    expect(parsed.env.ANTHROPIC_MODEL).toBe('wb/hy3')
    await expect(importer.installedModelIds()).resolves.toEqual(['wb/hy3'])
  })
})

describe('DSH importer', () => {
  it('merges ai-bobby into llm-pi-ai providers', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-import-'))
    const path = join(dir, '.dsh', 'profiles', 'desktop', 'cordis.patch.yml')
    await mkdir(join(dir, '.dsh', 'profiles', 'desktop'), { recursive: true })
    await writeFile(path, '- id: llm-pi-ai\n  name: "@deepseek-ai/dsh-llm-pi-ai"\n  config:\n    providers:\n      existing:\n        apiKeyEnv: EXISTING_KEY\n')
    const importer = new DshImporter(dir)
    const selection = { groups: ['workbuddy'] as const, modelIds: [] }
    await importer.apply(selection, context())
    const parsed = parseYaml(await readFile(path, 'utf8')) as Array<Record<string, any>>
    const entry = parsed.find(item => item.id === 'llm-pi-ai')
    if (!entry) throw new Error('llm-pi-ai entry missing')
    expect(entry.config.providers.existing.apiKeyEnv).toBe('EXISTING_KEY')
    expect(entry.config.providers['ai-bobby']).toMatchObject({
      apiKeyEnv: 'AI_BOBBY_API_KEY',
      api: 'openai-completions',
      baseURL: 'http://127.0.0.1:46890/v1',
    })
    expect(entry.config.providers['ai-bobby'].models[0]).toMatchObject({ id: 'wb/hy3', name: 'WB. Hy3' })
    await expect(importer.installedModelIds()).resolves.toEqual(['wb/hy3'])

    const credentials = parseYaml(await readFile(join(dir, '.dsh', '.credentials.yaml'), 'utf8')) as Record<string, any>
    expect(credentials.refs).toMatchObject({ AI_BOBBY_API_KEY: 'sk-ai-bobby-test' })
  })

  it('keeps other credential refs and records intact', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-import-'))
    const path = join(dir, '.dsh', 'profiles', 'desktop', 'cordis.patch.yml')
    await mkdir(join(dir, '.dsh', 'profiles', 'desktop'), { recursive: true })
    await writeFile(path, '- id: llm-pi-ai\n  name: "@deepseek-ai/dsh-llm-pi-ai"\n  config:\n    providers: {}\n')
    await writeFile(
      join(dir, '.dsh', '.credentials.yaml'),
      'version: 1\nrecords:\n  client-connection/browser-session:\n    kind: grant\n    payload:\n      secret: keep-me\nrefs:\n  OTHER_KEY: other-secret\n',
    )
    const importer = new DshImporter(dir)
    await importer.apply({ groups: ['workbuddy'] as const, modelIds: [] }, context())
    const credentials = parseYaml(await readFile(join(dir, '.dsh', '.credentials.yaml'), 'utf8')) as Record<string, any>
    expect(credentials.version).toBe(1)
    expect(credentials.records['client-connection/browser-session'].payload.secret).toBe('keep-me')
    expect(credentials.refs).toMatchObject({ OTHER_KEY: 'other-secret', AI_BOBBY_API_KEY: 'sk-ai-bobby-test' })
  })
})
