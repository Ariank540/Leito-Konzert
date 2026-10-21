# Phase 2 — footage review and proposed direction

Historical report: the complete public manifest has since been supplied and all 25 downloads verified. See [Phase 3](../phase3/REPORT.md) for the current visual review, audio limitations and complete picture proposal. The earlier listing blocker below no longer blocks public downloads.

**Partial review, pending complete R2 inventory. No final film rendered.**

The existing Remotion compositions, source manifest, active timeline, dependencies and network settings are unchanged. All shot choices here are proposals, not an approved edit. The existing 75-second composition remains a placeholder.

## Inventory and exact blocker

Only one exact object key is currently known and registered in `src/media.ts`:

`uploads/20261021_101517_photo_1792570283_0_50D52B.mov`

The public `r2.dev` endpoint serves this object but is not a bucket-listing API. After the published configuration update, a fresh process found `R2_ACCOUNT_ID`, `R2_BUCKET`, `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`. A read-only boto3 SigV4 `ListObjectsV2` request through the configured HTTPS proxy reached the S3 service but returned **HTTP 403 `SignatureDoesNotMatch`**. No object keys were returned.

The account and bucket are configured. The two credential variables are injected as network-proxy placeholders, not locally usable signing credentials. S3 SigV4 computes a request HMAC locally with the actual secret key; replacing placeholder text later in an outbound request does not produce the required signature. This is a credential-delivery/signing blocker, not a confirmed network-policy or codec failure. See `S3-CONNECTION.md` for the latest result.

To continue, change delivery of the **existing** R2 credentials to secure direct runtime injection usable by the signing SDK (or use an S3-aware signing mechanism), then retry. Do not paste secrets into chat or create duplicate credentials merely for this failure. Alternatively, supply a complete `uploads/` object-key export with every page; exact keys allow public download attempts without authenticated listing.

No unknown filename has been registered. `inventory.json` deliberately marks completeness as false.

## Verified source properties

| Property | Actual result |
| --- | --- |
| Download size | 101,897,992 bytes |
| Duration | 45.776667 seconds |
| Encoded video | H.264, yuv420p, 1080 × 1920 |
| Cadence | Nominal 30 fps; average 525300/13733 (~38.25 fps); timestamp behavior is irregular |
| Full video decode | 1,751 decoded source frames, without PyAV exception |
| Primary audio | Stereo AAC, 48 kHz, 45.775 seconds; full decode succeeded |
| Auxiliary audio | Four-channel `apac` track not supported by the available decoder; primary AAC is usable |
| Orientation | Early performance needs approximately 90° clockwise; later audience section approximately 90° counterclockwise; several rolling transitions need individual treatment |
| Existing Remotion test | Previously verified 300-frame, 10-second H.264/AAC MP4 from this remote source |

The original remains intact at `out/r2-source.mov`. Raw metadata and decode evidence are in `out/phase2/`. The source hash is recorded in `inventory.json`.

Upright content is largely **landscape inside sideways encoded portrait pixels**. Preserving the existing 9:16 output requires deliberate reframing. A full-height portrait crop retains only about 31.6% of the upright landscape width; it may remove the very performer–audience relationship we want to show. Do not use a blanket rotation/crop or stretch the image. Review each selected shot; keep the current output dimensions until a framing decision is approved.

## What was actually reviewed

- 92 decoded images sampled at 0.5-second intervals across the source, with actual decoded timestamps recorded in `sample-pts.json`.
- An additional 26 images at 0.1-second intervals from 33.5–36.0 seconds, with actual timestamps in `detail-pts.json`.
- Full primary video/audio decoding, stream metadata, waveform and 0.5-second audio energy windows.
- Audio was **not auditioned or semantically verified**. Automated transcription could not run because its model download was rejected by the proxy with HTTP 403. No lyrics, song title, spoken words, BPM or musical drop have been established.

This is dense frame-based visual review, not continuous playback or a completed audio edit. In/out points below are exact **proposed** source-time boundaries; final motion, audio synchronization and crop checks are still required. Contact-sheet labels show the actual decoded PTS, which can differ slightly from requested sample times.

## Ranked selects from the one known recording

All rows refer to the original filename `20261021_101517_photo_1792570283_0_50D52B.mov`. Times are `MM:SS.mmm`; out points are exclusive. Full filenames, object keys, timings and notes are also included in `highlights.csv` and `highlights.json`.

| Rank / ID | Source in → out | Duration | Observed image | Editorial value |
| --- | --- | --- | --- | --- |
| 1 / H01 | 00:33.500 → 00:35.500 | 2.000 s | Second microphone near a front-row attendee beside the performer; attendee smiles | Strongest human connection. Do not infer who offers the microphone or what is said. |
| 2 / H02 | 00:30.500 → 00:33.500 | 3.000 s | Performer leans close to camera/front row; phones and red light behind | Builds intimacy before H01; not evidence of an embrace. |
| 3 / H03 | 00:12.000 → 00:14.500 | 2.500 s | Close frontal performance, microphone, hand gesture, red LEDs | Hero performance candidate; direct presence and strong expression. |
| 4 / H04 | 00:04.000 → 00:05.500 | 1.500 s | White flare, red stage and frontal performer view; foreground phone | Useful impact image. The flare is not proof of a musical drop. |
| 5 / H05 | 00:28.500 → 00:30.000 | 1.500 s | Foreground attendee with animated expression; audience and phones behind | Immediate audience viewpoint; retain only if the roll can be handled cleanly. |
| 6 / H06 | 00:35.500 → 00:38.000 | 2.500 s | Smiling front-row faces and dense red-lit crowd | Warm collective release; high motion and occlusion limit holds. |
| 7 / H07 | 00:08.000 → 00:10.500 | 2.500 s | Medium frontal performance with microphone and red LEDs | Clear performance bridge. |
| 8 / H08 | 00:24.500 → 00:25.500 | 1.000 s | Tilted ceiling LEDs and partial stage during camera motion | Optional abstract teaser; not a venue establishing shot. |

Reserve rather than force the opening, rolling transitions around 20–28 seconds and tail around 42–45.777 seconds. These include blur, obstructions and large camera rotation. Some may work as very short transition textures, but are weaker than the ranked selects.

No fireworks, confetti, backstage sequence, embrace, handshake or final-show event has been established by this review.

## Audio observations and limits

The primary AAC track decodes and is not silent. Full-track FFmpeg statistics show RMS about **−14.21 dBFS**, decoded peak **+0.06 dBFS**; leave headroom and check limiting before a final mix. The loudest measured 0.5-second window is 30.5–31.0 seconds at approximately −8.45 dBFS in the downmixed analysis WAV. This does not identify a musical drop or separate cheering from vocals/music.

The source generated non-monotonic timestamp warnings in FFmpeg's null-output test. Full PyAV decoding succeeded; the earlier rendered MP4 decoded with no errors. Preserve source timestamp mapping and normalize only a derived copy if needed. H.264/AAC compatibility is already demonstrated; the unsupported auxiliary `apac` track does not require replacing the usable AAC track.

Sound direction: open with restrained real location audio if it supports the images, keep an intelligible original performance/audience fragment around the emotional moment, then build to a cleared musical peak. Choose and verify the track before beat-accurate cuts. Do not infer speech from a waveform or use unverified transcription as lyrics.

## Creative proposal: “From the stage to the front row”

The strongest grounded direction is an intimate concert film: first the red-lit world, then the performer, then the feeling of being close enough for the performance to become personal. The emotional center is the actual front-row microphone moment. The finale should return to collective energy with the strongest verified performance/crowd image available in the full inventory.

Use the existing red lighting as the visual thread. Keep skin texture, protect faces from over-sharpening and avoid crushing already dark footage. Let selected clear shots hold long enough to register. Use camera motion sparingly as transition material. Avoid constant speed ramps, artificial crowd responses and simulated spectacle. A natural white flare can punctuate a verified musical hit if the soundtrack supports it.

### Proposed 75-second arc (within the requested 60–90 seconds)

| Film time | Purpose | Grounded candidate / remaining need |
| --- | --- | --- |
| 00:00–00:08 | Mysterious opening | Optional 1-second red-LED fragment H08. A strong establishing detail remains unselected. |
| 00:08–00:22 | Powerful build-up | H07 anchors performance; remaining escalation shots await complete inventory. |
| 00:22–00:32 | Explosive first impact | H04 supplies an actual light flare. A real musical drop must be confirmed from the soundtrack. |
| 00:32–00:45 | Emotional personal moment | H02 into H01, preserving source order and a meaningful audio fragment if intelligible. Do not imply an event absent from the footage. |
| 00:45–00:56 | Rebuild | H05 supplies audience viewpoint; additional usable reactions are needed. |
| 00:56–00:72 | Final climax | H03 and H06 are provisional visual anchors. The strongest final peak cannot be selected before the remaining recordings are inspected. |
| 00:72–00:75 | Resolve | Ending shot and sound tail remain unassigned. No invented finale event. |

The current plan assigns only **16.5 seconds** of non-overlapping source footage to a 75-second scaffold; **58.5 seconds remain unassigned**. The one known recording is only 45.777 seconds long. Do not pad to the target with unapproved repetition, freeze frames or blanket slow motion. A completed 60–90 second shot selection is blocked on the missing inventory and sound review.

## Editable handoff

- `inventory.json`: exact known object identity and explicit listing blocker.
- `highlights.csv` / `highlights.json`: ranked source selects and descriptions.
- `proposed-edit.json`: 30 fps, 75-second storyboard, eight provisional shot records and explicit unfilled ranges. Includes `sourceId`, `fromFrame`, `startFrame`, `durationFrames` and rotation notes for Remotion handoff.
- `fromFrame` is a source-time offset expressed at the **composition's 30 fps**, not an index into the irregular original decoded frames. Always preserve the second-based in/out values as the reference.
- The JSON is intentionally **not connected to `src/timeline.ts`**. Do not render it as if it were complete or approved.

## Review artifacts

Generated large/local analysis files are deliberately kept under the existing ignored `out/` directory:

- `out/phase2/contact-sheet-2s.jpg`: source orientation overview.
- `out/phase2/contact-performance.jpg`: 0.5-second early performance samples, rotated for inspection.
- `out/phase2/contact-interaction.jpg`: performer/front-row samples; rolling transition remains visible.
- `out/phase2/contact-crowd.jpg`: crowd and tail samples.
- `out/phase2/contact-microphone-detail.jpg`: 0.1-second view of the candidate personal moment.
- `out/phase2/frames/`: representative frame previews.
- `out/phase2/audio-waveform.png`, `audio-windows.json`, `audio-stats.log`, `source-audio.wav`: signal evidence and an auditionable primary audio copy.
- `out/phase2/full-source-decode.json` and `source-metadata.json`: technical evidence.

## Before approval of the complete selection

Obtain the full object-key inventory, download and inspect the remaining accessible videos, then revise the ranking and fill the actual shot plan. Audition the original audio, confirm any proposed drop/beat and clear soundtrack use. Review changing orientation and portrait crops on the real selected windows. Present the completed source-based selection for approval before the final aftermovie render.
