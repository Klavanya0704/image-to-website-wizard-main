import os
import shutil

public_dir = r"c:\Users\Lavanya\Downloads\image-to-website-wizard-main\image-to-website-wizard-main\public\products"
assets_dir = r"c:\Users\Lavanya\Downloads\image-to-website-wizard-main\image-to-website-wizard-main\src\assets"

# Explicit product slug -> source image mapping
copy_specs = {
    # 1. 3D Printing
    "3d-printed-geometric-vase.jpg": os.path.join(public_dir, "3d-vase.jpg"),
    "geometric-spiral-vase.jpg": os.path.join(public_dir, "3d-vase.jpg"),
    "universal-foldable-phone-stand-3d.jpg": os.path.join(public_dir, "phone-stand.jpg"),
    "adjustable-phone-stand.jpg": os.path.join(public_dir, "phone-stand.jpg"),
    "mini-desk-organizer.jpg": os.path.join(public_dir, "desk-organizer.jpg"),
    "cable-management-clip-set.jpg": os.path.join(public_dir, "cable-clips.jpg"),
    "resin-architectural-model.jpg": os.path.join(public_dir, "architectural-model.jpg"),
    "planter-pot-hex.jpg": os.path.join(public_dir, "hex-planter.jpg"),
    "mechanical-prototype-model.jpg": os.path.join(public_dir, "cnc-coupling.jpg"),

    # 2. Laser Cutting
    "custom-name-keychain.jpg": os.path.join(assets_dir, "p-keychain.jpg"),
    "custom-engraved-wooden-keychain.jpg": os.path.join(assets_dir, "p-keychain.jpg"),
    "tree-of-life-lamp.jpg": os.path.join(assets_dir, "p-lamp.jpg"),
    "tree-of-life-led-lamp.jpg": os.path.join(assets_dir, "p-lamp.jpg"),
    "custom-acrylic-led-illuminated-sign.jpg": os.path.join(public_dir, "acrylic-sign.jpg"),
    "laser-cut-desk-organizer.jpg": os.path.join(assets_dir, "p-organizer.jpg"),
    "college-logo-board.jpg": os.path.join(assets_dir, "p-stand.jpg"),
    "wooden-wall-art-mandala.jpg": os.path.join(public_dir, "mandala-coasters.jpg"),
    "mandala-laser-cut-wooden-coasters.jpg": os.path.join(public_dir, "mandala-coasters.jpg"),
    "laser-engraved-photo-frame.jpg": os.path.join(assets_dir, "p-acrylic.jpg"),
    "mdf-structural-architectural-puzzle-kit.jpg": os.path.join(public_dir, "mdf-kit.jpg"),

    # 3. CNC Machining
    "precision-aluminum-shaft-coupler.jpg": os.path.join(public_dir, "cnc-coupling.jpg"),
    "heavy-duty-l-bracket-cnc.jpg": os.path.join(public_dir, "cnc-bracket.jpg"),
    "cnc-aluminium-bracket.jpg": os.path.join(public_dir, "cnc-bracket.jpg"),
    "precision-mounting-plate.jpg": os.path.join(public_dir, "cnc-bracket.jpg"),
    "custom-cnc-component.jpg": os.path.join(assets_dir, "p-cnc.jpg"),
    "aluminium-prototype-block.jpg": os.path.join(assets_dir, "p-cnc.jpg"),
    "cnc-machined-flanged-brass-bushings.jpg": os.path.join(public_dir, "cnc-bushings.jpg"),

    # 4. Electronics
    "esp32-iot-maker-board.jpg": os.path.join(public_dir, "esp32-board.jpg"),
    "esp32-development-board.jpg": os.path.join(public_dir, "esp32-board.jpg"),
    "37-in-1-iot-sensor-module-kit.jpg": os.path.join(public_dir, "sensor-kit.jpg"),
    "arduino-sensor-kit.jpg": os.path.join(public_dir, "sensor-kit.jpg"),
    "iot-starter-kit.jpg": os.path.join(public_dir, "sensor-kit.jpg"),
    "led-electronics-kit.jpg": os.path.join(public_dir, "prototype-pcb.jpg"),
    "soldering-practice-board.jpg": os.path.join(assets_dir, "p-board.jpg"),
    "fr4-double-sided-prototype-pcb-10pack.jpg": os.path.join(public_dir, "prototype-pcb.jpg"),
    "mini-robotics-kit.jpg": os.path.join(public_dir, "robotics-kit.jpg"),

    # 5. Drones & Parts
    "fpv-drone-carbon-fiber-frame.jpg": os.path.join(public_dir, "drone-frame.jpg"),
    "drone-frame-kit.jpg": os.path.join(public_dir, "drone-frame.jpg"),
    "fpv-prototype-frame.jpg": os.path.join(public_dir, "drone-frame.jpg"),
    "brushless-motor-mount.jpg": os.path.join(public_dir, "drone-motor.jpg"),
    "brushless-drone-motor-2207-2450kv.jpg": os.path.join(public_dir, "drone-motor.jpg"),
    "propeller-set-1045.jpg": os.path.join(public_dir, "drone-propellers.jpg"),
    "5-inch-tri-blade-fpv-propellers.jpg": os.path.join(public_dir, "drone-propellers.jpg"),
    "drone-landing-gear.jpg": os.path.join(public_dir, "drone-frame.jpg"),

    # 6. Acrylic Products
    "clear-cast-acrylic-display-box.jpg": os.path.join(public_dir, "acrylic-box.jpg"),
    "custom-acrylic-trophy-plaque.jpg": os.path.join(public_dir, "acrylic-trophy.jpg"),
    "transparent-protective-acrylic-shield.jpg": os.path.join(public_dir, "acrylic-shield.jpg"),
    "acrylic-name-plate.jpg": os.path.join(assets_dir, "p-acrylic.jpg"),
    "acrylic-keychain.jpg": os.path.join(assets_dir, "p-keychain.jpg"),
    "acrylic-desk-sign.jpg": os.path.join(public_dir, "acrylic-sign.jpg"),
    "transparent-display-stand.jpg": os.path.join(public_dir, "acrylic-trophy.jpg"),
    "college-logo-acrylic-board.jpg": os.path.join(assets_dir, "p-stand.jpg"),

    # 7. DIY Kits
    "starter-maker-diy-electronics-kit.jpg": os.path.join(public_dir, "robotics-kit.jpg"),
    "smart-home-diy-kit.jpg": os.path.join(assets_dir, "p-kit.jpg"),
    "mini-robot-kit.jpg": os.path.join(public_dir, "robotics-kit.jpg"),
    "electronics-learning-kit.jpg": os.path.join(public_dir, "sensor-kit.jpg"),
    "arduino-project-kit.jpg": os.path.join(public_dir, "esp32-board.jpg"),
    "drone-building-diy-kit.jpg": os.path.join(public_dir, "drone-frame.jpg"),
    "diy-soldering-practice-electronics-kit.jpg": os.path.join(public_dir, "soldering-kit.jpg"),
    "diy-bluetooth-speaker-assembly-kit.jpg": os.path.join(public_dir, "bluetooth-speaker-kit.jpg")
}

for dest_name, src_path in copy_specs.items():
    if os.path.exists(src_path):
        target = os.path.join(public_dir, dest_name)
        shutil.copy2(src_path, target)
        print(f"Copied -> {dest_name}")
    else:
        print(f"Source not found: {src_path}")

print("\nAll dedicated slug-matched image files created.")
