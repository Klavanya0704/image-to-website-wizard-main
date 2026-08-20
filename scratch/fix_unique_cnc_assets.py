import urllib.request
import shutil
from PIL import Image

# 1. Use high-res dedicated aluminum fixture plate
shutil.copyfile("public/products/precision-mounting-plate.jpg", "public/products/cnc-aluminum-fixture-plate.jpg")

# 2. Download distinct pulley image
pulley_url = "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&auto=format&fit=crop&q=85"
req = urllib.request.Request(pulley_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=10) as resp, open("scratch/pulley_raw.jpg", 'wb') as out:
    out.write(resp.read())

im = Image.open("scratch/pulley_raw.jpg")
w, h = im.size
min_dim = min(w, h)
cropped = im.crop(((w-min_dim)//2, (h-min_dim)//2, (w+min_dim)//2, (h+min_dim)//2))
cropped.resize((1024, 1024), Image.Resampling.LANCZOS).save("public/products/cnc-machined-pulley.jpg", "JPEG", quality=92)

print("Unique assets updated.")
