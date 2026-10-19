import { Download, RotateCw, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatBytes } from '@/lib/format'
import type { UpdateInfo, UpdateProgress } from '@shared/api'
import { t } from '@/lib/i18n'

interface UpdateBannerProps {
  info: UpdateInfo
  progress?: UpdateProgress | null
  downloading: boolean
  downloaded: boolean
  installing: boolean
  onDownload: () => void
  onInstall: () => void
  onDismiss: () => void
}

const STAGE_LABEL: Record<UpdateProgress['stage'], string> = {
  downloading: '下载中',
  verifying: '校验中',
  extracting: '解压中',
  installing: '安装中',
}

export function UpdateBanner({
  info,
  progress,
  downloading,
  downloaded,
  installing,
  onDownload,
  onInstall,
  onDismiss,
}: UpdateBannerProps) {
  const percent =
    progress && progress.total > 0
      ? Math.min(100, Math.round((progress.downloaded / progress.total) * 100))
      : 0
  const size = info.asset.size ? formatBytes(info.asset.size) : '未知大小'

  return (
    <section className="flex flex-wrap items-center gap-3 border-b border-primary/25 bg-accent-soft px-5 py-2.5">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
        <Sparkles className="size-3.5" />
      </span>
      <div className="min-w-[220px] flex-1">
        <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold text-text">
          {downloaded ? '更新已就绪' : `发现新版本 ${info.version}`}
          <span className="rounded bg-surface/70 px-1.5 py-px text-[10px] font-normal text-muted-foreground">
            当前 {info.currentVersion} · {size}
          </span>
        </div>
        <p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">
          {info.notes || '包含体验改进与问题修复。'}
        </p>
        {downloading || progress ? (
          <div className="mt-1.5 flex items-center gap-2">
            <div className="h-1 w-40 overflow-hidden rounded-full bg-primary/20">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} />
            </div>
            <span className="text-[9px] tabular-nums text-muted-foreground">
              {progress ? `${STAGE_LABEL[progress.stage]} ${percent}%` : '准备下载…'}
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {downloaded ? (
          <Button
            type="button"
            size="sm"
            className="bg-primary text-primary-foreground"
            disabled={installing}
            onClick={onInstall}
          >
            <RotateCw className="size-3.5" />
            {installing ? '正在安装…' : '立即重启'}
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            className="bg-primary text-primary-foreground"
            disabled={downloading}
            onClick={onDownload}
          >
            <Download className="size-3.5" />
            {downloading ? '下载中…' : '立即更新'}
          </Button>
        )}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={onDismiss}
        >
          稍后
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={t("关闭更新提示")}
          className="size-7 text-muted-foreground"
          onClick={onDismiss}
        >
          <X className="size-3.5" />
        </Button>
      </div>
    </section>
  )
}
