const fs = require('fs');

const CNC_PRODUCTS = [
  // Metal
  { name: "CNC Aluminum Mounting Bracket", slug: "cnc-aluminum-mounting-bracket", type: "Metal (Aluminum)", image: "/products/cnc-aluminum-mounting-bracket.jpg" },
  { name: "Precision CNC Flanged Bushing", slug: "precision-cnc-flanged-bushing", type: "Metal (Brass)", image: "/products/precision-cnc-flanged-bushing.jpg" },
  { name: "CNC Machined Gear", slug: "cnc-machined-gear", type: "Metal (Steel)", image: "/products/cnc-machined-gear.jpg" },
  { name: "CNC Stainless Steel Coupling", slug: "cnc-stainless-steel-coupling", type: "Metal (Stainless Steel)", image: "/products/cnc-stainless-steel-coupling.jpg" },
  { name: "CNC Aluminum Fixture Plate", slug: "cnc-aluminum-fixture-plate", type: "Metal (Aluminum)", image: "/products/cnc-aluminum-fixture-plate.jpg" },

  // Wood
  { name: "CNC Carved Wooden Wall Panel", slug: "cnc-carved-wooden-wall-panel", type: "Wood (Teak)", image: "/products/cnc-carved-wooden-wall-panel.jpg" },
  { name: "CNC Wooden Sign Board", slug: "cnc-wooden-sign-board", type: "Wood (Oak)", image: "/products/cnc-wooden-sign-board.jpg" },
  { name: "CNC Cut Wooden Mandala", slug: "cnc-cut-wooden-mandala", type: "Wood (Walnut)", image: "/products/cnc-cut-wooden-mandala.jpg" },
  { name: "CNC Wooden Decorative Panel", slug: "cnc-wooden-decorative-panel", type: "Wood (Mahogany)", image: "/products/cnc-wooden-decorative-panel.jpg" },
  { name: "CNC Carved Furniture Panel", slug: "cnc-carved-furniture-panel", type: "Wood (Cherry)", image: "/products/cnc-carved-furniture-panel.jpg" },
  { name: "CNC Wooden Name Plate", slug: "cnc-wooden-name-plate", type: "Wood (Walnut)", image: "/products/cnc-wooden-name-plate.jpg" },
  { name: "CNC Cut Wooden Box", slug: "cnc-cut-wooden-box", type: "Wood (Hardwood)", image: "/products/cnc-cut-wooden-box.jpg" },
];

console.log("=================================================================");
console.log("CNC MACHINING (METAL & WOOD) PRODUCTS & UNIQUE IMAGES AUDIT");
console.log("=================================================================\n");

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

  console.log(`${idx + 1}. [${p.type}] ${p.name} (${p.slug})`);
  console.log(`   Image: ${p.image} (${size} bytes) | Exists: ${exists ? "YES" : "NO"} | Duplicate: ${isDup ? "YES" : "NO"}`);
});

console.log(`\nTotal Products: ${CNC_PRODUCTS.length} (5 Metal + 7 Wood)`);
console.log(`Unique Image Assets: ${seen.size}`);
console.log(`Missing Image Files: ${missing}`);
console.log(`Duplicate Images: ${duplicates}`);
