# @ai-bobby/gateway

本机统一网关，默认 `127.0.0.1:46890`。计划提供：

- `GET /health`
- `GET /v1/models`
- `POST /v1/chat/completions`（OpenAI Chat Completions，流式 / 非流式）
- `POST /v1/responses`（OpenAI Responses，供 Codex）
- `POST /v1/messages` + `/v1/messages/count_tokens`（Anthropic Messages，供 Claude Code）
- API Key 鉴权、来源围栏、并发上限、错误归一化
- 按模型前缀路由到 `opencode` / `workbuddy` / `workbuddy-ai`

不直接持有上游凭据；由来源包解析。
