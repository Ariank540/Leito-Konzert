#!/usr/bin/env python3
"""Verify the complete real rough-cut export; never substitutes a metadata-only pass."""
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VIDEO = ROOT / 'out/leito-rough-cut-01.mp4'
OUT = ROOT / 'out/phase4'
PLAN = json.loads((ROOT / 'src/rough-cut-plan.json').read_text())
OUT.mkdir(parents=True, exist_ok=True)
if not VIDEO.is_file() or VIDEO.stat().st_size == 0:
    raise SystemExit('Missing or empty rough-cut export')
probe = subprocess.run(['ffprobe', '-v', 'error', '-count_frames', '-show_streams', '-show_format', '-of', 'json', str(VIDEO)], capture_output=True, text=True, check=True)
if probe.stderr.strip():
    raise RuntimeError(probe.stderr)
metadata = json.loads(probe.stdout)
(OUT / 'export-metadata.json').write_text(json.dumps(metadata, indent=2) + '\n')
video = next(s for s in metadata['streams'] if s['codec_type'] == 'video')
audio = next(s for s in metadata['streams'] if s['codec_type'] == 'audio')
assert video['width'] == 1080 and video['height'] == 1920
assert video['codec_name'] == 'h264' and video['pix_fmt'] == 'yuv420p'
assert video['avg_frame_rate'] == '30/1'
assert int(video['nb_read_frames']) == PLAN['durationFrames'] == 2325
assert abs(float(video['duration']) - 77.5) < 1 / 30
assert audio['codec_name'] == 'aac' and int(audio['channels']) == 2
assert abs(float(audio['duration']) - 77.5) < .08
scan = subprocess.run(['ffmpeg', '-hide_banner', '-nostdin', '-xerror', '-i', str(VIDEO), '-map', '0:v:0', '-map', '0:a:0', '-vf', 'blackdetect=d=0.01:pix_th=0.02:pic_th=0.98', '-af', 'silencedetect=noise=-60dB:d=0.15,volumedetect', '-f', 'null', '-'], capture_output=True, text=True)
(OUT / 'full-export-scan.log').write_text(scan.stderr)
if scan.returncode:
    raise RuntimeError('Complete audio/video decode failed: ' + scan.stderr[-4000:])
black = [line.strip() for line in scan.stderr.splitlines() if 'black_start:' in line]
silent = [line.strip() for line in scan.stderr.splitlines() if 'silence_start:' in line or 'silence_end:' in line]
mean = re.search(r'mean_volume: ([-\d.]+) dB', scan.stderr)
peak = re.search(r'max_volume: ([-\d.]+) dB', scan.stderr)
assert mean is not None and float(mean.group(1)) > -45, 'Export audio absent or effectively silent'
result = {'file': str(VIDEO.relative_to(ROOT)), 'bytes': VIDEO.stat().st_size, 'videoFramesDecoded': int(video['nb_read_frames']), 'width': 1080, 'height': 1920, 'fps': 30, 'videoDuration': float(video['duration']), 'audioDuration': float(audio['duration']), 'videoCodec': video['codec_name'], 'audioCodec': audio['codec_name'], 'audioChannels': audio['channels'], 'fullAudioVideoDecode': 'passed', 'audioMeanDbfs': float(mean.group(1)), 'audioPeakDbfs': float(peak.group(1)) if peak else None, 'blackIntervals': black, 'silenceIntervals': silent, 'semanticAudioReview': 'No lyric, song, drop or beat-synchronization claim; source audio only.'}
(OUT / 'verification.json').write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps(result, indent=2))
if black:
    raise SystemExit('Black-frame candidates detected; inspect and resolve before delivery.')
if silent:
    raise SystemExit('Audio silence candidates detected; inspect before delivery.')
