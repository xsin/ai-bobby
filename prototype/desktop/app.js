(() => {
  'use strict';

  // ---------------------------------------------------------------------------
  // Demo data — every number/name here is illustrative for the UI prototype.
  // ---------------------------------------------------------------------------

  const SOURCES = {
    opencode: {
      label: 'OpenCode',
      eyebrow: 'OPENCODE · 免费模型',
      title: 'OpenCode 免费模型',
      subtitle: '把 OpenCode 的免费模型接入统一网关',
      actions: [
        { id: 'refresh', label: '读取模型', icon: 'refresh' },
        { id: 'probe', label: '检测全部', icon: 'activity' },
      ],
      metricDefs: [
        { key: 'found', label: '已发现' },
        { key: 'available', label: '可用', tone: 'accent' },
        { key: 'pending', label: '待检测' },
      ],
      feedback: '配置已是最新，共 7 个模型，无需重复写入。',
      statusText: '运行中 · 10 个免费模型',
      serviceSub: 'OpenCode 1.19.3',
      listMeta: '最近刷新 2 分钟前',
      lastHeader: '耗时',
      models: [
        { id: 'oc/big-pickle', display: 'OC. Big Pickle', upstream: 'big-pickle', caps: ['推理'], status: 'available', latency: '13.6 秒', context: '131,072', maxOutput: '32,768', checked: '2 分钟前' },
        { id: 'oc/deepseek-v4.1-flash', display: 'OC. DeepSeek V4.1 Flash Free', upstream: 'deepseek-v4.1-flash', caps: ['推理', '图片'], status: 'available', latency: '3.9 秒', context: '1,000,000', maxOutput: '128,000', checked: '2 分钟前' },
        { id: 'oc/glm-5.3-flash', display: 'OC. GLM-5.3-Flash Free', upstream: 'glm-5.3-flash', caps: ['推理', '图片'], status: 'available', latency: '2.6 秒', context: '1,000,000', maxOutput: '131,072', checked: '2 分钟前' },
        { id: 'oc/longcat-2.5-preview', display: 'OC. LongCat 2.5 Preview Free', upstream: 'longcat-2.5-preview', caps: ['推理', '图片'], status: 'available', latency: '14.6 秒', context: '256,000', maxOutput: '32,000', checked: '2 分钟前' },
        { id: 'oc/mimo-v2.6-flash', display: 'OC. MiMo-V2.6-Flash Free', upstream: 'mimo-v2.6-flash', caps: ['推理', '图片'], status: 'available', latency: '8.5 秒', context: '256,000', maxOutput: '64,000', checked: '2 分钟前' },
        { id: 'oc/nemotron-3.5-super-vl', display: 'OC. Nemotron 3.5 Super VL Free', upstream: 'nemotron-3.5-super-vl', caps: ['推理', '图片'], status: 'available', latency: '11.2 秒', context: '128,000', maxOutput: '32,000', checked: '2 分钟前' },
        { id: 'oc/space-bunny', display: 'OC. Space Bunny Free', upstream: 'space-bunny', caps: ['推理'], status: 'available', latency: '6.4 秒', context: '1,000,000', maxOutput: '128,000', checked: '2 分钟前' },
        { id: 'oc/qwen3-coder', display: 'OC. Qwen3 Coder Free', upstream: 'qwen3-coder', caps: ['推理'], status: 'pending', latency: '—', context: '262,144', maxOutput: '32,768', checked: '尚未检测' },
        { id: 'oc/kimi-k2.7', display: 'OC. Kimi K2.7 Free', upstream: 'kimi-k2.7', caps: ['推理'], status: 'chat_only', latency: '4.1 秒', context: '256,000', maxOutput: '32,000', checked: '2 分钟前' },
        { id: 'oc/minimax-m3', display: 'OC. MiniMax M3 Free', upstream: 'minimax-m3', caps: ['推理'], status: 'unavailable', latency: '超时 30 秒', context: '512,000', maxOutput: '128,000', checked: '12 分钟前' },
      ],
    },
    workbuddy: {
      label: 'WorkBuddy',
      eyebrow: 'WORKBUDDY · 国内版',
      title: 'WorkBuddy 国内版',
      subtitle: '官方登录、多账号自动切换；模型只在本机转发',
      actions: [
        { id: 'refresh', label: '刷新目录', icon: 'refresh' },
        { id: 'credits', label: '刷新额度', icon: 'activity' },
      ],
      metricDefs: [
        { key: 'accounts', label: '账号' },
        { key: 'models', label: '模型' },
        { key: 'credits', label: '积分' },
      ],
      feedback: '目录已刷新：10 个模型，2 个账号可用。',
      credits: '2,401',
      statusText: '运行中 · 2 个账号',
      serviceSub: 'WorkBuddy 5.5.6',
      listMeta: '最近刷新 1 分钟前',
      lastHeader: '账号 / 耗时',
      accounts: [
        { initials: 'A', name: 'Alice', sub: '2,401 积分 · 优先', status: 'success', preferred: true },
        { initials: 'B', name: 'Bob', sub: '830 积分 · 冷却 42s', status: 'cooling' },
      ],
      models: [
        { id: 'wb/hy3', display: 'WB. Hy3', upstream: 'hy3', caps: ['推理', '图片'], status: 'available', latency: '2 账号 · 3.9 秒', accounts: 2, context: '192,000', maxOutput: '64,000', checked: '1 分钟前' },
        { id: 'wb/deepseek-v4.1-flash', display: 'WB. DeepSeek-V4.1-Flash', upstream: 'deepseek-v4.1-flash', caps: ['推理', '图片'], status: 'available', latency: '2 账号 · 4.2 秒', accounts: 2, context: '1,000,000', maxOutput: '128,000', checked: '1 分钟前' },
        { id: 'wb/glm-5.3', display: 'WB. GLM-5.3', upstream: 'glm-5.3', caps: ['推理', '图片'], status: 'available', latency: '2 账号 · 5.1 秒', accounts: 2, context: '1,000,000', maxOutput: '64,000', checked: '1 分钟前' },
        { id: 'wb/glm-5.3-flash', display: 'WB. GLM-5.3-Flash', upstream: 'glm-5.3-flash', caps: ['推理', '图片'], status: 'available', latency: '2 账号 · 2.4 秒', accounts: 2, context: '1,000,000', maxOutput: '131,072', checked: '1 分钟前' },
        { id: 'wb/minimax-m3', display: 'WB. MiniMax-M3', upstream: 'minimax-m3', caps: ['推理'], status: 'available', latency: '1 账号 · 6.8 秒', accounts: 1, context: '512,000', maxOutput: '128,000', checked: '1 分钟前' },
        { id: 'wb/kimi-k3', display: 'WB. Kimi-K3', upstream: 'kimi-k3', caps: ['推理'], status: 'available', latency: '1 账号 · 7.3 秒', accounts: 1, context: '1,000,000', maxOutput: '32,000', checked: '1 分钟前' },
        { id: 'wb/step-5-preview', display: 'WB. Step-5-Preview', upstream: 'step-5-preview', caps: ['推理'], status: 'available', latency: '1 账号 · 9.0 秒', accounts: 1, context: '1,000,000', maxOutput: '64,000', checked: '1 分钟前' },
        { id: 'wb/space-bunny', display: 'WB. Space-Bunny', upstream: 'space-bunny', caps: ['推理'], status: 'available', latency: '1 账号 · 6.1 秒', accounts: 1, context: '1,000,000', maxOutput: '128,000', checked: '1 分钟前' },
        { id: 'wb/hy4-preview', display: 'WB. Hy4-Preview', upstream: 'hy4-preview', caps: ['推理'], status: 'chat_only', latency: '1 账号 · 8.4 秒', accounts: 1, context: '1,000,000', maxOutput: '64,000', checked: '1 分钟前' },
        { id: 'wb/qwen3-max', display: 'WB. Qwen3-Max', upstream: 'qwen3-max', caps: ['推理'], status: 'pending', latency: '—', accounts: 0, context: '262,144', maxOutput: '32,768', checked: '尚未检测' },
      ],
    },
    wbi: {
      label: 'WorkBuddy AI',
      eyebrow: 'WORKBUDDY AI · 国际版',
      title: 'WorkBuddy AI 国际版',
      subtitle: 'Google / 微信登录；与国内版账号、积分互不混用',
      actions: [
        { id: 'refresh', label: '刷新目录', icon: 'refresh' },
        { id: 'credits', label: '刷新额度', icon: 'activity' },
      ],
      metricDefs: [
        { key: 'accounts', label: '账号' },
        { key: 'models', label: '模型' },
        { key: 'credits', label: '积分' },
      ],
      feedback: '已登录 1 个账号；可继续添加，按 round-robin 轮换。',
      credits: '1,820',
      statusText: '运行中 · 1 个账号',
      serviceSub: 'WorkBuddy AI 5.5.2',
      listMeta: '最近刷新 3 分钟前',
      lastHeader: '账号 / 耗时',
      accounts: [
        { initials: 'C', name: 'Cathy', sub: '1,820 积分 · 优先', status: 'success', preferred: true },
      ],
      models: [
        { id: 'wbi/hy3', display: 'WBI. Hy3', upstream: 'hy3', caps: ['推理', '图片'], status: 'available', latency: '1 账号 · 3.1 秒', accounts: 1, context: '192,000', maxOutput: '64,000', checked: '3 分钟前' },
        { id: 'wbi/deepseek-v4.1-flash', display: 'WBI. DeepSeek-V4.1-Flash', upstream: 'deepseek-v4.1-flash', caps: ['推理', '图片'], status: 'available', latency: '1 账号 · 2.9 秒', accounts: 1, context: '1,000,000', maxOutput: '128,000', checked: '3 分钟前' },
        { id: 'wbi/glm-5.3', display: 'WBI. GLM-5.3', upstream: 'glm-5.3', caps: ['推理', '图片'], status: 'available', latency: '1 账号 · 4.4 秒', accounts: 1, context: '1,000,000', maxOutput: '64,000', checked: '3 分钟前' },
        { id: 'wbi/glm-5.3-flash', display: 'WBI. GLM-5.3-Flash', upstream: 'glm-5.3-flash', caps: ['推理', '图片'], status: 'available', latency: '1 账号 · 2.2 秒', accounts: 1, context: '1,000,000', maxOutput: '131,072', checked: '3 分钟前' },
        { id: 'wbi/minimax-m3', display: 'WBI. MiniMax-M3', upstream: 'minimax-m3', caps: ['推理'], status: 'available', latency: '1 账号 · 5.7 秒', accounts: 1, context: '512,000', maxOutput: '128,000', checked: '3 分钟前' },
        { id: 'wbi/kimi-k3', display: 'WBI. Kimi-K3', upstream: 'kimi-k3', caps: ['推理'], status: 'available', latency: '1 账号 · 6.2 秒', accounts: 1, context: '1,000,000', maxOutput: '32,000', checked: '3 分钟前' },
        { id: 'wbi/gpt-6-astra', display: 'WBI. GPT-6-Astra', upstream: 'gpt-6-astra', caps: ['推理', '图片'], status: 'chat_only', latency: '1 账号 · 7.8 秒', accounts: 1, context: '400,000', maxOutput: '128,000', checked: '3 分钟前' },
        { id: 'wbi/claude-5-sonnet', display: 'WBI. Claude-5-Sonnet', upstream: 'claude-5-sonnet', caps: ['推理', '图片'], status: 'pending', latency: '—', accounts: 0, context: '200,000', maxOutput: '64,000', checked: '尚未检测' },
      ],
    },
  };

  const STATUS = {
    available: { label: '可用', dot: 'success', text: 'success' },
    chat_only: { label: '仅对话', dot: 'warning', text: 'warning' },
    pending: { label: '待检测', dot: 'neutral', text: 'neutral' },
    unavailable: { label: '不可用', dot: 'error', text: 'error' },
    rate_limited: { label: '限流', dot: 'warning', text: 'warning' },
    no_account: { label: '无账号', dot: 'neutral', text: 'neutral' },
  };

  const CLIENTS = [
    { id: 'workbuddy', name: 'WorkBuddy（国内）', path: '~/.workbuddy/models.json', status: '已探测', checked: true, note: '排除 WB 自身分组' },
    { id: 'wbi', name: 'WorkBuddy AI（国际）', path: '~/.workbuddy-ai/models.json', status: '已探测', checked: true, note: '排除 WBI 自身分组' },
    { id: 'codex', name: 'Codex', path: '~/.codex/config.toml', status: '已探测', checked: true, note: 'responses' },
    { id: 'claude', name: 'Claude Code', path: '~/.claude/settings.json', status: '已探测', checked: true, note: 'messages' },
    { id: 'dsh', name: 'DeepSeek Harness', path: '~/.dsh/profiles/desktop/cordis.patch.yml', status: '已探测', checked: true, note: 'llm-pi-ai' },
  ];

  const HISTORY = [
    {
      id: 'h1',
      client: 'workbuddy',
      clientName: 'WorkBuddy',
      icon: 'WB',
      date: '今天 13:42',
      fullDate: '2026-10-18 13:42',
      models: 7,
      target: '~/.workbuddy/models.json',
      status: 'success',
      statusLabel: '成功',
      backup: 'models.json.ai-bobby-20261018-1342.bak',
      backupMeta: '218 KB · 第 5 份备份',
      detail: '写入 7 个模型；保留 4 个原有自定义模型；重复导入 changed:false。',
    },
    {
      id: 'h2',
      client: 'claude',
      clientName: 'Claude Code',
      icon: 'CC',
      date: '今天 13:39',
      fullDate: '2026-10-18 13:39',
      models: 5,
      target: '~/.claude/settings.json',
      status: 'warn',
      statusLabel: '已覆盖 env',
      backup: 'settings.json.ai-bobby-20261018-1339.bak',
      backupMeta: '42 KB · 第 3 份备份',
      detail: '写入 ANTHROPIC_BASE_URL / AUTH_TOKEN / MODEL；原 8787 配置已备份。',
    },
    {
      id: 'h3',
      client: 'codex',
      clientName: 'Codex',
      icon: 'CX',
      date: '昨天 22:10',
      fullDate: '2026-10-17 22:10',
      models: 7,
      target: '~/.codex/config.toml',
      status: 'success',
      statusLabel: '成功',
      backup: 'config.toml.ai-bobby-20261017-2210.bak',
      backupMeta: '18 KB · 第 2 份备份',
      detail: '追加 [model_providers.ai-bobby]；未修改顶层 model / model_provider。',
    },
    {
      id: 'h4',
      client: 'dsh',
      clientName: 'DeepSeek Harness',
      icon: 'DS',
      date: '昨天 22:08',
      fullDate: '2026-10-17 22:08',
      models: 7,
      target: '~/.dsh/profiles/desktop/cordis.patch.yml',
      status: 'success',
      statusLabel: '成功',
      backup: 'cordis.patch.yml.ai-bobby-20261017-2208.bak',
      backupMeta: '31 KB · 第 2 份备份',
      detail: '追加 llm-pi-ai provider ai-bobby；workbuddy2api / nvidia 保留。',
    },
  ];

  const BACKUPS = [
    { id: 'b1', name: 'models.json.ai-bobby-20261018-1342.bak', meta: 'WorkBuddy · 今天 13:42 · 218 KB', history: 'h1' },
    { id: 'b2', name: 'settings.json.ai-bobby-20261018-1339.bak', meta: 'Claude Code · 今天 13:39 · 42 KB', history: 'h2' },
    { id: 'b3', name: 'config.toml.ai-bobby-20261017-2210.bak', meta: 'Codex · 昨天 22:10 · 18 KB', history: 'h3' },
    { id: 'b4', name: 'cordis.patch.yml.ai-bobby-20261017-2208.bak', meta: 'DSH · 昨天 22:08 · 31 KB', history: 'h4' },
    { id: 'b5', name: 'models.json.ai-bobby-20261012-0914.bak', meta: 'WorkBuddy · 10-12 09:14 · 204 KB', history: null },
  ];

  const ICONS = {
    refresh: '<svg class="button-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15.7 7A6 6 0 1 0 16 12M16 3v4h-4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    activity: '<svg class="button-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 10h3l2-5 4 10 2-5h3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevron: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m5 6 3 3 3-3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m5 10.5 3.2 3L15 6.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus: '<svg class="button-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M10 4v12M4 10h12" stroke-linecap="round"/></svg>',
  };

  const state = {
    tab: 'opencode',
    page: 'opencode',
    themeChoice: 'dark',
    historyFilter: 'all',
    historyQuery: '',
    pendingRestore: null,
    restoreVersions: [],
    selectedVersion: null,
    musicSong: null,
    update: { status: 'idle', progress: 0, timer: null },
    selection: {
      opencode: new Set(),
      workbuddy: new Set(),
      wbi: new Set(),
    },
    expanded: new Set(),
    clients: new Map(CLIENTS.map(client => [client.id, client.checked])),
    groups: new Map([['oc', true], ['wb', true], ['wbi', true]]),
    defaultModel: 'oc/big-pickle',
    probeTimer: null,
    toastTimer: null,
  };

  // Mirrors the real startup scan: nothing is selected until the client
  // configs are read, then only the models they reference come back checked.
  for (const id of [
    'oc/deepseek-v4.1-flash',
    'oc/glm-5.3-flash',
    'oc/space-bunny',
    'wb/deepseek-v4.1-flash',
    'wb/glm-5.3-flash',
    'wbi/deepseek-v4.1-flash',
    'wbi/glm-5.3-flash',
  ]) {
    const [group] = id.split('/');
    const tab = group === 'oc' ? 'opencode' : group === 'wb' ? 'workbuddy' : 'wbi';
    state.selection[tab].add(id);
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  function source() {
    return SOURCES[state.tab];
  }

  function isAvailable(model) {
    return model.status === 'available' || model.status === 'chat_only';
  }

  function selectedCount(tab = state.tab) {
    return state.selection[tab].size;
  }

  function totalSelected() {
    return Object.values(state.selection).reduce((sum, set) => sum + set.size, 0);
  }

  function allModels() {
    return Object.values(SOURCES).flatMap(source => source.models);
  }

  function findModel(id) {
    return allModels().find(model => model.id === id);
  }

  function metricsFor(tabKey) {
    const src = SOURCES[tabKey];
    const models = src.models;
    if (tabKey === 'opencode') {
      return {
        found: models.length,
        available: models.filter(model => model.status === 'available').length,
        pending: models.filter(model => model.status === 'pending').length,
      };
    }
    return {
      accounts: src.accounts.length,
      models: models.length,
      credits: src.credits,
    };
  }

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------

  function renderAll() {
    renderSourceHead();
    renderAccountStrip();
    renderTable();
    renderTabCounts();
    updateCounts();
    renderImportDrawer();
    renderHistory();
  }

  function renderSourceHead() {
    const src = source();
    $('#source-title').textContent = src.title;
    $('#source-subtitle').textContent = src.subtitle;
    $('#list-meta-text').textContent = src.listMeta;
    $('#feedback-text').textContent = src.feedback;
    $('#feedback').hidden = false;
    $('#service-text').textContent = src.statusText;
    $('#service-sub').textContent = src.serviceSub;

    const metrics = metricsFor(state.tab);
    const selected = selectedCount();
    $('#metrics').innerHTML = src.metricDefs.map(def => {
      const value = metrics[def.key];
      const tone = def.tone ? ` ${def.tone}` : '';
      return `<div class="metric${tone}"><dt>${escapeHtml(def.label)}</dt><dd>${escapeHtml(value)}</dd></div>`;
    }).join('') + `<div class="metric accent"><dt>已选</dt><dd><span id="selected-count">${selected}</span></dd></div>`;

    $('#source-actions').innerHTML = src.actions.map(action =>
      `<button type="button" data-action="${action.id}">${ICONS[action.icon] || ''}<span>${escapeHtml(action.label)}</span></button>`
    ).join('');

    const lastHeader = $('.timing-heading');
    if (lastHeader) lastHeader.textContent = src.lastHeader;

    $('#account-strip').hidden = state.tab === 'opencode';
    if (state.tab !== 'opencode') {
      $('#account-note').textContent = src.accounts.length > 1
        ? 'round-robin · 失败自动切换'
        : '单账号 · 可继续添加';
    }

    const available = src.models.filter(model => model.status === 'available').length;
    const abnormal = src.models.length - available;
    $('#table-footer-text').textContent = `${available} 个可用 · ${abnormal} 个仅对话 / 待检测 / 不可用`;
  }

  function renderTabCounts() {
    for (const [key, src] of Object.entries(SOURCES)) {
      const node = $(`[data-count="${key}"]`);
      if (node) node.textContent = `${state.selection[key].size}/${src.models.length}`;
    }
  }

  function setToolbar(eyebrow, title) {
    $('#toolbar-eyebrow').textContent = eyebrow;
    $('#toolbar-title').textContent = title;
  }

  function navigateTo(page) {
    const isSource = Object.hasOwn(SOURCES, page);
    if (!isSource && !['overview', 'history', 'about', 'settings'].includes(page)) return;
    state.page = page;
    if (isSource) state.tab = page;
    renderTabCounts();

    $('#page-overview').hidden = page !== 'overview';
    $('#page-models').hidden = !isSource;
    $('#page-history').hidden = page !== 'history';
    $('#page-about').hidden = page !== 'about';
    $('#page-settings').hidden = page !== 'settings';

    for (const item of $$('.side-item[data-page]')) {
      item.classList.toggle('active', item.dataset.page === page);
    }

    if (isSource) {
      setToolbar('模型来源', SOURCES[page].label);
      renderAll();
    } else if (page === 'overview') {
      setToolbar('总览', '概览');
      renderOverview();
    } else if (page === 'history') {
      setToolbar('其他', '历史记录');
      renderHistory();
    } else if (page === 'about') {
      setToolbar('ABOUT', '关于');
    } else {
      setToolbar('偏好', '设置');
      applyTheme(state.themeChoice);
    }
    $('.content-shell').scrollTop = 0;
  }

  function renderOverview() {
    const all = Object.values(SOURCES);
    const available = all.reduce((sum, src) => sum + src.models.filter(model => model.status === 'available').length, 0);
    const pending = all.reduce((sum, src) => sum + src.models.filter(model => model.status === 'pending').length, 0);
    const totalModels = all.reduce((sum, src) => sum + src.models.length, 0);
    $('#overview-source-sub').textContent = `可用 ${available} / 待检测 ${pending}`;
    $('#overview-gateway-sub').textContent = `127.0.0.1:46890 · ${totalModels} 个模型`;

    const cards = [
      { id: 'opencode', label: 'OpenCode', note: '免费模型池', src: SOURCES.opencode, meta: '无需登录 · 按价格字段筛免费模型' },
      { id: 'workbuddy', label: 'WorkBuddy', note: '国内版', src: SOURCES.workbuddy, meta: `${SOURCES.workbuddy.accounts.length} 个账号 · round-robin` },
      { id: 'wbi', label: 'WorkBuddy AI', note: '国际版', src: SOURCES.wbi, meta: `${SOURCES.wbi.accounts.length} 个账号 · round-robin` },
    ];
    $('#overview-sources').innerHTML = cards.map(card => {
      const usable = card.src.models.filter(model => model.status === 'available').length;
      return `
        <button class="overview-source" type="button" data-page="${card.id}">
          <span class="overview-source-head"><strong>${escapeHtml(card.label)}</strong><span class="overview-source-note">${escapeHtml(card.note)}</span></span>
          <span class="overview-source-count">${card.src.models.length}<small>个模型</small></span>
          <span class="overview-source-meta">可用 ${usable} · ${escapeHtml(card.meta)}</span>
          <span class="overview-source-link">查看模型 →</span>
        </button>`;
    }).join('');

    const last = HISTORY[0];
    if (last) {
      $('#overview-last-time').textContent = last.date;
      $('#overview-last-sub').textContent = `${last.clientName} · ${last.models} 个模型 · ${last.statusLabel}`;
    }
    $('#overview-credit-sub').textContent = `CN ${SOURCES.workbuddy.accounts.length} 个账号 · INTL ${SOURCES.wbi.accounts.length} 个账号`;
    $('#overview-recent-list').innerHTML = HISTORY.slice(0, 3).map(record => `
      <div class="recent-row">
        <span class="recent-icon" aria-hidden="true">${escapeHtml(record.icon)}</span>
        <span class="recent-main"><strong>${escapeHtml(record.clientName)}</strong><small>${escapeHtml(record.date)} · ${record.models} 个模型 · <code>${escapeHtml(record.target)}</code></small></span>
        <span class="status-pill${record.status === 'warn' ? ' warn' : ''}">${escapeHtml(record.statusLabel)}</span>
      </div>`).join('');
  }

  function backupOnlyRow(backup) {
    const [clientName] = backup.meta.split(' · ');
    return {
      id: backup.id,
      client: backup.client || 'workbuddy',
      clientName: backup.clientName || clientName,
      icon: backup.icon || clientName.slice(0, 2).toUpperCase(),
      date: backup.date || backup.meta.split(' · ')[1] || '',
      fullDate: backup.fullDate || backup.meta.split(' · ')[1] || '',
      models: 0,
      target: backup.target || '—',
      status: 'backup',
      statusLabel: '仅备份',
      backup: backup.name,
      backupMeta: backup.size || backup.meta.split(' · ')[2] || '',
      detail: '这是没有对应导入记录的旧备份；可以恢复，但没有可对比的写入记录。',
    };
  }

  function renderHistory() {
    if (!$('#history-list')) return;
    const query = state.historyQuery.trim().toLowerCase();
    const earliestByClient = new Map();
    for (const record of HISTORY) earliestByClient.set(record.client, record.id);
    const rows = [
      ...HISTORY.map(record => ({ record, backup: BACKUPS.find(backup => backup.history === record.id) || null })),
      ...BACKUPS.filter(backup => !backup.history).map(backup => ({ record: backupOnlyRow(backup), backup })),
    ].filter(({ record, backup }) => {
      const clientOk = state.historyFilter === 'all' || record.client === state.historyFilter;
      const queryOk = query === '' || [record.clientName, record.target, record.date, record.detail, backup?.name]
        .filter(Boolean).join(' ').toLowerCase().includes(query);
      return clientOk && queryOk;
    });

    $('#history-list').innerHTML = rows.length === 0
      ? '<tr><td colspan="3"><div class="history-empty">没有匹配的导入记录或备份。</div></td></tr>'
      : rows.map(({ record, backup }) => `
        <tr class="history-row" data-history="${record.id}">
          <td class="history-icon-cell"><span class="history-icon" aria-hidden="true">${escapeHtml(record.icon)}</span></td>
          <td class="history-main">
            <div class="history-line1"><strong>${escapeHtml(record.clientName)}</strong></div>
            <div class="history-line2">
              <span>${escapeHtml(record.date)}</span>
              ${record.models > 0 ? `<span class="history-sep">·</span><span>${record.models} 个模型</span>` : ''}
              <span class="history-sep">·</span>
              <span class="status-pill${record.status === 'warn' ? ' warn' : ''}">${escapeHtml(record.statusLabel)}</span>
            </div>
            <div class="history-line3"><span class="line-label">配置</span><code title="${escapeHtml(record.target)}">${escapeHtml(record.target)}</code></div>
            <div class="history-line4"><span class="line-label">备份</span>${backup
              ? `<code title="${escapeHtml(backup.name)}">${escapeHtml(backup.name)}</code><span class="line-meta">${escapeHtml(record.backupMeta || backup.meta.split(' · ')[2] || '')}</span>${record.id === earliestByClient.get(record.client) ? '<span class="chip baseline">基线</span>' : ''}`
              : '<span class="line-empty">没有可用的备份文件</span>'}</div>
          </td>
          <td class="history-cell-actions">
            ${record.status !== 'backup' ? `<button class="ghost" type="button" data-history-view="${record.id}" title="只读查看这次写入改了什么">查看差异</button>` : ''}
            <button class="ghost" type="button" data-open-dir="${record.id}" title="在 Finder 中打开配置所在目录">打开目录</button>
            ${backup ? `<button class="ghost" type="button" data-restore="${record.id}">恢复</button>` : ''}
          </td>
        </tr>`).join('');
  }

  function openDiff(record) {
    if (!record) return;
    state.pendingDiff = record;
    $('#diff-title').textContent = `查看差异 · ${record.clientName}`;
    $('#diff-subtitle').textContent = `${record.fullDate} · ${record.models} 个模型 · ${record.target}`;
    $('#diff-body').textContent = [
      `# 只读预览：${record.target}`,
      `# 备份：${record.backup || '(无)'}`,
      '',
      `  ${record.clientName} 原有配置`,
      `+ 写入 ${record.models} 个 AI Bobby 模型（标记 aiBobbyOwner = ai-bobby-v1）`,
      `+ 只改动 AI Bobby 自己的条目；手写条目保留`,
      '',
      record.detail,
    ].join('\n');
    $('#diff-modal').hidden = false;
    $('#close-diff-foot').focus();
  }

  function closeDiff() {
    $('#diff-modal').hidden = true;
    state.pendingDiff = null;
  }

  function folderOf(path) {
    const parts = String(path).split('/');
    parts.pop();
    return parts.join('/') || '~';
  }

  function openFolder(record) {
    const folder = folderOf(record.target);
    showToast(`原型：会在 Finder 中打开 ${folder}`);
  }

  function restoreFor(id) {
    const record = HISTORY.find(item => item.id === id);
    if (record) return record;
    const backup = BACKUPS.find(item => item.id === id);
    if (backup?.history) return HISTORY.find(item => item.id === backup.history);
    if (backup) return backupOnlyRow(backup);
    return null;
  }

  // Mock backup sets: baseline (before the first AI Bobby write) + the
  // newest five rolling backups. The real app keeps the same upper bound.
  const BACKUP_SETS = {
    workbuddy: [
      { at: '2026-10-12 09:14', size: '204 KB', file: 'models.json.ai-bobby-20261012-0914.bak', models: 0, baseline: true },
      { at: '2026-10-17 22:10', size: '218 KB', file: 'models.json.ai-bobby-20261017-2210.bak', models: 5 },
      { at: '2026-10-18 13:39', size: '214 KB', file: 'models.json.ai-bobby-20261018-1339.bak', models: 7 },
      { at: '2026-10-18 13:42', size: '218 KB', file: 'models.json.ai-bobby-20261018-1342.bak', models: 7 },
      { at: '2026-10-18 18:20', size: '221 KB', file: 'models.json.ai-bobby-20261018-1820.bak', models: 9 },
      { at: '2026-10-19 00:54', size: '223 KB', file: 'models.json.ai-bobby-20261019-0054.bak', models: 9 },
    ],
    claude: [
      { at: '2026-10-13 10:02', size: '38 KB', file: 'settings.json.ai-bobby-20261013-1002.bak', models: 0, baseline: true },
      { at: '2026-10-17 22:10', size: '41 KB', file: 'settings.json.ai-bobby-20261017-2210.bak', models: 5 },
      { at: '2026-10-18 13:39', size: '42 KB', file: 'settings.json.ai-bobby-20261018-1339.bak', models: 7 },
      { at: '2026-10-18 18:20', size: '43 KB', file: 'settings.json.ai-bobby-20261018-1820.bak', models: 7 },
    ],
    codex: [
      { at: '2026-10-14 21:30', size: '16 KB', file: 'config.toml.ai-bobby-20261014-2130.bak', models: 0, baseline: true },
      { at: '2026-10-17 22:10', size: '18 KB', file: 'config.toml.ai-bobby-20261017-2210.bak', models: 7 },
      { at: '2026-10-18 18:20', size: '19 KB', file: 'config.toml.ai-bobby-20261018-1820.bak', models: 7 },
    ],
    dsh: [
      { at: '2026-10-14 20:05', size: '28 KB', file: 'cordis.patch.yml.ai-bobby-20261014-2005.bak', models: 0, baseline: true },
      { at: '2026-10-17 22:08', size: '31 KB', file: 'cordis.patch.yml.ai-bobby-20261017-2208.bak', models: 5 },
      { at: '2026-10-18 18:20', size: '32 KB', file: 'cordis.patch.yml.ai-bobby-20261018-1820.bak', models: 7 },
    ],
    wbi: [
      { at: '2026-10-15 09:12', size: '186 KB', file: 'models.json.ai-bobby-20261015-0912.bak', models: 0, baseline: true },
      { at: '2026-10-18 18:20', size: '190 KB', file: 'models.json.ai-bobby-20261018-1820.bak', models: 5 },
    ],
  };

  function relativeTime(at) {
    const then = new Date(String(at).replace(' ', 'T')).getTime();
    if (!Number.isFinite(then)) return '';
    const minutes = Math.max(0, Math.round((Date.now() - then) / 60000));
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes} 分钟前`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} 小时前`;
    if (hours < 36) return '昨天';
    return `${Math.round(hours / 24)} 天前`;
  }

  function versionsFor(record) {
    const set = BACKUP_SETS[record.client] || BACKUP_SETS.workbuddy;
    const versions = set.map((version, index) => ({
      id: `${record.client}-v${index}`,
      label: version.baseline ? '使用 AI Bobby 前' : `第 ${index + 1} 次写入前`,
      relative: relativeTime(version.at),
      target: record.target,
      ...version,
    }));
    const baseline = versions[0];
    const rolling = versions.slice(1).sort((a, b) => String(b.at).localeCompare(String(a.at)));
    return [baseline, ...rolling];
  }

  function openRestore(record) {
    if (!record) return;
    state.pendingRestore = record;
    state.restoreVersions = versionsFor(record);
    state.selectedVersion = state.restoreVersions[0]?.id || null;
    $('#restore-title').textContent = `恢复 ${record.clientName} 的配置`;
    $('#restore-subtitle').textContent = '选择一个备份版本；默认选中基线（使用 AI Bobby 前）。';
    renderRestoreVersions();
    $('#restore-modal').hidden = false;
    $('#confirm-restore').focus();
  }

  function renderRestoreVersions() {
    const versions = state.restoreVersions;
    const baseline = versions.find(version => version.baseline);
    const rolling = versions.filter(version => !version.baseline);
    const row = version => `
      <button type="button" class="restore-version${version.id === state.selectedVersion ? ' selected' : ''}" data-version="${version.id}" role="radio" aria-checked="${version.id === state.selectedVersion}">
        <span class="restore-radio" aria-hidden="true"></span>
        <span class="restore-version-copy">
          <strong>${escapeHtml(version.baseline ? version.label : version.relative)}</strong>
          <small>${escapeHtml(version.at)}${version.baseline ? '' : ` · ${escapeHtml(version.label)}`} · ${escapeHtml(version.size)}</small>
        </span>
        ${version.baseline ? '<span class="chip baseline">基线</span>' : ''}
      </button>`;
    $('#restore-versions').innerHTML = [
      baseline ? row(baseline) : '',
      rolling.length > 0 ? '<div class="restore-divider">历史备份 · 最新在前</div>' : '',
      ...rolling.map(row),
    ].join('');

    const selected = versions.find(version => version.id === state.selectedVersion) || versions[0];
    if (!selected) return;
    $('#restore-details').innerHTML = `
      <div class="restore-summary">
        <span class="restore-summary-label">将恢复到</span>
        <strong class="restore-summary-title">${escapeHtml(selected.baseline ? '使用 AI Bobby 前' : selected.label)}</strong>
        <span class="restore-summary-when">${escapeHtml(selected.relative)} · ${escapeHtml(selected.at)}</span>
        <dl class="restore-facts">
          <div><dt>备份文件</dt><dd>${escapeHtml(selected.file)}</dd></div>
          <div><dt>文件大小</dt><dd>${escapeHtml(selected.size)}</dd></div>
          <div><dt>目标文件</dt><dd>${escapeHtml(selected.target)}</dd></div>
        </dl>
        <p class="restore-outcome">${selected.baseline ? '恢复后：移除这个客户端里所有 AI Bobby 条目' : `恢复后：写入 ${selected.models} 个 AI Bobby 模型（该次写入前的状态）`}</p>
      </div>`;
  }

  function closeRestore() {
    $('#restore-modal').hidden = true;
    state.pendingRestore = null;
    state.restoreVersions = [];
    state.selectedVersion = null;
  }

  function openMusic(track) {
    const id = track.dataset.songId;
    const title = track.dataset.songTitle;
    const album = track.dataset.songAlbum;
    if (!id || !title) return;
    state.musicSong = { id, title, album };
    const player = $('#floating-player');
    const frame = $('#music-frame');
    player.hidden = false;
    frame.src = `https://music.163.com/outchain/player?type=2&id=${encodeURIComponent(id)}&auto=1&height=66`;
    $('#close-music').focus();
  }

  function closeMusic() {
    $('#floating-player').hidden = true;
    $('#music-frame').src = 'about:blank';
    state.musicSong = null;
  }

  function initMusicPlayer() {
    const player = $('#floating-player');
    const handle = $('#player-handle');
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    const clamp = () => {
      const rect = player.getBoundingClientRect();
      const maxLeft = Math.max(4, window.innerWidth - rect.width - 4);
      const maxTop = Math.max(4, window.innerHeight - rect.height - 4);
      player.style.left = `${Math.min(Math.max(parseFloat(player.style.left || rect.left), 4), maxLeft)}px`;
      player.style.top = `${Math.min(Math.max(parseFloat(player.style.top || rect.top), 4), maxTop)}px`;
      player.style.right = 'auto';
      player.style.bottom = 'auto';
    };

    try {
      const saved = JSON.parse(localStorage.getItem('ai-bobby-player-pos') || 'null');
      if (saved && Number.isFinite(saved.left) && Number.isFinite(saved.top)) {
        player.style.left = `${saved.left}px`;
        player.style.top = `${saved.top}px`;
        player.style.right = 'auto';
        player.style.bottom = 'auto';
      }
    } catch {}

    handle.addEventListener('pointerdown', event => {
      if (event.button !== 0 || event.target.closest('.player-close')) return;
      const rect = player.getBoundingClientRect();
      dragging = true;
      startX = event.clientX;
      startY = event.clientY;
      startLeft = rect.left;
      startTop = rect.top;
      handle.setPointerCapture(event.pointerId);
      event.preventDefault();
    });
    handle.addEventListener('pointermove', event => {
      if (!dragging) return;
      player.style.left = `${startLeft + event.clientX - startX}px`;
      player.style.top = `${startTop + event.clientY - startY}px`;
      player.style.right = 'auto';
      player.style.bottom = 'auto';
    });
    handle.addEventListener('pointerup', event => {
      if (!dragging) return;
      dragging = false;
      try { handle.releasePointerCapture(event.pointerId); } catch {}
      clamp();
      try {
        localStorage.setItem('ai-bobby-player-pos', JSON.stringify({ left: parseFloat(player.style.left), top: parseFloat(player.style.top) }));
      } catch {}
    });
    window.addEventListener('resize', () => {
      if (!player.hidden && player.style.left) clamp();
    });
  }

  function renderAccountStrip() {
    const src = source();
    if (state.tab === 'opencode') {
      $('#account-strip').hidden = true;
      return;
    }
    $('#account-strip').hidden = false;
    $('#account-list').innerHTML = (src.accounts || []).map(account => `
      <div class="account-chip${account.preferred ? ' preferred' : ''}${account.status === 'cooling' ? ' cooling' : ''}">
        <span class="avatar">${escapeHtml(account.initials)}</span>
        <span class="account-meta">
          <span class="account-name">${escapeHtml(account.name)}</span>
          <span class="account-sub">${escapeHtml(account.sub)}</span>
        </span>
        <span class="account-status${account.status === 'cooling' ? ' cooling' : ''}" aria-label="${account.status === 'cooling' ? '冷却中' : '可用'}"></span>
      </div>
    `).join('');
    $('#account-note').textContent = (src.accounts || []).length > 1
      ? 'round-robin · 失败自动切换'
      : '单账号 · 可继续添加';
  }

  function renderTable() {
    const src = source();
    const rows = [];
    for (const model of src.models) {
      const selected = state.selection[state.tab].has(model.id);
      const expanded = state.expanded.has(model.id);
      const status = STATUS[model.status] || STATUS.pending;
      const caps = model.caps.map((cap, index) => `<span class="cap${index === 0 ? ' strong' : ''}">${escapeHtml(cap)}</span>`).join('');
      rows.push(`
        <tr class="model-row${selected ? ' selected' : ''}" data-id="${escapeHtml(model.id)}">
          <td class="check-cell"><input type="checkbox" ${selected ? 'checked' : ''} aria-label="导入 ${escapeHtml(model.display)}"></td>
          <td>
            <div class="model-cell">
              <button class="expander${expanded ? ' expanded' : ''}" type="button" aria-label="展开 ${escapeHtml(model.display)} 详情" aria-expanded="${expanded}">${ICONS.chevron}</button>
              <span class="model-name">
                <span class="model-display">${escapeHtml(model.display)}</span>
                <span class="model-upstream">${escapeHtml(model.id)}</span>
              </span>
            </div>
          </td>
          <td><div class="caps">${caps}</div></td>
          <td>
            <div class="status-cell">
              <span class="dot ${status.dot}" aria-hidden="true"></span>
              <span class="status-text ${status.text}">${escapeHtml(status.label)}</span>
            </div>
          </td>
          <td><span class="latency">${escapeHtml(model.latency)}</span></td>
        </tr>
        <tr class="detail-row" ${expanded ? '' : 'hidden'} data-detail="${escapeHtml(model.id)}">
          <td colspan="5">
            <dl class="detail-grid">
              <div class="detail-item"><dt>上游 ID</dt><dd>${escapeHtml(model.upstream)}</dd></div>
              <div class="detail-item"><dt>上下文</dt><dd>${escapeHtml(model.context)} tokens</dd></div>
              <div class="detail-item"><dt>最大输出</dt><dd>${escapeHtml(model.maxOutput)} tokens</dd></div>
              <div class="detail-item"><dt>最近检测</dt><dd>${escapeHtml(model.checked)}</dd></div>
              <div class="detail-item"><dt>能力</dt><dd>${escapeHtml(model.caps.join(' / '))}</dd></div>
              <div class="detail-item"><dt>路由</dt><dd>${escapeHtml(model.id.split('/')[0] === 'oc' ? 'OpenCode' : model.id.split('/')[0] === 'wb' ? 'WorkBuddy' : 'WorkBuddy AI')}</dd></div>
              <div class="detail-item"><dt>状态</dt><dd>${escapeHtml(STATUS[model.status].label)}${model.accounts ? ` · ${model.accounts} 个账号` : ''}</dd></div>
              <div class="detail-actions">
                <button type="button" data-detail-action="probe" data-model="${escapeHtml(model.id)}">只重测这一个</button>
                <button type="button" data-detail-action="copy" data-model="${escapeHtml(model.id)}">复制模型 ID</button>
              </div>
            </dl>
          </td>
        </tr>
      `);
    }
    $('#model-rows').innerHTML = rows.join('');
  }

  function updateCounts() {
    const selected = selectedCount();
    const total = totalSelected();
    $('#selected-count').textContent = String(selected);
    renderTabCounts();
    const badge = $('#import-badge');
    badge.textContent = String(total);
    badge.hidden = total === 0;

    const checkedClients = [...state.clients.entries()].filter(([, checked]) => checked).length;
    $('#drawer-summary').textContent = `已选 ${total} 个模型 · ${checkedClients} 个客户端`;

    const selectAll = $('#select-all');
    const available = source().models.filter(model => model.status === 'available');
    const allSelected = available.length > 0 && available.every(model => state.selection[state.tab].has(model.id));
    selectAll.textContent = allSelected ? '取消全选可用' : '全选可用';
  }

  // ---------------------------------------------------------------------------
  // Import drawer
  // ---------------------------------------------------------------------------

  function renderImportDrawer() {
    $('#client-list').innerHTML = CLIENTS.map(client => {
      const checked = state.clients.get(client.id);
      return `
        <label class="client-row${checked ? ' checked' : ''}" data-client="${client.id}">
          <input type="checkbox" ${checked ? 'checked' : ''} aria-label="导入到 ${escapeHtml(client.name)}">
          <span class="client-main">
            <span class="client-name">${escapeHtml(client.name)}<span class="client-status${client.note === '排除 WB 自身分组' || client.note === '排除 WBI 自身分组' ? ' warn' : ''}">${escapeHtml(client.note)}</span></span>
            <span class="client-path">${escapeHtml(client.path)}</span>
          </span>
          <span class="client-status">${escapeHtml(client.status)}</span>
        </label>
      `;
    }).join('');

    $('#group-chips').innerHTML = [
      { id: 'oc', label: 'OC', count: SOURCES.opencode.models.filter(model => model.status === 'available').length },
      { id: 'wb', label: 'WB', count: SOURCES.workbuddy.models.filter(model => model.status === 'available').length },
      { id: 'wbi', label: 'WBI', count: SOURCES.wbi.models.filter(model => model.status === 'available').length },
    ].map(group => {
      const checked = state.groups.get(group.id);
      return `
        <label class="group-chip${checked ? ' checked' : ''}">
          <input type="checkbox" data-group="${group.id}" ${checked ? 'checked' : ''}>
          ${group.label} <strong>${group.count}</strong>
        </label>
      `;
    }).join('');

    const defaultSelect = $('#default-model');
    const groups = [
      { id: 'oc', label: 'OpenCode', blocked: !state.groups.get('oc') },
      { id: 'wb', label: 'WorkBuddy', blocked: !state.groups.get('wb') },
      { id: 'wbi', label: 'WorkBuddy AI', blocked: !state.groups.get('wbi') },
    ];
    defaultSelect.innerHTML = groups.filter(group => !group.blocked).map(group => {
      const models = allModels().filter(model => model.id.startsWith(group.id + '/') && isAvailable(model));
      if (models.length === 0) return '';
      return `<optgroup label="${escapeHtml(group.label)}">${models.map(model =>
        `<option value="${escapeHtml(model.id)}" ${model.id === state.defaultModel ? 'selected' : ''}>${escapeHtml(model.display)}</option>`
      ).join('')}</optgroup>`;
    }).join('') || '<option value="">没有可用模型</option>';

    if (![...defaultSelect.options].some(option => option.value === state.defaultModel)) {
      state.defaultModel = defaultSelect.options[0]?.value || '';
    }

    renderDiff();
  }

  function activeGroups() {
    return {
      oc: state.groups.get('oc'),
      wb: state.groups.get('wb'),
      wbi: state.groups.get('wbi'),
    };
  }

  function groupModelCount(group) {
    const src = group === 'oc' ? SOURCES.opencode : group === 'wb' ? SOURCES.workbuddy : SOURCES.wbi;
    return src.models.filter(model => isAvailable(model) && state.selection[group === 'oc' ? 'opencode' : group === 'wb' ? 'workbuddy' : 'wbi'].has(model.id)).length;
  }

  function renderDiff() {
    const lines = [];
    const groups = activeGroups();
    const checkedClients = CLIENTS.filter(client => state.clients.get(client.id));
    if (checkedClients.length === 0) {
      lines.push({ type: 'dim', text: '# 请选择至少一个客户端' });
    } else if (!groups.oc && !groups.wb && !groups.wbi) {
      lines.push({ type: 'dim', text: '# 请选择至少一个分组' });
    } else {
      lines.push({ type: 'dim', text: '# AI Bobby · dry-run 预览（不会写入任何文件）' });
      lines.push({ type: 'dim', text: '' });
      for (const client of checkedClients) {
        if (client.id === 'workbuddy') {
          lines.push({ type: 'add', text: 'WorkBuddy（国内）  ~/.workbuddy/models.json' });
          const count = (groups.oc ? groupModelCount('oc') : 0) + (groups.wbi ? groupModelCount('wbi') : 0);
          lines.push({ type: 'add', text: `+ ${count} 个模型（自动排除 WB 自身分组）` });
          lines.push({ type: 'dim', text: '  url = http://127.0.0.1:46890/v1/chat/completions' });
          lines.push({ type: 'dim', text: '  apiKey = sk-…f3a2 · aiBobbyOwner = ai-bobby-v1' });
        } else if (client.id === 'wbi') {
          lines.push({ type: 'add', text: 'WorkBuddy AI（国际）  ~/.workbuddy-ai/models.json' });
          const count = (groups.oc ? groupModelCount('oc') : 0) + (groups.wb ? groupModelCount('wb') : 0);
          lines.push({ type: 'add', text: `+ ${count} 个模型（自动排除 WBI 自身分组）` });
          lines.push({ type: 'dim', text: '  url = http://127.0.0.1:46890/v1/chat/completions' });
        } else if (client.id === 'codex') {
          lines.push({ type: 'add', text: 'Codex  ~/.codex/config.toml' });
          lines.push({ type: 'add', text: '+ [model_providers.ai-bobby]' });
          lines.push({ type: 'add', text: '+ base_url = "http://127.0.0.1:46890/v1"' });
          lines.push({ type: 'add', text: '+ wire_api = "responses"' });
          lines.push({ type: 'add', text: '+ experimental_bearer_token = "sk-…f3a2"' });
        } else if (client.id === 'claude') {
          lines.push({ type: 'add', text: 'Claude Code  ~/.claude/settings.json' });
          lines.push({ type: 'add', text: '+ "ANTHROPIC_BASE_URL": "http://127.0.0.1:46890"' });
          lines.push({ type: 'add', text: '+ "ANTHROPIC_AUTH_TOKEN": "sk-…f3a2"' });
          lines.push({ type: 'add', text: `+ "ANTHROPIC_MODEL": "${state.defaultModel || 'oc/big-pickle'}"` });
        } else if (client.id === 'dsh') {
          lines.push({ type: 'add', text: 'DeepSeek Harness  ~/.dsh/profiles/desktop/cordis.patch.yml' });
          lines.push({ type: 'add', text: '+ ai-bobby:' });
          lines.push({ type: 'add', text: '+   apiKeyEnv: AI_BOBBY_API_KEY' });
          lines.push({ type: 'add', text: '+   api: openai-completions' });
          lines.push({ type: 'add', text: '+   baseURL: http://127.0.0.1:46890/v1' });
        }
        lines.push({ type: 'dim', text: '' });
      }
      lines.push({ type: 'dim', text: '# 写入前会备份；只增删 aiBobbyOwner 标记的条目。' });
    }
    $('#diff-preview').innerHTML = lines.map(line => {
      const cls = line.type === 'add' ? 'add' : line.type === 'del' ? 'del' : 'dim';
      return `<span class="${cls}">${escapeHtml(line.text)}</span>`;
    }).join('\n');
  }

  // ---------------------------------------------------------------------------
  // Interaction
  // ---------------------------------------------------------------------------

  function switchTab(tab) {
    if (!SOURCES[tab]) return;
    navigateTo(tab);
  }

  function toggleSelection(id, checked) {
    const set = state.selection[state.tab];
    if (checked) set.add(id);
    else set.delete(id);
    const row = $(`tr.model-row[data-id="${CSS.escape(id)}"]`);
    if (row) row.classList.toggle('selected', checked);
    updateCounts();
    renderDiff();
  }

  function toggleDetail(id) {
    const row = $(`tr.detail-row[data-detail="${CSS.escape(id)}"]`);
    const modelRow = $(`tr.model-row[data-id="${CSS.escape(id)}"]`);
    if (!row || !modelRow) return;
    const expander = $('.expander', modelRow);
    const willOpen = row.hidden;
    row.hidden = !willOpen;
    if (willOpen) state.expanded.add(id);
    else state.expanded.delete(id);
    expander.classList.toggle('expanded', willOpen);
    expander.setAttribute('aria-expanded', String(willOpen));
  }

  function showToast(text, duration = 2400) {
    const toast = $('#toast');
    toast.textContent = text;
    toast.hidden = false;
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, duration);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.append(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    }
  }

  function openDrawer() {
    renderImportDrawer();
    $('#scrim').hidden = false;
    $('#drawer').hidden = false;
    $('#open-import').setAttribute('aria-expanded', 'true');
    $('#close-import').focus();
  }

  function closeDrawer() {
    $('#scrim').hidden = true;
    $('#drawer').hidden = true;
    $('#open-import').setAttribute('aria-expanded', 'false');
  }

  function openLogin() {
    if (state.tab === 'opencode') return;
    const src = source();
    $('#login-title').textContent = `添加 ${src.title}账号`;
    $('#login-modal').hidden = false;
    $('#mock-login').focus();
  }

  function closeLogin() {
    $('#login-modal').hidden = true;
  }

  function addDemoAccount() {
    const src = source();
    if (state.tab === 'opencode') return;
    if (src.accounts.length >= 3) {
      showToast('原型最多演示 3 个账号');
      closeLogin();
      return;
    }
    const names = ['Dora', 'Evan', 'Fiona'];
    const name = names[src.accounts.length - 1] || 'New';
    src.accounts.push({
      initials: name[0],
      name,
      sub: `${(1200 + src.accounts.length * 317).toLocaleString('en-US')} 积分 · 启用`,
      status: 'success',
      preferred: false,
    });
    closeLogin();
    renderAll();
    showToast(`已添加账号 ${name}；目录与额度会在后台刷新`);
  }

  function applyTheme(choice) {
    state.themeChoice = choice;
    const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = choice === 'system' ? (systemDark ? 'dark' : 'light') : choice;
    document.body.dataset.theme = resolved;
    for (const button of $$('[data-theme-choice]')) {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === choice));
    }
    try { localStorage.setItem('ai-bobby-theme', choice); } catch {}
  }

  function runProbe() {
    if (state.probeTimer) return;
    const button = $('[data-action="probe"]');
    if (!button) return;
    const original = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `${ICONS.activity}<span>检测中…</span>`;
    showToast('正在并发检测，单个模型超时不会阻塞其他模型');
    state.probeTimer = setTimeout(() => {
      const src = SOURCES.opencode;
      for (const model of src.models) {
        if (model.status === 'pending') {
          model.status = 'available';
          model.latency = '9.8 秒';
          model.checked = '刚刚';
        }
      }
      state.probeTimer = null;
      button.disabled = false;
      button.innerHTML = original;
      renderAll();
      showToast('检测完成：8 个可用，1 个仅对话，1 个不可用');
    }, 1400);
  }

  function handleAction(action) {
    if (action === 'probe') {
      runProbe();
      return;
    }
    if (state.tab === 'opencode') {
      showToast('已读取 10 个模型；目录与判定缓存已更新');
      return;
    }
    if (action === 'credits') {
      showToast('额度已刷新：2 个账号，合计 2,401 积分');
      return;
    }
    showToast('目录已刷新；账号与模型状态已同步');
  }

  function showUpdate() {
    const banner = $('#update-banner');
    banner.hidden = false;
    if (state.update.status === 'downloading') {
      $('#update-title').textContent = '正在下载 0.2.2';
      $('#update-sub').textContent = '42.6 MB · 正在下载并校验，完成后需要重启';
      $('#update-progress').hidden = false;
      $('#update-start').hidden = true;
      $('#update-later').textContent = '后台继续';
      return;
    }
    if (state.update.status === 'ready') {
      $('#update-title').textContent = '更新已就绪';
      $('#update-sub').textContent = '0.2.2 已下载并通过校验，重启后生效';
      $('#update-progress').hidden = true;
      $('#update-start').hidden = false;
      $('#update-start').textContent = '立即重启';
      $('#update-later').textContent = '稍后';
      return;
    }
    state.update.status = 'available';
    $('#update-title').textContent = '发现新版本 0.2.2';
    $('#update-sub').textContent = '当前 0.2.1 · 42.6 MB · WorkBuddy 稳定性、历史记录与体验修复';
    $('#update-progress').hidden = true;
    $('#update-start').hidden = false;
    $('#update-start').textContent = '立即更新';
    $('#update-later').textContent = '稍后';
  }

  function hideUpdate() {
    $('#update-banner').hidden = true;
  }

  function startUpdate() {
    if (state.update.status === 'ready') {
      showToast('原型：将重启并安装 0.2.2');
      hideUpdate();
      return;
    }
    if (state.update.status === 'downloading') return;
    state.update.status = 'downloading';
    state.update.progress = 0;
    showUpdate();
    clearInterval(state.update.timer);
    state.update.timer = setInterval(() => {
      state.update.progress = Math.min(100, state.update.progress + 4);
      $('#update-bar').style.width = `${state.update.progress}%`;
      if (state.update.progress >= 100) {
        clearInterval(state.update.timer);
        state.update.timer = null;
        state.update.status = 'ready';
        showUpdate();
        showToast('0.2.2 已下载并通过校验，重启后生效');
      }
    }, 110);
  }

  function applySidebar(collapsed) {
    $('#app-shell').classList.toggle('sidebar-collapsed', collapsed);
    const button = $('#toggle-sidebar');
    button.setAttribute('aria-label', collapsed ? '展开侧边栏' : '收起侧边栏');
    button.title = collapsed ? '展开侧边栏' : '收起侧边栏';
    button.querySelector('svg').style.transform = collapsed ? 'rotate(180deg)' : '';
    try { localStorage.setItem('ai-bobby-sidebar', collapsed ? '1' : '0'); } catch {}
  }

  function initZeoFab() {
    const fab = $('#zeo-fab');
    let dragging = false;
    let moved = false;
    let suppressClick = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    const clamp = () => {
      const rect = fab.getBoundingClientRect();
      const maxLeft = Math.max(4, window.innerWidth - rect.width - 4);
      const maxTop = Math.max(4, window.innerHeight - rect.height - 4);
      fab.style.left = `${Math.min(Math.max(parseFloat(fab.style.left || rect.left), 4), maxLeft)}px`;
      fab.style.top = `${Math.min(Math.max(parseFloat(fab.style.top || rect.top), 4), maxTop)}px`;
      fab.style.right = 'auto';
      fab.style.bottom = 'auto';
    };

    try {
      const saved = JSON.parse(localStorage.getItem('ai-bobby-zeo-pos') || 'null');
      if (saved && Number.isFinite(saved.left) && Number.isFinite(saved.top)) {
        fab.style.left = `${saved.left}px`;
        fab.style.top = `${saved.top}px`;
        fab.style.right = 'auto';
        fab.style.bottom = 'auto';
        clamp();
      }
    } catch {}

    fab.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      const rect = fab.getBoundingClientRect();
      dragging = true;
      moved = false;
      startX = event.clientX;
      startY = event.clientY;
      startLeft = rect.left;
      startTop = rect.top;
      fab.setPointerCapture(event.pointerId);
      event.preventDefault();
    });
    fab.addEventListener('pointermove', event => {
      if (!dragging) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
      if (!moved) return;
      fab.style.left = `${startLeft + dx}px`;
      fab.style.top = `${startTop + dy}px`;
      fab.style.right = 'auto';
      fab.style.bottom = 'auto';
    });
    fab.addEventListener('pointerup', event => {
      if (!dragging) return;
      dragging = false;
      suppressClick = moved;
      try { fab.releasePointerCapture(event.pointerId); } catch {}
      if (moved) {
        clamp();
        try {
          localStorage.setItem('ai-bobby-zeo-pos', JSON.stringify({ left: parseFloat(fab.style.left), top: parseFloat(fab.style.top) }));
        } catch {}
        setTimeout(() => { suppressClick = false; }, 0);
      }
    });
    fab.addEventListener('click', event => {
      if (suppressClick) {
        event.preventDefault();
        return;
      }
      navigateTo('about');
    });
    window.addEventListener('resize', () => {
      if (fab.style.left) clamp();
    });
  }

  // ---------------------------------------------------------------------------
  // Wire up
  // ---------------------------------------------------------------------------

  document.addEventListener('click', event => {
    const target = event.target.closest('[data-page]');
    if (!target) return;
    event.preventDefault();
    navigateTo(target.dataset.page);
  });

  $('#source-actions').addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (button) handleAction(button.dataset.action);
  });

  $('#model-rows').addEventListener('click', event => {
    const detailAction = event.target.closest('[data-detail-action]');
    if (detailAction) {
      const modelId = detailAction.dataset.model;
      if (detailAction.dataset.detailAction === 'copy') {
        copyText(modelId).then(ok => showToast(ok ? `已复制 ${modelId}` : '复制失败，请手动选择'));
      } else {
        showToast(`已排队重测 ${modelId}；只影响这一个模型`);
      }
      return;
    }
    const checkbox = event.target.closest('input[type="checkbox"]');
    if (checkbox) return;
    const row = event.target.closest('tr.model-row');
    if (row) toggleDetail(row.dataset.id);
  });

  $('#model-rows').addEventListener('change', event => {
    const checkbox = event.target.closest('input[type="checkbox"]');
    if (!checkbox) return;
    const row = checkbox.closest('tr.model-row');
    if (row) toggleSelection(row.dataset.id, checkbox.checked);
  });

  $('#select-all').addEventListener('click', () => {
    const available = source().models.filter(model => model.status === 'available');
    const set = state.selection[state.tab];
    const allSelected = available.length > 0 && available.every(model => set.has(model.id));
    for (const model of available) {
      if (allSelected) set.delete(model.id);
      else set.add(model.id);
    }
    renderTable();
    updateCounts();
    renderDiff();
  });

  $('#feedback .feedback-close').addEventListener('click', () => {
    $('#feedback').hidden = true;
  });

  $('#copy-key').addEventListener('click', async () => {
    const ok = await copyText('sk-ai-bobby-demo-f3a2');
    showToast(ok ? 'API Key 已复制' : '复制失败，请在设置中查看');
  });

  $('#open-settings').addEventListener('click', () => navigateTo('settings'));

  // Music player: click a track to open the NetEase outchain iframe.
  document.addEventListener('click', event => {
    const track = event.target.closest('.music-track');
    if (track) {
      event.preventDefault();
      openMusic(track);
    }
  });
  for (const tab of $$('[data-music-list]')) {
    tab.addEventListener('click', () => {
      const target = tab.dataset.musicList;
      for (const item of $$('[data-music-list]')) {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      }
      $('#music-list-latest').hidden = target !== 'latest';
      $('#music-list-hot').hidden = target !== 'hot';
    });
  }
  $('#close-music').addEventListener('click', closeMusic);

  // History filters and restore actions.
  for (const button of $$('[data-filter]')) {
    button.addEventListener('click', () => {
      state.historyFilter = button.dataset.filter;
      for (const item of $$('[data-filter]')) item.classList.toggle('active', item === button);
      renderHistory();
    });
  }
  $('#history-search').addEventListener('input', event => {
    state.historyQuery = event.target.value;
    renderHistory();
  });
  $('#history-list').addEventListener('click', event => {
    const restore = event.target.closest('[data-restore]');
    if (restore) {
      openRestore(restoreFor(restore.dataset.restore));
      return;
    }
    const openDir = event.target.closest('[data-open-dir]');
    if (openDir) {
      const record = restoreFor(openDir.dataset.openDir);
      if (record) openFolder(record);
      return;
    }
    const view = event.target.closest('[data-history-view]');
    if (view) {
      const record = HISTORY.find(item => item.id === view.dataset.historyView);
      if (record) openDiff(record);
    }
  });
  $('#close-diff').addEventListener('click', closeDiff);
  $('#close-diff-foot').addEventListener('click', closeDiff);
  $('#diff-modal').addEventListener('click', event => {
    if (event.target === $('#diff-modal')) closeDiff();
  });
  $('#diff-open-dir').addEventListener('click', () => {
    if (state.pendingDiff) openFolder(state.pendingDiff);
  });
  $('#close-restore').addEventListener('click', closeRestore);
  $('#cancel-restore').addEventListener('click', closeRestore);
  $('#restore-modal').addEventListener('click', event => {
    if (event.target === $('#restore-modal')) closeRestore();
  });
  $('#restore-versions').addEventListener('click', event => {
    const button = event.target.closest('[data-version]');
    if (!button) return;
    state.selectedVersion = button.dataset.version;
    renderRestoreVersions();
  });
  $('#confirm-restore').addEventListener('click', () => {
    const record = state.pendingRestore;
    if (!record) return;
    const version = state.restoreVersions.find(item => item.id === state.selectedVersion);
    closeRestore();
    const label = version ? `${version.label}（${version.at}）` : '所选备份';
    showToast(`原型：已把 ${record.clientName} 恢复到 ${label}；当前文件已再次备份`);
    $('#feedback').hidden = false;
    $('#feedback-text').textContent = `已恢复到 ${label}；其他客户端未改动。`;
  });

  $('#settings-copy-endpoint').addEventListener('click', async () => {
    const ok = await copyText('http://127.0.0.1:46890/v1');
    showToast(ok ? '网关地址已复制' : '复制失败');
  });
  $('#settings-copy-key').addEventListener('click', async () => {
    const ok = await copyText('sk-ai-bobby-demo-f3a2');
    showToast(ok ? 'API Key 已复制' : '复制失败');
  });
  $('#settings-check-update').addEventListener('click', () => {
    showUpdate();
    showToast('已检查更新：发现 0.2.2');
  });
  $('#update-later').addEventListener('click', hideUpdate);
  $('#update-start').addEventListener('click', startUpdate);
  $('#auto-update').addEventListener('change', event => {
    showToast(event.target.checked ? '已开启自动检查更新' : '已关闭自动检查更新');
  });

  $('#open-import').addEventListener('click', openDrawer);
  $('#overview-refresh').addEventListener('click', () => {
    renderOverview();
    showToast('概览数据已刷新');
  });
  $('#close-import').addEventListener('click', closeDrawer);
  $('#cancel-import').addEventListener('click', closeDrawer);
  $('#scrim').addEventListener('click', closeDrawer);

  $('#client-list').addEventListener('change', event => {
    const checkbox = event.target.closest('input[type="checkbox"]');
    if (!checkbox) return;
    const row = checkbox.closest('[data-client]');
    if (!row) return;
    state.clients.set(row.dataset.client, checkbox.checked);
    row.classList.toggle('checked', checkbox.checked);
    updateCounts();
    renderDiff();
  });

  $('#group-chips').addEventListener('change', event => {
    const checkbox = event.target.closest('input[data-group]');
    if (!checkbox) return;
    state.groups.set(checkbox.dataset.group, checkbox.checked);
    checkbox.closest('.group-chip').classList.toggle('checked', checkbox.checked);
    renderImportDrawer();
    updateCounts();
  });

  $('#default-model').addEventListener('change', event => {
    state.defaultModel = event.target.value;
    renderDiff();
  });

  $('#set-default').addEventListener('change', () => {
    showToast($('#set-default').checked ? '将同时设为目标客户端的默认模型' : '只写入 provider，不改默认模型');
  });

  $('#apply-import').addEventListener('click', () => {
    const checkedClients = [...state.clients.values()].filter(Boolean).length;
    const total = totalSelected();
    if (checkedClients === 0) {
      showToast('请至少选择一个客户端');
      return;
    }
    if (total === 0) {
      showToast('请至少勾选一个模型');
      return;
    }
    showToast(`原型演示：将备份后写入 ${checkedClients} 个客户端；真实版本会先展示 diff`);
    $('#feedback').hidden = false;
    $('#feedback-text').textContent = `已写入 ${checkedClients} 个客户端；重启对应客户端后生效。`;
    closeDrawer();
  });

  $('#add-account').addEventListener('click', openLogin);
  $('#close-login').addEventListener('click', closeLogin);
  $('#cancel-login').addEventListener('click', closeLogin);
  $('#mock-login').addEventListener('click', addDemoAccount);
  $('#login-modal').addEventListener('click', event => {
    if (event.target === $('#login-modal')) closeLogin();
  });

  for (const button of $$('[data-theme-choice]')) {
    button.addEventListener('click', () => applyTheme(button.dataset.themeChoice));
  }

  $('#toggle-sidebar').addEventListener('click', () => {
    applySidebar(!$('#app-shell').classList.contains('sidebar-collapsed'));
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (!$('#floating-player').hidden) closeMusic();
    else if (!$('#diff-modal').hidden) closeDiff();
    else if (!$('#login-modal').hidden) closeLogin();
    else if (!$('#drawer').hidden) closeDrawer();
  });

  // Initial theme: dark, matching the reference screenshot. Restore a saved choice if present.
  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('ai-bobby-theme') || 'dark'; } catch {}
  const params = new URLSearchParams(location.search);
  applyTheme(params.get('theme') || savedTheme);

  const initialTab = params.get('tab');
  const initialPage = params.get('page') || (initialTab && SOURCES[initialTab] ? initialTab : 'opencode');
  navigateTo(initialPage);
  initZeoFab();
  initMusicPlayer();

  // Deep links for design review screenshots.
  if (params.get('update') === '1') showUpdate();
  if (params.get('drawer') === '1') openDrawer();
  if (params.get('login') === '1') openLogin();

  // Sidebar starts expanded; a collapsed rail is persisted per user.
  let savedSidebar = '0';
  try { savedSidebar = localStorage.getItem('ai-bobby-sidebar') || '0'; } catch {}
  applySidebar(savedSidebar === '1');
})();
