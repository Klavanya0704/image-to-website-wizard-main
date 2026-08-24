import os
from PIL import Image, ImageDraw

folder = r"C:\Users\Lavanya\OneDrive\Pictures\laser cutting"
files = sorted([f for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))])

cols = 5
rows = (len(files) + cols - 1) // cols
cell_w, cell_h = 320, 360
sheet_w = cols * cell_w
sheet_h = rows * cell_h

sheet = Image.new("RGB", (sheet_w, sheet_h), (255, 255, 255))
draw = ImageDraw.Draw(sheet)

for idx, f in enumerate(files):
    col = idx % cols
    row = idx // cols
    x = col * cell_w
    y = row * cell_h
    
    p = os.path.join(folder, f)
    try:
        with Image.open(p) as img:
            img = img.convert("RGB")
            img.thumbnail((300, 300), Image.Resampling.LANCZOS)
            tw, th = img.size
            ox = x + (cell_w - tw) // 2
            oy = y + 10 + (280 - th) // 2
            sheet.paste(img, (ox, oy))
    except Exception as e:
        print(f"Error thumbnailing {f}: {e}")
        
    draw.rectangle([x + 4, y + 4, x + cell_w - 4, y + cell_h - 4], outline=(200, 210, 225), width=2)
    disp_name = f if len(f) <= 32 else f[:30] + "..."
    draw.text((x + 8, y + 300), f"#{idx+1:02d} {disp_name}", fill=(20, 25, 35))

out_sheet = r"scratch\onedrive_laser_cutting_inspection_sheet.png"
sheet.save(out_sheet, "PNG")
print(f"Saved inspection sheet to {out_sheet} ({os.path.getsize(out_sheet)} bytes)")
