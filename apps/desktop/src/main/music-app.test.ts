import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  getApplicationInfoForProtocol: vi.fn(),
  openExternal: vi.fn(),
}))

vi.mock('electron', () => ({
  app: { getApplicationInfoForProtocol: mocks.getApplicationInfoForProtocol },
  shell: { openExternal: mocks.openExternal },
}))

import { playSongInNetease } from './music-app'

describe('playSongInNetease', () => {
  beforeEach(() => {
    mocks.getApplicationInfoForProtocol.mockReset()
    mocks.openExternal.mockReset()
  })

  it('opens the NetEase desktop client when it owns the scheme', async () => {
    mocks.getApplicationInfoForProtocol.mockResolvedValue({
      name: 'NetEaseMusic',
      path: '/Applications/NeteaseMusic.app',
    })
    mocks.openExternal.mockResolvedValue(undefined)

    await expect(playSongInNetease('3440589170')).resolves.toEqual({ ok: true })
    expect(mocks.openExternal).toHaveBeenCalledWith(
      'orpheus://eyJ0eXBlIjoic29uZyIsImlkIjozNDQwNTg5MTcwLCJjbWQiOiJwbGF5In0=',
    )
  })

  it('returns no-app when the scheme is unhandled', async () => {
    mocks.getApplicationInfoForProtocol.mockRejectedValue(new Error('not found'))
    await expect(playSongInNetease('3440589170')).resolves.toEqual({ ok: false, reason: 'no-app' })
    expect(mocks.openExternal).not.toHaveBeenCalled()
  })

  it('returns no-app when another app owns the scheme', async () => {
    mocks.getApplicationInfoForProtocol.mockResolvedValue({
      name: 'Google Chrome',
      path: '/Applications/Google Chrome.app',
    })
    await expect(playSongInNetease('3440589170')).resolves.toEqual({ ok: false, reason: 'no-app' })
  })

  it('returns open-failed when the client cannot be launched', async () => {
    mocks.getApplicationInfoForProtocol.mockResolvedValue({
      name: 'NetEaseMusic',
      path: '/Applications/NeteaseMusic.app',
    })
    mocks.openExternal.mockRejectedValue(new Error('launch failed'))

    await expect(playSongInNetease('3440589170')).resolves.toEqual({
      ok: false,
      reason: 'open-failed',
      error: 'launch failed',
    })
  })

  it('rejects malformed ids before probing the scheme', async () => {
    await expect(playSongInNetease('not-a-song')).resolves.toEqual({ ok: false, reason: 'invalid-id' })
    expect(mocks.getApplicationInfoForProtocol).not.toHaveBeenCalled()
  })
})
