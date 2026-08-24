import os
import shutil
from PIL import Image, ImageDraw, ImageFont

brain_dir = r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0"
target_dir = r"public\products"
os.makedirs(target_dir, exist_ok=True)

# 1. Map brand-new AI generation outputs
V2_AI_PHOTOS = {
    # 3D Printing (6/6 AI generated studio photos)
    "3d-printed-geometric-spiral-vase.jpg": "spiral_vase_3dp_v2_1787544844916.jpg",
    "foldable-desktop-phone-tablet-stand.jpg": "phone_stand_3dp_v2_1787544873010.jpg",
    "modular-desktop-stationery-organizer.jpg": "desk_organizer_3dp_v2_1787544891900.jpg",
    "interlocking-cable-management-clip-pack.jpg": "cable_clips_3dp_v2_1787544911520.jpg",
    "precision-resin-architectural-tower-model.jpg": "resin_tower_3dp_v2_1787544931310.jpg",
    "hexagonal-geometric-succulent-planter-pot.jpg": "hex_planter_3dp_v2_1787545006406.jpg",

    # Laser Cutting (6/6 AI generated studio photos)
    "custom-laser-engraved-wooden-keychain.jpg": "wood_keychain_lc_v2_1787545026789.jpg",
    "laser-cut-tree-of-life-wooden-led-lamp.jpg": "tree_lamp_lc_v2_1787545050141.jpg",
    "slot-together-plywood-desktop-organizer.jpg": "plywood_organizer_lc_v2_1787545075620.jpg",
    "multi-layered-wooden-mandala-wall-art.jpg": "mandala_art_lc_v2_1787545096831.jpg",
    "laser-engraved-hardwood-photo-frame.jpg": "photo_frame_lc_v2_1787545120741.jpg",
    "edge-lit-laser-cut-acrylic-led-sign.jpg": "acrylic_led_sign_lc_v2_1787545142087.jpg",

    # CNC Machining
    "cnc-v-carved-solid-walnut-name-plate.jpg": "cnc_nameplate_v2_1787545165674.jpg",
    "cnc-machined-6061-aluminium-l-bracket.jpg": "cnc_bracket_photo_1787201966512.jpg"
}

print("=" * 80)
print("UPDATING PUBLIC/PRODUCTS WITH AI-GENERATED STUDIO PHOTOGRAPHY")
print("=" * 80)

for target_name, src_name in V2_AI_PHOTOS.items():
    src_path = os.path.join(brain_dir, src_name)
    dest_path = os.path.join(target_dir, target_name)
    if os.path.exists(src_path):
        with Image.open(src_path) as img:
            img = img.convert("RGB")
            if img.size != (1024, 1024):
                img = img.resize((1024, 1024), Image.Resampling.LANCZOS)
            img.save(dest_path, "JPEG", quality=95)
        print(f"  [COPIED & SAVED] {target_name:<48} ({os.path.getsize(dest_path)} B)")
    else:
        print(f"  [NOT FOUND] {src_path}")

# 2. Build 38-Product Visual Contact Sheet
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

print("\nGenerating Contact Sheet for all 38 products...")

for idx, p in enumerate(PRODUCTS):
    col = idx % cols
    row = idx // cols
    x = col * cell_w
    y = row * cell_h
    
    img_path = os.path.join(target_dir, f"{p['slug']}.jpg")
    if os.path.exists(img_path):
        with Image.open(img_path) as thumb:
            thumb = thumb.resize((300, 300), Image.Resampling.LANCZOS)
            contact_sheet.paste(thumb, (x + 10, y + 10))
            
    # Draw border & title label
    draw.rectangle([x + 8, y + 8, x + cell_w - 8, y + cell_h - 8], outline=(220, 225, 235), width=2)
    # Truncate title if too long
    title = p['name']
    if len(title) > 32:
        title = title[:30] + "..."
    draw.text((x + 12, y + 318), f"#{idx+1} {title}", fill=(20, 25, 35))
    draw.text((x + 12, y + 342), f"[{p['category']}]", fill=(100, 110, 130))

contact_sheet_path = r"scratch\generated_catalog_contact_sheet.png"
contact_sheet.save(contact_sheet_path, "PNG")
print(f"Contact sheet saved to {contact_sheet_path} ({os.path.getsize(contact_sheet_path)} bytes)")
print("=" * 80)
