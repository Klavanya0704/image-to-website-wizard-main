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
  angle: string;
  src: string;
  styleClass?: string;
  viewType: "front" | "isometric" | "closeup" | "cad";
}

export function productViewsFor(key: string | null | undefined): ProductViewAngle[] {
  const main = productImage(key);
  return [
    {
      id: "view-front",
      label: "Front View",
      angle: "0° Studio",
      src: main,
      viewType: "front",
    },
    {
      id: "view-iso",
      label: "Isometric 3D",
      angle: "45° Perspective",
      src: main,
      styleClass: "scale-105 rotate-1",
      viewType: "isometric",
    },
    {
      id: "view-detail",
      label: "Detail Close-Up",
      angle: "Surface Finish",
      src: main,
      styleClass: "scale-135 object-center",
      viewType: "closeup",
    },
    {
      id: "view-cad",
      label: "Technical CAD",
      angle: "Dimensions & Spec",
      src: main,
      styleClass: "contrast-115 brightness-95",
      viewType: "cad",
    },
  ];
}

export function galleryFor(key: string | null | undefined): string[] {
  const main = productImage(key);
  return [main, main, main, main];
}
