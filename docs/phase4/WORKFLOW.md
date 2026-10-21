# First cinematic rough-cut workflow

The existing `LeitoAftermovie` composition now contains the source-based 77.5-second
picture edit: 28 shots from 13 recordings, 2,325 frames at 30 fps, 1080×1920.
The original `R2ConnectionTest` composition remains available.

## Reproduce

For Codespaces setup, see [../CODESPACES.md](../CODESPACES.md).
From the repository root, with Node 24/npm, Python 3,
FFmpeg/ffprobe and Chromium:

```bash
npm run prepare:rough
NODE_USE_ENV_PROXY=1 npm run stills:rough
NODE_USE_ENV_PROXY=1 npm run render:rough
npm run verify:rough
```

Use `REMOTION_BROWSER_EXECUTABLE` to select a browser explicitly. The renderer
otherwise uses system Chromium or Remotion's managed browser. For Studio:

```bash
NODE_USE_ENV_PROXY=1 npm run dev -- --no-open
```

Originals stay in ignored `out/phase3/media/`. The helper downloads only missing
exact manifest sources through the configured HTTPS proxy. Derived files live
in ignored `public/rough-cut-media/`. Neither originals nor derived media are
added to Git. Regeneration needs no speech model or S3 credentials.

The active timing source is `src/rough-cut-plan.json`. Changing picture trims,
playback rates or placement requires re-running `prepare:rough`, which refreshes
cache entries and regenerates the independent authored JSX nodes in
`src/rough-cut-sequence.tsx`. Trims remain source media seconds; output frame
counts account for playback rate. The adapter fails explicitly on missing IDs,
gaps, inconsistent durations or stale authored positions instead of displaying
a placeholder.

## Treatment

- Preserve every proposed source picture in/out, playback rate and placement.
- Correct source rotation, resize/crop to 9:16 without stretching, and gently
  track the face in the originally sideways `concert-02` insert.
- Apply a restrained shared grade: contrast 1.035, saturation 0.95, brightness
  −0.005, gamma 1.015. Original red and amber lighting remains recognizable.
- Use a light edge vignette and four short picture dissolves around the larger
  story turns. The outgoing actual last frame stays underneath the incoming
  shot during a dissolve; there is no fade through black or extra timeline gap.
- Keep the `concert-21` interaction at source 00:14.500–00:20.500, normal speed,
  appearing at film 00:37.500–00:43.500 with its matching original audio.
- Open over actual footage with the project's title, then clear the screen.
  End on actual performer footage without a blank title card or black outro.

## Authentic rough sound

The sound consists exclusively of original primary audio from the same source
take as each picture shot. No generated music, synthetic cheering, inferred
lyrics or invented musical drop is added. Native audio is decoded, modestly
level-balanced, encoded as stereo AAC and joined with six-frame crossfades.

Normal-speed footage keeps the matching original sound. Slow-motion picture
uses **normal-speed original audio from the same take**, starting at the same
source in-point and extending the audio out handle as needed. This avoids
pitched-down voices; those slow-motion passages are intentionally not claimed
to have synchronized lip movement. Outgoing audio has a short genuine same-take
handle for the crossfade. The last sound fades briefly while the picture stays
visible.

The emotional interaction remains real-time. Other cuts can change the musical
phrase because this is a source-sound visual rough cut, not a music-locked mix.
No lyric, song or beat identification is claimed. Final music synchronization,
source audition, sound design and mastering remain separate review work.

## Verify and review

`verify:rough` requires a real nonempty exported MP4, counts decoded frames,
checks dimensions/cadence/codecs/duration, fully decodes video and audio, and
scans for near-black and audio-silence candidates. Read
`out/phase4/verification.json` and its complete scan log for actual results.
The helper exits unsuccessfully on black or silence candidates for inspection.

Preflight captures from the actual Remotion composition are under
`out/phase4/remotion-stills/`; their contact sheet is
`out/phase4/preflight-contact.jpg`. They validate framing and loaded sources,
but do not substitute for checking the complete export.

The intended export path is `out/leito-rough-cut-01.mp4`. Its actual finished
verification and delivery results are recorded separately after rendering.
