# @ai-bobby/importers

四个客户端的一键导入。每个 importer 都必须具备：

- 目标文件探测 + 可覆盖路径
- 写前备份、原子替换、文件锁
- 只增删自己标记的条目，保留用户手写内容
- 幂等、可回滚、内容未变不写
- 返回 `changed` / `path` / `warnings` / `dryRun`

目标：

| 客户端 | 协议 | 计划写入 |
|---|---|---|
| WorkBuddy | OpenAI Chat | `~/.workbuddy/models.json` |
| Codex | OpenAI Responses | `~/.codex/config.toml` 的 `model_providers` |
| Claude Code | Anthropic Messages | `~/.claude/settings.json` 的 `env` |
| DeepSeek Harness | OpenAI Chat | profile 的 `llm-pi-ai` provider + 凭据引用 |
