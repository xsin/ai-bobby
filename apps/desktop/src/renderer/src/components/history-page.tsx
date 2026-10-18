import { useMemo, useState } from 'react'
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
import { cn } from '@/lib/utils'
import type { ImportHistoryEntry, ImportHistorySnapshot } from '@shared/api'

interface HistoryPageProps {
  history: ImportHistorySnapshot | null
  loading: boolean
  restoringId: string | null
  onRefresh: () => void
  onRestore: (id: string) => Promise<void>
  onOpenDirectory: (path: string) => void
}

const TARGET_LABEL: Record<string, string> = {
  workbuddy: 'WorkBuddy',
  'workbuddy-ai': 'WorkBuddy AI',
  codex: 'Codex',
  claude: 'Claude Code',
  dsh: 'DeepSeek Harness',
}

const FILTERS = [
  ['all', '全部'],
  ['workbuddy', 'WorkBuddy'],
  ['workbuddy-ai', 'WorkBuddy AI'],
  ['codex', 'Codex'],
  ['claude', 'Claude'],
  ['dsh', 'DSH'],
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

function backupName(path: string | undefined): string {
  if (path === undefined) return ''
  return path.split('/').pop() ?? path
}

export function HistoryPage({ history, loading, restoringId, onRefresh, onRestore, onOpenDirectory }: HistoryPageProps) {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [pending, setPending] = useState<ImportHistoryEntry | null>(null)
  const [viewing, setViewing] = useState<ImportHistoryEntry | null>(null)
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
  const totalBackupSize = backups.reduce((sum, backup) => sum + (backup.size ?? 0), 0)
  const latest = entries[0]

  return (
    <main className="min-h-0 flex-1 overflow-auto px-6 py-5">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4">
        <div>
          <div className="font-mono text-[9px] font-semibold tracking-[0.1em] text-faint">OTHER · HISTORY</div>
          <h1 className="mt-1 text-[25px] font-semibold leading-tight tracking-[-0.035em] text-text">导入历史</h1>
          <p className="mt-1.5 max-w-[620px] text-[12px] text-muted-foreground">
            每次写入都会先备份；在这里查看差异、打开配置目录或恢复备份。
          </p>
        </div>
        <div className="flex items-center gap-2 pt-4">
          <Button type="button" variant="outline" size="sm" className="h-8 border-line bg-surface text-[11px]" onClick={onRefresh} disabled={loading}>
            {loading ? '刷新中…' : '刷新'}
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        <div className="rounded-lg border border-line-soft bg-gradient-to-br from-surface to-surface-2 px-3.5 py-3">
          <span className="text-[10px] text-faint">最近写入</span>
          <strong className="mt-0.5 block text-[20px] font-semibold tracking-[-0.025em] text-text">{latest ? formatTime(latest.createdAtMs) : '—'}</strong>
          <small className="mt-0.5 block text-[10px] text-muted-foreground">{latest ? `${TARGET_LABEL[latest.target]} · ${latest.modelCount} 个模型` : '还没有导入记录'}</small>
        </div>
        <div className="rounded-lg border border-line-soft bg-gradient-to-br from-surface to-surface-2 px-3.5 py-3">
          <span className="text-[10px] text-faint">可恢复备份</span>
          <strong className="mt-0.5 block text-[20px] font-semibold tracking-[-0.025em] text-text">{backups.length}</strong>
          <small className="mt-0.5 block text-[10px] text-muted-foreground">每个目标保留最近 5 份</small>
        </div>
        <div className="rounded-lg border border-line-soft bg-gradient-to-br from-surface to-surface-2 px-3.5 py-3">
          <span className="text-[10px] text-faint">备份占用</span>
          <strong className="mt-0.5 block text-[20px] font-semibold tracking-[-0.025em] text-text">{totalBackupSize > 0 ? formatBytes(totalBackupSize) : '—'}</strong>
          <small className="mt-0.5 block text-[10px] text-muted-foreground">只存本机，不上传</small>
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
              {label}
            </button>
          ))}
        </div>
        <label className="flex h-8 w-[240px] items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 text-faint">
          <Search className="size-3.5 shrink-0" />
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="搜索备份 / 模型 / 客户端"
            aria-label="搜索导入历史"
            className="min-w-0 flex-1 border-0 bg-transparent text-[11px] text-text outline-none placeholder:text-faint"
          />
        </label>
      </div>

      <section className="mt-3 overflow-hidden rounded-lg border border-line-soft bg-surface" aria-labelledby="history-heading">
        <div className="flex items-center justify-between border-b border-line-soft px-3.5 py-2.5">
          <h2 id="history-heading" className="text-[12px] font-semibold text-text">导入记录与备份</h2>
          <span className="text-[10px] text-faint">每个目标保留最近 5 份</span>
        </div>
        {visibleEntries.length === 0 ? (
          <div className="px-4 py-10 text-center text-[11px] text-faint">没有匹配的导入记录或备份。</div>
        ) : (
          <table className="w-full border-collapse">
            <colgroup>
              <col className="w-[44px]" />
              <col />
              <col className="w-[214px]" />
            </colgroup>
            <thead>
              <tr className="text-left text-[10px] font-medium text-faint">
                <th scope="col" className="px-3.5 py-2"><span className="sr-only">客户端</span></th>
                <th scope="col" className="px-3.5 py-2">写入记录</th>
                <th scope="col" className="px-3.5 py-2 text-right">操作</th>
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
                        <span>{entry.modelCount} 个模型</span>
                        <span aria-hidden="true">·</span>
                        <span className={cn('rounded px-1.5 py-px text-[9px]', restored ? 'bg-warning-soft text-warning' : 'bg-success-soft text-success')}>
                          {restored ? '已恢复' : '成功'}
                        </span>
                      </div>
                      <div className="mt-1 flex min-w-0 items-center gap-1.5 text-[10px]">
                        <span className="shrink-0 text-[9px] tracking-[0.04em] text-faint">配置</span>
                        <code className="min-w-0 truncate font-mono text-[9px] text-text" title={entry.path}>{entry.path}</code>
                      </div>
                      <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[10px]">
                        <span className="shrink-0 text-[9px] tracking-[0.04em] text-faint">备份</span>
                        {entry.backupPath ? (
                          <>
                            <code className="min-w-0 truncate font-mono text-[9px] text-text" title={entry.backupPath}>{backupName(entry.backupPath)}</code>
                            <span className="shrink-0 text-[9px] text-faint">{backup?.size !== undefined ? formatBytes(backup.size) : ''}</span>
                          </>
                        ) : (
                          <span className="text-[9px] text-faint">没有可用的备份文件</span>
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3.5 py-2.5 text-right align-top">
                      {entry.diff ? (
                        <Button type="button" variant="ghost" size="sm" className="h-6 px-1.5 text-[10px] text-muted-foreground" title="只读查看这次写入改了什么" onClick={() => setViewing(entry)}>
                          查看差异
                        </Button>
                      ) : null}
                      <Button type="button" variant="ghost" size="sm" className="h-6 px-1.5 text-[10px] text-muted-foreground" title="在 Finder 中打开配置所在目录" onClick={() => onOpenDirectory(entry.path)}>
                        打开目录
                      </Button>
                      {entry.backupPath ? (
                        <Button type="button" variant="ghost" size="sm" className="h-6 px-1.5 text-[10px] text-primary" onClick={() => setPending(entry)}>
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
        <DialogContent className="max-w-[430px] gap-0 border-line bg-surface p-0">
          <DialogHeader className="border-b border-line px-5 py-4 text-left">
            <DialogTitle className="text-[15px] font-semibold text-text">恢复 {pending ? TARGET_LABEL[pending.target] : ''} 的备份</DialogTitle>
            <DialogDescription className="text-[11px] text-muted-foreground">恢复前会先备份当前文件；这不会改动其他客户端。</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 px-5 py-4">
            <DetailRow label="备份文件" value={pending?.backupPath ?? '—'} mono />
            <DetailRow label="原始写入" value={pending ? formatTime(pending.createdAtMs) : '—'} />
            <DetailRow label="目标文件" value={pending?.path ?? '—'} mono />
            <DetailRow label="影响范围" value={pending ? `${pending.modelCount} 个 AI Bobby 模型` : '—'} />
          </div>
          <DialogFooter className="border-t border-line px-5 py-3">
            <Button type="button" variant="ghost" size="sm" onClick={() => setPending(null)}>取消</Button>
            <Button
              type="button"
              size="sm"
              className="bg-primary text-primary-foreground"
              disabled={pending === null || restoringId !== null}
              onClick={async () => { if (!pending) return; await onRestore(pending.id); setPending(null) }}
            >
              {restoringId ? '恢复中…' : '恢复此备份'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={viewing !== null} onOpenChange={open => { if (!open) setViewing(null) }}>
        <DialogContent className="max-w-[620px] gap-0 border-line bg-surface p-0">
          <DialogHeader className="border-b border-line px-5 py-4 text-left">
            <DialogTitle className="text-[15px] font-semibold text-text">查看差异</DialogTitle>
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
            <Button type="button" size="sm" className="bg-primary text-primary-foreground" onClick={() => setViewing(null)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}

function DetailRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-md border border-line-soft bg-surface-2 px-2.5 py-2">
      <span className="shrink-0 text-[9px] text-faint">{label}</span>
      <span className={cn('max-w-[280px] break-words text-right text-[10px] text-text', mono && 'font-mono')}>{value}</span>
    </div>
  )
}
