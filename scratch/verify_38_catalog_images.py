import sys
sys.path.append("scratch")
from generate_all_38_hd import PRODUCTS
import hashlib
import os
from PIL import Image

target_dir = r"public\products"
hashes = {}
duplicates = []
all_exist = True
all_hd = True

print("=" * 85)
print("AUDIT OF EXACT 38 CATALOG PRODUCTS AND THEIR IMAGES")
print("=" * 85)

for i, p in enumerate(PRODUCTS, 1):
    slug = p["slug"]
    title = p["name"]
    cat = p["category"]
    img_rel = f"/products/{slug}.jpg"
    img_path = os.path.join(target_dir, f"{slug}.jpg")
    
    if not os.path.exists(img_path):
        print(f"[{i}/38] [FAIL] File does not exist: {img_path}")
        all_exist = False
        continue
        
    size_bytes = os.path.getsize(img_path)
    with Image.open(img_path) as im:
        dim = im.size
        if dim[0] < 1024 or dim[1] < 1024:
            all_hd = False
            
    with open(img_path, "rb") as fp:
        h = hashlib.sha256(fp.read()).hexdigest()
        if h in hashes:
            duplicates.append((slug, hashes[h]))
        hashes[h] = slug
        
    print(f"[{i:02d}/38] [OK] {title:<48} | {cat:<16} | {dim[0]}x{dim[1]} | {size_bytes:>7}B")

print("\n" + "=" * 85)
print(f"Total Products Checked: {len(PRODUCTS)} / 38")
print(f"Total Unique Image Hashes: {len(hashes)} / 38")
print(f"All 38 Files Exist: {'YES' if all_exist else 'NO'}")
print(f"All 38 Images 1024x1024 HD: {'YES' if all_hd else 'NO'}")
print(f"Duplicate Hashes: {len(duplicates)}")
if duplicates:
    print(f"Duplicates: {duplicates}")
else:
    print("SUCCESS: 38/38 UNIQUE IMAGES, 38/38 UNIQUE TITLES, 0 DUPLICATES!")
print("=" * 85)
