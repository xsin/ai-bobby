import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { DemoAccount, DemoSource } from '@/lib/demo-data'
import { t } from '@/lib/i18n'

interface AccountStripProps {
  source: DemoSource
  accounts: DemoAccount[]
  onAdd: () => void
}

export function AccountStrip({ source, accounts, onAdd }: AccountStripProps) {
  if (source.id === 'opencode') return null

  return (
    <section className="mt-3 flex items-center gap-2.5 overflow-x-auto rounded-lg border border-line bg-surface px-2.5 py-2">
      <div className="flex min-w-[58px] shrink-0 flex-col gap-px border-r border-line-soft pr-2.5">
        <span className="text-[11px] font-semibold text-text">{t("账号")}</span>
        <span className="whitespace-nowrap text-[10px] text-faint">
          {accounts.length > 1 ? t('round-robin · 失败切换') : t('单账号 · 可继续添加')}
        </span>
      </div>

      <div className="flex min-w-0 items-center gap-2">
        {accounts.map(account => (
          <div
            key={account.name}
            className={cn(
              'flex items-center gap-1.5 whitespace-nowrap rounded-md border border-line-soft bg-surface-2 py-1 pl-1 pr-2',
              account.preferred && 'border-primary/40 bg-accent-soft',
              account.status === 'cooling' && 'opacity-80',
            )}
          >
            <span className="grid size-[22px] place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {account.initials}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold text-text">{account.name}</span>
              <span className="text-[10px] text-muted-foreground">{account.sub}</span>
            </span>
            <span
              className={cn(
                'size-1.5 rounded-full',
                account.status === 'cooling' ? 'bg-warning' : account.status === 'error' ? 'bg-danger' : 'bg-success',
              )}
            />
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAdd}
        className="shrink-0 gap-1 border-dashed bg-transparent text-muted-foreground"
      >
        <Plus className="size-3.5" />
        {t('添加账号')}
      </Button>
    </section>
  )
}
