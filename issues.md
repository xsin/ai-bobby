NOTE: 此文档由人类反馈应用产品的 BUG 或 FR (Feature Requests),由 Agent 收拢处理并回填对应的 commit id，更新状态。不需要填写处理细节，因为细节体现在提交记录中。 

注意：涉及到交互及视觉更新的需求或迭代，先更新设计稿，用户确认后再开始编码实施。


## v0.2.1 体验报告：  
1、安装时Little Snitch 弹出安全提醒（大概是因为AI Bobby未签名但要访问Local Network），在readme中说明Why 和 How，避免用户错杀导致应用无法正常工作。 **已补充 README（218ce77），待你实机确认提示文案。**

## 2026-10-19 网站移动端反馈

1. 用户反馈网站在移动端浏览器打开看不到内容。 **已完成（0f92e2d）：构建目标降为 es2019；App 与 HeroCanvas 加 ErrorBoundary；`#root` 内置静态首屏；补 `Array/String.prototype.at`。原因：懒加载 HeroCanvas chunk 在旧浏览器解析/加载失败会卸载整个 React 树。**
