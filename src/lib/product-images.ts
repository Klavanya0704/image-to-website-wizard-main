// Clean 1-to-1 Product Image Resolution
export const EXACT_SLUG_IMAGE_MAP: Record<string, string> = {
  "3d-printed-geometric-spiral-vase": "/products/3d-printed-geometric-spiral-vase.jpg",
  "foldable-desktop-phone-tablet-stand": "/products/foldable-desktop-phone-tablet-stand.jpg",
  "modular-desktop-stationery-organizer": "/products/modular-desktop-stationery-organizer.jpg",
  "interlocking-cable-management-clip-pack": "/products/interlocking-cable-management-clip-pack.jpg",
  "precision-resin-architectural-tower-model": "/products/precision-resin-architectural-tower-model.jpg",
  "hexagonal-geometric-succulent-planter-pot": "/products/hexagonal-geometric-succulent-planter-pot.jpg",
  "custom-laser-engraved-wooden-keychain": "/products/custom-laser-engraved-wooden-keychain.jpg",
  "laser-cut-tree-of-life-wooden-led-lamp": "/products/laser-cut-tree-of-life-wooden-led-lamp.jpg",
  "slot-together-plywood-desktop-organizer": "/products/slot-together-plywood-desktop-organizer.jpg",
  "multi-layered-wooden-mandala-wall-art": "/products/multi-layered-wooden-mandala-wall-art.jpg",
  "laser-engraved-hardwood-photo-frame": "/products/laser-engraved-hardwood-photo-frame.jpg",
  "edge-lit-laser-cut-acrylic-led-sign": "/products/edge-lit-laser-cut-acrylic-led-sign.jpg",
  "cnc-v-carved-solid-walnut-name-plate": "/products/cnc-v-carved-solid-walnut-name-plate.jpg",
  "cnc-relief-carved-wooden-decorative-panel": "/products/cnc-relief-carved-wooden-decorative-panel.jpg",
  "cnc-milled-hardwood-keepsake-box": "/products/cnc-milled-hardwood-keepsake-box.jpg",
  "cnc-machined-6061-aluminium-l-bracket": "/products/cnc-machined-6061-aluminium-l-bracket.jpg",
  "cnc-precision-aluminium-fixture-plate": "/products/cnc-precision-aluminium-fixture-plate.jpg",
  "cnc-machined-high-precision-spur-gear": "/products/cnc-machined-high-precision-spur-gear.jpg",
  "esp32-dual-core-iot-development-board": "/products/esp32-dual-core-iot-development-board.jpg",
  "37-piece-iot-sensor-module-starter-kit": "/products/37-piece-iot-sensor-module-starter-kit.jpg",
  "double-sided-fr4-prototype-pcb-pack": "/products/double-sided-fr4-prototype-pcb-pack.jpg",
  "arduino-compatible-atmega328p-microcontroller": "/products/arduino-compatible-atmega328p-microcontroller.jpg",
  "i2c-096-inch-oled-display-module": "/products/i2c-096-inch-oled-display-module.jpg",
  "5-inch-fpv-racing-3k-carbon-fiber-drone-frame": "/products/5-inch-fpv-racing-3k-carbon-fiber-drone-frame.jpg",
  "2207-2450kv-high-power-brushless-drone-motor": "/products/2207-2450kv-high-power-brushless-drone-motor.jpg",
  "5-inch-tri-blade-fpv-drone-propellers-pack": "/products/5-inch-tri-blade-fpv-drone-propellers-pack.jpg",
  "30a-4-in-1-blheli-s-electronic-speed-controller": "/products/30a-4-in-1-blheli-s-electronic-speed-controller.jpg",
  "omnidirectional-58ghz-fpv-cloverleaf-antenna": "/products/omnidirectional-58ghz-fpv-cloverleaf-antenna.jpg",
  "crystal-clear-cast-acrylic-showcase-cube-box": "/products/crystal-clear-cast-acrylic-showcase-cube-box.jpg",
  "laser-engraved-beveled-acrylic-award-trophy": "/products/laser-engraved-beveled-acrylic-award-trophy.jpg",
  "high-clarity-heavy-duty-acrylic-sneeze-shield": "/products/high-clarity-heavy-duty-acrylic-sneeze-shield.jpg",
  "desktop-acrylic-slanted-brochure-menu-holder": "/products/desktop-acrylic-slanted-brochure-menu-holder.jpg",
  "multi-tiered-clear-acrylic-cosmetic-display-riser": "/products/multi-tiered-clear-acrylic-cosmetic-display-riser.jpg",
  "autonomous-4wd-smart-robotic-stem-starter-kit": "/products/autonomous-4wd-smart-robotic-stem-starter-kit.jpg",
  "educational-electronics-soldering-practice-kit": "/products/educational-electronics-soldering-practice-kit.jpg",
  "diy-portable-bluetooth-stereo-speaker-maker-kit": "/products/diy-portable-bluetooth-stereo-speaker-maker-kit.jpg",
  "miniature-solar-powered-stem-rover-buggy-kit": "/products/miniature-solar-powered-stem-rover-buggy-kit.jpg",
  "smart-weather-station-iot-esp8266-maker-kit": "/products/smart-weather-station-iot-esp8266-maker-kit.jpg",
};

export function productImage(imageKey: string | undefined | null, name?: string | null): string {
  if (!imageKey) return "/products/3d-printed-geometric-spiral-vase.jpg";
  if (imageKey.startsWith("http://") || imageKey.startsWith("https://") || imageKey.startsWith("/products/")) {
    return imageKey;
  }
  if (EXACT_SLUG_IMAGE_MAP[imageKey]) {
    return EXACT_SLUG_IMAGE_MAP[imageKey];
  }
  return `/products/${imageKey}.jpg`;
}

export interface ProductViewAngle {
  id: string;
  label: string;
  badgeTitle: string;
  angle: string;
  src: string;
  stageStyle: string;
  thumbStyle: string;
  viewType: "front" | "isometric" | "closeup" | "cad";
}

export function productViewsFor(
  keyOrSlug: string | null | undefined,
  name?: string | null,
): ProductViewAngle[] {
  const main = productImage(keyOrSlug, name);
  return [
    {
      id: "view-front",
      label: "Front View",
      badgeTitle: "STUDIO FRONT VIEW",
      angle: "0° Elevation",
      src: main,
      stageStyle: "scale-100 rotate-0 brightness-100 contrast-100",
      thumbStyle: "scale-100 rotate-0",
      viewType: "front",
    },
    {
      id: "view-iso",
      label: "3D Isometric",
      badgeTitle: "3D ISOMETRIC PROFILE",
      angle: "45° Oblique Angle",
      src: main,
      stageStyle: "scale-105 -rotate-2 drop-shadow-md",
      thumbStyle: "scale-105 -rotate-2",
      viewType: "isometric",
    },
    {
      id: "view-detail",
      label: "Macro Detail",
      badgeTitle: "ZOOMED DETAIL VIEW",
      angle: "Material Texture",
      src: main,
      stageStyle: "scale-125 origin-center contrast-105 saturate-110",
      thumbStyle: "scale-125 origin-center",
      viewType: "closeup",
    },
    {
      id: "view-cad",
      label: "Technical CAD",
      badgeTitle: "CAD BLUEPRINT & SPECS",
      angle: "Dimension Tolerances",
      src: main,
      stageStyle: "",
      thumbStyle: "brightness-95 contrast-110",
      viewType: "cad",
    },
  ];
}

export function galleryFor(keyOrSlug: string | null | undefined, name?: string | null): string[] {
  const main = productImage(keyOrSlug, name);
  return [main, main, main, main];
}
