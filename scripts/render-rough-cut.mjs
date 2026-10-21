import path from 'node:path';
import fs from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const exec = promisify(execFile);
import {fileURLToPath} from 'node:url';
import {bundle} from '@remotion/bundler';
import {openBrowser, renderMedia, renderStill, selectComposition} from '@remotion/renderer';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);
const plan = JSON.parse(await fs.readFile('src/rough-cut-plan.json', 'utf8'));
// Preserve the existing system browser; otherwise use Remotion's managed browser.
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE ||
  (await fs.access('/usr/bin/chromium').then(() => '/usr/bin/chromium').catch(() => undefined));
await fs.mkdir('out/phase4/remotion-stills', {recursive: true});
for (const shot of plan.shots) {
  for (const ext of ['mp4', 'm4a', '-last.jpg']) {
    const name = ext.startsWith('-') ? `${shot.id}${ext}` : `${shot.id}.${ext}`;
    await fs.access(path.join('public/rough-cut-media', name));
  }
}
console.log('Bundling existing project and prepared local assets.');
const serveUrl = await bundle({entryPoint: path.join(root, 'src/index.ts'), publicDir: path.join(root, 'public'), outDir: path.join(root, 'out/phase4/remotion-bundle')});
const browser = await openBrowser('chrome', {browserExecutable});
try {
  const composition = await selectComposition({serveUrl, id: 'LeitoAftermovie', puppeteerInstance: browser});
  if (composition.durationInFrames !== 2325 || composition.width !== 1080 || composition.height !== 1920) throw new Error('Unexpected rough-cut composition settings');
  if (process.argv.includes('--stills')) {
    for (const shot of plan.shots) {
      const frame = shot.startFrame + Math.floor(shot.durationFrames / 2);
      await renderStill({composition, serveUrl, frame, output: `out/phase4/remotion-stills/${shot.id}.jpg`, imageFormat: 'jpeg', jpegQuality: 90, scale: 0.5, puppeteerInstance: browser, overwrite: true});
      console.log(`${shot.id}: Remotion frame ${frame} captured`);
    }
  } else {
    let last = -1;
    const started = Date.now();
    await renderMedia({composition, serveUrl, outputLocation: path.join(root, 'out/phase4/leito-remotion-native.mp4'), codec: 'h264', audioCodec: 'aac', audioBitrate: '192k', sampleRate: 48000, pixelFormat: 'yuv420p', crf: 19, x264Preset: 'fast', concurrency: 3, offthreadVideoThreads: 2, puppeteerInstance: browser, overwrite: true, timeoutInMilliseconds: 60000,
      onProgress: progress => {
        const bucket = Math.floor(progress.renderedFrames / composition.durationInFrames * 20);
        if (bucket !== last) {
          last = bucket;
          console.log(`Rendered ${progress.renderedFrames}/${composition.durationInFrames}; encoded ${progress.encodedFrames}; elapsed ${Math.round((Date.now()-started)/1000)}s`);
        }
      },
    });
    const native = path.join(root, 'out/phase4/leito-remotion-native.mp4');
    const target = path.join(root, 'out/leito-rough-cut-01.mp4');
    const {stdout} = await exec('ffprobe', ['-v', 'error', '-show_streams', '-of', 'json', native]);
    const video = JSON.parse(stdout).streams.find(s => s.codec_type === 'video');
    const needsNormalization = video.pix_fmt !== 'yuv420p' || video.color_range === 'pc' || video.color_space !== 'bt709';
    const matrix = video.color_space === 'bt709' ? 'bt709' : 'bt601';
    const range = video.color_range === 'pc' || video.pix_fmt === 'yuvj420p' ? 'pc' : 'tv';
    const args = ['-hide_banner', '-loglevel', 'warning', '-i', native, '-map', '0:v:0', '-map', '0:a:0'];
    if (needsNormalization) {
      args.push('-vf', `scale=in_range=${range}:out_range=tv:in_color_matrix=${matrix}:out_color_matrix=bt709,format=yuv420p`, '-c:v', 'libx264', '-preset', 'fast', '-crf', '17', '-threads', '3', '-pix_fmt', 'yuv420p', '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-c:a', 'copy');
    } else {
      args.push('-c', 'copy');
    }
    args.push('-movflags', '+faststart', '-y', target);
    console.log('Preparing standard BT.709 delivery MP4; original concert audio is stream-copied.');
    await exec('ffmpeg', args, {maxBuffer: 10 * 1024 * 1024});
    console.log('Remotion render and delivery preparation completed: out/leito-rough-cut-01.mp4');
  }
} finally {
  await browser.close({silent: true});
}
