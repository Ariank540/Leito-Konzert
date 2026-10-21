# Phase 3 — public-manifest review and cinematic picture proposal

**25/25 downloads passed. Visual frame surveys and primary-audio technical analysis are complete for all 25 entries. Audible-content verification remains incomplete. No final film was rendered.**

The proposed picture edit is **77.5 seconds, 28 shots, 13 selected sources, 1080×1920 at 30 fps**. It is ready for review as a picture/story proposal, not as an audio-locked or approved film. The existing active Remotion compositions and timeline have not been changed.

## Connection and inventory results

- Fetched and fast-forwarded to main commit `63982d9`, which adds the owner's `concert-manifest.json`. No project rebuild was performed.
- Validated 25 entries, 25 unique IDs and 25 unique exact object keys. Every HTTPS URL maps to its stated object key and filename on the configured public R2 host.
- Every public URL returned **HTTP 206** for the byte-range test; every complete download succeeded. **No download failures.**
- Downloaded **3,172,891,753 bytes** (about 3.17 GB), retained only in ignored local working storage under `out/phase3/media/`. The already verified original test file was reused for its exact matching key.
- Summed container duration: **2,027.673464 seconds**, about **33 minutes 47.7 seconds**, including duplicate entries.
- **24 distinct file SHA-256 hashes**: `concert-19` and `concert-25` are byte-identical. Both URLs were tested and both contact sheets reviewed; they are not independent coverage.
- `concert-01` and `concert-03` show the same sampled action and have identical primary AAC packet hashes, but different whole-file and video-packet hashes. Treat them as alternate-copy candidates; exact visual equivalence was not established for every frame.
- No R2 S3 credentials or listing permission were used. The earlier S3-signing blocker is irrelevant to these public downloads.

The manifest's original `verifiedRemoteObjects: 0` is preserved. Actual new verification is recorded separately in `verified-inventory.json`, with access status, measured sizes, hashes, metadata and per-file notes.

## What was actually inspected

| Check | Completed | Meaning |
| --- | --- | --- |
| Manifest/key validation | 25/25 | Exact keys and URLs checked; no guessed filenames |
| HTTP byte-range test and full download | 25/25 | Objects are accessible from this environment |
| Video metadata and sampled decoding | 25/25 | Duration, size, codec, cadence and orientation recorded |
| Visual contact-sheet survey | 25/25 | **597 source-PTS-labeled samples** actually inspected across all recordings |
| Closer selected-window visual review | 28 windows | Approximately 4 samples/second plus handles; weak choices replaced or trimmed |
| Primary AAC decode and signal analysis | 25/25 | Full primary track decoded; level windows and speech-like activity measured |
| Audio audition / successful transcription | **0/25** | Words, recognizable live vocals, musical drops and song identity are **not verified** |
| Complete semantic audiovisual inspection | **Not claimed** | Sparse image review and audio measurements are not continuous watching/listening |

The source-overview sheet labels show actual source presentation timestamps. Dense selected-window labels show time **relative to the recorded sheet origin**, identified in `proposed-timeline.json`. Dense sheets can include unused handles beyond the final in/out points. The final selected out points are exclusive.

See `per-recording-review.md` for all 25 exact filenames, properties, visual notes and limitations. The locally generated review gallery is `out/phase3/review.html`; source contact sheets are under `out/phase3/sheets/` and representative upright previews under `out/phase3/previews/`.

## Strongest grounded material

**The personal center:** `concert-21`, **00:14.500–00:20.500**. The performer bends toward an attendee at the barrier; microphone, phones and audience proximity remain visible in the same shot. This is the clearest human-memory candidate and deserves a six-second hold at normal speed. Do not infer a lyric, a relationship, a handshake or who is speaking from the image alone.

**The cinematic backbone:** `concert-24`, especially **00:12.000–00:13.000**, **00:22.500–00:24.500**, **00:32.500–00:34.500** and **00:56.000–00:57.500**. This side-stage angle keeps performer and crowd in one coherent space, with red audience light and white ceiling patterns. It supplies scale without pretending that pyro, confetti or fireworks occurred. The obstructed 49–51 second option was rejected in the final proposal.

**The final human image:** `concert-06`, **03:02.000–03:04.500**, proposed at half speed. A close performer/microphone image with hand movement after the wider crowd release; end deliberately rather than piling on an invented spectacle.

**The warm contrast:** `concert-08`, **00:12.000–00:14.500** and **00:18.000–00:21.000**. Amber light separates the reveal and later rebuild from the dominant red material. The first range was trimmed before the framing cuts the face.

**Crowd memory:** `concert-14`, **00:24.000–00:27.000**, and `concert-06`, **02:14.000–02:15.500**. Visible expressions, gestures and phone lights create a sense of being there. Cuts across these takes are associative montage, not evidence of a synchronized response to a particular lyric.

`ranked-highlights.csv` and `.json` rank all 28 proposed windows using subjective 1–5 scores for emotional impact, **visual** energy, visual quality and storytelling value. The weighted score is 35%, 25%, 20%, 20%, respectively. Energy here does not score an unheard musical drop. Story-essential atmospheric shots may rank lower than close interaction shots and still belong in the edit.

## Proposed creative direction — “The room became personal”

Begin with the room before asking the viewer to recognize a face: controlled shadows, ceiling patterns and a glimpse of the red audience. Reveal the performer through the amber lighting, then increase proximity and gesture intensity. Brief supporting-performer inserts establish the larger live event while keeping the primary performer central.

At the emotional turn, stop cutting for six seconds. Let the front-row proximity register. Follow with an audience-memory image and warmth before rebuilding. The final section alternates clear performance, advancing movement and spatially coherent audience views, then releases into one sustained close image. The aim is a personal memory with scale, not a generic effects reel.

### Picture arc

| Film time | Function | Actual picture basis |
| --- | --- | --- |
| 00:00.000–00:06.500 | Mysterious, atmospheric opening | Side-stage room/crowd in subdued light, then amber performer reveal |
| 00:06.500–00:20.500 | Progressive build | Frontal performance, audience faces, hand gestures and the real flag texture |
| 00:20.500–00:34.500 | First energy release | Side-stage performer, direct close-up, brief supporting performer, raised arm and wide crowd |
| 00:34.500–00:46.500 | Emotional personal memory | Close performer, six-second front-row interaction, then attendee expression |
| 00:46.500–00:53.000 | Warm rebuild | Amber performance and concise microphone/gesture inserts |
| 00:53.000–00:72.500 | Final visual climax | Audience faces, closer performance, advancing movement, cleaner side-stage scale and crowd release |
| 00:72.500–00:77.500 | Resolve | One sustained close performer image; considered cut/fade and a real sound tail once audio is chosen |

This is a proposed **visual** energy arc. The 20.5-second impact and final build are not claimed to coincide with verified musical drops. Their exact musical placement must follow sound review. No footage is repeated within the selected source ranges, and there are no unfilled picture slots.

### Cutting, framing and color

- Keep the established 9:16 output. Prefer the naturally upright sources and the high-resolution side-stage material. The `concert-02` insert requires an additional 90° clockwise rotation and a face-focused crop; do not stretch it.
- Respect display matrices first, then account for physical camera roll in individual windows. Do not apply one global rotation to an entire moving-phone recording.
- Keep the red lighting as a visual thread, with amber as emotional contrast. Preserve skin detail and the distinction between faces and red spill. Avoid blanket crushed blacks and over-sharpening.
- Use decisive cuts and a small number of motivated motion transitions. Keep the emotional interaction at real speed. The half-speed windows are explicit in the plan; do not slow every close-up or pitch-shift a vocal by accident.
- Source `20` has a baked-in English social caption; `23` has baked-in Persian/Instagram graphics; `22` is 360×640. They were visually reviewed but not selected over cleaner alternatives.
- Sources `19`/`25` show a different-looking stage/screen with uncertain continuity. They are excluded rather than inventing chronology or performance identity.
- The supporting graphic-shirt and black-T-shirt performers are described by appearance, not assigned unsupported names. Their inserts are brief and clearly treated as supporting coverage.

## Codec, cadence and slow-motion findings

All primary audio tracks are AAC and all primary audio decodes succeeded. MOV files can also carry an auxiliary four-channel `apac` track unsupported by the available decoder; the usable primary AAC track remains available. Do not accidentally map all audio streams into a conversion.

Video is H.264 except `concert-23` and `concert-24`, which are HEVC. Both HEVC sources decoded for contact sheets and selected previews with system FFmpeg. This does **not** establish that every source has passed a Remotion render; only the earlier R2 test composition has that verified MP4 result.

`concert-24` is encoded at 3840×2160 with a display rotation. Although `r_frame_rate` reports 120, `avg_frame_rate` is `9675000/163721` (about 59.09 fps). The earlier 49–50 second sample produced 59 distinct downscaled frame hashes. In the final selected region, 32.5–33.5 seconds produced 60 distinct frames; `concert-06` at 182–183 seconds produced 59. This supports cautious **0.5×** proposals, with further motion/strobe review, not a promise of clean quarter-speed motion. Exact selected-window frame-hash evidence is in `out/phase3/slow-motion-evidence.json`.

Irregular cadence in phone footage means a source decoded-frame index is not necessarily seconds × 30. The plan preserves media seconds as the reference. Its `fromFrame` values use the composition's 30 fps time units, and output durations account for playback rate.

## Audio findings, blocker and required next action

Every primary track is non-silent and decoded into an auditionable analysis WAV. RMS/peak windows are saved per file. Some recordings reach digital full scale; leave headroom and review distortion before mixing. These measurements do not identify applause, lyrics or a drop.

The bundled Silero detector ran locally on all 25 tracks and found speech-like intervals in some. It is unreliable on loud music/crowd audio: zero detections do not prove there are no vocals, and positive detections do not prove intelligible live speech. No song title, lyric, recognizable live vocal, exact beat grid or musical drop is asserted.

There is no audio-audition tool in this session. A trusted multilingual speech-model download was also blocked: the official OpenAI Whisper model host, `openaipublic.azureedge.net`, returned a proxy **CONNECT 403**. Earlier Hugging Face model access was likewise blocked. TLS verification was retained; no untrusted mirror or generated transcript was substituted.

A **narrow network-domain addition** for `openaipublic.azureedge.net` was saved to the configuration draft, preserving both existing custom R2 host rules and the package-manager presets. Saving did not apply or publish it. Review/save/publish that change in environment settings to permit the trusted model download. The model URL contains the expected SHA-256 from OpenAI's source and must be verified before use. Alternatively, use a trusted transcription/audition workflow or supply a known local model. This is a model-download prerequisite, not a need for new R2 credentials.

Before sound lock, audition the selected original fragments, verify intelligibility and identify a real musical structure. Keep the memory shot at normal speed with its own sound if it works. Use a coherent continuous sound bed rather than jumping between unrelated lyrics at every picture cut. Do not add fabricated crowd reactions. The soundtrack, live-vocal fragment and drop locations remain open decisions, not silently approved defaults.

## Editable Remotion handoff and approval boundary

- `proposed-timeline.ts`: typed, editable data with exact filenames/keys, media in/out, source IDs, frame offsets, playback rates and rotation notes.
- `proposed-timeline.json`: the complete 2,325-frame picture proposal, plus phase ranges, audio/crop notes and review evidence paths.
- `ranked-highlights.csv` / `.json`: all 28 windows and subjective editorial ranking.
- `verified-inventory.json`: all 25 actual access/download/technical results and explicit review-status counts.
- `per-recording-review.md`: notes for every exact filename, including unused footage and quality limits.
- `out/phase3/review.html`: interactive local contact-sheet/select gallery with audio-copy links for review; generated separately from the app.

The proposed data is **not imported into the active composition**. A future adapter must honor playback rate and rotation; the current simple `EditShot` type alone cannot express all of these decisions. No dependency declarations, lockfiles, active source files or original videos were committed or pushed by this work.

Before the final aftermovie render: finish semantic audio review, approve the picture direction/selected takes and supporting-performer balance, confirm portrait crops and slow-motion playback, then implement the approved adapter and run appropriate source/render checks. The current proposal is reviewable now; a claim of complete audiovisual analysis or a final beat-locked film would be premature.
