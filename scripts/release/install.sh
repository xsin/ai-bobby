#!/usr/bin/env bash
# AI Bobby one-line installer (macOS, ad-hoc signed public beta).
#
#   curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh | bash
#
# Auditable install:
#   curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh -o install.sh
#   less install.sh && bash install.sh
#
# Options:
#   --version <v>        install a specific version (default: latest)
#   --install-dir <dir>  install into exactly this directory (no fallback)
#   --no-launch          do not launch after install
#   --system             force /Applications/AIMatrix (admin authorization if needed)
#   --help               show this help
#
# macOS system bash is 3.2: no mapfile / associative arrays / ${var^^}.
set -euo pipefail

APP_NAME="AI Bobby"
APP_GROUP="AIMatrix"
BASE_URL="${AI_BOBBY_BASE_URL:-https://github.com/xsin/ai-bobby/releases/latest}"
VERSION="latest"
RESOLVED_VERSION=""
INSTALL_MODE="default"        # default | system | custom
CUSTOM_ROOT=""
INSTALL_ROOT=""
DO_LAUNCH=1
NEED_SUDO=0

log()  { printf '%s[install]%s %s\n' "$(printf '\033[1;34m')" "$(printf '\033[0m')" "$*" >&2; }
ok()   { printf '%s[  ok  ]%s %s\n' "$(printf '\033[1;32m')" "$(printf '\033[0m')" "$*" >&2; }
warn() { printf '%s[ warn ]%s %s\n' "$(printf '\033[1;33m')" "$(printf '\033[0m')" "$*" >&2; }
die()  { printf '%s[ fail ]%s %s\n' "$(printf '\033[1;31m')" "$(printf '\033[0m')" "$*" >&2; exit 1; }

usage() {
  sed -n '2,18p' "$0" | sed 's/^# \{0,1\}//'
  exit 0
}

while [ $# -gt 0 ]; do
  case "$1" in
    --version) VERSION="${2:?--version needs a value}"; shift 2 ;;
    --install-dir) INSTALL_MODE="custom"; CUSTOM_ROOT="${2:?--install-dir needs a value}"; shift 2 ;;
    --no-launch) DO_LAUNCH=0; shift ;;
    --system) INSTALL_MODE="system"; shift ;;
    -h|--help) usage ;;
    *) die "unknown argument: $1 (use --help)" ;;
  esac
done

case "$(uname -m)" in
  arm64) ARCH="arm64" ;;
  x86_64) ARCH="x64" ;;
  *) die "unsupported architecture: $(uname -m)" ;;
esac

TMP_DIR="$(mktemp -d)"
cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT INT TERM

RELEASES_ROOT="$BASE_URL"
RELEASES_ROOT="${RELEASES_ROOT%/latest/download}"
RELEASES_ROOT="${RELEASES_ROOT%/latest}"
RELEASES_ROOT="${RELEASES_ROOT%/}"

log "app: ${APP_NAME}"
log "arch: ${ARCH}"
log "version: ${RESOLVED_VERSION:-$VERSION}"

if [ "$VERSION" = "latest" ]; then
  for vt in "$RELEASES_ROOT/latest/download/VERSION.txt" \
            "$RELEASES_ROOT/latest/VERSION.txt" \
            "$RELEASES_ROOT/VERSION.txt"; do
    CANDIDATE="$(curl -fsL --retry 3 --retry-delay 2 -sS "$vt" 2>/dev/null | tr -d '[:space:]' || true)"
    case "$CANDIDATE" in
      v[0-9]*.[0-9]*.[0-9]*|[0-9]*.[0-9]*.[0-9]*) RESOLVED_VERSION="$CANDIDATE"; break ;;
    esac
  done
  if [ -n "$RESOLVED_VERSION" ]; then
    log "resolved latest: ${RESOLVED_VERSION}"
  else
    warn "VERSION.txt not found; falling back to the latest tag"
  fi
fi

ZIP_PATH=""
DOWNLOAD_URL=""
SELECTED_ARCH=""

try_download() {
  url="$1"
  out="$2"
  if ! curl -fL --retry 3 --retry-delay 2 -sS -o "$out" "$url" 2>/dev/null; then
    rm -f "$out"
    return 1
  fi
  [ -s "$out" ] || { rm -f "$out"; return 1; }
  # zip local file header magic is "PK"
  [ "$(head -c 2 "$out" 2>/dev/null)" = "PK" ] || { rm -f "$out"; return 1; }
  return 0
}

download_candidate() {
  want="$1"
  if [ -n "$RESOLVED_VERSION" ]; then
    ver_for_name="${RESOLVED_VERSION#v}"
  else
    ver_for_name="${VERSION#v}"
  fi
  if [ "$ver_for_name" = "latest" ]; then
    zipname="AI-Bobby-latest-${want}.zip"
  else
    zipname="AI-Bobby-${ver_for_name}-${want}.zip"
  fi
  out="$TMP_DIR/$zipname"

  bases=""
  if [ -n "$RESOLVED_VERSION" ]; then
    bases="$RELEASES_ROOT/$RESOLVED_VERSION $RELEASES_ROOT/download/$RESOLVED_VERSION"
    case "$RESOLVED_VERSION" in
      v*) bases="$bases $RELEASES_ROOT/download/${RESOLVED_VERSION#v}" ;;
      *)  bases="$bases $RELEASES_ROOT/download/v$RESOLVED_VERSION" ;;
    esac
  elif [ "$VERSION" = "latest" ]; then
    bases="$RELEASES_ROOT/latest $RELEASES_ROOT/latest/download"
  else
    bases="$RELEASES_ROOT/$VERSION $RELEASES_ROOT/download/$VERSION"
  fi

  for base in $bases; do
    if try_download "$base/$zipname" "$out"; then
      ZIP_PATH="$out"
      DOWNLOAD_URL="$base/$zipname"
      SELECTED_ARCH="$want"
      log "downloaded: ${zipname} <- ${base}"
      return 0
    fi
  done
  return 1
}

for want in universal "$ARCH"; do
  if download_candidate "$want"; then break; fi
  warn "no ${want} package, trying next"
done

[ -n "$ZIP_PATH" ] || die "could not download an ${ARCH} package"

BASE_NAME="$(basename "$ZIP_PATH")"
BASE_DIR="$(dirname "$DOWNLOAD_URL")"
EXPECTED=""

CHECKSUMS="$TMP_DIR/checksums.txt"
if curl -fL --retry 3 --retry-delay 2 -sS -o "$CHECKSUMS" "$BASE_DIR/checksums.txt" 2>/dev/null; then
  EXPECTED="$(awk -v want="$BASE_NAME" '$NF == want { print $1; exit }' "$CHECKSUMS")"
fi
if [ -z "$EXPECTED" ]; then
  if curl -fL --retry 3 --retry-delay 2 -sS -o "$TMP_DIR/pkg.sha256" "$BASE_DIR/$BASE_NAME.sha256" 2>/dev/null; then
    EXPECTED="$(awk '{print $1}' "$TMP_DIR/pkg.sha256" | head -n1)"
  fi
fi

ACTUAL="$(shasum -a 256 "$ZIP_PATH" | awk '{print $1}')"
if [ -z "$EXPECTED" ]; then
  if [ "${AI_BOBBY_SKIP_VERIFY:-0}" = "1" ]; then
    warn "no checksum file; continuing because AI_BOBBY_SKIP_VERIFY=1"
    warn "actual sha256: ${ACTUAL}"
  else
    die "no checksum file; refusing to install (set AI_BOBBY_SKIP_VERIFY=1 to override)"
  fi
elif [ "$EXPECTED" = "$ACTUAL" ]; then
  ok "sha256 verified: ${ACTUAL}"
else
  die "sha256 mismatch
  expected: ${EXPECTED}
  actual:   ${ACTUAL}
Please retry the download or report a corrupted release."
fi

EXTRACT_DIR="$TMP_DIR/extract"
mkdir -p "$EXTRACT_DIR"
log "extracting"
ditto -x -k "$ZIP_PATH" "$EXTRACT_DIR"
APP_SRC="$EXTRACT_DIR/${APP_NAME}.app"
[ -d "$APP_SRC" ] || die "package does not contain ${APP_NAME}.app"

if pgrep -x "$APP_NAME" >/dev/null 2>&1; then
  log "stopping running ${APP_NAME}"
  pkill -x "$APP_NAME" || true
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    pgrep -x "$APP_NAME" >/dev/null 2>&1 || break
    sleep 0.3
  done
fi

# ---------------------------------------------------------------------------
# Install location
#
# Default: /Applications/AIMatrix (system-wide for admin users). A standard
# user or a managed Mac falls back to ~/Applications/AIMatrix and gets told
# why. --system forces /Applications/AIMatrix and asks for admin rights when
# needed; --install-dir is used verbatim with no fallback.
# ---------------------------------------------------------------------------
system_root="/Applications/${APP_GROUP}"
user_root="${HOME}/Applications/${APP_GROUP}"

can_write_dir() {
  mkdir -p "$1" 2>/dev/null && [ -w "$1" ]
}

run_root() {
  if [ "$(id -u)" -eq 0 ]; then
    "$@"
    return
  fi
  if [ -r /dev/tty ]; then
    sudo "$@" </dev/tty
  else
    sudo -n "$@"
  fi
}

case "$INSTALL_MODE" in
  custom)
    INSTALL_ROOT="$CUSTOM_ROOT"
    log "install mode: custom (no fallback)"
    ;;
  system)
    INSTALL_ROOT="$system_root"
    log "install mode: --system (forced)"
    ;;
  default)
    if can_write_dir "$system_root"; then
      INSTALL_ROOT="$system_root"
    else
      INSTALL_ROOT="$user_root"
      warn "/Applications is not writable (standard user or managed Mac)"
      warn "falling back to ${INSTALL_ROOT}"
    fi
    ;;
esac

if ! can_write_dir "$INSTALL_ROOT"; then
  if [ "$INSTALL_MODE" != "system" ]; then
    die "cannot create ${INSTALL_ROOT}; choose another location with --install-dir"
  fi
  log "requesting administrator authorization for ${INSTALL_ROOT}"
  run_root mkdir -p "$INSTALL_ROOT"
  if [ ! -w "$INSTALL_ROOT" ]; then
    NEED_SUDO=1
  fi
fi

APP_DEST="$INSTALL_ROOT/${APP_NAME}.app"
log "installing to: ${APP_DEST}"
if [ -e "$APP_DEST" ]; then
  BACKUP="$TMP_DIR/${APP_NAME}.app.bak"
  if [ "$NEED_SUDO" -eq 1 ] && [ ! -w "$(dirname "$APP_DEST")" ]; then
    run_root mv "$APP_DEST" "$BACKUP" 2>/dev/null || run_root rm -rf "$APP_DEST"
  else
    mv "$APP_DEST" "$BACKUP" 2>/dev/null || rm -rf "$APP_DEST"
  fi
fi

if [ "$NEED_SUDO" -eq 1 ]; then
  run_root ditto "$APP_SRC" "$APP_DEST"
  # Hand the install directory back to the installing user so the updater
  # (`mv` + `ditto` on the bundle) can replace it without admin rights.
  run_root chown -R "$(id -u):$(id -g)" "$INSTALL_ROOT" 2>/dev/null || true
else
  ditto "$APP_SRC" "$APP_DEST"
fi
ok "installed"

# Remove the two legacy managed defaults only. A custom --install-dir is never
# touched; the current target is skipped explicitly.
cleanup_legacy() {
  for legacy in "${HOME}/Applications/AI Bobby.app" "/Applications/AI Bobby.app"; do
    [ "$legacy" = "$APP_DEST" ] && continue
    [ -d "$legacy" ] || continue
    if [ -w "$(dirname "$legacy")" ]; then
      rm -rf "$legacy"
    else
      run_root rm -rf "$legacy" || warn "could not remove legacy install: ${legacy}"
    fi
    log "removed legacy install: ${legacy}"
  done
}
cleanup_legacy

xattr -dr com.apple.quarantine "$APP_DEST" 2>/dev/null || true
MAIN_BIN="$APP_DEST/Contents/MacOS/${APP_NAME}"
[ -x "$MAIN_BIN" ] || MAIN_BIN="$(find "$APP_DEST/Contents/MacOS" -type f 2>/dev/null | head -n1)"
[ -n "$MAIN_BIN" ] && chmod +x "$MAIN_BIN" 2>/dev/null || true

log "version: ${RESOLVED_VERSION:-$VERSION}"
log "arch: ${SELECTED_ARCH}"
log "path: ${APP_DEST}"
log "sha256: ${ACTUAL}"

if [ "$DO_LAUNCH" -eq 1 ]; then
  log "launching ${APP_NAME}"
  open "$APP_DEST" || warn "launch failed; open it manually: ${APP_DEST}"
else
  log "skipped launch (--no-launch)"
fi

ok "done"
