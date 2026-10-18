import { useEffect, useRef } from 'react'
import { BrandMark } from '@/components/brand-mark'

interface FloatingAvatarProps {
  onOpenAbout: () => void
}

export function FloatingAvatar({ onOpenAbout }: FloatingAvatarProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const drag = useRef({ active: false, moved: false, x: 0, y: 0, left: 0, top: 0, suppressClick: false })
  const openAbout = useRef(onOpenAbout)

  useEffect(() => {
    openAbout.current = onOpenAbout
  }, [onOpenAbout])

  useEffect(() => {
    const button = ref.current
    if (!button) return
    try {
      const saved = JSON.parse(localStorage.getItem('ai-bobby-avatar-pos') || 'null') as { left?: number; top?: number } | null
      if (saved && Number.isFinite(saved.left) && Number.isFinite(saved.top)) {
        button.style.left = `${saved.left}px`
        button.style.top = `${saved.top}px`
        button.style.right = 'auto'
        button.style.bottom = 'auto'
      }
    } catch {
      // ignore
    }

    const clamp = () => {
      const rect = button.getBoundingClientRect()
      const left = Math.min(Math.max(parseFloat(button.style.left || String(rect.left)), 4), Math.max(4, window.innerWidth - rect.width - 4))
      const top = Math.min(Math.max(parseFloat(button.style.top || String(rect.top)), 4), Math.max(4, window.innerHeight - rect.height - 4))
      button.style.left = `${left}px`
      button.style.top = `${top}px`
      button.style.right = 'auto'
      button.style.bottom = 'auto'
      try {
        localStorage.setItem('ai-bobby-avatar-pos', JSON.stringify({ left, top }))
      } catch {
        // ignore
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      const rect = button.getBoundingClientRect()
      drag.current = { active: true, moved: false, x: event.clientX, y: event.clientY, left: rect.left, top: rect.top, suppressClick: false }
      button.setPointerCapture(event.pointerId)
      event.preventDefault()
    }
    const onPointerMove = (event: PointerEvent) => {
      if (!drag.current.active) return
      const dx = event.clientX - drag.current.x
      const dy = event.clientY - drag.current.y
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.current.moved = true
      if (!drag.current.moved) return
      button.style.left = `${drag.current.left + dx}px`
      button.style.top = `${drag.current.top + dy}px`
      button.style.right = 'auto'
      button.style.bottom = 'auto'
    }
    const onPointerUp = (event: PointerEvent) => {
      if (!drag.current.active) return
      drag.current.active = false
      try { button.releasePointerCapture(event.pointerId) } catch { /* ignore */ }
      if (drag.current.moved) {
        drag.current.suppressClick = true
        clamp()
        window.setTimeout(() => { drag.current.suppressClick = false }, 0)
      }
    }
    const onClick = (event: MouseEvent) => {
      if (drag.current.suppressClick) {
        event.preventDefault()
        return
      }
      openAbout.current()
    }
    const onResize = () => { if (button.style.left) clamp() }

    button.addEventListener('pointerdown', onPointerDown)
    button.addEventListener('pointermove', onPointerMove)
    button.addEventListener('pointerup', onPointerUp)
    button.addEventListener('click', onClick)
    window.addEventListener('resize', onResize)
    return () => {
      button.removeEventListener('pointerdown', onPointerDown)
      button.removeEventListener('pointermove', onPointerMove)
      button.removeEventListener('pointerup', onPointerUp)
      button.removeEventListener('click', onClick)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <button
      ref={ref}
      type="button"
      className="floating-avatar fixed bottom-[54px] right-[24px] z-[15] grid size-[62px] touch-none place-items-center rounded-2xl border-0 bg-transparent p-0"
      aria-label="关于"
      title="关于"
    >
      <span className="floating-avatar-halo" aria-hidden="true" />
      <BrandMark className="floating-avatar-logo relative z-10 size-[58px] rounded-[14px]" />
      <span className="absolute -bottom-0.5 -right-0.5 z-20 rounded border-2 border-surface bg-[#111] px-1.5 py-0.5 font-mono text-[8px] font-semibold leading-tight tracking-[0.08em] text-white">ZEO</span>
    </button>
  )
}
