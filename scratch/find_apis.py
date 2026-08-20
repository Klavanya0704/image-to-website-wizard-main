import os
import re

src_dir = r"src"

storage_usages = []
date_usages = []
api_usages = []

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".ts", ".tsx", ".js", ".jsx")):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                lines = f.readlines()
            for idx, line in enumerate(lines, 1):
                if "localStorage" in line or "sessionStorage" in line:
                    storage_usages.append((path, idx, line.strip()))
                if "new Date(" in line:
                    date_usages.append((path, idx, line.strip()))
                if any(x in line for x in ["navigator.", "window.print", "window.open", "IntersectionObserver", "ResizeObserver", "matchMedia"]):
                    api_usages.append((path, idx, line.strip()))

print(f"--- STORAGE USAGES ({len(storage_usages)}) ---")
for p, idx, l in storage_usages[:25]:
    print(f"{p}:{idx} -> {l}")

print(f"\n--- DATE USAGES ({len(date_usages)}) ---")
for p, idx, l in date_usages[:25]:
    print(f"{p}:{idx} -> {l}")

print(f"\n--- BROWSER API USAGES ({len(api_usages)}) ---")
for p, idx, l in api_usages[:25]:
    print(f"{p}:{idx} -> {l}")
