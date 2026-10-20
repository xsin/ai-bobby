# CodeBuddy Code（`@tencent-ai/codebuddy-code`）调研

- 调研日期：2026-10-20
- 对象：npm `@tencent-ai/codebuddy-code` 2.170.0（2026-10-19 发布）
- 目的：判断 AI Bobby 能否借助这个**官方 CLI**获得 WorkBuddy AI / CodeBuddy 模型，以及能否把它做成导入目标
- 结论性质：包本身是腾讯云官方、MIT 许可，能力足够；**“作为 AI Bobby 的导入目标”已实测可行，“作为官方模型桥”可行性高但需真实账号验证**

---

## 1. 结论摘要

1. **可以做导入目标（已实测）。**
   CodeBuddy Code 的 `~/.codebuddy/models.json` 支持自定义 OpenAI 兼容 `url` / `apiKey`。
   我们在临时 HOME 中把模型指到 AI Bobby 的 `/v1/chat/completions`，执行：

   ```bash
   codebuddy --model wb/deepseek-v4.1-flash \
     --print --output-format json "reply exactly OK"
   ```

   返回 `OK`（约 2.6s，约 22.9k input tokens）。这说明 CodeBuddy 可以作为 AI Bobby 的
   **第六个导入目标**，让 CodeBuddy 使用 AI Bobby 聚合的 OpenCode / WorkBuddy / NVIDIA 模型。

2. **可以做 CodeBuddy 官方模型桥（高可行，需真机验证），但不等于 WBI 桥。**
   CodeBuddy 与 WorkBuddy 共享 agent 引擎，但是两个产品；CodeBuddy CLI 默认连
   `www.codebuddy.ai`，WorkBuddy AI 连 `www.workbuddy.ai`，账号/套餐不保证互通。
   CodeBuddy Code 支持：
   - `--print --output-format stream-json`：非交互、可被父进程驱动；
   - `--acp`：Agent Client Protocol，stdio / streamable-http；
   - `--serve`：本地 HTTP 服务，含 `/api/v1/runs` + SSE；
   - `@tencent-ai/agent-sdk`：官方 SDK，`query()` 可编程控制会话与工具权限。

   如果用户已在官方 CLI 登录（或提供官方 API Key），AI Bobby 可以把它当 provider，
   由**官方 CLI 本身**发请求，而不是伪造客户端头。这能稳定接入 **CodeBuddy 模型**；
   CN 的 WorkBuddy 与 CodeBuddy 共享 `copilot.tencent.com`，可能共享账号/套餐；
   **INTL 的 WorkBuddy AI 是独立后端，CodeBuddy CLI 不能直接当 WBI 桥。**

3. **不建议把 CLI token 抽出来直接调 WBI。**
   这仍然是把官方凭据用于非官方请求，和 `workbuddy2api-hub` 的身份仿冒属于同一类风险。
   正确做法是让 CLI 进程/服务发请求，AI Bobby 只做编排。

4. **战略价值高于“再加一个来源”。**
   CodeBuddy 既能作为 AI Bobby 的上游，又能作为 AI Bobby 的下游：
   - 上游：CodeBuddy 官方模型 → AI Bobby 统一网关；
   - 下游：CodeBuddy 的模型选择器 → 指向 AI Bobby。
   这是竞品（hub / magpie）没有的**双向官方集成**，可作为 0.3 的差异化主线。

---

## 2. 官方性与许可

| 项 | 值 |
|---|---|
| npm 包 | `@tencent-ai/codebuddy-code` |
| 最新版本 | `2.170.0`（2026-10-19） |
| 描述 | “Use CodeBuddy, Tencent's AI assistant, right from your terminal…” |
| 主页 | <https://cnb.cool/codebuddy/codebuddy-code> |
| License | MIT（`LICENSE.txt`，Copyright 2023 Tencent Cloud） |
| 维护者 | `muxiangqiu`、`code_faker`（npm maintainers） |
| 相关 SDK | `@tencent-ai/agent-sdk` 0.3.285，MIT |

判断：**腾讯云官方 CLI**，不是第三方逆向项目；发布节奏快（每日 dev/next，稳定版 2.170.0）。
包体较大（安装约 102 个依赖，含 sandbox / PTY 原生二进制），对 Electron 打包有成本。

---

## 2.1 WorkBuddy 与 CodeBuddy 的关系

结论：**两个独立产品，共享同一套 agent 引擎/运行时；CLI 不是完全通用。**

| 维度 | WorkBuddy | CodeBuddy |
|---|---|---|
| 品牌/产品 | WorkBuddy 桌面 AI 助手（CN / AI INTL） | 腾讯云 CodeBuddy 编码助手（IDE/CLI） |
| INTL 后端 | `https://www.workbuddy.ai` | `https://www.codebuddy.ai`（CLI 默认 `product.json`） |
| CN 后端 | `https://www.workbuddy.cn` / `https://copilot.tencent.com` | `https://copilot.tencent.com`（`product.internal.json`） |
| 本地登录 | `CodeBuddyExtension/.../workbuddy-desktop[-ai].info` | `~/.codebuddy` 登录/API Key |
| 运行时 | 包内包含 `apps/workbuddy-desktop`、`WorkBuddySandboxHelper` 等宿主代码 | `@tencent-ai/codebuddy-code` agent-cli |

证据：
- 本包 `dist-server/types/...` 多处引用 `apps/workbuddy-desktop`、`WorkBuddySandboxHelper`、
  `workbuddy-server`，说明 WorkBuddy 桌面是 agent-cli 的宿主之一。
- 包内有 `dist/codebuddy-lite-wb.mjs`，端点为 `https://www.workbuddy.cn` /
  `copilot.tencent.com`，是 WorkBuddy CN 的 lite 构建。
- `product.json` 的 CLI endpoint 是 `https://www.codebuddy.ai`；
  `product.internal.json` 是 `https://copilot.tencent.com`。
- 没有发现 CodeBuddy CLI 默认支持 `www.workbuddy.ai` 的产品配置。

因此：
- **CN**：WorkBuddy CN 与 CodeBuddy 共用 `copilot.tencent.com`，账号/套餐可能互通；
  用 CodeBuddy CLI 访问 CN 模型有较高可行性，但仍需真实账号验证。
- **INTL**：WBI（workbuddy.ai）与 CodeBuddy（codebuddy.ai）是不同产品后端；
  CodeBuddy CLI **不能直接**当作 WBI 桥，除非官方提供账号互通/产品配置。
- **通用的是引擎/入口，不是账号与服务**；不要向用户承诺“一个 CLI 通吃两个产品”。

## 3. CLI 能力

### 3.1 运行模式

| 模式 | 入口 | 适合 AI Bobby |
|---|---|---|
| 交互 TUI | `codebuddy` | 用户自己用 |
| 非交互 | `codebuddy -p/--print` + `--output-format text/json/stream-json` | **provider 兜底**，每请求起进程 |
| ACP | `codebuddy --acp [--acp-transport stdio|streamable-http]` | **provider 首选**，持久会话/工具权限可控 |
| HTTP 服务 | `codebuddy --serve --port …` | 可用，但暴露文件/进程/PTY API，需严格隔离 |
| SDK | `@tencent-ai/agent-sdk` 的 `query()` | 可嵌入 Electron main，控制最细 |

`--print` 支持：
- `--input-format text|stream-json`
- `--output-format text|json|stream-json`
- `--include-partial-messages`（原始 SSE 增量）
- `--model`、`--effort`、`--max-turns`、`--fallback-model`
- `--tools` / `--allowedTools` / `--disallowedTools`
- `--permission-mode`、`-y/--dangerously-skip-permissions`
- `--session-id` / `--resume` / `--fork-session`
- `--system-prompt` / `--append-system-prompt`
- `--settings`、`--mcp-config`
- `--serve` 的 `/api/v1/runs`（POST + SSE stream）

### 3.2 模型

`--help` 列出的内置模型包括：

```text
default-model, fast-model, balanced-model, primary-model, deep-model,
hy4-preview, hy3, deepseek-v4.1-flash, gpt-6-astra, gpt-5.6-sol,
gpt-5.6-terra, gpt-5.6-luna, gpt-5.5, gpt-5.4, gemini-3.5-flash,
glm-5.3-flash, glm-5.3, glm-5.2, kimi-k3, kimi-k2.6, kimi-k2.8-preview
```

这些与 WBI / WorkBuddy 目录高度重叠，说明 CodeBuddy 账号可以访问同一批模型；
实际权限取决于用户账号/地区/套餐，需要真机验证。

### 3.3 自定义模型

`~/.codebuddy/models.json`（项目级 `.codebuddy/models.json` 优先）：

```json
{
  "models": [{
    "id": "wb/deepseek-v4.1-flash",
    "name": "AI Bobby DeepSeek",
    "vendor": "AI Bobby",
    "apiKey": "${AI_BOBBY_API_KEY}",
    "url": "http://127.0.0.1:46890/v1/chat/completions",
    "maxInputTokens": 1048576,
    "maxOutputTokens": 65536,
    "supportsToolCall": true,
    "supportsImages": false
  }],
  "availableModels": ["wb/deepseek-v4.1-flash"]
}
```

- 只支持 OpenAI 接口格式；`url` 必须是完整 `/chat/completions` 路径。
- 支持 `${ENV_VAR}` 引用 Key。
- 支持 `api: "openai-responses"`（url 用 base URL）。
- 支持 `relatedModels`（lite/reasoning/vision/longContext/subagent）。

**实测**：临时 HOME + 上述 models.json + `--print`，AI Bobby 返回 `OK`，证明导入目标可行。

---

## 4. 认证

| 方式 | 说明 |
|---|---|
| 交互登录 | 首次 `codebuddy` 走 `/login`；凭证存 `~/.codebuddy` |
| `CODEBUDDY_API_KEY` | 官方 API Key；国际版不设环境，国内版 `CODEBUDDY_INTERNET_ENVIRONMENT=internal`，iOA 为 `ioa` |
| `CODEBUDDY_AUTH_TOKEN` | 预取 OAuth Bearer Token，优先级最高 |
| `apiKeyHelper` | 企业 OAuth Client Credentials 脚本，5 分钟缓存 |
| 第三方模型 | `CODEBUDDY_API_KEY` + `CODEBUDDY_BASE_URL`，直接请求第三方 OpenAI 兼容服务 |

未登录执行 `--print` 会明确报：

```text
Authentication required. Please use /login command to sign in to your account
```

因此 AI Bobby 可以做“检测 CLI 是否存在 + 是否已登录”的引导，但不能替用户完成扫码/登录。

---

## 5. 作为 AI Bobby Provider 的可行性

### 5.1 推荐路径：ACP 或 SDK，而不是每请求起 CLI

| 方案 | 优点 | 风险/成本 |
|---|---|---|
| `codebuddy --print --output-format stream-json` | 最简单，事件 JSON 可解析 | 每请求冷启动、约 2–4s；工具/文件权限默认开启 |
| `codebuddy --acp` | 持久会话、流式、工具权限可代理 | 需要实现 ACP 客户端（JSON-RPC/stdio） |
| `@tencent-ai/agent-sdk` `query()` | 官方 TypeScript SDK，`canUseTool`/`allowedTools` 可禁用工具，最可控 | 依赖大、SDK Preview，Electron 打包成本高 |
| `codebuddy --serve` `/api/v1/runs` | HTTP/SSE 简单 | 服务端含文件/进程/PTY API；必须 loopback + 密码 + 隔离 cwd |

**建议：**
- 0.3 先用 **外部 CLI + `--print stream-json`** 做原型，验证 WBI 模型可用；
- 稳定后切 **ACP** 或 **SDK**，把工具全部 deny，只走纯对话；
- 不要在 AI Bobby 内 `--serve --auth none`，也不要把该端口暴露到 LAN。

### 5.2 请求/响应映射

- CodeBuddy 的 `stream-json` 事件可映射到 AI Bobby 的 CanonicalEvent（text/thinking/tool/usage/result）。
- 需要处理：system-reminder、memory、skills 注入；纯对话模式应关闭这些（`settingSources: []` / 空项目目录 / `--system-prompt`）。
- CodeBuddy 是 Agent，不只是 chat：即使用户只问一句话，也可能带工具/文件上下文；AI Bobby 必须显式限制：

  ```text
  --disallowedTools Bash,Write,Edit,Read,Glob,Grep,... 
  --permission-mode dontAsk
  --add-dir <empty-temp-dir>
  ```

  或在 SDK 中 `allowedTools: []` / `canUseTool: () => deny`。

### 5.3 是否能解决 WBI 11-128？

**不能直接下结论“能”。** 需要区分两个产品：

- **CodeBuddy 模型**：由官方 CLI 发请求，属于官方客户端；AI Bobby 只做进程/协议桥，
  不伪造头。这个方向可行，需真机验证。
- **WorkBuddy AI（INTL）**：后端是 `www.workbuddy.ai`，CodeBuddy CLI 默认产品配置
  是 `www.codebuddy.ai`，没有证据表明两者账号/套餐互通。**CodeBuddy CLI 不是
  已验证的 WBI 桥**；不要把它宣传成 WBI 解决方案。
- **WorkBuddy CN**：与 CodeBuddy 共用 `copilot.tencent.com`，理论上更可能共享账号；
  仍需用真实账号测试。

真正能确认的路径只有：
1. 官方 WorkBuddy 客户端/未来官方 API；
2. 官方明确允许 CodeBuddy CLI 使用 WBI 账号/套餐；
3. 真实账号实测通过。

在此之前，AI Bobby 对 WBI 的产品策略仍是：**不伪造、不绕过，明确提示需要官方客户端**。

## 6. 作为导入目标的可行性（已实测）

AI Bobby 新增 `CodeBuddyImporter`：

- 目标：`~/.codebuddy/models.json`（用户级）或项目级 `.codebuddy/models.json`（可选）。
- 写入：只增删 AI Bobby 自己的模型条目；保留用户已有模型；`availableModels` 合并。
- 字段：`id`（网关 ID）、`name`（显示名）、`vendor: "AI Bobby"`、`url: http://127.0.0.1:46890/v1/chat/completions`、`apiKey`（网关 Key）、`supportsToolCall` / `supportsImages` / `maxInputTokens` / `maxOutputTokens`。
- 可选：`api: "openai-responses"` + base URL，如果 CodeBuddy 用 Responses。
- 备份 / 原子写 / 历史 / 回滚沿用现有 importer 框架。
- 检测：`~/.codebuddy` 或 PATH 上的 `codebuddy`。

价值：
- CodeBuddy 用户可以把 AI Bobby 的 OpenCode / WorkBuddy / NVIDIA 模型直接选进 CodeBuddy；
- 与现有 VS Code / Codex / Claude / DSH 导入形成“官方客户端全覆盖”；
- 实现成本低（一个 models.json importer + UI 卡片），风险低。

---

## 7. 建议的 0.3 功能（按优先级）

### P0：CodeBuddy 导入目标

- 新增 importer + 导入抽屉卡片 + 文案（“CodeBuddy Code / models.json”）。
- 检测 CLI 是否安装；未安装给官网链接，不强制。
- 验收：CodeBuddy 选择 AI Bobby 模型并完成一次对话（已手工验证）。

### P0：CodeBuddy 官方 Provider（先做 CodeBuddy 模型，不承诺 WBI）

- 新增 `codebuddy` provider（`cbc/` 前缀），检测外部 CLI + 登录状态。
- 原型用 `--print --output-format stream-json`，映射文本/usage；
- 稳定后切 ACP/SDK，禁工具、空 cwd、超时/取消。
- 验收：CodeBuddy 模型在 AI Bobby 中可用，且不是伪造头；连续多轮稳定。
  WBI 是否可用需单独验证，不能作为该功能的验收前提。

### P1：CodeBuddy 登录引导 / 诊断

- 设置页显示“CodeBuddy CLI：已安装 / 未登录 / 已登录（用户昵称）”；
- 提供“打开官方登录”按钮（不代填、不读 token）；
- 错误分类：未安装 / 未登录 / 套餐无权限 / 11-128 / 11140。

### P1：CodeBuddy API Key 直连（如果官方开放）

- 若官方 API 提供 OpenAI 兼容端点，支持用户填 `CODEBUDDY_API_KEY` + base URL；
- 这是比订阅 CLI 更稳定的方式，但需要官方文档确认，不能靠猜。

### P2：CodeBuddy 模型目录同步

- 读取 CodeBuddy 的模型列表/配置，作为目录参考；
- 不把 CodeBuddy 的内部模型 ID 当作 AI Bobby 的 Codex 元数据。

---

## 8. 风险与边界

1. **条款风险**：订阅账号用于程序化 API 是否被允许，需官方条款确认；API Key 场景更清晰。
2. **工具执行风险**：CodeBuddy 是 Agent，默认能读写文件/执行命令；AI Bobby 必须禁工具或代理权限，不能直接跑在用户项目目录。
3. **打包成本**：CLI 102 依赖 + 原生 sandbox/PTY；建议“检测外部安装 + 可选下载”，不要默认塞进 Electron。
4. **稳定性**：CLI 更新快（每日 dev），`stream-json`/ACP schema 可能变；需要版本检测与降级。
5. **不要做**：抽取 CLI token 直接调 WBI、伪造官方头、读官方客户端内存、把 `--serve` 无鉴权暴露。
6. **不是万能**：CodeBuddy 账号本身也可能被限流/限制；它只是把“非官方请求”变成“官方客户端请求”，不保证所有账号都有 WBI 模型权限。

---

## 9. 参考

- npm：<https://www.npmjs.com/package/@tencent-ai/codebuddy-code>
- 官方主页：<https://cnb.cool/codebuddy/codebuddy-code>
- 包内文档：
  - `dist/web-ui/docs/en%2Fcli%2Fmodels.md`（models.json）
  - `dist/web-ui/docs/en%2Fcli%2Facp.md`（ACP）
  - `dist/web-ui/docs/en%2Fcli%2Fhttp-api.md`（`--serve` REST/SSE）
  - `dist/web-ui/docs/en%2Fcli%2Fsdk.md`（Agent SDK）
  - `dist/web-ui/docs/en%2Fcli%2Fiam.md`（认证）
- SDK：<https://www.npmjs.com/package/@tencent-ai/agent-sdk>
- 本机实测：`codebuddy --version` = 2.170.0；临时 HOME + AI Bobby custom model → `--print` 返回 `OK`。
