# Codex 模型元数据调研

> 目标：回答“除了手工登记 `deepseek-v4.1-flash`、`glm-5.3-flash`，能否用技术手段为 AI Bobby 的其余模型自动/半自动补齐 Codex 所需字段”。
>
> 结论先行：**没有可自动推导全部字段的官方接口**。能做的是“登记 + 生成 + 验证”的流水线；未经验证的模型不应进入 Codex picker。

## 1. 范围与方法

- 阅读 OpenAI Codex 官方仓库源码（`openai/codex`）与 app-server 文档，不依赖二手文章。
- 在本机 Codex CLI 0.154.0 上做最小 catalog 验证。
- 只讨论 Codex 的 `model_catalog_json`，不讨论仿造官方客户端/绕过渠道校验。

## 2. Codex catalog 的事实

### 2.1 结构

`model_catalog_json` 指向 `ModelsResponse`：

```rust
pub struct ModelsResponse {
    pub models: Vec<ModelInfo>,
}
```

来源：`codex-rs/protocol/src/openai_models.rs`（`ModelsResponse`、`ModelInfo`）。

`ModelInfo` 中**没有 serde 默认值、必须提供**的字段（节选）：

- `slug`、`display_name`
- `supported_reasoning_levels`
- `shell_type`、`visibility`、`supported_in_api`
- `priority`
- `support_verbosity`
- `truncation_policy`
- `experimental_supported_tools`
- `availability_nux` / `upgrade`（类型为 `Option`，缺失可按 `null` 处理）

以下字段是 `Option` 或有默认值，可省略或置空：

- `description`、`default_reasoning_level`、`context_window`、`max_context_window`
- `model_messages`、`apply_patch_tool_type`、`default_verbosity`
- `comp_hash`、`tool_mode`、`multi_agent_version`
- `input_modalities`（默认 text）、`effective_context_window_percent`（默认 95）

加载逻辑：`codex-rs/core/src/config/mod.rs` 的 `load_catalog_json` 要求 `models` 非空，
否则报 `must contain at least one model`。

### 2.2 替换而不是合并

配置注释明确写着：

> Optional full model catalog loaded from `model_catalog_json`.
> When set, this replaces the bundled catalog for the current process.

来源：`codex-rs/core/src/config/mod.rs`（`model_catalog` 字段）。

因此不能只写 2 个模型再指望其余模型沿用内置元数据；未出现在自定义 catalog 中的 slug 会走 fallback。

### 2.3 未知 slug 的 fallback

`codex-rs/models-manager/src/model_info.rs` 的 `model_info_from_slug` 为未知模型构造：

- `display_name = slug`
- `supported_reasoning_levels = []`
- `visibility = None`
- `context_window = 272_000`
- 通用 `prompt.md` 作为 instructions
- `used_fallback_model_metadata = true`

并输出：

> Model metadata for `<slug>` not found. Defaulting to fallback metadata; this can degrade performance and cause issues.

本机验证（Codex CLI 0.154.0）：自定义 catalog 只含 `wb/glm-5.3-flash`，运行 `wb/deepseek-v4.1-flash`
时出现上述 warning，说明 fallback 生效；catalog 文件本身解析通过。

### 2.4 没有第三方元数据 API

- app-server 的 `model/list` 返回**当前 catalog 过滤后的模型**，不是元数据生成器
  （`codex-rs/app-server/README.md`、`codex-rs/app-server-protocol/src/protocol/common.rs`）。
- 仓库自带 `codex-rs/models-manager/models.json` 是官方模型 catalog；没有覆盖
  WorkBuddy/OpenCode/NVIDIA 的第三方模型。
- 未发现官方文档提供“按 slug 查询任意模型元数据”的公开 API。

## 3. 可自动/半自动的字段

| 字段 | 能否自动获得 | 手段 | 风险 |
|---|---|---|---|
| `slug` / `display_name` | ✅ | AI Bobby 模型表 | 无 |
| `context_window` / `max_context_window` | ⚠️ | 上游 `/v1/models`、厂商文档、models.dev | 上游字段缺失/不准 |
| `input_modalities` | ✅ 粗粒度 | 模型能力探测（图片请求） | 只验证可用性，不验证质量 |
| `supports_parallel_tool_calls` | ⚠️ | 工具调用探测 | 部分模型“能返回工具”≠并行稳定 |
| `supported_reasoning_levels` | ❌ | 无法可靠推断 | 上游可能忽略/报错；Codex 语义是 OpenAI 的 effort |
| `model_messages.instructions_template` | ❌ | 只能人工编写/复用通用 prompt | 复制其他模型的 prompt 可能行为错误 |
| `shell_type` / `apply_patch_tool_type` | ❌ | Codex 工具语义 | 与模型无关，需按 Codex 能力选 |
| `truncation_policy` / `comp_hash` / `tool_mode` | ❌ | Codex 内部兼容字段 | 错填可能影响 compact/工具行为 |

**结论**：结构字段可以生成；语义字段必须核实。用模板克隆“看起来完整”，但正是要避免的假支持。

## 4. 方案对比

| 方案 | 做法 | 优点 | 缺点 | 适用 |
|---|---|---|---|---|
| A. 登记 + 覆盖门禁（当前） | `CODEX_METADATA` 逐模型登记；只写覆盖模型 | 不会假支持；可解释 | 覆盖增长慢 | v0.2.3 默认 |
| B. 合成 + 验证流水线 | 基础模板 + 能力探测 + 自动测试 | 可规模化 | 只能验证“能跑”，不能验证 prompt/语义；成本高 | 中期 |
| C. 引入公共元数据 | models.dev / LiteLLM / 厂商文档 | 上下文/模态字段快 | 不是 Codex 语义；许可/准确性风险 | 辅助 |
| D. 只用 fallback | 不写 catalog，靠 Codex fallback | 零维护 | `visibility=None`，picker 不显示；warning；通用 prompt | 不推荐作为产品默认 |

## 5. 推荐的工程实现

### 5.1 元数据登记表

在 `packages/importers/src/codex-metadata.ts` 维护：

```ts
interface CodexMetadataEntry {
  upstreamId: string          // 不带前缀，如 deepseek-v4.1-flash
  verifiedAt: string          // ISO 日期
  source: string              // 官方文档/实测环境
  fields: Partial<ModelInfo>  // 只写核实过的字段
}
```

生成时使用固定 `BASE`（最小必填字段）+ 条目 `fields` + 模型上下文/模态覆盖；
未登记模型不生成条目，导入 preview 显示缺失列表。

### 5.2 验证流水线（可落地）

对每个候选模型：

1. **Schema 验证**：用 Codex 本身加载 catalog：
   ```bash
   HOME=$tmp CODEX_HOME=$tmp/.codex codex exec \
     -c 'model_catalog_json="/abs/models.ai-bobby.json"' \
     -m 'wb/<model>' --skip-git-repo-check 'reply OK'
   ```
   断言 stderr 不含 `Model metadata for ... not found`，且进程能发出请求。
2. **请求形状验证**：本地 mock `/v1/responses` 记录 body，断言：
   - `model` 为带前缀 ID；
   - 配置的 `reasoning.effort` 是否被发送；
   - `tools` 是否按能力出现；
   - 图片输入是否被接受。
3. **真实上游 smoke**（可选、需 Key/额度）：每个模型发一条最小请求 + 一次工具调用；
   失败则把该模型标为 `unverified`，不进入 catalog。
4. CI 只跑 1 + 2；3 作为手动发布检查，避免免费额度/风控影响 CI。

### 5.3 版本锁定

catalog schema 随 Codex 版本变化。CI 固定测试一个 Codex CLI 版本（当前 0.154.0），
升级时重跑 harness；`verifiedAt` 记录验证版本。

## 6. 无法自动解决的部分

- `instructions_template` 的质量：只能人工编写或采用 Codex 的通用 prompt，并接受行为差异。
- reasoning effort 的真实语义：不同厂商对 `low/medium/high` 的解释不同。
- `comp_hash`、`multi_agent_version`、`tool_mode` 等 Codex 内部字段：需要跟随 Codex 版本实测。
- 上游风控/渠道校验（例如 WorkBuddy AI 的 `11-128`）与元数据无关，不能用 catalog 绕过。

## 7. 建议

1. 保持 **A + 覆盖门禁** 作为 v0.2.3 行为：只写已核实模型，UI 提前显示覆盖/缺失。
2. 为常用模型补 `CODEX_METADATA`，每项带 `verifiedAt`/`source`。
3. 增加 **B 的 harness**（schema + mock 请求），把“人工核实”变成可回归的测试；真实上游 smoke 作为发布前手动检查。
4. 不把 models.dev/LiteLLM 的字段直接当 Codex 元数据；只用于辅助上下文/模态。
5. 未覆盖模型继续跳过 Codex，而不是用模板伪造。

## 8. 参考

- Codex 模型结构：https://github.com/openai/codex/blob/main/codex-rs/protocol/src/openai_models.rs
- catalog 加载/替换：https://github.com/openai/codex/blob/main/codex-rs/core/src/config/mod.rs
- fallback 元数据：https://github.com/openai/codex/blob/main/codex-rs/models-manager/src/model_info.rs
- 内置 catalog：https://github.com/openai/codex/blob/main/codex-rs/models-manager/models.json
- app-server `model/list`：https://github.com/openai/codex/blob/main/codex-rs/app-server/README.md
- 本机验证：Codex CLI 0.154.0，自定义 catalog 缺条目时出现 `Model metadata for ... not found`。
