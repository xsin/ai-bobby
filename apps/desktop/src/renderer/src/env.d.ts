import type { AiBobbyApi } from '@shared/api'

declare global {
  interface Window {
    aiBobby?: AiBobbyApi
  }
}

export {}
