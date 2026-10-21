import roughCutPlan from "./rough-cut-plan.json";

export const FPS = roughCutPlan.fps;
export const FILM_FRAMES = roughCutPlan.durationFrames;
export type EditShot = (typeof roughCutPlan.shots)[number];
export const editShots: EditShot[] = roughCutPlan.shots;

let nextFrame = 0;
for (const shot of editShots) {
  if (shot.startFrame !== nextFrame || shot.durationFrames <= 0) {
    throw new Error(`Rough-cut timeline gap or invalid duration at ${shot.id}`);
  }
  const expected = (shot.sourceOutSecondsExclusive - shot.sourceInSeconds) / shot.playbackRate * FPS;
  if (Math.abs(expected - shot.durationFrames) > 0.001) {
    throw new Error(`Source timing does not match output duration at ${shot.id}`);
  }
  nextFrame += shot.durationFrames;
}
if (nextFrame !== FILM_FRAMES) throw new Error("Rough-cut duration does not match its shots");
