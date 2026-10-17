#!/usr/bin/env node
import { chmod, mkdir, readFile, writeFile } from 'node:fs/promises'
import { randomBytes } from 'node:crypto'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { ModelRegistry, createLogger, redact, type ProviderAdapter, type ProviderId } from '@ai-bobby/core'
import { GatewayService } from '@ai-bobby/gateway'
import { AccountStore, WORKBUDDY_VARIANTS, WorkBuddyProvider } from '@ai-bobby/workbuddy'

const VERSION = '0.1.0'

function dataDir(): string {
  return process.env.AI_BOBBY_DATA_DIR?.trim() || join(homedir(), '.ai-bobby')
}

async function apiKey(): Promise<string> {
  const dir = dataDir()
  const file = join(dir, 'api-key')
  await mkdir(dir, { recursive: true, mode: 0o700 })
  try {
    const existing = (await readFile(file, 'utf8')).trim()
    if (existing !== '') return existing
  } catch {
    // Create below.
  }
  const key = `sk-ai-bobby-${randomBytes(24).toString('base64url')}`
  await writeFile(file, `${key}\n`, { mode: 0o600 })
  await chmod(file, 0o600)
  return key
}

function accountStore(): AccountStore {
  const override = process.env.AI_BOBBY_ACCOUNTS_FILE?.trim()
  return new AccountStore(override || join(dataDir(), 'accounts.json'))
}

async function buildProviders() {
  const store = accountStore()
  const registry = new ModelRegistry()
  const adapters = new Map<ProviderId, ProviderAdapter>()
  for (const variant of WORKBUDDY_VARIANTS) {
    const provider = new WorkBuddyProvider({ variant, store })
    await provider.refreshModels()
    registry.replace(variant.id, provider.listModels())
    adapters.set(variant.id, provider)
  }
  return { store, registry, adapters }
}

async function serve(): Promise<void> {
  const logger = createLogger((process.env.AI_BOBBY_LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error') || 'info')
  const { store, registry, adapters } = await buildProviders()
  const key = await apiKey()
  const portIndex = process.argv.indexOf('--port')
  const portArg = portIndex >= 0 ? Number(process.argv[portIndex + 1]) : undefined
  const port = Number(process.env.AI_BOBBY_PORT ?? portArg ?? 46890)
  const gateway = new GatewayService({
    registry,
    adapters,
    apiKey: key,
    port: Number.isFinite(port) && port > 0 ? port : 46890,
    version: VERSION,
    logger,
  })
  const actual = await gateway.start()
  const accounts = await store.load()
  process.stdout.write(
    [
      `AI Bobby ${VERSION}`,
      `endpoint: http://127.0.0.1:${actual}/v1`,
      `api key: ${key.slice(0, 12)}… (${join(dataDir(), 'api-key')})`,
      `accounts: ${accounts.length}`,
      `models: ${registry.list().length}`,
      '',
    ].join('\n'),
  )
  const shutdown = async () => {
    await gateway.stop()
    process.exit(0)
  }
  process.once('SIGINT', () => void shutdown())
  process.once('SIGTERM', () => void shutdown())
}

async function status(): Promise<void> {
  const { store, registry } = await buildProviders()
  const accounts = await store.load()
  process.stdout.write(
    `${JSON.stringify(
      redact({
        version: VERSION,
        dataDir: dataDir(),
        accounts: accounts.map(account => ({
          uid: account.uid,
          nickname: account.nickname,
          realm: account.realm,
          enabled: account.enabled,
          expiresAtMs: account.expiresAtMs,
        })),
        models: registry.list().map(model => ({
          id: model.id,
          name: model.displayName,
          status: model.status,
          accounts: model.accounts,
        })),
      }),
      null,
      2,
    )}\n`,
  )
}

const command = process.argv[2] ?? 'serve'
if (command === 'serve') await serve()
else if (command === 'status') await status()
else {
  process.stderr.write(`usage: ai-bobby <serve|status> [--port <n>]\n`)
  process.exit(1)
}
