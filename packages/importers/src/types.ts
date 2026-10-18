import type { ModelDescriptor, ProviderId } from '@ai-bobby/core'

export type ImportTarget = 'workbuddy' | 'workbuddy-ai' | 'codex' | 'claude' | 'dsh'

export interface ImportSelection {
  groups: readonly ProviderId[]
  modelIds: readonly string[]
  defaultModelId?: string
  setAsDefault?: boolean
}

export interface ImportContext {
  models: readonly ModelDescriptor[]
  apiKey: string
  endpoint: string
}

export interface ImportPlan {
  target: ImportTarget
  path: string
  detected: boolean
  changed: boolean
  diff: string
  warnings: string[]
  requiresRestart: boolean
  backupPath?: string
}

export interface Importer {
  readonly target: ImportTarget
  detect(): Promise<{ path: string; detected: boolean }>
  /** AI Bobby model ids this client's config currently references. */
  installedModelIds(): Promise<string[]>
  plan(selection: ImportSelection, context: ImportContext): Promise<ImportPlan>
  apply(selection: ImportSelection, context: ImportContext): Promise<ImportPlan>
  rollback(): Promise<ImportPlan>
}
