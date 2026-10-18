import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  getApplicationInfoForProtocol: vi.fn(),
  openExternal: vi.fn(),
}))

vi.mock('electron', () => ({
  app: { getApplicationInfoForProtocol: mocks.getApplicationInfoForProtocol },
  shell: { openExternal: mocks.openExternal },
}))

import { openAlbumPage, playSongInNetease, type MusicDeps } from './music-app'

const SONG_ID = '3440589170'
const SONG_URL = 'orpheus://eyJ0eXBlIjoic29uZyIsImlkIjozNDQwNTg5MTcwLCJjbWQiOiJwbGF5In0='
const ALBUM_URL = 'https://music.163.com/#/album?id=123456'

const darwin = { platform: 'darwin' as const }
const running: MusicDeps = {
  ...darwin,
  isClientRunning: () => Promise.resolve(true),
  waitUntilRunning: () => Promise.resolve(true),
  delay: () => Promise.resolve(),
}
const cold: MusicDeps = {
  ...darwin,
  isClientRunning: () => Promise.resolve(false),
  waitUntilRunning: () => Promise.resolve(true),
  delay: () => Promise.resolve(),
}

function neteaseHandler(): void {
  mocks.getApplicationInfoForProtocol.mockResolvedValue({
    name: 'NeteaseMusic',
    path: '/Applications/NeteaseMusic.app',
  })
}

describe('playSongInNetease', () => {
  beforeEach(() => {
    mocks.getApplicationInfoForProtocol.mockReset()
    mocks.openExternal.mockReset()
    mocks.openExternal.mockResolvedValue(undefined)
  })

  it('sends the payload once when the client is already running', async () => {
    neteaseHandler()
    await expect(playSongInNetease(SONG_ID, running)).resolves.toEqual({ ok: true })
    expect(mocks.openExternal).toHaveBeenCalledTimes(1)
    expect(mocks.openExternal).toHaveBeenCalledWith(SONG_URL)
  })

  it('re-sends the payload after a cold launch', async () => {
    neteaseHandler()
    const waitUntilRunning = vi.fn().mockResolvedValue(true)
    const delay = vi.fn().mockResolvedValue(undefined)
    await expect(
      playSongInNetease(SONG_ID, { ...cold, waitUntilRunning, delay }),
    ).resolves.toEqual({ ok: true })
    expect(waitUntilRunning).toHaveBeenCalled()
    expect(delay).toHaveBeenCalled()
    expect(mocks.openExternal).toHaveBeenCalledTimes(2)
    expect(mocks.openExternal).toHaveBeenNthCalledWith(1, SONG_URL)
    expect(mocks.openExternal).toHaveBeenNthCalledWith(2, SONG_URL)
  })

  it('does not retry when the client never comes up', async () => {
    neteaseHandler()
    await expect(
      playSongInNetease(SONG_ID, { ...cold, waitUntilRunning: () => Promise.resolve(false) }),
    ).resolves.toEqual({ ok: true })
    expect(mocks.openExternal).toHaveBeenCalledTimes(1)
  })

  it('returns no-app when the scheme is unhandled', async () => {
    mocks.getApplicationInfoForProtocol.mockRejectedValue(new Error('not found'))
    await expect(playSongInNetease(SONG_ID, running)).resolves.toEqual({ ok: false, reason: 'no-app' })
    expect(mocks.openExternal).not.toHaveBeenCalled()
  })

  it('returns no-app when another app owns the scheme', async () => {
    mocks.getApplicationInfoForProtocol.mockResolvedValue({
      name: 'Google Chrome',
      path: '/Applications/Google Chrome.app',
    })
    await expect(playSongInNetease(SONG_ID, running)).resolves.toEqual({ ok: false, reason: 'no-app' })
  })

  it('returns open-failed when the client cannot be launched', async () => {
    neteaseHandler()
    mocks.openExternal.mockRejectedValue(new Error('launch failed'))
    await expect(playSongInNetease(SONG_ID, running)).resolves.toEqual({
      ok: false,
      reason: 'open-failed',
      error: 'launch failed',
    })
  })

  it('rejects malformed ids before probing the scheme', async () => {
    await expect(playSongInNetease('not-a-song', running)).resolves.toEqual({ ok: false, reason: 'invalid-id' })
    expect(mocks.getApplicationInfoForProtocol).not.toHaveBeenCalled()
  })
})

describe('openAlbumPage', () => {
  beforeEach(() => {
    mocks.getApplicationInfoForProtocol.mockReset()
    mocks.openExternal.mockReset()
    mocks.openExternal.mockResolvedValue(undefined)
  })

  it('opens the web album and reports an installed client', async () => {
    await expect(openAlbumPage(ALBUM_URL, { appInstalled: () => Promise.resolve(true) })).resolves.toEqual({
      ok: true,
      appInstalled: true,
    })
    expect(mocks.openExternal).toHaveBeenCalledWith(ALBUM_URL)
  })

  it('opens the web album when no client is installed', async () => {
    await expect(openAlbumPage(ALBUM_URL, { appInstalled: () => Promise.resolve(false) })).resolves.toEqual({
      ok: true,
      appInstalled: false,
    })
  })

  it('rejects non-http links without opening anything', async () => {
    await expect(openAlbumPage('javascript:alert(1)')).resolves.toEqual({ ok: false, error: '专辑链接不合法' })
    expect(mocks.openExternal).not.toHaveBeenCalled()
  })
})
