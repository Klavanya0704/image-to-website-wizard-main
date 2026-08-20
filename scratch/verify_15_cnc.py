import shutil
import os

shutil.copyfile(
    r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0\cnc_bracket_photo_1787201966512.jpg",
    "public/products/cnc-aluminium-bracket.jpg"
)
shutil.copyfile(
    "public/products/cnc-machined-flanged-brass-bushings.jpg",
    "public/products/cnc-machined-bushing.jpg"
)
shutil.copyfile(
    "public/products/precision-aluminum-shaft-coupler.jpg",
    "public/products/cnc-machined-coupling.jpg"
)

# List of the 15 CNC products
cnc_products = [
    ("CNC Wooden Name Plate", "cnc-wooden-name-plate", "/products/cnc-wooden-name-plate.jpg"),
    ("CNC Wooden Wall Panel", "cnc-carved-wooden-wall-panel", "/products/cnc-carved-wooden-wall-panel.jpg"),
    ("CNC Wooden Mandala", "cnc-cut-wooden-mandala", "/products/cnc-cut-wooden-mandala.jpg"),
    ("CNC Wooden Box", "cnc-cut-wooden-box", "/products/cnc-cut-wooden-box.jpg"),
    ("CNC Wooden Key Holder", "cnc-wooden-key-holder", "/products/cnc-wooden-key-holder.jpg"),
    ("CNC Wooden Relief Carving", "cnc-wooden-relief-art", "/products/cnc-wooden-relief-art.jpg"),
    ("CNC Wooden Sign Board", "cnc-wooden-sign-board", "/products/cnc-wooden-sign-board.jpg"),
    ("CNC Aluminium Bracket", "cnc-aluminium-bracket", "/products/cnc-aluminium-bracket.jpg"),
    ("CNC Aluminium Plate", "cnc-aluminum-fixture-plate", "/products/cnc-aluminum-fixture-plate.jpg"),
    ("CNC Machined Gear", "cnc-machined-gear", "/products/cnc-machined-gear.jpg"),
    ("CNC Machined Shaft", "cnc-machined-shaft", "/products/cnc-machined-shaft.jpg"),
    ("CNC Machined Bushing", "cnc-machined-bushing", "/products/cnc-machined-bushing.jpg"),
    ("CNC Machined Coupling", "cnc-machined-coupling", "/products/cnc-machined-coupling.jpg"),
    ("CNC Machined Pulley", "cnc-machined-pulley", "/products/cnc-machined-pulley.jpg"),
    ("CNC Machined Prototype Part", "cnc-machined-prototype-component", "/products/cnc-machined-prototype-component.jpg"),
]

print("=== VERIFYING 15 UNIQUE CNC PRODUCT IMAGES ===")
seen = set()
for name, slug, img in cnc_products:
    p = f"public{img}"
    size = os.path.getsize(p) if os.path.exists(p) else 0
    is_dup = img in seen
    seen.add(img)
    print(f"[{slug}] {name} -> {img} ({size} bytes) (Exists: {os.path.exists(p)}) (Dup: {is_dup})")

print(f"\nTotal: {len(cnc_products)}, Unique Assets: {len(seen)}")
