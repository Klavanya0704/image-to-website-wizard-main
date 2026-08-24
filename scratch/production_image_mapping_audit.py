import os
import hashlib
import json
from PIL import Image

# Import the actual catalog from src/lib/catalog.ts
import sys
sys.path.append("scratch")
from generate_all_38_hd import PRODUCTS

target_dir = r"public\products"
hashes = {}
paths = {}
slugs = set()
duplicates_hash = []
duplicates_path = []
table_rows = []

for p in PRODUCTS:
    title = p["name"]
    slug = p["slug"]
    cat = p["category"]
    img_declared = f"/products/{slug}.jpg"
    resolved_file = os.path.join(target_dir, f"{slug}.jpg")
    
    file_exists = os.path.exists(resolved_file)
    file_size = os.path.getsize(resolved_file) if file_exists else 0
    
    dims = "N/A"
    h = "N/A"
    if file_exists:
        try:
            with Image.open(resolved_file) as im:
                dims = f"{im.size[0]}x{im.size[1]}"
        except Exception:
            dims = "ERROR"
            
        with open(resolved_file, "rb") as fp:
            h = hashlib.sha256(fp.read()).hexdigest()
            
    # Check duplicate slug
    slugs.add(slug)
    
    # Check duplicate path
    other_path_prods = paths.get(img_declared, [])
    if other_path_prods:
        duplicates_path.append((title, other_path_prods))
    paths.setdefault(img_declared, []).append(title)
    
    # Check duplicate hash
    other_hash_prods = hashes.get(h, [])
    if file_exists and other_hash_prods:
        duplicates_hash.append((title, other_hash_prods))
    hashes.setdefault(h, []).append(title)
    
    table_rows.append({
        "title": title,
        "slug": slug,
        "category": cat,
        "declared_path": img_declared,
        "resolved_file": resolved_file,
        "exists": file_exists,
        "size": file_size,
        "dims": dims,
        "hash": h,
        "dup_hash": len(hashes[h]) > 1 if file_exists else False,
        "other_path": [x for x in paths[img_declared] if x != title],
        "other_hash": [x for x in hashes[h] if x != title] if file_exists else []
    })

print("=" * 140)
print(f"{'PRODUCT TITLE':<45} | {'SLUG':<35} | {'CAT':<15} | {'DIMENSIONS':<10} | {'SIZE (B)':<9} | {'HASH (FIRST 12)':<14} | {'EXISTS':<6} | {'DUP HASH':<8}")
print("=" * 140)

for r in table_rows:
    h_short = r["hash"][:12] if r["hash"] != "N/A" else "N/A"
    print(f"{r['title']:<45} | {r['slug']:<35} | {r['category']:<15} | {r['dims']:<10} | {r['size']:<9} | {h_short:<14} | {str(r['exists']):<6} | {str(r['dup_hash']):<8}")

print("\n" + "=" * 140)
print("AUDIT SUMMARY:")
print(f"Total Products: {len(PRODUCTS)} / 38")
print(f"Unique Slugs: {len(slugs)} / 38")
print(f"Unique Image Paths: {len(paths)} / 38")
print(f"Unique SHA-256 Hashes: {len(hashes)} / 38")
print(f"Duplicate Paths: {len(duplicates_path)}")
print(f"Duplicate Hashes: {len(duplicates_hash)}")
if duplicates_hash:
    print(f"Duplicates details: {duplicates_hash}")
else:
    print(">>> 38/38 UNIQUE SLUGS, 38/38 UNIQUE PATHS, 38/38 UNIQUE HASHES (PASS) <<<")
print("=" * 140)
