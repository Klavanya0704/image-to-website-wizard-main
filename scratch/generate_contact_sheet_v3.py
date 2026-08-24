import os
from PIL import Image, ImageDraw, ImageFont

v3_dir = r"public\products\v3"

import sys
sys.path.append("scratch")
from generate_all_38_hd import PRODUCTS

cols = 6
rows = (len(PRODUCTS) + cols - 1) // cols
cell_w, cell_h = 320, 370
sheet_w = cols * cell_w
sheet_h = rows * cell_h

contact_sheet = Image.new("RGB", (sheet_w, sheet_h), (255, 255, 255))
draw = ImageDraw.Draw(contact_sheet)

print("Generating Contact Sheet v3 for all 38 products from public/products/v3/...")

for idx, p in enumerate(PRODUCTS):
    col = idx % cols
    row = idx // cols
    x = col * cell_w
    y = row * cell_h
    
    img_path = os.path.join(v3_dir, f"{p['slug']}.jpg")
    if os.path.exists(img_path):
        with Image.open(img_path) as thumb:
            thumb = thumb.resize((300, 300), Image.Resampling.LANCZOS)
            contact_sheet.paste(thumb, (x + 10, y + 10))
    else:
        print(f"MISSING: {img_path}")
            
    # Draw border & title label
    draw.rectangle([x + 8, y + 8, x + cell_w - 8, y + cell_h - 8], outline=(220, 225, 235), width=2)
    # Truncate title if too long
    title = p['name']
    if len(title) > 32:
        title = title[:30] + "..."
    draw.text((x + 12, y + 318), f"#{idx+1} {title}", fill=(20, 25, 35))
    draw.text((x + 12, y + 342), f"[{p['category']}]", fill=(100, 110, 130))

contact_sheet_path = r"scratch\generated_catalog_contact_sheet_v3.png"
contact_sheet.save(contact_sheet_path, "PNG")
print(f"Contact sheet saved to {contact_sheet_path} ({os.path.getsize(contact_sheet_path)} bytes)")
