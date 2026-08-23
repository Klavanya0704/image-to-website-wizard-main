import os
import hashlib
from PIL import Image
import sys
sys.path.append("scratch")
from generate_all_38_hd import PRODUCTS

print(f"=== FULL AUDIT OF ALL {len(PRODUCTS)} PRODUCTS ===")

titles = set()
slugs = set()
images = set()
hashes = {}
categories = {}

errors = 0

for p in PRODUCTS:
    title = p["name"]
    slug = p["slug"]
    cat = p["category"]
    img_path = f"/products/{slug}.jpg"
    local_file = "public" + img_path
    
    # 1. Check title uniqueness
    if title in titles:
        print(f"[FAIL: DUPLICATE TITLE] '{title}'")
        errors += 1
    titles.add(title)
    
    # 2. Check slug uniqueness
    if slug in slugs:
        print(f"[FAIL: DUPLICATE SLUG] '{slug}'")
        errors += 1
    slugs.add(slug)
    
    # 3. Check image path uniqueness
    if img_path in images:
        print(f"[FAIL: DUPLICATE IMAGE PATH] '{img_path}'")
        errors += 1
    images.add(img_path)
    
    # 4. Check image file on disk
    if not os.path.exists(local_file):
        print(f"[FAIL: MISSING FILE] {local_file}")
        errors += 1
        continue
        
    size = os.path.getsize(local_file)
    if size < 20000:
        print(f"[FAIL: FILE TOO SMALL] {local_file} ({size} bytes)")
        errors += 1
        
    # Check dimensions
    im = Image.open(local_file)
    w, h = im.size
    if w < 1024 or h < 1024:
        print(f"[FAIL: LOW RESOLUTION] {local_file} ({w}x{h})")
        errors += 1
        
    # Check binary hash
    with open(local_file, "rb") as f:
        file_hash = hashlib.md5(f.read()).hexdigest()
        
    if file_hash in hashes:
        print(f"[FAIL: DUPLICATE FILE CONTENT] '{title}' shares identical image bytes with '{hashes[file_hash]}'")
        errors += 1
    hashes[file_hash] = title
    
    categories.setdefault(cat, []).append(title)

print("\n--- CATEGORY BREAKDOWN ---")
for cat, items in categories.items():
    print(f"[{cat}] ({len(items)} products):")
    for item in items:
        print(f"   * {item}")

print("\n--- AUDIT SUMMARY ---")
print(f"Total Products: {len(PRODUCTS)}")
print(f"Total Unique Titles: {len(titles)}")
print(f"Total Unique Slugs: {len(slugs)}")
print(f"Total Unique Images: {len(images)}")
print(f"Total Unique Binary Hashes: {len(hashes)}")
print(f"Total Errors Found: {errors}")

if errors == 0:
    print("\n>>> ALL VERIFICATION CHECKS PASSED: 100% UNIQUE TITLES, UNIQUE SLUGS, UNIQUE 1024x1024 HD IMAGES, ZERO DUPLICATES! <<<")
