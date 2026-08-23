import urllib.request
import os
from PIL import Image

# Curated high-resolution studio product photos exactly matching each remaining title
CURATED_PHOTOS = {
    # CNC Machining
    "cnc-relief-carved-wooden-decorative-panel": "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1024&h=1024&q=85", # Parametric wood carving texture
    "cnc-milled-hardwood-keepsake-box": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1024&h=1024&q=85", # Handcrafted solid wooden box
    "cnc-precision-aluminium-fixture-plate": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1024&h=1024&q=85", # Precision metal tooling plate
    "cnc-machined-high-precision-spur-gear": "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1024&h=1024&q=85", # Machined stainless steel gear

    # Electronics
    "esp32-dual-core-iot-development-board": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1024&h=1024&q=85", # High tech microcontroller circuit board
    "37-piece-iot-sensor-module-starter-kit": "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=1024&h=1024&q=85", # Electronics components & sensors assortment
    "double-sided-fr4-prototype-pcb-pack": "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1024&h=1024&q=85", # Green FR4 prototype PCB circuit board
    "arduino-compatible-atmega328p-microcontroller": "https://images.unsplash.com/photo-1608555855762-2b657eb1c348?auto=format&fit=crop&w=1024&h=1024&q=85", # Classic Arduino blue PCB microcontroller
    "i2c-096-inch-oled-display-module": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1024&h=1024&q=85", # Glowing micro OLED screen display

    # Drones & Parts
    "5-inch-fpv-racing-3k-carbon-fiber-drone-frame": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1024&h=1024&q=85", # Carbon fiber quadcopter frame
    "2207-2450kv-high-power-brushless-drone-motor": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1024&h=1024&q=85", # High power drone brushless motor
    "5-inch-tri-blade-fpv-drone-propellers-pack": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1024&h=1024&q=85", # Drone propeller blades
    "30a-4-in-1-blheli-s-electronic-speed-controller": "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=1024&h=1024&q=85", # Electronic speed controller SMT PCB
    "omnidirectional-58ghz-fpv-cloverleaf-antenna": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1024&h=1024&q=85", # RF cloverleaf antenna

    # Acrylic Products
    "crystal-clear-cast-acrylic-showcase-cube-box": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1024&h=1024&q=85", # Clear transparent acrylic display
    "laser-engraved-beveled-acrylic-award-trophy": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1024&h=1024&q=85", # Crystal acrylic award trophy plaque
    "high-clarity-heavy-duty-acrylic-sneeze-shield": "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=1024&h=1024&q=85", # Clear protective acrylic barrier screen
    "desktop-acrylic-slanted-brochure-menu-holder": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1024&h=1024&q=85", # Slanted clear display stand holder
    "multi-tiered-clear-acrylic-cosmetic-display-riser": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1024&h=1024&q=85", # Multi-tiered step riser display stand

    # DIY Kits
    "autonomous-4wd-smart-robotic-stem-starter-kit": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1024&h=1024&q=85", # 4WD STEM robotics car kit
    "educational-electronics-soldering-practice-kit": "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1024&h=1024&q=85", # Soldering practice electronics board
    "diy-portable-bluetooth-stereo-speaker-maker-kit": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1024&h=1024&q=85", # Wooden DIY Bluetooth speaker
    "miniature-solar-powered-stem-rover-buggy-kit": "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1024&h=1024&q=85", # Solar powered miniature rover kit
    "smart-weather-station-iot-esp8266-maker-kit": "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1024&h=1024&q=85", # IoT ambient sensor display station
}

target_dir = r"public\products"
headers = {"User-Agent": "Mozilla/5.0"}

for slug, url in CURATED_PHOTOS.items():
    dest_path = os.path.join(target_dir, f"{slug}.jpg")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(dest_path, "wb") as f:
                f.write(data)
        
        # Ensure 1024x1024 resizing if needed
        with Image.open(dest_path) as img:
            if img.size != (1024, 1024):
                img = img.resize((1024, 1024), Image.Resampling.LANCZOS)
                img.save(dest_path, "JPEG", quality=90)
        
        print(f"Downloaded & verified {slug}.jpg ({os.path.getsize(dest_path)} bytes, 1024x1024)")
    except Exception as e:
        print(f"Error downloading {slug}: {e}")
