import os

src_dir = "src"
matches = []

for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8', errors='ignore') as file:
                lines = file.readlines()
                for idx, line in enumerate(lines):
                    if "productImage" in line or "ProductCard" in line:
                        matches.append(f"{path}:{idx+1}: {line.strip()}")

for m in matches[:30]:
    print(m)
