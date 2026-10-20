const app = document.querySelector('#app')

const ASSETS = {
  workbuddy: {
    name: 'WorkBuddy', kind: 'Token 套餐', icon: 'WB', color: 'blue',
    desc: '官方登录 · 订阅套餐', meta: '2 个账号 · 2,401 积分', status: '已登录',
    models: ['DeepSeek V4.1 Flash', 'GLM-5.3 Flash', 'MiniMax M3.1 Flash', 'Hy3'],
    credits: '2,401', clients: 3, primary: true,
  },
  deepseek: {
    name: 'DeepSeek API', kind: 'API Token', icon: 'DS', color: 'green',
    desc: '官方 Key · 按量计费', meta: '余额未知 · 本地估算 1.2M tokens', status: '已添加',
    models: ['DeepSeek V4.1 Flash', 'DeepSeek V4.1'], credits: '未知', clients: 0,
  },
  bailian: {
    name: '阿里百炼', kind: 'API Token', icon: 'BL', color: 'orange',
    desc: '官方 Key · 按量计费', meta: '余额未知 · 近 30 天 0.8M tokens', status: '已添加',
    models: ['Qwen3.5', 'Qwen3-Coder', 'GLM-5.3'], credits: '未知', clients: 0,
  },
  ark: {
    name: '火山方舟', kind: 'API Token', icon: 'VA', color: 'purple',
    desc: '官方 Key · 按量计费', meta: '余额未知 · 本地估算 0.4M tokens', status: '已添加',
    models: ['Doubao', 'DeepSeek V4.1', 'Kimi K2.5'], credits: '未知', clients: 0,
  },
  hub: {
    name: 'WorkBuddy AI', kind: 'Token 套餐 · 经由 Hub', icon: 'AI', color: 'amber',
    desc: '外部 Hub · 高风险', meta: '需要 WorkBuddy2API Hub', status: '需要 Hub',
    models: ['Claude 5 Sonnet', 'GPT-6', 'Gemini 3 Pro', 'GLM-5.3'], credits: '1,820', clients: 0, external: true,
  },
}

const CLIENTS = {
  dsh: { name: 'DeepSeek Harness', short: 'DSH', icon: 'DS', color: 'purple', installed: true, p0: true, current: 'workbuddy', model: 'DeepSeek V4.1 Flash', health: 'ok' },
  codex: { name: 'Codex', short: 'CX', icon: 'CX', color: 'blue', installed: true, p0: true, current: 'workbuddy', model: 'DeepSeek V4.1 Flash', health: 'ok' },
  workbuddy: { name: 'WorkBuddy', short: 'WB', icon: 'WB', color: 'blue', installed: true, p0: true, current: 'workbuddy', model: 'DeepSeek V4.1 Flash', health: 'ok' },
  claude: { name: 'Claude Code', short: 'CC', icon: 'CC', color: 'orange', installed: true, p0: false, current: 'workbuddy', model: 'GLM-5.3 Flash', health: 'warn' },
  vscode: { name: 'VS Code', short: 'VS', icon: 'VS', color: 'blue', installed: true, p0: false, current: 'bailian', model: 'Qwen3.5', health: 'ok' },
  cursor: { name: 'Cursor', short: 'CU', icon: 'CU', color: 'green', installed: false, p0: false, current: 'deepseek', model: 'DeepSeek V4.1 Flash', health: 'muted' },
}

const state = {
  view: 'onboarding', step: 1, primary: 'workbuddy',
  selected: new Set(['workbuddy', 'deepseek', 'bailian', 'ark']),
  clients: new Set(['dsh', 'codex', 'workbuddy']),
  switchTarget: 'dsh', pendingAsset: 'workbuddy', detail: 'workbuddy', hubInstalled: false,
}

const params = new URLSearchParams(location.search)
if (params.get('view')) state.view = params.get('view')
if (params.get('step')) state.step = Number(params.get('step'))
if (params.get('id')) state.detail = params.get('id')
if (params.get('hub') === '1') state.hubInstalled = true

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const ico = (asset) => `<span class="asset-ico" style="background:${tint(asset.color)};color:${accent(asset.color)}">${asset.icon}</span>`
const clientIco = (client) => `<span class="client-ico" style="background:${tint(client.color)};color:${accent(client.color)}">${client.icon}</span>`
const accent = color => ({ blue: '#7ea8ff', green: '#69d9ad', orange: '#ffb27d', purple: '#c4b5fd', amber: '#f5cd76' }[color] || '#9aa4b2')
const tint = color => ({ blue: 'rgba(91,140,255,.14)', green: 'rgba(49,196,141,.13)', orange: 'rgba(245,158,99,.13)', purple: 'rgba(167,139,250,.13)', amber: 'rgba(240,184,75,.13)' }[color] || 'rgba(154,164,178,.1)')

function shell(content, active = 'home') {
  const nav = [
    ['home', '首页', '◫'], ['clients', '客户端', '⌘'], ['tokens', 'Token 资产', '◈'], ['usage', '使用量', '▥'],
  ]
  return `<div class="sidebar">
    <div class="brand"><img src="../desktop/assets/app-logo.svg" alt=""><div><strong>AI Bobby</strong><small>LOCAL GATEWAY</small></div></div>
    <div class="nav-group"><div class="nav-label">工作台</div>
      ${nav.map(([id, label, icon]) => `<button class="nav-item ${active === id ? 'active' : ''}" data-action="nav" data-view="${id}"><span class="ico">${icon}</span>${label}</button>`).join('')}
    </div>
    <div class="nav-spacer"></div>
    <div class="side-foot"><button class="nav-item" data-action="nav" data-view="settings"><span class="ico">⚙</span>设置</button></div>
  </div>
  <div class="main"><div class="topbar"><div class="crumb"><span class="eyebrow">AI Bobby</span><span class="title">${active === 'home' ? '概览' : active === 'tokens' ? 'Token 资产' : active === 'clients' ? '客户端' : active === 'usage' ? '使用量' : active === 'about' ? '关于' : '设置'}</span></div><div class="top-actions"><button class="btn" data-action="add-token">+ 添加 Token</button><button class="btn ghost" data-action="nav" data-view="settings">设置</button></div></div><div class="content">${content}</div></div>`
}

function onboarding() {
  const step = state.step
  return `<div class="onboarding">
    <div class="ob-head"><div class="ob-brand"><img src="../desktop/assets/app-logo.svg" alt="">AI Bobby</div><div class="ob-progress"><span class="${step >= 1 ? 'on' : ''}"></span><span class="${step >= 2 ? 'on' : ''}"></span><span class="${step >= 3 ? 'on' : ''}"></span><em>${step} / 3</em></div></div>
    <div class="ob-body"><div class="ob-inner">${step === 1 ? stepAssets() : step === 2 ? stepPrimary() : stepClients()}</div></div>
    ${stepActions()}
  </div>`
}

function stepAssets() {
  return `<div class="ob-step-label">STEP 1 · TOKEN ASSETS</div><h1>先把你的 Token 放进来</h1><p class="sub">AI Bobby 不卖 Token。它只帮你把已经有的套餐和 API Key，接到任何一个客户端。</p>
    <div class="asset-grid">${Object.entries(ASSETS).map(([id, asset]) => `
      <button class="asset-card ${state.selected.has(id) ? 'selected' : ''}" data-action="toggle-asset" data-id="${id}">
        <div class="asset-top">${ico(asset)}<div><div class="asset-name">${esc(asset.name)}</div><div class="asset-kind">${esc(asset.kind)}</div></div></div>
        <div class="asset-desc">${esc(asset.desc)}</div>
        <div class="asset-foot"><span class="badge ${asset.external ? 'amber' : state.selected.has(id) ? 'green' : ''}">${esc(asset.status)}</span><span class="hint">${esc(asset.meta)}</span></div>
      </button>`).join('')}</div>
    <div class="hint" style="margin-top:10px">WorkBuddy AI 需要外部 WorkBuddy2API Hub；先跳过也可以，之后在 Token 资产里添加。</div>`
}

function stepPrimary() {
  const choices = Object.entries(ASSETS).filter(([id]) => state.selected.has(id))
  return `<div class="ob-step-label">STEP 2 · DEFAULT</div><h1>选一个主套餐</h1><p class="sub">新客户端默认使用主套餐；已有绑定不会自动改变。主套餐和顺序之后都可以改。</p>
    <div class="primary-list">${choices.map(([id, asset]) => {
      return `<div class="primary-row ${state.primary === id ? 'selected' : ''}" data-action="set-primary" data-id="${id}"><span class="grip">⋮⋮</span><span class="radio"></span><div class="primary-main"><strong>${esc(asset.name)} ${id === 'workbuddy' ? '<span class="badge blue">推荐</span>' : ''}</strong><span>${esc(asset.kind)} · ${esc(asset.meta)}</span></div><span class="badge ${id === 'workbuddy' ? 'green' : ''}">${id === 'workbuddy' ? '当前主套餐' : esc(asset.status)}</span></div>`
    }).join('')}</div>
    <div class="pref-box"><div class="pref-head"><strong>模型偏好</strong><span>拖动排序 · 每个客户端可覆盖</span></div>
      ${['DeepSeek V4.1 Flash', 'GLM-5.3 Flash', 'MiniMax M3.1 Flash', '其他'].map((name, i) => `<div class="pref-row"><span class="num">${i + 1}</span><span>${name}</span><span class="grip">⋮⋮</span></div>`).join('')}
    </div>
    <div class="hint" style="margin-top:9px">绑定时优先找 DeepSeek，其次 GLM，再其次 MiniMax；没有就提示手动选择。</div>`
}

function stepClients() {
  return `<div class="ob-step-label">STEP 3 · CLIENTS</div><h1>选择要接入的客户端</h1><p class="sub">已检测本机安装。默认全部绑定主套餐；每个客户端的 Token 和模型都可以随时改。</p>
    <div class="client-table">
      <div class="client-tr head"><span></span><span>客户端</span><span>默认 Token</span><span>默认模型</span><span>状态</span></div>
      ${['dsh', 'codex', 'workbuddy'].map(id => {
        const c = CLIENTS[id]
        return `<div class="client-tr"><input type="checkbox" ${state.clients.has(id) ? 'checked' : ''} data-action="toggle-client" data-id="${id}"><span>${esc(c.name)}</span><span class="muted">${esc(ASSETS[state.primary].name)}</span><span class="model">${esc(c.model)}</span><span class="badge green">已安装</span></div>`
      }).join('')}
      ${['claude', 'vscode', 'cursor'].map(id => {
        const c = CLIENTS[id]
        return `<div class="client-tr"><input type="checkbox" ${state.clients.has(id) ? 'checked' : ''} data-action="toggle-client" data-id="${id}"><span>${esc(c.name)}</span><span class="muted">${esc(ASSETS[state.primary].name)}</span><span class="model">${esc(c.model)}</span><span class="badge">P1</span></div>`
      }).join('')}
    </div>
    <div class="ob-success"><span class="big">✓</span><div><strong>3 个客户端已选</strong><p class="hint" style="margin:2px 0 0">完成连接后会逐个测试；失败会自动回滚，不会破坏原有配置。</p></div></div>`
}

function stepActions() {
  const left = state.step === 1 ? '<span class="ob-note">Token 只保存在本机；不会上传。</span>' : '<button class="btn ghost" data-action="back">← 返回</button>'
  return `<div class="ob-actions"><div>${left}</div><div class="right">${state.step === 1 ? '<button class="btn ghost" data-action="skip">稍后再说</button>' : ''}<button class="btn primary" data-action="${state.step === 3 ? 'finish' : 'next'}">${state.step === 3 ? '完成并连接' : '继续'}</button></div></div>`
}

function home() {
  const clients = ['dsh', 'codex', 'workbuddy', 'claude', 'vscode']
  const tokens = ['workbuddy', 'deepseek', 'bailian', 'ark', 'hub']
  return `<div class="home-head"><div><div class="ob-step-label">OVERVIEW</div><h1>你的 Token，在哪都能用。</h1><p>客户端会换，Token 资产不会。选一个客户端，随时切换。</p><div class="summary"><span><i class="dot"></i> 3 个客户端已连接</span><span>4 个 Token 资产</span><span>主套餐 WorkBuddy</span></div></div><div><button class="btn primary" data-action="switch" data-id="dsh">切换 DSH</button></div></div>
    <section class="section"><div class="section-head"><h2>客户端</h2><span>3 已连接 · 2 可接入</span></div><div class="client-list">${clients.map(id => {
      const c = CLIENTS[id], asset = ASSETS[c.current]
      return `<div class="client-row">${clientIco(c)}<div class="client-name"><strong>${esc(c.name)}</strong><small>${c.p0 ? 'P0 · 已安装' : 'P1 · 已安装'}</small></div><div class="client-current">${esc(asset ? asset.name : '未绑定')}<span>Token 套餐</span></div><div class="client-model">${esc(c.model)}</div><div class="health ${c.health === 'warn' ? 'warn' : ''}"><i class="dot ${c.health === 'warn' ? 'amber' : ''}"></i>${c.health === 'warn' ? '待检查' : '正常'}</div><div class="row-actions"><button class="btn" data-action="switch" data-id="${id}">切换</button></div></div>`
    }).join('')}</div></section>
    <section class="section"><div class="section-head"><h2>Token 资产</h2><span>主套餐 WorkBuddy · 可拖动排序</span></div><div class="token-grid">${tokens.map(id => tokenCard(id)).join('')}</div></section>
    <div class="tip"><span class="tip-ico">¥</span><div><strong>省钱提示</strong><p>按最近 30 天用量估算：WorkBuddy 套餐已覆盖 82%，边际成本最低；超出部分走 DeepSeek API 约 ¥12/月，比百炼同用量低约 ¥6。建议保留 WorkBuddy 作主套餐，DeepSeek 作为溢出和备用。</p></div></div>`
}

function tokenCard(id) {
  const a = ASSETS[id]
  const isPrimary = id === 'workbuddy'
  const hubStatus = state.hubInstalled ? '已连接' : '未安装'
  return `<div class="token-card ${isPrimary ? 'primary' : ''}" data-action="token" data-id="${id}"><div class="token-top">${ico(a)}<div class="token-name">${esc(a.name)}${isPrimary ? ' <span>主套餐</span>' : ` <span>${esc(a.kind)}</span>`}</div><span class="badge ${a.external ? 'amber' : isPrimary ? 'blue' : ''}" style="margin-left:auto">${a.external ? 'External' : isPrimary ? '主套餐' : a.status}</span></div><div class="token-usage"><span>${id === 'hub' ? 'Hub 状态' : id === 'workbuddy' ? '剩余积分' : '余额'} <strong>${id === 'hub' ? hubStatus : esc(a.credits)}</strong></span><span>${a.clients} 个客户端</span></div><div class="bar"><i style="width:${id === 'workbuddy' ? '68%' : id === 'hub' ? '0%' : '42%'};background:${accent(a.color)}"></i></div><div class="token-foot"><span>${esc(a.meta)}</span><span>${a.external ? (state.hubInstalled ? '已连接' : '需要 Hub') : '查看 →'}</span></div></div>`
}

function switchSheet() {
  const target = CLIENTS[state.switchTarget] || CLIENTS.dsh
  const options = ['workbuddy', 'deepseek', 'bailian', 'ark', 'hub']
  const chosen = state.pendingAsset || target.current
  return `<div class="overlay"><aside class="sheet"><div class="sheet-head"><div><h2>切换 ${esc(target.name)} 的 Token 套餐</h2><p>当前：${esc(ASSETS[target.current].name)} · ${esc(target.model)}</p></div><button class="icon-btn" data-action="close-switch">×</button></div><div class="sheet-body"><p class="sheet-label">Token 套餐</p>${options.map(id => {
    const a = ASSETS[id]
    return `<div class="option ${chosen === id ? 'selected' : ''}" data-action="choose-asset" data-id="${id}"><span class="radio"></span><div class="option-main"><strong>${esc(a.name)} ${id === 'workbuddy' ? '<span class="badge blue">主套餐</span>' : ''}</strong><span>${esc(a.kind)} · ${esc(a.meta)}</span></div><span class="right">${a.external ? '高风险' : id === 'workbuddy' ? '推荐' : ''}</span></div>`
  }).join('')}<p class="sheet-label" style="margin-top:14px">模型</p><select class="select"><option>DeepSeek V4.1 Flash（偏好 1）</option><option>GLM-5.3 Flash（偏好 2）</option><option>MiniMax M3.1 Flash（偏好 3）</option><option>手动选择…</option></select><div class="sheet-note">只写入 ${esc(target.name)} 的 AI Bobby 配置；写入前备份，失败自动回滚。不会影响其他客户端。</div><label class="check"><input type="checkbox" checked> 应用后测试连接（推荐）</label><div class="sheet-note">当前主套餐是 WorkBuddy。修改这里不会改变其他客户端的绑定。</div></div><div class="sheet-foot"><button class="btn ghost" data-action="close-switch">取消</button><button class="btn primary" data-action="apply-switch">应用并测试</button></div></aside></div>`
}

function tokenDetail(id) {
  const a = ASSETS[id]
  if (id === 'hub') return hubDetail()
  return `<div class="detail-head"><div class="detail-title">${ico(a)}<div><h1>${esc(a.name)}</h1><p>${esc(a.kind)} · ${esc(a.desc)}</p></div></div><div><button class="btn" data-action="nav" data-view="home">← 返回首页</button></div></div>
    <div class="detail-grid"><div><section class="section"><div class="section-head"><h2>使用情况</h2><span>${esc(a.status)}</span></div><div class="stat-grid"><div class="stat"><span>${id === 'workbuddy' ? '剩余积分' : '余额'}</span><strong>${esc(a.credits)}</strong></div><div class="stat"><span>最近 30 天</span><strong>${id === 'workbuddy' ? '68%' : '1.2M'}</strong></div><div class="stat"><span>已绑定</span><strong>${a.clients}</strong></div></div><div class="detail-section"><h3>可用模型</h3>${a.models.map(m => `<span class="model-pill">${esc(m)}</span>`).join('')}</div><div class="detail-section"><h3>已绑定客户端</h3>${a.clients > 0 ? ['DSH', 'Codex', 'WorkBuddy'].slice(0, a.clients).map(c => `<div class="binding"><span>${c}</span><strong>DeepSeek V4.1 Flash</strong></div>`).join('') : '<p class="hint">还没有客户端使用这个 Token。</p>'}</div></section></div><div><section class="section"><div class="section-head"><h2>说明</h2><span>本地</span></div><div class="detail-section"><p class="hint">Token 只保存在本机；AI Bobby 只记录用量和估算成本，不读取你的密码。</p><div class="risk">API 余额如果官方没有接口，会显示“未知”，不会用本地估算冒充官方余额。</div></div></section></div></div>`
}

function hubDetail() {
  const installed = state.hubInstalled
  return `<div class="detail-head"><div class="detail-title">${ico(ASSETS.hub)}<div><h1>WorkBuddy AI <span class="badge amber">External · Hub</span></h1><p>Token 套餐经由 WorkBuddy2API Hub 接入 · 不在 AI Bobby 安装包内</p></div></div><div><button class="btn" data-action="nav" data-view="home">← 返回首页</button></div></div>
    <div class="detail-grid"><div><section class="section"><div class="section-head"><h2>Hub 状态</h2><span>${installed ? '<i class="dot"></i> 已连接' : '未安装'}</span></div><div class="stat-grid"><div class="stat"><span>地址</span><strong>127.0.0.1:8788</strong></div><div class="stat"><span>模型</span><strong>${installed ? '12' : '—'}</strong></div><div class="stat"><span>检查更新</span><strong>${installed ? '可用' : '—'}</strong></div></div><div class="detail-section"><h3>${installed ? '已连接' : '需要安装'}</h3><p class="hint">${installed ? 'Hub 正在运行。模型会以 hub/ 前缀出现，不伪装成官方 WBI。' : 'AI Bobby 不会把 Hub 打包进来。你可以安装后连接；安装前会展示来源、校验和完整命令。'}</p>${installed ? '<button class="btn" data-action="check-update">检查 Hub 更新</button> <button class="btn" data-action="connect-hub">重新连接</button>' : '<button class="btn primary" data-action="install-hub">安装并连接 Hub</button>'}<div class="risk"><strong>高风险：</strong>第三方代码可能违反上游条款、触发风控或导致账号受限；需要管理员权限时，AI Bobby 会先提示并请求系统授权，取消即中止。</div></div></section></div><div><section class="section"><div class="section-head"><h2>模型</h2><span>External</span></div><div class="detail-section">${ASSETS.hub.models.map(m => `<span class="model-pill">hub/${esc(m)}</span>`).join('')}</div></section></div></div>`
}

function tokensPage() {
  return `<div class="home-head"><div><div class="ob-step-label">TOKEN ASSETS</div><h1>Token 资产</h1><p>订阅套餐和 API Key 都放在这里；主套餐决定新客户端的默认绑定。</p></div><div><button class="btn primary" data-action="add-token">+ 添加 Token</button></div></div>
    <section class="section"><div class="section-head"><h2>主套餐与顺序</h2><span>拖动排序 · 第一位优先</span></div><div class="primary-list" style="margin:10px 14px 14px">${['workbuddy','deepseek','bailian','ark','hub'].map((id, i) => { const a = ASSETS[id]; return `<div class="primary-row ${id === state.primary ? 'selected' : ''}" data-action="set-primary" data-id="${id}"><span class="grip">⋮⋮</span><span class="radio"></span><div class="primary-main"><strong>${esc(a.name)} ${id === 'workbuddy' ? '<span class="badge blue">主套餐</span>' : ''}</strong><span>${esc(a.kind)} · ${esc(a.meta)}</span></div><span class="badge ${a.external ? 'amber' : ''}">${a.external ? (state.hubInstalled ? '已连接' : '需要 Hub') : esc(a.status)}</span></div>` }).join('')}</div></section>
    <section class="section"><div class="section-head"><h2>全部 Token</h2><span>${Object.keys(ASSETS).length} 个</span></div><div class="token-grid">${Object.keys(ASSETS).map(tokenCard).join('')}</div></section>`
}

function clientsPage() {
  return `<div class="home-head"><div><div class="ob-step-label">CLIENTS</div><h1>客户端</h1><p>客户端是可替换的；每个客户端绑定一个 Token 套餐和模型。</p></div><div><button class="btn" data-action="add-token">+ 添加 Token</button></div></div>
    <section class="section"><div class="section-head"><h2>已接入</h2><span>3 个 P0 · 2 个 P1</span></div><div class="client-list">${['dsh','codex','workbuddy','claude','vscode'].map(id => { const c = CLIENTS[id], a = ASSETS[c.current]; return `<div class="client-row">${clientIco(c)}<div class="client-name"><strong>${esc(c.name)}</strong><small>${c.p0 ? 'P0' : 'P1'} · 已安装</small></div><div class="client-current">${esc(a.name)}<span>Token 套餐</span></div><div class="client-model">${esc(c.model)}</div><div class="health ${c.health === 'warn' ? 'warn' : ''}"><i class="dot ${c.health === 'warn' ? 'amber' : ''}"></i>${c.health === 'warn' ? '待检查' : '正常'}</div><div class="row-actions"><button class="btn" data-action="switch" data-id="${id}">切换</button></div></div>` }).join('')}</div></section>
    <div class="ob-success"><span class="big">+</span><div><strong>安装新客户端后会自动出现</strong><p class="hint" style="margin:2px 0 0">AI Bobby 检测本机安装；新增客户端只需选 Token 套餐，不需要重新配置来源。</p></div></div>`
}

function usagePage() {
  const rows = [['DSH','WorkBuddy','DeepSeek V4.1 Flash','1.8M','72%'],['Codex','WorkBuddy','DeepSeek V4.1 Flash','0.6M','24%'],['WorkBuddy','WorkBuddy','DeepSeek V4.1 Flash','0.2M','8%'],['VS Code','百炼 API','Qwen3.5','0.8M','—']]
  return `<div class="home-head"><div><div class="ob-step-label">USAGE</div><h1>使用量</h1><p>本地记录每次请求的 Token 和估算成本；有官方接口时再校准。</p></div></div>
    <section class="section"><div class="section-head"><h2>最近 30 天</h2><span>本地账本 · 估算</span></div><div class="stat-grid"><div class="stat"><span>总 Token</span><strong>3.4M</strong></div><div class="stat"><span>估算成本</span><strong>¥18.6</strong></div><div class="stat"><span>最活跃客户端</span><strong>DSH</strong></div></div><div class="detail-section"><h3>按客户端</h3>${rows.map(r => `<div class="binding"><span>${r[0]} · ${r[1]}</span><strong>${r[2]}</strong><em class="hint" style="font-style:normal">${r[3]}</em></div>`).join('')}</div></section>
    <section class="section"><div class="section-head"><h2>套餐对比</h2><span>按最近 30 天 · 估算</span></div><div class="usage-table"><div class="usage-tr head"><span>Token 资产</span><span>覆盖/用量</span><span>估算成本</span><span>结论</span></div><div class="usage-tr"><span>WorkBuddy 主套餐</span><span>82%</span><span>已付</span><span class="ok">优先使用</span></div><div class="usage-tr"><span>DeepSeek API</span><span>1.2M tokens</span><span>¥12/月</span><span class="ok">溢出/备用</span></div><div class="usage-tr"><span>阿里百炼</span><span>0.8M tokens</span><span>¥18/月</span><span>较贵</span></div><div class="usage-tr"><span>火山方舟</span><span>0.4M tokens</span><span>¥15/月</span><span>备用</span></div></div><div class="detail-section"><p class="hint" style="margin:0">结论：WorkBuddy 套餐已覆盖大部分用量，边际成本最低；超出部分走 DeepSeek 更省。价格与余额为估算，样本不足时不给结论。</p></div></section>
    <div class="tip"><span class="tip-ico">i</span><div><strong>数据说明</strong><p>WorkBuddy 积分来自官方目录；API Key 余额未知时只用本地估算。价格来自配置表，可能滞后，不构成账单。</p></div></div>`
}

function about() {
  return `<div class="home-head"><div><div class="ob-step-label">ABOUT</div><h1>关于 AI Bobby</h1><p>把散落的 Token 套餐，接进任何一个客户端。</p></div></div>
    <section class="section"><div class="detail-section"><h3>ZEO · 独立开发者 / 独立音乐人 / AI 驭龙师</h3><p class="hint">做 AI Bobby，是为了把散落的模型、账号和协议收进一个本机入口。少一点配置，多一点创造。</p><p class="hint">AI Bobby 不卖 Token，不托管账号；Token 只保存在本机。</p><details class="about-support"><summary>支持这个项目</summary><p class="hint">如果 AI Bobby 对你有帮助，可以请我喝杯咖啡。赞助完全自愿，不影响功能。</p><button class="btn">打开赞助页 ↗</button></details></div></section>`
}

function render() {
  if (state.view === 'onboarding') { app.innerHTML = onboarding(); return }
  if (state.view === 'switch') { app.innerHTML = shell(home()) + switchSheet(); return }
  if (state.view === 'about') { app.innerHTML = shell(about(), 'about'); return }
  if (state.view === 'tokens') { app.innerHTML = shell(tokensPage(), 'tokens'); return }
  if (state.view === 'clients') { app.innerHTML = shell(clientsPage(), 'clients'); return }
  if (state.view === 'usage') { app.innerHTML = shell(usagePage(), 'usage'); return }
  if (state.view === 'token') { app.innerHTML = shell(tokenDetail(state.detail), 'tokens'); return }
  if (state.view === 'hub') { app.innerHTML = shell(hubDetail(), 'tokens'); return }
  app.innerHTML = shell(home(), state.view === 'clients' ? 'clients' : 'home')
}

app.addEventListener('click', event => {
  const target = event.target.closest('[data-action]')
  if (!target) return
  const action = target.dataset.action
  const id = target.dataset.id
  if (action === 'toggle-asset') {
    if (state.selected.has(id)) state.selected.delete(id); else state.selected.add(id)
    render()
  } else if (action === 'set-primary') { state.primary = id; render() }
  else if (action === 'toggle-client') {
    if (state.clients.has(id)) state.clients.delete(id); else state.clients.add(id)
    render()
  } else if (action === 'next') { state.step = Math.min(3, state.step + 1); render() }
  else if (action === 'back') { state.step = Math.max(1, state.step - 1); render() }
  else if (action === 'finish' || action === 'skip') { state.view = 'home'; render() }
  else if (action === 'nav') { state.view = target.dataset.view; render() }
  else if (action === 'switch') { state.switchTarget = id || 'dsh'; state.pendingAsset = CLIENTS[state.switchTarget].current; state.view = 'switch'; render() }
  else if (action === 'close-switch') { state.view = 'home'; render() }
  else if (action === 'choose-asset') { state.pendingAsset = id; render() }
  else if (action === 'apply-switch') { const c = CLIENTS[state.switchTarget]; c.current = state.pendingAsset || c.current; const a = ASSETS[c.current]; c.model = a.models[0]; state.view = 'home'; render() }
  else if (action === 'token') { state.detail = id; state.view = id === 'hub' ? 'hub' : 'token'; render() }
  else if (action === 'install-hub') { state.hubInstalled = true; render() }
  else if (action === 'connect-hub' || action === 'check-update') { render() }
  else if (action === 'add-token') { state.view = 'onboarding'; state.step = 1; render() }
})

if (params.get('view') === 'token' && params.get('id') === 'hub') state.view = 'hub'
if (params.get('view') === 'token' && params.get('id')) state.detail = params.get('id')
render()
