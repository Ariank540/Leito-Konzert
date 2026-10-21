import React from "react";
import {Composition} from "remotion";
import {ConnectionTest,Aftermovie} from "./scenes";
import {FPS,FILM_FRAMES} from "./timeline";
export const Root:React.FC=()=> <>
  <Composition id="R2ConnectionTest" component={ConnectionTest} width={1080} height={1920} fps={FPS} durationInFrames={300}/>
  <Composition id="LeitoAftermovie" component={Aftermovie} width={1080} height={1920} fps={FPS} durationInFrames={FILM_FRAMES}/>
</>;
