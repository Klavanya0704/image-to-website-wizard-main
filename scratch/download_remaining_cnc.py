import urllib.request
import os
from PIL import Image

def crop_to_square(src_path, dest_path, size=1024):
    im = Image.open(src_path)
    w, h = im.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    right = left + min_dim
    bottom = top + min_dim
    cropped = im.crop((left, top, right, bottom))
    resized = cropped.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(dest_path, "JPEG", quality=92)
    print(f"Cropped & saved {dest_path} ({resized.size})")

urls = {
    # 3D relief art / sculpted wood panel
    "cnc-wooden-relief-art.jpg": "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1200&auto=format&fit=crop&q=85",
    
    # Linear metal drive shaft
    "cnc-machined-linear-shaft.jpg": "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&auto=format&fit=crop&q=85"
}

headers = {'User-Agent': 'Mozilla/5.0'}

for fname, url in urls.items():
    scratch_dest = os.path.join("scratch", fname)
    public_dest = os.path.join("public/products", fname)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp, open(scratch_dest, 'wb') as out:
            out.write(resp.read())
        crop_to_square(scratch_dest, public_dest)
    except Exception as e:
        print(f"Error {fname}: {e}")
