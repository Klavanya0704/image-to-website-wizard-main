import os
import math
import hashlib
import json
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

OUTPUT_DIR = r"public\products\v4"
os.makedirs(OUTPUT_DIR, exist_ok=True)
brain_dir = r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0"

with open(r"scratch\catalog_84_data.json", "r", encoding="utf-8") as f:
    CATALOG_84 = json.load(f)

# Load existing high quality base images if available
EXISTING_V3_MAP = {
    "3d-printed-geometric-spiral-vase": "spiral_vase_3dp_v2_1787544844916.jpg",
    "3d-printed-foldable-phone-stand": "phone_stand_3dp_v2_1787544873010.jpg",
    "3d-printed-mini-desk-organizer": "desk_organizer_3dp_v2_1787544891900.jpg",
    "3d-printed-cable-management-clips-pack": "cable_clips_3dp_v2_1787544911520.jpg",
    "3d-printed-resin-architectural-tower-model": "resin_tower_3dp_v2_1787544931310.jpg",
    "3d-printed-hexagonal-geometric-succulent-planter": "hex_planter_3dp_v2_1787545006406.jpg",
    "custom-laser-engraved-wooden-keychain": "wood_keychain_lc_v2_1787545026789.jpg",
    "laser-cut-tree-of-life-wooden-led-lamp": "tree_lamp_lc_v2_1787545050141.jpg",
    "slot-together-plywood-desktop-organizer": "plywood_organizer_lc_v2_1787545075620.jpg",
    "multi-layered-wooden-mandala-wall-art": "mandala_art_lc_v2_1787545096831.jpg",
    "laser-engraved-hardwood-photo-frame": "photo_frame_lc_v2_1787545120741.jpg",
    "edge-lit-laser-cut-acrylic-led-sign": "acrylic_led_sign_lc_v2_1787545142087.jpg",
    "cnc-v-carved-solid-walnut-name-plate": "cnc_nameplate_v2_1787545165674.jpg",
    "cnc-machined-6061-aluminium-l-bracket": "cnc_bracket_photo_1787201966512.jpg"
}

def create_studio_canvas(bg_theme="neutral"):
    if bg_theme == "warm":
        top_c, bot_c = (252, 250, 246), (238, 230, 218)
    elif bg_theme == "cool":
        top_c, bot_c = (246, 250, 254), (220, 232, 245)
    elif bg_theme == "dark":
        top_c, bot_c = (35, 38, 45), (18, 20, 24)
    else:
        top_c, bot_c = (248, 250, 253), (225, 232, 242)
        
    img = Image.new("RGB", (1024, 1024), top_c)
    draw = ImageDraw.Draw(img)
    cx, cy = 512, 480
    for r in range(700, 0, -10):
        factor = r / 700.0
        r_c = int(top_c[0] * (1 - factor) + bot_c[0] * factor)
        g_c = int(top_c[1] * (1 - factor) + bot_c[1] * factor)
        b_c = int(top_c[2] * (1 - factor) + bot_c[2] * factor)
        draw.ellipse([cx - r, cy - int(r * 0.8), cx + r, cy + int(r * 0.8)], fill=(r_c, g_c, b_c))
        
    draw.ellipse([212, 720, 812, 840], fill=(195, 205, 218) if bg_theme!="dark" else (10, 12, 15))
    draw.ellipse([300, 740, 724, 820], fill=(165, 175, 190) if bg_theme!="dark" else (5, 6, 8))
    return img, draw

print("Rendering 84 unique, dedicated, colorful product photographs...")

for idx, p in enumerate(CATALOG_84):
    slug = p["slug"]
    dest_path = os.path.join(OUTPUT_DIR, f"{slug}.jpg")
    cat = p["category"]
    
    # 1. Direct AI Studio Photo
    if slug in EXISTING_V3_MAP:
        src = os.path.join(brain_dir, EXISTING_V3_MAP[slug])
        if os.path.exists(src):
            with Image.open(src) as img:
                img = img.convert("RGB")
                if img.size != (1024, 1024):
                    img = img.resize((1024, 1024), Image.Resampling.LANCZOS)
                enh = ImageEnhance.Color(img)
                img = enh.enhance(1.12)
                img.save(dest_path, "JPEG", quality=95)
            print(f"[{idx+1:02d}/84] [AI PHOTO] {slug}")
            continue

    # 2. Dedicated Procedural Drawing
    img, draw = create_studio_canvas(bg_theme="warm" if cat=="Laser Cutting" else ("cool" if cat in ["Electronics","Drones & Parts"] else "neutral"))
    cx, cy = 512, 480
    
    # ==================== 3D PRINTING ====================
    if slug == "3d-printed-modular-tool-holder":
        draw.rectangle([cx - 240, cy - 140, cx + 240, cy + 180], fill=(20, 105, 210), outline=(10, 65, 150), width=5)
        for hx in range(cx - 180, cx + 200, 65):
            for hy in range(cy - 90, cy + 140, 65):
                draw.ellipse([hx - 22, hy - 22, hx + 22, hy + 22], fill=(25, 30, 42), outline=(120, 185, 255), width=2)
    elif slug == "3d-printed-articulated-dragon":
        for i in range(12):
            seg_x = cx - 220 + i * 36 + int(30 * math.sin(i * 0.6))
            seg_y = cy - 40 + int(40 * math.cos(i * 0.6))
            draw.ellipse([seg_x - 24, seg_y - 24, seg_x + 24, seg_y + 24], fill=(15, 140, 95), outline=(235, 195, 45), width=3)
        draw.polygon([(cx + 220, cy - 60), (cx + 280, cy - 20), (cx + 220, cy + 20)], fill=(12, 110, 75), outline=(245, 215, 60), width=4)
    elif slug == "3d-printed-mechanical-gear-assembly":
        draw.ellipse([cx - 190, cy - 190, cx + 190, cy + 190], fill=(215, 35, 65), outline=(140, 15, 35), width=6)
        for angle in range(0, 360, 45):
            rad = math.radians(angle)
            gx = cx + int(110 * math.cos(rad))
            gy = cy + int(110 * math.sin(rad))
            draw.ellipse([gx - 35, gy - 35, gx + 35, gy + 35], fill=(225, 230, 240), outline=(130, 140, 155), width=3)
        draw.ellipse([cx - 50, cy - 50, cx + 50, cy + 50], fill=(245, 215, 45), outline=(180, 140, 20), width=4)
    elif slug == "3d-printed-headphone-stand":
        draw.rectangle([cx - 140, cy + 160, cx + 140, cy + 220], fill=(25, 28, 35), outline=(225, 35, 55), width=4)
        draw.arc([cx - 120, cy - 220, cx + 120, cy + 180], start=180, end=360, fill=(25, 28, 35), width=36)
        draw.arc([cx - 90, cy - 240, cx + 90, cy - 80], start=180, end=360, fill=(225, 35, 55), width=24)
    elif slug == "3d-printed-desk-cable-dock":
        draw.rectangle([cx - 200, cy - 80, cx + 200, cy + 160], fill=(245, 195, 25), outline=(185, 140, 10), width=4)
        for dx in range(cx - 140, cx + 160, 60):
            draw.rectangle([dx, cy - 60, dx + 25, cy + 100], fill=(30, 34, 42), outline=(255, 255, 255), width=2)
    elif slug == "3d-printed-parametric-wall-planter":
        pts = [(cx - 160, cy - 140), (cx + 160, cy - 140), (cx + 120, cy + 160), (cx - 120, cy + 160)]
        draw.polygon(pts, fill=(120, 175, 140), outline=(75, 125, 95), width=4)
        draw.ellipse([cx - 60, cy - 160, cx + 60, cy - 100], fill=(45, 95, 60))

    # ==================== LASER CUTTING ====================
    elif slug == "laser-cut-wooden-desk-name-plate":
        draw.polygon([(cx - 240, cy + 120), (cx + 240, cy + 120), (cx + 200, cy - 80), (cx - 200, cy - 80)], fill=(225, 190, 135), outline=(110, 70, 30), width=5)
        draw.rectangle([cx - 160, cy - 20, cx + 160, cy + 40], fill=(70, 40, 18), outline=(245, 215, 60), width=2)
    elif slug == "laser-engraved-wooden-coaster-set":
        for i, offset in enumerate([(-100, -60), (80, -60), (-60, 60), (100, 60)]):
            draw.ellipse([cx + offset[0] - 90, cy + offset[1] - 90, cx + offset[0] + 90, cy + offset[1] + 90], fill=(210, 170, 115), outline=(90, 50, 20), width=4)
            draw.arc([cx + offset[0] - 60, cy + offset[1] - 60, cx + offset[0] + 60, cy + offset[1] + 60], start=0, end=360, fill=(75, 40, 15), width=3)
    elif slug == "laser-cut-layered-city-skyline":
        draw.rectangle([cx - 260, cy - 140, cx + 260, cy + 160], fill=(235, 205, 155), outline=(120, 75, 30), width=4)
        for bx, bh, color in [(cx - 220, 180, (160, 110, 60)), (cx - 140, 240, (110, 65, 25)), (cx - 50, 290, (70, 40, 15)), (cx + 60, 220, (130, 85, 40)), (cx + 150, 170, (175, 125, 75))]:
            draw.rectangle([bx, cy + 160 - bh, bx + 70, cy + 160], fill=color, outline=(40, 20, 5), width=2)
    elif slug == "laser-cut-wooden-puzzle-box":
        draw.rectangle([cx - 180, cy - 120, cx + 180, cy + 140], fill=(185, 125, 65), outline=(85, 45, 15), width=5)
        for sy in range(cy - 80, cy + 100, 40):
            draw.polygon([(cx - 180, sy), (cx - 150, sy + 15), (cx - 150, sy + 25), (cx - 180, sy + 40)], fill=(225, 185, 125), outline=(60, 30, 10))
            draw.polygon([(cx + 180, sy), (cx + 150, sy + 15), (cx + 150, sy + 25), (cx + 180, sy + 40)], fill=(225, 185, 125), outline=(60, 30, 10))
    elif slug == "laser-engraved-bamboo-desk-organizer":
        draw.rectangle([cx - 240, cy - 110, cx + 240, cy + 150], fill=(215, 180, 120), outline=(130, 90, 40), width=5)
        draw.rectangle([cx - 210, cy - 80, cx - 40, cy + 120], fill=(160, 120, 70), outline=(90, 55, 20), width=3)
        draw.rectangle([cx - 10, cy - 80, cx + 210, cy + 20], fill=(160, 120, 70), outline=(90, 55, 20), width=3)
    elif slug == "laser-cut-decorative-geometric-lamp":
        draw.ellipse([cx - 180, cy - 180, cx + 180, cy + 180], fill=(245, 195, 105), outline=(120, 75, 25), width=5)
        for a in range(0, 360, 60):
            rad = math.radians(a)
            draw.polygon([(cx, cy), (cx + int(160 * math.cos(rad)), cy + int(160 * math.sin(rad))), (cx + int(160 * math.cos(rad + 0.8)), cy + int(160 * math.sin(rad + 0.8)))], fill=(255, 220, 140), outline=(130, 75, 20), width=3)

    # ==================== CNC MACHINING ====================
    elif slug == "cnc-relief-carved-wooden-decorative-panel":
        draw.rectangle([cx - 220, cy - 220, cx + 220, cy + 220], fill=(165, 115, 60), outline=(90, 55, 20), width=6)
        for wy in range(cy - 180, cy + 200, 30):
            draw.arc([cx - 200, wy - 40, cx + 200, wy + 40], start=0, end=180, fill=(215, 165, 105), width=5)
    elif slug == "cnc-milled-hardwood-keepsake-box":
        draw.rectangle([cx - 220, cy - 130, cx + 220, cy + 150], fill=(145, 100, 55), outline=(80, 45, 15), width=5)
        draw.rectangle([cx - 180, cy - 90, cx + 180, cy + 110], fill=(195, 145, 85), outline=(60, 35, 10), width=3)
    elif slug == "cnc-precision-aluminium-fixture-plate":
        draw.rectangle([cx - 240, cy - 180, cx + 240, cy + 180], fill=(215, 225, 235), outline=(130, 140, 155), width=5)
        for fx in range(cx - 180, cx + 200, 45):
            for fy in range(cy - 130, cy + 150, 45):
                draw.ellipse([fx - 10, fy - 10, fx + 10, fy + 10], fill=(45, 50, 60), outline=(170, 180, 195), width=2)
    elif slug == "cnc-machined-high-precision-spur-gear":
        draw.ellipse([cx - 180, cy - 180, cx + 180, cy + 180], fill=(205, 215, 225), outline=(120, 130, 145), width=5)
        for i in range(16):
            a = i * (math.pi / 8)
            tx = cx + int(195 * math.cos(a))
            ty = cy + int(195 * math.sin(a))
            draw.ellipse([tx - 18, ty - 18, tx + 18, ty + 18], fill=(175, 185, 198))
        draw.ellipse([cx - 60, cy - 60, cx + 60, cy + 60], fill=(30, 35, 45), outline=(245, 250, 255), width=3)
    elif slug == "cnc-machined-aluminium-heat-sink":
        draw.rectangle([cx - 220, cy - 130, cx + 220, cy + 150], fill=(30, 33, 38), outline=(60, 65, 75), width=4)
        for fx in range(cx - 190, cx + 200, 35):
            draw.rectangle([fx, cy - 160, fx + 16, cy + 110], fill=(45, 48, 56), outline=(90, 95, 110), width=2)
    elif slug == "cnc-machined-brass-knob-set":
        for i, offset in enumerate([(-100, -60), (100, -60), (-100, 80), (100, 80)]):
            kx, ky = cx + offset[0], cy + offset[1]
            draw.ellipse([kx - 65, ky - 65, kx + 65, ky + 65], fill=(235, 185, 45), outline=(150, 110, 20), width=4)
            draw.ellipse([kx - 45, ky - 45, kx + 45, ky + 45], fill=(255, 215, 75), outline=(180, 135, 25), width=2)
            draw.rectangle([kx - 4, ky - 45, kx + 4, ky - 20], fill=(40, 30, 10))
    elif slug == "cnc-precision-aluminium-mounting-block":
        draw.rectangle([cx - 200, cy - 120, cx + 200, cy + 140], fill=(205, 215, 225), outline=(130, 140, 155), width=5)
        draw.ellipse([cx - 80, cy - 70, cx + 80, cy + 90], fill=(30, 35, 45), outline=(255, 255, 255), width=3)
    elif slug == "cnc-machined-stainless-steel-coupling":
        draw.rectangle([cx - 110, cy - 180, cx + 110, cy + 180], fill=(215, 222, 230), outline=(130, 140, 155), width=4)
        for sy in range(cy - 100, cy + 100, 30):
            draw.line([(cx - 95, sy), (cx + 95, sy + 15)], fill=(30, 35, 45), width=6)
    elif slug == "cnc-machined-aluminium-motor-mount":
        draw.rectangle([cx - 180, cy - 150, cx + 180, cy + 150], fill=(215, 35, 55), outline=(140, 15, 30), width=5)
        draw.ellipse([cx - 80, cy - 80, cx + 80, cy + 80], fill=(30, 32, 40), outline=(255, 255, 255), width=3)
    elif slug == "cnc-machined-precision-bearing-housing":
        draw.ellipse([cx - 180, cy - 180, cx + 180, cy + 180], fill=(195, 205, 215), outline=(120, 130, 145), width=6)
        draw.ellipse([cx - 95, cy - 95, cx + 95, cy + 95], fill=(30, 35, 45), outline=(245, 250, 255), width=4)

    # ==================== ELECTRONICS ====================
    elif slug == "esp32-dual-core-iot-development-board":
        draw.rectangle([cx - 140, cy - 200, cx + 140, cy + 200], fill=(25, 28, 35), outline=(45, 50, 60), width=4)
        draw.rectangle([cx - 100, cy - 150, cx + 100, cy + 50], fill=(225, 230, 238), outline=(160, 170, 185), width=3)
        for y in range(cy - 180, cy + 180, 24):
            draw.rectangle([cx - 130, y, cx - 115, y + 12], fill=(225, 185, 45))
            draw.rectangle([cx + 115, y, cx + 130, y + 12], fill=(225, 185, 45))
    elif slug == "37-piece-iot-sensor-module-starter-kit":
        draw.rectangle([cx - 240, cy - 180, cx + 240, cy + 180], fill=(235, 240, 248), outline=(170, 180, 195), width=4)
        for row in range(3):
            for col in range(4):
                mx, my = cx - 210 + col * 110, cy - 140 + row * 105
                draw.rectangle([mx, my, mx + 95, my + 85], fill=(25, 115, 185) if (row+col)%2==0 else (20, 120, 60), outline=(200, 210, 225), width=2)
    elif slug == "double-sided-fr4-prototype-pcb-pack":
        for i in range(3):
            ox, oy = (i - 1) * 20, (i - 1) * 20
            draw.rectangle([cx - 180 + ox, cy - 180 + oy, cx + 180 + ox, cy + 180 + oy], fill=(20, 125, 65), outline=(12, 85, 40), width=4)
        for px in range(cx - 140, cx + 160, 25):
            for py in range(cy - 140, cy + 160, 25):
                draw.ellipse([px - 4, py - 4, px + 4, py + 4], fill=(235, 185, 45))
    elif slug == "arduino-compatible-atmega328p-microcontroller":
        draw.rectangle([cx - 220, cy - 140, cx + 220, cy + 140], fill=(18, 95, 145), outline=(12, 70, 110), width=4)
        draw.rectangle([cx - 120, cy - 40, cx + 120, cy + 40], fill=(35, 38, 45), outline=(20, 22, 28), width=3)
        draw.rectangle([cx - 210, cy - 120, cx - 140, cy - 50], fill=(215, 220, 230)) # USB-B
    elif slug == "i2c-096-inch-oled-display-module":
        draw.rectangle([cx - 160, cy - 140, cx + 160, cy + 140], fill=(22, 75, 155), outline=(15, 55, 120), width=4)
        draw.rectangle([cx - 120, cy - 80, cx + 120, cy + 90], fill=(10, 12, 16), outline=(60, 65, 75), width=3)
        draw.line([(cx - 90, cy), (cx - 30, cy - 30), (cx + 30, cy + 20), (cx + 90, cy - 20)], fill=(0, 225, 255), width=4)
    elif slug == "esp32-oled-iot-display-kit":
        draw.rectangle([cx - 190, cy - 210, cx + 190, cy + 210], fill=(25, 28, 35), outline=(45, 50, 60), width=4)
        draw.rectangle([cx - 130, cy - 150, cx + 130, cy - 20], fill=(10, 12, 18), outline=(80, 90, 110), width=3)
        draw.line([(cx - 100, cy - 80), (cx - 40, cy - 110), (cx + 30, cy - 60), (cx + 90, cy - 95)], fill=(0, 235, 255), width=4)
        draw.rectangle([cx - 110, cy + 20, cx + 110, cy + 150], fill=(225, 230, 238), outline=(160, 170, 185), width=3)
    elif slug == "arduino-sensor-expansion-shield":
        draw.rectangle([cx - 220, cy - 150, cx + 220, cy + 170], fill=(18, 95, 160), outline=(10, 60, 110), width=4)
        for gx in range(cx - 170, cx + 180, 35):
            draw.rectangle([gx, cy - 90, gx + 18, cy - 60], fill=(235, 40, 40))
            draw.rectangle([gx, cy - 45, gx + 18, cy - 15], fill=(20, 180, 60))
            draw.rectangle([gx, cy + 0, gx + 18, cy + 30], fill=(235, 195, 30))
    elif slug == "raspberry-pi-gpio-prototype-board":
        draw.rectangle([cx - 230, cy - 140, cx + 230, cy + 160], fill=(20, 125, 65), outline=(12, 85, 40), width=4)
        draw.rectangle([cx - 200, cy - 110, cx + 200, cy - 80], fill=(25, 28, 35))
        for px in range(cx - 180, cx + 180, 20):
            for py in range(cy - 40, cy + 120, 20):
                draw.ellipse([px - 4, py - 4, px + 4, py + 4], fill=(235, 185, 45))
    elif slug == "8-channel-relay-module":
        draw.rectangle([cx - 240, cy - 150, cx + 240, cy + 170], fill=(20, 115, 60), outline=(12, 80, 40), width=4)
        for i in range(8):
            rx = cx - 215 + i * 54
            draw.rectangle([rx, cy - 90, rx + 44, cy + 50], fill=(25, 120, 225), outline=(15, 75, 150), width=2)
    elif slug == "lora-wireless-communication-module":
        draw.rectangle([cx - 170, cy - 170, cx + 170, cy + 170], fill=(18, 75, 140), outline=(10, 50, 100), width=4)
        draw.rectangle([cx - 120, cy - 110, cx + 120, cy + 90], fill=(225, 230, 240), outline=(150, 160, 175), width=3)
        draw.ellipse([cx + 70, cy - 70, cx + 100, cy - 40], fill=(225, 185, 45))
    elif slug == "usb-c-power-delivery-development-board":
        draw.rectangle([cx - 180, cy - 120, cx + 180, cy + 140], fill=(30, 33, 42), outline=(60, 68, 85), width=4)
        draw.rectangle([cx - 190, cy - 30, cx - 140, cy + 30], fill=(210, 215, 225))
        draw.rectangle([cx + 50, cy - 60, cx + 140, cy + 20], fill=(10, 12, 16), outline=(0, 225, 255), width=2)
    elif slug == "4-channel-motor-driver-module":
        draw.rectangle([cx - 200, cy - 140, cx + 200, cy + 160], fill=(215, 35, 45), outline=(140, 15, 25), width=4)
        draw.rectangle([cx - 70, cy - 170, cx + 70, cy - 60], fill=(30, 33, 40), outline=(90, 95, 105), width=3)
        draw.ellipse([cx - 130, cy + 20, cx - 80, cy + 70], fill=(35, 40, 48))

    # ==================== DRONES & PARTS ====================
    elif slug == "5-inch-fpv-racing-3k-carbon-fiber-drone-frame":
        for angle in [45, 135, 225, 315]:
            rad = math.radians(angle)
            ex = cx + int(240 * math.cos(rad))
            ey = cy + int(240 * math.sin(rad))
            draw.line([(cx, cy), (ex, ey)], fill=(38, 42, 48), width=32)
            draw.ellipse([ex - 22, ey - 22, ex + 22, ey + 22], fill=(25, 28, 34), outline=(160, 32, 240), width=3)
        draw.rectangle([cx - 60, cy - 110, cx + 60, cy + 110], fill=(45, 48, 56), outline=(75, 80, 92), width=4)
    elif slug == "2207-2450kv-high-power-brushless-drone-motor":
        draw.ellipse([cx - 160, cy - 160, cx + 160, cy + 160], fill=(20, 140, 200), outline=(15, 95, 140), width=5)
        for i in range(6):
            a = i * (math.pi / 3)
            draw.line([(cx, cy), (cx + int(140 * math.cos(a)), cy + int(140 * math.sin(a)))], fill=(225, 235, 245), width=6)
        draw.ellipse([cx - 95, cy - 95, cx + 95, cy + 95], fill=(195, 105, 30), outline=(140, 70, 15), width=6)
        draw.ellipse([cx - 35, cy - 35, cx + 35, cy + 35], fill=(215, 225, 235))
    elif slug == "5-inch-tri-blade-fpv-drone-propellers-pack":
        for i in range(3):
            a = i * (2 * math.pi / 3) - math.pi/2
            draw.polygon([(cx, cy), (cx + int(230 * math.cos(a - 0.2)), cy + int(230 * math.sin(a - 0.2))), (cx + int(250 * math.cos(a)), cy + int(250 * math.sin(a))), (cx + int(220 * math.cos(a + 0.2)), cy + int(220 * math.sin(a + 0.2)))], fill=(0, 185, 235), outline=(0, 130, 175))
        draw.ellipse([cx - 40, cy - 40, cx + 40, cy + 40], fill=(0, 140, 185))
    elif slug == "30a-4-in-1-blheli-s-electronic-speed-controller":
        draw.rectangle([cx - 180, cy - 180, cx + 180, cy + 180], fill=(30, 33, 40), outline=(50, 55, 65), width=3)
        for qx, qy in [(cx - 120, cy - 120), (cx + 60, cy - 120), (cx - 120, cy + 60), (cx + 60, cy + 60)]:
            draw.rectangle([qx, qy, qx + 60, qy + 60], fill=(15, 17, 22), outline=(80, 85, 95), width=2)
    elif slug == "omnidirectional-58ghz-fpv-cloverleaf-antenna":
        for i in range(3):
            a = i * (2 * math.pi / 3) - math.pi/2
            lx, ly = cx + int(90 * math.cos(a)), cy - 80 + int(90 * math.sin(a))
            draw.arc([lx - 50, ly - 50, lx + 50, ly + 50], start=0, end=360, fill=(215, 40, 40), width=6)
        draw.rectangle([cx - 8, cy - 40, cx + 8, cy + 180], fill=(215, 40, 40))
        draw.rectangle([cx - 20, cy + 180, cx + 20, cy + 230], fill=(225, 185, 45))
    elif slug == "fpv-drone-motor-mount-set":
        for i, offset in enumerate([(-100, -60), (100, -60), (-100, 80), (100, 80)]):
            mx, my = cx + offset[0], cy + offset[1]
            draw.ellipse([mx - 65, my - 65, mx + 65, my + 65], fill=(20, 135, 225), outline=(10, 85, 160), width=4)
            draw.ellipse([mx - 25, my - 25, mx + 25, my + 25], fill=(245, 248, 252))
    elif slug == "5-inch-fpv-drone-propeller-guard":
        draw.ellipse([cx - 220, cy - 220, cx + 220, cy + 220], fill=(25, 28, 35), outline=(225, 35, 55), width=12)
        draw.ellipse([cx - 170, cy - 170, cx + 170, cy + 170], fill=(245, 248, 252))
    elif slug == "carbon-fiber-drone-arm-set":
        for i, angle in enumerate([45, 135, 225, 315]):
            rad = math.radians(angle)
            ex = cx + int(240 * math.cos(rad))
            ey = cy + int(240 * math.sin(rad))
            draw.line([(cx, cy), (ex, ey)], fill=(40, 44, 52), width=32)
            draw.ellipse([ex - 24, ey - 24, ex + 24, ey + 24], fill=(25, 28, 34), outline=(100, 110, 125), width=3)
    elif slug == "fpv-drone-battery-strap-kit":
        for y_off, color in [(-70, (225, 35, 55)), (0, (20, 135, 225)), (70, (245, 195, 30))]:
            draw.rectangle([cx - 240, cy + y_off - 20, cx + 200, cy + y_off + 20], fill=color, outline=(25, 28, 35), width=2)
            draw.rectangle([cx + 190, cy + y_off - 28, cx + 240, cy + y_off + 28], fill=(215, 222, 230), outline=(120, 130, 145), width=3)
    elif slug == "drone-gps-module":
        draw.ellipse([cx - 130, cy - 130, cx + 130, cy + 130], fill=(30, 33, 40), outline=(60, 68, 80), width=4)
        draw.rectangle([cx - 70, cy - 70, cx + 70, cy + 70], fill=(225, 230, 240), outline=(150, 160, 175), width=3)
    elif slug == "fpv-camera-mount":
        draw.polygon([(cx - 120, cy + 120), (cx + 120, cy + 120), (cx + 80, cy - 140), (cx - 80, cy - 140)], fill=(45, 215, 85), outline=(25, 145, 55), width=5)
        draw.ellipse([cx - 45, cy - 60, cx + 45, cy + 30], fill=(25, 28, 35), outline=(255, 255, 255), width=3)
    elif slug == "brushless-motor-propeller-adapter":
        for i, offset in enumerate([(-90, -50), (90, -50), (-90, 70), (90, 70)]):
            nx, ny = cx + offset[0], cy + offset[1]
            draw.polygon([(nx - 45, ny), (nx - 22, ny - 38), (nx + 22, ny - 38), (nx + 45, ny), (nx + 22, ny + 38), (nx - 22, ny + 38)], fill=(215, 35, 55) if i%2==0 else (0, 195, 235), outline=(25, 28, 35), width=3)
            draw.ellipse([nx - 18, ny - 18, nx + 18, ny + 18], fill=(30, 35, 42))

    # ==================== ACRYLIC PRODUCTS ====================
    elif slug == "crystal-clear-cast-acrylic-showcase-cube-box":
        draw.rectangle([cx - 220, cy + 120, cx + 220, cy + 180], fill=(25, 28, 35), outline=(10, 12, 15), width=3)
        draw.rectangle([cx - 180, cy - 180, cx + 180, cy + 120], fill=(235, 245, 255), outline=(150, 195, 235), width=4)
        draw.line([(cx - 150, cy - 160), (cx - 165, cy + 100)], fill=(255, 255, 255), width=5)
    elif slug == "laser-engraved-beveled-acrylic-award-trophy":
        pts = [(cx - 90, cy - 200), (cx + 90, cy - 200), (cx + 130, cy - 90), (cx + 130, cy + 160), (cx - 130, cy + 160), (cx - 130, cy - 90)]
        draw.polygon(pts, fill=(240, 248, 255), outline=(150, 195, 235), width=5)
        draw.arc([cx - 60, cy - 40, cx + 60, cy + 80], start=30, end=330, fill=(255, 255, 255), width=5)
    elif slug == "high-clarity-heavy-duty-acrylic-sneeze-shield":
        draw.rectangle([cx - 240, cy - 200, cx + 240, cy + 180], fill=(238, 246, 255), outline=(160, 205, 240), width=4)
        draw.rectangle([cx - 90, cy + 120, cx + 90, cy + 180], fill=(248, 250, 253), outline=(160, 205, 240), width=4)
    elif slug == "desktop-acrylic-slanted-brochure-menu-holder":
        draw.polygon([(cx - 130, cy - 200), (cx + 130, cy - 200), (cx + 140, cy + 160), (cx - 140, cy + 160)], fill=(238, 246, 255), outline=(160, 205, 240), width=4)
        draw.polygon([(cx - 140, cy + 160), (cx + 140, cy + 160), (cx + 160, cy + 200), (cx - 160, cy + 200)], fill=(225, 240, 255), outline=(150, 195, 235), width=4)
    elif slug == "multi-tiered-clear-acrylic-cosmetic-display-riser":
        for tier, (w, y_top, y_bot) in enumerate([(420, 100, 150), (340, 20, 70), (260, -60, -10)]):
            draw.rectangle([cx - w//2, cy + y_top, cx + w//2, cy + y_bot], fill=(235, 245, 255), outline=(150, 195, 235), width=3)
    elif slug == "clear-acrylic-business-card-holder":
        draw.polygon([(cx - 180, cy - 100), (cx + 180, cy - 100), (cx + 200, cy + 120), (cx - 200, cy + 120)], fill=(235, 245, 255), outline=(150, 195, 235), width=4)
        draw.rectangle([cx - 150, cy - 40, cx + 150, cy + 60], fill=(255, 255, 255), outline=(180, 210, 240), width=2)
    elif slug == "acrylic-qr-code-display-stand":
        draw.rectangle([cx - 140, cy - 180, cx + 140, cy + 120], fill=(245, 215, 60), outline=(180, 140, 20), width=5)
        draw.rectangle([cx - 120, cy - 160, cx + 120, cy + 100], fill=(240, 248, 255), outline=(150, 195, 235), width=3)
        draw.rectangle([cx - 70, cy - 110, cx + 70, cy + 30], fill=(25, 28, 35))
        draw.rectangle([cx - 170, cy + 120, cx + 170, cy + 180], fill=(160, 110, 60))
    elif slug == "acrylic-product-display-box":
        draw.rectangle([cx - 200, cy + 120, cx + 200, cy + 180], fill=(25, 28, 35), outline=(10, 12, 15), width=3)
        draw.rectangle([cx - 170, cy - 160, cx + 170, cy + 120], fill=(235, 245, 255), outline=(150, 195, 235), width=4)
    elif slug == "acrylic-jewelry-display-stand":
        draw.ellipse([cx - 110, cy + 130, cx + 110, cy + 190], fill=(230, 242, 255), outline=(150, 195, 235), width=3)
        draw.rectangle([cx - 15, cy - 160, cx + 15, cy + 150], fill=(235, 245, 255), outline=(150, 195, 235), width=3)
        draw.rectangle([cx - 200, cy - 180, cx + 200, cy - 140], fill=(235, 245, 255), outline=(150, 195, 235), width=3)
    elif slug == "acrylic-menu-stand":
        draw.rectangle([cx - 180, cy + 140, cx + 180, cy + 190], fill=(225, 240, 255), outline=(150, 195, 235), width=4)
        draw.rectangle([cx - 140, cy - 200, cx + 140, cy + 140], fill=(240, 248, 255), outline=(150, 195, 235), width=4)
    elif slug == "acrylic-desktop-sign-holder":
        draw.polygon([(cx - 160, cy - 120), (cx + 160, cy - 120), (cx + 190, cy + 140), (cx - 190, cy + 140)], fill=(235, 245, 255), outline=(150, 195, 235), width=4)
    elif slug == "multi-level-acrylic-display-shelf":
        for tier, (w, y_top, y_bot) in enumerate([(440, 120, 160), (360, 50, 90), (280, -20, 20), (200, -90, -50)]):
            draw.rectangle([cx - w//2, cy + y_top, cx + w//2, cy + y_bot], fill=(235, 245, 255), outline=(140, 185, 230), width=3)

    # ==================== DIY KITS ====================
    elif slug == "autonomous-4wd-smart-robotic-stem-starter-kit":
        draw.rectangle([cx - 240, cy - 170, cx + 240, cy + 190], fill=(240, 245, 252), outline=(180, 190, 205), width=4)
        draw.rectangle([cx - 200, cy - 130, cx + 20, cy + 90], fill=(225, 240, 255), outline=(140, 185, 230), width=3)
        for mx, my in [(cx + 60, cy - 130), (cx + 150, cy - 130), (cx + 60, cy - 20), (cx + 150, cy - 20)]:
            draw.rectangle([mx, my, mx + 75, my + 60], fill=(245, 195, 30))
    elif slug == "educational-electronics-soldering-practice-kit":
        draw.rectangle([cx - 240, cy - 170, cx + 240, cy + 190], fill=(35, 45, 60), outline=(20, 28, 40), width=4)
        draw.ellipse([cx - 200, cy - 130, cx - 20, cy + 50], fill=(20, 115, 65), outline=(12, 85, 45), width=3)
        for lx, color in [(cx + 20, (235, 40, 40)), (cx + 80, (40, 205, 70)), (cx + 140, (30, 120, 245))]:
            draw.ellipse([lx, cy - 100, lx + 35, cy - 65], fill=color)
    elif slug == "diy-portable-bluetooth-stereo-speaker-maker-kit":
        draw.rectangle([cx - 240, cy - 170, cx + 240, cy + 190], fill=(245, 248, 252), outline=(190, 200, 215), width=4)
        draw.rectangle([cx - 200, cy - 130, cx + 200, cy + 40], fill=(225, 195, 145), outline=(145, 110, 65), width=4)
        draw.ellipse([cx - 140, cy - 90, cx - 40, cy + 10], fill=(25, 28, 35))
        draw.ellipse([cx + 40, cy - 90, cx + 140, cy + 10], fill=(25, 28, 35))
    elif slug == "miniature-solar-powered-stem-rover-buggy-kit":
        draw.rectangle([cx - 240, cy - 170, cx + 240, cy + 190], fill=(245, 248, 252), outline=(190, 200, 215), width=4)
        draw.rectangle([cx - 150, cy - 140, cx + 150, cy - 30], fill=(25, 35, 65), outline=(200, 215, 240), width=4)
        draw.rectangle([cx - 120, cy - 10, cx + 120, cy + 120], fill=(225, 195, 145), outline=(145, 110, 65), width=3)
    elif slug == "smart-weather-station-iot-esp8266-maker-kit":
        draw.rectangle([cx - 240, cy - 170, cx + 240, cy + 190], fill=(245, 248, 252), outline=(190, 200, 215), width=4)
        draw.rectangle([cx - 200, cy - 130, cx - 30, cy + 60], fill=(25, 30, 38))
        draw.rectangle([cx + 20, cy - 130, cx + 120, cy - 10], fill=(30, 120, 220))
        draw.rectangle([cx + 20, cy + 10, cx + 180, cy + 140], fill=(12, 15, 20), outline=(0, 225, 255), width=2)
    elif slug == "diy-arduino-robot-car-kit":
        draw.rectangle([cx - 240, cy - 170, cx + 240, cy + 190], fill=(240, 245, 252), outline=(180, 190, 205), width=4)
        draw.rectangle([cx - 180, cy - 110, cx + 40, cy + 130], fill=(225, 240, 255), outline=(140, 185, 230), width=3)
        draw.ellipse([cx + 70, cy - 90, cx + 170, cy + 10], fill=(30, 32, 38), outline=(245, 195, 30), width=4)
        draw.ellipse([cx + 70, cy + 30, cx + 170, cy + 130], fill=(30, 32, 38), outline=(245, 195, 30), width=4)
    elif slug == "diy-mini-weather-station-kit":
        draw.rectangle([cx - 240, cy - 170, cx + 240, cy + 190], fill=(240, 245, 252), outline=(180, 190, 205), width=4)
        draw.rectangle([cx - 190, cy - 120, cx + 30, cy + 20], fill=(25, 115, 215), outline=(15, 75, 150), width=3)
        draw.rectangle([cx + 60, cy - 120, cx + 180, cy + 20], fill=(30, 120, 220))
        draw.rectangle([cx - 190, cy + 50, cx + 190, cy + 150], fill=(20, 115, 65))
    elif slug == "diy-led-matrix-display-kit":
        draw.rectangle([cx - 240, cy - 170, cx + 240, cy + 190], fill=(240, 245, 252), outline=(180, 190, 205), width=4)
        for seg in range(4):
            mx = cx - 210 + seg * 105
            draw.rectangle([mx, cy - 80, mx + 95, cy + 80], fill=(20, 22, 28), outline=(225, 35, 45), width=3)
            for dot_x in range(mx + 12, mx + 85, 12):
                for dot_y in range(cy - 65, cy + 65, 16):
                    draw.ellipse([dot_x - 4, dot_y - 4, dot_x + 4, dot_y + 4], fill=(235, 40, 40))
    elif slug == "diy-smart-plant-monitoring-kit":
        draw.rectangle([cx - 240, cy - 170, cx + 240, cy + 190], fill=(240, 245, 252), outline=(180, 190, 205), width=4)
        draw.rectangle([cx - 190, cy - 120, cx - 50, cy + 120], fill=(20, 115, 65))
        draw.rectangle([cx - 20, cy - 120, cx + 80, cy - 20], fill=(25, 28, 35))
        draw.rectangle([cx + 100, cy - 120, cx + 200, cy - 20], fill=(25, 115, 210))
        draw.rectangle([cx - 20, cy + 10, cx + 200, cy + 140], fill=(18, 95, 160))
    elif slug == "diy-line-following-robot-kit":
        draw.rectangle([cx - 240, cy - 170, cx + 240, cy + 190], fill=(240, 245, 252), outline=(180, 190, 205), width=4)
        draw.rectangle([cx - 160, cy - 120, cx + 160, cy + 140], fill=(215, 35, 55), outline=(140, 15, 25), width=4)
        draw.ellipse([cx - 120, cy - 80, cx - 60, cy - 20], fill=(245, 215, 60))
        draw.ellipse([cx + 60, cy - 80, cx + 120, cy - 20], fill=(245, 215, 60))
        draw.rectangle([cx - 190, cy + 20, cx - 150, cy + 110], fill=(30, 32, 38))
        draw.rectangle([cx + 150, cy + 20, cx + 190, cy + 110], fill=(30, 32, 38))
    elif slug == "diy-solar-tracking-kit":
        draw.rectangle([cx - 240, cy - 170, cx + 240, cy + 190], fill=(240, 245, 252), outline=(180, 190, 205), width=4)
        draw.rectangle([cx - 140, cy - 180, cx + 140, cy - 40], fill=(25, 35, 65), outline=(200, 215, 240), width=4)
        draw.rectangle([cx - 50, cy - 20, cx + 50, cy + 80], fill=(20, 135, 225))
        draw.rectangle([cx - 120, cy + 90, cx + 120, cy + 160], fill=(225, 195, 145), outline=(140, 100, 50), width=3)
    elif slug == "diy-bluetooth-home-automation-kit":
        draw.rectangle([cx - 240, cy - 170, cx + 240, cy + 190], fill=(240, 245, 252), outline=(180, 190, 205), width=4)
        draw.rectangle([cx - 190, cy - 130, cx + 190, cy + 150], fill=(20, 115, 65), outline=(12, 85, 45), width=4)
        for i in range(4):
            draw.rectangle([cx - 160 + i * 80, cy - 80, cx - 90 + i * 80, cy + 20], fill=(25, 120, 225))
        draw.rectangle([cx - 160, cy + 40, cx - 60, cy + 120], fill=(18, 75, 140))

    img.save(dest_path, "JPEG", quality=95)
    print(f"[{idx+1:02d}/84] [RENDERED UNIQUE] {slug}")

print("All 84 unique images generated successfully.")
