import urllib.request
import os
from PIL import Image

wood_urls = {
    # CNC Carved Wooden Wall Panel (3D wave / geometric fluted texture)
    "cnc-carved-wooden-wall-panel.jpg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=85",
    
    # CNC Wooden Sign Board (V-carved engraved wood sign)
    "cnc-wooden-sign-board.jpg": "https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&auto=format&fit=crop&q=85",
    
    # CNC Cut Wooden Mandala (Carved circular wooden mandala art)
    "cnc-cut-wooden-mandala.jpg": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=85",
    
    # CNC Wooden Decorative Panel (Architectural lattice woodwork)
    "cnc-wooden-decorative-panel.jpg": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85",
    
    # CNC Carved Furniture Panel (Carved wood paneling / door)
    "cnc-carved-furniture-panel.jpg": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200&auto=format&fit=crop&q=85",
    
    # CNC Wooden Name Plate (Carved solid wood desktop plaque)
    "cnc-wooden-name-plate.jpg": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop&q=85",
    
    # CNC Cut Wooden Box (Solid milled hardwood box with lid)
    "cnc-cut-wooden-box.jpg": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=85",
}

headers = {'User-Agent': 'Mozilla/5.0'}

for fname, url in wood_urls.items():
    dest = os.path.join("scratch", fname)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as out:
            out.write(resp.read())
        im = Image.open(dest)
        print(f"Downloaded {fname}: size={im.size}")
    except Exception as e:
        print(f"Error {fname}: {e}")
