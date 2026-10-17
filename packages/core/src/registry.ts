import type { ModelDescriptor, ProviderId } from './types'

export class ModelRegistry {
  private models = new Map<string, ModelDescriptor>()
  private aliases = new Map<string, string>()

  replace(provider: ProviderId, models: readonly ModelDescriptor[]): void {
    for (const [id, model] of [...this.models]) {
      if (model.provider === provider) {
        this.models.delete(id)
        for (const [alias, target] of [...this.aliases]) {
          if (target === id) this.aliases.delete(alias)
        }
      }
    }
    for (const model of models) {
      this.models.set(model.id, model)
      this.aliases.set(model.displayName, model.id)
    }
  }

  remove(provider: ProviderId): void {
    this.replace(provider, [])
  }

  list(options: { all?: boolean } = {}): readonly ModelDescriptor[] {
    const values = [...this.models.values()]
    return values.filter(model => {
      if (options.all) return true
      return model.status === 'available' || model.status === 'chat_only'
    })
  }

  find(idOrAlias: string): ModelDescriptor | undefined {
    const direct = this.models.get(idOrAlias)
    if (direct) return direct
    const target = this.aliases.get(idOrAlias)
    return target === undefined ? undefined : this.models.get(target)
  }

  has(id: string): boolean {
    return this.find(id) !== undefined
  }
}
