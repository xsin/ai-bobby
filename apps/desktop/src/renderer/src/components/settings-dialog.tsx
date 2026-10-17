import { useState } from 'react'
import { Check, ExternalLink, Monitor, Moon, RefreshCw, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/theme'
import type { AppInfo, GatewayStatus, ThemeChoice } from '@shared/api'

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appInfo: AppInfo | null
  status: GatewayStatus | null
  onCopyApiKey: () => void
  autoCheck: boolean
  onAutoCheckChange: (value: boolean) => void
  checking: boolean
  lastMessage?: string
  onCheckUpdates: () => void
  onOpenUpdateSource: () => void
}

const THEMES: Array<{ id: ThemeChoice; label: string; icon: typeof Sun }> = [
  { id: 'system', label: '系统', icon: Monitor },
  { id: 'light', label: '浅色', icon: Sun },
  { id: 'dark', label: '深色', icon: Moon },
]

export function SettingsDialog({
  open,
  onOpenChange,
  appInfo,
  status,
  onCopyApiKey,
  autoCheck,
  onAutoCheckChange,
  checking,
  lastMessage,
  onCheckUpdates,
  onOpenUpdateSource,
}: SettingsDialogProps) {
  const { choice, setChoice } = useTheme()
  const [copied, setCopied] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[460px] gap-0 border-line bg-surface p-0">
        <DialogHeader className="border-b border-line px-5 py-4 text-left">
          <DialogTitle className="text-[15px] font-semibold text-text">设置</DialogTitle>
          <DialogDescription className="text-[11px] text-muted-foreground">
            版本、更新与界面偏好；网关与 Key 均来自本机真实状态。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 px-5 py-4">
          <section className="space-y-2">
            <h3 className="text-[12px] font-semibold text-text">外观</h3>
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
                    className={cn(
                      'h-8 flex-1 gap-1.5 border-line bg-surface text-[11px]',
                      active && 'border-primary/40 bg-accent-soft text-text',
                    )}
                  >
                    <Icon className="size-3.5" />
                    {theme.label}
                    {active ? <Check className="size-3 text-primary" /> : null}
                  </Button>
                )
              })}
            </div>
          </section>

          <Separator className="bg-line-soft" />

          <section className="space-y-2">
            <h3 className="text-[12px] font-semibold text-text">版本与更新</h3>
            <div className="flex items-center justify-between rounded-md border border-line-soft bg-surface-2 px-3 py-2">
              <div>
                <p className="text-[11px] font-medium text-text">当前版本</p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  {appInfo ? `${appInfo.version} · ${appInfo.platform}/${appInfo.arch}` : '读取中…'}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 gap-1.5 border-line bg-surface text-[11px]"
                disabled={checking}
                onClick={onCheckUpdates}
              >
                <RefreshCw className={cn('size-3.5', checking && 'animate-spin')} />
                {checking ? '检查中…' : '检查更新'}
              </Button>
            </div>

            <label className="flex items-center justify-between rounded-md border border-line-soft bg-surface-2 px-3 py-2">
              <span>
                <span className="block text-[11px] font-medium text-text">自动检查更新</span>
                <span className="block text-[10px] text-muted-foreground">启动后静默检查，之后每 6 小时一次</span>
              </span>
              <Switch checked={autoCheck} onCheckedChange={onAutoCheckChange} />
            </label>

            <div className="rounded-md border border-line-soft bg-surface-2 px-3 py-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] text-muted-foreground">更新源</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 gap-1 px-1.5 text-[10px] text-muted-foreground"
                  onClick={onOpenUpdateSource}
                >
                  打开
                  <ExternalLink className="size-3" />
                </Button>
              </div>
              <p className="truncate font-mono text-[9px] text-faint">
                {appInfo?.updateSource || 'https://xsin.github.io/ai-bobby/releases/latest/latest.json'}
              </p>
            </div>

            {lastMessage ? <p className="text-[10px] text-muted-foreground">{lastMessage}</p> : null}
          </section>

          <Separator className="bg-line-soft" />

          <section className="space-y-1">
            <h3 className="text-[12px] font-semibold text-text">本机服务</h3>
            <button
              type="button"
              className="flex w-full appearance-none items-center justify-between rounded-md border border-line-soft bg-surface-2 px-3 py-2 text-left"
              onClick={() => {
                const endpoint = `http://127.0.0.1:${status?.gateway.port ?? 46890}/v1`
                void navigator.clipboard.writeText(endpoint).then(() => setCopied(true))
              }}
            >
              <span>
                <span className="block text-[11px] font-medium text-text">转发口</span>
                <span className="block font-mono text-[10px] text-muted-foreground">
                  http://127.0.0.1:{status?.gateway.port ?? 46890}/v1
                </span>
              </span>
              <span className="text-[10px] text-primary">{copied ? '已复制' : '复制'}</span>
            </button>
            <div className="flex items-center justify-between rounded-md border border-line-soft bg-surface-2 px-3 py-2">
              <span>
                <span className="block text-[11px] font-medium text-text">API Key</span>
                <span className="block font-mono text-[10px] text-muted-foreground">{status?.apiKeyMasked ?? '读取中…'}</span>
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 px-1.5 text-[10px] text-primary"
                onClick={onCopyApiKey}
              >
                复制
              </Button>
            </div>
            <p className="px-1 text-[9px] leading-relaxed text-faint">
              AI Bobby 只监听本机回环地址；所有 /v1 请求需要 API Key。
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
