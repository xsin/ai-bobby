import { generateKeyPairSync, sign as signPayload } from 'node:crypto'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  UpdateError,
  canonicalManifestPayload,
  compareVersions,
  formatBytes,
  parseManifest,
  pickAsset,
  platformKey,
  sha256File,
  stableStringify,
  verifyManifestSignature,
} from './updater-core'
import type { UpdateManifest } from '../shared/api'

const validManifest: UpdateManifest = {
  version: '0.2.0',
  notes: 'test',
  pub_date: '2026-10-18T00:00:00Z',
  platforms: {
    'darwin-aarch64': {
      url: 'https://example.com/AI-Bobby-0.2.0-arm64.zip',
      sha256: 'a'.repeat(64),
      size: 1024,
    },
  },
}

describe('version comparison', () => {
  it('compares numerically, not lexicographically', () => {
    expect(compareVersions('0.10.0', '0.9.0')).toBe(1)
    expect(compareVersions('0.9.0', '0.10.0')).toBe(-1)
    expect(compareVersions('1.2.3', '1.2.3')).toBe(0)
    expect(compareVersions('v1.2.3', '1.2.2')).toBe(1)
  })

  it('ignores prerelease suffixes for ordering', () => {
    expect(compareVersions('1.2.3-beta.1', '1.2.3')).toBe(0)
  })
})

describe('platform mapping', () => {
  it('maps Electron platforms to manifest keys', () => {
    expect(platformKey('darwin', 'arm64')).toBe('darwin-aarch64')
    expect(platformKey('darwin', 'x64')).toBe('darwin-x86_64')
    expect(platformKey('win32', 'x64')).toBe('win32-x64')
    expect(platformKey('linux', 'x64')).toBeUndefined()
  })

  it('throws for unsupported platforms', () => {
    expect(() => pickAsset(validManifest, 'win32-x64')).toThrow(UpdateError)
  })
})

describe('manifest', () => {
  it('parses a valid manifest', () => {
    expect(parseManifest(validManifest)).toEqual(validManifest)
  })

  it('rejects a manifest without platforms', () => {
    expect(() => parseManifest({ version: '0.2.0' })).toThrow(UpdateError)
  })

  it('rejects a non-https asset URL', () => {
    expect(() =>
      parseManifest({
        ...validManifest,
        platforms: {
          'darwin-aarch64': { ...validManifest.platforms['darwin-aarch64'], url: 'file:///tmp/x.zip' },
        },
      }),
    ).toThrow(UpdateError)
  })

  it('produces deterministic JSON without the signature', () => {
    const a = stableStringify({ b: 1, a: { d: 2, c: 3 } })
    const b = stableStringify({ a: { c: 3, d: 2 }, b: 1 })
    expect(a).toBe(b)
    expect(canonicalManifestPayload({ ...validManifest, signature: 'ignored' })).not.toContain('signature')
  })
})

describe('sha256', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
    dir = undefined
  })

  it('hashes file contents', async () => {
    dir = await mkdtemp(join(tmpdir(), 'ai-bobby-updater-'))
    const file = join(dir, 'payload.bin')
    await writeFile(file, 'AI Bobby')
    expect(await sha256File(file)).toBe(
      'd44ba9c96591e690e86fdd534fc447c3de40b0e50ffc991b5c52626cba780075',
    )
  })
})

describe('ed25519 signature', () => {
  it('verifies a signed canonical manifest and rejects tampering', () => {
    const { publicKey, privateKey } = generateKeyPairSync('ed25519')
    const publicDer = publicKey.export({ format: 'der', type: 'spki' })
    const publicBase64 = publicDer.toString('base64')
    const payload = Buffer.from(canonicalManifestPayload(validManifest), 'utf8')
    const signature = signPayload(null, payload, privateKey).toString('base64')
    const signed = { ...validManifest, signature }

    expect(verifyManifestSignature(signed, publicBase64)).toBe(true)
    expect(verifyManifestSignature({ ...signed, version: '9.9.9' }, publicBase64)).toBe(false)
    expect(verifyManifestSignature(signed, '')).toBe(false)
  })

  it('accepts an unsigned manifest in baseline mode', () => {
    expect(verifyManifestSignature(validManifest, '')).toBe(true)
  })
})

describe('formatting', () => {
  it('formats bytes for humans', () => {
    expect(formatBytes(0)).toBe('未知大小')
    expect(formatBytes(1024)).toBe('1.0 KB')
    expect(formatBytes(18_400_000)).toBe('18 MB')
  })
})
