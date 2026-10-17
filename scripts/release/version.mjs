#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
if (!/^\d+\.\d+\.\d+(?:[-+].*)?$/.test(pkg.version)) {
  console.error(`package.json version is not semver: ${pkg.version}`)
  process.exit(1)
}
console.log(process.argv[2] === 'tag' ? `v${pkg.version}` : pkg.version)
