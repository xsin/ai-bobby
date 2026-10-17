import { spawn, type ChildProcess } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { createServer } from 'node:net'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'

export interface OpenCodeServer {
  base: string
  password: string
  request<T>(route: string, method?: string, body?: unknown, signal?: AbortSignal): Promise<T>
  stop(): Promise<void>
  version: string
}

export async function startOpenCodeServer(binary: string, dataDir: string): Promise<OpenCodeServer> {
  const root = join(dataDir, 'opencode')
  for (const dir of ['config', 'data', 'cache', 'state', 'project']) {
    await mkdir(join(root, dir), { recursive: true, mode: 0o700 })
  }
  const env: NodeJS.ProcessEnv = {}
  for (const key of ['PATH', 'HOME', 'USER', 'LANG', 'TMPDIR', 'SHELL', 'SSL_CERT_FILE', 'NODE_EXTRA_CA_CERTS', 'SystemRoot', 'WINDIR', 'TEMP', 'TMP', 'USERPROFILE', 'APPDATA', 'LOCALAPPDATA', 'PATHEXT', 'COMSPEC']) {
    if (process.env[key] !== undefined) env[key] = process.env[key]
  }
  for (const name of ['config', 'data', 'cache', 'state']) {
    env[`XDG_${name.toUpperCase()}_HOME`] = join(root, name)
  }
  const password = randomBytes(24).toString('hex')
  Object.assign(env, {
    OPENCODE_SERVER_PASSWORD: password,
    OPENCODE_SERVER_USERNAME: 'opencode',
    OPENCODE_CLIENT: process.env.AI_BOBBY_OC_CLIENT || 'cli',
    OPENCODE_DISABLE_AUTOUPDATE: 'true',
    OPENCODE_DISABLE_PROJECT_CONFIG: 'true',
    OPENCODE_DISABLE_CLAUDE_CODE: 'true',
    OPENCODE_DISABLE_EXTERNAL_SKILLS: 'true',
    ...(process.env.AI_BOBBY_OPENCODE_CONFIG === '0' ? {} : { OPENCODE_CONFIG_CONTENT: JSON.stringify({
      autoupdate: false,
      share: 'disabled',
      permission: { '*': 'deny' },
      agent: {
        'ai-bobby': {
          mode: 'primary',
          description: 'AI Bobby external adapter',
          prompt: 'You are the reasoning component of an external assistant. Never invoke native tools; return the requested JSON envelope.',
          permission: { '*': 'deny' },
        },
      },
    }) }),
  })
  const port = await freePort()
  const debug = process.env.AI_BOBBY_OPENCODE_DEBUG === '1'
  const args = ['serve', '--pure', '--hostname', '127.0.0.1', '--port', String(port)]
  if (debug) args.push('--print-logs', '--log-level', 'DEBUG')
  const child = spawn(binary, args, {
    cwd: join(root, 'project'),
    env,
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  const base = `http://127.0.0.1:${port}`
  const auth = `Basic ${Buffer.from(`opencode:${password}`).toString('base64')}`
  const request = async <T>(route: string, method = 'GET', body?: unknown, signal?: AbortSignal): Promise<T> => {
    const response = await fetch(`${base}${route}`, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: auth, 'x-opencode-client': 'cli' },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      ...(signal === undefined ? {} : { signal }),
    })
    const text = await response.text()
    if (!response.ok) throw new Error(`OpenCode HTTP ${response.status}: ${text.slice(0, 400)}`)
    try {
      return JSON.parse(text) as T
    } catch {
      throw new Error(`OpenCode 返回非 JSON：${text.slice(0, 200)}`)
    }
  }
  if (process.env.AI_BOBBY_OPENCODE_DEBUG === '1') {
    child.stdout?.on('data', chunk => process.stderr.write(chunk))
    child.stderr?.on('data', chunk => process.stderr.write(chunk))
  } else {
    child.stdout?.resume()
    child.stderr?.resume()
  }
  let failure: Error | undefined
  child.on('error', error => {
    failure = error
  })
  let version = ''
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (failure) throw failure
    if (child.exitCode !== null) throw new Error(`OpenCode 提前退出：${child.exitCode}`)
    try {
      const health = await request<{ healthy?: boolean; version?: string }>('/global/health', 'GET', undefined, AbortSignal.timeout(1000))
      if (health.healthy === true) {
        version = health.version ?? ''
        break
      }
    } catch {
      // keep waiting
    }
    await delay(500)
  }
  if (version === '') {
    child.kill('SIGKILL')
    throw new Error('OpenCode 启动超时')
  }
  return {
    base,
    password,
    request,
    version,
    async stop() {
      if (child.exitCode !== null) return
      child.kill('SIGTERM')
      await Promise.race([new Promise(resolve => child.once('exit', resolve)), delay(4000)])
      if (child.exitCode === null) child.kill('SIGKILL')
    },
  }
}

function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer()
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      const port = typeof address === 'object' && address !== null ? address.port : 0
      server.close(() => resolve(port))
    })
  })
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
