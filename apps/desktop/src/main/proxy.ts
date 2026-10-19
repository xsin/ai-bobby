import { ProxyAgent, fetch as undiciFetch, type Dispatcher } from 'undici'
import type { AppSettings, ProxySource } from './settings'

const agents = new Map<string, ProxyAgent>()

function agentFor(url: string): ProxyAgent {
  const key = url.trim()
  const existing = agents.get(key)
  if (existing) return existing
  const agent = new ProxyAgent(key)
  agents.set(key, agent)
  return agent
}

function systemProxy(): string | undefined {
  return process.env.HTTPS_PROXY?.trim()
    || process.env.https_proxy?.trim()
    || process.env.HTTP_PROXY?.trim()
    || process.env.http_proxy?.trim()
    || undefined
}

/**
 * Per-source fetch that can be routed through the configured proxy. The
 * settings are read on every request so changes apply without rebuilding the
 * providers; `mode: system` uses the usual *_PROXY environment variables.
 */
export function createProxyFetch(
  getSettings: () => AppSettings,
  source: ProxySource,
): typeof fetch {
  return ((input: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
    const proxy = getSettings().proxy
    if (proxy.mode === 'off' || !proxy.sources[source]) return fetch(input, init)
    const url = proxy.mode === 'custom' ? proxy.url.trim() : systemProxy()
    if (!url) return fetch(input, init)
    const dispatcher: Dispatcher = agentFor(url)
    return undiciFetch(input as Parameters<typeof undiciFetch>[0], {
      ...(init as Parameters<typeof undiciFetch>[1]),
      dispatcher,
    }) as unknown as Promise<Response>
  }) as typeof fetch
}
