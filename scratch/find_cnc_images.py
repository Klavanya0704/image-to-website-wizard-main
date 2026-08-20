import os

search_dirs = [
    r"public/products",
    r"src/assets",
    r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0",
    r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\.tempmediaStorage",
    r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\.user_uploaded",
]

found_images = []

for sdir in search_dirs:
    if not os.path.exists(sdir):
        continue
    for f in os.listdir(sdir):
        if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            full_path = os.path.join(sdir, f)
            size = os.path.getsize(full_path)
            found_images.append((f, size, full_path))

print(f"Total available image files found: {len(found_images)}")
for f, s, p in sorted(found_images, key=lambda x: x[0]):
    if any(k in f.lower() for k in ['cnc', 'bracket', 'bushing', 'gear', 'heatsink', 'coupling', 'shaft', 'spacer', 'motor', 'plate', 'block', 'metal', 'prod', 'media', 'p-']):
        print(f"{f} ({s} bytes) -> {p}")
