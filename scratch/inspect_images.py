import os
from PIL import Image

dirs = [
    r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\.user_uploaded",
    r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\.tempmediaStorage",
    r"public/products",
]

for d in dirs:
    if not os.path.exists(d):
        continue
    for f in os.listdir(d):
        fp = os.path.join(d, f)
        if os.path.isfile(fp) and f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            try:
                im = Image.open(fp)
                print(f"{d} -> {f}: format={im.format}, size={im.size}, mode={im.mode}")
            except Exception as e:
                pass
