#!/usr/bin/env bash
# Rebuild the standalone classic-script bundle used by index.html.
# The demo must work from file://, so it cannot use ES module imports.
set -euo pipefail
cd "$(dirname "$0")"
../../node_modules/.bin/esbuild app.js \
  --bundle \
  --minify \
  --format=iife \
  --target=es2020 \
  --outfile=app.bundle.js
