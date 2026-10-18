# AI Bobby 产品需求文档（PRD）

- 当前版本：v0.2.1（main，验收中）
- 日期：2026-10-18
- 状态：**v0.2.1 验收中；未经用户本机确认不发版**
- 关联：[tech.md](./tech.md)、[handsoff.md](../handsoff.md)、[README.md](../README.md)
- 落地页 PRD：[prd-landing.md](./prd-landing.md)

---

## 1. 产品定义

AI Bobby 是一个**只监听本机的 AI 服务网关桌面应用**：

- 把 OpenCode 免费模型、WorkBuddy 国内版、WorkBuddy AI 国际版收敛成一个
  `127.0.0.1:46890` 端点；
- 同时提供 OpenAI Chat Completions、OpenAI Responses、Anthropic Messages 三种协议面；
- 桌面控制面板管理模型、账号、导入、设置和更新；
- 所有凭据与数据留在本机，不云托管、不多用户、不转售上游访问。

### 一句话

> 三个来源，一个本机端点，一把 Key，三种协议，一键导入。

---

## 2. 目标用户

| 用户 | 痛点 | 产品价值 |
|---|---|---|
| 同时用 Codex / Claude Code / WorkBuddy 的开发者 | 每个客户端各配代理、Key、账号 | 一个端点兼容三种协议 |
| 关注隐私的本地 AI 用户 | 不希望会话/Key 上云 | 回环地址、无遥测、本机账号库 |
| 独立开发者 / OSS 作者 | 免费模型分散、配置繁琐 | OpenCode 免费池 + 一键导入 |
| WorkBuddy 多账号用户 | 单账号额度/限流不够用 | 多账号 round-robin + 失败切换 |

---

## 3. 模型来源

| 来源 | 分组 | provider id | 登录 |
|---|---|---|---|
| OpenCode 免费池 | `OpenCode` | `opencode` | 无需登录 |
| WorkBuddy 国内版 | `WorkBuddy` | `workbuddy` | 官方登录页 + state/poll |
| WorkBuddy AI 国际版 | `WorkBuddy AI` | `workbuddy-ai` | 官方登录页 + state/poll |

- 模型 id：`oc/<id>`、`wb/<id>`、`wbi/<id>`。
- 显示名：`OC.`、`WB.`、`WBI.`。
- 两个 WorkBuddy realm 的 upstream id 可重叠，必须命名空间化。

---

## 4. 当前功能范围

### FR-1 本地网关

- 默认监听 `127.0.0.1:46890`；可用 `AI_BOBBY_PORT` 覆盖（CLI/dev）。
- `GET /health`、`GET /v1/models`、`POST /v1/chat/completions`、
  `POST /v1/responses`、`POST /v1/messages`、`POST /v1/messages/count_tokens`。
- Bearer API Key；Anthropic 额外接受 `x-api-key`。
- 浏览器带 `Origin` 的请求 403；只监听回环地址。
- 请求体/并发上限；SSE 流式；错误归一化。

### FR-2 OpenAI Chat Completions

- 流式/非流式；文本、图片（模型支持时）、工具调用、usage。
- 上游 WorkBuddy 走 `/v2/chat/completions`；OpenCode 走本机代理。

### FR-3 OpenAI Responses（Codex）

- 请求：`input`、`instructions`、`tools`、`tool_choice`、`max_output_tokens`、`reasoning.effort`。
- 事件：`response.created`、`output_item.*`、`output_text.delta`、`function_call_arguments.*`、`response.completed`。
- 支持 Codex 的 `function` 工具；忽略 `web_search` 等非 function 工具。

### FR-4 Anthropic Messages（Claude Code）

- `system`、`messages`、`tools`、`tool_choice`、`max_tokens`、`stop_sequences`。
- `tool_use` / `tool_result` 与 canonical 工具调用映射。
- 事件：`message_start`、`content_block_*`、`message_delta`、`message_stop`。
- `count_tokens` 为近似值。

### FR-5 WorkBuddy 登录与多账号

- 桌面端通过内嵌 BrowserWindow 打开官方登录页；不读取桌面 App 凭据。
- `POST /v2/plugin/auth/state` → `authUrl` → 轮询 `/v2/plugin/auth/token`
  （`11217` 等待，`0` 成功）→ `/v2/plugin/login/account` 取资料。
- 同一 realm 支持多账号；账号库按 realm 存；支持启用/禁用。
- 调度：`preferred` 优先，其余按 `lastUsedAt` + round-robin。
- 已知额度为 0（billing 有 packages 且 total=0）的账号会被跳过。
- 请求失败：
  - 401：先刷新 token，再重试；失败换号。
  - 402 / 额度不足 / 429：标记冷却，流开始前换号。
  - 流已经开始：不中途换号，写错误。
- 全部账号额度不足：402；其他无可用账号：404。
- 当前没有周期性聊天 probe；“探活”是 `/v3/config` 目录 + billing 刷新。

### FR-6 OpenCode

- 自动下载平台运行时 `opencode-<os>-<arch>`，SHA-512 校验。
- 启动隔离 `opencode serve --pure` 读取 `/provider`，按 cost 字段筛免费模型。
- 聊天使用官方 `opencode run --format json`（server 路径对免费模型有 free-tier gate）。
- 文本 + 外部工具信封；图片暂不支持；原生工具目前只是 prompt 级约束。
- 没有检测缓存/周期 probe；免费模型先标 `available`。

### FR-7 一键导入

| 客户端 | 目标 | 行为 |
|---|---|---|
| WorkBuddy | `~/.workbuddy/models.json` | 合并，排除自身 `wb/` |
| WorkBuddy AI | `~/.workbuddy-ai/models.json` | 合并，排除自身 `wbi/` |
| Codex | `~/.codex/config.toml` | 标记块、base_url、bearer token、可选默认模型 |
| Claude Code | `~/.claude/settings.json` | 合并 env、默认模型 |
| DSH | `~/.dsh/profiles/<profile>/cordis.patch.yml` | 合并 `llm-pi-ai` provider，API Key 需手动配置 |

- 先 dry-run diff；写前备份；只改 AI Bobby 标记条目；幂等。
- Importer API 支持 rollback；**当前桌面 UI 未暴露回滚按钮**。

### FR-8 桌面控制面板

- 三个来源 tab：OpenCode / WorkBuddy / WorkBuddy AI。
- 模型表格：能力、状态、选择、展开详情。
- 账号条：昵称、额度、启用状态；添加账号打开官方登录。
- 全局导入 Sheet：客户端、分组、模型、默认模型、dry-run。
- 设置：主题、版本/更新、API Key/转发口。
- 底部状态条：服务状态、端口、Key 掩码、版本。
- 真实状态来自主进程 IPC，不使用 mock（浏览器预览除外）。

### FR-9 自动更新

- 启动静默检查 + 每 6 小时；设置页手动检查。
- `latest.json` + semver + SHA256；可选 Ed25519。
- 下载、解压、重签名、替换、重启；失败回滚。
- 当前 `v0.2.1` 安装通道可正常检查/下载/替换。

### FR-10 分发

- macOS ad-hoc 签名 zip（arm64/x64）。
- `install.sh` 从 GitHub Release 下载，SHA256 校验，安装到 `~/Applications`。
- gh-pages：根路径 landing + `/releases/latest/` 安装通道。
- Website workflow 部署根路径；release workflow 只更新 `releases/latest`，不覆盖 landing。

### FR-11 CLI

- `pnpm --filter @ai-bobby/cli start` 启动 46890 网关。
- `status` 查看账号/模型状态。
- `AI_BOBBY_DATA_DIR`、`AI_BOBBY_PORT` 可覆盖。
- 与桌面共用 core/gateway/workbuddy/opencode/importers。

---

## 5. 界面结构

```text
┌──────────────────────────────────────────────────────┐
│ Brand  [OpenCode] [WorkBuddy] [WorkBuddy AI]  主题 导入 │
├──────────────────────────────────────────────────────┤
│ 来源标题 / 统计 / 操作（读取模型、检测）                │
│ 账号条（WorkBuddy/WBI）                                │
│ 模型表格（antd）                                       │
├──────────────────────────────────────────────────────┤
│ 状态条：运行中 · N 模型 | 端口 | Key | 版本            │
└──────────────────────────────────────────────────────┘
```

- 主题：系统/浅色/深色（后续可能移入设置）。
- 导入：全局 Sheet，不占 tab。
- 登录：独立 BrowserWindow + 独立 session partition。

---

## 6. 当前不做 / 已知限制

- 不做云托管、多用户、公网暴露、计费/转售。
- 不转售 WorkBuddy / OpenCode 账号或额度。
- 不做无审核自动发布（Lucia 另立项）。
- Windows 打包/更新未实现。
- OpenCode 原生工具未强制沙箱；不要让不可信 prompt 驱动本机工具。
- OpenCode 图片/检测缓存未实现。
- 账号库当前 `0600` 明文；`safeStorage` 因启动时 Keychain 阻塞暂未启用。
- WorkBuddy 真实账号登录/额度联调仍需人工。
- 当前处于 v0.2.1 验收，**发版需用户本机确认**。

---

## 7. 验收

- 三个来源至少各一次真实对话；WorkBuddy 双 realm 登录/额度/切号。
- Chat / Responses / Anthropic 三种协议各完成一次真实请求。
- 导入后客户端可选中 AI Bobby 模型；重复导入 `changed:false`。
- 更新检查 → 下载 → 替换 → 重启闭环。
- 安装脚本在新机器可完成安装。
- 没有 token/Key 明文进入日志/状态。

---

## 8. 指标

- 激活：安装 → 读取模型 → 首次成功请求。
- 周活/月活；导入完成率；WorkBuddy 登录成功率。
- 更新采用率；崩溃/P0 问题数。
- 商业指标在私有 biz 仓库，不在本文档。

---

## 9. 风险

1. WorkBuddy / OpenCode 非公开接口可能随时变化；不做绕过/转售。
2. 多账号额度快照可能滞后；依赖 402/429 错误兜底。
3. 免费模型 churn；当前无 probe cache。
4. 配置写入是用户资产；必须备份/幂等/只改标记。
5. 端口冲突要明确报错，不静默换端口。
6. ad-hoc 签名未公证；Gatekeeper 可能拦截。
