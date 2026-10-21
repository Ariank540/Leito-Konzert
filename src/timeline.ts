export const FPS=30;
export const FILM_FRAMES=75*FPS;
export type EditShot={id:string;sourceId:string;startFrame:number;fromFrame:number;durationFrames:number};
// Intentionally empty until the videos are reviewed and the best moments selected.
export const editShots: EditShot[]=[];
