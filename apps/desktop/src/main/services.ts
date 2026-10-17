import { app, BrowserWindow, shell } from 'electron'
import { chmod, mkdir, readFile, writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { join } from 'node:path'
import { ModelRegistry, createLogger } from '@ai-bobby/core'
import { GatewayService } from '@ai-bobby/gateway'
import {
  AccountStore,
  WORKBUDDY_VARIANTS,
  WorkBuddyProvider,
  pollLogin,
  startLogin,
  variantFor,
} from '@ai-bobby/workbuddy'
import type { AccountSnapshot, GatewayStatus, ImportPlanSnapshot, ImportSelectionPayload, ImportTargetName, ModelSnapshot } from '../shared/api'
import { ClaudeImporter, CodexImporter, DshImporter, WorkBuddyImporter, type Importer } from '@ai-bobby/importers'

const logger = createLogger('info')

export class Services {
  private readonly registry = new ModelRegistry()
  private readonly providers = new Map<'workbuddy' | 'workbuddy-ai', WorkBuddyProvider>()
  private readonly adapters = new Map()
  private readonly store: AccountStore
  private gateway: GatewayService | undefined
  private gatewayState: GatewayStatus['gateway'] = { state: 'starting', port: 46890 }
  private refreshedAtMs = 0
  private key = ''
  private readonly importers: Record<ImportTargetName, Importer>

  constructor(private readonly mainWindow: () => BrowserWindow | undefined) {
    this.store = AccountStore.inDataDir(app.getPath('userData'))
    this.importers = {
      workbuddy: new WorkBuddyImporter('workbuddy'),
      'workbuddy-ai': new WorkBuddyImporter('workbuddy-ai'),
      codex: new CodexImporter(),
      claude: new ClaudeImporter(),
      dsh: new DshImporter(),
    }
    for (const variant of WORKBUDDY_VARIANTS) {
      if (variant.id === 'opencode') continue
      const provider = new WorkBuddyProvider({ variant, store: this.store })
      this.providers.set(variant.id as 'workbuddy' | 'workbuddy-ai', provider)
      this.adapters.set(variant.id, provider)
    }
  }

  async start(): Promise<void> {
    this.key = await ensureApiKey()
    const port = Number(process.env.AI_BOBBY_PORT || 46890)
    const gateway = new GatewayService({
      registry: this.registry,
      adapters: this.adapters,
      apiKey: this.key,
      port: Number.isFinite(port) ? port : 46890,
      version: app.getVersion(),
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
    void this.refresh()
  }

  async stop(): Promise<void> {
    await this.gateway?.stop()
    this.gateway = undefined
  }

  async refresh(): Promise<GatewayStatus> {
    for (const [realm, provider] of this.providers) {
      try {
        const models = await provider.refreshModels()
        this.registry.replace(realm, models)
      } catch (error) {
        logger.warn('workbuddy catalog refresh failed', { provider: realm, error: String(error) })
      }
    }
    await Promise.all([...this.providers.values()].map(provider => provider.refreshCredits().catch(() => undefined)))
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
      version: app.getVersion(),
      gateway: this.gatewayState,
      models,
      accounts: accounts.map(accountSnapshot),
      apiKeyMasked: maskKey(this.key),
      refreshedAtMs: this.refreshedAtMs,
    }
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
    return snapshotPlan(plan)
  }

  async importRollback(target: ImportTargetName): Promise<ImportPlanSnapshot> {
    return snapshotPlan(await this.importers[target].rollback())
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

function accountSnapshot(account: { uid: string; nickname: string; realm: 'cn' | 'intl'; enabled: boolean; expiresAtMs: number; credits?: { total: number } }): AccountSnapshot {
  return {
    uid: account.uid,
    nickname: account.nickname,
    realm: account.realm,
    enabled: account.enabled,
    expiresAtMs: account.expiresAtMs,
    ...(account.credits === undefined ? {} : { credits: account.credits.total }),
  }
}

async function ensureApiKey(): Promise<string> {
  const dir = app.getPath('userData')
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
