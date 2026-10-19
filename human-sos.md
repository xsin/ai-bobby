# Human SOS — 交付前需要你完成/确认的事项

> 这里只保留 **Agent 无法代办、且会影响产品完成交付** 的事。
> 安装、使用、接入客户端、导入路径和故障排查见 [README.md](./README.md)；
> 实施进度与已知风险见 [handsoff.md](./handsoff.md)。
> 最后更新：2026-10-18

---

## 1. 登录一次 WorkBuddy，完成真实上游联调（必须）

Agent 已实现并单测覆盖官方登录、账号库、目录、聊天、额度和多账号调度，
也实测能打开官方 `codebuddy.cn/login` 页面；但扫码/授权只能由你完成。

请按以下步骤验证：

- [ ] 安装 v0.2.2：`curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh | bash`
- [ ] 启动后切到 **WorkBuddy** tab → **添加账号** → 在官方窗口完成扫码/授权
- [ ] 确认模型列表和账号额度出现
- [ ] 发一条消息，确认流式回复正常
- [ ] 切到 **WorkBuddy AI**，用国际版账号重复一次（如果要用国际版）
- [ ] 再添加第二个同 realm 账号，确认多账号条与切换正常

如果失败，请把以下信息贴回来：

- 出错的步骤（登录 / 拉目录 / 聊天 / 额度）
- 界面提示或 `~/Library/Application Support/AI Bobby/logs` 中的错误
- 是否国内版/国际版、账号数量

---

## 2. 做一次最终验收（必须）

Agent 已用 Codex 0.154、Claude Code 2.1、OpenCode 免费模型在本机跑通，
但你的机器/账号环境是最终验收标准。

- [ ] 安装版状态条显示 `运行中`，转发口为 `http://127.0.0.1:46890/v1`
- [ ] 复制 API Key，用 README 的 curl 示例完成一次 Chat 请求
- [ ] 从 **导入** 抽屉导入到 Codex / Claude Code（先看 diff，再写入），重启客户端后能选到模型
- [ ] 如果使用 DSH，导入后按 README 说明在 DSH 侧配置 `AI_BOBBY_API_KEY`
- [ ] 设置页“检查更新”能返回 v0.2.2 或更高版本
- [ ] 验收通过后明确回复“可以发版”；在此之前不要创建新的 release/tag

---

## 3. 发布闸门（必须）

当前处于 **v0.2.2 真实验收阶段**，问题记录在 [`issues.md`](./issues.md)。

- 未经你本机验收通过，不创建新 tag、不发布 GitHub Release、不更新安装通道。
- 验收通过后，你明确回复“可以发版”，再走 release workflow。
- 发版前必须确认：WorkBuddy 登录/额度、主题/关于页 FR、安装提醒等问题已处理或明确接受。

---

## 4. 确认仓库保持 public（必须）

安装通道依赖 GitHub Pages 与 Release：

- 仓库：<https://github.com/xsin/ai-bobby>
- 安装通道：<https://xsin.github.io/ai-bobby/releases/latest/install.sh>

- [ ] 确认仓库继续 public；如果要转 private，请告知，需要改安装分发方式

---

## 5. 确认可接受的 v1 安全边界（必须）

以下两项是当前 v1 的已知限制，需要你确认是否接受作为公测版边界：

- [ ] **OpenCode 原生工具是 prompt 级约束，不是强制沙箱**：
      官方免费模型要求默认 OpenCode 配置，自定义 permission/tools 会触发 free-tier gate。
      不要让不可信 prompt 驱动本机工具；如需强隔离，下一轮做 sandbox/容器方案。
- [ ] **账号库当前是 `0600` 明文**：
      Electron `safeStorage` 在启动时会阻塞 Keychain，已回退；如要求加密落盘，
      需要你确认接受一次 Keychain 授权弹窗，或指定其他密钥方案。
