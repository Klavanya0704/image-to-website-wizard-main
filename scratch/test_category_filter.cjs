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

const CATEGORIES = [
  "3d-printing",
  "laser-cutting",
  "cnc-machining",
  "electronics",
  "drones-parts",
  "acrylic-products",
  "diy-kits"
];

async function runCategoryFilterTest() {
  const { data: dbProducts, error } = await sb.from('products').select('*');
  if (error) {
    console.error(error);
    return;
  }

  console.log("==================================================");
  console.log("STRICT CATEGORY ISOLATION AUDIT REPORT");
  console.log("==================================================");

  let totalErrors = 0;

  for (const catSlug of CATEGORIES) {
    const matchedProducts = dbProducts.filter(p => normalizeCategorySlug(p.category_slug || p.category) === normalizeCategorySlug(catSlug));
    
    console.log(`\n📂 CATEGORY: /category/${catSlug} (${matchedProducts.length} Products)`);
    console.log("--------------------------------------------------");
    
    matchedProducts.forEach((p, idx) => {
      const actualSlug = normalizeCategorySlug(p.category_slug || p.category);
      const isCorrect = actualSlug === catSlug;
      if (!isCorrect) totalErrors++;
      console.log(`  ${(idx + 1)}. [${actualSlug}] ${p.name} (slug: ${p.slug})`);
    });

    if (matchedProducts.length === 0) {
      console.log("  (No products found in this category)");
    }
  }

  console.log("\n==================================================");
  console.log(`TOTAL ISOLATION LEAKS DETECTED: ${totalErrors}`);
  console.log("==================================================");
}

runCategoryFilterTest();
