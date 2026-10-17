import { App as AntApp, ConfigProvider, theme as antdTheme } from 'antd'
import type { ReactNode } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useTheme } from '@/lib/theme'

const DARK = {
  colorBgLayout: '#1b1b1d',
  colorBgContainer: '#202022',
  colorBgElevated: '#26262a',
  colorBgSpotlight: '#2e2e31',
  colorBorder: '#46464b',
  colorBorderSecondary: '#3a3a3e',
  colorText: '#f2f2f7',
  colorTextSecondary: '#a1a1aa',
  colorTextTertiary: '#7c7c85',
  colorFillQuaternary: '#2a2a2d',
  colorFillTertiary: '#2e2e31',
  colorSplit: '#303034',
} as const

const LIGHT = {
  colorBgLayout: '#f5f5f7',
  colorBgContainer: '#ffffff',
  colorBgElevated: '#ffffff',
  colorBgSpotlight: '#ececf0',
  colorBorder: '#c9c9cf',
  colorBorderSecondary: '#d8d8dd',
  colorText: '#242426',
  colorTextSecondary: '#61616a',
  colorTextTertiary: '#8a8a93',
  colorFillQuaternary: '#f6f6f8',
  colorFillTertiary: '#ececf0',
  colorSplit: '#e8e8ed',
} as const

export function AntdProvider({ children }: { children: ReactNode }) {
  const { resolved } = useTheme()
  const palette = resolved === 'dark' ? DARK : LIGHT

  return (
    <ConfigProvider
      theme={{
        cssVar: { key: 'ai-bobby-root' },
        hashed: false,
        algorithm: resolved === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#1e4fff',
          colorInfo: '#1e4fff',
          colorSuccess: '#30d158',
          colorWarning: '#ff9f0a',
          colorError: '#ff453a',
          borderRadius: 7,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", sans-serif',
          ...palette,
        },
        components: {
          Table: {
            headerBg: palette.colorFillQuaternary,
            headerColor: palette.colorTextSecondary,
            borderColor: palette.colorBorderSecondary,
            headerSplitColor: palette.colorBorderSecondary,
            rowHoverBg: palette.colorFillQuaternary,
            rowSelectedBg: 'transparent',
            rowSelectedHoverBg: palette.colorFillQuaternary,
            rowExpandedBg: palette.colorBgContainer,
            cellPaddingBlockSM: 10,
            cellPaddingInlineSM: 12,
            selectionColumnWidth: 38,
            headerBorderRadius: 0,
          },
        },
      }}
    >
      <AntApp className="h-full">
        <TooltipProvider delayDuration={300}>
          {children}
          <Toaster theme={resolved} position="bottom-center" richColors closeButton />
        </TooltipProvider>
      </AntApp>
    </ConfigProvider>
  )
}
