import { useMemo } from 'react'
import { ExternalLink, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { DemoSource } from '@/lib/demo-data'

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  source: DemoSource
  onSuccess: () => void
}

const SIZE = 21

function isFinder(x: number, y: number): boolean {
  const origins = [
    [0, 0],
    [SIZE - 7, 0],
    [0, SIZE - 7],
  ]
  for (const [ox, oy] of origins) {
    if (x < ox || y < oy || x >= ox + 7 || y >= oy + 7) continue
    const lx = x - ox
    const ly = y - oy
    if (lx === 0 || lx === 6 || ly === 0 || ly === 6) return true
    if (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4) return true
    return false
  }
  return false
}

function QrMock() {
  const rects = useMemo(() => {
    const cells: Array<[number, number]> = []
    for (let y = 0; y < SIZE; y += 1) {
      for (let x = 0; x < SIZE; x += 1) {
        const finderZone = (x < 8 && y < 8) || (x > SIZE - 9 && y < 8) || (x < 8 && y > SIZE - 9)
        const dark = isFinder(x, y) || (!finderZone && (x * 7 + y * 13 + x * y) % 5 < 2)
        if (dark) cells.push([x, y])
      }
    }
    return cells
  }, [])

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} fill="var(--text)" shapeRendering="crispEdges" className="size-28">
      {rects.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
      ))}
    </svg>
  )
}

export function LoginDialog({ open, onOpenChange, source, onSuccess }: LoginDialogProps) {
  const qr = <QrMock />

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[430px] gap-0 border-line bg-surface p-0">
        <DialogHeader className="border-b border-line px-5 py-4 text-left">
          <DialogTitle className="text-[15px] font-semibold text-text">
            添加 {source.title}账号
          </DialogTitle>
          <DialogDescription className="text-[11px] text-muted-foreground">
            在官方登录页完成登录，AI Bobby 不接触密码。
          </DialogDescription>
        </DialogHeader>

        <div className="mx-5 my-4 flex flex-col items-center gap-2.5 rounded-lg border border-dashed border-line bg-surface-2 p-4">
          <div className="text-[17px] font-bold tracking-[-0.02em] text-text">
            {source.id === 'workbuddy' ? 'WorkBuddy' : 'WorkBuddy AI'}
          </div>
          <div className="rounded-md bg-white p-2">{qr}</div>
          <p className="text-[11px] text-muted-foreground">
            {source.id === 'workbuddy' ? '请使用微信 / QQ 扫码登录' : '请使用 Google / 微信登录'}
          </p>
          <span className="font-mono text-[10px] text-faint">
            {source.id === 'workbuddy' ? 'copilot.tencent.com/login' : 'www.workbuddy.ai/login'}
          </span>
        </div>

        <div className="mx-5 mb-3 flex items-start gap-2 text-[10px] leading-relaxed text-faint">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-success" />
          <span>
            真实版本会打开官方登录窗口并轮询回调；token 只保存在本机，日志不记录明文。
            当前为界面原型，可点“模拟登录成功”查看多账号效果。
          </span>
        </div>

        <DialogFooter className="flex-row items-center justify-between border-t border-line bg-toolbar px-5 py-3 sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-2 text-[11px] text-muted-foreground"
            onClick={() => toast.info('真实版本会打开系统浏览器；原型不发起登录')}
          >
            <ExternalLink className="size-3.5" />
            使用系统浏览器
          </Button>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 border-line bg-surface text-[11px]"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button
              type="button"
              size="sm"
              className="h-8 bg-primary text-[11px] text-primary-foreground"
              onClick={onSuccess}
            >
              模拟登录成功
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
