import { useState, type Key, type MouseEvent, type ReactNode } from 'react'
import { ChevronRight, Copy, RefreshCw } from 'lucide-react'
import { Table, type TableProps } from 'antd'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { STATUS_META, isUsable, type DemoModel, type DemoSource } from '@/lib/demo-data'
import { t } from '@/lib/i18n'

interface ModelTableProps {
  source: DemoSource
  models: DemoModel[]
  selected: Set<string>
  onSelectionChange: (selected: Set<string>) => void
  onProbe: (id: string) => void
}

function statusTone(tone: 'success' | 'warning' | 'danger' | 'neutral') {
  return {
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    neutral: 'bg-faint',
  }[tone]
}

function statusTextTone(tone: 'success' | 'warning' | 'danger' | 'neutral') {
  return {
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
    neutral: 'text-muted-foreground',
  }[tone]
}

function routeFor(id: string) {
  const normalized = id.replace(/^dev-/, '')
  if (normalized.startsWith('oc/')) return 'OpenCode'
  if (normalized.startsWith('wb/')) return 'WorkBuddy'
  if (normalized.startsWith('wbi/')) return 'WorkBuddy AI'
  if (normalized.startsWith('nv/')) return 'NVIDIA NIM'
  return 'WorkBuddy AI'
}

export function ModelTable({ source, models, selected, onSelectionChange, onProbe }: ModelTableProps) {
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([])

  function toggleExpanded(id: string) {
    setExpandedKeys(keys => (keys.includes(id) ? keys.filter(key => key !== id) : [...keys, id]))
  }

  const columns: NonNullable<TableProps<DemoModel>['columns']> = [
    {
      title: t('模型'),
      dataIndex: 'display',
      key: 'display',
      width: 'auto',
      render: (_value, model) => (
        <div className="flex min-w-0 items-center gap-1.5">
          <button
            type="button"
            aria-label={`${expandedKeys.includes(model.id) ? t('收起') : t('展开')} ${model.display}`}
            className="app-no-drag flex size-5 shrink-0 appearance-none items-center justify-center rounded border-0 bg-transparent text-faint hover:bg-surface-2 hover:text-text"
            onClick={event => {
              event.stopPropagation()
              toggleExpanded(model.id)
            }}
          >
            <ChevronRight
              className={cn('size-3.5 transition-transform', expandedKeys.includes(model.id) && 'rotate-90')}
            />
          </button>
          <span className="flex min-w-0 flex-col gap-px">
            <span className="truncate text-[12px] font-medium text-text">{model.display}</span>
            <span className="truncate font-mono text-[10px] leading-tight text-faint">{model.id}</span>
          </span>
        </div>
      ),
    },
    {
      title: t('能力'),
      dataIndex: 'caps',
      key: 'caps',
      width: 130,
      render: (caps: string[]) => (
        <div className="flex flex-wrap items-center gap-1">
          {caps.map((cap, index) => (
            <span
              key={cap}
              className={cn(
                'rounded border px-1.5 py-px text-[10px] leading-[15px]',
                index === 0
                  ? 'border-primary/35 bg-accent-soft text-primary'
                  : 'border-line text-muted-foreground',
              )}
            >
              {t(cap)}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: t('计费'),
      dataIndex: 'billing',
      key: 'billing',
      width: 132,
      render: (_value, model) => <BillingCell billing={model.billing} />,
    },
    {
      title: t('状态'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (_value, model) => {
        const meta = STATUS_META[model.status]
        return (
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className={cn('size-1.5 rounded-full', statusTone(meta.tone))} />
            <span className={cn('text-[11px]', statusTextTone(meta.tone))}>{t(meta.label)}</span>
          </div>
        )
      },
    },
    {
      title: t(source.lastHeader),
      dataIndex: 'latency',
      key: 'latency',
      width: 148,
      sorter: (a, b) => (a.latencyMs ?? Number.POSITIVE_INFINITY) - (b.latencyMs ?? Number.POSITIVE_INFINITY),
      render: (value: string) => (
        <span className="text-[11px] tabular-nums text-muted-foreground">{value}</span>
      ),
    },
  ]

  const detail = (model: DemoModel): ReactNode => {
    const meta = STATUS_META[model.status]
    return (
      <div className="grid grid-cols-2 gap-x-5 gap-y-2 px-2 py-2.5 sm:grid-cols-4">
        <Detail label={t("上游")} value={model.upstream} mono />
        <Detail label={t("上下文")} value={`${model.context} tokens`} />
        <Detail label={t("最大输出")} value={`${model.maxOutput} tokens`} />
        <Detail label={t("最近检测")} value={model.checked} />
        <Detail label={t("能力")} value={model.caps.map(cap => t(cap)).join(' / ')} />
        <Detail
          label={t("计费")}
          value={
            model.billing === undefined
              ? '—'
              : model.billing.free
                ? t('免费')
                : model.billing.credits ?? (model.billing.rateUnknown ? t('未知') : '—')
          }
        />
        <Detail label={t("路由")} value={routeFor(model.id)} />
        <Detail label={t("状态")} value={meta.label + (model.accounts ? ` · ${model.accounts} ${t('个账号')}` : '')} />
        <div className="col-span-2 flex items-center gap-2 pt-1 sm:col-span-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => onProbe(model.id)}
          >
            <RefreshCw className="size-3" />
            只重测这一个
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1.5"
            onClick={() => {
              void navigator.clipboard.writeText(model.id).then(
                () => toast.success(`已复制 ${model.id}`),
                () => toast.error('复制失败，请手动选择'),
              )
            }}
          >
            <Copy className="size-3" />
            复制模型 ID
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Table<DemoModel>
      className="ai-table"
      rowKey="id"
      dataSource={models}
      columns={columns}
      size="small"
      tableLayout="fixed"
      pagination={false}
      showSorterTooltip={false}
      locale={{ emptyText: '还没有模型；先读取或登录账号。' }}
      rowSelection={{
        selectedRowKeys: [...selected],
        preserveSelectedRowKeys: true,
        columnWidth: 38,
        onChange: keys => onSelectionChange(new Set(keys.map(String))),
        getCheckboxProps: model => ({ disabled: !isUsable(model) }),
      }}
      expandable={{
        expandedRowKeys: expandedKeys,
        onExpandedRowsChange: keys => setExpandedKeys([...keys]),
        expandedRowRender: detail,
        rowExpandable: () => true,
        showExpandColumn: false,
      }}
      onRow={record => ({
        onClick: (event: MouseEvent<HTMLElement>) => {
          const target = event.target as HTMLElement
          if (target.closest('button, input, .ant-checkbox-wrapper, .ant-table-selection-column')) return
          toggleExpanded(record.id)
        },
      })}
    />
  )
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] text-faint">{label}</p>
      <p className={cn('truncate text-[11px] text-text', mono && 'font-mono text-[10px]')}>{value}</p>
    </div>
  )
}

function BillingCell({ billing }: { billing?: DemoModel['billing'] }) {
  if (billing === undefined) return <span className="text-[11px] text-faint">—</span>
  if (billing.free) {
    return <span className="rounded border border-success/30 bg-success-soft px-1.5 py-px text-[10px] leading-[15px] text-success">{t("免费")}</span>
  }
  if (billing.credits !== undefined) {
    return <span className="font-mono text-[11px] text-muted-foreground">{billing.credits}</span>
  }
  if (billing.rateUnknown) return <span className="text-[11px] text-faint">{t("未知")}</span>
  return <span className="text-[11px] text-faint">—</span>
}
