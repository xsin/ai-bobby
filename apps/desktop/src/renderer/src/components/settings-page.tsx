import { Check, ExternalLink, Monitor, Moon, RefreshCw, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/theme'
import type { AppInfo, DesktopSettings, GatewayStatus, ThemeChoice } from '@shared/api'

interface SettingsPageProps {
  appInfo: AppInfo | null
  status: GatewayStatus | null
  autoCheck: boolean
  onAutoCheckChange: (value: boolean) => void
  checking: boolean
  lastMessage?: string
  onCheckUpdates: () => void
  onOpenUpdateSource: () => void
  onCopyKey: () => void
  onCopyEndpoint: () => void
  onOpenAbout: () => void
  settings: DesktopSettings | null
  onUpdateProxy: (proxy: DesktopSettings['proxy']) => void
  onUpdateLocale: (locale: DesktopSettings['locale']) => void
  onEditNvidiaKey: () => void
}

const THEMES: Array<{ id: ThemeChoice; label: string; icon: typeof Sun }> = [
  { id: 'system', label: '系统', icon: Monitor },
  { id: 'light', label: '浅色', icon: Sun },
  { id: 'dark', label: '深色', icon: Moon },
]

export function SettingsPage({
  appInfo,
  status,
  autoCheck,
  onAutoCheckChange,
  checking,
  lastMessage,
  onCheckUpdates,
  onOpenUpdateSource,
  onCopyKey,
  onCopyEndpoint,
  onOpenAbout,
  settings,
  onUpdateProxy,
  onUpdateLocale,
  onEditNvidiaKey,
}: SettingsPageProps) {
  const { choice, setChoice } = useTheme()
  return (
    <main className="min-h-0 flex-1 overflow-auto px-6 py-5">
      <div className="border-b border-line pb-4">
        <div className="font-mono text-[9px] font-semibold tracking-[0.1em] text-faint">PREFERENCES</div>
        <h1 className="mt-1 text-[25px] font-semibold leading-tight tracking-[-0.035em] text-text">设置</h1>
        <p className="mt-1.5 max-w-[620px] text-[12px] text-muted-foreground">外观、本地网关、更新与关于都集中在这页；所有设置只作用于本机。</p>
      </div>

      <section className="mt-4 overflow-hidden rounded-lg border border-line-soft bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft px-4 py-3.5">
          <div>
            <h2 className="text-[12px] font-semibold text-text">外观</h2>
            <p className="mt-0.5 text-[10px] text-muted-foreground">主题只影响本机控制面板，不影响网关行为。</p>
          </div>
          <div className="flex gap-1.5">
            {THEMES.map(theme => {
              const Icon = theme.icon
              const active = choice === theme.id
              return (
                <Button
                  key={theme.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setChoice(theme.id)}
                  className={cn('gap-1.5', active && 'border-primary/40 bg-accent-soft text-text')}
                >
                  <Icon className="size-3.5" />
                  {theme.label}
                  {active ? <Check className="size-3 text-primary" /> : null}
                </Button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft px-4 py-3.5">
          <div>
            <h2 className="text-[12px] font-semibold text-text">界面语言</h2>
            <p className="mt-0.5 text-[10px] text-muted-foreground">默认跟随系统；切换后立即生效，只影响本机界面。</p>
          </div>
          <div className="flex gap-1.5">
            {([
              ['system', '跟随系统'],
              ['zh', '简体中文'],
              ['en', 'English'],
            ] as const).map(([id, label]) => (
              <Button
                key={id}
                type="button"
                variant="outline"
                size="sm"
                className={cn(settings?.locale === id && 'border-primary/40 bg-accent-soft text-text')}
                onClick={() => onUpdateLocale(id)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line-soft px-4 py-3.5">
          <div>
            <h2 className="text-[12px] font-semibold text-text">网络代理</h2>
            <p className="mt-0.5 text-[10px] text-muted-foreground">只影响 AI Bobby 发起的上游请求，按模型源分别启用。</p>
          </div>
          <div className="flex w-[360px] flex-col gap-2">
            <div className="flex gap-2">
              <select
                value={settings?.proxy.mode ?? 'custom'}
                onChange={event => settings && onUpdateProxy({ ...settings.proxy, mode: event.target.value as DesktopSettings['proxy']['mode'] })}
                className="h-8 rounded-md border border-line bg-surface px-2 font-mono text-[10px] text-text"
                aria-label="代理模式"
              >
                <option value="off">关闭</option>
                <option value="system">跟随系统</option>
                <option value="custom">自定义</option>
              </select>
              <input
                value={settings?.proxy.url ?? 'http://127.0.0.1:10080'}
                disabled={settings?.proxy.mode !== 'custom'}
                onChange={event => settings && onUpdateProxy({ ...settings.proxy, url: event.target.value })}
                aria-label="代理地址"
                className="h-8 min-w-0 flex-1 rounded-md border border-line bg-surface px-2 font-mono text-[10px] text-text disabled:opacity-50"
              />
            </div>
            <div className="flex flex-wrap gap-3 text-[10px] text-muted-foreground">
              {([
                ['nvidia', 'NVIDIA NIM'],
                ['workbuddy', 'WorkBuddy'],
                ['workbuddy-ai', 'WorkBuddy AI'],
              ] as const).map(([id, label]) => (
                <label key={id} className="flex items-center gap-1.5">
                  <Checkbox
                    checked={settings?.proxy.sources[id] ?? false}
                    onCheckedChange={checked => settings && onUpdateProxy({ ...settings.proxy, sources: { ...settings.proxy.sources, [id]: checked === true } })}
                  />
                  {label}
                </label>
              ))}
            </div>
            <p className="text-[9px] leading-relaxed text-faint">OpenCode 运行时由子进程联网，不受此设置影响；国内来源通常不需要代理。</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft px-4 py-3.5">
          <div>
            <h2 className="text-[12px] font-semibold text-text">NVIDIA NIM</h2>
            <p className="mt-0.5 text-[10px] text-muted-foreground">免费试用 Key 只保存在本机；检测会真实发起一次最小对话。</p>
          </div>
          <div className="flex items-center gap-2">
            <code className="font-mono text-[10px] text-muted-foreground">
              {settings?.nvidiaApiKey ? `nvapi-…${settings.nvidiaApiKey.slice(-4)}` : '未配置'}
            </code>
            <Button type="button" variant="outline" size="sm" onClick={onEditNvidiaKey}>更新 Key</Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft px-4 py-3.5">
          <div>
            <h2 className="text-[12px] font-semibold text-text">本地网关</h2>
            <p className="mt-0.5 text-[10px] text-muted-foreground">只监听回环地址，浏览器请求默认拒绝。</p>
          </div>
          <div className="flex items-center gap-2">
            <code className="max-w-[300px] truncate font-mono text-[10px] text-muted-foreground">http://127.0.0.1:{status?.gateway.port ?? 46890}/v1</code>
            <Button type="button" variant="outline" size="sm" onClick={onCopyEndpoint}>复制</Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft px-4 py-3.5">
          <div>
            <h2 className="text-[12px] font-semibold text-text">API Key</h2>
            <p className="mt-0.5 text-[10px] text-muted-foreground">客户端使用同一把 Key；不会写入日志。</p>
          </div>
          <div className="flex items-center gap-2">
            <code className="font-mono text-[10px] text-muted-foreground">{status?.apiKeyMasked ?? '读取中…'}</code>
            <Button type="button" variant="outline" size="sm" onClick={onCopyKey}>复制</Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3.5">
          <div>
            <h2 className="text-[12px] font-semibold text-text">版本与更新</h2>
            <p className="mt-0.5 text-[10px] text-muted-foreground">当前 v{appInfo?.version ?? '0.2.1'}；新版本先提示，不静默替换。</p>
            <p className="mt-1 max-w-[520px] truncate font-mono text-[9px] text-faint">更新源 {appInfo?.updateSource ?? 'https://xsin.github.io/ai-bobby/releases/latest/latest.json'}</p>
            {lastMessage ? <p className="mt-1 text-[10px] text-muted-foreground">{lastMessage}</p> : null}
          </div>
          <div className="flex items-center gap-2">
            <label className="flex cursor-pointer items-center gap-2 text-[10px] text-muted-foreground">
              <Switch checked={autoCheck} onCheckedChange={onAutoCheckChange} />
              自动检查
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              disabled={checking}
              onClick={onCheckUpdates}
            >
              <RefreshCw className={cn('size-3.5', checking && 'animate-spin')} />
              {checking ? '检查中…' : '检查更新'}
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-3 overflow-hidden rounded-lg border border-line-soft bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3.5">
          <div>
            <h2 className="text-[12px] font-semibold text-text">关于</h2>
            <p className="mt-0.5 text-[10px] text-muted-foreground">AI Bobby 是本地优先的 AI 服务网关。</p>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" className="gap-1" onClick={onOpenAbout}>关于 <ExternalLink className="size-3" /></Button>
            <Button type="button" variant="ghost" size="sm" className="gap-1 text-muted-foreground" onClick={onOpenUpdateSource}>更新源 <ExternalLink className="size-3" /></Button>
          </div>
        </div>
      </section>
    </main>
  )
}
