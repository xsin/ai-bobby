export type ProviderId = 'opencode' | 'workbuddy' | 'wbi' | 'nvidia'

export type ModelStatus =
  | 'available'
  | 'chat_only'
  | 'pending'
  | 'unavailable'
  | 'rate_limited'
  | 'no_account'

export type AccountStatus = 'success' | 'cooling' | 'error'

export interface DemoAccount {
  uid?: string
  order?: number
  initials: string
  name: string
  sub: string
  status: AccountStatus
  preferred?: boolean
}

export interface DemoModel {
  id: string
  display: string
  upstream: string
  caps: string[]
  status: ModelStatus
  latency: string
  latencyMs?: number
  accounts?: number
  billing?: { credits?: string; badges?: readonly string[]; free: boolean; rateUnknown?: boolean }
  context: string
  maxOutput: string
  checked: string
}

export interface SourceAction {
  id: 'refresh' | 'probe' | 'credits' | 'key'
  label: string
  icon: 'refresh' | 'activity' | 'plus'
}

export interface MetricDefinition {
  key: 'found' | 'available' | 'pending' | 'accounts' | 'models' | 'credits'
  label: string
  tone?: 'accent' | 'warning'
}

export const WBI_TEMPORARILY_DISABLED = true

export interface DemoSource {
  id: ProviderId
  disabled?: boolean
  disabledNote?: string
  label: string
  eyebrow: string
  title: string
  subtitle: string
  actions: SourceAction[]
  metricDefs: MetricDefinition[]
  feedback: string
  statusText: string
  serviceSub: string
  listMeta: string
  lastHeader: string
  credits: string
  accounts?: DemoAccount[]
  models: DemoModel[]
}

export const SOURCES: Record<ProviderId, DemoSource> = {
  opencode: {
    id: 'opencode',
    label: 'OpenCode',
    eyebrow: 'OPENCODE · 免费模型',
    title: 'OpenCode 免费模型',
    subtitle: '把 OpenCode 的免费模型接入统一网关',
    actions: [
      { id: 'refresh', label: '读取模型', icon: 'refresh' },
      { id: 'probe', label: '检测全部', icon: 'activity' },
    ],
    metricDefs: [
      { key: 'found', label: '已发现' },
      { key: 'available', label: '可用', tone: 'accent' },
      { key: 'pending', label: '待检测' },
    ],
    feedback: '配置已是最新，共 7 个模型，无需重复写入。',
    statusText: '运行中 · 10 个模型',
    serviceSub: 'OpenCode 1.19.3',
    listMeta: '最近刷新 2 分钟前',
    lastHeader: '耗时',
    credits: '0',
    models: [
      { id: 'oc/big-pickle', display: 'OC. Big Pickle', upstream: 'big-pickle', caps: ['推理'], status: 'available', latency: '13.6 秒', latencyMs: 13600, context: '131,072', maxOutput: '32,768', checked: '2 分钟前' },
      { id: 'oc/deepseek-v4.1-flash', display: 'OC. DeepSeek V4.1 Flash Free', upstream: 'deepseek-v4.1-flash', caps: ['推理', '图片'], status: 'available', latency: '3.9 秒', latencyMs: 3900, context: '1,000,000', maxOutput: '128,000', checked: '2 分钟前' },
      { id: 'oc/glm-5.3-flash', display: 'OC. GLM-5.3-Flash Free', upstream: 'glm-5.3-flash', caps: ['推理', '图片'], status: 'available', latency: '2.6 秒', latencyMs: 2600, context: '1,000,000', maxOutput: '131,072', checked: '2 分钟前' },
      { id: 'oc/longcat-2.5-preview', display: 'OC. LongCat 2.5 Preview Free', upstream: 'longcat-2.5-preview', caps: ['推理', '图片'], status: 'available', latency: '14.6 秒', latencyMs: 14600, context: '256,000', maxOutput: '32,000', checked: '2 分钟前' },
      { id: 'oc/mimo-v2.6-flash', display: 'OC. MiMo-V2.6-Flash Free', upstream: 'mimo-v2.6-flash', caps: ['推理', '图片'], status: 'available', latency: '8.5 秒', latencyMs: 8500, context: '256,000', maxOutput: '64,000', checked: '2 分钟前' },
      { id: 'oc/nemotron-3.5-super-vl', display: 'OC. Nemotron 3.5 Super VL Free', upstream: 'nemotron-3.5-super-vl', caps: ['推理', '图片'], status: 'available', latency: '11.2 秒', latencyMs: 11200, context: '128,000', maxOutput: '32,000', checked: '2 分钟前' },
      { id: 'oc/space-bunny', display: 'OC. Space Bunny Free', upstream: 'space-bunny', caps: ['推理'], status: 'available', latency: '6.4 秒', latencyMs: 6400, context: '1,000,000', maxOutput: '128,000', checked: '2 分钟前' },
      { id: 'oc/qwen3-coder', display: 'OC. Qwen3 Coder Free', upstream: 'qwen3-coder', caps: ['推理'], status: 'pending', latency: '—', context: '262,144', maxOutput: '32,768', checked: '尚未检测' },
      { id: 'oc/kimi-k2.7', display: 'OC. Kimi K2.7 Free', upstream: 'kimi-k2.7', caps: ['推理'], status: 'chat_only', latency: '4.1 秒', latencyMs: 4100, context: '256,000', maxOutput: '32,000', checked: '2 分钟前' },
      { id: 'oc/minimax-m3', display: 'OC. MiniMax M3 Free', upstream: 'minimax-m3', caps: ['推理'], status: 'unavailable', latency: '超时 30 秒', context: '512,000', maxOutput: '128,000', checked: '12 分钟前' },
    ],
  },
  workbuddy: {
    id: 'workbuddy',
    label: 'WorkBuddy',
    eyebrow: 'WORKBUDDY · 国内版',
    title: 'WorkBuddy 国内版',
    subtitle: '官方登录、多账号自动切换；模型只在本机转发',
    actions: [
      { id: 'refresh', label: '刷新目录', icon: 'refresh' },
      { id: 'credits', label: '刷新额度', icon: 'activity' },
    ],
    metricDefs: [
      { key: 'accounts', label: '账号' },
      { key: 'models', label: '模型' },
      { key: 'credits', label: '积分' },
    ],
    feedback: '目录已刷新：10 个模型，2 个账号可用。',
    statusText: '运行中 · 2 个账号',
    serviceSub: 'WorkBuddy 5.5.6',
    listMeta: '最近刷新 1 分钟前',
    lastHeader: '账号 / 耗时',
    credits: '2,401',
    accounts: [
      { initials: 'A', name: 'Alice', sub: '2,401 积分 · 优先', status: 'success', preferred: true },
      { initials: 'B', name: 'Bob', sub: '830 积分 · 冷却 42s', status: 'cooling' },
    ],
    models: [
      { id: 'wb/hy3', display: 'WB. Hy3', upstream: 'hy3', caps: ['推理', '图片'], status: 'available', latency: '2 账号 · 3.9 秒', latencyMs: 3900, accounts: 2, context: '192,000', maxOutput: '64,000', checked: '1 分钟前' },
      { id: 'wb/deepseek-v4.1-flash', display: 'WB. DeepSeek-V4.1-Flash', upstream: 'deepseek-v4.1-flash', caps: ['推理', '图片'], status: 'available', latency: '2 账号 · 4.2 秒', latencyMs: 4200, accounts: 2, context: '1,000,000', maxOutput: '128,000', checked: '1 分钟前' },
      { id: 'wb/glm-5.3', display: 'WB. GLM-5.3', upstream: 'glm-5.3', caps: ['推理', '图片'], status: 'available', latency: '2 账号 · 5.1 秒', latencyMs: 5100, accounts: 2, context: '1,000,000', maxOutput: '64,000', checked: '1 分钟前' },
      { id: 'wb/glm-5.3-flash', display: 'WB. GLM-5.3-Flash', upstream: 'glm-5.3-flash', caps: ['推理', '图片'], status: 'available', latency: '2 账号 · 2.4 秒', latencyMs: 2400, accounts: 2, context: '1,000,000', maxOutput: '131,072', checked: '1 分钟前' },
      { id: 'wb/minimax-m3', display: 'WB. MiniMax-M3', upstream: 'minimax-m3', caps: ['推理'], status: 'available', latency: '1 账号 · 6.8 秒', latencyMs: 6800, accounts: 1, context: '512,000', maxOutput: '128,000', checked: '1 分钟前' },
      { id: 'wb/kimi-k3', display: 'WB. Kimi-K3', upstream: 'kimi-k3', caps: ['推理'], status: 'available', latency: '1 账号 · 7.3 秒', latencyMs: 7300, accounts: 1, context: '1,000,000', maxOutput: '32,000', checked: '1 分钟前' },
      { id: 'wb/step-5-preview', display: 'WB. Step-5-Preview', upstream: 'step-5-preview', caps: ['推理'], status: 'available', latency: '1 账号 · 9.0 秒', latencyMs: 9000, accounts: 1, context: '1,000,000', maxOutput: '64,000', checked: '1 分钟前' },
      { id: 'wb/space-bunny', display: 'WB. Space-Bunny', upstream: 'space-bunny', caps: ['推理'], status: 'available', latency: '1 账号 · 6.1 秒', latencyMs: 6100, accounts: 1, context: '1,000,000', maxOutput: '128,000', checked: '1 分钟前' },
      { id: 'wb/hy4-preview', display: 'WB. Hy4-Preview', upstream: 'hy4-preview', caps: ['推理'], status: 'chat_only', latency: '1 账号 · 8.4 秒', latencyMs: 8400, accounts: 1, context: '1,000,000', maxOutput: '64,000', checked: '1 分钟前' },
      { id: 'wb/qwen3-max', display: 'WB. Qwen3-Max', upstream: 'qwen3-max', caps: ['推理'], status: 'pending', latency: '—', accounts: 0, context: '262,144', maxOutput: '32,768', checked: '尚未检测' },
    ],
  },
  wbi: {
    id: 'wbi',
    disabled: WBI_TEMPORARILY_DISABLED,
    disabledNote: '正在适配官方渠道，暂不可用',
    label: 'WorkBuddy AI',
    eyebrow: 'WORKBUDDY AI · 国际版',
    title: 'WorkBuddy AI 国际版',
    subtitle: 'Google / 微信登录；与国内版账号、积分互不混用',
    actions: [
      { id: 'refresh', label: '刷新目录', icon: 'refresh' },
      { id: 'credits', label: '刷新额度', icon: 'activity' },
    ],
    metricDefs: [
      { key: 'accounts', label: '账号' },
      { key: 'models', label: '模型' },
      { key: 'credits', label: '积分' },
    ],
    feedback: '已登录 1 个账号；可继续添加，按 round-robin 轮换。',
    statusText: '运行中 · 1 个账号',
    serviceSub: 'WorkBuddy AI 5.5.2',
    listMeta: '最近刷新 3 分钟前',
    lastHeader: '账号 / 耗时',
    credits: '1,820',
    accounts: [
      { initials: 'C', name: 'Cathy', sub: '1,820 积分 · 优先', status: 'success', preferred: true },
    ],
    models: [
      { id: 'wbi/hy3', display: 'WBI. Hy3', upstream: 'hy3', caps: ['推理', '图片'], status: 'available', latency: '1 账号 · 3.1 秒', latencyMs: 3100, accounts: 1, context: '192,000', maxOutput: '64,000', checked: '3 分钟前' },
      { id: 'wbi/deepseek-v4.1-flash', display: 'WBI. DeepSeek-V4.1-Flash', upstream: 'deepseek-v4.1-flash', caps: ['推理', '图片'], status: 'available', latency: '1 账号 · 2.9 秒', latencyMs: 2900, accounts: 1, context: '1,000,000', maxOutput: '128,000', checked: '3 分钟前' },
      { id: 'wbi/glm-5.3', display: 'WBI. GLM-5.3', upstream: 'glm-5.3', caps: ['推理', '图片'], status: 'available', latency: '1 账号 · 4.4 秒', latencyMs: 4400, accounts: 1, context: '1,000,000', maxOutput: '64,000', checked: '3 分钟前' },
      { id: 'wbi/glm-5.3-flash', display: 'WBI. GLM-5.3-Flash', upstream: 'glm-5.3-flash', caps: ['推理', '图片'], status: 'available', latency: '1 账号 · 2.2 秒', latencyMs: 2200, accounts: 1, context: '1,000,000', maxOutput: '131,072', checked: '3 分钟前' },
      { id: 'wbi/minimax-m3', display: 'WBI. MiniMax-M3', upstream: 'minimax-m3', caps: ['推理'], status: 'available', latency: '1 账号 · 5.7 秒', latencyMs: 5700, accounts: 1, context: '512,000', maxOutput: '128,000', checked: '3 分钟前' },
      { id: 'wbi/kimi-k3', display: 'WBI. Kimi-K3', upstream: 'kimi-k3', caps: ['推理'], status: 'available', latency: '1 账号 · 6.2 秒', latencyMs: 6200, accounts: 1, context: '1,000,000', maxOutput: '32,000', checked: '3 分钟前' },
      { id: 'wbi/gpt-6-astra', display: 'WBI. GPT-6-Astra', upstream: 'gpt-6-astra', caps: ['推理', '图片'], status: 'chat_only', latency: '1 账号 · 7.8 秒', latencyMs: 7800, accounts: 1, context: '400,000', maxOutput: '128,000', checked: '3 分钟前' },
      { id: 'wbi/claude-5-sonnet', display: 'WBI. Claude-5-Sonnet', upstream: 'claude-5-sonnet', caps: ['推理', '图片'], status: 'pending', latency: '—', accounts: 0, context: '200,000', maxOutput: '64,000', checked: '尚未检测' },
    ],
  },
  nvidia: {
    id: 'nvidia',
    label: 'NVIDIA NIM',
    eyebrow: 'NVIDIA NIM · 免费试用',
    title: 'NVIDIA NIM',
    subtitle: '用 NVIDIA 免费试用额度接入 Llama / Nemotron / DeepSeek 等模型',
    actions: [
      { id: 'refresh', label: '读取模型', icon: 'refresh' },
      { id: 'probe', label: '检测全部', icon: 'activity' },
    ],
    metricDefs: [
      { key: 'found', label: '已发现' },
      { key: 'available', label: '可用', tone: 'accent' },
      { key: 'pending', label: '待检测' },
    ],
    feedback: '填写 NVIDIA API Key 后读取模型；检测会真实发一条最小对话并消耗少量免费额度。',
    statusText: '未配置 API Key',
    serviceSub: 'NVIDIA NIM · integrate.api.nvidia.com',
    credits: '0',
    listMeta: '尚未读取',
    lastHeader: '耗时',
    models: [
      { id: 'nv/llama-3.3-70b-instruct', display: 'NV. Llama 3.3 70B Instruct', upstream: 'meta/llama-3.3-70b-instruct', caps: ['推理'], status: 'pending', latency: '—', context: '128,000', maxOutput: '4,096', checked: '尚未检测' },
      { id: 'nv/nemotron-3-super-120b', display: 'NV. Nemotron 3 Super 120B', upstream: 'nvidia/nemotron-3-super-120b-a12b', caps: ['推理'], status: 'pending', latency: '—', context: '1,000,000', maxOutput: '16,384', checked: '尚未检测' },
    ],
  },
}

export const STATUS_META: Record<ModelStatus, { label: string; tone: 'success' | 'warning' | 'danger' | 'neutral' }> = {
  available: { label: '可用', tone: 'success' },
  chat_only: { label: '仅对话', tone: 'warning' },
  pending: { label: '待检测', tone: 'neutral' },
  unavailable: { label: '不可用', tone: 'danger' },
  rate_limited: { label: '限流', tone: 'warning' },
  no_account: { label: '无账号', tone: 'neutral' },}

export interface ImportClient {
  id: 'workbuddy' | 'wbi' | 'codex' | 'claude' | 'dsh' | 'vscode'
  name: string
  path: string
  note: string
  status: string
  defaultGroup: ProviderId
}

export const IMPORT_CLIENTS: ImportClient[] = [
  { id: 'workbuddy', name: 'WorkBuddy（国内）', path: '~/.workbuddy/models.json', note: '排除 WB 自身分组', status: '已探测', defaultGroup: 'wbi' },
  { id: 'wbi', name: 'WorkBuddy AI（国际）', path: '~/.workbuddy-ai/models.json', note: '排除 WBI 自身分组', status: '已探测', defaultGroup: 'workbuddy' },
  { id: 'codex', name: 'Codex', path: '~/.codex/config.toml', note: 'responses', status: '已探测', defaultGroup: 'opencode' },
  { id: 'claude', name: 'Claude Code', path: '~/.claude/settings.json', note: 'messages', status: '已探测', defaultGroup: 'opencode' },
  { id: 'dsh', name: 'DeepSeek Harness', path: '~/.dsh/profiles/desktop/cordis.patch.yml', note: 'llm-pi-ai', status: '已探测', defaultGroup: 'opencode' },
  { id: 'vscode', name: 'VS Code', path: '~/Library/Application Support/Code/User/chatLanguageModels.json', note: 'Custom Endpoint', status: '可自动写入', defaultGroup: 'opencode' },
]

if (WBI_TEMPORARILY_DISABLED) {
  SOURCES.wbi.models = []
  SOURCES.wbi.accounts = []
  SOURCES.wbi.credits = '—'
  SOURCES.wbi.feedback = '正在适配官方渠道，暂不可用'
  SOURCES.wbi.statusText = '维护中'
}

export function metricsFor(source: DemoSource) {
  if (source.id === 'opencode' || source.id === 'nvidia') {
    return {
      found: source.models.length,
      available: source.models.filter(model => model.status === 'available').length,
      pending: source.models.filter(model => model.status === 'pending').length,
    }
  }
  return {
    accounts: source.accounts?.length ?? 0,
    models: source.models.length,
    credits: source.credits,
  }
}

export function isUsable(model: DemoModel): boolean {
  return model.status === 'available' || model.status === 'chat_only'
}
