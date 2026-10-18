import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { app } from 'electron'

/** Electron reports its own version instead of the app version in dev. */
export function appVersion(): string {
  const candidates = [
    join(app.getAppPath(), 'package.json'),
    join(process.cwd(), 'package.json'),
    join(__dirname, '../../package.json'),
  ]
  for (const file of candidates) {
    try {
      const packageJson = JSON.parse(readFileSync(file, 'utf8')) as { version?: unknown }
      if (typeof packageJson.version === 'string' && packageJson.version !== '') return packageJson.version
    } catch {
      // try the next candidate
    }
  }
  return app.getVersion()
}
