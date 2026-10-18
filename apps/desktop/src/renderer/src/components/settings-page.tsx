import { Check, ExternalLink, Monitor, Moon, RefreshCw, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/theme'
import type { AppInfo, GatewayStatus, ThemeChoice } from '@shared/api'

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
}: SettingsPageProps) {
  const { choice, setChoice } = useTheme()
  return (
    <main className="min-h-0 flex-1 overflow-auto px-6 py-5">
      <div className="border-b border-line pb-4">
        <div className="font-mono text-[9px] font-semibold tracking-[0.1em] text-faint">PREFERENCES</div>
        <h1 className="mt-1 text-[25px] font-semibold leading-tight tracking-[-0.035em] text-text">设置</h1>
        <p className="mt-1.5 max-w-[620px] text-[12px] text-muted-foreground">主界面不再放主题切换；外观与网关配置都在这里。</p>
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
                  className={cn('h-7 gap-1.5 border-line bg-surface text-[10px]', active && 'border-primary/40 bg-accent-soft text-text')}
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
            <h2 className="text-[12px] font-semibold text-text">本地网关</h2>
            <p className="mt-0.5 text-[10px] text-muted-foreground">只监听回环地址，浏览器请求默认拒绝。</p>
          </div>
          <div className="flex items-center gap-2">
            <code className="max-w-[300px] truncate font-mono text-[10px] text-muted-foreground">http://127.0.0.1:{status?.gateway.port ?? 46890}/v1</code>
            <Button type="button" variant="outline" size="sm" className="h-7 border-line bg-surface text-[10px]" onClick={onCopyEndpoint}>复制</Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft px-4 py-3.5">
          <div>
            <h2 className="text-[12px] font-semibold text-text">API Key</h2>
            <p className="mt-0.5 text-[10px] text-muted-foreground">客户端使用同一把 Key；不会写入日志。</p>
          </div>
          <div className="flex items-center gap-2">
            <code className="font-mono text-[10px] text-muted-foreground">{status?.apiKeyMasked ?? '读取中…'}</code>
            <Button type="button" variant="outline" size="sm" className="h-7 border-line bg-surface text-[10px]" onClick={onCopyKey}>复制</Button>
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
            <label className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Switch checked={autoCheck} onCheckedChange={onAutoCheckChange} />
              自动检查
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 gap-1.5 border-line bg-surface text-[10px]"
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
            <Button type="button" variant="outline" size="sm" className="h-7 gap-1 border-line bg-surface text-[10px]" onClick={onOpenAbout}>关于 <ExternalLink className="size-3" /></Button>
            <Button type="button" variant="ghost" size="sm" className="h-7 gap-1 px-1.5 text-[10px] text-muted-foreground" onClick={onOpenUpdateSource}>更新源 <ExternalLink className="size-3" /></Button>
          </div>
        </div>
      </section>
    </main>
  )
}
