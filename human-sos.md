# Human SOS — 交付前需要你完成/确认的事项

> 只保留 **Agent 无法代办、且会影响 v0.2.3 交付** 的事。
> 安装/使用/客户端接入见 [README.md](./README.md)；实施进度与风险见 [handsoff.md](./handsoff.md)。
> 最后更新：2026-10-20

---

## 1. v0.2.3 本机验收与发版授权（必须，最高优先级）

本地 0.2.3 已安装：`/Applications/AIMatrix/AI Bobby.app`，端口 `46890`。

- [ ] 走一遍：设置中英文切换、NVIDIA Key（保存后自动探测）、VS Code/Cursor 导入、Codex 导入、历史恢复。
- [ ] 确认 Codex 新会话能选到带前缀模型，且 `/v1/responses` 不再 404。
- [ ] 确认导入抽屉的 Codex 元数据覆盖提示符合预期。
- [x] 明确回复 **“可以发版”**（2026-10-20）；v0.2.3 已发布。

## 2. 发布与部署授权（必须）

当前 `main` 比 `origin/main` 领先 **27 个提交**，包含 v0.2.3 代码、Gitalk 与网站改动；均未 push。

- [x] 授权 push `main`；已 push 并触发 Actions。
- [x] 部署网站/Gitalk 到 gh-pages；Website workflow 通过。
- [ ] 确认 GitHub 仓库继续 public（安装通道与 Pages 依赖）。
- [x] 生产页面 Gitalk 评论写入已通过（2026-10-20）。

## 3. WorkBuddy AI（国际版）渠道校验（产品决策）

上游返回 `11-128 request illegal / 未通过渠道校验`，不是 AI Bobby 配置错误；
Agent 不会做伪造官方客户端的绕过。

- [ ] 决定：接受国际版在部分环境不可用 / 在 UI 标记该状态 / 暂时隐藏国际版入口。
- [ ] 如有官方第三方接入方式，提供给 Agent 再适配。
- [ ] 提供一次可用的国际版账号与网络环境，供 L3 smoke 复测。

## 4. Codex 元数据：目标模型与行为签收（必须）

当前只有 `deepseek-v4.1-flash`、`glm-5.3-flash` 登记了 Codex 元数据（schema-valid）；
其他模型会在导入时跳过 Codex。L4 行为评测需要人类判断。

- [ ] 指定你希望优先进入 Codex picker 的模型（按来源/名称列出）。
- [ ] 对每个候选模型，用 Codex 跑 2–3 个真实任务（普通对话、工具调用、图片/长上下文按需），确认行为可接受。
- [ ] 确认后 Agent 才能把对应条目升到 `behavior-reviewed`；未签收的保持跳过。
- [ ] 确认是否接受“未覆盖模型不进 Codex picker”的默认行为。

## 5. NVIDIA 上游 smoke（需要你的网络/Key/账号）

`pnpm smoke:codex` 结果：

- `wb/deepseek-v4.1-flash`、`wb/glm-5.3-flash` 通过；
- `wbi/*` 被渠道校验拦截；
- `nv/*` 超时（可能是代理、免费额度或模型下线）。

- [ ] 确认 PandaFan 代理在跑，且 `127.0.0.1:10080` 可访问 `integrate.api.nvidia.com`。
- [ ] 用你的 NVIDIA Key 在 UI 里保存并等待自动探测完成；把可用模型数/失败模型贴回来。
- [ ] 如果某些 NV 模型长期超时，确认是否从来源页隐藏或保留为不可用。

## 6. 安装脚本的两种人工场景（必须）

Agent 已实测默认路径 `/Applications/AIMatrix` 与自定义 `--install-dir`。

- [ ] `--system`：需要管理员密码；确认提权、目录所有权交还、后续自更新正常。
- [ ] 标准用户 `/Applications` 不可写：确认回退 `~/Applications/AIMatrix` 且打印原因。
- [ ] 确认旧 `~/Applications/AI Bobby.app` / `/Applications/AI Bobby.app` 被清理且未误删自定义安装。

## 7. 发布物料（Agent 可代做，但需要你确认口径）

- [x] v0.2.3 release notes 已发布。
- [x] x64 + arm64 包均已由 release workflow 构建并上传。
- [x] README（en/zh-CN/zh-TW）已更新到 v0.2.3 / AIMatrix。
- [x] 评论区已移到右下角；中文绑定 Discussion #1，English 绑定 #2；移动端仍全屏。

## 8. 已知限制确认（发版边界）

- [ ] OpenCode 原生工具是 prompt 级约束，不是强沙箱；接受作为公测边界。
- [ ] 账号库 `0600` 明文（未接 safeStorage）；接受或要求下一轮加密。
- [ ] Codex 自定义 catalog 的语义字段无法自动推导；未覆盖模型不会出现在 picker。
- [ ] WorkBuddy AI 渠道校验不属于可修复的本地 BUG。
