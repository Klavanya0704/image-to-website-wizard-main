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

const NEW_LASER_PRODUCTS = [
  {
    name: "Custom Acrylic LED Sign",
    slug: "custom-acrylic-led-sign",
    category_slug: "laser-cutting",
    image_key: "custom-acrylic-led-sign",
    price: 1499,
    discount_price: 1199,
    rating: 4.9,
    review_count: 64,
    bestseller: true,
    featured: true,
    stock: 35,
    short_description: "Precision laser cut edge-lit optical acrylic desk plaque with solid walnut wood LED base.",
    description: "High optical clarity cast acrylic plate with vector laser engraved emblem. Features warm white LED illumination nestled inside a solid walnut base.",
    specifications: { Material: "5mm Clear Cast Acrylic & Solid Walnut", Lighting: "Warm White LED (USB Powered)", Dimensions: "180 × 150 × 40 mm" },
    active: true,
    created_at: "2026-01-10T00:00:00Z"
  },
  {
    name: "Laser Engraved Glass Trophy",
    slug: "laser-engraved-glass-trophy",
    category_slug: "laser-cutting",
    image_key: "laser-engraved-glass-trophy",
    price: 1799,
    discount_price: 1399,
    rating: 5.0,
    review_count: 42,
    bestseller: true,
    featured: true,
    stock: 25,
    short_description: "Faceted optical crystal glass award with high precision 3D subsurface laser engraving.",
    description: "Premium octagonal beveled optical crystal trophy featuring subsurface 3D laser-etched star emblem and crisp surface laser typography.",
    specifications: { Material: "K9 Optical Crystal Glass", Technique: "Surface & 3D Subsurface Laser Etching", Weight: "680g" },
    active: true,
    created_at: "2026-01-11T00:00:00Z"
  },
  {
    name: "Frosted Glass Laser Engraving",
    slug: "frosted-glass-laser-engraving",
    category_slug: "laser-cutting",
    image_key: "frosted-glass-laser-engraving",
    price: 899,
    discount_price: 699,
    rating: 4.8,
    review_count: 28,
    bestseller: false,
    featured: false,
    stock: 40,
    short_description: "Botanical artwork etched on frosted tempered glass with stainless steel standoffs.",
    description: "Intricate laser-etched floral artwork on satin-finish frosted safety glass. Includes 4 stainless steel wall standoff mounts.",
    specifications: { Material: "Frosted Tempered Glass (4mm)", Mounting: "Brushed Steel Standoffs Included", Dimensions: "250 × 250 mm" },
    active: true,
    created_at: "2026-01-12T00:00:00Z"
  },
  {
    name: "Laser Cut Acrylic Name Plate",
    slug: "laser-cut-acrylic-name-plate",
    category_slug: "laser-cutting",
    image_key: "laser-cut-acrylic-name-plate",
    price: 499,
    discount_price: 399,
    rating: 4.9,
    review_count: 53,
    bestseller: true,
    featured: false,
    stock: 60,
    short_description: "Dual-layer black and clear acrylic executive desk nameplate with laser engraved gold text.",
    description: "Executive desktop nameplate featuring laser cut high-gloss black acrylic with precision laser-engraved metallic gold lettering and beveled edges.",
    specifications: { Material: "High-Gloss Cast Acrylic", Style: "Beveled Chamfer Edge", Dimensions: "200 × 50 × 45 mm" },
    active: true,
    created_at: "2026-01-13T00:00:00Z"
  },
  {
    name: "Acrylic Decorative Panel",
    slug: "acrylic-decorative-panel",
    category_slug: "laser-cutting",
    image_key: "acrylic-decorative-panel",
    price: 1599,
    discount_price: 1299,
    rating: 4.7,
    review_count: 19,
    bestseller: false,
    featured: false,
    stock: 20,
    short_description: "Translucent frosted acrylic decorative panel with geometric laser-cut lattice fretwork.",
    description: "Modern architectural acrylic room and window screen panel featuring intricate laser-cut lattice patterns. Translucent satin finish diffuses soft ambient light.",
    specifications: { Material: "4mm Satin Frosted Acrylic", Pattern: "Geometric Moroccan Lattice", Dimensions: "400 × 300 × 4 mm" },
    active: true,
    created_at: "2026-01-14T00:00:00Z"
  }
];

async function updateDatabase() {
  // 1. Delete or remove college-logo-board from laser-cutting
  console.log("Removing college-logo-board from Laser Cutting...");
  const delRes = await supabase
    .from('products')
    .delete()
    .eq('slug', 'college-logo-board');
  console.log("Delete college-logo-board result:", delRes.error || "DELETED");

  // 2. Insert or update the 5 new glass/acrylic laser cutting products
  for (const item of NEW_LASER_PRODUCTS) {
    const { data: existing } = await supabase.from('products').select('id').eq('slug', item.slug).maybeSingle();
    if (existing) {
      const { error } = await supabase.from('products').update(item).eq('slug', item.slug);
      console.log(`Updated ${item.name}:`, error ? error.message : "SUCCESS");
    } else {
      const { error } = await supabase.from('products').insert([item]);
      console.log(`Inserted ${item.name}:`, error ? error.message : "SUCCESS");
    }
  }

  // 3. Update category description for laser-cutting
  const catDesc = "High-precision laser cutting & engraving across natural hardwood, optical acrylic, and frosted crystal glass.";
  await supabase.from('categories').update({ description: catDesc }).eq('slug', 'laser-cutting');
  console.log("Updated category description for laser-cutting.");
}

updateDatabase();
