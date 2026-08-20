import re

# Let's inspect src/lib/product-images.ts and ensure EXACT_SLUG_IMAGE_MAP has all 27 slugs
slug_image_map = {
    # 3D Printing
    "geometric-spiral-vase": "/products/geometric-spiral-vase.jpg",
    "universal-foldable-phone-stand-3d": "/products/universal-foldable-phone-stand-3d.jpg",
    "mini-desk-organizer": "/products/mini-desk-organizer.jpg",
    "cable-management-clip-set": "/products/cable-management-clip-set.jpg",
    "planter-pot-hex": "/products/planter-pot-hex.jpg",
    
    # Laser Cutting
    "custom-name-keychain": "/products/custom-name-keychain.jpg",
    "tree-of-life-lamp": "/products/tree-of-life-lamp.jpg",
    "laser-cut-desk-organizer": "/products/laser-cut-desk-organizer.jpg",
    "wooden-wall-art-mandala": "/products/wooden-wall-art-mandala.jpg",
    "laser-engraved-photo-frame": "/products/laser-engraved-photo-frame.jpg",
    "custom-acrylic-led-sign": "/products/custom-acrylic-led-sign.jpg",
    "laser-engraved-glass-trophy": "/products/laser-engraved-glass-trophy.jpg",
    "frosted-glass-laser-engraving": "/products/frosted-glass-laser-engraving.jpg",
    "laser-cut-acrylic-name-plate": "/products/laser-cut-acrylic-name-plate.jpg",
    "acrylic-decorative-panel": "/products/acrylic-decorative-panel.jpg",

    # CNC Machining
    "cnc-wooden-name-plate": "/products/cnc-wooden-name-plate.jpg",
    "cnc-cut-wooden-mandala": "/products/cnc-cut-wooden-mandala.jpg",
    "cnc-cut-wooden-box": "/products/cnc-cut-wooden-box.jpg",
    "cnc-carved-wooden-wall-panel": "/products/cnc-carved-wooden-wall-panel.jpg",
    "cnc-aluminium-bracket": "/products/cnc-aluminium-bracket.jpg",
    "cnc-wooden-relief-art": "/products/cnc-wooden-relief-art.jpg",
    "cnc-aluminum-fixture-plate": "/products/cnc-aluminum-fixture-plate.jpg",
    "cnc-machined-gear": "/products/cnc-machined-gear.jpg",
    "cnc-machined-bushing": "/products/cnc-machined-bushing.jpg",
    "cnc-machined-coupling": "/products/cnc-machined-coupling.jpg",
    "cnc-machined-shaft": "/products/cnc-machined-shaft.jpg",
    "cnc-machined-prototype-component": "/products/cnc-machined-prototype-component.jpg",

    # Electronics
    "esp32-iot-maker-board": "/products/esp32-iot-maker-board.jpg",
    "37-in-1-iot-sensor-module-kit": "/products/37-in-1-iot-sensor-module-kit.jpg",
    "fr4-double-sided-prototype-pcb-10pack": "/products/fr4-double-sided-prototype-pcb-10pack.jpg",

    # Drones & Parts
    "fpv-drone-carbon-fiber-frame": "/products/fpv-drone-carbon-fiber-frame.jpg",
    "brushless-drone-motor-2207-2450kv": "/products/brushless-drone-motor-2207-2450kv.jpg",
    "5-inch-tri-blade-fpv-propellers": "/products/5-inch-tri-blade-fpv-propellers.jpg",

    # Acrylic Products
    "clear-cast-acrylic-display-box": "/products/clear-cast-acrylic-display-box.jpg",
    "custom-acrylic-trophy-plaque": "/products/custom-acrylic-trophy-plaque.jpg",
    "transparent-protective-acrylic-shield": "/products/transparent-protective-acrylic-shield.jpg",

    # DIY Kits
    "starter-maker-diy-electronics-kit": "/products/starter-maker-diy-electronics-kit.jpg",
    "diy-soldering-practice-electronics-kit": "/products/diy-soldering-practice-electronics-kit.jpg",
    "diy-bluetooth-speaker-assembly-kit": "/products/diy-bluetooth-speaker-assembly-kit.jpg"
}

print("All mapping keys count:", len(slug_image_map))
