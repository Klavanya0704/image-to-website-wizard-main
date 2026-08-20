import os
import re

with open("src/lib/catalog.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Split into DEFAULT_CATALOG_PRODUCTS
start_str = "export const DEFAULT_CATALOG_PRODUCTS: Product[] = ["
start = text.find(start_str)
end = text.find("];", start)
catalog_text = text[start:end]

blocks = catalog_text.split("{\n    id:")

print(f"=== AUDITING ALL {len(blocks)-1} PRODUCTS IN CATALOG ===")

errors = 0
for idx, b in enumerate(blocks[1:]):
    name = re.search(r'name:\s*"([^"]+)"', b)
    slug = re.search(r'slug:\s*"([^"]+)"', b)
    cat = re.search(r'category:\s*"([^"]+)"', b)
    img = re.search(r'image:\s*"([^"]+)"', b)
    
    name_v = name.group(1) if name else "UNKNOWN"
    slug_v = slug.group(1) if slug else "UNKNOWN"
    cat_v = cat.group(1) if cat else "UNKNOWN"
    img_v = img.group(1) if img else "UNKNOWN"
    
    expected_img = f"/products/{slug_v}.jpg"
    local_path = "public" + img_v
    exists = os.path.exists(local_path)
    size = os.path.getsize(local_path) if exists else 0
    
    match_ok = (img_v == expected_img)
    
    if not exists:
        print(f"[FAIL: MISSING FILE] [{cat_v}] '{name_v}' ({slug_v}) -> {img_v}")
        errors += 1
    elif not match_ok:
        print(f"[FAIL: MISMATCH] [{cat_v}] '{name_v}' (slug={slug_v}) has image={img_v} instead of {expected_img}")
        errors += 1
    elif size < 20000:
        print(f"[FAIL: SMALL SIZE] [{cat_v}] '{name_v}' image {img_v} is only {size} bytes")
        errors += 1
    else:
        print(f"[OK] [{cat_v}] '{name_v}' -> {img_v} ({size} bytes)")

print(f"\nTotal Products: {len(blocks)-1}, Total Errors: {errors}")
