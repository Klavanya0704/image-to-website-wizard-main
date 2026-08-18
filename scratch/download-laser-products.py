import urllib.request
import os
from PIL import Image

public_dir = r"c:\Users\Lavanya\Downloads\image-to-website-wizard-main\image-to-website-wizard-main\public\products"
os.makedirs(public_dir, exist_ok=True)

# High-resolution Unsplash photos (1200x1200px, clean lighting, matching exact product titles)
image_sources = {
    # 1. Laser Engraved Photo Frame (Real wooden photo frame on clean background)
    "laser-engraved-photo-frame.jpg": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&h=1200&q=90",
    
    # 2. Custom Name Keychain (Engraved wooden keychain with metal keyring)
    "custom-name-keychain.jpg": "https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=1200&h=1200&q=90",
    
    # 3. Tree of Life LED Lamp (Warm glowing wooden/acrylic decorative lamp)
    "tree-of-life-led-lamp.jpg": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&h=1200&q=90",
    
    # 4. Custom College Logo Board (Engraved wooden plaque / board display)
    "college-logo-board.jpg": "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&h=1200&q=90",
    
    # 5. Wooden Mandala Wall Art (Detailed circular laser-cut wooden mandala art)
    "wooden-wall-art-mandala.jpg": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&h=1200&q=90",
    
    # 6. Laser Cut Desk Organizer (Laser-cut wooden/MDF desk organizer caddy with compartments)
    "laser-cut-desk-organizer.jpg": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&h=1200&q=90",

    # 7. Acrylic Products
    "acrylic-name-plate.jpg": "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&h=1200&q=90",
    "acrylic-keychain.jpg": "https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=1200&h=1200&q=90",
    "acrylic-desk-sign.jpg": "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=1200&h=1200&q=90",
    "transparent-display-stand.jpg": "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=1200&h=1200&q=90",
    "college-logo-acrylic-board.jpg": "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&h=1200&q=90",

    # 8. DIY Kits
    "smart-home-diy-kit.jpg": "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&h=1200&q=90",
    "mini-robot-kit.jpg": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&h=1200&q=90",
    "arduino-project-kit.jpg": "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=1200&h=1200&q=90",
    "drone-building-diy-kit.jpg": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&h=1200&q=90",
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for filename, url in image_sources.items():
    dest = os.path.join(public_dir, filename)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as response, open(dest, 'wb') as out_file:
            out_file.write(response.read())
        with Image.open(dest) as img:
            print(f"Saved {filename}: {img.size} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")

print("Completed downloading specific product photos.")
