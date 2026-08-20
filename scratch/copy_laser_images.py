import shutil
import os

generated_map = {
    "custom-name-keychain.jpg": r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\laser_keychain_prod_1787200480177.jpg",
    "custom-engraved-wooden-keychain.jpg": r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\laser_keychain_prod_1787200480177.jpg",
    "tree-of-life-lamp.jpg": r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\laser_tree_lamp_prod_1787200507330.jpg",
    "tree-of-life-led-lamp.jpg": r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\laser_tree_lamp_prod_1787200507330.jpg",
    "college-logo-board.jpg": r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\laser_college_board_prod_1787200530888.jpg",
    "wooden-wall-art-mandala.jpg": r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\laser_mandala_art_prod_1787200559329.jpg",
    "mandala-laser-cut-wooden-coasters.jpg": r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\laser_mandala_art_prod_1787200559329.jpg",
    "laser-cut-desk-organizer.jpg": r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\laser_desk_org_prod_1787200579299.jpg",
    "laser-engraved-photo-frame.jpg": r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\laser_photo_frame_prod_1787200599185.jpg",
}

dest_dir = r"public/products"
os.makedirs(dest_dir, exist_ok=True)

for target_name, src_path in generated_map.items():
    dest_path = os.path.join(dest_dir, target_name)
    shutil.copyfile(src_path, dest_path)
    print(f"Copied {os.path.basename(src_path)} -> {dest_path} ({os.path.getsize(dest_path)} bytes)")

print("All Laser Cutting images copied successfully.")
