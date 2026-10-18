import { describe, expect, it } from 'vitest'
import { toProviderGroups } from './import-groups'

describe('toProviderGroups', () => {
  it('maps the UI wbi group to the canonical provider id', () => {
    expect(toProviderGroups(['opencode', 'workbuddy', 'wbi'])).toEqual([
      'opencode',
      'workbuddy',
      'workbuddy-ai',
    ])
  })

  it('keeps ids that already are canonical', () => {
    expect(toProviderGroups(['workbuddy-ai', 'codex'])).toEqual(['workbuddy-ai', 'codex'])
  })
})
