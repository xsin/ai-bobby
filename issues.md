NOTE: 此文档由人类反馈应用产品的 BUG 或 FR (Feature Requests),由 Agent 收拢处理并回填对应的 commit id，更新状态。不需要填写处理细节，因为细节体现在提交记录中。 

注意：涉及到交互及视觉更新的需求或迭代，先更新设计稿，用户确认后再开始编码实施。


## v0.2.1 体验报告：  
1、安装时Little Snitch 弹出安全提醒（大概是因为AI Bobby未签名但要访问Local Network），在readme中说明Why 和 How，避免用户错杀导致应用无法正常工作。 **已补充 README（218ce77），待你实机确认提示文案。**

## v0.2.3
1. 一键安装脚本优化
   - **默认**：`/Applications/AIMatrix/AI Bobby.app`
   - `/Applications` 不可写（标准用户 / 受管 Mac）→ 自动回退 `~/Applications/AIMatrix`，并打印原因
   - `--system`：强制 `/Applications/AIMatrix`，不可写时请求管理员授权；创建后会把目录所有权交还安装者，保证应用以后能自更新
   - `--install-dir <dir>`：完全自定义，不自动回退
   - **成功安装后清理** `~/Applications/AI Bobby.app`；只在两个受管默认路径下执行，避免误删用户自定义安装
3. 目标客户端加入 VScode，Cursor（先调研可行性）
4. 免费模型源增加Nvidia（可能需要代理才能搞得定），或更多（你去调研）
5. I18n，支持中英文。默认随系统。
