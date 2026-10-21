# Reproduce Rough Cut 01 in GitHub Codespaces

The active `LeitoAftermovie` composition is 77.5 seconds, 28 shots from 13
recordings, 2,325 frames at 30 fps, portrait 1080 × 1920. The emotional
`concert-21` interaction is at film 37.5–43.5 seconds, source 14.5–20.5 seconds.
The editable source of truth is `src/rough-cut-plan.json`; preparation regenerates
`src/rough-cut-sequence.tsx`. The original `R2ConnectionTest` remains available.

## 1. Update your existing Codespace

Run in the repository directory (typically `/workspaces/Leito-Konzert`):

```bash
git status --short
git pull --ff-only origin main
nvm install 24
nvm use 24
bash scripts/setup-codespaces.sh
```

Preserve any local Codespace edits before pulling; do not reset them. The setup
script installs FFmpeg, Python, Chrome runtime libraries, exact locked npm
dependencies, and Remotion's managed Chrome Headless Shell. It does not download
concert footage, preprocess clips, or render. If your shell lacks `nvm`, install
or select Node 24 using your Codespace's supported Node tooling first.

## 2. Download and prepare the source footage

```bash
npm run download:rough
npm run prepare:rough
npx tsc --noEmit
```

`prepare:rough` also runs the downloader, so the first command is optional.
Downloads use the exact public HTTPS URLs in `concert-manifest.json`, checked
against the selected shots. Only the 13 selected recordings are needed; no
Cloudflare credentials, S3 bucket listing or Python packages are required.
`curl` inherits an existing HTTPS proxy if configured. In the Codex cloud
runtime preserve its proxy and set `NODE_USE_ENV_PROXY=1` for Node networking.
A normal Codespace does not require that variable or any Codex proxy secrets.

Original recordings are stored in ignored `out/phase3/media/`. Derived H.264
picture clips, original-audio AAC tracks and dissolve stills are generated in
ignored `public/rough-cut-media/`. Preparation leaves originals untouched and
preserves the approved source trims, playback rates and shot placements.
Unique sources download sequentially before the two-worker preparation stage.
Allow several GB of free disk space and time for downloads and FFmpeg processing.
Public R2 access must remain enabled; HTTP failures are reported by curl.

## 3. Preview and render when you are ready

These commands are instructions for your Codespace, not a claim that a new
export has already been made there:

```bash
npm run dev -- --host=0.0.0.0 --port=3000 --no-open
```

Open the forwarded port 3000 to review `LeitoAftermovie`. Stop Studio or open a
second terminal before rendering:

```bash
npm run render:rough
npm run verify:rough
```

`render:rough` uses `REMOTION_BROWSER_EXECUTABLE` if supplied, otherwise the
existing `/usr/bin/chromium` when present, otherwise Remotion's managed browser.
It first renders the existing composition, then produces a fast-start H.264,
yuv420p BT.709 MP4 with AAC audio. The three-worker renderer may need more memory
than the smallest Codespace provides; use a larger machine if it is killed.

Final output: **`out/leito-rough-cut-01.mp4`**. In the Codespaces Explorer,
right-click that file and select **Download**. This avoids GitHub Release and
R2 upload authentication entirely. Codespaces UI delivery has not been exercised
from this Codex runtime.

`verify:rough` counts all 2,325 frames, checks 77.5-second duration, portrait
resolution and codecs, fully decodes audio/video, and scans for black frames and
silence. Read `out/phase4/verification.json` and `full-export-scan.log`. A failed
verification is not a successful delivery.

The previously verified Codex export was 145,318,702 bytes with SHA-256
`e1194f7a88e890c47fbaf27376af92bf34c2029b6dd3913e574be984c7488faa`.
A fresh render can differ in byte size/hash across browser and FFmpeg versions;
verify actual frames, sound and picture rather than expecting identical bytes.
That prior MP4 is intentionally not in Git and will not appear after pulling.

## Editing and sound

See [phase4/WORKFLOW.md](phase4/WORKFLOW.md). Change source timing in the JSON
plan, then rerun preparation before rendering. The soundtrack uses authentic
same-take audio with short crossfades. Slow-motion picture uses unretimed original
sound; the personal interaction remains real-time and synchronized. Final music
synchronization and sound design are still pending.

Media, renders, `.env` files, caches and credentials must stay outside Git.
