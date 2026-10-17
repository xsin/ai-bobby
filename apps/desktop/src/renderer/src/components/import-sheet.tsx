import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Check, FileCode2, FolderGit2, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import {
  IMPORT_CLIENTS,
  SOURCES,
  isUsable,
  type ImportClient,
  type ProviderId,
} from '@/lib/demo-data'

interface ImportSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedByGroup: Record<ProviderId, number>
  selectedTotal: number
  onApplied: () => void
}

type ClientId = ImportClient['id']
type GroupId = 'oc' | 'wb' | 'wbi'

const CLIENT_ICONS: Record<ClientId, typeof Terminal> = {
  workbuddy: FolderGit2,
  wbi: FolderGit2,
  codex: Terminal,
  claude: FileCode2,
  dsh: FileCode2,
}

const GROUP_LABELS: Record<GroupId, string> = {
  oc: 'OC',
  wb: 'WB',
  wbi: 'WBI',
}

export function ImportSheet({ open, onOpenChange, selectedByGroup, selectedTotal, onApplied }: ImportSheetProps) {
  const [clients, setClients] = useState<Record<ClientId, boolean>>(
    Object.fromEntries(IMPORT_CLIENTS.map(client => [client.id, true])) as Record<ClientId, boolean>,
  )
  const [groups, setGroups] = useState<Record<GroupId, boolean>>({ oc: true, wb: true, wbi: true })
  const [defaultModel, setDefaultModel] = useState('oc/big-pickle')
  const [setAsDefault, setSetAsDefault] = useState(false)

  const modelOptions = useMemo(
    () =>
      (Object.keys(SOURCES) as ProviderId[]).flatMap(provider => {
        if (!groups[groupOf(provider)]) return []
        return SOURCES[provider].models
          .filter(isUsable)
          .map(model => ({ value: model.id, label: model.display }))
      }),
    [groups],
  )

  useEffect(() => {
    if (!modelOptions.some(option => option.value === defaultModel)) {
      setDefaultModel(modelOptions[0]?.value ?? '')
    }
  }, [defaultModel, modelOptions])

  const checkedClients = IMPORT_CLIENTS.filter(client => clients[client.id])
  const diff = useMemo(
    () => buildDiff(checkedClients, groups, selectedByGroup, defaultModel),
    [checkedClients, groups, selectedByGroup, defaultModel],
  )

  function toggleClient(id: ClientId, checked: boolean) {
    setClients(current => ({ ...current, [id]: checked }))
  }

  function toggleGroup(id: GroupId, checked: boolean) {
    setGroups(current => ({ ...current, [id]: checked }))
  }

  function apply() {
    if (checkedClients.length === 0) {
      toast.error('请至少选择一个客户端')
      return
    }
    if (selectedTotal === 0) {
      toast.error('请至少勾选一个模型')
      return
    }
    toast.success(`原型演示：将备份后写入 ${checkedClients.length} 个客户端`)
    onApplied()
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 border-line bg-surface p-0 sm:max-w-[480px]">
        <SheetHeader className="border-b border-line bg-toolbar px-5 py-4 text-left">
          <SheetTitle className="text-[15px] font-semibold text-text">导入到客户端</SheetTitle>
          <SheetDescription className="text-[11px] text-muted-foreground">
            先预览，再写入；只改 AI Bobby 自己的条目。
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-5 px-5 py-4">
            <section>
              <SectionTitle title="客户端" hint={`${checkedClients.length} 个已选择`} />
              <div className="space-y-1.5">
                {IMPORT_CLIENTS.map(client => {
                  const Icon = CLIENT_ICONS[client.id]
                  const checked = clients[client.id]
                  return (
                    <label
                      key={client.id}
                      className={cn(
                        'flex cursor-pointer items-center gap-2.5 rounded-md border px-2.5 py-2 transition-colors',
                        checked
                          ? 'border-primary/35 bg-accent-soft'
                          : 'border-line-soft bg-surface-2 hover:border-line hover:bg-hover',
                      )}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={value => toggleClient(client.id, value === true)}
                        aria-label={`导入到 ${client.name}`}
                      />
                      <Icon className="size-4 shrink-0 text-muted-foreground" />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-text">
                          {client.name}
                          <span className="rounded bg-surface px-1 py-px text-[9px] font-normal text-faint">
                            {client.note}
                          </span>
                        </span>
                        <span className="block truncate font-mono text-[9px] text-faint">{client.path}</span>
                      </span>
                      <span className="shrink-0 rounded bg-success-soft px-1 py-px text-[9px] text-success">
                        {client.status}
                      </span>
                    </label>
                  )
                })}
              </div>
            </section>

            <section>
              <SectionTitle title="分组" hint="WorkBuddy 目标自动排除自身分组" />
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(groups) as GroupId[]).map(group => {
                  const checked = groups[group]
                  const available = SOURCES[providerOf(group)].models.filter(isUsable).length
                  return (
                    <label
                      key={group}
                      className={cn(
                        'flex cursor-pointer items-center gap-1.5 rounded-md border px-2 py-1.5 text-[11px]',
                        checked
                          ? 'border-primary/35 bg-accent-soft text-text'
                          : 'border-line bg-surface-2 text-muted-foreground',
                      )}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={value => toggleGroup(group, value === true)}
                        aria-label={`导入 ${GROUP_LABELS[group]} 分组`}
                      />
                      {GROUP_LABELS[group]}
                      <strong className="text-[10px] text-text">{selectedByGroup[providerOf(group)]}</strong>
                      <span className="text-[9px] text-faint">/{available}</span>
                    </label>
                  )
                })}
              </div>
            </section>

            <section>
              <SectionTitle title="默认模型" hint="用于 Codex / Claude Code" />
              <Select value={defaultModel} onValueChange={setDefaultModel}>
                <SelectTrigger className="h-8 w-full border-line bg-surface text-[11px]">
                  <SelectValue placeholder="选择默认模型" />
                </SelectTrigger>
                <SelectContent className="border-line bg-popover">
                  {modelOptions.map(option => (
                    <SelectItem key={option.value} value={option.value} className="text-[11px]">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <label className="mt-2 flex cursor-pointer items-center gap-2 text-[11px] text-muted-foreground">
                <Checkbox checked={setAsDefault} onCheckedChange={value => setSetAsDefault(value === true)} />
                同时设为客户端默认模型
              </label>
            </section>

            <section>
              <SectionTitle title="预览变更" hint={checkedClients.map(client => client.name).join(' · ') || '未选择客户端'} />
              <pre className="max-h-[220px] overflow-auto rounded-md border border-line bg-code p-2.5 font-mono text-[10px] leading-relaxed text-code-text">
                {diff.map((line, index) => (
                  <div
                    key={`${index}-${line.text}`}
                    className={cn(
                      line.type === 'add' && 'text-code-add',
                      line.type === 'del' && 'text-code-del',
                      line.type === 'dim' && 'text-code-dim',
                    )}
                  >
                    {line.text || '\u00A0'}
                  </div>
                ))}
              </pre>
            </section>
          </div>
        </ScrollArea>

        <SheetFooter className="flex-row items-center justify-between gap-3 border-t border-line bg-toolbar px-5 py-3 sm:justify-between">
          <span className="text-[10px] text-muted-foreground">
            已选 {selectedTotal} 个模型 · {checkedClients.length} 个客户端
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 border-line bg-surface text-[11px]"
              onClick={() => toast.success('已生成 dry-run 预览；写入前不会修改任何文件')}
            >
              预览变更
            </Button>
            <Button type="button" size="sm" className="h-8 bg-primary text-[11px] text-primary-foreground" onClick={apply}>
              写入
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function SectionTitle({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <h3 className="shrink-0 text-[12px] font-semibold text-text">{title}</h3>
      <span className="truncate text-right text-[10px] text-faint">{hint}</span>
    </div>
  )
}

function groupOf(provider: ProviderId): GroupId {
  return provider === 'opencode' ? 'oc' : provider === 'workbuddy' ? 'wb' : 'wbi'
}

function providerOf(group: GroupId): ProviderId {
  return group === 'oc' ? 'opencode' : group === 'wb' ? 'workbuddy' : 'wbi'
}

interface DiffLine {
  type: 'add' | 'del' | 'dim'
  text: string
}

function buildDiff(
  clients: ImportClient[],
  groups: Record<GroupId, boolean>,
  counts: Record<ProviderId, number>,
  defaultModel: string,
): DiffLine[] {
  if (clients.length === 0) return [{ type: 'dim', text: '# 请选择至少一个客户端' }]
  if (!groups.oc && !groups.wb && !groups.wbi) return [{ type: 'dim', text: '# 请选择至少一个分组' }]

  const lines: DiffLine[] = [
    { type: 'dim', text: '# AI Bobby · dry-run 预览（不会写入任何文件）' },
    { type: 'dim', text: '' },
  ]
  const countOf = (group: GroupId) => (groups[group] ? counts[providerOf(group)] : 0)

  for (const client of clients) {
    if (client.id === 'workbuddy') {
      lines.push({ type: 'add', text: 'WorkBuddy（国内）  ~/.workbuddy/models.json' })
      lines.push({ type: 'add', text: `+ ${countOf('oc') + countOf('wbi')} 个模型（自动排除 WB 自身分组）` })
      lines.push({ type: 'dim', text: '  url = http://127.0.0.1:46890/v1/chat/completions' })
      lines.push({ type: 'dim', text: '  apiKey = sk-…f3a2 · aiBobbyOwner = ai-bobby-v1' })
    } else if (client.id === 'wbi') {
      lines.push({ type: 'add', text: 'WorkBuddy AI（国际）  ~/.workbuddy-ai/models.json' })
      lines.push({ type: 'add', text: `+ ${countOf('oc') + countOf('wb')} 个模型（自动排除 WBI 自身分组）` })
      lines.push({ type: 'dim', text: '  url = http://127.0.0.1:46890/v1/chat/completions' })
    } else if (client.id === 'codex') {
      lines.push({ type: 'add', text: 'Codex  ~/.codex/config.toml' })
      lines.push({ type: 'add', text: '+ [model_providers.ai-bobby]' })
      lines.push({ type: 'add', text: '+ base_url = "http://127.0.0.1:46890/v1"' })
      lines.push({ type: 'add', text: '+ wire_api = "responses"' })
      lines.push({ type: 'add', text: '+ experimental_bearer_token = "sk-…f3a2"' })
    } else if (client.id === 'claude') {
      lines.push({ type: 'add', text: 'Claude Code  ~/.claude/settings.json' })
      lines.push({ type: 'add', text: '+ "ANTHROPIC_BASE_URL": "http://127.0.0.1:46890"' })
      lines.push({ type: 'add', text: '+ "ANTHROPIC_AUTH_TOKEN": "sk-…f3a2"' })
      lines.push({ type: 'add', text: `+ "ANTHROPIC_MODEL": "${defaultModel || 'oc/big-pickle'}"` })
    } else if (client.id === 'dsh') {
      lines.push({ type: 'add', text: 'DeepSeek Harness  ~/.dsh/profiles/desktop/cordis.patch.yml' })
      lines.push({ type: 'add', text: '+ ai-bobby:' })
      lines.push({ type: 'add', text: '+   apiKeyEnv: AI_BOBBY_API_KEY' })
      lines.push({ type: 'add', text: '+   api: openai-completions' })
      lines.push({ type: 'add', text: '+   baseURL: http://127.0.0.1:46890/v1' })
    }
    lines.push({ type: 'dim', text: '' })
  }
  lines.push({ type: 'dim', text: '# 写入前会备份；只增删 aiBobbyOwner 标记的条目。' })
  return lines
}
