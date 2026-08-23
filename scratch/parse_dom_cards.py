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
    
    # Extract product titles from card headings (e.g., h3 / product card titles)
    titles = re.findall(r'<h3[^>]*class="[^"]*font-bold[^"]*"[^>]*>(.*?)</h3>', main_html)
    if not titles:
        titles = re.findall(r'<h3[^>]*>(.*?)</h3>', main_html)
        
    print(f"\n==========================================")
    print(f"CATEGORY PAGE: /category/{cat}")
    print(f"Total Rendered ProductCards in DOM: {len(titles)}")
    for t in titles:
        # Strip any internal tags
        clean_t = re.sub(r'<[^>]+>', '', t).strip()
        print(f"  * {clean_t}")
