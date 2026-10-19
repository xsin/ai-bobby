import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Locale = 'zh' | 'en'

const zh = {
  meta: {
    title: 'AI Bobby — 所有模型，一个端点。',
    description:
      '把 OpenCode、WorkBuddy 与 WorkBuddy AI 收进一个只监听本机的 OpenAI 兼容端点。一个 Key，三种协议。',
  },
  nav: {
    sources: '来源',
    protocols: '协议',
    import: '导入',
    localFirst: '本机',
    github: 'GitHub',
    install: '安装',
    menu: '打开菜单',
    language: 'EN',
    languageAria: 'Switch to English',
  },
  hero: {
    eyebrow: 'LOCAL AI GATEWAY',
    title1: '所有模型。',
    title2: '一个端点。',
    lead: '把 OpenCode、WorkBuddy 与 WorkBuddy AI 收进一个只监听本机的 OpenAI 兼容端点。一个 Key，三种协议，零云依赖。',
    installAria: '复制安装命令',
    copied: '已复制',
    seeFlow: '看它怎么流动',
    meta: ['macOS · ad-hoc signed', 'v0.2.3', '127.0.0.1 only'],
    terminalTitle: 'ai-bobby — gateway',
    terminalLive: 'live',
    terminalHealth: 'curl 127.0.0.1:46890/health',
    terminalStatus: '{"status":"ok","version":"0.2.3"}',
    terminalModels: 'curl /v1/models',
    terminalMore: '+ 7 more',
    terminalFoot: 'one key · three protocols',
    scroll: '向下探索',
    orbit: {
      opencode: 'free models',
      workbuddy: 'CN · multi-account',
      wbi: 'global',
    },
  },
  sources: {
    kicker: '01 / SOURCES',
    title1: '三个来源。',
    title2: '一把 Key。',
    aside: '每个来源独立登录、独立刷新、独立冷却；网关只暴露合并后的模型清单。登录失败不会拖垮其他来源。',
    cards: [
      {
        tag: 'OC',
        status: '无需登录',
        title: 'OpenCode',
        desc: '自动准备隔离运行时，按价格字段筛出真正免费的模型。',
        stat: '10',
        statLabel: '个免费模型',
        prefix: 'oc/<model>',
      },
      {
        tag: 'WB',
        status: '官方登录',
        title: 'WorkBuddy',
        desc: '官方登录页扫码，多账号 round-robin；401 刷新、429/402 换号。',
        stat: '∞',
        statLabel: '账号 · 轮询',
        prefix: 'wb/<model>',
      },
      {
        tag: 'WI',
        status: '全球 realm',
        title: 'WorkBuddy AI',
        desc: '国际版独立 realm 与模型目录，和国内版可同时在线。',
        stat: '1',
        statLabel: '全球 realm',
        prefix: 'wbi/<model>',
      },
    ],
  },
  protocols: {
    kicker: '02 / PROTOCOLS',
    title1: '每种协议，',
    title2: '你的技术栈都会说。',
    aside: '不用给每个客户端各配一个代理。Chat、Responses、Anthropic Messages 共用一条 Canonical 事件流。',
    tabs: [
      { id: 'chat', label: 'Chat Completions' },
      { id: 'responses', label: 'Responses' },
      { id: 'messages', label: 'Anthropic Messages' },
    ],
    clients: {
      chat: 'WorkBuddy · DSH · any OpenAI client',
      responses: 'Codex · Responses API',
      messages: 'Claude Code · Anthropic Messages',
    },
    endpoint: '端点',
    auth: '鉴权',
    streaming: '流式',
    streamingValue: 'SSE · canonical',
    pills: ['tools', 'images', 'reasoning', 'usage'],
    code: {
      chat: `curl http://127.0.0.1:46890/v1/chat/completions \\
  -H "Authorization: Bearer $AI_BOBBY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "wb/hy3",
    "stream": true,
    "messages": [
      { "role": "user", "content": "你好" }
    ]
  }'`,
      responses: `curl http://127.0.0.1:46890/v1/responses \\
  -H "Authorization: Bearer $AI_BOBBY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "oc/space-bunny-free",
    "input": "Explain local-first AI gateways.",
    "stream": true
  }'`,
      messages: `curl http://127.0.0.1:46890/v1/messages \\
  -H "Authorization: Bearer $AI_BOBBY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "wbi/glm-5.3",
    "max_tokens": 512,
    "messages": [
      { "role": "user", "content": "你好" }
    ]
  }'`,
    },
  },
  import: {
    kicker: '03 / IMPORT',
    title1: '一次点击，',
    title2: '导入所有客户端。',
    aside: 'dry-run 先看 diff，写入前备份，只动 AI Bobby 标记的条目。重复导入是幂等的，不会覆盖你手写的配置。',
    writeTitle1: '写一次，',
    writeTitle2: '保留你的配置。',
    writeDesc:
      'Codex 写标记块，Claude 合并 env，DSH 合并 provider；WorkBuddy 排除自身分组，避免自环。',
    link: '查看目标路径',
    diffFile: '~/.codex/config.toml',
    dryRun: 'dry-run',
    backup: 'backup ready',
    lines: '+5 lines',
  },
  security: {
    kicker: '04 / LOCAL-FIRST',
    title1: '你的。',
    title2: '不是云端的。',
    aside:
      'AI Bobby 只监听回环地址；API Key、账号、模型目录都在本机。没有账号系统，没有云端会话历史。',
    cards: [
      {
        icon: '◉',
        title: '127.0.0.1 only',
        desc: '浏览器 Origin 直接 403；端口不暴露到局域网。',
      },
      {
        icon: '⌁',
        title: 'Key 留在本机',
        desc: '随机 API Key 落盘 0600；日志与状态只出现掩码。',
      },
      {
        icon: '↻',
        title: '故障切换，不是失败',
        desc: '单账号 429 冷却换号；流式开始后不中途切换。',
      },
      {
        icon: '◌',
        title: '无遥测',
        desc: '没有产品分析 SDK；更新检查只请求 latest.json。',
      },
    ],
  },
  cta: {
    kicker: '准备好了就开始',
    title1: '别再折腾',
    title2: '五个代理了。',
    desc: 'macOS · ad-hoc signed · 自动更新 · 一条命令安装。',
    github: 'GitHub',
    releases: '发布说明',
  },
  footer: {
    tagline: '本地 AI 网关：为运行自己技术栈的人而做。',
    note: '与腾讯、WorkBuddy、DeepSeek 无关联。',
    github: 'GitHub',
    docs: 'Docs',
    releases: 'Releases',
  },
  toasts: {
    installTitle: '安装 AI Bobby',
    installDesc: '把本地网关放进你的 Dock。',
    installAction: '安装',
    updateTitle: '发现新版本',
    updateDesc: '刷新以更新到最新版本',
    updateAction: '刷新',
    copied: '安装命令已复制',
    offlineTitle: '离线可用',
    offlineDesc: '页面已缓存，可离线打开。',
  },
}

const en: typeof zh = {
  meta: {
    title: 'AI Bobby — All your models. One endpoint.',
    description:
      'OpenCode, WorkBuddy and WorkBuddy AI behind one local OpenAI-compatible endpoint. One key, three protocols.',
  },
  nav: {
    sources: 'Sources',
    protocols: 'Protocols',
    import: 'Import',
    localFirst: 'Local-first',
    github: 'GitHub',
    install: 'Install',
    menu: 'Open menu',
    language: '中文',
    languageAria: '切换到中文',
  },
  hero: {
    eyebrow: 'LOCAL AI GATEWAY',
    title1: 'All your models.',
    title2: 'One endpoint.',
    lead: 'OpenCode, WorkBuddy and WorkBuddy AI behind one local OpenAI-compatible endpoint. One key, three protocols, zero cloud dependency.',
    installAria: 'Copy install command',
    copied: 'Copied',
    seeFlow: 'See the flow',
    meta: ['macOS · ad-hoc signed', 'v0.2.3', '127.0.0.1 only'],
    terminalTitle: 'ai-bobby — gateway',
    terminalLive: 'live',
    terminalHealth: 'curl 127.0.0.1:46890/health',
    terminalStatus: '{"status":"ok","version":"0.2.3"}',
    terminalModels: 'curl /v1/models',
    terminalMore: '+ 7 more',
    terminalFoot: 'one key · three protocols',
    scroll: 'SCROLL TO EXPLORE',
    orbit: {
      opencode: 'free models',
      workbuddy: 'CN · multi-account',
      wbi: 'global',
    },
  },
  sources: {
    kicker: '01 / SOURCES',
    title1: 'Three sources.',
    title2: 'One key.',
    aside:
      'Each source logs in, refreshes and cools down independently. The gateway only exposes the merged catalog; one failing source never blocks the others.',
    cards: [
      {
        tag: 'OC',
        status: 'no login',
        title: 'OpenCode',
        desc: 'Prepares an isolated runtime and filters truly free models by price fields.',
        stat: '10',
        statLabel: 'free models',
        prefix: 'oc/<model>',
      },
      {
        tag: 'WB',
        status: 'official login',
        title: 'WorkBuddy',
        desc: 'Official QR login, multi-account round-robin, 401 refresh and 429/402 failover.',
        stat: '∞',
        statLabel: 'accounts · round robin',
        prefix: 'wb/<model>',
      },
      {
        tag: 'WI',
        status: 'global realm',
        title: 'WorkBuddy AI',
        desc: 'A separate global realm and catalog, online at the same time as the CN variant.',
        stat: '1',
        statLabel: 'global realm',
        prefix: 'wbi/<model>',
      },
    ],
  },
  protocols: {
    kicker: '02 / PROTOCOLS',
    title1: 'Every protocol',
    title2: 'your stack speaks.',
    aside:
      'No more one proxy per client. Chat, Responses and Anthropic Messages share a single Canonical event stream.',
    tabs: [
      { id: 'chat', label: 'Chat Completions' },
      { id: 'responses', label: 'Responses' },
      { id: 'messages', label: 'Anthropic Messages' },
    ],
    clients: {
      chat: 'WorkBuddy · DSH · any OpenAI client',
      responses: 'Codex · Responses API',
      messages: 'Claude Code · Anthropic Messages',
    },
    endpoint: 'Endpoint',
    auth: 'Auth',
    streaming: 'Streaming',
    streamingValue: 'SSE · canonical',
    pills: ['tools', 'images', 'reasoning', 'usage'],
    code: {
      chat: `curl http://127.0.0.1:46890/v1/chat/completions \\
  -H "Authorization: Bearer $AI_BOBBY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "wb/hy3",
    "stream": true,
    "messages": [
      { "role": "user", "content": "Hello" }
    ]
  }'`,
      responses: `curl http://127.0.0.1:46890/v1/responses \\
  -H "Authorization: Bearer $AI_BOBBY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "oc/space-bunny-free",
    "input": "Explain local-first AI gateways.",
    "stream": true
  }'`,
      messages: `curl http://127.0.0.1:46890/v1/messages \\
  -H "Authorization: Bearer $AI_BOBBY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "wbi/glm-5.3",
    "max_tokens": 512,
    "messages": [
      { "role": "user", "content": "Hello" }
    ]
  }'`,
    },
  },
  import: {
    kicker: '03 / IMPORT',
    title1: 'One click.',
    title2: 'Every client.',
    aside:
      'Preview a dry-run diff, back up before writing, and touch only AI Bobby-marked entries. Re-importing is idempotent and never overwrites your config.',
    writeTitle1: 'Write once.',
    writeTitle2: 'Keep your config.',
    writeDesc:
      'Codex gets a marked block, Claude merges env, DSH merges a provider. WorkBuddy excludes its own group to avoid a self-loop.',
    link: 'See target paths',
    diffFile: '~/.codex/config.toml',
    dryRun: 'dry-run',
    backup: 'backup ready',
    lines: '+5 lines',
  },
  security: {
    kicker: '04 / LOCAL-FIRST',
    title1: 'Yours.',
    title2: "Not the cloud's.",
    aside:
      'AI Bobby listens on loopback only. Keys, accounts and catalogs stay on your machine. No account system, no cloud conversation history.',
    cards: [
      {
        icon: '◉',
        title: '127.0.0.1 only',
        desc: 'Browser Origins get a 403; the port is never exposed to your LAN.',
      },
      {
        icon: '⌁',
        title: 'Keys stay local',
        desc: 'Random API keys are stored with 0600 permissions; logs only show masks.',
      },
      {
        icon: '↻',
        title: 'Failover, not failure',
        desc: 'A 429 account cools down and another takes over; no mid-stream switching.',
      },
      {
        icon: '◌',
        title: 'No telemetry',
        desc: 'No product analytics SDK; update checks only fetch latest.json.',
      },
    ],
  },
  cta: {
    kicker: 'READY WHEN YOU ARE',
    title1: 'Stop juggling',
    title2: 'five proxies.',
    desc: 'macOS · ad-hoc signed · auto-update · one command install.',
    github: 'GitHub',
    releases: 'Release notes',
  },
  footer: {
    tagline: 'Local AI gateway. Built for people who run their own stack.',
    note: 'Not affiliated with Tencent, WorkBuddy or DeepSeek.',
    github: 'GitHub',
    docs: 'Docs',
    releases: 'Releases',
  },
  toasts: {
    installTitle: 'Install AI Bobby',
    installDesc: 'Add the local gateway to your dock.',
    installAction: 'Install',
    updateTitle: 'New version available',
    updateDesc: 'Refresh to update to the latest version',
    updateAction: 'Refresh',
    copied: 'Install command copied',
    offlineTitle: 'Ready offline',
    offlineDesc: 'The page is cached and can open offline.',
  },
}

export const messages = { zh, en } as const
export type Messages = typeof zh

interface I18nValue {
  locale: Locale
  t: Messages
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const I18nContext = createContext<I18nValue | null>(null)

function initialLocale(): Locale {
  try {
    const stored = localStorage.getItem('ai-bobby-locale')
    if (stored === 'zh' || stored === 'en') return stored
  } catch {
    // ignore private mode
  }
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  useEffect(() => {
    const t = messages[locale]
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    document.title = t.meta.title
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', t.meta.description)
    try {
      localStorage.setItem('ai-bobby-locale', locale)
    } catch {
      // ignore
    }
  }, [locale])

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: messages[locale],
      setLocale: setLocaleState,
      toggleLocale: () => setLocaleState(current => (current === 'zh' ? 'en' : 'zh')),
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used inside I18nProvider')
  return value
}
