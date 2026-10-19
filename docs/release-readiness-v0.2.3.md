# v0.2.3 发版就绪评估

> 评估时间：2026-10-20
> 对象：本地 0.2.3 候选包（`/Applications/AIMatrix/AI Bobby.app`，arm64）
> 结论：**候选版可验收，但未达到发版就绪（Not release-ready）**。阻塞项见下。

## 1. 结论

- 功能实现与本地构建：**基本完成**。
- 发版：**被人类签收、部署授权与发布物料阻塞**。
- 现在可以做的：你本机体验 v0.2.3；不可以做的：tag、push release、部署 Gitalk/网站。

## 2. 已就绪

| 项 | 证据 |
|---|---|
| NVIDIA NIM（Key/目录/探测/持久化/自动探测） | 本机 81 模型、13 可用；Key 保存自动 probe |
| VS Code / Cursor 导入 | 代码与导入测试；Cursor 仅引导 |
| 分源代理默认 `10080` | PandaFan 实测 NVIDIA 通过代理 |
| 中英文 | 主要页面/设置/导入/历史已英文化 |
| AIMatrix 安装路径 | 默认安装 + 旧路径清理实测 |
| Codex 裸 ID / catalog 修复 | 本机 Codex 新会话通过；`models.ai-bobby.json` 生成 |
| Codex 元数据覆盖门禁 | 导入抽屉显示 covered/total，未覆盖跳过 |
| B 流水线 L1/L2 | `validate:codex`、`validate:codex:contract`、`validate:codex:request` 全通过 |
| L3 smoke 脚本 | `smoke:codex` 可运行；wb 模型通过，wbi/nv 有上游问题 |
| 质量门禁 | typecheck 通过；72 项测试通过；website build 通过 |
| CI workflow | `.github/workflows/validate.yml` 已提交（未远端运行） |
| 导入面板溢出 | 479px/桌面宽度实测无横向溢出 |

## 3. 发版阻塞项

| # | 阻塞项 | 类型 | 说明 |
|---|---|---|---|
| 1 | 你的 v0.2.3 本机验收与“可以发版” | 人类 | 明确 gate，见 human-sos §1 |
| 2 | 27 个提交未 push | 授权 | 含 Gitalk/网站；不 push 无法部署 |
| 3 | Gitalk/网站未部署、生产 CORS 未验证 | 发布 | 本地 CORS 被浏览器拦截是预期 |
| 4 | CI 只在本地跑过，GitHub Actions 未运行 | 发布 | 需 push 后看首跑 |
| 5 | README 仍是 v0.2.2 / `~/Applications` 旧路径 | 文档 | 发版前必须更新 |
| 6 | 发布物料未备齐 | 发布 | x64 包、latest.json、checksums、release notes |
| 7 | `--system` 与标准用户回退未实机验证 | 人类 | 需管理员密码/受管环境 |
| 8 | WorkBuddy AI `11-128` 未决策 | 产品 | 接受限制/隐藏入口/官方接入 |
| 9 | Codex 元数据仅 2 个模型；L4 未签收 | 产品 | 未覆盖模型不进 picker；需你指定目标模型 |
| 10 | NVIDIA L3 smoke 部分超时 | 环境 | 需代理/Key/账号复测 |

## 4. 非阻塞但需记录

- Codex 自定义 catalog 的语义字段无法自动推导；B 只能验证结构与请求形状，不能保证行为质量。
- i18n 仍有少量动态/toast 文案保留中文；不影响功能。
- WorkBuddy AI 渠道校验属于上游风控，不做绕过。

## 5. 发版前最小清单

1. 你完成本机验收并回复“可以发版”。
2. 更新 README 到 v0.2.3 / AIMatrix 路径。
3. push `main`，跑通 GitHub Actions；部署网站 + Gitalk，验证生产评论。
4. 构建 arm64 + x64，生成 latest.json/checksums，写 release notes。
5. `--system`/回退场景实机确认。
6. 决策 WorkBuddy AI 与 Codex 覆盖范围。
7. 最后再 tag `v0.2.3` + GitHub Release + 安装通道验证。

详见 [human-sos.md](../human-sos.md)。
