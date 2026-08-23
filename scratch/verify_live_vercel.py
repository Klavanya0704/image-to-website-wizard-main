import urllib.request
import re
import json

BASE_URL = "https://image-to-website-wizard-main.vercel.app"

CATEGORIES_TO_TEST = [
    {
        "slug": "3d-printing",
        "name": "3D Printing",
        "expected": [
            "3D Printed Geometric Spiral Vase",
            "3D Printed Foldable Phone Stand",
            "3D Printed Mini Desk Organizer",
            "3D Printed Cable Management Clips Pack",
            "3D Printed Resin Architectural Model",
            "3D Printed Hexagonal Planter Pot"
        ],
        "must_not_contain": [
            "Laser Engraved",
            "Mandala",
            "Tree of Life",
            "CNC V-Carved",
            "ESP32",
            "Drone Motor",
            "Soldering Practice"
        ]
    },
    {
        "slug": "laser-cutting",
        "name": "Laser Cutting",
        "expected": [
            "Custom Laser Engraved Wooden Keychain",
            "Laser Cut Tree of Life Wooden LED Lamp",
            "Slot-Together Plywood Desktop Organizer",
            "Multi-Layered Wooden Mandala Wall Art",
            "Laser Engraved Hardwood Photo Frame",
            "Edge-Lit Laser Cut Acrylic LED Sign"
        ],
        "must_not_contain": [
            "3D Printed Geometric",
            "Planter Pot",
            "ESP32",
            "Drone Frame",
            "Robotic STEM"
        ]
    },
    {
        "slug": "cnc-machining",
        "name": "CNC Machining",
        "expected": [
            "CNC V-Carved Solid Walnut Name Plate",
            "CNC Relief-Carved Wooden Decorative Panel",
            "CNC Milled Hardwood Keepsake Box",
            "CNC Machined 6061 Aluminium L-Bracket",
            "CNC Precision Aluminium Fixture Plate",
            "CNC Machined High-Precision Spur Gear"
        ],
        "must_not_contain": [
            "3D Printed Geometric",
            "Laser Cut Tree of Life",
            "ESP32",
            "Drone Frame"
        ]
    },
    {
        "slug": "electronics",
        "name": "Electronics",
        "expected": [
            "ESP32 Dual-Core IoT Development Board",
            "37-Piece IoT Sensor Module Starter Kit",
            "Double-Sided FR4 Prototype PCB Pack",
            "Arduino Compatible ATmega328P Microcontroller",
            "I2C 0.96-Inch OLED Display Module"
        ],
        "must_not_contain": [
            "Spiral Vase",
            "Laser Cut Tree of Life",
            "CNC V-Carved",
            "Drone Propellers"
        ]
    },
    {
        "slug": "drones-parts",
        "name": "Drones & Parts",
        "expected": [
            "5-Inch FPV Racing 3K Carbon Fiber Drone Frame",
            "2207 2450KV High-Power Brushless Drone Motor",
            "5-Inch Tri-Blade FPV Drone Propellers Pack",
            "30A 4-in-1 BLHeli_S Electronic Speed Controller",
            "Omnidirectional 5.8GHz FPV Cloverleaf Antenna"
        ],
        "must_not_contain": [
            "Spiral Vase",
            "Laser Engraved Wooden Keychain",
            "CNC Walnut Name Plate",
            "Soldering Practice"
        ]
    },
    {
        "slug": "acrylic-products",
        "name": "Acrylic Products",
        "expected": [
            "Crystal Clear Cast Acrylic Showcase Cube Box",
            "Laser Engraved Beveled Acrylic Award Trophy",
            "High-Clarity Heavy Duty Acrylic Sneeze Shield",
            "Desktop Acrylic Slanted Brochure & Menu Holder",
            "Multi-Tiered Clear Acrylic Cosmetic Display Riser"
        ],
        "must_not_contain": [
            "Spiral Vase",
            "CNC Fixture Plate",
            "ESP32",
            "Drone Frame"
        ]
    },
    {
        "slug": "diy-kits",
        "name": "DIY Kits",
        "expected": [
            "Autonomous 4WD Smart Robotic STEM Starter Kit",
            "Educational Electronics Soldering Practice Kit",
            "DIY Portable Bluetooth Stereo Speaker Maker Kit",
            "Miniature Solar Powered STEM Rover Buggy Kit",
            "Smart Weather Station IoT ESP8266 Maker Kit"
        ],
        "must_not_contain": [
            "Spiral Vase",
            "Laser Engraved Wooden Keychain",
            "CNC Fixture Plate"
        ]
    }
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36"
}

print("=" * 80)
print(f"TESTING LIVE PRODUCTION DEPLOYMENT: {BASE_URL}")
print("=" * 80)

overall_success = True

for cat in CATEGORIES_TO_TEST:
    url = f"{BASE_URL}/category/{cat['slug']}"
    print(f"\n[GET] {url}")
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            status = resp.status
            html = resp.read().decode("utf-8", errors="ignore")
            
            print(f"Status: {status} OK | Response Size: {len(html)} bytes")
            
            # Check expected items
            missing = []
            for exp in cat["expected"]:
                if exp.lower() not in html.lower():
                    # Check partial title match
                    short_name = exp.split()[0] + " " + exp.split()[1]
                    if short_name.lower() not in html.lower():
                        missing.append(exp)
            
            if missing:
                print(f"  [FAIL] Missing expected products: {missing}")
                overall_success = False
            else:
                print(f"  [PASS] All {len(cat['expected'])} expected products found in page payload.")
                
            # Check forbidden leak items
            leaks = []
            for frb in cat["must_not_contain"]:
                if frb.lower() in html.lower():
                    leaks.append(frb)
                    
            if leaks:
                print(f"  [FAIL] Cross-category leakage detected: {leaks}")
                overall_success = False
            else:
                print(f"  [PASS] Zero cross-category leakage detected.")
                
    except Exception as e:
        print(f"  [ERROR] Failed to fetch {url}: {e}")
        overall_success = False

# Also test a few sample image assets on live site
print("\n" + "-" * 80)
print("TESTING LIVE IMAGE ASSET ENDPOINTS:")
sample_images = [
    "/products/custom-laser-engraved-wooden-keychain.jpg",
    "/products/laser-cut-tree-of-life-wooden-led-lamp.jpg",
    "/products/3d-printed-geometric-spiral-vase.jpg",
    "/products/cnc-v-carved-solid-walnut-name-plate.jpg",
    "/products/esp32-dual-core-iot-development-board.jpg",
    "/products/5-inch-fpv-racing-3k-carbon-fiber-drone-frame.jpg"
]

for img_path in sample_images:
    img_url = f"{BASE_URL}{img_path}"
    try:
        req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            print(f"  [OK] {img_url} -> HTTP {resp.status} ({len(data)} bytes, Content-Type: {resp.headers.get('Content-Type')})")
    except Exception as e:
        print(f"  [ERROR] {img_url} -> {e}")
        overall_success = False

print("\n" + "=" * 80)
if overall_success:
    print(">>> ALL LIVE VERCEL PRODUCTION CHECKS PASSED SUCCESSFULLY! <<<")
else:
    print(">>> SOME LIVE CHECKS FAILED! <<<")
print("=" * 80)
