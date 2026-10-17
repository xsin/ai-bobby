# Human SOS — 需要人工处理 / 确认的事项

> 给用户（xsin / aispin）：这里只列**必须由人完成**或**必须由人确认**的事。
> Agent 已完成的自动验证、命令与结果见 [handsoff.md](./handsoff.md) §9。
> 最后更新：2026-10-18

---

## 0. 当前状态（Agent 已完成）

- 桌面壳：React 19.3.1 + TS 7.0.2 + Vite 8.3.4 + Electron 44.9.0 + Tailwind 4.3.3 +
  shadcn/ui 4.22 + antd 6.6.6；主题色 **#1e4fff**。
- 可运行 UI：三 tab、账号条、antd 模型表格、全局导入 Sheet、登录 Dialog、设置 Dialog、更新条。
- 更新器：`latest.json` 检查、semver、SHA256、可选 Ed25519、下载/校验/解压/重签/替换脚本；
  12 项 core 单测通过；本地 manifest 烟测能弹更新条。
- 分发：ad-hoc 签名、`AI-Bobby-<version>-<arch>.zip`、`install.sh`、gh-pages + Release 工作流；
  `install.sh` 已从本地 HTTP 源完整跑通（下载→SHA256→ditto→安装）。
- `refs/` 已加入 `.gitignore`。

---

## 1. GitHub 仓库与 Pages（**需要你确认/授权**）

- 目标：`https://github.com/xsin/ai-bobby`
- Agent 已用 `gh auth status` 确认本机登录的是 `aispin`，`xsin` 是组织；尝试创建/推送时会用到组织权限。
- 如果 Agent 无法创建或推送，请手动执行：

```bash
gh repo create xsin/ai-bobby --public --source=. --remote=origin --push
```

- Pages（安装通道）必须在仓库设置里指向 `gh-pages` 分支根目录：

```bash
gh api --method POST repos/xsin/ai-bobby/pages \
  -f 'source[branch]=gh-pages' -f 'source[path]=/'
```

  - 如果仓库是 **private**，免费组织计划可能无法开启 Pages；curl 安装通道会失效。
    建议 public；若必须 private，请告知，我会改成 Release 直链安装或换托管。
- 首次 Release 后，确认：

```bash
curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh | head
```

---

## 2. 更新签名密钥（可选；v1 默认不启用）

当前 v1 只用 **SHA256 + HTTPS**。如果要启用更强的 Ed25519 清单签名：

1. 生成密钥（私钥只存 GitHub Secrets，不要提交）：

```bash
openssl genpkey -algorithm ED25519 -out update-signing-key.pem
openssl pkey -in update-signing-key.pem -pubout -outform DER -out update-public.der
base64 -i update-public.der          # 写入 apps/desktop/src/main/updater-core.ts 的 UPDATE_PUBLIC_KEY
cat update-signing-key.pem | base64  # 作为 GitHub Secret UPDATE_SIGNING_KEY
```

2. 在 GitHub 仓库设置里添加 Secret：

```bash
gh secret set UPDATE_SIGNING_KEY --repo xsin/ai-bobby < <(base64 < update-signing-key.pem)
```

3. 把公钥（base64 SPKI DER）填进 `UPDATE_PUBLIC_KEY`，重新发一版。
4. **备份私钥**到密码管理器；丢失后老客户端无法验证新清单，需要手动重装。

> 不做也行：v1 的 SHA256 已能防下载损坏/中间人替换产物；Ed25519 额外防“清单与产物同时被篡改”。

---

## 3. Apple 签名 / 公证（未来）

当前是 **ad-hoc 签名**，没有 Developer ID、没有公证：

- 首次打开可能被 Gatekeeper 拦；用户需右键 → 打开，或安装脚本已清 quarantine。
- 如果将来购买 Apple Developer Program：
  - 设置 `SIGN_IDENTITY` 为 `Developer ID Application: ...`
  - 设置 `NOTARIZE=1`、`APPLE_ID`、`TEAM_ID`、`APP_SPECIFIC_PASSWORD`
  - 在 `scripts/release/build-mac.sh` 里接 `notarytool submit` / `stapler staple`。
- 这项需要你提供证书与账号，Agent 无法代办。

---

## 4. 首次安装 / Gatekeeper（用户操作）

- 推荐：

```bash
curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh | bash
```

- 如果 macOS 提示“无法打开”或“已损坏”：

```bash
xattr -dr com.apple.quarantine "/Applications/AI Bobby.app"
# 或默认安装位置：
xattr -dr com.apple.quarantine "$HOME/Applications/AI Bobby.app"
```

- 如果 SmartScreen/Windows 拦截（Windows 版发布后），需要“更多信息 → 仍要运行”。

---

## 5. 需要你确认的产品决策（不阻塞开发）

1. WorkBuddy 导入目标：国内版 / 国际版两个 `models.json` 默认都写，还是分开勾选？
2. 导入抽屉的默认模型：全局一个，还是每个客户端一个？
3. 账号条是否保持当前“常驻一行”，还是折叠成“2 个账号”？
4. 设置页是否需要独立页面（当前是 Dialog）？
5. 更新条的检查频率/提示文案是否接受（启动 8 秒后、每 6 小时、单会话可“稍后”）？

> 这些 Agent 已按最佳实践默认实现；你醒来后如果不同意，改起来都只是 UI/常量级改动。

---

## 6. 已知限制 / 待人工关注

- **Electron 体积**：zip 约 127–135MB（Electron Framework 本身很大），不是构建错误。
- **未公证**：ad-hoc 签名只保证 Apple Silicon 能运行，不保证 Gatekeeper 放行。
- **Windows**：本轮只验证 macOS；Windows NSIS 与更新脚本尚未实现。
- **网关/Provider**：UI 与更新/分发链路已就绪，但 46890 网关、WorkBuddy 登录/provider、
  OpenCode provider、四个 importer 还没写；下一步按 handsoff P1–P5。
- **antd + Tailwind**：已按 `ui-guideline.md` 做 token 桥接与 scoped preflight；若后续新增页面，
  继续遵守 `.tw-root` / `.ant-app` 边界与“视觉层 shadcn、表格层 antd”的规则。
