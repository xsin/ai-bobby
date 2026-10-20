# Token 资产 / 客户端接线设计（v0.4 方向）

这不是 0.2.x 的“来源中心”改版，而是一次 IA 重做：

> **Token 资产是长期资产，客户端是可替换的消耗品。**

## 设计目标

- 首次打开先确认 Token 资产，而不是先配来源；
- 首页直接看到每个客户端当前用哪个 Token 套餐/模型；
- 一键切换，失败回滚，不破坏原配置；
- 主套餐可指定、可拖动排序；新客户端默认绑定主套餐；
- 模型偏好：DeepSeek V4.1 Flash > GLM-5.3 Flash > MiniMax M3.1 Flash > 其他；
- WorkBuddy AI 通过外部 WorkBuddy2API Hub 接入，不在安装包内；安装后支持检查更新；
- 使用量/剩余量能拿就拿，拿不到显示“未知”，不伪造；
- 省钱建议只做估算对比 + 文字结论，不做评分。

## 截图

| 文件 | 内容 |
|---|---|
| `screenshot-onboarding-tokens.png` | 首次引导 Step 1：Token 资产（WorkBuddy / DeepSeek / 百炼 / 火山 / Hub） |
| `screenshot-onboarding-primary.png` | Step 2：主套餐 + 模型偏好 |
| `screenshot-onboarding-clients.png` | Step 3：选择 P0/P1 客户端 + 默认绑定 |
| `screenshot-home.png` | 首页：客户端 + Token 资产 + 省钱提示 |
| `screenshot-switch.png` | 客户端切换面板：Token 套餐 + 模型 + 测试/回滚 |
| `screenshot-tokens.png` | Token 资产页：主套餐、顺序、全部 Token |
| `screenshot-token-workbuddy.png` | WorkBuddy 套餐详情：积分/模型/绑定客户端 |
| `screenshot-hub.png` | WorkBuddy AI via Hub：未安装，安装引导 + 风险 |
| `screenshot-hub-installed.png` | Hub 已连接：模型 `hub/*`、检查更新、重新连接 |
| `screenshot-usage.png` | 使用量：按客户端、套餐对比、文字结论 |
| `../desktop/screenshot-about-support.png` | 现有 About 不变，仅把赞助折叠到“支持这个项目” |

## 深链接

```text
?view=onboarding&step=1
?view=onboarding&step=2
?view=onboarding&step=3
?view=home
?view=switch
?view=tokens
?view=usage
?view=token&id=workbuddy
?view=hub
?view=hub&hub=1
```

## 关键决策

1. **首次引导只做 3 步**：资产 → 主套餐/偏好 → 客户端。
2. **主套餐默认 WorkBuddy**；可拖动；新客户端默认绑定主套餐，已有客户端不自动改。
3. **Token 套餐和 API Key 分开**：卡片上明确 `Token 套餐` / `API Token`。
4. **WorkBuddy AI 是特殊资产**：外部 Hub，`hub/` 前缀，不伪装官方 WBI；安装/更新/风险单独说明。
5. **余额未知就未知**：DeepSeek 可查余额；百炼 `bl usage stats`/`quota check` 可尝试；火山按官方文档评估；没有接口就本地账本估算。
6. **省钱对比**：WorkBuddy 已付订阅的边际成本最低；API 按量对比；只给文字结论和假设。

## 待确认

- 首次引导的默认选中：当前示例选中 WorkBuddy + DeepSeek + 百炼 + 火山，Hub 需单独配置。
- WorkBuddy 客户端默认绑定主套餐，还是保留原生？（当前设计是绑定主套餐。）
- “省钱建议”放首页还是使用量页？（当前两处都有：首页一句、使用量页完整对比。）
- 是否需要在首次引导就展示 Hub 安装，还是放到 Token 资产页？（当前放资产页，首次引导只提示。）
