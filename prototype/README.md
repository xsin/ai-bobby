# AI Bobby 界面原型

这是一个**静态、可点击**的界面原型，用来和产品/设计对齐信息架构与视觉，不是生产代码。
没有后端、不会写任何文件、所有模型/账号/额度都是演示数据。

## 打开方式

直接双击 `index.html`，或在项目根目录起一个静态服务器：

```sh
python3 -m http.server 8765 --bind 127.0.0.1
# http://127.0.0.1:8765/prototype/index.html
```

## 可交互内容

- 三个来源 tab：`OpenCode` / `WorkBuddy` / `WorkBuddy AI`
- 勾选模型、行内展开详情、全选/取消全选
- WorkBuddy / WBI 的账号条、`添加账号` 内嵌登录弹窗（可模拟登录成功）
- 全局「导入」抽屉：客户端勾选、分组、默认模型、dry-run diff
- 主题切换：系统 / 浅色 / 深色
- 底部转发口与 API Key 复制

## 深链接（方便截图/评审）

```text
?tab=workbuddy           # 默认打开 WorkBuddy tab
?tab=wbi                 # 默认打开 WorkBuddy AI tab
?drawer=1                # 打开导入抽屉
?login=1                 # 打开添加账号弹窗
?theme=light             # 浅色主题
```

可以组合，例如 `?tab=workbuddy&drawer=1`。

## 截图

| 文件 | 内容 |
|---|---|
| `screenshot-dark.png` | OpenCode tab（深色，默认） |
| `screenshot-workbuddy.png` | WorkBuddy tab + 账号条 |
| `screenshot-import.png` | 全局导入抽屉 |
| `screenshot-login.png` | 添加账号弹窗 |
| `screenshot-light.png` | 浅色主题 |

## 这个原型代表的产品决策

- 三个来源 = 三个 tab；附件截图对应默认选中的 OpenCode tab。
- 导入是**全局抽屉**，不占用每个 tab 的右侧空间。
- WorkBuddy 双版本在各自 tab 顶部管理多账号；账号条显示额度、冷却、优先。
- 模型显示名用 `OC.` / `WB.` / `WBI.`；表格里同时显示网关 ID（如 `wb/hy3`）。
- 底部常驻 46890 转发口与脱敏 Key。
- 绿条是“动作后的临时状态”，正式版应自动消退，而不是永久占位。

## 待确认

1. tab 放在顶部品牌旁，还是像截图那样用一行“模型与服务”+ 左侧来源切换？
2. WorkBuddy 账号条放在 tab 顶部是否合适？是否要折叠成“2 个账号”一行？
3. 导入抽屉里，默认模型是全局一个，还是每个客户端一个？
4. 表格是否保留“账号 / 耗时”这一列，还是把账号数移到行内详情？
5. 是否需要独立的“服务 / 设置”页来放 API Key、端口、日志？
