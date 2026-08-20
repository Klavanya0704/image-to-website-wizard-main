import urllib.request
import os
from PIL import Image

shaft_urls = [
    ("cnc-machined-shaft.jpg", "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=85"),
    ("cnc-machined-shaft.jpg", "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1200&auto=format&fit=crop&q=85"),
]

headers = {'User-Agent': 'Mozilla/5.0'}

for fname, url in shaft_urls:
    dest = os.path.join("scratch", fname)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as out:
            out.write(resp.read())
        im = Image.open(dest)
        print(f"Downloaded {fname}: size={im.size}")
        break
    except Exception as e:
        print(f"Error: {e}")
