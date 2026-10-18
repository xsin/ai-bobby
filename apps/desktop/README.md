# @ai-bobby/desktop

Electron 桌面应用：窗口 + 托盘 + 本机网关生命周期 + 控制面板。

当前实现：

- 主进程启动 `@ai-bobby/gateway`（46890），renderer 通过 IPC 读真实模型/账号状态
- 托盘常驻；关窗不退出；退出时停止网关与 OpenCode 运行时
- 内嵌 WorkBuddy 官方登录窗口；导入 importer IPC
- 受限 preload，只暴露状态、登录、导入、更新等固定动作

用户侧使用说明见 [README.md](../../README.md)；实现细节见
[handsoff.md](../../handsoff.md) 与 [docs/tech.md](../../docs/tech.md)。
