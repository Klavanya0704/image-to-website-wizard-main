export function productImage(keyOrSlug?: string | null, productName?: string | null): string {
  const q = `${keyOrSlug || ""} ${productName || ""}`.toLowerCase().trim();

  // 1. 3D Printing Products (Ultra High-Res 1024x1024 Studio Photography)
  if (q.includes("hex") && (q.includes("planter") || q.includes("pot"))) {
    return "/products/hex-planter.jpg";
  }
  if (q.includes("cable") && (q.includes("clip") || q.includes("management"))) {
    return "/products/cable-clips.jpg";
  }
  if (
    q.includes("desk organizer") ||
    q.includes("mini desk") ||
    q.includes("caddy") ||
    q.includes("organizer")
  ) {
    return "/products/desk-organizer.jpg";
  }
  if (
    q.includes("phone stand") ||
    q.includes("foldable") ||
    q.includes("adjustable phone") ||
    (q.includes("stand") && !q.includes("trophy") && !q.includes("display"))
  ) {
    return "/products/phone-stand.jpg";
  }
  if (
    q.includes("architectural") ||
    q.includes("miniature") ||
    q.includes("resin") ||
    q.includes("sla")
  ) {
    return "/products/architectural-model.jpg";
  }
  if (q.includes("vase") || q.includes("geometric-spiral") || q.includes("lattice")) {
    return "/products/3d-vase.jpg";
  }

  // 2. Laser Cutting Products (1024x1024 to 1200x1200 High-Res Photography)
  if (q.includes("sign") || q.includes("illuminated") || q.includes("led")) {
    return "/products/acrylic-sign.jpg";
  }
  if (q.includes("mandala") || q.includes("coaster")) {
    return "/products/mandala-coasters.jpg";
  }
  if (q.includes("keychain") || q.includes("key ring")) {
    return "/products/wood-keychain.jpg";
  }
  if (q.includes("mdf") || q.includes("structural architectural") || q.includes("puzzle")) {
    return "/products/mdf-kit.jpg";
  }

  // 3. CNC Machining Products (1200x1200 Precision Metal Photography)
  if (q.includes("bushing") || q.includes("brass") || q.includes("flanged")) {
    return "/products/cnc-bushings.jpg";
  }
  if (
    q.includes("bracket") ||
    q.includes("mounting bracket") ||
    q.includes("l-bracket") ||
    q.includes("mounting plate")
  ) {
    return "/products/cnc-bracket.jpg";
  }
  if (
    q.includes("coupling") ||
    q.includes("coupler") ||
    q.includes("shaft") ||
    q.includes("gearbox") ||
    q.includes("mechanical")
  ) {
    return "/products/cnc-coupling.jpg";
  }

  // 4. Electronics Products (1200x1200 High-Res Hardware Photography)
  if (q.includes("esp32") || q.includes("microcontroller") || q.includes("iot board")) {
    return "/products/esp32-board.jpg";
  }
  if (q.includes("sensor") || q.includes("module kit") || q.includes("iot sensor")) {
    return "/products/sensor-kit.jpg";
  }
  if (q.includes("pcb") || q.includes("fr4") || q.includes("perfboard") || q.includes("prototype board")) {
    return "/products/prototype-pcb.jpg";
  }

  // 5. Drones & Parts Products (1200x1200 High-Res Carbon & Motor Photography)
  if (
    q.includes("frame") ||
    q.includes("carbon fiber") ||
    q.includes("fpv") ||
    q.includes("wheelbase") ||
    q.includes("quadcopter")
  ) {
    return "/products/drone-frame.jpg";
  }
  if (q.includes("motor") || q.includes("brushless") || q.includes("2207") || q.includes("thrust")) {
    return "/products/drone-motor.jpg";
  }
  if (q.includes("propeller") || q.includes("props") || q.includes("tri-blade") || q.includes("blade")) {
    return "/products/drone-propellers.jpg";
  }

  // 6. Acrylic Products (1200x1200 High-Clarity Studio Photography)
  if (q.includes("display box") || q.includes("dust-proof") || q.includes("vitrine") || q.includes("showcase")) {
    return "/products/acrylic-box.jpg";
  }
  if (q.includes("trophy") || q.includes("award") || q.includes("plaque") || q.includes("college")) {
    return "/products/acrylic-trophy.jpg";
  }
  if (q.includes("shield") || q.includes("protective") || q.includes("barrier") || q.includes("acrylic")) {
    return "/products/acrylic-shield.jpg";
  }

  // 7. DIY Kits (1200x1200 STEM Starter & Assembly Kit Photography)
  if (q.includes("robot") || q.includes("autonomous") || q.includes("stem starter") || q.includes("chassis")) {
    return "/products/robotics-kit.jpg";
  }
  if (q.includes("soldering") || q.includes("training kit") || q.includes("electronics kit")) {
    return "/products/soldering-kit.jpg";
  }
  if (q.includes("speaker") || q.includes("bluetooth speaker") || q.includes("audio")) {
    return "/products/bluetooth-speaker-kit.jpg";
  }

  return "/products/3d-vase.jpg";
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
