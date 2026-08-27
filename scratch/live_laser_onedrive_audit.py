import os
import json
import hashlib
import urllib.request
import re

LIVE_URL = "https://image-to-website-wizard-main.vercel.app"
CATEGORY_URL = f"{LIVE_URL}/category/laser-cutting"

with open(r"scratch\onedrive_laser_products_data.json", "r", encoding="utf-8") as f:
    products = json.load(f)

print("=" * 100)
print(f"FETCHING LIVE HTML: {CATEGORY_URL}")
print("=" * 100)

req = urllib.request.Request(CATEGORY_URL, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode("utf-8")

print(f"Live HTML Length: {len(html)} bytes")

# Check rendered image paths in HTML
found_images = re.findall(r'/products/v5/[a-zA-Z0-9_-]+\.jpg', html)
unique_found = list(dict.fromkeys(found_images))
print(f"Found {len(unique_found)} unique v5 image URLs in live category HTML:")
for u in unique_found[:10]:
    print(f"  - {u}")

print("\n" + "=" * 100)
print("DOWNLOADING AND AUDITING LIVE IMAGES (SHA-256 BYTE VERIFICATION)")
print("=" * 100)

results = []
all_matched = True

for idx, p in enumerate(products):
    img_rel = p["image"]
    live_img_url = f"{LIVE_URL}{img_rel}"
    local_file = os.path.join("public", img_rel.lstrip("/").replace("/", os.sep))
    
    with open(local_file, "rb") as fp:
        local_sha = hashlib.sha256(fp.read()).hexdigest()
        
    try:
        ireq = urllib.request.Request(live_img_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(ireq) as iresp:
            live_bytes = iresp.read()
            live_sha = hashlib.sha256(live_bytes).hexdigest()
            
        matched = (local_sha == live_sha)
        if not matched:
            all_matched = False
            
        print(f"[{idx+1:02d}/23] [MATCH: {'YES' if matched else 'NO'}] {p['title']:<55} | Local: {local_sha[:10]}... | Live: {live_sha[:10]}... ({len(live_bytes)} B)")
        results.append({
            "title": p["title"],
            "slug": p["slug"],
            "url": live_img_url,
            "local_sha": local_sha,
            "live_sha": live_sha,
            "matched": matched,
            "size": len(live_bytes)
        })
    except Exception as e:
        print(f"[{idx+1:02d}/23] [ERROR] {p['title']}: {e}")
        all_matched = False

print("=" * 100)
print(f"Total Laser Cutting Products Audited: {len(results)} / {len(products)}")
print(f"All 23 Images Byte-for-Byte Match on Production: {'PASS (100%)' if all_matched else 'FAIL'}")
print("=" * 100)
