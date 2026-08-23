import shutil
import os
import json

# Source generated images
images_to_copy = [
    ("laser_wood_keychain_1787498976951.jpg", "custom-laser-engraved-wooden-keychain.jpg"),
    ("tree_life_lamp_1787498994064.jpg", "laser-cut-tree-of-life-wooden-led-lamp.jpg"),
    ("layered_mandala_1787499012791.jpg", "multi-layered-wooden-mandala-wall-art.jpg"),
    ("acrylic_led_sign_1787499032800.jpg", "edge-lit-laser-cut-acrylic-led-sign.jpg"),
    ("plywood_organizer_1787499052856.jpg", "slot-together-plywood-desktop-organizer.jpg"),
    ("hardwood_photo_frame_1787499076192.jpg", "laser-engraved-hardwood-photo-frame.jpg"),
]

brain_dir = r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0"
target_dir = r"public\products"

for src_name, dest_name in images_to_copy:
    src_path = os.path.join(brain_dir, src_name)
    dest_path = os.path.join(target_dir, dest_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied {src_name} -> {dest_path}")
    else:
        print(f"NOT FOUND: {src_path}")

# Now import update_catalog_strict and write all 38 products with local /products/<slug>.jpg
import sys
sys.path.append("scratch")
import update_catalog_strict

for p in update_catalog_strict.CATALOG_DEF:
    p["image"] = f"/products/{p['slug']}.jpg"

# Re-run generator to produce clean TS files
with open("scratch/update_catalog_strict.py", "r", encoding="utf-8") as f:
    code = f.read()

# Replace any https:// URLs with /products/<slug>.jpg
import re
cleaned_code = re.sub(r'\"image\": \"https://images\.unsplash\.com/[^\"]+\"', lambda m: '\"image\": f\"/products/{p[\'slug\']}.jpg\"', code)

with open("scratch/update_catalog_strict.py", "w", encoding="utf-8") as f:
    f.write(code)

print("Images copied and catalog updated!")
