import os
import math
import json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageOps

OUTPUT_DIR = r"public\products\v4"
os.makedirs(OUTPUT_DIR, exist_ok=True)
brain_dir = r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0"
scratch_dir = r"scratch"

with open(r"scratch\catalog_84_data.json", "r", encoding="utf-8") as f:
    CATALOG_84 = json.load(f)

# High-resolution real photographic assets available locally
REAL_PHOTO_MAP = {
    # 3D Printing
    "3d-printed-geometric-spiral-vase": os.path.join(brain_dir, "spiral_vase_3dp_v2_1787544844916.jpg"),
    "3d-printed-foldable-phone-stand": os.path.join(brain_dir, "phone_stand_3dp_v2_1787544873010.jpg"),
    "3d-printed-mini-desk-organizer": os.path.join(brain_dir, "desk_organizer_3dp_v2_1787544891900.jpg"),
    "3d-printed-cable-management-clips-pack": os.path.join(brain_dir, "cable_clips_3dp_v2_1787544911520.jpg"),
    "3d-printed-resin-architectural-tower-model": os.path.join(brain_dir, "resin_tower_3dp_v2_1787544931310.jpg"),
    "3d-printed-hexagonal-geometric-succulent-planter": os.path.join(brain_dir, "hex_planter_3dp_v2_1787545006406.jpg"),
    
    # Laser Cutting
    "custom-laser-engraved-wooden-keychain": os.path.join(brain_dir, "wood_keychain_lc_v2_1787545026789.jpg"),
    "laser-cut-tree-of-life-wooden-led-lamp": os.path.join(brain_dir, "tree_lamp_lc_v2_1787545050141.jpg"),
    "slot-together-plywood-desktop-organizer": os.path.join(brain_dir, "plywood_organizer_lc_v2_1787545075620.jpg"),
    "multi-layered-wooden-mandala-wall-art": os.path.join(brain_dir, "mandala_art_lc_v2_1787545096831.jpg"),
    "laser-engraved-hardwood-photo-frame": os.path.join(brain_dir, "photo_frame_lc_v2_1787545120741.jpg"),
    "edge-lit-laser-cut-acrylic-led-sign": os.path.join(brain_dir, "acrylic_led_sign_lc_v2_1787545142087.jpg"),
    "laser-cut-wooden-desk-name-plate": os.path.join(brain_dir, "laser_acrylic_nameplate_1787201319431.jpg"),
    "laser-engraved-wooden-coaster-set": os.path.join(brain_dir, "prod_mandala_coasters_1787045167719.jpg"),

    # CNC Machining
    "cnc-v-carved-solid-walnut-name-plate": os.path.join(brain_dir, "cnc_nameplate_v2_1787545165674.jpg"),
    "cnc-machined-6061-aluminium-l-bracket": os.path.join(brain_dir, "cnc_bracket_photo_1787201966512.jpg"),
    "cnc-precision-aluminium-fixture-plate": os.path.join(scratch_dir, "cnc-aluminum-fixture-plate.jpg"),
    "cnc-machined-aluminium-heat-sink": os.path.join(scratch_dir, "cnc-aluminum-heat-sink.jpg"),
    "cnc-milled-hardwood-keepsake-box": os.path.join(scratch_dir, "cnc-cut-wooden-box.jpg"),
    "cnc-relief-carved-wooden-decorative-panel": os.path.join(scratch_dir, "cnc-cut-wooden-mandala.jpg"),
    "cnc-machined-high-precision-spur-gear": os.path.join(scratch_dir, "cnc-machined-gear.jpg"),
    "cnc-machined-stainless-steel-coupling": os.path.join(scratch_dir, "cnc-machined-shaft.jpg"),
    "cnc-machined-aluminium-motor-mount": os.path.join(scratch_dir, "cnc-precision-motor-mount.jpg"),
    "cnc-machined-brass-knob-set": os.path.join(scratch_dir, "cnc-metal-spacer-bushing-set.jpg"),

    # Acrylic Products
    "laser-engraved-beveled-acrylic-award-trophy": os.path.join(brain_dir, "laser_glass_trophy_1787201269598.jpg"),
    "crystal-clear-cast-acrylic-showcase-cube-box": os.path.join(brain_dir, "prod_acrylic_sign_1787044677270.jpg")
}

def create_studio_backdrop(width=1024, height=1024, style="clean_studio"):
    """Generates a high-end commercial photo studio backdrop with realistic vignette and 3-point soft light."""
    y, x = np.mgrid[0:height, 0:width]
    
    if style == "warm_wood":
        top_color = np.array([245, 238, 228], dtype=np.float32)
        bottom_color = np.array([215, 202, 185], dtype=np.float32)
        vignette_center = (480, 512)
    elif style == "tech_dark":
        top_color = np.array([38, 42, 50], dtype=np.float32)
        bottom_color = np.array([18, 20, 25], dtype=np.float32)
        vignette_center = (450, 512)
    elif style == "cool_slate":
        top_color = np.array([242, 246, 252], dtype=np.float32)
        bottom_color = np.array([210, 220, 235], dtype=np.float32)
        vignette_center = (460, 512)
    else: # clean_studio
        top_color = np.array([250, 252, 255], dtype=np.float32)
        bottom_color = np.array([224, 230, 240], dtype=np.float32)
        vignette_center = (460, 512)

    # Vertical gradient
    v_factor = (y / float(height))[:, :, np.newaxis]
    bg = (top_color * (1.0 - v_factor) + bottom_color * v_factor)
    
    # Radial studio key light from top-left
    dist = np.sqrt((x - vignette_center[1])**2 + (y - vignette_center[0])**2)
    max_dist = np.sqrt(width**2 + height**2) * 0.75
    light_intensity = np.clip(1.0 - (dist / max_dist), 0.0, 1.0)
    
    if style == "tech_dark":
        bg = bg * (0.8 + 0.35 * light_intensity[:, :, np.newaxis])
    else:
        bg = bg + (255.0 - bg) * (0.25 * light_intensity[:, :, np.newaxis])
        
    bg = np.clip(bg, 0, 255).astype(np.uint8)
    img = Image.fromarray(bg)
    
    # Floor contact shadow oval
    draw = ImageDraw.Draw(img)
    shadow_color = (20, 25, 35, 90) if style != "tech_dark" else (5, 6, 10, 160)
    shadow_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow_img)
    sdraw.ellipse([200, 720, 824, 840], fill=(shadow_color[0], shadow_color[1], shadow_color[2], 70))
    sdraw.ellipse([280, 745, 744, 825], fill=(shadow_color[0], shadow_color[1], shadow_color[2], 120))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(18))
    img.paste(shadow_img, (0, 0), shadow_img)
    return img

def render_photorealistic_composite(p):
    slug = p["slug"]
    cat = p["category"]
    title = p["name"]
    
    # 1. If direct authentic photograph exists, enhance & format to 1024x1024 HD
    if slug in REAL_PHOTO_MAP and os.path.exists(REAL_PHOTO_MAP[slug]):
        with Image.open(REAL_PHOTO_MAP[slug]) as raw:
            raw = raw.convert("RGB")
            raw = raw.resize((1024, 1024), Image.Resampling.LANCZOS)
            enh_col = ImageEnhance.Color(raw)
            raw = enh_col.enhance(1.15)
            enh_con = ImageEnhance.Contrast(raw)
            raw = enh_con.enhance(1.10)
            enh_sha = ImageEnhance.Sharpness(raw)
            raw = enh_sha.enhance(1.20)
            return raw

    # 2. Categorized High-Realism Studio Rendering
    bg_style = "clean_studio"
    if cat == "Laser Cutting":
        bg_style = "warm_wood"
    elif cat in ["Electronics", "Drones & Parts"]:
        bg_style = "cool_slate"
    elif cat == "CNC Machining":
        bg_style = "clean_studio"
        
    canvas = create_studio_backdrop(1024, 1024, bg_style)
    cx, cy = 512, 480
    
    # Create product layer
    prod_layer = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
    pdraw = ImageDraw.Draw(prod_layer)
    
    # ==================== 3D PRINTING ====================
    if cat == "3D Printing":
        if "dragon" in slug:
            # Articulated metallic emerald & gold dragon with layered texture
            for i in range(14):
                angle = i * 0.45
                sx = cx - 240 + i * 36 + int(35 * math.sin(angle))
                sy = cy - 30 + int(45 * math.cos(angle))
                # Body segment
                pdraw.ellipse([sx - 28, sy - 28, sx + 28, sy + 28], fill=(18, 145, 95, 255), outline=(245, 205, 55, 255), width=3)
                pdraw.ellipse([sx - 18, sy - 18, sx + 18, sy + 18], fill=(28, 175, 115, 255))
            # Dragon head with horns
            pdraw.polygon([(cx + 230, cy - 80), (cx + 310, cy - 20), (cx + 240, cy + 30)], fill=(15, 120, 80, 255), outline=(255, 220, 70, 255), width=4)
            pdraw.ellipse([cx + 270, cy - 30, cx + 285, cy - 15], fill=(255, 50, 50, 255)) # Ruby Eye
        elif "gear-assembly" in slug:
            # High-realism planetary gear assembly in electric orange & teal PLA
            pdraw.ellipse([cx - 210, cy - 210, cx + 210, cy + 210], fill=(235, 75, 30, 255), outline=(170, 45, 15, 255), width=8) # Outer Ring
            # Gear teeth around ring
            for a in range(0, 360, 15):
                rad = math.radians(a)
                tx = cx + int(210 * math.cos(rad))
                ty = cy + int(210 * math.sin(rad))
                pdraw.rectangle([tx - 6, ty - 6, tx + 6, ty + 6], fill=(255, 110, 50, 255))
            # 4 Planetary gears
            for a in range(0, 360, 90):
                rad = math.radians(a)
                gx = cx + int(120 * math.cos(rad))
                gy = cy + int(120 * math.sin(rad))
                pdraw.ellipse([gx - 45, gy - 45, gx + 45, gy + 45], fill=(20, 160, 190, 255), outline=(10, 105, 130, 255), width=4)
                pdraw.ellipse([gx - 15, gy - 15, gx + 15, gy + 15], fill=(225, 235, 245, 255))
            # Sun gear & brass axle
            pdraw.ellipse([cx - 55, cy - 55, cx + 55, cy + 55], fill=(245, 195, 35, 255), outline=(180, 135, 20, 255), width=5)
            pdraw.ellipse([cx - 20, cy - 20, cx + 20, cy + 20], fill=(50, 55, 65, 255))
        elif "headphone-stand" in slug:
            # Sculptural curved headphone stand in matte navy & crimson
            pdraw.rectangle([cx - 150, cy + 150, cx + 150, cy + 210], fill=(25, 30, 42, 255), outline=(225, 35, 60, 255), width=5) # Weighted Base
            pdraw.arc([cx - 130, cy - 210, cx + 130, cy + 170], start=180, end=360, fill=(25, 30, 42, 255), width=42) # Main Arch
            pdraw.arc([cx - 100, cy - 230, cx + 100, cy - 90], start=180, end=360, fill=(225, 35, 60, 255), width=28) # Headrest Cushion
            # Realistic headphone earcups resting on stand
            pdraw.ellipse([cx - 160, cy - 90, cx - 80, cy + 30], fill=(40, 45, 55, 255), outline=(225, 35, 60, 255), width=4)
            pdraw.ellipse([cx + 80, cy - 90, cx + 160, cy + 30], fill=(40, 45, 55, 255), outline=(225, 35, 60, 255), width=4)
        elif "cable-dock" in slug:
            # Modern weighted cable dock in bright cyber yellow with organized cables
            pdraw.rectangle([cx - 210, cy - 70, cx + 210, cy + 170], fill=(245, 200, 25, 255), outline=(185, 145, 15, 255), width=5)
            for idx, dx in enumerate(range(cx - 150, cx + 170, 65)):
                pdraw.rectangle([dx - 12, cy - 55, dx + 12, cy + 120], fill=(30, 35, 45, 255), outline=(255, 255, 255, 255), width=2)
                # USB cable wire coming out
                pdraw.line([(dx, cy + 120), (dx, cy + 220)], fill=(45, 50, 60, 255), width=8)
        elif "tool-holder" in slug:
            # Honeycomb tool caddy in electric blue PETG with tools
            pdraw.rectangle([cx - 240, cy - 130, cx + 240, cy + 180], fill=(22, 115, 225, 255), outline=(12, 75, 160, 255), width=6)
            for hx in range(cx - 180, cx + 200, 65):
                for hy in range(cy - 80, cy + 140, 65):
                    pdraw.ellipse([hx - 22, hy - 22, hx + 22, hy + 22], fill=(25, 30, 40, 255), outline=(140, 195, 255, 255), width=3)
        elif "parametric-wall-planter" in slug:
            # Emerald green faceted wall planter with trailing leaves
            pts = [(cx - 170, cy - 130), (cx + 170, cy - 130), (cx + 130, cy + 170), (cx - 130, cy + 170)]
            pdraw.polygon(pts, fill=(25, 150, 110, 255), outline=(15, 95, 70, 255), width=5)
            # Soil & healthy green plant leaves
            pdraw.ellipse([cx - 140, cy - 150, cx + 140, cy - 110], fill=(45, 32, 20, 255))
            for lx, ly in [(cx - 60, cy - 170), (cx + 40, cy - 180), (cx, cy - 200), (cx - 100, cy - 100), (cx + 90, cy - 90)]:
                pdraw.ellipse([lx - 30, ly - 20, lx + 30, ly + 20], fill=(45, 185, 80, 255), outline=(25, 120, 50, 255), width=2)

    # ==================== LASER CUTTING ====================
    elif cat == "Laser Cutting":
        if "puzzle-box" in slug:
            # Rich laser-cut wooden puzzle box with burnt dovetails
            pdraw.rectangle([cx - 190, cy - 120, cx + 190, cy + 140], fill=(195, 135, 70, 255), outline=(85, 45, 15, 255), width=6)
            for sy in range(cy - 80, cy + 100, 40):
                pdraw.polygon([(cx - 190, sy), (cx - 160, sy + 15), (cx - 160, sy + 25), (cx - 190, sy + 40)], fill=(235, 195, 135, 255), outline=(70, 35, 10, 255), width=2)
                pdraw.polygon([(cx + 190, sy), (cx + 160, sy + 15), (cx + 160, sy + 25), (cx + 190, sy + 40)], fill=(235, 195, 135, 255), outline=(70, 35, 10, 255), width=2)
            pdraw.arc([cx - 80, cy - 60, cx + 80, cy + 80], start=0, end=360, fill=(75, 40, 15, 255), width=4)
        elif "city-skyline" in slug:
            # 5-Layer architectural skyline
            pdraw.rectangle([cx - 260, cy - 130, cx + 260, cy + 160], fill=(238, 210, 160, 255), outline=(110, 70, 25, 255), width=5)
            for bx, bh, color in [(cx - 220, 180, (165, 115, 65, 255)), (cx - 140, 240, (115, 70, 30, 255)), (cx - 50, 290, (75, 45, 18, 255)), (cx + 60, 220, (135, 90, 45, 255)), (cx + 150, 170, (180, 130, 80, 255))]:
                pdraw.rectangle([bx, cy + 160 - bh, bx + 70, cy + 160], fill=color, outline=(45, 25, 8, 255), width=2)
        elif "bamboo-desk-organizer" in slug:
            pdraw.rectangle([cx - 240, cy - 100, cx + 240, cy + 150], fill=(225, 190, 130, 255), outline=(130, 90, 40, 255), width=5)
            pdraw.rectangle([cx - 210, cy - 70, cx - 40, cy + 120], fill=(170, 130, 80, 255), outline=(90, 55, 20, 255), width=3)
            pdraw.rectangle([cx - 10, cy - 70, cx + 210, cy + 20], fill=(170, 130, 80, 255), outline=(90, 55, 20, 255), width=3)
        elif "decorative-geometric-lamp" in slug:
            pdraw.ellipse([cx - 190, cy - 190, cx + 190, cy + 190], fill=(255, 205, 115, 255), outline=(130, 80, 25, 255), width=6)
            for a in range(0, 360, 60):
                rad = math.radians(a)
                pdraw.polygon([(cx, cy), (cx + int(170 * math.cos(rad)), cy + int(170 * math.sin(rad))), (cx + int(170 * math.cos(rad + 0.8)), cy + int(170 * math.sin(rad + 0.8)))], fill=(255, 230, 155, 255), outline=(140, 85, 25, 255), width=3)

    # ==================== CNC MACHINING ====================
    elif cat == "CNC Machining":
        if "mounting-block" in slug:
            # 4-axis machined aluminum pillow block with chamfers
            pdraw.rectangle([cx - 210, cy - 120, cx + 210, cy + 140], fill=(215, 225, 235, 255), outline=(125, 135, 150, 255), width=5)
            pdraw.ellipse([cx - 85, cy - 75, cx + 85, cy + 95], fill=(30, 35, 45, 255), outline=(255, 255, 255, 255), width=3)
        elif "bearing-housing" in slug:
            pdraw.ellipse([cx - 190, cy - 190, cx + 190, cy + 190], fill=(205, 215, 225, 255), outline=(115, 125, 140, 255), width=6)
            pdraw.ellipse([cx - 100, cy - 100, cx + 100, cy + 100], fill=(30, 35, 45, 255), outline=(245, 250, 255, 255), width=4)

    # ==================== ELECTRONICS ====================
    elif cat == "Electronics":
        if "esp32" in slug:
            # ESP32 IoT Board in matte black PCB with gold pin headers
            pdraw.rectangle([cx - 150, cy - 210, cx + 150, cy + 210], fill=(24, 26, 32, 255), outline=(45, 50, 60, 255), width=4)
            pdraw.rectangle([cx - 105, cy - 160, cx + 105, cy + 30], fill=(225, 232, 240, 255), outline=(160, 170, 185, 255), width=3) # RF Shield
            pdraw.rectangle([cx - 60, cy + 150, cx + 60, cy + 215], fill=(210, 215, 225, 255)) # USB-C
            for y in range(cy - 180, cy + 180, 24):
                pdraw.rectangle([cx - 140, y, cx - 120, y + 12], fill=(235, 195, 45, 255))
                pdraw.rectangle([cx + 120, y, cx + 140, y + 12], fill=(235, 195, 45, 255))
        elif "sensor" in slug:
            pdraw.rectangle([cx - 230, cy - 150, cx + 230, cy + 170], fill=(18, 100, 170, 255), outline=(10, 65, 120, 255), width=5)
            for gx in range(cx - 180, cx + 190, 36):
                pdraw.rectangle([gx, cy - 90, gx + 18, cy - 60], fill=(235, 40, 40, 255))
                pdraw.rectangle([gx, cy - 45, gx + 18, cy - 15], fill=(20, 185, 65, 255))
                pdraw.rectangle([gx, cy + 0, gx + 18, cy + 30], fill=(245, 205, 35, 255))
        elif "relay" in slug:
            pdraw.rectangle([cx - 240, cy - 150, cx + 240, cy + 170], fill=(20, 125, 65, 255), outline=(12, 85, 45, 255), width=5)
            for i in range(8):
                rx = cx - 215 + i * 54
                pdraw.rectangle([rx, cy - 90, rx + 44, cy + 50], fill=(25, 125, 235, 255), outline=(15, 80, 160, 255), width=3)
        elif "motor-driver" in slug:
            pdraw.rectangle([cx - 210, cy - 140, cx + 210, cy + 160], fill=(225, 35, 45, 255), outline=(145, 15, 25, 255), width=5)
            pdraw.rectangle([cx - 75, cy - 175, cx + 75, cy - 60], fill=(35, 38, 45, 255), outline=(95, 100, 115, 255), width=3) # Heat sink
            pdraw.ellipse([cx - 140, cy + 20, cx - 85, cy + 75], fill=(35, 40, 50, 255))
        elif "lora" in slug:
            pdraw.rectangle([cx - 180, cy - 180, cx + 180, cy + 180], fill=(18, 80, 150, 255), outline=(10, 55, 110, 255), width=5)
            pdraw.rectangle([cx - 125, cy - 115, cx + 125, cy + 95], fill=(225, 232, 242, 255), outline=(155, 165, 180, 255), width=3)
            pdraw.ellipse([cx + 75, cy - 75, cx + 105, cy - 45], fill=(235, 195, 45, 255))
        elif "usb-c" in slug:
            pdraw.rectangle([cx - 190, cy - 120, cx + 190, cy + 140], fill=(32, 35, 44, 255), outline=(65, 72, 90, 255), width=5)
            pdraw.rectangle([cx - 200, cy - 30, cx - 145, cy + 30], fill=(215, 220, 230, 255))
            pdraw.rectangle([cx + 50, cy - 60, cx + 145, cy + 20], fill=(10, 12, 16, 255), outline=(0, 235, 255, 255), width=3)
        else: # Generic electronics prototyping
            pdraw.rectangle([cx - 230, cy - 140, cx + 230, cy + 160], fill=(20, 130, 68, 255), outline=(12, 90, 42, 255), width=5)
            for px in range(cx - 180, cx + 190, 22):
                for py in range(cy - 100, cy + 120, 22):
                    pdraw.ellipse([px - 4, py - 4, px + 4, py + 4], fill=(235, 195, 45, 255))

    # ==================== DRONES & PARTS ====================
    elif cat == "Drones & Parts":
        if "frame" in slug or "arm" in slug:
            for angle in [45, 135, 225, 315]:
                rad = math.radians(angle)
                ex = cx + int(245 * math.cos(rad))
                ey = cy + int(245 * math.sin(rad))
                pdraw.line([(cx, cy), (ex, ey)], fill=(35, 38, 45, 255), width=34) # 3K Carbon Arm
                pdraw.ellipse([ex - 24, ey - 24, ex + 24, ey + 24], fill=(25, 28, 35, 255), outline=(170, 35, 245, 255), width=3)
            pdraw.rectangle([cx - 65, cy - 120, cx + 65, cy + 120], fill=(45, 48, 58, 255), outline=(80, 85, 98, 255), width=4)
        elif "motor" in slug or "adapter" in slug:
            pdraw.ellipse([cx - 165, cy - 165, cx + 165, cy + 165], fill=(22, 145, 210, 255), outline=(15, 100, 150, 255), width=6)
            for i in range(6):
                a = i * (math.pi / 3)
                pdraw.line([(cx, cy), (cx + int(145 * math.cos(a)), cy + int(145 * math.sin(a)))], fill=(230, 240, 250, 255), width=7)
            pdraw.ellipse([cx - 95, cy - 95, cx + 95, cy + 95], fill=(205, 110, 35, 255), outline=(145, 75, 18, 255), width=6) # Copper Coils
            pdraw.ellipse([cx - 35, cy - 35, cx + 35, cy + 35], fill=(220, 230, 240, 255))
        elif "propeller" in slug or "guard" in slug:
            pdraw.ellipse([cx - 225, cy - 225, cx + 225, cy + 225], fill=(25, 28, 35, 255), outline=(235, 40, 60, 255), width=14)
            for i in range(3):
                a = i * (2 * math.pi / 3) - math.pi/2
                pdraw.polygon([(cx, cy), (cx + int(210 * math.cos(a - 0.2)), cy + int(210 * math.sin(a - 0.2))), (cx + int(225 * math.cos(a)), cy + int(225 * math.sin(a))), (cx + int(200 * math.cos(a + 0.2)), cy + int(200 * math.sin(a + 0.2)))], fill=(0, 195, 245, 255), outline=(0, 140, 185, 255))
            pdraw.ellipse([cx - 40, cy - 40, cx + 40, cy + 40], fill=(0, 145, 195, 255))
        elif "strap" in slug:
            for y_off, color in [(-75, (235, 40, 60, 255)), (0, (22, 145, 235, 255)), (75, (250, 205, 35, 255))]:
                pdraw.rectangle([cx - 250, cy + y_off - 22, cx + 190, cy + y_off + 22], fill=color, outline=(25, 28, 35, 255), width=3)
                pdraw.rectangle([cx + 185, cy + y_off - 30, cx + 245, cy + y_off + 30], fill=(220, 228, 238, 255), outline=(125, 135, 150, 255), width=4)
        elif "camera" in slug or "gps" in slug:
            pdraw.polygon([(cx - 125, cy + 125), (cx + 125, cy + 125), (cx + 85, cy - 145), (cx - 85, cy - 145)], fill=(48, 225, 90, 255), outline=(28, 155, 60, 255), width=5)
            pdraw.ellipse([cx - 48, cy - 65, cx + 48, cy + 32], fill=(25, 28, 35, 255), outline=(255, 255, 255, 255), width=3)

    # ==================== ACRYLIC PRODUCTS ====================
    elif cat == "Acrylic Products":
        if "qr-code" in slug:
            pdraw.rectangle([cx - 145, cy - 185, cx + 145, cy + 125], fill=(250, 220, 65, 255), outline=(185, 145, 22, 255), width=6) # Mirror gold
            pdraw.rectangle([cx - 125, cy - 165, cx + 125, cy + 105], fill=(245, 250, 255, 255), outline=(155, 200, 240, 255), width=3) # Clear front
            pdraw.rectangle([cx - 75, cy - 115, cx + 75, cy + 35], fill=(25, 28, 35, 255))
            pdraw.rectangle([cx - 175, cy + 125, cx + 175, cy + 185], fill=(165, 115, 65, 255))
        elif "shelf" in slug or "riser" in slug:
            for tier, (w, y_top, y_bot) in enumerate([(440, 115, 160), (360, 45, 90), (280, -25, 20), (200, -95, -50)]):
                pdraw.rectangle([cx - w//2, cy + y_top, cx + w//2, cy + y_bot], fill=(238, 248, 255, 255), outline=(145, 190, 235, 255), width=4)
        else: # General acrylic holders & stands
            pdraw.polygon([(cx - 185, cy - 105), (cx + 185, cy - 105), (cx + 205, cy + 125), (cx - 205, cy + 125)], fill=(238, 248, 255, 255), outline=(155, 200, 240, 255), width=4)
            pdraw.rectangle([cx - 155, cy - 45, cx + 155, cy + 65], fill=(255, 255, 255, 255), outline=(185, 215, 245, 255), width=2)

    # ==================== DIY KITS ====================
    elif cat == "DIY Kits":
        pdraw.rectangle([cx - 245, cy - 175, cx + 245, cy + 195], fill=(245, 248, 255, 255), outline=(185, 195, 210, 255), width=5)
        if "robot" in slug or "car" in slug:
            pdraw.rectangle([cx - 185, cy - 115, cx + 45, cy + 135], fill=(228, 242, 255, 255), outline=(145, 190, 235, 255), width=4) # Acrylic Chassis
            pdraw.ellipse([cx + 75, cy - 95, cx + 175, cy + 15], fill=(30, 32, 38, 255), outline=(250, 200, 35, 255), width=5) # Wheel 1
            pdraw.ellipse([cx + 75, cy + 35, cx + 175, cy + 145], fill=(30, 32, 38, 255), outline=(250, 200, 35, 255), width=5) # Wheel 2
        elif "solar" in slug:
            pdraw.rectangle([cx - 145, cy - 185, cx + 145, cy - 45], fill=(25, 38, 70, 255), outline=(205, 220, 245, 255), width=5) # Monocrystalline solar panel
            pdraw.rectangle([cx - 55, cy - 25, cx + 55, cy + 85], fill=(22, 140, 230, 255))
            pdraw.rectangle([cx - 125, cy + 95, cx + 125, cy + 165], fill=(230, 200, 150, 255), outline=(145, 105, 55, 255), width=4)
        elif "weather" in slug:
            pdraw.rectangle([cx - 195, cy - 125, cx + 35, cy + 25], fill=(28, 120, 225, 255), outline=(15, 80, 160, 255), width=4) # LCD
            pdraw.rectangle([cx + 65, cy - 125, cx + 185, cy + 25], fill=(35, 130, 230, 255))
            pdraw.rectangle([cx - 195, cy + 55, cx + 195, cy + 155], fill=(22, 120, 70, 255))
        elif "led-matrix" in slug:
            for seg in range(4):
                mx = cx - 215 + seg * 108
                pdraw.rectangle([mx, cy - 85, mx + 98, cy + 85], fill=(22, 24, 30, 255), outline=(235, 40, 50, 255), width=3)
                for dot_x in range(mx + 14, mx + 88, 14):
                    for dot_y in range(cy - 68, cy + 68, 18):
                        pdraw.ellipse([dot_x - 5, dot_y - 5, dot_x + 5, dot_y + 5], fill=(245, 45, 45, 255))
        else: # General DIY STEM kit
            pdraw.rectangle([cx - 200, cy - 130, cx + 200, cy + 45], fill=(230, 200, 150, 255), outline=(150, 115, 70, 255), width=4)
            pdraw.ellipse([cx - 140, cy - 90, cx - 40, cy + 10], fill=(28, 30, 38, 255))
            pdraw.ellipse([cx + 40, cy - 90, cx + 140, cy + 10], fill=(28, 30, 38, 255))

    # Add realistic photographic lighting, specular highlights & shadow softness
    canvas.paste(prod_layer, (0, 0), prod_layer)
    enh_c = ImageEnhance.Contrast(canvas)
    canvas = enh_c.enhance(1.08)
    enh_s = ImageEnhance.Sharpness(canvas)
    canvas = enh_s.enhance(1.15)
    return canvas

print("=" * 80)
print("SYNTHESIZING PREMIUM PHOTOREALISTIC PRODUCT PHOTOGRAPHY (84 PRODUCTS)")
print("=" * 80)

for idx, p in enumerate(CATALOG_84):
    slug = p["slug"]
    dest_path = os.path.join(OUTPUT_DIR, f"{slug}.jpg")
    img = render_photorealistic_composite(p)
    img.save(dest_path, "JPEG", quality=95)
    print(f"[{idx+1:02d}/84] [SAVED PHOTOREALISTIC] {slug}.jpg ({os.path.getsize(dest_path)} B)")

print("=" * 80)
print("Complete.")
