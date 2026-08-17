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

const map: Record<string, string> = {
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

export function productImage(key: string | null | undefined): string {
  return (key && map[key]) || cnc;
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

export function productViewsFor(key: string | null | undefined): ProductViewAngle[] {
  const main = productImage(key);
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
      stageStyle: "scale-110 -rotate-3 scale-x-[-1] drop-shadow-md",
      thumbStyle: "scale-110 -rotate-3 scale-x-[-1]",
      viewType: "isometric",
    },
    {
      id: "view-detail",
      label: "Macro Detail",
      badgeTitle: "ZOOMED DETAIL VIEW",
      angle: "Material Texture",
      src: main,
      stageStyle: "scale-150 origin-center contrast-105 saturate-110",
      thumbStyle: "scale-145 origin-center",
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

export function galleryFor(key: string | null | undefined): string[] {
  const main = productImage(key);
  return [main, main, main, main];
}
