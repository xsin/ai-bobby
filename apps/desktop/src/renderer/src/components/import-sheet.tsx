import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Check, Copy, FileCode2, FolderGit2, Terminal } from 'lucide-react'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { toProviderGroups } from '@/lib/import-groups'
import {
  IMPORT_CLIENTS,
  SOURCES,
  isUsable,
  WBI_TEMPORARILY_DISABLED,
  type ImportClient,
  type ProviderId,
} from '@/lib/demo-data'
import type { ImportPlanSnapshot, ImportTargetName } from '@shared/api'
import { t } from '@/lib/i18n'

interface ImportSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedByGroup: Record<ProviderId, number>
  selectedIdsByGroup: Record<ProviderId, string[]>
  selectedTotal: number
  onApplied: () => void
  onApply?: (payload: { clients: ClientId[]; groups: ProviderId[]; modelIds: string[]; defaultModelId: string; setAsDefault: boolean }) => Promise<void> | void
  codexModels: string[]
}

type ClientId = ImportClient['id']
type GroupId = 'oc' | 'wb' | 'wbi' | 'nv'

const CLIENT_ICONS: Record<ClientId, typeof Terminal> = {
  workbuddy: FolderGit2,
  wbi: FolderGit2,
  codex: Terminal,
  claude: FileCode2,
  dsh: FileCode2,
  vscode: FileCode2,
}

const GROUP_LABELS: Record<GroupId, string> = {
  oc: 'OC',
  wb: 'WB',
  wbi: 'WBI',
  nv: 'NV',
}

const TARGET_MAP: Record<ClientId, ImportTargetName> = {
  workbuddy: 'workbuddy',
  wbi: 'workbuddy-ai',
  codex: 'codex',
  claude: 'claude',
  dsh: 'dsh',
  vscode: 'vscode',
}

const TARGET_LABEL: Record<string, string> = {
  workbuddy: 'WorkBuddy',
  'workbuddy-ai': 'WorkBuddy AI',
  codex: 'Codex',
  claude: 'Claude Code',
  dsh: 'DeepSeek Harness',
  vscode: 'VS Code',
}

export function ImportSheet({ open, onOpenChange, selectedByGroup, selectedIdsByGroup, selectedTotal, onApplied, onApply, codexModels }: ImportSheetProps) {
  const [clients, setClients] = useState<Record<ClientId, boolean>>(
    Object.fromEntries(IMPORT_CLIENTS.map(client => [client.id, !(WBI_TEMPORARILY_DISABLED && client.id === 'wbi')])) as Record<ClientId, boolean>,
  )
  const [groups, setGroups] = useState<Record<GroupId, boolean>>({ oc: true, wb: true, wbi: !WBI_TEMPORARILY_DISABLED, nv: true })
  const [defaultModel, setDefaultModel] = useState('')
  const [cursorGuideOpen, setCursorGuideOpen] = useState(false)
  const [setAsDefault, setSetAsDefault] = useState(false)

  const modelOptions = useMemo(() => {
    const providers = (Object.keys(SOURCES) as ProviderId[]).filter(provider => {
      if (!groups[groupOf(provider)]) return false
      return !(WBI_TEMPORARILY_DISABLED && provider === 'wbi')
    })
    return providers.flatMap(provider =>
      selectedIdsByGroup[provider].flatMap(id => {
        const model = SOURCES[provider].models.find(item => item.id === id)
        return model === undefined ? [] : [{ value: model.id, label: model.display }]
      }),
    )
  }, [groups, selectedIdsByGroup])

  useEffect(() => {
    if (!modelOptions.some(option => option.value === defaultModel)) {
      setDefaultModel(modelOptions[0]?.value ?? '')
    }
  }, [defaultModel, modelOptions])

  const checkedClients = IMPORT_CLIENTS.filter(client => clients[client.id])
  const clientKey = checkedClients.map(client => client.id).join(',')
  const activeGroups = useMemo(
    () => (Object.keys(groups) as GroupId[]).filter(group => groups[group] && !(WBI_TEMPORARILY_DISABLED && group === 'wbi')).map(providerOf),
    [groups],
  )
  const modelIds = useMemo(
    () => activeGroups.flatMap(group => selectedIdsByGroup[group]),
    [activeGroups, selectedIdsByGroup],
  )

  const codexCoverage = useMemo(() => {
    const ids = activeGroups.flatMap(group => selectedIdsByGroup[group])
    const catalog = Object.values(SOURCES).flatMap(source => source.models)
    const selected = ids.map(id => catalog.find(model => model.id === id)).filter((model): model is NonNullable<typeof model> => model !== undefined)
    const missing = selected.filter(model => !codexModels.includes(model.upstream))
    return { total: selected.length, covered: selected.length - missing.length, missing }
  }, [activeGroups, selectedIdsByGroup, codexModels])

  const [previews, setPreviews] = useState<ImportPlanSnapshot[]>([])
  const [previewing, setPreviewing] = useState(false)
  const [previewError, setPreviewError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    const api = window.aiBobby
    if (!api) {
      setPreviews([])
      setPreviewError(null)
      return
    }
    const targetIds = clientKey === '' ? [] : (clientKey.split(',') as ClientId[])
    if (targetIds.length === 0) {
      setPreviews([])
      setPreviewError(null)
      return
    }
    let alive = true
    setPreviewing(true)
    const timer = window.setTimeout(() => {
      void Promise.all(
        targetIds.map(async client =>
          api
            .importPreview(TARGET_MAP[client], {
              groups: toProviderGroups(activeGroups),
              modelIds,
              defaultModelId: defaultModel,
              setAsDefault,
            })
            .catch(error => ({
              target: TARGET_MAP[client],
              path: '',
              detected: false,
              changed: false,
              diff: '',
              warnings: [error instanceof Error ? error.message : String(error)],
              requiresRestart: false,
            })),
        ),
      )
        .then(plans => {
          if (!alive) return
          setPreviews(plans)
          setPreviewError(null)
        })
        .catch(error => {
          if (alive) setPreviewError(error instanceof Error ? error.message : String(error))
        })
        .finally(() => {
          if (alive) setPreviewing(false)
        })
    }, 250)
    return () => {
      alive = false
      window.clearTimeout(timer)
    }
  }, [open, clientKey, activeGroups, modelIds, defaultModel, setAsDefault])

  const demoDiff = useMemo(
    () => buildDiff(checkedClients, groups, selectedByGroup, defaultModel),
    [checkedClients, groups, selectedByGroup, defaultModel],
  )

  const realDiff = useMemo(() => {
    const blocks = previews
      .filter(plan => plan.diff.trim() !== '')
      .map(plan => `# ${TARGET_LABEL[plan.target] ?? plan.target}  ${plan.path}\n${plan.diff}`)
    return blocks.length > 0 ? blocks.join('\n\n') : '# 没有需要写入的变更'
  }, [previews])

  const previewWarnings = useMemo(
    () => previews.flatMap(plan => plan.warnings.map(warning => `${TARGET_LABEL[plan.target] ?? plan.target}：${warning}`)),
    [previews],
  )

  function toggleClient(id: ClientId, checked: boolean) {
    if (WBI_TEMPORARILY_DISABLED && id === 'wbi') return
    setClients(current => ({ ...current, [id]: checked }))
  }

  function toggleGroup(id: GroupId, checked: boolean) {
    if (WBI_TEMPORARILY_DISABLED && id === 'wbi') return
    setGroups(current => ({ ...current, [id]: checked }))
  }

  async function apply() {
    if (checkedClients.length === 0) {
      toast.error('请至少选择一个客户端')
      return
    }
    if (selectedTotal === 0) {
      toast.error('请至少勾选一个模型')
      return
    }
    const activeGroups = (Object.keys(groups) as GroupId[]).filter(group => groups[group] && !(WBI_TEMPORARILY_DISABLED && group === 'wbi')).map(providerOf)
    const modelIds = activeGroups.flatMap(group => selectedIdsByGroup[group])
    if (onApply) {
      try {
        await onApply({
          clients: checkedClients.map(client => client.id),
          groups: activeGroups,
          modelIds,
          defaultModelId: defaultModel,
          setAsDefault,
        })
        onOpenChange(false)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : String(error))
      }
      return
    }
    toast.success(`原型演示：将备份后写入 ${checkedClients.length} 个客户端`)
    onApplied()
    onOpenChange(false)
  }

  return (
    <>
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 border-line bg-surface p-0 sm:max-w-[480px]">
        <SheetHeader className="border-b border-line bg-toolbar px-5 py-4 text-left">
          <SheetTitle className="text-[15px] font-semibold text-text">{t("导入到客户端")}</SheetTitle>
          <SheetDescription className="text-[11px] text-muted-foreground">
            {t('变更自动预览，确认后写入；只改 AI Bobby 自己的条目。')}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="min-h-0 min-w-0 flex-1">
          <div className="w-full min-w-0 space-y-5 px-5 py-4">
            <section>
              <SectionTitle title={t("客户端")} hint={`${checkedClients.length} ${t('个已选择')}`} />
              <div className="space-y-1.5">
                {IMPORT_CLIENTS.map(client => {
                  const Icon = CLIENT_ICONS[client.id]
                  const checked = clients[client.id]
                  const disabled = WBI_TEMPORARILY_DISABLED && client.id === 'wbi'
                  return (
                    <label
                      key={client.id}
                      className={cn(
                        'flex min-w-0 items-center gap-2.5 rounded-md border px-2.5 py-2 transition-colors',
                        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                        checked
                          ? 'border-primary/35 bg-accent-soft'
                          : 'border-line-soft bg-surface-2 hover:border-line hover:bg-hover',
                      )}
                    >
                      <Checkbox
                        checked={checked}
                        disabled={disabled}
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
                      <span className={cn('shrink-0 rounded px-1 py-px text-[9px]', disabled ? 'bg-warning-soft text-warning' : 'bg-success-soft text-success')}>
                        {disabled ? t('维护中') : client.status}
                      </span>
                    </label>
                  )
                })}
              </div>
              {clients.codex ? (
                <div className="mt-2 rounded-md border border-warning/30 bg-warning-soft/40 px-2.5 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-[11px] font-semibold text-text">{t('Codex 元数据')}</strong>
                    <span className="font-mono text-[10px] text-warning">{codexCoverage.covered}/{codexCoverage.total}</span>
                  </div>
                  <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
                    {codexCoverage.missing.length === 0
                      ? t('已选模型都有 Codex 元数据，会全部写入 Codex 模型选择器。')
                      : t('{n} 个已选模型缺少 Codex 元数据，不会写入 Codex 模型选择器；其他客户端仍会导入。', { n: codexCoverage.missing.length })}
                  </p>
                  {codexCoverage.missing.length > 0 ? (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {codexCoverage.missing.map(model => (
                        <span key={model.id} className="rounded bg-warning-soft px-1.5 py-0.5 font-mono text-[9px] text-warning">{model.display}</span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
              <div className="mt-2 flex items-center justify-between gap-3 rounded-md border border-dashed border-line px-2.5 py-2">
                <div className="min-w-0">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-text">
                    Cursor
                    <span className="rounded bg-warning-soft px-1 py-px text-[9px] font-normal text-warning">{t("仅引导")}</span>
                  </span>
                  <p className="mt-0.5 text-[9px] text-faint">{t("不写数据库 · 手动粘贴")}</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => setCursorGuideOpen(true)}>
                  查看接入步骤
                </Button>
              </div>
            </section>

            <section>
              <SectionTitle title={t("分组")} hint={t('WorkBuddy 目标自动排除自身分组')} />
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(groups) as GroupId[]).map(group => {
                  const checked = groups[group]
                  const disabled = WBI_TEMPORARILY_DISABLED && group === 'wbi'
                  const available = SOURCES[providerOf(group)].models.filter(isUsable).length
                  return (
                    <label
                      key={group}
                      className={cn(
                        'flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-[11px]',
                        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                        checked
                          ? 'border-primary/35 bg-accent-soft text-text'
                          : 'border-line bg-surface-2 text-muted-foreground',
                      )}
                    >
                      <Checkbox
                        checked={checked}
                        disabled={disabled}
                        onCheckedChange={value => toggleGroup(group, value === true)}
                        aria-label={`导入 ${GROUP_LABELS[group]} 分组`}
                      />
                      {GROUP_LABELS[group]}{disabled ? ` · ${t('维护中')}` : ''}
                      <strong className="text-[10px] text-text">{selectedByGroup[providerOf(group)]}</strong>
                      <span className="text-[9px] text-faint">/{available}</span>
                    </label>
                  )
                })}
              </div>
            </section>

            <section>
              <SectionTitle title={t("默认模型")} hint={t('用于 Codex / Claude Code')} />
              <Select value={defaultModel} onValueChange={setDefaultModel}>
                <SelectTrigger className="h-8 w-full border-line bg-surface text-[11px]">
                  <SelectValue placeholder={t("选择默认模型")} />
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
                {t('同时设为目标客户端的默认模型')}
              </label>
              <p className="mt-1.5 text-[10px] leading-relaxed text-faint">
                「客户端」指导入目标（Codex / Claude Code / DSH / WorkBuddy），不是 AI Bobby。
                {t('这里只影响 Codex 与 Claude Code 的默认模型字段；VS Code 会自动发现全部模型。')}
              </p>
            </section>

            <section>
              <SectionTitle
                title={t("变更预览")}
                hint={previewing ? '更新中…' : window.aiBobby ? '自动更新 · 只读，不会写入' : '原型预览'}
              />
              <p className="mb-2 text-[10px] leading-relaxed text-faint">
                {t('勾选模型、切换分组或客户端时这里会自动更新；点「写入」之前不会修改任何文件。')}
              </p>
              {previewError ? (
                <p className="rounded-md border border-danger/30 bg-danger-soft px-2.5 py-2 text-[10px] text-danger">
                  预览失败：{previewError}
                </p>
              ) : (
                <pre className="max-h-[220px] overflow-auto rounded-md border border-line bg-code p-2.5 font-mono text-[10px] leading-relaxed text-code-text">
                  {window.aiBobby ? realDiff : demoDiffText(demoDiff)}
                </pre>
              )}
              {window.aiBobby && previewWarnings.length > 0 ? (
                <p className="mt-1.5 text-[10px] leading-relaxed text-warning">{previewWarnings[0]}</p>
              ) : null}
            </section>
          </div>
        </ScrollArea>

        <SheetFooter className="flex-row items-center justify-between gap-3 border-t border-line bg-toolbar px-5 py-3 sm:justify-between">
          <span className="text-[10px] text-muted-foreground">
            {t('已选')} {selectedTotal} {t('个模型')} · {checkedClients.length} {t('个客户端')}
          </span>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="button" size="sm" className="bg-primary text-primary-foreground" onClick={apply}>
              写入
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>

    <Dialog open={cursorGuideOpen} onOpenChange={setCursorGuideOpen}>
      <DialogContent className="max-w-[560px] gap-0 border-line bg-surface p-0">
        <DialogHeader className="border-b border-line px-5 py-4 text-left">
          <DialogTitle className="text-[15px] font-semibold text-text">{t("在 Cursor 中接入 AI Bobby")}</DialogTitle>
          <DialogDescription className="text-[11px] text-muted-foreground">
            Cursor 的设置存在 SQLite 与钥匙串里，AI Bobby 不写它的数据库，按下面步骤手动粘贴即可。
          </DialogDescription>
        </DialogHeader>
        <ol className="space-y-2 px-5 py-4">
          {[
            ['打开 Cursor 设置', 'Settings → Models → API Keys'],
            ['开启 Base URL override', '打开 Override OpenAI Base URL，粘贴 http://127.0.0.1:46890/v1'],
            ['粘贴 API Key', '填写 AI Bobby 的 Key；Cursor 会自己加密保存。'],
            ['选择模型', '回到 Chat / Agent 选择 AI Bobby 模型；Tab 补全仍走 Cursor 自己的模型。'],
          ].map(([title, text], index) => (
            <li key={title} className="flex gap-2.5">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-[10px] text-primary">{index + 1}</span>
              <div>
                <strong className="block text-[11px] font-semibold text-text">{title}</strong>
                <p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="px-5 pb-3 text-[10px] leading-relaxed text-faint">
          只影响 Chat / Agent；开启 override 后 Cursor 托管模型也会走该地址，切回时记得关闭。
        </div>
        <DialogFooter className="border-t border-line px-5 py-3">
          <Button type="button" variant="outline" size="sm" onClick={() => setCursorGuideOpen(false)}>{t("关闭")}</Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={async () => {
              const api = window.aiBobby
              if (api) await api.copyApiKey()
              else await navigator.clipboard.writeText('')
              toast.success('API Key 已复制')
            }}
          >
            <Copy className="size-3.5" />复制 Key
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={async () => {
              await navigator.clipboard.writeText('http://127.0.0.1:46890/v1')
              toast.success('Base URL 已复制')
            }}
          >
            <Copy className="size-3.5" />复制 Base URL
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
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
  return provider === 'opencode' ? 'oc' : provider === 'workbuddy' ? 'wb' : provider === 'nvidia' ? 'nv' : 'wbi'
}

function providerOf(group: GroupId): ProviderId {
  return group === 'oc' ? 'opencode' : group === 'wb' ? 'workbuddy' : group === 'nv' ? 'nvidia' : 'wbi'
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
  if (!groups.oc && !groups.wb && !groups.wbi && !groups.nv) return [{ type: 'dim', text: '# 请选择至少一个分组' }]

  const lines: DiffLine[] = [
    { type: 'dim', text: '# AI Bobby · dry-run 预览（不会写入任何文件）' },
    { type: 'dim', text: '' },
  ]
  const countOf = (group: GroupId) => (groups[group] ? counts[providerOf(group)] : 0)

  for (const client of clients) {
    if (client.id === 'workbuddy') {
      lines.push({ type: 'add', text: 'WorkBuddy（国内）  ~/.workbuddy/models.json' })
      lines.push({ type: 'add', text: `+ ${countOf('oc') + countOf('wbi') + countOf('nv')} 个模型（自动排除 WB 自身分组）` })
      lines.push({ type: 'dim', text: '  url = http://127.0.0.1:46890/v1/chat/completions' })
      lines.push({ type: 'dim', text: '  apiKey = sk-…f3a2 · aiBobbyOwner = ai-bobby-v1' })
    } else if (client.id === 'wbi') {
      lines.push({ type: 'add', text: 'WorkBuddy AI（国际）  ~/.workbuddy-ai/models.json' })
      lines.push({ type: 'add', text: `+ ${countOf('oc') + countOf('wb') + countOf('nv')} 个模型（自动排除 WBI 自身分组）` })
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
    } else if (client.id === 'vscode') {
      lines.push({ type: 'add', text: 'VS Code  ~/Library/Application Support/Code/User/chatLanguageModels.json' })
      lines.push({ type: 'add', text: '+ vendor = "customendpoint" · name = "AI Bobby"' })
      lines.push({ type: 'add', text: '+ url = http://127.0.0.1:46890/v1' })
      lines.push({ type: 'dim', text: '  Key 会被 VS Code 迁移到系统钥匙串；重启后生效' })
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

function demoDiffText(lines: DiffLine[]): string {
  return lines.map(line => line.text).join('\n')
}
