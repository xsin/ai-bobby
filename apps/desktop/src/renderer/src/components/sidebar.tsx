import {
  ChevronsLeft,
  Cpu,
  ChevronsRight,
  Globe2,
  Hexagon,
  History,
  LayoutDashboard,
  Settings,
  Terminal,
  UserRound,
} from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { cn } from '@/lib/utils'
import { WBI_TEMPORARILY_DISABLED, type ProviderId } from '@/lib/demo-data'
import { t } from '@/lib/i18n'

export type NavPage = ProviderId | 'overview' | 'history' | 'about' | 'settings'

interface SidebarProps {
  page: NavPage
  counts: Record<ProviderId, string>
  historyCount: number
  collapsed: boolean
  gatewayRunning: boolean
  port: number
  devMode?: boolean
  onToggle: () => void
  onNavigate: (page: NavPage) => void
}

const SOURCE_ITEMS: Array<{ id: ProviderId; label: string; icon: typeof Terminal }> = [
  { id: 'opencode', label: 'OpenCode', icon: Terminal },
  { id: 'workbuddy', label: 'WorkBuddy', icon: Hexagon },
  { id: 'wbi', label: 'WorkBuddy AI', icon: Globe2 },
  { id: 'nvidia', label: 'NVIDIA NIM', icon: Cpu },
]

export function Sidebar({
  page,
  counts,
  historyCount,
  collapsed,
  gatewayRunning,
  port,
  devMode = false,
  onToggle,
  onNavigate,
}: SidebarProps) {
  const itemClass = (active: boolean) =>
    cn(
      'group flex w-full items-center gap-2.5 rounded-md border border-transparent px-2 py-1.5 text-left text-[12px] font-medium text-muted-foreground transition-colors hover:bg-hover hover:text-text',
      active && 'border-primary/30 bg-accent-soft text-text shadow-[inset_2px_0_0_var(--color-primary)]',
      collapsed && 'justify-center px-0',
    )

  return (
    <aside
      className={cn(
        'flex min-h-0 shrink-0 flex-col border-r border-line bg-toolbar transition-[width] duration-150',
        collapsed ? 'w-16' : 'w-[226px]',
      )}
      aria-label="主导航"
    >
      <div className={cn('flex h-[58px] shrink-0 items-center border-b border-line-soft', collapsed ? 'justify-center gap-0.5 px-1' : 'justify-between px-3')}>
        <button
          type="button"
          className="flex min-w-0 items-center gap-2 rounded-md border-0 bg-transparent p-0.5 text-left hover:bg-hover"
          onClick={() => onNavigate('opencode')}
          title="AI Bobby"
        >
          <BrandMark className={cn('shrink-0 text-primary', collapsed ? 'size-6' : 'size-7')} />
          {!collapsed ? (
            <span className="flex min-w-0 flex-col">
              <span className="text-[14px] font-semibold leading-tight tracking-[-0.015em] text-text">AI Bobby{devMode ? ' Dev' : ''}</span>
              <span className="font-mono text-[8px] leading-tight tracking-[0.1em] text-faint">LOCAL GATEWAY</span>
            </span>
          ) : null}
        </button>
        <button
          type="button"
          className={cn(
            'grid size-6 shrink-0 place-items-center rounded border-0 bg-transparent text-faint hover:bg-hover hover:text-text',
            collapsed ? 'size-5' : '',
          )}
          onClick={onToggle}
          aria-label={collapsed ? '展开侧边栏' : '收起侧边栏'}
          title={collapsed ? '展开侧边栏' : '收起侧边栏'}
        >
          {collapsed ? <ChevronsRight className="size-3.5" /> : <ChevronsLeft className="size-4" />}
        </button>
      </div>

      <nav className="min-h-0 flex-1 overflow-auto px-2 py-3">
        {!collapsed ? (
          <div className="px-2 pb-1.5 pt-1 font-mono text-[9px] font-semibold tracking-[0.1em] text-faint">{t('总览')}</div>
        ) : null}
        <button
          type="button"
          className={cn(itemClass(page === 'overview'), 'mb-0.5')}
          onClick={() => onNavigate('overview')}
          title="概览"
          aria-current={page === 'overview' ? 'page' : undefined}
        >
          <LayoutDashboard className={cn('size-[17px] shrink-0', page === 'overview' ? 'text-primary' : 'text-faint group-hover:text-muted-foreground')} />
          {!collapsed ? <span className="min-w-0 flex-1 truncate">{t('概览')}</span> : null}
        </button>
        {!collapsed ? (
          <div className="px-2 pb-1.5 pt-4 font-mono text-[9px] font-semibold tracking-[0.1em] text-faint">{t('模型来源')}</div>
        ) : <div className="my-2 h-px bg-line-soft" />}
        {SOURCE_ITEMS.map(item => {
          const Icon = item.icon
          const active = page === item.id
          const disabled = WBI_TEMPORARILY_DISABLED && item.id === 'wbi'
          return (
            <button
              key={item.id}
              type="button"
              className={cn(itemClass(active), 'mb-0.5', disabled && 'cursor-not-allowed opacity-50 hover:bg-transparent')}
              onClick={() => onNavigate(item.id)}
              disabled={disabled}
              title={disabled ? `${item.label} · 维护中` : item.label}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className={cn('size-[17px] shrink-0', active ? 'text-primary' : 'text-faint group-hover:text-muted-foreground')} />
              {!collapsed ? (
                <>
                  <span className="min-w-0 flex-1 truncate">{devMode && !disabled ? `Dev.${item.label}` : item.label}</span>
                  <span className={cn('min-w-[34px] rounded bg-surface-2 px-1.5 text-center font-mono text-[9px] leading-4 tabular-nums text-faint', active && 'bg-surface text-primary')}>
                    {disabled ? t('维护中') : counts[item.id]}
                  </span>
                </>
              ) : null}
            </button>
          )
        })}

        {!collapsed ? (
          <div className="px-2 pb-1.5 pt-4 font-mono text-[9px] font-semibold tracking-[0.1em] text-faint">{t('其他')}</div>
        ) : <div className="my-2 h-px bg-line-soft" />}
        <button
          type="button"
          className={cn(itemClass(page === 'history'), 'mb-0.5')}
          onClick={() => onNavigate('history')}
          title="导入历史"
          aria-current={page === 'history' ? 'page' : undefined}
        >
          <History className={cn('size-[17px] shrink-0', page === 'history' ? 'text-primary' : 'text-faint')} />
          {!collapsed ? <span className="min-w-0 flex-1 truncate">{t('历史记录')}</span> : null}
          {!collapsed && historyCount > 0 ? (
            <span className="min-w-5 rounded bg-surface-2 px-1.5 text-center font-mono text-[9px] leading-4 text-faint">{historyCount}</span>
          ) : null}
        </button>
        <button
          type="button"
          className={cn(itemClass(page === 'about'), 'mb-0.5')}
          onClick={() => onNavigate('about')}
          title="关于"
          aria-current={page === 'about' ? 'page' : undefined}
        >
          <UserRound className={cn('size-[17px] shrink-0', page === 'about' ? 'text-primary' : 'text-faint')} />
          {!collapsed ? <span className="min-w-0 flex-1 truncate">{t('关于')}</span> : null}
        </button>
      </nav>

      <div className="border-t border-line-soft p-2">
        <button
          type="button"
          className={cn(itemClass(page === 'settings'))}
          onClick={() => onNavigate('settings')}
          title="设置"
          aria-current={page === 'settings' ? 'page' : undefined}
        >
          <Settings className={cn('size-[17px] shrink-0', page === 'settings' ? 'text-primary' : 'text-faint')} />
          {!collapsed ? <span className="min-w-0 flex-1 truncate">{t('设置')}</span> : null}
        </button>
        {!collapsed ? (
          <div className="mt-1 flex items-center gap-1.5 px-2 pt-1 text-[10px] text-faint">
            <span className={cn('size-1.5 rounded-full', gatewayRunning ? 'bg-success' : 'bg-danger')} />
            <span>{gatewayRunning ? t('运行中') : t('未就绪')}</span>
            <code className="ml-auto font-mono text-[9px]">{port}</code>
          </div>
        ) : null}
      </div>
    </aside>
  )
}
