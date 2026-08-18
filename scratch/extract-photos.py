from PIL import Image
import os

img = Image.open(r'C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\.user_uploaded\media_1787035894035.png')
if img.mode != 'RGB':
    img = img.convert('RGB')
w, h = img.size
print("Source dimensions:", w, h)

# Card image crop coordinates in the 1024x682 reference image:
# Row 1 card image boxes:
# Card 1 (Vase): left: 228, top: 174, right: 412, bottom: 298
# Card 2 (Phone stand): left: 422, top: 174, right: 606, bottom: 298
# Card 3 (Desk organizer): left: 616, top: 174, right: 800, bottom: 298
# Card 4 (Cable clips): left: 810, top: 174, right: 994, bottom: 298

# Row 2 card image boxes:
# Card 5 (Arch model): left: 228, top: 444, right: 412, bottom: 568
# Card 6 (Hex planter): left: 422, top: 444, right: 606, bottom: 568

crops = {
    "3d-vase.jpg": (228, 174, 412, 298),
    "phone-stand.jpg": (422, 174, 606, 298),
    "desk-organizer.jpg": (616, 174, 800, 298),
    "cable-clips.jpg": (810, 174, 994, 298),
    "architectural-model.jpg": (228, 444, 412, 568),
    "hex-planter.jpg": (422, 444, 606, 568)
}

out_dir = r"c:\Users\Lavanya\Downloads\image-to-website-wizard-main\image-to-website-wizard-main\public\products"
os.makedirs(out_dir, exist_ok=True)

for filename, box in crops.items():
    cropped = img.crop(box)
    upscaled = cropped.resize((600, 420), Image.Resampling.LANCZOS)
    target_path = os.path.join(out_dir, filename)
    upscaled.save(target_path, "JPEG", quality=95)
    print(f"Extracted and saved: {filename} ({upscaled.size})")

print("All real photos extracted successfully.")
