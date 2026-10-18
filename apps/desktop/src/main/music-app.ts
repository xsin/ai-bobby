import { execFile } from 'node:child_process'
import { app, shell } from 'electron'
import type { MusicAlbumResult, MusicAppResult } from '../shared/api'
import { orpheusSongUrl } from './music-app-core'

const NETEASE_HANDLER = /netease|网易云/i
const CLIENT_PROCESS = 'NeteaseMusic'
const LAUNCH_TIMEOUT_MS = 8_000
const HANDLER_SETTLE_MS = 700

/** Test seams: the real implementation shells out to `pgrep` and Electron. */
export interface MusicDeps {
  platform?: NodeJS.Platform
  isClientRunning?: () => Promise<boolean>
  waitUntilRunning?: (timeoutMs: number) => Promise<boolean>
  delay?: (ms: number) => Promise<void>
  openExternal?: (url: string) => Promise<void>
}

const defaultDelay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

async function detectRunning(): Promise<boolean> {
  return new Promise(resolve => {
    execFile('pgrep', ['-x', CLIENT_PROCESS], { timeout: 1_500 }, (error, stdout) => {
      resolve(error === null && stdout.trim() !== '')
    })
  })
}

async function waitUntilRunning(timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    if (await detectRunning()) return true
    await defaultDelay(250)
  }
  return false
}

async function neteaseHandlerInstalled(url: string): Promise<boolean> {
  try {
    const handler = await app.getApplicationInfoForProtocol(url)
    const identity = `${handler?.name ?? ''} ${handler?.path ?? ''}`
    return identity.trim() !== '' && NETEASE_HANDLER.test(identity)
  } catch {
    return false
  }
}

/**
 * NetEase's macOS client registers `orpheus://` and accepts a base64 JSON
 * payload for desktop playback. The mobile `orpheus://song/<id>` form only
 * foregrounds the client on macOS, so we use the payload verified by the web
 * client instead.
 *
 * A cold client consumes the first URL as a launch command and drops the
 * payload, so when the process was not running we wait for it to come up and
 * send the payload once more.
 */
export async function playSongInNetease(songId: string, deps: MusicDeps = {}): Promise<MusicAppResult> {
  if ((deps.platform ?? process.platform) !== 'darwin') {
    return { ok: false, reason: 'unsupported-platform' }
  }

  let url: string
  try {
    url = orpheusSongUrl(songId)
  } catch {
    return { ok: false, reason: 'invalid-id' }
  }

  if (!(await neteaseHandlerInstalled(url))) {
    return { ok: false, reason: 'no-app' }
  }

  const open = deps.openExternal ?? ((target: string) => shell.openExternal(target))
  const isRunning = deps.isClientRunning ?? detectRunning
  const waitForRunning = deps.waitUntilRunning ?? waitUntilRunning
  const delay = deps.delay ?? defaultDelay

  const wasRunning = await isRunning().catch(() => true)
  try {
    await open(url)
  } catch (error) {
    return {
      ok: false,
      reason: 'open-failed',
      error: error instanceof Error ? error.message : String(error),
    }
  }

  if (!wasRunning) {
    const started = await waitForRunning(LAUNCH_TIMEOUT_MS).catch(() => false)
    if (started) {
      await delay(HANDLER_SETTLE_MS)
      await open(url).catch(() => undefined)
    }
  }
  return { ok: true }
}

/**
 * NetEase 3.1.12.3443 rejects album deep links (`cmd: "open"` answers
 * “操作不支持”), so albums always open the web page. When a client is
 * installed we tell the user why the app was not used.
 */
export async function openAlbumPage(
  href: string,
  deps: { appInstalled?: () => Promise<boolean> } = {},
): Promise<MusicAlbumResult> {
  if (!/^https?:\/\//i.test(href)) {
    return { ok: false, error: '专辑链接不合法' }
  }
  const detect =
    deps.appInstalled ??
    (async () => process.platform === 'darwin' && (await neteaseHandlerInstalled('orpheus://album')))
  const appInstalled = await detect().catch(() => false)
  try {
    await shell.openExternal(href)
    return { ok: true, appInstalled }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) }
  }
}
