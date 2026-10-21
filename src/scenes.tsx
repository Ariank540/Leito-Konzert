import React from "react";
import {AbsoluteFill, OffthreadVideo} from "remotion";
import {connectionTestSource, mediaUrl} from "./media";

export {Aftermovie} from "./rough-cut";

export const ConnectionTest: React.FC = () => <AbsoluteFill style={{backgroundColor: "#090c13"}}>
  <OffthreadVideo
    src={mediaUrl(connectionTestSource.key)}
    style={{width: "100%", height: "100%", objectFit: "contain"}}
    volume={0.6}
  />
  <AbsoluteFill style={{justifyContent: "flex-end", padding: 42, pointerEvents: "none"}}>
    <div style={{fontFamily: "sans-serif", background: "#000a", color: "white", fontSize: 25, padding: 12}}>
      R2 TEST — NOT A FINISHED EDIT
    </div>
  </AbsoluteFill>
</AbsoluteFill>;
