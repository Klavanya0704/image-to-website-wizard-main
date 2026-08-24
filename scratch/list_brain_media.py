import os
import glob

brain_dir = r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0"
files = glob.glob(os.path.join(brain_dir, "**", "*.jpg"), recursive=True)

print(f"Total jpg files found in brain directory: {len(files)}")
for f in sorted(files):
    sz = os.path.getsize(f)
    print(f"{os.path.basename(f):<55} | Size: {sz} bytes | {f}")
