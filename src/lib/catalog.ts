import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Product = Tables<"products">;
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
  // 1. 3D PRINTING PRODUCTS (category_slug: "3d-printing")
  // ==========================================
  {
    id: "3dp-1",
    name: "3D Printed Geometric Vase",
    slug: "geometric-spiral-vase",
    category_slug: "3d-printing",
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
    subcategory: "Home & Decor",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "3dp-2",
    name: "Modular Makerspace Desk Organizer",
    slug: "modular-desk-organizer-grid",
    category_slug: "3d-printing",
    image_key: "organizer",
    price: 649,
    discount_price: 499,
    material: "Tough PETG / Recycled PLA",
    dimensions: "160 × 120 × 90 mm",
    manufacturing_method: "FDM Multi-Part Interlocking Print",
    rating: 4.8,
    review_count: 55,
    bestseller: false,
    stock: 35,
    short_description: "Interlocking modular desk organizer for lab tools, calipers & SD cards.",
    description:
      "Customizable interlocking desk tray system to organize Allen keys, soldering tips, tweezers, flash drives, and electronic components.",
    specifications: {
      Modules: "4 Interlocking Trays",
      Material: "PETG High Impact",
      Grip: "Rubberized Non-Slip Base",
    },
    sku: "3DP-ORG-002",
    subcategory: "Storage & Organizing",
    active: true,
    featured: true,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "3dp-3",
    name: "Articulated Dragon Figurine",
    slug: "articulated-crystal-dragon-3d",
    category_slug: "3d-printing",
    image_key: "vase",
    price: 899,
    discount_price: 699,
    material: "Dual-Color Silk PLA",
    dimensions: "450mm Length",
    manufacturing_method: "Print-in-Place Articulated FDM",
    rating: 4.9,
    review_count: 84,
    bestseller: true,
    stock: 25,
    short_description:
      "Flexible print-in-place articulated dragon with vibrant metallic dual-color sheen.",
    description:
      "Precision print-in-place articulated crystal dragon figurine with smooth moving joints. Printed using high-luster dual-color silk filament.",
    specifications: {
      Length: "45cm Extended",
      Joints: "24 Articulated Segments",
      Finish: "Silk Blue/Purple Iridescent",
    },
    sku: "3DP-DRG-003",
    subcategory: "Figurines & Art",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },
  {
    id: "3dp-4",
    name: "High-Strength PLA+ Filament Spool 1kg",
    slug: "pla-plus-filament-spool-1kg",
    category_slug: "3d-printing",
    image_key: "vase",
    price: 1199,
    discount_price: 899,
    material: "High-Purity PLA+ Polymer (1.75mm)",
    dimensions: "200mm Dia × 65mm Width",
    manufacturing_method: "Extrusion Spooling (±0.02mm Tolerance)",
    rating: 4.9,
    review_count: 160,
    bestseller: true,
    stock: 90,
    short_description:
      "Premium 1.75mm PLA+ filament spool with tangle-free winding for 3D printers.",
    description:
      "Industrial grade PLA+ 3D printing filament featuring 10x higher impact toughness than standard PLA. Zero warping, low odor, and uniform diameter.",
    specifications: {
      Diameter: "1.75mm ±0.02mm",
      "Nozzle Temp": "205°C – 225°C",
      "Bed Temp": "50°C – 60°C",
      Weight: "1.0 kg Net",
    },
    sku: "3DP-FIL-004",
    subcategory: "Filaments & Materials",
    active: true,
    featured: false,
    created_at: "2026-01-04T00:00:00Z",
  },

  // ==========================================
  // 2. LASER CUTTING PRODUCTS (category_slug: "laser-cutting")
  // ==========================================
  {
    id: "lc-1",
    name: "Custom Name Keychain",
    slug: "custom-engraved-wooden-keychain",
    category_slug: "laser-cutting",
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
    sku: "LC-KEY-001",
    subcategory: "Personalized Accessories",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "lc-2",
    name: "Tree of Life LED Lamp",
    slug: "tree-of-life-wooden-led-lamp",
    category_slug: "laser-cutting",
    image_key: "lamp",
    price: 899,
    discount_price: 699,
    material: "Engineered MDF, Cast Acrylic, Warm White LED base",
    dimensions: "150 × 50 × 210 mm",
    manufacturing_method: "Multi-Layer Laser Cutting & Assembly",
    rating: 4.9,
    review_count: 60,
    bestseller: false,
    stock: 25,
    short_description: "Artistic wooden Tree of Life ambient lamp with USB powered LED base.",
    description:
      "Artistic Tree of Life mood lamp fabricated with intricate laser-cut wooden fretwork and embedded ambient warm white LED lighting. Powered via standard USB 5V.",
    specifications: {
      Power: "5V USB (Cable Included)",
      "LED Color": "Warm White 3000K",
      Base: "Solid Beech Wood",
      "Cord Length": "1.2 meters with In-line Switch",
    },
    sku: "LC-LAMP-002",
    subcategory: "Lighting & Gifts",
    active: true,
    featured: true,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "lc-3",
    name: "Geometric Mandala Coaster Set (4-Pack)",
    slug: "mandala-laser-cut-wooden-coasters",
    category_slug: "laser-cutting",
    image_key: "keychain",
    price: 499,
    discount_price: 399,
    material: "Eco-Friendly Walnut Plywood",
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
    sku: "LC-CST-003",
    subcategory: "Home & Decor",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },

  // ==========================================
  // 3. CNC MACHINING PRODUCTS (category_slug: "cnc-machining")
  // ==========================================
  {
    id: "cnc-1",
    name: "Mechanical Coupling",
    slug: "precision-aluminum-shaft-coupler",
    category_slug: "cnc-machining",
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
    short_description: "High-precision CNC machined flexible aluminum shaft coupling.",
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
    subcategory: "Robotics & Transmission",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cnc-2",
    name: "CNC Machined Aluminum Bracket",
    slug: "heavy-duty-l-bracket-cnc",
    category_slug: "cnc-machining",
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
    subcategory: "Hardware & Framing",
    active: true,
    featured: true,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "cnc-3",
    name: "Precision Aluminum Heatsink Block",
    slug: "precision-aluminum-heatsink-cnc",
    category_slug: "cnc-machining",
    image_key: "cnc",
    price: 999,
    discount_price: 749,
    material: "6063 High Thermal Conductivity Aluminum",
    dimensions: "80 × 50 × 25 mm",
    manufacturing_method: "CNC Multi-Fin Slot Milling",
    rating: 4.8,
    review_count: 36,
    bestseller: false,
    stock: 40,
    short_description:
      "CNC slotted aluminum cooling heatsink for motor drivers & power transistors.",
    description:
      "Custom milled extruded aluminum heatsink with 14 deep cooling fins for rapid thermal dissipation in high-power robotics motor controllers.",
    specifications: {
      "Thermal Resistance": "1.8 °C/W",
      Fins: "14 Machined Fin Slots",
      Mounting: "M3 Tapped Base Holes",
    },
    sku: "CNC-HSK-003",
    subcategory: "Thermal Management",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },

  // ==========================================
  // 4. ELECTRONICS PRODUCTS (category_slug: "electronics")
  // ==========================================
  {
    id: "elec-1",
    name: "ESP32 IoT Prototyping Board",
    slug: "esp32-iot-maker-board",
    category_slug: "electronics",
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
    subcategory: "Microcontrollers",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "elec-2",
    name: "Arduino Uno R3 Compatible Board",
    slug: "arduino-uno-r3-atmega328p",
    category_slug: "electronics",
    image_key: "esp32",
    price: 599,
    discount_price: 449,
    material: "FR4 Glass Epoxy PCB & ATmega328P IC",
    dimensions: "68 × 53 × 15 mm",
    manufacturing_method: "Automated SMT Assembly & Testing",
    rating: 4.8,
    review_count: 98,
    bestseller: false,
    stock: 65,
    short_description: "Standard ATmega328P microcontroller development board with USB cable.",
    description:
      "Workhorse microcontroller board for electronics education, STEM classrooms, and sensor interfacing. 100% compatible with Arduino IDE.",
    specifications: {
      MCU: "ATmega328P @ 16MHz",
      "Digital I/O": "14 (6 PWM Outputs)",
      "Analog Inputs": "6 Channels",
      "Input Voltage": "7–12V DC",
    },
    sku: "ELEC-ARD-002",
    subcategory: "Microcontrollers",
    active: true,
    featured: false,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "elec-3",
    name: "0.96-inch OLED I2C Display Module",
    slug: "oled-i2c-display-128x64-blue",
    category_slug: "electronics",
    image_key: "esp32",
    price: 399,
    discount_price: 299,
    material: "OLED Glass & SMT PCB Carrier",
    dimensions: "27 × 27 × 4 mm",
    manufacturing_method: "High-Density SMT Reflow",
    rating: 4.9,
    review_count: 65,
    bestseller: false,
    stock: 110,
    short_description: "128x64 high-contrast blue I2C OLED screen for microcontrollers.",
    description:
      "Crisp monochrome graphic OLED display module with 4-pin I2C communication (VCC, GND, SCL, SDA). Ultra-low power consumption with wide 160° viewing angle.",
    specifications: {
      Resolution: "128 × 64 Pixels",
      Interface: "I2C (Address 0x3C)",
      Voltage: "3.3V – 5.0V",
      "Driver IC": "SSD1306",
    },
    sku: "ELEC-OLED-003",
    subcategory: "Displays & Sensors",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },

  // ==========================================
  // 5. DRONES & PARTS (category_slug: "drones-parts")
  // ==========================================
  {
    id: "drn-1",
    name: "FPV Drone Racing Carbon Frame",
    slug: "fpv-drone-carbon-fiber-frame",
    category_slug: "drones-parts",
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
    name: "2207 2450KV Brushless Drone Motor",
    slug: "brushless-drone-motor-2207-2450kv",
    category_slug: "drones-parts",
    image_key: "drone",
    price: 1199,
    discount_price: 899,
    material: "Titanium Shaft & Curved N52SH Neodymium Magnets",
    dimensions: "27.5mm Dia × 32.7mm Height",
    manufacturing_method: "CNC Precision Rotor Balancing",
    rating: 4.9,
    review_count: 38,
    bestseller: false,
    stock: 40,
    short_description: "High-thrust 2207 brushless motor for 4S-6S FPV racing drones.",
    description:
      "High efficiency 2450KV brushless quadcopter motor with heat-resistant copper windings and Japanese NSK ball bearings.",
    specifications: {
      Stator: "2207 Size",
      KV: "2450 RPM/V",
      "Max Thrust": "1.65 kg (with 5146 Props)",
      "Battery Support": "4S – 6S LiPo",
    },
    sku: "DRN-MTR-002",
    subcategory: "Motors & Propulsion",
    active: true,
    featured: false,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "drn-3",
    name: "5-inch Tri-Blade Propellers (4 Pairs)",
    slug: "5-inch-tri-blade-fpv-propellers",
    category_slug: "drones-parts",
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
  // 6. ACRYLIC PRODUCTS (category_slug: "acrylic-products")
  // ==========================================
  {
    id: "acr-1",
    name: "Custom College Logo Stand",
    slug: "custom-acrylic-trophy-plaque",
    category_slug: "acrylic-products",
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
    sku: "ACR-TRP-001",
    subcategory: "Trophies & Plaques",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "acr-2",
    name: "Clear Acrylic Keyboard Dust Cover",
    slug: "acrylic-mechanical-keyboard-cover",
    category_slug: "acrylic-products",
    image_key: "stand",
    price: 799,
    discount_price: 599,
    material: "Premium Optical Grade Clear Acrylic (3mm)",
    dimensions: "320 × 135 × 25 mm (Fits 65% - 75% Keyboards)",
    manufacturing_method: "CNC Acrylic Bending & Flame Polishing",
    rating: 4.9,
    review_count: 48,
    bestseller: false,
    stock: 30,
    short_description: "Flame-polished crystal-clear acrylic dust cover for mechanical keyboards.",
    description:
      "Transparent protective acrylic lid shielding mechanical keyboard switches from dust, liquid spills, and pet fur. Finished with flame-polished edge bevels.",
    specifications: {
      Compatibility: "60%, 65%, 75% Layouts",
      Thickness: "3mm High Impact",
      Edges: "Flame Polished Smooth Radii",
    },
    sku: "ACR-KBD-002",
    subcategory: "Desk Accessories",
    active: true,
    featured: false,
    created_at: "2026-01-02T00:00:00Z",
  },

  // ==========================================
  // 7. DIY KITS (category_slug: "diy-kits")
  // ==========================================
  {
    id: "kit-1",
    name: "All-in-One Student DIY Maker Kit",
    slug: "starter-maker-diy-electronics-kit",
    category_slug: "diy-kits",
    image_key: "kit",
    price: 1899,
    discount_price: 1499,
    material: "Assorted Sensors, Breadboard, Wires & Acrylic Box",
    dimensions: "200 × 150 × 60 mm",
    manufacturing_method: "Curated Kit Assembly",
    rating: 4.9,
    review_count: 88,
    bestseller: true,
    stock: 60,
    short_description: "Complete electronics and prototyping kit for college engineering labs.",
    description:
      "Comprehensive starter kit including 30+ components: sensors (ultrasonic, PIR, DHT11), relays, LEDs, breadboard, jumper wires, and microcontroller tutorial handbook.",
    specifications: {
      "Component Count": "35+ Parts",
      Documentation: "Lab Manual & Code Examples Included",
      Case: "Laser-Cut Acrylic Organizer Box",
    },
    sku: "KIT-DIY-001",
    subcategory: "Educational Kits",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "kit-2",
    name: "DIY Bluetooth Speaker Build Kit",
    slug: "diy-bluetooth-speaker-assembly-kit",
    category_slug: "diy-kits",
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
    sku: "KIT-SPK-002",
    subcategory: "Audio & STEM",
    active: true,
    featured: false,
    created_at: "2026-01-02T00:00:00Z",
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
    [p.name, p.category_slug, p.subcategory, p.short_description, p.description, p.sku, p.material]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}
