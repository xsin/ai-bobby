import { app, shell } from 'electron'
import type { MusicAppResult } from '../shared/api'
import { orpheusSongUrl } from './music-app-core'

const NETEASE_HANDLER = /netease|网易云/i

/**
 * NetEase's macOS client registers `orpheus://` and accepts a base64 JSON
 * payload for desktop playback. The mobile `orpheus://song/<id>` form only
 * foregrounds the client on macOS, so we use the payload verified by the web
 * client instead.
 */
export async function playSongInNetease(songId: string): Promise<MusicAppResult> {
  if (process.platform !== 'darwin') {
    return { ok: false, reason: 'unsupported-platform' }
  }

  let url: string
  try {
    url = orpheusSongUrl(songId)
  } catch {
    return { ok: false, reason: 'invalid-id' }
  }

  let handler: Electron.ApplicationInfoForProtocolReturnValue | undefined
  try {
    handler = await app.getApplicationInfoForProtocol(url)
  } catch {
    return { ok: false, reason: 'no-app' }
  }
  const identity = `${handler?.name ?? ''} ${handler?.path ?? ''}`
  if (identity.trim() === '' || !NETEASE_HANDLER.test(identity)) {
    return { ok: false, reason: 'no-app' }
  }

  try {
    await shell.openExternal(url)
    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      reason: 'open-failed',
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
