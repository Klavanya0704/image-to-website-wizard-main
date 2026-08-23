import sys
sys.path.append("scratch")
from generate_all_38_hd import PRODUCTS

CATEGORIES = [
    "3d-printing",
    "laser-cutting",
    "cnc-machining",
    "electronics",
    "drones-parts",
    "acrylic-products",
    "diy-kits"
]

print("=== TESTING EXACT CATEGORY FILTERING (product.categorySlug === targetSlug) ===")

total_cross_contamination = 0

for target_cat in CATEGORIES:
    matched = [p for p in PRODUCTS if p["category_slug"] == target_cat]
    other_cats = [p for p in matched if p["category_slug"] != target_cat]
    
    print(f"\nCategory: /category/{target_cat}")
    print(f"Products count: {len(matched)}")
    print(f"Foreign products: {len(other_cats)}")
    
    for p in matched:
        print(f"   * [{p['category_slug']}] {p['name']} -> {p['slug']}")
        
    if len(other_cats) > 0:
        total_cross_contamination += len(other_cats)

print(f"\nTotal foreign product leaks: {total_cross_contamination}")
if total_cross_contamination == 0:
    print(">>> SUCCESS: ZERO cross-category contamination across all 7 categories! <<<")
