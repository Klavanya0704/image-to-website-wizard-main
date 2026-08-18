const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

let envContent = '';
if (fs.existsSync('.env.local')) envContent += fs.readFileSync('.env.local', 'utf8') + '\n';
if (fs.existsSync('.env')) envContent += fs.readFileSync('.env', 'utf8') + '\n';

const env = {};
envContent.split('\n').forEach(line => {
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

const EXACT_CATEGORY_MAP = {
  // 3D Printing
  "3D Printed Geometric Vase": "3d-printing",
  "Mini Desk Organizer": "3d-printing",
  "Adjustable Phone Stand": "3d-printing",
  "Cable Management Clip Set": "3d-printing",
  "Resin Architectural Model": "3d-printing",
  "Universal Foldable Phone Stand": "3d-printing",
  "SLA Resin High-Detail Miniature": "3d-printing",
  "TPU Flexible Drone & Electronics Enclosure": "3d-printing",

  // Laser Cutting
  "Custom Name Keychain": "laser-cutting",
  "Tree of Life LED Lamp": "laser-cutting",
  "Laser Cut Desk Organizer": "laser-cutting",
  "Wooden Mandala Wall Art": "laser-cutting",
  "Laser Engraved Photo Frame": "laser-cutting",
  "Custom LED Illuminated Acrylic Sign": "laser-cutting",
  "Geometric Mandala Wooden Coasters (4-Pack)": "laser-cutting",
  "Custom Laser-Engraved Wooden Keychain": "laser-cutting",
  "Laser-Cut MDF Structural Architectural Kit": "laser-cutting",

  // CNC Machining
  "Mechanical Gearbox Prototype Model": "cnc-machining",
  "Mechanical Gearbox Coupling": "cnc-machining",
  "Mechanical Coupling": "cnc-machining",
  "CNC Machined Aluminium Bracket": "cnc-machining",
  "Precision Mounting Plate": "cnc-machining",
  "Custom CNC Component (Made to Order)": "cnc-machining",
  "Aluminium Prototype Block": "cnc-machining",
  "Heavy-Duty CNC Aluminum Mounting Bracket": "cnc-machining",
  "Precision CNC Machined Flanged Brass Bushings (4-Pack)": "cnc-machining",

  // Electronics
  "ESP32 Development Board": "electronics",
  "ESP32 Dual-Core IoT Microcontroller Board": "electronics",
  "Arduino 16-in-1 Sensor Kit": "electronics",
  "37-in-1 Complete IoT Sensor Module Kit": "electronics",
  "LED & Display Electronics Kit": "electronics",
  "Soldering Practice Board": "electronics",
  "Double-Sided FR4 Prototype PCB Boards (10-Pack)": "electronics",

  // Drones & Parts
  "450mm Drone Frame Kit": "drones-parts",
  "Brushless Motor Mount (Set of 4)": "drones-parts",
  "1045 Propeller Set": "drones-parts",
  "Drone Landing Gear Set": "drones-parts",
  "FPV Prototype Frame 5 inch": "drones-parts",
  "5-inch FPV Racing Drone 3K Carbon Fiber Frame": "drones-parts",
  "2207 2450KV High-Thrust Brushless Drone Motors (4-Pack)": "drones-parts",
  "5-inch Tri-Blade Propellers (4 Pairs)": "drones-parts",

  // Acrylic Products
  "Custom College Logo Board": "acrylic-products",
  "Acrylic Name Plate": "acrylic-products",
  "Acrylic Keychain": "acrylic-products",
  "Acrylic Desk Sign": "acrylic-products",
  "Transparent Display Stand": "acrylic-products",
  "College Logo Acrylic Board": "acrylic-products",
  "Clear Cast Acrylic Dust-Proof Display Box": "acrylic-products",
  "Custom Engraved College Acrylic Award Trophy Stand": "acrylic-products",
  "High-Clarity Transparent Protective Acrylic Shield": "acrylic-products",

  // DIY Kits
  "Smart Home DIY Kit": "diy-kits",
  "Mini Line Follower Robot Kit": "diy-kits",
  "Electronics Learning Kit": "diy-kits",
  "Arduino Project Kit": "diy-kits",
  "Drone Building DIY Kit": "diy-kits",
  "IoT Starter Kit": "diy-kits",
  "Mini Robotics Controller Kit": "diy-kits",
  "All-in-One Autonomous Robotics STEM Starter Kit": "diy-kits",
  "DIY Soldering Practice & Electronics Training Kit": "diy-kits",
  "DIY Portable Bluetooth Stereo Speaker Build Kit": "diy-kits",
};

async function fixCategories() {
  const { data, error } = await sb.from('products').select('*');
  if (error) {
    console.error('Error fetching:', error);
    return;
  }

  console.log(`Fetched ${data.length} products. Applying exact category mapping...`);
  for (const product of data) {
    const correctCategory = EXACT_CATEGORY_MAP[product.name] || product.category_slug;
    console.log(`Product: "${product.name}" -> ${correctCategory}`);
    
    await sb
      .from('products')
      .update({ category_slug: correctCategory })
      .eq('id', product.id);
  }

  console.log('Database exact category normalization finished successfully.');
}

fixCategories();
