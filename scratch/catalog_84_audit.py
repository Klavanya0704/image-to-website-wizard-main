import os
import json
import hashlib
from PIL import Image

with open(r"scratch\catalog_84_data.json", "r", encoding="utf-8") as f:
    CATALOG_84 = json.load(f)

v4_dir = r"public\products\v4"
category_counts = {}
slugs = set()
titles = set()
image_paths = set()
hashes = {}
duplicate_hashes = []

print("=" * 100)
print("CATALOG 84 COMPREHENSIVE AUDIT")
print("=" * 100)

for idx, p in enumerate(CATALOG_84):
    slug = p["slug"]
    title = p["name"]
    cat_slug = p["categorySlug"]
    img_path = p["image"]
    local_file = os.path.join(v4_dir, f"{slug}.jpg")
    
    # 1. Category Count
    category_counts[cat_slug] = category_counts.get(cat_slug, 0) + 1
    
    # 2. Slugs & Titles
    slugs.add(slug)
    titles.add(title)
    image_paths.add(img_path)
    
    # 3. File exists & Dimensions
    if not os.path.exists(local_file):
        print(f"[FAIL] Missing file: {local_file}")
        continue
        
    with Image.open(local_file) as im:
        dims = im.size
        
    with open(local_file, "rb") as fp:
        h = hashlib.sha256(fp.read()).hexdigest()
        
    if h in hashes:
        duplicate_hashes.append((title, hashes[h]))
    hashes[h] = title
    
    print(f"[{idx+1:02d}/84] [OK] {title:<48} | {cat_slug:<16} | {dims[0]}x{dims[1]} | {os.path.getsize(local_file):<7}B | {h[:10]}...")

print("\n" + "=" * 100)
print("CATEGORY DISTRIBUTION:")
for cat, count in category_counts.items():
    print(f"  * {cat:<20}: {count} products")

print("\nAUDIT METRICS:")
print(f"Total Products: {len(CATALOG_84)} / 84 (Target: 84)")
print(f"Unique Slugs: {len(slugs)} / 84")
print(f"Unique Titles: {len(titles)} / 84")
print(f"Unique Image Paths: {len(image_paths)} / 84")
print(f"Unique Hashes: {len(hashes)} / 84")
print(f"Duplicate Hashes: {len(duplicate_hashes)}")

all_passed = (
    len(CATALOG_84) == 84 and
    len(slugs) == 84 and
    len(titles) == 84 and
    len(image_paths) == 84 and
    len(hashes) == 84 and
    len(duplicate_hashes) == 0 and
    all(c == 12 for c in category_counts.values())
)

print(f"OVERALL 84-CATALOG AUDIT: {'PASS (100% COMPLETE)' if all_passed else 'FAIL'}")
print("=" * 100)
