import urllib.request
import urllib.parse
import os
import time
from PIL import Image

p = {
    "slug": "geometric-spiral-vase",
    "title": "3D Printed Geometric Vase",
    "prompt": "Studio product photograph of an empty modern 3D printed spiral twist geometric faceted vase in matte white PLA filament, hollow open top, isolated standing on pure white studio background, sharp focus, 8k",
    "seed": 987
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
fname = f"{p['slug']}.jpg"
target_path = os.path.join("public/products", fname)
encoded = urllib.parse.quote(p['prompt'])
url = f"https://image.pollinations.ai/prompt/{encoded}?width=1024&height=1024&nologo=true&seed={p['seed']}&model=flux"

print("Generating empty spiral geometric vase...")
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, timeout=60) as resp, open(target_path, 'wb') as out:
    out.write(resp.read())

im = Image.open(target_path)
im = im.convert("RGB")
if im.size != (1024, 1024):
    im = im.resize((1024, 1024), Image.Resampling.LANCZOS)
im.save(target_path, "JPEG", quality=95)
print(f"Saved: {target_path} ({os.path.getsize(target_path)} bytes)")
