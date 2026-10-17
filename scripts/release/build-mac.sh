#!/usr/bin/env bash
# Build, ad-hoc sign, verify and package one macOS architecture.
#
# Usage:
#   bash scripts/release/build-mac.sh --arch arm64 --out-dir <dir> [--skip-build]
#
# Environment:
#   SIGN_IDENTITY   codesign identity; defaults to "-" (ad-hoc)
#   NOTARIZE        reserved; 1 would need Developer ID credentials (not v1)
#   AI_BOBBY_RELEASE_NOTES  release notes written into latest.json
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
VERSION="$(node "$ROOT/scripts/release/version.mjs")"
ARCH="arm64"
OUT_DIR=""
SKIP_BUILD=0

while [ $# -gt 0 ]; do
  case "$1" in
    --arch) ARCH="${2:?--arch needs a value}"; shift 2 ;;
    --out-dir) OUT_DIR="${2:?--out-dir needs a value}"; shift 2 ;;
    --skip-build) SKIP_BUILD=1; shift ;;
    -h|--help)
      sed -n '2,14p' "$0" | sed 's/^# \{0,1\}//'
      exit 0 ;;
    *) echo "unknown argument: $1" >&2; exit 1 ;;
  esac
done

case "$ARCH" in
  arm64) ELECTRON_ARCH="--arm64"; APP_OUT="$ROOT/apps/desktop/release/mac-arm64" ;;
  x64|x86_64) ARCH="x64"; ELECTRON_ARCH="--x64"; APP_OUT="$ROOT/apps/desktop/release/mac" ;;
  *) echo "unsupported arch: $ARCH" >&2; exit 1 ;;
esac
OUT_DIR="${OUT_DIR:-$ROOT/release-site/releases/$VERSION}"
APP="$APP_OUT/AI Bobby.app"
ZIP_NAME="AI-Bobby-${VERSION}-${ARCH}.zip"

log() { printf '[build-mac] %s\n' "$*" >&2; }

if [ "$SKIP_BUILD" -eq 0 ]; then
  log "building renderer/main"
  pnpm --filter @ai-bobby/desktop build
  log "packaging Electron app (${ARCH})"
  rm -rf "$APP_OUT"
  pnpm --filter @ai-bobby/desktop exec electron-builder --mac dir "$ELECTRON_ARCH" --publish never
fi

[ -d "$APP" ] || { echo "app bundle not found: $APP" >&2; exit 1; }

SIGN_IDENTITY="${SIGN_IDENTITY:--}"
log "signing with identity: ${SIGN_IDENTITY}"
codesign --force --deep --sign "$SIGN_IDENTITY" "$APP"
codesign --verify --deep --strict --verbose=2 "$APP"

mkdir -p "$OUT_DIR"
ZIP="$OUT_DIR/$ZIP_NAME"
log "zipping: $ZIP"
ditto -c -k --keepParent "$APP" "$ZIP"

SHA="$(shasum -a 256 "$ZIP" | awk '{print $1}')"
printf '%s  %s\n' "$SHA" "$ZIP_NAME" > "$ZIP.sha256"

# Rebuild checksums.txt without a stale line for this asset.
CHECKSUMS="$OUT_DIR/checksums.txt"
if [ -f "$CHECKSUMS" ]; then
  grep -v "  $ZIP_NAME\$" "$CHECKSUMS" > "$CHECKSUMS.tmp" || true
  mv "$CHECKSUMS.tmp" "$CHECKSUMS"
fi
printf '%s  %s\n' "$SHA" "$ZIP_NAME" >> "$CHECKSUMS"
printf '%s\n' "$VERSION" > "$OUT_DIR/VERSION.txt"

node "$ROOT/scripts/release/manifest.mjs" \
  --version "$VERSION" \
  --arch "$ARCH" \
  --out-dir "$OUT_DIR" \
  --zip "$ZIP" \
  --base-url "https://github.com/xsin/ai-bobby/releases/download/v${VERSION}"

log "done: $ZIP"
log "sha256: $SHA"
