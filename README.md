# THE NIGHT WE LIVED — Leito Concert

The active **77.5-second cinematic rough cut** is implemented in Remotion:
28 shots from 13 original recordings, 2,325 frames at 30 fps, 1080 × 1920.
It is a visual-approval rough cut; final music synchronization and sound design
remain pending. The original `R2ConnectionTest` composition is retained.

**Start here: [Reproduce in GitHub Codespaces](docs/CODESPACES.md).**

## Project files

- `concert-manifest.json`: all 25 exact original object keys and public R2 URLs.
- `src/rough-cut-plan.json`: editable 28-shot timeline with verified source trims.
- `src/rough-cut-sequence.tsx`: authored shot nodes regenerated from the plan.
- `src/rough-cut.tsx` and `src/rough-cut-shot.tsx`: composition, titles, transitions
  and authentic source-audio playback.
- `scripts/download-rough-sources.py`: downloads the 13 unique selected originals.
- `scripts/prepare-rough-cut.py`: reversible portrait working copies and audio.
- `scripts/render-rough-cut.mjs`: Remotion render and BT.709 delivery preparation.
- `scripts/verify-rough-cut.py`: complete exported-file verification.
- [Editorial workflow](docs/phase4/WORKFLOW.md),
  [previous render results](docs/phase4/RESULT.md), and
  [footage review](docs/phase3/REPORT.md).

## Local workflow

With Node 24, Python 3, curl, FFmpeg/ffprobe and a supported Chrome browser:

```bash
npm ci
npm run prepare:rough
npm run dev
# Run these only when you want a new export:
npm run render:rough
npm run verify:rough
```

The genuine `concert-21` front-row interaction stays at film 37.5–43.5 seconds,
normal speed with matching original audio. The remaining soundtrack uses
original same-take concert audio, including unretimed sound under slow-motion
picture. No generated songs, lyrics, drops or crowd reactions are added.

Originals, working media and exports are ignored. Public R2 downloads need no
S3 credentials. Keep existing HTTPS proxy settings where required; prefix Node
network commands with `NODE_USE_ENV_PROXY=1` in the Codex cloud environment.
The renderer uses `REMOTION_BROWSER_EXECUTABLE`, system Chromium, or Remotion's
managed browser in that order. The final output is `out/leito-rough-cut-01.mp4`.

This public repository must never contain credentials or signed private URLs.
Public R2 URLs are accessible to anyone who knows them. The prior verified MP4
is not committed; see the Codespaces guide for downloading your future export.
