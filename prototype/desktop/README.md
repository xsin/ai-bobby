# Desktop prototype

早期桌面控制面板的静态可点击稿，已被 `apps/desktop` 的 React 实现取代；
保留用于视觉对照。没有后端、不会写文件，模型/账号/额度都是演示数据。

## 打开方式

直接双击 `index.html`，或在仓库根目录：

```sh
python3 -m http.server 8765 --bind 127.0.0.1
# http://127.0.0.1:8765/prototype/desktop/index.html
```

## 可交互内容

- 三个来源 tab：`OpenCode` / `WorkBuddy` / `WorkBuddy AI`
- 勾选模型、行内展开详情、全选/取消全选
- WorkBuddy / WBI 的账号条、`添加账号` 内嵌登录弹窗（可模拟登录）
- 全局「导入」抽屉：客户端、分组、默认模型、dry-run diff
- 主题切换：系统 / 浅色 / 深色
- 底部转发口与 API Key 复制

## 深链接

```text
?tab=workbuddy           # 默认打开 WorkBuddy tab
?tab=wbi                 # 默认打开 WorkBuddy AI tab
?drawer=1                # 打开导入抽屉
?login=1                 # 打开添加账号弹窗
?theme=light             # 浅色主题
```

可组合，例如 `?tab=workbuddy&drawer=1`。

## 截图

| 文件 | 内容 |
|---|---|
| `screenshot-dark.png` | OpenCode tab（深色，默认） |
| `screenshot-workbuddy.png` | WorkBuddy tab + 账号条 |
| `screenshot-import.png` | 全局导入抽屉 |
| `screenshot-login.png` | 添加账号弹窗 |
| `screenshot-light.png` | 浅色主题 |
