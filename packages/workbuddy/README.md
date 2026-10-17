# @ai-bobby/workbuddy

WorkBuddy（国内版）与 WorkBuddy AI（国际版）来源。计划从 `refs/dsh-workbuddy-connect/src/` 移植并解耦 DSH 宿主依赖：

- 两个 variant 的凭据文件定位、桌面加密凭据解密（只读，不写桌面文件）
- token 刷新与自有副本
- `/v3/config` 模型目录、`/v2/chat/completions` 上游转发
- 额度 / 促销 / 推理档位元数据
- 单账号优先，多账号池留作后续

输出统一的 `ChatStream` 事件，供 `@ai-bobby/gateway` 转三种协议。
