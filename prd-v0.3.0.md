# AI Bobby v0.3.0 PRD（草案，待审阅）

- 状态：**草案 / 待产品审阅**，未进入开发
- 日期：2026-10-20
- 基线：v0.2.4（本地热修，未发版）
- 目标版本：v0.3.0（External Sources）+ v0.3.1（Official Bridges）
- 关联：`docs/prd.md`、`docs/tech.md`、`docs/research-codebuddy-code.md`
- 竞品调研：`ai-bobby-biz/docs/research/`（私有，不进入公开仓库）

---

## 1. 一句话目标

**把 AI Bobby 从“聚合四个内置来源的网关”升级为“本地模型控制面”：内置来源、外部网关、官方客户端都能接入同一个端点，并被统一管理、路由、观测和导入客户端。**

0.3 不靠“更多内置来源”取胜，而靠：

1. **外部来源（External Sources）**：用户已有的 Magpie / CCX / WorkBuddy2API Hub / 任意 OpenAI 兼容网关，30 秒接进来；
2. **官方桥（Official Bridges）**：用官方客户端/CLI 的授权请求，而不是伪造客户端；
3. **可解释路由**：候选、失败分类、会话粘性、健康状态、每来源观测；
4. **导入闭环**：外部模型也能进入 Codex / Claude / DSH / VS Code / CodeBuddy。

---

## 2. 背景与判断

### 2.1 用户现状

- 很多用户已经在跑 Magpie、CCX、workbuddy2api-hub 等本地网关；让他们迁移到 AI Bobby 的成本很高。
- 这些工具各有强项：Magpie 的路由/会话/多协议、CCX 的渠道调度/上下文路由/观测、Hub 的特定上游适配。
- AI Bobby 的强项是：macOS 原生体验、内置 OpenCode/WorkBuddy/NVIDIA、导入客户端、中文体验、本地优先。
- 正确策略不是“替代它们”，而是**让它们成为 AI Bobby 的外部来源**，AI Bobby 做控制面。

### 2.2 竞品启示（摘要）

- 同类产品已经把“渠道调度、失败分类、会话粘性、每渠道日志、上下文路由”做成基础设施；AI Bobby 不能只做“直通适配器”。
- 它们通常把上游当“渠道/来源”，而不是写死 provider；AI Bobby 需要动态来源，否则每接一个网关都要改代码。
- 好的调度器都把来源压成可序列化配置（baseURL/key/模型/能力/代理/限速），provider 只做协议构造；调度、熔断、指标在公共层。AI Bobby 应照这个边界拆。
- **流式 preflight 是硬要求**：在首个内容事件提交给客户端前，候选仍可切换；否则失败只能写进流。
- 强产品会做 context routing（按上下文/输出能力过滤）、trace/session affinity（保 prompt cache）、每来源健康/成功率/延迟/日志、稳定来源 ID（重排/改名不丢画像）。
- 强产品通常也提供“来源信任分级”（官方 API / 官方订阅 / 中转 / 社区 / 本地）用于展示与 tie-break，而不是假装所有来源一样可信。
- 但“伪造官方客户端/读 Keychain/任意插件代码/自动托管账号”不适合 AI Bobby 的产品边界；外部工具由用户自己运行，AI Bobby 只连接。
- 参考产品没有动态插件架构（扩展仍需改代码），这正好是 AI Bobby 的差异化：**声明式连接器 + 外部 HTTP 来源**。

### 2.3 产品原则

1. **本地优先**：默认只连 `127.0.0.1`；远程来源必须显式 HTTPS + 风险提示。
2. **不伪造、不绕过**：不生成官方客户端头/指纹、不读第三方 token、不内置 WBI 绕过。
3. **用户自负风险，但必须知情**：外部工具的风险由用户选择；AI Bobby 不隐藏、不静默安装。用户明确授权后，可以**协助安装、启动、连接**外部工具，但不把它们打包进 AI Bobby。
4. **内置来源不能被外部来源破坏**：外部失败只影响自身。
5. **可解释**：每次路由/失败/降级都能在 UI/日志中解释。

---

## 3. 版本拆分（建议）

| 版本 | 主题 | 必须交付 |
|---|---|---|
| **0.3.0** | External Sources | 通用外部来源 + Magpie/CCX/Hub 预设 + 风险确认 + 动态来源 UI + CodeBuddy 导入目标 |
| **0.3.1** | Official Bridges | CodeBuddy CLI provider、WorkBuddy CN 官方桥（若验证通过）、CodeBuddy/外部模型导入完善 |
| **0.3.2** | Routing & Insight | 候选路由/会话粘性/usage 账本/模型目录增强（也可提前到 0.3.0） |

> 推荐先发 0.3.0。外部来源是增长点；官方桥是差异化，但不适合和外部来源捆在同一个高风险版本里。

---

## 4. 用户故事

### 4.1 已有 Magpie/CCX 的用户

> 我已经在跑 Magpie。打开 AI Bobby → 添加来源 → 它自动发现 `127.0.0.1:3425` → 我确认风险 → 42 个模型出现在侧栏 → 我在 Codex 里选 `mg/...`。

### 4.2 已有 WorkBuddy2API Hub 的用户

> 我知道它有风险，但我自己承担。AI Bobby 不替我装、不替我配，只让我连 `127.0.0.1:8788`，并把模型统一导入客户端。

### 4.3 CodeBuddy 用户

> 我在用 CodeBuddy Code。AI Bobby 可以写 `~/.codebuddy/models.json`，让 CodeBuddy 使用 AI Bobby 的模型；也可以在 AI Bobby 里用官方 CodeBuddy CLI 作为来源。

### 4.4 多客户端开发者

> 我只需要维护一个 AI Bobby 端点；外部来源和内置来源的模型都能导入 Codex/Claude/DSH/VS Code。

---

## 5. 功能需求

### 5.1 外部来源（FR-EXT）

**FR-EXT-1 添加来源**

- 入口：侧栏“模型来源”底部 `+ 添加来源`；设置页“连接器”；空状态卡片。
- 类型：
  - **本地网关预设**：Magpie、CCX、WorkBuddy2API Hub；
  - **自定义 OpenAI 兼容上游**：Base URL、Key、协议（Chat/Responses）、前缀；
  - **官方桥**：CodeBuddy CLI（0.3.1）。
- 预检：
  - 本地预设：检测端口 + `GET /health` + `GET /v1/models`；
  - 自定义：URL 合法性、TLS、`/v1/models`（失败可手动填模型）；
  - 结果展示：`已发现 <name> · N 个模型 · 健康/需要 Key`。
- 失败状态：未启动、端口不对、需要 Key、证书错误、不是 OpenAI 兼容端点；每类给可操作建议。
- **获取状态**：`detected`（已运行）/ `installed_not_running`（已安装未启动）/ `not_installed`（未安装）/ `installing` / `connected`。
  未安装时不是只给说明，而是进入“授权安装/连接”流程（见 FR-EXT-7）。

**FR-EXT-2 来源配置**

- 字段：`id`（稳定 UID，不从 index/name 推导）、`kind`（builtin/external/official）、`name`、`prefix`、`baseUrl`、`apiKey`、`protocols`、`enabled`、`proxy`、`trustTier`（official/subscription/relay/community/local）、`risk`（low/medium/high）、`riskAcceptedAt`、`health`、`lastRefreshAt`。
- 来源重排、改名、换 Key 不得丢健康/画像；`id` 创建后不变。
- 前缀：默认 `mg/`、`ccx/`、`hub/`，可编辑；冲突时拒绝并提示。
- Key：只存本机 `settings.json`（0600），UI 只显示掩码；不写日志。
- 外部来源可单独设置代理；默认继承全局。
- 删除来源只删 AI Bobby 配置，不影响外部工具。

**FR-EXT-3 健康与生命周期**

- 启动时并发探测所有外部来源；失败不阻塞内置来源。
- 外部来源 `offline` 时：UI 标记、暂停路由、保留配置；可手动重连。
- 每 60 秒健康检查（可配置）；请求失败按错误分类更新健康，不因单次失败永久禁用。
- 外部来源请求失败不得影响内置来源。

**FR-EXT-4 风险与合规**

- 首次连接外部来源按 `risk` 分级弹风险确认（low 可用轻提示，medium/high 必须确认）：
  > 该来源由第三方工具提供，可能违反上游条款或触发风控。AI Bobby 不提供、不维护其绕过逻辑，也不保证可用性。连接即表示你理解并自行承担风险。
- 必须主动勾选，不预勾选；记录 `riskAcceptedAt`。
- **不静默安装、不捆绑、不自动更新**第三方工具；不读取其凭据；不把其代码打包进 AI Bobby。
- 用户明确授权后，可下载/安装/启动/连接（见 FR-EXT-7）；每一步显示来源、校验、命令与权限，可取消。
- 外部来源页面显示 `External · 由 <name> 提供` 和“在外部工具中管理”链接。

**FR-EXT-5 模型与能力**

- 外部模型 ID：`<prefix>/<upstream-model-id>`；显示名可继承外部 `/v1/models` 的 name。
- 能力保守：未知工具/图片/推理能力默认 false；可通过来源配置手动覆盖（高级）。
- 外部模型不进入 Codex catalog，除非有显式 `CODEX_METADATA` 映射；导入 Codex 时跳过并提示。
- 来源级 `models allowlist/denylist`（可选，P1）。

**FR-EXT-6 自定义上游**

- 支持 OpenAI Chat Completions；Responses 作为可选协议。
- Base URL 支持 `http://127.0.0.1:port/v1`、`https://host/v1`；禁止 `file://`、非 HTTP(S)、云 metadata 地址。
- Key 认证：`Authorization: Bearer`；可选自定义 header（高级，P1）。
- 模型发现失败时允许手动输入模型 ID（P1）。

### 5.1.1 获取、安装与连接协助（FR-EXT-7）

**目标**：不是“告诉用户我们支持什么”，而是让用户在知情授权后**完成安装并连上**。

**FR-EXT-7.1 检测已有安装**

- 本地预设先检测端口/进程/健康（如 Magpie 3425、Hub 8788、CCX 3000/3688）。
- 已检测到：卡片显示 `检测到 WorkBuddy2API Hub · 是否连接？`，用户确认后直接进入健康/模型预检。
- 已安装未运行：显示 `已安装，未运行`，提供 `启动并连接`（用户确认后启动）。
- 未安装：显示 `未安装`，提供 `安装并连接` / `我已有安装` / `暂不`。

**FR-EXT-7.2 授权安装流程**

1. **说明**：外部工具名称、官方来源、License、版本、安装方式、需要的权限（**是否可能需要管理员权限**）、风险等级。
2. **确认**：用户主动勾选风险确认；不预勾选。
3. **下载/安装**：
   - 优先使用官方发布包/包管理器；展示 URL、SHA256（如有）、将执行的命令；
   - 默认由 AI Bobby **下载到临时目录并校验**，然后**显示命令由用户确认执行**；
   - 可选“由 AI Bobby 执行安装命令”（二次确认，显示完整命令）；
   - **管理员权限前置说明**：安装流程开始前明确告诉用户“该安装可能需要管理员权限；若需要，AI Bobby 将自动请求系统管理员授权（系统弹窗），你可以取消”。
   - 需要提权时由 AI Bobby 触发系统授权弹窗；用户取消则立即中止安装，不执行提权操作、不留下半安装。
4. **启动/连接**：
   - 可选“由 AI Bobby 启动”或“我自己启动”；启动后健康检查、模型发现；
   - 记录安装来源、版本、时间、风险确认；不自动开机启动。
5. **失败/取消**：清理临时文件；不留下半安装；可重试/改为手动。

**FR-EXT-7.3 安装 Recipe（声明式）**

```ts
interface ConnectorInstallRecipe {
  kind: 'brew' | 'download' | 'docker' | 'manual'
  url?: string
  sha256?: string
  command?: string
  uninstall?: string
  docsUrl: string
  risk: 'medium' | 'high'
  requiresAdmin?: boolean
}
```

- Recipe 只允许**预置连接器**提供，不允许用户输入任意脚本执行。
- 命令必须可展示、可复制、可审计；AI Bobby 不隐藏参数。
- 不自动更新；外部工具升级由用户决定。
- 若来源没有可信 recipe，只提供 `打开官网/复制命令`，不执行。

**FR-EXT-7.4 WBI 场景**

- WBI 内置来源继续显示 `维护中`，AI Bobby 不绕过官方渠道。
- 在 WBI 维护页提供**可选解锁路径**：
  > WorkBuddy AI 官方渠道会拦截非官方客户端。你可以安装/连接第三方 **WorkBuddy2API Hub** 解锁该来源；它不在 AI Bobby 安装包内，可能违反上游条款、触发风控或导致账号受限，风险由你承担。
- 操作：
  - 未检测到：`安装并连接 WorkBuddy2API Hub` / `检测已有安装` / `暂不`；
  - 已检测到：`检测到 WorkBuddy2API Hub · 连接`；
  - 连接后模型以 `hub/` 前缀出现，**不伪装成官方 `wbi/`**；WBI 内置来源仍保持禁用。
- 高风险确认必须明确写出：第三方代码、账号风控、进程/凭据访问、网络暴露。
- AI Bobby 不替用户做“绕过”决策；只提供工具与知情流程。

**FR-EXT-7.5 已安装/托管进程**

- 若由 AI Bobby 启动：显示 PID/端口/日志尾/停止/重启；不做开机自启（除非用户显式开启）。
- 退出 AI Bobby 时默认**不停止**外部工具（用户可能仍在用）；提供“退出时停止”选项。
- 卸载只移除 AI Bobby 的启动配置；外部工具本体由用户/包管理器卸载。

### 5.2 连接器/插件模型（FR-PLUGIN）

**FR-PLUGIN-0 分层边界**

- **L1 外部 HTTP 来源**（0.3.0）：只连 OpenAI/Claude/Gemini 兼容面，零代码执行。
- **L2 受监督 CLI 桥**（0.3.1）：只启动官方 CLI，健康/日志/超时/单实例由 AI Bobby 监管。
- **L3 外部插件**（0.4+，本次不做）：独立进程 + 权限清单 + worker 隔离；禁止进程内 eval。

**FR-PLUGIN-1 声明式连接器**

- 0.3 不引入任意 JS 插件运行时。
- 连接器是 **manifest**：
  ```ts
  interface ConnectorManifest {
    id: string
    name: string
    kind: 'local-gateway' | 'custom-openai' | 'official-cli'
    protocols: Array<'chat' | 'responses'>
    defaultPrefix: string
    detect?: { ports?: number[]; healthPath?: string; modelsPath?: string }
    install?: ConnectorInstallRecipe
    launch?: { command?: string; healthPath?: string }
    risk: 'low' | 'medium' | 'high'
    docsUrl?: string
  }
  ```
- 内置预设：Magpie、CCX、WorkBuddy2API Hub、Custom。
- 外部工具的运行、升级、配置由用户负责；AI Bobby 只连 HTTP。

**FR-PLUGIN-2 可选外部适配器（P2）**

- 若未来支持第三方适配器，必须是独立进程 + 本地 HTTP/JSON-RPC 契约；AI Bobby 不 `eval`、不动态加载二进制。
- 插件需签名/来源说明；默认关闭；风险提示。
- 0.3.0 只做 L1 manifest + HTTP，不做 SDK；L2 只做官方 CLI 监督，不做通用进程插件。

### 5.3 官方桥（FR-OFFICIAL）

**FR-OFFICIAL-1 CodeBuddy 导入目标（0.3.0）**

- 目标：`~/.codebuddy/models.json`（用户级；项目级可选）。
- 写入 AI Bobby 模型条目：`id`、`name`、`url`、`apiKey`、`toolCalling`、`vision`、`maxInputTokens`、`maxOutputTokens`。
- 只增删 AI Bobby 自己的 provider，保留用户已有模型；备份/原子写/历史/回滚。
- 验收：CodeBuddy 选择 AI Bobby 模型并完成一次对话（已手工验证原型）。

**FR-OFFICIAL-2 CodeBuddy Provider（0.3.1）**

- 检测官方 CLI `codebuddy` 是否安装、是否登录；不读取/复制 token。
- 优先用 ACP/SDK；原型可用 `--print --output-format stream-json`。
- 工具全部禁用/代理权限；空工作目录；超时/取消；不执行用户项目文件。
- 请求由官方 CLI 发出，不伪造客户端头。
- 仅承诺 CodeBuddy 模型；WBI 不作为验收项。

**FR-OFFICIAL-3 WorkBuddy CN / WBI（0.3.1，条件项）**

- WorkBuddy CN 与 CodeBuddy 共用 `copilot.tencent.com`，在真实账号验证通过后可做官方桥。
- WBI 继续禁用；不伪造、不绕过；等待官方渠道/API。
- 若验证失败，保持 `Maintenance` 提示，不做 workaround。

### 5.4 路由与失败处理（FR-ROUTE）

**FR-ROUTE-1 候选规划与提交语义**

- 每个请求生成有序候选：内置来源 → 外部来源（按来源优先级/健康/配置/信任级 tie-break）。
- **preflight**：上游响应先缓冲，确认首个内容事件可提交后才向客户端写出；提交前可安全换来源。
- 候选在“响应尚未提交”前可切换；一旦向客户端写出首个事件，不再切换。
- 来源级 fallback 列表（P1）；协议不同（Chat/Responses）时只在可转换范围内 fallback。

**FR-ROUTE-2 失败分类**

| 类别 | 例子 | 行为 |
|---|---|---|
| auth | 401 | 刷新/换账号一次；不重复无限 |
| quota/credit | 402/额度 | 冷却来源/账号 |
| rate_limit | 429/Retry-After | 冷却并换候选 |
| prompt_refused | WBI 11-128、内容策略 | **不冷却账号、不换号重试**；原样提示 |
| model_missing | 404 模型 | 标记模型不可用，不冷却来源 |
| upstream | 5xx/网络 | 短暂退避 |
| external_unhealthy | 健康检查失败 | 暂停来源 |

- WBI `11-128` 与 `11140` 按 **code** 区分；`request illegal` 不能单独作为判据。
- 外部来源错误必须显示来源名，不能伪装成 AI Bobby 内部错误。

**FR-ROUTE-3 会话粘性**

- 同一会话（session id / prompt_cache_key / 请求头）在 5 分钟内优先同一账号/来源；避免 prompt cache 抖动。
- 会话粘性按上下文桶隔离，避免大上下文请求污染小上下文请求。
- 会话粘性不阻止故障切换；失败时允许换候选。

**FR-ROUTE-4 上下文路由（P1）**

- 根据模型 `contextWindow` / `maxOutputTokens` 过滤候选；未知能力保守处理。
- 外部模型无 context 时允许手动配置；不猜测。

### 5.5 观测、账本与目录（FR-OBS / FR-CATALOG）

**FR-OBS-1 来源健康与画像**

- 每来源：状态（online/degraded/offline/maintenance）、模型数、最近刷新、最近错误、请求成功率、p50/p95 延迟、最近一次健康探测。
- 画像以稳定来源 ID 为主键；重排/改名/换 Key 不丢历史。
- 来源页展示；概览卡片显示外部来源数量。

**FR-OBS-2 请求日志**

- 每请求记录：时间、来源、模型、状态、延迟、错误分类、requestId、上游 status/渠道；不记录 prompt/response 正文、Key。
- 保留最近 N 条（默认 200/来源）；可清空/导出（P1）。
- 日志脱敏在日志侧完成，fail-open 不阻断请求。

**FR-OBS-3 使用账本（P1）**

- JSONL：时间、来源、模型、账号、input/output/cache/reasoning tokens、延迟、状态、错误类。
- 按天轮转；不记录正文/Key。
- 设置/概览展示最近 24h 汇总；不做计费承诺。

**FR-CATALOG-1 模型能力面（P1）**

- 外部来源 `/v1/models` 缓存；模型上下文/最大输出缺失时允许手动配置；未知能力保守处理。
- models.dev 仅补 context/价格/名称，不进入 Codex 语义白名单。
- 上下文路由：请求估算超过来源/模型能力时过滤，不让大请求打到小窗口来源。

### 5.6 UI（FR-UI）

**FR-UI-1 来源列表**

- 侧栏分组：`内置来源` / `外部来源`；外部来源显示 `External` 小徽标。
- 来源项显示健康点；离线来源置灰但可进入查看/重连。
- `+ 添加来源` 入口固定在来源列表底部。

**FR-UI-2 添加来源**

- 三步：选择类型 → 预检 → 确认/风险。
- 预检结果明确：发现/未发现、模型数、健康、需要 Key。
- 高级选项折叠：前缀、协议、代理、手动模型。

**FR-UI-3 外部来源页**

- 头部：来源名、`External`、健康、模型数、重连、外部管理链接。
- 模型表复用现有表格；状态/延迟/错误分类。
- 空状态：未发现模型、未配置 Key、外部工具未启动。

**FR-UI-4 风险弹窗**

- 文案明确、不可预勾选；按钮 `取消` / `我已了解并连接`。
- 高风险预设（Hub/WBI）使用 warning 色；低风险（本地 Ollama）普通。

**FR-UI-5 设置**

- “连接器”区块：外部来源列表、添加、诊断、清除风险确认（P2）。
- 代理按来源；外部来源默认继承全局。

**FR-UI-6 i18n**

- 所有新增文案中英文；禁止新增只有中文的 UI 字符串。
- 外部来源名称/模型名等专有名词保留原文。

### 5.7 导入（FR-IMPORT）

- 外部来源模型可导入 Codex/Claude/DSH/VS Code（与内置同一套 importer）。
- CodeBuddy 导入目标（0.3.0）。
- Codex 只写有 `CODEX_METADATA` 的模型；外部模型默认跳过并在导入抽屉提示。
- WorkBuddy 导入排除自身分组；外部来源不参与该排除。
- 导入预览显示来源徽标（内置/外部），避免用户误以为外部模型来自内置。

---

## 6. 技术架构

### 6.1 动态来源

```text
packages/sources/
  source.ts          SourceConfig / SourceStatus / SourceCapabilities
  registry.ts        builtin + external + official，动态 id
  external-http.ts   OpenAI Chat/Responses HTTP adapter
  detect.ts          port/health/models 探测
  presets/
    magpie.ts
    ccx.ts
    workbuddy2api-hub.ts
    custom.ts
```

- `ProviderId` 从 union 扩展为 `string`，内置常量保留：
  `opencode | workbuddy | wbi | nvidia | ext:<slug> | official:codebuddy`。
- `SourceConfig` 持久化到 `settings.json` v2；迁移旧配置。
- `ExternalHttpProvider` 实现现有 `ProviderAdapter` 契约；能力/模型懒加载。
- 网关、注册表、模型表、导入器全部按动态来源工作；旧 4 来源行为不变。

### 6.2 路由

```text
Gateway request
  -> resolve model/source
  -> build candidates (source priority, health, affinity)
  -> attempt candidate (hold response)
  -> classify failure
  -> retry/next or commit
```

- `packages/gateway/src/router.ts`：候选规划、失败分类、hold-before-commit。
- 先实现单来源内候选 + 跨外部来源；跨内置/外部 fallback 作为 P1。
- 失败分类集中，不在各 adapter 内散落。

### 6.3 模型目录

- 内置来源目录保持现状；外部来源 `/v1/models` 缓存。
- `packages/catalog`（P1）：models.dev/供应商字段补 context/price/名称；**不用于 Codex 语义字段**。
- 外部模型能力默认保守；用户可覆盖。

### 6.4 凭据与安全

- `settings.json` 0600；外部 Key 只在本机；不写日志/诊断。
- 远程 URL 必须 HTTPS；本地默认 loopback。
- SSRF 防护：拒绝私有网段/metadata/重定向到非白名单（远程来源）。
- 不静默执行外部工具；安装/启动命令必须逐次确认并展示；不读取 Keychain/第三方 token。
- 风险确认写入配置；可审计。

### 6.5 官方桥

- CodeBuddy CLI：外部二进制检测 + `--print stream-json` 原型；后续 ACP/SDK。
- 工具禁用/权限代理；空 cwd；超时取消。
- 不把 CLI 依赖塞进 Electron 安装包；检测/引导安装。

---

## 7. 验收标准

### AC-EXT-1 添加 Magpie

- Given Magpie 在 `127.0.0.1:3425`，When 添加来源，Then 预检显示模型数/健康，确认风险后侧栏出现 `Magpie`，模型出现在总清单，ID 前缀 `mg/`。
- When 停掉 Magpie，Then 来源变 offline，内置来源仍可用；重连后恢复。

### AC-EXT-2 添加 Hub/CCX

- 预检识别端口/健康/模型；写错端口给可操作错误；未确认时不得安装/启动外部工具。
- 未安装 Hub 时出现“安装并连接”入口；安装前展示来源/校验/命令与风险；取消后无残留。
- 若 recipe 需要管理员权限，安装前必须提示“将自动请求管理员授权”；系统授权取消后中止且无残留。
- 已运行 Hub 时直接提示连接，不重复安装。
- 风险弹窗必须主动勾选；未勾选不能连接。

### AC-EXT-3 自定义上游

- 输入合法 URL/Key 后模型可用；非法 URL/证书错误被拒绝；Key 不出现在日志/状态。

### AC-EXT-4 导入

- 外部模型可导入 Claude/DSH/VS Code；Codex 只写有元数据的模型并显示 skipped。
- 外部来源只影响自己的配置，不覆盖内置来源。

### AC-OFFICIAL-1 CodeBuddy 导入

- 写入 `~/.codebuddy/models.json`，保留其他模型；CodeBuddy 选择 AI Bobby 模型完成对话。

### AC-OFFICIAL-2 CodeBuddy Provider

- 检测 CLI/登录状态；未登录给官方登录引导，不读 token。
- 请求由官方 CLI 发出；工具禁用；连续多轮稳定。

### AC-ROUTE-1 失败分类

- 401/429/402/404/5xx/11-128 分别按表处理；11-128 不冷却账号、不换号重试。
- 响应提交后不再切换。

### AC-OBS-1

- 来源页显示健康/成功率/延迟/最近错误；日志无正文/Key。

---

## 8. 非目标

- 不做任意代码插件市场/动态加载第三方二进制。
- 不静默/捆绑安装 Magpie/CCX/Hub；经用户确认可协助安装/启动/连接。
- 不做 WBI 绕过、客户端指纹伪造、进程内存取 token。
- 不做 LAN 共享/多用户/公网网关。
- 不把 models.dev 当 Codex 语义元数据。
- 不在 0.3.0 做 60+ 客户端适配；只做 CodeBuddy 导入 + 现有客户端。

---

## 9. 指标

| 指标 | 目标 |
|---|---|
| 添加外部来源 → 首个模型可用 | ≤ 2 分钟 |
| 预设预检成功率 | ≥ 80% |
| 未安装 → 完成安装并连接 | ≥ 50%（用户确认后） |
| 检测到已有安装 → 连接 | ≥ 80% |
| 外部来源用户 D7 留存提升 | +15% |
| 0.3.0 发布 4 周内新用户外部来源连接率 | ≥ 25% |
| 外部来源错误率 | < 5% |
| 外部来源相关支持工单 | < 5% 用户 |
| CodeBuddy 导入成功率 | ≥ 95% |

---

## 10. 里程碑（建议）

| 周 | 交付 |
|---|---|
| W1 | 本 PRD 审阅；外部来源/风险/来源页设计稿；0.2.5 收尾 |
| W2–W3 | 动态 Source 架构、Generic OpenAI 上游、健康检查 |
| W4 | Magpie/CCX/Hub 预设、风险确认、来源管理 UI |
| W5 | 导入适配、动态来源 i18n、空/错误状态 |
| W6 | CodeBuddy 导入目标 + 内部 dogfood |
| W7 | 0.3.0 beta（外部来源）；修复 |
| W8 | 0.3.0 候选；CodeBuddy Provider 原型进入 0.3.1 |

> 所有版本仍需人类本机验收 + 明确发版指令；不得自动 tag/release。

---

## 11. 风险与开放问题

1. **动态来源改造面大**：models/importers/sidebar/gateway 都受影响；建议 feature flag + 先内部来源兼容测试。
2. **外部工具质量/条款**：UI 必须标明来源与风险；不承诺可用性。
3. **SSRF/安全**：远程 URL 校验、重定向、metadata 地址必须拦。
4. **CodeBuddy 条款/工具权限**：只用官方 CLI；禁工具；不读 token。
5. **路由复杂度**：先做失败分类 + 单来源候选，跨来源 fallback 分阶段。
6. **插件边界**：0.3 只做 manifest，避免供应链/沙箱问题。
7. **命名**：外部来源是否显示 Magpie/CCX/Hub 品牌；风险文案是否按预设分级。
8. **0.3.0 vs 0.3.1 拆分**：需拍板。

---

## 12. 待拍板

- [ ] 是否按 0.3.0（外部来源）/ 0.3.1（官方桥）拆分？
- [ ] 外部来源预设首批：Magpie / CCX / WorkBuddy2API Hub / Custom，是否全上？
- [ ] 风险弹窗文案与“必须主动勾选”是否认可？
- [ ] CodeBuddy 导入目标是否进 0.3.0？
- [ ] 路由/usage/catalog 哪些进 0.3.0，哪些放 0.3.1？
- [ ] 是否允许在公开 UI 显示第三方品牌名？（建议显示来源名 + External 徽标）
- [x] 管理员权限：安装前提示；需要时自动请求系统授权，用户可取消。
- [ ] 安装执行边界：默认“下载+展示命令，由用户执行”，是否允许“AI Bobby 代为执行”作为二次确认选项？
- [ ] WBI 维护页是否直接推荐 WorkBuddy2API Hub，还是只放在“外部来源”里由用户发现？
- [ ] 已安装但未运行的外部工具，AI Bobby 是否允许启动/停止/开机自启？
