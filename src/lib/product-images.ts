// Clean 1-to-1 Product Image Resolution
export const EXACT_SLUG_IMAGE_MAP: Record<string, string> = {
  "3d-printed-geometric-spiral-vase": "/products/v3/3d-printed-geometric-spiral-vase.jpg",
  "foldable-desktop-phone-tablet-stand": "/products/v3/foldable-desktop-phone-tablet-stand.jpg",
  "modular-desktop-stationery-organizer": "/products/v3/modular-desktop-stationery-organizer.jpg",
  "interlocking-cable-management-clip-pack": "/products/v3/interlocking-cable-management-clip-pack.jpg",
  "precision-resin-architectural-tower-model": "/products/v3/precision-resin-architectural-tower-model.jpg",
  "hexagonal-geometric-succulent-planter-pot": "/products/v3/hexagonal-geometric-succulent-planter-pot.jpg",
  "custom-laser-engraved-wooden-keychain": "/products/v3/custom-laser-engraved-wooden-keychain.jpg",
  "laser-cut-tree-of-life-wooden-led-lamp": "/products/v3/laser-cut-tree-of-life-wooden-led-lamp.jpg",
  "slot-together-plywood-desktop-organizer": "/products/v3/slot-together-plywood-desktop-organizer.jpg",
  "multi-layered-wooden-mandala-wall-art": "/products/v3/multi-layered-wooden-mandala-wall-art.jpg",
  "laser-engraved-hardwood-photo-frame": "/products/v3/laser-engraved-hardwood-photo-frame.jpg",
  "edge-lit-laser-cut-acrylic-led-sign": "/products/v3/edge-lit-laser-cut-acrylic-led-sign.jpg",
  "cnc-v-carved-solid-walnut-name-plate": "/products/v3/cnc-v-carved-solid-walnut-name-plate.jpg",
  "cnc-relief-carved-wooden-decorative-panel": "/products/v3/cnc-relief-carved-wooden-decorative-panel.jpg",
  "cnc-milled-hardwood-keepsake-box": "/products/v3/cnc-milled-hardwood-keepsake-box.jpg",
  "cnc-machined-6061-aluminium-l-bracket": "/products/v3/cnc-machined-6061-aluminium-l-bracket.jpg",
  "cnc-precision-aluminium-fixture-plate": "/products/v3/cnc-precision-aluminium-fixture-plate.jpg",
  "cnc-machined-high-precision-spur-gear": "/products/v3/cnc-machined-high-precision-spur-gear.jpg",
  "esp32-dual-core-iot-development-board": "/products/v3/esp32-dual-core-iot-development-board.jpg",
  "37-piece-iot-sensor-module-starter-kit": "/products/v3/37-piece-iot-sensor-module-starter-kit.jpg",
  "double-sided-fr4-prototype-pcb-pack": "/products/v3/double-sided-fr4-prototype-pcb-pack.jpg",
  "arduino-compatible-atmega328p-microcontroller": "/products/v3/arduino-compatible-atmega328p-microcontroller.jpg",
  "i2c-096-inch-oled-display-module": "/products/v3/i2c-096-inch-oled-display-module.jpg",
  "5-inch-fpv-racing-3k-carbon-fiber-drone-frame": "/products/v3/5-inch-fpv-racing-3k-carbon-fiber-drone-frame.jpg",
  "2207-2450kv-high-power-brushless-drone-motor": "/products/v3/2207-2450kv-high-power-brushless-drone-motor.jpg",
  "5-inch-tri-blade-fpv-drone-propellers-pack": "/products/v3/5-inch-tri-blade-fpv-drone-propellers-pack.jpg",
  "30a-4-in-1-blheli-s-electronic-speed-controller": "/products/v3/30a-4-in-1-blheli-s-electronic-speed-controller.jpg",
  "omnidirectional-58ghz-fpv-cloverleaf-antenna": "/products/v3/omnidirectional-58ghz-fpv-cloverleaf-antenna.jpg",
  "crystal-clear-cast-acrylic-showcase-cube-box": "/products/v3/crystal-clear-cast-acrylic-showcase-cube-box.jpg",
  "laser-engraved-beveled-acrylic-award-trophy": "/products/v3/laser-engraved-beveled-acrylic-award-trophy.jpg",
  "high-clarity-heavy-duty-acrylic-sneeze-shield": "/products/v3/high-clarity-heavy-duty-acrylic-sneeze-shield.jpg",
  "desktop-acrylic-slanted-brochure-menu-holder": "/products/v3/desktop-acrylic-slanted-brochure-menu-holder.jpg",
  "multi-tiered-clear-acrylic-cosmetic-display-riser": "/products/v3/multi-tiered-clear-acrylic-cosmetic-display-riser.jpg",
  "autonomous-4wd-smart-robotic-stem-starter-kit": "/products/v3/autonomous-4wd-smart-robotic-stem-starter-kit.jpg",
  "educational-electronics-soldering-practice-kit": "/products/v3/educational-electronics-soldering-practice-kit.jpg",
  "diy-portable-bluetooth-stereo-speaker-maker-kit": "/products/v3/diy-portable-bluetooth-stereo-speaker-maker-kit.jpg",
  "miniature-solar-powered-stem-rover-buggy-kit": "/products/v3/miniature-solar-powered-stem-rover-buggy-kit.jpg",
  "smart-weather-station-iot-esp8266-maker-kit": "/products/v3/smart-weather-station-iot-esp8266-maker-kit.jpg",
};

export function productImage(imageKey: string | undefined | null, name?: string | null): string {
  if (!imageKey) return "/products/v3/3d-printed-geometric-spiral-vase.jpg";
  if (imageKey.startsWith("http://") || imageKey.startsWith("https://") || imageKey.startsWith("/products/v3/")) {
    return imageKey;
  }
  if (EXACT_SLUG_IMAGE_MAP[imageKey]) {
    return EXACT_SLUG_IMAGE_MAP[imageKey];
  }
  return `/products/v3/${imageKey}.jpg`;
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
