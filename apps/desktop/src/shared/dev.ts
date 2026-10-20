/**
 * The developer build is a separate local instance: its own data directory,
 * API key, port and import namespace. It is selected by the dev tooling, never
 * by a user-facing setting.
 */
export const DEV_PORT = 46891
export const PROD_PORT = 46890

export function devModelId(id: string): string {
  return `dev-${id}`
}

export function devDisplayName(name: string): string {
  return `Dev.${name}`
}

export function isDevModelId(id: string): boolean {
  return /^dev-(oc|wb|wbi|nv)\//.test(id)
}
