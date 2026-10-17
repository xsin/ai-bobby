# @ai-bobby/opencode

OpenCode 免费模型来源。计划从 `refs/RuiC-oc-ferry/src/` 移植并 TypeScript 化：

- 隔离运行时发现 / 下载 / 校验 / 启动（`opencode serve --pure`）
- 按价格字段筛免费模型，不按名字
- 并发能力检测、判定缓存、降级为“仅对话”
- 把网关请求翻译成 OpenCode 会话，处理事件流与审批围栏

只依赖 `@ai-bobby/core`，不感知其他来源。
