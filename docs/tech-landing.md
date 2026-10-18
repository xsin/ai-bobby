# AI Bobby 落地页技术方案（tech-landing）

- 版本：v0.1（视觉方向评审稿）
- 日期：2026-10-18
- 状态：**已确认并实现（`apps/website`）**
- 关联：[prd-landing.md](./prd-landing.md)、[README.md](../README.md)、[handsoff.md](../handsoff.md)
- 视觉稿：[prototype/website/index.html](../prototype/website/index.html)
- 实现：[apps/website](../apps/website)

---

## 1. 技术栈

全部版本通过 pnpm workspace `catalog:` 统一管理（`pnpm-workspace.yaml`）。

| 层 | 选型 | 版本 |
|---|---|---|
| 框架 | React + React DOM | 19.3.1 |
| 构建 | Vite | 8.3.4 |
| 语言 | TypeScript | 7.0.2 |
| 样式 | Tailwind CSS + `@tailwindcss/vite` | 4.3.3 |
| 组件 | shadcn/ui（Radix UI + cva） | radix-ui 1.8.1 / cva 0.7.1 |
| 图标 | lucide-react | 1.59.0 |
| 3D | three.js + 自定义 GLSL | 0.186.1 |
| PWA | vite-plugin-pwa + workbox-window | 2.0.0 / 7.4.1 |
| 测试 | Vitest | 5.0.5 |
| 部署 | GitHub Actions → gh-pages 根路径 | — |

> 不引入 antd：landing 没有数据表格需求；shadcn/Radix 足够。
> 不引入动画库：CSS + IntersectionObserver + 少量 JS 控制，减少首屏体积。
> 不引入分析 SDK。

---

## 2. 目录

```text
apps/website/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── public/
│   ├── favicon.svg
│   ├── og.png
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── content.ts              # 所有文案/链接/代码示例
    ├── components/
    │   ├── Nav.tsx
    │   ├── Hero.tsx
    │   ├── HeroCanvas.tsx      # lazy: three.js scene
    │   ├── SourceGrid.tsx
    │   ├── ProtocolTabs.tsx
    │   ├── ImportFlow.tsx
    │   ├── SecurityGrid.tsx
    │   ├── InstallCta.tsx
    │   ├── Footer.tsx
    │   ├── PwaPrompts.tsx
    │   └── ui/                 # shadcn 组件（button/dialog/tabs/toast…）
    ├── lib/
    │   ├── copy.ts
    │   ├── motion.ts
    │   ├── pwa.ts
    │   └── utils.ts
    ├── shaders/
    │   ├── backdrop.vert.glsl
    │   ├── backdrop.frag.glsl
    │   ├── particles.vert.glsl
    │   └── particles.frag.glsl
    └── styles/
        └── index.css
```

视觉稿当前是 vanilla HTML/CSS/JS，入口为 `app.bundle.js`：Three.js 与字体放在
`prototype/website/vendor/`，用 esbuild 打成 classic IIFE，因此可从 `file://` 直接打开。
生产实现按上面拆成 React 组件；CSS 变量、排版、间距与视觉稿保持同源。

---

## 3. 渲染与 Web3D

### 3.0 i18n

- `src/i18n.tsx`：`zh` / `en` 两份同构字典 + React context；`useI18n()` 读取。
- 初始化：`localStorage("ai-bobby-locale")` → `navigator.language` 兜底。
- 切换：`<html lang>`、`document.title`、meta description 同步更新；`localStorage` 持久化。
- 结构测试：`src/i18n.test.ts` 比较中英文 key/shape，防止漏翻。
- 语言按钮在 nav；移动端仍可见。

### 3.1 首屏分层

```text
Layer 0  <canvas>           WebGL 背景（懒加载，fixed）
Layer 1  CSS 渐变/网格/噪点  无 WebGL 时的降级
Layer 2  SVG 轨道/连线       来源轨道、节点标签
Layer 3  HTML 内容           hero、终端卡、CTA
Layer 4  固定 UI             nav、scroll progress、PWA toast
```

- 首屏 HTML/CSS 先渲染；`Three.js` 在 `requestIdleCallback` 或 `useEffect` 中动态 `import('three')`。
- hero 进入视口且页面可见时才启动 RAF；离开/隐藏时暂停。
- `renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8))`；移动端降到 1.5。
- 不加载贴图；所有视觉由 shader + 粒子 + CSS 生成。
- 不使用 postprocessing（bloom 等），避免额外 render target 与包体。
- WebGL context lost 时加 `no-webgl` 类并停止 RAF。

### 3.2 Shader

- `backdrop.frag.glsl`：
  - UV/极坐标能量环、星点 hash、鼠标偏移、时间。
  - 输出近黑底 + 克莱因蓝 + 青色高光；亮度受控，正文对比不受影响。
- `particles.vert/frag.glsl`：
  - 1400 个点，球形壳分布；`gl_PointSize` 随距离/脉冲变化；additive blending。
- 颜色统一从 CSS token 注入（`--blue` / `--cyan`），避免 shader 与设计稿漂移。
- 所有 uniform 在 resize / visibility / reduced-motion 下正确更新。

### 3.3 降级

| 条件 | 行为 |
|---|---|
| `prefers-reduced-motion: reduce` | 不加载 Three.js；静态 CSS 渐变 + SVG |
| WebGL 不可用/上下文丢失 | `no-webgl`；保留内容与 CTA |
| 低端设备（`hardwareConcurrency <= 4` 或内存不足） | 粒子数减半、DPR 1.25、30fps |
| 页面隐藏 | 暂停 RAF、停止时间累积 |

### 3.4 生命周期

- React 组件 `useEffect` 创建/销毁 renderer、geometry、material、texture、event listener。
- StrictMode 下必须可重复 mount/unmount，不泄漏 WebGL context。
- 使用 `ResizeObserver` 或 window resize；清理 RAF 与 observer。

---

## 4. UI 与样式

- Tailwind 4 + CSS 变量；颜色/字号/间距在 `styles/index.css` 定义，shadcn token 映射。
- 组件：
  - `Button`（shadcn）用于 Install / Refresh / Copy；
  - `Tabs` 用 Radix/shadcn，支持键盘左右箭头；
  - Toast 用 shadcn/sonner，PWA 提示也用同一套视觉；
  - Dialog 仅在需要“安装说明”时使用，默认非模态。
- 字体：生产环境自托管 `Space Grotesk` / `JetBrains Mono` 的 woff2 子集，
  避免 Google Fonts 第三方请求；视觉稿已把字体/Three.js 本地化到 `vendor/`。
- 动效使用 CSS `transform/opacity`，避免布局抖动；`will-change` 只给 hero 层。
- 所有交互元素有 `:focus-visible` 样式；移动菜单管理 `aria-expanded`。

---

## 5. PWA

### 5.1 配置

```ts
VitePWA({
  registerType: 'prompt',
  injectRegister: false,
  base: '/ai-bobby/',
  scope: '/ai-bobby/',
  manifest: {
    name: 'AI Bobby',
    short_name: 'AI Bobby',
    start_url: '/ai-bobby/',
    display: 'standalone',
    background_color: '#05070d',
    theme_color: '#1e4fff',
    icons: [/* 192, 512, maskable */],
  },
  workbox: {
    navigateFallback: '/ai-bobby/index.html',
    globPatterns: ['**/*.{js,css,html,svg,woff2}'],
    runtimeCaching: [
      // 只缓存静态资源；不缓存 127.0.0.1 API
    ],
  },
})
```

### 5.2 自动更新提醒

```ts
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    showUpdateToast({
      onRefresh: () => updateSW(true),
    })
  },
  onOfflineReady() {
    showOfflineReadyToast()
  },
  onRegisteredSW(_url, registration) {
    if (!registration) return
    setInterval(() => registration.update(), 60 * 60_000)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) registration.update()
    })
  },
})
```

- `registerType: 'prompt'`：绝不静默刷新，避免用户正在阅读时页面跳变。
- 更新 toast：右侧底部，`New version available` + `Refresh`；点击后 `skipWaiting` + reload。
- 安装提示：监听 `beforeinstallprompt`，保存事件；用户点击 Install 时 `prompt()`；
  关闭后 7 天内不再自动弹（localStorage）。
- iOS Safari 无 `beforeinstallprompt`：显示“分享 → 添加到主屏幕”的文字提示。
- 离线只保证 shell 可打开；API 请求永远走网络。

### 5.3 更新检测的边界

- 首次访问不显示更新提示。
- 如果新版本在用户停留期间发布，最长 60 分钟或下次回到页面时检测。
- 用户忽略后，当前会话不再重复弹；下次访问可再提示。

---

## 6. 部署

### 6.1 路径

```text
https://xsin.github.io/ai-bobby/
```

- `vite.config.ts` 的 `base` 必须是 `/ai-bobby/`。
- 根路径同时承载 landing 与安装通道：`/releases/latest/install.sh`、`latest.json`。
- website workflow 部署根路径时必须保留 `releases/`；release workflow 只更新 `releases/latest`，不覆盖根 `index.html`。

### 6.2 GitHub Actions（`.github/workflows/website.yml`）

触发：

```yaml
on:
  push:
    branches: [main]
    paths:
      - 'apps/website/**'
      - 'pnpm-workspace.yaml'
      - 'pnpm-lock.yaml'
      - '.github/workflows/website.yml'
  workflow_dispatch:
```

构建：

```yaml
- uses: actions/checkout@v7
- uses: pnpm/action-setup@v4
  with: { version: 10.15.1, run_install: false }
- uses: actions/setup-node@v7
  with: { node-version: 24, cache: pnpm }
- run: pnpm install --frozen-lockfile
- run: pnpm --filter @ai-bobby/website typecheck
- run: pnpm --filter @ai-bobby/website test
- run: pnpm --filter @ai-bobby/website build
```

发布（自定义脚本，显式保留 `releases/`）：

```yaml
- name: Deploy to gh-pages root
  env:
    GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: |
    SITE="$RUNNER_TEMP/gh-pages"
    git clone -q --depth 1 --branch gh-pages \
      "https://x-access-token:${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" "$SITE"
    cd "$SITE"
    rm -rf website
    cp -R "$GITHUB_WORKSPACE/apps/website/dist/." .
    touch .nojekyll
    git add -A
    git commit -q -m "site: deploy AI Bobby landing page" || true
    git push origin HEAD:gh-pages
```

> 不能使用会清空目标分支的部署方式；根目录已有 `releases/latest`，website 和 release
> 两个 workflow 必须共享 gh-pages。`release.yml` 只替换 `releases/latest`，保留根 index。

### 6.3 缓存

- `index.html`：`Cache-Control: no-cache`（GitHub Pages 默认即可）。
- 带 hash 的 JS/CSS/字体：长缓存。
- Service worker 文件名带 hash；更新由 workbox 控制。
- 不使用 Cloudflare 等额外 CDN；Pages 自带。

---

## 7. SEO / 分享

- `index.html`：title、description、canonical、OG/Twitter、theme-color、apple-touch-icon。
- `og.png` 1200×630，放在 `public/`。
- `robots.txt` 允许抓取；`sitemap.xml` 只含 `/ai-bobby/`。
- 结构化数据：`SoftwareApplication` JSON-LD（name、operatingSystem、offers 免费）。
- 不生成多语言路由；v1 中英混排，后续再加 i18n。

---

## 8. 测试

| 类型 | 工具 | 覆盖 |
|---|---|---|
| 组件 | Vitest + Testing Library | tabs、copy、toast、导航 |
| PWA | 手动 + Lighthouse | manifest、install、update prompt |
| 可访问性 | axe / Lighthouse | 对比度、焦点、aria、tab 键盘 |
| 视觉 | Playwright 截图（可选） | 1440 / 768 / 390 三档 |
| 性能 | Lighthouse CI | LCP/CLS/INP、JS 体积 |
| 降级 | 手机关 WebGL / reduced motion | 内容完整、无报错 |

CI 至少跑 typecheck + unit test + build；Lighthouse CI 可作为非阻塞报告。

---

## 9. 性能与包体

- Three.js 动态 import；首屏不阻塞。
- 粒子数、DPR、shader 复杂度按设备降级。
- 字体子集化 + `font-display: swap`；首屏只加载 2 个字重。
- SVG 内联；图标按需 import lucide。
- 目标：首屏 gzip JS ≤ 180KB，Three 异步 chunk ≤ 220KB gzip。
- 不在 landing 引入 antd、framer-motion、GSAP、Lottie。

---

## 10. 风险

1. **WebGL 在低端/远程桌面不可用**：CSS 降级必须完整。
2. **Safari 的 PWA 支持差异**：安装提示用文字引导；更新仍由 SW 控制。
3. **gh-pages 与安装通道冲突**：必须保留 `/releases/latest/`；release workflow 需要同步改。
4. **字体/Three 第三方依赖**：生产自托管；视觉稿已本地 vendor + bundle，避免 CDN/离线问题。
5. **视觉稿与生产实现漂移**：以视觉稿 token/组件为基准，组件化后做截图对比。
6. **“酷炫”拖慢首屏**：Three 永远懒加载，LCP 由 HTML/CSS 承担。

---

## 11. 里程碑

1. 视觉稿确认（当前）。
2. 创建 `apps/website` + catalog 接入 + 静态页面（无 WebGL）。
3. Hero WebGL + shader + 降级。
4. PWA + 更新提示。
5. GH Actions + 根路径部署；release workflow 只更新 `releases/latest`，不覆盖 landing。
6. Lighthouse/a11y/移动端验收。
