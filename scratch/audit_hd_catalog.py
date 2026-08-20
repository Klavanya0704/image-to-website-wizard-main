import os
import re
from PIL import Image

with open("src/lib/catalog.ts", "r", encoding="utf-8") as f:
    content = f.read()

pattern = r'\{\s*id:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)",[\s\S]*?slug:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",[\s\S]*?image:\s*"([^"]+)",'
matches = re.findall(pattern, content)

print(f"=== FULL AUDIT OF ALL {len(matches)} CATALOG PRODUCTS & 1024x1024 HD ASSETS ===")
all_pass = True
seen_images = {}

for pid, name, slug, cat, img in matches:
    local_path = "public" + img
    exists = os.path.exists(local_path)
    if not exists:
        print(f"[FAIL: MISSING] {cat} -> '{name}' ({img})")
        all_pass = False
        continue
    
    size = os.path.getsize(local_path)
    im = Image.open(local_path)
    width, height = im.size
    
    if width < 1024 or height < 1024:
        print(f"[WARN: LOW RES] {cat} -> '{name}' ({img}): {width}x{height}")
        all_pass = False
    elif size < 20000:
        print(f"[WARN: SMALL SIZE] {cat} -> '{name}' ({img}): {size} bytes")
        all_pass = False
    else:
        seen_images.setdefault(img, []).append(f"[{cat}] {name}")
        print(f"[PASS] [{cat}] '{name}' -> {img} ({width}x{height}, {size} bytes)")

print("\n--- DUPLICATION AUDIT ---")
dups = 0
for img, prods in seen_images.items():
    if len(prods) > 1:
        print(f"[DUPLICATE DETECTED] {img} shared between: {prods}")
        dups += 1

if dups == 0 and all_pass:
    print(f"\nALL CHECKS PASSED: {len(matches)} unique, sharp 1024x1024 HD product images verified with ZERO duplicates!")
else:
    print(f"\nAUDIT FINISHED WITH ISSUES: dups={dups}, all_pass={all_pass}")
