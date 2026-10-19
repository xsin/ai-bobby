import type { ModelDescriptor } from '@ai-bobby/core'

/**
 * Codex's model catalog carries semantics that AI Bobby cannot infer from an
 * upstream model list (reasoning levels, instruction template, tool modes,
 * truncation). We only add a model to the generated catalog when it has an
 * explicit entry here; everything else is skipped for Codex and reported to
 * the user instead of being silently given template values.
 */
type CodexMetadata = Record<string, unknown>

export type CodexVerification = 'schema-valid' | 'request-valid' | 'behavior-reviewed'

export interface CodexMetadataEntry {
  /** ISO date of the last verification run. */
  verifiedAt: string
  /** Primary source used for the fields (docs URL or internal test). */
  source: string
  /** Highest verification layer passed so far. */
  verification: CodexVerification
  fields: CodexMetadata
}

const REASONING_LEVELS = [
  { effort: 'low', description: 'Fast responses with lighter reasoning' },
  { effort: 'high', description: 'Extra high reasoning depth for complex problems' },
  { effort: 'max', description: 'Maximum reasoning depth for the hardest problems' },
]

const BASE: CodexMetadata = {
  default_reasoning_level: 'high',
  supported_reasoning_levels: REASONING_LEVELS,
  shell_type: 'shell_command',
  visibility: 'list',
  supported_in_api: true,
  priority: 0,
  base_instructions: '',
  supports_reasoning_summaries: true,
  default_reasoning_summary: 'none',
  support_verbosity: true,
  default_verbosity: 'low',
  apply_patch_tool_type: 'freeform',
  truncation_policy: { mode: 'tokens', limit: 10000 },
  effective_context_window_percent: 95,
  supports_parallel_tool_calls: true,
  experimental_supported_tools: [],
  input_modalities: ['text', 'image'],
  web_search_tool_type: 'text',
  supports_search_tool: true,
  tool_mode: null,
  multi_agent_version: 'v2',
  use_responses_lite: false,
  comp_hash: '3000',
  reasoning_summary_format: 'experimental',
}

/** Curated entries: add a model only after its Codex semantics are verified. */
export const CODEX_METADATA: Record<string, CodexMetadataEntry> = {
  'deepseek-v4.1-flash': {
    verifiedAt: '2026-10-20',
    source: 'docs/research-codex-metadata.md',
    verification: 'schema-valid',
    fields: {
      description: 'DeepSeek V4.1 Flash via AI Bobby (WorkBuddy / WorkBuddy AI).',
      default_reasoning_level: 'high',
      supported_reasoning_levels: REASONING_LEVELS,
      supports_parallel_tool_calls: true,
      input_modalities: ['text', 'image'],
    },
  },
  'glm-5.3-flash': {
    verifiedAt: '2026-10-20',
    source: 'docs/research-codex-metadata.md',
    verification: 'schema-valid',
    fields: {
      description: 'GLM-5.3-Flash via AI Bobby (WorkBuddy / WorkBuddy AI).',
      default_reasoning_level: 'max',
      supported_reasoning_levels: REASONING_LEVELS,
      supports_parallel_tool_calls: true,
      input_modalities: ['text', 'image'],
    },
  },
}

export function codexCoveredUpstreamIds(): string[] {
  return Object.keys(CODEX_METADATA).sort()
}

export function codexMetadataEntry(upstreamId: string): CodexMetadataEntry | undefined {
  return CODEX_METADATA[upstreamId]
}

export function isCodexCovered(model: Pick<ModelDescriptor, 'upstreamId'>): boolean {
  return CODEX_METADATA[model.upstreamId] !== undefined
}

export function codexCatalogEntry(model: ModelDescriptor): CodexMetadata {
  const entry = CODEX_METADATA[model.upstreamId]
  if (entry === undefined) throw new Error(`No Codex metadata for ${model.upstreamId}`)
  return {
    ...BASE,
    ...entry.fields,
    slug: model.id,
    display_name: model.displayName,
    description: entry.fields['description'] ?? `AI Bobby · ${model.groupName}`,
    context_window: model.contextWindow ?? 1048576,
    max_context_window: model.contextWindow ?? 1048576,
    input_modalities: model.capabilities.images ? ['text', 'image'] : ['text'],
    supports_parallel_tool_calls: model.capabilities.tools,
    supported_in_api: true,
    visibility: 'list',
  }
}
