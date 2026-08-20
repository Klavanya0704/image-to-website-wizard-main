// Exact mapping: PRODUCT SLUG -> IMAGE PATH
const EXACT_SLUG_IMAGE_MAP: Record<string, string> = {
  // 1. 3D Printing Products
  "geometric-spiral-vase": "/products/geometric-spiral-vase.jpg",
  "3d-printed-geometric-vase": "/products/3d-printed-geometric-vase.jpg",
  "universal-foldable-phone-stand-3d": "/products/universal-foldable-phone-stand-3d.jpg",
  "adjustable-phone-stand": "/products/adjustable-phone-stand.jpg",
  "mini-desk-organizer": "/products/mini-desk-organizer.jpg",
  "cable-management-clip-set": "/products/cable-management-clip-set.jpg",
  "resin-architectural-model": "/products/resin-architectural-model.jpg",
  "planter-pot-hex": "/products/planter-pot-hex.jpg",
  "mechanical-prototype-model": "/products/mechanical-prototype-model.jpg",

  // 2. Laser Cutting Products (Wood, Glass & Acrylic)
  "custom-name-keychain": "/products/custom-name-keychain.jpg",
  "custom-engraved-wooden-keychain": "/products/custom-name-keychain.jpg",
  "tree-of-life-lamp": "/products/tree-of-life-lamp.jpg",
  "tree-of-life-led-lamp": "/products/tree-of-life-lamp.jpg",
  "laser-cut-desk-organizer": "/products/laser-cut-desk-organizer.jpg",
  "wooden-wall-art-mandala": "/products/wooden-wall-art-mandala.jpg",
  "mandala-laser-cut-wooden-coasters": "/products/wooden-wall-art-mandala.jpg",
  "laser-engraved-photo-frame": "/products/laser-engraved-photo-frame.jpg",
  "custom-acrylic-led-sign": "/products/custom-acrylic-led-sign.jpg",
  "custom-acrylic-led-illuminated-sign": "/products/custom-acrylic-led-sign.jpg",
  "laser-engraved-glass-trophy": "/products/laser-engraved-glass-trophy.jpg",
  "frosted-glass-laser-engraving": "/products/frosted-glass-laser-engraving.jpg",
  "laser-cut-acrylic-name-plate": "/products/laser-cut-acrylic-name-plate.jpg",
  "acrylic-decorative-panel": "/products/acrylic-decorative-panel.jpg",

  // 3. CNC Machining Products (College CNC Lab Metal & 3D Wood Carving/Routing)
  "cnc-wooden-name-plate": "/products/cnc-wooden-name-plate.jpg",
  "cnc-carved-wooden-wall-panel": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
  "cnc-cut-wooden-mandala": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
  "cnc-cut-wooden-box": "/products/cnc-cut-wooden-box.jpg",
  "cnc-wooden-key-holder": "/products/cnc-wooden-key-holder.jpg",
  "cnc-wooden-relief-art": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
  "cnc-wooden-sign-board": "/products/cnc-wooden-sign-board.jpg",
  "cnc-aluminium-bracket": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
  "cnc-aluminum-mounting-bracket": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
  "cnc-aluminum-fixture-plate": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
  "cnc-machined-gear": "/products/cnc-machined-gear.jpg",
  "cnc-machined-shaft": "/products/cnc-machined-shaft.jpg",
  "cnc-machined-bushing": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
  "precision-cnc-flanged-bushing": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
  "cnc-machined-coupling": "/products/cnc-machined-coupling.jpg",
  "cnc-stainless-steel-coupling": "/products/cnc-machined-coupling.jpg",
  "cnc-machined-pulley": "/products/cnc-machined-pulley.jpg",
  "cnc-machined-prototype-component": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
  "cnc-machined-flanged-brass-bushings": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
  "precision-aluminum-shaft-coupler": "/products/cnc-machined-coupling.jpg",
  "heavy-duty-l-bracket-cnc": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
  "precision-mounting-plate": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
  "custom-cnc-component": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
  "mechanical-prototype-model": "/products/cnc-machined-gear.jpg",

  // 4. Electronics Products
  "esp32-iot-maker-board": "/products/esp32-iot-maker-board.jpg",
  "esp32-development-board": "/products/esp32-development-board.jpg",
  "37-in-1-iot-sensor-module-kit": "/products/37-in-1-iot-sensor-module-kit.jpg",
  "arduino-sensor-kit": "/products/arduino-sensor-kit.jpg",
  "iot-starter-kit": "/products/iot-starter-kit.jpg",
  "led-electronics-kit": "/products/led-electronics-kit.jpg",
  "soldering-practice-board": "/products/soldering-practice-board.jpg",
  "fr4-double-sided-prototype-pcb-10pack": "/products/fr4-double-sided-prototype-pcb-10pack.jpg",
  "mini-robotics-kit": "/products/mini-robotics-kit.jpg",

  // 5. Drones & Parts Products
  "fpv-drone-carbon-fiber-frame": "/products/fpv-drone-carbon-fiber-frame.jpg",
  "drone-frame-kit": "/products/drone-frame-kit.jpg",
  "fpv-prototype-frame": "/products/fpv-prototype-frame.jpg",
  "brushless-motor-mount": "/products/brushless-motor-mount.jpg",
  "brushless-drone-motor-2207-2450kv": "/products/brushless-drone-motor-2207-2450kv.jpg",
  "propeller-set-1045": "/products/propeller-set-1045.jpg",
  "5-inch-tri-blade-fpv-propellers": "/products/5-inch-tri-blade-fpv-propellers.jpg",
  "drone-landing-gear": "/products/drone-landing-gear.jpg",

  // 6. Acrylic Products
  "clear-cast-acrylic-display-box": "/products/clear-cast-acrylic-display-box.jpg",
  "custom-acrylic-trophy-plaque": "/products/custom-acrylic-trophy-plaque.jpg",
  "transparent-protective-acrylic-shield": "/products/transparent-protective-acrylic-shield.jpg",
  "acrylic-name-plate": "/products/acrylic-name-plate.jpg",
  "acrylic-keychain": "/products/acrylic-keychain.jpg",
  "acrylic-desk-sign": "/products/acrylic-desk-sign.jpg",
  "transparent-display-stand": "/products/transparent-display-stand.jpg",
  "college-logo-acrylic-board": "/products/college-logo-acrylic-board.jpg",

  // 7. DIY Kits
  "starter-maker-diy-electronics-kit": "/products/starter-maker-diy-electronics-kit.jpg",
  "smart-home-diy-kit": "/products/smart-home-diy-kit.jpg",
  "mini-robot-kit": "/products/mini-robot-kit.jpg",
  "electronics-learning-kit": "/products/electronics-learning-kit.jpg",
  "arduino-project-kit": "/products/arduino-project-kit.jpg",
  "drone-building-diy-kit": "/products/drone-building-diy-kit.jpg",
  "diy-soldering-practice-electronics-kit": "/products/diy-soldering-practice-electronics-kit.jpg",
  "diy-bluetooth-speaker-assembly-kit": "/products/diy-bluetooth-speaker-assembly-kit.jpg",
};

export function productImage(keyOrSlug?: string | null, productName?: string | null): string {
  const rawKey = (keyOrSlug || "").trim();
  if (rawKey.startsWith("http://") || rawKey.startsWith("https://")) {
    return rawKey;
  }

  const slug = rawKey.toLowerCase();

  // 1. Direct match by exact slug
  if (slug && EXACT_SLUG_IMAGE_MAP[slug]) {
    return EXACT_SLUG_IMAGE_MAP[slug];
  }

  // 2. Exact match by slug with sanitized hyphens
  const cleanSlug = slug.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (cleanSlug && EXACT_SLUG_IMAGE_MAP[cleanSlug]) {
    return EXACT_SLUG_IMAGE_MAP[cleanSlug];
  }

  // 3. Fallback semantic resolution based on product name/slug keywords
  const q = `${slug} ${productName || ""}`.toLowerCase().trim();

  // CNC Specific Overrides
  if (q.includes("wooden wall panel") || q.includes("wooden relief") || q.includes("relief carving")) {
    return "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80";
  }
  if (q.includes("cnc") && q.includes("mandala")) {
    return "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80";
  }
  if (q.includes("prototype part") || q.includes("aluminium plate") || q.includes("aluminium bracket") || q.includes("aluminum bracket") || q.includes("fixture plate")) {
    return "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80";
  }
  if (q.includes("machined bushing") || q.includes("flanged bushing") || q.includes("brass flange bushing")) {
    return "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80";
  }

  // Laser cutting specific checks (prevents photo frame from ever showing drone)
  if (q.includes("photo frame") || q.includes("photo-frame") || q.includes("engraved frame")) {
    return "/products/laser-engraved-photo-frame.jpg";
  }
  if (q.includes("tree of life") || q.includes("lamp") || q.includes("tree-of-life")) {
    return "/products/tree-of-life-led-lamp.jpg";
  }
  if (q.includes("mandala") || q.includes("wall art") || q.includes("coaster")) {
    return "/products/wooden-wall-art-mandala.jpg";
  }
  if (q.includes("logo board") || q.includes("college logo") || q.includes("college-logo")) {
    return "/products/college-logo-board.jpg";
  }
  if (q.includes("keychain") || q.includes("key ring")) {
    return "/products/custom-name-keychain.jpg";
  }
  if (q.includes("laser") && q.includes("desk organizer")) {
    return "/products/laser-cut-desk-organizer.jpg";
  }

  // 3D Printing specific checks
  if (q.includes("hex") && (q.includes("planter") || q.includes("pot"))) {
    return "/products/planter-pot-hex.jpg";
  }
  if (q.includes("cable") && (q.includes("clip") || q.includes("management"))) {
    return "/products/cable-management-clip-set.jpg";
  }
  if (q.includes("mini desk") || q.includes("desk organizer")) {
    return "/products/mini-desk-organizer.jpg";
  }
  if (q.includes("phone stand") || q.includes("foldable") || q.includes("adjustable phone")) {
    return "/products/universal-foldable-phone-stand-3d.jpg";
  }
  if (q.includes("architectural") || q.includes("miniature") || q.includes("resin")) {
    return "/products/resin-architectural-model.jpg";
  }
  if (q.includes("vase") || q.includes("geometric-spiral") || q.includes("lattice")) {
    return "/products/geometric-spiral-vase.jpg";
  }

  // CNC Machining generic
  if (q.includes("bushing") || q.includes("brass") || q.includes("flanged")) {
    return "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80";
  }
  if (q.includes("bracket") || q.includes("mounting plate") || q.includes("l-bracket")) {
    return "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80";
  }
  if (q.includes("coupling") || q.includes("coupler") || q.includes("shaft") || q.includes("gearbox")) {
    return "/products/precision-aluminum-shaft-coupler.jpg";
  }
  if (q.includes("prototype block") || q.includes("custom cnc")) {
    return "/products/custom-cnc-component.jpg";
  }

  // Electronics
  if (q.includes("esp32") || q.includes("microcontroller")) {
    return "/products/esp32-development-board.jpg";
  }
  if (q.includes("sensor") || q.includes("module kit")) {
    return "/products/37-in-1-iot-sensor-module-kit.jpg";
  }
  if (q.includes("pcb") || q.includes("fr4") || q.includes("perfboard")) {
    return "/products/fr4-double-sided-prototype-pcb-10pack.jpg";
  }

  // Drones
  if (q.includes("frame") || q.includes("carbon fiber") || q.includes("fpv")) {
    return "/products/fpv-drone-carbon-fiber-frame.jpg";
  }
  if (q.includes("motor") || q.includes("brushless") || q.includes("2207")) {
    return "/products/brushless-drone-motor-2207-2450kv.jpg";
  }
  if (q.includes("propeller") || q.includes("props") || q.includes("tri-blade")) {
    return "/products/5-inch-tri-blade-fpv-propellers.jpg";
  }

  // Acrylic
  if (q.includes("display box") || q.includes("dust-proof") || q.includes("showcase")) {
    return "/products/clear-cast-acrylic-display-box.jpg";
  }
  if (q.includes("trophy") || q.includes("award") || q.includes("plaque")) {
    return "/products/custom-acrylic-trophy-plaque.jpg";
  }
  if (q.includes("shield") || q.includes("protective") || q.includes("barrier")) {
    return "/products/transparent-protective-acrylic-shield.jpg";
  }

  // DIY Kits
  if (q.includes("robot") || q.includes("autonomous") || q.includes("stem starter")) {
    return "/products/starter-maker-diy-electronics-kit.jpg";
  }
  if (q.includes("soldering") || q.includes("training kit")) {
    return "/products/diy-soldering-practice-electronics-kit.jpg";
  }
  if (q.includes("speaker") || q.includes("bluetooth speaker")) {
    return "/products/diy-bluetooth-speaker-assembly-kit.jpg";
  }

  return "/products/geometric-spiral-vase.jpg";
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
