# Human SOS — v0.2.3 发布后仍需你支持的事项

> v0.2.3 已发布。这里只保留 **Agent 无法代办、且仍会影响产品决策/后续迭代** 的事。
> 安装、使用、客户端接入与故障排查见 [README.md](./README.md)；实施进度见 [handsoff.md](./handsoff.md)。
> 最后更新：2026-10-20

---

## 0. 发布闸门（永久）

- [ ] 每个版本必须先由你在本机验收；验收通过后明确回复“可以发版 / 请发版”。
- [ ] 在收到该指令前，Agent 不得创建 tag、push release、部署网站/安装通道。
- [ ] Agent 可以构建本地包、安装到 `/Applications/AIMatrix`、运行测试，但不得发布。

---

## 1. WorkBuddy AI（国际版）渠道校验（产品决策）

上游返回 `11-128 request illegal / 未通过渠道校验`，不是 AI Bobby 配置错误；
Agent 不会做伪造官方客户端的绕过。

- [ ] 决定：接受国际版在部分环境不可用 / 在 UI 标注该状态 / 暂时隐藏国际版入口。
- [ ] 如有官方第三方接入方式，提供给 Agent 再适配。

## 2. Codex 元数据：目标模型与行为签收（必须）

当前只有 `deepseek-v4.1-flash`、`glm-5.3-flash` 登记了 Codex 元数据（schema-valid）；
其他模型会在导入时跳过 Codex。L4 行为评测需要人类判断。

- [ ] 指定你希望优先进入 Codex picker 的模型（按来源/名称列出）。
- [ ] 对每个候选模型，用 Codex 跑 2–3 个真实任务（普通对话、工具调用、图片/长上下文按需），确认行为可接受。
- [ ] 确认后 Agent 才能把对应条目升到 `behavior-reviewed`；未签收的保持跳过。
- [ ] 确认是否接受“未覆盖模型不进 Codex picker”的默认行为。

## 3. NVIDIA 可用范围（已实测，待你决策）

已用你 `.env` 里的 `NVIDIA_API_KEY`、经 `127.0.0.1:10080` 代理实测（Key 未写入日志/仓库）：

- 目录 81 个模型；
- **15 个可用**，66 个返回 `404 Not found for account`（免费账号无该模型权限）；
- 代理与 Key 本身正常，不需要你再复测。

- [ ] 决定：接受“只展示 15 个可用”，还是在来源页隐藏/标记无权限模型。
- [ ] 如果需要更多模型，确认是否升级 NVIDIA 账号/额度。

## 4. 安装脚本的两种人工场景（必须）

Agent 已实测默认路径 `/Applications/AIMatrix`、`--install-dir` 与旧路径清理。

- [ ] `--system`：需要管理员密码；确认提权、目录所有权交还、后续自更新正常。
- [ ] 标准用户 `/Applications` 不可写：确认回退 `~/Applications/AIMatrix` 且打印原因。

## 5. 已知限制确认（发版边界）

- [ ] OpenCode 原生工具是 prompt 级约束，不是强沙箱；接受作为公测边界。
- [ ] 账号库 `0600` 明文（未接 safeStorage）；接受或要求下一轮加密。
- [ ] Codex 自定义 catalog 的语义字段无法自动推导；未覆盖模型不会出现在 picker。
- [ ] WorkBuddy AI 渠道校验不属于可修复的本地 BUG。

## 6. 可选：发布后体验

- [ ] 用官网安装脚本装一次 v0.2.3，确认默认路径、首次启动与自动更新。
- [ ] 确认 Gitalk 右下角评论区、中文 #1 / English #2 的线程符合预期。

---

## 已完成（无需你处理）

- v0.2.3 发布授权、main push、GitHub Release、网站/Gitalk 部署。
- README（en/zh-CN/zh-TW）、release notes、双架构包、latest.json、install.sh。
- Gitalk 生产评论写入、评论区右移、双语 Discussion 内容更新。
- NVIDIA Key/代理 smoke（结论见 §3）。
- Codex L1/L2 自动化验证与 CI。
