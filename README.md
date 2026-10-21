# THE NIGHT WE LIVED — Leito Concert

**Status: groundwork only. No finished edit or verified render.**

This Remotion starter connects to a single Cloudflare R2 object from the user's bucket, without putting bulky footage into GitHub. It contains:
- `R2ConnectionTest`: 10-second 9:16 clip for a **real render test**.
- `LeitoAftermovie`: a 75-second **placeholder timeline** awaiting source review and editorial decisions.
- `src/media.ts`: R2 media manifest, including the `uploads/` prefix.
- `src/timeline.ts`: future editable shot list (currently empty).
- `scripts/check-r2.mjs`: HTTP byte-range access test (not a codec test).

## How to test in an environment with Node.js and network access

```bash
npm install
npm run check:r2
npm run dev
npm run render:test
```

**Important:** The R2 development URL can be rate-limited. The sample is a `.mov` file; browser support and codec compatibility have **not** been established. If it does not render, inspect its codec and make an H.264/AAC MP4 working copy without destroying the original. A successful browser playback is not equivalent to a Remotion render test.

## Build the real edit

1. Get the full object-key list from the R2 dashboard / authorized S3 API. A public `r2.dev` URL does not list bucket contents.
2. Add exact keys to `src/media.ts`.
3. Analyze videos and original audio; select genuine highlights and record accurate source in/out frames.
4. Enter chosen clips in `src/timeline.ts` with their destination positions. No automated analysis has been performed by this repository.
5. Make a 60–90s emotional, beat-synced cinematic film and use only properly licensed soundtrack material.
6. Validate previews, audio, crop, and final render before calling it complete.

## Security

The repository is public. **Never commit Cloudflare API keys or signed access links.** Objects at the public R2 development URL are publicly accessible to anyone who knows the URLs. Disable public access or migrate to protected access after testing. Revoke any broad Cloudflare account token created solely for upload.
