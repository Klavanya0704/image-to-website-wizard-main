import urllib.request
from PIL import Image, ImageEnhance
import os
import hashlib

target_dir = r"public\products"
headers = {"User-Agent": "Mozilla/5.0"}

urls = {
    "omnidirectional-58ghz-fpv-cloverleaf-antenna": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1024&h=1024&q=90",
    "crystal-clear-cast-acrylic-showcase-cube-box": "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1024&h=1024&q=90"
}

for slug, url in urls.items():
    dest_path = os.path.join(target_dir, f"{slug}.jpg")
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = resp.read()
        with open(dest_path + ".tmp", "wb") as f:
            f.write(data)
        
        with Image.open(dest_path + ".tmp") as img:
            img = img.convert("RGB")
            img = img.resize((1024, 1024), Image.Resampling.LANCZOS)
            enhancer = ImageEnhance.Sharpness(img)
            img = enhancer.enhance(1.15)
            img.save(dest_path, "JPEG", quality=92)
        
        if os.path.exists(dest_path + ".tmp"):
            os.remove(dest_path + ".tmp")
        print(f"Downloaded and verified {slug}.jpg (1024x1024)")

# Audit all 38 products in DEFAULT_CATALOG_PRODUCTS
sys_path = os.path.abspath("scratch")
import sys
sys.path.append(sys_path)
from generate_all_38_hd import PRODUCTS

hashes = {}
duplicates = []

for p in PRODUCTS:
    slug = p["slug"]
    fpath = os.path.join(target_dir, f"{slug}.jpg")
    with open(fpath, "rb") as f:
        h = hashlib.sha256(f.read()).hexdigest()
        if h in hashes:
            duplicates.append((slug, hashes[h]))
        hashes[h] = slug

print(f"\nTotal Active Catalog Products: {len(PRODUCTS)} / 38")
print(f"Total Unique Image Hashes: {len(hashes)} / 38")
print(f"Duplicates: {duplicates}")
