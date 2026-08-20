import urllib.request
import urllib.parse
from PIL import Image

prompt = "Studio e-commerce product photograph of a CNC carved wooden decorative wall panel made in a college makerspace. 3D geometric wave fluted texture carved into solid teak hardwood, isolated on pure white neutral background, realistic lighting, sharp focus, clean front three-quarter view, high resolution 8k"
encoded_prompt = urllib.parse.quote(prompt)
url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=1024&height=1024&nologo=true&seed=42&model=flux"

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
print("Requesting AI image generation...")
with urllib.request.urlopen(req, timeout=60) as resp, open("scratch/test_ai_wall_panel.jpg", "wb") as out:
    out.write(resp.read())

im = Image.open("scratch/test_ai_wall_panel.jpg")
print(f"Generated successfully: format={im.format}, size={im.size}")
