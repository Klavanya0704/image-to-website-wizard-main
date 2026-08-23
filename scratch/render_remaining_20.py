import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUTPUT_DIR = r"public\products"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def base_studio(shadow_w=500, shadow_h=120, shadow_y=760):
    img = Image.new("RGB", (1024, 1024), (246, 248, 250))
    draw = ImageDraw.Draw(img)
    # Studio soft shadow
    draw.ellipse([512 - shadow_w//2, shadow_y - shadow_h//2, 512 + shadow_w//2, shadow_y + shadow_h//2], fill=(215, 220, 228))
    return img, draw

# ==================== ELECTRONICS ====================
def render_esp32(dest):
    img, draw = base_studio(460, 100, 780)
    bx, by, bw, bh = 320, 240, 384, 520
    # Black matte PCB
    draw.rectangle([bx, by, bx + bw, by + bh], fill=(25, 28, 34), outline=(40, 45, 55), width=3)
    # USB-C Port
    draw.rectangle([bx + bw//2 - 40, by - 12, bx + bw//2 + 40, by + 16], fill=(210, 215, 225), outline=(130, 140, 155), width=2)
    # ESP32 RF Shield (Metal can)
    draw.rectangle([bx + 45, by + 50, bx + bw - 45, by + 280], fill=(225, 230, 238), outline=(160, 170, 185), width=3)
    # PCB Antenna trace at top
    draw.rectangle([bx + 60, by + 15, bx + bw - 60, by + 45], fill=(185, 145, 45), outline=(215, 175, 55), width=2)
    # Gold Pin Headers Left & Right
    for y in range(by + 50, by + bh - 40, 24):
        # Left header pin
        draw.rectangle([bx + 12, y, bx + 28, y + 14], fill=(215, 175, 45), outline=(255, 215, 0), width=1)
        # Right header pin
        draw.rectangle([bx + bw - 28, y, bx + bw - 12, y + 14], fill=(215, 175, 45), outline=(255, 215, 0), width=1)
    # Buttons
    draw.rectangle([bx + 55, by + bh - 55, bx + 95, by + bh - 25], fill=(190, 195, 205), outline=(100, 105, 115), width=2)
    draw.rectangle([bx + bw - 95, by + bh - 55, bx + bw - 55, by + bh - 25], fill=(190, 195, 205), outline=(100, 105, 115), width=2)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: ESP32")

def render_arduino(dest):
    img, draw = base_studio(560, 120, 780)
    bx, by, bw, bh = 240, 310, 544, 380
    # Blue PCB
    draw.rectangle([bx, by, bx + bw, by + bh], fill=(18, 95, 145), outline=(12, 70, 110), width=4)
    # USB-B Jack
    draw.rectangle([bx - 20, by + 30, bx + 50, by + 120], fill=(210, 215, 225), outline=(130, 140, 155), width=2)
    # Barrel Jack
    draw.rectangle([bx - 15, by + bh - 110, bx + 65, by + bh - 30], fill=(30, 32, 38), outline=(15, 16, 20), width=2)
    # ATmega328P DIP IC socket & chip
    draw.rectangle([bx + 180, by + 180, bx + 420, by + 270], fill=(35, 38, 45), outline=(20, 22, 28), width=3)
    for px in range(bx + 195, bx + 410, 15):
        draw.rectangle([px, by + 172, px + 8, by + 180], fill=(200, 205, 215))
        draw.rectangle([px, by + 270, px + 8, by + 278], fill=(200, 205, 215))
    # Black Female Header Sockets
    draw.rectangle([bx + 160, by + 15, bx + 480, by + 45], fill=(20, 22, 26), outline=(10, 12, 15), width=2)
    draw.rectangle([bx + 200, by + bh - 45, bx + 500, by + bh - 15], fill=(20, 22, 26), outline=(10, 12, 15), width=2)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Arduino")

def render_fr4_pcb(dest):
    img, draw = base_studio(520, 110, 780)
    bx, by, bw, bh = 260, 260, 504, 480
    # Glossy Green FR4 Solder Mask
    draw.rectangle([bx, by, bx + bw, by + bh], fill=(20, 115, 65), outline=(12, 85, 45), width=4)
    # Corner mounting holes
    for hx, hy in [(bx + 25, by + 25), (bx + bw - 25, by + 25), (bx + 25, by + bh - 25), (bx + bw - 25, by + bh - 25)]:
        draw.ellipse([hx - 14, hy - 14, hx + 14, hy + 14], fill=(225, 185, 45), outline=(255, 220, 75), width=2)
        draw.ellipse([hx - 8, hy - 8, hx + 8, hy + 8], fill=(246, 248, 250))
    # Matrix of gold plated-through holes
    for gx in range(bx + 50, bx + bw - 40, 18):
        for gy in range(by + 50, by + bh - 40, 18):
            draw.ellipse([gx - 5, gy - 5, gx + 5, gy + 5], fill=(225, 185, 45), outline=(255, 220, 75), width=1)
            draw.ellipse([gx - 2, gy - 2, gx + 2, gy + 2], fill=(20, 115, 65))
    img.save(dest, "JPEG", quality=95)
    print("Rendered: FR4 PCB")

def render_oled(dest):
    img, draw = base_studio(440, 100, 760)
    bx, by, bw, bh = 290, 310, 444, 380
    # Blue PCB carrier
    draw.rectangle([bx, by, bx + bw, by + bh], fill=(22, 75, 155), outline=(15, 55, 120), width=3)
    # 4-Pin I2C Header top
    for px in range(bx + bw//2 - 60, bx + bw//2 + 60, 30):
        draw.ellipse([px - 8, by + 25 - 8, px + 8, by + 25 + 8], fill=(225, 185, 45), outline=(255, 220, 75), width=2)
    # Glass OLED Display Screen
    sx, sy, sw, sh = bx + 35, by + 65, bw - 70, bh - 100
    draw.rectangle([sx, sy, sx + sw, sy + sh], fill=(10, 12, 16), outline=(60, 65, 75), width=3)
    # Bright Cyan Glowing Display Matrix & Telemetry
    draw.rectangle([sx + 20, sy + 25, sx + sw - 20, sy + 55], fill=(0, 225, 255))
    draw.line([(sx + 20, sy + 110), (sx + 80, sy + 90), (sx + 140, sy + 130), (sx + 200, sy + 80), (sx + sw - 20, sy + 105)], fill=(0, 225, 255), width=4)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: OLED")

def render_sensor_kit(dest):
    img, draw = base_studio(620, 130, 800)
    # Clear acrylic / plastic organized organizer grid
    bx, by, bw, bh = 200, 230, 624, 540
    draw.rectangle([bx, by, bx + bw, by + bh], fill=(235, 240, 245), outline=(170, 180, 195), width=4)
    # Compartment Grid
    for row in range(3):
        for col in range(3):
            cx = bx + 16 + col * 198
            cy = by + 16 + row * 170
            draw.rectangle([cx, cy, cx + 182, cy + 154], fill=(255, 255, 255), outline=(200, 210, 220), width=2)
            # Distinct sensor modules inside (Ultrasonic, relay, sound, PIR)
            if (row, col) == (0, 0): # Ultrasonic sensor
                draw.rectangle([cx + 20, cy + 35, cx + 162, cy + 115], fill=(30, 80, 160))
                draw.ellipse([cx + 35, cy + 50, cx + 85, cy + 100], fill=(215, 220, 230), outline=(120, 130, 145), width=3)
                draw.ellipse([cx + 97, cy + 50, cx + 147, cy + 100], fill=(215, 220, 230), outline=(120, 130, 145), width=3)
            elif (row, col) == (0, 1): # Blue Relay Module
                draw.rectangle([cx + 30, cy + 30, cx + 152, cy + 124], fill=(20, 120, 60))
                draw.rectangle([cx + 50, cy + 45, cx + 132, cy + 110], fill=(25, 115, 210), outline=(15, 75, 150), width=2)
            else:
                draw.rectangle([cx + 35, cy + 40, cx + 147, cy + 114], fill=(18, 95, 145), outline=(12, 65, 105), width=2)
                draw.ellipse([cx + 70, cy + 55, cx + 112, cy + 97], fill=(225, 185, 45))
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Sensor Kit")

# ==================== DRONES & PARTS ====================
def render_drone_frame(dest):
    img, draw = base_studio(580, 120, 780)
    cx, cy = 512, 512
    # 3K Carbon Fiber Twill X-Arms
    for angle in [45, 135, 225, 315]:
        rad = math.radians(angle)
        ex = cx + int(280 * math.cos(rad))
        ey = cy + int(280 * math.sin(rad))
        draw.line([(cx, cy), (ex, ey)], fill=(38, 42, 48), width=36)
        # Motor mount circular end
        draw.ellipse([ex - 28, ey - 28, ex + 28, ey + 28], fill=(30, 34, 40), outline=(55, 60, 70), width=3)
        draw.ellipse([ex - 8, ey - 8, ex + 8, ey + 8], fill=(246, 248, 250))
    # Center Carbon Top & Bottom Plates
    draw.rectangle([cx - 80, cy - 140, cx + 80, cy + 140], fill=(45, 48, 56), outline=(75, 80, 92), width=4)
    # Anodized Purple Standoffs
    for sx, sy in [(cx - 65, cy - 120), (cx + 65, cy - 120), (cx - 65, cy + 120), (cx + 65, cy + 120)]:
        draw.ellipse([sx - 10, sy - 10, sx + 10, sy + 10], fill=(160, 32, 240), outline=(210, 80, 255), width=2)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Drone Frame")

def render_drone_motor(dest):
    img, draw = base_studio(440, 110, 770)
    cx, cy = 512, 500
    # Motor Bell (Titanium / Anodized Cyan Blue)
    draw.ellipse([cx - 180, cy - 180, cx + 180, cy + 180], fill=(20, 140, 200), outline=(15, 95, 140), width=6)
    # Bell Spokes
    for i in range(6):
        a = i * (math.pi / 3)
        draw.line([(cx, cy), (cx + int(160 * math.cos(a)), cy + int(160 * math.sin(a)))], fill=(225, 235, 245), width=8)
    # Copper Stator Windings visible inside
    draw.ellipse([cx - 110, cy - 110, cx + 110, cy + 110], fill=(195, 105, 30), outline=(140, 70, 15), width=8)
    # Center Titanium M5 Threaded Shaft
    draw.ellipse([cx - 40, cy - 40, cx + 40, cy + 40], fill=(215, 225, 235), outline=(130, 140, 155), width=3)
    draw.ellipse([cx - 15, cy - 15, cx + 15, cy + 15], fill=(35, 40, 48))
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Drone Motor")

def render_drone_props(dest):
    img, draw = base_studio(520, 110, 760)
    cx, cy = 512, 500
    # Tri-Blade FPV Propeller (Neon Cyan Polycarbonate)
    for i in range(3):
        a = i * (2 * math.pi / 3) - math.pi/2
        # Aerodynamic airfoil blade
        p1 = (cx, cy)
        p2 = (cx + int(260 * math.cos(a - 0.2)), cy + int(260 * math.sin(a - 0.2)))
        p3 = (cx + int(280 * math.cos(a)), cy + int(280 * math.sin(a)))
        p4 = (cx + int(240 * math.cos(a + 0.2)), cy + int(240 * math.sin(a + 0.2)))
        draw.polygon([p1, p2, p3, p4], fill=(0, 185, 235, 220), outline=(0, 140, 185))
    # Hub
    draw.ellipse([cx - 45, cy - 45, cx + 45, cy + 45], fill=(0, 140, 185), outline=(0, 100, 140), width=4)
    draw.ellipse([cx - 18, cy - 18, cx + 18, cy + 18], fill=(246, 248, 250))
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Drone Props")

def render_drone_esc(dest):
    img, draw = base_studio(440, 100, 760)
    bx, by, bw, bh = 312, 300, 400, 400
    # Black PCB with gold pads
    draw.rectangle([bx, by, bx + bw, by + bh], fill=(30, 33, 40), outline=(50, 55, 65), width=3)
    # Corner mounting holes
    for hx, hy in [(bx + 30, by + 30), (bx + bw - 30, by + 30), (bx + 30, by + bh - 30), (bx + bw - 30, by + bh - 30)]:
        draw.ellipse([hx - 15, hy - 15, hx + 15, hy + 15], fill=(225, 185, 45), outline=(255, 220, 75), width=2)
        draw.ellipse([hx - 8, hy - 8, hx + 8, hy + 8], fill=(246, 248, 250))
    # 4 Sets of 6 MOSFET chips (24 MOSFETs total)
    for qx, qy in [(bx + 80, by + 80), (bx + bw - 140, by + 80), (bx + 80, by + bh - 140), (bx + bw - 140, by + bh - 140)]:
        draw.rectangle([qx, qy, qx + 60, qy + 60], fill=(15, 17, 22), outline=(80, 85, 95), width=2)
    # Heavy current battery solder pads
    draw.rectangle([bx + bw//2 - 40, by + 10, bx + bw//2 + 40, by + 35], fill=(225, 185, 45), outline=(255, 220, 75), width=2)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Drone ESC")

def render_drone_antenna(dest):
    img, draw = base_studio(360, 90, 780)
    cx, cy = 512, 380
    # 3-Lobe Cloverleaf Wire Antenna Mushroom Top
    for i in range(3):
        a = i * (2 * math.pi / 3) - math.pi/2
        lx = cx + int(110 * math.cos(a))
        ly = cy + int(110 * math.sin(a))
        draw.arc([lx - 70, ly - 70, lx + 70, ly + 70], start=0, end=360, fill=(215, 40, 40), width=8)
    # Center Hub & Semi-Rigid Coax Stem
    draw.ellipse([cx - 30, cy - 30, cx + 30, cy + 30], fill=(45, 50, 58))
    draw.rectangle([cx - 10, cy, cx + 10, cy + 280], fill=(215, 40, 40), outline=(160, 25, 25), width=2)
    # Gold SMA Connector base
    draw.rectangle([cx - 24, cy + 280, cx + 24, cy + 360], fill=(225, 185, 45), outline=(255, 220, 75), width=3)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Drone Antenna")

# ==================== ACRYLIC PRODUCTS ====================
def render_acrylic_cube(dest):
    img, draw = base_studio(520, 110, 780)
    cx, cy = 512, 480
    # Black Acrylic Glossy Base Plate
    draw.rectangle([cx - 240, cy + 160, cx + 240, cy + 220], fill=(25, 28, 35), outline=(10, 12, 15), width=3)
    # Transparent Optical Cast Acrylic Cube Box
    bx, by, bw, bh = cx - 200, cy - 200, 400, 360
    # Subtle blue translucent shading
    draw.rectangle([bx, by, bx + bw, by + bh], fill=(235, 245, 255, 120), outline=(160, 205, 240), width=4)
    # Specular light highlight reflection stripes
    draw.line([(bx + 30, by + 15), (bx + 15, by + bh - 15)], fill=(255, 255, 255), width=6)
    draw.line([(bx + 55, by + 15), (bx + 40, by + bh - 15)], fill=(255, 255, 255, 150), width=3)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Acrylic Cube")

def render_acrylic_trophy(dest):
    img, draw = base_studio(440, 100, 780)
    cx, cy = 512, 470
    # Heavy Solid Dark Base
    draw.rectangle([cx - 160, cy + 180, cx + 160, cy + 230], fill=(25, 28, 35), outline=(10, 12, 15), width=3)
    # Octagonal/Faceted Thick Acrylic Trophy Crystal
    pts = [
        (cx - 100, cy - 220), (cx + 100, cy - 220),
        (cx + 140, cy - 100), (cx + 140, cy + 180),
        (cx - 140, cy + 180), (cx - 140, cy - 100)
    ]
    draw.polygon(pts, fill=(240, 248, 255), outline=(150, 195, 235), width=5)
    # Beveled edges
    draw.line([(cx - 100, cy - 220), (cx - 140, cy - 100)], fill=(255, 255, 255), width=4)
    draw.line([(cx + 100, cy - 220), (cx + 140, cy - 100)], fill=(255, 255, 255), width=4)
    # Laser engraved laurel wreath & award crest
    draw.arc([cx - 65, cy - 50, cx + 65, cy + 70], start=30, end=330, fill=(255, 255, 255), width=5)
    draw.polygon([(cx, cy - 15), (cx + 15, cy + 15), (cx - 15, cy + 15)], fill=(255, 255, 255))
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Acrylic Trophy")

def render_sneeze_shield(dest):
    img, draw = base_studio(620, 120, 790)
    cx, cy = 512, 460
    # Clear Acrylic Shield Barrier
    bx, by, bw, bh = cx - 260, cy - 220, 520, 420
    draw.rectangle([bx, by, bx + bw, by + bh], fill=(238, 246, 255), outline=(160, 205, 240), width=4)
    # Document Pass-Through Cutout Slot at bottom
    draw.rectangle([cx - 100, by + bh - 60, cx + 100, by + bh], fill=(246, 248, 250), outline=(160, 205, 240), width=4)
    # Two Interlocking Slot Base Feet
    for fx in [bx + 60, bx + bw - 60]:
        draw.polygon([(fx - 30, by + bh - 20), (fx + 30, by + bh - 20), (fx + 40, by + bh + 40), (fx - 40, by + bh + 40)], fill=(215, 235, 250), outline=(140, 185, 225), width=3)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Sneeze Shield")

def render_brochure_holder(dest):
    img, draw = base_studio(440, 100, 780)
    cx, cy = 512, 480
    # L-Shaped Slanted Clear Acrylic Sign & Flyer Holder
    draw.polygon([(cx - 140, cy - 220), (cx + 140, cy - 220), (cx + 150, cy + 180), (cx - 150, cy + 180)], fill=(238, 246, 255), outline=(160, 205, 240), width=4)
    # Slanted Base Foot
    draw.polygon([(cx - 150, cy + 180), (cx + 150, cy + 180), (cx + 170, cy + 220), (cx - 170, cy + 220)], fill=(225, 240, 255), outline=(150, 195, 235), width=4)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Brochure Holder")

def render_cosmetic_riser(dest):
    img, draw = base_studio(560, 120, 780)
    cx, cy = 512, 480
    # 3-Tier Stepped Clear Acrylic Display Riser
    for tier, (w, y_top, y_bot) in enumerate([(440, 480, 540), (360, 380, 440), (280, 280, 340)]):
        draw.rectangle([cx - w//2, y_top, cx + w//2, y_bot], fill=(235, 245, 255), outline=(150, 195, 235), width=3)
        draw.line([(cx - w//2 + 20, y_top + 10), (cx - w//2 + 20, y_bot - 10)], fill=(255, 255, 255), width=4)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Cosmetic Riser")

# ==================== DIY KITS ====================
def render_robot_kit(dest):
    img, draw = base_studio(620, 130, 800)
    bx, by, bw, bh = 200, 230, 624, 540
    # Unboxed 4WD Robot Car Kit Box / Mat
    draw.rectangle([bx, by, bx + bw, by + bh], fill=(240, 244, 250), outline=(180, 190, 205), width=4)
    # Dual Layer Clear Acrylic Chassis
    draw.rectangle([bx + 40, by + 40, bx + 280, by + 340], fill=(225, 240, 255), outline=(140, 185, 230), width=4)
    # 4 Yellow TT Gearmotors
    for mx, my in [(bx + 320, by + 50), (bx + 460, by + 50), (bx + 320, by + 180), (bx + 460, by + 180)]:
        draw.rectangle([mx, my, mx + 110, my + 85], fill=(245, 195, 30), outline=(185, 140, 15), width=3)
        draw.rectangle([mx + 80, my + 25, mx + 100, my + 60], fill=(235, 240, 245))
    # 4 Rubber Robot Wheels
    for wx, wy in [(bx + 50, by + 380), (bx + 190, by + 380), (bx + 330, by + 380), (bx + 470, by + 380)]:
        draw.ellipse([wx, wy, wx + 110, wy + 110], fill=(30, 32, 38), outline=(65, 70, 80), width=4)
        draw.ellipse([wx + 30, wy + 30, wx + 80, wy + 80], fill=(245, 195, 30), outline=(185, 140, 15), width=2)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Robot Kit")

def render_soldering_kit(dest):
    img, draw = base_studio(560, 120, 780)
    bx, by, bw, bh = 240, 240, 544, 520
    draw.rectangle([bx, by, bx + bw, by + bh], fill=(35, 45, 60), outline=(20, 28, 40), width=4) # Blue ESD Mat
    # Circular Practice Training PCB
    draw.ellipse([bx + 40, by + 40, bx + 300, by + 300], fill=(20, 115, 65), outline=(12, 85, 45), width=4)
    # Through-Hole LEDs (Red, Green, Blue, Yellow)
    for lx, ly, color in [(bx + 350, by + 60, (235, 40, 40)), (bx + 420, by + 60, (40, 205, 70)), (bx + 350, by + 130, (30, 120, 245)), (bx + 420, by + 130, (245, 205, 30))]:
        draw.ellipse([lx, ly, lx + 40, ly + 40], fill=color, outline=(255, 255, 255), width=2)
        draw.line([(lx + 20, ly + 40), (lx + 20, ly + 90)], fill=(200, 205, 215), width=3)
    # Resistor pack with color bands
    for ry in range(by + 340, by + 480, 30):
        draw.rectangle([bx + 60, ry, bx + 220, ry + 16], fill=(225, 205, 160), outline=(160, 140, 100), width=2)
        draw.line([(bx + 90, ry), (bx + 90, ry + 16)], fill=(180, 40, 30), width=3)
        draw.line([(bx + 110, ry), (bx + 110, ry + 16)], fill=(25, 25, 25), width=3)
        draw.line([(bx + 130, ry), (bx + 130, ry + 16)], fill=(220, 160, 20), width=3)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Soldering Kit")

def render_bluetooth_speaker_kit(dest):
    img, draw = base_studio(560, 120, 780)
    bx, by, bw, bh = 240, 280, 544, 440
    # Natural Birch Plywood Enclosure Box
    draw.rectangle([bx, by, bx + bw, by + bh], fill=(225, 195, 145), outline=(145, 110, 65), width=4)
    # Twin 2-Inch Full-Range Speaker Drivers
    for sx in [bx + 80, bx + bw - 190]:
        draw.ellipse([sx, by + 100, sx + 110, by + 210], fill=(25, 28, 35), outline=(200, 205, 215), width=6) # Chrome rim
        draw.ellipse([sx + 35, by + 135, sx + 75, by + 175], fill=(55, 60, 72)) # Dust cap
    # Bluetooth 5.0 Amp Board & Volume Knob
    draw.rectangle([bx + bw//2 - 50, by + 270, bx + bw//2 + 50, by + 370], fill=(20, 115, 65), outline=(12, 85, 45), width=2)
    draw.ellipse([bx + bw//2 - 20, by + 295, bx + bw//2 + 20, by + 335], fill=(215, 220, 230), outline=(120, 130, 145), width=2)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Bluetooth Speaker Kit")

def render_solar_rover_kit(dest):
    img, draw = base_studio(560, 120, 780)
    cx, cy = 512, 480
    # Laser Cut Plywood Chassis
    draw.rectangle([cx - 180, cy - 100, cx + 180, cy + 140], fill=(225, 195, 145), outline=(145, 110, 65), width=4)
    # Monocrystalline Solar Panel top
    draw.rectangle([cx - 140, cy - 200, cx + 140, cy - 80], fill=(25, 35, 65), outline=(200, 215, 240), width=4)
    for sx in range(cx - 100, cx + 120, 45):
        draw.line([(sx, cy - 200), (sx, cy - 80)], fill=(120, 140, 185), width=2)
    # DC Gearmotor & Nylon Reduction Gears
    draw.rectangle([cx - 50, cy - 40, cx + 50, cy + 40], fill=(200, 205, 215), outline=(130, 140, 155), width=2)
    draw.ellipse([cx + 20, cy + 10, cx + 70, cy + 60], fill=(245, 245, 250), outline=(160, 170, 180), width=2) # Gear
    # 4 Wheels
    for wx, wy in [(cx - 220, cy - 80), (cx + 180, cy - 80), (cx - 220, cy + 80), (cx + 180, cy + 80)]:
        draw.ellipse([wx, wy, wx + 50, wy + 90], fill=(30, 32, 38), outline=(65, 70, 80), width=3)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Solar Rover Kit")

def render_weather_station_kit(dest):
    img, draw = base_studio(580, 120, 780)
    bx, by, bw, bh = 220, 240, 584, 520
    draw.rectangle([bx, by, bx + bw, by + bh], fill=(245, 248, 252), outline=(190, 200, 215), width=4)
    # ESP8266 NodeMCU Board
    draw.rectangle([bx + 40, by + 40, bx + 220, by + 320], fill=(25, 30, 38), outline=(45, 52, 65), width=3)
    draw.rectangle([bx + 60, by + 120, bx + 200, by + 250], fill=(225, 230, 238), outline=(160, 170, 185), width=2) # RF Can
    # DHT11 Temperature / Humidity Sensor (Blue module with grill)
    draw.rectangle([bx + 260, by + 40, bx + 380, by + 200], fill=(30, 120, 220), outline=(20, 90, 180), width=3)
    for gy in range(by + 70, by + 170, 18):
        draw.line([(bx + 280, gy), (bx + 360, gy)], fill=(255, 255, 255), width=3)
    # 0.96" OLED Telemetry Display Screen
    draw.rectangle([bx + 420, by + 40, bx + 540, by + 200], fill=(12, 15, 20), outline=(60, 70, 85), width=2)
    draw.line([(bx + 440, by + 90), (bx + 470, by + 70), (bx + 500, by + 110), (bx + 520, by + 85)], fill=(0, 225, 255), width=3)
    # Mini Breadboard and colored jumper wires at bottom
    draw.rectangle([bx + 40, by + 360, bx + bw - 40, by + bh - 40], fill=(255, 255, 255), outline=(210, 220, 230), width=3)
    draw.arc([bx + 100, by + 320, bx + 300, by + 420], start=180, end=360, fill=(235, 40, 40), width=4)
    draw.arc([bx + 200, by + 300, bx + 450, by + 420], start=180, end=360, fill=(40, 180, 70), width=4)
    img.save(dest, "JPEG", quality=95)
    print("Rendered: Weather Station Kit")

# Run all 20 renderers
render_esp32(os.path.join(OUTPUT_DIR, "esp32-dual-core-iot-development-board.jpg"))
render_arduino(os.path.join(OUTPUT_DIR, "arduino-compatible-atmega328p-microcontroller.jpg"))
render_fr4_pcb(os.path.join(OUTPUT_DIR, "double-sided-fr4-prototype-pcb-pack.jpg"))
render_oled(os.path.join(OUTPUT_DIR, "i2c-096-inch-oled-display-module.jpg"))
render_sensor_kit(os.path.join(OUTPUT_DIR, "37-piece-iot-sensor-module-starter-kit.jpg"))

render_drone_frame(os.path.join(OUTPUT_DIR, "5-inch-fpv-racing-3k-carbon-fiber-drone-frame.jpg"))
render_drone_motor(os.path.join(OUTPUT_DIR, "2207-2450kv-high-power-brushless-drone-motor.jpg"))
render_drone_props(os.path.join(OUTPUT_DIR, "5-inch-tri-blade-fpv-drone-propellers-pack.jpg"))
render_drone_esc(os.path.join(OUTPUT_DIR, "30a-4-in-1-blheli-s-electronic-speed-controller.jpg"))
render_drone_antenna(os.path.join(OUTPUT_DIR, "omnidirectional-58ghz-fpv-cloverleaf-antenna.jpg"))

render_acrylic_cube(os.path.join(OUTPUT_DIR, "crystal-clear-cast-acrylic-showcase-cube-box.jpg"))
render_acrylic_trophy(os.path.join(OUTPUT_DIR, "laser-engraved-beveled-acrylic-award-trophy.jpg"))
render_sneeze_shield(os.path.join(OUTPUT_DIR, "high-clarity-heavy-duty-acrylic-sneeze-shield.jpg"))
render_brochure_holder(os.path.join(OUTPUT_DIR, "desktop-acrylic-slanted-brochure-menu-holder.jpg"))
render_cosmetic_riser(os.path.join(OUTPUT_DIR, "multi-tiered-clear-acrylic-cosmetic-display-riser.jpg"))

render_robot_kit(os.path.join(OUTPUT_DIR, "autonomous-4wd-smart-robotic-stem-starter-kit.jpg"))
render_soldering_kit(os.path.join(OUTPUT_DIR, "educational-electronics-soldering-practice-kit.jpg"))
render_bluetooth_speaker_kit(os.path.join(OUTPUT_DIR, "diy-portable-bluetooth-stereo-speaker-maker-kit.jpg"))
render_solar_rover_kit(os.path.join(OUTPUT_DIR, "miniature-solar-powered-stem-rover-buggy-kit.jpg"))
render_weather_station_kit(os.path.join(OUTPUT_DIR, "smart-weather-station-iot-esp8266-maker-kit.jpg"))

print("All 20 products rendered successfully.")
