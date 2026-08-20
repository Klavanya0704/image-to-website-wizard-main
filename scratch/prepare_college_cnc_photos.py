import urllib.request
import os
from PIL import Image

new_urls = {
    # 1. CNC Router Wooden Relief Art (Topographic landscape relief / carved 3D wood sculpture)
    "cnc-wooden-relief-art.jpg": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=85",
    
    # 2. CNC Machined Linear Shaft (Precision ground steel drive shaft with keyway)
    "cnc-machined-linear-shaft.jpg": "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1200&auto=format&fit=crop&q=85",
    
    # 3. CNC Machined Prototype Component (Multi-axis milled billet aluminum mechanical robotic prototype part)
    "cnc-machined-prototype-component.jpg": "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&auto=format&fit=crop&q=85",
    
    # 4. CNC Metal Spacer & Bushing Set (Precision turned brass & aluminum standoff hardware spacers)
    "cnc-metal-spacer-bushing-set.jpg": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=1200&auto=format&fit=crop&q=85"
}

headers = {'User-Agent': 'Mozilla/5.0'}

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

for fname, url in new_urls.items():
    scratch_dest = os.path.join("scratch", fname)
    public_dest = os.path.join("public/products", fname)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp, open(scratch_dest, 'wb') as out:
            out.write(resp.read())
        crop_to_square(scratch_dest, public_dest)
    except Exception as e:
        print(f"Error {fname}: {e}")

print("New CNC lab product photos ready.")
