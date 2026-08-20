import urllib.request
import urllib.parse
import os
import time
from PIL import Image

refined_3d = [
    {
        "slug": "geometric-spiral-vase",
        "title": "3D Printed Geometric Vase",
        "prompt": "Professional studio product photograph of a modern 3D printed tall spiral twisted geometric vase made of white PLA plastic. Empty decorative vase with no flowers, isolated standing on pure white seamless background, studio strobe lighting, crisp sharp layer lines, front three-quarter view, 8k",
        "seed": 701
    },
    {
        "slug": "universal-foldable-phone-stand-3d",
        "title": "Universal Foldable Phone Stand",
        "prompt": "Professional studio product photograph of an adjustable 3D printed plastic desktop smartphone stand cradle in matte black PLA, standing upright on clean white background, sharp focus, studio lighting, isolated commercial product photo",
        "seed": 702
    },
    {
        "slug": "cable-management-clip-set",
        "title": "Cable Management Clip Set",
        "prompt": "Professional studio product photograph of six 3D printed plastic desk cable organizer clips neatly aligned in a row with charging cords slotted into them, clean white studio background, razor sharp focus, e-commerce product photo",
        "seed": 703
    },
    {
        "slug": "planter-pot-hex",
        "title": "Hexagonal Planter Pot",
        "prompt": "Professional studio product photograph of a modern geometric hexagonal desktop planter pot 3D printed in speckled white marble PLA plastic with a small green succulent plant inside, pure white studio background, razor sharp focus",
        "seed": 704
    }
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for p in refined_3d:
    fname = f"{p['slug']}.jpg"
    target_path = os.path.join("public/products", fname)
    encoded = urllib.parse.quote(p['prompt'])
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=1024&height=1024&nologo=true&seed={p['seed']}&model=flux"
    
    print(f"Regenerating 1024x1024 HD image for: {p['title']}...")
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
            print(f"-> Saved: {target_path} ({os.path.getsize(target_path)} bytes, {im.size})")
            break
        except Exception as e:
            print(f"Attempt {attempt+1} failed: {e}. Retrying in 2s...")
            time.sleep(2)

print("\n3D printing images successfully refined!")
