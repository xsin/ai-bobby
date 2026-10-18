import { app } from 'electron'
import { chmod, mkdir, open, readdir, rename, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { appVersion } from './version'
import { execFile, spawn } from 'node:child_process'
import { promisify } from 'node:util'
import { randomUUID } from 'node:crypto'
import type { UpdateActionResult, UpdateCheckResult, UpdateInfo, UpdateProgress } from '../shared/api'
import {
  UPDATE_MANIFEST_URL,
  UpdateError,
  compareVersions,
  parseManifest,
  pickAsset,
  sha256File,
  verifyManifestSignature,
} from './updater-core'

const execFileAsync = promisify(execFile)

export function updateSource(): string {
  return process.env.AI_BOBBY_UPDATE_URL?.trim() || UPDATE_MANIFEST_URL
}

interface PendingUpdate {
  info: UpdateInfo
  zipPath: string
}

let pending: PendingUpdate | undefined

export async function checkForUpdates(): Promise<UpdateCheckResult> {
  try {
    const response = await fetch(updateSource(), {
      cache: 'no-store',
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) {
      return { ok: false, error: `更新服务器返回 HTTP ${response.status}` }
    }
    const manifest = parseManifest(await response.json())
    if (!verifyManifestSignature(manifest)) {
      return { ok: false, error: '更新清单签名校验失败，已取消' }
    }
    const currentVersion = appVersion()
    if (compareVersions(manifest.version, currentVersion) <= 0) {
      return { ok: true, update: null }
    }
    const asset = pickAsset(manifest)
    return {
      ok: true,
      update: {
        currentVersion,
        version: manifest.version,
        notes: manifest.notes,
        pubDate: manifest.pub_date,
        asset,
      },
    }
  } catch (error) {
    const message =
      error instanceof UpdateError
        ? error.message
        : error instanceof Error
          ? error.message
          : String(error)
    return { ok: false, error: `检查更新失败：${message}` }
  }
}

export async function downloadUpdate(
  info: UpdateInfo,
  onProgress: (progress: UpdateProgress) => void,
): Promise<UpdateActionResult> {
  pending = undefined
  try {
    const dir = join(app.getPath('userData'), 'updates', info.version)
    await mkdir(dir, { recursive: true })
    const cleanVersion = info.version.replace(/[^0-9A-Za-z._-]/g, '_')
    const zipPath = join(dir, `AI-Bobby-${cleanVersion}-${process.arch}.zip`)
    const partPath = `${zipPath}.part`

    const response = await fetch(info.asset.url, {
      headers: { accept: 'application/octet-stream' },
    })
    if (!response.ok || !response.body) {
      return { ok: false, error: `下载失败：HTTP ${response.status}` }
    }

    const total =
      Number.parseInt(response.headers.get('content-length') ?? '', 10) || info.asset.size || 0
    const handle = await open(partPath, 'w')
    const reader = response.body.getReader()
    let downloaded = 0
    try {
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        if (!value) continue
        await handle.write(value)
        downloaded += value.byteLength
        onProgress({ stage: 'downloading', downloaded, total })
      }
    } finally {
      await handle.close()
    }

    onProgress({ stage: 'verifying', downloaded, total })
    const digest = await sha256File(partPath)
    if (digest.toLowerCase() !== info.asset.sha256.toLowerCase()) {
      await rm(partPath, { force: true })
      return { ok: false, error: '更新包 SHA256 校验失败，已删除下载文件' }
    }
    await rename(partPath, zipPath)
    pending = { info, zipPath }
    return { ok: true }
  } catch (error) {
    return { ok: false, error: `下载更新失败：${error instanceof Error ? error.message : String(error)}` }
  }
}

async function findAppBundle(dir: string): Promise<string | undefined> {
  const entries = await readdir(dir, { withFileTypes: true })
  const bundle = entries.find(entry => entry.isDirectory() && entry.name.endsWith('.app'))
  return bundle ? join(dir, bundle.name) : undefined
}

async function signAdHoc(bundle: string): Promise<void> {
  try {
    await execFileAsync('codesign', ['--verify', '--deep', '--strict', bundle])
    return
  } catch {
    // Fall through and re-sign: ZIP extraction can preserve signatures, but an
    // ad-hoc signature is the only identity available for this channel.
  }
  await execFileAsync('codesign', ['--force', '--deep', '--sign', '-', bundle])
  await execFileAsync('codesign', ['--verify', '--deep', '--strict', bundle])
}

async function installOnMac(info: UpdateInfo, zipPath: string): Promise<UpdateActionResult> {
  if (!app.isPackaged) {
    return { ok: false, error: '开发模式下不执行替换安装' }
  }
  const working = join(app.getPath('userData'), 'updates', info.version)
  const extractDir = join(working, 'extract')
  await rm(extractDir, { recursive: true, force: true })
  await mkdir(extractDir, { recursive: true })

  try {
    await execFileAsync('ditto', ['-x', '-k', zipPath, extractDir])
  } catch (error) {
    return { ok: false, error: `解压失败：${error instanceof Error ? error.message : String(error)}` }
  }

  const newBundle = await findAppBundle(extractDir)
  if (!newBundle) {
    return { ok: false, error: '更新包中没有找到 AI Bobby.app' }
  }

  try {
    await signAdHoc(newBundle)
  } catch (error) {
    return { ok: false, error: `更新包签名校验失败：${error instanceof Error ? error.message : String(error)}` }
  }

  const exe = app.getPath('exe')
  const appBundle = resolve(dirname(exe), '..', '..')
  const script = join(working, `install-${randomUUID()}.sh`)
  const scriptBody = `#!/bin/sh
set -eu
PID="$1"
APP="$2"
NEW="$3"
BAK="$APP.bak"
while kill -0 "$PID" 2>/dev/null; do sleep 0.2; done
mv "$APP" "$BAK"
if ditto "$NEW" "$APP"; then
  xattr -dr com.apple.quarantine "$APP" 2>/dev/null || true
  rm -rf "$BAK"
  rm -rf "$(dirname "$NEW")"
  open "$APP"
else
  rm -rf "$APP"
  mv "$BAK" "$APP"
  exit 1
fi
`
  await writeFile(script, scriptBody, { mode: 0o700 })
  await chmod(script, 0o700)

  const label = `work.xsin.aibobby.update.${randomUUID()}`
  try {
    await execFileAsync('launchctl', [
      'submit',
      '-l',
      label,
      '--',
      '/bin/sh',
      script,
      String(process.pid),
      appBundle,
      newBundle,
    ])
  } catch {
    const child = spawn('/bin/sh', [script, String(process.pid), appBundle, newBundle], {
      detached: true,
      stdio: 'ignore',
    })
    child.unref()
  }

  setTimeout(() => app.quit(), 400)
  return { ok: true }
}

export async function installUpdate(): Promise<UpdateActionResult> {
  if (!pending) {
    return { ok: false, error: '没有已下载的更新包，请先下载' }
  }
  if (process.platform !== 'darwin') {
    return { ok: false, error: '当前版本仅支持 macOS 自动更新；Windows 请重新运行安装脚本' }
  }
  const { info, zipPath } = pending
  try {
    const result = await installOnMac(info, zipPath)
    if (!result.ok) pending = undefined
    return result
  } catch (error) {
    return { ok: false, error: `安装更新失败：${error instanceof Error ? error.message : String(error)}` }
  }
}

/** Test/CLI seam: verify a downloaded file against an expected digest. */
export async function verifyDownloadedFile(file: string, expected: string): Promise<boolean> {
  const digest = await sha256File(file)
  return digest.toLowerCase() === expected.toLowerCase()
}

