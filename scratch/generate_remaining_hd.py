import urllib.request
import urllib.parse
import os
import time
from PIL import Image

remaining = [
    {
        "slug": "5-inch-tri-blade-fpv-propellers",
        "title": "5-inch Tri-Blade Propellers",
        "prompt": "Studio e-commerce product photograph of 4 pairs of 5-inch tri-blade polycarbonate FPV racing drone propellers in translucent cyan blue and black. Arranged neatly on pure white background, studio lighting, razor sharp focus, 8k",
        "seed": 543
    },
    {
        "slug": "diy-bluetooth-speaker-assembly-kit",
        "title": "DIY Portable Bluetooth Stereo Speaker Build Kit",
        "prompt": "Studio e-commerce product photograph of a DIY portable Bluetooth stereo speaker maker kit with laser cut wooden enclosure box, two 3-watt speaker drivers, Bluetooth amplifier board, and wiring on clean white background, sharp focus, 8k",
        "seed": 563
    }
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for p in remaining:
    fname = f"{p['slug']}.jpg"
    target_path = os.path.join("public/products", fname)
    encoded = urllib.parse.quote(p['prompt'])
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=1024&height=1024&nologo=true&seed={p['seed']}&model=flux"
    
    print(f"Generating HD image for {p['title']}...")
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=60) as resp, open(target_path, 'wb') as out:
                out.write(resp.read())
            
            im = Image.open(target_path)
            im = im.convert("RGB")
            if im.size != (1024, 1024):
                im = im.resize((1024, 1024), Image.Resampling.LANCZOS)
            im.save(target_path, "JPEG", quality=95)
            print(f"-> Successfully saved {target_path} (Size: {os.path.getsize(target_path)} bytes, {im.size})")
            break
        except Exception as e:
            print(f"Attempt {attempt+1} failed: {e}. Retrying in 3s...")
            time.sleep(3)

print("Remaining HD images completed!")
