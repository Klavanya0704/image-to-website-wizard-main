import os
import json
import hashlib
from PIL import Image, ImageOps, ImageEnhance

src_folder = r"C:\Users\Lavanya\OneDrive\Pictures\3d printing"
dest_folder = r"public\products\v5"
os.makedirs(dest_folder, exist_ok=True)

# Complete 1-to-1 Mapping of OneDrive Image to Title, Slug, and Metadata
ONEDRIVE_PRODUCTS = [
    {
        "file": "267b75e9890544325f718d99d8f8fffc.webp",
        "name": "3D Printed Winged Mythical Dragon Sculpture",
        "slug": "3d-printed-winged-mythical-dragon-sculpture",
        "description": "Intricate high-detail mythical winged dragon statue 3D printed in metallic deep violet PLA, featuring articulated wings and dynamic rock perch.",
        "price": 999,
        "originalPrice": 1499,
        "rating": 5.0,
        "reviews": 42,
        "stock": 15
    },
    {
        "file": "WhatsApp Image 026-08-24 at 12.20.46 PM.jpeg",
        "name": "3D Printed Cute Animal Cable Organizer Clips",
        "slug": "3d-printed-cute-animal-cable-organizer-clips",
        "description": "Adhesive bedside and desktop cable management clip set featuring 3D printed cartoon panda, bear, and bunny wire anchors.",
        "price": 299,
        "originalPrice": 449,
        "rating": 4.9,
        "reviews": 58,
        "stock": 50
    },
    {
        "file": "WhatsApp Image 2026-08-01 at 10.26.18 AM.jpeg",
        "name": "3D Printed Institutional Desktop Nameplate",
        "slug": "3d-printed-institutional-desktop-nameplate",
        "description": "Executive institutional desk name plaque 3D printed with dual-extrusion red lettering on beveled white stand.",
        "price": 549,
        "originalPrice": 799,
        "rating": 4.8,
        "reviews": 31,
        "stock": 25
    },
    {
        "file": "WhatsApp Image 2026-08-01 at 10.28.29 AM.jpeg",
        "name": "3D Printed Ergonomic Bed Scraper Tool",
        "slug": "3d-printed-ergonomic-bed-scraper-tool",
        "description": "Heavy-duty print bed removal spatula scraper tool 3D printed in high-tensile lime green PETG with ergonomic thumb contour.",
        "price": 199,
        "originalPrice": 299,
        "rating": 4.9,
        "reviews": 76,
        "stock": 60
    },
    {
        "file": "WhatsApp Image 2026-08-01 at 10.28.29 pM.jpeg",
        "name": "3D Printed Dual-Tone Emblem Coaster Token",
        "slug": "3d-printed-dual-tone-emblem-coaster-token",
        "description": "Circular dual-color emblem medal token and drink coaster 3D printed in neon cyan and magenta with raised geometric monogram.",
        "price": 249,
        "originalPrice": 399,
        "rating": 4.7,
        "reviews": 23,
        "stock": 40
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 11.20.24 AM.jpeg",
        "name": "3D Printed Personalized Vertical Name Keychain",
        "slug": "3d-printed-personalized-vertical-name-keychain",
        "description": "Custom vertical pillar name keychain tag 3D printed in dual-tone bold red and white with integrated key loop.",
        "price": 199,
        "originalPrice": 299,
        "rating": 4.8,
        "reviews": 45,
        "stock": 80
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 11.20.25 AM.jpeg",
        "name": "3D Printed Custom Oval Name Badge",
        "slug": "3d-printed-custom-oval-name-badge",
        "description": "Personalized oval doctor and faculty nameplate badge 3D printed with vibrant red border and raised white lettering.",
        "price": 249,
        "originalPrice": 349,
        "rating": 4.9,
        "reviews": 36,
        "stock": 45
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 11.20.26 AM.jpeg",
        "name": "3D Printed Custom Executive Name Tag",
        "slug": "3d-printed-custom-executive-name-tag",
        "description": "Contoured personalized executive name keychain tag 3D printed in dual-color crimson and white PLA.",
        "price": 249,
        "originalPrice": 349,
        "rating": 4.8,
        "reviews": 39,
        "stock": 50
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 11.20.27 AM.jpeg",
        "name": "3D Printed Articulated Folding Name Banner",
        "slug": "3d-printed-articulated-folding-name-banner",
        "description": "Print-in-place multi-hinged folding custom nameplate banner in vibrant red PLA with smooth accordion flexibility.",
        "price": 449,
        "originalPrice": 649,
        "rating": 5.0,
        "reviews": 28,
        "stock": 20
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 12.20.31 PM.jpeg",
        "name": "3D Printed Custom Cable Label Clip Set",
        "slug": "3d-printed-custom-cable-label-clip-set",
        "description": "Set of 5 snap-on personalized wire identification name tags in assorted colors to identify USB and power charging cords.",
        "price": 349,
        "originalPrice": 499,
        "rating": 4.9,
        "reviews": 64,
        "stock": 55
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 12.20.32 PM.jpeg",
        "name": "3D Printed Humanoid Seated Succulent Planter Set",
        "slug": "3d-printed-humanoid-seated-succulent-planter-set",
        "description": "Set of 4 playful seated humanoid desk figurine succulent planters in cream, terracotta, grey, and pastel blush.",
        "price": 799,
        "originalPrice": 1199,
        "rating": 5.0,
        "reviews": 82,
        "stock": 24
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 12.20.33 PM.jpeg",
        "name": "3D Printed Modular Outdoor Geometric Wall Planter",
        "slug": "3d-printed-modular-outdoor-geometric-wall-planter",
        "description": "Weatherproof interlocking hexagonal geometric wall planter system for vertical gardens and patio greenery.",
        "price": 699,
        "originalPrice": 999,
        "rating": 4.8,
        "reviews": 37,
        "stock": 30
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 12.20.34 PM.jpeg",
        "name": "3D Printed Faceted Wall Planter with Ambient Sconce",
        "slug": "3d-printed-faceted-wall-planter-ambient-sconce",
        "description": "Geometric origami wall-mounted planter with integrated indirect warm LED backlight channel in crisp matte white.",
        "price": 849,
        "originalPrice": 1249,
        "rating": 4.9,
        "reviews": 29,
        "stock": 20
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 12.20.39 PM.jpeg",
        "name": "3D Printed Foldable Pocket Phone Stand Keychain",
        "slug": "3d-printed-foldable-pocket-phone-stand-keychain",
        "description": "Set of 3 ultralight pocket-sized folding mobile phone stand keychains in red, black, and yellow PLA.",
        "price": 299,
        "originalPrice": 449,
        "rating": 4.8,
        "reviews": 71,
        "stock": 65
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 12.20.40 PM.jpeg",
        "name": "3D Printed Sculptural Ribbon Phone Stand",
        "slug": "3d-printed-sculptural-ribbon-phone-stand",
        "description": "Minimalist continuous curved loop desk smartphone cradle 3D printed in silky matte white PLA.",
        "price": 349,
        "originalPrice": 499,
        "rating": 4.9,
        "reviews": 53,
        "stock": 40
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 12.20.41 PM.jpeg",
        "name": "3D Printed Low-Poly Faceted Succulent Planter",
        "slug": "3d-printed-low-poly-faceted-succulent-planter",
        "description": "Modern angular low-poly geometric mini plant pot 3D printed in matte off-white PLA with drainage tray.",
        "price": 399,
        "originalPrice": 599,
        "rating": 4.8,
        "reviews": 46,
        "stock": 35
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 12.20.42 PM.jpeg",
        "name": "3D Printed Batwing Desktop Headphone Stand",
        "slug": "3d-printed-batwing-desktop-headphone-stand",
        "description": "Gotham-inspired batwing silhouette gaming headset stand 3D printed in stealth matte black with wide weighted base.",
        "price": 799,
        "originalPrice": 1199,
        "rating": 5.0,
        "reviews": 67,
        "stock": 22
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 12.20.43 PM.jpeg",
        "name": "3D Printed Profile Face Eyeglass Stand",
        "slug": "3d-printed-profile-face-eyeglass-stand",
        "description": "Abstract artistic side-profile face sculpture spectacle and sunglasses holder 3D printed in matte charcoal.",
        "price": 499,
        "originalPrice": 749,
        "rating": 4.9,
        "reviews": 48,
        "stock": 30
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 12.20.44 PM.jpeg",
        "name": "3D Printed Dancing Cat Earbud and Pen Holder",
        "slug": "3d-printed-dancing-cat-earbud-pen-holder",
        "description": "Viral dancing black cat desktop figurine with raised paws designed to hold AirPods, pencils, and stylus pens.",
        "price": 349,
        "originalPrice": 499,
        "rating": 5.0,
        "reviews": 94,
        "stock": 45
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 12.20.45 PM.jpeg",
        "name": "3D Printed Mini Octopus Toothpick Holder Pair",
        "slug": "3d-printed-mini-octopus-toothpick-holder-pair",
        "description": "Pair of cute 3D printed desktop octopus organizers in ocean teal and lavender purple for toothpicks and Q-tips.",
        "price": 399,
        "originalPrice": 599,
        "rating": 4.9,
        "reviews": 51,
        "stock": 35
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 12.20.46 PM.jpeg",
        "name": "3D Printed Hedgehog Pencil Caddy Desk Organizer",
        "slug": "3d-printed-hedgehog-pencil-caddy-desk-organizer",
        "description": "Charming hedgehog desk caddy with 24 individual quill slots to hold and organize colored pencils, pens, and brushes.",
        "price": 549,
        "originalPrice": 799,
        "rating": 5.0,
        "reviews": 63,
        "stock": 25
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 12.20.47 PM.jpeg",
        "name": "3D Printed Cute Animal Miniature Phone Stand Pair",
        "slug": "3d-printed-cute-animal-miniature-phone-stand-pair",
        "description": "Pair of pastel pink and chartreuse 4-legged pet smartphone stands with bow accessories for desktop media viewing.",
        "price": 399,
        "originalPrice": 599,
        "rating": 4.8,
        "reviews": 38,
        "stock": 40
    },
    {
        "file": "WhatsApp Image 206-08-24 at 12.20.44 PM.jpeg",
        "name": "3D Printed Cartoon Eyeglass Rest Desk Tray",
        "slug": "3d-printed-cartoon-eyeglass-rest-desk-tray",
        "description": "Whimsical yellow cartoon face bedside tray featuring large embossed goggle eyes to safely rest prescription glasses.",
        "price": 449,
        "originalPrice": 649,
        "rating": 4.9,
        "reviews": 41,
        "stock": 28
    },
    {
        "file": "WhatsApp Image2026-08-24 at 12.20.40 PM.jpeg",
        "name": "3D Printed Climbing Figure Smartphone Stand Trio",
        "slug": "3d-printed-climbing-figure-smartphone-stand-trio",
        "description": "Set of 3 human stick-figure climbers in crimson, azure, and orange that prop up smartphones in portrait or landscape.",
        "price": 499,
        "originalPrice": 749,
        "rating": 4.9,
        "reviews": 57,
        "stock": 32
    },
    {
        "file": "WhatsApp mage 2026-08-24 at 12.20.43 PM.jpeg",
        "name": "3D Printed Ghost Desktop Pen Rest",
        "slug": "3d-printed-ghost-desktop-pen-rest",
        "description": "Spooky-cute floating ghost figurine desk accessory with horizontal arm notches to cradle fountain pens and styluses.",
        "price": 299,
        "originalPrice": 449,
        "rating": 5.0,
        "reviews": 73,
        "stock": 50
    },
    {
        "file": "WhatsApp mage 2026-08-24 at 12.20.45 PM.jpeg",
        "name": "3D Printed Infinity Loop Stationery Organizer",
        "slug": "3d-printed-infinity-loop-stationery-organizer",
        "description": "Sleek infinity loop desktop organizer 3D printed in matte jet-black PLA with dual caddy wells for scissors and pens.",
        "price": 499,
        "originalPrice": 699,
        "rating": 4.8,
        "reviews": 35,
        "stock": 30
    },
    {
        "file": "WhatsAppImage 2026-08-24 at 12.20.46 PM.jpeg",
        "name": "3D Printed Avengers Emblem Desk Pen Caddy",
        "slug": "3d-printed-avengers-emblem-desk-pen-caddy",
        "description": "Superhero Marvel Avengers 'A' logo desk stationery holder 3D printed in bold dual-tone charcoal and white PLA.",
        "price": 549,
        "originalPrice": 799,
        "rating": 5.0,
        "reviews": 89,
        "stock": 26
    },
    {
        "file": "WhtsApp Image 2026-08-24 at 12.20.32 PM.jpeg",
        "name": "3D Printed Rounded Modular Wall Terrarium Planters",
        "slug": "3d-printed-rounded-modular-wall-terrarium-planters",
        "description": "Set of rounded squircle modern wall planters in terracotta, forest green, and slate grey for indoor air plants.",
        "price": 649,
        "originalPrice": 899,
        "rating": 4.8,
        "reviews": 32,
        "stock": 25
    },
    {
        "file": "d788f64d-c60c-41f4-8449-8bf0ec89f716.webp",
        "name": "3D Printed Fluted Spiral Flower Vase Pair",
        "slug": "3d-printed-fluted-spiral-flower-vase-pair",
        "description": "Pair of delicate fluted spiral ceramic-look vases 3D printed in silky pearlescent rose pink PLA for fresh or dried floral stems.",
        "price": 699,
        "originalPrice": 999,
        "rating": 5.0,
        "reviews": 61,
        "stock": 20
    },
    {
        "file": "hatsApp Image 2026-08-24 at 12.20.31 PM.jpeg",
        "name": "3D Printed Sci-Fi Reactor Core Art Model",
        "slug": "3d-printed-sci-fi-reactor-core-art-model",
        "description": "Complex multi-layer futuristic plasma reactor sphere demonstration model 3D printed with glowing cyan LED illumination.",
        "price": 1299,
        "originalPrice": 1899,
        "rating": 5.0,
        "reviews": 24,
        "stock": 10
    },
    {
        "file": "pm.jpeg",
        "name": "3D Printed Bold Custom Name Keychain",
        "slug": "3d-printed-bold-custom-name-keychain",
        "description": "Heavy-duty 3D printed 3D embossed custom nameplate keychain in stark white PLA with steel keyring hole.",
        "price": 199,
        "originalPrice": 299,
        "rating": 4.8,
        "reviews": 40,
        "stock": 60
    }
]

print("=" * 100)
print("PROCESSING AND MIGRATING ALL 31 ONEDRIVE 3D PRINTING IMAGES TO public/products/v5/")
print("=" * 100)

audit_table = []

for idx, p in enumerate(ONEDRIVE_PRODUCTS):
    src_file = os.path.join(src_folder, p["file"])
    dest_file = os.path.join(dest_folder, f"{p['slug']}.jpg")
    
    if not os.path.exists(src_file):
        print(f"[ERROR] Missing source file: {src_file}")
        continue
        
    with Image.open(src_file) as img:
        img = img.convert("RGB")
        w, h = img.size
        
        # Center square crop with minimal padding to preserve product
        max_side = max(w, h)
        square_img = Image.new("RGB", (max_side, max_side), (255, 255, 255))
        ox = (max_side - w) // 2
        oy = (max_side - h) // 2
        square_img.paste(img, (ox, oy))
        
        # Resize to 1024x1024 HD
        final_img = square_img.resize((1024, 1024), Image.Resampling.LANCZOS)
        
        # Slight vibrancy and sharpness enhancement
        enh_col = ImageEnhance.Color(final_img)
        final_img = enh_col.enhance(1.08)
        enh_sha = ImageEnhance.Sharpness(final_img)
        final_img = enh_sha.enhance(1.12)
        
        final_img.save(dest_file, "JPEG", quality=95)
        
    with open(dest_file, "rb") as fp:
        file_sha = hashlib.sha256(fp.read()).hexdigest()
        
    audit_table.append({
        "id": f"3dp-{idx+1:03d}",
        "filename": p["file"],
        "title": p["name"],
        "slug": p["slug"],
        "image": f"/products/v5/{p['slug']}.jpg",
        "description": p["description"],
        "price": p["price"],
        "originalPrice": p["originalPrice"],
        "rating": p["rating"],
        "reviews": p["reviews"],
        "stock": p["stock"],
        "sha256": file_sha,
        "size": os.path.getsize(dest_file)
    })
    
    print(f"[{idx+1:02d}/31] {p['name']:<50} -> {p['slug']}.jpg ({os.path.getsize(dest_file)} B)")

with open(r"scratch\onedrive_3d_products_data.json", "w", encoding="utf-8") as f:
    json.dump(audit_table, f, indent=2)

print("=" * 100)
print(f"Successfully processed and migrated {len(audit_table)} authentic 3D printing products.")
