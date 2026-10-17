# AI Bobby — Handoff / 实施计划

> 给下一个 agent：**先读 §0 和 §7（开放问题）**，不要从头重读 `refs/`。
> 本文档是跨 agent / 新会话的记忆锚点：目标、已确认事实、决策、进度、下一步。
> 每完成一个阶段，更新 §9 进度日志与 §0 的“当前阶段”。

- 最后更新：2026-10-18
- 当前阶段：**P1/P2/P4/P5/P6 已落地代码**：46890 网关、WorkBuddy provider、三种协议、四个 importer、桌面真实状态已接通；OpenCode provider 待实现
- 工作目录：`/Volumes/Pluto/dev/proj/ai-bobby`
- 仓库：`https://github.com/xsin/ai-bobby`（public，已推送）
- 安装通道：`https://xsin.github.io/ai-bobby/releases/latest/install.sh`（Pages 已开启）
- 首个 release：`v0.1.0`（UI shell preview，二进制在 GitHub Release）
- 持久目标：`goal-15734299-f955-4979-8342-639ef4809b84`（自动连续推进 v1：网关 / provider / importer）
- 工具链：Node v26.3.0、pnpm 10.15.1（本机已装）

---

## §0 30 秒召回

**要做什么**：做一个叫 **AI Bobby** 的本地 AI 服务网关桌面应用。它把三个来源的模型 ——
**OpenCode 免费模型池**、**WorkBuddy（国内版）桌面端内置模型**、**WorkBuddy AI（国际版）桌面端内置模型** ——
收敛成一个只监听本机的 OpenAI 兼容端点 `127.0.0.1:46890`，发一把 API Key；
再提供控制面板，管理三个分组的模型清单、检测、启停，
并支持一键把模型导入 **WorkBuddy / Codex / Claude Code / DeepSeek Harness** 四个客户端。

**从哪里来**：在 `refs/RuiC-oc-ferry`（单源：OpenCode → WorkBuddy 的摆渡应用）的代码与界面上迭代；
WorkBuddy 上游能力参考 `refs/dsh-workbuddy-connect`（TypeScript，MIT）；
代理/压缩/多协议的思路参考 `refs/iskill-headroom-workbuddy2api`（hub + headroom，Python，MIT）。

**现在在哪**：目标已对齐；`prd.md` / `tech.md` / `prototype/` 已评审通过。
新栈桌面壳（React 19 + TS7 + Vite8 + shadcn/Tailwind + antd 6 + Electron 44）已能构建并打包；
更新器（检查/下载/校验/替换）与 curl 安装脚本已实现并做了本地烟测；CI 发布工作流已写。
**网关与三个 provider 尚未实现**。

**一句话差异**：OC Ferry 是“把 OpenCode 免费模型摆渡给 WorkBuddy”；
AI Bobby 是“把三条来源摆渡给所有客户端”，WorkBuddy 既是上游来源，也是下游导入目标（要避免自环）。

### §0.2 本轮已落地（2026-10-18 深夜）

- **主题色**：电光克莱因蓝 **#1e4fff**（Ant Design `colorPrimary`，Tailwind/shadcn 桥接）。
- **前端栈**：React 19.3.1、TS 7.0.2、Vite 8.3.4、Electron 44.9.0、Tailwind 4.3.3、
  shadcn 4.22、antd 6.6.6；全部精确 pin，`pnpm-lock.yaml` 锁定。
- **UI**：三 tab、账号条、antd 模型表格、全局导入 Sheet、登录 Dialog、设置、更新条；
  `apps/desktop` 可 `electron-vite build`，已打出可运行的 `.app`。
- **更新器**：`latest.json` + semver + SHA256 + 可选 Ed25519；下载/校验/解压/重签/替换脚本；
  IPC/UI 已连通，12 项 core 单测通过；本地 manifest 烟测能弹出更新条。
- **分发**：ad-hoc 签名 + zip + `install.sh` + gh-pages/Release 工作流；
  本地 install.sh 已从 HTTP 源完整跑通（下载→SHA256→ditto→安装）。
- **打包**：arm64/x64 均能打出 `.app` 并 ad-hoc 验证；zip 约 127–135MB（Electron 体积）。
- **仓库**：`refs/` 已加入 `.gitignore`；准备推 `xsin/ai-bobby`（见 `human-sos.md`）。

### §0.3 Round 1 代码进展（目标轮次）

- `@ai-bobby/core`：领域类型、模型注册表、错误、日志脱敏。
- `@ai-bobby/gateway`：`/health`、`/v1/models`、`/v1/chat/completions`、
  `/v1/responses`、`/v1/messages`、`/v1/messages/count_tokens`；API Key、Origin/Host 围栏、并发上限、SSE。
- `@ai-bobby/workbuddy`：双 variant、官方登录 state/poll、AccountStore、目录解析/兜底、
  `/v3/config`、`/v2/chat/completions`、刷新、billing、SSE → CanonicalEvent、round-robin/冷却。
- `@ai-bobby/importers`：WorkBuddy 双 models.json、Codex config.toml、Claude settings.json、DSH cordis.patch.yml；
  dry-run/备份/原子写/回滚/归属标记。
- `apps/desktop`：主进程启动 46890 网关、IPC 状态、内嵌 WorkBuddy 登录窗口、导入 IPC；
  renderer 用真实状态替换 mock（浏览器预览仍用 demo）。
- 测试：gateway 9、workbuddy 12、importers 4、updater 12；`pnpm -r typecheck` 与全量测试通过。
- **未完成**：OpenCode provider（运行时/免费筛选/检测/会话）；Responses/Anthropic 真实 Codex/Claude 联调；
  WorkBuddy 真实账号联调；safeStorage 加密账号库；发布新版本。

### §0.1 2026-10-18 新增硬性要求（用户确认）

1. **前端栈**：React 19 + TypeScript 7 + shadcn/ui + Tailwind CSS 4 + Electron + Vite 8；
   **所有依赖使用当前最新版本**（精确 pin，见 `tech.md` 版本表）。
   按 `ui-guideline.md` 采用 **shadcn/Tailwind 视觉层 + Ant Design 6 数据表格层** 的混合架构。
2. **`refs/` 不提交 Git**：`.gitignore` 已加 `refs/`；参考代码只在本机。
3. **版本探测 + 自动更新**：启动后台检查、设置页手动检查、非模态更新条、
   下载/校验/替换/重启；不依赖 `electron-updater`（ad-hoc 签名下不可靠）。
4. **自签名 + curl 一键安装**：ad-hoc 签名、zip 分发、SHA256、gh-pages + GitHub Release 双通道；
   参考 `o-muse`（`/Volumes/Pluto/dev/proj/MuseRig`）的 `install.sh`、`release.yml`、`latest.json`。
5. **仓库**：推到 `xsin/ai-bobby`；GitHub Pages 作为安装通道
   `https://xsin.github.io/ai-bobby/releases/latest/install.sh`。
6. **发布参考 o-muse，并允许更优方案**：本项目的改进点是 Electron 原生更新器 +
   可选的 Ed25519 清单签名（o-muse 仅 SHA256），以及 macOS/Windows 双平台预留。

---

## §1 目的与非目标

### 1.1 目的

1. 一个本机常驻的网关进程，默认 `127.0.0.1:46890`，对外只暴露一个 OpenAI 兼容入口（以及下面说的另外两种方言）。
2. 三个模型来源统一注册、统一命名、统一鉴权、统一错误；每个来源可独立刷新、检测、启停。
3. 控制面板（Electron）让非工程用户也能完成：读取模型 → 检测 → 勾选 → 一键导入 → 查看服务状态。
4. 一键导入四个客户端，写入前备份、幂等、可回滚，只动自己标记的条目。
5. 所有凭据只留本机：WorkBuddy 桌面登录只读复用；网关 API Key 随机生成、`0600`、可轮换；日志不落明文 token。

### 1.2 非目标（v1 不做）

- 不做云托管、多用户、公网暴露、计费/配额转售。
- 不修改 WorkBuddy / Codex / Claude Code / DSH 的安装包或校验逻辑。
- 不承诺绕过上游的账号、地区或额度限制。
- 不做模型市场、prompt 管理、会话历史云同步。
- 不在 v1 做 WorkBuddy 多账号池 / OAuth 看板（除非 Q3 要求）。

### 1.3 关键洞察（已从本机配置验证）

用户当前已经用 **workbuddy2api-hub + Headroom（`localhost:8787`）** 把 WorkBuddy 模型接给多个客户端：

- **Codex**：`~/.codex/config.toml` 的 `[model_providers.local]` 使用 `wire_api = "responses"`，
  并且用 `experimental_bearer_token` 直接带 token。
- **Claude Code**：`~/.claude/settings.json` 的 `env` 使用 `ANTHROPIC_BASE_URL=http://localhost:8787`、
  `ANTHROPIC_AUTH_TOKEN`，模型名还带 `[1m]` 后缀。
- **DSH**：`~/.dsh/profiles/desktop/cordis.patch.yml` 的 `llm-pi-ai` 里配置了 `workbuddy2api` provider，
  `api: openai-completions`、`baseURL: http://localhost:8787/v1`。

**结论**：AI Bobby 若要做 8787 的 drop-in replacement，不能只做 OpenAI Chat Completions；
至少要同时提供 **Chat Completions + Responses + Anthropic Messages** 三种方言。
这是 v1 范围的关键决策（Q2）。

---

## §2 三个模型来源

| 来源 | 分组显示名 | 登录方式 | 上游 | 关键事实 |
|---|---|---|---|---|
| OpenCode 免费池 | `OpenCode` | 无需登录/Key | 隔离的 `opencode serve` | 按价格字段判免费；`free` 名字不算数；模型随时上下线 |
| WorkBuddy 国内版 | `WorkBuddy` | 复用桌面 App 登录 | `https://copilot.tencent.com` | `/v3/config` 目录、`/v2/chat/completions` 聊天、`/v2/plugin/auth/token/refresh` 刷新 |
| WorkBuddy AI 国际版 | `WorkBuddy AI` | 复用桌面 App 登录 | `https://www.workbuddy.ai` | 与国内版同路径、不同 UA/身份/目录；模型 id 可能重叠 |

**必须命名空间化**：两个 WorkBuddy 版本可能都有 `hy3`、`glm-5.3` 等同名 id。
用户已选定显示前缀 **`OC.` / `WB.` / `WBI.`**（英文句点，不是中点）。建议模型 id 同步用短前缀：

```
oc/<upstream-id>     显示名  OC. <name>
wb/<upstream-id>     显示名  WB. <name>
wbi/<upstream-id>    显示名  WBI. <name>
```

（显示名与 id 前缀均已确认；详见 PRD §3.1。）

### §2.1 WorkBuddy 凭据模型（已定：内嵌登录 + 多账号）

用户已选择 **B：内嵌登录页 + 多账号**，因此 **v1 不再读取/解密桌面 App 的凭据文件**。
下面先保留“dsh 那条路是什么”的结论，再写选定方案。

#### 为什么不用桌面凭据复用

dsh-workbuddy-connect 不是 OAuth：它只读 WorkBuddy 桌面 App 的
`~/Library/Application Support/CodeBuddyExtension/Data/Public/auth/workbuddy-desktop.info`
（国际版 `workbuddy-desktop-ai.info`），5.6+ 的 token 是 `$wbEncrypted` 信封，
要用 WorkBuddy 自己的 Electron 二进制取私有 key 才能解开。它不碰密码、不绕过登录，
但属于**本地会话凭据复用 + 私有协议反向工程**，是灰色地带，也有 refresh token 轮换的共存风险。
用户明确不希望走这条路，改为让用户在 AI Bobby 里主动登录。

#### 选定的登录流程（2026-10-18 已探测）

WorkBuddy 的登录本身是一个**官方网页登录页**，不是只能从桌面 App 里抠 token：

1. `POST {base}/v2/plugin/auth/state?platform=CLI`
   - 国内版 `base = https://copilot.tencent.com`，`Origin/Referer = https://www.codebuddy.cn`
   - 国际版 `base = https://www.workbuddy.ai`，`Origin/Referer = https://www.workbuddy.ai`
   - 返回 `{ state, authUrl }`；实测 `authUrl` 分别是 `https://copilot.tencent.com/login?...`
     和 `https://www.workbuddy.ai/login?...`。
2. 在 **Electron BrowserWindow** 里打开 `authUrl`，用独立 session partition（每个登录尝试一个），
   用户在官方页面完成登录（国内版实测页面含微信/QQ；国际版含 Google/微信）。
   页面当前未设 `X-Frame-Options` / CSP，初步可嵌入；若某登录方式在 webview 里被拦，
   回退到系统浏览器打开同一 URL，继续轮询。
3. 轮询 `GET {base}/v2/plugin/auth/token?state=...`
   - `code = 11217` 表示等待中；`code = 0` 时返回 `accessToken` / `refreshToken` /
     `expiresAt` / `domain`；超时 10 分钟作废。
4. `GET {base}/v2/plugin/login/account?state=...`（Bearer token）取昵称/uid，补齐账号信息。
5. 账号入库；关闭登录窗口；刷新该账号的模型目录与额度。
6. 过期前用 `POST /v2/plugin/auth/token/refresh` 刷新；只更新 AI Bobby 自己的账号库。

#### 多账号

- 账号按 `realm`（`cn` / `intl`）分开存；同一 realm 可存多个账号。
- 每个账号记录：`uid`、`nickname`、`domain`、`accessToken`、`refreshToken`、`expiresAt`、
  `enabled`、`lastUsedAt`、额度快照、模型目录快照。
- 账号 UI：WorkBuddy / WBI tab 顶部的账号条，展示昵称、启用状态、额度/到期时间；
  支持添加、删除、启用/禁用、设为优先。
- 调度（v1 建议，待确认）：在“有该模型且启用”的账号中做 **round-robin + 失败切换**；
  `401` 先刷新再换账号，`429/402` 标记冷却并换账号；流式响应一旦开始不中途换账号。
- 额度：按账号读 `/v2/billing/meter/get-user-resource`，展示剩余积分/套餐；失败不阻塞模型列表。

#### 安全

- token 不落日志、不进 `status.json`、不出现在 URL。
- 账号库落盘加密：桌面端优先用 Electron `safeStorage`（macOS Keychain / Windows DPAPI）；
  CLI 模式退回 `0600` 文件并明确提示。
- 删除账号即删除其 token；登出只删 AI Bobby 的副本，不动浏览器 cookie 之外的任何桌面数据。
- 首次添加账号时展示“这是非官方接口，可能违反上游条款、随时可能失效”的说明。

#### 边界

- 仍然是**非公开 API**：登录页是官方的，但后续的 token 使用、模型目录、聊天接口不是公开承诺；
  上游改版/风控随时可能失效。
- 不承诺绕过地区、账号或额度限制；登录失败要给出上游原始错误分类。
- 不把桌面凭据解密作为默认路径；最多在后续版本作为“从桌面导入”的显式高级选项（默认关闭）。

**架构含义（重要）**：AI Bobby 是**唯一持有 WorkBuddy 凭据并负责刷新的一方**。
把 Codex / Claude Code / DSH 都导入到 46890 后，它们只跟 AI Bobby 说话，不再各自直连
WorkBuddy 上游、各自刷新 token。这样能避免多进程刷新竞争，也正是“本地网关”相对
“每个客户端各配一个 8787”的核心价值。
迁移时应提示用户：导入后可移除 DSH 里原来的 `workbuddy2api` 直连 provider。

---

## §3 参考实现地图（只读，不修改）

### 3.1 `refs/RuiC-oc-ferry`（MIT）

单源摆渡应用，提供要继承的**产品骨架**与**OpenCode 侧实现**：

| 文件 | 可复用内容 |
|---|---|
| `src/runtime.js` | OpenCode 运行时发现/下载/校验/隔离启动，三个专用 agent 配置 |
| `src/backend.js` | OpenCode 会话、审批围栏、事件流、动作转交、翻译兜底 |
| `src/probe.js` / `probe-cache.js` | 检测请求、判定规则、并发、跨重启缓存 |
| `src/protocol.js` / `server.js` | 请求校验、信封编解码、SSE、鉴权、来源围栏 |
| `src/sync.js` | `models.json` 合并、加锁、备份、原子写、归属标记 |
| `src/main.js` | 状态机、检测队列、刷新、导入、退出清理 |
| `desktop/*` | Electron 窗口/托盘、preload、控制面板与视觉语言 |
| `docs/设计说明.md` | 架构、协议、边界、缓存策略 |
| `test/*.test.js` | 85 项无网络测试，可改写成 vitest |

**注意**：oc-ferry 是 plain JS + CJS Electron；AI Bobby 计划 TypeScript + ESM，需要移植而非直接复制。
保留 MIT 版权与来源说明。

### 3.2 `refs/dsh-workbuddy-connect`（MIT）

WorkBuddy 的 TypeScript 上游实现，是 AI Bobby 的 WorkBuddy provider 的主要参考：

| 文件 | 可复用内容 |
|---|---|
| `src/upstream.ts` | `/v3/config` 目录、`/v2/chat/completions`、刷新、错误分类、计费 |
| `src/variants.ts` | 国内/国际 variant 描述（域名、UA、身份头） |
| `src/catalog.ts` / `catalog-store.ts` | 目录模型、缓存、来源标记 |
| `src/shim.ts` | 本机 OpenAI 兼容 shim、强制流式、请求体 quirks、Host/Origin 围栏 |
| `src/pi-ai-guard.ts` / `probe*.ts` | 推理档位探测、模型可见性 |
| `src/client/*` | DSH 设置卡片与模型选择器的交互参考（AI Bobby UI 不一定照搬） |
| `src/auth.ts` / `desktop-credential-protection.ts` | **仅作背景**：桌面凭据复用/解密；v1 不采用 |

**限制**：它依赖 DSH 宿主包（`@deepseek-ai/*`、`@earendil-works/pi-ai`）。
移植时必须把宿主依赖剥离，只保留上游 + 目录 + shim 的可独立部分。

登录/多账号的参考改为 `workbuddy2api-hub` 的 `wb_accounts.py`：
`start_login`（`/v2/plugin/auth/state`）、`poll_login`（`/v2/plugin/auth/token`）、
`/v2/plugin/login/account`、刷新与额度接口；它已经验证过 state/poll 流程和双 realm。

### 3.3 `refs/iskill-headroom-workbuddy2api`（MIT，本机 alias → `/Users/lv/Workbuddy/ISkills/...`）

不是要直接依赖的代码，而是**产品能力与协议面的参考**：

- `workbuddy2api-hub`（Python 标准库，本机 `~/.iskill-headroom-workbuddy2api/workbuddy2api-hub`）：
  已证明同时提供 `/v1/chat/completions`、`/v1/responses`、`/v1/messages`，
  以及多账号调度、每日保活、看板 OAuth。
- `Headroom`（Python 包 `headroom-ai[proxy]==0.40.0`）：
  守住上游 prefix cache，只压最新增量；默认 `cache` 模式。
- 关键结论：这条链路上真正省钱的是**上游缓存命中（命中价 ≈ 未命中的 2%）**，不是压缩比；
  压缩过头反而会让缓存失效、更贵。
- 对本项目的含义：**默认不重写历史消息**，保持前缀稳定；压缩作为可选、后置能力。

**不要**把 Python hub/headroom 直接塞进 Electron 作为 v1 默认路径，除非 Q1 选择 sidecar 方案。

---

## §4 目标架构（提案，待 tech.md 定稿）

```text
┌──────────────────────────── AI Bobby.app / Electron ────────────────────────────┐
│ 主进程 (desktop/main)                                                            │
│   ├─ BrowserWindow ──preload──> 控制面板 (renderer)                              │
│   ├─ Tray                                                                        │
│   └─ fork/utilityProcess ──> 网关子进程 (packages/gateway)                        │
│          ├─ 127.0.0.1:46890                                                     │
│          ├─ 模型注册表 / 路由 / API Key / SSE                                    │
│          ├─ WorkBuddy provider ──> copilot.tencent.com / www.workbuddy.ai        │
│          └─ OpenCode provider ──> 隔离 opencode serve (随机端口 + Basic 口令)     │
└─────────────────────────────────────────────────────────────────────────────────┘
        ▲                    ▲                         ▲
   WorkBuddy            Codex (Responses)        Claude Code (Messages)
   (Chat)               DSH (Chat)               任意 OpenAI 客户端
```

### 4.1 进程与数据

- 网关子进程不依赖 Electron，`apps/cli` 可单独跑，便于调试。
- 面板通过主进程读 `status.json`（500ms），只在 `pid` 匹配时接受，避免读到上次运行的状态。
- 数据目录（提案）：
  - macOS：`~/Library/Application Support/AI Bobby`
  - Windows：`%APPDATA%\AI Bobby`
  - Linux：`$XDG_CONFIG_HOME/AI Bobby`
  - 覆盖：`AI_BOBBY_DATA_DIR`
- 文件：`api-key`（0600）、`status.json`、`settings.json`、`catalog-cache.json`、
  `probe-cache.json`、`service.pid`、`logs/`、`runtime/`（OpenCode）、`workbuddy-auth.json`（自有凭据副本）。
- 单实例锁；异常退出残留由下次启动的同一套合并逻辑清理。

### 4.2 网关协议面（v1 提案）

| 方法 | 路径 | 用途 | 主要客户端 |
|---|---|---|---|
| GET | `/health` | 状态 | 面板/脚本 |
| GET | `/v1/models` | 三组合并清单 | 全部 |
| POST | `/v1/chat/completions` | OpenAI Chat，流式/非流式 | WorkBuddy、DSH、通用 |
| POST | `/v1/responses` | OpenAI Responses（SSE 事件） | Codex |
| POST | `/v1/messages` | Anthropic Messages（SSE 事件） | Claude Code |
| POST | `/v1/messages/count_tokens` | 近似 token 计数 | Claude Code |
| GET | `/v1/responses/:id` | 可选：取回响应 | Codex（若需要） |

鉴权：`Authorization: Bearer <key>`；Anthropic 路径额外接受 `x-api-key`。
带 `Origin` 的浏览器请求一律 403（端口不给浏览器用），与 oc-ferry 一致。
请求体上限、并发上限、启动期 503、上游错误归一化沿用 oc-ferry 的做法。

### 4.3 三种方言的实现策略

- **Chat Completions**：WorkBuddy 上游本身就是 OpenAI 形 SSE，做请求体 quirk 适配 + 透传/轻翻译；
  OpenCode 侧走 oc-ferry 的信封协议。
- **Responses**：请求翻译成 Chat Completions，上游 SSE 再翻译成 Responses 事件
  （`response.created` / `response.output_item.added` / `response.output_text.delta` / `response.completed` 等）。
  工具调用需要 `function_call` / `function_call_output` 与 Chat 的 `tool_calls` 双向映射。
- **Anthropic Messages**：`system` 提升、`tool_use` / `tool_result` 与 Chat `tool_calls` 双向映射、
  `message_start` / `content_block_start` / `content_block_delta` / `message_delta` / `message_stop` 事件。
  这是四条链路里翻译量最大的一条。

> 若 Q1 选择 sidecar（hub + headroom），这三种方言由 hub 提供，AI Bobby 只做分组路由；
> 但会引入 Python 运行时、两个额外端口、账号模型与 hub 绑定等复杂度。

### 4.4 一键导入矩阵（提案）

| 客户端 | 目标文件 | 协议 | 密钥注入 | 默认导入分组 |
|---|---|---|---|---|
| WorkBuddy | `~/.workbuddy/models.json` | OpenAI Chat | 每个模型条目 `apiKey` | OC + WB AI（**排除 WB 国内版，避免自环**） |
| Codex | `~/.codex/config.toml` | Responses | `experimental_bearer_token`（本机已验证可用） | 全部 |
| Claude Code | `~/.claude/settings.json` | Anthropic Messages | `env.ANTHROPIC_AUTH_TOKEN` | 全部 |
| DeepSeek Harness | `~/.dsh/profiles/<profile>/cordis.patch.yml` + 凭据引用 | OpenAI Chat | `apiKeyEnv` + DSH credentials | 全部 |

共同要求：写前备份、原子替换、文件锁、幂等、只动自己标记的条目、失败可回滚。
Codex / Claude Code / DSH 的导入必须**先 dry-run 展示 diff**，用户确认后再写。

---

## §5 pnpm workspace

```text
ai-bobby/
├── package.json              # private root, scripts: build/dev/test/typecheck
├── pnpm-workspace.yaml       # apps/* + packages/*
├── tsconfig.base.json        # strict, NodeNext, ESM
├── handsoff.md               # 本文档
├── prd.md / tech.md          # 已产出 v0.1，待评审
├── apps/
│   ├── desktop/              # @ai-bobby/desktop：Electron
│   └── cli/                  # @ai-bobby/cli：无界面
├── packages/
│   ├── core/                 # @ai-bobby/core：领域模型、注册表、设置、日志
│   ├── opencode/             # @ai-bobby/opencode：运行时 + 免费模型 + 检测
│   ├── workbuddy/            # @ai-bobby/workbuddy：凭据 + 上游 + 目录
│   ├── gateway/              # @ai-bobby/gateway：三种协议面 + 路由 + 鉴权
│   └── importers/            # @ai-bobby/importers：四个客户端
└── refs/                     # 只读参考，不提交改动
```

依赖方向：`core ← providers ← gateway ← apps`；`importers` 依赖 `core`（以及必要时 gateway 的只读状态）。
禁止反向依赖；禁止 provider 互相 import。

命令：

```sh
pnpm install
pnpm typecheck
pnpm test
pnpm --filter @ai-bobby/desktop dev
```

> P1 才会补 tsconfig、构建脚本与首个可运行入口；当前只有包边界与文档。

---

## §6 决策记录

| # | 决策 | 状态 | 理由 |
|---|---|---|---|
| D1 | WorkBuddy 用 TypeScript 原生实现（移植 dsh-workbuddy-connect），不默认 sidecar Python hub | **已定** | 用户选择；单运行时、无 Python 依赖、复用 MIT TS 代码；headroom 压缩后置 |
| D2 | v1 同时提供 Chat / Responses / Messages 三种方言 | **已定** | 用户选择；现有 8787 工作流同时依赖 Codex Responses 与 Claude Messages |
| D3 | v1 用**官方登录页 + state/poll** 在 AI Bobby 内添加 WorkBuddy 账号，支持同 realm 多账号；不读取桌面凭据 | **已定** | 用户选择“内嵌登录 + 多账号”；比桌面凭据复用更干净、可切账号 |
| D3a | 多账号调度 v1 = round-robin + 失败切换；流式开始后不换账号；支持手动钉住单账号 | **已定** | 用户选择；简单可验证 |
| D4 | 模型 id 用 `oc/` / `wb/` / `wbi/`；显示名用 `OC.` / `WB.` / `WBI.` | **已定** | 两个 WorkBuddy 版本 id 会重叠；用户选定 |
| D5 | WorkBuddy 导入按目标 App 排除自身分组（CN 排除 `wb/`，INTL 排除 `wbi/`） | **已定** | 避免自环；另一版本与 OpenCode 可导入 |
| D6 | 所有客户端导入先 dry-run + 备份 + 归属标记 | **已定** | 配置是用户资产，必须可回滚 |
| D7 | 三个来源 tab；截图对应默认选中的 OpenCode tab；全局导入抽屉 | **已定** | 用户选择 |
| D8 | macOS 优先，Windows 在发版前补齐 | **已定** | 用户选择；参考实现与本机验证都在 macOS |
| D9 | 前端：React 19.3.1 + TS 7.0.2 + Vite 8.3.4 + Electron 44.9.0 + Tailwind 4.3.3 + shadcn 4.22 + antd 6.6.6（精确版本） | **已定** | 用户要求；按 `ui-guideline.md` 分层 |
| D10 | 自研更新器：`latest.json` + SHA256 + 可选 Ed25519 + 下载/替换/重启；不用 `electron-updater` | **已定** | ad-hoc 签名下 Squirrel.Mac 不可靠；参考 o-muse 并增强 |
| D11 | 分发：ad-hoc 签名 + zip + `install.sh` + gh-pages（安装通道）+ GitHub Release（归档） | **已定** | 用户要求；参考 o-muse |
| D12 | `refs/` 加入 `.gitignore`，不提交 | **已定** | 用户要求 |
| D13 | 所有依赖用当前最新稳定版，精确 pin；`pnpm-lock.yaml` 锁定 | **已定** | 用户要求 |
| D14 | 仓库 `xsin/ai-bobby`；Pages 基址 `https://xsin.github.io/ai-bobby` | **已定（待创建）** | 用户指定 |

---

## §7 开放问题（P0 必须对齐）

> 回答后把答案写进这里，状态改为“已定”，再写 PRD/Tech。

### Q1（已定）WorkBuddy 接入方式

**原生 TypeScript（A）**。移植 dsh-workbuddy-connect 的凭据/上游/目录，自己实现三种方言；
不默认引入 Python hub/headroom。Headroom 式压缩作为 P8 可选。

### Q2（已定）v1 协议面

**Chat + Responses + Anthropic Messages 三面全做**。
Codex 保持 `wire_api = "responses"`，Claude Code 保持 `ANTHROPIC_BASE_URL`，WorkBuddy/DSH 用 Chat。

### Q3（已定）WorkBuddy 账号模型

**内嵌官方登录页 + 同 realm 多账号**。不读取/解密桌面 App 凭据。
详细流程、账号库、调度与安全见 **§2.1**。

仍待确认的细节：

- 调度：v1 用 `round-robin + 失败切换` 是否够？还是需要按额度/模型可用性加权？
- 账号 UI：WorkBuddy / WBI tab 顶部账号条 + “添加账号”弹窗，是否合适？
- 是否要展示每个账号的剩余积分/套餐/到期时间（需要多打一个 billing 接口）？
- 是否保留“从桌面 App 导入账号”作为高级选项（默认关闭）？

### Q4 导入时的密钥注入

- Codex：已验证可用 `experimental_bearer_token`，直接写 config（推荐）。
- DSH：`cordis.patch.yml` 只放 `apiKeyEnv`，密钥应写入 DSH credentials 引用（需要确认 schema），
  还是让用户手动设环境变量？
- Claude Code / WorkBuddy：直接写 settings / models.json（推荐）。

### Q5（已定）模型命名

- 显示名：`OC. <name>` / `WB. <name>` / `WBI. <name>`。
- id：`oc/<id>`、`wb/<id>`、`wbi/<id>`。

### Q6（已定）界面信息架构

- **三个来源各一 tab**：`OpenCode` / `WorkBuddy` / `WorkBuddy AI`；
  附件截图对应默认选中的 **OpenCode tab**。
- **全局导入抽屉**：标题栏/状态栏常驻“导入”按钮，抽屉里选客户端、分组、模型，先预览 diff 再写入。
- 账号条放在 WorkBuddy / WBI tab 顶部；统计数字为当前 tab，服务状态条为全局。
- 设置用模态/抽屉，不单独占一个 tab。

### Q7 Headroom 压缩

v1 不做压缩，只保证**不重写历史消息**（前缀稳定、天然缓存友好）。
Headroom 式“守住前缀 + 只压最新增量”作为 P8 可选开关，默认关。

### Q8（已定）平台与打包

macOS 优先，Windows 在正式发版前补齐；托盘常驻、关窗不退出、退出清理。
开机自启默认关，用户可在设置里开。

---

## §8 分阶段计划

### P0 目标对齐（当前）

- [x] 读三份参考实现，确认可复用边界与许可证（均 MIT）
- [x] 核对本机 Codex / Claude Code / DSH 配置，确认三种方言需求
- [x] 建 pnpm workspace 骨架与包边界
- [x] 写 handsoff.md v0
- [x] 用户回答 Q1/Q2（原生 TS、三方言）
- [x] 用户回答 Q3（内嵌登录 + 多账号；round-robin；额度；不做桌面导入/保活）
- [x] 用户回答 Q4（`OC. WB. WBI.` / `oc/ wb/ wbi/`）
- [x] 用户回答 Q6（三个来源 tab + 全局导入抽屉）、Q8（macOS 优先）
- [x] 写 `prd.md` v0.1
- [x] 写 `tech.md` v0.1
- [x] `prototype/` 可点击界面原型（三 tab、账号条、导入抽屉、登录弹窗）
- [ ] 用户评审 PRD / tech
- [ ] 界面原型评审与修改

**验收**：PRD / tech 的范围与非目标被用户确认；技术方案能覆盖三种方言、多账号与四个导入目标。

### P1 可运行骨架（当前）

- [x] `apps/desktop`：electron-vite 6 + Electron 44.9 + React 19.3.1 + TS 7.0.2 + Vite 8.3.4
- [x] Tailwind 4.3.3 + shadcn/ui 4.22 + antd 6.6.6（token 桥接、scoped preflight、antd Table）
- [x] renderer 用 mock 数据复刻 `prototype/`（三 tab / 账号条 / 导入 Sheet / 登录 Dialog / 设置 / 更新条）
- [x] `@ai-bobby/core`：领域类型 / 注册表 / 错误 / 日志脱敏
- [x] `@ai-bobby/gateway`：`/health` + `/v1/models` + Chat + Responses + Messages + count_tokens + 鉴权围栏
- [x] `apps/cli`：`serve` 能起 46890，`/health`/`/v1/models` 可访问
- [x] 单实例锁、托盘、关窗隐藏、更新检查调度
- [x] 版本探测 + 更新器（manifest / semver / SHA256 / 可选 Ed25519 / 下载 / 签名校验 / 替换脚本）
- [x] 发布脚手架：`version.mjs`、`manifest.mjs`、`validate.mjs`、`build-mac.sh`、`install.sh`、`release.yml`
- [x] macOS arm64/x64 打包、ad-hoc 签名、zip、本地 install.sh 全链路烟测

**验收**：`pnpm typecheck && pnpm test` 通过；`pnpm dev:desktop` 打开新栈 UI；
`pnpm --filter @ai-bobby/cli serve` 起服务；无 key 401，有 key 200；测试不联网。

### P2 WorkBuddy provider（国内 + 国际）

- [x] variant 描述、双 realm 的 `auth/state` → 内嵌登录 → `auth/token` 轮询 → profile
- [x] 登录窗口隔离（每账号独立 session partition）、超时/取消/错误分类、系统浏览器失败回退
- [x] 多账号库（按 realm、启用/禁用/额度快照）；桌面端 safeStorage 加密，CLI 0600 明文
- [x] token 刷新（单账号单飞、过期前刷新、失败换账号）
- [x] `/v3/config` 目录拉取、模型元数据（上下文、图片、推理档位、计费）+ 内置兜底
- [x] `/v2/chat/completions` 请求体 quirk、SSE 解析、错误分类
- [x] 多账号调度：round-robin + 401 刷新 / 429·402 冷却切换；流式开始后不换
- [x] 额度接口与账号 UI 数据（真实账号联调待做）
- [x] 未登录 / 令牌过期 / 额度不足 / 地区不匹配的可读状态
- [x] 单元测试：登录 state/poll fixture、SSE、账号选择、429 切换

**验收**：两个 realm 各自能通过内嵌登录添加至少两个账号；能列出模型并完成流式对话；
一个账号 429 时自动切到另一个；不读取 WorkBuddy 桌面凭据文件。

### P3 OpenCode provider

- [ ] 移植 runtime.js：发现/下载/校验/隔离启动
- [ ] 免费模型筛选（价格字段）+ 目录
- [ ] 检测队列、并发、判定缓存、降级“仅对话”
- [ ] 会话/事件流/审批围栏/翻译兜底
- [ ] 退出清理

**验收**：无 OpenCode 安装的机器能自动准备运行时；检测结果跨重启复用；不可用模型不进网关清单。

### P4 Gateway 三种方言

- [x] Chat Completions：路由、流式/非流式、usage、错误归一化
- [x] Responses：请求翻译、事件翻译、工具调用、`[DONE]` 语义
- [x] Anthropic Messages：system/tools/images/tool_result、事件序列、`count_tokens`
- [x] 并发上限、请求体上限、客户端断开取消
- [x] 协议 fixture 测试（不联网）
- [ ] Codex / Claude Code 真实客户端联调

**验收**：Codex（responses）、Claude Code（messages）、WorkBuddy/DSH（chat）各完成一次真实对话与一次工具调用。

### P5 四个 importer

- [x] WorkBuddy `models.json`：合并/归属标记/备份/原子写/自环排除
- [x] Codex `config.toml`：标记块、token、dry-run diff
- [x] Claude Code `settings.json`：env、默认模型、dry-run diff
- [x] DSH `cordis.patch.yml`：profile 探测、provider 合并、dry-run diff（凭据引用待补）
- [x] 统一 `changed/path/warnings/dryRun` 结果；回滚
- [x] 桌面导入 Sheet 已接真实 importer IPC
- [ ] 真实客户端配置写入联调

**验收**：四个客户端各自导入后能选到分组模型并完成一次对话；重复导入 `changed:false`；手动条目不被覆盖。

### P6 控制面板

- [x] 静态可点击原型 `prototype/`（三 tab、账号条、导入抽屉、登录弹窗、深浅色）
- [x] 用户评审原型并确认信息架构（三 tab + 全局导入抽屉 + 账号条）
- [x] 基于原型实现 React renderer（React 19 + shadcn/Tailwind + antd Table），主题色 #1e4fff
- [x] **三个来源 tab**：`OpenCode` / `WorkBuddy` / `WorkBuddy AI`；截图 = 默认选中的 OpenCode tab
- [x] 每个 tab 内：统计、antd 模型表格（排序/选择/展开）、刷新/检测动作（当前 mock 数据）
- [x] WorkBuddy / WBI tab：账号条 + “添加账号”登录 Dialog（当前 mock 登录）
- [x] **全局导入 Sheet**：五个客户端目标、分组、默认模型、dry-run diff
- [x] 更新条（非模态）+ 设置 Dialog：版本、自动检查、手动检查、更新源、安装并重启
- [x] 服务状态条：46890 / Key 掩码 / 版本 / 服务状态
- [x] 主题（系统/浅色/深色，Ant Design algorithm 驱动）
- [x] 用真实 gateway 状态替换 mock（浏览器预览仍用 demo）
- [x] WorkBuddy 内嵌登录窗口 + 状态轮询
- [x] 导入 Sheet 接真实 importer IPC
- [ ] 托盘菜单完善、真实账号联调、OpenCode provider 接入

**验收**：用户按截图风格验收；浅色/深色都可读；无横向滚动；键盘可达。

### P7 打包、签名、分发与更新

- [x] Electron 44.9 + electron-builder 26.15，macOS `.app` + `.zip`（arm64/x64 均验证）
- [x] ad-hoc 签名 + `codesign --verify --deep --strict`
- [x] `AI-Bobby-<version>-<arch>.zip` + `.sha256` + `checksums.txt` + `VERSION.txt`
- [x] `releases/latest/install.sh`：架构检测、下载、SHA256、`ditto`、`~/Applications`、清 quarantine；
  已用真实 `curl` 从 Pages + GitHub Release 全链路安装成功（arm64）
- [x] gh-pages + GitHub Release 工作流（`.github/workflows/release.yml`，已推送；Pages 已开启；v0.1.0 已发布）
- [x] `latest.json`（platforms / url / sha256 / size；可选 Ed25519 代码就绪）
- [x] 应用内更新：检查、更新条、下载进度、SHA256、解压、重签、替换、重启/回滚脚本
- [ ] 首次启动向导、权限/防火墙提示
- [ ] Windows NSIS 打包与更新
- [ ] 升级与数据迁移

### P8 硬化与可选能力

- [ ] Headroom 式前缀缓存友好策略（默认不重写历史）
- [ ] 可选压缩开关与 A/B 统计
- [ ] 多账号池（若 Q3 要求）
- [ ] 真实上游 smoke test（手动、非 CI）
- [ ] 安全审计：token 不落日志、端口围栏、路径穿越、配置文件权限

---

## §9 进度日志

### 2026-10-18

- 阅读 `refs/RuiC-oc-ferry`：确认架构（Electron + 后台服务 + 隔离 OpenCode + 41980 转发口）、85 项测试、UI 结构。
- 阅读 `refs/dsh-workbuddy-connect`：确认 WorkBuddy 双 variant、桌面凭据解密、`/v3/config`、`/v2/chat/completions`、shim。
- 阅读 `refs/iskill-headroom-workbuddy2api`：确认 hub 提供 chat/responses/messages 三面，headroom 的缓存结论。
- 核对本机配置：Codex 用 responses + `experimental_bearer_token`；Claude Code 用 Anthropic env；DSH 用 `llm-pi-ai` provider + `apiKeyEnv`。
- 建立 pnpm workspace 骨架（7 个包/应用，仅边界与 README），`pnpm install` 通过。
- 写下 handsoff.md v0。
- 第一轮对齐结果：
  - Q1 已定：原生 TypeScript。
  - Q2 已定：Chat + Responses + Messages 三面全做。
  - Q6 结构已定：三个来源 tab；截图 = 默认 OpenCode tab；导入用**全局抽屉**。
  - 显示名已定：`OC.` / `WB.` / `WBI.`；id 前缀 `oc/`、`wb/`、`wbi/` 已选定。
  - 平台：macOS 优先，发版前补 Windows。
- 第二轮对齐结果（账号路线）：
  - Q3 已定：**内嵌官方登录页 + 同 realm 多账号**，不读取桌面凭据。
  - 已探测登录入口：`/v2/plugin/auth/state?platform=CLI` → `/login?state=...`，
    登录页无 `X-Frame-Options`/CSP（初步可嵌入），国内版含微信/QQ，国际版含 Google/微信；
    轮询 `/v2/plugin/auth/token?state=...`（`11217` 等待，`0` 成功）。
  - 多账号调度提案：round-robin + 401 刷新 / 429·402 冷却切换；流式开始后不换。
  - token 落盘：桌面端 safeStorage；CLI 0600。
- 第三轮对齐结果（细节）：
  - 调度：round-robin + 失败切换；支持手动钉住单账号。
  - 额度：每账号展示剩余积分/套餐/到期；失败不阻塞模型列表。
  - 不做“从桌面 App 导入账号”；不做每日保活/签到。
  - 平台：macOS 优先，发版前补 Windows。
- 产出 `prd.md` v0.1（产品范围、功能 FR、UI 线框、验收、风险）与
  `tech.md` v0.1（进程模型、领域模型、登录/多账号、三协议 codec、导入器、桌面、测试、打包）。
- 产出 `prototype/` 静态可点击原型：三来源 tab、账号条、全局导入抽屉、添加账号弹窗、
  深浅色、行内详情、dry-run diff；截图在 `prototype/screenshot-*.png`。
- **下一步**：实现 46890 网关与 provider（P1 剩余 + P2–P5）。
- **未修改任何客户端配置**。

### 2026-10-18（第二轮）

- 用户评审通过，并新增硬性要求：前端栈、`refs/` 不提交、版本探测/自动更新、自签名 + curl 安装、
  推到 `xsin/ai-bobby`、发布参考 o-muse。
- 确认最新版本（2026-10-18）：React 19.3.1、TS 7.0.2、Vite 8.3.4、Electron 44.9.0、
  electron-builder 26.15.3、Tailwind 4.3.3、shadcn CLI 4.22.0、antd 6.6.6、Vitest 5.0.5。
- 阅读 `ui-guideline.md`：确定 shadcn/Tailwind 视觉层 + antd 6 数据表格层，
  antd token 为单一真相源，Tailwind/shadcn 变量桥接；`.tw-root` + `.ant-app`；scoped preflight。
- 阅读 o-muse：`install.sh`、`release.yml`、`latest.json`、`prd-auto-update.md`、`tdd-auto-update.md`、
  `tech-release-without-developer-id.md`；确定自研 Electron 更新器 + ad-hoc 签名 + 双通道发布。
- 开始 P1：更新依赖、搭 `apps/desktop`（electron-vite + React + shadcn + Tailwind + antd）、
  更新器 core、发布脚手架。


### 2026-10-18（第三轮：发布链路）

- 主题色改为 `#1e4fff`；UI 栈按 `ui-guideline.md` 落地：
  React 19.3.1 / TS 7.0.2 / Vite 8.3.4 / Electron 44.9.0 / Tailwind 4.3.3 / shadcn 4.22 / antd 6.6.6。
- `apps/desktop` 可构建、可打 `.app`；arm64/x64 均 ad-hoc 签名并通过 `codesign --verify --deep --strict`。
- 更新器：manifest/semver/SHA256/可选 Ed25519、下载、解压、重签、替换脚本、IPC、更新条；
  12 项 core 单测通过；本地 manifest 烟测能弹出更新条。
- 分发：`install.sh` 本地 HTTP 源全链路跑通；GitHub 仓库创建并推送；Pages 开启；
  `v0.1.0` release 发布；真实 `curl` 安装成功（arm64）。
- **踩坑**：Electron zip 123–135MB，超过 GitHub Git 文件 100MB 限制，不能放 gh-pages；
  改为 GitHub Release 托管二进制、gh-pages 只放 install.sh/VERSION/checksums/latest.json。
  `install.sh` 默认 base 改为 GitHub Releases，`latest.json` URL 指向 Release 资产。
- **下一步**：P1 剩余（core/gateway/cli）+ P2 WorkBuddy provider。


### 2026-10-18（Round 1：网关 / Provider / Importer）

- 新建 `@ai-bobby/core`、`@ai-bobby/gateway`、`@ai-bobby/workbuddy`、`@ai-bobby/importers`。
- 网关三种协议 + count_tokens + 鉴权/Origin/Host/并发/SSE；fixture 测试 9 项。
- WorkBuddy：官方登录 state/poll（真机打开 codebuddy.cn/login）、AccountStore、目录解析/兜底、
  chat SSE → CanonicalEvent、刷新、billing、round-robin/冷却；测试 12 项。
- Importers：WorkBuddy/Codex/Claude/DSH；dry-run/备份/原子写/回滚；测试 4 项。
- 桌面主进程启动 46890 网关；renderer 从 IPC 读真实模型/账号；WorkBuddy 登录窗口与导入 IPC 已接通。
- 全量 `pnpm -r typecheck`、`pnpm -r test`、`pnpm --filter @ai-bobby/desktop build` 通过。
- 真机验证：Electron 启动后 `/health` 与 `/v1/models` 正常；登录窗口加载官方页面；
  未登录时 UI 显示空状态；API Key 从本机数据目录读取并掩码显示。
- 打包版（arm64）启动后 `/health` 返回 0.1.0 / 46890，UI 能从 IPC 读到真实空状态；ad-hoc 签名验证通过。
- 账号库已接 Electron safeStorage（桌面端）；CLI 仍为 0600 明文。
- 待办：OpenCode provider；真实账号/客户端联调；新版本发布。

---

## §10 风险与约束

1. **登录页可能拦截内嵌 webview**：微信/QQ/Google 的登录有时要求顶层窗口或校验 UA。
   登录页本身目前没有 `X-Frame-Options`/CSP，但实际流程要在 P2 用真机验证；失败回退系统浏览器 + 继续轮询。
2. **上游非公开协议**：`/v3/config`、`/v2/chat/completions`、登录/额度接口随时可能变；
   模型目录与账号状态要缓存 + 兜底快照。
3. **账号风险**：多账号、自动化请求可能触发上游风控；PRD 要写明“自担风险”，不做绕过；
   登录失败、429、402 要有明确分类与冷却。
4. **免费模型 churn**：OpenCode 免费池随时上下线；检测缓存要有 TTL，失败要降级而不是阻塞。
5. **配置写入风险**：Codex/Claude/DSH 的配置文件是用户资产；必须备份、dry-run、只动自己标记的条目。
6. **DSH profile 由 App 管理**：不同发行版规则不同；写入前探测 profile，失败时给出手动指引，不硬改。
7. **端口冲突**：46890 被占用时给出明确错误与改端口入口；不要静默换端口（客户端配置会失效）。
8. **token 落盘**：多账号 token 比单账号更敏感；桌面端必须 safeStorage 加密，CLI 模式 0600 + 明确警告；
   日志、状态、错误信息一律脱敏。
9. **许可证**：参考实现均 MIT；复制代码需保留版权与许可声明，并在 README/THIRD_PARTY_NOTICES 说明。

---

## §11 工程约定

- TypeScript strict + ESM + NodeNext；Node ≥ 22.19；pnpm workspace。
- 中文 UI 文案；代码标识符英文；错误信息给“发生了什么 + 怎么办”。
- 任何写用户文件的动作：备份 → 锁 → 原子替换 → 校验 → 返回 diff；失败不改原文件。
- 日志与 `status.json` 不出现 access token、refresh token、API Key 明文；只给指纹/尾号。
- 测试默认不联网；上游用 fixture / 本地假服务器。
- 不修改 `refs/`；需要复用的代码复制到 `packages/` 并注明来源。
- 提交前：`pnpm typecheck && pnpm test`；UI 改动附浅色/深色截图。

---

## §12 新会话恢复清单

1. 读本文档 §0、§7、§9。
2. `git status` / `git log -5`（若已初始化）确认工作区状态。
3. `pnpm install`（首次或依赖变更后）。
4. 看 §7 的开放问题是否已答；未答就先问用户，不要擅自开工。
5. 若已进入实现：先跑 `pnpm typecheck && pnpm test`，再按 §8 当前阶段的未勾选项继续。
6. 每完成一项：更新 §8 勾选 + §9 日志；重要决策写进 §6。

---

## §13 关键路径速查

```text
参考源码
  refs/RuiC-oc-ferry/src/
  refs/RuiC-oc-ferry/desktop/
  refs/RuiC-oc-ferry/docs/设计说明.md
  refs/dsh-workbuddy-connect/src/{auth,upstream,variants,shim,catalog}.ts
  refs/dsh-workbuddy-connect/src/desktop-credential-protection.ts
  ~/.iskill-headroom-workbuddy2api/workbuddy2api-hub/wb_proxy.py
  ~/.iskill-headroom-workbuddy2api/workbuddy2api-hub/README.md

本机客户端配置
  ~/.codex/config.toml
  ~/.claude/settings.json
  ~/.dsh/profiles/<profile>/cordis.patch.yml
  ~/.workbuddy/models.json

WorkBuddy 上游
  CN:     https://copilot.tencent.com   /v3/config, /v2/chat/completions
  Global: https://www.workbuddy.ai      /v3/config, /v2/chat/completions
  刷新:   /v2/plugin/auth/token/refresh
```
