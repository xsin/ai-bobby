# AI Bobby 落地页 PRD（prd-landing）

- 当前版本：v0.2.1
- 日期：2026-10-18
- 状态：**已实现并部署到 gh-pages 根路径**
- 关联：[README.md](../README.md)、[handsoff.md](../handsoff.md)、[tech-landing.md](./tech-landing.md)
- 视觉稿：[prototype/website/index.html](../prototype/website/index.html)
- 实现：[apps/website](../apps/website)

---

## 1. 目标

为 AI Bobby 做一个**能直接转化开发者/独立黑客**的产品落地页：

1. 10 秒内说清：三个模型来源 → 一个本机端点 → 三种协议 → 四个客户端。
2. 用 Web3D 视觉建立“本地 AI 基础设施”的技术质感，而不是普通 SaaS 模板。
3. 让访客完成至少一个动作：
   - 复制安装命令
   - 点 GitHub / Release
   - 安装 PWA / 订阅更新提示
4. 作为后续 marketing 试点的默认落地页与 UTM 承接页。

### 非目标

- 不做博客、文档站、控制台、账号系统。
- 不做在线 Demo（真实网关不能暴露到公网）。
- 不堆功能清单；首屏只讲一个核心承诺。

---

## 2. 目标用户

| 用户 | 痛点 | 页面要给的证据 |
|---|---|---|
| 同时用 Codex / Claude Code / WorkBuddy 的开发者 | 每个客户端各配一个代理、Key 和账号 | 三种协议 + 一键导入 |
| 关注隐私的本地 AI 用户 | 不想把会话/Key 交给云端 | 127.0.0.1、Origin 403、无遥测 |
| 独立黑客 / OSS 作者 | 想要一个“能跑”的本地网关，不想读长文档 | 一条安装命令、macOS 安装包 |
| 模型薅羊毛用户 | 免费模型分散、名字带 free 不一定真免费 | 按价格字段筛免费模型 |

---

## 3. 核心叙事

**Hero**：`All your models. One endpoint.`
中文辅助：把 OpenCode、WorkBuddy 与 WorkBuddy AI 收进一个只监听本机的 OpenAI 兼容端点。

**三段价值**

1. **Three sources. One key.** — 三个来源独立登录/刷新/冷却，网关只暴露合并清单。
2. **Every protocol your stack speaks.** — Chat / Responses / Anthropic Messages 共用 Canonical 事件流。
3. **One click. Every client.** — dry-run + 备份 + 幂等导入 WorkBuddy / Codex / Claude Code / DSH。
4. **Yours. Not the cloud's.** — 回环地址、Key 本机、无账号系统、无会话云同步。

**收尾 CTA**：`Stop juggling five proxies.` + 安装命令 + GitHub / Release。

---

## 4. 信息架构

```text
Nav
├── Sources
├── Protocols
├── Import
├── Local-first
├── GitHub
└── Install

Hero
├── eyebrow: LOCAL AI GATEWAY / v0.2.1
├── H1: All your models. One endpoint.
├── 说明 + 安装命令 + See the flow
├── 来源轨道（SVG + WebGL + 标签）
└── 实时终端卡片（health / models）

01 Sources
├── 标题 + 旁白
└── 三张来源卡（OpenCode / WorkBuddy / WorkBuddy AI）

02 Protocols
├── 标题 + 旁白
├── Tab: Chat / Responses / Anthropic Messages
├── 代码示例（可切换）
└── Endpoint / Auth / Streaming / capability pills

03 Import
├── 标题 + 旁白
├── 客户端 marquee
├── 导入说明 + 目标路径
└── Codex config dry-run diff

04 Local-first
├── 标题 + 旁白
└── 四张安全卡（回环、Key、Failover、无遥测）

Install CTA
├── Stop juggling five proxies.
├── 安装命令（复制）
└── GitHub / Release notes

Footer
PWA install prompt + update toast
```

---

## 5. 视觉方向（以视觉稿为准）

- **底色**：近黑 `#05070d`，避免纯黑死板。
- **主色**：电光克莱因蓝 `#1e4fff`；辅助 `#5d8bff`、青色 `#8ff7ff`、紫色 `#8b6cff`。
- **字体**：Space Grotesk（标题/正文）+ JetBrains Mono（代码/标签）。
- **Web3D**：GLSL 星云/能量环 + Three.js 粒子流 + 线框环；鼠标视差；滚动时保持低亮度，不抢正文。
- **HTML/CSS 视觉层**：玻璃卡片、细边框、极细网格、噪点、SVG 轨道连线。
- **动效**：短、克制；hero 入场、滚动 reveal、数字计数、marquee、终端光标、复制反馈。
- **禁止**：彩虹渐变堆叠、无意义 3D 旋转、自动播放视频、过度粒子。

视觉稿入口：[`prototype/website/index.html`](../prototype/website/index.html)

---

## 6. 功能需求

### FR-1 首屏

- H1、副标题、安装命令、GitHub、See the flow。
- 安装命令点击复制完整命令，显示 1.5s “Copied”。
- 终端卡片展示 `/health` 与 `/v1/models` 示例。
- 首屏 CTA 在 375px 宽度仍不横向滚动。

### FR-2 来源区

- 三张卡片：OpenCode / WorkBuddy / WorkBuddy AI。
- 每张卡展示：登录方式、免费模型/多账号说明、模型前缀。
- WorkBuddy 多账号不写死“最多 N 个”；用“∞ / multi-account”表达。

### FR-3 协议区

- 三个 tab：Chat Completions / Responses / Anthropic Messages。
- 切换 tab 更新路径、curl 示例、客户端标签。
- 代码只读；不执行任何请求。
- 显示 Endpoint、Auth、Streaming、tools/images/reasoning/usage。

### FR-4 导入区

- 客户端 marquee：WorkBuddy、Codex、Claude Code、DSH、OpenCode。
- Codex `config.toml` dry-run diff 示例。
- 文案强调：备份、只改标记条目、幂等、可回滚（UI 回滚按钮尚未暴露）。

### FR-5 本机安全区

- 四个卖点：127.0.0.1、Key 本机、failover、无产品分析 SDK。
- 不宣称“绝对安全”；写清浏览器 Origin 403、日志脱敏、账号库当前 0600 明文。

### FR-6 PWA

- 可安装（manifest + service worker）。
- 安装提示：首次访问且满足可安装条件时，底部左侧出现非模态提示；可关闭，7 天内不再自动弹。
- 更新提示：service worker 检测到新版本时，底部右侧出现 `New version available · Refresh`；点击后 `skipWaiting` + reload。
- 离线：缓存 shell 与静态资源；不缓存 API 响应。
- 不拦截首屏；PWA 逻辑延迟加载。

### FR-7 SEO / 分享

- 标题/描述/OG/Twitter Card。
- `lang=zh-CN` 默认；页面提供中英文切换，切换后同步 `html lang`/title/description。
- 语义化 section、唯一 H1、图片 alt。
- 提供 `robots.txt` + `sitemap.xml`（部署在根路径）。

### FR-8 国际化（v1 必须）

- 支持 **中文 / English** 切换，默认跟随浏览器语言，选择持久化到 `localStorage`。
- 切换后同步 `<html lang>`、`document.title`、meta description。
- 所有用户可见文案（导航、Hero、来源、协议、导入、安全、CTA、PWA toast、footer）都要翻译。
- 语言切换不改变布局、不重置表单/滚动位置。
- 中文/英文文案结构保持一一对应，CI 用 key/shape 测试兜底。

### FR-9 分析

- v1 不接第三方分析 SDK；只用 GitHub Release 下载量/仓库 star 作为粗指标。
- 如需 UTM，使用纯前端 `location.search` 透传到 GitHub 链接，不发送到第三方。

---

## 7. 响应式与可访问性

- 断点：`1050px`（hero 单列）、`760px`（移动导航、单列卡片）。
- 最小支持 375×667；无横向滚动。
- 键盘：所有可交互元素可 Tab；移动菜单 `aria-expanded`；tab 用 `role=tab`/`aria-selected`。
- 颜色对比：正文 ≥ 4.5:1；大标题 ≥ 3:1；不仅靠颜色表达状态。
- `prefers-reduced-motion`：关闭 WebGL 动画、marquee、reveal 位移；保留静态视觉。
- WebGL 失败/无 GPU：自动加 `no-webgl`，用 CSS 渐变降级。

---

## 8. 性能预算

| 指标 | 目标 |
|---|---|
| LCP（移动 4G） | ≤ 2.5s |
| CLS | ≤ 0.05 |
| INP | ≤ 200ms |
| 首屏 JS（gzip） | ≤ 180KB（Three.js 懒加载后） |
| 首屏图片 | ≤ 150KB（优先 SVG/CSS） |
| WebGL 帧率 | 桌面 ≥ 50fps；移动可降到 30fps |
| Lighthouse Performance | ≥ 85（桌面）/ ≥ 75（移动） |

Three.js 与 shader 场景必须动态 `import()`；首屏先渲染 HTML/CSS，再增强。

---

## 9. 发布与路径

- 生产项目：`apps/website`（`@ai-bobby/website`）。
- 部署：GitHub Actions 构建后发布到 `gh-pages` **根路径**：
  `https://xsin.github.io/ai-bobby/`
- 根目录的 landing 与 `/releases/latest/` 安装通道共存；website 部署必须保留 `releases/`。
- release workflow 只更新 `releases/latest`，不得覆盖根 `index.html`（landing 归 website workflow 所有）。
- 后续若有自定义域名，可继续保留 `/releases/` 作为安装通道。

---

## 10. 验收

- [x] 视觉稿经用户确认。
- [ ] 桌面/移动/浅色/深色（landing 只做深色，但需在浅色系统下仍可读）。
- [ ] 首屏 CTA 可复制、GitHub/Release 链接正确。
- [ ] 三个协议 tab 切换正确。
- [ ] PWA 可安装；新版本能出现更新提示并刷新。
- [ ] `prefers-reduced-motion` 下无动画但内容完整。
- [ ] WebGL 失败时仍可用。
- [x] GitHub Actions 发布到根路径，不破坏 `/releases/latest/`。
- [ ] 通过性能预算与基础 a11y 检查。

---
