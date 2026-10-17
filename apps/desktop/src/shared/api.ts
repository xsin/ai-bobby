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

export interface AiBobbyApi {
  getAppInfo(): Promise<AppInfo>
  checkForUpdates(manual?: boolean): Promise<UpdateCheckResult>
  setAutoCheck(enabled: boolean): Promise<void>
  downloadUpdate(): Promise<UpdateActionResult>
  installUpdate(): Promise<UpdateActionResult>
  onUpdateAvailable(listener: (info: UpdateInfo) => void): () => void
  onUpdateProgress(listener: (progress: UpdateProgress) => void): () => void
  openExternal(url: string): Promise<void>
  copyText(text: string): Promise<void>
  quit(): Promise<void>
}

declare global {
  interface Window {
    aiBobby?: AiBobbyApi
  }
}
