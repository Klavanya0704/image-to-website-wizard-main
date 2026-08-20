import shutil
import os

images = {
    "custom-acrylic-led-sign.jpg": r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\laser_acrylic_led_sign_1787201245522.jpg",
    "laser-engraved-glass-trophy.jpg": r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\laser_glass_trophy_1787201269598.jpg",
    "frosted-glass-laser-engraving.jpg": r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\laser_frosted_glass_1787201295950.jpg",
    "laser-cut-acrylic-name-plate.jpg": r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\laser_acrylic_nameplate_1787201319431.jpg",
    "acrylic-decorative-panel.jpg": r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\laser_acrylic_panel_1787201341884.jpg",
}

dest_dir = r"public/products"
for target_name, src in images.items():
    dest = os.path.join(dest_dir, target_name)
    shutil.copyfile(src, dest)
    print(f"Copied -> {dest} ({os.path.getsize(dest)} bytes)")

print("Glass & Acrylic images copied.")
