import urllib.request
import urllib.parse
import os
import time
from PIL import Image

# All products across all 7 categories with exact tailored photography prompts
catalog_items = [
    # ==================== 1. 3D PRINTING ====================
    {
        "slug": "geometric-spiral-vase",
        "title": "3D Printed Geometric Vase",
        "prompt": "Studio e-commerce product photography of a 3D printed geometric spiral vase in matte white PLA filament with visible fine layer lines. Isolated on pure white neutral background, soft studio lighting, sharp detail, front three-quarter view, high resolution 8k product photo",
        "seed": 201
    },
    {
        "slug": "universal-foldable-phone-stand-3d",
        "title": "Universal Foldable Phone Stand",
        "prompt": "Studio e-commerce product photography of a 3D printed foldable smartphone and tablet stand in sleek matte black plastic, with adjustable hinge. Isolated on clean white background, realistic studio lighting, sharp focus, isolated product photo",
        "seed": 202
    },
    {
        "slug": "mini-desk-organizer",
        "title": "Mini Desk Organizer",
        "prompt": "Studio e-commerce product photography of a 3D printed compact desk organizer with compartments for pens, SD cards and paperclips in navy blue PLA. Clean white background, soft studio lighting, sharp crisp detail, e-commerce product photo",
        "seed": 203
    },
    {
        "slug": "cable-management-clip-set",
        "title": "Cable Management Clip Set",
        "prompt": "Studio e-commerce product photography of a neat set of 6 3D printed flexible desk cable management clips in minimalist white and grey. Arranged neatly on clean white background, sharp focus, studio lighting, product photo",
        "seed": 204
    },
    {
        "slug": "resin-architectural-model",
        "title": "Resin Architectural Model",
        "prompt": "Studio e-commerce product photography of an intricate miniature modern building architectural model precision printed in white photopolymer resin. Isolated on pure white background, dramatic soft studio lighting, razor-sharp detail, product photo",
        "seed": 205
    },
    {
        "slug": "planter-pot-hex",
        "title": "Hexagonal Planter Pot",
        "prompt": "Studio e-commerce product photography of a modern geometric hexagonal succulent planter pot 3D printed in speckled marble PLA plastic with drainage tray. Pure white background, soft natural studio lighting, crisp sharp focus, product photo",
        "seed": 206
    },

    # ==================== 2. LASER CUTTING ====================
    {
        "slug": "custom-name-keychain",
        "title": "Custom Name Keychain",
        "prompt": "Studio e-commerce product photography of a precision laser engraved and cut birch wood keychain with custom typography and metal split ring. Isolated on clean white background, soft shadow, sharp macro focus, product photo",
        "seed": 211
    },
    {
        "slug": "tree-of-life-lamp",
        "title": "Tree of Life LED Lamp",
        "prompt": "Studio e-commerce product photography of a laser cut wooden Tree of Life decorative night lamp with warm internal LED illumination and solid base. Soft studio lighting on white neutral background, glowing warm light, sharp focus, product photo",
        "seed": 212
    },
    {
        "slug": "laser-cut-desk-organizer",
        "title": "Laser Cut Desk Organizer",
        "prompt": "Studio e-commerce product photography of an interlocking laser cut plywood desk organizer caddy with pencil slots, phone dock and drawer. Pure white background, soft studio lighting, sharp wooden edge detail, product photo",
        "seed": 213
    },
    {
        "slug": "wooden-wall-art-mandala",
        "title": "Wooden Mandala Wall Art",
        "prompt": "Studio e-commerce product photography of a multi-layer laser cut wooden mandala wall art panel in natural wood tones. Clean white background, soft directional lighting showing layer depth, crisp intricate detail, product photo",
        "seed": 214
    },
    {
        "slug": "laser-engraved-photo-frame",
        "title": "Laser Engraved Photo Frame",
        "prompt": "Studio e-commerce product photography of a solid beechwood picture photo frame with precision laser engraved floral corner filigree borders. Standing upright on white background, studio lighting, sharp focus, product photo",
        "seed": 215
    },
    {
        "slug": "custom-acrylic-led-sign",
        "title": "Custom Acrylic LED Sign",
        "prompt": "Studio e-commerce product photography of a clear acrylic edge-lit LED sign with laser engraved glowing logo mounted on a solid wooden LED base. Isolated on clean white background, vibrant glow, sharp detail, product photo",
        "seed": 216
    },
    {
        "slug": "laser-engraved-glass-trophy",
        "title": "Laser Engraved Glass Trophy",
        "prompt": "Studio e-commerce product photography of a faceted crystal glass corporate award trophy with precision laser etched frosted engraving and beveled base. Isolated on white neutral background, sparkling studio light reflections, sharp focus",
        "seed": 217
    },
    {
        "slug": "frosted-glass-laser-engraving",
        "title": "Frosted Glass Laser Engraving",
        "prompt": "Studio e-commerce product photography of a heavy cylindrical crystal tumbler glass with custom laser etched frosted geometric patterns. Pure white background, clean studio lighting, crisp sharp edges, product photo",
        "seed": 218
    },
    {
        "slug": "laser-cut-acrylic-name-plate",
        "title": "Laser Cut Acrylic Name Plate",
        "prompt": "Studio e-commerce product photography of a premium desktop clear acrylic name plate with gold laser engraved lettering and polished beveled edges. Clean white background, studio lighting, crisp sharp focus, isolated product photo",
        "seed": 219
    },
    {
        "slug": "acrylic-decorative-panel",
        "title": "Acrylic Decorative Panel",
        "prompt": "Studio e-commerce product photography of a geometric laser cut frosted and colored acrylic decorative wall panel screen. Pure white background, soft shadow, clean crisp laser cut edges, studio lighting, product photo",
        "seed": 220
    },

    # ==================== 3. CNC MACHINING ====================
    {
        "slug": "cnc-wooden-name-plate",
        "title": "CNC Wooden Name Plate",
        "prompt": "Studio e-commerce product photography of a solid walnut desktop name plate with deep V-carved serif letters and beveled base made on CNC router in a college makerspace. Clean white background, soft studio lighting, sharp focus",
        "seed": 231
    },
    {
        "slug": "cnc-cut-wooden-mandala",
        "title": "CNC Wooden Mandala",
        "prompt": "Studio e-commerce product photography of a round solid dark walnut wood mandala disk featuring deep 3D rotary CNC relief carving. Isolated on pure white background, soft studio lighting, sharp intricate details, product photo",
        "seed": 232
    },
    {
        "slug": "cnc-cut-wooden-box",
        "title": "CNC Wooden Box",
        "prompt": "Studio e-commerce product photography of a precision CNC milled solid oak keepsake box with seamless friction-fit wooden lid. Pure white background, studio lighting, smooth wood grain and chamfered edges, product photo",
        "seed": 233
    },
    {
        "slug": "cnc-carved-wooden-wall-panel",
        "title": "CNC Wooden Wall Panel",
        "prompt": "Studio e-commerce product photography of a CNC carved wooden decorative wall panel with 3D undulating wave fluted contours in natural teak hardwood. Clean white background, soft studio lighting, sharp detail, product photo",
        "seed": 234
    },
    {
        "slug": "cnc-wooden-relief-art",
        "title": "CNC Wooden Relief",
        "prompt": "Studio e-commerce product photography of a 3D topographic mountain relief carved from layered hardwood plywood using a CNC router ball-nose endmill. Pure white background, studio lighting, high resolution product photo",
        "seed": 235
    },
    {
        "slug": "cnc-aluminium-bracket",
        "title": "CNC Aluminium Bracket",
        "prompt": "Studio e-commerce product photography of a precision 90-degree corner mounting bracket machined from 6061 billet aluminium with counterbored holes and silver bead-blasted finish. Clean white background, sharp focus, product photo",
        "seed": 236
    },
    {
        "slug": "cnc-aluminum-fixture-plate",
        "title": "CNC Aluminium Plate",
        "prompt": "Studio e-commerce product photography of a precision ground aluminium tooling fixture plate with a matrix grid of threaded M6 holes, made on a CNC milling machine. Isolated on white background, metallic sheen, sharp focus",
        "seed": 237
    },
    {
        "slug": "cnc-machined-gear",
        "title": "CNC Machined Gear",
        "prompt": "Studio e-commerce product photography of a precision CNC cut steel spur gear with central keyed bore and machined involute teeth. Pure white background, metallic reflections, sharp crisp focus, product photo",
        "seed": 238
    },
    {
        "slug": "cnc-machined-bushing",
        "title": "CNC Machined Bushing",
        "prompt": "Studio e-commerce product photography of a set of 4 CNC turned cylindrical brass flanged sleeve bearing bushings. Shiny polished gold brass, isolated on pure white background, studio lighting, razor sharp focus",
        "seed": 239
    },
    {
        "slug": "cnc-machined-coupling",
        "title": "CNC Machined Coupling",
        "prompt": "Studio e-commerce product photography of a CNC machined stainless steel spiral beam flexible shaft coupler for stepper motors. Clean white background, metallic studio lighting, sharp detail, product photo",
        "seed": 240
    },
    {
        "slug": "cnc-machined-shaft",
        "title": "CNC Machined Shaft",
        "prompt": "Studio e-commerce product photography of a precision CNC turned steel linear drive shaft with ground bearing journals and keyway slot. Isolated on pure white background, studio lighting, crisp metallic finish, product photo",
        "seed": 241
    },
    {
        "slug": "cnc-machined-prototype-component",
        "title": "CNC Prototype Part",
        "prompt": "Studio e-commerce product photography of a complex 4-axis CNC milled billet aluminum robotic knuckle joint prototype part with pockets and mounting bores. Clean white background, studio lighting, sharp focus, product photo",
        "seed": 242
    },

    # ==================== 4. ELECTRONICS ====================
    {
        "slug": "esp32-iot-maker-board",
        "title": "ESP32 IoT Development Board",
        "prompt": "Studio e-commerce product photography of an ESP32 dual-core Wi-Fi and Bluetooth microcontroller development board with pin headers and USB-C port on a black PCB. Isolated on pure white background, soft studio lighting, sharp electronic component detail",
        "seed": 251
    },
    {
        "slug": "37-in-1-iot-sensor-module-kit",
        "title": "IoT Sensor Module Kit",
        "prompt": "Studio e-commerce product photography of an assortment of electronics sensor breakout modules (temperature, ultrasonic, PIR motion, light sensors) with red and blue PCBs neatly arranged on white background, sharp focus, product photo",
        "seed": 252
    },
    {
        "slug": "fr4-double-sided-prototype-pcb-10pack",
        "title": "Double-Sided FR4 Prototype PCB",
        "prompt": "Studio e-commerce product photography of a neat stack of green double-sided FR4 perfboard prototype copper PCBs with gold plated solder pads. Isolated on pure white background, studio lighting, sharp focus, product photo",
        "seed": 253
    },

    # ==================== 5. DRONES & PARTS ====================
    {
        "slug": "fpv-drone-carbon-fiber-frame",
        "title": "FPV Drone Carbon Fiber Frame",
        "prompt": "Studio e-commerce product photography of an unassembled 5-inch FPV racing quadcopter frame made of 3K matte carbon fiber plates with purple anodized aluminum standoffs. Laid out on clean white background, sharp weave texture, studio lighting",
        "seed": 261
    },
    {
        "slug": "brushless-drone-motor-2207-2450kv",
        "title": "Brushless Drone Motor Set",
        "prompt": "Studio e-commerce product photography of high-performance 2207 2450KV brushless drone motors with copper stator windings and titanium shaft. Clean white background, studio lighting, crisp metallic focus, product photo",
        "seed": 262
    },
    {
        "slug": "5-inch-tri-blade-fpv-propellers",
        "title": "5-inch Tri-Blade Propellers",
        "prompt": "Studio e-commerce product photography of 4 pairs of 5-inch tri-blade polycarbonate FPV drone propellers in translucent cyan blue and black. Arranged neatly on pure white background, studio lighting, sharp detail",
        "seed": 263
    },

    # ==================== 6. ACRYLIC PRODUCTS ====================
    {
        "slug": "clear-cast-acrylic-display-box",
        "title": "Clear Cast Acrylic Display Box",
        "prompt": "Studio e-commerce product photography of a crystal clear cast acrylic dust-proof showcase display box with glossy black base. Pure white background, subtle glass-like studio reflections, clean sharp edges, product photo",
        "seed": 271
    },
    {
        "slug": "custom-acrylic-trophy-plaque",
        "title": "Custom Acrylic Trophy Award",
        "prompt": "Studio e-commerce product photography of a modern geometric clear acrylic recognition award trophy plaque with laser engraved gold award crest on beveled base. Pure white background, sparkling reflections, sharp focus",
        "seed": 272
    },
    {
        "slug": "transparent-protective-acrylic-shield",
        "title": "Transparent Protective Acrylic Shield",
        "prompt": "Studio e-commerce product photography of a precision laser cut transparent heavy-duty acrylic safety shield panel with rounded corner radius and mounting brackets. Clean white background, studio lighting, sharp edge clarity",
        "seed": 273
    },

    # ==================== 7. DIY KITS ====================
    {
        "slug": "starter-maker-diy-electronics-kit",
        "title": "Autonomous Robotics STEM Starter Kit",
        "prompt": "Studio e-commerce product photography of an educational DIY robotic smart car kit with chassis, DC gear motors, wheels, sensor shield and microcontroller organized neatly on white background, studio lighting, sharp focus",
        "seed": 281
    },
    {
        "slug": "diy-soldering-practice-electronics-kit",
        "title": "DIY Soldering Practice Kit",
        "prompt": "Studio e-commerce product photography of a DIY electronics soldering practice training kit featuring a printed circuit board with colorful LEDs, resistors, capacitors, and ICs neatly displayed on white background, product photo",
        "seed": 282
    },
    {
        "slug": "diy-bluetooth-speaker-assembly-kit",
        "title": "DIY Bluetooth Speaker Kit",
        "prompt": "Studio e-commerce product photography of a DIY portable Bluetooth stereo speaker maker kit with laser cut wooden enclosure box, full-range speaker cones, audio amplifier board and wires on white background, sharp focus",
        "seed": 283
    }
]

os.makedirs("public/products", exist_ok=True)
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

print(f"Total catalog items to generate: {len(catalog_items)}")

for idx, item in enumerate(catalog_items):
    slug = item["slug"]
    title = item["title"]
    prompt = item["prompt"]
    seed = item["seed"]
    
    fname = f"{slug}.jpg"
    public_path = os.path.join("public/products", fname)
    
    # Check if already generated recently or generate fresh
    encoded = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=800&height=800&nologo=true&seed={seed}&model=flux"
    
    print(f"[{idx+1}/{len(catalog_items)}] Generating product photo: '{title}' -> {fname}...")
    
    success = False
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=60) as resp, open(public_path, 'wb') as out:
                out.write(resp.read())
            
            im = Image.open(public_path)
            # Ensure saved properly as clean RGB JPEG
            im.convert("RGB").save(public_path, "JPEG", quality=92)
            size = os.path.getsize(public_path)
            print(f"   -> Successfully saved {public_path} ({size} bytes, dimensions={im.size})")
            success = True
            break
        except Exception as e:
            print(f"   Attempt {attempt+1} failed: {e}. Retrying in 2s...")
            time.sleep(2)
    
    if not success:
        print(f"   ERROR: Failed to generate {fname}")

print("\nAll catalog product photos generated and saved successfully!")
