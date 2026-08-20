import urllib.request
import os
from PIL import Image

# Curated direct high-resolution URLs of real handmade & workshop CNC products
product_photo_candidates = {
    # 1. CNC Wooden Name Plate - real carved wooden desk nameplate
    "cnc-wooden-name-plate.jpg": [
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=85",
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=85",
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=85"
    ],
    
    # 2. CNC Wooden Wall Panel - real 3D carved textured wood panel
    "cnc-carved-wooden-wall-panel.jpg": [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=85",
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1200&auto=format&fit=crop&q=85"
    ],
    
    # 3. CNC Wooden Mandala - carved geometric wooden mandala
    "cnc-cut-wooden-mandala.jpg": [
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=85",
        "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1200&auto=format&fit=crop&q=85"
    ],
    
    # 4. CNC Wooden Box - solid hardwood milled box with wooden lid (no ribbon/gift wrap)
    "cnc-cut-wooden-box.jpg": [
        "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=1200&auto=format&fit=crop&q=85",
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&auto=format&fit=crop&q=85",
        "https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&auto=format&fit=crop&q=85"
    ],
    
    # 5. CNC Wooden Key Holder - wall key rack / key organizer with hooks
    "cnc-wooden-key-holder.jpg": [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&auto=format&fit=crop&q=85",
        "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=1200&auto=format&fit=crop&q=85",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop&q=85"
    ],
    
    # 6. CNC Wooden Relief Carving - 3D carved relief plaque in hardwood
    "cnc-wooden-relief-art.jpg": [
        "https://images.unsplash.com/photo-1578925518470-4def7a0f08bb?w=1200&auto=format&fit=crop&q=85",
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=85"
    ],
    
    # 7. CNC Wooden Sign Board - carved wooden signboard / workshop plaque
    "cnc-wooden-sign-board.jpg": [
        "https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&auto=format&fit=crop&q=85",
        "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1200&auto=format&fit=crop&q=85"
    ],
    
    # 8. CNC Aluminium Bracket - 6061 machined corner bracket (already have clean studio photo in brain!)
    
    # 9. CNC Aluminium Plate - precision tooling plate with holes
    "cnc-aluminum-fixture-plate.jpg": [
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=85"
    ],
    
    # 10. CNC Machined Gear - metal gear wheel
    "cnc-machined-gear.jpg": [
        "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1200&auto=format&fit=crop&q=85",
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=85"
    ],
    
    # 11. CNC Machined Shaft - cylindrical linear shaft
    "cnc-machined-shaft.jpg": [
        "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1200&auto=format&fit=crop&q=85",
        "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&auto=format&fit=crop&q=85"
    ],
    
    # 12. CNC Machined Bushing - brass flanged bushing (already in public/products!)
    
    # 13. CNC Machined Coupling - spiral beam coupling (already in public/products!)
    
    # 14. CNC Machined Pulley - aluminum timing belt pulley / grooved wheel
    "cnc-machined-pulley.jpg": [
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=85",
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&auto=format&fit=crop&q=85"
    ],
    
    # 15. CNC Machined Prototype Part - multi-axis milled aluminum prototype component
    "cnc-machined-prototype-component.jpg": [
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&auto=format&fit=crop&q=85"
    ]
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def crop_to_square(src_path, dest_path, size=1024):
    im = Image.open(src_path)
    w, h = im.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    right = left + min_dim
    bottom = top + min_dim
    cropped = im.crop((left, top, right, bottom))
    resized = cropped.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(dest_path, "JPEG", quality=92)
    print(f"Saved {dest_path} ({resized.size})")

for fname, urls in product_photo_candidates.items():
    scratch_dest = os.path.join("scratch", fname)
    public_dest = os.path.join("public/products", fname)
    success = False
    for url in urls:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp, open(scratch_dest, 'wb') as out:
                out.write(resp.read())
            crop_to_square(scratch_dest, public_dest)
            success = True
            break
        except Exception as e:
            print(f"Failed {url}: {e}")
    if not success:
        print(f"COULD NOT DOWNLOAD {fname}")

print("Candidate downloads finished.")
