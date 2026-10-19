# v0.2.3 调研

- 日期：2026-10-19
- 对应 issue：[issues.md](../issues.md) 的 `v0.2.3` 段
- 状态：调研完成，等待设计稿确认后再编码

## 1. 一键安装脚本

### 现状

`scripts/release/install.sh` 目前默认装到 `~/Applications/AI Bobby.app`；`--system` 直接写
`/Applications/AI Bobby.app`；`--install-dir` 可完全自定义。安装后由 updater 通过
`mv` + `ditto` 替换 app bundle，因此**父目录必须对当前用户可写**。

### 目标行为

| 场景 | 安装位置 | 权限处理 |
|---|---|---|
| 默认 | `/Applications/AIMatrix/AI Bobby.app` | `/Applications` 可写则直接安装；不可写时回退 `~/Applications/AIMatrix`，并打印原因 |
| `--system` | `/Applications/AIMatrix/AI Bobby.app` | 不可写时请求管理员授权；完成后把 `AIMatrix` 目录所有权交还安装者 |
| `--install-dir <dir>` | 完全按指定路径 | 不自动回退、不改权限 |

成功安装后清理旧默认位置 `~/Applications/AI Bobby.app`（以及 `/Applications/AI Bobby.app`），
只在这两个受管路径执行；`--install-dir` 指向的自定义目录不清理。

### 实现要点

- 可写判断用 `[ -w /Applications ]` + `mkdir -p` 实际试探；失败再回退，避免 TOCTOU。
- `--system` 提权：终端里优先 `sudo`（`/dev/tty` 可提示），非交互环境可用
  `osascript -e 'do shell script ... with administrator privileges'`；两条路径都要有清晰错误提示。
- 安装后 `chown -R "$(id -u):$(id -g)" /Applications/AIMatrix`，保证 updater 能替换 bundle。
- 旧路径清理只 `rm -rf` 精确路径，且与当前安装路径不同；先停掉运行中的 app。
- 保留现有校验和、架构选择、quarantine 清理、`--no-launch` 行为。
- 风险：受管 Mac / MDM 下 `/Applications` 权限可能与 `-w` 不一致；`sudo` 只提权到必要命令；
  Gatekeeper 首次启动仍需 `xattr`。

## 2. VS Code 作为导入目标

### 结论：可行，可自动写入

VS Code 的 **Custom Endpoint** 支持 Chat Completions / Responses / Anthropic Messages 三种
API 类型，且 BYOK 不要求 GitHub 账号或 Copilot 订阅；配置保存在用户目录：

```
~/Library/Application Support/Code/User/chatLanguageModels.json
~/Library/Application Support/Code - Insiders/User/chatLanguageModels.json
```

结构（官方示例）是数组，provider 用 `vendor: "customendpoint"`，可以：

- 用 provider 级 `url` 让 VS Code 自动发现模型（GET `{url}/models`）；
- 或用 `models[]` 显式列模型（每项含 `id` / `name` / `url` / `toolCalling` / 上下文等）；
- `apiKey` 建议写成 `${input:aiBobbyApiKey}`，由 VS Code 首次使用时提示输入，避免明文落盘
  （本机现有配置也使用这种 input 变量）。

**本机实测**：VS Code 1.142 已存在该文件，自定义 provider 使用
`vendor: customendpoint`、`apiKey: ${input:...}`、每个模型写 `http://.../v1/chat/completions`。

### 建议的导入设计

- 自动探测 Code / Code - Insiders；合并一个名为 `AI Bobby` 的 provider，不覆盖其他 provider。
- 写 provider 级 `url: http://127.0.0.1:46890/v1` + `apiType: chat-completions`；
  首次使用时 VS Code 提示粘贴 AI Bobby Key。
- JSON 解析失败则拒绝写入并提示手动处理；写前备份、原子替换；重复导入幂等。
- 写入后提示“重启 VS Code 生效”。
- 备选：如果自动发现不兼容，则回退为显式 `models[]`（AI Bobby `/v1/models` 的 id/name）。

来源：<https://code.visualstudio.com/docs/agent-customization/language-models>

## 3. Cursor 作为导入目标

### 结论：只做引导，不写数据库

Cursor 的设置不在 JSON 里，而在 SQLite：

```
~/Library/Application Support/Cursor/User/globalStorage/state.vscdb
```

- Base URL 存在 `applicationUser` JSON blob 的 `openAIBaseUrl` 字段；
- 自定义模型在 `aiSettings.userAddedModels` 等字段；
- API Key 存在 `secret://cursorAuth/openAIKey`，由 Cursor 自己的 `safeStorage`/Keychain 加密；
  AI Bobby 无法可靠地代写（不同 app 的 Keychain 身份不同）。

已有第三方工具会关闭 Cursor 后写 SQLite 并调用 Cursor 的加密逻辑，但这依赖 Cursor 内部 schema，
升级即可能失效，且有损坏数据库的风险。

### 建议

- v0.2.3 仅提供**引导模式**：打开 Cursor Settings → Models，复制 Base URL 与 Key，用户手动粘贴；
  勾选 Cursor 时只展示步骤，不写 `state.vscdb`。
- 提示限制：Override 只影响 Chat / Agent，不影响 Tab 自动补全；开启 override 后 Cursor 托管模型也会走该地址。
- 后续若要半自动，再加“退出 Cursor 后写入 Base URL + 模型（Key 仍手动）”作为高级选项。

来源：
- <https://forum.cursor.com/t/how-to-use-a-custom-openai-compatible-api-in-cursor-setup-limits-and-tips/171497>
- <https://github.com/fw-ai/fireconnect/blob/0ff8a6c5/packages/setup-cli/lib/harnesses/cursor/core.mjs>

## 4. NVIDIA NIM 免费模型源

### 结论：可接，OpenAI 兼容，按 API Key 认证

- Base URL：`https://integrate.api.nvidia.com/v1`
- 认证：`Authorization: Bearer $NVIDIA_API_KEY`
- API Key：<https://build.nvidia.com/settings>
- 所有 NIM 端点实现 OpenAI Chat Completions；官方 FAQ 说明所有模型提供免费试用额度、
  无需信用卡，注册即可生成 Key。免费额度受上游限速。
- `GET /v1/models` 可公开访问（本机实测 200，81 个模型），但**不区分是否免费/是否可对话**，
  也包含 embedding / vision / safety 等非 chat 模型；官方也没有额度/计费查询接口。
- 本机实测网络可达（0.46s）；中国大陆网络可能需要代理。

### 建议的 provider 设计

- 新增 provider `nvidia`，模型 ID 前缀 `nv/`，显示名 `NV. <name>`。
- 鉴权：粘贴 API Key，`0600` 保存；提供“验证 Key / 读取模型”。
- 模型列表：调用 `/v1/models` 后做对话探测（可批量、可单个重测），标记 `available` /
  `chat_only` / `pending` / `unavailable`；**不展示额度/积分**，只标“免费试用 / 限速”。
- 导入：作为第 4 个分组 `NV`，可被 WorkBuddy / Codex / Claude / DSH / VS Code 目标导入。
- 代理：Node 的 fetch 默认不走系统代理；若需要，在设置里加“网络代理”（跟随系统/自定义），
  仅作用于上游 HTTP 请求，不影响 OpenCode 子进程。

来源：
- <https://build.nvidia.com/llms.txt>
- <https://docs.api.nvidia.com/nim/reference/llm-apis>
- <https://stevescargall.com/blog/2026/04/using-the-api-to-find-free-hosted-models-on-nvidia-builder/>

## 5. i18n（中英文，默认跟随系统）

### 现状与工作量

- 渲染层约 **381 条唯一中文文案**，分布在 **15 个 tsx/ts 文件**（App、侧栏、各页面、弹窗、
  导入抽屉、关于页、播放器等）。
- 主进程也有用户可见中文：更新、导入/恢复、网关错误等；这些会直接显示在 toast / 弹窗里。
- 网站已有小型 i18n 字典（zh/en）可复用思路，但桌面端更复杂（状态文案、日期、金额、错误）。

### 建议方案

- 轻量 typed dictionary：`src/renderer/src/i18n/{zh,en}.ts` + `t(key, params)` hook；
  不引入 i18next（收益低）。
- 默认语言：`app.getLocale()` / `navigator.language`，`zh*` → 中文，其他 → English；
  设置页新增「界面语言」：跟随系统 / 简体中文 / English，持久化到本机设置。
- 主进程错误改为**错误码 + 参数**（或英文 key），渲染层翻译；避免在主进程硬编码中文。
- 日期/金额/数字统一 `Intl.DateTimeFormat` / `Intl.NumberFormat`；模型名、上游 ID 不翻译。
- 测试：zh/en key 集合一致（类似网站 i18n.test），关键界面快照英文版。
- 范围：v0.2.3 先覆盖控制面板全部可见文案；主进程错误本期至少覆盖 toast/弹窗常见路径。

### 设计影响

- 设置页新增语言分段控件；英文文案长度按 1.3× 预留，按钮不换行；导航/表头允许截断。
- 英文模式下 `已选`、计费倍率、状态标签等需要固定宽度，避免布局跳动。

## 6. 设计稿改动（prototype/desktop）

- 侧栏新增 **NVIDIA NIM** 来源；来源页含“访问凭据”卡片、免费试用提示、模型列表。
- 导入抽屉新增 **VS Code**（可自动写入）与 **Cursor**（仅引导，不写数据库），分组新增 `NV`。
- 设置页新增 **界面语言**（跟随系统 / 简体中文 / English）与 **网络代理**（跟随系统 / 自定义）。
- 版本标识更新为 0.2.3，概览模型源改为 4。

截图：`prototype/desktop/screenshot-nvidia.png`、`screenshot-settings.png`、`screenshot-import.png`。

## 待确认

1. 安装脚本默认目录 `/Applications/AIMatrix`、回退与 `--system` chown 方案是否按上表执行。
2. VS Code 自动写入是否接受 `${input:aiBobbyApiKey}`（首次粘贴 Key），还是希望直接写 Key。
3. Cursor 本期只做引导是否可以；还是一定要尝试半自动写 SQLite。
4. NVIDIA 是否作为正式第 4 个来源；免费试用 + 对话探测的呈现是否OK。
5. 网络代理是否要放进本期（影响 NVIDIA / WorkBuddy）；还是先用环境变量。
6. i18n 的范围与默认语言规则是否确认；英文文案是否需要在设计稿里逐页预览。
