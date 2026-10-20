import { useState } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'
import zeoAvatar from '@/assets/zeo-avatar.png'
import electroCover from '@/assets/music-electro-surge.jpg'
import zeoCover from '@/assets/music-zeo-album.jpg'
import alipay from '@/assets/sponsor-alipay.jpg'
import wechat from '@/assets/sponsor-wechat.jpg'
import sponsorQr from '@/assets/sponsor-qr.svg'
import { cn } from '@/lib/utils'
import { ALBUMS, HOT_TRACKS, LATEST_TRACKS, type MusicTrack } from '@/lib/music'
import { t } from '@/lib/i18n'

interface AboutPageProps {
  version: string
  onPlay: (track: MusicTrack) => void
  onOpenAlbum: (album: { id: string; name: string; href: string }) => void
  onOpenExternal: (url: string) => void
}

const COVERS = [electroCover, zeoCover] as const

export function AboutPage({ version, onPlay, onOpenAlbum, onOpenExternal }: AboutPageProps) {
  const [tab, setTab] = useState<'latest' | 'hot'>('latest')
  const tracks = tab === 'latest' ? LATEST_TRACKS : HOT_TRACKS

  return (
    <main className="min-h-0 flex-1 overflow-auto px-6 py-5">
      <section className="relative grid grid-cols-[152px_minmax(0,1fr)_154px] items-center gap-6 overflow-hidden rounded-xl border border-line-soft bg-[radial-gradient(520px_240px_at_8%_0%,var(--color-accent-soft),transparent_65%),linear-gradient(135deg,var(--color-surface-2),var(--color-surface))] px-6 py-6 max-lg:grid-cols-[132px_minmax(0,1fr)] max-lg:gap-4">
        <div className="relative size-[152px] justify-self-center max-lg:size-[132px]">
          <span className="absolute -inset-2.5 animate-[spin_16s_linear_infinite] rounded-full border border-primary/40 border-b-transparent border-r-transparent" aria-hidden="true" />
          <img src={zeoAvatar} alt="ZEO" className="relative z-10 size-full rounded-full border border-primary/50 object-cover shadow-[0_16px_40px_rgba(0,0,0,0.28)]" />
          <span className="absolute bottom-1.5 -right-2 z-20 rounded border-2 border-surface bg-primary px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-[0.08em] text-white">ZEO</span>
        </div>
        <div className="relative z-10 min-w-0">
          <div className="font-mono text-[9px] font-semibold tracking-[0.1em] text-faint">ABOUT THE MAKER</div>
          <h1 className="mt-1 text-[44px] font-light leading-none tracking-[0.04em] text-text">ZEO</h1>
          <p className="mt-2 text-[13px] font-semibold text-primary">{t("独立开发者")}<span className="px-1 font-normal text-faint">/</span>{t("独立音乐人")}<span className="px-1 font-normal text-faint">/</span>{t("AI 驭龙师")}</p>
          <p className="mt-3 text-[14px] font-medium leading-relaxed text-text">{t("“如果说 AI 是巨龙，我就是那个驭龙者。”")}</p>
          <p className="mt-1.5 max-w-[560px] text-[11px] leading-relaxed text-muted-foreground">{t("做 AI Bobby，是为了把散落的模型、账号和协议收进一个本机入口。少一点配置，多一点创造；驾驭 AI，创造美好生活。")}</p>
          <div className="mt-3 flex items-center gap-4">
            <button type="button" className="border-0 bg-transparent p-0 text-[10px] text-primary hover:underline" onClick={() => onOpenExternal('https://github.com/aispin/aispin')}>GitHub · aispin ↗</button>
            <button type="button" className="border-0 bg-transparent p-0 text-[10px] text-primary hover:underline" onClick={() => onOpenExternal('https://xsin.github.io/ai-bobby/')}>{t("AI Bobby 官网 ↗")}</button>
          </div>
        </div>
        <div className="relative z-10 flex h-full flex-col justify-center gap-3 border-l border-line-soft pl-4 max-lg:hidden">
          {[['PROJECT', 'AI Bobby'], ['VERSION', version], ['MODE', 'Local-first']].map(([label, value]) => (
            <div key={label}>
              <span className="block font-mono text-[8px] font-semibold tracking-[0.1em] text-faint">{label}</span>
              <strong className="mt-0.5 block text-[11px] font-semibold text-text">{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-[minmax(220px,0.9fr)_minmax(0,1.4fr)] gap-8 border-b border-line px-1 py-6 max-lg:grid-cols-1 max-lg:gap-3">
        <div>
          <div className="font-mono text-[9px] font-semibold tracking-[0.1em] text-faint">THE PROJECT</div>
          <h2 className="mt-1 text-[21px] font-medium leading-snug tracking-[-0.025em] text-text">{t("所有模型，一个本机端点。")}</h2>
        </div>
        <p className="text-[12px] leading-7 text-muted-foreground">{t("OpenCode、WorkBuddy 国内版、WorkBuddy AI 国际版、NVIDIA NIM，以及你已有的本地网关与官方 CLI；Chat Completions、Responses、Anthropic Messages；一个 127.0.0.1 端点，一把 Key。不限制来源数量，不托管你的账号。")}</p>
      </section>

      <section className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)] gap-8 border-b border-line px-1 py-6 max-lg:grid-cols-1 max-lg:gap-4">
        <div>
          <div className="font-mono text-[9px] font-semibold tracking-[0.1em] text-faint">SUPPORT MY MUSIC</div>
          <h2 className="mt-1 text-[27px] font-medium leading-tight tracking-[-0.035em] text-text">Support my music</h2>
          <p className="mt-2.5 max-w-[390px] text-[11px] leading-7 text-muted-foreground">{t("写代码之外，我也做音乐。最近两张专辑：《Electro Surge》关于速度、夜色和电子颗粒，《ZEO》更贴近卧室里的轻声与留白。点一首听听。")}</p>
          <p className="mt-1 max-w-[390px] text-[10px] leading-5 text-faint">{t("点击歌曲优先唤起网易云音乐 App；未安装或唤起失败时使用网页播放器。专辑暂不支持 App 深链，会在网页版打开。")}</p>
          <div className="mt-3.5 flex max-w-[390px] flex-col gap-1.5">
            {ALBUMS.map((album, index) => (
              <button
                key={album.id}
                type="button"
                onClick={() => onOpenAlbum(album)}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg border border-line-soft bg-surface p-2 text-left transition-colors hover:border-primary/30 hover:bg-accent-soft"
              >
                <img src={COVERS[index]} alt={`${album.name} 专辑封面`} className="size-[54px] shrink-0 rounded-md object-cover" />
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-mono text-[8px] font-semibold tracking-[0.08em] text-faint">{album.kind}</span>
                  <strong className="truncate text-[12px] font-semibold text-text">{album.name}</strong>
                  <small className="text-[9px] text-muted-foreground">{album.date} · {album.tracks} tracks</small>
                </span>
                <ArrowUpRight className="ml-auto size-3.5 shrink-0 text-primary" />
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-lg border border-line-soft bg-surface">
          <div className="flex items-center justify-between gap-3 border-b border-line-soft px-3.5 py-2.5">
            <div className="flex items-center gap-0.5 rounded-md border border-line-soft bg-surface-2 p-0.5" role="tablist" aria-label={t("歌曲列表")}>
              {[
                ['latest', '最新歌曲'],
                ['hot', '最热歌曲'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => setTab(id as 'latest' | 'hot')}
                  className={cn(
                    'h-6 rounded border border-transparent px-2 text-[10px] text-muted-foreground hover:bg-hover hover:text-text',
                    tab === id && 'border-primary/30 bg-accent-soft text-primary',
                  )}
                >
                  {t(label)}
                </button>
              ))}
            </div>
            <button type="button" className="border-0 bg-transparent p-0 text-[9px] text-primary hover:underline" onClick={() => onOpenExternal('https://music.163.com/#/artist?id=49232788')}>{t("全部作品 ↗")}</button>
          </div>
          <div role="tabpanel">
            {tracks.map((track, index) => (
              <button
                key={track.id}
                type="button"
                onClick={() => onPlay(track)}
                className="grid w-full grid-cols-[20px_18px_minmax(0,1fr)_auto] items-center gap-2 border-x-0 border-t-0 border-b border-solid border-line-soft px-3 py-1.5 text-left last:border-b-0 hover:bg-hover"
              >
                <span className="text-right font-mono text-[9px] text-faint">{String(index + 1).padStart(2, '0')}</span>
                <span className="grid size-[18px] place-items-center rounded-full bg-surface-2 text-muted-foreground transition-colors group-hover:bg-primary">
                  <Play className="size-2.5 fill-current" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[10px] font-medium text-text">{track.title}</span>
                  <span className="block text-[8px] text-faint">{track.album}</span>
                </span>
                <span className="font-mono text-[9px] text-faint">{track.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)] items-center gap-8 px-1 py-7 max-lg:grid-cols-1 max-lg:gap-4">
        <div>
          <div className="font-mono text-[9px] font-semibold tracking-[0.1em] text-faint">SUPPORT THE WORK</div>
          <h2 className="mt-1 text-[27px] font-medium leading-tight tracking-[-0.035em] text-text">{t("充点词元，")}<br />{t("收获更好的产品体验。")}</h2>
          <p className="mt-2.5 max-w-[390px] text-[11px] leading-7 text-muted-foreground">{t("如果 AI Bobby 帮你省下了配置时间，欢迎请我喝杯咖啡，或者给我的模型充点词元。你的支持会变成下一次迭代的燃料。")}</p>
          <span className="mt-3 block font-mono text-[10px] text-faint">— ZEO</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            [alipay, '支付宝'],
            [wechat, '微信'],
            [sponsorQr, '更多方式'],
          ].map(([src, label]) => (
            <figure key={label} className="m-0 min-w-0 rounded-lg border border-line-soft bg-surface p-2">
              <img src={src} alt={`${label}赞助收款码`} className="block aspect-square w-full rounded object-contain bg-white" />
              <figcaption className="flex flex-col gap-px px-0.5 pt-2">
                <strong className="text-[10px] font-semibold text-text">{t(label)}</strong>
                <span className="text-[9px] text-faint">{t("扫码支持")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="flex items-center justify-between gap-3 border-t border-line-soft px-1 pt-3 font-mono text-[9px] text-faint">
        <span>AI Bobby · built in public</span>
        <span>Made with stubbornness &amp; localhost.</span>
      </footer>
    </main>
  )
}
