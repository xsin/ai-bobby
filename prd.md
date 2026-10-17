# AI Bobby 产品需求文档（PRD）

- 版本：v0.1（对齐稿）
- 日期：2026-10-18
- 状态：待用户评审
- 关联：[handsoff.md](./handsoff.md)（实施计划 / 决策 / 进度）、[tech.md](./tech.md)（技术方案）
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
- 管理：三个来源 tab、模型清单、检测、账号、额度、一键导入四个客户端；
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
3. OpenCode tab 默认选中；应用自动准备隔离运行时、读取免费模型、开始并发检测。
4. WorkBuddy / WBI tab 显示“未登录”；点击“添加账号”进入登录。
5. 首次使用引导提示：三个来源分别是什么、如何导入客户端、Key 在哪里。

### 4.2 添加 WorkBuddy 账号

1. 在 WorkBuddy 或 WBI tab 点“添加账号”。
2. 应用调用官方 `auth/state`，拿到 `authUrl`，在**内嵌 BrowserWindow** 打开官方登录页。
3. 用户用微信/QQ（国内版）或 Google/微信（国际版）登录。
4. 应用轮询 `auth/token`；成功后取昵称、额度、模型目录。
5. 账号出现在 tab 顶部账号条；模型清单刷新。
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

1. 在任意 tab 勾选要导入的模型；全局“导入”按钮打开抽屉。
2. 抽屉列出四个客户端、探测到的路径、当前状态。
3. 选择分组/模型/默认模型；点“预览变更”看 diff。
4. 点“写入”；写前备份，写后返回结果；失败可回滚。
5. 提示重启对应客户端（Codex/Claude/DSH 需要重启或重开会话）。

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

- 在“有该模型且启用且不在冷却”的账号间 round-robin。
- `401`：先刷新该账号 token；失败则标记 invalid 并换账号。
- `429`：标记冷却（读取 `Retry-After` 或默认 60s），换账号。
- `402` / 额度不足：标记冷却（默认 30 分钟），换账号。
- 流式响应已开始：不换账号；错误只结束当前流。
- 全部不可用：返回 429/402，附“哪个账号、什么原因、多久恢复”。

**FR-WB-5 目录**

- `GET /v3/config` 拉取模型目录；解析上下文窗口、最大输出、图片、推理档位、计费倍率/促销。
- 目录按账号缓存；失败时回退上次成功快照；UI 标注“来自缓存/内置兜底”。
- 模型状态由账号可用性 + 目录共同决定；无账号时 `no_account`。

**FR-WB-6 额度**

- 按账号读 billing 接口，展示剩余积分/套餐/到期；失败不阻塞模型列表。
- 不自动轮询；在登录后、手动刷新、页面打开时读取。
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

- 品牌 AI Bobby；标题“模型与服务”；三来源 tab；主题切换（系统/浅色/深色）。
- 主题色：**电光克莱因蓝 `#1e4fff`**（Ant Design `colorPrimary`，Tailwind/shadcn 统一定义）。
- 窗口尺寸默认接近截图（约 1160×860），最小 900×640；支持深色/浅色。

**FR-UI-2 Tab**

- 三个 tab：`OpenCode` / `WorkBuddy` / `WorkBuddy AI`。
- 默认选中 OpenCode；附件截图即该 tab。
- 每个 tab 保留自己的滚动位置、筛选、选中状态。
- tab 上显示可用模型数/账号状态小圆点。

**FR-UI-3 命令区**

- 左：来源标题 + 一句说明 + `读取模型` / `检测全部`（WorkBuddy 为 `刷新目录` / `刷新额度`）。
- 右：当前 tab 的统计（已发现/可用/待检测/账号数）+ `导入` 按钮。
- WorkBuddy / WBI：账号条（昵称、额度、启用、添加账号）。

**FR-UI-4 模型表格**

- 列：勾选、模型（展开箭头）、能力、状态、耗时/来源。
- 行内详情：上游 ID、上下文、最大输出、账号数、最近检测、错误原因、“只重测这一个”。
- 支持全选/反选当前 tab；选中数全局共享给导入抽屉。
- 空状态、加载态、错误态、部分可用态都有明确文案。

**FR-UI-5 全局导入抽屉**

- 顶部“导入”按钮常驻；抽屉从右侧滑出。
- 列出客户端：WorkBuddy（国内）、WorkBuddy AI（国际）、Codex、Claude Code、DSH。
- 每行：探测路径、状态、可写性、默认分组。
- 分组选择：`OC` / `WB` / `WBI`；WorkBuddy 目标自动排除自身分组。
- 模型选择：默认所有可用模型；可只导入当前选择。
- 底部：`预览变更` / `写入` / `回滚`；展示 diff 与警告。
- 写入中禁用按钮；完成后显示路径与“需要重启客户端”提示。

**FR-UI-6 服务状态条**

- 左侧：运行状态点 + 文案 + 检测进度 + 重试按钮。
- 右侧：转发口 `http://127.0.0.1:46890/v1`、API Key 掩码/复制/轮换、三个来源小状态、版本。
- 点击 Key 可复制；轮换需确认，并提示“已导入客户端需要更新 Key”。

**FR-UI-7 托盘**

- 托盘菜单：显示窗口、刷新全部、打开导入、复制端点、退出。
- 关窗不退出；退出时停止网关与 OpenCode 子进程。

**FR-UI-8 设置**

- 端口（默认 46890，改动需确认）、主题、检测并发、日志级别、数据目录（只读展示）、清理缓存。
- “高级”：清除 OpenCode 判定缓存、重置 API Key、导出诊断包（脱敏）。

### 5.5 一键导入（FR-IM）

**FR-IM-1 通用机制**

- 每个 importer：探测路径 → 读取 → 合并 → 预览 diff → 备份 → 加锁 → 原子写 → 校验。
- 只增删自己标记的条目；用户手写条目不动。
- 内容未变返回 `changed:false`，不写文件、不产生备份。
- 写前备份，保留最近 5 份；支持回滚到最近一次。
- 文件被外部修改：放弃写入，提示重新预览。
- 所有写入默认 dry-run；用户点“写入”才落盘。
- 写入含密钥的文件后，尽量收紧权限到 `0600`（原文件更严格则保留）。

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

### 5.6 API Key（FR-KEY）

- 首次启动生成 32 字节随机 Key，存 `0600`，UI 可复制。
- Key 只用于本机 46890；不随日志/状态输出。
- 轮换：生成新 Key，旧 Key 立即失效；提示更新已导入客户端。
- 支持“重新生成”与“复制”。

### 5.7 日志与诊断（FR-LOG）

- 结构化日志：时间、级别、模块、请求 ID、模型、账号尾号、耗时、状态。
- 不记录 prompt/response 正文、token、Key；可记录 token 数、错误类。
- 日志轮转（单文件 5 MB，保留 5 份）。
- 诊断包：状态、版本、最近日志（脱敏）、配置摘要；不含 token。

### 5.8 设置（FR-SET）

- 端口、主题、检测并发、日志级别、代理（HTTP/HTTPS，可选）、启动时自动读取、开机自启（默认关）。
- **版本与更新**：当前版本、自动检查开关（默认开）、手动检查、更新源地址（只读可审计）、
  “安装并重启”入口。
- 设置变更尽量即时生效；端口/代理变更提示重启网关。

### 5.9 版本探测与自动更新（FR-UPD）

**FR-UPD-1 版本来源**

- 应用版本以 `app.getVersion()` / 构建注入版本为准；UI 展示当前版本。
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
- 动作：`稍后`（本次会话不再提示）、`更新`。
- 点击更新后显示下载进度；下载在后台，不阻塞界面。
- 校验：SHA256 必须匹配；若清单带 `signature`，必须验签通过；失败中止并删除下载物。
- 下载失败/中断保留重试入口；不留下半成品。

**FR-UPD-4 安装与重启**

- 安装前检查磁盘空间（约 2× 应用体积）。
- macOS：解压到 `<dataDir>/updates/<version>/`，由内到外重做 ad-hoc 签名，
  `codesign --verify --deep --strict` 通过后才替换。
- 替换前备份旧 `.app`；替换失败回滚；成功后自动重启。
- 安装期间禁止重复触发；用户可在设置里选择“下载后手动重启”。
- 更新只替换 `.app`，用户数据在 Application Support，保留。

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

- **gh-pages**：安装通道（可变 `latest` 指针）：`install.sh`、`VERSION.txt`、`checksums.txt`、zip、`latest.json`。
- **GitHub Release**：版本归档（不可变 tag）：同一批产物 + 变更说明 + 人工下载入口。
- 两者由同一次构建产出，内容一致。

---

## 6. 交互与界面

### 6.1 页面地图

```
主窗口
├── OpenCode tab（默认，截图）
├── WorkBuddy tab（含账号条）
├── WorkBuddy AI tab（含账号条）
├── 全局导入抽屉
├── 更新条（非模态，有新版时出现）
├── 设置（模态/抽屉：版本、自动更新、端口、主题）
└── 服务状态条（常驻底部）
```

### 6.2 线框（OpenCode tab，对应附件）

```
┌────────────────────────────────────────────────────────────────────┐
│ ● ● ●                     AI Bobby                                 │
│ [icon] AI Bobby │ 模型与服务      [OpenCode][WorkBuddy][WBI]  [系统|浅|深] │
├────────────────────────────────────────────────────────────────────┤
│ OpenCode 免费模型                              导入到客户端  [导入 ▾] │
│ 把 OpenCode 的免费模型接入统一网关              已选 7 个可用模型      │
│ [读取模型] [检测全部]                                                │
│                                                                    │
│ 模型清单                            10 已发现   7 可用   0 待检测    │
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ ☑  OC. Big Pickle             推理        ● 可用   13.6 秒      │ │
│ │ ☑  OC. DeepSeek V4.1 Flash    推理/图片   ● 可用    3.9 秒      │ │
│ │ ☑  OC. GLM-5.3-Flash Free     推理/图片   ● 可用    2.6 秒      │ │
│ └────────────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────┤
│ ● 运行中 · 10 个模型   转发口 http://127.0.0.1:46890/v1   [复制 Key] │
└────────────────────────────────────────────────────────────────────┘
```

### 6.3 WorkBuddy tab 的账号条

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

### 6.5 状态与文案

- 空状态：说明“还没有模型/账号”，给下一步按钮。
- 加载：骨架/进度，不阻塞其他 tab。
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
settings.json              设置
status.json                运行状态（原子写）
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

- Given 全新安装，When 启动，Then 窗口出现、网关 `ready`、OpenCode tab 默认选中、模型清单开始加载。
- And 无 API Key 时自动生成；`/health` 可访问；`/v1/models` 无 Key 返回 401。

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

### AC-6 安全

- 日志、`status.json`、诊断包中搜索 token/Key 无明文。
- 带 `Origin` 的请求 403；非 loopback Host 403。
- 删除账号后其 token 从账号库消失。

### AC-7 故障

- 46890 被占用时显示明确错误与改端口入口。
- 网关崩溃后自动重启；UI 状态恢复。
- 上游 402/429 有可读错误与冷却提示。

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
| M6 UI | 三 tab、账号条、导入抽屉、状态条 | 截图风格验收 |
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

### 11.2 待确认

- 导入抽屉里“默认模型”是全局一个，还是每个客户端一个？
- WorkBuddy 导入是否默认同时写国内版与国际版两个 `models.json`，还是让用户分别勾选？
- 账号条是否需要“仅用此账号”钉住（当前提案：需要，作为 round-robin 的覆盖）。
- 是否需要在 v1 提供“清理 oc-ferry 旧条目”的迁移操作（当前提案：提供，但单独确认）。

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
