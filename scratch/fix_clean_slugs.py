import re

with open("src/lib/catalog.ts", "r", encoding="utf-8") as f:
    code = f.read()

# Match each product block individually
def fix_block(match):
    block = match.group(0)
    slug_match = re.search(r'\n\s*slug:\s*"([^"]+)"', block)
    name_match = re.search(r'\n\s*name:\s*"([^"]+)"', block)
    if slug_match and name_match:
        slug = slug_match.group(1)
        name = name_match.group(1)
        
        # Replace image line with exact matching slug
        block = re.sub(r'\n\s*image:\s*"[^"]*",', f'\n    image: "/products/{slug}.jpg",', block)
        block = re.sub(r'\n\s*image_key:\s*"[^"]*",', f'\n    image_key: "{slug}",', block)
        
    return block

# Find each product object
pattern = r'\{\s*id:\s*"[^"]+",[\s\S]*?created_at:\s*"[^"]+",\s*\}'
fixed_code = re.sub(pattern, fix_block, code)

with open("src/lib/catalog.ts", "w", encoding="utf-8") as f:
    f.write(fixed_code)

print("catalog.ts successfully corrected!")
