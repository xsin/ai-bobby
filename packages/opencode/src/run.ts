import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'

export interface OpenCodeRunResult {
  text: string
  usage?: { input: number; output: number; reasoning: number; cacheRead: number; cacheWrite: number }
}

export async function runOpenCode(
  binary: string,
  dataDir: string,
  modelID: string,
  prompt: string,
  signal: AbortSignal,
): Promise<OpenCodeRunResult> {
  const root = join(dataDir, 'opencode-run')
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
  env['OPENCODE_DISABLE_AUTOUPDATE'] = 'true'
  env['OPENCODE_DISABLE_PROJECT_CONFIG'] = 'true'
  env['OPENCODE_CONFIG_CONTENT'] = JSON.stringify({ autoupdate: false, share: 'disabled' })

  const child = spawn(binary, ['run', '--pure', '--model', `opencode/${modelID}`, '--format', 'json', '--title', 'AI Bobby', prompt], {
    cwd: join(root, 'project'),
    env,
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  let stderr = ''
  child.stderr?.on('data', chunk => {
    stderr += String(chunk)
    if (stderr.length > 8000) stderr = stderr.slice(-8000)
  })
  let killed = false
  const abort = () => {
    killed = true
    child.kill('SIGTERM')
  }
  signal.addEventListener('abort', abort, { once: true })

  const result: OpenCodeRunResult = { text: '' }
  let buffer = ''
  try {
    await new Promise<void>((resolve, reject) => {
      child.stdout?.on('data', chunk => {
        buffer += String(chunk)
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (line.trim() === '') continue
          let event: unknown
          try {
            event = JSON.parse(line)
          } catch {
            continue
          }
          if (!isObject(event)) continue
          if (event['type'] === 'text' && isObject(event['part']) && typeof event['part']['text'] === 'string') {
            result.text += event['part']['text']
          } else if (event['type'] === 'step_finish' && isObject(event['part']) && isObject(event['part']['tokens'])) {
            const tokens = event['part']['tokens']
            const cache = isObject(tokens['cache']) ? tokens['cache'] : {}
            result.usage = {
              input: number(tokens['input']),
              output: number(tokens['output']),
              reasoning: number(tokens['reasoning']),
              cacheRead: number(cache['read']),
              cacheWrite: number(cache['write']),
            }
          } else if (event['type'] === 'error') {
            const message = isObject(event['error']) && typeof event['error']['message'] === 'string'
              ? event['error']['message']
              : isObject(event['part']) && typeof event['part']['text'] === 'string'
                ? event['part']['text']
                : 'OpenCode 运行失败'
            reject(new Error(message))
          }
        }
      })
      child.on('error', reject)
      child.on('exit', code => {
        if (killed) reject(new Error('OpenCode 请求已取消'))
        else if (code === 0) resolve()
        else reject(new Error(`OpenCode 退出码 ${code}${stderr === '' ? '' : `：${stderr.trim().slice(-500)}`}`))
      })
    })
  } finally {
    signal.removeEventListener('abort', abort)
    if (child.exitCode === null) child.kill('SIGKILL')
  }
  if (result.text.trim() === '') throw new Error('OpenCode 没有返回文本')
  return result
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function number(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}
