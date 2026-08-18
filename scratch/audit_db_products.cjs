const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

let envContent = '';
if (fs.existsSync('.env.local')) envContent += fs.readFileSync('.env.local', 'utf8') + '\n';
if (fs.existsSync('.env')) envContent += fs.readFileSync('.env', 'utf8') + '\n';

const env = {};
envContent.split('\n').forEach((line) => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const k = parts[0].trim();
    const v = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    env[k] = v;
  }
});

const url = env['VITE_SUPABASE_URL'] || env['SUPABASE_URL'];
const key = env['VITE_SUPABASE_PUBLISHABLE_KEY'] || env['SUPABASE_PUBLISHABLE_KEY'];
const sb = createClient(url, key);

const EXACT_SLUG_IMAGE_MAP = {
  "geometric-spiral-vase": "/products/geometric-spiral-vase.jpg",
  "3d-printed-geometric-vase": "/products/3d-printed-geometric-vase.jpg",
  "universal-foldable-phone-stand-3d": "/products/universal-foldable-phone-stand-3d.jpg",
  "adjustable-phone-stand": "/products/adjustable-phone-stand.jpg",
  "mini-desk-organizer": "/products/mini-desk-organizer.jpg",
  "cable-management-clip-set": "/products/cable-management-clip-set.jpg",
  "resin-architectural-model": "/products/resin-architectural-model.jpg",
  "planter-pot-hex": "/products/planter-pot-hex.jpg",
  "mechanical-prototype-model": "/products/mechanical-prototype-model.jpg",

  "custom-name-keychain": "/products/custom-name-keychain.jpg",
  "custom-engraved-wooden-keychain": "/products/custom-engraved-wooden-keychain.jpg",
  "tree-of-life-lamp": "/products/tree-of-life-lamp.jpg",
  "tree-of-life-led-lamp": "/products/tree-of-life-led-lamp.jpg",
  "custom-acrylic-led-illuminated-sign": "/products/custom-acrylic-led-illuminated-sign.jpg",
  "laser-cut-desk-organizer": "/products/laser-cut-desk-organizer.jpg",
  "college-logo-board": "/products/college-logo-board.jpg",
  "wooden-wall-art-mandala": "/products/wooden-wall-art-mandala.jpg",
  "mandala-laser-cut-wooden-coasters": "/products/mandala-laser-cut-wooden-coasters.jpg",
  "laser-engraved-photo-frame": "/products/laser-engraved-photo-frame.jpg",
  "mdf-structural-architectural-puzzle-kit": "/products/mdf-structural-architectural-puzzle-kit.jpg",

  "precision-aluminum-shaft-coupler": "/products/precision-aluminum-shaft-coupler.jpg",
  "heavy-duty-l-bracket-cnc": "/products/heavy-duty-l-bracket-cnc.jpg",
  "cnc-aluminium-bracket": "/products/cnc-aluminium-bracket.jpg",
  "precision-mounting-plate": "/products/precision-mounting-plate.jpg",
  "custom-cnc-component": "/products/custom-cnc-component.jpg",
  "aluminium-prototype-block": "/products/aluminium-prototype-block.jpg",
  "cnc-machined-flanged-brass-bushings": "/products/cnc-machined-flanged-brass-bushings.jpg",

  "esp32-iot-maker-board": "/products/esp32-iot-maker-board.jpg",
  "esp32-development-board": "/products/esp32-development-board.jpg",
  "37-in-1-iot-sensor-module-kit": "/products/37-in-1-iot-sensor-module-kit.jpg",
  "arduino-sensor-kit": "/products/arduino-sensor-kit.jpg",
  "iot-starter-kit": "/products/iot-starter-kit.jpg",
  "led-electronics-kit": "/products/led-electronics-kit.jpg",
  "soldering-practice-board": "/products/soldering-practice-board.jpg",
  "fr4-double-sided-prototype-pcb-10pack": "/products/fr4-double-sided-prototype-pcb-10pack.jpg",
  "mini-robotics-kit": "/products/mini-robotics-kit.jpg",

  "fpv-drone-carbon-fiber-frame": "/products/fpv-drone-carbon-fiber-frame.jpg",
  "drone-frame-kit": "/products/drone-frame-kit.jpg",
  "fpv-prototype-frame": "/products/fpv-prototype-frame.jpg",
  "brushless-motor-mount": "/products/brushless-motor-mount.jpg",
  "brushless-drone-motor-2207-2450kv": "/products/brushless-drone-motor-2207-2450kv.jpg",
  "propeller-set-1045": "/products/propeller-set-1045.jpg",
  "5-inch-tri-blade-fpv-propellers": "/products/5-inch-tri-blade-fpv-propellers.jpg",
  "drone-landing-gear": "/products/drone-landing-gear.jpg",

  "clear-cast-acrylic-display-box": "/products/clear-cast-acrylic-display-box.jpg",
  "custom-acrylic-trophy-plaque": "/products/custom-acrylic-trophy-plaque.jpg",
  "transparent-protective-acrylic-shield": "/products/transparent-protective-acrylic-shield.jpg",
  "acrylic-name-plate": "/products/acrylic-name-plate.jpg",
  "acrylic-keychain": "/products/acrylic-keychain.jpg",
  "acrylic-desk-sign": "/products/acrylic-desk-sign.jpg",
  "transparent-display-stand": "/products/transparent-display-stand.jpg",
  "college-logo-acrylic-board": "/products/college-logo-acrylic-board.jpg",

  "starter-maker-diy-electronics-kit": "/products/starter-maker-diy-electronics-kit.jpg",
  "smart-home-diy-kit": "/products/smart-home-diy-kit.jpg",
  "mini-robot-kit": "/products/mini-robot-kit.jpg",
  "electronics-learning-kit": "/products/electronics-learning-kit.jpg",
  "arduino-project-kit": "/products/arduino-project-kit.jpg",
  "drone-building-diy-kit": "/products/drone-building-diy-kit.jpg",
  "diy-soldering-practice-electronics-kit": "/products/diy-soldering-practice-electronics-kit.jpg",
  "diy-bluetooth-speaker-assembly-kit": "/products/diy-bluetooth-speaker-assembly-kit.jpg",
};

async function auditDB() {
  const { data: dbProducts, error } = await sb.from('products').select('*').order('created_at');
  if (error) {
    console.error(error);
    return;
  }
  console.log(`Auditing ${dbProducts.length} live Supabase products:\n`);
  let allMatched = true;
  dbProducts.forEach((p, i) => {
    const img = EXACT_SLUG_IMAGE_MAP[p.slug];
    const exists = img && fs.existsSync(`public${img}`);
    console.log(`${(i+1).toString().padStart(2)}. [${(p.category_slug || p.category).padEnd(16)}] ${p.name.padEnd(45)} -> ${img} (Exists: ${exists})`);
    if (!exists) allMatched = false;
  });
  console.log(`\nAll DB Products Have Exact Dedicated Image: ${allMatched}`);
}

auditDB();
