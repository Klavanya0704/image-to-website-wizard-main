import os
from PIL import Image

d = r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\.user_uploaded"
if os.path.exists(d):
    for f in os.listdir(d):
        fp = os.path.join(d, f)
        im = Image.open(fp)
        print(f"{f}: size={im.size}")
