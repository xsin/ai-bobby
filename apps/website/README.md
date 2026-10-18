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
- 构建 base 为 `/ai-bobby/website/`，由 `.github/workflows/website.yml` 发布到 gh-pages。

## 设计稿

视觉母版：[prototype/website](../../prototype/website)。
生产实现必须保持同一套 CSS token / 排版 / 动效节奏。
