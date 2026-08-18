import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Product = Tables<"products"> & {
  categorySlug?: string;
  category?: string;
};
export type Category = Tables<"categories">;
export type Review = Tables<"reviews">;
export type Order = Tables<"orders">;
export type OrderItem = Tables<"order_items">;
export type Address = Tables<"addresses">;
export type Enquiry = Tables<"enquiries">;

export const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: async (): Promise<Category[]> => {
    const { data, error } = await supabase.from("categories").select("*").order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
  staleTime: 5 * 60_000,
});

export const DEFAULT_CATALOG_PRODUCTS: Product[] = [
  // ==========================================
  // 1. 3D PRINTING PRODUCTS (category: "3D Printing" / "3d-printing")
  // ==========================================
  {
    id: "3dp-1",
    name: "3D Printed Geometric Vase",
    slug: "geometric-spiral-vase",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "vase",
    price: 599,
    discount_price: 499,
    material: "PLA Pro Matte",
    dimensions: "120 × 120 × 200 mm",
    manufacturing_method: "FDM 3D Printing (0.16mm Layer Height)",
    rating: 4.8,
    review_count: 120,
    bestseller: true,
    stock: 45,
    short_description: "Modern spiral lattice geometry 3D printed vase for desktop & home decor.",
    description:
      "Precision 3D printed geometric spiral vase with intricate lattice mesh geometry. Made from eco-friendly matte PLA with high tensile strength and a waterproof inner wall coating.",
    specifications: {
      "Print Tech": "FDM 3D Printing",
      "Layer Height": "0.16mm Fine",
      Infill: "20% Gyroid",
      Weight: "180g",
      "Water Resistance": "Coated Interior",
    },
    sku: "3DP-VASE-001",
    subcategory: "Geometric Vases",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "3dp-2",
    name: "Universal Foldable Phone Stand",
    slug: "universal-foldable-phone-stand-3d",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "stand",
    price: 349,
    discount_price: 249,
    material: "High-Strength Tough PLA",
    dimensions: "100 × 75 × 15 mm (Folded)",
    manufacturing_method: "Print-in-Place FDM Printing",
    rating: 4.9,
    review_count: 85,
    bestseller: true,
    stock: 60,
    short_description: "Adjustable multi-angle print-in-place foldable phone and tablet stand.",
    description:
      "Sturdy, compact print-in-place phone stand with 6 adjustable viewing angles. Features integrated cable routing channel and non-slip rubber grip base.",
    specifications: {
      Compatibility: "Smartphones & Tablets up to 11 inches",
      Angles: "6 Adjustable Stepped Positions",
      Weight: "45g",
    },
    sku: "3DP-STN-002",
    subcategory: "Phone Stands",
    active: true,
    featured: true,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "3dp-3",
    name: "SLA Resin High-Detail Miniature",
    slug: "sla-resin-high-detail-miniature",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "vase",
    price: 899,
    discount_price: 699,
    material: "UV Tough Photopolymer Resin (8K Resolution)",
    dimensions: "75 × 50 × 110 mm",
    manufacturing_method: "SLA / MSLA 3D Printing (0.025mm Layers)",
    rating: 4.9,
    review_count: 64,
    bestseller: false,
    stock: 20,
    short_description: "Ultra-high resolution 8K SLA resin printed tabletop collectible figurine.",
    description:
      "Ultra-fine 0.025mm layer height photopolymer resin miniature with crisp edge fidelity, sharp facial textures, and smooth post-cured finish.",
    specifications: {
      Resolution: "8K UV LCD (28.5µm XY)",
      "Layer Thickness": "25 Microns",
      Curing: "405nm UV Chamber Baked",
    },
    sku: "3DP-MIN-003",
    subcategory: "SLA Resin Miniatures",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },
  {
    id: "3dp-4",
    name: "TPU Flexible Drone & Electronics Enclosure",
    slug: "tpu-flexible-drone-enclosure",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "drone",
    price: 649,
    discount_price: 499,
    material: "Thermoplastic Polyurethane (95A Durometer)",
    dimensions: "85 × 60 × 35 mm",
    manufacturing_method: "Direct-Drive TPU 3D Printing",
    rating: 4.8,
    review_count: 42,
    bestseller: false,
    stock: 35,
    short_description:
      "Shock-absorbing flexible TPU rugged protective case for drone avionics and sensors.",
    description:
      "Impact-resistant 95A TPU housing providing vibration damping, scratch protection, and splash resistance for electronics and drone flight cameras.",
    specifications: {
      Hardness: "Shore 95A Flexible",
      "Impact Resistance": "High Elastic Rebound",
      Temp: "Withstands up to 85°C",
    },
    sku: "3DP-TPU-004",
    subcategory: "TPU Flexible Enclosures",
    active: true,
    featured: false,
    created_at: "2026-01-04T00:00:00Z",
  },

  // ==========================================
  // 2. LASER CUTTING PRODUCTS (category: "Laser Cutting" / "laser-cutting")
  // ==========================================
  {
    id: "lc-1",
    name: "Custom LED Illuminated Acrylic Sign",
    slug: "custom-acrylic-led-illuminated-sign",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "lamp",
    price: 1599,
    discount_price: 1299,
    material: "Optical Cast Acrylic & Solid Walnut Base",
    dimensions: "200 × 160 × 50 mm",
    manufacturing_method: "CO2 Laser Vector Cut & Surface Etch",
    rating: 4.9,
    review_count: 78,
    bestseller: true,
    stock: 30,
    short_description:
      "Personalized glowing laser-etched edge-lit acrylic desk nameplate or logo sign.",
    description:
      "Custom laser-etched acrylic panel illuminated by warm white edge-emitting LEDs set in a solid wooden base. Connects via standard USB.",
    specifications: {
      "Panel Thickness": "5mm Optical Cast Acrylic",
      Lighting: "Warm White 3000K LED Strip",
      Power: "5V USB (1.5m Cable with Switch)",
    },
    sku: "LC-SGN-001",
    subcategory: "Acrylic Signs",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "lc-2",
    name: "Geometric Mandala Wooden Coasters (4-Pack)",
    slug: "mandala-laser-cut-wooden-coasters",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "keychain",
    price: 499,
    discount_price: 399,
    material: "Eco-Friendly Walnut Plywood & Cork Base",
    dimensions: "95 × 95 × 4 mm (Each)",
    manufacturing_method: "High-Precision Vector Laser Cutting",
    rating: 4.8,
    review_count: 42,
    bestseller: false,
    stock: 50,
    short_description:
      "Set of 4 intricate laser-carved walnut wooden drink coasters with cork backing.",
    description:
      "Set of 4 botanical and geometric mandala coasters laser engraved into dark walnut with waterproof polyurethane seal.",
    specifications: {
      Quantity: "4 Coasters + Wooden Holder",
      Thickness: "4mm Walnut + 1mm Cork",
      Finish: "Heat Resistant Clear Seal",
    },
    sku: "LC-CST-002",
    subcategory: "Wooden Coasters",
    active: true,
    featured: false,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "lc-3",
    name: "Custom Laser-Engraved Wooden Keychain",
    slug: "custom-engraved-wooden-keychain",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "keychain",
    price: 199,
    discount_price: 149,
    material: "Natural Birch Wood & Stainless Steel Ring",
    dimensions: "50 × 25 × 4 mm",
    manufacturing_method: "CO2 Laser Cutting & Deep Vector Engraving",
    rating: 4.9,
    review_count: 95,
    bestseller: true,
    stock: 120,
    short_description:
      "Personalized laser-engraved birch wooden keychain with polished steel keyring.",
    description:
      "Custom engraved wooden keychain crafted using high-precision CO2 laser engraving. Personalized with your custom college name, lab ID, or student initials with clear protective varnish.",
    specifications: {
      "Laser Type": "100W CO2 Laser",
      "Engrave Depth": "0.8mm",
      "Ring Material": "Grade 304 Stainless Steel",
      Coating: "Natural Beeswax Finish",
    },
    sku: "LC-KEY-003",
    subcategory: "Custom Keychains",
    active: true,
    featured: true,
    created_at: "2026-01-03T00:00:00Z",
  },
  {
    id: "lc-4",
    name: "Laser-Cut MDF Structural Architectural Kit",
    slug: "mdf-structural-architectural-puzzle-kit",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "keychain",
    price: 799,
    discount_price: 599,
    material: "3mm High-Density Engineered MDF",
    dimensions: "250 × 180 × 120 mm (Assembled)",
    manufacturing_method: "Precision Laser Micro-Kerf Cutting",
    rating: 4.8,
    review_count: 36,
    bestseller: false,
    stock: 40,
    short_description:
      "Snap-fit laser cut 3D architectural bridge and truss structural analysis model.",
    description:
      "Snap-together interlocking wooden architectural bridge structural truss model kit designed for civil engineering and STEM mechanics education.",
    specifications: {
      "Piece Count": "48 Laser-Cut Interlocking Parts",
      Assembly: "No Glue Required (Friction Fit)",
      Material: "Eco 3mm MDF Sheet",
    },
    sku: "LC-MDF-004",
    subcategory: "MDF Structural Kits",
    active: true,
    featured: false,
    created_at: "2026-01-04T00:00:00Z",
  },

  // ==========================================
  // 3. CNC MACHINING PRODUCTS (category: "CNC Machining" / "cnc-machining")
  // ==========================================
  {
    id: "cnc-1",
    name: "Mechanical Gearbox Coupling",
    slug: "precision-aluminum-shaft-coupler",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image_key: "cnc",
    price: 1599,
    discount_price: 1299,
    material: "6061-T6 Aircraft Grade Aluminum",
    dimensions: "25mm Outer Dia × 30mm Length (5mm to 8mm Bore)",
    manufacturing_method: "4-Axis CNC Milling & Turning",
    rating: 4.7,
    review_count: 80,
    bestseller: false,
    stock: 30,
    short_description: "High-precision CNC machined flexible aluminum shaft coupling for robotics.",
    description:
      "High-precision CNC machined flexible aluminum shaft coupling for NEMA 17 stepper motors, 3D printers, CNC routers, and robotics drivetrains. Zero backlash with spiral cut flexure.",
    specifications: {
      "Bore Diameters": "5mm to 8mm",
      "Outer Diameter": "25mm",
      "Max RPM": "10,000 RPM",
      "Torque Rating": "2.5 N·m",
      Hardware: "M3 Set Screws (Included)",
    },
    sku: "CNC-CPL-001",
    subcategory: "Mechanical Gearbox Parts",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cnc-2",
    name: "Heavy-Duty CNC Aluminum Mounting Bracket",
    slug: "heavy-duty-l-bracket-cnc",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image_key: "cnc",
    price: 1199,
    discount_price: 899,
    material: "Anodized 6061-T6 Aluminum",
    dimensions: "75 × 75 × 40 mm",
    manufacturing_method: "CNC High-Speed Milling & Chamfering",
    rating: 4.7,
    review_count: 110,
    bestseller: false,
    stock: 50,
    short_description: "Heavy-duty 90-degree CNC aluminum corner bracket.",
    description:
      "Heavy-duty CNC milled structural L-bracket engineered for 2020/4040 aluminum extrusion frames, CNC routers, and heavy payload robotics. Includes precision M5 counterbores.",
    specifications: {
      "Extrusion Profile": "2020 / 4040 T-Slot",
      "Hole Pattern": "4 x M5 Countersunk",
      Thickness: "6mm Reinforced",
      "Surface Finish": "Bead Blasted & Anodized",
    },
    sku: "CNC-BRK-002",
    subcategory: "Aluminum Mounting Brackets",
    active: true,
    featured: true,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "cnc-3",
    name: "Precision CNC Machined Flanged Brass Bushings (4-Pack)",
    slug: "cnc-machined-flanged-brass-bushings",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image_key: "cnc",
    price: 699,
    discount_price: 499,
    material: "High-Grade Bearing Brass (CuZn39Pb3)",
    dimensions: "8mm ID × 12mm OD × 15mm Length (16mm Flange)",
    manufacturing_method: "Precision CNC Lathe Turning & Polishing",
    rating: 4.9,
    review_count: 46,
    bestseller: false,
    stock: 70,
    short_description: "Pack of 4 ultra-smooth low-friction CNC turned flanged sleeve bearings.",
    description:
      "Self-lubricating precision machined flanged brass bushings engineered for linear rod motion, 3D printer Z-axis rods, and robotics pivot linkages.",
    specifications: {
      "Internal Diameter": "8.00mm (+0.01 / -0.00mm)",
      "Outer Diameter": "12.00mm",
      Flange: "16mm OD × 2mm Thick",
      Package: "4 Bushings per Set",
    },
    sku: "CNC-BSH-003",
    subcategory: "Brass Bushings",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },

  // ==========================================
  // 4. ELECTRONICS PRODUCTS (category: "Electronics" / "electronics")
  // ==========================================
  {
    id: "elec-1",
    name: "ESP32 Dual-Core IoT Microcontroller Board",
    slug: "esp32-iot-maker-board",
    category: "Electronics",
    category_slug: "electronics",
    categorySlug: "electronics",
    image_key: "esp32",
    price: 799,
    discount_price: 599,
    material: "FR4 2-Layer Immersion Gold PCB",
    dimensions: "65 × 45 × 12 mm",
    manufacturing_method: "SMT Pick & Place Assembly",
    rating: 4.9,
    review_count: 140,
    bestseller: true,
    stock: 80,
    short_description: "ESP32 dual-core Wi-Fi & Bluetooth IoT development board.",
    description:
      "Feature-rich ESP32 development board tailored for student lab projects, smart automation, robotics control, and IoT prototyping with USB-C flashing.",
    specifications: {
      Microcontroller: "ESP32-WROOM-32D Dual Core 240MHz",
      Connectivity: "Wi-Fi 802.11 b/g/n + BLE 4.2",
      Port: "USB Type-C with CP2102",
      GPIOs: "32 Breakout Pins",
    },
    sku: "ELEC-ESP-001",
    subcategory: "Microcontroller Boards",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "elec-2",
    name: "37-in-1 Complete IoT Sensor Module Kit",
    slug: "37-in-1-iot-sensor-module-kit",
    category: "Electronics",
    category_slug: "electronics",
    categorySlug: "electronics",
    image_key: "esp32",
    price: 1899,
    discount_price: 1499,
    material: "FR4 Surface Mount Sensor Modules",
    dimensions: "220 × 160 × 45 mm (Storage Box)",
    manufacturing_method: "High-Volume Automated SMT",
    rating: 4.9,
    review_count: 112,
    bestseller: true,
    stock: 45,
    short_description:
      "Ultimate 37-piece sensor module kit for Arduino, ESP32 and Raspberry Pi projects.",
    description:
      "Includes ultrasonic distance, temperature & humidity (DHT11), IR obstacle, sound detection, flame sensor, relay, joystick, and 30 other standard lab modules with pinout guide.",
    specifications: {
      "Module Count": "37 Essential Modules",
      Voltage: "3.3V / 5V Compatible",
      Storage: "Divided Plastic Organizer Box",
    },
    sku: "ELEC-SNS-002",
    subcategory: "IoT Sensor Kits",
    active: true,
    featured: false,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "elec-3",
    name: "Double-Sided FR4 Prototype PCB Boards (10-Pack)",
    slug: "fr4-double-sided-prototype-pcb-10pack",
    category: "Electronics",
    category_slug: "electronics",
    categorySlug: "electronics",
    image_key: "esp32",
    price: 499,
    discount_price: 349,
    material: "High-Grade FR4 Glass Epoxy (1.6mm)",
    dimensions: "50 × 70 mm (Standard Grid)",
    manufacturing_method: "Plated Through-Hole (PTH) PCB Fabrication",
    rating: 4.8,
    review_count: 58,
    bestseller: false,
    stock: 90,
    short_description:
      "Set of 10 gold-plated double-sided universal perfboards for circuit prototyping.",
    description:
      "High quality 2.54mm pitch plated-through hole prototype PCBs with pre-tinned solder pads, corner mounting holes, and silkscreen column/row markings.",
    specifications: {
      Pitch: "2.54mm (0.1 inch)",
      Quantity: "10 Pieces",
      "Hole Diameter": "1.0mm Plated",
    },
    sku: "ELEC-PCB-003",
    subcategory: "PCB Boards",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },

  // ==========================================
  // 5. DRONES & PARTS (category: "Drones & Parts" / "drones-parts")
  // ==========================================
  {
    id: "drn-1",
    name: "5-inch FPV Racing Drone 3K Carbon Fiber Frame",
    slug: "fpv-drone-carbon-fiber-frame",
    category: "Drones & Parts",
    category_slug: "drones-parts",
    categorySlug: "drones-parts",
    image_key: "drone",
    price: 2499,
    discount_price: 1999,
    material: "3K Full Carbon Fiber (4mm Arms)",
    dimensions: "220mm Wheelbase (5-inch Props)",
    manufacturing_method: "CNC Carbon Fiber Routing",
    rating: 4.8,
    review_count: 45,
    bestseller: false,
    stock: 20,
    short_description: "Aerodynamic 5-inch FPV drone freestyle & racing frame.",
    description:
      "Sturdy 3K twill weave carbon fiber quadcopter frame engineered for 5-inch racing and freestyle drones. Chamfered edges with titanium mounting hardware.",
    specifications: {
      Wheelbase: "220mm Diagonal",
      "Arm Thickness": "4mm",
      "Top Plate": "2mm",
      Weight: "115g (Hardware included)",
    },
    sku: "DRN-FRM-001",
    subcategory: "Drone Frames",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "drn-2",
    name: "2207 2450KV High-Thrust Brushless Drone Motors (4-Pack)",
    slug: "brushless-drone-motor-2207-2450kv",
    category: "Drones & Parts",
    category_slug: "drones-parts",
    categorySlug: "drones-parts",
    image_key: "drone",
    price: 3899,
    discount_price: 3199,
    material: "Titanium Shaft & Curved N52SH Neodymium Magnets",
    dimensions: "27.5mm Dia × 32.7mm Height (Each)",
    manufacturing_method: "CNC Precision Rotor Balancing",
    rating: 4.9,
    review_count: 38,
    bestseller: false,
    stock: 25,
    short_description: "Set of 4 high-thrust 2207 brushless motors for 4S-6S FPV racing drones.",
    description:
      "High efficiency 2450KV brushless quadcopter motors with heat-resistant copper windings and Japanese NSK ball bearings. Includes 2 CW and 2 CCW motor lock nuts.",
    specifications: {
      Stator: "2207 Size",
      KV: "2450 RPM/V",
      "Max Thrust": "1.65 kg per motor",
      "Battery Support": "4S – 6S LiPo",
    },
    sku: "DRN-MTR-002",
    subcategory: "Brushless Motors",
    active: true,
    featured: false,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "drn-3",
    name: "5-inch Tri-Blade Propellers (4 Pairs)",
    slug: "5-inch-tri-blade-fpv-propellers",
    category: "Drones & Parts",
    category_slug: "drones-parts",
    categorySlug: "drones-parts",
    image_key: "drone",
    price: 499,
    discount_price: 349,
    material: "Polycarbonate High Durability",
    dimensions: "5.1 × 4.6 × 3 Blades (5mm Shaft)",
    manufacturing_method: "Precision Injection Molding",
    rating: 4.8,
    review_count: 52,
    bestseller: true,
    stock: 150,
    short_description: "Set of 8 polycarbonate 5-inch 3-blade FPV drone propellers (4 CW + 4 CCW).",
    description:
      "Durable crash-resistant polycarbonate propellers optimized for fast cornering bite, smooth throttle response, and quiet flight sound.",
    specifications: {
      Quantity: "8 Propellers (4CW, 4CCW)",
      Pitch: "4.6 Inch",
      Weight: "4.2g per Propeller",
    },
    sku: "DRN-PRP-003",
    subcategory: "Propellers",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },

  // ==========================================
  // 6. ACRYLIC PRODUCTS (category: "Acrylic Products" / "acrylic-products")
  // ==========================================
  {
    id: "acr-1",
    name: "Clear Cast Acrylic Dust-Proof Display Box",
    slug: "clear-cast-acrylic-display-box",
    category: "Acrylic Products",
    category_slug: "acrylic-products",
    categorySlug: "acrylic-products",
    image_key: "stand",
    price: 1299,
    discount_price: 999,
    material: "Optical Cast Acrylic (3mm)",
    dimensions: "250 × 200 × 150 mm",
    manufacturing_method: "Laser Cutting & Acrylic Solvent Welding",
    rating: 4.8,
    review_count: 34,
    bestseller: false,
    stock: 35,
    short_description:
      "Crystal clear seamless acrylic showcase box for robotics models and collectibles.",
    description:
      "Museum-grade UV-filtering transparent acrylic display case with a black gloss base. Keeps trophies, electronic projects, and scale models dust-free.",
    specifications: {
      Thickness: "3mm UV-Resistant Acrylic",
      Base: "5mm High-Gloss Black Acrylic",
      Joints: "Crystal Clear Chemically Welded",
    },
    sku: "ACR-BOX-001",
    subcategory: "Acrylic Display Boxes",
    active: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "acr-2",
    name: "Custom Engraved College Acrylic Award Trophy Stand",
    slug: "custom-acrylic-trophy-plaque",
    category: "Acrylic Products",
    category_slug: "acrylic-products",
    categorySlug: "acrylic-products",
    image_key: "stand",
    price: 1499,
    discount_price: 1199,
    material: "Optical Cast Acrylic & Solid Hardwood Base",
    dimensions: "180 × 140 × 6 mm",
    manufacturing_method: "Laser Cutting & UV Back-Print / Engraving",
    rating: 4.8,
    review_count: 75,
    bestseller: true,
    stock: 40,
    short_description: "Custom engraved college emblem and department logo trophy stand.",
    description:
      "Custom engraved college emblem and department logo trophy stand with crystal-clear laser cut acrylic on a natural wooden display stand. Perfect for hackathon awards and event recognition.",
    specifications: {
      "Acrylic Thickness": "6mm Cast Grade A",
      "Base Material": "Teak Wood",
      Engraving: "Sub-surface Laser Etch",
      Packaging: "Gift Box Included",
    },
    sku: "ACR-TRP-002",
    subcategory: "Custom Stands",
    active: true,
    featured: true,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "acr-3",
    name: "High-Clarity Transparent Protective Acrylic Shield",
    slug: "transparent-protective-acrylic-shield",
    category: "Acrylic Products",
    category_slug: "acrylic-products",
    categorySlug: "acrylic-products",
    image_key: "stand",
    price: 899,
    discount_price: 649,
    material: "Heavy-Duty Impact-Modified Acrylic (4mm)",
    dimensions: "400 × 300 × 4 mm",
    manufacturing_method: "CNC Routing & Flame-Polished Edge Chamfer",
    rating: 4.9,
    review_count: 28,
    bestseller: false,
    stock: 30,
    short_description:
      "Laser & CNC safety protective viewing window shield for makerspace workstations.",
    description:
      "Durable optical safety acrylic barrier screen designed for benchtop laser engraving machines, soldering fume stations, and lathe machine guards.",
    specifications: {
      Thickness: "4mm High-Impact Acrylic",
      Transparency: "92% Visible Light Transmission",
      Mounting: "4 x Corner Grommet Holes",
    },
    sku: "ACR-SHD-003",
    subcategory: "Transparent Shields",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },

  // ==========================================
  // 7. DIY KITS (category: "DIY Kits" / "diy-kits")
  // ==========================================
  {
    id: "kit-1",
    name: "All-in-One Autonomous Robotics STEM Starter Kit",
    slug: "starter-maker-diy-electronics-kit",
    category: "DIY Kits",
    category_slug: "diy-kits",
    categorySlug: "diy-kits",
    image_key: "kit",
    price: 2499,
    discount_price: 1899,
    material: "Acrylic Chassis, TT Motors, Wheels, Sensors & Controller",
    dimensions: "220 × 160 × 70 mm",
    manufacturing_method: "Curated STEM Kit Assembly",
    rating: 4.9,
    review_count: 88,
    bestseller: true,
    stock: 60,
    short_description:
      "Complete line-following and obstacle-avoidance 2WD robot chassis assembly kit.",
    description:
      "Hands-on robotics kit containing dual TT gear motors, motor driver shield, ultrasonic sonar sensor, infrared tracking sensors, and code library.",
    specifications: {
      Sensors: "Ultrasonic, Line Follower IR Modules",
      Motors: "2 × 3V–6V TT Gearbox Motors",
      Guide: "Full Circuit Diagram & Arduino Code Manual",
    },
    sku: "KIT-ROB-001",
    subcategory: "Robotics Starter Kits",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "kit-2",
    name: "DIY Soldering Practice & Electronics Training Kit",
    slug: "diy-soldering-practice-electronics-kit",
    category: "DIY Kits",
    category_slug: "diy-kits",
    categorySlug: "diy-kits",
    image_key: "kit",
    price: 499,
    discount_price: 349,
    material: "FR4 PCB with 60+ SMD & Through-Hole Components",
    dimensions: "100 × 80 × 1.6 mm",
    manufacturing_method: "Educational Kit Packaging",
    rating: 4.8,
    review_count: 74,
    bestseller: false,
    stock: 100,
    short_description:
      "Learn-to-solder practice board with rotating LED chasing circuit and buzzer.",
    description:
      "Step-by-step soldering tutorial kit featuring 0805, 0603 SMD components, transistors, capacitors, and NE555 timer IC to build an animated flashing LED wheel.",
    specifications: {
      "Component Count": "65 Electronic Parts",
      Difficulty: "Beginner to Intermediate",
      Power: "5V USB or 9V Battery Snap",
    },
    sku: "KIT-SLD-002",
    subcategory: "Soldering Practice Kits",
    active: true,
    featured: false,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "kit-3",
    name: "DIY Portable Bluetooth Stereo Speaker Build Kit",
    slug: "diy-bluetooth-speaker-assembly-kit",
    category: "DIY Kits",
    category_slug: "diy-kits",
    categorySlug: "diy-kits",
    image_key: "kit",
    price: 1699,
    discount_price: 1299,
    material: "Laser-Cut Plywood Housing, 2x 3W Drivers, PAM8403 Amp",
    dimensions: "140 × 80 × 70 mm",
    manufacturing_method: "Laser Cutting & Electronics Packaging",
    rating: 4.8,
    review_count: 62,
    bestseller: false,
    stock: 35,
    short_description:
      "Build-your-own portable wooden Bluetooth stereo speaker with rechargeable battery.",
    description:
      "Fun hands-on STEM soldering kit allowing students to construct an active wireless speaker from scratch. Includes Bluetooth 5.0 receiver, Class-D amplifier, dual full-range speakers, and 18650 battery module.",
    specifications: {
      Audio: "2 × 3W Stereo Drivers",
      Bluetooth: "V5.0 with 10m Range",
      Battery: "Rechargeable Li-Ion (Included)",
      Assembly: "Step-by-Step Illustrated Guide",
    },
    sku: "KIT-SPK-003",
    subcategory: "Audio & STEM",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },
];

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error || !data || data.length === 0) {
        return DEFAULT_CATALOG_PRODUCTS;
      }
      return data;
    } catch {
      return DEFAULT_CATALOG_PRODUCTS;
    }
  },
  staleTime: 60_000,
});

export function normalizeProductIdentifier(input: string | undefined | null): string {
  if (!input) return "";
  let decoded = "";
  try {
    decoded = decodeURIComponent(input);
  } catch {
    decoded = input;
  }
  return decoded
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatProductSlug(product: {
  slug?: string | null;
  name?: string | null;
  id?: string | null;
}): string {
  if (product.slug && product.slug.trim().length > 0) {
    return normalizeProductIdentifier(product.slug);
  }
  if (product.name && product.name.trim().length > 0) {
    return normalizeProductIdentifier(product.name);
  }
  return normalizeProductIdentifier(product.id || "product");
}

export function getProductBySlug(rawSlugOrId: string | undefined | null): Product {
  const normalized = normalizeProductIdentifier(rawSlugOrId);
  const raw = (rawSlugOrId || "").trim().toLowerCase();

  // 1. Direct match in DEFAULT_CATALOG_PRODUCTS by id, slug, or normalized name
  const match = DEFAULT_CATALOG_PRODUCTS.find((p) => {
    const pSlugNorm = normalizeProductIdentifier(p.slug);
    const pIdNorm = normalizeProductIdentifier(p.id);
    const pNameNorm = normalizeProductIdentifier(p.name);
    return (
      pSlugNorm === normalized ||
      pIdNorm === normalized ||
      pNameNorm === normalized ||
      p.slug.toLowerCase() === raw ||
      p.id.toLowerCase() === raw ||
      p.name.toLowerCase() === raw
    );
  });
  if (match) return match;

  // 2. Substring or keyword match in DEFAULT_CATALOG_PRODUCTS
  if (normalized.length > 0) {
    const subMatch = DEFAULT_CATALOG_PRODUCTS.find((p) => {
      const pSlugNorm = normalizeProductIdentifier(p.slug);
      const pNameNorm = normalizeProductIdentifier(p.name);
      return (
        pSlugNorm.includes(normalized) ||
        normalized.includes(pSlugNorm) ||
        pNameNorm.includes(normalized) ||
        normalized.includes(pNameNorm) ||
        (p.image_key && normalized.includes(p.image_key))
      );
    });
    if (subMatch) return subMatch;
  }

  // 3. Ultimate safe fallback: return first item in DEFAULT_CATALOG_PRODUCTS
  return DEFAULT_CATALOG_PRODUCTS[0]!;
}

export function productQuery(rawSlugOrId: string | undefined) {
  const normalized = normalizeProductIdentifier(rawSlugOrId);
  const raw = (rawSlugOrId || "").trim();

  return queryOptions({
    queryKey: ["product", normalized || "default"],
    queryFn: async (): Promise<Product> => {
      try {
        if (normalized) {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .or(`slug.eq.${normalized},id.eq.${normalized},slug.eq.${raw},id.eq.${raw}`)
            .maybeSingle();
          if (data) return data;
        }
      } catch {
        // Fallback to local default catalog
      }

      return getProductBySlug(rawSlugOrId);
    },
    initialData: () => getProductBySlug(rawSlugOrId),
  });
}

export function reviewsQuery(productId: string | undefined) {
  return queryOptions({
    queryKey: ["reviews", productId],
    queryFn: async (): Promise<Review[]> => {
      if (!productId) return [];
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!productId,
  });
}

export const statsQuery = queryOptions({
  queryKey: ["site_stats"],
  queryFn: async () => {
    const { data, error } = await supabase.from("site_stats").select("*").order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
  staleTime: 5 * 60_000,
});

export function searchProducts(products: Product[], term: string): Product[] {
  const q = term.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [
      p.name,
      p.category,
      p.category_slug,
      p.categorySlug,
      p.subcategory,
      p.short_description,
      p.description,
      p.sku,
      p.material,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}
