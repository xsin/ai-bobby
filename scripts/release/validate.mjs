#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.argv[2]
if (!root) {
  console.error('usage: validate.mjs <version-dir>')
  process.exit(1)
}

const read = name => readFileSync(join(root, name), 'utf8')
const version = read('VERSION.txt').trim()
const manifest = JSON.parse(read('latest.json'))
const checksums = read('checksums.txt')

if (manifest.version !== version) {
  throw new Error(`latest.json version ${manifest.version} != VERSION.txt ${version}`)
}
const platforms = Object.entries(manifest.platforms || {})
if (platforms.length === 0) throw new Error('latest.json has no platforms')
for (const [key, asset] of platforms) {
  if (!/^(darwin-aarch64|darwin-x86_64|win32-x64)$/.test(key)) {
    throw new Error(`invalid platform key: ${key}`)
  }
  if (!asset.url.startsWith('https://')) throw new Error(`${key}: url must be https`)
  if (!/^[a-f0-9]{64}$/i.test(asset.sha256)) throw new Error(`${key}: sha256 must be 64 hex`)
  if (!(asset.size > 0)) throw new Error(`${key}: size must be positive`)
  if (!checksums.includes(asset.sha256)) throw new Error(`${key}: checksum missing from checksums.txt`)
}
console.log(`[validate] ${version}: ${platforms.map(([key]) => key).join(', ')}`)
