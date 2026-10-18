# AI Bobby — Handoff / 实施计划

> 给下一个 agent 的跨会话记忆：目标、已确认事实、决策、进度、剩余风险。
> **面向使用者的安装、使用、接入客户端、导入路径和故障排查在 [README.md](./README.md)。**
> 产品范围见 [docs/prd.md](./docs/prd.md)，技术方案见 [docs/tech.md](./docs/tech.md)。
> 落地页见 [docs/prd-landing.md](./docs/prd-landing.md) / [docs/tech-landing.md](./docs/tech-landing.md)；
> 需要人完成的事在 [human-sos.md](./human-sos.md)。

- 最后更新：2026-10-18
- 当前阶段：**v0.2.1 已发布；v0.2.2 界面改版 + 第二轮体验反馈修复已实现并本地验证
  （开关对比度、关于页 App 播放与边框、额度接口、登录弹窗、DSH 凭据、计费列、全局手型）。
  issues 里 #1–#4、#7–#10 已处理；#5/#6（历史页合并表格）等用户更新设计稿后再开工。
  未经用户确认不创建新 tag/release。**
  落地页已实现并上线根路径；Lucia 独立项目，等 AI Bobby 完结后启动；依赖已收归 pnpm catalog。
- 工作目录：`/Volumes/Pluto/dev/proj/ai-bobby`
- 仓库：<https://github.com/xsin/ai-bobby>（public）
- 安装通道：<https://xsin.github.io/ai-bobby/releases/latest/install.sh>
- 当前 release：<https://github.com/xsin/ai-bobby/releases/tag/v0.2.1>
- 当前 HEAD：最新提交见 `git log -1`；工作区 clean（未 push、未 tag）
- 工具链：Node v26.3.0、pnpm 10.15.1

---

## §0 30 秒召回

AI Bobby 是一个只监听本机的 AI 服务网关桌面应用：把 OpenCode 免费模型池、
WorkBuddy 国内版、WorkBuddy AI 国际版收敛成 `127.0.0.1:46890` 一个端点，
同时说 OpenAI Chat Completions / OpenAI Responses / Anthropic Messages 三种方言；
控制面板负责模型、账号、导入和更新。

**当前状态**

- 46890 网关、WorkBuddy 双版本 provider、OpenCode provider、四个 importer、桌面真实状态、
  自动更新与 curl 安装均已实现并发布 `v0.2.1`。
- **v0.2.2 界面改版已在 main 实现并本地验证**：可收起左侧栏 + 多页导航、主题移到设置页、
  导入历史/备份/恢复、关于 ZEO + 音乐 + 全局可拖动播放器、可拖动应用 LOGO 头像、
  更新条与设置更新 UI；设置页开关已补边框/内边距与标签间距；关于页歌曲行边框与可点击元素手型已修。
  尚未发版，等待用户本机验收。
- **关于页音乐默认唤起网易云音乐 App**：用 `orpheus://base64({"type":"song","id":…,"cmd":"play"})`，
  App 不可用/唤起失败时回退 iframe；macOS 3.1.12.3443 实测可切歌。
- 真实客户端验证：Codex 0.154、Claude Code 2.1、OpenCode `oc/space-bunny-free`。
- 测试：gateway 9、workbuddy 15、importers 4、opencode 4、desktop 20（含 updater 12、music 8）、website 1，共 53 项通过；
  typecheck/build 通过。
- 未完成：WorkBuddy 真实账号登录联调（人工）；OpenCode 原生工具强制沙箱；
  OpenCode 检测缓存；safeStorage（启动阻塞 Keychain，暂缓）；Windows。

**从哪里来**：在 `refs/RuiC-oc-ferry` 的 UI/单源摆渡思路上迭代；
WorkBuddy 上游参考 `refs/dsh-workbuddy-connect`；
代理/压缩/多协议思路参考 `refs/iskill-headroom-workbuddy2api`。三者均 MIT。

---

## §1 关键事实

### 模型来源

| 来源 | provider id | 上游 |
|---|---|---|
| OpenCode 免费池 | `opencode` | 隔离的 OpenCode runtime |
| WorkBuddy 国内版 | `workbuddy` | `https://copilot.tencent.com` |
| WorkBuddy AI 国际版 | `workbuddy-ai` | `https://www.workbuddy.ai` |

命名规则见 §3 D4；用户侧来源/登录说明见 [README.md](./README.md)。

### WorkBuddy 账号模型（已定）

- v1 **不读取/解密 WorkBuddy 桌面 App 凭据**。
- 使用官方登录页 + state/poll，在 AI Bobby 内主动登录；同 realm 支持多账号。
- 技术细节：`POST /v2/plugin/auth/state?platform=CLI` → 打开 `authUrl` →
  轮询 `GET /v2/plugin/auth/token?state=...`（`11217` 等待，`0` 成功）→
  `GET /v2/plugin/login/account` 取资料；刷新用 `X-Refresh-Token`。
- 账号库按 realm 存；调度 round-robin + 失败切换；401 刷新、429/402 冷却换号；
  流式开始后不换账号。
- **真实账号登录尚未由 agent 验证**（需要用户扫码），见 [human-sos.md](./human-sos.md)。

### OpenCode 关键约束

- 运行时来自 npm 平台包 `opencode-<os>-<arch>`，SHA-512 校验后解压单二进制。
- 免费模型按 `/provider` 的 cost 字段判定，不按名字里的 `free`。
- 官方 server 的 `/session/:id/message` 对免费模型会返回 free-tier gate；
  当前改用官方 `opencode run --pure --model opencode/<id> --format json`，
  从 JSON 事件取文本，再解析 AI Bobby 的工具信封。
- 任何自定义 agent / tools / permission 配置也会触发 free-tier gate；
  因此原生工具目前只能做 prompt 级约束，**没有强制沙箱**。

### 协议面（实现要点）

- 三种协议共用 Canonical 请求/事件，不应各自复制 provider 逻辑。
- API Key：Bearer；Anthropic 额外接受 `x-api-key`。
- 浏览器带 `Origin` 的请求 403；只监听回环地址。
- 端点与调用示例在 [README.md](./README.md#接入客户端)，协议细节在
  [docs/tech.md](./docs/tech.md)。

---

## §2 参考实现地图（只读，不修改）

### 2.1 `refs/RuiC-oc-ferry`（MIT）

单源摆渡应用，提供产品骨架与 OpenCode 侧实现：

| 文件 | 可复用内容 |
|---|---|
| `src/runtime.js` | OpenCode 运行时发现/下载/校验/隔离启动 |
| `src/backend.js` | 会话、审批围栏、事件流、动作转交 |
| `src/probe.js` / `probe-cache.js` | 检测请求、判定、并发、缓存 |
| `src/protocol.js` / `server.js` | 信封编解码、SSE、鉴权、来源围栏 |
| `src/sync.js` | `models.json` 合并、锁、备份、原子写 |
| `desktop/*` | Electron 窗口/托盘/preload/UI |
| `docs/设计说明.md` | 架构、协议、边界、缓存策略 |

### 2.2 `refs/dsh-workbuddy-connect`（MIT）

WorkBuddy TypeScript 上游实现，是 AI Bobby WorkBuddy provider 的主要参考：

| 文件 | 可复用内容 |
|---|---|
| `src/upstream.ts` | `/v3/config`、`/v2/chat/completions`、刷新、错误分类、计费 |
| `src/variants.ts` | 国内/国际 variant（域名、UA、身份头） |
| `src/catalog.ts` / `catalog-store.ts` | 目录模型、缓存、来源标记 |
| `src/shim.ts` | 本机 OpenAI 兼容 shim、强制流式、请求体 quirks |
| `src/pi-ai-guard.ts` / `probe*.ts` | 推理档位探测、模型可见性 |

### 2.3 `refs/iskill-headroom-workbuddy2api`（MIT）

`workbuddy2api-hub`（Python）提供 Chat / Responses / Messages 三面与 headroom 代理；
本项目的差异是原生 TS、单运行时、不默认引入 Python sidecar。
Headroom 式前缀缓存/压缩后置到 P8。

---

## §3 决策记录

| # | 决策 | 状态 | 理由 |
|---|---|---|---|
| D1 | WorkBuddy 用 TypeScript 原生实现，不默认 sidecar Python hub | 已定 | 单运行时、无 Python 依赖、复用 MIT TS |
| D2 | v1 同时提供 Chat / Responses / Messages 三种方言 | 已定 | 现有 8787 工作流同时依赖 Codex 与 Claude |
| D3 | 官方登录页 + state/poll，多账号；不读取桌面凭据 | 已定 | 更干净、可切账号 |
| D3a | round-robin + 失败切换；流式开始后不换账号 | 已定 | 简单可验证 |
| D4 | id `oc/ wb/ wbi/`；显示名 `OC. WB. WBI.` | 已定 | 两个 WorkBuddy 版本 id 会重叠 |
| D5 | WorkBuddy 导入排除自身分组，避免自环 | 已定 | 同一 App 不能指向自己 |
| D6 | 所有客户端导入先 dry-run + 备份 + 归属标记 | 已定 | 配置是用户资产 |
| D7 | 三个来源 tab + 全局导入抽屉 | 已定 | 用户选择 |
| D8 | macOS 优先，Windows 发版前补 | 已定 | 本机验证与参考实现都在 macOS |
| D9 | React 19.3.1 / TS 7.0.2 / Vite 8.3.4 / Electron 44.9.0 / Tailwind 4.3.3 / shadcn 4.22 / antd 6.6.6 | 已定 | 用户要求；精确 pin |
| D10 | 自研更新器：latest.json + SHA256 + 可选 Ed25519；不用 electron-updater | 已定 | ad-hoc 签名下 Squirrel.Mac 不可靠 |
| D11 | ad-hoc 签名 + zip + install.sh + gh-pages + GitHub Release | 已定 | 用户要求 |
| D12 | `refs/` 不提交 Git | 已定 | 用户要求 |
| D13 | 依赖用当前最新稳定版，精确 pin | 已定 | 用户要求 |
| D14 | 仓库 `xsin/ai-bobby`；Pages `https://xsin.github.io/ai-bobby` | 已定 | 用户指定 |

---

## §4 阶段进度

| 阶段 | 状态 | 说明 |
|---|---|---|
| P0 目标/文档 | 完成 | PRD、tech、prototype、决策已对齐 |
| P1 可运行骨架 | 完成 | desktop、core、gateway、cli、更新器、发布脚手架 |
| P2 WorkBuddy provider | 代码完成 | 登录/账号/目录/chat/刷新/调度/测试；真实账号联调待人工 |
| P3 OpenCode provider | 主体完成 | 运行时/免费筛选/目录/CLI 转发/工具信封；检测缓存与原生工具沙箱待补 |
| P4 三协议网关 | 完成 | Chat/Responses/Messages + count_tokens；真实 Codex/Claude 各跑通 |
| P5 四个 importer | 基本完成 | 四个目标写入/备份/回滚测试；Codex/Claude 已真机回环；WorkBuddy/DSH 待账号/客户端验证 |
| P6 控制面板 | 完成（v0.2.2 改版） | 左侧栏多页、历史/备份恢复、关于/音乐、浮动头像/播放器、更新条；关于页优先唤起网易云 App，失败回退 iframe；真实状态、登录窗口、导入 IPC |
| P7 打包/分发/更新 | 完成（macOS） | v0.2.1 已发布；v0.2.2 待用户验收后发布；**发版需用户本机确认**；curl/更新链路已验证；Windows 未做 |
| P8 硬化/可选 | 未完成 | OpenCode 沙箱/图片、检测缓存、safeStorage、Headroom 压缩 |
| Website | 已实现 | `apps/website`（React/Vite/Three/PWA/i18n）+ `prototype/website` 视觉母版；已部署根路径 |
| Lucia | 独立项目 | 同级 `ai-lucia/`；等 AI Bobby 完结后再启动，不在本仓库实现 |

---

## §5 新项目（本轮新增）

### Website

- 已实现：`apps/website`，React 19 + Vite 8 + TS7 + Tailwind 4 + shadcn + Three.js。
- 支持 **中文/英文切换**（localStorage + 浏览器语言，`document.lang`/title 同步）。
- PWA：`vite-plugin-pwa` prompt 模式；新版本 toast + Refresh；安装提示 7 天节流。
- 视觉母版：`prototype/website/`（含本地 vendor + file:// bundle）。
- 部署：`.github/workflows/website.yml` → gh-pages 根路径；release workflow 只更新 `releases/latest`，不覆盖 index。
- 文档：`docs/prd-landing.md`、`docs/tech-landing.md`。
- **状态：已实现并本地验证。**

### Lucia（独立项目）

- 定位：用户的媒体发布官（多渠道图文 → 审核 → 一键发布）。
- 位置：同级 `../ai-lucia/`；已有 PRD/tech/brainstorm。
- **状态：等 AI Bobby 项目完结后启动，不在本仓库实现。**

### 依赖 catalog

- 所有第三方版本已收归 `pnpm-workspace.yaml` 的 `catalog:`；子项目只写 `catalog:`。
- 新增依赖时先加 catalog 条目，再在 package.json 引用；不要写死版本。
- 已验证 `pnpm install` 与 desktop typecheck。

---

## §5.1 未完成与下一步

### 必须人工

1. **WorkBuddy 真实账号登录**：打开 WorkBuddy/WBI tab → 添加账号 → 扫码；
   验证模型、额度、流式对话、多账号切换和导入后的客户端配置。
   具体步骤见 [human-sos.md](./human-sos.md)。
2. **确认仓库保持 public**：curl/Pages 安装通道依赖 public。

### Agent 可继续

1. OpenCode 原生工具强制隔离（当前仅 prompt 约束；自定义 permission 会触发 free-tier gate）。
2. OpenCode 检测队列 / probe-cache / 延迟与降级 `chat_only`。
3. OpenCode 图片输入；当前 `capabilities.images=false`。
4. safeStorage 账号库加密（需解决启动时 Keychain 阻塞）。
5. Windows NSIS 打包与更新脚本。
6. WorkBuddy 真实账号后的端到端 smoke test 与 importer 修正。
7. v0.2.2 发布前：人工验收界面改版；确认后统一 bump 版本到 0.2.2、打 tag、走 release workflow。

### 2026-10-18 历史清理 / 多账号 / 发布闸门

- 用 `git filter-repo --path docs/marketing-brainstorm.md --invert-paths` 清理公开历史，
  已 force push `main`；当前 refs 不再包含该文件。
- WorkBuddy：已知额度耗尽（billing 有 packages 且 total=0）的账号会被跳过；
  SSE 错误现在按 status/message 分类为 credit；402/429 会在流开始前切换账号；
  支持 `preferred` 优先。
- 多账号“探活”仍以目录 + billing 刷新为主，不做周期聊天 probe；快照滞后时靠 402/SSE 冷却兜底。
- 明确发布闸门：v0.2.1 验收中，未经用户本机确认不创建新 tag/release。

---

## §6 风险与约束

1. **上游非公开协议**：`/v3/config`、`/v2/chat/completions`、登录/额度接口随时可能变；
   目录与账号状态要缓存 + 兜底快照。
2. **账号风险**：多账号、自动化请求可能触发风控；不绕过账号/地区/额度限制。
3. **免费模型 churn**：OpenCode 免费池随时上下线；检测缓存要有 TTL。
4. **配置写入风险**：Codex/Claude/DSH 配置是用户资产；必须备份、dry-run、只动标记条目。
5. **端口冲突**：46890 被占用时明确报错；不要静默换端口，否则客户端配置失效。
6. **token 落盘**：当前 0600 明文；日志/状态/错误必须脱敏；safeStorage 是待办。
7. **OpenCode 原生工具**：prompt 级约束不等于安全边界；不要让不可信 prompt 驱动本机工具。
8. **许可证**：参考实现均 MIT；复制代码保留版权/许可，并更新 THIRD_PARTY_NOTICES。

---

## §7 工程约定

- TypeScript strict + ESM + NodeNext；Node ≥ 22.19；pnpm workspace。
- 中文 UI 文案；代码标识符英文；错误信息给“发生了什么 + 怎么办”。
- 写用户文件：备份 → 锁 → 原子替换 → 校验 → 返回 diff；失败不改原文件。
- 日志与状态不出现 access token、refresh token、API Key 明文。
- 测试默认不联网；上游用 fixture / 本地假服务器。
- 不修改 `refs/`；需要复用的代码复制到 `packages/` 并注明来源。
- 提交前：`pnpm -r typecheck && pnpm -r test`；UI 改动附浅色/深色截图。
- **文档与代码同步**：改代码必须同步 `docs/prd.md` / `docs/tech.md` / `README.md` / 对应 landing 文档；
  PRD/tech 保持整体设计，只做局部修订；人类阅读文档只保留当前状态，不写修订记录/变更日志。

---

## §8 新会话恢复清单

1. 读本文档 §0、§4、§5、§5.1；用户侧说明在 README，产品/技术细节在 docs/。
2. `git status` / `git log -5` 确认工作区状态。
3. `pnpm install`（首次或依赖变更后）。
4. 跑 `pnpm -r typecheck && pnpm -r test`。
5. 按 §5.1 的“Agent 可继续”推进；WorkBuddy 真实账号验证先看 human-sos。
6. 每完成一项：更新 §4 表、§5.1 列表、§10 日志。

---

## §9 关键路径速查

```text
参考源码
  refs/RuiC-oc-ferry/src/
  refs/RuiC-oc-ferry/desktop/
  refs/RuiC-oc-ferry/docs/设计说明.md
  refs/dsh-workbuddy-connect/src/{auth,upstream,variants,shim,catalog}.ts
  refs/dsh-workbuddy-connect/src/desktop-credential-protection.ts
  ~/.iskill-headroom-workbuddy2api/workbuddy2api-hub/wb_proxy.py

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

---

## §10 进度日志

### 2026-10-18 新项目与依赖收归

- 落地页视觉稿确认并实现 `apps/website`：WebGL、中英文 i18n、PWA 更新提示、
  gh-pages 根路径工作流，并保留 `/releases/latest` 安装通道。
- 线上验证：根路径、manifest、sw.js、PWA 图标均 200；`/releases/latest/install.sh` 仍 200。
- marketing 拆分为同级独立项目 `ai-lucia/`，等 AI Bobby 完结后再启动。
- `prototype/` 已按 `desktop/`、`website/` 分目录。
- 第三方依赖版本收归 `pnpm-workspace.yaml` 的 `catalog:`，package.json 改为 `catalog:`；
  `pnpm install`、desktop typecheck 通过。

### 2026-10-18 早期对齐

- 读三份参考实现；确认 Codex/Claude/DSH 本机配置分别依赖 Responses/Anthropic/Chat。
- 建 pnpm workspace；写 PRD/tech/prototype；确定原生 TS、三方言、内嵌登录 + 多账号、
  `OC. WB. WBI.` 命名、三 tab + 全局导入抽屉、macOS 优先。
- 新增硬性要求：React 19 + TS7 + Vite8 + shadcn/Tailwind + antd 6、`refs/` 不提交、
  自动更新、ad-hoc + curl 安装、推 `xsin/ai-bobby`。

### 2026-10-18 发布链路

- 主题色 `#1e4fff`；UI 按 `docs/ui-guideline.md` 落地；arm64/x64 打包与 ad-hoc 签名通过。
- 自研更新器、install.sh、gh-pages + GitHub Release 工作流；`v0.1.0` 发布。
- 踩坑：Electron zip 123–135MB，超过 GitHub Git 100MB 限制 → 二进制放 Release，
  gh-pages 只放 install.sh/VERSION/checksums/latest.json。

### 2026-10-18 Round 1：网关 / Provider / Importer

- 新建 `@ai-bobby/core`、`gateway`、`workbuddy`、`importers`。
- 网关三协议 + count_tokens + 鉴权/Origin/Host/并发/SSE；fixture 测试。
- WorkBuddy：官方登录 state/poll、AccountStore、目录/兜底、chat SSE、刷新、billing、调度。
- Importers：WorkBuddy/Codex/Claude/DSH；dry-run/备份/原子写/回滚。
- 桌面主进程启动 46890 网关；renderer 读真实状态；登录窗口与导入 IPC 接通。
- safeStorage 在启动时阻塞 Keychain → 回退 0600 明文。

### 2026-10-18 Round 2：OpenCode / 真实客户端

- `@ai-bobby/opencode`：npm 运行时下载、SHA-512、隔离 serve、免费模型过滤。
- 官方 server 免费模型 gate → 改用 `opencode run --format json` + 工具信封。
- 真实 `claude` 2.1.296、`codex` 0.154.0 各跑通一次对话；修复 Anthropic `role:system`、
  Responses 非 function 工具兼容。
- 测试增至 42 项。

### 2026-10-18 Round 3：v0.2.0 / v0.2.1 发布

- v0.2.0：CI 发布成功；真实 curl 安装；v0.1.0 → v0.2.0 更新检查正确。
- 修复 `release/` 误忽略 `scripts/release/`；发布脚本入库。
- v0.2.1：设置页真实端口/Key；runOpenCode 等 stdout close；WorkBuddy HTTP 集成测试。
- 实际执行 v0.2.0 → v0.2.1 download → install → 重启，`Info.plist` 变为 0.2.1。
- 当前 public release 与 Pages 更新通道均指向 v0.2.1。

### 2026-10-18 Round 4：v0.2.2 界面改版（本地验证完成，未发版）

- 生产代码落地 `prototype/desktop` 已验收稿：左侧栏多页、主题只留设置、历史/备份恢复、
  关于 ZEO + 音乐 + 全局可拖动 iframe 播放器、可拖动应用 LOGO 头像、更新条/设置 UI。
- 主进程新增 `import:history` / `import:restore-backup`；`import-history.json` 0600、最多 200 条，
  恢复前再备份当前文件；diff 写盘前脱敏。
- 开发模式版本改用应用 `package.json`（`appVersion()`），修复 Electron 自身版本混入更新检查。
- 修复：下载完成清空进度、同一版本“稍后”不再被自动检查弹回、无变更导入不记历史。
- 验证：typecheck、当时 45 项测试、desktop build 通过；本机 Electron 验证历史恢复、主题、
  播放器 iframe、头像拖动、模拟 0.2.2 更新包下载到“更新已就绪”。
- 提交：`218ce77 feat(desktop): implement v0.2.2 multi-page redesign`。
- **未创建 tag/release；等用户本机验收后再 bump 版本与发布。**

### 2026-10-18 Round 4.1：设置页开关对比度修复

- 浅色下 checked 状态的白色滑块与页面背景融合；共享 `Switch` 轨道改用 `border-line`，
  默认尺寸调整为 `36×24` + `p-0.5` 内边距，滑块四周保留轨道边；label 间距 6px → 8px。
- 审计所有 `Switch` 使用点：当前仅设置页“自动检查”一个；导入抽屉的 Checkbox 不受影响。
- 浅色/深色 checked、unchecked 四种状态截图检查；desktop typecheck、12 项测试、build 通过。
- 提交：`98babc4 fix(desktop): give switches a visible border and label spacing`。
- 收尾：`docs/ui-guideline.md` 新增 §5.4「尺寸与间距：4px 网格」，并加入 Agent 约束 #13 与修正路径 #10；
  设计依据引用 Spec.fm 8-Point Grid、IBM Carbon 2x Grid、Material Design 3 spacing。
- 工作区 clean；未 push、未 tag、未创建 release。

### 2026-10-18 Round 4.2：关于页唤起网易云音乐 App

- 调研结论：
  - macOS 客户端 Info.plist 注册 `orpheus` scheme（`com.netease.163music`）。
  - 移动端 `orpheus://song/<id>` 在 macOS 只把客户端带到前台，不切歌；不要使用。
  - 桌面端使用 `orpheus://<base64(JSON)>`，payload `{"type":"song","id":<id>,"cmd":"play"}`。
    参考 `ncm-cli`：<https://github.com/Davied-H/ncm-cli/blob/main/docs/ncm-api-exploration.md>。
  - 本机 macOS 网易云音乐 3.1.12.3443 实测：打开 payload 后播放器切到目标歌曲并开始播放。
- 实现：
  - `music-app-core.ts`：ID 校验 + payload/base64 URL；3 项单测。
  - `music-app.ts`：`app.getApplicationInfoForProtocol` 检查 handler 是否属于网易云，
    `shell.openExternal` 打开；返回 `no-app` / `open-failed` / `unsupported-platform` / `invalid-id`；
    5 项 mock 单测。
  - IPC `app:play-music`；preload `playInMusicApp(songId)`；renderer 成功关闭 iframe，失败回退 iframe。
- 测试：新增 music-app-core 3 项、music-app 5 项；desktop 共 20 项，workspace 共 53 项通过。
- 文档：PRD FR-UI-10/AC-8、tech §8.5.1、README 使用说明与故障排查、issues 第 6 条。
- 未公开协议，客户端升级可能失效；版权/会员/登录限制仍由网易云 App 处理。
- 提交：见最新提交；未 push、未 tag、未创建 release。

### 2026-10-18 Round 4.3：关于页歌曲/专辑交互修复

- 歌曲行只写 `border-b` 时会保留原生 `<button>` 的 2px outset 边框，表现为每行像独立卡片且行间有缝；
  改为 `border-x-0 border-t-0 border-b border-solid`，只保留 1px 底边。
- 全局基础层增加 `.tw-root button:not(:disabled)` / `[role="button"]:not([aria-disabled="true"])`
  的 `cursor: pointer`；专辑卡额外加 `cursor-pointer`。
- 专辑深链测试：`{"type":"album","id":…,"cmd":"open"}` 在网易云 3.1.12.3443 提示“操作不支持”，
  `cmd:"play"` 无效果；因此专辑卡继续打开 `music.163.com` 专辑页，不调用 App。
- 文档：PRD FR-UI-10、tech §8.5.1、ui-guideline §5.5 与 Agent 约束 #14、README、issues 第 7 条。
- 验证：浅色/深色下歌曲列表边框与手型检查；desktop typecheck/build；全量 53 项测试通过。
- 提交：`fa61d0d fix(desktop): repair about-page track borders and pointer cursors`；工作区 clean；未 push、未 tag、未创建 release。

### 2026-10-18 Round 5：v0.2.2 体验反馈（issues #1–#4、#7–#10）

- 额度：billing 改为 `POST /v2/billing/meter/get-user-resource`，带 `PageNumber/PageSize/ProductCode/Status/时间范围`，
  解析 `data.Response.Data.Accounts[]` 的 `CycleCapacity*`；CN 企业账号走 `get-enterprise-user-usage`（`limitNum<0` = 不限量）。
  实测 3 个账号 2,714 / 2,910 / 137 积分，不再显示 0；失败显示“额度未知”。
- 登录：弹窗去掉占位二维码，改为官方登录窗口引导；等待中保持打开并显示进度，失败在弹窗内报错；深色不再反白。
- 关于页：网易云冷启动时先等进程（pgrep `NeteaseMusic`）再延迟补发一次 payload；专辑打开网页并在已装 App 时提示
  “当前音乐应用不支持打开专辑，已为你打开网页版”。
- DSH：导入时写 `refs.AI_BOBBY_API_KEY` 到 `~/.dsh/.credentials.yaml`（备份、0600、保留 records/其他 refs），免环境变量。
- 模型清单：新增「计费」列（免费 / 倍率 / 未知），详情同步展示。
- 手型：基础层规则改为全局（Dialog/Sheet portal 在 `.tw-root` 之外），禁用态 `not-allowed`。
- 设置页文案改成面向用户的描述。
- 截图：`02-workbuddy-dark.png`、`04-login-light.png` 刷新。
- 验证：typecheck、61 项测试、desktop build；CDP 复核计费列、portal 按钮手型、登录弹窗文案。
- #5/#6（历史页合并表格、`变更` 语义与“打开目录”）按用户要求等设计稿后再开工。

### 2026-10-18 Round 6：第三轮体验反馈（设计先行）

- 分类：UI 改动（#2 合并表格、#3 变更语义/打开目录、#4 登录弹窗设计稿、#5 选中数排版、
  #7 默认模型语义、#8 预览变更、#9 概览页）先更新 `prototype/desktop` 设计稿，等用户确认后再改生产 UI；
  非 UI（#1 音乐冷启动、#6 自动恢复勾选、#10 WBI 导入缺失）本轮直接实现。
- #1：改为先用 `open -a` 启动客户端、等进程出现再等 2s 投递 payload，避免冷启动第一条 URL 被吞。
- #6：`localStorage` 键 `ai-bobby-last-selection` 记录上次导入的模型；启动时恢复，失效 id 过滤，
  首次使用仍默认勾选全部可用模型。
- #10：根因是渲染层 group id `wbi` 未映射为 provider id `workbuddy-ai`，所有导入器都过滤掉了 WBI 模型；
  新增 `toProviderGroups()` 与 2 项单测。
- 设计稿：新增概览页；历史记录与备份合并为一张表（客户端/时间·模型数·状态/配置/备份 + 查看差异/打开目录/恢复）；
  来源页选中数与指标同字号、主色强调；登录弹窗改为官方窗口三步引导；导入抽屉去掉“预览”按钮、改为实时只读预览，
  并补充“默认模型”的语义说明。
- 验证：desktop typecheck、27 项测试（新增 2 项）。
