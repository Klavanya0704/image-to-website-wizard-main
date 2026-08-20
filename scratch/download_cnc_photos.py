import urllib.request
import os
from PIL import Image

urls = {
    "cnc-aluminum-heat-sink.jpg": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&auto=format&fit=crop&q=85",
    "cnc-machined-gear.jpg": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=85",
    "cnc-machined-shaft.jpg": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1200&auto=format&fit=crop&q=85",
    "cnc-metal-spacer-set.jpg": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=1200&auto=format&fit=crop&q=85",
    "cnc-precision-motor-mount.jpg": "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&auto=format&fit=crop&q=85",
    "cnc-machined-enclosure.jpg": "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&auto=format&fit=crop&q=85"
}

headers = {'User-Agent': 'Mozilla/5.0'}

for fname, url in urls.items():
    dest = os.path.join("scratch", fname)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as out:
            out.write(resp.read())
        im = Image.open(dest)
        print(f"Downloaded {fname}: size={im.size}, format={im.format}")
    except Exception as e:
        print(f"Error {fname}: {e}")
