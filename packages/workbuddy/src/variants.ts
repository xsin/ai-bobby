import type { ProviderId, Realm } from '@ai-bobby/core'

export interface WorkBuddyVariant {
  id: ProviderId
  realm: Realm
  displayName: string
  base: string
  billingBase: string
  origin: string
  chatUserAgent: string
  jsonUserAgent: string
  international: boolean
}

export const WORKBUDDY_VARIANTS: readonly WorkBuddyVariant[] = [
  {
    id: 'workbuddy',
    realm: 'cn',
    displayName: 'WorkBuddy',
    base: 'https://copilot.tencent.com',
    billingBase: 'https://www.codebuddy.cn',
    origin: 'https://www.codebuddy.cn',
    chatUserAgent: 'WorkBuddy/5.5.6 WorkBuddy/5.5.6 CLI/2.137.1',
    jsonUserAgent: 'CLI/2.63.2 CodeBuddy/2.63.2',
    international: false,
  },
  {
    id: 'workbuddy-ai',
    realm: 'intl',
    displayName: 'WorkBuddy AI',
    base: 'https://www.workbuddy.ai',
    billingBase: 'https://www.workbuddy.ai',
    origin: 'https://www.workbuddy.ai',
    chatUserAgent: 'WorkBuddy/5.5.2 WorkBuddy AI/5.5.2 CLI/5.5.2',
    jsonUserAgent: 'CLI/2.63.2 CodeBuddy/2.63.2',
    international: true,
  },
]

export function variantFor(id: ProviderId): WorkBuddyVariant | undefined {
  return WORKBUDDY_VARIANTS.find(variant => variant.id === id)
}

export function variantForRealm(realm: Realm): WorkBuddyVariant {
  return WORKBUDDY_VARIANTS.find(variant => variant.realm === realm) ?? WORKBUDDY_VARIANTS[0]!
}

export function jsonHeaders(variant: WorkBuddyVariant, token?: string, account?: { uid?: string; enterpriseId?: string }): Record<string, string> {
  return {
    Accept: 'application/json, text/plain, */*',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': variant.jsonUserAgent,
    Origin: variant.origin,
    Referer: `${variant.origin}/`,
    ...(token === undefined ? {} : { Authorization: `Bearer ${token}` }),
    ...(variant.international ? { 'X-Product': 'SaaS' } : {}),
    ...(account?.uid === undefined ? {} : { 'X-User-Id': account.uid }),
    ...(account?.enterpriseId === undefined ? {} : { 'X-Enterprise-Id': account.enterpriseId }),
  }
}

export function chatHeaders(variant: WorkBuddyVariant, token: string, account?: { uid?: string; enterpriseId?: string }): Record<string, string> {
  return {
    Accept: 'text/event-stream',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': variant.chatUserAgent,
    Origin: variant.origin,
    Referer: `${variant.origin}/`,
    Authorization: `Bearer ${token}`,
    ...(variant.international ? { 'X-Product': 'SaaS' } : {}),
    ...(account?.uid === undefined ? {} : { 'X-User-Id': account.uid }),
    ...(account?.enterpriseId === undefined ? {} : { 'X-Enterprise-Id': account.enterpriseId }),
  }
}
