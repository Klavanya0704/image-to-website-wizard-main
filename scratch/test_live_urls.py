import urllib.request
import time

urls = [
    "3d-printed-geometric-spiral-vase.jpg",
    "foldable-desktop-phone-tablet-stand.jpg",
    "modular-desktop-stationery-organizer.jpg",
    "interlocking-cable-management-clip-pack.jpg",
    "precision-resin-architectural-tower-model.jpg",
    "hexagonal-geometric-succulent-planter-pot.jpg",
    "custom-laser-engraved-wooden-keychain.jpg",
    "laser-cut-tree-of-life-wooden-led-lamp.jpg",
    "slot-together-plywood-desktop-organizer.jpg",
    "multi-layered-wooden-mandala-wall-art.jpg",
    "laser-engraved-hardwood-photo-frame.jpg",
    "edge-lit-laser-cut-acrylic-led-sign.jpg"
]

print("=" * 80)
print("LIVE PRODUCTION ASSET VERIFICATION")
print("=" * 80)

for u in urls:
    full_url = f"https://image-to-website-wizard-main.vercel.app/products/{u}"
    success = False
    for attempt in range(3):
        try:
            req = urllib.request.Request(full_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=15) as res:
                content = res.read()
                print(f"[OK] {u:<45} -> HTTP {res.status} ({len(content)} bytes)")
                success = True
                break
        except Exception as e:
            time.sleep(1)
    if not success:
        print(f"[FAIL] {u:<45} -> {e}")

print("=" * 80)
