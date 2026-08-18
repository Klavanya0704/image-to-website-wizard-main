import re
import os

# Read EXACT_SLUG_IMAGE_MAP from product-images.ts
with open('src/lib/product-images.ts', 'r', encoding='utf-8') as f:
    code = f.read()

# Verify all products in catalog.ts
with open('src/lib/catalog.ts', 'r', encoding='utf-8') as f:
    cat = f.read()

pattern = r'id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*category:\s*"([^"]+)"'
products = re.findall(pattern, cat)

public_dir = r"public/products"

print(f"Auditing {len(products)} products from catalog.ts:\n")
all_good = True
for pid, name, slug, category in products:
    target_img = os.path.join(public_dir, f"{slug}.jpg")
    exists = os.path.exists(target_img)
    print(f"[{category:16}] {name:50} -> /products/{slug}.jpg (Exists: {exists})")
    if not exists:
        all_good = False

print(f"\nAudit Passed: {all_good}")
