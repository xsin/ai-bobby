import type { ModelRef, ProviderId } from './types'

export const PROVIDER_GROUPS: Record<ProviderId, { name: string; prefix: string; displayPrefix: string }> = {
  opencode: { name: 'OpenCode', prefix: 'oc', displayPrefix: 'OC.' },
  workbuddy: { name: 'WorkBuddy', prefix: 'wb', displayPrefix: 'WB.' },
  'workbuddy-ai': { name: 'WorkBuddy AI', prefix: 'wbi', displayPrefix: 'WBI.' },
}

export function groupName(provider: ProviderId): string {
  return PROVIDER_GROUPS[provider].name
}

export function makeModelId(provider: ProviderId, upstreamId: string): string {
  return `${PROVIDER_GROUPS[provider].prefix}/${upstreamId}`
}

export function displayModelName(provider: ProviderId, name: string): string {
  return `${PROVIDER_GROUPS[provider].displayPrefix} ${name}`.trim()
}

export function makeModelRef(provider: ProviderId, upstreamId: string, name: string): ModelRef {
  return {
    provider,
    upstreamId,
    id: makeModelId(provider, upstreamId),
    displayName: displayModelName(provider, name),
  }
}

export function providerOfModelId(id: string): ProviderId | undefined {
  if (id.startsWith('oc/')) return 'opencode'
  if (id.startsWith('wb/')) return 'workbuddy'
  if (id.startsWith('wbi/')) return 'workbuddy-ai'
  return undefined
}

export function upstreamIdOfModelId(id: string): string {
  const slash = id.indexOf('/')
  return slash >= 0 ? id.slice(slash + 1) : id
}
