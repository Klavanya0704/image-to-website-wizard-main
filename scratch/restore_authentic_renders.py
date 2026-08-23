import os
import shutil
from PIL import Image

brain_dir = r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0"
target_dir = r"public\products"

LOCAL_AUTHENTIC_RENDERS = {
    # 3D Printing (6 products)
    "3d-printed-geometric-spiral-vase.jpg": "spiral_vase_1787499544488.jpg",
    "foldable-desktop-phone-tablet-stand.jpg": "phone_stand_1787499587636.jpg",
    "modular-desktop-stationery-organizer.jpg": "desk_organizer_1787499609366.jpg",
    "interlocking-cable-management-clip-pack.jpg": "cable_clips_1787499636419.jpg",
    "precision-resin-architectural-tower-model.jpg": "resin_arch_model_1787499663508.jpg",
    "hexagonal-geometric-succulent-planter-pot.jpg": "hex_planter_1787499689656.jpg",

    # Laser Cutting (6 products)
    "custom-laser-engraved-wooden-keychain.jpg": "laser_wood_keychain_1787498976951.jpg",
    "laser-cut-tree-of-life-wooden-led-lamp.jpg": "tree_life_lamp_1787498994064.jpg",
    "slot-together-plywood-desktop-organizer.jpg": "plywood_organizer_1787499052856.jpg",
    "multi-layered-wooden-mandala-wall-art.jpg": "layered_mandala_1787499012791.jpg",
    "laser-engraved-hardwood-photo-frame.jpg": "hardwood_photo_frame_1787499076192.jpg",
    "edge-lit-laser-cut-acrylic-led-sign.jpg": "acrylic_led_sign_1787499032800.jpg",

    # CNC Machining (2 products)
    "cnc-v-carved-solid-walnut-name-plate.jpg": "cnc_walnut_nameplate_1787499716532.jpg",
    "cnc-machined-6061-aluminium-l-bracket.jpg": "cnc_bracket_photo_1787201966512.jpg"
}

print("=" * 80)
print("RESTORING 14 AUTHENTIC STUDIO RENDERS TO PUBLIC/PRODUCTS")
print("=" * 80)

for target_name, src_name in LOCAL_AUTHENTIC_RENDERS.items():
    src_path = os.path.join(brain_dir, src_name)
    dest_path = os.path.join(target_dir, target_name)
    
    if os.path.exists(src_path):
        with Image.open(src_path) as img:
            img = img.convert("RGB")
            if img.size != (1024, 1024):
                img = img.resize((1024, 1024), Image.Resampling.LANCZOS)
            img.save(dest_path, "JPEG", quality=95)
        print(f"  [RESTORED] {target_name:<48} from {src_name} ({os.path.getsize(dest_path)} bytes)")
    else:
        print(f"  [MISSING] {src_path}")

print("=" * 80)
