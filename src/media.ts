// Public R2 development URL: anyone with an object URL can read that object.
export const R2_BASE_URL = "https://pub-34d142b2772a4ad5b65e811325f580fd.r2.dev";
export type SourceClip = {id:string;key:string;note?:string};
export const sources: SourceClip[] = [
  {id:"test-01",key:"uploads/20261021_101517_photo_1792570283_0_50D52B.mov",note:"Filename from bucket screenshot; network and render checks pending"},
];
export function mediaUrl(key:string):string {return R2_BASE_URL+"/"+key.split("/").map(encodeURIComponent).join("/");}
