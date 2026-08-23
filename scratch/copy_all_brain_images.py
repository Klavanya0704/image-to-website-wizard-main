import shutil
import os

images_map = {
    # 3D Printing
    "3d-printed-geometric-spiral-vase.jpg": "spiral_vase_1787499544488.jpg",
    "foldable-desktop-phone-tablet-stand.jpg": "phone_stand_1787499587636.jpg",
    "modular-desktop-stationery-organizer.jpg": "desk_organizer_1787499609366.jpg",
    "interlocking-cable-management-clip-pack.jpg": "cable_clips_1787499636419.jpg",
    "precision-resin-architectural-tower-model.jpg": "resin_arch_model_1787499663508.jpg",
    "hexagonal-geometric-succulent-planter-pot.jpg": "hex_planter_1787499689656.jpg",
    # Laser Cutting
    "custom-laser-engraved-wooden-keychain.jpg": "laser_wood_keychain_1787498976951.jpg",
    "laser-cut-tree-of-life-wooden-led-lamp.jpg": "tree_life_lamp_1787498994064.jpg",
    "multi-layered-wooden-mandala-wall-art.jpg": "layered_mandala_1787499012791.jpg",
    "edge-lit-laser-cut-acrylic-led-sign.jpg": "acrylic_led_sign_1787499032800.jpg",
    "slot-together-plywood-desktop-organizer.jpg": "plywood_organizer_1787499052856.jpg",
    "laser-engraved-hardwood-photo-frame.jpg": "hardwood_photo_frame_1787499076192.jpg",
    # CNC Machining
    "cnc-v-carved-solid-walnut-name-plate.jpg": "cnc_walnut_nameplate_1787499716532.jpg",
    "cnc-machined-6061-aluminium-l-bracket.jpg": "cnc_bracket_photo_1787201966512.jpg",
}

brain_dir = r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0"
target_dir = r"public\products"

for dest_name, src_name in images_map.items():
    src_path = os.path.join(brain_dir, src_name)
    dest_path = os.path.join(target_dir, dest_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Updated {dest_name} from {src_name} ({os.path.getsize(dest_path)} bytes)")
    else:
        print(f"File not found: {src_path}")
