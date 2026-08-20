import os

cnc_12 = [
    ("CNC Wooden Name Plate", "cnc-wooden-name-plate", "/products/cnc-wooden-name-plate.jpg"),
    ("CNC Wooden Mandala", "cnc-cut-wooden-mandala", "/products/cnc-cut-wooden-mandala.jpg"),
    ("CNC Wooden Box", "cnc-cut-wooden-box", "/products/cnc-cut-wooden-box.jpg"),
    ("CNC Wooden Wall Panel", "cnc-carved-wooden-wall-panel", "/products/cnc-carved-wooden-wall-panel.jpg"),
    ("CNC Wooden Relief", "cnc-wooden-relief-art", "/products/cnc-wooden-relief-art.jpg"),
    ("CNC Aluminium Bracket", "cnc-aluminium-bracket", "/products/cnc-aluminium-bracket.jpg"),
    ("CNC Aluminium Plate", "cnc-aluminum-fixture-plate", "/products/cnc-aluminum-fixture-plate.jpg"),
    ("CNC Machined Gear", "cnc-machined-gear", "/products/cnc-machined-gear.jpg"),
    ("CNC Machined Bushing", "cnc-machined-bushing", "/products/cnc-machined-bushing.jpg"),
    ("CNC Machined Coupling", "cnc-machined-coupling", "/products/cnc-machined-coupling.jpg"),
    ("CNC Machined Shaft", "cnc-machined-shaft", "/products/cnc-machined-shaft.jpg"),
    ("CNC Prototype Part", "cnc-machined-prototype-component", "/products/cnc-machined-prototype-component.jpg"),
]

seen_images = set()
seen_sizes = set()

print("=== CHECKING 12 CNC PRODUCTS & LOCAL IMAGES ===")
for name, slug, img in cnc_12:
    local_path = f"public{img}"
    exists = os.path.exists(local_path)
    size = os.path.getsize(local_path) if exists else 0
    is_dup_img = img in seen_images
    is_dup_size = size in seen_sizes
    seen_images.add(img)
    seen_sizes.add(size)
    print(f"[{slug}] '{name}' -> {img} | Exists: {exists} | Size: {size} bytes | Dup: {is_dup_img or is_dup_size}")

print(f"\nTotal: {len(cnc_12)}, Unique Images: {len(seen_images)}, Unique File Sizes: {len(seen_sizes)}")
