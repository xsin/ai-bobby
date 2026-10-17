# @ai-bobby/core

领域模型与跨包共享层。计划包含：

- `ProviderId` / `ModelGroup` / `ModelRef` / `ModelDescriptor`
- 模型注册表（三个来源合并、去重、命名空间、启停）
- 设置与数据目录解析
- 结构化日志与脱敏
- 网关与 UI 之间的状态文档类型

约束：不依赖 Electron，不直接读客户端配置文件。
