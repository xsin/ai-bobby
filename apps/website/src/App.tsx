import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, Check, Copy, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ErrorBoundary } from '@/components/ErrorBoundary'
const HeroCanvas = lazy(() => import('@/components/HeroCanvas').then(module => ({ default: module.HeroCanvas })))
import { Logo } from '@/components/Logo'
import { PwaPrompts } from '@/components/PwaPrompts'
import { CommentsDock } from '@/components/CommentsDock'
import { useI18n } from '@/i18n'

const INSTALL_COMMAND =
  'curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh | bash'

type ProtocolId = 'chat' | 'responses' | 'messages'

const protocolPath: Record<ProtocolId, string> = {
  chat: '/v1/chat/completions',
  responses: '/v1/responses',
  messages: '/v1/messages',
}

const clientNames = ['WorkBuddy', 'Codex', 'Claude Code', 'DeepSeek Harness', 'OpenCode']

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function highlightCode(code: string): string {
  let html = escapeHtml(code)
  html = html.replace(/(&quot;.*?&quot;|".*?")/g, '<span class="tok-str">$1</span>')
  html = html.replace(
    /\b(curl|http|https|Authorization|Bearer|Content-Type|application\/json)\b/g,
    '<span class="tok-key">$1</span>',
  )
  html = html.replace(/\b(true|false|null)\b/g, '<span class="tok-num">$1</span>')
  html = html.replace(/(#.*)$/gm, '<span class="tok-com">$1</span>')
  return html
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLElement | null>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting) return
        const start = performance.now()
        const duration = 900
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(Math.round(value * eased))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.6 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [value])

  return <strong ref={ref}>{display}</strong>
}

function CopyButton({
  onCopy,
  copied,
  label,
  copiedLabel,
  className = '',
}: {
  onCopy: () => void
  copied: boolean
  label: string
  copiedLabel: string
  className?: string
}) {
  return (
    <button type="button" className={`install-button ${copied ? 'copied' : ''} ${className}`} onClick={onCopy} aria-label={label}>
      <span className="install-prompt">$</span>
      <code>curl -fsSL https://xsin.github.io/ai-bobby/...</code>
      <span className="copy-icon" aria-hidden="true">
        {copied ? <Check /> : <Copy />}
      </span>
      <span className="copy-done">{copiedLabel}</span>
    </button>
  )
}

function Nav({
  scrolled,
  onToggleLanguage,
  languageLabel,
  languageAria,
}: {
  scrolled: boolean
  onToggleLanguage: () => void
  languageLabel: string
  languageAria: string
}) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`} id="nav">
      <a className="brand" href="#top" aria-label="AI Bobby home">
        <span className="brand-mark">
          <Logo />
        </span>
        <span>AI Bobby</span>
      </a>
      <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
        <a href="#sources" onClick={() => setOpen(false)}>{t.nav.sources}</a>
        <a href="#protocols" onClick={() => setOpen(false)}>{t.nav.protocols}</a>
        <a href="#clients" onClick={() => setOpen(false)}>{t.nav.import}</a>
        <a href="#security" onClick={() => setOpen(false)}>{t.nav.localFirst}</a>
      </nav>
      <div className="nav-actions">
        <a className="nav-github" href="https://github.com/xsin/ai-bobby" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 .6a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.2.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.2-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.3 3 .1 3.3.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.4 11.4 0 0 0 12 .6Z"
              fill="currentColor"
            />
          </svg>
          <span>{t.nav.github}</span>
        </a>
        <button type="button" className="lang-button" onClick={onToggleLanguage} aria-label={languageAria}>
          {languageLabel}
        </button>
        <Button className="nav-install" onClick={() => document.getElementById('install')?.scrollIntoView({ behavior: 'smooth' })}>
          {t.nav.install}
        </Button>
      </div>
      <button
        type="button"
        className="menu-button"
        aria-label={t.nav.menu}
        aria-expanded={open}
        onClick={() => setOpen(value => !value)}
      >
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>
    </header>
  )
}

function Hero({ onCopy, copied }: { onCopy: () => void; copied: boolean }) {
  const { t } = useI18n()
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <Suspense fallback={<div className="hero-fallback" />}>
          <ErrorBoundary fallback={<div className="hero-fallback" />}>
            <HeroCanvas />
          </ErrorBoundary>
        </Suspense>
        <div className="hero-vignette" />
        <div className="hero-grid" />
      </div>

      <div className="hero-copy">
        <div className="eyebrow" data-reveal>
          <span className="pulse-dot" />
          <span>{t.hero.eyebrow}</span>
          <span className="eyebrow-version">{t.hero.meta[1]}</span>
        </div>
        <h1 data-reveal>
          <span className="h1-line">{t.hero.title1}</span>
          <span className="h1-line h1-gradient">{t.hero.title2}</span>
        </h1>
        <p className="hero-lead" data-reveal>{t.hero.lead}</p>
        <div className="hero-actions" data-reveal>
          <CopyButton onCopy={onCopy} copied={copied} label={t.hero.installAria} copiedLabel={t.hero.copied} />
          <a className="ghost-button" href="#protocols">
            {t.hero.seeFlow}
            <ArrowRight />
          </a>
        </div>
        <div className="hero-meta" data-reveal>
          <span><i className="status-dot" /> {t.hero.meta[0]}</span>
          <span>{t.hero.meta[1]}</span>
          <span>{t.hero.meta[2]}</span>
        </div>
      </div>

      <div className="hero-visual" data-reveal aria-label="Three model sources converging into one local endpoint">
        <div className="orbit-stage">
          <svg className="orbit-lines" viewBox="0 0 620 620" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#1e4fff" stopOpacity="0" />
                <stop offset=".5" stopColor="#5d8bff" stopOpacity=".7" />
                <stop offset="1" stopColor="#8ff7ff" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="coreGlow">
                <stop offset="0" stopColor="#8ff7ff" stopOpacity=".45" />
                <stop offset=".45" stopColor="#1e4fff" stopOpacity=".18" />
                <stop offset="1" stopColor="#1e4fff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="310" cy="310" r="238" stroke="#1e4fff" strokeOpacity=".09" />
            <circle cx="310" cy="310" r="176" stroke="#1e4fff" strokeOpacity=".13" strokeDasharray="2 8" />
            <circle cx="310" cy="310" r="112" stroke="#8ff7ff" strokeOpacity=".12" strokeDasharray="1 7" />
            <circle cx="310" cy="310" r="82" fill="url(#coreGlow)" />
            <path d="M88 180C190 112 270 160 310 310" stroke="url(#lineGradient)" strokeWidth="1.4" />
            <path d="M532 180C430 112 350 160 310 310" stroke="url(#lineGradient)" strokeWidth="1.4" />
            <path d="M310 560C310 450 310 390 310 310" stroke="url(#lineGradient)" strokeWidth="1.4" />
            <path d="M150 430C230 400 270 360 310 310" stroke="url(#lineGradient)" strokeWidth="1" />
            <path d="M470 430C390 400 350 360 310 310" stroke="url(#lineGradient)" strokeWidth="1" />
          </svg>
          <div className="orbit-core">
            <span className="core-ring" />
            <span className="core-ring core-ring-2" />
            <span className="core-label">AB</span>
          </div>
          <div className="orbit-node node-opencode">
            <span className="node-icon">OC</span>
            <span><span className="node-name">OpenCode</span><span className="node-sub">{t.hero.orbit.opencode}</span></span>
          </div>
          <div className="orbit-node node-workbuddy">
            <span className="node-icon">WB</span>
            <span><span className="node-name">WorkBuddy</span><span className="node-sub">{t.hero.orbit.workbuddy}</span></span>
          </div>
          <div className="orbit-node node-wbi">
            <span className="node-icon">WI</span>
            <span><span className="node-name">WorkBuddy AI</span><span className="node-sub">{t.hero.orbit.wbi}</span></span>
          </div>
          <div className="orbit-chip chip-chat">Chat</div>
          <div className="orbit-chip chip-responses">Responses</div>
          <div className="orbit-chip chip-messages">Messages</div>
        </div>

        <div className="terminal-card">
          <div className="terminal-bar">
            <span className="terminal-dots"><i /><i /><i /></span>
            <span>{t.hero.terminalTitle}</span>
            <span className="terminal-live"><i />{t.hero.terminalLive}</span>
          </div>
          <div className="terminal-body">
            <div className="term-line"><span className="term-prompt">$</span><span>{t.hero.terminalHealth}</span></div>
            <div className="term-out">{t.hero.terminalStatus}</div>
            <div className="term-line"><span className="term-prompt">$</span><span>{t.hero.terminalModels}</span></div>
            <div className="term-out term-models">
              <span>oc/space-bunny-free</span><span>wb/hy3</span><span>wbi/glm-5.3</span>
              <span className="term-more">{t.hero.terminalMore}</span>
            </div>
            <div className="term-cursor"><span /></div>
          </div>
          <div className="terminal-foot"><span>127.0.0.1:46890</span><span>{t.hero.terminalFoot}</span></div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true"><span>{t.hero.scroll}</span><i /></div>
    </section>
  )
}

function Sources() {
  const { t } = useI18n()
  return (
    <section className="section sources" id="sources">
      <div className="section-head">
        <div>
          <p className="kicker" data-reveal>{t.sources.kicker}</p>
          <h2 data-reveal>{t.sources.title1}<br /><span className="text-dim">{t.sources.title2}</span></h2>
        </div>
        <p className="section-aside" data-reveal>{t.sources.aside}</p>
      </div>
      <div className="source-grid">
        {t.sources.cards.map((card, index) => (
          <article className="source-card" data-reveal key={card.title}>
            <div className="source-top">
              <span className="source-tag">{card.tag}</span>
              <span className="source-status"><i /> {card.status}</span>
            </div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <div className="source-stat">
              {card.stat === '∞' ? <strong>∞</strong> : <Counter value={Number(card.stat)} />}
              <span>{card.statLabel}</span>
            </div>
            <div className="source-line"><span style={{ width: index === 0 ? '92%' : index === 1 ? '74%' : '58%' }} /></div>
            <code>{card.prefix}</code>
          </article>
        ))}
      </div>
    </section>
  )
}

function Protocols() {
  const { t } = useI18n()
  const [active, setActive] = useState<ProtocolId>('chat')

  return (
    <section className="section protocols" id="protocols">
      <div className="section-head">
        <div>
          <p className="kicker" data-reveal>{t.protocols.kicker}</p>
          <h2 data-reveal>{t.protocols.title1}<br /><span className="text-dim">{t.protocols.title2}</span></h2>
        </div>
        <p className="section-aside" data-reveal>{t.protocols.aside}</p>
      </div>
      <div className="protocol-shell" data-reveal>
        <div className="protocol-tabs" role="tablist" aria-label="Protocol examples">
          {t.protocols.tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              className={`protocol-tab ${active === tab.id ? 'active' : ''}`}
              onClick={() => setActive(tab.id as ProtocolId)}
            >
              {tab.label}
            </button>
          ))}
          <span className="protocol-client">{t.protocols.clients[active]}</span>
        </div>
        <div className="protocol-body">
          <div className="protocol-code">
            <div className="code-head"><span>POST <b>{protocolPath[active]}</b></span><span className="code-lang">bash</span></div>
            <pre dangerouslySetInnerHTML={{ __html: highlightCode(t.protocols.code[active]) }} />
          </div>
          <div className="protocol-side">
            <div className="protocol-stat"><span>{t.protocols.endpoint}</span><code>127.0.0.1:46890/v1</code></div>
            <div className="protocol-stat"><span>{t.protocols.auth}</span><code>Authorization: Bearer sk-…</code></div>
            <div className="protocol-stat"><span>{t.protocols.streaming}</span><strong>{t.protocols.streamingValue}</strong></div>
            <div className="protocol-pills">{t.protocols.pills.map(pill => <span key={pill}>{pill}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ImportSection() {
  const { t } = useI18n()
  return (
    <section className="section clients" id="clients">
      <div className="section-head">
        <div>
          <p className="kicker" data-reveal>{t.import.kicker}</p>
          <h2 data-reveal>{t.import.title1}<br /><span className="text-dim">{t.import.title2}</span></h2>
        </div>
        <p className="section-aside" data-reveal>{t.import.aside}</p>
      </div>
      <div className="marquee" data-reveal>
        <div className="marquee-track">
          {[...clientNames, ...clientNames].map((client, index) => (
            <span className="client-pill" key={`${client}-${index}`}><b>{client.slice(0, 2).toUpperCase()}</b> {client}</span>
          ))}
        </div>
      </div>
      <div className="import-grid">
        <div className="import-copy" data-reveal>
          <h3>{t.import.writeTitle1}<br />{t.import.writeTitle2}</h3>
          <p>{t.import.writeDesc}</p>
          <a className="text-link" href="https://github.com/xsin/ai-bobby#导入目标" target="_blank" rel="noreferrer">{t.import.link} <span>↗</span></a>
        </div>
        <div className="import-diff" data-reveal>
          <div className="diff-head"><span>{t.import.diffFile}</span><span>{t.import.dryRun}</span></div>
          <pre><span className="diff-add">+ # &gt;&gt;&gt; ai-bobby:start</span>{'\n'}<span className="diff-add">+ [model_providers.ai-bobby]</span>{'\n'}<span className="diff-add">+ base_url = "http://127.0.0.1:46890/v1"</span>{'\n'}<span className="diff-add">+ wire_api = "responses"</span>{'\n'}<span className="diff-add">+ # &lt;&lt;&lt; ai-bobby:end</span>{'\n'}<span className="diff-dim">  model = "gpt-5"</span>{'\n'}<span className="diff-dim">  [model_providers.other]</span></pre>
          <div className="diff-foot"><span><i /> {t.import.backup}</span><span>{t.import.lines}</span></div>
        </div>
      </div>
    </section>
  )
}

function Security() {
  const { t } = useI18n()
  return (
    <section className="section security" id="security">
      <div className="section-head">
        <div>
          <p className="kicker" data-reveal>{t.security.kicker}</p>
          <h2 data-reveal>{t.security.title1}<br /><span className="text-dim">{t.security.title2}</span></h2>
        </div>
        <p className="section-aside" data-reveal>{t.security.aside}</p>
      </div>
      <div className="security-grid">
        {t.security.cards.map(card => (
          <article data-reveal key={card.title}>
            <span className="security-icon">{card.icon}</span>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Cta({ onCopy, copied }: { onCopy: () => void; copied: boolean }) {
  const { t } = useI18n()
  return (
    <section className="cta" id="install">
      <div className="cta-glow" aria-hidden="true" />
      <p className="kicker" data-reveal>{t.cta.kicker}</p>
      <h2 data-reveal>{t.cta.title1}<br /><span className="h1-gradient">{t.cta.title2}</span></h2>
      <p data-reveal>{t.cta.desc}</p>
      <CopyButton onCopy={onCopy} copied={copied} label={t.hero.installAria} copiedLabel={t.hero.copied} className="cta-install" />
      <div className="cta-links" data-reveal>
        <a href="https://github.com/xsin/ai-bobby" target="_blank" rel="noreferrer">{t.cta.github}</a>
        <span>·</span>
        <a href="https://github.com/xsin/ai-bobby/releases" target="_blank" rel="noreferrer">{t.cta.releases}</a>
      </div>
    </section>
  )
}

function Footer() {
  const { t } = useI18n()
  return (
    <footer className="footer">
      <div className="footer-brand"><span className="brand-mark small"><Logo /></span><span>AI Bobby</span></div>
      <p>{t.footer.tagline}</p>
      <div className="footer-links">
        <a href="https://github.com/xsin/ai-bobby" target="_blank" rel="noreferrer">{t.footer.github}</a>
        <a href="https://github.com/xsin/ai-bobby#readme" target="_blank" rel="noreferrer">{t.footer.docs}</a>
        <a href="https://github.com/xsin/ai-bobby/releases" target="_blank" rel="noreferrer">{t.footer.releases}</a>
      </div>
      <span className="footer-note">{t.footer.note}</span>
    </footer>
  )
}

export default function App() {
  const { t, toggleLocale, locale } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [commandToast, setCommandToast] = useState<string | null>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    )
    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const glow = cursorRef.current
    if (!glow || !window.matchMedia('(pointer: fine)').matches) return
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let targetX = x
    let targetY = y
    let frame = 0
    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
    }
    const tick = () => {
      x += (targetX - x) * 0.1
      y += (targetY - y) * 0.1
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frame = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  const showToast = useCallback((message: string) => {
    setCommandToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setCommandToast(null), 1900)
  }, [])

  const copyInstall = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND)
    } catch {
      const area = document.createElement('textarea')
      area.value = INSTALL_COMMAND
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
    }
    setCopied(true)
    showToast(t.toasts.copied)
    window.setTimeout(() => setCopied(false), 1500)
  }, [showToast, t.toasts.copied])

  return (
    <div className="site">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <div className="cursor-glow" ref={cursorRef} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Nav
        scrolled={scrolled}
        onToggleLanguage={toggleLocale}
        languageLabel={t.nav.language}
        languageAria={t.nav.languageAria}
      />
      <main>
        <Hero onCopy={() => void copyInstall()} copied={copied} />
        <Sources />
        <Protocols />
        <ImportSection />
        <Security />
        <Cta onCopy={() => void copyInstall()} copied={copied} />
      </main>
      <Footer />
      <PwaPrompts />
      <CommentsDock />
      {commandToast ? <div className="command-toast show">{commandToast}</div> : null}
      <span className="sr-only" aria-live="polite">{locale === 'zh' ? '语言已切换为中文' : 'Language switched to English'}</span>
    </div>
  )
}

// Kept for callers that want to wrap custom section content later.
export function Section({ children }: { children: ReactNode }) {
  return <section className="section">{children}</section>
}
