# AI Bobby 技术方案（tech.md）

- 版本：v0.1（对齐稿）
- 日期：2026-10-18
- 状态：已评审（实现进度见 [handsoff.md](../handsoff.md)）
- 关联：[prd.md](./prd.md)、[handsoff.md](../handsoff.md)
- 用户侧安装/使用/接入说明：[README.md](../README.md)
- 目标：把 PRD 落成可实现的模块边界、协议、数据结构与测试策略。

---

## 1. 架构总览

### 1.1 进程模型

```text
┌────────────────────────────── AI Bobby.app (Electron) ──────────────────────────────┐
│ 主进程 (apps/desktop/main)                                                           │
│   ├─ BrowserWindow ──preload──> React 控制面板                                       │
│   ├─ Tray                                                                           │
│   ├─ LoginWindow（WorkBuddy 官方登录页，独立 session partition）                      │
│   ├─ AccountStore（safeStorage 加密；token 只在主进程解密）                           │
│   ├─ Importer 调度（dry-run / apply / rollback）                                      │
│   └─ fork(ELECTRON_RUN_AS_NODE) ──> 网关子进程 (packages/gateway)                     │
│          ├─ 127.0.0.1:46890                                                         │
│          ├─ API Key / Origin 围栏 / 限流 / SSE                                       │
│          ├─ CanonicalEvent 总线 + 三种协议 codec                                     │
│          ├─ WorkBuddy provider ──> copilot.tencent.com / www.workbuddy.ai            │
│          └─ OpenCode provider ──> 隔离 opencode serve（随机端口 + Basic 口令）        │
└─────────────────────────────────────────────────────────────────────────────────────┘
        ▲                         ▲                          ▲
   WorkBuddy (Chat)          Codex (Responses)         Claude Code (Messages)
                             DSH (Chat)                任意 OpenAI 客户端
```

**为什么网关是子进程**：

- 与 UI 生命周期解耦，窗口关闭/重载不影响服务；
- 崩溃隔离，主进程可重启；
- `apps/cli` 可以不带 Electron 单跑，便于调试与测试。

**为什么登录在主进程**：

- 需要 `BrowserWindow` 和 Electron `safeStorage`；
- token 只在主进程解密，网关通过 IPC 拿到运行时快照；
- 账号库由主进程唯一写入，避免多个进程竞争。

> **实现状态（2026-10-18）**：当前网关在主进程内直接启动，未 fork 子进程；UI 通过 IPC
> 读主进程快照，不读 `status.json`。账号库为 `0600` 明文，`safeStorage` 因启动时阻塞
> Keychain 暂未默认启用。图中的子进程/safeStorage 是设计目标，后续硬化时再拆。

### 1.2 数据流

```text
登录：UI → main.addAccount(realm) → LoginWindow → 官方登录页
      → main 轮询 auth/token → AccountStore 加密入库
      → main 推送 account snapshot → gateway 更新账号池
      → gateway 拉目录/额度 → status.json → UI

请求：客户端 → gateway:46890 → 鉴权/路由 → provider adapter
      → WorkBuddy 上游 / OpenCode 会话 → CanonicalEvent
      → 协议 codec → 客户端 SSE / JSON

导入：UI → main.importPreview(target, selection) → importer dry-run → diff
      → UI 确认 → main.importApply → 备份/加锁/原子写 → 结果
```

### 1.3 关键设计原则

1. **单一凭据持有者**：WorkBuddy 账号只在 AI Bobby 登录/刷新；客户端不再直连上游。
2. **单一协议内核**：两个差异极大的上游（OpenAI 形 SSE vs OpenCode 会话）都归一成 `CanonicalEvent`。
3. **配置是用户资产**：所有导入 dry-run、备份、归属标记、可回滚。
4. **安全默认**：loopback only、Origin 拒绝、token 不落日志、账号 token 加密。
5. **可测试**：协议翻译、调度、导入器都能在无网络、无 Electron 的条件下单测。

---

## 2. 技术选型与仓库

### 2.1 选型

| 层 | 选择 | 理由 |
|---|---|---|
| 语言 | TypeScript **7.0.2**（strict，ESM，Bundler resolution） | 用户要求最新版；o-muse 同基线 |
| 运行时 | Node ≥ 22.19（Electron 44 内置） | 参考实现要求 |
| 包管理 | pnpm 10 workspace | 用户要求；包边界清晰 |
| 构建 | **electron-vite 6.0.0 + Vite 8.3.4**（main/preload/renderer）；包用 tsdown（按需） | 单工具链、HMR、Vite 8 |
| 测试 | Vitest **5.0.5** | 最新稳定 |
| 桌面 | Electron **44.9.0** + electron-builder **26.15.3** | 最新稳定；托盘/打包 |
| UI | React **19.3.1** + Tailwind **4.3.3** + shadcn/ui **4.22.0** + Ant Design **6.6.6** | 用户指定；按 `ui-guideline.md` 分层 |
| 图标 | lucide-react **1.59.0**；antd 内置图标 | shadcn 默认；不混用同类原子组件 |
| HTTP | `node:http` + 小路由（不引入框架） | 完全控制 SSE、body 限制、Origin 围栏 |
| 校验 | `zod` **4.6.7** | 请求/配置 schema 可复用 |
| YAML | `yaml` **2.9.1**（Document API） | 保留 DSH 配置注释 |
| TOML | `smol-toml` **1.9.1** 解析 + 标记块写入 | 保留 Codex 配置注释/其他 provider |
| JSON | `JSON.parse` + 稳定序列化 | Claude/WorkBuddy 配置 |
| 加密 | Electron `safeStorage`（设计） | 当前实现为 `0600` 明文；`safeStorage` 启动时会阻塞 Keychain，待显式启用 |
| 版本比较 | `semver` **7.8.5** | 更新检查 |
| 签名 | `@electron/osx-sign` **2.7.1** + `codesign` | ad-hoc，由内到外 |
| 日志 | 自研结构化 logger + 脱敏 | 不引入重依赖 |

> 版本基线：2026-10-18 查询 npm registry 的最新稳定版；精确 pin，升级走 `pnpm up --latest` 并记录。
> 第三方版本统一在根 `pnpm-workspace.yaml` 的 `catalog:` 声明，子项目 package.json 只写
> `"catalog:"`；workspace 包仍用 `workspace:*`。
> 必须保持：`react/react-dom` 同版本、`@types/react*` 同代、`tailwindcss` 与 `@tailwindcss/vite` 同版本、
> `antd` 与 `@ant-design/icons` 6.x。

### 2.2 仓库结构

```text
ai-bobby/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── docs/prd.md
├── docs/tech.md
├── handsoff.md
├── apps/
│   ├── desktop/
│   │   ├── electron.vite.config.ts
│   │   ├── electron-builder.yml
│   │   ├── components.json   # shadcn
│   │   ├── src/main/          # Electron 主进程
│   │   │   ├── index.ts
│   │   │   ├── window.ts
│   │   │   ├── tray.ts
│   │   │   ├── service.ts     # fork/重启网关
│   │   │   ├── login-window.ts
│   │   │   ├── account-store.ts
│   │   │   ├── ipc.ts
│   │   │   ├── updater.ts
│   │   │   ├── updater-core.ts
│   │   │   └── settings.ts
│   │   ├── src/preload/       # contextBridge
│   │   └── src/renderer/      # React UI
│   │       ├── index.html
│   │       ├── src/main.tsx
│   │       ├── src/App.tsx
│   │       ├── src/components/ (shadcn/ui + 业务组件)
│   │       ├── src/lib/ (utils / demo-data / theme)
│   │       └── src/index.css
│   └── cli/
│       └── src/index.ts       # serve/status/import
├── packages/
│   ├── core/                  # 领域模型、注册表、设置、日志、状态
│   ├── workbuddy/             # 双 realm 登录/账号/目录/聊天/额度/调度
│   ├── opencode/              # 运行时/免费筛选/检测/会话
│   ├── gateway/               # HTTP + CanonicalEvent + 三协议 codec
│   └── importers/             # 四个客户端
├── scripts/release/
│   ├── version.mjs            # 版本单一来源
│   ├── build-mac.sh           # 构建/签名/zip/checksums/latest.json
│   └── install.sh             # 同步到 releases/latest/
├── releases/latest/install.sh # 可审计安装脚本（入库）
├── .github/workflows/release.yml
└── refs/                      # 只读参考（.gitignore）
```

### 2.3 依赖方向

```text
core
 ↑        ↑
workbuddy opencode
 ↑        ↑
 └── gateway ──→ apps/cli
        ↑
     apps/desktop (main/preload/renderer)
        ↑
   importers（只依赖 core）
```

- provider 包不得互相 import。
- gateway 只依赖 `core` + provider 的公开接口。
- importers 只依赖 `core` 的类型/工具，不依赖 Electron。
- renderer 不直接 import Node 模块；所有能力走 preload。

---

## 2.4 UI 分层与 Token 桥接（按 `ui-guideline.md`）

### 2.4.1 分层

| 层 | 技术 | 用在哪 |
|---|---|---|
| 视觉叙事层 | shadcn/ui + Tailwind CSS 4 | 窗口骨架、顶部栏、来源 tab、按钮、输入、开关、Sheet、Dialog、更新条、设置、空/错状态 |
| 功能引擎层 | Ant Design 6 | 模型清单表格（排序、选择、展开、批量操作）、后续复杂表单 |
| 禁止 | 用 shadcn Table 手写排序/筛选/分页；用 antd Button/Card/Modal 搭主界面 | — |

- 新增 shadcn 组件必须用 `pnpm dlx shadcn@4.22.0 add <name>`，不手写“像 shadcn”的实现。
- 新增 antd 代码前，先用 `@ant-design/cli@6.6.6`（`antd info/doc/token/semantic`）核实 6.x API；
  不凭 v5 记忆生成。已确认 Table 的 `headerBg` / `rowHoverBg` / `rowSelectedBg` / `headerSplitColor`
  等 token 在 6.6.6 存在。
- 不混用两套同类原子组件：按钮/输入/开关/弹层用 shadcn；表格/复杂表单用 antd。

### 2.4.2 Token 单一真相源

Ant Design 的 CSS 变量是唯一颜色来源；主题色为电光克莱因蓝 `#1e4fff`：

```tsx
<ConfigProvider
  theme={{
    cssVar: { key: ':root' },          // 生成 --ant-color-* 变量
    algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#1e4fff',
      borderRadius: 7,
      fontFamily: '...',
      colorBgLayout: dark ? '#1b1b1d' : '#f5f5f7',
    },
    components: {
      Table: {
        headerBg: 'var(--ant-color-fill-quaternary)',
        rowHoverBg: 'var(--ant-color-fill-quaternary)',
        rowSelectedBg: 'var(--ant-color-primary-bg)',
        rowSelectedHoverBg: 'var(--ant-color-primary-bg-hover)',
        borderColor: 'var(--ant-color-border-secondary)',
        headerSplitColor: 'var(--ant-color-border-secondary)',
      },
    },
  }}
>
  <AntApp>
    <Sonner />
    <App />
  </AntApp>
</ConfigProvider>
```

Tailwind 通过 `@theme inline` 把语义色指向 antd 变量；shadcn 的 `--background` / `--primary`
等也指向 antd 变量，**不允许两套并行定义**。

### 2.4.3 样式隔离

`src/renderer/src/index.css` 结构：

```css
@layer vendor, theme, base, components, utilities, overrides;

@import url("antd/dist/reset.css") layer(vendor);
@import "tailwindcss/theme" layer(theme);
@import "tailwindcss/utilities" layer(utilities);

@plugin "tailwindcss-scoped-preflight" {
  isolation-strategy: inside;
  selector: .tw-root;
  except: .ant-app;
}

@theme inline {
  --color-background: var(--ant-color-bg-container);
  --color-foreground: var(--ant-color-text);
  --color-primary: var(--ant-color-primary);
  --color-border: var(--ant-color-border-secondary);
  /* … */
}

:root {
  --background: var(--ant-color-bg-container);
  --foreground: var(--ant-color-text);
  --primary: var(--ant-color-primary);
  --border: var(--ant-color-border-secondary);
  /* shadcn 其余变量同样指向 antd */
}
```

- 页面根节点：`.tw-root`（shadcn/Tailwind 作用域）。
- antd 区域：`<AntApp>` 自动提供 `.ant-app`，被 scoped preflight 排除。
- 禁止 `.ant-btn` / `.ant-table-thead th` 等全局选择器，禁止 `!important`；
  需要定制时用 ConfigProvider token 或局部 className（例如 `rowClassName`）。
- Tailwind 工具类禁止硬编码颜色（`bg-[#...]`）；只用语义类（`bg-background`、`text-muted-foreground` 等）。

### 2.4.4 主题

- 用户选择 `system | light | dark`，存 `settings.json`。
- 解析后同时设置 `document.documentElement.dataset.theme` 与 `.dark` class；
  Antd `algorithm` 切换；CSS 变量随之更新，shadcn/Tailwind 自动跟随。
- 首屏在 `index.html` 内联脚本里先设 `data-theme`，避免闪烁。

### 2.4.5 组件清单（首版）

```
components/
  app-shell.tsx          # 窗口骨架 / 标题栏 / 拖拽区
  source-tabs.tsx        # shadcn Tabs
  source-head.tsx        # 标题、说明、统计、动作
  account-strip.tsx      # 账号 chip、额度、冷却
  model-table.tsx        # antd Table（选择/展开/排序）
  model-detail.tsx       # 展开行内容
  import-sheet.tsx       # shadcn Sheet + 客户端/分组/默认模型/diff
  login-dialog.tsx       # shadcn Dialog（真实登录由主进程 BrowserWindow 承载）
  update-banner.tsx      # 非模态更新条
  settings-dialog.tsx    # 版本/自动更新/端口/主题
  status-bar.tsx         # 46890 / Key / 版本 / 服务状态
  ui/*                   # shadcn CLI 生成
```

---

## 3. 领域模型（`packages/core`）

### 3.1 标识

```ts
export type ProviderId = 'opencode' | 'workbuddy' | 'workbuddy-ai'
export type Realm = 'cn' | 'intl'

export type ModelId = `${'oc' | 'wb' | 'wbi'}/${string}`

export interface ModelRef {
  provider: ProviderId
  upstreamId: string      // 上游原始 id，例如 hy3
  id: ModelId             // 网关 id，例如 wb/hy3
  displayName: string     // WB. Hy3
}
```

### 3.2 模型描述

```ts
export interface ModelCapabilities {
  text: boolean
  images: boolean
  tools: boolean
  reasoning: boolean
}

export type ModelStatus =
  | 'available'
  | 'chat_only'
  | 'pending'
  | 'unavailable'
  | 'rate_limited'
  | 'no_account'

export interface ModelDescriptor extends ModelRef {
  groupName: string            // OpenCode / WorkBuddy / WorkBuddy AI
  capabilities: ModelCapabilities
  contextWindow?: number
  maxOutputTokens?: number
  status: ModelStatus
  accounts?: number            // 可用账号数（WorkBuddy）
  billing?: ModelBilling        // 倍率/促销
  latencyMs?: number
  checkedAtMs?: number
  error?: string
  upstream: Record<string, unknown> // 上游原始元数据，诊断用
}
```

### 3.3 账号

```ts
export interface WorkBuddyAccountMeta {
  uid: string
  nickname: string
  realm: Realm
  domain: string
  enabled: boolean
  preferred: boolean
  expiresAtMs: number
  lastUsedAtMs?: number
  cooldownUntilMs?: number
  cooldownReason?: 'rate_limit' | 'credit' | 'auth'
  credits?: CreditSnapshot
  createdAtMs: number
}

export interface WorkBuddyAccountSecret {
  accessToken: string
  refreshToken: string
}

export interface WorkBuddyAccount extends WorkBuddyAccountMeta {
  secret: WorkBuddyAccountSecret // 只在主进程/内存快照中出现
}
```

### 3.4 统一请求

```ts
export interface CanonicalTool {
  name: string
  description?: string
  parameters: Record<string, unknown> // JSON Schema
}

export type CanonicalContent =
  | { type: 'text'; text: string }
  | { type: 'image'; mediaType: string; data: string } // base64
  | { type: 'tool_call'; id: string; name: string; arguments: string }
  | { type: 'tool_result'; toolCallId: string; content: string; isError?: boolean }

export interface CanonicalMessage {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: CanonicalContent[]
}

export interface CanonicalRequest {
  model: ModelRef
  messages: CanonicalMessage[]
  tools: CanonicalTool[]
  toolChoice: 'auto' | 'none' | 'required' | { name: string }
  parallelToolCalls: boolean
  maxOutputTokens?: number
  temperature?: number
  topP?: number
  stop?: string[]
  reasoningEffort?: 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | 'max'
  stream: boolean
  metadata?: Record<string, string>
}
```

### 3.5 统一事件

```ts
export type CanonicalEvent =
  | { type: 'start'; responseId: string; model: ModelId }
  | { type: 'text'; delta: string }
  | { type: 'reasoning'; delta: string }
  | { type: 'tool_call_start'; index: number; id: string; name: string }
  | { type: 'tool_call_delta'; index: number; argumentsDelta: string }
  | { type: 'tool_call_end'; index: number }
  | { type: 'usage'; usage: CanonicalUsage }
  | { type: 'finish'; reason: 'stop' | 'tool_calls' | 'length' | 'content_filter' }
  | { type: 'error'; error: CanonicalError }

export interface CanonicalUsage {
  inputTokens: number
  outputTokens: number
  cachedInputTokens?: number
  reasoningTokens?: number
}

export interface CanonicalError {
  kind: 'auth' | 'credit' | 'rate_limit' | 'not_found' | 'upstream' | 'invalid_request'
  message: string
  status: number
  retryAfterMs?: number
}
```

### 3.6 模型注册表

```ts
export interface ModelRegistry {
  replace(provider: ProviderId, models: readonly ModelDescriptor[]): void
  list(options?: { all?: boolean }): readonly ModelDescriptor[]
  find(idOrAlias: string): ModelDescriptor | undefined
  aliasesFor(id: ModelId): readonly string[]
}
```

- 注册表只存元数据，不持有 token。
- `find` 支持网关 ID、显示名、导入器生成的 slug 别名。
- 同一 ID 冲突时以 provider 为准；不同 provider 前缀不会冲突。

---

## 4. WorkBuddy provider（`packages/workbuddy`）

### 4.1 双 realm 配置

```ts
export interface WorkBuddyVariant {
  id: 'workbuddy' | 'workbuddy-ai'
  realm: Realm
  displayName: string
  base: string            // https://copilot.tencent.com | https://www.workbuddy.ai
  billingBase: string     // https://www.codebuddy.cn | https://www.workbuddy.ai
  origin: string          // Origin/Referer
  desktopAuthFile?: string // 仅文档/诊断用，v1 不读取
  chatUserAgent: string
  jsonUserAgent: string
}
```

常量（随上游版本更新，集中在一处）：

```ts
CN: {
  base: 'https://copilot.tencent.com',
  billingBase: 'https://www.codebuddy.cn',
  origin: 'https://www.codebuddy.cn',
  chatUserAgent: 'WorkBuddy/5.5.6 WorkBuddy/5.5.6 CLI/2.137.1',
  jsonUserAgent: 'CLI/2.63.2 CodeBuddy/2.63.2',
}
INTL: {
  base: 'https://www.workbuddy.ai',
  billingBase: 'https://www.workbuddy.ai',
  origin: 'https://www.workbuddy.ai',
  chatUserAgent: 'WorkBuddy/5.5.2 WorkBuddy AI/5.5.2 CLI/5.5.2',
  jsonUserAgent: 'CLI/2.63.2 CodeBuddy/2.63.2',
}
```

### 4.2 登录流程

#### 4.2.1 开始

```http
POST {base}/v2/plugin/auth/state?platform=CLI
Content-Type: application/json
Accept: application/json, text/plain, */*
X-Requested-With: XMLHttpRequest
User-Agent: {jsonUserAgent}
Origin: {origin}
Referer: {origin}/

{}
```

成功：

```json
{ "code": 0, "msg": "OK", "data": { "state": "<state>", "authUrl": "https://.../login?..." } }
```

#### 4.2.2 打开登录页

- 主进程创建 `BrowserWindow`：
  - `partition: 'ai-bobby-login-<random>'`（非持久，关闭即清 cookie）
  - `nodeIntegration: false`, `contextIsolation: true`, `sandbox: true`
  - `width: 520`, `height: 720`，标题“登录 WorkBuddy”
  - `setWindowOpenHandler` 只允许 `https:`，其余拒绝或 `shell.openExternal`
- 加载 `authUrl`。
- 页面 `did-fail-load` / 用户关闭 / 超时 → 取消或回退系统浏览器。
- 若回退系统浏览器：`shell.openExternal(authUrl)`，主窗口显示“请在弹出的浏览器完成登录”，继续轮询。

> 2026-10-18 探测：CN/INTL 登录页均为官方页面，CN 含微信/QQ，INTL 含 Google/微信；
> 页面未设 `X-Frame-Options`/CSP。仍需 P2 真机验证各登录方式在 Electron 中的行为。

#### 4.2.3 轮询

```http
GET {base}/v2/plugin/auth/token?state=<state>
Accept: application/json, text/plain, */*
X-Requested-With: XMLHttpRequest
User-Agent: {jsonUserAgent}
Origin: {origin}
Referer: {origin}/
```

- 每 2 秒一次，最多 10 分钟。
- `code === 11217`：继续等待。
- `code === 0`：`data.accessToken` / `refreshToken` / `expiresAt` / `domain`。
- 其他：终止并显示 `code`/`msg`。
- 用户取消：清除定时器，关闭窗口，丢弃 state。

#### 4.2.4 取资料

```http
GET {base}/v2/plugin/login/account?state=<state>
Authorization: Bearer <accessToken>
Origin/Referer/UA 同上
```

取 `data.nickname` / `data.uid`（缺失时从 JWT `uid` 兜底）。

#### 4.2.5 入库

- 归一化 `expiresAt`：支持秒/毫秒/ISO 字符串；缺失时读 JWT `exp`。
- 主进程用 `safeStorage.encryptString(JSON.stringify(secret))` 加密 token，写账号库。
- 立即拉一次目录与额度；失败不阻塞账号出现。

### 4.3 账号库

文件：

```
<dataDir>/accounts/cn.json
<dataDir>/accounts/intl.json
```

结构：

```json
{
  "version": 1,
  "realm": "cn",
  "accounts": [
    {
      "uid": "u_xxx",
      "nickname": "Alice",
      "domain": "copilot.tencent.com",
      "enabled": true,
      "preferred": false,
      "expiresAtMs": 1760000000000,
      "lastUsedAtMs": 1759990000000,
      "credits": {
        "total": 2401,
        "packages": [{ "name": "pro", "remain": 2401, "size": 3000, "endTimeMs": 1762000000000 }],
        "fetchedAtMs": 1759990000000
      },
      "secret": "<base64(safeStorage.encryptString(...))>",
      "secretKind": "safeStorage"
    }
  ]
}
```

规则：

- 主进程唯一写入；写前加锁、备份、原子替换。
- `secret` 只在主进程解密；`status.json` 不含 secret。
- CLI 模式：`secretKind: "plain"`，文件 `0600`，启动时打印一次警告。
- `safeStorage.isEncryptionAvailable() === false` 时降级为 `plain` 并在 UI 提示。

> **实现状态（2026-10-18）**：当前实际实现为单个 `<dataDir>/accounts.json`，
> token 以 `0600` 明文落盘；上面的分 realm 文件与 `safeStorage` 信封是设计目标，
> 待解决 Keychain 启动阻塞后再迁移。
- 删除账号：删除该条并重写文件；不留 token。
- 账号去重：`realm + uid`；重新登录同一 uid 更新 token，不新增。

### 4.4 账号快照与 IPC

主进程 → 网关：

```ts
type AccountSnapshot = {
  realm: Realm
  accounts: Array<{
    uid: string
    nickname: string
    domain: string
    enabled: boolean
    preferred: boolean
    expiresAtMs: number
    accessToken: string
    refreshToken: string
    catalog?: WorkBuddyModelDescriptor[]
    credits?: CreditSnapshot
  }>
}
```

- 启动时发送全量快照。
- 登录/删除/启停/刷新后发送增量事件。
- 网关刷新 token 后发送 `accounts.secret.updated`，主进程加密持久化。
- IPC 消息只在本机进程间传递；不落盘、不日志。

### 4.5 目录

```http
GET {base}/v3/config
Authorization: Bearer <accessToken>
Accept: application/json
Origin/Referer: {origin}
X-Requested-With: XMLHttpRequest   // INTL
X-Product: SaaS                    // INTL
X-User-Id / X-Enterprise-Id        // CN 企业账号，有则带
User-Agent: {jsonUserAgent}
```

解析：

- `data` 可能是 `{ models, agents }` 或顶层裸文档；两种都接受。
- 模型字段：`id`、`name`、`contextWindow`、`maxTokens`、`supportsImages`、`supportsReasoning`、
  `onlyReasoning`、`reasoning.{supportedEfforts,defaultEffort,canDisableThinking}`、`billing`、`tags`。
- 促销标签：CN 另读 `/console/enterprises/personal/models` 的 `tags`，失败忽略。
- 缓存：每账号 10 分钟；持久化 `catalog-cache.json`；失败回退上次成功快照。

### 4.6 聊天

```http
POST {base}/v2/chat/completions
Authorization: Bearer <accessToken>
Content-Type: application/json
Accept: text/event-stream
Origin/Referer: {origin}
User-Agent: {chatUserAgent}
X-Requested-With: XMLHttpRequest
X-Product: SaaS          // INTL
```

请求准备：

- 始终 `stream: true`（上游只稳定支持流式）。
- `model` 用上游 id（去掉 `wb/` / `wbi/`）。
- `tool_choice` 统一成字符串（上游对对象形式不稳定）。
- 图片：只接受 data URL；上游不支持时返回 400。
- 系统提示/历史原样保留，不重写（缓存友好）。
- `max_tokens`、`temperature`、`top_p`、`stop`、`reasoning_effort` 透传。

SSE 解析：

```text
data: {"id":"...","choices":[{"delta":{"content":"..."}}]}
data: {"choices":[{"delta":{"tool_calls":[{"index":0,"id":"...","function":{"name":"...","arguments":"..."}}]}}]}
data: {"choices":[{"finish_reason":"tool_calls"}]}
data: [DONE]
```

映射到 `CanonicalEvent`：

| 上游 | Canonical |
|---|---|
| `delta.content` | `text` |
| `delta.reasoning_content` / `delta.reasoning` | `reasoning` |
| `delta.tool_calls[i].id/function.name` | `tool_call_start` |
| `delta.tool_calls[i].function.arguments` | `tool_call_delta` |
| `finish_reason` | `finish` |
| `usage` | `usage` |
| HTTP 错误 | `error`（分类见 4.7） |

### 4.7 错误分类

```ts
function classify(status: number, body: string): CanonicalError['kind'] {
  if (status === 401 || status === 403) return 'auth'
  if (status === 402) return 'credit'
  if (status === 429) return 'rate_limit'
  if (status === 404) return 'not_found'
  if (status >= 500) return 'upstream'
  if (/insufficient|credit|quota|积分不足|额度不足|余额不足/i.test(body)) return 'credit'
  return 'invalid_request'
}
```

- `Retry-After` 解析为 `retryAfterMs`；缺失时 429 默认 60s，402 默认 30 分钟。
- 错误正文截断 4 KB；不记录完整 prompt/response。

### 4.8 多账号调度

```ts
interface PoolAccount {
  meta: WorkBuddyAccountMeta
  secret: WorkBuddyAccountSecret
  models: Set<string>
  cooldowns: Map<string, number> // modelId | '*' -> until
}

class AccountScheduler {
  pick(modelId: string): PoolAccount | undefined
  markCooldown(account: PoolAccount, modelId: string, ms: number, reason): void
  markSuccess(account: PoolAccount, modelId: string): void
}
```

`pick` 规则：

1. 过滤 `enabled`、token 未过期、`models.has(modelId)`、当前无冷却。
2. `preferred` 账号优先（用户“仅用此账号”即把其他账号临时排除）。
3. 其余按 `lastUsedAtMs` 升序（round-robin），`uid` 字典序打破平局。
4. 没有账号 → `no_account`。

请求重试：

```
for attempt in 1..2:
  account = pick(model)
  if none -> 429/402
  result = call(account)
  if ok -> markSuccess; stream
  if kind == auth && attempt == 1:
     refresh(account)
     if refresh ok -> retry same account
     else mark invalid; continue
  if kind == rate_limit/credit:
     markCooldown; continue
  else -> return error
```

- 已经向客户端写出首个字节后失败：不能再换账号，直接结束流并写协议错误事件。
- 刷新锁：每账号一个 Promise 单飞；并发请求共享同一刷新结果。

### 4.9 额度

```http
GET {base}/v2/billing/meter/get-user-resource
Authorization: Bearer <accessToken>
Origin/Referer: {origin}
User-Agent: {jsonUserAgent}
```

- 解析 `data.packages[]`：`PackageName`、`Remain`、`Size`、`CycleEndTime`。
- 合计 `total`；缺失字段不影响其他。
- 国际版若企业端点不同，先走个人端点，失败显示“额度不可用”，不阻塞。
- 不做定时轮询；在登录、手动刷新、tab 打开时读取。

### 4.10 token 刷新

```http
POST {base}/v2/plugin/auth/token/refresh
Authorization: Bearer <refreshToken>
Origin/Referer/UA 同上
```

- 返回 `accessToken`、可选 `refreshToken`、`expiresIn`、`domain`。
- 到期前 5 分钟刷新；单账号单飞。
- 刷新失败：若 access token 仍有效，继续用；否则标记 `expired`，提示重新登录。
- 刷新结果通过 IPC 交主进程加密写回账号库。

---

## 5. OpenCode provider（`packages/opencode`）

> 以 `refs/RuiC-oc-ferry/src/` 为蓝本移植到 TypeScript；不改变其安全语义。

### 5.1 运行时

- 发现顺序：环境变量 `AI_BOBBY_OPENCODE_PATH` → 数据目录 `runtime/<version>/opencode` → 下载。
- 下载：`opencode-<os>-<arch>` npm 包，校验 `dist.integrity` 的 SHA-512，只解压 `package/bin/opencode`。
- 目录：启动 `opencode serve --pure` 读取 `/provider`，拿到免费模型后立即停止；不把 serve 留在后台。
- 对话：当前 OpenCode 官方 server 对免费模型返回 free-tier gate（仅允许官方客户端内使用），
  因此改用官方 `opencode run --pure --model opencode/<id> --format json`，从 JSON 事件取文本。
  这是实现细节，不是用户可见的额外登录。
- 启动（仅目录）：

```text
opencode serve --pure
  --hostname 127.0.0.1
  --port <random>
  环境：隔离的 XDG_CONFIG_HOME / XDG_DATA_HOME / XDG_CACHE_HOME / XDG_STATE_HOME
  Basic 口令：随机，仅本进程内存
```

- 关闭：先停会话，再 SIGTERM，超时 SIGKILL；退出清理残留。

### 5.2 免费筛选

```ts
const free = model.cost.input === 0
  && model.cost.output === 0
  && model.cost.cache.read === 0
  && model.cost.cache.write === 0
  && model.status !== 'deprecated'
  && model.capabilities.output.text !== false
```

- 不看名字里的 `free`。
- 排除 `deprecated`。

### 5.3 检测

- 请求：给 5 个工具，要求读一个含随机 token 的文件；模型必须返回信封 JSON 的 `calls`。
- 判定：
  - 正确调用 → `available`（工具开启）。
  - 只回文本 → `chat_only`（工具关闭）。
  - 动作不符 → 重试一次；仍不符 → `unavailable`。
  - 超时/限流 → `unavailable` + 原因；10 分钟后可重试。
- 并发：默认 3，上限 6；可配置。
- 缓存：成功 6 小时；负载/限流 10 分钟；按模型能力指纹失效。

### 5.4 会话与信封

- 每个请求启动一次官方 `opencode run`（隔离 XDG 目录），把 system prompt + 外部对话 JSON 作为 prompt。
- 为什么不用 server `/session/:id/message`：免费模型在 server 路径被 free-tier gate 拒绝；
  官方 CLI 路径可用，且能拿到流式 JSON 事件。
- 系统提示约束：模型只输出一个 JSON 信封：

```json
{ "content": "给用户的文本", "calls": [{ "name": "外部工具名", "arguments": {} }] }
```

- 校验：
  - 信封必须是对象，`content` 字符串，`calls` 数组；
  - 工具名必须在本次请求的 tools 中；
  - 参数必须是对象；
  - `tool_choice=none/required/forced` 与数量复核；
  - 失败重试一次（诊断重发）；仍失败返回 502。
- 审批围栏：当前是 prompt 级约束 + 只解析外部工具信封；OpenCode 原生工具尚未强制 deny，
  这是 P3 的剩余硬化项（需避免 free-tier gate 与权限配置冲突）。
- 图片：当前声明不支持，网关直接 400；图片转发待补。

### 5.5 Canonical 映射

OpenCode 的响应是**缓冲后**得到完整信封，因此：

- `content` → 一个 `text` 事件（可一次性）。
- 每个 call → `tool_call_start` + `tool_call_delta`（完整 arguments）+ `tool_call_end`。
- usage：`input + cache.read + cache.write` → `inputTokens`；`output + reasoning` → `outputTokens`。
- `finish`：有 calls → `tool_calls`，否则 `stop`。

### 5.6 检测缓存

`probe-cache.json`：

```json
{
  "version": 1,
  "entries": {
    "oc/big-pickle": {
      "fingerprint": "sha256:...",
      "status": "available",
      "checkedAtMs": 1759990000000,
      "expiresAtMs": 1760010000000,
      "latencyMs": 13600,
      "error": null
    }
  }
}
```

- 指纹包含模型 id、上下文、能力、OpenCode 版本。
- 读取时过期/指纹不符则忽略。

---

## 6. 网关（`packages/gateway`）

### 6.1 HTTP 层

```ts
createServer(async (req, res) => {
  // 1. loopback Host 校验
  // 2. Origin 拒绝
  // 3. 路由
  // 4. body 限制 / JSON 校验
  // 5. 鉴权
  // 6. 处理
})
```

- 只 bind `127.0.0.1`。
- `Host` 必须是 `127.0.0.1:<port>` / `localhost:<port>` / `[::1]:<port>`。
- 任何 `Origin` 头 → 403（这个端口不给浏览器用）。
- `Content-Type: application/json`（POST）。
- body 上限 64 MB；超出 413。
- 总并发 8；单 provider 4；超出 429。
- 启动期 `ready=false` → 503。
- 客户端 `req.on('close')` → AbortController。

### 6.2 鉴权

```ts
function authorized(req: IncomingMessage): boolean {
  const bearer = /^Bearer\s+(.+)$/i.exec(req.headers.authorization ?? '')?.[1]
  const xApiKey = req.headers['x-api-key']
  return timingSafeEqual(bearer ?? xApiKey ?? '', apiKey)
}
```

- 常量时间比较；长度不同先返回 false。
- `/health` 不要求 Key，只返回 `status/version/port`；其余 `/v1/*` 都要求。
- API Key 轮换后旧 Key 立即失效；网关热更新内存 Key。

### 6.3 路由表

| 方法 | 路径 | 处理器 |
|---|---|---|
| GET | `/health` | `health()` |
| GET | `/v1/models` | `models()` |
| POST | `/v1/chat/completions` | `chat()` |
| POST | `/v1/responses` | `responses()` |
| GET | `/v1/responses/:id` | `responseById()`（v1 可 404） |
| POST | `/v1/messages` | `messages()` |
| POST | `/v1/messages/count_tokens` | `countTokens()` |

### 6.4 模型列表

```json
{
  "object": "list",
  "data": [
    {
      "id": "wb/hy3",
      "object": "model",
      "created": 0,
      "owned_by": "workbuddy",
      "name": "WB. Hy3",
      "group": "workbuddy",
      "group_name": "WorkBuddy",
      "capabilities": { "text": true, "images": true, "tools": true, "reasoning": true },
      "context_window": 192000,
      "max_output_tokens": 64000,
      "status": "available",
      "accounts": 2
    }
  ]
}
```

- 默认只返回 `available` / `chat_only`。
- `?all=1` 含 `pending` / `unavailable` / `rate_limited` / `no_account`。
- `created` 固定 0（上游无创建时间）。

### 6.5 请求归一化

```ts
function toCanonical(req: ChatRequest | ResponsesRequest | AnthropicRequest): CanonicalRequest
```

#### Chat Completions

- `messages`：role/content；`content` 字符串或 `text`/`image_url` 数组。
- `tool_calls` / `tool` role：转 `tool_call` / `tool_result`。
- `tools[].function`：转 `CanonicalTool`。
- `tool_choice`、`parallel_tool_calls`、`reasoning_effort`、`max_tokens`、`temperature`、`top_p`、`stop`。

#### Responses

- `instructions` → system 消息。
- `input` 字符串 → user 消息；数组 → `message` / `function_call` / `function_call_output`。
- `tools`：`function` 类型；内置工具（web_search 等）不支持，忽略并记录 warning。
- `reasoning.effort` → `reasoningEffort`。

#### Anthropic

- `system` 字符串/块数组 → system 消息。
- `content` 块：
  - `text` → text
  - `image` → image（base64）
  - `tool_use` → tool_call
  - `tool_result` → tool_result
- `tools[].input_schema` → `CanonicalTool.parameters`。
- `tool_choice`：`auto` / `any`（required）/ `tool`（forced）/ `none`。
- `thinking`：`enabled` → `reasoningEffort` 映射；无法映射时忽略并 warning。

### 6.6 Provider 调用

```ts
interface ProviderAdapter {
  readonly id: ProviderId
  chat(request: CanonicalRequest, signal: AbortSignal): AsyncIterable<CanonicalEvent>
}
```

- 网关根据 `request.model.provider` 选 adapter。
- 模型不存在/不可用 → 404/400，`model_not_found`。
- `chat_only` 模型 + tools → 400 `tools_not_supported`。
- 每个请求一个 `responseId`（`chatcmpl_...` / `resp_...` / `msg_...`）。

### 6.7 Chat Completions codec

非流式：

```ts
const events = await collect(adapter.chat(req, signal))
return {
  id, object: 'chat.completion', created, model: req.model.id,
  choices: [{ index: 0, message: { role: 'assistant', content, tool_calls }, finish_reason }],
  usage: { prompt_tokens, completion_tokens, total_tokens, ... }
}
```

流式：

```text
data: {"id":"...","object":"chat.completion.chunk","created":...,"model":"wb/hy3","choices":[{"index":0,"delta":{"role":"assistant"},"finish_reason":null}]}
data: {"...","choices":[{"index":0,"delta":{"content":"..."},"finish_reason":null}]}
data: {"...","choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"id":"...","type":"function","function":{"name":"...","arguments":"..."}}]},"finish_reason":null}]}
data: {"...","choices":[{"index":0,"delta":{},"finish_reason":"tool_calls"}]}
data: {"...","choices":[],"usage":{...}}
data: [DONE]
```

- `usage` 仅在请求 `stream_options.include_usage` 或网关默认包含时发送；默认包含，兼容多数客户端。
- 错误在首字节前 → HTTP 错误 JSON；首字节后 → SSE error 事件 + `[DONE]`。

### 6.8 Responses codec

请求 → canonical，见 6.5。

流式事件序列：

```text
event: response.created
data: {"type":"response.created","response":{"id":"resp_...","object":"response","created_at":...,"model":"wb/hy3","status":"in_progress","output":[]}}

event: response.output_item.added
data: {"type":"response.output_item.added","output_index":0,"item":{"id":"msg_...","type":"message","status":"in_progress","role":"assistant","content":[]}}

event: response.content_part.added
data: {"type":"response.content_part.added","item_id":"msg_...","output_index":0,"content_index":0,"part":{"type":"output_text","text":""}}

event: response.output_text.delta
data: {"type":"response.output_text.delta","item_id":"msg_...","output_index":0,"content_index":0,"delta":"..."}

event: response.output_text.done
data: {"type":"response.output_text.done","item_id":"msg_...","output_index":0,"content_index":0,"text":"..."}

event: response.output_item.done
data: {"type":"response.output_item.done","output_index":0,"item":{"id":"msg_...","type":"message","status":"completed","role":"assistant","content":[{"type":"output_text","text":"..."}]}}

event: response.completed
data: {"type":"response.completed","response":{"id":"resp_...","status":"completed","output":[...],"usage":{"input_tokens":...,"output_tokens":...,"total_tokens":...}}}
```

工具调用：

```text
event: response.output_item.added
data: {"type":"response.output_item.added","output_index":1,"item":{"id":"fc_...","type":"function_call","status":"in_progress","call_id":"call_...","name":"read_file","arguments":""}}

event: response.function_call_arguments.delta
data: {"type":"response.function_call_arguments.delta","item_id":"fc_...","output_index":1,"delta":"{\"path\":"}

event: response.function_call_arguments.done
data: {"type":"response.function_call_arguments.done","item_id":"fc_...","output_index":1,"arguments":"{\"path\":\"a\"}"}

event: response.output_item.done
data: {"type":"response.output_item.done","output_index":1,"item":{"id":"fc_...","type":"function_call","status":"completed","call_id":"call_...","name":"read_file","arguments":"{\"path\":\"a\"}"}}
```

非流式：返回同形状的 `response` 对象，`output` 含 message/function_call。

错误：

- 首字节前：HTTP 4xx/5xx `{ error: { message, type, code } }`。
- 首字节后：`event: error` + `{type:"error", ...}`，随后结束。

> **Codex 兼容注意**：Codex 可能发送 `previous_response_id`、`store`、`include`、
> `prompt_cache_key` 等 Responses 特性。v1 若不支持 `previous_response_id`，必须返回明确的
> 400 `unsupported_parameter`（而不是静默忽略导致上下文丢失）；`store`/`include` 可忽略并在日志记录。
> P4 用真实 Codex 验证事件序列与多轮行为。

### 6.9 Anthropic Messages codec

请求 → canonical，见 6.5。

流式事件：

```text
event: message_start
data: {"type":"message_start","message":{"id":"msg_...","type":"message","role":"assistant","model":"wb/hy3","content":[],"stop_reason":null,"stop_sequence":null,"usage":{"input_tokens":123,"output_tokens":0}}}

event: content_block_start
data: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"..."}}

event: content_block_stop
data: {"type":"content_block_stop","index":0}

event: content_block_start
data: {"type":"content_block_start","index":1,"content_block":{"type":"tool_use","id":"toolu_...","name":"read_file","input":{}}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"{\"path\":"}}

event: content_block_stop
data: {"type":"content_block_stop","index":1}

event: message_delta
data: {"type":"message_delta","delta":{"stop_reason":"tool_use","stop_sequence":null},"usage":{"output_tokens":45}}

event: message_stop
data: {"type":"message_stop"}
```

非流式：

```json
{
  "id": "msg_...",
  "type": "message",
  "role": "assistant",
  "model": "wb/hy3",
  "content": [{ "type": "text", "text": "..." }, { "type": "tool_use", "id": "toolu_...", "name": "read_file", "input": {} }],
  "stop_reason": "tool_use",
  "stop_sequence": null,
  "usage": { "input_tokens": 123, "output_tokens": 45 }
}
```

- `thinking` 块：若上游有 reasoning，可发射 `thinking` / `thinking_delta`；没有签名时不回放。
- `stop_reason` 映射：`stop → end_turn`、`length → max_tokens`、`tool_calls → tool_use`、
  `content_filter → end_turn`（并在 text 中说明）。
- 错误：Anthropic 信封 `{ "type": "error", "error": { "type": "authentication_error" | "rate_limit_error" | "api_error" | "invalid_request_error", "message": "..." } }`。

### 6.10 usage 换算

| 来源 | input | output | cache |
|---|---|---|---|
| WorkBuddy OpenAI | `prompt_tokens` | `completion_tokens` | `prompt_tokens_details.cached_tokens` |
| OpenCode | `input + cache.read + cache.write` | `output + reasoning` | `cache.read` |
| Anthropic 请求 | 估算/上游 | 上游 | — |

- Chat：`prompt_tokens` / `completion_tokens` / `total_tokens`。
- Responses：`input_tokens` / `output_tokens` / `total_tokens`。
- Anthropic：`input_tokens` / `output_tokens`；缓存字段可选。

### 6.11 count_tokens

- CJK 感知估算：ASCII 约 4 字符/token；CJK 约 1.5 字符/token；图片按固定预算。
- 结果标注 `estimated: true`（扩展字段），不伪造精确值。

### 6.12 错误映射

| Canonical | HTTP | Chat | Anthropic |
|---|---|---|---|
| `auth` | 401 | `authentication_error` | `authentication_error` |
| `credit` | 402 | `insufficient_quota` | `permission_error` / `api_error` |
| `rate_limit` | 429 | `rate_limit_exceeded` | `rate_limit_error` |
| `not_found` | 404 | `model_not_found` | `not_found_error` |
| `invalid_request` | 400 | `invalid_request_error` | `invalid_request_error` |
| `upstream` | 502 | `upstream_error` | `api_error` |

- 错误正文包含：发生了什么、哪个来源/账号尾号、是否已换账号、建议动作。
- 不返回上游 token、内部路径、完整请求体。

---

## 7. 导入器（`packages/importers`）

### 7.1 通用接口

```ts
export interface ImportSelection {
  groups: ProviderId[]
  modelIds: string[]
  defaultModelId?: string
  setAsDefault?: boolean
  dryRun: boolean
}

export interface ImportPlan {
  target: ImportTarget
  path: string
  detected: boolean
  changed: boolean
  diff: string
  warnings: string[]
  requiresRestart: boolean
}

export interface Importer {
  readonly target: ImportTarget
  detect(): Promise<{ path: string; detected: boolean; reason?: string }>
  plan(selection: ImportSelection): Promise<ImportPlan>
  apply(selection: ImportSelection): Promise<ImportPlan>
  rollback(): Promise<ImportPlan>
}
```

通用机制：

- `withFileLock(path, fn)`：锁文件 + 过期（5 分钟）。
- `backup(path)`：`<name>.ai-bobby-<timestamp>.bak`，保留 5 份。
- `atomicWrite(path, text, mode)`：同目录临时文件 + `rename`。
- 写前读 mtime/hash；写时再读一次，不一致则放弃。
- 所有 importer 只动自己标记的条目/块。
- `dryRun` 绝不写文件、不写备份。
- 写入含密钥的文件后，尽量把权限收紧到 `0600`（若原文件更严格则保留）；
  Codex `config.toml` / Claude `settings.json` 常被其他工具读取，默认权限可能过宽。

### 7.2 WorkBuddy

目标：

- `~/.workbuddy/models.json`（国内版）
- `~/.workbuddy-ai/models.json`（国际版）

结构：数组。条目：

```json
{
  "id": "wb/hy3",
  "name": "WB. Hy3",
  "vendor": "Custom",
  "url": "http://127.0.0.1:46890/v1/chat/completions",
  "apiKey": "<key>",
  "supportsToolCall": true,
  "supportsImages": true,
  "supportsReasoning": true,
  "reasoning": { "supportedEfforts": ["low","medium","high"], "defaultEffort": "medium", "canDisableThinking": false },
  "maxInputTokens": 192000,
  "maxOutputTokens": 64000,
  "aiBobbyOwner": "ai-bobby-v1"
}
```

规则：

- 只增删 `aiBobbyOwner === "ai-bobby-v1"` 的条目。
- 与用户条目 id 冲突 → 跳过并 warning，不覆盖。
- 国内版目标排除 `wb/`；国际版目标排除 `wbi/`；`oc/` 与另一版本可导入。
- 不自动删除 `ocFerryOwner` 条目；提供单独“清理 oc-ferry 条目”动作（二次确认）。
- `id` 优先用网关 ID；若检测到客户端不接受 `/`，用 `ai-bobby-<group>-<slug>`，网关注册别名。
- 写入前备份；内容未变返回 `changed:false`。

### 7.3 Codex

目标：`~/.codex/config.toml`。

```toml
# >>> ai-bobby:start
[model_providers.ai-bobby]
name = "AI Bobby"
base_url = "http://127.0.0.1:46890/v1"
wire_api = "responses"
experimental_bearer_token = "<key>"
# <<< ai-bobby:end
```

规则：

- 用标记块写入；只替换标记块内内容。
- 若文件已有 `[model_providers.ai-bobby]` 在标记块外 → 冲突，拒绝并提示。
- 可选：若用户勾选“设为默认”，设置顶层 `model` / `model_provider`；否则不动。
- 解析用 `smol-toml` 校验结果；写入后重新解析确认。
- 不删除其他 provider、注释、项目配置。

### 7.4 Claude Code

目标：`~/.claude/settings.json`。

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:46890",
    "ANTHROPIC_AUTH_TOKEN": "<key>",
    "ANTHROPIC_MODEL": "wb/hy3"
  }
}
```

规则：

- 深合并 `env`；保留其他键与顶层键。
- 可选写 `ANTHROPIC_DEFAULT_HAIKU_MODEL` / `SONNET` / `OPUS`。
- 不覆盖用户已有的 `ANTHROPIC_*` 值，除非用户勾选“覆盖”；冲突在 diff 中展示。
- JSON 无注释；写前备份，格式化输出。

### 7.5 DeepSeek Harness

目标：`~/.dsh/profiles/<profile>/cordis.patch.yml`。

探测：

- 枚举 `~/.dsh/profiles/*/`，优先 `desktop`，其次包含 `cordis.patch.yml` 的 profile。
- 读取 `package.json` 的 `dsh.profile.bundles` 判断是否 DSH profile。
- 允许用户切换 profile。

写入：

```yaml
- id: llm-pi-ai
  name: "@deepseek-ai/dsh-llm-pi-ai"
  config:
    providers:
      ai-bobby:
        apiKeyEnv: AI_BOBBY_API_KEY
        api: openai-completions
        baseURL: http://127.0.0.1:46890/v1
        models:
          - id: wb/hy3
            name: WB. Hy3
            contextWindow: 192000
            maxTokens: 64000
            input: [text, image]
```

- 用 `yaml` Document API 查找 `id: llm-pi-ai` 的条目；没有则报错并给手动片段（不擅自新增 bundle 实例）。
- 合并 `providers.ai-bobby`；保留其他 provider 与注释。
- 删除：只删 `ai-bobby` 键；若 `providers` 变空，保留空对象。
- 密钥：
  - 首选通过 DSH 的 credentials 引用机制写入 `AI_BOBBY_API_KEY`；
  - 若版本/schema 不匹配，退回“提示用户在 DSH 设置中填入 Key”，配置文件仍写入 `apiKeyEnv`。
  - `~/.dsh/.credentials.yaml` 的 `refs` 是明文映射（本机实测 `version: 1`）；写入前备份，失败不破坏。
- 写入后提示重启 DSH；不修改 DSH 的 `package.json` / `node_modules`。

### 7.6 回滚

- 记录最近一次备份路径与写入 hash。
- 回滚前确认当前文件仍包含我们的标记/内容；若被外部修改，拒绝并提示。
- 回滚只恢复备份；不删除用户其他改动。

---

## 8. 桌面应用（`apps/desktop`）

### 8.1 主进程

职责：

- 单实例锁；创建窗口/托盘；加载 renderer。
- fork 网关子进程；健康检查；崩溃重启一次；退出时优雅停止。
- LoginWindow 管理；AccountStore；safeStorage。
- Importer 调用；设置读写；状态聚合。
- IPC 白名单。

### 8.2 网关子进程

- 启动参数：`--data-dir`、`--port`、`--api-key-file`、`--log-level`。
- 主进程通过 `child.send` 发送账号快照；子进程通过 `process.send` 上报状态/账号更新。
- 子进程退出码非 0 → 主进程重启一次；连续失败显示错误。
- 子进程不直接读账号库；只持有内存快照。

### 8.3 状态

`status.json`（原子写）：

```json
{
  "pid": 12345,
  "startedAtMs": 1759990000000,
  "gateway": { "state": "ready", "port": 46890, "version": "0.2.1" },
  "providers": {
    "opencode": { "state": "ready", "models": 10, "available": 7, "pending": 0 },
    "workbuddy": { "state": "ready", "accounts": 2, "models": 12 },
    "workbuddy-ai": { "state": "no_account", "accounts": 0, "models": 0 }
  },
  "probes": { "running": false, "done": 10, "total": 10 },
  "accounts": [
    { "realm": "cn", "uidTail": "…a1b2", "nickname": "Alice", "enabled": true, "credits": 2401 }
  ],
  "apiKey": { "masked": "sk-…f3a2", "updatedAtMs": 1759990000000 }
}
```

- 主进程只在 `pid` 匹配当前子进程时接受。
- 不含 token、完整 Key、prompt。

### 8.4 preload API

```ts
interface AiBobbyApi {
  getStatus(): Promise<StatusDocument>
  onStatus(cb: (status: StatusDocument) => void): () => void

  refresh(provider: ProviderId): Promise<void>
  probe(provider: ProviderId, modelId?: string): Promise<void>

  addAccount(realm: Realm): Promise<AccountMeta>
  cancelLogin(): Promise<void>
  listAccounts(realm: Realm): Promise<AccountMeta[]>
  removeAccount(realm: Realm, uid: string): Promise<void>
  setAccountEnabled(realm: Realm, uid: string, enabled: boolean): Promise<void>
  setAccountPreferred(realm: Realm, uid: string): Promise<void>
  refreshCredits(realm: Realm): Promise<void>

  importPreview(target: ImportTarget, selection: ImportSelection): Promise<ImportPlan>
  importApply(target: ImportTarget, selection: ImportSelection): Promise<ImportPlan>
  importRollback(target: ImportTarget): Promise<ImportPlan>

  getApiKey(): Promise<{ masked: string }>
  copyApiKey(): Promise<void>
  rotateApiKey(): Promise<void>

  getSettings(): Promise<Settings>
  setSettings(patch: Partial<Settings>): Promise<Settings>
  openDataDir(): Promise<void>
}
```

- 只暴露固定动作，不暴露任意 `fs`/`exec`/`ipcRenderer`。
- `contextIsolation: true`、`sandbox: true`、`nodeIntegration: false`。

### 8.5 Renderer

组件树：

```text
App
├── TitleBar (traffic lights handled by OS; brand + tabs + theme)
├── SourceTabs (OpenCode | WorkBuddy | WorkBuddy AI)
├── CommandBar
│   ├── SourceSummary
│   ├── Actions (refresh/probe)
│   └── ImportButton
├── AccountStrip (WorkBuddy/WBI only)
├── ModelTable
│   ├── MetricHeader
│   ├── ModelRow (expandable)
│   └── Empty/Loading/Error
├── ImportDrawer
├── SettingsDialog
└── StatusBar
```

状态：

- `useStatus()`：订阅 preload 状态；500ms 推送。
- `useSelection()`：跨 tab 的选中模型集合。
- `useImport()`：抽屉状态、预览、写入、回滚。
- `useAccounts()`：当前 realm 账号列表。
- 主题：`data-theme` + CSS 变量；持久化。

样式：

- 复用 oc-ferry 的字体、间距、圆角、状态色、深浅色 token。
- 新增：tab 下划线/胶囊、账号条、抽屉、diff 预览。
- 表格列宽：勾选 36、模型 flex、能力 120、状态 110、耗时 140。
- 无横向滚动；窄窗时隐藏“能力”列。

### 8.6 窗口与托盘

- 主窗口：1160×860，最小 900×640；`titleBarStyle: hiddenInset`（macOS）。
- 托盘：模板图标；菜单见 PRD。
- 关窗：隐藏窗口，不退出；托盘退出才停服务。
- 退出：停止网关 → 停止 OpenCode → 释放单实例锁。

---

### 8.7 版本探测与自动更新

#### 8.7.1 模块

```
src/main/updater-core.ts   # 纯函数：manifest schema、semver、platform key、sha256、格式化
src/main/updater.ts        # Electron 编排：fetch、下载、校验、解压、签名、替换、重启
src/shared/update.ts       # 主/渲染共享类型
```

`updater-core.ts` 不 import `electron`，可直接 Vitest 单测。

#### 8.7.2 清单

`https://xsin.github.io/ai-bobby/releases/latest/latest.json`

```json
{
  "version": "0.2.1",
  "notes": "本次更新要点",
  "pub_date": "2026-10-18T09:00:00Z",
  "platforms": {
    "darwin-aarch64": {
      "url": "https://xsin.github.io/ai-bobby/releases/0.2.1/AI-Bobby-0.2.1-arm64.zip",
      "sha256": "<64 hex>",
      "size": 12345678
    },
    "darwin-x86_64": { "url": "…", "sha256": "…", "size": 0 }
  },
  "signature": "base64(ed25519(canonical-json-without-signature))"
}
```

- `version` 用 semver 比较；忽略预发布后缀（v1 不做 prerelease 排序）。
- `platforms` key：`darwin-aarch64` / `darwin-x86_64` / `win32-x64`。
- `signature` 可选；若存在且应用内置公钥，必须验签；验签失败中止。
- 清单与 zip 同源时 SHA256 只能防损坏；Ed25519 才能防“同时篡改清单+产物”。

#### 8.7.3 检查

- 启动后 8 秒检查一次，之后每 6 小时。
- 自动检查失败（网络/DNS/超时/5xx）静默；手动检查失败展示原因。
- 结果缓存 10 分钟，避免频繁请求。

#### 8.7.4 下载与校验

```ts
const dir = join(app.getPath('userData'), 'updates', info.version)
const zip = join(dir, `AI-Bobby-${info.version}-${arch}.zip`)
await download(info.url, zip, onProgress)   // 流式，支持取消
const hash = await sha256File(zip)
if (hash !== info.sha256) throw new UpdateError('checksum_mismatch')
```

- 下载先写 `.part`，完成后 rename。
- 失败/取消删除 `.part`。
- 校验失败删除 zip，保留错误状态供重试。

#### 8.7.5 安装（macOS）

1. `ditto -x -k <zip> <dir>/extract`
2. 找到 `AI Bobby.app`；由内到外 ad-hoc 签名：
   - `Contents/Frameworks/**`（Electron Framework、Helper Apps）
   - `Contents/MacOS/*` 可执行文件
   - 外层 `AI Bobby.app`
3. `codesign --verify --deep --strict`；失败中止。
4. 生成固定模板替换脚本（不拼接用户输入）：

```sh
#!/bin/sh
set -eu
while kill -0 "$PID" 2>/dev/null; do sleep 0.2; done
APP="$APP_PATH"
NEW="$NEW_PATH"
BAK="$APP.bak"
mv "$APP" "$BAK"
if ditto "$NEW" "$APP"; then
  xattr -dr com.apple.quarantine "$APP" 2>/dev/null || true
  open "$APP"
  rm -rf "$BAK"
else
  rm -rf "$APP"
  mv "$BAK" "$APP"
  exit 1
fi
```

5. `launchctl submit -l work.xsin.aibobby.update.<uuid> -- /bin/sh <script>` 脱离父进程；
   应用 `app.quit()`。
6. 下次启动读取 `<dataDir>/updates/last-result.json`，失败则提示并保留旧版本。

> Windows 预留：下载 zip/nsis → PowerShell 替换 → 重启；v1 先实现 macOS。

#### 8.7.6 UI 状态

```
idle → checking → available → downloading → verifying → installing → restart
                    └→ dismissed（本次会话）
```

- 更新条：`发现新版本 x.y.z`，可展开 notes/size；按钮 `稍后` / `更新`。
- 设置页：当前版本、自动检查开关、手动检查、更新源 URL、安装并重启。
- 下载进度通过 `webContents.send('update:progress', …)` 推送。
- 任何校验/安装失败用危险色提示，不提供“仍然安装”。

#### 8.7.7 测试

- `updater-core`：semver 比较（0.10 > 0.9）、platform key、manifest 解析（缺字段/空 platforms）、
  SHA256 校验、Ed25519 验签（固定密钥对 fixture）。
- 手动真机：旧版发现新版 → 下载 → 校验 → 替换 → 重启；篡改 zip 拒绝；断网静默。

### 8.8 签名、打包与发布

#### 8.8.1 版本单一来源

- 根 `package.json` 的 `version`；`scripts/release/version.mjs` 读取。
- 构建时注入 `APP_VERSION` 环境变量；`app.getVersion()` 读取打包后的 package.json。
- 版本号同时写入 `VERSION.txt` 和 `latest.json`，CI 断言一致。

#### 8.8.2 构建

```sh
pnpm install
pnpm --filter @ai-bobby/desktop build          # electron-vite build
electron-builder --mac dir --arm64 --x64       # 或分架构两次
```

- `electron-builder.yml`：`productName: AI Bobby`、`appId: work.xsin.aibobby`、
  `directories.output: release`、`mac.target: dir`、`mac.identity: null`（手动签名）。
- 产物：`release/mac-arm64/AI Bobby.app`、`release/mac/AI Bobby.app`（x64）。
- 打包后由 `scripts/release/build-mac.sh` 执行签名/校验/zip。

#### 8.8.3 ad-hoc 签名

- 使用 `@electron/osx-sign`（`identity: '-'`）或显式 `codesign` 由内到外。
- 必须验证：`codesign --verify --deep --strict --verbose=2 "AI Bobby.app"`。
- 预留 `SIGN_IDENTITY` / `NOTARIZE` / `APPLE_ID` / `TEAM_ID` / `APP_SPECIFIC_PASSWORD`；
  v1 默认 `SIGN_IDENTITY=-`、`NOTARIZE=0`。
- 不签名的 Electron App 在 Apple Silicon 上无法运行，ad-hoc 是底线。

#### 8.8.4 产物

```
release/<version>/
  AI-Bobby-<version>-arm64.zip
  AI-Bobby-<version>-arm64.zip.sha256
  AI-Bobby-<version>-x64.zip
  AI-Bobby-<version>-x64.zip.sha256
  checksums.txt
  VERSION.txt
  latest.json
```

- zip 用 `ditto -c -k --keepParent`；保留扩展属性/签名。
- SHA256 用 `shasum -a 256`；`checksums.txt` 双列格式。
- 资源名用连字符（`AI-Bobby`），避免 GitHub Releases 把空格替换成点。

#### 8.8.5 双通道

| 通道 | 内容 | 特点 |
|---|---|---|
| gh-pages `releases/latest/` | install.sh、VERSION.txt、checksums.txt、latest.json | 可变 latest 指针；**不放 zip**（Git 100MB 限制） |
| GitHub Release（tag） | zip 二进制 + checksums + VERSION + latest.json + install.sh + notes | 不可变归档、大文件托管、人工下载、通知 |

- `.github/workflows/release.yml` 在 `v*` tag 触发；macos-latest；构建 arm64 + x64；
  签名/校验；zip/checksums/latest.json；推 gh-pages；创建 Release。
- `latest.json` 的 `url` 指向 GitHub Release 资产（`/releases/download/v<version>/...`）；`sha256` 从 `checksums.txt` 读取，不重算。
- `install.sh` 默认 `BASE_URL=https://github.com/xsin/ai-bobby/releases/latest`，先读 `/latest/download/VERSION.txt`，再从 `/download/v<version>/` 下载。
- 可选 Ed25519：CI 用 secret `UPDATE_SIGNING_KEY` 对 canonical JSON 签名；
  应用内置公钥；私钥不入库。

#### 8.8.6 install.sh

- `scripts/release/install.sh` 为真源，同步到 `releases/latest/install.sh`（入库可审计）。
- 兼容 macOS bash 3.2；不使用 mapfile/关联数组。
- 参数：`--version` / `--install-dir` / `--no-launch` / `--system` / `--help`。
- 默认 `~/Applications/AI Bobby.app`；`--system` → `/Applications`（sudo）。
- 架构检测 arm64/x86_64；优先 universal（如有），回退单架构。
- 下载候选：gh-pages `<root>/<version>/<file>` 与 GitHub `<root>/download/<tag>/<file>`。
- SHA256 优先 `checksums.txt`，回退 `<file>.sha256`；缺失时拒绝安装（需显式 skip）。
- `ditto -x -k` 解压；退出旧进程；覆盖前备份；`xattr -dr com.apple.quarantine`；默认 `open`。

#### 8.8.7 发布自检

- `codesign --verify --deep --strict` 通过（从 zip 解出再验）。
- `latest.json` schema 合法；版本与 VERSION.txt/package.json 一致；platform keys 合法；
  URL 为 https；sha256 64 hex；size 与实际一致。
- 安装脚本在干净 macOS 上从 curl 跑通；旧版本能被新版本更新。

---

## 9. 数据与安全

### 9.1 数据目录

```
<dataDir>/
├── api-key                  0600
├── settings.json
├── status.json
├── accounts/
│   ├── cn.json
│   └── intl.json
├── catalog-cache.json
├── probe-cache.json
├── logs/
│   └── ai-bobby.log
└── runtime/
    └── <opencode-version>/
```

- 目录 0700；敏感文件 0600。
- 原子写；写前备份（账号库保留 3 份）。
- 数据目录可由 `AI_BOBBY_DATA_DIR` 覆盖（调试）。

### 9.2 脱敏

- 日志：token/Key 只显示 `<redacted>` 或尾号 4 位。
- 错误：不拼接 Authorization/body 原文。
- 诊断包：只含状态、版本、日志（已脱敏）、配置摘要；不含账号 secret。
- `status.json`：账号只给 nickname、uid 尾号、额度、状态。

### 9.3 威胁模型

| 威胁 | 缓解 |
|---|---|
| 其他本机进程调用网关 | API Key + loopback；不提供匿名 |
| 浏览器 DNS rebinding | Origin 拒绝 + Host 校验 |
| 本机恶意读取数据目录 | 目录 0700、文件 0600、账号 token safeStorage |
| 日志泄露 | 结构化字段白名单；不记录正文/token |
| 配置写入破坏用户文件 | 备份、锁、归属标记、dry-run、回滚 |
| 上游返回恶意内容 | 不执行上游命令；OpenCode 审批围栏；只做工具转交 |
| 端口被占用 | 明确错误；不静默换端口 |

---

## 10. 错误模型

### 10.1 网关错误

```ts
class GatewayError extends Error {
  constructor(
    readonly kind: 'auth' | 'credit' | 'rate_limit' | 'not_found' | 'invalid_request' | 'upstream',
    readonly status: number,
    message: string,
    readonly options?: { retryAfterMs?: number; accountTail?: string },
  ) { super(message) }
}
```

### 10.2 用户可见文案

- `auth`：`WorkBuddy 登录已失效（账号 …a1b2），请到 WorkBuddy 标签重新登录。`
- `credit`：`账号 …a1b2 积分不足，已尝试其他账号；都不可用，请充值或添加账号。`
- `rate_limit`：`上游限流，账号 …a1b2 冷却 42 秒；已切换/请稍后重试。`
- `not_found`：`模型 wb/hy3 不在当前账号目录中；请刷新目录。`
- `upstream`：`上游返回 502；已记录请求 ID …；请稍后重试。`
- `invalid_request`：`请求不合法：<具体字段>。`

---

## 11. 测试策略

### 11.1 单元测试（默认无网络）

- 协议 codec：
  - Chat 请求/响应、SSE chunk 序列；
  - Responses 事件序列、工具调用；
  - Anthropic 请求/事件序列、tool_use/tool_result；
  - 三种方言之间的等价请求。
- WorkBuddy：
  - 登录 state/poll 状态机（fake fetch）；
  - 错误分类、Retry-After；
  - 账号调度（round-robin、冷却、401 刷新、流中失败）；
  - 目录解析（CN/INTL fixture）；
  - usage 换算。
- OpenCode：
  - 免费筛选；
  - 信封 decode/校验；
  - 检测判定与缓存；
  - 事件映射。
- Importers：
  - 临时目录；合并、冲突、备份、原子写、回滚、幂等；
  - TOML/YAML/JSON fixture；
  - 只动归属条目。
- Core：
  - 模型 ID/别名；
  - 注册表合并；
  - 日志脱敏。
- Updater core：
  - semver 数值比较（0.10.0 > 0.9.0）；
  - platform key 映射；
  - `latest.json` 解析（缺字段、空 platforms、非法 URL）；
  - SHA256 校验；
  - Ed25519 验签（固定密钥对 fixture）；
  - 替换脚本模板不含用户输入拼接。

### 11.1.1 发布产物自检

- `latest.json` 版本与 `VERSION.txt`、根 `package.json` 一致。
- `latest.json` 每个平台 URL 为 https、sha256 64 hex、size 与实际文件一致。
- zip 内 `AI Bobby.app` 的 `codesign --verify --deep --strict` 通过。
- `checksums.txt` 与 zip 实际 SHA256 一致。
- `install.sh` 用 `bash -n` 语法检查；在临时目录用 `--no-launch` 演练。

### 11.2 集成测试

- 网关 + fake provider：真实 HTTP 请求，验证三种协议、鉴权、Origin、body 限制、并发。
- 主进程 IPC：fake gateway child，验证状态/账号快照。
- 不访问真实上游；CI 可跑。

### 11.3 手动真机测试

- macOS：登录 CN/INTL（微信/Google）、双账号、额度、流式、工具调用。
- Codex / Claude Code / DSH / WorkBuddy 四个客户端各一次对话 + 工具调用。
- 浅色/深色/系统主题；窄窗；键盘操作。
- 端口占用、网关崩溃、账号过期、429/402。

### 11.4 测试数据

- `fixtures/workbuddy/`：目录 JSON、SSE 片段、billing JSON、login state/poll JSON。
- `fixtures/opencode/`：模型目录、检测响应、信封。
- `fixtures/importers/`：四种配置样本（含用户手写条目）。
- 所有 fixture 不含真实 token/Key。

---

## 12. 打包与发布

### 12.1 构建

```sh
pnpm install
pnpm build          # packages + apps
pnpm typecheck
pnpm test
pnpm --filter @ai-bobby/desktop package:mac
```

- `tsdown` 构建 packages/main/preload/gateway 为 ESM/CJS 按需。
- `vite build` 构建 renderer。
- Electron main 以 CJS 输出（preload 兼容 sandbox）；gateway 以 ESM 输出，fork 时用 `ELECTRON_RUN_AS_NODE=1`。
- 打包 `asar: true`；需要原生模块时 `asarUnpack`。

### 12.2 macOS

- `electron-builder --mac dmg zip`，ad-hoc 签名；未公证，首次打开需右键。
- 最低 macOS 13。
- 托盘模板图标；`LSUIElement` 可选（v1 保留 Dock 图标，托盘常驻）。

### 12.3 Windows

- `electron-builder --win nsis`；安装包 + 开机自启（默认关，用户勾选）。
- 路径：`%APPDATA%\AI Bobby`；safeStorage DPAPI。
- 防火墙只放行 loopback，不监听局域网。

### 12.4 升级

- v1 不做自动更新；设置里“检查更新”打开 release 页。
- 数据迁移：`version` 字段；账号库/设置升级函数；备份旧文件。
- 端口/Key 保持；客户端配置无需重写（除非用户改端口/轮换 Key）。

---

## 13. 迁移与兼容

### 13.1 从 OC Ferry 迁移

- 不自动删除 `ocFerryOwner` 条目；导入抽屉提供“清理 OC Ferry 条目”单独动作。
- 可读取 OC Ferry 的 `probe-cache.json`？v1 不迁移，重新检测即可。
- 端口不同（41980 vs 46890），可并存；建议用户切换后移除旧条目。

### 13.2 从 workbuddy2api-hub 迁移

- 账号需在 AI Bobby 重新登录（不导入 hub 的账号文件；避免复制 token）。
- DSH 原来的 `workbuddy2api` provider 不自动删除；导入 `ai-bobby` 后提示用户切换默认模型。
- 8787/8788 可继续运行；AI Bobby 用 46890，不冲突。

### 13.3 客户端兼容

| 客户端 | 协议 | 关键配置 |
|---|---|---|
| WorkBuddy | Chat | `models.json` 数组；`url` 指向 `/v1/chat/completions` |
| Codex | Responses | `wire_api = "responses"`；`experimental_bearer_token` |
| Claude Code | Messages | `ANTHROPIC_BASE_URL` 不含 `/v1`；`ANTHROPIC_AUTH_TOKEN` |
| DSH | Chat | `llm-pi-ai` provider；`api: openai-completions` |

---

## 14. 实施里程碑（与 handsoff 对应）

| 阶段 | 交付 | 验收 |
|---|---|---|
| P0 | PRD / tech / 对齐 | 用户评审通过 |
| P1 | workspace、core、gateway 骨架、CLI | `pnpm typecheck && pnpm test`；46890 `/health` |
| P2 | WorkBuddy 登录/多账号/目录/聊天/额度/调度 | 双 realm 各两账号；流式 + 切号 |
| P3 | OpenCode 运行时/免费筛选/检测/会话 | 自动准备运行时；检测可用 |
| P4 | 三协议 codec + 工具调用 | Codex/Claude/DSH/WorkBuddy 真机 |
| P5 | 四个 importer + 回滚 | 四客户端导入 + 幂等 |
| P6 | 三 tab UI + 账号条 + 导入抽屉 | 截图风格验收 |
| P7 | 打包 macOS/Windows | 安装即用 |

---

## 15. 风险与待验证项

1. **内嵌登录**：微信/Google 在 Electron `BrowserWindow` 中是否可用；需 P2 真机验证。回退系统浏览器已设计。
2. **登录 state 生命周期**：10 分钟超时；多账号连续登录时 state 不串。
3. **refresh token 轮换**：上游是否轮换、旧 token 是否立刻失效；需真机观察。
4. **DSH credentials schema**：`refs` 写入是否被 DSH 接受；需在测试 profile 验证；失败退化为手动。
5. **Codex `experimental_bearer_token`**：本机已验证，但需验证新版本是否仍支持；不支持时退化为 `env_key` + 环境变量提示。
6. **Claude Code 模型别名**：`ANTHROPIC_MODEL` 是否接受带 `/` 的 ID；需真机验证；必要时用别名映射。
7. **WorkBuddy models.json `id` 是否接受 `/`**：需真机验证；导入器保留 slug 回退。
8. **OpenCode 运行时下载**：网络/代理/校验；继承 oc-ferry 的失败提示。
9. **上游协议变化**：集中在 provider 包；用 fixture 和真机 smoke 发现。
10. **多账号风控**：轮询与并发可能触发限流；默认保守并发，错误透明，不做绕过。
11. **Codex Responses 多轮**：若 Codex 依赖 `previous_response_id`/`store`，v1 需明确拒绝或补状态存储；
    P4 必须先验证，不能静默丢上下文。
12. **Gatekeeper / ad-hoc**：无 Developer ID，首次打开可能被拦；install.sh 清 quarantine，
    文档给右键打开指引。
13. **更新替换运行中的 .app**：必须脱离父进程 + 备份 + 回滚；失败保留旧版本并提示重跑 install.sh。
14. **更新清单同源风险**：SHA256 不能防同时篡改清单+产物；用 Ed25519 清单签名增强。
15. **antd + Tailwind 样式冲突**：必须用 scoped preflight / `.tw-root` / `.ant-app` 与 token 桥接；
    UI 测试要覆盖深浅色与 antd 弹层（Select/Dropdown）。

---

## 16. 附录

### 16.0 安装与更新

```bash
# curl 一键安装
curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh | bash

# 可审计安装
curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh -o install.sh
less install.sh && bash install.sh

# 手动指定版本 / 目录
bash install.sh --version 0.2.1 --install-dir ~/Applications
```

更新清单：

```text
https://xsin.github.io/ai-bobby/releases/latest/latest.json
```

### 16.1 端点速查

```text
Gateway
  GET  /health
  GET  /v1/models
  POST /v1/chat/completions
  POST /v1/responses
  POST /v1/messages
  POST /v1/messages/count_tokens

WorkBuddy
  POST {base}/v2/plugin/auth/state?platform=CLI
  GET  {base}/v2/plugin/auth/token?state=<state>
  GET  {base}/v2/plugin/login/account?state=<state>
  POST {base}/v2/plugin/auth/token/refresh
  GET  {base}/v3/config
  GET  {base}/console/enterprises/personal/models
  POST {base}/v2/chat/completions
  GET  {base}/v2/billing/meter/get-user-resource

OpenCode
  opencode serve --pure（随机端口）
  /event、会话/消息接口（按 oc-ferry backend 移植）
```

### 16.2 API Key 文件

```
<dataDir>/api-key   0600，32 字节随机，base64url 或 hex
```

### 16.3 端口

| 端口 | 用途 |
|---|---|
| 46890 | AI Bobby 网关（默认，固定） |
| 随机 | 隔离 OpenCode |
| 8787/8788 | 用户已有的 hub/headroom（不占用、不依赖） |
| 41980 | 用户已有的 OC Ferry（不占用、不依赖） |

### 16.4 参考来源

- `refs/RuiC-oc-ferry`（MIT）：OpenCode 运行时、检测、导入、UI。
- `refs/dsh-workbuddy-connect`（MIT）：WorkBuddy 上游协议、目录、错误分类。
- `refs/iskill-headroom-workbuddy2api`（MIT）：登录 state/poll、多账号、三种协议面的参考。
