#!/usr/bin/env python3
"""Download the 13 unique rough-cut sources, using only exact manifest URLs."""
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main():
    plan = json.loads((ROOT / 'src/rough-cut-plan.json').read_text())
    objects = json.loads((ROOT / 'concert-manifest.json').read_text())['objects']
    inventory = {item['key']: item for item in objects}
    if len(inventory) != len(objects):
        raise RuntimeError('Duplicate manifest object keys')
    selected = {}
    for shot in plan['shots']:
        item = inventory[shot['objectKey']]
        if item['filename'] != shot['filename'] or item['url'] != shot['publicUrl']:
            raise RuntimeError(f'Manifest mismatch for {shot["id"]}')
        if Path(item['filename']).name != item['filename']:
            raise RuntimeError('Source filename must not contain a directory')
        selected[item['key']] = item
    directory = ROOT / 'out/phase3/media'
    directory.mkdir(parents=True, exist_ok=True)
    for item in selected.values():
        target = directory / item['filename']
        if target.is_file() and target.stat().st_size > 0:
            print(f'Already present: {item["filename"]}', flush=True)
            continue
        partial = target.with_suffix(target.suffix + '.part')
        subprocess.run(['curl', '--fail', '--silent', '--show-error', '--location',
                        '--connect-timeout', '20', '--max-time', '900', '--retry', '2',
                        '--output', str(partial), item['url']], check=True)
        if partial.stat().st_size == 0:
            raise RuntimeError(f'Empty download: {item["filename"]}')
        # Reject incomplete or invalid media before publishing the local source.
        subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                        '-of', 'json', str(partial)], check=True, stdout=subprocess.DEVNULL)
        partial.replace(target)
        print(f'Downloaded: {item["filename"]} ({target.stat().st_size} bytes)', flush=True)
    print(f'Ready: {len(selected)} unique original recordings. No S3 credentials required.')


if __name__ == '__main__':
    main()
