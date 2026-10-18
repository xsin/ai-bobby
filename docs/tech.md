# AI Bobby 技术方案（tech）

- 当前版本：v0.2.1（main，验收中）
- 日期：2026-10-18
- 状态：**与当前实现同步；v0.2.1 验收中，发版需用户本机确认**
- 关联：[prd.md](./prd.md)、[handsoff.md](../handsoff.md)、[README.md](../README.md)
- 落地页技术方案：[tech-landing.md](./tech-landing.md)

---

## 1. 架构总览

```text
┌──────────────────────────── AI Bobby.app (Electron) ─────────────────────────────┐
│ 主进程 (apps/desktop/src/main)                                                   │
│   ├─ BrowserWindow ── preload IPC ──> React renderer                             │
│   ├─ Tray / 单实例锁 / 自动更新调度                                                │
│   ├─ AccountStore（accounts.json，0600）                                          │
│   ├─ WorkBuddy 登录 BrowserWindow（独立 partition）                               │
│   ├─ OpenCodeProvider（运行时下载 + 隔离 CLI/进程）                                 │
│   ├─ Importer 调度（dry-run / apply / rollback）                                  │
│   └─ GatewayService（主进程内启动，127.0.0.1:46890）                               │
│          ├─ ModelRegistry + ProviderAdapter                                      │
│          ├─ OpenAI Chat / Responses / Anthropic Messages codecs                  │
│          └─ WorkBuddyProvider → copilot.tencent.com / www.workbuddy.ai            │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 1.1 实现事实

- 网关**没有 fork 子进程**；当前由主进程直接 `new GatewayService(...).start()`。
- renderer 不读 `status.json`；通过 preload IPC 调主进程取快照。
- 账号库是单个 `<dataDir>/accounts.json`；token 明文，文件 `0600`。
- `safeStorage` 的 codec 接口保留在 `AccountStore`，但**未默认启用**
  （启动时可能阻塞 Keychain）。
- CLI 复用同一组包，不依赖 Electron。

### 1.2 目录

```text
apps/
├── desktop/        Electron 主进程 + renderer
├── cli/            无界面网关
└── website/        React/Vite/Three/PWA 落地页

packages/
├── core/           领域类型、ModelRegistry、错误、日志
├── gateway/        HTTP server + 三种协议 codec
├── workbuddy/      登录/账号/目录/chat/调度
├── opencode/       运行时/目录/CLI 转发/信封
└── importers/      四个客户端配置写入
```

依赖方向：`core ← providers ← gateway ← apps`；`importers` 依赖 `core`。
provider 之间不互相 import。

---

## 2. 网关（`packages/gateway`）

### 2.1 路由

| 方法 | 路径 | 实现 |
|---|---|---|
| GET | `/health` | 无需 Key |
| GET | `/v1/models` | 默认只返回 `available/chat_only`；`?all=1` 全量 |
| POST | `/v1/chat/completions` | `chat.ts` + `server.ts` |
| POST | `/v1/responses` | `responses.ts` |
| POST | `/v1/messages` | `anthropic.ts` |
| POST | `/v1/messages/count_tokens` | 近似计数 |

### 2.2 鉴权与围栏

- `Authorization: Bearer`；Anthropic 额外接受 `x-api-key`。
- `Host` 必须是回环地址；带 `Origin` 的请求 403。
- `Content-Type: application/json`；请求体上限 64MB。
- 并发上限 8；超出返回 429。
- 客户端断开 → `AbortController` 取消上游。
- 流式响应在首个上游事件到达后才写 SSE headers，避免把鉴权错误伪装成 200。

### 2.3 Canonical 事件

`packages/core/src/types.ts` 定义：

```text
start / text / reasoning / tool_call_start / tool_call_delta / tool_call_end
/ usage / finish / error
```

三个 codec 共用 `collect.ts` 做非流式聚合，避免重复逻辑。

- Chat：直接映射 OpenAI chunk。
- Responses：`response.created`、`output_item.added`、`output_text.delta`、
  `function_call_arguments.delta`、`response.completed`。
- Anthropic：`message_start`、`content_block_start/delta/stop`、
  `message_delta`、`message_stop`。

### 2.4 错误映射

- `GatewayError`：`kind` + HTTP status。
- Provider 抛 `UpstreamError` 或带 kind/status 的错误。
- Anthropic 错误 envelope 单独映射为 `{type:'error', error:{type,message}}`。
- 流开始后失败：写协议错误事件，不再切换账号。

---

## 3. WorkBuddy（`packages/workbuddy`）

### 3.1 variant

`variants.ts`：

| variant | realm | base | billing base |
|---|---|---|---|
| `workbuddy` | `cn` | `https://copilot.tencent.com` | `https://www.codebuddy.cn` |
| `workbuddy-ai` | `intl` | `https://www.workbuddy.ai` | 同 base |

CN 使用 codebuddy Origin/Referer；INTL 加 `X-Product: SaaS`。聊天强制流式、developer→system、
`tool_choice:none` 去掉 tools。

### 3.2 登录

`login.ts`：

```text
POST /v2/plugin/auth/state?platform=CLI
  → { state, authUrl }
BrowserWindow 打开 authUrl
  → 轮询 GET /v2/plugin/auth/token?state=...
      code 11217 = pending, 0 = success
  → GET /v2/plugin/login/account （Bearer）
  → accountFromLogin
```

- 不读取 WorkBuddy 桌面凭据。
- 每个登录尝试独立 `session partition`。
- 超时 10 分钟；关闭窗口取消；加载失败回退系统浏览器并继续轮询。
- `expiresAt` 归一化秒/毫秒/ISO，缺失时读 JWT `exp`。

### 3.3 账号库

`accounts.ts`：

```json
{
  "version": 1,
  "accounts": [
    {
      "uid": "...",
      "nickname": "...",
      "realm": "cn",
      "domain": "copilot.tencent.com",
      "accessToken": "...",
      "refreshToken": "...",
      "expiresAtMs": 0,
      "enabled": true,
      "preferred": false,
      "lastUsedAtMs": 0,
      "credits": { "total": 0, "packages": [], "fetchedAtMs": 0 }
    }
  ]
}
```

- 文件 `0600`；写临时文件后 rename。
- `AccountCodec` 可选；当前桌面/CLI 未启用 safeStorage。
- 账号去重：`realm + uid`。

### 3.4 目录与额度

- `GET /v3/config` → catalog；按 `agents[name=cli].models` 过滤；缺失时取全部。
- 活跃账号目录合并去重；单账号失败不阻塞其他账号。
- `GET /v2/billing/meter/get-user-resource` → `data.packages[]`；
  合计 `Remain` 为 `credits.total`。
- billing 解析失败/为空 → `credits` 未知，不能当 0。

### 3.5 Chat 与多账号

`WorkBuddyProvider.chat`：

```text
pick accounts:
  enabled && models.has(modelId) && no cooldown
  && not known-exhausted (packages.length>0 && total<=0)
  preferred first, then lastUsedAt / round-robin

try each:
  ensure token (refresh before expiry)
  chatStream
  success → touch lastUsed
  auth → refresh, retry same once; else next
  rate_limit/credit → cooldown, next (if no event emitted)
  other → next (if no event emitted)
```

- 流开始后不换号；返回协议错误。
- 全部额度耗尽 → 402；其他无可用 → 404。
- cooldown 按 `uid:modelId`，credit 默认 30 分钟，rate limit 默认 60 秒。
- `refreshCredits` 每账号独立，失败不影响其他账号。
- 目前没有周期性聊天 probe；目录 + billing 刷新就是探活。

### 3.6 SSE

`parseUpstreamSse`：

- 按 `data:` 行解析；`[DONE]` 结束。
- 文本、reasoning、tool_calls、usage、finish_reason。
- SSE `error` 对象按 `status/statusCode` + message 分类（credit/auth/rate_limit/upstream）。
- 工具调用参数增量累积，结束发 `tool_call_end`。

---

## 4. OpenCode（`packages/opencode`）

### 4.1 运行时

- npm 包：`opencode-<darwin|linux|windows>-<x64|arm64>`。
- 读取 registry metadata，校验 `name/version/dist.integrity`（SHA-512）。
- 只解压 `package/bin/opencode`；写入 `<dataDir>/runtime/<version>/opencode`。
- 优先使用本机 `~/.opencode/bin/opencode` / Homebrew / 环境变量。
- 下载失败时回退本机已有版本。

### 4.2 目录

- `opencode serve --pure` + 隔离 XDG 目录 + 随机端口/密码。
- 读 `/provider`，按 cost 全 0 且非 deprecated 过滤。
- 读完后立即停止 serve；不常驻。
- 当前 `capabilities.images=false`，免费模型先标 `available`。

### 4.3 聊天

- 官方 server `/session/:id/message` 对免费模型返回 free-tier gate。
- 当前用官方 `opencode run --pure --model opencode/<id> --format json`。
- 从 stdout JSON 事件取 `text` + `step_finish` tokens。
- prompt 要求模型只返回外部工具信封：
  `{"content":"...","calls":[{"name":"...","arguments":{}}]}`。
- 校验工具名、参数、`tool_choice`、并行数量；失败返回 502。
- 原生工具没有强制沙箱；自定义 permission/tools 会触发 free-tier gate。
- 不做图片/检测缓存。

---

## 5. Importer（`packages/importers`）

| 文件 | 目标 | 行为 |
|---|---|---|
| `workbuddy.ts` | `~/.workbuddy/models.json`、`~/.workbuddy-ai/models.json` | 数组合并；`aiBobbyOwner` 标记；排除自身分组；用户条目保留 |
| `codex.ts` | `~/.codex/config.toml` | 标记块；`base_url`、`wire_api=responses`、bearer token；可选默认模型 |
| `claude.ts` | `~/.claude/settings.json` | 合并 `env.ANTHROPIC_BASE_URL/AUTH_TOKEN/MODEL` |
| `dsh.ts` | `~/.dsh/profiles/<profile>/cordis.patch.yml` | 合并 `llm-pi-ai` provider；YAML 重新序列化；密钥需手动配置 |

公共实现：

- `plan` 只读，返回 changed/diff/warnings。
- `apply`：文件锁 → 备份 → 原子写。
- `rollback`：恢复最近备份。
- 备份保留 5 份；文件权限 `0600`。
- DSH 不写凭据；Codex/Claude/WorkBuddy 直接写本机配置。

---

## 6. 桌面应用（`apps/desktop`）

### 6.1 主进程

`src/main/index.ts`：

- 单实例锁；关闭窗口隐藏；托盘常驻；退出时停网关/OpenCode。
- `Services` 启动 `GatewayService` 46890。
- 每 15 分钟 `refresh()`：目录 + billing。
- IPC：
  - `app:get-info` / `app:get-status` / `app:refresh`
  - `app:copy-api-key` / `app:copy-text` / `app:open-external` / `app:quit`
  - `account:login`
  - `import:preview` / `import:apply` / `import:rollback`
  - `update:check` / `update:download` / `update:install`
  - `app:set-auto-check`

### 6.2 账号登录

`Services.login`：

- `startLogin` → BrowserWindow → 2s 轮询。
- 成功入库、刷新目录；关闭窗口。
- 窗口关闭/超时/错误分类。
- 当前账号库 0600 明文。

### 6.3 Renderer

- React 19 + Tailwind + shadcn + antd Table。
- 三个 tab、账号条、模型表、导入 Sheet、登录 Dialog、设置、更新条、状态条。
- 真实状态来自 IPC；浏览器预览无 bridge 时用 demo data。
- 设置页显示真实端口/Key；主题系统/浅色/深色。
- 品牌 logo 统一为 `assets/brand/logo.svg`（网站/桌面/图标同源）。

---

## 7. CLI（`apps/cli`）

- `serve`：起网关；`status`：输出账号/模型快照。
- 数据目录 `AI_BOBBY_DATA_DIR`；端口 `AI_BOBBY_PORT`。
- `api-key` 自动生成 `0600`。
- 不依赖 Electron；使用同一核心包。

---

## 8. 更新与发布

### 8.1 更新器

- `latest.json`：version/notes/pub_date/platforms[url/sha256/size]。
- semver 比较；只接受 HTTPS 资产；SHA256 校验。
- 可选 Ed25519 签名（`UPDATE_PUBLIC_KEY` 为空时跳过）。
- 下载 → 解压 → 重签 → 替换 → 重启；失败回滚。
- 当前 v0.2.1 更新链路已验证。

### 8.2 发布

- `.github/workflows/release.yml`：tag `v*`；arm64/x64；ad-hoc 签名；zip/checksums/latest.json。
- gh-pages 根路径 landing + `/releases/latest/` 安装通道。
- release workflow clone gh-pages，仅替换 `releases/latest/*`；不覆盖根 `index.html`。
- website workflow clone gh-pages，复制 `apps/website/dist` 到根；保留 `releases/`；删除旧 `/website/`。
- `install.sh` 从 GitHub Release 下载，SHA256 校验，ditto 安装。

### 8.3 发布闸门

- v0.2.1 验收中；未经用户本机确认，不创建新 tag/release。
- 新版本需先更新 PRD/tech/README 与实际实现一致，再发版。

---

## 9. 测试

| 包 | 测试数 | 覆盖 |
|---|---|---|
| gateway | 9 | 三协议、stream、错误、安全围栏 |
| workbuddy | 15 | 登录、catalog、SSE、多账号/额度/429/402 |
| importers | 4 | 四个目标写入/回滚 |
| opencode | 4 | 免费模型、信封 |
| desktop | 12 | updater core |
| website | 1 | i18n shape |

合计 45；`pnpm -r typecheck` / `pnpm -r test` 通过。

---

## 10. 已知限制

1. WorkBuddy 真实账号未由 agent 验证；billing 解析可能与真实返回不一致。
2. OpenCode 原生工具未强制沙箱；无图片、无 probe cache。
3. 账号库 0600 明文；safeStorage 未启用。
4. Windows 未实现。
5. 网站 PWA 只在本地/CI 验证，真实 Safari/移动安装需人工验收。
6. 发布必须等待用户本机确认。
