import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, info: ErrorInfo) => void
}

interface ErrorBoundaryState {
  failed: boolean
}

/**
 * Keeps a broken optional subtree (for example the WebGL hero chunk failing on
 * an older mobile browser) from unmounting the whole landing page.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ai-bobby] ui error', error, info)
    this.props.onError?.(error, info)
  }

  render(): ReactNode {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children
  }
}
