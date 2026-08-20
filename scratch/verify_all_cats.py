import os
import re

with open("src/lib/catalog.ts", "r", encoding="utf-8") as f:
    content = f.read()

pattern = r'\{\s*id:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)",[\s\S]*?slug:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",[\s\S]*?image:\s*"([^"]+)",'
matches = re.findall(pattern, content)

print(f"=== VERIFYING ALL {len(matches)} PRODUCTS ACROSS ALL CATEGORIES ===")
all_exist = True
seen_images = {}

for pid, name, slug, cat, img in matches:
    local_path = "public" + img
    exists = os.path.exists(local_path)
    size = os.path.getsize(local_path) if exists else 0
    if not exists or size < 1000:
        all_exist = False
        print(f"[FAIL] {cat} -> '{name}' ({img}): NOT FOUND OR CORRUPT")
    else:
        seen_images.setdefault(img, []).append(f"[{cat}] {name}")

print(f"All images present on disk: {all_exist}")
print(f"Unique product images count: {len(seen_images)}")
for img, prods in seen_images.items():
    if len(prods) > 1:
        print(f"[WARNING: SHARED IMAGE] {img}: {prods}")
    else:
        print(f"✓ {prods[0]} -> {img}")
