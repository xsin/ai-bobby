import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { createReadStream, createWriteStream } from 'node:fs'
import { chmod, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { Readable } from 'node:stream'
import { promisify } from 'node:util'
import { x as extract } from 'tar'

const exec = promisify(execFile)
const VERSION_RE = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/
const REGISTRIES = ['https://registry.npmjs.org', 'https://registry.npmmirror.com']

export interface RuntimePackage {
  name: string
  binary: string
}

export function runtimePackage(platform = process.platform, arch = process.arch): RuntimePackage {
  if (!['darwin', 'win32', 'linux'].includes(platform) || !['x64', 'arm64'].includes(arch)) {
    throw new Error(`不支持的 OpenCode 运行时平台：${platform}/${arch}`)
  }
  const os = platform === 'win32' ? 'windows' : platform
  return {
    name: `opencode-${os}-${arch}`,
    binary: platform === 'win32' ? 'opencode.exe' : 'opencode',
  }
}

export async function runtimeCandidates(pkg = runtimePackage()): Promise<string[]> {
  const home = homedir()
  return [
    process.env.AI_BOBBY_OPENCODE_PATH,
    join(home, '.opencode', 'bin', pkg.binary),
    '/opt/homebrew/bin/opencode',
    '/usr/local/bin/opencode',
  ].filter((value): value is string => typeof value === 'string' && value !== '')
}

async function versionOf(file: string): Promise<string | undefined> {
  try {
    const { stdout } = await exec(file, ['--version'], { timeout: 15_000, windowsHide: true })
    const version = stdout.trim()
    return VERSION_RE.test(version) ? version : undefined
  } catch {
    return undefined
  }
}

export async function findOrInstallRuntime(
  dataDir: string,
  options: { fetchImpl?: typeof fetch; log?: (message: string) => void } = {},
): Promise<string> {
  const pkg = runtimePackage()
  const root = join(dataDir, 'runtime')
  const log = options.log ?? (() => {})
  const fetchImpl = options.fetchImpl ?? fetch

  const managed = (await readdir(root, { withFileTypes: true }).catch(() => []))
    .filter(entry => entry.isDirectory() && VERSION_RE.test(entry.name))
    .sort((a, b) => b.name.localeCompare(a.name, 'en', { numeric: true }))
  for (const entry of managed) {
    const file = join(root, entry.name, pkg.binary)
    if ((await versionOf(file)) === entry.name) return file
  }

  let local: { file: string; version: string } | undefined
  for (const file of await runtimeCandidates(pkg)) {
    const version = await versionOf(file)
    if (version !== undefined) {
      local = { file, version }
      break
    }
  }

  let metadata: { version: string; tarball: string; integrity: string } | undefined
  const failures: string[] = []
  for (const registry of REGISTRIES) {
    try {
      const response = await fetchImpl(`${registry}/${pkg.name}/latest`, {
        signal: AbortSignal.timeout(30_000),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = (await response.json()) as Record<string, unknown>
      const dist = typeof data['dist'] === 'object' && data['dist'] !== null ? (data['dist'] as Record<string, unknown>) : {}
      const version = typeof data['version'] === 'string' ? data['version'] : ''
      const tarball = typeof dist['tarball'] === 'string' ? dist['tarball'] : ''
      const integrity = typeof dist['integrity'] === 'string' ? dist['integrity'] : ''
      if (data['name'] !== pkg.name || !VERSION_RE.test(version) || !integrity.startsWith('sha512-')) {
        throw new Error('返回的安装信息不可信')
      }
      if (!/^https:\/\/(registry\.npmjs\.org|registry\.npmmirror\.com)\//.test(tarball)) {
        throw new Error('tarball 来源不可信')
      }
      metadata = { version, tarball, integrity }
      break
    } catch (error) {
      failures.push(`${new URL(registry).hostname}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  if (metadata === undefined) {
    if (local) {
      log(`无法获取 OpenCode 最新版本，使用本机 ${local.version}`)
      return local.file
    }
    throw new Error(`无法获取 OpenCode 运行时（${failures.join('；')}）`)
  }
  if (local && local.version === metadata.version) return local.file

  const target = join(root, metadata.version, pkg.binary)
  if ((await versionOf(target)) === metadata.version) return target
  await mkdir(dirname(target), { recursive: true })
  const archive = join(dirname(target), 'download.tgz')
  let response: Response
  try {
    response = await fetchImpl(metadata.tarball, { signal: AbortSignal.timeout(180_000) })
    if (!response.ok || response.body === null) throw new Error(`HTTP ${response.status}`)
  } catch (error) {
    if (local) {
      log(`OpenCode 下载失败，使用本机 ${local.version}：${error instanceof Error ? error.message : String(error)}`)
      return local.file
    }
    throw error
  }
  await pipeline(Readable.fromWeb(response.body as never), createWriteStream(archive))
  const hash = createHash('sha512')
  for await (const chunk of createReadStream(archive)) hash.update(chunk as Buffer)
  if (`sha512-${hash.digest('base64')}` !== metadata.integrity) {
    await rm(archive, { force: true })
    throw new Error('OpenCode 下载完整性校验失败')
  }
  const staging = await mkdtempSafe(join(root, 'staging'))
  try {
    await extract({
      file: archive,
      cwd: staging,
      strip: 2,
      filter: path => path === `package/bin/${pkg.binary}`,
    })
    await chmod(join(staging, pkg.binary), 0o755)
    await mkdir(dirname(target), { recursive: true })
    await rm(target, { force: true })
    await import('node:fs/promises').then(fs => fs.rename(join(staging, pkg.binary), target))
  } finally {
    await rm(staging, { recursive: true, force: true })
    await rm(archive, { force: true })
  }
  const actual = await versionOf(target)
  if (actual !== metadata.version) throw new Error(`OpenCode 版本校验失败：${actual ?? '无输出'}`)
  log(`OpenCode ${metadata.version} 已安装到 ${target}`)
  return target
}

async function mkdtempSafe(parent: string): Promise<string> {
  await mkdir(parent, { recursive: true })
  const { mkdtemp } = await import('node:fs/promises')
  return mkdtemp(join(parent, 'extract-'))
}

export async function runtimeSize(dataDir: string): Promise<number> {
  try {
    return (await stat(join(dataDir, 'runtime'))).size
  } catch {
    return 0
  }
}
