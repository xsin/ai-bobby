import { randomUUID } from 'node:crypto'
import {
  GatewayError,
  type CanonicalEvent,
  type CanonicalRequest,
  type ModelDescriptor,
  type ProviderAdapter,
} from '@ai-bobby/core'
import { freeModels, toDescriptor } from './catalog'
import { buildSystemPrompt, conversationText, decodeEnvelope } from './envelope'
import { findOrInstallRuntime } from './runtime'
import { startOpenCodeServer, type OpenCodeServer } from './server'
import { runOpenCode } from './run'

export interface OpenCodeProviderOptions {
  dataDir: string
  log?: (message: string) => void
}

export class OpenCodeProvider implements ProviderAdapter {
  readonly id = 'opencode' as const
  readonly displayName = 'OpenCode'
  private server: OpenCodeServer | undefined
  private starting: Promise<OpenCodeServer> | undefined
  private binary: string | undefined
  private models: ModelDescriptor[] = []

  constructor(private readonly options: OpenCodeProviderOptions) {}

  listModels(): readonly ModelDescriptor[] {
    return this.models
  }

  async refreshModels(): Promise<readonly ModelDescriptor[]> {
    const server = await this.ensureServer()
    try {
      const providers = await server.request<Parameters<typeof freeModels>[0]>('/provider')
      this.models = freeModels(providers).map(model => toDescriptor(model))
      return this.models
    } finally {
      await server.stop()
      this.server = undefined
    }
  }

  async *chat(request: CanonicalRequest, signal: AbortSignal): AsyncGenerator<CanonicalEvent> {
    const binary = await this.ensureBinary()
    const result = await runOpenCode(
      binary,
      this.options.dataDir,
      request.model.upstreamId,
      `${buildSystemPrompt(request)}\n\nExternal conversation JSON follows. Continue it.\n${conversationText(request.messages)}`,
      signal,
    )
    const envelope = decodeEnvelope(result.text, request.tools, request.toolChoice, request.parallelToolCalls)
    const responseId = `cmpl_${randomUUID().replaceAll('-', '')}`
    yield { type: 'start', responseId, model: request.model.id }
    if (envelope.content !== '') yield { type: 'text', delta: envelope.content }
    for (const [index, call] of envelope.calls.entries()) {
      const id = `call_${randomUUID().replaceAll('-', '')}`
      yield { type: 'tool_call_start', index, id, name: call.name }
      yield { type: 'tool_call_delta', index, argumentsDelta: JSON.stringify(call.arguments) }
      yield { type: 'tool_call_end', index }
    }
    if (result.usage !== undefined) {
      yield {
        type: 'usage',
        usage: {
          inputTokens: result.usage.input + result.usage.cacheRead + result.usage.cacheWrite,
          outputTokens: result.usage.output + result.usage.reasoning,
          ...(result.usage.cacheRead === 0 ? {} : { cachedInputTokens: result.usage.cacheRead }),
          ...(result.usage.reasoning === 0 ? {} : { reasoningTokens: result.usage.reasoning }),
        },
      }
    }
    yield { type: 'finish', reason: envelope.calls.length > 0 ? 'tool_calls' : 'stop' }
  }

  async stop(): Promise<void> {
    await this.server?.stop()
    this.server = undefined
    this.starting = undefined
  }

  private async ensureBinary(): Promise<string> {
    if (this.binary !== undefined) return this.binary
    this.binary = await findOrInstallRuntime(this.options.dataDir, { log: this.options.log })
    return this.binary
  }

  private ensureServer(): Promise<OpenCodeServer> {
    if (this.server) return Promise.resolve(this.server)
    if (this.starting) return this.starting
    this.starting = (async () => {
      const binary = await this.ensureBinary()
      const server = await startOpenCodeServer(binary, this.options.dataDir)
      this.server = server
      return server
    })().finally(() => {
      this.starting = undefined
    })
    return this.starting
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function number(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}
