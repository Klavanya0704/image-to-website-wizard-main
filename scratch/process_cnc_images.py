from PIL import Image
import os
import shutil

# 1. cnc-aluminum-mounting-bracket.jpg <- C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\cnc_bracket_photo_1787201966512.jpg
bracket_src = r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\cnc_bracket_photo_1787201966512.jpg"
shutil.copyfile(bracket_src, "public/products/cnc-aluminum-mounting-bracket.jpg")
print("1. Copied cnc-aluminum-mounting-bracket.jpg")

# 2. precision-cnc-flanged-bushing.jpg <- public/products/cnc-machined-flanged-brass-bushings.jpg
shutil.copyfile("public/products/cnc-machined-flanged-brass-bushings.jpg", "public/products/precision-cnc-flanged-bushing.jpg")
print("2. Copied precision-cnc-flanged-bushing.jpg")

# 3. cnc-stainless-steel-coupling.jpg <- public/products/precision-aluminum-shaft-coupler.jpg
shutil.copyfile("public/products/precision-aluminum-shaft-coupler.jpg", "public/products/cnc-stainless-steel-coupling.jpg")
print("3. Copied cnc-stainless-steel-coupling.jpg")

# 4. cnc-aluminum-fixture-plate.jpg <- public/products/precision-mounting-plate.jpg
shutil.copyfile("public/products/precision-mounting-plate.jpg", "public/products/cnc-aluminum-fixture-plate.jpg")
print("4. Copied cnc-aluminum-fixture-plate.jpg")

# Function to center-crop to square
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
    print(f"Cropped and saved {dest_path}: {resized.size}")

# Process downloaded CNC metal part images
crop_to_square("scratch/cnc-aluminum-heat-sink.jpg", "public/products/cnc-aluminum-heat-sink.jpg")
crop_to_square("scratch/cnc-machined-gear.jpg", "public/products/cnc-machined-gear.jpg")
crop_to_square("scratch/cnc-machined-shaft.jpg", "public/products/cnc-machined-shaft.jpg")
crop_to_square("scratch/cnc-metal-spacer-set.jpg", "public/products/cnc-metal-spacer-set.jpg")
crop_to_square("scratch/cnc-precision-motor-mount.jpg", "public/products/cnc-precision-motor-mount.jpg")
crop_to_square("scratch/cnc-machined-enclosure.jpg", "public/products/cnc-machined-enclosure.jpg")

print("All 10 CNC product images prepared.")
