const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v) env[k.trim()] = v.join('=').trim().replace(/^["']|["']$/g, '');
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_PUBLISHABLE_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

const EXACT_UPDATES = [
  // 1. 3D Printing (5)
  { slug: "3d-printed-geometric-vase", category_slug: "3d-printing" },
  { slug: "adjustable-phone-stand", category_slug: "3d-printing" },
  { slug: "mini-desk-organizer", category_slug: "3d-printing" },
  { slug: "cable-management-clip-set", category_slug: "3d-printing" },
  { slug: "resin-architectural-model", category_slug: "3d-printing" },

  // 2. Laser Cutting (6)
  { slug: "custom-name-keychain", category_slug: "laser-cutting" },
  { slug: "tree-of-life-lamp", category_slug: "laser-cutting" },
  { slug: "college-logo-board", category_slug: "laser-cutting" },
  { slug: "wooden-wall-art-mandala", category_slug: "laser-cutting" },
  { slug: "laser-cut-desk-organizer", category_slug: "laser-cutting" },
  { slug: "laser-engraved-photo-frame", category_slug: "laser-cutting" },

  // 3. CNC Machining (5)
  { slug: "mechanical-prototype-model", category_slug: "cnc-machining" },
  { slug: "cnc-aluminium-bracket", category_slug: "cnc-machining" },
  { slug: "precision-mounting-plate", category_slug: "cnc-machining" },
  { slug: "custom-cnc-component", category_slug: "cnc-machining" },
  { slug: "aluminium-prototype-block", category_slug: "cnc-machining" },

  // 4. Electronics (6)
  { slug: "esp32-development-board", category_slug: "electronics" },
  { slug: "arduino-sensor-kit", category_slug: "electronics" },
  { slug: "iot-starter-kit", category_slug: "electronics" },
  { slug: "led-electronics-kit", category_slug: "electronics" },
  { slug: "soldering-practice-board", category_slug: "electronics" },
  { slug: "mini-robotics-kit", category_slug: "electronics" },

  // 5. Drones & Parts (5)
  { slug: "drone-frame-kit", category_slug: "drones-parts" },
  { slug: "brushless-motor-mount", category_slug: "drones-parts" },
  { slug: "propeller-set-1045", category_slug: "drones-parts" },
  { slug: "drone-landing-gear", category_slug: "drones-parts" },
  { slug: "fpv-prototype-frame", category_slug: "drones-parts" },

  // 6. Acrylic Products (5)
  { slug: "acrylic-name-plate", category_slug: "acrylic-products" },
  { slug: "acrylic-keychain", category_slug: "acrylic-products" },
  { slug: "acrylic-desk-sign", category_slug: "acrylic-products" },
  { slug: "transparent-display-stand", category_slug: "acrylic-products" },
  { slug: "college-logo-acrylic-board", category_slug: "acrylic-products" },

  // 7. DIY Kits (5)
  { slug: "smart-home-diy-kit", category_slug: "diy-kits" },
  { slug: "mini-robot-kit", category_slug: "diy-kits" },
  { slug: "electronics-learning-kit", category_slug: "diy-kits" },
  { slug: "arduino-project-kit", category_slug: "diy-kits" },
  { slug: "drone-building-diy-kit", category_slug: "diy-kits" },
];

async function updateDb() {
  for (const item of EXACT_UPDATES) {
    const { error } = await supabase
      .from('products')
      .update({
        category_slug: item.category_slug,
        image_key: item.slug
      })
      .eq('slug', item.slug);

    if (error) {
      console.error(`Failed to update ${item.slug}:`, error.message);
    } else {
      console.log(`Updated ${item.slug} -> category_slug: ${item.category_slug}`);
    }
  }
  console.log('Database synchronization complete.');
}

updateDb();
