# Desktop prototype

v0.2.2 界面改版的可点击设计稿，用于确认信息架构与交互，**不是生产实现**。
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
| `screenshot-nvidia.png` | NVIDIA NIM：免费试用 + API Key |
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

- **NVIDIA NIM**（新来源）：来源页含「访问凭据」卡片（API Key 掩码 / 更新 / 获取 Key）、
  免费试用与限速提示、模型列表；侧栏与概览的模型源数量同步为 4。
- **导入目标**：新增 VS Code（Custom Endpoint，可自动写入）与 Cursor（仅引导，不写 SQLite / Keychain）；
  分组新增 `NV`；抽屉标题改为「7 个目标」，默认模型说明同步。
- **设置**：新增「界面语言」（跟随系统 / 简体中文 / English）与「网络代理」（跟随系统 / 自定义）。
- 版本标识更新为 0.2.3；新增截图：`screenshot-nvidia.png`、`screenshot-settings.png`、`screenshot-import.png`。
- 调研记录见 [docs/research-v0.2.3.md](../docs/research-v0.2.3.md)。
