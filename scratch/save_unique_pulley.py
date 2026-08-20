import urllib.request
from PIL import Image

# Distinct URL for precision pulley
pulley_url = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=85"
req = urllib.request.Request(pulley_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=10) as resp, open("scratch/pulley_unique.jpg", 'wb') as out:
    out.write(resp.read())

im = Image.open("scratch/pulley_unique.jpg")
w, h = im.size
min_dim = min(w, h)
cropped = im.crop(((w-min_dim)//2, (h-min_dim)//2, (w+min_dim)//2, (h+min_dim)//2))
cropped.resize((1024, 1024), Image.Resampling.LANCZOS).save("public/products/cnc-machined-pulley.jpg", "JPEG", quality=90)

print("Unique pulley photo saved.")
