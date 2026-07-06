#!/bin/bash
# cPanel Git Version Control post-pull deploy (see .cpanel.yml).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOYPATH="${DEPLOYPATH:-/home/teatotco/public_html/development}"

cd "$ROOT"
export NODE_ENV=production

# ponytail: cPanel nodevenv path varies by host/repo — try common locations
for venv in \
  "$HOME/nodevenv/repositories/teatot/22/bin/activate" \
  "$HOME/nodevenv/public_html/development/22/bin/activate" \
  "$HOME/nodevenv/$(basename "$ROOT")/22/bin/activate"; do
  if [ -f "$venv" ]; then
    # shellcheck disable=SC1090
    source "$venv"
    break
  fi
fi

echo "▸ node $(node -v) · npm $(npm -v)"
npm ci
npm run build
node "$ROOT/scripts/stage-standalone.mjs"

echo "▸ Syncing to $DEPLOYPATH"
/bin/mkdir -p "$DEPLOYPATH"
/bin/rm -rf "${DEPLOYPATH:?}"/*
/bin/cp -r "$ROOT/deploy/development/." "$DEPLOYPATH/"
# CloudLinux: remove physical node_modules if present; use cPanel Run NPM Install
/bin/rm -rf "$DEPLOYPATH/node_modules"
/bin/mkdir -p "$DEPLOYPATH/tmp"
/usr/bin/touch "$DEPLOYPATH/tmp/restart.txt"
echo "✓ Deployed to $DEPLOYPATH"
