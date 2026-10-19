export type Locale = 'zh' | 'en'

let runtimeLocale: Locale = 'zh'

const en: Record<string, string> = {
  "设置": "Settings",
  "外观": "Appearance",
  "主题只影响本机控制面板，不影响网关行为。": "Theme affects this app only, not the gateway.",
  "系统": "System",
  "浅色": "Light",
  "深色": "Dark",
  "界面语言": "Language",
  "默认跟随系统；切换后立即生效，只影响本机界面。": "Follows the system by default. Changes apply immediately and only affect this app.",
  "跟随系统": "System",
  "网络代理": "Proxy",
  "只影响 AI Bobby 发起的上游请求，按模型源分别启用。": "Only applies to AI Bobby upstream requests, per source.",
  "关闭": "Off",
  "自定义": "Custom",
  "免费试用 Key 只保存在本机；检测会真实发起一次最小对话。": "The trial key stays on this machine; probing sends one minimal chat request.",
  "未配置": "Not set",
  "更新 Key": "Update key",
  "本地网关": "Local gateway",
  "只监听回环地址，浏览器请求默认拒绝。": "Loopback only; browser requests are rejected by default.",
  "复制": "Copy",
  "客户端使用同一把 Key；不会写入日志。": "All clients share one key; it is never logged.",
  "版本与更新": "Version & updates",
  "新版本先提示，不静默替换。": "Updates prompt first; nothing installs silently.",
  "自动检查": "Auto check",
  "检查中…": "Checking…",
  "检查更新": "Check for updates",
  "关于": "About",
  "AI Bobby 是本地优先的 AI 服务网关。": "AI Bobby is a local-first AI gateway.",
  "更新源": "Update source",
  "更新中…": "Updating…",
  "更新源地址": "Update source",
  "总览": "Overview",
  "模型来源": "Sources",
  "其他": "Other",
  "概览": "Overview",
  "历史记录": "History",
  "运行中": "Running",
  "未就绪": "Not ready",
  "导入": "Import",
  "模型清单": "Models",
  "勾选决定导入，点击行查看详情。": "Select to import; click a row for details.",
  "全选可用": "Select all",
  "已选": "Selected",
  "已发现": "Found",
  "可用": "Available",
  "待检测": "Pending",
  "偏好": "Preferences",
  "背景": "Background",
  "免费试用": "Free trial",
  "访问凭据": "Credentials",
  "获取 Key ↗": "Get key ↗",
  "更新": "Update",
}

export function resolveLocale(choice: 'system' | Locale): Locale {
  if (choice === 'zh' || choice === 'en') return choice
  const language = typeof navigator === 'undefined' ? 'zh' : navigator.language
  return language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function setRuntimeLocale(locale: Locale): void {
  runtimeLocale = locale
}

export function currentLocale(): Locale {
  return runtimeLocale
}

export function t(text: string, params?: Record<string, string | number>): string {
  const template = runtimeLocale === 'en' ? en[text] ?? text : text
  if (params === undefined) return template
  return template.replace(/\{(\w+)\}/g, (match, key: string) => String(params[key] ?? match))
}
