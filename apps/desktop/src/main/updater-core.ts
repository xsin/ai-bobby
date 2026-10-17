import { createHash, createPublicKey, verify as verifySignature } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { z } from 'zod'
import type { UpdateAsset, UpdateManifest } from '../shared/api'

export const UPDATE_MANIFEST_URL =
  'https://xsin.github.io/ai-bobby/releases/latest/latest.json'

/**
 * Ed25519 public key (base64, SPKI DER) used to verify the optional
 * `signature` field of latest.json. It is intentionally empty until a release
 * signing key is provisioned; SHA256 remains the baseline integrity check.
 */
export const UPDATE_PUBLIC_KEY = ''

const assetSchema = z.object({
  url: z.string().url().refine(value => value.startsWith('https://'), '更新包 URL 必须使用 HTTPS'),
  sha256: z.string().regex(/^[a-f0-9]{64}$/i),
  size: z.number().int().nonnegative().optional(),
})

const manifestSchema = z.object({
  version: z.string().min(1),
  notes: z.string().optional(),
  pub_date: z.string().optional(),
  platforms: z.record(z.string(), assetSchema),
  signature: z.string().optional(),
})

export type UpdateErrorCode =
  | 'invalid_manifest'
  | 'unsupported_platform'
  | 'checksum_mismatch'
  | 'signature_invalid'
  | 'download_failed'
  | 'install_failed'

export class UpdateError extends Error {
  constructor(
    readonly code: UpdateErrorCode,
    message: string,
  ) {
    super(message)
    this.name = 'UpdateError'
  }
}

export type PlatformKey = 'darwin-aarch64' | 'darwin-x86_64' | 'win32-x64'

export function platformKey(
  platform: NodeJS.Platform = process.platform,
  arch: string = process.arch,
): PlatformKey | undefined {
  if (platform === 'darwin') {
    if (arch === 'arm64') return 'darwin-aarch64'
    if (arch === 'x64') return 'darwin-x86_64'
    return undefined
  }
  if (platform === 'win32' && arch === 'x64') return 'win32-x64'
  return undefined
}

export function parseManifest(input: unknown): UpdateManifest {
  const parsed = manifestSchema.safeParse(input)
  if (!parsed.success) {
    throw new UpdateError('invalid_manifest', '更新清单格式不合法')
  }
  return parsed.data
}

/** Deterministic JSON so the CI and the client sign/verify the same bytes. */
export function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`
  const record = value as Record<string, unknown>
  const keys = Object.keys(record).sort()
  return `{${keys.map(key => `${JSON.stringify(key)}:${stableStringify(record[key])}`).join(',')}}`
}

export function canonicalManifestPayload(manifest: UpdateManifest): string {
  const { signature: _signature, ...rest } = manifest
  return stableStringify(rest)
}

/**
 * Verify an optional Ed25519 signature over the canonical manifest payload.
 * Returns true when there is no signature/public key configured (baseline mode).
 */
export function verifyManifestSignature(
  manifest: UpdateManifest,
  publicKeyBase64: string = UPDATE_PUBLIC_KEY,
): boolean {
  if (!manifest.signature) return true
  if (!publicKeyBase64) return false
  try {
    const key = createPublicKey({
      key: Buffer.from(publicKeyBase64, 'base64'),
      format: 'der',
      type: 'spki',
    })
    const signature = Buffer.from(manifest.signature, 'base64')
    return verifySignature(
      null,
      Buffer.from(canonicalManifestPayload(manifest), 'utf8'),
      key,
      signature,
    )
  } catch {
    return false
  }
}

export function compareVersions(a: string, b: string): number {
  const pa = parseVersion(a)
  const pb = parseVersion(b)
  for (let i = 0; i < 3; i += 1) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0)
    if (diff !== 0) return diff < 0 ? -1 : 1
  }
  return 0
}

function parseVersion(value: string): [number, number, number] {
  const core = value.trim().replace(/^v/i, '').split(/[+-]/)[0] ?? '0'
  const parts = core.split('.').map(part => Number.parseInt(part, 10))
  if (parts.some(Number.isNaN)) {
    throw new UpdateError('invalid_manifest', `无法解析版本号：${value}`)
  }
  return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0]
}

export function pickAsset(
  manifest: UpdateManifest,
  platform: PlatformKey | undefined = platformKey(),
): UpdateAsset {
  if (!platform) {
    throw new UpdateError('unsupported_platform', `不支持的平台：${process.platform}/${process.arch}`)
  }
  const asset = manifest.platforms[platform]
  if (!asset) {
    throw new UpdateError('unsupported_platform', `更新清单中没有 ${platform} 的产物`)
  }
  return asset
}

export async function sha256File(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256')
    const stream = createReadStream(file)
    stream.on('error', reject)
    stream.on('data', chunk => hash.update(chunk))
    stream.on('end', () => resolve(hash.digest('hex')))
  })
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '未知大小'
  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let index = 0
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024
    index += 1
  }
  return `${value >= 10 || index === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[index]}`
}
