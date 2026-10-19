import { constants } from 'node:fs'
import { access, copyFile, mkdir, open, readFile, readdir, rename, rm, stat, utimes, writeFile } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'
import type { ImportPlan, ImportTarget } from './types'

export function normalizeEndpoint(endpoint: string): string {
  return endpoint.replace(/\/+$/, '')
}

export async function exists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

export async function readText(path: string): Promise<string | undefined> {
  try {
    return await readFile(path, 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined
    throw error
  }
}

export async function withLock<T>(path: string, fn: () => Promise<T>): Promise<T> {
  const lock = `${path}.ai-bobby.lock`
  await mkdir(dirname(path), { recursive: true })
  let handle
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      handle = await open(lock, 'wx', 0o600)
      break
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error
      const age = await stat(lock).then(info => Date.now() - info.mtimeMs).catch(() => 0)
      if (age > 5 * 60_000) await rm(lock, { force: true })
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  if (!handle) throw new Error(`无法获取配置锁：${lock}`)
  try {
    return await fn()
  } finally {
    await handle.close()
    await rm(lock, { force: true })
  }
}

const BASELINE_SUFFIX = '.ai-bobby-baseline.bak'

export function baselineBackupPath(path: string): string {
  return `${path}${BASELINE_SUFFIX}`
}

/**
 * Snapshot a target before a write. Per target we keep one immutable baseline
 * (the file as it was before AI Bobby first touched it) plus the newest five
 * rolling backups, so the upper bound is six files.
 */
export async function backup(path: string): Promise<string | undefined> {
  if (!(await exists(path))) return undefined
  const dir = dirname(path)
  const base = `${basename(path)}.ai-bobby-`
  const baseline = baselineBackupPath(path)
  if (!(await exists(baseline))) {
    // Seed the baseline from the oldest rolling backup when upgrading an
    // existing install, so it still describes the pre-AI-Bobby file.
    const existing = (await readdir(dir))
      .filter(name => name.startsWith(base) && name.endsWith('.bak') && name !== basename(baseline))
      .sort()
    const seed = existing[0]
    const source = seed === undefined ? path : join(dir, seed)
    await copyFile(source, baseline)
    // Keep the snapshot's original timestamp so "baseline" shows when that
    // pre-AI-Bobby file was actually written, not when we copied it.
    const sourceInfo = await stat(source).catch(() => undefined)
    if (sourceInfo !== undefined) await utimes(baseline, sourceInfo.atime, sourceInfo.mtime).catch(() => undefined)
  }
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const target = `${path}.ai-bobby-${stamp}.bak`
  await copyFile(path, target)
  const entries = (await readdir(dir))
    .filter(name => name.startsWith(base) && name.endsWith('.bak') && name !== basename(baseline))
    .sort()
  for (const stale of entries.slice(0, Math.max(0, entries.length - 5))) {
    await rm(join(dir, stale), { force: true })
  }
  return target
}

export async function latestBackup(path: string): Promise<string | undefined> {
  const dir = dirname(path)
  const base = `${basename(path)}.ai-bobby-`
  const baselineName = `${basename(path)}${BASELINE_SUFFIX}`
  try {
    const entries = (await readdir(dir))
      .filter(name => name.startsWith(base) && name.endsWith('.bak') && name !== baselineName)
      .sort()
    const last = entries.at(-1)
    return last === undefined ? undefined : join(dir, last)
  } catch {
    return undefined
  }
}

export async function atomicWrite(path: string, content: string, mode = 0o600): Promise<void> {
  await mkdir(dirname(path), { recursive: true, mode: 0o700 })
  const tmp = `${path}.${process.pid}.${Date.now()}.tmp`
  await writeFile(tmp, content, { mode })
  await rename(tmp, path)
}

export function diffText(before: string | undefined, after: string): string {
  if (before === after) return ''
  const beforeLines = (before ?? '').split('\n')
  const afterLines = after.split('\n')
  const beforeSet = new Map<string, number>()
  for (const line of beforeLines) beforeSet.set(line, (beforeSet.get(line) ?? 0) + 1)
  const afterSet = new Map<string, number>()
  for (const line of afterLines) afterSet.set(line, (afterSet.get(line) ?? 0) + 1)
  const removed = beforeLines.filter(line => (afterSet.get(line) ?? 0) === 0 && line !== '')
  const added = afterLines.filter(line => (beforeSet.get(line) ?? 0) === 0 && line !== '')
  return [
    ...removed.slice(0, 40).map(line => `- ${line}`),
    ...added.slice(0, 60).map(line => `+ ${line}`),
  ].join('\n')
}

export function planFor(
  target: ImportTarget,
  path: string,
  detected: boolean,
  before: string | undefined,
  after: string,
  warnings: string[],
  requiresRestart: boolean,
  backupPath?: string,
): ImportPlan {
  return {
    target,
    path,
    detected,
    changed: before !== after,
    diff: diffText(before, after),
    warnings,
    requiresRestart,
    ...(backupPath === undefined ? {} : { backupPath }),
  }
}

export function safeJsonParse(text: string | undefined, fallback: unknown): unknown {
  if (text === undefined || text.trim() === '') return fallback
  return JSON.parse(text)
}
