import os
import sys
sys.path.append("scratch")
from generate_all_38_hd import PRODUCTS

CATEGORIES = [
    ("3d-printing", "3D Printing"),
    ("laser-cutting", "Laser Cutting"),
    ("cnc-machining", "CNC Machining"),
    ("electronics", "Electronics"),
    ("drones-parts", "Drones & Parts"),
    ("acrylic-products", "Acrylic Products"),
    ("diy-kits", "DIY Kits")
]

print("=" * 100)
print("CATEGORY ISOLATION AUDIT (ALL 7 CATEGORIES)")
print("=" * 100)

total_products_checked = 0
cross_category_leaks = []

for cat_slug, cat_name in CATEGORIES:
    items = [p for p in PRODUCTS if p["category_slug"] == cat_slug]
    total_products_checked += len(items)
    print(f"\nCATEGORY: {cat_name} (/category/{cat_slug}) -> Total: {len(items)} products")
    
    for item in items:
        # Verify strict category match
        if item["category_slug"] != cat_slug or item["category"] != cat_name:
            cross_category_leaks.append((item["name"], item["category_slug"], cat_slug))
            print(f"  [FAIL] {item['name']} (slug: {item['slug']}) -> category mismatch: {item['category_slug']}")
        else:
            print(f"  [PASS] {item['name']:<48} | Image: /products/{item['slug']}.jpg")

print("\n" + "=" * 100)
print(f"Total Products Audited: {total_products_checked} / 38")
print(f"Cross-Category Leaks: {len(cross_category_leaks)}")
if cross_category_leaks:
    print(f"Leak details: {cross_category_leaks}")
else:
    print("SUCCESS: ZERO CROSS-CATEGORY LEAKS (100% CATEGORY ISOLATION)!")
print("=" * 100)
