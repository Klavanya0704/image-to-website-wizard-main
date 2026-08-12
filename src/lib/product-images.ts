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

export function galleryFor(key: string | null | undefined): string[] {
  const main = productImage(key);
  const others = Object.values(map)
    .filter((v) => v !== main)
    .slice(0, 3);
  return [main, ...others];
}
