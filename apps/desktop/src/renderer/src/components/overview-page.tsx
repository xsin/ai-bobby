import { Activity, ArrowUpRight, Cpu, Globe2, Hexagon, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { DemoSource, ProviderId } from '@/lib/demo-data'
import type { ImportHistorySnapshot, GatewayStatus } from '@shared/api'
import type { NavPage } from '@/components/sidebar'
import { t } from '@/lib/i18n'

interface OverviewPageProps {
  sources: Record<ProviderId, DemoSource>
  status: GatewayStatus | null
  history: ImportHistorySnapshot | null
  onNavigate: (page: NavPage) => void
  onRefresh: () => void
}

const SOURCE_META: Array<{ id: ProviderId; label: string; note: string; icon: typeof Terminal }> = [
  { id: 'opencode', label: 'OpenCode', note: '免费模型池', icon: Terminal },
  { id: 'workbuddy', label: 'WorkBuddy', note: '国内版', icon: Hexagon },
  { id: 'wbi', label: 'WorkBuddy AI', note: '国际版', icon: Globe2 },
  { id: 'nvidia', label: 'NVIDIA NIM', note: '免费试用', icon: Cpu },
]

const TARGET_LABEL: Record<string, string> = {
  workbuddy: 'WorkBuddy',
  'workbuddy-ai': 'WorkBuddy AI',
  codex: 'Codex',
  claude: 'Claude Code',
  dsh: 'DeepSeek Harness',
  vscode: 'VS Code',
}

function formatTime(ms: number): string {
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(ms))
}

function creditsLabel(status: GatewayStatus | null): { value: string; note: string } {
  const accounts = status?.accounts ?? []
  const cn = accounts.filter(account => account.realm === 'cn')
  const intl = accounts.filter(account => account.realm === 'intl')
  const note = `CN ${cn.length} 个账号 · INTL ${intl.length} 个账号`
  if (accounts.some(account => account.unlimited)) return { value: '不限量', note }
  const known = accounts.filter(account => typeof account.credits === 'number')
  if (known.length === 0) return { value: '—', note }
  return {
    value: known.reduce((sum, account) => sum + (account.credits ?? 0), 0).toLocaleString('en-US'),
    note,
  }
}

export function OverviewPage({ sources, status, history, onNavigate, onRefresh }: OverviewPageProps) {
  const allSources = Object.values(sources)
  const totalModels = allSources.reduce((sum, source) => sum + source.models.length, 0)
  const availableModels = allSources.reduce(
    (sum, source) => sum + source.models.filter(model => model.status === 'available').length,
    0,
  )
  const pendingModels = allSources.reduce(
    (sum, source) => sum + source.models.filter(model => model.status === 'pending').length,
    0,
  )
  const credits = creditsLabel(status)
  const recent = (history?.entries ?? []).slice(0, 3)
  const latest = recent[0]
  const gatewayReady = status?.gateway.state === 'ready'

  return (
    <main className="min-h-0 flex-1 overflow-auto px-6 py-5">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4">
        <div>
          <div className="font-mono text-[9px] font-semibold tracking-[0.1em] text-faint">OVERVIEW</div>
          <h1 className="mt-1 text-[25px] font-semibold leading-tight tracking-[-0.035em] text-text">{t("概览")}</h1>
          <p className="mt-1.5 max-w-[620px] text-[12px] text-muted-foreground">
            {t("当前网关、模型源与最近导入的一览；点卡片进入对应页面。")}
          </p>
        </div>
        <div className="flex items-center gap-2 pt-4">
          <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={onRefresh}>
            <Activity className="size-3.5" />
            {t("刷新数据")}
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-line-soft bg-gradient-to-br from-surface to-surface-2 px-3.5 py-3">
          <span className="text-[10px] text-faint">{t("网关")}</span>
          <strong className={cn('mt-0.5 block text-[20px] font-semibold tracking-[-0.025em]', gatewayReady ? 'text-text' : 'text-warning')}>
            {gatewayReady ? t('运行中') : status?.gateway.state === 'starting' ? t('启动中') : t('未就绪')}
          </strong>
          <small className="mt-0.5 block text-[10px] text-muted-foreground">
            127.0.0.1:{status?.gateway.port ?? 46890} · {totalModels} {t("个模型")}
          </small>
        </div>
        <div className="rounded-lg border border-line-soft bg-gradient-to-br from-surface to-surface-2 px-3.5 py-3">
          <span className="text-[10px] text-faint">{t("模型源")}</span>
          <strong className="mt-0.5 block text-[20px] font-semibold tracking-[-0.025em] text-text">{allSources.length}</strong>
          <small className="mt-0.5 block text-[10px] text-muted-foreground">{t("可用")} {availableModels} / {t("待检测")} {pendingModels}</small>
        </div>
        <div className="rounded-lg border border-line-soft bg-gradient-to-br from-surface to-surface-2 px-3.5 py-3">
          <span className="text-[10px] text-faint">{t("积分")}</span>
          <strong className="mt-0.5 block text-[20px] font-semibold tracking-[-0.025em] text-text">{credits.value}</strong>
          <small className="mt-0.5 block text-[10px] text-muted-foreground">{credits.note}</small>
        </div>
        <div className="rounded-lg border border-line-soft bg-gradient-to-br from-surface to-surface-2 px-3.5 py-3">
          <span className="text-[10px] text-faint">{t("最近导入")}</span>
          <strong className="mt-0.5 block text-[20px] font-semibold tracking-[-0.025em] text-text">
            {latest ? formatTime(latest.createdAtMs) : '—'}
          </strong>
          <small className="mt-0.5 block text-[10px] text-muted-foreground">
            {latest ? `${TARGET_LABEL[latest.target] ?? latest.target} · ${latest.modelCount} ${t("个模型")}` : '还没有导入记录'}
          </small>
        </div>
      </div>

      <section className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4" aria-label={t("模型源")}>
        {SOURCE_META.map(meta => {
          const source = sources[meta.id]
          const Icon = meta.icon
          const available = source.models.filter(model => model.status === 'available').length
          const accounts = source.accounts?.length ?? 0
          const detail = meta.id === 'opencode'
            ? t('无需登录 · 按价格字段筛免费模型')
            : `${accounts} ${t('个账号')} · round-robin`
          return (
            <button
              key={meta.id}
              type="button"
              onClick={() => onNavigate(meta.id)}
              className="flex flex-col gap-1.5 rounded-lg border border-line-soft bg-surface p-3.5 text-left transition-colors hover:border-primary/30 hover:bg-surface-2"
            >
              <span className="flex items-baseline gap-1.5">
                <Icon className="size-3.5 self-center text-primary" />
                <strong className="text-[12px] font-semibold text-text">{t(meta.label)}</strong>
                <span className="text-[10px] text-faint">{t(meta.note)}</span>
              </span>
              <span className="text-[27px] font-light leading-none tracking-[-0.03em] text-text tabular-nums">
                {source.models.length}{' '}
                <small className="ml-1 text-[11px] font-normal tracking-normal text-muted-foreground">{t("个模型")}</small>
              </span>
              <span className="text-[10px] text-muted-foreground">{t("可用")} {available} · {detail}</span>
              <span className="mt-0.5 flex items-center gap-0.5 text-[10px] text-primary">
                {t("查看模型")} <ArrowUpRight className="size-3" />
              </span>
            </button>
          )
        })}
      </section>

      <section className="mt-2.5 overflow-hidden rounded-lg border border-line-soft bg-surface" aria-labelledby="overview-recent-heading">
        <div className="flex items-center justify-between border-b border-line-soft px-3.5 py-2.5">
          <h2 id="overview-recent-heading" className="text-[12px] font-semibold text-text">{t("最近导入")}</h2>
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] text-faint">{t("最近 3 次")}</span>
            <button
              type="button"
              className="border-0 bg-transparent p-0 text-[10px] text-primary hover:underline"
              onClick={() => onNavigate('history')}
            >
              查看全部 →
            </button>
          </div>
        </div>
        {recent.length === 0 ? (
          <div className="px-4 py-8 text-center text-[11px] text-faint">{t("还没有导入记录。")}</div>
        ) : (
          <div className="flex flex-col">
            {recent.map(entry => (
              <div key={entry.id} className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-2.5 border-b border-line-soft px-3.5 py-2.5 last:border-b-0 hover:bg-surface-2">
                <span className="grid size-7 place-items-center rounded-md bg-accent-soft font-mono text-[9px] font-semibold text-primary" aria-hidden="true">
                  {(TARGET_LABEL[entry.target] ?? '?').slice(0, 2).toUpperCase()}
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <strong className="text-[11px] font-semibold text-text">{TARGET_LABEL[entry.target] ?? entry.target}</strong>
                  <small className="truncate text-[10px] text-muted-foreground">
                    {formatTime(entry.createdAtMs)} · {entry.modelCount} 个模型 · <code className="font-mono text-[9px] text-faint">{entry.path}</code>
                  </small>
                </span>
                <span className={cn(
                  'rounded px-1.5 py-px text-[9px]',
                  entry.action === 'restore' ? 'bg-warning-soft text-warning' : 'bg-success-soft text-success',
                )}>
                  {entry.action === 'restore' ? '已恢复' : '成功'}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
