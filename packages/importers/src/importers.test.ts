import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
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
import { VSCodeImporter } from './vscode'
import { normalizeRestoredCodexModel } from './codex'
import { backup } from './common'
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

describe('backup retention', () => {
  it('keeps one baseline plus the newest five rolling backups', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-backup-'))
    const path = join(dir, 'config.json')
    await writeFile(path, 'v0')
    for (let i = 1; i <= 7; i += 1) {
      await backup(path)
      await writeFile(path, `v${i}`)
      await new Promise(resolve => setTimeout(resolve, 5))
    }
    const files = (await readdir(dir)).filter(name => name.includes('.ai-bobby-') && name.endsWith('.bak'))
    expect(files).toHaveLength(6)
    const baseline = await readFile(join(dir, 'config.json.ai-bobby-baseline.bak'), 'utf8')
    expect(baseline).toBe('v0')
    const rolling = files.filter(name => !name.endsWith('.ai-bobby-baseline.bak')).sort()
    expect(rolling).toHaveLength(5)
    const oldest = await readFile(join(dir, rolling[0]!), 'utf8')
    expect(oldest).toBe('v2')
  })

  it('seeds the baseline from the oldest existing backup on upgrade', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-baseline-'))
    const path = join(dir, 'config.json')
    await writeFile(join(dir, 'config.json.ai-bobby-20261001-0000.bak'), 'v1')
    await writeFile(join(dir, 'config.json.ai-bobby-20261002-0000.bak'), 'v2')
    await writeFile(path, 'v3')
    await backup(path)
    const baseline = await readFile(join(dir, 'config.json.ai-bobby-baseline.bak'), 'utf8')
    expect(baseline).toBe('v1')
  })

  it('writes a VS Code Custom Endpoint provider without touching other providers', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-vscode-'))
    const config = join(dir, 'Library/Application Support/Code/User/chatLanguageModels.json')
    await mkdir(join(dir, 'Library/Application Support/Code/User'), { recursive: true })
    await writeFile(config, JSON.stringify([{ name: 'Other', vendor: 'customendpoint', models: [] }], null, 2))
    const importer = new VSCodeImporter(dir)
    const context: ImportContext = {
      models: [model('opencode', 'space-bunny-free', 'Space Bunny')],
      apiKey: 'sk-test',
      endpoint: 'http://127.0.0.1:46890/v1',
    }
    const plan = await importer.plan({ groups: ['opencode'], modelIds: ['oc/space-bunny-free'] }, context)
    expect(plan.changed).toBe(true)
    await importer.apply({ groups: ['opencode'], modelIds: ['oc/space-bunny-free'] }, context)
    const saved = JSON.parse(await readFile(config, 'utf8')) as Array<{ name: string; vendor: string; apiKey?: string; models?: Array<{ id?: string; url?: string }> }>
    expect(saved).toHaveLength(2)
    expect(saved[0]?.name).toBe('Other')
    const aiBobby = saved.find(entry => entry.name === 'AI Bobby')
    expect(aiBobby?.apiKey).toBe('sk-test')
    expect(aiBobby?.models).toHaveLength(1)
    expect(aiBobby?.models?.[0]?.id).toBe('oc/space-bunny-free')
    expect(aiBobby?.models?.[0]?.url).toBe('http://127.0.0.1:46890/v1/chat/completions')
  })

  it('generates an AI Bobby Codex catalog with prefixed slugs', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-codex-catalog-'))
    await mkdir(join(dir, '.codex'), { recursive: true })
    await writeFile(join(dir, '.codex', 'models.json'), JSON.stringify({ models: [{ slug: 'deepseek-v4.1-flash', display_name: 'DeepSeek' }] }))
    await writeFile(join(dir, '.codex', 'config.toml'), 'model = "deepseek-v4.1-flash"\nmodel_provider = "local"\n')
    const importer = new CodexImporter(dir)
    const context: ImportContext = {
      models: [
        model('workbuddy', 'deepseek-v4.1-flash', 'DeepSeek'),
        model('opencode', 'space-bunny-free', 'Space Bunny'),
      ],
      apiKey: 'sk-test',
      endpoint: 'http://127.0.0.1:46890/v1',
    }
    await importer.apply(
      { groups: ['workbuddy', 'opencode'], modelIds: ['wb/deepseek-v4.1-flash', 'oc/space-bunny-free'], defaultModelId: 'wb/deepseek-v4.1-flash', setAsDefault: true },
      context,
    )
    const catalog = JSON.parse(await readFile(join(dir, '.codex', 'models.ai-bobby.json'), 'utf8')) as { models: Array<{ slug: string }> }
    expect(catalog.models).toHaveLength(1)
    expect(catalog.models[0]?.slug).toBe('wb/deepseek-v4.1-flash')
    const config = await readFile(join(dir, '.codex', 'config.toml'), 'utf8')
    expect(config).toContain('models.ai-bobby.json')
    expect(config).toContain('model = "wb/deepseek-v4.1-flash"')
  })

  it('normalizes a raw model id when restoring a Codex backup', () => {
    const restored = normalizeRestoredCodexModel('model = "deepseek-v4.1-flash"\nmodel_provider = "ai-bobby"\n', ['wb/deepseek-v4.1-flash'])
    expect(restored.text).toContain('model = "wb/deepseek-v4.1-flash"')
    expect(restored.warnings).toHaveLength(1)
  })
})

describe('developer namespace', () => {
  it('keeps production WorkBuddy entries while writing dev entries', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-dev-wb-'))
    await mkdir(join(dir, '.workbuddy'), { recursive: true })
    const path = join(dir, '.workbuddy', 'models.json')
    await writeFile(path, JSON.stringify([{ id: 'wb/prod', name: 'Prod', aiBobbyOwner: 'ai-bobby-v1' }]))
    const importer = new WorkBuddyImporter('workbuddy', dir, 'dev')
    const devModel = { ...model('opencode', 'big-pickle', 'Big Pickle'), id: 'dev-oc/big-pickle', displayName: 'Dev.Big Pickle' } as ModelDescriptor
    const devContext: ImportContext = { ...context(), models: [devModel] }
    await importer.apply({ groups: ['opencode'], modelIds: ['dev-oc/big-pickle'] }, devContext)
    const entries = JSON.parse(await readFile(path, 'utf8')) as Array<Record<string, unknown>>
    expect(entries.some(entry => entry['id'] === 'wb/prod' && entry['aiBobbyOwner'] === 'ai-bobby-v1')).toBe(true)
    expect(entries.some(entry => entry['id'] === 'dev-oc/big-pickle' && entry['aiBobbyOwner'] === 'ai-bobby-dev-v1')).toBe(true)
  })

  it('adds a dev Codex provider without replacing production', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-dev-codex-'))
    await mkdir(join(dir, '.codex'), { recursive: true })
    const path = join(dir, '.codex', 'config.toml')
    await writeFile(path, '# >>> ai-bobby:start\n[model_providers.ai-bobby]\nname = "AI Bobby"\n# <<< ai-bobby:end\n')
    await writeFile(join(dir, '.codex', 'models.json'), JSON.stringify({ models: [] }))
    const importer = new CodexImporter(dir, 'dev')
    const devModel = { ...model('workbuddy', 'hy3', 'Hy3'), id: 'dev-wb/hy3', displayName: 'Dev.Hy3' } as ModelDescriptor
    const devContext: ImportContext = { ...context(), models: [devModel] }
    await importer.apply({ groups: ['workbuddy'], modelIds: ['dev-wb/hy3'], defaultModelId: 'dev-wb/hy3', setAsDefault: true }, devContext)
    const config = await readFile(path, 'utf8')
    expect(config).toContain('[model_providers.ai-bobby]')
    expect(config).toContain('[model_providers.ai-bobby-dev]')
    expect(config).toContain('model_provider = "ai-bobby-dev"')
  })
})
