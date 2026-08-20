import re

with open("src/lib/catalog.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Extract DEFAULT_CATALOG_PRODUCTS array
start_idx = content.find("export const DEFAULT_CATALOG_PRODUCTS: Product[] = [")
if start_idx == -1:
    start_idx = content.find("export const DEFAULT_CATALOG_PRODUCTS = [")

end_idx = content.find("];", start_idx)
catalog_str = content[start_idx:end_idx]

# Find product blocks
products = []
raw_blocks = catalog_str.split("{\n    id:")

for block in raw_blocks[1:]:
    id_m = re.search(r'id:\s*"([^"]+)"', "id:" + block)
    name_m = re.search(r'name:\s*"([^"]+)"', block)
    slug_m = re.search(r'slug:\s*"([^"]+)"', block)
    cat_m = re.search(r'category:\s*"([^"]+)"', block)
    cat_slug_m = re.search(r'categorySlug:\s*"([^"]+)"', block)
    
    if name_m and slug_m and cat_m:
        products.append({
            "id": id_m.group(1) if id_m else "",
            "name": name_m.group(1),
            "slug": slug_m.group(1),
            "category": cat_m.group(1),
            "categorySlug": cat_slug_m.group(1) if cat_slug_m else ""
        })

print(f"Total products found: {len(products)}")
by_cat = {}
for p in products:
    cat = p["category"]
    by_cat.setdefault(cat, []).append(p)

for cat, items in by_cat.items():
    print(f"\n--- Category: {cat} ({len(items)} items) ---")
    for item in items:
        print(f"  * [{item['slug']}] \"{item['name']}\"")
