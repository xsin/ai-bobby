import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { Realm } from '@ai-bobby/core'
import type { WorkBuddyVariant } from './variants'

export interface WorkBuddyCredits {
  total: number
  packages: Array<{ name: string; remain: number; size: number; endTimeMs?: number }>
  fetchedAtMs: number
  /** CN enterprise cycle quota reported as uncapped. */
  unlimited?: true
}

export interface WorkBuddyAccount {
  uid: string
  nickname: string
  realm: Realm
  domain: string
  enterpriseId?: string
  accessToken: string
  refreshToken: string
  expiresAtMs: number
  enabled: boolean
  preferred?: boolean
  /** Drag order in the UI; lower runs first. */
  order?: number
  lastUsedAtMs?: number
  credits?: WorkBuddyCredits
}

interface AccountFile {
  version: 1
  accounts: WorkBuddyAccount[]
}

export interface AccountCodec {
  encode(text: string): string
  decode(text: string): string
}

export class AccountStore {
  constructor(
    private readonly file: string,
    private readonly codec?: AccountCodec,
  ) {}

  static inDataDir(dataDir: string, codec?: AccountCodec): AccountStore {
    return new AccountStore(join(dataDir, 'accounts.json'), codec)
  }

  path(): string {
    return this.file
  }

  async load(): Promise<WorkBuddyAccount[]> {
    try {
      const raw = await readFile(this.file, 'utf8')
      const text = this.codec ? this.codec.decode(raw) : raw
      const parsed = JSON.parse(text) as Partial<AccountFile>
      if (parsed.version !== 1 || !Array.isArray(parsed.accounts)) return []
      return parsed.accounts.filter(isAccount)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []
      throw error
    }
  }

  async save(accounts: readonly WorkBuddyAccount[]): Promise<void> {
    await mkdir(dirname(this.file), { recursive: true, mode: 0o700 })
    const tmp = `${this.file}.${process.pid}.tmp`
    const payload: AccountFile = { version: 1, accounts: [...accounts] }
    const text = `${JSON.stringify(payload, null, 2)}\n`
    await writeFile(tmp, this.codec ? this.codec.encode(text) : text, { mode: 0o600 })
    await rename(tmp, this.file)
  }

  async list(realm?: Realm): Promise<WorkBuddyAccount[]> {
    const accounts = await this.load()
    return realm === undefined ? accounts : accounts.filter(account => account.realm === realm)
  }

  async upsert(account: WorkBuddyAccount): Promise<WorkBuddyAccount> {
    const accounts = await this.load()
    const index = accounts.findIndex(item => item.realm === account.realm && item.uid === account.uid)
    if (index >= 0) accounts[index] = { ...accounts[index], ...account }
    else accounts.push(account)
    await this.save(accounts)
    return account
  }

  async remove(realm: Realm, uid: string): Promise<void> {
    const accounts = await this.load()
    await this.save(accounts.filter(account => !(account.realm === realm && account.uid === uid)))
  }

  async setEnabled(realm: Realm, uid: string, enabled: boolean): Promise<void> {
    const accounts = await this.load()
    const account = accounts.find(item => item.realm === realm && item.uid === uid)
    if (account === undefined) return
    account.enabled = enabled
    await this.save(accounts)
  }

  async reorder(realm: Realm, uids: readonly string[]): Promise<void> {
    const accounts = await this.load()
    const ordered = [...uids]
    let cursor = 0
    for (const account of accounts) {
      if (account.realm !== realm) continue
      const index = ordered.indexOf(account.uid)
      account.order = index === -1 ? cursor++ : index
      account.preferred = account.order === 0
    }
    await this.save(accounts)
  }

  async touch(realm: Realm, uid: string, at = Date.now()): Promise<void> {
    const accounts = await this.load()
    const account = accounts.find(item => item.realm === realm && item.uid === uid)
    if (account === undefined) return
    account.lastUsedAtMs = at
    await this.save(accounts)
  }
}

function isAccount(value: unknown): value is WorkBuddyAccount {
  if (typeof value !== 'object' || value === null) return false
  const account = value as Record<string, unknown>
  return (
    typeof account['uid'] === 'string' &&
    typeof account['realm'] === 'string' &&
    typeof account['accessToken'] === 'string' &&
    typeof account['refreshToken'] === 'string' &&
    typeof account['expiresAtMs'] === 'number'
  )
}

export function accountFromLogin(
  variant: WorkBuddyVariant,
  login: {
    uid: string
    nickname?: string
    domain?: string
    enterpriseId?: string
    accessToken: string
    refreshToken: string
    expiresAtMs: number
  },
): WorkBuddyAccount {
  return {
    uid: login.uid,
    nickname: login.nickname || login.uid.slice(0, 8),
    realm: variant.realm,
    domain: login.domain || new URL(variant.base).hostname,
    ...(login.enterpriseId === undefined ? {} : { enterpriseId: login.enterpriseId }),
    accessToken: login.accessToken,
    refreshToken: login.refreshToken,
    expiresAtMs: login.expiresAtMs,
    enabled: true,
  }
}
