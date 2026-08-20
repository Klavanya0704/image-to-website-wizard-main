import os
import re
from PIL import Image

# 1. Resize any <1024 images to exactly 1024x1024 with high quality LANCZOS
prod_dir = "public/products"
for fname in os.listdir(prod_dir):
    if fname.endswith(".jpg") or fname.endswith(".jpeg"):
        fpath = os.path.join(prod_dir, fname)
        try:
            im = Image.open(fpath)
            w, h = im.size
            if w < 1024 or h < 1024:
                im = im.convert("RGB")
                im = im.resize((1024, 1024), Image.Resampling.LANCZOS)
                im.save(fpath, "JPEG", quality=95)
                print(f"Upscaled {fname} from {w}x{h} to 1024x1024")
        except Exception as e:
            print(f"Error processing {fname}: {e}")

# 2. Fix catalog.ts so each product's image strictly matches its OWN slug
with open("src/lib/catalog.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

updated_lines = []
current_slug = None

for line in lines:
    slug_match = re.search(r'slug:\s*"([^"]+)"', line)
    if slug_match:
        current_slug = slug_match.group(1)
    
    if "image:" in line and current_slug:
        # Replace image line with exact matching slug image
        line = re.sub(r'image:\s*"[^"]*",', f'image: "/products/{current_slug}.jpg",', line)
    
    if "image_key:" in line and current_slug:
        line = re.sub(r'image_key:\s*"[^"]*",', f'image_key: "{current_slug}",', line)
        
    updated_lines.append(line)

with open("src/lib/catalog.ts", "w", encoding="utf-8") as f:
    f.writelines(updated_lines)

print("catalog.ts successfully synchronized with exact 1-to-1 slug images!")
