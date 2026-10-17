import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import type { DemoSource, ProviderId } from '@/lib/demo-data'

interface SourceTabsProps {
  active: ProviderId
  onChange: (id: ProviderId) => void
  sources: Record<ProviderId, DemoSource>
}

function availableCount(source: DemoSource) {
  return source.models.filter(model => model.status === 'available').length
}

export function SourceTabs({ active, onChange, sources }: SourceTabsProps) {
  return (
    <Tabs value={active} onValueChange={value => onChange(value as ProviderId)} className="app-no-drag">
      <TabsList className="h-8 gap-0.5 rounded-lg border border-line bg-app p-0.5">
        {(Object.keys(sources) as ProviderId[]).map(id => {
          const source = sources[id]
          return (
            <TabsTrigger
              key={id}
              value={id}
              className={cn(
                'h-7 gap-1.5 rounded-md border border-transparent bg-transparent px-2.5 text-[12px] font-medium text-muted-foreground',
                'data-[state=active]:border-primary/35 data-[state=active]:bg-accent-soft data-[state=active]:text-text',
                'hover:bg-hover hover:text-text',
              )}
            >
              {source.label}
              <span
                className={cn(
                  'min-w-[17px] rounded px-1 text-center text-[10px] tabular-nums',
                  'bg-surface-2 text-faint',
                  active === id && 'bg-primary text-primary-foreground',
                )}
              >
                {availableCount(source)}
              </span>
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
}
