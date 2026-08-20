with open("src/lib/catalog.ts", "r", encoding="utf-8") as f:
    code = f.read()

# Replace any image_key: "..." with image: "/products/<slug>.jpg", image_key: "<slug>"
# Let's do a regex pass for each product block
import re

def update_product_block(match):
    block = match.group(0)
    slug_m = re.search(r'slug:\s*"([^"]+)"', block)
    name_m = re.search(r'name:\s*"([^"]+)"', block)
    if slug_m and name_m:
        slug = slug_m.group(1)
        name = name_m.group(1)
        
        # Add title if not present
        if 'title:' not in block:
            block = block.replace(f'name: "{name}",', f'name: "{name}",\n    title: "{name}",')
        
        # Ensure image is set to /products/<slug>.jpg
        img_path = f"/products/{slug}.jpg"
        if 'image:' in block:
            block = re.sub(r'image:\s*"[^"]*",', f'image: "{img_path}",', block)
        else:
            block = block.replace(f'slug: "{slug}",', f'slug: "{slug}",\n    image: "{img_path}",')
        
        # Ensure image_key is set to slug
        block = re.sub(r'image_key:\s*"[^"]*",', f'image_key: "{slug}",', block)
        
    return block

# Find DEFAULT_CATALOG_PRODUCTS block
pattern = r'\{\s*id:\s*"[^"]+",[\s\S]*?created_at:\s*"[^"]+",\s*\}'
updated_code = re.sub(pattern, update_product_block, code)

with open("src/lib/catalog.ts", "w", encoding="utf-8") as f:
    f.write(updated_code)

print("catalog.ts updated successfully with explicit image paths and titles for all products!")
