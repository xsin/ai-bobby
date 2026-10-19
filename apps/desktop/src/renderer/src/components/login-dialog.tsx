import { Loader2, QrCode, ShieldCheck } from 'lucide-react'
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
  busy: boolean
  error?: string
  onStart: () => void
}

const LOGIN_HOST: Record<string, { host: string; scan: string }> = {
  workbuddy: { host: 'copilot.tencent.com/login', scan: '微信 / QQ 扫码' },
  wbi: { host: 'www.workbuddy.ai/login', scan: 'Google / 微信扫码' },
}

export function LoginDialog({ open, onOpenChange, source, busy, error, onStart }: LoginDialogProps) {
  const real = Boolean(window.aiBobby)
  const host = LOGIN_HOST[source.id] ?? LOGIN_HOST.workbuddy!

  return (
    <Dialog open={open} onOpenChange={next => { if (!busy) onOpenChange(next) }}>
      <DialogContent className="max-w-[430px] gap-0 border-line bg-surface p-0">
        <DialogHeader className="border-b border-line px-5 py-4 text-left">
          <DialogTitle className="text-[15px] font-semibold text-text">
            添加 {source.title}账号
          </DialogTitle>
          <DialogDescription className="text-[11px] text-muted-foreground">
            在官方登录窗口扫码完成登录；AI Bobby 不接触密码。
          </DialogDescription>
        </DialogHeader>

        <div className="mx-5 my-4 rounded-lg border border-line-soft bg-surface-2 p-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-md bg-accent-soft text-primary">
              <QrCode className="size-5" />
            </span>
            <div>
              <div className="text-[12px] font-semibold text-text">在官方登录窗口扫码</div>
              <div className="font-mono text-[10px] text-faint">{host.host}</div>
            </div>
          </div>
          <ol className="mt-3 space-y-1.5 pl-4 text-[11px] leading-relaxed text-muted-foreground">
            <li className="list-decimal">点击「打开官方登录页」，会弹出一个官方登录窗口。</li>
            <li className="list-decimal">用{host.scan}完成登录，二维码由官方页面实时生成。</li>
            <li className="list-decimal">登录成功后窗口自动关闭，账号自动入库并刷新目录与额度。</li>
          </ol>
          {error ? (
            <p className="mt-3 rounded-md border border-danger/30 bg-danger-soft px-2.5 py-2 text-[10px] text-danger">{error}</p>
          ) : null}
        </div>

        <div className="mx-5 mb-3 flex items-start gap-2 text-[10px] leading-relaxed text-faint">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-success" />
          <span>
            {real
              ? '官方窗口只在本机打开；token 保存在本机账号库（0600），日志不记录明文。扫码后无需在 AI Bobby 里再输入密码。'
              : '当前为浏览器预览：点「模拟登录成功」可查看多账号效果；真实版本会打开官方登录窗口并轮询回调。'}
          </span>
        </div>

        <DialogFooter className="flex-row items-center justify-between border-t border-line bg-toolbar px-5 py-3 sm:justify-between">
          <span className="text-[10px] text-faint">
            {busy ? '等待扫码，最长 10 分钟…' : real ? '需要已登录的手机 App 扫码' : '浏览器预览模式'}
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              
              disabled={busy}
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button
              type="button"
              size="sm"
              className="gap-1.5 bg-primary text-primary-foreground"
              disabled={busy}
              onClick={onStart}
            >
              {busy ? <Loader2 className="size-3.5 animate-spin" /> : null}
              {busy ? '等待扫码…' : real ? '打开官方登录页' : '模拟登录成功'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
