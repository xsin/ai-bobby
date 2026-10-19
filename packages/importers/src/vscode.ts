import { homedir } from 'node:os'
import { join } from 'node:path'
import type { ImportContext, ImportPlan, ImportSelection, Importer } from './types'
import { atomicWrite, backup, exists, latestBackup, readText } from './common'

const PROVIDER_NAME = 'AI Bobby'

function codePaths(home: string): string[] {
  return [
    join(home, 'Library/Application Support/Code/User/chatLanguageModels.json'),
    join(home, 'Library/Application Support/Code - Insiders/User/chatLanguageModels.json'),
  ]
}

interface ProviderEntry {
  name?: string
  vendor?: string
  apiKey?: string
  apiType?: string
  url?: string
  models?: unknown[]
  [key: string]: unknown
}

function providerEntry(context: ImportContext): ProviderEntry {
  return {
    name: PROVIDER_NAME,
    vendor: 'customendpoint',
    apiKey: context.apiKey,
    apiType: 'chat-completions',
    url: context.endpoint,
  }
}

function parseProviders(raw: string): ProviderEntry[] {
  if (raw.trim() === '') return []
  const data: unknown = JSON.parse(raw)
  if (!Array.isArray(data)) throw new Error('chatLanguageModels.json 不是数组，已取消写入')
  return data as ProviderEntry[]
}

function mergeProvider(providers: ProviderEntry[], context: ImportContext): ProviderEntry[] {
  const entry = providerEntry(context)
  const index = providers.findIndex(item => item.name === PROVIDER_NAME && item.vendor === 'customendpoint')
  if (index === -1) return [...providers, entry]
  const next = [...providers]
  next[index] = entry
  return next
}

function render(providers: ProviderEntry[]): string {
  return `${JSON.stringify(providers, null, 2)}\n`
}

function buildPlan(path: string, providers: ProviderEntry[], next: ProviderEntry[], changed: boolean, backupPath?: string): ImportPlan {
  const lines = ['# VS Code · Custom Endpoint', `~ ${path}`, changed ? '+ provider "AI Bobby" (customendpoint)' : '= provider "AI Bobby" 已是最新']
  if (changed) {
    lines.push('+ url = http://127.0.0.1:46890/v1')
    lines.push('+ apiType = chat-completions')
    lines.push('+ apiKey 写入后由 VS Code 迁移到钥匙串')
    lines.push('+ 重启 VS Code 后可在模型选择器看到 AI Bobby')
  }
  return {
    target: 'vscode',
    path,
    detected: true,
    changed,
    diff: lines.join('\n'),
    warnings: ['写入后重启 VS Code 生效；Key 会被 VS Code 迁移到系统钥匙串。'],
    requiresRestart: true,
    ...(backupPath === undefined ? {} : { backupPath }),
  }
}

export class VSCodeImporter implements Importer {
  readonly target = 'vscode' as const
  private readonly paths: string[]

  constructor(home: string = homedir()) {
    this.paths = codePaths(home)
  }

  async detect(): Promise<{ path: string; detected: boolean }> {
    for (const path of this.paths) {
      if (await exists(path)) return { path, detected: true }
    }
    return { path: this.paths[0] as string, detected: false }
  }

  async installedModelIds(): Promise<string[]> {
    const { path } = await this.detect()
    const raw = await readText(path)
    if (raw === undefined) return []
    try {
      const provider = parseProviders(raw).find(item => item.name === PROVIDER_NAME && item.vendor === 'customendpoint')
      return provider?.models
        ?.map(model => (model as { id?: unknown }).id)
        .filter((id): id is string => typeof id === 'string') ?? []
    } catch {
      return []
    }
  }

  async plan(selection: ImportSelection, context: ImportContext): Promise<ImportPlan> {
    const { path } = await this.detect()
    const raw = (await readText(path)) ?? '[]\n'
    const providers = parseProviders(raw)
    const next = mergeProvider(providers, context)
    const changed = render(providers) !== render(next)
    return buildPlan(path, providers, next, changed)
  }

  async apply(selection: ImportSelection, context: ImportContext): Promise<ImportPlan> {
    const { path } = await this.detect()
    const raw = (await readText(path)) ?? '[]\n'
    const providers = parseProviders(raw)
    const next = mergeProvider(providers, context)
    const changed = render(providers) !== render(next)
    if (!changed) return buildPlan(path, providers, next, false)
    const backupPath = await backup(path)
    await atomicWrite(path, render(next), 0o600)
    return buildPlan(path, providers, next, true, backupPath)
  }

  async rollback(): Promise<ImportPlan> {
    const { path } = await this.detect()
    const backupPath = await latestBackup(path)
    if (backupPath === undefined) throw new Error('没有可回滚的 VS Code 备份')
    const content = await readText(backupPath)
    if (content === undefined) throw new Error('备份文件不存在')
    await backup(path)
    await atomicWrite(path, content, 0o600)
    return {
      target: 'vscode',
      path,
      detected: true,
      changed: true,
      diff: `已从 ${backupPath} 回滚`,
      warnings: ['重启 VS Code 后生效。'],
      requiresRestart: true,
    }
  }
}
