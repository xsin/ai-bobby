export type ThemeChoice = 'system' | 'light' | 'dark'

export interface AppInfo {
  version: string
  platform: string
  arch: string
  packaged: boolean
  updateSource: string
}

export interface UpdateAsset {
  url: string
  sha256: string
  size?: number
}

export interface UpdateManifest {
  version: string
  notes?: string
  pub_date?: string
  platforms: Record<string, UpdateAsset>
  signature?: string
}

export interface UpdateInfo {
  currentVersion: string
  version: string
  notes?: string
  pubDate?: string
  asset: UpdateAsset
}

export type UpdateCheckResult =
  | { ok: true; update: UpdateInfo | null }
  | { ok: false; error: string }

export type UpdateStage = 'downloading' | 'verifying' | 'extracting' | 'installing'

export interface UpdateProgress {
  stage: UpdateStage
  downloaded: number
  total: number
}

export type UpdateActionResult =
  | { ok: true }
  | { ok: false; error: string }


export interface ModelSnapshot {
  id: string
  name: string
  provider: 'opencode' | 'workbuddy' | 'workbuddy-ai' | 'nvidia'
  groupName: string
  status: string
  capabilities: { text: boolean; images: boolean; tools: boolean; reasoning: boolean }
  contextWindow?: number
  maxOutputTokens?: number
  accounts?: number
  billing?: { credits?: string; badges?: readonly string[]; free: boolean; rateUnknown?: boolean }
}

export interface AccountSnapshot {
  uid: string
  nickname: string
  realm: 'cn' | 'intl'
  enabled: boolean
  expiresAtMs: number
  credits?: number
  unlimited?: boolean
}

export interface GatewayStatus {
  version: string
  gateway: { state: 'starting' | 'ready' | 'error'; port: number; error?: string }
  models: ModelSnapshot[]
  accounts: AccountSnapshot[]
  apiKeyMasked: string
  refreshedAtMs: number
}


export type ImportTargetName = 'workbuddy' | 'workbuddy-ai' | 'codex' | 'claude' | 'dsh' | 'vscode'

export interface ImportSelectionPayload {
  groups: string[]
  modelIds: string[]
  defaultModelId?: string
  setAsDefault?: boolean
}

export interface ImportPlanSnapshot {
  target: string
  path: string
  detected: boolean
  changed: boolean
  diff: string
  warnings: string[]
  requiresRestart: boolean
  backupPath?: string
}

export interface ImportHistoryEntry {
  id: string
  action: 'import' | 'restore'
  target: ImportTargetName
  path: string
  createdAtMs: number
  modelCount: number
  backupPath?: string
  warnings: string[]
  diff?: string
}

export interface ImportBackupSnapshot {
  id: string
  target: ImportTargetName
  path: string
  backupPath: string
  createdAtMs: number
  size?: number
}

export interface ImportHistorySnapshot {
  entries: ImportHistoryEntry[]
  backups: ImportBackupSnapshot[]
}

export interface BackupVersion {
  id: string
  target: ImportTargetName
  path: string
  backupPath: string
  createdAtMs: number
  size?: number
  baseline: boolean
}

export type MusicAppFailureReason =
  | 'unsupported-platform'
  | 'no-app'
  | 'open-failed'
  | 'invalid-id'

export type MusicAppResult =
  | { ok: true }
  | { ok: false; reason: MusicAppFailureReason; error?: string }

export interface MusicAlbumResult {
  ok: boolean
  /** True when the NetEase client is installed but album deep links are unsupported. */
  appInstalled?: boolean
  error?: string
}

export interface AiBobbyApi {
  getAppInfo(): Promise<AppInfo>
  getStatus(): Promise<GatewayStatus>
  copyApiKey(): Promise<void>
  refresh(): Promise<GatewayStatus>
  startLogin(provider: 'workbuddy' | 'workbuddy-ai'): Promise<AccountSnapshot>
  importPreview(target: ImportTargetName, selection: ImportSelectionPayload): Promise<ImportPlanSnapshot>
  importApply(target: ImportTargetName, selection: ImportSelectionPayload): Promise<ImportPlanSnapshot>
  importRollback(target: ImportTargetName): Promise<ImportPlanSnapshot>
  getImportHistory(): Promise<ImportHistorySnapshot>
  getImportedModelIds(): Promise<string[]>
  getBackupVersions(target: ImportTargetName): Promise<BackupVersion[]>
  restoreBackupVersion(id: string): Promise<ImportPlanSnapshot>
  restoreImportBackup(id: string): Promise<ImportPlanSnapshot>
  playInMusicApp(songId: string): Promise<MusicAppResult>
  openMusicAlbum(href: string): Promise<MusicAlbumResult>
  checkForUpdates(manual?: boolean): Promise<UpdateCheckResult>
  setAutoCheck(enabled: boolean): Promise<void>
  downloadUpdate(): Promise<UpdateActionResult>
  installUpdate(): Promise<UpdateActionResult>
  onUpdateAvailable(listener: (info: UpdateInfo) => void): () => void
  onUpdateProgress(listener: (progress: UpdateProgress) => void): () => void
  openExternal(url: string): Promise<void>
  openDirectory(path: string): Promise<void>
  copyText(text: string): Promise<void>
  quit(): Promise<void>
}

declare global {
  interface Window {
    aiBobby?: AiBobbyApi
  }
}
