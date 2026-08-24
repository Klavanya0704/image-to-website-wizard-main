import os
import json
from PIL import Image, ImageDraw, ImageFont

v4_dir = r"public\products\v4"

with open(r"scratch\catalog_84_data.json", "r", encoding="utf-8") as f:
    CATALOG_84 = json.load(f)

cols = 7
rows = (len(CATALOG_84) + cols - 1) // cols
cell_w, cell_h = 320, 370
sheet_w = cols * cell_w
sheet_h = rows * cell_h

contact_sheet = Image.new("RGB", (sheet_w, sheet_h), (255, 255, 255))
draw = ImageDraw.Draw(contact_sheet)

print("Generating Contact Sheet for all 84 products from public/products/v4/...")

for idx, p in enumerate(CATALOG_84):
    col = idx % cols
    row = idx // cols
    x = col * cell_w
    y = row * cell_h
    
    img_path = os.path.join(v4_dir, f"{p['slug']}.jpg")
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
    if len(title) > 30:
        title = title[:28] + "..."
    draw.text((x + 12, y + 318), f"#{idx+1:02d} {title}", fill=(20, 25, 35))
    draw.text((x + 12, y + 342), f"[{p['category']}]", fill=(90, 100, 125))

contact_sheet_path = r"scratch\catalog_84_contact_sheet.png"
contact_sheet.save(contact_sheet_path, "PNG")
print(f"Contact sheet saved to {contact_sheet_path} ({os.path.getsize(contact_sheet_path)} bytes)")
