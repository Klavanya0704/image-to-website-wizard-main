import os
import math
import hashlib
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageFont
import numpy as np

OUTPUT_DIR = r"public\products"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_cnc_panel(dest):
    # CNC Relief-Carved Wooden Decorative Panel (3D wave toolpaths in solid teak/walnut)
    img = Image.new("RGB", (1024, 1024), (245, 246, 248))
    draw = ImageDraw.Draw(img)
    # Studio floor shadow
    draw.ellipse([212, 750, 812, 850], fill=(210, 215, 225))
    
    # Wooden block 3D projection
    panel = Image.new("RGBA", (650, 650), (0, 0, 0, 0))
    pdraw = ImageDraw.Draw(panel)
    
    # Draw woodgrain base with warm teak tones
    for y in range(650):
        shade = int(145 + 25 * math.sin(y / 35.0) + 15 * math.cos(y / 15.0))
        pdraw.line([(0, y), (650, y)], fill=(shade + 30, shade, shade - 30, 255))
        
    # Carve 3D ballnose CNC toolpaths (ripples/waves)
    for x in range(0, 650, 6):
        for y in range(0, 650, 6):
            wave = math.sin(x / 40.0) * math.cos(y / 40.0)
            highlight = int(45 * wave)
            pdraw.ellipse([x - 3, y - 3, x + 3, y + 3], fill=(160 + highlight, 110 + highlight, 60 + highlight, 120))
            
    # Chamfer border
    pdraw.rectangle([0, 0, 649, 649], outline=(80, 50, 25, 255), width=8)
    pdraw.rectangle([8, 8, 641, 641], outline=(200, 160, 100, 200), width=3)
    
    img.paste(panel, (187, 187), panel)
    img = img.filter(ImageFilter.GaussianBlur(0.5))
    img.save(dest, "JPEG", quality=95)
    print(f"Rendered: {os.path.basename(dest)}")

def generate_cnc_box(dest):
    # CNC Milled Hardwood Keepsake Box (White oak pocket-milled box with magnetic lid)
    img = Image.new("RGB", (1024, 1024), (245, 246, 248))
    draw = ImageDraw.Draw(img)
    draw.ellipse([200, 720, 824, 840], fill=(210, 215, 225))
    
    # 3D isometric milled box
    box_w, box_h = 600, 420
    bx, by = 212, 340
    
    # Body
    for y in range(by, by + box_h):
        factor = (y - by) / box_h
        r = int(185 - 35 * factor)
        g = int(145 - 30 * factor)
        b = int(95 - 25 * factor)
        draw.line([(bx, y), (bx + box_w, y)], fill=(r, g, b))
        
    # Pocket-milled interior / recessed lid lip
    draw.rectangle([bx + 40, by + 40, bx + box_w - 40, by + box_h - 40], fill=(120, 85, 45), outline=(70, 45, 20), width=4)
    # Chamfered outer edges
    draw.rectangle([bx, by, bx + box_w, by + box_h], outline=(225, 195, 145), width=4)
    img.save(dest, "JPEG", quality=95)
    print(f"Rendered: {os.path.basename(dest)}")

def generate_cnc_fixture(dest):
    # CNC Precision Aluminium Fixture Plate (6061 aluminium tooling plate with tapped M6 hole grid)
    img = Image.new("RGB", (1024, 1024), (245, 246, 248))
    draw = ImageDraw.Draw(img)
    draw.ellipse([180, 750, 844, 850], fill=(210, 215, 225))
    
    # Aluminium Plate
    px, py, pw, ph = 212, 230, 600, 520
    # Fly-cut swirl texture
    for y in range(py, py + ph):
        factor = (y - py) / ph
        shade = int(210 + 25 * math.sin(y / 12.0) - 20 * factor)
        draw.line([(px, y), (px + pw, y)], fill=(shade, shade + 2, shade + 5))
        
    # Beveled edges
    draw.rectangle([px, py, px + pw, py + ph], outline=(140, 150, 165), width=6)
    draw.rectangle([px + 6, py + 6, px + pw - 6, py + ph - 6], outline=(255, 255, 255), width=2)
    
    # Grid of M6 tapped holes
    for gx in range(px + 60, px + pw - 40, 60):
        for gy in range(py + 60, py + ph - 40, 60):
            # Hole shadow & counterbore
            draw.ellipse([gx - 14, gy - 14, gx + 14, gy + 14], fill=(160, 170, 185), outline=(100, 110, 125), width=2)
            draw.ellipse([gx - 9, gy - 9, gx + 9, gy + 9], fill=(45, 50, 60), outline=(255, 255, 255, 120), width=1)
            # Thread spiral mark
            draw.arc([gx - 6, gy - 6, gx + 6, gy + 6], start=30, end=300, fill=(180, 190, 205), width=1)
            
    img.save(dest, "JPEG", quality=95)
    print(f"Rendered: {os.path.basename(dest)}")

def generate_cnc_gear(dest):
    # CNC Machined High-Precision Spur Gear (Stainless steel spur gear with cut involute teeth & keyway)
    img = Image.new("RGB", (1024, 1024), (245, 246, 248))
    draw = ImageDraw.Draw(img)
    cx, cy, r_outer, r_inner = 512, 512, 320, 250
    draw.ellipse([cx - 300, cy + 240, cx + 300, cy + 340], fill=(210, 215, 225))
    
    # Gear teeth
    num_teeth = 24
    for i in range(num_teeth):
        angle = (2 * math.pi / num_teeth) * i
        a1 = angle - 0.08
        a2 = angle + 0.08
        x1 = cx + math.cos(a1) * (r_outer + 35)
        y1 = cy + math.sin(a1) * (r_outer + 35)
        x2 = cx + math.cos(a2) * (r_outer + 35)
        y2 = cy + math.sin(a2) * (r_outer + 35)
        x3 = cx + math.cos(a2) * r_outer
        y3 = cy + math.sin(a2) * r_outer
        x4 = cx + math.cos(a1) * r_outer
        y4 = cy + math.sin(a1) * r_outer
        draw.polygon([(x1, y1), (x2, y2), (x3, y3), (x4, y4)], fill=(195, 205, 215), outline=(130, 140, 155))
        
    # Main gear disc with metallic brush gradient
    draw.ellipse([cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer], fill=(215, 222, 230), outline=(140, 150, 165), width=4)
    # Recessed web
    draw.ellipse([cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner], fill=(180, 190, 202), outline=(110, 120, 135), width=3)
    # Center bore & keyway
    draw.ellipse([cx - 85, cy - 85, cx + 85, cy + 85], fill=(30, 35, 45), outline=(245, 250, 255), width=3)
    # Keyway slot
    draw.rectangle([cx - 15, cy - 105, cx + 15, cy - 70], fill=(30, 35, 45), outline=(245, 250, 255), width=2)
    
    img.save(dest, "JPEG", quality=95)
    print(f"Rendered: {os.path.basename(dest)}")

# Run generators
generate_cnc_panel(os.path.join(OUTPUT_DIR, "cnc-relief-carved-wooden-decorative-panel.jpg"))
generate_cnc_box(os.path.join(OUTPUT_DIR, "cnc-milled-hardwood-keepsake-box.jpg"))
generate_cnc_fixture(os.path.join(OUTPUT_DIR, "cnc-precision-aluminium-fixture-plate.jpg"))
generate_cnc_gear(os.path.join(OUTPUT_DIR, "cnc-machined-high-precision-spur-gear.jpg"))
