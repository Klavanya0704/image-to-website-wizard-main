import urllib.request
import os
from PIL import Image

public_dir = r"c:\Users\Lavanya\Downloads\image-to-website-wizard-main\image-to-website-wizard-main\public\products"
os.makedirs(public_dir, exist_ok=True)

# High-resolution Unsplash direct CDN URLs (1200x1200px square, studio lighting, clean background)
image_sources = {
    # CNC Machining
    "cnc-coupling.jpg": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&h=1200&q=90",
    "cnc-bracket.jpg": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&h=1200&q=90",
    "cnc-bushings.jpg": "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&h=1200&q=90",

    # Laser Cutting (Keychain & MDF)
    "wood-keychain.jpg": "https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=1200&h=1200&q=90",
    "mdf-kit.jpg": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&h=1200&q=90",

    # Electronics
    "esp32-board.jpg": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&h=1200&q=90",
    "sensor-kit.jpg": "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=1200&h=1200&q=90",
    "prototype-pcb.jpg": "https://images.unsplash.com/photo-1608564697071-ddf911d81370?auto=format&fit=crop&w=1200&h=1200&q=90",

    # Drones & Parts
    "drone-frame.jpg": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&h=1200&q=90",
    "drone-motor.jpg": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&h=1200&q=90",
    "drone-propellers.jpg": "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=1200&h=1200&q=90",

    # Acrylic Products
    "acrylic-box.jpg": "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&h=1200&q=90",
    "acrylic-trophy.jpg": "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=1200&h=1200&q=90",
    "acrylic-shield.jpg": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&h=1200&q=90",

    # DIY Kits
    "robotics-kit.jpg": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&h=1200&q=90",
    "soldering-kit.jpg": "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&h=1200&q=90",
    "bluetooth-speaker-kit.jpg": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&h=1200&q=90",
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for filename, url in image_sources.items():
    dest = os.path.join(public_dir, filename)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as response, open(dest, 'wb') as out_file:
            out_file.write(response.read())
        # Check and verify image resolution
        with Image.open(dest) as img:
            print(f"Downloaded {filename}: {img.size} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")

print("All category high-res images processed.")
