# @ai-bobby/website

AI Bobby 落地页：React 19 + Vite 8 + TypeScript 7 + Tailwind 4 + shadcn/ui +
Three.js/GLSL + `vite-plugin-pwa`。

## 开发

```sh
pnpm --filter @ai-bobby/website dev
pnpm --filter @ai-bobby/website typecheck
pnpm --filter @ai-bobby/website test
pnpm --filter @ai-bobby/website build
```

## 关键点

- `src/i18n.tsx`：中文/英文同构字典；`i18n.test.ts` 检查 key/shape 对齐。
- `src/components/HeroCanvas.tsx`：Three.js + GLSL，`React.lazy` 懒加载。
- `src/components/PwaPrompts.tsx`：PWA 安装提示 + 新版本提示；`registerType: 'prompt'`。
- `public/`：本地 logo、PWA 图标、OG 图、robots/sitemap。
- 构建 base 为 `/ai-bobby/`，由 `.github/workflows/website.yml` 发布到 gh-pages 根路径；`/releases/latest` 保留。

## 设计稿

视觉母版：[prototype/website](../../prototype/website)。
生产实现必须保持同一套 CSS token / 排版 / 动效节奏。

## 评论（Gitalk 2）

- 底部左下角「讨论 / Comments」按钮默认收起；展开后固定左下角（桌面 400px 宽、最高 72dvh），
  移动端展开时全屏。
- 使用 `@aifire/gitalk` + `@aifire/gitalk-react`（2.0 beta，GitHub Discussions 后端），
  配置在 `src/components/CommentsDock.tsx`：`owner: xsin`、`repo: ai-bobby`、
  `proxy: https://gitalk-proxy.aispin-abf.workers.dev`、`number: 1`。
- 组件懒挂载：首次点开才加载 Gitalk，关闭后保留状态；Esc 关闭。
- 代理的 CORS 已允许 `https://xsin.github.io`，本地 `127.0.0.1` 调试会被拒绝，属预期。

## 移动端兼容

移动端浏览器（尤其旧 Android WebView / 微信内嵌页）可能整包解析失败或加载不到懒加载 chunk。
现在做了四层兜底：

- `vite.config.ts` 的 `build.target` 为 `es2019`；ES2022 的 class static block 会让旧浏览器直接 SyntaxError。
- `index.html` 的 `#root` 内置静态首屏（inline style）：JS 没执行也能看到标题、安装命令与 GitHub 链接，
  React 挂载后自动替换。
- `ErrorBoundary` 同时包住 App 和懒加载的 `HeroCanvas`：WebGL / chunk 失败只影响背景动画，不会白屏。
- `src/polyfills.ts` 补 `Array/String.prototype.at`，避免旧 WebView 在运行时抛错。

自查：DevTools 移动模拟、禁用 JavaScript、以及在 Network 里 block `*HeroCanvas*`，页面都应保留内容。
