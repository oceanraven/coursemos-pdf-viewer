#!/usr/bin/env python3
"""Render the geometric SVG icon design as antialiased PNGs (requires Pillow)."""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SCALE = 8
image = Image.new('RGBA', (128 * SCALE, 128 * SCALE), (0, 0, 0, 0))
draw = ImageDraw.Draw(image)
def polygon(points, color):
    draw.polygon([(x * SCALE, y * SCALE) for x, y in points], fill=color)
polygon([(16,16),(112,16),(112,112),(16,112)], '#20201e')
polygon([(36,32),(66,32),(80,46),(80,96),(36,96)], '#f7f7f2')
for y in (65,77):
    draw.line([(48*SCALE,y*SCALE),(66*SCALE,y*SCALE)], fill='#20201e', width=5*SCALE)
polygon([(67,28),(100,28),(100,61),(88,61),(88,49),(71,66),(62,57),(79,40),(67,40)], '#dfff70')
for size in (16,32,48,128):
    image.resize((size,size), Image.Resampling.LANCZOS).save(ROOT / 'icons' / f'icon{size}.png')
print('Generated 16, 32, 48, and 128 px PNG icons.')
