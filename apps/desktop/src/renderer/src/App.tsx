import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle2, Download, Settings, X } from 'lucide-react'
import { toast } from 'sonner'
import { AntdProvider } from '@/components/antd-provider'
import { AccountStrip } from '@/components/account-strip'
import { BrandMark } from '@/components/brand-mark'
import { ImportSheet } from '@/components/import-sheet'
import { LoginDialog } from '@/components/login-dialog'
import { ModelTable } from '@/components/model-table'
import { SettingsDialog } from '@/components/settings-dialog'
import { SourceHead } from '@/components/source-head'
import { SourceTabs } from '@/components/source-tabs'
import { StatusBar } from '@/components/status-bar'
import { UpdateBanner } from '@/components/update-banner'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ThemeProvider, useTheme } from '@/lib/theme'
import {
  SOURCES,
  isUsable,
  type DemoAccount,
  type DemoModel,
  type DemoSource,
  type ProviderId,
} from '@/lib/demo-data'
import type {
  AccountSnapshot,
  AppInfo,
  GatewayStatus,
  ModelSnapshot,
  ThemeChoice,
  UpdateInfo,
  UpdateProgress,
} from '@shared/api'

const APP_FALLBACK: AppInfo = {
  version: '0.1.0',
  platform: 'darwin',
  arch: 'arm64',
  packaged: false,
  updateSource: 'https://xsin.github.io/ai-bobby/releases/latest/latest.json',
}

const THEME_OPTIONS: Array<{ id: ThemeChoice; label: string }> = [
  { id: 'system', label: '系统' },
  { id: 'light', label: '浅色' },
  { id: 'dark', label: '深色' },
]

function emptySources(): Record<ProviderId, DemoSource> {
  const copy = typeof structuredClone === 'function'
    ? structuredClone(SOURCES)
    : (JSON.parse(JSON.stringify(SOURCES)) as Record<ProviderId, DemoSource>)
  for (const key of Object.keys(copy) as ProviderId[]) {
    copy[key] = { ...copy[key], models: [], accounts: [], credits: '0' }
  }
  copy.opencode.feedback = 'OpenCode provider 接入后，这里会显示免费模型。'
  copy.workbuddy.feedback = '还没有 WorkBuddy 账号；点击“添加账号”开始。'
  copy.wbi.feedback = '还没有 WorkBuddy AI 账号；点击“添加账号”开始。'
  return copy
}

function cloneSources(): Record<ProviderId, DemoSource> {
  return window.aiBobby ? emptySources() : (typeof structuredClone === 'function'
    ? structuredClone(SOURCES)
    : (JSON.parse(JSON.stringify(SOURCES)) as Record<ProviderId, DemoSource>))
}

function initialSelection(): Record<ProviderId, Set<string>> {
  const base = window.aiBobby ? emptySources() : SOURCES
  return {
    opencode: new Set(base.opencode.models.filter(model => model.status === 'available').map(model => model.id)),
    workbuddy: new Set(base.workbuddy.models.filter(model => model.status === 'available').map(model => model.id)),
    wbi: new Set(base.wbi.models.filter(model => model.status === 'available').map(model => model.id)),
  }
}

function toDemoModel(model: ModelSnapshot): DemoModel {
  const caps: string[] = []
  if (model.capabilities.reasoning) caps.push('推理')
  if (model.capabilities.images) caps.push('图片')
  if (model.capabilities.tools) caps.push('工具')
  return {
    id: model.id,
    display: model.name,
    upstream: model.id.split('/').slice(1).join('/'),
    caps: caps.length > 0 ? caps : ['文本'],
    status: model.status as DemoModel['status'],
    latency: model.accounts ? `${model.accounts} 账号` : '—',
    accounts: model.accounts,
    context: model.contextWindow?.toLocaleString('en-US') ?? '—',
    maxOutput: model.maxOutputTokens?.toLocaleString('en-US') ?? '—',
    checked: '刚刚',
  }
}

function toDemoAccount(account: AccountSnapshot): DemoAccount {
  return {
    initials: (account.nickname || account.uid).slice(0, 1).toUpperCase(),
    name: account.nickname || account.uid.slice(0, 8),
    sub: `${account.credits?.toLocaleString('en-US') ?? '额度未知'} 积分 · ${account.enabled ? '启用' : '禁用'}`,
    status: account.enabled ? 'success' : 'error',
  }
}

function AppInner() {
  const { choice, setChoice } = useTheme()
  const [sources, setSources] = useState(cloneSources)
  const [realStatus, setRealStatus] = useState<GatewayStatus | null>(null)
  const hydrated = useRef(false)
  const lastModelCount = useRef(0)
  const [active, setActive] = useState<ProviderId>('opencode')
  const [selected, setSelected] = useState(initialSelection)
  const [accounts, setAccounts] = useState<Record<'workbuddy' | 'wbi', DemoAccount[]>>({
    workbuddy: SOURCES.workbuddy.accounts ?? [],
    wbi: SOURCES.wbi.accounts ?? [],
  })
  const [feedback, setFeedback] = useState<string | null>(SOURCES.opencode.feedback)
  const [probing, setProbing] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null)
  const [autoCheck, setAutoCheck] = useState(() => {
    try {
      return localStorage.getItem('ai-bobby-auto-check') !== '0'
    } catch {
      return true
    }
  })
  const [checking, setChecking] = useState(false)
  const [lastCheckMessage, setLastCheckMessage] = useState<string | undefined>()
  const [update, setUpdate] = useState<UpdateInfo | null>(null)
  const [updateDismissed, setUpdateDismissed] = useState(false)
  const [updateProgress, setUpdateProgress] = useState<UpdateProgress | null>(null)
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [installing, setInstalling] = useState(false)

  const source = sources[active]
  const accountRealm = active === 'workbuddy' ? 'workbuddy' : active === 'wbi' ? 'wbi' : undefined
  const accountsForSource = accountRealm ? accounts[accountRealm] : []
  const selectedSet = selected[active]
  const globalSelected = Object.values(selected).reduce((sum, set) => sum + set.size, 0)

  const selectedByGroup = useMemo(
    () => ({
      opencode: selected.opencode.size,
      workbuddy: selected.workbuddy.size,
      wbi: selected.wbi.size,
    }),
    [selected],
  )

  const selectedIdsByGroup = useMemo(
    () => ({
      opencode: [...selected.opencode],
      workbuddy: [...selected.workbuddy],
      wbi: [...selected.wbi],
    }),
    [selected],
  )

  const applyStatus = useCallback((status: GatewayStatus) => {
    const groups: Record<ProviderId, ModelSnapshot[]> = { opencode: [], workbuddy: [], wbi: [] }
    for (const model of status.models) {
      if (model.provider === 'opencode') groups.opencode.push(model)
      else if (model.provider === 'workbuddy') groups.workbuddy.push(model)
      else groups.wbi.push(model)
    }
    const cn = status.accounts.filter(account => account.realm === 'cn')
    const intl = status.accounts.filter(account => account.realm === 'intl')
    setSources(current => {
      const next = structuredClone(current)
      next.opencode = {
        ...next.opencode,
        models: groups.opencode.map(toDemoModel),
        statusText: status.gateway.state === 'ready' ? `运行中 · ${status.models.length} 个模型` : '网关未就绪',
        serviceSub: status.gateway.state === 'ready' ? `网关 ${status.gateway.port}` : status.gateway.error || '网关未就绪',
        feedback: groups.opencode.length > 0 ? `目录已刷新：${groups.opencode.length} 个 OpenCode 模型。` : next.opencode.feedback,
      }
      next.workbuddy = {
        ...next.workbuddy,
        models: groups.workbuddy.map(toDemoModel),
        accounts: cn.map(toDemoAccount),
        credits: cn.reduce((sum, account) => sum + (account.credits ?? 0), 0).toLocaleString('en-US'),
        feedback: cn.length === 0 ? '还没有 WorkBuddy 账号；点击“添加账号”开始。' : `目录已刷新：${groups.workbuddy.length} 个模型，${cn.length} 个账号可用。`,
        statusText: cn.length === 0 ? '未登录' : `运行中 · ${cn.length} 个账号`,
      }
      next.wbi = {
        ...next.wbi,
        models: groups.wbi.map(toDemoModel),
        accounts: intl.map(toDemoAccount),
        credits: intl.reduce((sum, account) => sum + (account.credits ?? 0), 0).toLocaleString('en-US'),
        feedback: intl.length === 0 ? '还没有 WorkBuddy AI 账号；点击“添加账号”开始。' : `目录已刷新：${groups.wbi.length} 个模型，${intl.length} 个账号可用。`,
        statusText: intl.length === 0 ? '未登录' : `运行中 · ${intl.length} 个账号`,
      }
      return next
    })
    setAccounts({ workbuddy: cn.map(toDemoAccount), wbi: intl.map(toDemoAccount) })
    const total = groups.opencode.length + groups.workbuddy.length + groups.wbi.length
    const summary = active === 'opencode'
      ? groups.opencode.length > 0 ? `目录已刷新：${groups.opencode.length} 个 OpenCode 免费模型。` : 'OpenCode 运行时尚未就绪；稍后会自动重试。'
      : active === 'workbuddy'
        ? cn.length > 0 ? `目录已刷新：${groups.workbuddy.length} 个模型，${cn.length} 个账号可用。` : '还没有 WorkBuddy 账号；点击“添加账号”开始。'
        : intl.length > 0 ? `目录已刷新：${groups.wbi.length} 个模型，${intl.length} 个账号可用。` : '还没有 WorkBuddy AI 账号；点击“添加账号”开始。'
    if (!hydrated.current) {
      hydrated.current = true
      lastModelCount.current = total
      setSelected({
        opencode: new Set(groups.opencode.filter(model => model.status === 'available').map(model => model.id)),
        workbuddy: new Set(groups.workbuddy.filter(model => model.status === 'available').map(model => model.id)),
        wbi: new Set(groups.wbi.filter(model => model.status === 'available').map(model => model.id)),
      })
      setFeedback(summary)
    } else if (total !== lastModelCount.current) {
      lastModelCount.current = total
      setFeedback(summary)
    }
  }, [active])

  useEffect(() => {
    const api = window.aiBobby
    if (!api) {
      setAppInfo(APP_FALLBACK)
      return
    }
    let alive = true
    const load = async () => {
      try {
        const status = await api.getStatus()
        if (!alive) return
        setRealStatus(status)
        applyStatus(status)
      } catch {
        // The gateway may still be starting; retry on the next tick.
      }
    }
    void load()
    const timer = window.setInterval(() => void load(), 3000)
    return () => {
      alive = false
      window.clearInterval(timer)
    }
  }, [applyStatus])

  useEffect(() => {
    const api = window.aiBobby
    if (!api) {
      setAppInfo(APP_FALLBACK)
      return
    }
    void api.getAppInfo().then(setAppInfo)
    const offAvailable = api.onUpdateAvailable(info => {
      setUpdate(info)
      setUpdateDismissed(false)
      toast.info(`发现新版本 ${info.version}`)
    })
    const offProgress = api.onUpdateProgress(progress => setUpdateProgress(progress))
    return () => {
      offAvailable()
      offProgress()
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('ai-bobby-auto-check', autoCheck ? '1' : '0')
    } catch {
      // ignore
    }
    void window.aiBobby?.setAutoCheck(autoCheck)
  }, [autoCheck])

  useEffect(() => {
    if (window.aiBobby) return
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')
    if (tab === 'workbuddy' || tab === 'wbi') setActive(tab)
    const theme = params.get('theme')
    if (theme === 'light' || theme === 'dark' || theme === 'system') setChoice(theme)
    if (params.get('drawer') === '1') setImportOpen(true)
    if (params.get('settings') === '1') setSettingsOpen(true)
    if (params.get('login') === '1') {
      setActive('workbuddy')
      setLoginOpen(true)
    }
    if (params.get('demoUpdate') === '1') {
      setUpdate({
        currentVersion: '0.1.0',
        version: '0.2.0',
        notes: '新增更新器、账号切换与导入预览；修复浅色主题下表头对比度。',
        pubDate: new Date().toISOString(),
        asset: {
          url: 'https://xsin.github.io/ai-bobby/releases/0.2.0/AI-Bobby-0.2.0-arm64.zip',
          sha256: '0'.repeat(64),
          size: 18_400_000,
        },
      })
    }
  }, [setChoice])

  const showFeedback = useCallback((message: string) => {
    setFeedback(message)
  }, [])

  const handleTab = useCallback(
    (next: ProviderId) => {
      setActive(next)
      setFeedback(sources[next].feedback)
    },
    [sources],
  )

  const handleSelection = useCallback(
    (next: Set<string>) => {
      setSelected(current => ({ ...current, [active]: next }))
    },
    [active],
  )

  const handleAction = useCallback(
    (action: 'refresh' | 'probe' | 'credits') => {
      if (window.aiBobby) {
        setProbing(true)
        void window.aiBobby.refresh().then(status => {
          setRealStatus(status)
          applyStatus(status)
          setProbing(false)
          toast.success(action === 'credits' ? '额度已刷新' : '模型目录已刷新')
        }).catch(error => {
          setProbing(false)
          toast.error(error instanceof Error ? error.message : String(error))
        })
        return
      }
      if (action === 'probe') {
        if (probing) return
        setProbing(true)
        toast.info('正在并发检测；单个模型超时不会阻塞其他模型')
        window.setTimeout(() => {
          setSources(current => {
            const next = structuredClone(current)
            for (const model of next.opencode.models) {
              if (model.status === 'pending') {
                model.status = 'available'
                model.latency = '9.8 秒'
                model.latencyMs = 9800
                model.checked = '刚刚'
              }
            }
            return next
          })
          setProbing(false)
          showFeedback('检测完成：8 个可用，1 个仅对话，1 个不可用。')
          toast.success('检测完成：8 个可用，1 个仅对话，1 个不可用')
        }, 1400)
        return
      }

      setSources(current => ({
        ...current,
        [active]: {
          ...current[active],
          listMeta: '刚刚刷新',
        },
      }))
      if (action === 'credits') {
        toast.success('额度已刷新：2 个账号，合计 2,401 积分')
      } else {
        toast.success(`已读取 ${source.models.length} 个模型`)
      }
      showFeedback(action === 'credits' ? '额度已刷新；模型目录保持最新。' : `目录已刷新：${source.models.length} 个模型。`)
    },
    [active, probing, showFeedback, source.models.length, applyStatus],
  )

  const handleProbeOne = useCallback((id: string) => {
    toast.info(`已排队重测 ${id}；只影响这一个模型`)
  }, [])

  const selectAll = useCallback(() => {
    const available = source.models.filter(model => model.status === 'available')
    const allSelected = available.length > 0 && available.every(model => selectedSet.has(model.id))
    const next = new Set(selectedSet)
    for (const model of available) {
      if (allSelected) next.delete(model.id)
      else next.add(model.id)
    }
    setSelected(current => ({ ...current, [active]: next }))
  }, [active, selectedSet, source.models])

  const addDemoAccount = useCallback(() => {
    if (!accountRealm) {
      setLoginOpen(false)
      return
    }
    if (window.aiBobby) {
      setLoginOpen(false)
      void window.aiBobby.startLogin(accountRealm === 'workbuddy' ? 'workbuddy' : 'workbuddy-ai')
        .then(async account => {
          const status = await window.aiBobby!.refresh()
          setRealStatus(status)
          applyStatus(status)
          showFeedback(`已添加账号 ${account.nickname}；目录与额度已刷新。`)
          toast.success(`已添加账号 ${account.nickname}`)
        })
        .catch(error => {
          toast.error(error instanceof Error ? error.message : String(error))
        })
      return
    }
    const current = accounts[accountRealm]
    if (current.length >= 3) {
      toast.info('原型最多演示 3 个账号')
      setLoginOpen(false)
      return
    }
    const names = ['Dora', 'Evan', 'Fiona']
    const name = names[current.length - 1] ?? 'New'
    const account: DemoAccount = {
      initials: name[0] ?? 'N',
      name,
      sub: `${(1200 + current.length * 317).toLocaleString('en-US')} 积分 · 启用`,
      status: 'success',
    }
    setAccounts(prev => ({ ...prev, [accountRealm]: [...prev[accountRealm], account] }))
    setLoginOpen(false)
    showFeedback(`已添加账号 ${name}；目录与额度会在后台刷新。`)
    toast.success(`已添加账号 ${name}；目录与额度会后台刷新`)
  }, [accountRealm, accounts, showFeedback, applyStatus])

  const copyKey = useCallback(async () => {
    try {
      if (window.aiBobby) await window.aiBobby.copyApiKey()
      else await navigator.clipboard.writeText('sk-ai-bobby-demo-f3a2')
      toast.success('API Key 已复制')
    } catch {
      toast.error('复制失败，请在设置中查看')
    }
  }, [])

  const checkUpdates = useCallback(async () => {
    const api = window.aiBobby
    if (!api) {
      toast.info('浏览器预览模式：请在桌面应用中检查更新')
      return
    }
    setChecking(true)
    setLastCheckMessage(undefined)
    const result = await api.checkForUpdates(true)
    setChecking(false)
    if (!result.ok) {
      setLastCheckMessage(result.error)
      toast.error(result.error)
      return
    }
    if (result.update) {
      setUpdate(result.update)
      setUpdateDismissed(false)
      setLastCheckMessage(`发现新版本 ${result.update.version}`)
      toast.success(`发现新版本 ${result.update.version}`)
    } else {
      setLastCheckMessage('已是最新版本')
      toast.success('已是最新版本')
    }
  }, [])

  const downloadUpdate = useCallback(async () => {
    const api = window.aiBobby
    if (!api) {
      toast.info('浏览器预览模式：下载更新需要桌面应用')
      return
    }
    setDownloading(true)
    setUpdateProgress({ stage: 'downloading', downloaded: 0, total: update?.asset.size ?? 0 })
    const result = await api.downloadUpdate()
    setDownloading(false)
    if (result.ok) {
      setDownloaded(true)
      setUpdateProgress({ stage: 'verifying', downloaded: 1, total: 1 })
      toast.success('下载完成，可以安装并重启')
    } else {
      setUpdateProgress(null)
      toast.error(result.error)
    }
  }, [update?.asset.size])

  const installUpdate = useCallback(async () => {
    const api = window.aiBobby
    if (!api) return
    setInstalling(true)
    const result = await api.installUpdate()
    if (!result.ok) {
      setInstalling(false)
      toast.error(result.error)
    }
  }, [])

  const openUpdateSource = useCallback(() => {
    const url = appInfo?.updateSource ?? APP_FALLBACK.updateSource
    if (window.aiBobby) void window.aiBobby.openExternal(url)
    else void navigator.clipboard.writeText(url)
    toast.info('已打开更新源')
  }, [appInfo?.updateSource])

  const available = source.models.filter(model => model.status === 'available').length
  const abnormal = source.models.length - available

  return (
    <div className="flex h-full min-h-0 flex-col bg-app text-text">
      <div className="app-drag relative flex h-[38px] shrink-0 items-center justify-between border-b border-line bg-titlebar px-4">
        <div className="w-[68px]" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[12px] font-semibold text-muted-foreground">
          AI Bobby
        </div>
        <span className="rounded border border-line px-1.5 py-0.5 text-[10px] tracking-[0.04em] text-faint">
          本地网关
        </span>
      </div>

      <header className="app-no-drag flex h-[58px] shrink-0 items-center justify-between gap-3 border-b border-line bg-toolbar px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <BrandMark className="size-7 shrink-0 text-primary" />
          <h1 className="hidden whitespace-nowrap text-[15px] font-semibold tracking-[-0.01em] text-text sm:block">
            AI Bobby
          </h1>
          <span className="hidden h-[22px] w-px bg-line sm:block" aria-hidden="true" />
          <SourceTabs active={active} onChange={handleTab} sources={sources} />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-0.5 rounded-md border border-line bg-app p-0.5 md:flex">
            {THEME_OPTIONS.map(theme => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setChoice(theme.id)}
                className={cn(
                  'h-6 appearance-none rounded border-0 bg-transparent px-2 text-[11px] text-muted-foreground hover:bg-hover hover:text-text',
                  choice === theme.id && 'border border-line bg-surface text-text shadow-sm',
                )}
              >
                {theme.label}
              </button>
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="设置"
            className="size-8 text-muted-foreground"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings className="size-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            className="h-8 gap-1.5 bg-primary px-3 text-[12px] text-primary-foreground"
            onClick={() => setImportOpen(true)}
          >
            <Download className="size-3.5" />
            导入
            {globalSelected > 0 ? (
              <span className="min-w-[18px] rounded-full bg-white/20 px-1.5 text-[10px] leading-4 text-primary-foreground">
                {globalSelected}
              </span>
            ) : null}
          </Button>
        </div>
      </header>

      {update && !updateDismissed ? (
        <UpdateBanner
          info={update}
          progress={updateProgress}
          downloading={downloading}
          downloaded={downloaded}
          installing={installing}
          onDownload={() => void downloadUpdate()}
          onInstall={() => void installUpdate()}
          onDismiss={() => setUpdateDismissed(true)}
        />
      ) : null}

      <main className="min-h-0 flex-1 overflow-auto px-5 pt-4">
        <SourceHead
          source={source}
          selectedCount={selectedSet.size}
          globalSelectedCount={globalSelected}
          probing={probing}
          onAction={handleAction}
        />

        {accountRealm ? (
          <AccountStrip
            source={source}
            accounts={accountsForSource}
            onAdd={() => setLoginOpen(true)}
          />
        ) : null}

        {feedback ? (
          <div className="mt-3 flex items-center gap-2 rounded-md border border-success/20 bg-success-soft px-2.5 py-2 text-[11px] text-success">
            <CheckCircle2 className="size-4 shrink-0" />
            <span className="flex-1">{feedback}</span>
            <button
              type="button"
              aria-label="关闭提示"
              className="appearance-none rounded border-0 bg-transparent p-0.5 text-success/70 hover:bg-success/10 hover:text-success"
              onClick={() => setFeedback(null)}
            >
              <X className="size-3.5" />
            </button>
          </div>
        ) : null}

        <section className="flex min-h-0 flex-col pt-3">
          <div className="mb-2 flex items-end justify-between gap-3">
            <div>
              <h3 className="text-[13px] font-semibold text-text">模型清单</h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground">勾选决定导入，点击行查看详情。</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-[10px] text-faint">{source.listMeta}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 px-1.5 text-[10px] text-primary"
                onClick={selectAll}
              >
                全选可用
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-line bg-surface">
            <ModelTable
              key={active}
              source={source}
              models={source.models}
              selected={selectedSet}
              onSelectionChange={handleSelection}
              onProbe={handleProbeOne}
            />
          </div>

          <div className="flex items-center justify-between py-2 text-[10px] text-faint">
            <span>
              {available} 个可用 · {abnormal} 个仅对话 / 待检测 / 不可用
            </span>
            <span>共 {source.models.length} 个模型</span>
          </div>
        </section>
      </main>

      <StatusBar source={source} appInfo={appInfo} keyMask={realStatus?.apiKeyMasked ?? 'sk-…f3a2'} onCopyKey={() => void copyKey()} />

      <ImportSheet
        open={importOpen}
        onOpenChange={setImportOpen}
        selectedByGroup={selectedByGroup}
        selectedIdsByGroup={selectedIdsByGroup}
        selectedTotal={globalSelected}
        onApplied={() => {
          setFeedback('已写入客户端；重启对应客户端后生效。')
          toast.success('已写入客户端；重启对应客户端后生效')
        }}
        onApply={async payload => {
          const api = window.aiBobby
          if (!api) {
            toast.success(`浏览器预览：将备份后写入 ${payload.clients.length} 个客户端`)
            setFeedback('浏览器预览：未写入任何文件。')
            return
          }
          const targetMap = {
            workbuddy: 'workbuddy',
            wbi: 'workbuddy-ai',
            codex: 'codex',
            claude: 'claude',
            dsh: 'dsh',
          } as const
          const plans = []
          for (const client of payload.clients) {
            plans.push(await api.importApply(targetMap[client], {
              groups: payload.groups,
              modelIds: payload.modelIds,
              defaultModelId: payload.defaultModelId,
              setAsDefault: true,
            }))
          }
          const changed = plans.filter(plan => plan.changed)
          const warnings = plans.flatMap(plan => plan.warnings)
          setFeedback(
            changed.length === 0
              ? `配置已是最新（${plans.length} 个客户端），无需重复写入。`
              : `已写入 ${changed.length} 个客户端；重启对应客户端后生效。`,
          )
          if (warnings.length > 0) toast.warning(warnings[0]!)
          toast.success(changed.length === 0 ? '配置已是最新' : `已写入 ${changed.length} 个客户端`)
        }}
      />

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        source={source}
        onSuccess={addDemoAccount}
      />

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        appInfo={appInfo}
        status={realStatus}
        onCopyApiKey={() => void copyKey()}
        autoCheck={autoCheck}
        onAutoCheckChange={setAutoCheck}
        checking={checking}
        lastMessage={lastCheckMessage}
        onCheckUpdates={() => void checkUpdates()}
        onOpenUpdateSource={openUpdateSource}
      />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AntdProvider>
        <AppInner />
      </AntdProvider>
    </ThemeProvider>
  )
}
