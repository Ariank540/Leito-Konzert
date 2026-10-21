#!/usr/bin/env python3
"""Build ignored, reversible rough-cut assets from the exact original sources.

No originals or credentials are modified. Source picture timing comes from
src/rough-cut-plan.json; original audio stays at normal speed, using same-take
outgoing handles for crossfades. The front-row interaction stays real-time.
"""
import concurrent.futures
import hashlib
import json
import math
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLAN = json.loads((ROOT / 'src/rough-cut-plan.json').read_text())
OUT = ROOT / 'public/rough-cut-media'
LOG = ROOT / 'out/phase4/preparation'
OUT.mkdir(parents=True, exist_ok=True)
LOG.mkdir(parents=True, exist_ok=True)
FPS = PLAN['fps']
HANDLE = 6 / FPS


def command(args):
    run = subprocess.run(args, cwd=ROOT, text=True, capture_output=True)
    if run.returncode:
        raise RuntimeError(run.stderr[-5000:])
    return run


def probe(path):
    return json.loads(command(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(path)]).stdout)


def prepare(shot):
    sid = shot['id']
    original = ROOT / 'out/phase3/media' / shot['filename']
    if not original.is_file():
        raise RuntimeError(f'Missing original source: {original}; run npm run download:rough')
    duration = shot['durationFrames'] / FPS
    audio_duration = duration + HANDLE
    gain_scan = command(['ffmpeg', '-hide_banner', '-nostdin', '-ss', str(shot['sourceInSeconds']), '-i', str(original), '-t', str(audio_duration), '-map', '0:a:0', '-vn', '-af', 'volumedetect', '-f', 'null', '-'])
    mean = float(re.search(r'mean_volume: ([-\d.]+) dB', gain_scan.stderr).group(1))
    peak = float(re.search(r'max_volume: ([-\d.]+) dB', gain_scan.stderr).group(1))
    gain = round(max(-12, min(3, -16 - mean, -2.5 - peak)), 2)
    extra = 'transpose=clock,' if shot['additionalRotationDegreesCCW'] == -90 else ''
    # Only the originally sideways test shot needs a moving face-focused crop.
    crop_x = r"(iw-ow)*(0.68-0.11*min(t/2\,1))" if extra else '(iw-ow)/2'
    vf = (f"trim=duration={shot['sourceOutSecondsExclusive'] - shot['sourceInSeconds']},"
          f"setpts=(PTS-STARTPTS)/{shot['playbackRate']},fps={FPS}," + extra +
          'scale=1080:1920:force_original_aspect_ratio=increase:force_divisible_by=2,' +
          f"crop=1080:1920:x='{crop_x}':y=(ih-oh)/2,setsar=1,"
          'eq=contrast=1.035:brightness=-0.005:saturation=0.95:gamma=1.015')
    recipe = {'version': 1, 'shot': shot, 'filters': vf, 'audioGainDb': gain, 'audioHandleSeconds': HANDLE, 'originalBytes': original.stat().st_size}
    fingerprint = hashlib.sha256(json.dumps(recipe, sort_keys=True).encode()).hexdigest()
    record_file = OUT / f'{sid}.json'
    video = OUT / f'{sid}.mp4'
    audio = OUT / f'{sid}.m4a'
    last = OUT / f'{sid}-last.jpg'
    cached = json.loads(record_file.read_text()) if record_file.exists() else {}
    if cached.get('fingerprint') != fingerprint or not all(p.exists() for p in [video, audio, last]):
        filtergraph = f'[0:v:0]{vf}[v];[0:a:0]atrim=duration={audio_duration},asetpts=PTS-STARTPTS,volume={gain}dB,aresample=48000[a]'
        args = ['ffmpeg', '-hide_banner', '-nostdin', '-threads', '2', '-ss', str(shot['sourceInSeconds']), '-t', str(audio_duration), '-i', str(original), '-filter_complex', filtergraph,
                '-map', '[v]', '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '18', '-pix_fmt', 'yuv420p', '-frames:v', str(shot['durationFrames']), '-movflags', '+faststart', '-map_metadata', '-1', '-metadata:s:v:0', 'rotate=0', '-threads', '2', '-y', str(video),
                '-map', '[a]', '-vn', '-c:a', 'aac', '-b:a', '192k', '-ac', '2', '-ar', '48000', '-t', str(audio_duration), '-map_metadata', '-1', '-y', str(audio)]
        result = command(args)
        (LOG / f'{sid}.log').write_text(result.stderr)
        command(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-ss', str((shot['durationFrames'] - 1) / FPS), '-i', str(video), '-frames:v', '1', '-y', str(last)])
    v = next(s for s in probe(video)['streams'] if s['codec_type'] == 'video')
    a = next(s for s in probe(audio)['streams'] if s['codec_type'] == 'audio')
    assert int(v['nb_frames']) == shot['durationFrames'], (sid, v.get('nb_frames'))
    assert v['width'] == 1080 and v['height'] == 1920 and v['codec_name'] == 'h264'
    assert not any(s.get('rotation', 0) != 0 for s in v.get('side_data_list', [])), (sid, 'unremoved rotation')
    assert float(a['duration']) >= duration, (sid, 'short audio')
    record = dict(recipe, fingerprint=fingerprint, videoFrames=int(v['nb_frames']), audioDuration=float(a['duration']), video=str(video.relative_to(ROOT)), audio=str(audio.relative_to(ROOT)), lastFrame=str(last.relative_to(ROOT)))
    record_file.write_text(json.dumps(record, indent=2) + '\n')
    print(f'{sid}: {v["nb_frames"]} frames, original audio gain {gain:+.2f} dB, prepared', flush=True)
    return record


if __name__ == '__main__':
    # Download unique sources before parallel preparation to avoid partial-file races.
    command(['python3', str(ROOT / 'scripts/download-rough-sources.py')])
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        records = list(pool.map(prepare, PLAN['shots']))
    (OUT / 'manifest.json').write_text(json.dumps({'fps': FPS, 'durationFrames': PLAN['durationFrames'], 'shots': records}, indent=2) + '\n')
    # Keep independent JSX source nodes for Studio while timing remains data-driven.
    lines = ['// Generated authored nodes. Edit rough-cut-plan.json, then run prepare-rough-cut.py.',
             'import React from "react";', 'import {RoughCutShot} from "./rough-cut-shot";',
             'export const RoughCutSequence: React.FC = () => <>']
    for shot in PLAN['shots']:
        dissolve = 8 if shot['id'] == 'P3-14' else 6 if shot['id'] in ['P3-02', 'P3-17', 'P3-28'] else 0
        lines.append(f'  <RoughCutShot id="{shot["id"]}" from={{{shot["startFrame"]}}} durationInFrames={{{shot["durationFrames"]}}} dissolveIn={{{dissolve}}} />')
    lines.append('</>;')
    layout = ROOT / 'src/rough-cut-sequence.tsx'
    content = '\n'.join(lines) + '\n'
    if not layout.exists() or layout.read_text() != content:
        layout.write_text(content)
    print(f'Ready: {len(records)} working clips; {sum(r["videoFrames"] for r in records)} frames.', flush=True)
