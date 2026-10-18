import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { MusicTrack } from '@/lib/music'

interface FloatingMusicPlayerProps {
  track: MusicTrack | null
  onClose: () => void
}

export function FloatingMusicPlayer({ track, onClose }: FloatingMusicPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ active: boolean; x: number; y: number; left: number; top: number }>({
    active: false,
    x: 0,
    y: 0,
    left: 0,
    top: 0,
  })

  useEffect(() => {
    const player = playerRef.current
    if (!player) return
    try {
      const saved = JSON.parse(localStorage.getItem('ai-bobby-player-pos') || 'null') as { left?: number; top?: number } | null
      if (saved && Number.isFinite(saved.left) && Number.isFinite(saved.top)) {
        player.style.left = `${saved.left}px`
        player.style.top = `${saved.top}px`
        player.style.right = 'auto'
        player.style.bottom = 'auto'
      }
    } catch {
      // ignore
    }
  }, [track])

  useEffect(() => {
    const handle = handleRef.current
    if (!handle) return
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || (event.target as HTMLElement).closest('button')) return
      const player = playerRef.current
      if (!player) return
      const rect = player.getBoundingClientRect()
      drag.current = { active: true, x: event.clientX, y: event.clientY, left: rect.left, top: rect.top }
      handle.setPointerCapture(event.pointerId)
      event.preventDefault()
    }
    const onPointerMove = (event: PointerEvent) => {
      const player = playerRef.current
      if (!player || !drag.current.active) return
      player.style.left = `${drag.current.left + event.clientX - drag.current.x}px`
      player.style.top = `${drag.current.top + event.clientY - drag.current.y}px`
      player.style.right = 'auto'
      player.style.bottom = 'auto'
    }
    const clamp = () => {
      const player = playerRef.current
      if (!player) return
      const rect = player.getBoundingClientRect()
      const left = Math.min(Math.max(parseFloat(player.style.left || String(rect.left)), 4), Math.max(4, window.innerWidth - rect.width - 4))
      const top = Math.min(Math.max(parseFloat(player.style.top || String(rect.top)), 4), Math.max(4, window.innerHeight - rect.height - 4))
      player.style.left = `${left}px`
      player.style.top = `${top}px`
      player.style.right = 'auto'
      player.style.bottom = 'auto'
      try {
        localStorage.setItem('ai-bobby-player-pos', JSON.stringify({ left, top }))
      } catch {
        // ignore
      }
    }
    const onPointerUp = (event: PointerEvent) => {
      if (!drag.current.active) return
      drag.current.active = false
      try { handle.releasePointerCapture(event.pointerId) } catch { /* ignore */ }
      clamp()
    }
    const onResize = () => { if (playerRef.current?.style.left) clamp() }
    handle.addEventListener('pointerdown', onPointerDown)
    handle.addEventListener('pointermove', onPointerMove)
    handle.addEventListener('pointerup', onPointerUp)
    window.addEventListener('resize', onResize)
    return () => {
      handle.removeEventListener('pointerdown', onPointerDown)
      handle.removeEventListener('pointermove', onPointerMove)
      handle.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('resize', onResize)
    }
  }, [track])

  if (!track) return null
  const src = `https://music.163.com/outchain/player?type=2&id=${encodeURIComponent(track.id)}&auto=1&height=66`

  return (
    <div
      ref={playerRef}
      className="fixed bottom-[54px] right-[104px] z-[16] w-[340px] max-w-[calc(100vw-28px)] rounded-[10px] border border-line bg-surface p-1 shadow-[0_18px_46px_rgba(0,0,0,0.36),0_2px_8px_rgba(0,0,0,0.22)] max-md:bottom-[126px] max-md:right-3.5"
      role="region"
      aria-label={`音乐播放器：${track.title}`}
    >
      <div ref={handleRef} className="flex h-[19px] cursor-grab touch-none select-none items-center gap-1.5 px-1.5 pb-0.5 text-faint active:cursor-grabbing">
        <span className="font-mono text-[9px] leading-none tracking-[-0.12em]" aria-hidden="true">⋮⋮</span>
        <span className="font-mono text-[8px] leading-none tracking-[0.10em]">MUSIC</span>
        <button
          type="button"
          className="ml-auto grid size-[18px] place-items-center rounded border-0 bg-transparent p-0 text-[14px] leading-none text-faint hover:bg-hover hover:text-text"
          aria-label="关闭播放器"
          onClick={onClose}
        >
          <X className="size-3" />
        </button>
      </div>
      <iframe
        key={track.id}
        title={`网易云音乐：${track.title}`}
        src={src}
        width={330}
        height={86}
        frameBorder={0}
        allow="autoplay"
        className="block h-[86px] w-[330px] max-w-full rounded-md border-0 bg-white"
      />
    </div>
  )
}
