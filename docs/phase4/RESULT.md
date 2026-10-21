# Rough Cut 01 — rendered and verified

The real preview is `out/leito-rough-cut-01.mp4` (145,318,702 bytes; about 145 MB).
The local player is `out/phase4/preview.html`; it references the adjacent exported
MP4 and supports seeking to the memory/climax sections. The MP4 is the primary
portable delivery file and uses fast-start metadata for progressive playback.

## Actual verification

- **77.500 seconds of video, 2,325/2,325 decoded frames, 30 fps.**
- **1080×1920**, H.264 High profile, standard BT.709 limited-range yuv420p.
- Stereo AAC, 48 kHz; duration 77.504 seconds.
- Complete FFmpeg audio/video decode passed with no decoding errors.
- Near-black-frame scan: **no intervals detected**.
- Audio-silence scan (below −60 dBFS for ≥0.15 s): **no intervals detected**.
- Non-silent original-concert audio: mean −17.1 dBFS, peak −2.4 dBFS.
- MP4 `moov` metadata precedes media data: fast start verified.
- Representative frames from every exported shot were captured and inspected.
- TypeScript, script syntax, timeline coverage and working-media checks passed.

The native Remotion render initially carried full-range YUV/BT.601-family tags.
The delivery copy was properly converted to limited-range BT.709, with the AAC
audio stream copied unchanged, then fully reverified. No color flags were merely
relabeled. The native Remotion export is retained in ignored local storage at
`out/phase4/leito-remotion-native.mp4`.

## Content and review boundary

The active composition uses all 28 proposed shots from the 13 selected sources,
with original picture in/out timestamps, speeds and placements preserved exactly.
The genuine `concert-21` interaction plays at **00:37.500–00:43.500**, real-time,
with its matching source sound. Original recordings remain untouched.

The treatment adds restrained color consistency, corrected orientation/portrait
framing, a small opening title, light vignette and four short picture dissolves.
There are no placeholder cards, unfilled timeline slots or blank outro frames.

Sound is original concert audio only, with level balancing and short source-audio
crossfades. Slow-motion picture uses normal-speed sound from the same take;
those passages are intentionally not claimed to be lip/beat synchronized. The
six-second interaction remains synchronized and unretimed. No music, lyrics,
drops or crowd reactions were invented. Final music synchronization, detailed
sound design and mastering have not been done. This is the first visual-approval
rough cut, not the final aftermovie.

See `verification.json` for measured metadata and checksum; `WORKFLOW.md` for
editable sources and repeatable preparation/render/verification instructions.
