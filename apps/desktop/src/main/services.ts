import { app, BrowserWindow, shell } from 'electron'
import { chmod, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { join } from 'node:path'
import { appVersion } from './version'
import { SettingsStore, defaultSettings, type AppSettings } from './settings'
import { createProxyFetch } from './proxy'
import { ModelRegistry, createLogger } from '@ai-bobby/core'
import { GatewayService } from '@ai-bobby/gateway'
import { NvidiaProvider } from '@ai-bobby/nvidia'
import { OpenCodeProvider } from '@ai-bobby/opencode'
import {
  AccountStore,
  WORKBUDDY_VARIANTS,
  WorkBuddyClient,
  WorkBuddyProvider,
  pollLogin,
  startLogin,
  variantFor,
} from '@ai-bobby/workbuddy'
import type {
  AccountSnapshot,
  BackupVersion,
  GatewayStatus,
  ImportBackupSnapshot,
  ImportHistoryEntry,
  ImportHistorySnapshot,
  ImportPlanSnapshot,
  ImportSelectionPayload,
  ImportTargetName,
  ModelSnapshot,
} from '../shared/api'
import {
  ClaudeImporter,
  CodexImporter,
  DshImporter,
  WorkBuddyImporter,
  VSCodeImporter,
  atomicWrite,
  backup,
  baselineBackupPath,
  ensureBaseline,
  exists,
  readText,
  type Importer,
} from '@ai-bobby/importers'

const logger = createLogger('info')

export class Services {
  private readonly registry = new ModelRegistry()
  private readonly providers = new Map<'workbuddy' | 'workbuddy-ai', WorkBuddyProvider>()
  private readonly nvidia: NvidiaProvider
  private readonly settingsStore: SettingsStore
  private settings: AppSettings = defaultSettings()
  private readonly adapters = new Map()
  private readonly opencode: OpenCodeProvider
  private readonly store: AccountStore
  private gateway: GatewayService | undefined
  private gatewayState: GatewayStatus['gateway'] = { state: 'starting', port: 46890 }
  private refreshedAtMs = 0
  private refreshTimer: ReturnType<typeof setInterval> | undefined
  private key = ''
  private readonly importers: Record<ImportTargetName, Importer>
  private readonly historyFile: string

  private readonly dataDir: string

  constructor(private readonly mainWindow: () => BrowserWindow | undefined) {
    this.dataDir = process.env.AI_BOBBY_DATA_DIR?.trim() || app.getPath('userData')
    this.historyFile = join(this.dataDir, 'import-history.json')
    this.settingsStore = new SettingsStore(this.dataDir)
    this.nvidia = new NvidiaProvider({ apiKey: '', fetchImpl: createProxyFetch(() => this.settings, 'nvidia') })
    // AccountStore is 0600 for now. safeStorage.isEncryptionAvailable() can
    // block on a locked Keychain during headless startup, so encryption is an
    // explicit future opt-in rather than a startup dependency.
    this.store = AccountStore.inDataDir(this.dataDir)
    this.opencode = new OpenCodeProvider({ dataDir: this.dataDir, log: (message: string) => logger.info(message) })
    this.adapters.set('opencode', this.opencode)
    this.adapters.set('nvidia', this.nvidia)
    this.importers = {
      workbuddy: new WorkBuddyImporter('workbuddy'),
      'workbuddy-ai': new WorkBuddyImporter('workbuddy-ai'),
      codex: new CodexImporter(),
      claude: new ClaudeImporter(),
      dsh: new DshImporter(),
      vscode: new VSCodeImporter(),
    }
    for (const variant of WORKBUDDY_VARIANTS) {
      if (variant.id === 'opencode') continue
      const provider = new WorkBuddyProvider({
        variant,
        store: this.store,
        client: new WorkBuddyClient(variant, createProxyFetch(() => this.settings, variant.id as 'workbuddy' | 'workbuddy-ai')),
      })
      this.providers.set(variant.id as 'workbuddy' | 'workbuddy-ai', provider)
      this.adapters.set(variant.id, provider)
    }
  }

  async start(): Promise<void> {
    this.settings = await this.settingsStore.load()
    this.nvidia.setApiKey(this.settings.nvidiaApiKey)
    this.key = await ensureApiKey(this.dataDir)
    const port = Number(process.env.AI_BOBBY_PORT || 46890)
    const gateway = new GatewayService({
      registry: this.registry,
      adapters: this.adapters,
      apiKey: this.key,
      port: Number.isFinite(port) ? port : 46890,
      version: appVersion(),
      logger,
    })
    try {
      const actual = await gateway.start()
      this.gateway = gateway
      this.gatewayState = { state: 'ready', port: actual }
    } catch (error) {
      this.gatewayState = {
        state: 'error',
        port,
        error: error instanceof Error ? error.message : String(error),
      }
      logger.error('gateway failed to start', { error: this.gatewayState.error })
    }
    void this.ensureBaselines()
    void this.refresh()
    this.refreshTimer = setInterval(() => void this.refresh(), 15 * 60_000)
  }

  /** Seed a baseline for every configured client on first run after upgrade. */
  private async ensureBaselines(): Promise<void> {
    await Promise.all(
      Object.values(this.importers).map(async importer => {
        try {
          const { path, detected } = await importer.detect()
          if (detected) await ensureBaseline(path)
        } catch (error) {
          logger.warn('failed to seed baseline', { error: String(error) })
        }
      }),
    )
  }

  async stop(): Promise<void> {
    if (this.refreshTimer) clearInterval(this.refreshTimer)
    this.refreshTimer = undefined
    await this.opencode.stop().catch(() => undefined)
    await this.gateway?.stop()
    this.gateway = undefined
  }

  async refresh(): Promise<GatewayStatus> {
    await Promise.all([
      (async () => {
        for (const [realm, provider] of this.providers) {
          try {
            const models = await provider.refreshModels()
            this.registry.replace(realm, models)
          } catch (error) {
            logger.warn('workbuddy catalog refresh failed', { provider: realm, error: String(error) })
          }
        }
        await Promise.all([...this.providers.values()].map(provider => provider.refreshCredits().catch(() => undefined)))
      })(),
      (async () => {
        if (process.env.AI_BOBBY_DISABLE_OPENCODE === '1') return
        try {
          const models = await this.opencode.refreshModels()
          this.registry.replace('opencode', models)
        } catch (error) {
          logger.warn('opencode catalog refresh failed', { error: String(error) })
        }
      })(),
      (async () => {
        if (this.settings.nvidiaApiKey === '') return
        try {
          const models = await this.nvidia.refreshModels()
          this.registry.replace('nvidia', models)
        } catch (error) {
          logger.warn('nvidia catalog refresh failed', { error: String(error) })
        }
      })(),
    ])
    this.refreshedAtMs = Date.now()
    return this.snapshot()
  }

  async snapshot(): Promise<GatewayStatus> {
    const accounts = await this.store.load()
    const models: ModelSnapshot[] = this.registry.list({ all: true }).map(model => ({
      id: model.id,
      name: model.displayName,
      provider: model.provider,
      groupName: model.groupName,
      status: model.status,
      capabilities: model.capabilities,
      ...(model.contextWindow === undefined ? {} : { contextWindow: model.contextWindow }),
      ...(model.maxOutputTokens === undefined ? {} : { maxOutputTokens: model.maxOutputTokens }),
      ...(model.accounts === undefined ? {} : { accounts: model.accounts }),
      ...(model.billing === undefined ? {} : { billing: model.billing }),
    }))
    return {
      version: appVersion(),
      gateway: this.gatewayState,
      models,
      accounts: accounts.map(accountSnapshot),
      apiKeyMasked: maskKey(this.key),
      refreshedAtMs: this.refreshedAtMs,
    }
  }

  async getSettings(): Promise<AppSettings> {
    return this.settings
  }

  async setNvidiaKey(apiKey: string): Promise<GatewayStatus> {
    this.settings = { ...this.settings, nvidiaApiKey: apiKey.trim() }
    await this.settingsStore.save(this.settings)
    this.nvidia.setApiKey(this.settings.nvidiaApiKey)
    try {
      if (this.settings.nvidiaApiKey !== '') {
        const models = await this.nvidia.refreshModels()
        this.registry.replace('nvidia', models)
      } else {
        this.registry.remove('nvidia')
      }
    } catch (error) {
      logger.warn('nvidia catalog refresh failed', { error: String(error) })
      throw error
    }
    this.refreshedAtMs = Date.now()
    return this.snapshot()
  }

  async probeNvidia(): Promise<GatewayStatus> {
    await this.nvidia.probeAll(4)
    this.registry.replace('nvidia', this.nvidia.listModels())
    this.refreshedAtMs = Date.now()
    return this.snapshot()
  }

  async setProxy(proxy: AppSettings['proxy']): Promise<AppSettings> {
    this.settings = { ...this.settings, proxy }
    await this.settingsStore.save(this.settings)
    return this.settings
  }

  async setLocale(locale: AppSettings['locale']): Promise<AppSettings> {
    this.settings = { ...this.settings, locale }
    await this.settingsStore.save(this.settings)
    return this.settings
  }

  async login(providerId: 'workbuddy' | 'workbuddy-ai'): Promise<AccountSnapshot> {
    const variant = variantFor(providerId)
    if (variant === undefined) throw new Error('不支持的账号类型')
    const start = await startLogin(variant)
    const partition = `ai-bobby-login-${randomUUID()}`
    const parent = this.mainWindow()
    const window = new BrowserWindow({
      width: 520,
      height: 720,
      parent,
      modal: false,
      show: true,
      title: `登录 ${variant.displayName}`,
      backgroundColor: '#ffffff',
      webPreferences: {
        partition,
        sandbox: true,
        contextIsolation: true,
        nodeIntegration: false,
      },
    })
    try {
      window.webContents.setWindowOpenHandler(({ url }) => {
        if (/^https:\/\//i.test(url)) void shell.openExternal(url)
        return { action: 'deny' }
      })
      window.webContents.on('did-fail-load', () => {
        void shell.openExternal(start.authUrl)
      })
      await window.loadURL(start.authUrl)
      const deadline = Date.now() + 10 * 60_000
      while (Date.now() < deadline) {
        if (window.isDestroyed()) throw new Error('登录窗口已关闭，请重试')
        await delay(2000)
        const result = await pollLogin(variant, start.state)
        if (result.status === 'pending') continue
        await this.store.upsert(result.account)
        const provider = this.providers.get(providerId)
        if (provider !== undefined) {
          const models = await provider.refreshModels()
          this.registry.replace(providerId, models)
        }
        this.refreshedAtMs = Date.now()
        return accountSnapshot(result.account)
      }
      throw new Error('登录超时（10 分钟），请重试')
    } finally {
      if (!window.isDestroyed()) window.close()
    }
  }

  async importPreview(target: ImportTargetName, selection: ImportSelectionPayload): Promise<ImportPlanSnapshot> {
    const importer = this.importers[target]
    const plan = await importer.plan(
      { groups: selection.groups as never, modelIds: selection.modelIds, ...(selection.defaultModelId === undefined ? {} : { defaultModelId: selection.defaultModelId }), ...(selection.setAsDefault === undefined ? {} : { setAsDefault: selection.setAsDefault }) },
      this.importContext(),
    )
    return snapshotPlan(plan)
  }

  async importApply(target: ImportTargetName, selection: ImportSelectionPayload): Promise<ImportPlanSnapshot> {
    const importer = this.importers[target]
    const plan = await importer.apply(
      { groups: selection.groups as never, modelIds: selection.modelIds, ...(selection.defaultModelId === undefined ? {} : { defaultModelId: selection.defaultModelId }), ...(selection.setAsDefault === undefined ? {} : { setAsDefault: selection.setAsDefault }) },
      this.importContext(),
    )
    if (plan.changed) {
      await this.recordHistory({
        id: randomUUID(),
        action: 'import',
        target,
        path: plan.path,
        createdAtMs: Date.now(),
        modelCount: selection.modelIds.length,
        ...(plan.backupPath === undefined ? {} : { backupPath: plan.backupPath }),
        warnings: plan.warnings,
        ...(plan.diff === '' ? {} : { diff: redactSecrets(plan.diff) }),
      }).catch(error => logger.warn('failed to record import history', { error: String(error) }))
    }
    return snapshotPlan(plan)
  }

  /** AI Bobby model ids referenced by any client config right now. */
  async importedModelIds(): Promise<string[]> {
    const lists = await Promise.all(
      Object.values(this.importers).map(importer => importer.installedModelIds().catch(() => [])),
    )
    return [...new Set(lists.flat())]
  }

  async importRollback(target: ImportTargetName): Promise<ImportPlanSnapshot> {
    const plan = await this.importers[target].rollback()
    if (plan.changed) {
      await this.recordHistory({
        id: randomUUID(),
        action: 'restore',
        target,
        path: plan.path,
        createdAtMs: Date.now(),
        modelCount: 0,
        ...(plan.backupPath === undefined ? {} : { backupPath: plan.backupPath }),
        warnings: plan.warnings,
      }).catch(error => logger.warn('failed to record rollback history', { error: String(error) }))
    }
    return snapshotPlan(plan)
  }

  async getImportHistory(): Promise<ImportHistorySnapshot> {
    const entries = await this.loadHistory()
    const backups: ImportBackupSnapshot[] = []
    const seen = new Set<string>()
    for (const entry of entries) {
      if (entry.backupPath === undefined || seen.has(entry.backupPath)) continue
      if (!(await exists(entry.backupPath))) continue
      seen.add(entry.backupPath)
      const info = await stat(entry.backupPath).catch(() => undefined)
      backups.push({
        id: entry.id,
        target: entry.target,
        path: entry.path,
        backupPath: entry.backupPath,
        createdAtMs: entry.createdAtMs,
        ...(info === undefined ? {} : { size: info.size }),
      })
    }
    return {
      entries: [...entries].sort((a, b) => b.createdAtMs - a.createdAtMs),
      backups: backups.sort((a, b) => b.createdAtMs - a.createdAtMs),
    }
  }

  /** Baseline plus rolling backups for one target, newest rolling first. */
  async backupVersions(target: ImportTargetName): Promise<BackupVersion[]> {
    const importer = this.importers[target]
    const { path, detected } = await importer.detect()
    if (detected) await ensureBaseline(path).catch(() => undefined)
    const versions: BackupVersion[] = []
    const baseline = baselineBackupPath(path)
    const baselineInfo = await stat(baseline).catch(() => undefined)
    if (baselineInfo !== undefined) {
      versions.push({
        id: `baseline:${target}`,
        target,
        path,
        backupPath: baseline,
        createdAtMs: baselineInfo.mtimeMs,
        size: baselineInfo.size,
        baseline: true,
      })
    }
    const rolling: BackupVersion[] = []
    const seen = new Set<string>()
    for (const entry of await this.loadHistory()) {
      if (entry.target !== target || entry.backupPath === undefined || seen.has(entry.backupPath)) continue
      seen.add(entry.backupPath)
      const info = await stat(entry.backupPath).catch(() => undefined)
      if (info === undefined) continue
      rolling.push({
        id: `entry:${entry.id}`,
        target,
        path: entry.path,
        backupPath: entry.backupPath,
        createdAtMs: entry.createdAtMs,
        size: info.size,
        baseline: false,
      })
    }
    rolling.sort((a, b) => b.createdAtMs - a.createdAtMs)
    return [...versions, ...rolling]
  }

  async restoreBackupVersion(id: string): Promise<ImportPlanSnapshot> {
    const separator = id.indexOf(':')
    const kind = separator === -1 ? '' : id.slice(0, separator)
    const key = separator === -1 ? '' : id.slice(separator + 1)
    if (kind === 'baseline' && key !== '') {
      const target = key as ImportTargetName
      const importer = this.importers[target]
      if (importer === undefined) throw new Error('未知的导入目标')
      const { path } = await importer.detect()
      return this.restoreFile(target, path, baselineBackupPath(path), 0)
    }
    if (kind === 'entry' && key !== '') return this.restoreEntry(key)
    // Backwards compatibility with plain history ids.
    return this.restoreEntry(id)
  }

  async restoreImportBackup(id: string): Promise<ImportPlanSnapshot> {
    return this.restoreBackupVersion(`entry:${id}`)
  }

  private async restoreEntry(id: string): Promise<ImportPlanSnapshot> {
    const entry = (await this.loadHistory()).find(item => item.id === id)
    if (entry?.backupPath === undefined) throw new Error('找不到可恢复的备份')
    return this.restoreFile(entry.target, entry.path, entry.backupPath, entry.modelCount)
  }

  private async restoreFile(
    target: ImportTargetName,
    path: string,
    backupPath: string,
    modelCount: number,
  ): Promise<ImportPlanSnapshot> {
    const content = await readText(backupPath)
    if (content === undefined) throw new Error('备份文件不存在')
    const currentBackup = await backup(path)
    await atomicWrite(path, content, 0o600)
    await this.recordHistory({
      id: randomUUID(),
      action: 'restore',
      target,
      path,
      createdAtMs: Date.now(),
      modelCount,
      ...(currentBackup === undefined ? {} : { backupPath: currentBackup }),
      warnings: [],
    }).catch(error => logger.warn('failed to record restore history', { error: String(error) }))
    return {
      target,
      path,
      detected: true,
      changed: true,
      diff: `已从 ${backupPath} 恢复`,
      warnings: [],
      requiresRestart: true,
      ...(currentBackup === undefined ? {} : { backupPath: currentBackup }),
    }
  }

  private async loadHistory(): Promise<ImportHistoryEntry[]> {
    try {
      const raw = await readFile(this.historyFile, 'utf8')
      const parsed = JSON.parse(raw) as { version?: number; entries?: unknown }
      if (parsed.version !== 1 || !Array.isArray(parsed.entries)) return []
      return parsed.entries.filter(isHistoryEntry)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []
      logger.warn('failed to read import history', { error: String(error) })
      return []
    }
  }

  private async recordHistory(entry: ImportHistoryEntry): Promise<void> {
    const entries = await this.loadHistory()
    entries.push(entry)
    const trimmed = entries.slice(-200)
    const payload = { version: 1, entries: trimmed }
    await atomicWrite(this.historyFile, `${JSON.stringify(payload, null, 2)}\n`, 0o600)
  }

  private importContext() {
    return {
      models: this.registry.list({ all: true }),
      apiKey: this.key,
      endpoint: `http://127.0.0.1:${this.gatewayState.port}`,
    }
  }

  apiKey(): string {
    return this.key
  }

  maskedKey(): string {
    return maskKey(this.key)
  }
}

function isHistoryEntry(value: unknown): value is ImportHistoryEntry {
  if (typeof value !== 'object' || value === null) return false
  const entry = value as Record<string, unknown>
  return (
    typeof entry['id'] === 'string' &&
    (entry['action'] === 'import' || entry['action'] === 'restore') &&
    ['workbuddy', 'workbuddy-ai', 'codex', 'claude', 'dsh'].includes(String(entry['target'])) &&
    typeof entry['path'] === 'string' &&
    typeof entry['createdAtMs'] === 'number' &&
    typeof entry['modelCount'] === 'number' &&
    Array.isArray(entry['warnings']) &&
    (entry['backupPath'] === undefined || typeof entry['backupPath'] === 'string') &&
    (entry['diff'] === undefined || typeof entry['diff'] === 'string')
  )
}

function redactSecrets(text: string): string {
  return text
    .replace(/sk-[A-Za-z0-9_-]{6,}/g, 'sk-…')
    .replace(
      /((?:api[-_]?key|auth[-_]?token|access[-_]?token|experimental_bearer_token|ANTHROPIC_AUTH_TOKEN)["']?\s*[:=]\s*["']?)([^"'\s,}]+)/gi,
      '$1[redacted]',
    )
}

function accountSnapshot(account: { uid: string; nickname: string; realm: 'cn' | 'intl'; enabled: boolean; expiresAtMs: number; credits?: { total: number; unlimited?: true } }): AccountSnapshot {
  return {
    uid: account.uid,
    nickname: account.nickname,
    realm: account.realm,
    enabled: account.enabled,
    expiresAtMs: account.expiresAtMs,
    ...(account.credits === undefined
      ? {}
      : { credits: account.credits.total, ...(account.credits.unlimited === true ? { unlimited: true } : {}) }),
  }
}

async function ensureApiKey(dir: string): Promise<string> {
  const file = join(dir, 'api-key')
  await mkdir(dir, { recursive: true, mode: 0o700 })
  try {
    const existing = (await readFile(file, 'utf8')).trim()
    if (existing !== '') return existing
  } catch {
    // create below
  }
  const key = `sk-ai-bobby-${randomUUID().replaceAll('-', '')}${randomUUID().replaceAll('-', '')}`
  await writeFile(file, `${key}\n`, { mode: 0o600 })
  await chmod(file, 0o600)
  return key
}

function snapshotPlan(plan: { target: string; path: string; detected: boolean; changed: boolean; diff: string; warnings: string[]; requiresRestart: boolean; backupPath?: string }): ImportPlanSnapshot {
  return {
    target: plan.target,
    path: plan.path,
    detected: plan.detected,
    changed: plan.changed,
    diff: plan.diff,
    warnings: plan.warnings,
    requiresRestart: plan.requiresRestart,
    ...(plan.backupPath === undefined ? {} : { backupPath: plan.backupPath }),
  }
}

function maskKey(key: string): string {
  if (key.length <= 12) return 'sk-…'
  return `${key.slice(0, 10)}…${key.slice(-4)}`
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
