import os
import json
from PIL import Image, ImageDraw, ImageFont

v5_dir = r"public\products\v5"
with open(r"scratch\onedrive_3d_products_data.json", "r", encoding="utf-8") as f:
    products = json.load(f)

cols = 5
rows = (len(products) + cols - 1) // cols
cell_w, cell_h = 320, 360
sheet_w = cols * cell_w
sheet_h = rows * cell_h

sheet = Image.new("RGB", (sheet_w, sheet_h), (255, 255, 255))
draw = ImageDraw.Draw(sheet)

for idx, p in enumerate(products):
    col = idx % cols
    row = idx // cols
    x = col * cell_w
    y = row * cell_h
    
    img_path = os.path.join(v5_dir, f"{p['slug']}.jpg")
    if os.path.exists(img_path):
        with Image.open(img_path) as thumb:
            thumb = thumb.resize((300, 300), Image.Resampling.LANCZOS)
            sheet.paste(thumb, (x + 10, y + 10))
            
    draw.rectangle([x + 4, y + 4, x + cell_w - 4, y + cell_h - 4], outline=(210, 220, 235), width=2)
    title = p['title']
    if len(title) > 30:
        title = title[:28] + "..."
    draw.text((x + 8, y + 318), f"#{idx+1:02d} {title}", fill=(20, 25, 35))
    draw.text((x + 8, y + 338), f"Rs. {p['price']} | 3D Printing", fill=(20, 110, 210))

out_path = r"scratch\onedrive_3d_printing_migrated_contact_sheet.png"
sheet.save(out_path, "PNG")
print(f"Saved migrated contact sheet to {out_path} ({os.path.getsize(out_path)} bytes)")
