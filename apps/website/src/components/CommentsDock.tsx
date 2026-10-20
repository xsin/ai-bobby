import { useEffect, useRef, useState } from 'react'
import { Gitalk } from '@aifire/gitalk-react'
import '@aifire/gitalk/style.css'
import { MessagesSquare, X } from 'lucide-react'
import { useI18n } from '@/i18n'

const GITALK_OPTIONS = {
  clientID: 'Iv23liM54pLB6TIqnqb6',
  owner: 'xsin',
  repo: 'ai-bobby',
  admin: ['aispin'],
  proxy: 'https://gitalk-proxy.aispin-abf.workers.dev',
  backend: 'discussions' as const,
  minimizable: false,
  perPage: 20,
}

/**
 * GitHub Discussions comments via Gitalk 2, parked bottom-right.
 * Collapsed by default; the panel is fixed bottom-right on desktop and
 * full-screen on mobile.
 */
export function CommentsDock() {
  const { locale } = useI18n()
  const zh = locale === 'zh'
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const fabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    setMounted(true)
    closeRef.current?.focus()
    document.body.classList.add('comments-open')
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('comments-open')
    }
  }, [open])

  return (
    <div className="comments-dock" data-theme="dark">
      {!open ? (
        <button
          ref={fabRef}
          type="button"
          className="comments-fab"
          aria-expanded={false}
          aria-controls="comments-panel"
          onClick={() => setOpen(true)}
        >
          <MessagesSquare aria-hidden="true" />
          <span>{zh ? '讨论' : 'Comments'}</span>
        </button>
      ) : null}

      <section
        id="comments-panel"
        className="comments-panel"
        role="dialog"
        aria-modal="true"
        aria-label={zh ? '讨论' : 'Comments'}
        hidden={!open}
      >
        <header className="comments-head">
          <div>
            <strong>{zh ? '讨论' : 'Comments'}</strong>
            <span>{zh ? '来自 GitHub Discussions' : 'Powered by GitHub Discussions'}</span>
          </div>
          <button ref={closeRef} type="button" className="comments-close" aria-label={zh ? '关闭讨论' : 'Close comments'} onClick={() => setOpen(false)}>
            <X aria-hidden="true" />
          </button>
        </header>
        <div className="comments-body">
          {mounted ? <Gitalk key={locale} options={{ ...GITALK_OPTIONS, number: zh ? 1 : 2 }} /> : null}
        </div>
      </section>
    </div>
  )
}
