import React from "react";
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {editShots} from "./timeline";

export const AUDIO_CROSSFADE_FRAMES = 6;

const ShotPicture: React.FC<{id: string; previousId?: string; dissolve: number; push: boolean}> = ({id, previousId, dissolve, push}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return <AbsoluteFill style={{overflow: "hidden"}}>
    {dissolve > 0 && previousId ? <Img
      src={staticFile(`rough-cut-media/${previousId}-last.jpg`)}
      style={{width: "100%", height: "100%", objectFit: "cover"}}
    /> : null}
    <AbsoluteFill style={{
      opacity: dissolve > 0 ? interpolate(frame, [0, dissolve], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}) : 1,
      scale: push ? interpolate(frame, [0, durationInFrames - 1], ["1", "1.018"], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}) : "1",
    }}>
      <OffthreadVideo
        src={staticFile(`rough-cut-media/${id}.mp4`)}
        muted
        style={{width: "100%", height: "100%", objectFit: "cover"}}
      />
    </AbsoluteFill>
  </AbsoluteFill>;
};

export const RoughCutShot: React.FC<{
  id: string;
  from: number;
  durationInFrames: number;
  dissolveIn?: number;
}> = ({id, from, durationInFrames, dissolveIn = 0}) => {
  const {fps} = useVideoConfig();
  const index = editShots.findIndex(s => s.id === id);
  if (index < 0) throw new Error(`Missing source shot ${id}`);
  const shot = editShots[index];
  if (from !== shot.startFrame || durationInFrames !== shot.durationFrames) {
    throw new Error(`Regenerate the authored sequence after changing ${id} in rough-cut-plan.json`);
  }
  const isLast = index === editShots.length - 1;
  return <Sequence
    name={`${id} · ${shot.sourceId} · ${shot.phase}`}
    from={from}
    durationInFrames={durationInFrames + (isLast ? 0 : AUDIO_CROSSFADE_FRAMES)}
    premountFor={fps}
  >
    <Sequence durationInFrames={durationInFrames} premountFor={fps}>
      <ShotPicture id={id} previousId={editShots[index - 1]?.id} dissolve={dissolveIn} push={shot.phase === "opening" || shot.phase === "resolve"} />
    </Sequence>
    <Audio
      src={staticFile(`rough-cut-media/${id}.m4a`)}
      volume={f => {
        const incoming = index === 0 ? 1 : interpolate(f, [0, AUDIO_CROSSFADE_FRAMES], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
        const outgoing = isLast
          ? interpolate(f, [durationInFrames - 8, durationInFrames - 1], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})
          : interpolate(f, [durationInFrames, durationInFrames + AUDIO_CROSSFADE_FRAMES], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
        return incoming * outgoing;
      }}
    />
  </Sequence>;
};
