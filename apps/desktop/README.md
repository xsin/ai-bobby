# @ai-bobby/desktop

Electron 桌面应用：窗口 + 托盘 + 后台服务生命周期。

计划：

- 主进程拉起 `@ai-bobby/gateway` 子进程，读 `status.json` 推给面板
- 托盘常驻；关窗不退出；退出时清理自己导入的条目
- 控制面板沿用 OC Ferry 的视觉语言，增加三来源筛选与四客户端导入
- 受限 preload，只暴露状态订阅与固定动作

界面细节在 `handsoff.md` 的 UI 阶段对齐后再定。
