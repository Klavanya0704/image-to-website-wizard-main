import os

files = [
    "custom-name-keychain.jpg",
    "tree-of-life-lamp.jpg",
    "tree-of-life-led-lamp.jpg",
    "college-logo-board.jpg",
    "wooden-wall-art-mandala.jpg",
    "laser-cut-desk-organizer.jpg",
    "laser-engraved-photo-frame.jpg",
    "custom-engraved-wooden-keychain.jpg",
    "mandala-laser-cut-wooden-coasters.jpg"
]

base_dir = r"public/products"
for f in files:
    p = os.path.join(base_dir, f)
    if os.path.exists(p):
        size = os.path.getsize(p)
        print(f"EXISTS: {f} ({size} bytes)")
    else:
        print(f"MISSING: {f}")
