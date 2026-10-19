const linkStyle = { color: '#8fb0ff' }

/**
 * Shown when the React tree itself fails (for example a JS chunk that an older
 * mobile browser cannot parse). Inline styles keep it readable even when the
 * stylesheet failed to load.
 */
export function BootFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        background: '#05070d',
        color: '#f2f2f7',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", sans-serif',
      }}
    >
      <div style={{ maxWidth: 560 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.14em', color: '#8a8a93', textTransform: 'uppercase' }}>
          AI Bobby · Local AI Gateway
        </div>
        <h1 style={{ margin: '14px 0 12px', fontSize: 36, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
          All your models.
          <br />
          One endpoint.
        </h1>
        <p style={{ margin: '0 0 18px', color: '#a1a1aa', fontSize: 15, lineHeight: 1.7 }}>
          把 OpenCode、WorkBuddy 与 WorkBuddy AI 收进一个只监听本机的 OpenAI 兼容端点。
          One key, three protocols.
        </p>
        <pre
          style={{
            margin: '0 0 18px',
            padding: '12px 14px',
            overflowX: 'auto',
            border: '1px solid #2a2a2e',
            borderRadius: 10,
            background: '#101116',
            color: '#d6d8de',
            fontSize: 12,
            lineHeight: 1.6,
          }}
        >
          curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh | bash
        </pre>
        <p style={{ margin: 0, color: '#8a8a93', fontSize: 13, lineHeight: 1.7 }}>
          页面脚本没有加载成功。可以刷新重试，或先执行上面的安装命令。
          <br />
          <a href="https://github.com/xsin/ai-bobby" style={linkStyle}>
            GitHub
          </a>
          {' · '}
          <a href="https://xsin.github.io/ai-bobby/releases" style={linkStyle}>
            Releases
          </a>
        </p>
      </div>
    </div>
  )
}
