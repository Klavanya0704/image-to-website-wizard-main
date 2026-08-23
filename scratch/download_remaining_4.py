import urllib.request
import os
from PIL import Image

remaining_photos = {
    "cnc-machined-high-precision-spur-gear": "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1024&h=1024&q=85", # Precision metal gears
    "2207-2450kv-high-power-brushless-drone-motor": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1024&h=1024&q=85", # High performance brushless rotor motor
    "laser-engraved-beveled-acrylic-award-trophy": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1024&h=1024&q=85", # Laser etched acrylic award trophy
    "miniature-solar-powered-stem-rover-buggy-kit": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1024&h=1024&q=85", # Solar STEM vehicle kit
}

target_dir = r"public\products"
headers = {"User-Agent": "Mozilla/5.0"}

for slug, url in remaining_photos.items():
    dest_path = os.path.join(target_dir, f"{slug}.jpg")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(dest_path, "wb") as f:
                f.write(data)
        
        with Image.open(dest_path) as img:
            if img.size != (1024, 1024):
                img = img.resize((1024, 1024), Image.Resampling.LANCZOS)
                img.save(dest_path, "JPEG", quality=90)
        
        print(f"Downloaded & verified {slug}.jpg ({os.path.getsize(dest_path)} bytes, 1024x1024)")
    except Exception as e:
        print(f"Error downloading {slug}: {e}")
