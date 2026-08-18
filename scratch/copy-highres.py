import shutil
import os
import glob

brain_dir = r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0"
public_dir = r"c:\Users\Lavanya\Downloads\image-to-website-wizard-main\image-to-website-wizard-main\public\products"
assets_dir = r"c:\Users\Lavanya\Downloads\image-to-website-wizard-main\image-to-website-wizard-main\src\assets"

os.makedirs(public_dir, exist_ok=True)
os.makedirs(assets_dir, exist_ok=True)

# Find latest generated images:
def find_latest(pattern):
    files = glob.glob(os.path.join(brain_dir, pattern))
    if not files:
        return None
    files.sort(key=os.path.getmtime)
    return files[-1]

mapping = {
    "prod_vase*.jpg": "3d-vase.jpg",
    "prod_phone_stand*.jpg": "phone-stand.jpg",
    "prod_desk_organizer*.jpg": "desk-organizer.jpg",
    "prod_cable_clips*.jpg": "cable-clips.jpg",
    "prod_arch_model*.jpg": "architectural-model.jpg",
    "prod_hex_planter*.jpg": "hex-planter.jpg",
    "prod_acrylic_sign*.jpg": "acrylic-sign.jpg",
    "prod_mandala_coasters*.jpg": "mandala-coasters.jpg",
}

for pat, dest_name in mapping.items():
    src = find_latest(pat)
    if src:
        dest_public = os.path.join(public_dir, dest_name)
        shutil.copy2(src, dest_public)
        print(f"Copied {os.path.basename(src)} -> {dest_name} (public/products)")
    else:
        print(f"Pattern {pat} not found!")

print("Completed copying generated high-res studio assets.")
