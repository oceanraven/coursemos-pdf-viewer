#!/usr/bin/env python3
"""Build clean GitHub source and unpacked-extension release ZIPs."""
import json
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parent.parent
manifest = json.loads((ROOT / 'manifest.json').read_text())
version = manifest['version']
name = f'open-edx-pdf-viewer-v{version}'
runtime = ['manifest.json', 'background.js', 'content.js', 'popup.html', 'popup.css', 'popup.js']
source = runtime + ['README.md', 'RELEASE_NOTES.md', '.gitignore', 'scripts/package.py']
assert f'v{version}' in (ROOT / 'popup.html').read_text(), 'Popup version does not match manifest'
assert f'# v{version}' in (ROOT / 'RELEASE_NOTES.md').read_text(), 'Release notes version does not match manifest'
for filename in source:
    assert (ROOT / filename).is_file(), f'Missing file: {filename}'
assert manifest['background']['service_worker'] in runtime
assert manifest['action']['default_popup'] in runtime
out = ROOT / 'dist'
out.mkdir(exist_ok=True)
for suffix, files, prefix in [('', runtime, ''), ('-source', source, f'{name}/')]:
    target = out / f'{name}{suffix}.zip'
    with ZipFile(target, 'w', ZIP_DEFLATED) as archive:
        for filename in files:
            archive.write(ROOT / filename, prefix + filename)
    with ZipFile(target) as archive:
        assert archive.testzip() is None
        assert set(archive.namelist()) == {prefix + filename for filename in files}
        packaged = json.loads(archive.read(prefix + 'manifest.json'))
        assert packaged['version'] == version
    print(f'Created and verified: {target.relative_to(ROOT)}')
