import re
import os
import hashlib

with open("src/lib/catalog.ts", "r", encoding="utf-8") as f:
    text = f.read()

start_str = "export const DEFAULT_CATALOG_PRODUCTS: Product[] = ["
start = text.find(start_str)
end = text.find("];", start)
catalog_text = text[start:end]

blocks = catalog_text.split("{\n    id:")

products = []
for b in blocks[1:]:
    name = re.search(r'name:\s*"([^"]+)"', b)
    slug = re.search(r'slug:\s*"([^"]+)"', b)
    cat = re.search(r'category:\s*"([^"]+)"', b)
    img = re.search(r'image:\s*"([^"]+)"', b)
    img_key = re.search(r'image_key:\s*"([^"]+)"', b)
    
    if name and slug and img:
        products.append({
            "name": name.group(1),
            "slug": slug.group(1),
            "category": cat.group(1) if cat else "",
            "image": img.group(1),
            "image_key": img_key.group(1) if img_key else ""
        })

print(f"Total products found: {len(products)}")

# Check duplicate image paths
image_counts = {}
for p in products:
    img = p["image"]
    image_counts.setdefault(img, []).append(f"[{p['category']}] {p['name']} (slug: {p['slug']})")

print("\n--- CHECKING DUPLICATE IMAGE PATHS ---")
dup_paths = 0
for img, items in image_counts.items():
    if len(items) > 1:
        print(f"[DUPLICATE PATH] {img} used by {len(items)} products:")
        for it in items:
            print(f"   * {it}")
        dup_paths += 1
    else:
        print(f"[UNIQUE PATH] {img} -> {items[0]}")

# Check duplicate file hashes
print("\n--- CHECKING DUPLICATE FILE CONTENT HASHES ---")
hash_counts = {}
for p in products:
    fpath = "public" + p["image"]
    if os.path.exists(fpath):
        with open(fpath, "rb") as f:
            h = hashlib.md5(f.read()).hexdigest()
        hash_counts.setdefault(h, []).append((p["image"], p["name"]))
    else:
        print(f"[MISSING FILE] {fpath}")

dup_hashes = 0
for h, items in hash_counts.items():
    if len(items) > 1:
        print(f"[DUPLICATE FILE CONTENT] hash {h} shared by:")
        for img, name in items:
            print(f"   * {name} ({img})")
        dup_hashes += 1

print(f"\nSummary: Total products={len(products)}, Duplicate paths={dup_paths}, Duplicate hashes={dup_hashes}")
