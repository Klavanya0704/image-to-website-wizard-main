import os
import urllib.request
import urllib.parse
from PIL import Image

products = [
    # 3D Printing (5)
    {"slug": "geometric-spiral-vase", "title": "3D Printed Geometric Vase", "prompt": "Studio e-commerce product photograph of a modern 3D printed geometric spiral vase in white PLA plastic with visible fine layers. Clean pure white background, soft studio lighting, sharp focus", "seed": 301},
    {"slug": "universal-foldable-phone-stand-3d", "title": "Universal Foldable Phone Stand", "prompt": "Studio e-commerce product photograph of a 3D printed foldable black plastic smartphone desk stand with adjustable hinge. Pure white background, studio lighting, sharp focus", "seed": 302},
    {"slug": "mini-desk-organizer", "title": "Mini Desk Organizer", "prompt": "Studio e-commerce product photograph of a 3D printed compact desk organizer pen holder in navy blue PLA. Clean white background, studio lighting, sharp focus", "seed": 303},
    {"slug": "cable-management-clip-set", "title": "Cable Management Clip Set", "prompt": "Studio e-commerce product photograph of 6 3D printed flexible desk cable management clips in minimalist white and grey. Clean white background, studio lighting, sharp focus", "seed": 304},
    {"slug": "planter-pot-hex", "title": "Hexagonal Planter Pot", "prompt": "Studio e-commerce product photograph of a modern geometric hexagonal planter pot 3D printed in speckled marble PLA plastic with drainage tray. Pure white background, soft studio lighting, sharp focus", "seed": 305},

    # Laser Cutting (5)
    {"slug": "custom-name-keychain", "title": "Custom Name Keychain", "prompt": "Studio e-commerce product photograph of a laser engraved birch wood keychain with custom typography and metal key ring. Clean white background, studio lighting, sharp focus", "seed": 311},
    {"slug": "tree-of-life-lamp", "title": "Tree of Life LED Lamp", "prompt": "Studio e-commerce product photograph of a laser cut wooden Tree of Life decorative night lamp with warm internal LED illumination and solid wooden base. Soft studio lighting, clean background, sharp focus", "seed": 312},
    {"slug": "laser-cut-desk-organizer", "title": "Laser Cut Desk Organizer", "prompt": "Studio e-commerce product photograph of an interlocking laser cut plywood desk organizer caddy with pen slots and drawer. Pure white background, studio lighting, sharp focus", "seed": 313},
    {"slug": "wooden-wall-art-mandala", "title": "Wooden Mandala Wall Art", "prompt": "Studio e-commerce product photograph of a multi-layer laser cut wooden mandala wall art panel in natural wood tones. Clean white background, soft studio lighting, sharp intricate detail", "seed": 314},
    {"slug": "laser-engraved-photo-frame", "title": "Laser Engraved Photo Frame", "prompt": "Studio e-commerce product photograph of a solid beechwood photo picture frame with precision laser engraved floral corner borders. Standing upright on clean white background, studio lighting, sharp focus", "seed": 315},

    # CNC Machining (5)
    {"slug": "cnc-wooden-name-plate", "title": "CNC Wooden Name Plate", "prompt": "Studio e-commerce product photograph of a solid walnut desktop name plate with deep V-carved serif letters and beveled base made on CNC router in a college lab. Clean white background, studio lighting, sharp focus", "seed": 321},
    {"slug": "cnc-cut-wooden-mandala", "title": "CNC Wooden Mandala", "prompt": "Studio e-commerce product photograph of a round solid dark walnut wood mandala disk featuring deep 3D rotary CNC relief carving. Pure white background, studio lighting, sharp focus", "seed": 322},
    {"slug": "cnc-cut-wooden-box", "title": "CNC Wooden Box", "prompt": "Studio e-commerce product photograph of a precision CNC milled solid oak keepsake box with friction-fit wooden lid. Pure white background, studio lighting, smooth wood grain and chamfered edges", "seed": 323},
    {"slug": "cnc-carved-wooden-wall-panel", "title": "CNC Wooden Wall Panel", "prompt": "Studio e-commerce product photograph of a CNC carved wooden decorative wall panel with 3D undulating wave fluted contours in solid teak hardwood. Clean white background, studio lighting, sharp detail", "seed": 324},
    {"slug": "cnc-aluminium-bracket", "title": "CNC Aluminium Bracket", "prompt": "Studio e-commerce product photograph of a precision 90-degree corner mounting bracket machined from 6061 billet aluminium with counterbored holes and silver finish. Clean white background, sharp focus", "seed": 325},

    # Electronics (3)
    {"slug": "esp32-iot-maker-board", "title": "ESP32 IoT Development Board", "prompt": "Studio e-commerce product photograph of an ESP32 dual-core Wi-Fi and Bluetooth microcontroller development board with pin headers and USB-C port on a black PCB. Isolated on pure white background, soft studio lighting, sharp component detail", "seed": 331},
    {"slug": "37-in-1-iot-sensor-module-kit", "title": "IoT Sensor Module Kit", "prompt": "Studio e-commerce product photograph of an assortment of electronics sensor breakout modules (temperature, ultrasonic, PIR, light sensors) on blue PCBs neatly arranged on white background, sharp focus", "seed": 332},
    {"slug": "fr4-double-sided-prototype-pcb-10pack", "title": "Double-Sided FR4 Prototype PCB", "prompt": "Studio e-commerce product photograph of a neat stack of green double-sided FR4 perfboard prototype copper PCBs with gold plated solder pads. Isolated on pure white background, studio lighting, sharp focus", "seed": 333},

    # Drones & Parts (3)
    {"slug": "fpv-drone-carbon-fiber-frame", "title": "FPV Drone Carbon Fiber Frame", "prompt": "Studio e-commerce product photograph of an unassembled 5-inch FPV racing quadcopter frame made of 3K matte carbon fiber plates with purple anodized aluminum standoffs. Laid out on clean white background, studio lighting", "seed": 341},
    {"slug": "brushless-drone-motor-2207-2450kv", "title": "Brushless Drone Motor Set", "prompt": "Studio e-commerce product photograph of 2207 2450KV brushless drone motors with copper stator windings and titanium shaft. Clean white background, studio lighting, sharp focus", "seed": 342},
    {"slug": "5-inch-tri-blade-fpv-propellers", "title": "5-inch Tri-Blade Propellers", "prompt": "Studio e-commerce product photograph of 4 pairs of 5-inch tri-blade polycarbonate FPV drone propellers in translucent cyan blue and black. Arranged neatly on pure white background, studio lighting", "seed": 343},

    # Acrylic Products (3)
    {"slug": "clear-cast-acrylic-display-box", "title": "Clear Cast Acrylic Display Box", "prompt": "Studio e-commerce product photograph of a crystal clear cast acrylic dust-proof showcase display box with glossy black base. Pure white background, subtle reflections, clean sharp edges", "seed": 351},
    {"slug": "custom-acrylic-trophy-plaque", "title": "Custom Acrylic Trophy Award", "prompt": "Studio e-commerce product photograph of a modern geometric clear acrylic recognition award trophy plaque with laser engraved gold award crest on beveled base. Pure white background, sharp focus", "seed": 352},
    {"slug": "transparent-protective-acrylic-shield", "title": "Transparent Protective Acrylic Shield", "prompt": "Studio e-commerce product photograph of a precision laser cut transparent heavy-duty acrylic safety shield panel with rounded corner radius and mounting brackets. Clean white background, studio lighting", "seed": 353},

    # DIY Kits (3)
    {"slug": "starter-maker-diy-electronics-kit", "title": "Autonomous Robotics STEM Starter Kit", "prompt": "Studio e-commerce product photograph of an educational DIY robotic smart car kit with chassis, DC gear motors, wheels, sensor shield and microcontroller organized neatly on white background, studio lighting", "seed": 361},
    {"slug": "diy-soldering-practice-electronics-kit", "title": "DIY Soldering Practice Kit", "prompt": "Studio e-commerce product photograph of a DIY electronics soldering practice training kit featuring a printed circuit board with colorful LEDs, resistors, capacitors, and ICs neatly displayed on white background", "seed": 362},
    {"slug": "diy-bluetooth-speaker-assembly-kit", "title": "DIY Bluetooth Speaker Kit", "prompt": "Studio e-commerce product photograph of a DIY portable Bluetooth stereo speaker maker kit with laser cut wooden enclosure box, full-range speaker cones, audio amplifier board and wires on white background", "seed": 363}
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for idx, p in enumerate(products):
    fname = f"{p['slug']}.jpg"
    path = os.path.join("public/products", fname)
    if os.path.exists(path) and os.path.getsize(path) > 10000:
        print(f"[{idx+1}/{len(products)}] OK (exists): {fname} ({os.path.getsize(path)} bytes)")
    else:
        print(f"[{idx+1}/{len(products)}] Fetching image for: {p['title']} ({fname})...")
        encoded = urllib.parse.quote(p['prompt'])
        url = f"https://image.pollinations.ai/prompt/{encoded}?width=800&height=800&nologo=true&seed={p['seed']}&model=flux"
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=30) as resp, open(path, 'wb') as out:
                out.write(resp.read())
            im = Image.open(path)
            im.convert("RGB").save(path, "JPEG", quality=92)
            print(f"   -> Saved: {path} ({os.path.getsize(path)} bytes)")
        except Exception as e:
            print(f"   -> Error fetching {fname}: {e}")

print("\nAll streamlined product images checked and ready!")
