import { useEffect, useRef, useState } from 'react'
import { registerSW } from 'virtual:pwa-register'
import { useI18n } from '@/i18n'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const INSTALL_DISMISS_KEY = 'ai-bobby-install-dismissed-at'
const WEEK_MS = 7 * 24 * 60 * 60 * 1000

export function PwaPrompts() {
  const { t } = useI18n()
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstall, setShowInstall] = useState(false)
  const [needRefresh, setNeedRefresh] = useState(false)
  const [offlineReady, setOfflineReady] = useState(false)
  const updateSW = useRef<(reload?: boolean) => Promise<void>>(async () => undefined)

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      event.preventDefault()
      const promptEvent = event as BeforeInstallPromptEvent
      setInstallEvent(promptEvent)
      let dismissedAt = 0
      try {
        dismissedAt = Number(localStorage.getItem(INSTALL_DISMISS_KEY) ?? 0)
      } catch {
        // ignore
      }
      if (Date.now() - dismissedAt > WEEK_MS) {
        window.setTimeout(() => setShowInstall(true), 6500)
      }
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall)
  }, [])

  useEffect(() => {
    updateSW.current = registerSW({
      immediate: true,
      onNeedRefresh() {
        setNeedRefresh(true)
      },
      onOfflineReady() {
        setOfflineReady(true)
      },
      onRegisteredSW(_url, registration) {
        if (!registration) return
        const timer = window.setInterval(() => void registration.update(), 60 * 60_000)
        const onVisible = () => {
          if (!document.hidden) void registration.update()
        }
        document.addEventListener('visibilitychange', onVisible)
        // The interval/visibility listener live for the page lifetime; no cleanup hook here.
        window.addEventListener('pagehide', () => {
          window.clearInterval(timer)
          document.removeEventListener('visibilitychange', onVisible)
        }, { once: true })
      },
    })
  }, [])

  const dismissInstall = () => {
    setShowInstall(false)
    try {
      localStorage.setItem(INSTALL_DISMISS_KEY, String(Date.now()))
    } catch {
      // ignore
    }
  }

  const install = async () => {
    if (!installEvent) return
    await installEvent.prompt()
    await installEvent.userChoice
    setShowInstall(false)
    setInstallEvent(null)
  }

  return (
    <>
      {showInstall && installEvent ? (
        <div className="toast toast-install show" role="status">
          <div className="toast-icon">↓</div>
          <div><strong>{t.toasts.installTitle}</strong><span>{t.toasts.installDesc}</span></div>
          <button type="button" className="toast-action" onClick={() => void install()}>{t.toasts.installAction}</button>
          <button type="button" className="toast-close" aria-label="Dismiss" onClick={dismissInstall}>×</button>
        </div>
      ) : null}

      {needRefresh ? (
        <div className="toast toast-update show" role="status">
          <span className="toast-pulse" />
          <div><strong>{t.toasts.updateTitle}</strong><span>{t.toasts.updateDesc}</span></div>
          <button type="button" className="toast-action" onClick={() => void updateSW.current(true)}>
            {t.toasts.updateAction}
          </button>
          <button type="button" className="toast-close" aria-label="Dismiss" onClick={() => setNeedRefresh(false)}>×</button>
        </div>
      ) : null}

      {offlineReady && !needRefresh ? (
        <div className="toast toast-install show" role="status">
          <div className="toast-icon">✓</div>
          <div><strong>{t.toasts.offlineTitle}</strong><span>{t.toasts.offlineDesc}</span></div>
          <button type="button" className="toast-close" aria-label="Dismiss" onClick={() => setOfflineReady(false)}>×</button>
        </div>
      ) : null}
    </>
  )
}
