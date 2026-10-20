# Desktop prototype

v0.2.5 界面改版的可点击设计稿，用于确认信息架构与交互，**不是生产实现**。
没有后端、不会写文件；模型、账号、额度、导入历史都是演示数据。

## 打开方式

直接双击 `index.html`，或在仓库根目录：

```sh
python3 -m http.server 8765 --bind 127.0.0.1
# http://127.0.0.1:8765/prototype/desktop/index.html
```

## 本次设计

- 经典左侧栏，可收起为图标栏；默认展开，状态记在 `localStorage`。
- 多页结构：**概览**、三个模型来源、历史记录、关于、设置。
- 概览页：网关状态、模型源数量、积分、最近一次导入四张指标卡；三个来源入口卡；最近 3 条导入记录。
- 主界面去掉主题切换；系统/浅色/深色只放在设置页。
- 来源页把“已选”并入“已发现 / 可用 / 待检测”同一排，只显示数字并用主色强调；删除“全局已选”。
- 左侧菜单数字显示 `已选/总数`，随勾选实时变化。
- 右下角应用 LOGO 动态头像（保留 ZEO 标签装饰），可拖动；点击进入关于页。
- 关于页：ZEO 个人 IP、项目介绍、音乐模块（两张最新专辑 + 最新/最热歌曲 tab + 右下角浮动 iframe 播放器）、支付宝/微信/更多方式赞助码。
- 音乐播放在点击歌曲后出现于右下角，作为全局单例播放器；可拖动、可关闭，不阻塞页面。
- 历史记录：导入记录与备份合并为一张表，行内四行信息（客户端 / 日期·模型数·状态 / 配置文件 / 备份文件），
  操作为“查看差异 / 打开目录 / 恢复”（三个统一的 ghost 按钮），不再使用含义不清的“变更”；最早记录标“基线”。
- 恢复弹窗采用垂直 tab：左侧 tabmenu（基线置顶，其余按时间倒序）与右侧 tabpanel 贯通——
  两者之间无分隔线、tabmenu 无内留白，选中 tab 与面板同底色并带左侧主色条；
  tab 内容只有“相对时间 + 日期”（日期为次级文案），不再显示第 N 次与文件大小；
  默认选中基线（无 AI Bobby 配置），右侧是“将恢复到”的摘要面板（标题 + 日期 + 备份/目标路径 + 恢复后影响）。
- 按钮系统：默认（次要）白底描边、`primary` 主操作、`ghost` 行内低频操作；字号/高度/hover 只在样式表一处定义，
  页面内不再覆写。生产实现对应 shadcn/ui `Button` 的 `variant`。
- 导入抽屉：客户端、分组、默认模型、变更预览；变更为**实时自动预览**，没有“预览”按钮；默认模型勾选文案写明只影响 Codex / Claude Code。
- 登录弹窗：不展示占位二维码，改为官方登录窗口的三步引导（真实二维码由官方页面生成）。
- 版本更新：顶部非模态更新条，支持发现新版本、下载进度、校验完成、稍后/立即重启；设置页有自动检查开关、手动检查与更新源。
- 三个来源页仍保留模型勾选、详情、账号条、导入抽屉。

## 深链接

```text
?page=overview           # 概览
?page=opencode           # 模型来源
?page=workbuddy
?page=wbi
?page=history            # 历史记录
?page=about              # 关于
?page=settings           # 设置
?tab=workbuddy           # 兼容旧链接
?drawer=1                # 打开导入抽屉
?login=1                 # 打开添加账号弹窗
?theme=light             # 浅色主题
?update=1                # 展示“发现新版本”状态
```

可组合，例如 `?page=history&theme=light`。

## 截图

| 文件 | 内容 |
|---|---|
| `screenshot-overview.png` | 概览（网关、模型源、积分、最近导入） |
| `screenshot-dark.png` | 首页（深色，默认） |
| `screenshot-workbuddy.png` | WorkBuddy + 账号条 |
| `screenshot-history.png` | 导入记录与备份合并表格 |
| `screenshot-diff.png` | 查看差异弹窗：次要/主要按钮 |
| `screenshot-restore.png` | 恢复弹窗：版本列表 + 默认选中基线 |
| `screenshot-nvidia.png` | NVIDIA NIM：免费试用 + 延迟探测 |
| `screenshot-cursor-guide.png` | Cursor 接入步骤（仅引导） |
| `screenshot-about.png` | 关于 + 赞助码 |
| `screenshot-music.png` | Support my music + 两张专辑 + 最新歌曲 |
| `screenshot-music-hot.png` | 最热歌曲 tab |
| `screenshot-music-player.png` | 右下角浮动网易云 iframe 播放器（可拖动） |
| `screenshot-settings.png` | 设置页（主题只在这里） |
| `screenshot-update-available.png` | 发现新版本 0.2.2 |
| `screenshot-update-downloading.png` | 下载并校验中 |
| `screenshot-update-ready.png` | 更新已就绪，等待重启 |
| `screenshot-collapsed.png` | 收起的侧边栏 |
| `screenshot-import.png` | 全局导入抽屉（实时变更预览） |
| `screenshot-login.png` | 添加账号弹窗（官方登录窗口引导） |
| `screenshot-light.png` | 浅色主题 |
| `screenshot-mobile.png` | 390px 移动布局 |

## 资源

- `assets/app-logo.svg`：应用当前使用的品牌 logo（侧边栏、favicon、浮动头像同源）。
- `assets/zeo-avatar.png`：关于页的 ZEO 头像。
- `assets/music-electro-surge.jpg`：最新 EP《Electro Surge》封面。
- `assets/music-zeo-album.jpg`：上一张专辑《ZEO》封面。
- `assets/sponsor-alipay.jpg` / `assets/sponsor-wechat.jpg` / `assets/sponsor-qr.svg`：赞助收款码，已本地化。

## v0.2.3 设计补充

- **NVIDIA NIM**（新来源）：来源页含「访问凭据」卡片——Key 掩码 + 眼睛显示 + 复制 + 更新；
  「检测全部」做真实最小对话探测，耗时按 ≤1s 绿 / ≤2s 黄 / >2s 红着色（所有来源统一），
  不再显示「慢」字；侧栏与概览的模型源数量同步为 4。
- **导入目标**：新增 VS Code（Custom Endpoint，可自动写入，Key 由 VS Code 迁入钥匙串）与
  Cursor（仅引导，不出复选框，点「接入步骤」弹窗复制 URL/Key，不写 SQLite / Keychain）；
  分组新增 `NV`。
- **设置**：新增「界面语言」（跟随系统 / 简体中文 / English）与「网络代理」
  （默认自定义 `http://127.0.0.1:10080`；关闭 / 跟随系统 / 自定义 + 按模型源勾选；OpenCode 子进程不受影响）。
- 细节规范：弹窗内容统一 20px 留白（小弹窗 16px）、步骤不贴边；卡片内容与边框至少 8px；
  复选框统一品牌色实心 + 白勾；复制的 Key / Base URL 都放弹窗 footer。
- **探测中状态**：点「检测全部」后，待检测行的状态列显示旋转指示 +「检测中…」，按钮变为禁用「检测中…」，
  反馈条显示正在检测的模型数量；完成后才写入延迟与可用状态。更新 Key 只读取目录，不自动探测。
- **Codex 元数据覆盖**：勾选 Codex 后，导入抽屉显示「Codex 元数据 5/8」；缺少元数据的模型
  以黄色 chip 列出，并明确“不会写入 Codex 模型选择器，其他客户端仍会导入”，避免勾选后在 Codex 里不可用。
- 版本标识更新为 0.2.3；截图：`screenshot-nvidia.png`、`screenshot-nvidia-probing.png`、
  `screenshot-settings.png`、`screenshot-import.png`、`screenshot-cursor-guide.png`。
- 调研记录见 [docs/research-v0.2.3.md](../../docs/research-v0.2.3.md)。

### v0.2.5：本地开发版与线上版隔离

**目标**：同一个开发者可以在同一台 Mac 上同时运行线上版与开发版，数据、端口、Key、导入配置互不影响。
开发模式只给开发者使用，不是普通用户可见的设置项。

**落地策略（建议）**

- 触发：`pnpm dev` 或 `AI_BOBBY_DEV=1`；打包/安装版默认生产模式。
- 身份：开发版 window title / bundle display name `AI Bobby Dev`；独立 `userData`（`~/Library/Application Support/AI Bobby Dev`），单实例锁互不冲突。
- 网络：开发版固定/默认 `46891`，生产继续 `46890`；独立 API Key。
- 来源前缀：`Dev.OC` / `Dev.WB` / `Dev.WBI` / `Dev.NV`（显示名）；模型 ID 用 `dev-oc/`、`dev-wb/` 等稳定前缀，避免与线上 `oc/`、`wb/` 冲突。
- 导入命名空间：
  - WorkBuddy：`aiBobbyOwner = ai-bobby-dev`，只增删 dev 条目；
  - Codex：`[model_providers.ai-bobby-dev]`，块标记 `ai-bobby-dev`，不碰线上 `ai-bobby`；
  - DSH：`providers.ai-bobby-dev`；
  - VS Code：provider `AI Bobby Dev`；
  - Claude Code：单端点，Dev 模式**不写入**，避免覆盖线上 `ANTHROPIC_*`；需要时用独立 `CLAUDE_CONFIG_DIR` 手动测试；
  - Cursor：仅引导，不变。
- 清理：开发版可提供“移除 Dev 导入”入口，只删 `ai-bobby-dev` 命名空间，不触碰线上。
- 安全：开发版仍然只监听 loopback；不复用线上 API Key；日志/诊断标记 `dev`。

视觉：

- 标题栏 `DEV · 46891` 徽标 + 顶部 Development build 横幅；导入面板**不在顶部放 Dev 提示**，只在每个可写客户端条目上加 `DEV` 标签（Claude Code 显示 `Dev 不写入`）；侧栏与模型前缀使用
  `Dev.OpenCode` / `Dev.WorkBuddy` / `Dev.OC.` / `dev-oc/...`。
- WBI：维护中（0.2.4 起暂禁用）。
- 托盘：目标 18×18 @1x / 36×36 @2x，裁掉 SVG 留白，与 WorkBuddy 视觉高度接近。
  ![Tray icon](assets/tray-icon-36.png)

截图：`screenshot-dev-mode.png`、`screenshot-dev-import.png`、`screenshot-about.png`。


- i18n：状态栏英文为 `Running · 10 models` / `Running · 2 accounts`，与模型数/账号数解耦；不再出现中文混排。

- 多账号：账号条支持拖动排序，第一位即 `preferred`；拖动后顺序立即写入优先级，失败切换仍按 `round-robin + 冷却` 执行。

## v0.3.0 外部来源设计

设计目标：外部工具不打包，但用户授权后可以完成**检测 → 安装 → 连接 → 诊断**，而不是只给说明。

覆盖状态：

- 已运行：`检测到 Magpie / WorkBuddy2API Hub`，直接连接；
- 已安装未运行：启动并连接；
- 未安装：展示来源/License/风险，用户勾选确认后进入安装；
- 安装需要管理员权限：先说明，随后自动请求系统授权；取消即中止；
- 外部来源失败只影响自身，内置来源不受影响；
- WBI 内置仍维护中；Hub 连接后模型以 `hub/` 前缀出现，不伪装成官方 `wbi/`。

截图：

| 文件 | 内容 |
|---|---|
| `screenshot-external-source.png` | 外部来源页：EXTERNAL 徽标、健康/成功率/p95/最近错误、请求日志入口 |
| `screenshot-source-detected.png` | 添加来源：检测到 Magpie，风险确认后连接 |
| `screenshot-source-install.png` | 添加来源：未安装 Hub，高风险 + 管理员权限前置说明 |
| `screenshot-source-hub-detected.png` | 已运行 Hub：直接提示连接 |
| `screenshot-wbi-unlock.png` | WBI 维护页：可选 WorkBuddy2API Hub 解锁 |
| `screenshot-settings-connectors.png` | 设置 → 连接器：已连接/未安装/高风险 |
| `screenshot-import-v03.png` | 导入抽屉新增 CodeBuddy Code |

深链接：`?source=magpie`、`?source=hub`、`?source=hub&detected=1`、`?page=wbi`。

### 设计复用约定

- “添加外部来源”弹窗直接复用历史记录“恢复”弹窗的 `restore-tabs` / `restore-tab` / `restore-tabpanel` 交互与视觉：左侧竖向 tab、无分隔线、选中项与右侧面板同底色、左侧主色条。
- 后续遇到 tab panel、抽屉、弹窗、表格、空状态等交互，先检查 `prototype/desktop` 与生产组件是否已有实现；不要另起一套。
