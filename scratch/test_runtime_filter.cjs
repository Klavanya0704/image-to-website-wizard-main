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

function normalizeCategorySlug(s) {
  if (!s) return "";
  const cleaned = s
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (cleaned === "3d-printing" || cleaned === "3d-print" || cleaned === "3dprinting") return "3d-printing";
  if (cleaned === "laser-cutting" || cleaned === "laser-cut" || cleaned === "lasercutting") return "laser-cutting";
  if (cleaned === "cnc-machining" || cleaned === "cnc" || cleaned === "cncmachining") return "cnc-machining";
  if (cleaned === "electronics" || cleaned === "electronic") return "electronics";
  if (cleaned === "drones-parts" || cleaned === "drones-and-parts" || cleaned === "drones" || cleaned === "drone-parts") return "drones-parts";
  if (cleaned === "acrylic-products" || cleaned === "acrylic" || cleaned === "acrylics") return "acrylic-products";
  if (cleaned === "diy-kits" || cleaned === "diy" || cleaned === "kits") return "diy-kits";

  return cleaned;
}

const EXACT_PRODUCT_CATEGORY_MAP = {
  // 1. 3D Printing
  "3d-printed-geometric-vase": "3d-printing",
  "geometric-spiral-vase": "3d-printing",
  "mini-desk-organizer": "3d-printing",
  "adjustable-phone-stand": "3d-printing",
  "universal-foldable-phone-stand-3d": "3d-printing",
  "cable-management-clip-set": "3d-printing",
  "resin-architectural-model": "3d-printing",
  "planter-pot-hex": "3d-printing",

  // 2. Laser Cutting
  "custom-name-keychain": "laser-cutting",
  "custom-engraved-wooden-keychain": "laser-cutting",
  "tree-of-life-lamp": "laser-cutting",
  "tree-of-life-led-lamp": "laser-cutting",
  "laser-cut-desk-organizer": "laser-cutting",
  "college-logo-board": "laser-cutting",
  "wooden-wall-art-mandala": "laser-cutting",
  "mandala-laser-cut-wooden-coasters": "laser-cutting",
  "laser-engraved-photo-frame": "laser-cutting",
  "custom-acrylic-led-illuminated-sign": "laser-cutting",
  "mdf-structural-architectural-puzzle-kit": "laser-cutting",

  // 3. CNC Machining
  "mechanical-prototype-model": "cnc-machining",
  "precision-aluminum-shaft-coupler": "cnc-machining",
  "cnc-aluminium-bracket": "cnc-machining",
  "heavy-duty-l-bracket-cnc": "cnc-machining",
  "precision-mounting-plate": "cnc-machining",
  "custom-cnc-component": "cnc-machining",
  "aluminium-prototype-block": "cnc-machining",
  "cnc-machined-flanged-brass-bushings": "cnc-machining",

  // 4. Electronics
  "esp32-development-board": "electronics",
  "esp32-iot-maker-board": "electronics",
  "arduino-sensor-kit": "electronics",
  "37-in-1-iot-sensor-module-kit": "electronics",
  "iot-starter-kit": "electronics",
  "led-electronics-kit": "electronics",
  "soldering-practice-board": "electronics",
  "fr4-double-sided-prototype-pcb-10pack": "electronics",
  "mini-robotics-kit": "electronics",

  // 5. Drones & Parts
  "drone-frame-kit": "drones-parts",
  "fpv-drone-carbon-fiber-frame": "drones-parts",
  "brushless-motor-mount": "drones-parts",
  "brushless-drone-motor-2207-2450kv": "drones-parts",
  "propeller-set-1045": "drones-parts",
  "5-inch-tri-blade-fpv-propellers": "drones-parts",
  "drone-landing-gear": "drones-parts",
  "fpv-prototype-frame": "drones-parts",

  // 6. Acrylic Products
  "acrylic-name-plate": "acrylic-products",
  "acrylic-keychain": "acrylic-products",
  "acrylic-desk-sign": "acrylic-products",
  "transparent-display-stand": "acrylic-products",
  "college-logo-acrylic-board": "acrylic-products",
  "clear-cast-acrylic-display-box": "acrylic-products",
  "custom-acrylic-trophy-plaque": "acrylic-products",
  "transparent-protective-acrylic-shield": "acrylic-products",

  // 7. DIY Kits
  "smart-home-diy-kit": "diy-kits",
  "mini-robot-kit": "diy-kits",
  "electronics-learning-kit": "diy-kits",
  "arduino-project-kit": "diy-kits",
  "drone-building-diy-kit": "diy-kits",
  "starter-maker-diy-electronics-kit": "diy-kits",
  "diy-soldering-practice-electronics-kit": "diy-kits",
  "diy-bluetooth-speaker-assembly-kit": "diy-kits"
};

function sanitizeProduct(p) {
  const slug = (p.slug || "").toLowerCase().trim();
  const name = (p.name || "").toLowerCase().trim();

  let canonicalSlug = EXACT_PRODUCT_CATEGORY_MAP[slug];
  if (!canonicalSlug) {
    canonicalSlug = normalizeCategorySlug(p.category_slug || p.category || "3d-printing");
  }

  return {
    ...p,
    categorySlug: canonicalSlug,
    category_slug: canonicalSlug,
    category: canonicalSlug
  };
}

const CATEGORIES = [
  "3d-printing",
  "laser-cutting",
  "cnc-machining",
  "electronics",
  "drones-parts",
  "acrylic-products",
  "diy-kits"
];

async function testFullPipeline() {
  const { data: rawData, error } = await sb.from('products').select('*');
  const allProducts = rawData.map(sanitizeProduct);

  console.log("==================================================");
  console.log("SANITY TEST: EXACT CATEGORY FILTERING AT RUNTIME");
  console.log("==================================================");

  for (const catSlug of CATEGORIES) {
    const categoryProducts = allProducts.filter(
      item => normalizeCategorySlug(item.categorySlug) === normalizeCategorySlug(catSlug)
    );

    console.log(`\nURL: /category/${catSlug} -> ${categoryProducts.length} Products:`);
    categoryProducts.forEach((p, idx) => {
      console.log(`  ${idx + 1}. [${p.categorySlug}] "${p.name}" (slug: "${p.slug}")`);
    });
  }
}

testFullPipeline();
