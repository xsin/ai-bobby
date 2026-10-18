import { Activity, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { metricsFor, type DemoSource, type SourceAction } from '@/lib/demo-data'

interface SourceHeadProps {
  source: DemoSource
  selectedCount: number
  totalCount: number
  probing: boolean
  onAction: (action: SourceAction['id']) => void
}

export function SourceHead({ source, selectedCount, totalCount, probing, onAction }: SourceHeadProps) {
  const metrics = metricsFor(source)

  return (
    <section className="flex items-start justify-between gap-6 border-b border-line pb-4">
      <div className="min-w-0">
        <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-text">{source.title}</h2>
        <p className="mt-1 text-[12px] text-muted-foreground">{source.subtitle}</p>
        <div className="mt-3 flex items-center gap-2">
          {source.actions.map(action => (
            <Button
              key={action.id}
              type="button"
              variant="outline"
              size="sm"
              disabled={probing && action.id === 'probe'}
              onClick={() => onAction(action.id)}
              className="h-8 gap-1.5 rounded-md border-line bg-surface px-2.5 text-[12px] font-medium"
            >
              {action.icon === 'refresh' ? (
                <RefreshCw className="size-3.5" />
              ) : (
                <Activity className="size-3.5" />
              )}
              {probing && action.id === 'probe' ? '检测中…' : action.label}
            </Button>
          ))}
        </div>
      </div>

      <dl className="flex shrink-0 items-end gap-6">
        {source.metricDefs.map(def => {
          const value = metrics[def.key as keyof typeof metrics] ?? 0
          return (
            <div key={def.key} className="text-right">
              <dt className="text-[11px] text-muted-foreground">{def.label}</dt>
              <dd
                className={cn(
                  'mt-px text-[27px] font-light leading-none tracking-[-0.03em] tabular-nums text-text',
                  def.tone === 'accent' && 'text-success',
                  def.tone === 'warning' && 'text-warning',
                )}
              >
                {value}
              </dd>
            </div>
          )
        })}
        <div className="text-right">
          <dt className="text-[11px] text-muted-foreground">已选</dt>
          <dd className="mt-px text-[27px] font-light leading-none tracking-[-0.03em] tabular-nums text-primary">
            {selectedCount}
            <span className="ml-0.5 text-[12px] font-normal text-faint">/ {totalCount}</span>
          </dd>
        </div>
      </dl>
    </section>
  )
}
