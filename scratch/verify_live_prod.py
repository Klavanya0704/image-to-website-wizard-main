import urllib.request
import re
import json

BASE_URL = "https://image-to-website-wizard-main.vercel.app"
headers = {"User-Agent": "Mozilla/5.0"}

print("=" * 80)
print(f"VERIFYING LIVE PRODUCTION DEPLOYMENT: {BASE_URL}")
print("=" * 80)

# 1. Test 3D Printing page
url_3dp = f"{BASE_URL}/category/3d-printing"
req = urllib.request.Request(url_3dp, headers=headers)
html_3dp = urllib.request.urlopen(req).read().decode("utf-8")
main_3dp = html_3dp.split('<script class="$tsr"')[0]
titles_3dp = [t for t in re.findall(r'<a[^>]*title="([^"]+)"[^>]*>', main_3dp) if t not in ("Wishlist", "Cart")]
images_3dp = re.findall(r'<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"', main_3dp)

print(f"\n[3D PRINTING PAGE] {url_3dp}")
print(f"Rendered Products ({len(titles_3dp)}):")
for t in titles_3dp:
    print(f"  * {t}")
print(f"Rendered Images ({len(images_3dp)}):")
for src, alt in images_3dp:
    print(f"  * src: {src} | alt: {alt}")

# 2. Test Laser Cutting page
url_lc = f"{BASE_URL}/category/laser-cutting"
req = urllib.request.Request(url_lc, headers=headers)
html_lc = urllib.request.urlopen(req).read().decode("utf-8")
main_lc = html_lc.split('<script class="$tsr"')[0]
titles_lc = [t for t in re.findall(r'<a[^>]*title="([^"]+)"[^>]*>', main_lc) if t not in ("Wishlist", "Cart")]
images_lc = re.findall(r'<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"', main_lc)

print(f"\n[LASER CUTTING PAGE] {url_lc}")
print(f"Rendered Products ({len(titles_lc)}):")
for t in titles_lc:
    print(f"  * {t}")
print(f"Rendered Images ({len(images_lc)}):")
for src, alt in images_lc:
    print(f"  * src: {src} | alt: {alt}")

# 3. Test images directly on live site
sample_images = [
    "/products/3d-printed-geometric-spiral-vase.jpg",
    "/products/foldable-desktop-phone-tablet-stand.jpg",
    "/products/modular-desktop-stationery-organizer.jpg",
    "/products/interlocking-cable-management-clip-pack.jpg",
    "/products/precision-resin-architectural-tower-model.jpg",
    "/products/hexagonal-geometric-succulent-planter-pot.jpg",
    "/products/custom-laser-engraved-wooden-keychain.jpg",
    "/products/laser-cut-tree-of-life-wooden-led-lamp.jpg",
    "/products/slot-together-plywood-desktop-organizer.jpg",
    "/products/multi-layered-wooden-mandala-wall-art.jpg",
    "/products/laser-engraved-hardwood-photo-frame.jpg",
    "/products/edge-lit-laser-cut-acrylic-led-sign.jpg"
]

print(f"\n[TESTING LIVE IMAGE ASSETS]")
all_images_ok = True
for img_path in sample_images:
    full_url = f"{BASE_URL}{img_path}"
    try:
        req = urllib.request.Request(full_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            status = resp.status
            ctype = resp.headers.get("Content-Type")
            print(f"  [OK] {full_url} -> HTTP {status} ({len(data)} bytes, {ctype})")
    except Exception as e:
        print(f"  [FAIL] {full_url} -> {e}")
        all_images_ok = False

print("\n" + "=" * 80)
print(f"3D Printing Live Verification: {'PASS' if len(titles_3dp) == 6 else 'FAIL'}")
print(f"Laser Cutting Live Verification: {'PASS' if len(titles_lc) == 6 else 'FAIL'}")
print(f"All New Images Live: {'YES' if all_images_ok else 'NO'}")
print("=" * 80)
