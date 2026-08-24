import os
import glob

media_dir = r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\.tempmediaStorage"
files = glob.glob(os.path.join(media_dir, "*.jpg"))

print(f"Total tempmedia files: {len(files)}")
for f in sorted(files):
    print(f"{os.path.basename(f)} | Size: {os.path.getsize(f)} bytes")
