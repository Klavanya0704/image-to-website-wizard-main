import vase from "@/assets/p-vase.jpg";
import lamp from "@/assets/p-lamp.jpg";
import keychain from "@/assets/p-keychain.jpg";
import cnc from "@/assets/p-cnc.jpg";
import esp32 from "@/assets/p-esp32.jpg";
import drone from "@/assets/p-drone.jpg";
import organizer from "@/assets/p-organizer.jpg";
import stand from "@/assets/p-stand.jpg";
import board from "@/assets/p-board.jpg";
import kit from "@/assets/p-kit.jpg";
import acrylic from "@/assets/p-acrylic.jpg";

export function productImage(keyOrSlug?: string | null, productName?: string | null): string {
  const q = `${keyOrSlug || ""} ${productName || ""}`.toLowerCase().trim();

  // 1. 3D Printing Products
  if (q.includes("hex") && (q.includes("planter") || q.includes("pot"))) {
    return "/products/hex-planter.svg";
  }
  if (q.includes("cable") && (q.includes("clip") || q.includes("management"))) {
    return "/products/cable-clips.svg";
  }
  if (q.includes("desk organizer") || q.includes("mini desk") || q.includes("caddy") || q.includes("organizer")) {
    return "/products/desk-organizer.svg";
  }
  if (q.includes("phone stand") || q.includes("foldable") || q.includes("adjustable phone") || (q.includes("stand") && !q.includes("trophy") && !q.includes("display"))) {
    return "/products/phone-stand.svg";
  }
  if (q.includes("architectural") || q.includes("miniature") || q.includes("resin") || q.includes("sla")) {
    return "/products/architectural-model.svg";
  }
  if (q.includes("vase") || q.includes("geometric-spiral") || q.includes("lattice")) {
    return "/products/3d-vase.svg";
  }

  // 2. CNC Machining Products
  if (q.includes("bushing") || q.includes("brass") || q.includes("flanged")) {
    return "/products/cnc-bushings.svg";
  }
  if (q.includes("bracket") || q.includes("mounting bracket") || q.includes("l-bracket") || q.includes("mounting plate") || q.includes("prototype block")) {
    return "/products/cnc-bracket.svg";
  }
  if (q.includes("coupling") || q.includes("coupler") || q.includes("shaft") || q.includes("gearbox")) {
    return "/products/cnc-coupling.svg";
  }

  // 3. Laser Cutting Products
  if (q.includes("keychain") || q.includes("key ring")) {
    return keychain;
  }
  if (q.includes("mandala") || q.includes("coaster") || q.includes("wooden mandala")) {
    return lamp;
  }
  if (q.includes("tree of life") || q.includes("lamp") || q.includes("illuminated") || q.includes("led sign")) {
    return lamp;
  }
  if (q.includes("mdf") || q.includes("structural architectural") || q.includes("photo frame")) {
    return keychain;
  }

  // 4. Electronics Products
  if (q.includes("esp32") || q.includes("microcontroller") || q.includes("development board")) {
    return "/products/esp32-board.svg";
  }
  if (q.includes("sensor") || q.includes("module kit") || q.includes("iot sensor")) {
    return "/products/sensor-kit.svg";
  }
  if (q.includes("pcb") || q.includes("fr4") || q.includes("perfboard") || q.includes("soldering practice") || q.includes("display electronics")) {
    return "/products/prototype-pcb.svg";
  }

  // 5. Drones & Parts Products
  if (q.includes("frame") || q.includes("carbon fiber") || q.includes("fpv") || q.includes("wheelbase") || q.includes("landing gear")) {
    return "/products/drone-frame.svg";
  }
  if (q.includes("motor") || q.includes("brushless") || q.includes("2207") || q.includes("thrust")) {
    return "/products/drone-motor.svg";
  }
  if (q.includes("propeller") || q.includes("props") || q.includes("tri-blade") || q.includes("1045")) {
    return "/products/drone-propellers.svg";
  }

  // 6. Acrylic Products
  if (q.includes("display box") || q.includes("dust-proof") || q.includes("vitrine") || q.includes("showcase") || q.includes("transparent display")) {
    return "/products/acrylic-box.svg";
  }
  if (q.includes("trophy") || q.includes("award") || q.includes("plaque") || q.includes("college logo") || q.includes("name plate") || q.includes("desk sign")) {
    return stand;
  }
  if (q.includes("shield") || q.includes("protective") || q.includes("barrier")) {
    return acrylic;
  }

  // 7. DIY Kits
  if (q.includes("robot") || q.includes("autonomous") || q.includes("line follower") || q.includes("stem starter")) {
    return "/products/robotics-kit.svg";
  }
  if (q.includes("speaker") || q.includes("bluetooth speaker") || q.includes("audio")) {
    return kit;
  }
  if (q.includes("soldering") || q.includes("learning kit") || q.includes("smart home") || q.includes("kit")) {
    return "/products/robotics-kit.svg";
  }

  // Fallback map
  const fallbackMap: Record<string, string> = {
    vase,
    lamp,
    keychain,
    cnc,
    esp32,
    drone,
    organizer,
    stand,
    board,
    kit,
    acrylic,
  };
  return (keyOrSlug && fallbackMap[keyOrSlug]) || "/products/3d-vase.svg";
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

export function productViewsFor(keyOrSlug: string | null | undefined, name?: string | null): ProductViewAngle[] {
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
