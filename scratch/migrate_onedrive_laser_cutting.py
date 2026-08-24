import os
import json
import hashlib
from PIL import Image, ImageEnhance

src_folder = r"C:\Users\Lavanya\OneDrive\Pictures\laser cutting"
dest_folder = r"public\products\v5"
os.makedirs(dest_folder, exist_ok=True)

# 23 1-to-1 Mapped Laser Cutting Products
LASER_PRODUCTS = [
    {
        "file": "WhatsApp Imag 2026-08-24 at 3.16.25 PM.jpeg",
        "name": "Laser Cut Plywood QR Code Feedback Stand",
        "slug": "laser-cut-plywood-qr-code-feedback-stand",
        "description": "Countertop customer feedback and social review easel stand laser cut from premium birch plywood with precision engraved QR code.",
        "price": 499,
        "originalPrice": 749,
        "rating": 4.9,
        "reviews": 43,
        "stock": 35
    },
    {
        "file": "WhatsApp Image 026-08-24 at 3.16.25 PM.jpeg",
        "name": "Laser Cut Geometric Wooden Desk Pen Organizer Trio",
        "slug": "laser-cut-geometric-wooden-desk-pen-organizer-trio",
        "description": "Set of 3 cylindrical desk stationery and brush holders featuring intricate laser-cut lattice and sacred geometry woodwork.",
        "price": 699,
        "originalPrice": 999,
        "rating": 5.0,
        "reviews": 56,
        "stock": 25
    },
    {
        "file": "WhatsApp Image 2026-08-01 at 10.28.30 AM.jpeg",
        "name": "Laser Engraved Acrylic AICTE IDEA Lab Emblem Plaque",
        "slug": "laser-engraved-acrylic-aicte-idea-lab-emblem-plaque",
        "description": "Official institutional commemorative display plaque laser engraved on 8mm optical cast acrylic with the AICTE IDEA Lab gears and lightbulb crest.",
        "price": 799,
        "originalPrice": 1199,
        "rating": 5.0,
        "reviews": 68,
        "stock": 20
    },
    {
        "file": "WhatsApp Image 2026-08-01 at 10.28.30 pM.jpeg",
        "name": "Laser Engraved Acrylic Institutional Desk Nameplate",
        "slug": "laser-engraved-acrylic-institutional-desk-nameplate",
        "description": "Executive desk name plaque laser engraved on high-clarity cast acrylic with institutional typography and beveled polished edges.",
        "price": 599,
        "originalPrice": 899,
        "rating": 4.8,
        "reviews": 34,
        "stock": 30
    },
    {
        "file": "WhatsApp Image 2026-08-01 at 10.28.31 AM.jpeg",
        "name": "Laser Engraved Hardwood Desk Block Plaque",
        "slug": "laser-engraved-hardwood-desk-block-plaque",
        "description": "Solid natural teakwood desk bar plaque featuring deep CO2 laser-etched institutional branding and satin protective oil finish.",
        "price": 499,
        "originalPrice": 699,
        "rating": 4.9,
        "reviews": 41,
        "stock": 40
    },
    {
        "file": "WhatsApp Image 2026-08-01 at 10.28.31 pM.jpeg",
        "name": "Laser Engraved Oval Hardwood Name Keychain",
        "slug": "laser-engraved-oval-hardwood-name-keychain",
        "description": "Custom personalized oval keychain laser cut and engraved from rich cherry wood with high-contrast burnt edge finish.",
        "price": 199,
        "originalPrice": 299,
        "rating": 4.8,
        "reviews": 52,
        "stock": 80
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 3.16.21 PM.jpeg",
        "name": "Laser Cut Supercar Silhouette Wooden Wall Art",
        "slug": "laser-cut-supercar-silhouette-wooden-wall-art",
        "description": "Dramatic large-format supercar side-profile wall art laser cut from 6mm matte black engineered MDF for modern automotive interiors.",
        "price": 1299,
        "originalPrice": 1899,
        "rating": 5.0,
        "reviews": 77,
        "stock": 15
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 3.16.22 PM.jpeg",
        "name": "Laser Cut Layered Wooden Llama Desk Companion",
        "slug": "laser-cut-layered-wooden-llama-desk-companion",
        "description": "Multi-layered 3D wooden desk organizer sculpture shaped like a charming cartoon llama with integrated eyeglasses cradle.",
        "price": 549,
        "originalPrice": 799,
        "rating": 4.9,
        "reviews": 48,
        "stock": 25
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 3.16.23 PM.jpeg",
        "name": "Laser Cut Wooden Wildflower Desk Centerpiece",
        "slug": "laser-cut-wooden-wildflower-desk-centerpiece",
        "description": "Delicate laser-cut wooden botanical wildflower stem arrangement slotted into a solid walnut 'Home Sweet Home' display block.",
        "price": 649,
        "originalPrice": 899,
        "rating": 5.0,
        "reviews": 61,
        "stock": 28
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 3.16.24 PM.jpeg",
        "name": "Laser Cut Wooden Bookmark Paperclip Set",
        "slug": "laser-cut-wooden-bookmark-paperclip-set",
        "description": "Set of 4 laser-cut natural birch wood giant paperclip bookmarks engraved with daisy, honeybee, rainbow, and flower motifs.",
        "price": 299,
        "originalPrice": 449,
        "rating": 4.9,
        "reviews": 85,
        "stock": 60
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 3.16.25 PM.jpeg",
        "name": "Laser Cut Coffee and Book Stack Wooden Keychain",
        "slug": "laser-cut-coffee-and-book-stack-wooden-keychain",
        "description": "Cozy layered laser-cut wooden keychain featuring a steaming coffee cup atop a classic literature stack with metal lobster clasp.",
        "price": 199,
        "originalPrice": 299,
        "rating": 4.8,
        "reviews": 92,
        "stock": 75
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 3.16.26 PM.jpeg",
        "name": "Laser Cut Acrylic Monstera Leaf LED Night Lamp",
        "slug": "laser-cut-acrylic-monstera-leaf-led-night-lamp",
        "description": "Botanical edge-lit tropical monstera leaf night lamp laser cut from 4mm cast acrylic resting on a solid beechwood warm-white LED base.",
        "price": 849,
        "originalPrice": 1249,
        "rating": 5.0,
        "reviews": 70,
        "stock": 22
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 3.16.27 PM.jpeg",
        "name": "Laser Engraved Acrylic Starlight Tree Column Lamp",
        "slug": "laser-engraved-acrylic-starlight-tree-column-lamp",
        "description": "Vertical monolith table lamp laser engraved with an intricate starlight winter tree on optical acrylic with solid wooden base.",
        "price": 999,
        "originalPrice": 1499,
        "rating": 5.0,
        "reviews": 39,
        "stock": 18
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 3.16.38 PM.jpeg",
        "name": "Laser Cut Arched Boho Botanical Wooden Wall Art Trio",
        "slug": "laser-cut-arched-boho-botanical-wooden-wall-art-trio",
        "description": "Triptych of 3 arched bohemian wall decor panels laser cut from matte black hardwood depicting celestial moon, sun, and botanical fronds.",
        "price": 1499,
        "originalPrice": 2199,
        "rating": 5.0,
        "reviews": 64,
        "stock": 15
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 3.17.10 PM.jpeg",
        "name": "Laser Engraved House-Shaped Wooden Welcome Keychain Pack",
        "slug": "laser-engraved-house-shaped-wooden-welcome-keychain-pack",
        "description": "Pack of personalized house-silhouette wooden keychains laser engraved with 'Welcome Home' and custom contact details.",
        "price": 399,
        "originalPrice": 599,
        "rating": 4.9,
        "reviews": 53,
        "stock": 50
    },
    {
        "file": "WhatsApp Image 2026-08-24 at 3.17.21 PM.jpeg",
        "name": "Laser Cut Wooden Pocket Multi-Tool Ruler Keychain",
        "slug": "laser-cut-wooden-pocket-multi-tool-ruler-keychain",
        "description": "Engineered pocket keychain multi-tool laser engraved with precise metric & imperial rulers, bolt gauge holes, and angle templates.",
        "price": 249,
        "originalPrice": 399,
        "rating": 4.8,
        "reviews": 46,
        "stock": 65
    },
    {
        "file": "WhatsApp Image 226-08-24 at 3.16.22 PM.jpeg",
        "name": "Laser Cut Layered Wooden Cover Spiral Journal",
        "slug": "laser-cut-layered-wooden-cover-spiral-journal",
        "description": "Hardcover spiral notebook with laser-cut geometric mandala and succulent wood veneer relief overlays and recycled parchment.",
        "price": 549,
        "originalPrice": 799,
        "rating": 5.0,
        "reviews": 58,
        "stock": 35
    },
    {
        "file": "WhatsApp Image 226-08-24 at 3.16.27 PM.jpeg",
        "name": "Laser Cut Precision Acrylic Chess Set and Board",
        "slug": "laser-cut-precision-acrylic-chess-set-and-board",
        "description": "Deluxe chess set featuring laser-cut clear and frosted acrylic chessmen with interlocking laser-etched chessboard base.",
        "price": 1699,
        "originalPrice": 2499,
        "rating": 5.0,
        "reviews": 31,
        "stock": 12
    },
    {
        "file": "WhatsApp Image2026-08-24 at 3.16.21 PM.jpeg",
        "name": "Laser Cut Layered Mandala Wooden Napkin Holder Set",
        "slug": "laser-cut-layered-mandala-wooden-napkin-holder-set",
        "description": "Set of 4 dining table napkin holders laser cut from multi-ply birch with intricate lotus, peacock, and floral mandala reliefs.",
        "price": 749,
        "originalPrice": 1099,
        "rating": 4.9,
        "reviews": 49,
        "stock": 25
    },
    {
        "file": "WhatsApp Image2026-08-24 at 3.16.24 PM.jpeg",
        "name": "Laser Cut Monstera Plant Layered Wooden Desk Sculpture",
        "slug": "laser-cut-monstera-plant-layered-wooden-desk-sculpture",
        "description": "Freestanding layered wooden tropical monstera plant puzzle sculpture laser cut from walnut and maple plywood with slotted pot.",
        "price": 649,
        "originalPrice": 949,
        "rating": 5.0,
        "reviews": 57,
        "stock": 20
    },
    {
        "file": "WhatsApp Image2026-08-24 at 3.16.26 PM.jpeg",
        "name": "Laser Engraved Clear Acrylic Floral Medallion Keychain",
        "slug": "laser-engraved-clear-acrylic-floral-medallion-keychain",
        "description": "Round optical acrylic medallion keychain laser cut and engraved with delicate floral garland lace and custom script typography.",
        "price": 199,
        "originalPrice": 299,
        "rating": 4.8,
        "reviews": 42,
        "stock": 70
    },
    {
        "file": "WhatsApp mage 2026-08-24 at 3.16.22 PM.jpeg",
        "name": "Laser Cut Layered Butterfly Hardwood Cover Notebook",
        "slug": "laser-cut-layered-butterfly-hardwood-cover-notebook",
        "description": "Artisan spiral journal with dual-layer laser-cut wooden cover featuring electric blue wing inlay and walnut wing filigree.",
        "price": 599,
        "originalPrice": 849,
        "rating": 5.0,
        "reviews": 66,
        "stock": 30
    },
    {
        "file": "WhatsApp mage 2026-08-24 at 3.16.26 PM.jpeg",
        "name": "Laser Engraved Personalized Wildflower Acrylic Night Light",
        "slug": "laser-engraved-personalized-wildflower-acrylic-night-light",
        "description": "Custom named circular acrylic bedside LED lamp laser engraved with butterflies, wildflowers, and ambient wooden halo base.",
        "price": 899,
        "originalPrice": 1299,
        "rating": 5.0,
        "reviews": 84,
        "stock": 25
    }
]

print("=" * 100)
print("PROCESSING AND MIGRATING ALL 23 ONEDRIVE LASER CUTTING IMAGES TO public/products/v5/")
print("=" * 100)

laser_audit_table = []

for idx, p in enumerate(LASER_PRODUCTS):
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
        
    laser_audit_table.append({
        "id": f"lc-{idx+1:03d}",
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
    
    print(f"[{idx+1:02d}/23] {p['name']:<55} -> {p['slug']}.jpg ({os.path.getsize(dest_file)} B)")

with open(r"scratch\onedrive_laser_products_data.json", "w", encoding="utf-8") as f:
    json.dump(laser_audit_table, f, indent=2)

print("=" * 100)
print(f"Successfully processed and migrated {len(laser_audit_table)} authentic Laser Cutting products.")
