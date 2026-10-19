import { mkdir, readFile, rename, writeFile, chmod } from 'node:fs/promises'
import { dirname, join } from 'node:path'

export type ProxyMode = 'off' | 'system' | 'custom'
export type ProxySource = 'nvidia' | 'workbuddy' | 'workbuddy-ai'
export type LocaleChoice = 'system' | 'zh' | 'en'

export interface NvidiaProbeSnapshot {
  status: 'available' | 'unavailable' | 'pending'
  latencyMs?: number
  checkedAtMs?: number
  error?: string
}

export interface AppSettings {
  nvidiaApiKey: string
  nvidiaProbes: Record<string, NvidiaProbeSnapshot>
  proxy: {
    mode: ProxyMode
    url: string
    sources: Record<ProxySource, boolean>
  }
  locale: LocaleChoice
}

export function defaultSettings(): AppSettings {
  return {
    nvidiaApiKey: '',
    nvidiaProbes: {},
    proxy: {
      mode: 'custom',
      url: 'http://127.0.0.1:10080',
      sources: { nvidia: true, workbuddy: false, 'workbuddy-ai': true },
    },
    locale: 'system',
  }
}

function normalize(value: unknown): AppSettings {
  const base = defaultSettings()
  if (value === null || typeof value !== 'object') return base
  const input = value as Partial<AppSettings>
  const proxy = (input.proxy ?? {}) as Partial<AppSettings['proxy']>
  return {
    nvidiaApiKey: typeof input.nvidiaApiKey === 'string' ? input.nvidiaApiKey : base.nvidiaApiKey,
    nvidiaProbes: typeof input.nvidiaProbes === 'object' && input.nvidiaProbes !== null ? input.nvidiaProbes : base.nvidiaProbes,
    proxy: {
      mode: proxy.mode === 'off' || proxy.mode === 'system' || proxy.mode === 'custom' ? proxy.mode : base.proxy.mode,
      url: typeof proxy.url === 'string' && proxy.url !== '' ? proxy.url : base.proxy.url,
      sources: {
        nvidia: proxy.sources?.nvidia ?? base.proxy.sources.nvidia,
        workbuddy: proxy.sources?.workbuddy ?? base.proxy.sources.workbuddy,
        'workbuddy-ai': proxy.sources?.['workbuddy-ai'] ?? base.proxy.sources['workbuddy-ai'],
      },
    },
    locale: input.locale === 'zh' || input.locale === 'en' || input.locale === 'system' ? input.locale : base.locale,
  }
}

export class SettingsStore {
  private readonly file: string

  constructor(dataDir: string) {
    this.file = join(dataDir, 'settings.json')
  }

  async load(): Promise<AppSettings> {
    try {
      return normalize(JSON.parse(await readFile(this.file, 'utf8')))
    } catch {
      return defaultSettings()
    }
  }

  async save(settings: AppSettings): Promise<void> {
    await mkdir(dirname(this.file), { recursive: true })
    const temp = `${this.file}.tmp`
    await writeFile(temp, `${JSON.stringify(normalize(settings), null, 2)}\n`, { mode: 0o600 })
    await chmod(temp, 0o600)
    await rename(temp, this.file)
  }
}
