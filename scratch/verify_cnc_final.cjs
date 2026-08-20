const fs = require('fs');

const CNC_PRODUCTS = [
  { name: "CNC Aluminum Mounting Bracket", slug: "cnc-aluminum-mounting-bracket", image: "/products/cnc-aluminum-mounting-bracket.jpg" },
  { name: "Precision CNC Flanged Bushing", slug: "precision-cnc-flanged-bushing", image: "/products/precision-cnc-flanged-bushing.jpg" },
  { name: "CNC Machined Gear", slug: "cnc-machined-gear", image: "/products/cnc-machined-gear.jpg" },
  { name: "CNC Aluminum Heat Sink", slug: "cnc-aluminum-heat-sink", image: "/products/cnc-aluminum-heat-sink.jpg" },
  { name: "CNC Stainless Steel Coupling", slug: "cnc-stainless-steel-coupling", image: "/products/cnc-stainless-steel-coupling.jpg" },
  { name: "CNC Machined Shaft", slug: "cnc-machined-shaft", image: "/products/cnc-machined-shaft.jpg" },
  { name: "CNC Metal Spacer Set", slug: "cnc-metal-spacer-set", image: "/products/cnc-metal-spacer-set.jpg" },
  { name: "CNC Precision Motor Mount", slug: "cnc-precision-motor-mount", image: "/products/cnc-precision-motor-mount.jpg" },
  { name: "CNC Machined Enclosure", slug: "cnc-machined-enclosure", image: "/products/cnc-machined-enclosure.jpg" },
  { name: "CNC Aluminum Fixture Plate", slug: "cnc-aluminum-fixture-plate", image: "/products/cnc-aluminum-fixture-plate.jpg" },
];

console.log("=== CNC MACHINING PRODUCTS & UNIQUE IMAGES AUDIT ===\n");
const seenImages = new Set();
let duplicates = 0;
let missing = 0;

CNC_PRODUCTS.forEach((p, i) => {
  const filePath = `public${p.image}`;
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  const isDuplicate = seenImages.has(p.image);
  seenImages.add(p.image);

  if (!exists) missing++;
  if (isDuplicate) duplicates++;

  console.log(`${i+1}. [${p.slug}] ${p.name}`);
  console.log(`   Image: ${p.image} (${size} bytes) | Exists: ${exists ? "YES" : "NO"} | Duplicate: ${isDuplicate ? "YES" : "NO"}`);
});

console.log(`\nTotal Products: ${CNC_PRODUCTS.length}`);
console.log(`Unique Images: ${seenImages.size}`);
console.log(`Missing Files: ${missing}`);
console.log(`Duplicate Images: ${duplicates}`);
