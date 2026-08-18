import urllib.request
import os
from PIL import Image

public_dir = r"c:\Users\Lavanya\Downloads\image-to-website-wizard-main\image-to-website-wizard-main\public\products"

image_sources = {
    "cnc-bracket.jpg": "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&h=1200&q=90",
    "cnc-bushings.jpg": "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&h=1200&q=90",
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for filename, url in image_sources.items():
    dest = os.path.join(public_dir, filename)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as response, open(dest, 'wb') as out_file:
            out_file.write(response.read())
        with Image.open(dest) as img:
            print(f"Downloaded {filename}: {img.size} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
