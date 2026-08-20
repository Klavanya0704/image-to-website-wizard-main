const fs = require('fs');

const CNC_PRODUCTS = [
  // Wood CNC Lab Products
  { name: "CNC Carved Wooden Wall Panel", slug: "cnc-carved-wooden-wall-panel", category: "Wood", image: "/products/cnc-carved-wooden-wall-panel.jpg" },
  { name: "CNC Wooden Sign Board", slug: "cnc-wooden-sign-board", category: "Wood", image: "/products/cnc-wooden-sign-board.jpg" },
  { name: "CNC Cut Wooden Mandala", slug: "cnc-cut-wooden-mandala", category: "Wood", image: "/products/cnc-cut-wooden-mandala.jpg" },
  { name: "CNC Wooden Decorative Panel", slug: "cnc-wooden-decorative-panel", category: "Wood", image: "/products/cnc-wooden-decorative-panel.jpg" },
  { name: "CNC Carved Furniture Panel", slug: "cnc-carved-furniture-panel", category: "Wood", image: "/products/cnc-carved-furniture-panel.jpg" },
  { name: "CNC Wooden Name Plate", slug: "cnc-wooden-name-plate", category: "Wood", image: "/products/cnc-wooden-name-plate.jpg" },
  { name: "CNC Cut Wooden Box", slug: "cnc-cut-wooden-box", category: "Wood", image: "/products/cnc-cut-wooden-box.jpg" },
  { name: "CNC Router Wooden Relief Art", slug: "cnc-wooden-relief-art", category: "Wood", image: "/products/cnc-wooden-relief-art.jpg" },

  // Metal CNC Lab Products
  { name: "CNC Aluminum Mounting Bracket", slug: "cnc-aluminum-mounting-bracket", category: "Metal", image: "/products/cnc-aluminum-mounting-bracket.jpg" },
  { name: "Precision CNC Flanged Bushing", slug: "precision-cnc-flanged-bushing", category: "Metal", image: "/products/precision-cnc-flanged-bushing.jpg" },
  { name: "CNC Machined Gear", slug: "cnc-machined-gear", category: "Metal", image: "/products/cnc-machined-gear.jpg" },
  { name: "CNC Stainless Steel Coupling", slug: "cnc-stainless-steel-coupling", category: "Metal", image: "/products/cnc-stainless-steel-coupling.jpg" },
  { name: "CNC Aluminum Fixture Plate", slug: "cnc-aluminum-fixture-plate", category: "Metal", image: "/products/cnc-aluminum-fixture-plate.jpg" },
  { name: "CNC Machined Linear Shaft", slug: "cnc-machined-linear-shaft", category: "Metal", image: "/products/cnc-machined-linear-shaft.jpg" },
  { name: "CNC Machined Prototype Component", slug: "cnc-machined-prototype-component", category: "Metal", image: "/products/cnc-machined-prototype-component.jpg" },
  { name: "CNC Metal Spacer & Bushing Set", slug: "cnc-metal-spacer-bushing-set", category: "Metal", image: "/products/cnc-metal-spacer-bushing-set.jpg" },
];

console.log("========================================================================");
console.log("COLLEGE CNC LAB PRODUCT CATALOG AUDIT (16 PRODUCTS)");
console.log("========================================================================\n");

const seen = new Set();
let duplicates = 0;
let missing = 0;

CNC_PRODUCTS.forEach((p, idx) => {
  const filePath = `public${p.image}`;
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  const isDup = seen.has(p.image);
  seen.add(p.image);

  if (!exists) missing++;
  if (isDup) duplicates++;

  console.log(`${idx + 1}. [${p.category}] ${p.name} (${p.slug})`);
  console.log(`   Image: ${p.image} (${size} bytes) | Exists: ${exists ? "YES" : "NO"} | Duplicate: ${isDup ? "YES" : "NO"}`);
});

console.log(`\nTotal Products: ${CNC_PRODUCTS.length} (8 Wood + 8 Metal)`);
console.log(`Unique Image Assets: ${seen.size}`);
console.log(`Missing Image Files: ${missing}`);
console.log(`Duplicate Images: ${duplicates}`);
