# AI Bobby 产品需求文档（PRD）

- 当前版本：v0.2.2（界面改版开发中；当前发布 v0.2.1，本地验收通过后再发版）
- 日期：2026-10-18
- 状态：产品设计保持完整目标态；当前实现与验收状态见 [handsoff.md](../handsoff.md)
- 关联：[handsoff.md](../handsoff.md)（实施计划 / 决策 / 进度）、[tech.md](./tech.md)（技术方案）
- 用户侧安装/使用/接入说明：[README.md](../README.md)
- 一句话：**把 OpenCode 免费模型、WorkBuddy 国内版、WorkBuddy AI 国际版三个来源，收敛成一个本机端点、一把 Key、一个控制面板，并一键导入四个客户端。**

---

## 1. 产品定义

### 1.1 背景

本地 AI 客户端的模型来源越来越分散：

- **OpenCode** 有免费模型池，但它不是标准 OpenAI 端点，带 `free` 字样的模型也不一定真免费；
- **WorkBuddy（国内版）** 和 **WorkBuddy AI（国际版）** 各自有桌面端登录、模型目录和积分，但没有公开的 OpenAI 端点；
- **Codex** 要 Responses API，**Claude Code** 要 Anthropic Messages API，**WorkBuddy / DSH** 用 Chat Completions；
- 用户现在往往给每个客户端各配一个 8787/8788 代理，账号、模型、Key 各管一套，容易冲突。

### 1.2 产品定位

AI Bobby 是一个**只监听本机的 AI 服务网关桌面应用**：

- 上游：OpenCode 免费模型 + WorkBuddy 双版本账号（可多账号）；
- 下游：一个 `127.0.0.1:46890` 端点，同时说 Chat Completions / Responses / Anthropic Messages 三种方言；
- 管理：左侧栏多页导航（三个来源、历史记录、关于、设置）、模型清单、检测、账号、额度、一键导入四个客户端；
- 边界：所有数据留在本机，不云托管、不多用户、不转售。

### 1.3 目标用户

1. **本地 AI 工具玩家**：同时用 Codex、Claude Code、DSH，希望只维护一个端点和一把 Key。
2. **WorkBuddy 用户**：想把 WorkBuddy 的模型接给别的客户端，或把 OpenCode 免费模型接进 WorkBuddy。
3. **多账号用户**：有多个 WorkBuddy 账号，希望按额度/可用性自动切换，而不是手动改配置。
4. **不想折腾配置的开发者**：希望点几下就完成四个客户端的接入。

### 1.4 价值主张

- **一个端点**：46890 同时服务 OpenAI / Codex / Claude Code / DSH / WorkBuddy。
- **一份清单**：三个来源统一命名、统一状态、统一检测。
- **一个凭据持有者**：WorkBuddy 账号只在 AI Bobby 里登录和刷新，客户端不再各自直连上游。
- **一键接入**：WorkBuddy / Codex / Claude Code / DSH 四个客户端，预览后写入、可回滚。
- **本机优先**：127.0.0.1、API Key、Origin 围栏、token 加密落盘。

### 1.5 与参考产品的关系

- 继承 **OC Ferry** 的产品骨架：Electron 托盘应用、隔离 OpenCode、并发检测、判定缓存、`models.json` 导入、本机转发口。
- 参考 **dsh-workbuddy-connect** 的 WorkBuddy 上游协议（目录 / 聊天 / 刷新 / 错误分类），但**不采用它的桌面凭据复用**。
- 参考 **workbuddy2api-hub + Headroom** 的代理能力与协议面；v1 用原生 TypeScript 实现，不打包 Python，不做 Headroom 压缩。

---

## 2. 目标与边界

### 2.1 产品目标（v1）

1. 启动后可用：用户打开应用，能看到三个来源；OpenCode 自动读取/检测，WorkBuddy 引导登录。
2. 三个来源都能列出可用模型，并合并进 `/v1/models`。
3. 46890 同时通过 Chat Completions、Responses、Anthropic Messages 三种协议完成流式对话与工具调用。
4. WorkBuddy 双版本支持**内嵌官方登录页**添加账号，同一版本可存多个账号。
5. 多账号按 `round-robin + 失败切换` 调度；每个账号展示剩余额度。
6. 一键导入 WorkBuddy（国内/国际两个 models.json）、Codex、Claude Code、DSH；写入前可预览 diff，写入可回滚。
7. API Key 可查看/复制/轮换；轮换后能更新已导入客户端。
8. **版本探测与自动更新**：启动后台检查、设置页手动检查、非模态更新条、下载/校验/替换/重启。
9. **curl 一键安装**：ad-hoc 自签名、zip 分发、SHA256 校验，`curl -fsSL .../install.sh | bash` 可用。
10. macOS 可用；Windows 在正式发版前补齐。

### 2.2 非目标（v1 不做）

- 不做云托管、多用户、公网暴露、计费/转售。
- 不读取或解密 WorkBuddy 桌面 App 的凭据文件；不做“从桌面导入账号”。
- 不做每日自动保活/签到；只做 token 到期前刷新。
- 不做 Headroom 式上下文压缩；只保证不重写历史消息、前缀稳定。
- 不做多账号加权调度、额度预测、模型级配额分配。
- 不修改 WorkBuddy / Codex / Claude Code / DSH 的安装包或校验逻辑。
- 不承诺绕过上游地区、账号或额度限制。
- v1 不做 Apple 公证、不上 App Store；使用 ad-hoc 自签名 + Gatekeeper 手动放行/安装脚本清隔离。
- 不做增量/差量更新；更新包为完整 `.app` zip。
- 不做灰度发布、A/B 渠道、强制升级、自动回滚到旧版。

### 2.3 成功指标

| 指标 | 目标 |
|---|---|
| 首次启动到看到 OpenCode 模型清单 | ≤ 60 秒（检测可后台继续） |
| 登录完成到 WorkBuddy 模型可对话 | ≤ 30 秒 |
| 四个客户端全部导入 | ≤ 2 分钟 |
| 网关自身附加延迟（p95，不含上游） | ≤ 50ms |
| 首字延迟附加（p95） | ≤ 100ms |
| 日志/状态中明文 token / API Key | 0 |
| 四个客户端各完成一次对话 + 一次工具调用 | 100% 通过 |
| 崩溃率（crash-free sessions） | ≥ 99% |

---

## 3. 术语与命名

| 术语 | 含义 |
|---|---|
| 来源 / 分组 | `OpenCode`、`WorkBuddy`、`WorkBuddy AI` 三组 |
| 模型 | 某个来源下的一个可调用模型 |
| 账号 | 某个 WorkBuddy 版本下的一次登录会话 |
| 客户端 | WorkBuddy、Codex、Claude Code、DeepSeek Harness |
| 网关 | 监听 46890 的本机 HTTP 服务 |
| API Key | 网关鉴权用的本机随机密钥 |

### 3.1 模型 ID

| 来源 | ID 前缀 | 示例 | 显示名 |
|---|---|---|---|
| OpenCode | `oc/` | `oc/big-pickle` | `OC. Big Pickle` |
| WorkBuddy 国内版 | `wb/` | `wb/hy3` | `WB. Hy3` |
| WorkBuddy AI 国际版 | `wbi/` | `wbi/hy3` | `WBI. Hy3` |

规则：

- ID 全局唯一；上游同名模型靠前缀区分。
- 显示名 = 前缀 + 上游展示名；WorkBuddy 的计费倍率/促销标签附在显示名后面（如 `WB. GLM-5.3 · x0.79`）。
- 客户端可以只用 ID；UI 只展示显示名。
- WorkBuddy `models.json` 导入时：`id` 用网关 ID，`name` 用显示名；若上游客户端不接受 `/`，导入器退回 `ai-bobby-<group>-<slug>` 并在网关保留别名。

### 3.2 状态

| 对象 | 状态 |
|---|---|
| 模型 | `available` / `chat_only` / `pending` / `unavailable` / `rate_limited` / `no_account` |
| 账号 | `active` / `expired` / `invalid` / `cooling` / `disabled` |
| 网关 | `starting` / `ready` / `degraded` / `stopped` |
| 导入 | `not_detected` / `ready` / `changed` / `unchanged` / `error` |

---

## 4. 用户旅程

### 4.1 首次启动

1. 用户打开 AI Bobby；托盘常驻，主窗口显示。
2. 网关在 46890 启动；生成/读取 API Key；状态条显示“运行中”。
3. OpenCode 页默认选中；应用自动准备隔离运行时、读取免费模型、开始并发检测。
4. WorkBuddy / WBI 页显示“未登录”；点击“添加账号”进入登录。
5. 首次使用引导提示：三个来源分别是什么、如何导入客户端、Key 在哪里。

### 4.2 添加 WorkBuddy 账号

1. 在 WorkBuddy 或 WBI 页点“添加账号”。
2. 应用调用官方 `auth/state`，拿到 `authUrl`，在**内嵌 BrowserWindow** 打开官方登录页。
   弹窗内不画占位二维码，只说明流程；二维码由官方页面实时生成，深色主题下不反色。
3. 用户用微信/QQ（国内版）或 Google/微信（国际版）登录。
4. 应用轮询 `auth/token`；成功后取昵称、额度、模型目录。
5. 账号出现在来源页顶部账号条；模型清单刷新。
6. 若内嵌窗口被拦截，自动回退系统浏览器打开同一 URL，继续轮询。

### 4.3 管理多账号

- 账号条展示：昵称、启用开关、剩余积分/套餐、到期时间、最近使用。
- 支持添加、删除、启用/禁用、设为优先。
- 默认 `round-robin + 失败切换`；401 刷新后换账号，429/402 冷却后换账号。
- 流式响应开始后不中途换账号；失败只影响当前请求。

### 4.4 读取 / 检测 OpenCode

1. 点“读取模型”或自动读取。
2. 按价格字段筛免费模型；显示“已发现 / 可用 / 待检测”。
3. 点“检测全部”并发检测；行内显示耗时与状态；可展开详情“只重测这一个”。
4. 判定缓存跨重启复用；不可用模型不进入网关清单。

### 4.5 一键导入客户端

1. 在任意来源页勾选要导入的模型；全局“导入”按钮打开抽屉。
2. 抽屉列出四个客户端、探测到的路径、当前状态。
3. 选择分组/模型/默认模型；点“预览变更”看 diff。
4. 点“写入”；写前备份，写后返回结果；失败可回滚。
5. 提示重启对应客户端（Codex/Claude/DSH 需要重启或重开会话）。
6. 实际变更可在“历史记录”查看 diff、备份与恢复入口。

### 4.6 日常使用

- 客户端请求 `127.0.0.1:46890`，带 API Key。
- 网关按模型前缀路由；WorkBuddy 自动选账号；OpenCode 走隔离会话。
- 托盘显示运行状态；关窗不退出；从托盘退出时停止服务。
- 退出时**不自动删除**已导入的客户端配置；用户可在导入抽屉里“回滚”。

### 4.7 故障恢复

- 端口被占用：显示明确错误，提供“改端口”入口；不静默换端口。
- 账号过期：账号条标红，提供“重新登录”；请求返回 401 并说明。
- 上游 429/402：标记冷却，换账号；全部不可用时返回 429/402 并说明。
- 网关崩溃：主进程检测到子进程退出，自动重启一次；UI 显示“重试”。
- 配置文件被外部修改：导入时检测冲突，放弃写入并提示“重试预览”。

---

## 5. 功能需求

### 5.1 网关服务（FR-GW）

**FR-GW-1 监听与鉴权**

- 只监听 `127.0.0.1:46890`（默认；端口可配置，但改动后需重新导入客户端）。
- 所有 `/v1/*` 要求 `Authorization: Bearer <API Key>`；Anthropic 路径同时接受 `x-api-key`。
- `GET /health` 不要求 Key，但只返回最小状态（`status` / `version` / `port`），不返回模型、账号、路径。
- 带 `Origin` 头的浏览器请求一律 403；`Host` 必须是 loopback。
- 启动期未就绪返回 503；退出时停止接受新请求。

**FR-GW-2 模型清单**

- `GET /v1/models` 返回 OpenAI list 形状，`data[]` 至少包含：
  `id`, `object`, `created`, `owned_by`, `name`, `group`, `group_name`, `capabilities`, `context_window`, `max_output_tokens`, `status`, `accounts`。
- 默认只返回 `available` / `chat_only` 的模型；`?all=1` 返回含不可用/待检测的诊断清单（仅本机 UI 使用）。
- 同一模型在多个账号可用时，`accounts` 返回可用账号数；模型目录取并集。

**FR-GW-3 Chat Completions**

- `POST /v1/chat/completions`，支持 `stream: true/false`。
- 支持 `messages`（system/developer/user/assistant/tool）、文本/图片 data URL、`tools` / `tool_choice`、`parallel_tool_calls`、`reasoning_effort`、`max_tokens`、`temperature`、`top_p`、`stop`、`n=1`。
- 流式返回标准 `chat.completion.chunk` + `[DONE]`；非流式返回 `chat.completion`。
- `model` 字段回写请求的网关 ID。

**FR-GW-4 Responses API**

- `POST /v1/responses`，支持 `input`、`instructions`、`tools`、`tool_choice`、`stream`、`max_output_tokens`、`reasoning`。
- 流式返回 Responses 事件序列（`response.created`、`response.output_item.added`、`response.output_text.delta`、`response.function_call_arguments.delta`、`response.completed` 等）。
- 非流式返回 `response` 对象。
- 可选 `GET /v1/responses/:id`；v1 若未存储，返回 404 + 明确错误。

**FR-GW-5 Anthropic Messages**

- `POST /v1/messages`，支持 `system`（字符串/块数组）、`messages`（text/image/tool_use/tool_result）、`tools`、`tool_choice`、`max_tokens`、`temperature`、`top_p`、`stop_sequences`、`thinking`、`stream`。
- 流式返回原生 Anthropic 事件序列：`message_start` → `content_block_start` / `content_block_delta` → `content_block_stop` → `message_delta` → `message_stop`。
- 非流式返回 Anthropic `message` 对象。
- 鉴权接受 `x-api-key` 或 Bearer；错误使用 Anthropic 错误信封。

**FR-GW-6 count_tokens**

- `POST /v1/messages/count_tokens` 返回 CJK 感知的**估算值**，并注明不是官方分词器精确值。

**FR-GW-7 错误与限流**

- 统一错误形状，保留上游可读信息与错误类：`auth` / `credit` / `rate_limit` / `not_found` / `upstream` / `invalid_request`。
- 请求体上限 64 MB；总并发默认 8，单来源默认 4；超出返回 429。
- 客户端断开时取消上游请求。

**FR-GW-8 健康检查**

- `GET /health` 不需要 Key，只返回 `status` / `version` / `port`。
- 详细状态（三个来源、账号摘要、检测进度）只通过主进程 IPC 提供给面板，不放在公开 HTTP 面。
- 不返回 token、Key、内部路径细节。

### 5.2 OpenCode 来源（FR-OC）

- **FR-OC-1 运行时**：自动发现/下载/校验隔离 OpenCode；失败给出可操作错误。
- **FR-OC-2 免费筛选**：`cost.input/output/cache.read/cache.write` 全为 0，且非 deprecated；不按名字。
- **FR-OC-3 检测**：并发检测（默认 3，可调 1–6）；5 个工具 + 随机 token 文件；只回文本判为“仅对话”。
- **FR-OC-4 缓存**：成功判定 6 小时；负载/限流 10 分钟；跨重启复用；能力指纹变化失效。
- **FR-OC-5 降级**：`chat_only` 模型仍可导入，但 `supportsToolCall=false`；请求带工具时返回明确 400。
- **FR-OC-6 隔离**：独立配置/数据/缓存目录；不污染用户自己的 OpenCode。
- **FR-OC-7 清理**：退出时停子进程；异常残留下次启动清理。

> 当前实现：FR-OC-1/2/6 已实现；FR-OC-3/4 检测与缓存、图片尚未实现；
> 聊天走官方 `opencode run --format json`，不是常驻会话。

### 5.3 WorkBuddy 来源（FR-WB）

**FR-WB-1 双版本**

- `WorkBuddy`（国内版）：`https://copilot.tencent.com`，登录页/Origin `https://www.codebuddy.cn`。
- `WorkBuddy AI`（国际版）：`https://www.workbuddy.ai`。
- 两版账号、模型、额度、模型目录独立；互不混用。

**FR-WB-2 内嵌登录**

- 调用 `POST /v2/plugin/auth/state?platform=CLI` 获取 `state` + `authUrl`。
- 在独立 session partition 的 BrowserWindow 打开 `authUrl`；轮询 `GET /v2/plugin/auth/token?state=...`。
- `11217` 等待；`0` 成功；10 分钟超时；支持取消。
- 成功后 `GET /v2/plugin/login/account?state=...` 取昵称；账号入库。
- 内嵌失败回退系统浏览器；不得把 URL/state/token 写入日志。

**FR-WB-3 多账号**

- 同一版本可存多个账号；账号以 `realm + uid` 唯一。
- 每账号记录昵称、domain、token、refresh token、expiresAt、enabled、lastUsedAt、额度快照、目录快照。
- 支持添加、删除、启用/禁用、设为优先；同一时刻至少一个启用账号。
- 删除账号删除其 token；不影响其他账号。

**FR-WB-4 调度**

- 在“有该模型且启用、不在冷却、且非已知额度耗尽”的账号间调度。
- `preferred` 账号优先；其余 round-robin。
- `401`：先刷新该账号 token；失败则标记 invalid 并换账号。
- `429`：标记冷却（读取 `Retry-After` 或默认 60s），换账号。
- `402` / 额度不足：标记冷却（默认 30 分钟），换账号。
- 流式响应已开始：不换账号；错误只结束当前流。
- 已知额度耗尽账号跳过；全部额度耗尽返回 402。
- 全部不可用：返回 429/402，附“哪个账号、什么原因、多久恢复”。
- 探活为目录 + billing 刷新，不做周期聊天 probe；快照滞后时由 402/429 兜底。

**FR-WB-5 目录**

- `GET /v3/config` 拉取模型目录；解析上下文窗口、最大输出、图片、推理档位、计费倍率/促销。
- 目录按账号缓存；失败时回退上次成功快照；UI 标注“来自缓存/内置兜底”。
- 模型状态由账号可用性 + 目录共同决定；无账号时 `no_account`。

**FR-WB-6 额度**

- 按账号读 billing 接口，展示剩余积分/套餐/到期；失败显示“额度未知”，不显示 0。
- CN 企业账号读企业周期额度；`limitNum < 0` 显示“不限量”。
- 桌面每 15 分钟随目录刷新一次 billing；登录后、手动刷新、页面打开时也读取；不做高频轮询。
- 不做每日签到/保活。

**FR-WB-7 token 刷新**

- 到期前 5 分钟刷新；单账号串行锁；刷新失败保留旧 token 直到过期。
- 刷新结果只写 AI Bobby 的账号库；不写桌面 App 文件。
- 刷新 token 轮换时覆盖旧 refresh token；连续失败标记 invalid，提示重新登录。

**FR-WB-8 安全**

- token 加密落盘：桌面端 safeStorage（macOS Keychain / Windows DPAPI）；CLI `0600` + 警告。
- 不写日志、不进 `status.json`、不出现在 URL；错误信息只给尾号/指纹。
- 首次添加账号展示“非官方接口、可能违反条款、自担风险”。

### 5.4 模型清单与控制面板（FR-UI）

**FR-UI-1 主窗口**

- 品牌 AI Bobby；经典左侧栏 + 右侧内容区；顶部标题栏显示应用名与“本地网关”。
- 左侧栏默认展开（226px），可收起为 64px 图标栏；收起状态写入 `localStorage`，下次启动保持。
- 主题切换从主界面移除，只在设置页提供；主界面不出现系统/浅色/深色控件。
- 主题色：**电光克莱因蓝 `#1e4fff`**（Ant Design `colorPrimary`，Tailwind/shadcn 统一定义）。
- 窗口尺寸默认接近截图（约 1160×860），最小 900×640；支持深色/浅色。
- 右下角固定应用 LOGO 动态头像（含 ZEO 标签装饰，可拖动），点击进入关于页。

**FR-UI-2 多页导航**

- 页面：`概览` / `OpenCode` / `WorkBuddy` / `WorkBuddy AI` / `历史记录` / `关于` / `设置`。
- 模型来源放在“模型来源”分组；概览单独放在“总览”；历史记录、关于放在“其他”；设置固定在底部。
- 默认选中 OpenCode；来源项显示已选/模型总数，历史项显示记录数；底部显示网关运行状态与端口。
- 每个来源页保留自己的滚动位置、筛选、选中状态。
- 页面切换不卸载全局音乐播放器；收起侧边栏后仅保留图标，并用 `title`/`aria-label` 提供名称。

**FR-UI-3 命令区**

- 左：来源标题 + 一句说明 + `读取模型` / `检测全部`（WorkBuddy 为 `刷新目录` / `刷新额度`）。
- 右：当前来源的统计（已发现/可用/待检测/账号数/已选），`已选` 与其它指标同排、用主色显示 `已选/总数`。
- WorkBuddy / WBI：账号条（昵称、额度、启用、添加账号）。

**FR-UI-4 模型表格**

- 列：勾选、模型（展开箭头）、能力、计费、状态、耗时/来源。计费列显示“免费”、消耗倍率（如 `x0.79`）或“未知”。
- 行内详情：上游 ID、上下文、最大输出、计费、账号数、最近检测、错误原因、“只重测这一个”。
- 支持全选/反选当前来源；选中数全局共享给导入抽屉。
- 空状态、加载态、错误态、部分可用态都有明确文案。

**FR-UI-5 全局导入抽屉**

- 顶部“导入”按钮常驻；抽屉从右侧滑出。
- 列出客户端：WorkBuddy（国内）、WorkBuddy AI（国际）、Codex、Claude Code、DSH。
- 每行：探测路径、状态、可写性、默认分组。
- 分组选择：`OC` / `WB` / `WBI`；WorkBuddy 目标自动排除自身分组。
- 模型选择：打开应用时默认不勾选任何模型；启动后读取各客户端配置，按实际已写入的 AI Bobby 模型回勾（失效模型忽略）；可只导入当前选择。
- 底部：变更预览随选择实时更新（只读，不需要按钮触发），确认后点“写入”；展示 diff 与警告。
- 写入中禁用按钮；完成后显示路径与“需要重启客户端”提示，并把实际变更记入导入历史。
- DSH 目标在写入配置的同时把网关 Key 写入 `~/.dsh/.credentials.yaml` 的 `refs.AI_BOBBY_API_KEY`，
  用户不需要再为 DSH 设置环境变量。

**FR-UI-6 服务状态条**

- 常驻底部，所有页面可见。
- 左侧：运行状态点 + 当前来源状态文案 + 网关端口说明。
- 右侧：转发口 `http://127.0.0.1:46890/v1`、API Key 掩码/复制、应用版本。
- 点击 Key 可复制；Key 轮换仍是后续能力，当前 UI 不暴露。

**FR-UI-7 托盘**

- 托盘菜单：显示 AI Bobby、刷新模型、检查更新、退出。
- 关窗不退出；退出时停止网关与 OpenCode 子进程。

**FR-UI-8 设置**

- 外观：系统 / 浅色 / 深色；这是主题的唯一入口。
- 自动检查开关使用可见轨道边框和内边距，保证浅色下白色滑块可辨识；开关与文字间距为 8px。
- 本地网关：展示并复制 `http://127.0.0.1:46890/v1`。
- API Key：展示掩码并复制。
- 版本与更新：当前版本、自动检查开关（默认开）、手动检查、更新源地址（只读可审计）。
- 关于：进入关于页；更新源可在系统浏览器打开。

**FR-UI-9 导入历史**

- 页面展示导入/恢复记录；导入记录与备份合并为一张表，行内依次为客户端、时间·模型数·状态、配置文件路径、备份文件路径。
- 操作：`查看差异`（只读 diff 弹窗）、`打开目录`（Finder 定位配置）、`恢复`（弹窗确认，恢复前再备份当前文件）。
- 支持按客户端筛选和按路径/备份/客户端搜索；没有记录时给出空状态和“刷新”。
- 默认展示最近 30 天的记录；备份按目标保留最近 5 份，只存本机。

**FR-UI-10 关于**

- 展示 AI Bobby 项目介绍与当前版本。
- 展示 ZEO 个人 IP：独立开发者 / 独立音乐人 / AI 驭龙师，以及“驾驭 AI 创造美好生活”的使命。
- 音乐模块：两张最新专辑、最新/最热歌曲 tab、网易云音乐外链。
- 点击歌曲优先唤起本机网易云音乐 App 播放；App 未安装、非 macOS 或唤起失败时，回退到全局 iframe 播放器。
  客户端冷启动时先启动 App、等它就绪后再投递播放指令，避免“只有第一次点击只打开 App 不播放”。
- 专辑卡片打开网易云专辑网页；当前客户端不支持专辑深链（实测提示“操作不支持”），暂不唤起 App。
  已安装 App 时提示“当前音乐应用不支持打开专辑，已为你打开网页版”。
- 歌曲行、专辑卡、tab 等可点击元素都有 pointer 手型与明确的 hover 反馈。
- App 播放成功时关闭 iframe，避免重复播放；同一时间只保留一个播放器。
- 赞助模块：“充点词元，收获更好的产品体验”，支付宝/微信/更多方式收款码本地加载。

**FR-UI-11 浮动层**

- 应用 LOGO 头像：带动态光晕/浮动微动画和 ZEO 标签；可拖动，位置写入 `localStorage`，窗口缩放时自动夹取到可视区。
- 头像点击进入关于页；拖动结束的那次指针事件不触发跳转。
- 音乐播放器：网易云 `outchain` iframe；可拖动、可关闭，位置持久化；切页不中断播放。
- 浮动层不遮挡主操作；窄窗时播放器上移，避免和状态条/头像重叠。

**FR-UI-12 概览**

- 首屏给出四张指标卡：网关状态与端口、模型源数与可用/待检测数、账号积分合计、最近一次导入。
- 三个来源卡片：模型总数、可用数、账号数/说明；点击进入对应来源页。
- 最近 3 次导入：客户端、时间、模型数、状态；可跳转历史记录。
- 只读汇总，不放导入入口；数据来自真实网关状态与导入历史。

### 5.5 一键导入（FR-IM）

**FR-IM-1 通用机制**

- 每个 importer：探测路径 → 读取 → 合并 → 预览 diff → 备份 → 加锁 → 原子写 → 校验。
- 只增删自己标记的条目；用户手写条目不动。
- 内容未变返回 `changed:false`，不写文件、不产生备份、不记录历史。
- 写前备份，保留最近 5 份；支持回滚到最近一次。
- 文件被外部修改：放弃写入，提示重新预览。
- 所有写入默认 dry-run；用户点“写入”才落盘。
- 写入含密钥的文件后，尽量收紧权限到 `0600`（原文件更严格则保留）。
- 实际发生的写入/恢复会追加到本机导入历史。

**FR-IM-2 WorkBuddy 导入**

- 目标：`~/.workbuddy/models.json`（国内版）与 `~/.workbuddy-ai/models.json`（国际版）。
- 结构：数组；每条含 `id`、`name`、`vendor`、`url`、`apiKey`、`supportsToolCall`、`supportsImages`、`supportsReasoning`、`reasoning`、`maxInputTokens`、`maxOutputTokens`、`aiBobbyOwner`。
- URL：`http://127.0.0.1:46890/v1/chat/completions`；apiKey 为网关 Key。
- 国内版目标排除 `wb/`；国际版目标排除 `wbi/`；`oc/` 与另一版本可导入。
- 不自动删除 oc-ferry / 其他工具条目；可选“清理 oc-ferry 条目”单独操作。

**FR-IM-3 Codex 导入**

- 目标：`~/.codex/config.toml`。
- 写入 `[model_providers.ai-bobby]`：`name`、`base_url`、`wire_api = "responses"`、`experimental_bearer_token`。
- 可选：把 `model` 设为用户选定的默认模型；不改用户的 `model_provider` 之外的设置，除非用户勾选“设为默认”。
- 保留其他 provider 与注释；冲突时给 diff。

**FR-IM-4 Claude Code 导入**

- 目标：`~/.claude/settings.json`。
- 写入 `env.ANTHROPIC_BASE_URL=http://127.0.0.1:46890`、`ANTHROPIC_AUTH_TOKEN=<key>`、`ANTHROPIC_MODEL=<默认模型>`。
- 可选写 `ANTHROPIC_DEFAULT_HAIKU_MODEL` / `SONNET` / `OPUS` 别名。
- 保留现有 `env` 其他键；冲突键先预览。

**FR-IM-5 DSH 导入**

- 目标：`~/.dsh/profiles/<profile>/cordis.patch.yml`（默认探测 `desktop`，可切换）。
- 在 `llm-pi-ai` 的 `providers` 下增加 `ai-bobby`：`apiKeyEnv`、`api: openai-completions`、`baseURL`、`models`。
- 密钥：优先通过 DSH 的 credentials 引用写入；若 schema/版本不匹配，退化为提示用户手动在 DSH 设置里填 Key。
- 不覆盖现有 `workbuddy2api` 等 provider；只增删自己标记的 `ai-bobby`。
- 写前备份；提示重启 DSH。

**FR-IM-6 导入结果**

- 返回：客户端、路径、`changed`、`dryRun`、diff、警告、备份路径、需要重启。
- 失败不改原文件；错误给“发生了什么 + 怎么办”。

**FR-IM-7 导入历史与备份恢复**

- 历史文件：`<dataDir>/import-history.json`，`0600`，最多 200 条。
- 每条记录：`id`、动作（`import`/`restore`）、客户端、目标路径、时间、模型数、备份路径、警告、diff。
- 记录 diff 中的 Key/token 会先脱敏，再写入历史文件。
- “恢复”从历史指向的备份读取内容，先给当前文件再做一次备份，然后原子写回；不改其他客户端。
- 备份由 importer 写入前生成，每个目标保留最近 5 份；历史页只展示仍存在的备份。
- 恢复失败不覆盖当前文件；错误给“发生了什么 + 怎么办”。

### 5.6 API Key（FR-KEY）

- 首次启动生成 32 字节随机 Key，存 `0600`，UI 可复制。
- Key 只用于本机 46890；不随日志/状态输出。
- 当前版本只提供掩码展示与复制；轮换/重新生成是后续能力。

### 5.7 日志与诊断（FR-LOG）

- 结构化日志：时间、级别、模块、请求 ID、模型、账号尾号、耗时、状态。
- 不记录 prompt/response 正文、token、Key；可记录 token 数、错误类。
- 日志轮转（单文件 5 MB，保留 5 份）。
- 诊断包：状态、版本、最近日志（脱敏）、配置摘要；不含 token。

### 5.8 设置（FR-SET）

- 外观：系统 / 浅色 / 深色；这是主题的唯一入口，选择存 `localStorage`。
- 本地网关：展示并复制 `http://127.0.0.1:<port>/v1`。
- API Key：展示掩码并复制。
- **版本与更新**：当前版本、自动检查开关（默认开，存 `localStorage`）、手动检查、
  更新源地址（只读可审计）；发现新版本后由顶部更新条完成下载与安装。
- 关于：进入关于页；更新源可在系统浏览器打开。

### 5.9 版本探测与自动更新（FR-UPD）

**FR-UPD-1 版本来源**

- 应用版本以应用 `package.json` 的 `version` 为准；开发模式也用该值，避免 Electron 自身版本混入。
- 更新清单：`https://xsin.github.io/ai-bobby/releases/latest/latest.json`。
- 清单字段：`version`、`notes`、`pub_date`、`platforms.<key>.{url,sha256,size}`；
  可选 `signature`（Ed25519，对规范化清单签名）。

**FR-UPD-2 检查**

- 启动后延迟约 8 秒静默检查；之后每 6 小时一次。
- 无更新、离线、超时、5xx 都**不打扰**用户（只记日志）。
- 设置页“检查更新”是手动动作，失败要展示原因。
- 版本比较用 semver，不能字符串比较。

**FR-UPD-3 提示与下载**

- 有新版本时在主界面顶部显示**非模态**更新条：`当前版本 → 新版本`、更新要点、体积。
- 动作：`稍后`（本次会话不再提示）、`更新`；手动检查可重新打开。
- 点击更新后显示下载进度；下载在后台，不阻塞界面。
- 下载完成显示“更新已就绪”和“立即重启”，进度条收起。
- 校验：SHA256 必须匹配；若清单带 `signature`，必须验签通过；失败中止并删除下载物。
- 下载失败/中断保留重试入口；不留下半成品。

**FR-UPD-4 安装与重启**

- macOS：解压到 `<dataDir>/updates/<version>/`，由内到外重做 ad-hoc 签名，
  `codesign --verify --deep --strict` 通过后才替换。
- 替换前备份旧 `.app`；替换失败回滚；成功后自动重启。
- 安装期间禁止重复触发。
- 更新只替换 `.app`，用户数据在 Application Support，保留。
- 开发模式不执行替换安装，只验证到下载/校验。

**FR-UPD-5 安全边界**

- 传输层 HTTPS；内容层 SHA256；推荐额外 Ed25519 清单签名。
- 公钥内置在应用；私钥只在 CI Secrets，不进仓库、不进客户端。
- 验签失败必须提示危险色并拒绝安装，不提供“仍然安装”。

### 5.10 分发与安装（FR-DIST）

**FR-DIST-1 产物**

- `AI-Bobby-<version>-<arch>.zip`（`ditto -c -k --keepParent`，保留元数据）。
- `.sha256`、`checksums.txt`、`VERSION.txt`、`latest.json`。
- `install.sh` 纳入仓库 `releases/latest/install.sh`，可审计。

**FR-DIST-2 签名**

- macOS 使用 **ad-hoc** 签名（`codesign --sign -`），由内到外签 nested code 与主 bundle；
  构建后 `codesign --verify --deep --strict` 必须通过。
- 不做 Apple 公证；首次打开可能需右键 → 打开，或由安装脚本清理 quarantine。
- 预留 `SIGN_IDENTITY` / `NOTARIZE` 环境变量，将来可切 Developer ID。

**FR-DIST-3 curl 安装**

- 稳定地址：`https://xsin.github.io/ai-bobby/releases/latest/install.sh`。
- 默认安装到 `~/Applications/AI Bobby.app`（无需 sudo）；`--system` 安装到 `/Applications`。
- 参数：`--version`、`--install-dir`、`--no-launch`、`--system`。
- 支持 arm64 / x86_64；优先 universal，缺省回退单架构。
- SHA256 校验失败立即退出；未找到校验文件时需显式 `--skip-verify`（或环境变量）才继续。
- 安装前退出旧进程；覆盖安装保留用户数据；清理 quarantine；默认启动。

**FR-DIST-4 双通道发布**

- **gh-pages**：安装通道（可变 `latest` 指针）：`install.sh`、`VERSION.txt`、`checksums.txt`、`latest.json`。
  **不放 zip**（GitHub 对 Git 文件有 100MB 限制，Electron 包约 123–135MB）。
- **GitHub Release**：版本归档（不可变 tag）：zip 二进制 + `checksums.txt` + `VERSION.txt` + `latest.json` + `install.sh` + 变更说明。
- 两者由同一次构建产出；`install.sh` 默认从 GitHub Release 下载二进制，`latest.json` 的 `url` 指向 Release 资产。

---

## 6. 交互与界面

### 6.1 页面地图

```
主窗口
├── 左侧栏（可收起）
│   ├── 模型来源：OpenCode（默认）/ WorkBuddy / WorkBuddy AI
│   ├── 其他：历史记录 / 关于
│   └── 底部：设置 + 网关状态 + 端口
├── 右侧内容区（页面标题 + 网关状态 + 设置快捷入口 + 导入）
├── 全局导入抽屉
├── 更新条（非模态，有新版时出现）
├── 浮动应用 LOGO 头像（可拖动，点击进关于）
├── 浮动音乐播放器（全局单例，可拖动/关闭）
└── 服务状态条（常驻底部）
```

### 6.2 线框（OpenCode 页，对应附件）

```
┌────────────────────────────────────────────────────────────────────┐
│ ● ● ●                         AI Bobby                    [本地网关] │
├──────────────┬─────────────────────────────────────────────────────┤
│ [logo] AI Bobby « │ 模型来源 / OpenCode          ● 运行中  [⚙] [导入 10] │
│ 模型来源      │                                                     │
│ >_ OpenCode 10│ OpenCode 免费模型          已发现 10  可用 10  待检测 0 │
│ ○ WorkBuddy  0│ 把 OpenCode 的免费模型接入统一网关                    │
│ ◎ WBI        0│ [读取模型] [检测全部]                                │
│ 其他          │                                                     │
│ ↺ 历史记录   2│ 模型清单                                             │
│ ♙ 关于        │ ┌─────────────────────────────────────────────────┐ │
│               │ │ ☑  OC. Big Pickle          推理/工具  ● 可用  —  │ │
│               │ │ ☑  OC. DeepSeek V4.1      推理/工具  ● 可用  —  │ │
│               │ └─────────────────────────────────────────────────┘ │
│ ⚙ 设置        │                                                     │
│ ● 运行中 46890│                                                     │
├──────────────┴─────────────────────────────────────────────────────┤
│ ● 运行中 · 10 个模型  转发口 http://127.0.0.1:46890/v1  Key sk-…  │
│                                                     AI Bobby 0.2.1 │
└────────────────────────────────────────────────────────────────────┘
```

### 6.3 WorkBuddy 页的账号条

```
┌────────────────────────────────────────────────────────────────────┐
│ WorkBuddy 国内版                        账号 2   [刷新目录] [刷新额度] │
│ 复用官方登录，多账号自动切换                                        │
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ [头像] 昵称 A · 2,401 积分 · 优先 · 启用   [设优先] [禁用] [删除] │ │
│ │ [头像] 昵称 B ·   830 积分 · 冷却中 (42s)  [设优先] [禁用] [删除] │ │
│ │ [+ 添加账号]                                                   │ │
│ └────────────────────────────────────────────────────────────────┘ │
│ 模型清单 ...                                                       │
```

### 6.4 全局导入抽屉

```
┌ 导入到客户端 ─────────────────────────────────────────────┐
│ ☑ WorkBuddy（国内）  ~/.workbuddy/models.json      [已探测] │
│ ☑ WorkBuddy AI（国际）~/.workbuddy-ai/models.json  [已探测] │
│ ☑ Codex              ~/.codex/config.toml          [已探测] │
│ ☑ Claude Code        ~/.claude/settings.json       [已探测] │
│ ☑ DeepSeek Harness   ~/.dsh/profiles/desktop/...   [已探测] │
│                                                            │
│ 分组： [OC] [WB] [WBI]     模型：已选 7 个                  │
│ 默认模型： [OC. Big Pickle ▾]                              │
│                                                            │
│ [预览变更]  [写入]  [回滚最近一次]                          │
│ ┌ diff 预览 ─────────────────────────────────────────────┐ │
│ │ + [model_providers.ai-bobby] ...                       │ │
│ │ + "ANTHROPIC_BASE_URL": "http://127.0.0.1:46890"       │ │
│ └────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

### 6.5 导入历史

```
┌ 导入历史 ──────────────────────────────────────────────────────────┐
│ 最近写入 10/18 15:10   可恢复备份 2   备份占用 42 B               │
│ [全部][WorkBuddy][WorkBuddy AI][Codex][Claude][DSH]  [搜索…]      │
│ ┌ 导入记录 ─────────────────────┐ ┌ 备份文件 ───────────────────┐ │
│ │ Codex  成功  7 个模型  [变更] │ │ config.toml.ai-bobby-….bak │ │
│ │ Codex  已恢复             [恢复]│ │ Codex · 15:10 · 17 B [恢复] │ │
│ └───────────────────────────────┘ └─────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

### 6.6 关于页与浮动层

```
┌ 关于 ──────────────────────────────────────────────────────────────┐
│ [ZEO 头像]  ABOUT THE MAKER                                        │
│   ZEO      独立开发者 / 独立音乐人 / AI 驭龙师                     │
│             “如果说 AI 是巨龙，我就是那个驭龙者。”                │
│             PROJECT AI Bobby   VERSION 0.2.1   MODE Local-first    │
│ THE PROJECT   把三个来源，收进一个本机端点。                       │
│ SUPPORT MY MUSIC   两张最新专辑 + [最新歌曲][最热歌曲] + 播放器     │
│ SUPPORT THE WORK   支付宝 / 微信 / 更多方式收款码                   │
└────────────────────────────────────────────────────────────────────┘
 右下角：应用 LOGO 头像（可拖动，ZEO 标签）+ 浮动音乐播放器（可拖动）
```

### 6.7 状态与文案

- 空状态：说明“还没有模型/账号”，给下一步按钮。
- 加载：骨架/进度，不阻塞其他页面。
- 错误：一句话说清原因 + 一个可操作按钮（重试/重新登录/改端口/查看说明）。
- 部分可用：黄色状态 + “仅对话/部分账号不可用”，不假装全部可用。
- 所有危险操作（轮换 Key、删除账号、回滚配置）二次确认，说明影响。

### 6.6 可访问性

- 键盘可达所有操作；焦点可见；表格行可展开。
- 文字对比度 ≥ WCAG AA；浅色/深色都验证。
- 状态不只靠颜色，配文字/图标。
- 窗口最小宽度下无横向滚动；表格列可压缩。

---

## 7. 数据与隐私

### 7.1 数据目录

| 系统 | 目录 |
|---|---|
| macOS | `~/Library/Application Support/AI Bobby` |
| Windows | `%APPDATA%\AI Bobby` |
| Linux（实验） | `$XDG_CONFIG_HOME/AI Bobby` |

文件：

```
api-key              0600  网关 Key
status.json                运行状态（原子写）
import-history.json  0600  导入/恢复历史与备份索引（最多 200 条）
accounts/                  WorkBuddy 账号（token 加密）
  cn.json / intl.json
catalog-cache.json         模型目录快照
probe-cache.json           OpenCode 判定缓存
logs/                      轮转日志
runtime/                   OpenCode 运行时
```

### 7.2 隐私原则

- 所有数据只在本机；不上传遥测。
- token/Key 不落日志、不进状态、不进诊断包。
- 账号删除即删除 token；退出不删除客户端配置。
- WorkBuddy 登录使用官方页面；AI Bobby 不接触用户密码。
- 明确告知：WorkBuddy 接口非公开，可能违反上游条款，风险自担。

---

## 8. 非功能需求

### 8.1 性能

- 冷启动到窗口可交互 ≤ 3 秒（不含 OpenCode 运行时下载）。
- `/v1/models` ≤ 100ms（缓存命中）。
- 网关附加延迟 p95 ≤ 50ms；首字附加 ≤ 100ms。
- 检测并发默认 3；可调 1–6；检测不阻塞聊天。

### 8.2 可靠性

- 网关子进程崩溃自动重启一次；连续失败显示错误与日志。
- 账号刷新单账号串行；多账号互不阻塞。
- 上游超时默认 300 秒；客户端断开即取消。
- 写入配置原子化；断电/崩溃不产生半文件。

### 8.3 安全

- 只监听 loopback；拒绝浏览器 Origin；Host 校验。
- API Key 随机、`0600`、可轮换。
- 账号 token 加密落盘；密钥不落盘（safeStorage）。
- 导入器防路径穿越；只写白名单路径；写前备份。
- 不执行上游返回的任意命令；OpenCode 审批围栏保留。

### 8.4 兼容性

- macOS 13+（Apple Silicon / Intel）；Windows 10+（发版前验证）。
- Node ≥ 22.19（Electron 内置 Node）。
- OpenAI Chat/Responses 客户端、Anthropic SDK、Codex CLI、Claude Code、DSH 0.2.x、WorkBuddy 5.5+。
- 端口默认 46890；客户端配置使用 `127.0.0.1`，不依赖 `localhost` 解析。

### 8.5 可维护性

- pnpm workspace；TypeScript strict；协议翻译有 fixture 测试。
- 参考实现复制需注明来源与 MIT 许可。
- 上游变化集中在 provider 包，UI/导入器不感知协议细节。

---

## 9. 验收标准

### AC-1 首次启动

- Given 全新安装，When 启动，Then 窗口出现、网关 `ready`、OpenCode 页默认选中、左侧栏展开、模型清单开始加载。
- And 无 API Key 时自动生成；`/health` 可访问；`/v1/models` 无 Key 返回 401。
- And 收起/展开侧边栏后状态持久化；主界面没有主题切换，设置页有系统/浅色/深色。

### AC-2 WorkBuddy 登录

- Given 未登录，When 点“添加账号”并完成官方登录，Then 账号出现在账号条、模型清单出现 `wb/` 或 `wbi/`、额度可见。
- And 关闭登录窗口/超时不会留下脏状态；可重新发起。

### AC-3 多账号

- Given 两个启用账号，When 连续请求 4 次，Then 请求在账号间轮转。
- When 账号 A 返回 429，Then 下一次请求走账号 B，A 显示冷却；流式中的请求不被切换。

### AC-4 三协议

- Codex 用 `wire_api=responses` 完成一次对话与一次工具调用。
- Claude Code 用 `ANTHROPIC_BASE_URL` 完成一次对话与一次工具调用。
- WorkBuddy/DSH 用 Chat Completions 完成一次对话。
- 三者都能流式输出，usage 合理，错误格式正确。

### AC-5 导入

- 四个客户端各导入一次后，能在各自模型选择器看到 `OC.` / `WB.` / `WBI.` 模型并完成对话。
- 重复导入返回 `changed:false`；用户手写条目不变；备份存在；回滚可恢复。
- WorkBuddy 导入自动排除自身分组。
- 每次实际写入后，历史页出现记录与备份；恢复后目标文件回到备份内容，当前文件已再次备份。

### AC-6 安全

- 日志、`status.json`、诊断包中搜索 token/Key 无明文。
- 带 `Origin` 的请求 403；非 loopback Host 403。
- 删除账号后其 token 从账号库消失。

### AC-7 故障

- 46890 被占用时显示明确错误与改端口入口。
- 网关崩溃后自动重启；UI 状态恢复。
- 上游 402/429 有可读错误与冷却提示。

### AC-8 关于与浮动层

- 点击右下角应用 LOGO 头像进入关于页；拖动后位置保存，重开窗口仍在可视区。
- 关于页展示 ZEO、项目介绍、两张专辑、最新/最热歌曲、三种赞助码。
- 点击歌曲后优先唤起本机网易云音乐 App；无 App 或唤起失败时，右下角出现可拖动的网易云 iframe 播放器；切页不中断播放；关闭后移除 iframe。

### AC-9 更新提示

- 有新版时顶部出现非模态更新条，展示当前/新版本、notes、体积。
- 下载显示进度；完成后显示“更新已就绪”和“立即重启”；“稍后”后本次会话不再自动弹出。
- 设置页可切换自动检查、手动检查并展示失败原因。

---

## 10. 发布计划

| 里程碑 | 内容 | 退出条件 |
|---|---|---|
| M0 文档 | PRD / tech / handsoff | 用户评审通过 |
| M1 骨架 | workspace、core、gateway `/health` `/v1/models`、API Key | CLI 起 46890，测试通过 |
| M2 WorkBuddy | 登录、多账号、目录、聊天、额度、调度 | 双版本各两账号，流式对话 |
| M3 OpenCode | 运行时、免费筛选、检测、缓存、会话 | 自动准备运行时，检测可用 |
| M4 三协议 | Chat / Responses / Messages + 工具调用 | 三客户端真机通过 |
| M5 导入 | 四个 importer + dry-run + 回滚 | 四客户端各完成对话 |
| M6 UI | 左侧栏多页、历史记录、关于/音乐、浮动头像、更新提示 | 截图风格与交互验收 |
| M7 打包 | macOS `.app` + zip；Windows NSIS；ad-hoc 签名 | 安装即用，签名校验通过 |
| M8 分发与更新 | install.sh、gh-pages、GitHub Release、latest.json、应用内更新 | curl 安装成功；旧版发现新版并完成更新重启 |

---

## 11. 风险与开放问题

### 11.1 风险

1. **登录页 webview 限制**：微信/Google 可能拦截内嵌登录；已准备系统浏览器回退，但需 P2 真机验证。
2. **上游私有协议变化**：登录、目录、聊天、billing 都可能变；集中在 provider 层，便于修。
3. **多账号风控**：轮询/多账号请求可能触发限流或封禁；不做绕过，错误透明，支持冷却。
4. **token 安全**：多账号 token 更敏感；safeStorage + 不落日志；CLI 模式明确警告。
5. **DSH 配置写入**：profile 由 App 管理，schema 可能变；先 dry-run，失败给手动指引。
6. **Codex/Claude 配置格式变化**：导入器保留未知字段；失败不改原文件。
7. **OpenCode 免费池 churn**：缓存 + 降级；不可用不影响其他来源。
8. **端口冲突**：明确错误，不静默换端口。
9. **Gatekeeper / 公证**：ad-hoc 签名没有 Developer ID；首次打开可能被拦，需文档引导。
10. **自动更新替换失败**：备份 + 回滚；失败保留旧版本并提示手动重跑安装脚本。
11. **更新清单与产物同源**：SHA256 不能抵御同时篡改清单与产物；用 Ed25519 清单签名增强。

### 11.2 已确定的实现约定

- 导入抽屉的“默认模型”当前是全局一个；勾选“同时设为默认”时写入 Codex/Claude。
- WorkBuddy 导入由用户选择分组；目标 App 自动排除自身分组，避免自环。
- `preferred` 在 provider 调度中生效；当前 UI 还未暴露“钉住此账号”的开关。
- 未内置 oc-ferry 旧条目清理；需要时由用户手动处理。

---

## 12. 附录

### 12.0 安装命令

```bash
curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh | bash
```

可审计安装：

```bash
curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh -o install.sh
less install.sh
bash install.sh
```


### 12.1 模型清单示例

```json
{
  "object": "list",
  "data": [
    {
      "id": "oc/big-pickle",
      "object": "model",
      "created": 0,
      "owned_by": "opencode",
      "name": "OC. Big Pickle",
      "group": "opencode",
      "group_name": "OpenCode",
      "capabilities": { "text": true, "images": false, "tools": true, "reasoning": true },
      "context_window": 131072,
      "max_output_tokens": 32768,
      "status": "available",
      "accounts": 0
    },
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

### 12.2 客户端配置示例（Key 为占位）

WorkBuddy `models.json`：

```json
{
  "id": "wb/hy3",
  "name": "WB. Hy3",
  "vendor": "Custom",
  "url": "http://127.0.0.1:46890/v1/chat/completions",
  "apiKey": "<AI_BOBBY_API_KEY>",
  "supportsToolCall": true,
  "supportsImages": true,
  "supportsReasoning": true,
  "maxInputTokens": 192000,
  "maxOutputTokens": 64000,
  "aiBobbyOwner": "ai-bobby-v1"
}
```

Codex `config.toml`：

```toml
[model_providers.ai-bobby]
name = "AI Bobby"
base_url = "http://127.0.0.1:46890/v1"
wire_api = "responses"
experimental_bearer_token = "<AI_BOBBY_API_KEY>"
```

Claude Code `settings.json`：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:46890",
    "ANTHROPIC_AUTH_TOKEN": "<AI_BOBBY_API_KEY>",
    "ANTHROPIC_MODEL": "wb/hy3"
  }
}
```

DSH `cordis.patch.yml`（片段）：

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
