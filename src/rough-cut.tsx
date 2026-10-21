import React from "react";
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {RoughCutSequence} from "./rough-cut-sequence";

const OpeningTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{
    justifyContent: "flex-end", padding: "0 70px 185px", pointerEvents: "none",
    opacity: interpolate(frame, [0, 0.6 * fps, 3.0 * fps, 3.8 * fps], [0, 0.92, 0.92, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
    color: "#fff8ef", fontFamily: "Arial, Helvetica, sans-serif", textShadow: "0 2px 16px #0009",
  }}>
    <div style={{fontSize: 23, letterSpacing: 7, marginBottom: 20}}>BEHZAD LEITO</div>
    <div style={{fontSize: 62, lineHeight: 1.14, fontWeight: 400, letterSpacing: 5}}>THE NIGHT<br />WE LIVED</div>
  </AbsoluteFill>;
};

export const Aftermovie: React.FC = () => {
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{backgroundColor: "#111014"}}>
    <RoughCutSequence />
    <AbsoluteFill style={{pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 58%, rgba(0,0,0,0.13) 100%)"}} />
    <Sequence name="Opening film title" durationInFrames={4 * fps} premountFor={fps}>
      <OpeningTitle />
    </Sequence>
  </AbsoluteFill>;
};
