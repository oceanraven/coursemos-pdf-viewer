#!/usr/bin/env python3
"""Render the geometric SVG icon design as antialiased PNGs (requires Pillow)."""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SCALE = 8
image = Image.new('RGBA', (128 * SCALE, 128 * SCALE), (0, 0, 0, 0))
draw = ImageDraw.Draw(image)
INK = '#20201e'

def box(bounds, fill):
    draw.rectangle(tuple(n * SCALE for n in bounds), fill=fill)

def line(points):
    draw.line([(x * SCALE, y * SCALE) for x, y in points], fill=INK, width=6*SCALE)

# Six-pixel, square-edged outlines match the popup's flat visual language.
box((20,16,88,112), INK)
box((26,22,82,106), '#f7f7f2')
line([(37,74),(69,74)])
line([(37,89),(59,89)])
box((56,16,112,72), INK)
box((62,22,106,66), '#dfff70')
# Square arrow ends and joins, without a rounded badge or dark backdrop.
line([(73,55),(95,33)])
line([(77,33),(95,33),(95,51)])
box((74,30,98,36), INK)
box((92,30,98,54), INK)
for size in (16,32,48,128):
    image.resize((size,size), Image.Resampling.LANCZOS).save(ROOT / 'icons' / f'icon{size}.png')
print('Generated 16, 32, 48, and 128 px PNG icons.')
