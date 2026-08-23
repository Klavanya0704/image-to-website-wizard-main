import urllib.request
import re

BASE_URL = "https://image-to-website-wizard-main.vercel.app"

CATEGORIES = [
    "3d-printing",
    "laser-cutting",
    "cnc-machining",
    "electronics",
    "drones-parts",
    "acrylic-products",
    "diy-kits"
]

headers = {"User-Agent": "Mozilla/5.0"}

for cat in CATEGORIES:
    url = f"{BASE_URL}/category/{cat}"
    req = urllib.request.Request(url, headers=headers)
    html = urllib.request.urlopen(req).read().decode("utf-8")
    
    # Split before the dehydration script tag
    main_html = html.split('<script class="$tsr"')[0]
    
    # Extract product titles from <a ... title="...">
    titles = re.findall(r'<a[^>]*title="([^"]+)"[^>]*>', main_html)
    
    # Also extract product images in the rendered DOM
    images = re.findall(r'<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"', main_html)
    
    print(f"\n==========================================")
    print(f"LIVE URL: {url}")
    print(f"Total Rendered Product Titles: {len(titles)}")
    for t in titles:
        print(f"  * Product: {t}")
        
    print(f"Rendered Product Images: {len(images)}")
    for src, alt in images[:4]:
        print(f"    -> img src: {src} | alt: {alt}")
