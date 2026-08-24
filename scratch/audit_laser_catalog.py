import os
import json
import hashlib

with open(r"scratch\full_catalog_with_onedrive_laser.json", "r", encoding="utf-8") as f:
    CATALOG = json.load(f)

print("=" * 100)
print("COMPREHENSIVE CATALOG AUDIT (LASER CUTTING ONEDRIVE INTEGRATION)")
print("=" * 100)

categories = {}
slugs = set()
titles = set()
image_paths = set()
hashes = {}
duplicate_hashes = []

for idx, p in enumerate(CATALOG):
    slug = p["slug"]
    title = p["title"]
    cat = p["categorySlug"]
    img_path = p["image"]
    local_file = os.path.join("public", img_path.lstrip("/").replace("/", os.sep))
    
    categories[cat] = categories.get(cat, 0) + 1
    slugs.add(slug)
    titles.add(title)
    image_paths.add(img_path)
    
    if not os.path.exists(local_file):
        print(f"[FAIL] Missing file: {local_file}")
        continue
        
    with open(local_file, "rb") as fp:
        h = hashlib.sha256(fp.read()).hexdigest()
        
    if h in hashes:
        duplicate_hashes.append((title, hashes[h]))
    hashes[h] = title
    
    if cat == "laser-cutting":
        print(f"[LASER CUTTING {categories[cat]:02d}/23] {title:<55} | {slug:<48} | {h[:10]}...")

print("\n" + "=" * 100)
print("CATEGORY COUNTS:")
for cat, count in sorted(categories.items()):
    print(f"  * {cat:<20}: {count} products")

print(f"\nTotal Catalog Products: {len(CATALOG)}")
print(f"Unique Slugs: {len(slugs)} / {len(CATALOG)}")
print(f"Unique Titles: {len(titles)} / {len(CATALOG)}")
print(f"Unique Image Paths: {len(image_paths)} / {len(CATALOG)}")
print(f"Unique Hashes: {len(hashes)} / {len(CATALOG)}")
print(f"Duplicate Hashes: {len(duplicate_hashes)}")

all_passed = (
    len(CATALOG) == 114 and
    categories.get("3d-printing") == 31 and
    categories.get("laser-cutting") == 23 and
    len(slugs) == 114 and
    len(titles) == 114 and
    len(image_paths) == 114 and
    len(hashes) == 114 and
    len(duplicate_hashes) == 0
)

print(f"OVERALL CATALOG AUDIT: {'PASS (100% VERIFIED)' if all_passed else 'FAIL'}")
print("=" * 100)
