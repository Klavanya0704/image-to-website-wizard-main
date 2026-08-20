from PIL import Image
import os

images = [
    "cnc-carved-wooden-wall-panel.jpg",
    "cnc-wooden-sign-board.jpg",
    "cnc-cut-wooden-mandala.jpg",
    "cnc-wooden-decorative-panel.jpg",
    "cnc-carved-furniture-panel.jpg",
    "cnc-wooden-name-plate.jpg",
    "cnc-cut-wooden-box.jpg"
]

def crop_to_square(src_path, dest_path, size=1024):
    im = Image.open(src_path)
    w, h = im.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    right = left + min_dim
    bottom = top + min_dim
    cropped = im.crop((left, top, right, bottom))
    resized = cropped.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(dest_path, "JPEG", quality=92)
    print(f"Saved {dest_path} -> {resized.size} ({os.path.getsize(dest_path)} bytes)")

for img_name in images:
    src = os.path.join("scratch", img_name)
    dest = os.path.join("public/products", img_name)
    crop_to_square(src, dest)

print("All 7 CNC wood product images processed.")
