#!/usr/bin/env bash
# Run from an existing GitHub Codespace. Installs tools only; never renders.
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ "$(node -p 'process.versions.node.split(".")[0]')" != 24 ]]; then
  echo 'Node 24 is required. Run: nvm install 24 && nvm use 24' >&2
  exit 1
fi
sudo apt-get update
sound_package=libasound2
if apt-cache show libasound2t64 >/dev/null 2>&1; then sound_package=libasound2t64; fi
sudo apt-get install -y python3 curl ffmpeg libnss3 libatk1.0-0 libatk-bridge2.0-0 \
  libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 \
  libgbm1 libpango-1.0-0 libcairo2 fonts-liberation "$sound_package"
npm ci
npx remotion browser ensure
npx tsc --noEmit
printf 'Setup complete. No video has been rendered. See docs/CODESPACES.md.\n'
