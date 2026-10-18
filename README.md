# AI Bobby

本地 AI 服务网关：把 **OpenCode 免费模型**、**WorkBuddy（国内版）**、**WorkBuddy AI（国际版）**
收敛成一个 `127.0.0.1:46890` 端点、一把 API Key、一个桌面控制面板，
并支持一键导入 WorkBuddy / Codex / Claude Code / DeepSeek Harness。

> **状态（2026-10-18）**：`v0.2.1` 已发布。
> 46890 网关（Chat / Responses / Messages）、OpenCode 免费模型、WorkBuddy 双版本 provider、
> 四个 importer、自动更新与 curl 安装链路均已落地。
> 真实 Codex 0.154、Claude Code 2.1、OpenCode `oc/space-bunny-free` 已在本机跑通；
> **WorkBuddy 真实账号登录仍需要你本人扫码验证**。
> 落地页 `apps/website` 已实现：WebGL + 中英文切换 + PWA 更新提醒，
> 部署在 <https://xsin.github.io/ai-bobby/>。

![OpenCode tab](docs/screenshots/01-opencode-dark.png)

## 模型来源

| 来源 | 分组 | 登录 |
|---|---|---|
| OpenCode 免费模型池 | `OpenCode` | 无需登录，按价格字段筛免费模型 |
| WorkBuddy 国内版 | `WorkBuddy` | 官方登录页 + state/poll，多账号 |
| WorkBuddy AI 国际版 | `WorkBuddy AI` | 官方登录页 + state/poll，多账号 |

## 安装（macOS，ad-hoc 签名公测）

推荐一行安装：

```bash
curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh | bash
```

可审计安装：

```bash
curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh -o install.sh
less install.sh && bash install.sh
```

- 默认安装到 `~/Applications/AI Bobby.app`；`--system` 可装到 `/Applications`。
- 当前 release：<https://github.com/xsin/ai-bobby/releases/tag/v0.2.1>
- 二进制托管在 **GitHub Release**；gh-pages 只放安装脚本、版本号、校验和与更新清单。
- 首版未做 Apple 公证。首次打开若被 Gatekeeper 阻止：

```bash
xattr -dr com.apple.quarantine "$HOME/Applications/AI Bobby.app"
```

## 第一次使用

1. 启动 AI Bobby。应用只监听本机 `127.0.0.1:46890`，不会暴露到局域网/公网。
2. 在 **OpenCode** tab 点“读取模型”。首次启动会下载 OpenCode 运行时，需要网络，可能要等一会儿。
3. 切到 **WorkBuddy** 或 **WorkBuddy AI** tab，点“添加账号”。
   会打开 WorkBuddy 官方登录窗口；完成扫码/授权后窗口自动关闭，账号进入本机账号库。
   同一个 tab 可以添加多个账号，默认 round-robin + 失败切换。
4. 勾选要暴露给客户端的模型；点右上角 **导入**，选择客户端、分组和默认模型，
   先看 diff 预览，再写入。写前会备份，只改 AI Bobby 自己标记的条目。
5. 在底部状态条复制 **转发口** 与 **API Key**，填到 Codex / Claude Code / DSH / WorkBuddy。
6. 设置页可以手动检查更新、切换主题、复制 Key；更新条会在启动后静默检查。

## 接入客户端

统一端点：

```text
http://127.0.0.1:46890/v1
```

鉴权：

- OpenAI 兼容路径：`Authorization: Bearer <API Key>`
- Anthropic Messages：`Authorization: Bearer <API Key>` 或 `x-api-key: <API Key>`
- 浏览器带 `Origin` 的请求会被 403 拒绝；这是给本机客户端用的端口。

模型 ID：

- `oc/<upstream-id>`，显示名 `OC. <name>`
- `wb/<upstream-id>`，显示名 `WB. <name>`
- `wbi/<upstream-id>`，显示名 `WBI. <name>`

### OpenAI Chat Completions

```bash
curl http://127.0.0.1:46890/v1/chat/completions \
  -H "Authorization: Bearer $AI_BOBBY_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "oc/space-bunny-free",
    "messages": [{"role": "user", "content": "你好"}]
  }'
```

### OpenAI Responses（Codex）

```bash
curl http://127.0.0.1:46890/v1/responses \
  -H "Authorization: Bearer $AI_BOBBY_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"oc/space-bunny-free","input":"你好"}'
```

### Anthropic Messages（Claude Code）

```bash
curl http://127.0.0.1:46890/v1/messages \
  -H "Authorization: Bearer $AI_BOBBY_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "oc/space-bunny-free",
    "max_tokens": 256,
    "messages": [{"role": "user", "content": "你好"}]
  }'
```

其他端点：

| 方法 | 路径 | 用途 |
|---|---|---|
| GET | `/health` | 健康检查（无需 Key） |
| GET | `/v1/models` | 当前暴露的模型清单 |
| POST | `/v1/chat/completions` | OpenAI Chat，流式/非流式 |
| POST | `/v1/responses` | OpenAI Responses，流式/非流式 |
| POST | `/v1/messages` | Anthropic Messages，流式/非流式 |
| POST | `/v1/messages/count_tokens` | 近似 token 计数 |

模型清单默认只返回 `available` / `chat_only`；`GET /v1/models?all=1` 可以看到待检测/不可用模型。

## 导入目标

| 客户端 | 写入位置 | 协议 | 说明 |
|---|---|---|---|
| WorkBuddy 国内版 | `~/.workbuddy/models.json` | Chat | 默认排除 `wb/` 自身分组，避免自环 |
| WorkBuddy AI | `~/.workbuddy-ai/models.json` | Chat | 默认排除 `wbi/` 自身分组 |
| Codex | `~/.codex/config.toml` | Responses | 写入 `[model_providers.ai-bobby]` 标记块，可选默认模型 |
| Claude Code | `~/.claude/settings.json` | Messages | 合并 `env.ANTHROPIC_BASE_URL / AUTH_TOKEN / MODEL` |
| DeepSeek Harness | `~/.dsh/profiles/<profile>/cordis.patch.yml` | Chat | 合并 `llm-pi-ai` 的 `ai-bobby` provider；密钥需在 DSH 侧配置 |

共同行为：

- 先 dry-run 展示 diff；确认后才写。
- 写前备份、文件锁、原子替换；只改 AI Bobby 标记的条目。
- 重复导入幂等；用户手写条目不会被覆盖。
- 导入器 API 支持回滚（`rollback`）；**当前桌面 UI 还没暴露回滚按钮**。
- Codex / Claude 的默认模型会在勾选“设为默认”时写入。

## CLI（无界面起网关）

```bash
AI_BOBBY_DATA_DIR=~/.ai-bobby pnpm --filter @ai-bobby/cli start
# 指定端口
AI_BOBBY_DATA_DIR=~/.ai-bobby AI_BOBBY_PORT=46890 pnpm --filter @ai-bobby/cli start
# 只查看账号/模型状态
AI_BOBBY_DATA_DIR=~/.ai-bobby pnpm --filter @ai-bobby/cli status
```

首次运行会在数据目录生成 `api-key`（`0600`）。API Key 也可以从桌面状态条复制。

## 界面

| | |
|---|---|
| ![WorkBuddy tab](docs/screenshots/02-workbuddy-dark.png) | ![Import sheet](docs/screenshots/03-import-light.png) |
| WorkBuddy 多账号与额度 | 全局导入：dry-run 预览 |
| ![Login](docs/screenshots/04-login-light.png) | ![Update](docs/screenshots/05-update-dark.png) |
| 官方登录页（多账号） | 非模态更新条 |

浅色主题：![Light](docs/screenshots/06-opencode-light.png)

## 数据目录与安全

- 数据目录：macOS `~/Library/Application Support/AI Bobby`；可用 `AI_BOBBY_DATA_DIR` 覆盖。
- `api-key`、账号库等敏感文件以 `0600` 保存在本机。
- 账号库当前是 `0600` 明文；Electron `safeStorage` 因启动时可能阻塞 Keychain 暂未默认启用。
- 日志与状态不记录 access token / refresh token / API Key 明文。
- WorkBuddy 登录在官方页面完成，AI Bobby 不接触密码；但后续接口不是公开 API，请遵守上游条款。

## 故障排查

**首次打开提示“已损坏”/无法打开**

```bash
xattr -dr com.apple.quarantine "$HOME/Applications/AI Bobby.app"
```

**46890 端口被占用**

关闭占用进程，或仅在开发/CLI 场景用 `AI_BOBBY_PORT` 改端口。
桌面安装版默认固定 46890，因为客户端配置依赖这个地址。

**OpenCode 模型为空**

首次读取需要下载运行时，确认网络可访问 npm registry / GitHub。
点“读取模型”重试；仍失败时查看数据目录下日志，或先在终端运行
`pnpm --filter @ai-bobby/cli start` 观察错误。

**WorkBuddy 登录窗口空白**

先把同一个 `authUrl` 用系统浏览器打开完成登录；桌面端会继续轮询 token。
登录成功但模型为空时，检查账号是否启用、是否被上游限流/额度不足。

**导入后客户端没变化**

确认已重启对应客户端；在导入预览里检查目标路径与 diff。
Codex/Claude 的配置块只改 AI Bobby 标记的部分，不会覆盖其他 provider。

## 当前实现

- `packages/core`：模型注册表、Canonical 请求/事件、错误与日志脱敏
- `packages/gateway`：`/v1/chat/completions`、`/v1/responses`、`/v1/messages`、
  `/v1/messages/count_tokens`、`/v1/models`、`/health`；API Key、Origin/Host 围栏
- `packages/workbuddy`：官方登录 state/poll、AccountStore、目录/兜底、chat SSE、刷新、billing、多账号调度
- `packages/opencode`：npm 运行时下载/SHA-512 校验、隔离 serve、免费模型过滤、CLI `run` 转发与工具信封
- `packages/importers`：WorkBuddy / Codex / Claude Code / DSH 的 dry-run / 备份 / 原子写 / 回滚
- `apps/desktop`：主进程启动 46890 网关，renderer 读真实模型/账号，内嵌登录窗口与导入 IPC
- `apps/cli`：无界面起网关

## 技术栈

- **React 19.3.1** + **TypeScript 7.0.2** + **Vite 8.3.4** + **Electron 44.9.0**
- **Tailwind CSS 4.3.3** + **shadcn/ui 4.22**（视觉层）
- **Ant Design 6.6.6**（模型表格等功能层，按 [ui-guideline.md](./ui-guideline.md) 做 token 桥接）
- **Three.js 0.186.1 + GLSL**（落地页 WebGL）、**vite-plugin-pwa 2.0**（PWA 更新）
- pnpm 10 workspace；`electron-vite` 构建 main/preload/renderer
- 第三方依赖版本统一在 `pnpm-workspace.yaml` 的 `catalog:` 声明，子项目只写 `catalog:`
- 主题色：**电光克莱因蓝 `#1e4fff`**
- 所有依赖精确 pin；升级走 `pnpm up --latest` 并记录

## 已知限制

- WorkBuddy 真实账号登录/上游联调仍需人工验证；目前只验证到官方登录页可打开。
- OpenCode 原生工具目前是 prompt 级约束，未做强制沙箱；请不要让不可信 prompt 驱动本机工具。
- OpenCode 免费模型的检测/延迟缓存尚未实现，目录先标 `available`。
- 当前只验证 macOS；Windows 打包与更新未实现。
- ad-hoc 签名、未公证；首次打开可能需要手动清 quarantine。

## 开发

```sh
pnpm install
pnpm --filter @ai-bobby/desktop dev      # Electron + Vite 开发
pnpm --filter @ai-bobby/desktop build    # 构建 out/
pnpm --filter @ai-bobby/desktop typecheck
pnpm --filter @ai-bobby/desktop test
pnpm --filter @ai-bobby/website dev       # 落地页开发
pnpm --filter @ai-bobby/website build     # 落地页构建
```

只预览 renderer（无需 Electron）：

```sh
cd apps/desktop && pnpm build
python3 -m http.server 8766 --bind 127.0.0.1 -d out/renderer
# http://127.0.0.1:8766/
```

发布（本地）：

```sh
bash scripts/release/build-mac.sh --arch arm64 --out-dir release-site/releases/0.2.1
bash scripts/release/build-mac.sh --arch x64   --out-dir release-site/releases/0.2.1
node scripts/release/validate.mjs release-site/releases/0.2.1
```

CI：推送 `v*` tag 触发 [.github/workflows/release.yml](./.github/workflows/release.yml)，
构建 arm64/x64 → ad-hoc 签名 → zip/checksums/latest.json → gh-pages + GitHub Release。

## 目录

```
apps/desktop          Electron 主进程 + shadcn/Tailwind/antd 控制面板
apps/website          React/Vite/Three/PWA 落地页（中英文）
apps/cli              无界面网关
packages/core         领域模型、注册表、设置、日志
packages/workbuddy    WorkBuddy 双版本登录/账号/目录/聊天/调度
packages/opencode     OpenCode 运行时/免费筛选/转发
packages/gateway      46890 网关与三种协议 codec
packages/importers    四个客户端的一键导入
scripts/release       版本、构建、签名、manifest、安装脚本
docs/prd.md           产品范围、FR、界面、验收
docs/tech.md          架构、协议、登录/多账号、更新/分发、测试
refs/                 只读参考实现（.gitignore，不发布）
```

## 文档

- [handsoff.md](./handsoff.md) — 实施计划、决策、进度、跨会话记忆
- [docs/README.md](./docs/README.md) — 文档索引与“只写当前状态”规范
- [docs/prd.md](./docs/prd.md) — 产品范围、FR、界面、验收
- [docs/tech.md](./docs/tech.md) — 架构、协议、登录/多账号、更新/分发、测试
- [docs/prd-landing.md](./docs/prd-landing.md) — 落地页 PRD（已实现）
- [docs/tech-landing.md](./docs/tech-landing.md) — 落地页技术方案（React/Vite/Three/PWA）
- [human-sos.md](./human-sos.md) — **需要人工完成/确认的交付事项**
- [prototype/](./prototype/) — 视觉稿：`desktop/` 控制面板、`website/` 落地页
- [ui-guideline.md](./ui-guideline.md) — shadcn/Tailwind/antd 分层规范

## 新项目状态

- **Website（落地页）**：已实现于 [`apps/website`](./apps/website)，
  支持中英文与 PWA 自动更新提醒；视觉母版仍在
  [`prototype/website/`](./prototype/website/)。线上：
  <https://xsin.github.io/ai-bobby/>。
- **Marketing / Lucia**：已拆分为同级独立项目（`ai-lucia`），不在本仓库；
  等 AI Bobby 完结后再启动实现。
- **依赖版本**：所有第三方版本收敛到 `pnpm-workspace.yaml` 的 `catalog:`，
  子项目只写 `catalog:`，不再各自声明版本。

## 免责声明

WorkBuddy 的登录与模型接口不是公开 API；本项目仅用于个人学习与研究，
请遵守上游服务条款，风险自担。本项目与腾讯、WorkBuddy、DeepSeek 无关联。

## License

MIT（见 [LICENSE](./LICENSE)）。参考实现的许可见 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)。
