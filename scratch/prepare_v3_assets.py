import os
import shutil
import hashlib
from PIL import Image

brain_dir = r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0"
v3_dir = r"public\products\v3"
os.makedirs(v3_dir, exist_ok=True)

# 1. Map all 38 products to their highest quality studio photos
AI_STUDIO_PHOTOS = {
    # 3D Printing (6 products)
    "3d-printed-geometric-spiral-vase": "spiral_vase_3dp_v2_1787544844916.jpg",
    "foldable-desktop-phone-tablet-stand": "phone_stand_3dp_v2_1787544873010.jpg",
    "modular-desktop-stationery-organizer": "desk_organizer_3dp_v2_1787544891900.jpg",
    "interlocking-cable-management-clip-pack": "cable_clips_3dp_v2_1787544911520.jpg",
    "precision-resin-architectural-tower-model": "resin_tower_3dp_v2_1787544931310.jpg",
    "hexagonal-geometric-succulent-planter-pot": "hex_planter_3dp_v2_1787545006406.jpg",

    # Laser Cutting (6 products)
    "custom-laser-engraved-wooden-keychain": "wood_keychain_lc_v2_1787545026789.jpg",
    "laser-cut-tree-of-life-wooden-led-lamp": "tree_lamp_lc_v2_1787545050141.jpg",
    "slot-together-plywood-desktop-organizer": "plywood_organizer_lc_v2_1787545075620.jpg",
    "multi-layered-wooden-mandala-wall-art": "mandala_art_lc_v2_1787545096831.jpg",
    "laser-engraved-hardwood-photo-frame": "photo_frame_lc_v2_1787545120741.jpg",
    "edge-lit-laser-cut-acrylic-led-sign": "acrylic_led_sign_lc_v2_1787545142087.jpg",

    # CNC Machining (6 products)
    "cnc-v-carved-solid-walnut-name-plate": "cnc_nameplate_v2_1787545165674.jpg",
    "cnc-relief-carved-wooden-decorative-panel": "public/products/cnc-relief-carved-wooden-decorative-panel.jpg",
    "cnc-milled-hardwood-keepsake-box": "public/products/cnc-milled-hardwood-keepsake-box.jpg",
    "cnc-machined-6061-aluminium-l-bracket": "cnc_bracket_photo_1787201966512.jpg",
    "cnc-precision-aluminium-fixture-plate": "public/products/cnc-precision-aluminium-fixture-plate.jpg",
    "cnc-machined-high-precision-spur-gear": "public/products/cnc-machined-high-precision-spur-gear.jpg",

    # Electronics (5 products)
    "esp32-dual-core-iot-development-board": "public/products/esp32-dual-core-iot-development-board.jpg",
    "37-piece-iot-sensor-module-starter-kit": "public/products/37-piece-iot-sensor-module-starter-kit.jpg",
    "double-sided-fr4-prototype-pcb-pack": "public/products/double-sided-fr4-prototype-pcb-pack.jpg",
    "arduino-compatible-atmega328p-microcontroller": "public/products/arduino-compatible-atmega328p-microcontroller.jpg",
    "i2c-096-inch-oled-display-module": "public/products/i2c-096-inch-oled-display-module.jpg",

    # Drones & Parts (5 products)
    "5-inch-fpv-racing-3k-carbon-fiber-drone-frame": "public/products/5-inch-fpv-racing-3k-carbon-fiber-drone-frame.jpg",
    "2207-2450kv-high-power-brushless-drone-motor": "public/products/2207-2450kv-high-power-brushless-drone-motor.jpg",
    "5-inch-tri-blade-fpv-drone-propellers-pack": "public/products/5-inch-tri-blade-fpv-drone-propellers-pack.jpg",
    "30a-4-in-1-blheli-s-electronic-speed-controller": "public/products/30a-4-in-1-blheli-s-electronic-speed-controller.jpg",
    "omnidirectional-58ghz-fpv-cloverleaf-antenna": "public/products/omnidirectional-58ghz-fpv-cloverleaf-antenna.jpg",

    # Acrylic Products (5 products)
    "crystal-clear-cast-acrylic-showcase-cube-box": "public/products/crystal-clear-cast-acrylic-showcase-cube-box.jpg",
    "laser-engraved-beveled-acrylic-award-trophy": "public/products/laser-engraved-beveled-acrylic-award-trophy.jpg",
    "high-clarity-heavy-duty-acrylic-sneeze-shield": "public/products/high-clarity-heavy-duty-acrylic-sneeze-shield.jpg",
    "desktop-acrylic-slanted-brochure-menu-holder": "public/products/desktop-acrylic-slanted-brochure-menu-holder.jpg",
    "multi-tiered-clear-acrylic-cosmetic-display-riser": "public/products/multi-tiered-clear-acrylic-cosmetic-display-riser.jpg",

    # DIY Kits (5 products)
    "autonomous-4wd-smart-robotic-stem-starter-kit": "public/products/autonomous-4wd-smart-robotic-stem-starter-kit.jpg",
    "educational-electronics-soldering-practice-kit": "public/products/educational-electronics-soldering-practice-kit.jpg",
    "diy-portable-bluetooth-stereo-speaker-maker-kit": "public/products/diy-portable-bluetooth-stereo-speaker-maker-kit.jpg",
    "miniature-solar-powered-stem-rover-buggy-kit": "public/products/miniature-solar-powered-stem-rover-buggy-kit.jpg",
    "smart-weather-station-iot-esp8266-maker-kit": "public/products/smart-weather-station-iot-esp8266-maker-kit.jpg"
}

print("=" * 80)
print("PREPARING PUBLIC/PRODUCTS/V3/ ASSETS")
print("=" * 80)

for slug, src_name in AI_STUDIO_PHOTOS.items():
    if src_name.startswith("public/"):
        src_path = src_name
    else:
        src_path = os.path.join(brain_dir, src_name)
        
    dest_path = os.path.join(v3_dir, f"{slug}.jpg")
    
    if os.path.exists(src_path):
        with Image.open(src_path) as img:
            img = img.convert("RGB")
            if img.size != (1024, 1024):
                img = img.resize((1024, 1024), Image.Resampling.LANCZOS)
            img.save(dest_path, "JPEG", quality=95)
        sz = os.path.getsize(dest_path)
        with open(dest_path, "rb") as fp:
            h = hashlib.sha256(fp.read()).hexdigest()[:12]
        print(f"  [SAVED v3] {slug}.jpg ({sz} B, SHA: {h})")
    else:
        print(f"  [ERROR NOT FOUND] {src_path}")

print(f"Total v3 files prepared: {len(os.listdir(v3_dir))}")
print("=" * 80)
