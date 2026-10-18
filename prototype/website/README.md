# Website prototype

AI Bobby 落地页的视觉稿。目标是在确认视觉方向后再创建 `apps/website`
（React + Vite + Tailwind + shadcn/ui + Three.js + PWA）。

## 打开

页面用了 ES module + import map，需要静态服务器：

```sh
cd /path/to/ai-bobby
python3 -m http.server 8790 --bind 127.0.0.1 --directory prototype/website
# http://127.0.0.1:8790/
```

Three.js 从 jsDelivr CDN 加载；离线时会退化为 CSS 渐变背景。

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
