import urllib.request
import urllib.parse
import os
import time
from PIL import Image

# 1024x1024 HD Prompts tailored specifically to each product title
hd_products = [
    # ==================== 1. 3D PRINTING ====================
    {
        "slug": "geometric-spiral-vase",
        "title": "3D Printed Geometric Vase",
        "prompt": "Studio e-commerce product photograph of a modern 3D printed geometric spiral twisted vase made of white PLA plastic filament with visible layer texture. Isolated on pure white background, soft studio light reflections, sharp 8k focus, ultra high resolution, clean commercial product photo",
        "seed": 501
    },
    {
        "slug": "universal-foldable-phone-stand-3d",
        "title": "Universal Foldable Phone Stand",
        "prompt": "Studio e-commerce product photograph of a sleek 3D printed foldable black PLA phone and tablet stand with mechanical hinge and silicone pads. Isolated on pure white background, studio key lighting, crisp sharp focus, isolated commercial product photo",
        "seed": 502
    },
    {
        "slug": "mini-desk-organizer",
        "title": "Mini Desk Organizer",
        "prompt": "Studio e-commerce product photograph of a 3D printed desktop organizer pen and stationery caddy in matte navy blue PLA plastic. Pure white background, soft studio shadows, razor sharp focus, e-commerce product photography",
        "seed": 503
    },
    {
        "slug": "cable-management-clip-set",
        "title": "Cable Management Clip Set",
        "prompt": "Studio e-commerce product photograph of a set of 6 3D printed minimalist cable routing clips in clean white and light grey plastic holding neat black cables. Pure white background, studio lighting, razor sharp focus, high resolution",
        "seed": 504
    },
    {
        "slug": "resin-architectural-model",
        "title": "Resin Architectural Model",
        "prompt": "Studio e-commerce product photograph of a miniature architectural skyscraper building scale model 3D printed in smooth high-precision translucent white photopolymer resin. Isolated on pure white background, dramatic studio lighting, sharp fine detail",
        "seed": 505
    },
    {
        "slug": "planter-pot-hex",
        "title": "Hexagonal Planter Pot",
        "prompt": "Studio e-commerce product photograph of a modern hexagonal geometric succulent plant pot 3D printed in speckled marble PLA plastic with drainage tray. Pure white background, soft natural studio lighting, razor sharp focus, e-commerce product photo",
        "seed": 506
    },

    # ==================== 2. LASER CUTTING ====================
    {
        "slug": "custom-name-keychain",
        "title": "Custom Name Keychain",
        "prompt": "Studio e-commerce product photograph of a laser cut and engraved solid birch plywood keychain with custom sans-serif typography and silver key ring. Isolated on pure white background, studio lighting, crisp laser burned edge details",
        "seed": 511
    },
    {
        "slug": "tree-of-life-lamp",
        "title": "Tree of Life LED Lamp",
        "prompt": "Studio e-commerce product photograph of a laser cut wooden circular Tree of Life decorative night lamp illuminated with warm internal LED ambient light on a solid timber base. Pure white background, soft glowing light, sharp focus",
        "seed": 512
    },
    {
        "slug": "laser-cut-desk-organizer",
        "title": "Laser Cut Desk Organizer",
        "prompt": "Studio e-commerce product photograph of an interlocking laser cut birch plywood desktop organizer shelf with pen slots, mail holder, and drawer. Pure white background, clean studio lighting, crisp brown laser cut edges",
        "seed": 513
    },
    {
        "slug": "wooden-wall-art-mandala",
        "title": "Wooden Mandala Wall Art",
        "prompt": "Studio e-commerce product photograph of an intricate 5-layer laser cut wooden mandala wall art disk in contrasting natural birch and mahogany wood. Pure white background, studio side lighting showing depth, razor sharp focus",
        "seed": 514
    },
    {
        "slug": "laser-engraved-photo-frame",
        "title": "Laser Engraved Photo Frame",
        "prompt": "Studio e-commerce product photograph of a solid oak wooden photo picture frame with delicate laser engraved floral filigree decorative borders around the glass opening. Standing on pure white background, sharp studio focus",
        "seed": 515
    },

    # ==================== 3. CNC MACHINING ====================
    {
        "slug": "cnc-wooden-name-plate",
        "title": "CNC Wooden Name Plate",
        "prompt": "Studio e-commerce product photograph of an executive solid dark walnut desktop name plate with deep V-carved serif letters and beveled base made on a CNC milling router. Isolated on pure white background, studio lighting, sharp focus",
        "seed": 521
    },
    {
        "slug": "cnc-cut-wooden-mandala",
        "title": "CNC Wooden Mandala",
        "prompt": "Studio e-commerce product photograph of a round solid walnut wood circular disk featuring deep 3D CNC rotary relief carving and sculpted flower petals. Isolated on pure white background, soft studio lighting, sharp focus",
        "seed": 522
    },
    {
        "slug": "cnc-cut-wooden-box",
        "title": "CNC Wooden Box",
        "prompt": "Studio e-commerce product photograph of a precision CNC milled solid hardwood keepsake box with seamless friction-fit wooden lid and chamfered edges. Pure white background, studio lighting, smooth wood grain, sharp focus",
        "seed": 523
    },
    {
        "slug": "cnc-carved-wooden-wall-panel",
        "title": "CNC Wooden Wall Panel",
        "prompt": "Studio e-commerce product photograph of a CNC router carved wooden decorative wall panel featuring fluid 3D geometric wave flutes in natural teak hardwood. Clean white background, soft studio lighting, sharp focus",
        "seed": 524
    },
    {
        "slug": "cnc-aluminium-bracket",
        "title": "CNC Aluminium Bracket",
        "prompt": "Studio e-commerce product photograph of a 90-degree heavy-duty corner mounting bracket machined from 6061 billet aluminum on a 3-axis CNC mill, with bead-blasted silver finish and counterbored holes. Pure white background, sharp metallic focus",
        "seed": 525
    },

    # ==================== 4. ELECTRONICS ====================
    {
        "slug": "esp32-iot-maker-board",
        "title": "ESP32 Dual-Core IoT Microcontroller Board",
        "prompt": "Studio e-commerce product photograph of an ESP32 dual-core Wi-Fi and Bluetooth IoT microcontroller development board on a matte black PCB with gold pin headers and USB-C. Pure white background, soft studio lighting, sharp electronic component detail",
        "seed": 531
    },
    {
        "slug": "37-in-1-iot-sensor-module-kit",
        "title": "37-in-1 Complete IoT Sensor Module Kit",
        "prompt": "Studio e-commerce product photograph of an array of electronics sensor breakout modules including temperature, ultrasonic distance, PIR motion, and light sensors on blue and red PCBs neatly arranged on white background, sharp focus",
        "seed": 532
    },
    {
        "slug": "fr4-double-sided-prototype-pcb-10pack",
        "title": "Double-Sided FR4 Prototype PCB Boards (10-Pack)",
        "prompt": "Studio e-commerce product photograph of a neat stack of 10 green double-sided FR4 perfboard prototype copper PCBs with tin plated solder eyelet grid. Pure white background, studio lighting, sharp focus",
        "seed": 533
    },

    # ==================== 5. DRONES & PARTS ====================
    {
        "slug": "fpv-drone-carbon-fiber-frame",
        "title": "5-inch FPV Racing Drone 3K Carbon Fiber Frame",
        "prompt": "Studio e-commerce product photograph of an unassembled 5-inch FPV quadcopter drone frame made of 3K matte twill carbon fiber arms and plates with purple anodized aluminium hardware. Laid out on pure white background, sharp focus",
        "seed": 541
    },
    {
        "slug": "brushless-drone-motor-2207-2450kv",
        "title": "2207 2450KV High-Thrust Brushless Drone Motors (4-Pack)",
        "prompt": "Studio e-commerce product photograph of 4 high-thrust 2207 2450KV brushless drone quadcopter motors with copper stator windings and titanium rotor shafts. Clean white background, studio lighting, crisp metallic focus",
        "seed": 542
    },
    {
        "slug": "5-inch-tri-blade-fpv-propellers",
        "title": "5-inch Tri-Blade Propellers (4 Pairs)",
        "prompt": "Studio e-commerce product photograph of 4 pairs of 5-inch tri-blade polycarbonate FPV racing drone propellers in translucent cyan blue and black. Arranged neatly on pure white background, studio lighting, sharp focus",
        "seed": 543
    },

    # ==================== 6. ACRYLIC PRODUCTS ====================
    {
        "slug": "clear-cast-acrylic-display-box",
        "title": "Clear Cast Acrylic Dust-Proof Display Box",
        "prompt": "Studio e-commerce product photograph of a crystal clear transparent acrylic dust-proof showcase cube display box with polished edges and a glossy black base. Pure white background, subtle glass reflections, razor sharp focus",
        "seed": 551
    },
    {
        "slug": "custom-acrylic-trophy-plaque",
        "title": "Custom Engraved College Acrylic Award Trophy Stand",
        "prompt": "Studio e-commerce product photograph of a modern geometric clear cast acrylic corporate award trophy plaque with laser engraved gold emblem and beveled weighted base. Pure white background, sparkling reflections, sharp focus",
        "seed": 552
    },
    {
        "slug": "transparent-protective-acrylic-shield",
        "title": "High-Clarity Transparent Protective Acrylic Shield",
        "prompt": "Studio e-commerce product photograph of a heavy-duty transparent optical-grade acrylic protective sneeze guard panel with laser cut rounded corners and aluminium base stands. Pure white background, studio lighting, sharp clarity",
        "seed": 553
    },

    # ==================== 7. DIY KITS ====================
    {
        "slug": "starter-maker-diy-electronics-kit",
        "title": "All-in-One Autonomous Robotics STEM Starter Kit",
        "prompt": "Studio e-commerce product photograph of a complete educational DIY robotic 4WD smart car kit with transparent acrylic chassis, DC gear motors, wheels, sensor shield, and microcontroller organized neatly on white background, sharp focus",
        "seed": 561
    },
    {
        "slug": "diy-soldering-practice-electronics-kit",
        "title": "DIY Soldering Practice & Electronics Training Kit",
        "prompt": "Studio e-commerce product photograph of a DIY electronic soldering practice training kit featuring a blue PCB with colorful LEDs, resistors, IC chip, buzzer, and battery holder neatly displayed on white background, sharp focus",
        "seed": 562
    },
    {
        "slug": "diy-bluetooth-speaker-assembly-kit",
        "title": "DIY Portable Bluetooth Stereo Speaker Build Kit",
        "prompt": "Studio e-commerce product photograph of a DIY portable Bluetooth stereo speaker maker kit with laser cut wooden enclosure box, two 3-watt speaker drivers, Bluetooth amplifier board, and wiring on clean white background, sharp focus",
        "seed": 563
    }
]

os.makedirs("public/products", exist_ok=True)
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

print(f"Generating HD 1024x1024 images for all {len(hd_products)} products...")

for idx, p in enumerate(hd_products):
    slug = p["slug"]
    title = p["title"]
    prompt = p["prompt"]
    seed = p["seed"]
    
    fname = f"{slug}.jpg"
    target_path = os.path.join("public/products", fname)
    
    encoded = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=1024&height=1024&nologo=true&seed={seed}&model=flux"
    
    print(f"[{idx+1}/{len(hd_products)}] Generating 1024x1024 HD photo for: '{title}' -> {fname}...")
    
    success = False
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=40) as resp, open(target_path, 'wb') as out:
                out.write(resp.read())
            
            im = Image.open(target_path)
            # Ensure saved properly as clean 1024x1024 RGB JPEG
            im = im.convert("RGB")
            if im.size != (1024, 1024):
                im = im.resize((1024, 1024), Image.Resampling.LANCZOS)
            im.save(target_path, "JPEG", quality=95)
            
            size = os.path.getsize(target_path)
            print(f"   -> Saved {target_path} (Size: {size} bytes, Dimensions: {im.size})")
            success = True
            break
        except Exception as e:
            print(f"   Attempt {attempt+1} failed: {e}. Retrying in 2s...")
            time.sleep(2)
            
    if not success:
        print(f"   ERROR: Could not generate {fname}")

print("\nAll 1024x1024 HD product images generated and saved!")
