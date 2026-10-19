import { useEffect, useMemo, useState } from 'react'
import { Search, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatBytes } from '@/lib/format'
import { relativeTime } from '@/lib/relative-time'
import { cn } from '@/lib/utils'
import type { BackupVersion, ImportHistoryEntry, ImportHistorySnapshot } from '@shared/api'
import { t } from '@/lib/i18n'

interface HistoryPageProps {
  history: ImportHistorySnapshot | null
  loading: boolean
  restoringId: string | null
  onRefresh: () => void
  onRestoreVersion: (id: string) => Promise<void>
  onOpenDirectory: (path: string) => void
}

const TARGET_LABEL: Record<string, string> = {
  workbuddy: 'WorkBuddy',
  'workbuddy-ai': 'WorkBuddy AI',
  codex: 'Codex',
  claude: 'Claude Code',
  dsh: 'DeepSeek Harness',
  vscode: 'VS Code',
}

const FILTERS = [
  ['all', '全部'],
  ['workbuddy', 'WorkBuddy'],
  ['workbuddy-ai', 'WorkBuddy AI'],
  ['codex', 'Codex'],
  ['claude', 'Claude'],
  ['dsh', 'DSH'],
  ['vscode', 'VS Code'],
] as const

const HISTORY_WINDOW_MS = 30 * 24 * 60 * 60 * 1000

function formatTime(ms: number): string {
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(ms))
}

function formatDateTime(ms: number): string {
  const date = new Date(ms)
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function backupName(path: string | undefined): string {
  if (path === undefined) return ''
  return path.split('/').pop() ?? path
}

export function HistoryPage({ history, loading, restoringId, onRefresh, onRestoreVersion, onOpenDirectory }: HistoryPageProps) {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [pending, setPending] = useState<ImportHistoryEntry | null>(null)
  const [viewing, setViewing] = useState<ImportHistoryEntry | null>(null)
  const [versions, setVersions] = useState<BackupVersion[]>([])
  const [versionsLoading, setVersionsLoading] = useState(false)
  const [versionsError, setVersionsError] = useState<string | null>(null)
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)
  const [openedAt] = useState(() => Date.now())

  const entries = history?.entries ?? []
  const backups = history?.backups ?? []
  const normalizedQuery = query.trim().toLowerCase()
  const cutoff = openedAt - HISTORY_WINDOW_MS
  const visibleEntries = useMemo(
    () => entries.filter(entry => {
      const targetOk = filter === 'all' || entry.target === filter
      const recentOk = entry.createdAtMs >= cutoff
      const queryOk = normalizedQuery === ''
        || [TARGET_LABEL[entry.target], entry.path, entry.backupPath, entry.diff]
          .filter(Boolean).join(' ').toLowerCase().includes(normalizedQuery)
      return targetOk && recentOk && queryOk
    }),
    [entries, filter, normalizedQuery, cutoff],
  )
  const baselineIds = useMemo(() => {
    const earliest = new Map<string, string>()
    for (const entry of entries) {
      const current = earliest.get(entry.target)
      if (current === undefined) earliest.set(entry.target, entry.id)
    }
    for (const entry of [...entries].sort((a, b) => a.createdAtMs - b.createdAtMs)) {
      earliest.set(entry.target, entry.id)
    }
    return new Set(earliest.values())
  }, [entries])
  const totalBackupSize = backups.reduce((sum, backup) => sum + (backup.size ?? 0), 0)
  const latest = entries[0]

  useEffect(() => {
    if (pending === null) {
      setVersions([])
      setSelectedVersion(null)
      setVersionsError(null)
      return
    }
    const api = window.aiBobby
    if (!api) {
      const fallback: BackupVersion[] = pending.backupPath === undefined
        ? []
        : [{
            id: `entry:${pending.id}`,
            target: pending.target,
            path: pending.path,
            backupPath: pending.backupPath,
            createdAtMs: pending.createdAtMs,
            baseline: false,
          }]
      setVersions(fallback)
      setSelectedVersion(fallback[0]?.id ?? null)
      return
    }
    let alive = true
    setVersionsLoading(true)
    setVersionsError(null)
    void api.getBackupVersions(pending.target)
      .then(list => {
        if (!alive) return
        setVersions(list)
        setSelectedVersion((list.find(version => version.baseline) ?? list[0])?.id ?? null)
      })
      .catch(error => {
        if (alive) setVersionsError(error instanceof Error ? error.message : String(error))
      })
      .finally(() => {
        if (alive) setVersionsLoading(false)
      })
    return () => {
      alive = false
    }
  }, [pending])

  const selected = versions.find(version => version.id === selectedVersion)
  const selectedTitle = selected?.baseline ? '使用 AI Bobby 前' : selected ? relativeTime(selected.createdAtMs) : ''

  return (
    <main className="min-h-0 flex-1 overflow-auto px-6 py-5">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4">
        <div>
          <div className="font-mono text-[9px] font-semibold tracking-[0.1em] text-faint">OTHER · HISTORY</div>
          <h1 className="mt-1 text-[25px] font-semibold leading-tight tracking-[-0.035em] text-text">{t("导入历史")}</h1>
          <p className="mt-1.5 max-w-[620px] text-[12px] text-muted-foreground">
            {t('每次写入都会先备份；在这里查看差异、打开配置目录或恢复备份。')}
          </p>
        </div>
        <div className="flex items-center gap-2 pt-4">
          <Button type="button" variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
            {loading ? t('刷新中…') : t('刷新')}
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        <div className="rounded-lg border border-line-soft bg-gradient-to-br from-surface to-surface-2 px-3.5 py-3">
          <span className="text-[10px] text-faint">{t("最近写入")}</span>
          <strong className="mt-0.5 block text-[20px] font-semibold tracking-[-0.025em] text-text">{latest ? formatTime(latest.createdAtMs) : '—'}</strong>
          <small className="mt-0.5 block text-[10px] text-muted-foreground">{latest ? `${TARGET_LABEL[latest.target]} · ${latest.modelCount} 个模型` : '还没有导入记录'}</small>
        </div>
        <div className="rounded-lg border border-line-soft bg-gradient-to-br from-surface to-surface-2 px-3.5 py-3">
          <span className="text-[10px] text-faint">{t("可恢复备份")}</span>
          <strong className="mt-0.5 block text-[20px] font-semibold tracking-[-0.025em] text-text">{backups.length}</strong>
          <small className="mt-0.5 block text-[10px] text-muted-foreground">{t("基线 1 份 + 最近 5 份")}</small>
        </div>
        <div className="rounded-lg border border-line-soft bg-gradient-to-br from-surface to-surface-2 px-3.5 py-3">
          <span className="text-[10px] text-faint">{t("备份占用")}</span>
          <strong className="mt-0.5 block text-[20px] font-semibold tracking-[-0.025em] text-text">{totalBackupSize > 0 ? formatBytes(totalBackupSize) : '—'}</strong>
          <small className="mt-0.5 block text-[10px] text-muted-foreground">{t("只存本机，不上传")}</small>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-0.5 rounded-md border border-line-soft bg-surface-2 p-1">
          {FILTERS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={cn(
                'h-6 rounded border border-transparent px-2.5 text-[10px] text-muted-foreground hover:bg-hover hover:text-text',
                filter === id && 'border-line bg-surface text-text shadow-sm',
              )}
            >
              {t(label)}
            </button>
          ))}
        </div>
        <label className="flex h-8 w-[240px] items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 text-faint">
          <Search className="size-3.5 shrink-0" />
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={t("搜索备份 / 模型 / 客户端")}
            aria-label={t("搜索导入历史")}
            className="min-w-0 flex-1 border-0 bg-transparent text-[11px] text-text outline-none placeholder:text-faint"
          />
        </label>
      </div>

      <section className="mt-3 overflow-hidden rounded-lg border border-line-soft bg-surface" aria-labelledby="history-heading">
        <div className="flex items-center justify-between border-b border-line-soft px-3.5 py-2.5">
          <h2 id="history-heading" className="text-[12px] font-semibold text-text">{t("导入记录与备份")}</h2>
          <span className="text-[10px] text-faint">{t("基线 1 份 + 最近 5 份（最多 6 份）")}</span>
        </div>
        {visibleEntries.length === 0 ? (
          <div className="px-4 py-10 text-center text-[11px] text-faint">{t("没有匹配的导入记录或备份。")}</div>
        ) : (
          <table className="w-full border-collapse">
            <colgroup>
              <col className="w-[44px]" />
              <col />
              <col className="w-[214px]" />
            </colgroup>
            <thead>
              <tr className="text-left text-[10px] font-medium text-faint">
                <th scope="col" className="px-3.5 py-2"><span className="sr-only">{t("客户端")}</span></th>
                <th scope="col" className="px-3.5 py-2">{t("写入记录")}</th>
                <th scope="col" className="px-3.5 py-2 text-right">{t("操作")}</th>
              </tr>
            </thead>
            <tbody>
              {visibleEntries.map(entry => {
                const backup = backups.find(item => item.id === entry.id)
                const restored = entry.action === 'restore'
                return (
                  <tr key={entry.id} className="border-t border-line-soft hover:bg-surface-2">
                    <td className="px-3.5 py-2.5 align-top">
                      <span className="grid size-7 place-items-center rounded-md bg-accent-soft font-mono text-[9px] font-semibold text-primary" aria-hidden="true">
                        {(TARGET_LABEL[entry.target] ?? '?').slice(0, 2).toUpperCase()}
                      </span>
                    </td>
                    <td className="min-w-0 px-3.5 py-2.5 align-top">
                      <div className="flex items-center gap-2">
                        <strong className="text-[12px] font-semibold text-text">{TARGET_LABEL[entry.target] ?? entry.target}</strong>
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
                        <span>{formatTime(entry.createdAtMs)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{entry.modelCount} {t('个模型')}</span>
                        <span aria-hidden="true">·</span>
                        <span className={cn('rounded px-1.5 py-px text-[9px]', restored ? 'bg-warning-soft text-warning' : 'bg-success-soft text-success')}>
                          {restored ? t('已恢复') : t('成功')}
                        </span>
                      </div>
                      <div className="mt-1 flex min-w-0 items-center gap-1.5 text-[10px]">
                        <span className="shrink-0 text-[9px] tracking-[0.04em] text-faint">{t("配置")}</span>
                        <code className="min-w-0 truncate font-mono text-[9px] text-text" title={entry.path}>{entry.path}</code>
                      </div>
                      <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[10px]">
                        <span className="shrink-0 text-[9px] tracking-[0.04em] text-faint">{t("备份")}</span>
                        {entry.backupPath ? (
                          <>
                            <code className="min-w-0 truncate font-mono text-[9px] text-text" title={entry.backupPath}>{backupName(entry.backupPath)}</code>
                            <span className="shrink-0 text-[9px] text-faint">{backup?.size !== undefined ? formatBytes(backup.size) : ''}</span>
                            {baselineIds.has(entry.id) ? (
                              <span className="shrink-0 rounded bg-warning-soft px-1 py-px text-[8px] font-semibold text-warning">{t("基线")}</span>
                            ) : null}
                          </>
                        ) : (
                          <span className="text-[9px] text-faint">{t("没有可用的备份文件")}</span>
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3.5 py-2.5 text-right align-top">
                      {entry.diff ? (
                        <Button type="button" variant="ghost" size="sm" title={t("只读查看这次写入改了什么")} onClick={() => setViewing(entry)}>
                          查看差异
                        </Button>
                      ) : null}
                      <Button type="button" variant="ghost" size="sm" title={t("在 Finder 中打开配置所在目录")} onClick={() => onOpenDirectory(entry.path)}>
                        打开目录
                      </Button>
                      {entry.backupPath ? (
                        <Button type="button" variant="ghost" size="sm" onClick={() => setPending(entry)}>
                          恢复
                        </Button>
                      ) : null}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
        <p className="border-t border-line-soft px-3.5 py-2.5 text-[9px] leading-relaxed text-faint">
          写入前自动备份；恢复前会再次备份当前文件，失败不会覆盖。
        </p>
      </section>

      <div className="mt-3 flex items-center gap-1.5 text-[9px] text-faint">
        <ShieldCheck className="size-3.5" />
        备份只在本机；恢复时会写入目标客户端配置，不影响其他客户端。
      </div>

      <Dialog open={pending !== null} onOpenChange={open => { if (!open) setPending(null) }}>
        <DialogContent className="max-w-[660px] gap-0 border-line bg-surface p-0">
          <DialogHeader className="border-b border-line px-5 py-4 text-left">
            <DialogTitle className="text-[15px] font-semibold text-text">
              恢复 {pending ? TARGET_LABEL[pending.target] : ''} 的配置
            </DialogTitle>
            <DialogDescription className="text-[11px] text-muted-foreground">
              选择一个备份版本；默认选中基线（使用 AI Bobby 前）。
            </DialogDescription>
          </DialogHeader>

          <div className="mx-[18px] my-3.5 grid grid-cols-[196px_minmax(0,1fr)] overflow-hidden rounded-lg border border-line-soft">
            <div role="tablist" aria-orientation="vertical" aria-label={t("备份版本")} className="flex max-h-[300px] flex-col overflow-auto bg-surface-2">
              {versionsLoading ? (
                <div className="px-2 py-3 text-[10px] text-faint">{t("读取备份…")}</div>
              ) : versions.length === 0 ? (
                <div className="px-2 py-3 text-[10px] text-faint">{t("没有可用的备份。")}</div>
              ) : versions.map(version => {
                const active = version.id === selectedVersion
                return (
                  <button
                    key={version.id}
                    type="button"
                    role="tab"
                    id={`version-${version.id}`}
                    aria-selected={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setSelectedVersion(version.id)}
                    onKeyDown={event => {
                      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
                      event.preventDefault()
                      const index = versions.findIndex(item => item.id === selectedVersion)
                      const next = versions[(index + (event.key === 'ArrowDown' ? 1 : -1) + versions.length) % versions.length]
                      if (next === undefined) return
                      setSelectedVersion(next.id)
                      const node = document.querySelector<HTMLButtonElement>(`#version-${CSS.escape(next.id)}`)
                      node?.focus()
                    }}
                    className={cn(
                      'restore-tab relative flex flex-col items-start gap-0.5 border-0 bg-transparent px-3.5 py-2.5 text-left text-muted-foreground hover:text-text',
                      active && 'bg-surface text-text',
                    )}
                  >
                    <span className={cn('absolute inset-y-0 left-0 w-0.5 bg-primary', active ? '' : 'hidden')} aria-hidden="true" />
                    <strong className="text-[11px] font-semibold">{version.baseline ? '使用 AI Bobby 前' : relativeTime(version.createdAtMs)}</strong>
                    <span className="font-mono text-[9px] text-faint">{formatDateTime(version.createdAtMs)}</span>
                  </button>
                )
              })}
            </div>
            <div role="tabpanel" aria-labelledby={selected ? `version-${selected.id}` : undefined} className="min-h-[218px] bg-surface px-4 py-3.5">
              {versionsError ? (
                <p className="text-[10px] text-danger">{versionsError}</p>
              ) : selected ? (
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] tracking-[0.06em] text-faint">{t("将恢复到")}</span>
                  <strong className="text-[15px] font-semibold tracking-[-0.01em] text-text">{selectedTitle}</strong>
                  <span className="text-[10px] text-muted-foreground">{formatDateTime(selected.createdAtMs)}</span>
                  <dl className="mt-2">
                    <div className="flex justify-between gap-3.5 border-t border-line-soft py-1.5">
                      <dt className="shrink-0 text-[9px] text-faint">{t("备份文件")}</dt>
                      <dd className="min-w-0 break-words text-right font-mono text-[10px] text-text">{backupName(selected.backupPath)}</dd>
                    </div>
                    <div className="flex justify-between gap-3.5 border-t border-line-soft py-1.5">
                      <dt className="shrink-0 text-[9px] text-faint">{t("目标文件")}</dt>
                      <dd className="min-w-0 break-words text-right font-mono text-[10px] text-text">{selected.path}</dd>
                    </div>
                  </dl>
                  <p className="mt-1.5 rounded-md bg-surface-2 px-2.5 py-2 text-[10px] leading-relaxed text-muted-foreground">
                    {selected.baseline
                      ? '恢复后：移除这个客户端里所有 AI Bobby 条目'
                      : '恢复后：写入这个客户端在该时间点的配置；之后导入的模型会被移除'}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="px-5 pb-3 text-[10px] leading-relaxed text-faint">
            恢复前会先备份当前文件；恢复只写入这个客户端，不影响其他客户端。
          </div>
          <DialogFooter className="border-t border-line px-5 py-3">
            <Button type="button" variant="outline" size="sm" onClick={() => setPending(null)}>{t("取消")}</Button>
            <Button
              type="button"
              size="sm"
              disabled={selected === undefined || restoringId !== null}
              onClick={async () => {
                if (selected === undefined) return
                await onRestoreVersion(selected.id)
                setPending(null)
              }}
            >
              {restoringId ? '恢复中…' : '恢复此版本'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={viewing !== null} onOpenChange={open => { if (!open) setViewing(null) }}>
        <DialogContent className="max-w-[620px] gap-0 border-line bg-surface p-0">
          <DialogHeader className="border-b border-line px-5 py-4 text-left">
            <DialogTitle className="text-[15px] font-semibold text-text">{t("查看差异")}</DialogTitle>
            <DialogDescription className="text-[11px] text-muted-foreground">
              {viewing ? `${TARGET_LABEL[viewing.target]} · ${formatTime(viewing.createdAtMs)} · ${viewing.path}` : ''}
            </DialogDescription>
          </DialogHeader>
          <pre className="max-h-[360px] overflow-auto bg-code px-4 py-3 font-mono text-[10px] leading-relaxed text-code-text">
            {viewing?.diff || '没有可显示的 diff。'}
          </pre>
          <DialogFooter className="border-t border-line px-5 py-3">
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenDirectory(viewing?.path ?? '')} disabled={!viewing}>
              打开目录
            </Button>
            <Button type="button" size="sm" onClick={() => setViewing(null)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
