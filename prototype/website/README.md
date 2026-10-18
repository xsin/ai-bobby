# Website prototype

AI Bobby 落地页的视觉稿。目标是在确认视觉方向后再创建 `apps/website`
（React + Vite + Tailwind + shadcn/ui + Three.js + PWA）。

## 打开

直接双击 `index.html` 即可，**不需要静态服务器，也不需要网络**。

页面入口是 `app.bundle.js`（classic script），Three.js、字体都已放在
`vendor/` 并打进 bundle；这样可以从 `file://` 打开，不会触发 ES module CORS。
如果编辑了 `app.js`，重新生成 bundle：

```bash
./build.sh
```

> 源码 `app.js` 仍是 ES module（方便阅读/后续迁移 React）；只有
> `app.bundle.js` 被 `index.html` 加载。

## 演示参数

```text
?noboot=1      # 跳过开机动画（截图用）
?clean=1       # 不弹出安装/更新提示（截图用）
```

## 视觉要点

- WebGL：GLSL 星云/能量环背景 + Three.js 粒子流 + 线框环
- SVG：来源轨道、连线、图标
- CSS：滚动进度、reveal、marquee、终端卡片、PWA 安装/更新 toast
- 支持 `prefers-reduced-motion`，降级为静态画面

## 截图

| 文件 | 内容 |
|---|---|
| `screenshots/01-hero.png` | Hero |
| `screenshots/02-sources.png` | 三个来源 |
| `screenshots/03-protocols.png` | 三种协议 |
| `screenshots/04-import.png` | 导入 diff |
| `screenshots/05-local-first.png` | 本机安全 |
| `screenshots/06-install.png` | 安装 CTA |

这些截图只是视觉评审稿，不是最终生产页面。
