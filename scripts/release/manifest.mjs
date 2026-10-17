#!/usr/bin/env node
import { createHash, createPrivateKey, sign } from 'node:crypto'
import { existsSync } from 'node:fs'
import { readFile, stat, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'

function arg(name, fallback) {
  const index = process.argv.indexOf(`--${name}`)
  return index >= 0 ? process.argv[index + 1] : fallback
}

const version = arg('version')
const arch = arg('arch')
const outDir = arg('out-dir')
const baseUrl = arg('base-url', `https://github.com/xsin/ai-bobby/releases/download/v${version}`).replace(/\/+$/, '')
const zip = arg('zip')
const notes = process.env.AI_BOBBY_RELEASE_NOTES || `AI Bobby ${version} 更新`

if (!version || !arch || !outDir || !zip) {
  console.error('usage: manifest.mjs --version <v> --arch <arm64|x64> --out-dir <dir> --zip <file>')
  process.exit(1)
}

const platformMap = { arm64: 'darwin-aarch64', x64: 'darwin-x86_64' }
const platform = platformMap[arch]
if (!platform) {
  console.error(`unsupported arch: ${arch}`)
  process.exit(1)
}

const digest = createHash('sha256').update(await readFile(zip)).digest('hex')
const size = (await stat(zip)).size
const filename = basename(zip)
const manifestPath = join(outDir, 'latest.json')
const existing = existsSync(manifestPath)
  ? JSON.parse(await readFile(manifestPath, 'utf8'))
  : { platforms: {} }

const manifest = {
  version,
  notes,
  pub_date: new Date().toISOString(),
  platforms: {
    ...(existing.platforms || {}),
    [platform]: {
      url: `${baseUrl}/${filename}`,
      sha256: digest,
      size,
    },
  },
}

const signingKey = process.env.UPDATE_SIGNING_KEY
if (signingKey) {
  const privateKey = createPrivateKey({
    key: Buffer.from(signingKey, 'base64'),
    format: 'der',
    type: 'pkcs8',
  })
  const { signature: _ignored, ...rest } = manifest
  const payload = stableStringify(rest)
  manifest.signature = sign(null, Buffer.from(payload, 'utf8'), privateKey).toString('base64')
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`[manifest] ${platform} -> ${manifest.platforms[platform].url}`)

function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`
  const record = value
  const keys = Object.keys(record).sort()
  return `{${keys.map(key => `${JSON.stringify(key)}:${stableStringify(record[key])}`).join(',')}}`
}
