import urllib.request
import os
import hashlib
from PIL import Image, ImageEnhance

# 38 Unique, Distinct, High-Definition (1024x1024) Studio Product Photos
PHOTOS_38 = {
    # 1. 3D Printing (6)
    "3d-printed-geometric-spiral-vase": "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1024&h=1024&q=90",
    "foldable-desktop-phone-tablet-stand": "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1024&h=1024&q=90",
    "modular-desktop-stationery-organizer": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1024&h=1024&q=90",
    "interlocking-cable-management-clip-pack": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1024&h=1024&q=90",
    "precision-resin-architectural-tower-model": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1024&h=1024&q=90",
    "hexagonal-geometric-succulent-planter-pot": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1024&h=1024&q=90",

    # 2. Laser Cutting (6)
    "custom-laser-engraved-wooden-keychain": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1024&h=1024&q=90",
    "laser-cut-tree-of-life-wooden-led-lamp": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1024&h=1024&q=90",
    "slot-together-plywood-desktop-organizer": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1024&h=1024&q=90",
    "multi-layered-wooden-mandala-wall-art": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1024&h=1024&q=90",
    "laser-engraved-hardwood-photo-frame": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1024&h=1024&q=90",
    "edge-lit-laser-cut-acrylic-led-sign": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1024&h=1024&q=90",

    # 3. CNC Machining (6)
    "cnc-v-carved-solid-walnut-name-plate": "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1024&h=1024&q=90",
    "cnc-relief-carved-wooden-decorative-panel": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1024&h=1024&q=90",
    "cnc-milled-hardwood-keepsake-box": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1024&h=1024&q=90",
    "cnc-machined-6061-aluminium-l-bracket": "LOCAL:cnc_bracket_photo_1787201966512.jpg",
    "cnc-precision-aluminium-fixture-plate": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1024&h=1024&q=90",
    "cnc-machined-high-precision-spur-gear": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1024&h=1024&q=90",

    # 4. Electronics (5)
    "esp32-dual-core-iot-development-board": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1024&h=1024&q=90",
    "37-piece-iot-sensor-module-starter-kit": "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=1024&h=1024&q=90",
    "double-sided-fr4-prototype-pcb-pack": "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1024&h=1024&q=90",
    "arduino-compatible-atmega328p-microcontroller": "https://images.unsplash.com/photo-1608555855762-2b657eb1c348?auto=format&fit=crop&w=1024&h=1024&q=90",
    "i2c-096-inch-oled-display-module": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1024&h=1024&q=90",

    # 5. Drones & Parts (5)
    "5-inch-fpv-racing-3k-carbon-fiber-drone-frame": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1024&h=1024&q=90",
    "2207-2450kv-high-power-brushless-drone-motor": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1024&h=1024&q=90",
    "5-inch-tri-blade-fpv-drone-propellers-pack": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1024&h=1024&q=90",
    "30a-4-in-1-blheli-s-electronic-speed-controller": "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=1024&h=1024&q=90",
    "omnidirectional-58ghz-fpv-cloverleaf-antenna": "https://images.unsplash.com/photo-1516116211227-bbc15d6c8b93?auto=format&fit=crop&w=1024&h=1024&q=90",

    # 6. Acrylic Products (5)
    "crystal-clear-cast-acrylic-showcase-cube-box": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1024&h=1024&q=90", # Note: will replace duplicate
    "crystal-clear-cast-acrylic-showcase-cube-box": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1024&h=1024&q=90",
    "laser-engraved-beveled-acrylic-award-trophy": "https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=1024&h=1024&q=90",
    "high-clarity-heavy-duty-acrylic-sneeze-shield": "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=1024&h=1024&q=90",
    "desktop-acrylic-slanted-brochure-menu-holder": "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1024&h=1024&q=90",
    "multi-tiered-clear-acrylic-cosmetic-display-riser": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1024&h=1024&q=90",

    # 7. DIY Kits (5)
    "autonomous-4wd-smart-robotic-stem-starter-kit": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1024&h=1024&q=90",
    "educational-electronics-soldering-practice-kit": "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1024&h=1024&q=90",
    "diy-portable-bluetooth-stereo-speaker-maker-kit": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1024&h=1024&q=90",
    "miniature-solar-powered-stem-rover-buggy-kit": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1024&h=1024&q=90",
    "smart-weather-station-iot-esp8266-maker-kit": "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1024&h=1024&q=90",
}

target_dir = r"public\products"
brain_dir = r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0"
headers = {"User-Agent": "Mozilla/5.0"}
hashes = {}
duplicates = []

print("=" * 85)
print("PROCESSING 38 PRODUCTS (1024x1024 HD)")
print("=" * 85)

for slug, src in PHOTOS_38.items():
    dest_path = os.path.join(target_dir, f"{slug}.jpg")
    
    if src.startswith("LOCAL:"):
        local_filename = src.replace("LOCAL:", "")
        src_path = os.path.join(brain_dir, local_filename)
        if os.path.exists(src_path):
            with Image.open(src_path) as img:
                img = img.convert("RGB")
                img = img.resize((1024, 1024), Image.Resampling.LANCZOS)
                enhancer = ImageEnhance.Sharpness(img)
                img = enhancer.enhance(1.15)
                img.save(dest_path, "JPEG", quality=92)
            print(f"  [OK] Processed local render: {slug} (1024x1024)")
        else:
            print(f"  [WARN] Local file not found: {src_path}")
    else:
        try:
            req = urllib.request.Request(src, headers=headers)
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = resp.read()
                with open(dest_path + ".tmp", "wb") as f:
                    f.write(data)
                
                with Image.open(dest_path + ".tmp") as img:
                    img = img.convert("RGB")
                    img = img.resize((1024, 1024), Image.Resampling.LANCZOS)
                    enhancer = ImageEnhance.Sharpness(img)
                    img = enhancer.enhance(1.15)
                    img.save(dest_path, "JPEG", quality=92)
                    
                if os.path.exists(dest_path + ".tmp"):
                    os.remove(dest_path + ".tmp")
            print(f"  [OK] Processed photo: {slug} (1024x1024)")
        except Exception as e:
            print(f"  [ERROR] {slug} -> {e}")

    with open(dest_path, "rb") as f:
        h = hashlib.sha256(f.read()).hexdigest()
        if h in hashes:
            duplicates.append((slug, hashes[h]))
        hashes[h] = slug

print("\n" + "=" * 85)
print(f"Total Unique Images: {len(hashes)} / 38")
print(f"Duplicate Hashes: {len(duplicates)}")
if duplicates:
    print(f"Duplicates found: {duplicates}")
else:
    print("ALL 38 PRODUCT IMAGES ARE 100% UNIQUE (0 DUPLICATES)!")
print("=" * 85)
