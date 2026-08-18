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

const EXACT_CANONICAL_CATEGORIES = {
  // 3D Printing
  "3d-printed-geometric-vase": { cat: "3D Printing", slug: "3d-printing" },
  "geometric-spiral-vase": { cat: "3D Printing", slug: "3d-printing" },
  "mini-desk-organizer": { cat: "3D Printing", slug: "3d-printing" },
  "adjustable-phone-stand": { cat: "3D Printing", slug: "3d-printing" },
  "universal-foldable-phone-stand-3d": { cat: "3D Printing", slug: "3d-printing" },
  "cable-management-clip-set": { cat: "3D Printing", slug: "3d-printing" },
  "resin-architectural-model": { cat: "3D Printing", slug: "3d-printing" },
  "planter-pot-hex": { cat: "3D Printing", slug: "3d-printing" },

  // Laser Cutting
  "custom-name-keychain": { cat: "Laser Cutting", slug: "laser-cutting" },
  "custom-engraved-wooden-keychain": { cat: "Laser Cutting", slug: "laser-cutting" },
  "tree-of-life-lamp": { cat: "Laser Cutting", slug: "laser-cutting" },
  "tree-of-life-led-lamp": { cat: "Laser Cutting", slug: "laser-cutting" },
  "laser-cut-desk-organizer": { cat: "Laser Cutting", slug: "laser-cutting" },
  "college-logo-board": { cat: "Laser Cutting", slug: "laser-cutting" },
  "wooden-wall-art-mandala": { cat: "Laser Cutting", slug: "laser-cutting" },
  "mandala-laser-cut-wooden-coasters": { cat: "Laser Cutting", slug: "laser-cutting" },
  "laser-engraved-photo-frame": { cat: "Laser Cutting", slug: "laser-cutting" },
  "custom-acrylic-led-illuminated-sign": { cat: "Laser Cutting", slug: "laser-cutting" },
  "mdf-structural-architectural-puzzle-kit": { cat: "Laser Cutting", slug: "laser-cutting" },

  // CNC Machining
  "mechanical-prototype-model": { cat: "CNC Machining", slug: "cnc-machining" },
  "precision-aluminum-shaft-coupler": { cat: "CNC Machining", slug: "cnc-machining" },
  "cnc-aluminium-bracket": { cat: "CNC Machining", slug: "cnc-machining" },
  "heavy-duty-l-bracket-cnc": { cat: "CNC Machining", slug: "cnc-machining" },
  "precision-mounting-plate": { cat: "CNC Machining", slug: "cnc-machining" },
  "custom-cnc-component": { cat: "CNC Machining", slug: "cnc-machining" },
  "aluminium-prototype-block": { cat: "CNC Machining", slug: "cnc-machining" },
  "cnc-machined-flanged-brass-bushings": { cat: "CNC Machining", slug: "cnc-machining" },

  // Electronics
  "esp32-development-board": { cat: "Electronics", slug: "electronics" },
  "esp32-iot-maker-board": { cat: "Electronics", slug: "electronics" },
  "arduino-sensor-kit": { cat: "Electronics", slug: "electronics" },
  "37-in-1-iot-sensor-module-kit": { cat: "Electronics", slug: "electronics" },
  "iot-starter-kit": { cat: "Electronics", slug: "electronics" },
  "led-electronics-kit": { cat: "Electronics", slug: "electronics" },
  "soldering-practice-board": { cat: "Electronics", slug: "electronics" },
  "fr4-double-sided-prototype-pcb-10pack": { cat: "Electronics", slug: "electronics" },
  "mini-robotics-kit": { cat: "Electronics", slug: "electronics" },

  // Drones & Parts
  "drone-frame-kit": { cat: "Drones & Parts", slug: "drones-parts" },
  "fpv-drone-carbon-fiber-frame": { cat: "Drones & Parts", slug: "drones-parts" },
  "brushless-motor-mount": { cat: "Drones & Parts", slug: "drones-parts" },
  "brushless-drone-motor-2207-2450kv": { cat: "Drones & Parts", slug: "drones-parts" },
  "propeller-set-1045": { cat: "Drones & Parts", slug: "drones-parts" },
  "5-inch-tri-blade-fpv-propellers": { cat: "Drones & Parts", slug: "drones-parts" },
  "drone-landing-gear": { cat: "Drones & Parts", slug: "drones-parts" },
  "fpv-prototype-frame": { cat: "Drones & Parts", slug: "drones-parts" },

  // Acrylic Products
  "acrylic-name-plate": { cat: "Acrylic Products", slug: "acrylic-products" },
  "acrylic-keychain": { cat: "Acrylic Products", slug: "acrylic-products" },
  "acrylic-desk-sign": { cat: "Acrylic Products", slug: "acrylic-products" },
  "transparent-display-stand": { cat: "Acrylic Products", slug: "acrylic-products" },
  "college-logo-acrylic-board": { cat: "Acrylic Products", slug: "acrylic-products" },
  "clear-cast-acrylic-display-box": { cat: "Acrylic Products", slug: "acrylic-products" },
  "custom-acrylic-trophy-plaque": { cat: "Acrylic Products", slug: "acrylic-products" },
  "transparent-protective-acrylic-shield": { cat: "Acrylic Products", slug: "acrylic-products" },

  // DIY Kits
  "smart-home-diy-kit": { cat: "DIY Kits", slug: "diy-kits" },
  "mini-robot-kit": { cat: "DIY Kits", slug: "diy-kits" },
  "electronics-learning-kit": { cat: "DIY Kits", slug: "diy-kits" },
  "arduino-project-kit": { cat: "DIY Kits", slug: "diy-kits" },
  "drone-building-diy-kit": { cat: "DIY Kits", slug: "diy-kits" },
  "starter-maker-diy-electronics-kit": { cat: "DIY Kits", slug: "diy-kits" },
  "diy-soldering-practice-electronics-kit": { cat: "DIY Kits", slug: "diy-kits" },
  "diy-bluetooth-speaker-assembly-kit": { cat: "DIY Kits", slug: "diy-kits" }
};

async function fixDB() {
  const { data: dbProducts, error } = await sb.from('products').select('*');
  if (error) {
    console.error(error);
    return;
  }

  for (const p of dbProducts) {
    const target = EXACT_CANONICAL_CATEGORIES[p.slug];
    if (target) {
      const { error: updErr } = await sb.from('products').update({
        category_slug: target.slug
      }).eq('id', p.id);
      if (updErr) console.error(`Error updating ${p.name}:`, updErr);
      else console.log(`✓ Updated "${p.name}" (${p.slug}) -> category_slug: "${target.slug}"`);
    }
  }

  console.log('\nFinished updating all Supabase product category_slugs.');
}

fixDB();
