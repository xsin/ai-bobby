import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DemoSource } from '@/lib/demo-data'
import type { AppInfo } from '@shared/api'
import { t } from '@/lib/i18n'

interface StatusBarProps {
  source: DemoSource
  appInfo: AppInfo | null
  keyMask: string
  port: number
  onCopyKey: () => void
}

export function StatusBar({ source, appInfo, keyMask, port, onCopyKey }: StatusBarProps) {
  return (
    <footer className="flex h-[42px] shrink-0 items-center justify-between gap-3 border-t border-line bg-toolbar px-5 text-[10px]">
      <div className="flex min-w-0 items-center gap-2">
        <span className="size-1.5 rounded-full bg-success" />
        <span className="text-[11px] text-text" role="status">
          {source.statusText}
        </span>
        <span className="h-3 w-px bg-line" />
        <span className="truncate text-faint">{source.serviceSub}</span>
      </div>

      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-faint">{t("转发口")}</span>
          <code className="font-mono text-[10px] text-muted-foreground">http://127.0.0.1:{port}/v1</code>
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1 text-muted-foreground"
          onClick={onCopyKey}
          title={t("复制 API Key")}
        >
          <span className="text-faint">Key</span>
          <code className="font-mono text-[10px]">{keyMask}</code>
          <Copy className="size-3" />
        </Button>
        <span className="whitespace-nowrap text-faint">AI Bobby {appInfo?.version ?? '0.2.1'}</span>
      </div>
    </footer>
  )
}
