import React from "react";
import {AbsoluteFill,OffthreadVideo,Sequence} from "remotion";
import {sources,mediaUrl} from "./media";
import {editShots} from "./timeline";
const frameStyle:React.CSSProperties={width:"100%",height:"100%",objectFit:"contain"};
export const ConnectionTest:React.FC=()=> <AbsoluteFill style={{backgroundColor:"#090c13"}}>
  <OffthreadVideo src={mediaUrl(sources[0].key)} style={frameStyle} volume={0.6}/>
  <AbsoluteFill style={{justifyContent:"flex-end",padding:42,pointerEvents:"none"}}>
    <div style={{fontFamily:"sans-serif",background:"#000a",color:"white",fontSize:25,padding:12}}>R2 TEST — NOT A FINISHED EDIT</div>
  </AbsoluteFill>
</AbsoluteFill>;
export const Aftermovie:React.FC=()=> <AbsoluteFill style={{backgroundColor:"#090c13"}}>
  {editShots.length===0 ? <AbsoluteFill style={{justifyContent:"center",alignItems:"center",padding:70,textAlign:"center",fontFamily:"sans-serif",color:"white"}}>
    <div style={{fontSize:60,fontWeight:700}}>THE NIGHT WE LIVED</div>
    <div style={{fontSize:30,marginTop:26}}>Placeholder: first review the source videos and populate src/timeline.ts.</div>
  </AbsoluteFill> : editShots.map(s=>{
    const clip=sources.find(x=>x.id===s.sourceId);
    return clip ? <Sequence key={s.id} from={s.startFrame} durationInFrames={s.durationFrames}>
      <AbsoluteFill><OffthreadVideo src={mediaUrl(clip.key)} startFrom={s.fromFrame} style={frameStyle}/></AbsoluteFill>
    </Sequence> : null;
  })}
</AbsoluteFill>;
