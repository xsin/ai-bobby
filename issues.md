NOTE: 此文档由人类反馈应用产品的 BUG 或 FR (Feature Requests),由 Agent 收拢处理并回填对应的 commit id，更新状态。不需要填写处理细节，因为细节体现在提交记录中。 

注意：涉及到交互及视觉更新的需求或迭代，先更新设计稿，用户确认后再开始编码实施。


## v0.2.1 体验报告：  
1、安装时Little Snitch 弹出安全提醒（大概是因为AI Bobby未签名但要访问Local Network），在readme中说明Why 和 How，避免用户错杀导致应用无法正常工作。 **已补充 README（218ce77），待你实机确认提示文案。**

## 2026-10-19 体验反馈（第五轮）

1.右边已选x/y，改成 x。不需要斜杠和综述。【同时更新下设计稿】 **已完成（d977de3）。**
2. 历史记录页面：查看差异弹窗：次要按钮样式和其他次要按钮不一致。按钮样式需要收拢一下。设计稿是收拢的，主要按钮、次要按钮、无边框按钮(ghost button）。整个应用复用样式。避免多处自定义按钮样式。如shadcn/ui有button组件，需直接基于它调整样式。 **已完成（d977de3）：统一 secondary / primary / ghost，页面不再覆写尺寸/字号。**
3. 历史记录页面：查看差异、打开目录、恢复，三个ghost button，字号不对，hover样式不对。结合2收拢项目的按钮样式。另外review下css，对全局选择器，保障同一个选择器的样式集中一起定义，避免分散在不同地方。 **已完成（d977de3）：三个 ghost 统一 11px/30px 与 hover；全局 font reset 移入 @layer base。**
4. 导入备份功能迭代：**每目标 1 基线 + 最近 5 份 = 最多 6 份** **已完成（5e05b67 + d977de3）：后端基线保留 + UI 文案/基线标记。**
5. 历史记录页面：恢复功能增强：恢复弹窗面板，列出所有备份，默认选中基线版本（正常就是没有 AI Bobby配置的版本），用户可以选择其他历史版本。选择版本时，该版本的明细跟着变化。 **已完成（d977de3）：垂直 tabmenu + tabpanel，默认基线，tab 仅相对时间 + 日期。**
6. 网关的BUG：在使用AI Bobby的deepseek-v4.1-flash模型时，WB和WBI的都报错：502: {"message":"This operation was aborted","type":"upstream","code":"upstream"}，OC的正常 **已完成（b42c0c8）：网关在请求体读完时误 abort 上游信号；已用 WB/WBI 实测流式恢复。**
