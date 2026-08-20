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

function normalizeCategorySlug(s) {
  if (!s) return "";
  let cleaned = s.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (cleaned === "3d-printing" || cleaned === "3d-print") return "3d-printing";
  if (cleaned === "laser-cutting" || cleaned === "laser-cut") return "laser-cutting";
  if (cleaned === "cnc-machining" || cleaned === "cnc") return "cnc-machining";
  if (cleaned === "electronics" || cleaned === "electronic") return "electronics";
  if (cleaned === "drones-parts" || cleaned === "drones-and-parts" || cleaned === "drones") return "drones-parts";
  if (cleaned === "acrylic-products" || cleaned === "acrylic") return "acrylic-products";
  if (cleaned === "diy-kits" || cleaned === "diy") return "diy-kits";
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

  // 2. Laser Cutting (Wood, Glass & Acrylic)
  "custom-name-keychain": "laser-cutting",
  "custom-engraved-wooden-keychain": "laser-cutting",
  "tree-of-life-lamp": "laser-cutting",
  "tree-of-life-led-lamp": "laser-cutting",
  "laser-cut-desk-organizer": "laser-cutting",
  "wooden-wall-art-mandala": "laser-cutting",
  "mandala-laser-cut-wooden-coasters": "laser-cutting",
  "laser-engraved-photo-frame": "laser-cutting",
  "custom-acrylic-led-sign": "laser-cutting",
  "custom-acrylic-led-illuminated-sign": "laser-cutting",
  "laser-engraved-glass-trophy": "laser-cutting",
  "frosted-glass-laser-engraving": "laser-cutting",
  "laser-cut-acrylic-name-plate": "laser-cutting",
  "acrylic-decorative-panel": "laser-cutting",

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
  "diy-bluetooth-speaker-assembly-kit": "diy-kits",
};

const EXACT_SLUG_IMAGE_MAP = {
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
  "3d-printed-geometric-vase": "/products/3d-printed-geometric-vase.jpg",
  "mini-desk-organizer": "/products/mini-desk-organizer.jpg",
  "adjustable-phone-stand": "/products/adjustable-phone-stand.jpg",
  "cable-management-clip-set": "/products/cable-management-clip-set.jpg",
  "resin-architectural-model": "/products/resin-architectural-model.jpg",
  "mechanical-prototype-model": "/products/mechanical-prototype-model.jpg",
  "cnc-aluminium-bracket": "/products/cnc-aluminium-bracket.jpg",
  "precision-mounting-plate": "/products/precision-mounting-plate.jpg",
  "custom-cnc-component": "/products/custom-cnc-component.jpg",
  "aluminium-prototype-block": "/products/aluminium-prototype-block.jpg",
  "esp32-development-board": "/products/esp32-development-board.jpg",
  "arduino-sensor-kit": "/products/arduino-sensor-kit.jpg",
  "iot-starter-kit": "/products/iot-starter-kit.jpg",
  "led-electronics-kit": "/products/led-electronics-kit.jpg",
  "soldering-practice-board": "/products/soldering-practice-board.jpg",
  "mini-robotics-kit": "/products/mini-robotics-kit.jpg",
  "drone-frame-kit": "/products/drone-frame-kit.jpg",
  "brushless-motor-mount": "/products/brushless-motor-mount.jpg",
  "propeller-set-1045": "/products/propeller-set-1045.jpg",
  "drone-landing-gear": "/products/drone-landing-gear.jpg",
  "fpv-prototype-frame": "/products/fpv-prototype-frame.jpg",
  "acrylic-name-plate": "/products/acrylic-name-plate.jpg",
  "acrylic-keychain": "/products/acrylic-keychain.jpg",
  "acrylic-desk-sign": "/products/acrylic-desk-sign.jpg",
  "transparent-display-stand": "/products/transparent-display-stand.jpg",
  "college-logo-acrylic-board": "/products/college-logo-acrylic-board.jpg",
  "smart-home-diy-kit": "/products/smart-home-diy-kit.jpg",
  "mini-robot-kit": "/products/mini-robot-kit.jpg",
  "electronics-learning-kit": "/products/electronics-learning-kit.jpg",
  "arduino-project-kit": "/products/arduino-project-kit.jpg",
  "drone-building-diy-kit": "/products/drone-building-diy-kit.jpg",
};

function sanitizeProduct(p) {
  const slug = (p.slug || "").toLowerCase().trim();
  let canonicalSlug = EXACT_PRODUCT_CATEGORY_MAP[slug];
  if (!canonicalSlug) {
    canonicalSlug = normalizeCategorySlug(p.category_slug || p.categorySlug || p.category || "3d-printing");
  }
  return {
    ...p,
    categorySlug: canonicalSlug,
    category_slug: canonicalSlug,
    category: p.category || canonicalSlug,
  };
}

const DEFAULT_PRODUCTS = [
  { name: "Custom Name Keychain", slug: "custom-name-keychain", category_slug: "laser-cutting", price: 199, discount_price: 149 },
  { name: "Tree of Life LED Lamp", slug: "tree-of-life-lamp", category_slug: "laser-cutting", price: 1499, discount_price: 1199 },
  { name: "Laser Cut Desk Organizer", slug: "laser-cut-desk-organizer", category_slug: "laser-cutting", price: 899, discount_price: 699 },
  { name: "Wooden Mandala Wall Art", slug: "wooden-wall-art-mandala", category_slug: "laser-cutting", price: 1299, discount_price: 999 },
  { name: "Laser Engraved Photo Frame", slug: "laser-engraved-photo-frame", category_slug: "laser-cutting", price: 699, discount_price: 549 },
  { name: "Custom Acrylic LED Sign", slug: "custom-acrylic-led-sign", category_slug: "laser-cutting", price: 1499, discount_price: 1199 },
  { name: "Laser Engraved Glass Trophy", slug: "laser-engraved-glass-trophy", category_slug: "laser-cutting", price: 1799, discount_price: 1399 },
  { name: "Frosted Glass Laser Engraving", slug: "frosted-glass-laser-engraving", category_slug: "laser-cutting", price: 899, discount_price: 699 },
  { name: "Laser Cut Acrylic Name Plate", slug: "laser-cut-acrylic-name-plate", category_slug: "laser-cutting", price: 499, discount_price: 399 },
  { name: "Acrylic Decorative Panel", slug: "acrylic-decorative-panel", category_slug: "laser-cutting", price: 1599, discount_price: 1299 },
];

async function verify() {
  const { data: dbData } = await supabase.from('products').select('*');
  const sanitizedDb = (dbData || []).filter(p => p.slug !== 'college-logo-board').map(sanitizeProduct);
  const dbSlugs = new Set(sanitizedDb.map(p => p.slug));
  const missingDefaults = DEFAULT_PRODUCTS.filter(p => !dbSlugs.has(p.slug)).map(sanitizeProduct);
  const allProducts = [...sanitizedDb, ...missingDefaults];

  const categories = [
    "laser-cutting",
    "3d-printing",
    "cnc-machining",
    "electronics",
    "drones-parts",
    "acrylic-products",
    "diy-kits"
  ];

  console.log("=========================================================");
  console.log("FINAL COMPREHENSIVE CATEGORY & IMAGE AUDIT");
  console.log("=========================================================\n");

  for (const cat of categories) {
    const prods = allProducts.filter(p => normalizeCategorySlug(p.categorySlug) === normalizeCategorySlug(cat));
    console.log(`\nROUTE: /category/${cat} (${prods.length} Products):`);
    prods.forEach((p, idx) => {
      const imgPath = EXACT_SLUG_IMAGE_MAP[p.slug] || `/products/${p.slug}.jpg`;
      const exists = fs.existsSync(`public${imgPath}`);
      console.log(`  ${idx+1}. [${p.slug}] ${p.name} -> Image: ${imgPath} (Exists: ${exists ? "YES" : "MISSING"})`);
    });
  }
}

verify();
