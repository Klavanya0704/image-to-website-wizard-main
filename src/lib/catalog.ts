import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Product = Tables<"products"> & {
  categorySlug: string;
  category?: string;
  image?: string;
  title?: string;
};
export type Category = Tables<"categories">;
export type Review = Tables<"reviews">;
export type Order = Tables<"orders">;
export type OrderItem = Tables<"order_items">;
export type Address = Tables<"addresses">;
export type Enquiry = Tables<"enquiries">;

export function normalizeCategorySlug(s: string | undefined | null): string {
  if (!s) return "";
  const cleaned = s
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (cleaned === "3d-printing" || cleaned === "3d-print" || cleaned === "3dprinting") {
    return "3d-printing";
  }
  if (cleaned === "laser-cutting" || cleaned === "laser-cut" || cleaned === "lasercutting") {
    return "laser-cutting";
  }
  if (cleaned === "cnc-machining" || cleaned === "cnc" || cleaned === "cncmachining") {
    return "cnc-machining";
  }
  if (cleaned === "electronics" || cleaned === "electronic") {
    return "electronics";
  }
  if (
    cleaned === "drones-parts" ||
    cleaned === "drones-and-parts" ||
    cleaned === "drones" ||
    cleaned === "drone-parts"
  ) {
    return "drones-parts";
  }
  if (cleaned === "acrylic-products" || cleaned === "acrylic" || cleaned === "acrylics") {
    return "acrylic-products";
  }
  if (cleaned === "diy-kits" || cleaned === "diy" || cleaned === "kits") {
    return "diy-kits";
  }

  return cleaned;
}

export const EXACT_PRODUCT_CATEGORY_MAP: Record<string, string> = {
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

  // 3. CNC Machining (College CNC Lab Metal & 3D Wood Carving/Routing)
  "cnc-wooden-name-plate": "cnc-machining",
  "cnc-carved-wooden-wall-panel": "cnc-machining",
  "cnc-cut-wooden-mandala": "cnc-machining",
  "cnc-cut-wooden-box": "cnc-machining",
  "cnc-wooden-key-holder": "cnc-machining",
  "cnc-wooden-relief-art": "cnc-machining",
  "cnc-wooden-sign-board": "cnc-machining",
  "cnc-aluminium-bracket": "cnc-machining",
  "cnc-aluminum-mounting-bracket": "cnc-machining",
  "cnc-aluminum-fixture-plate": "cnc-machining",
  "cnc-machined-gear": "cnc-machining",
  "cnc-machined-shaft": "cnc-machining",
  "cnc-machined-bushing": "cnc-machining",
  "precision-cnc-flanged-bushing": "cnc-machining",
  "cnc-machined-coupling": "cnc-machining",
  "cnc-stainless-steel-coupling": "cnc-machining",
  "cnc-machined-pulley": "cnc-machining",
  "cnc-machined-prototype-component": "cnc-machining",
  "mechanical-prototype-model": "cnc-machining",
  "precision-aluminum-shaft-coupler": "cnc-machining",
  "heavy-duty-l-bracket-cnc": "cnc-machining",
  "precision-mounting-plate": "cnc-machining",
  "custom-cnc-component": "cnc-machining",
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
  // 1. 3D PRINTING PRODUCTS
  // ==========================================
  {
    id: "3dp-1",
    name: "3D Printed Geometric Vase",
    slug: "geometric-spiral-vase",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "vase",
    price: 699,
    discount_price: 499,
    material: "PLA Pro Matte",
    dimensions: "120 × 120 × 200 mm",
    manufacturing_method: "FDM 3D Printing (0.16mm Layer Height)",
    rating: 4.8,
    review_count: 38,
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
    discount_price: 299,
    material: "High-Strength Tough PLA",
    dimensions: "100 × 75 × 15 mm (Folded)",
    manufacturing_method: "Print-in-Place FDM Printing",
    rating: 4.9,
    review_count: 44,
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
    name: "Mini Desk Organizer",
    slug: "mini-desk-organizer",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "organizer",
    price: 699,
    discount_price: 549,
    material: "Dual-Tone Matte PLA",
    dimensions: "140 × 90 × 85 mm",
    manufacturing_method: "FDM Multi-Extrusion 3D Printing",
    rating: 4.8,
    review_count: 26,
    bestseller: false,
    stock: 35,
    short_description: "Compact modular 3D printed desk organizer with pen cups and phone dock.",
    description:
      "Modern dual-tone desk organizer engineered to neatly store pens, stylus, flash drives, and notes with integrated cable pass-through channels.",
    specifications: {
      Material: "Tough Matte PLA",
      Compartments: "4 Modular Sections",
      Weight: "120g",
    },
    sku: "3DP-ORG-003",
    subcategory: "Desk Accessories",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },
  {
    id: "3dp-4",
    name: "Cable Management Clip Set (6 Pieces)",
    slug: "cable-management-clip-set",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "organizer",
    price: 249,
    discount_price: 199,
    material: "Semi-Flexible PETG & 3M VHB Adhesive",
    dimensions: "35 × 18 × 12 mm (Each)",
    manufacturing_method: "High-Speed Direct Drive FDM",
    rating: 4.9,
    review_count: 31,
    bestseller: true,
    stock: 120,
    short_description: "Pack of 6 precision 3D printed desk cable routing clips.",
    description:
      "Keep charging cords, USB-C lines, and HDMI cables securely routed across desks or monitors. High elasticity PETG clips prevent cable wear.",
    specifications: {
      Quantity: "6 Clips per Pack",
      "Cable Diameters": "3mm to 8mm Supported",
      Adhesive: "Pre-applied 3M Heavy-Duty Backing",
    },
    sku: "3DP-CLP-004",
    subcategory: "Cable Clips",
    active: true,
    featured: true,
    created_at: "2026-01-04T00:00:00Z",
  },
  {
    id: "3dp-5",
    name: "Resin Architectural Model",
    slug: "resin-architectural-model",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "vase",
    price: 1299,
    discount_price: 999,
    material: "High-Detail Tough Photopolymer Resin",
    dimensions: "160 × 110 × 95 mm",
    manufacturing_method: "8K Monochrome LCD Stereolithography (SLA)",
    rating: 4.9,
    review_count: 19,
    bestseller: false,
    stock: 15,
    short_description: "Museum-grade 8K resin printed miniature architectural study model.",
    description:
      "Ultra-high precision architectural scale model featuring sharp window mullions, textured masonry, and micro-colonnades cured with industrial UV post-processing.",
    specifications: {
      Resolution: "8K (22 micron XY)",
      "Layer Thickness": "0.05mm Ultra-Fine",
      Finish: "Matte Gray Primer Pre-Applied",
    },
    sku: "3DP-ARC-005",
    subcategory: "Architectural Models",
    active: true,
    featured: false,
    created_at: "2026-01-05T00:00:00Z",
  },
  {
    id: "3dp-6",
    name: "Planter Pot – Modern Hex Design",
    slug: "planter-pot-hex",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "vase",
    price: 499,
    discount_price: 399,
    material: "Eco Recycled Matte PLA",
    dimensions: "110 × 110 × 100 mm",
    manufacturing_method: "FDM 3D Printing (0.2mm Speed)",
    rating: 4.7,
    review_count: 22,
    bestseller: false,
    stock: 40,
    short_description: "Geometric hexagonal self-draining planter for succulents and indoor flora.",
    description:
      "Modern minimalist hexagonal desktop planter featuring an elevated internal drainage reservoir and detachable drip saucer.",
    specifications: {
      Drainage: "Integrated 4-Hole Reservoir",
      Saucer: "Magnetic Quick-Snap Base",
      Weight: "135g",
    },
    sku: "3DP-PLT-006",
    subcategory: "Planters & Pots",
    active: true,
    featured: false,
    created_at: "2026-01-06T00:00:00Z",
  },

  // ==========================================
  // 2. LASER CUTTING PRODUCTS (Wood, Glass & Acrylic)
  // ==========================================
  {
    id: "lc-1",
    name: "Custom Name Keychain",
    slug: "custom-name-keychain",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "custom-name-keychain",
    price: 199,
    discount_price: 149,
    material: "Natural Hardwood Walnut & Solid Brass Keyring",
    dimensions: "65 × 30 × 6 mm",
    manufacturing_method: "Precision Vector Laser Engraving",
    rating: 4.9,
    review_count: 84,
    bestseller: true,
    stock: 150,
    short_description: "Custom name laser-engraved solid walnut wood keychain with brass ring.",
    description:
      "Personalized rectangular solid walnut keychain with laser etched cursive typography. Polished edges with heavy-duty split brass keyring.",
    specifications: {
      Material: "Solid Walnut Hardwood",
      Ring: "30mm Flat Solid Brass Ring",
      Customization: "Front & Back Vector Engraving",
    },
    sku: "LC-KEY-001",
    subcategory: "Custom Keychains",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "lc-2",
    name: "Tree of Life LED Lamp",
    slug: "tree-of-life-lamp",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "tree-of-life-lamp",
    price: 1499,
    discount_price: 1199,
    material: "Multi-Layered Walnut Wood & Warm LED Array",
    dimensions: "200 × 200 × 45 mm",
    manufacturing_method: "High-Precision CO2 Laser Cutting",
    rating: 4.9,
    review_count: 52,
    bestseller: true,
    stock: 35,
    short_description: "Intricate laser-cut wooden Tree of Life silhouette lamp with warm LED backlighting.",
    description:
      "Precision cut organic branched silhouette patterned in solid walnut wood, slotted into a circular base equipped with warm ambient LED illumination.",
    specifications: {
      "Wood Type": "Solid Walnut & Birch Ply",
      Power: "5V USB with In-Line Dimmer",
      Lighting: "Warm White (3000K) High-CRI LED",
    },
    sku: "LC-LMP-002",
    subcategory: "LED Lamps",
    active: true,
    featured: true,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "lc-3",
    name: "Laser Cut Desk Organizer",
    slug: "laser-cut-desk-organizer",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "laser-cut-desk-organizer",
    price: 899,
    discount_price: 699,
    material: "Selected Birch Plywood (4mm)",
    dimensions: "240 × 140 × 120 mm",
    manufacturing_method: "Laser Nesting & Finger-Joint Kerf Fit",
    rating: 4.8,
    review_count: 36,
    bestseller: false,
    stock: 45,
    short_description: "Laser-cut interlocking wooden desktop caddy with pen slots and mail dividers.",
    description:
      "Multi-compartment organizer cut with sub-millimeter finger joint precision. Features dedicated compartments for pens, stationery, phone, and notebooks.",
    specifications: {
      Material: "4mm Russian Birch Ply",
      Joinery: "Precision Interlocking Finger Joints",
      Finish: "Smooth Sanded Beeswax Seal",
    },
    sku: "LC-ORG-003",
    subcategory: "Desk Organizers",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },
  {
    id: "lc-4",
    name: "Wooden Mandala Wall Art",
    slug: "wooden-wall-art-mandala",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "wooden-wall-art-mandala",
    price: 1299,
    discount_price: 999,
    material: "Multi-Tier Oak & Walnut Veneer",
    dimensions: "350 × 350 × 16 mm",
    manufacturing_method: "Layered 8-Tier Laser Cutting & Hand Staining",
    rating: 5.0,
    review_count: 67,
    bestseller: true,
    stock: 30,
    short_description: "8-layer laser cut wooden mandala geometric wall art sculpture.",
    description:
      "Stunning 8-layer 3D geometric mandala cut from alternating tones of mahogany and birch wood. Creates mesmerizing depth and drop shadows under ambient room lighting.",
    specifications: {
      Layers: "8 Laser Cut Veneer Tiers",
      Mounting: "Keyhole Wall Hanger Attached",
      Finish: "Hand-Applied Matte Teak Oil",
    },
    sku: "LC-ART-004",
    subcategory: "Wall Art",
    active: true,
    featured: true,
    created_at: "2026-01-04T00:00:00Z",
  },
  {
    id: "lc-5",
    name: "Laser Engraved Photo Frame",
    slug: "laser-engraved-photo-frame",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "laser-engraved-photo-frame",
    price: 699,
    discount_price: 549,
    material: "Natural Solid Oak Wood & High-Clarity Glass",
    dimensions: "220 × 170 × 20 mm (Holds 4×6 Photo)",
    manufacturing_method: "CO2 Laser Vector & Raster Engraving",
    rating: 4.8,
    review_count: 41,
    bestseller: false,
    stock: 50,
    short_description: "Custom laser-engraved solid oak photo frame with floral border and anniversary text.",
    description:
      "Solid natural oak photo frame etched with intricate filigree details and personalized text. Features an easel stand and wall hanging hooks.",
    specifications: {
      "Photo Size": "4 × 6 Inch Standard",
      Wood: "Solid White Oak",
      Protection: "UV-Filtered Mineral Glass",
    },
    sku: "LC-FRM-005",
    subcategory: "Photo Frames",
    active: true,
    featured: false,
    created_at: "2026-01-05T00:00:00Z",
  },
  {
    id: "lc-6",
    name: "Custom Acrylic LED Sign",
    slug: "custom-acrylic-led-sign",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "custom-acrylic-led-sign",
    price: 1499,
    discount_price: 1199,
    material: "Optical Grade Cast Acrylic & Solid Walnut Base",
    dimensions: "180 × 150 × 40 mm",
    manufacturing_method: "CO2 Laser Contouring & Edge-Lighting Engraving",
    rating: 4.9,
    review_count: 64,
    bestseller: true,
    stock: 35,
    short_description: "Precision laser cut edge-lit optical acrylic desk plaque with solid walnut wood LED base.",
    description:
      "High optical clarity cast acrylic plate with vector laser engraved emblem. Features warm white LED illumination nestled inside a solid walnut base.",
    specifications: {
      Material: "5mm Clear Cast Acrylic & Solid Walnut",
      Lighting: "Warm White LED (USB Powered)",
      Dimensions: "180 × 150 × 40 mm",
    },
    sku: "LC-LED-006",
    subcategory: "Acrylic Signs",
    active: true,
    featured: true,
    created_at: "2026-01-06T00:00:00Z",
  },
  {
    id: "lc-7",
    name: "Laser Engraved Glass Trophy",
    slug: "laser-engraved-glass-trophy",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "laser-engraved-glass-trophy",
    price: 1799,
    discount_price: 1399,
    material: "K9 High-Refraction Optical Crystal Glass",
    dimensions: "180 × 160 × 35 mm",
    manufacturing_method: "Faceted Bevel Laser Cutting & 3D Subsurface Laser Etching",
    rating: 5.0,
    review_count: 42,
    bestseller: true,
    stock: 25,
    short_description: "Faceted optical crystal glass award with high precision 3D subsurface laser engraving.",
    description:
      "Premium octagonal beveled optical crystal trophy featuring subsurface 3D laser-etched star emblem and crisp surface laser typography.",
    specifications: {
      Material: "K9 Optical Crystal Glass",
      Technique: "Surface & 3D Subsurface Laser Etching",
      Weight: "680g",
    },
    sku: "LC-TRP-007",
    subcategory: "Glass Trophies",
    active: true,
    featured: true,
    created_at: "2026-01-07T00:00:00Z",
  },
  {
    id: "lc-8",
    name: "Frosted Glass Laser Engraving",
    slug: "frosted-glass-laser-engraving",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "frosted-glass-laser-engraving",
    price: 899,
    discount_price: 699,
    material: "Frosted Tempered Glass & Brushed Steel Standoffs",
    dimensions: "250 × 250 × 4 mm",
    manufacturing_method: "CO2 Laser Etching on Satin Frosted Glass",
    rating: 4.8,
    review_count: 28,
    bestseller: false,
    stock: 40,
    short_description: "Botanical artwork etched on frosted tempered glass with stainless steel standoffs.",
    description:
      "Intricate laser-etched floral artwork on satin-finish frosted safety glass. Includes 4 stainless steel wall standoff mounts.",
    specifications: {
      Material: "Frosted Tempered Glass (4mm)",
      Mounting: "Brushed Steel Standoffs Included",
      Dimensions: "250 × 250 mm",
    },
    sku: "LC-GLS-008",
    subcategory: "Frosted Glass Art",
    active: true,
    featured: false,
    created_at: "2026-01-08T00:00:00Z",
  },
  {
    id: "lc-9",
    name: "Laser Cut Acrylic Name Plate",
    slug: "laser-cut-acrylic-name-plate",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "laser-cut-acrylic-name-plate",
    price: 499,
    discount_price: 399,
    material: "Dual-Layer High-Gloss Black & Clear Acrylic",
    dimensions: "200 × 50 × 45 mm",
    manufacturing_method: "Precision Laser Cutting & Gold Foil Laser Inlay",
    rating: 4.9,
    review_count: 53,
    bestseller: true,
    stock: 60,
    short_description: "Dual-layer black and clear acrylic executive desk nameplate with laser engraved gold text.",
    description:
      "Executive desktop nameplate featuring laser cut high-gloss black acrylic with precision laser-engraved metallic gold lettering and beveled edges.",
    specifications: {
      Material: "High-Gloss Cast Acrylic",
      Style: "Beveled Chamfer Edge",
      Dimensions: "200 × 50 × 45 mm",
    },
    sku: "LC-NPL-009",
    subcategory: "Name Plates",
    active: true,
    featured: false,
    created_at: "2026-01-09T00:00:00Z",
  },
  {
    id: "lc-10",
    name: "Acrylic Decorative Panel",
    slug: "acrylic-decorative-panel",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "acrylic-decorative-panel",
    price: 1599,
    discount_price: 1299,
    material: "Satin Frosted Translucent Acrylic (4mm)",
    dimensions: "400 × 300 × 4 mm",
    manufacturing_method: "Micro-Kerf Laser Fretwork Cutting",
    rating: 4.7,
    review_count: 19,
    bestseller: false,
    stock: 20,
    short_description: "Translucent frosted acrylic decorative panel with geometric laser-cut lattice fretwork.",
    description:
      "Modern architectural acrylic room and window screen panel featuring intricate laser-cut lattice patterns. Translucent satin finish diffuses soft ambient light.",
    specifications: {
      Material: "4mm Satin Frosted Acrylic",
      Pattern: "Geometric Moroccan Lattice",
      Dimensions: "400 × 300 × 4 mm",
    },
    sku: "LC-PNL-010",
    subcategory: "Decorative Panels",
    active: true,
    featured: false,
    created_at: "2026-01-10T00:00:00Z",
  },

  // ==========================================
  // 3. CNC MACHINING PRODUCTS (12 College CNC Lab Metal & Wood Fabrication Projects)
  // ==========================================
  {
    id: "cnc-1",
    name: "CNC Wooden Name Plate",
    title: "CNC Wooden Name Plate",
    slug: "cnc-wooden-name-plate",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image: "/products/cnc-wooden-name-plate.jpg",
    image_key: "cnc-wooden-name-plate",
    price: 699,
    discount_price: 499,
    material: "Solid Walnut & Polished Brass Accents",
    dimensions: "260 × 60 × 40 mm",
    manufacturing_method: "V-Carve 3D Lettering & CNC Angled Bevel Milled Base",
    rating: 4.9,
    review_count: 51,
    bestseller: true,
    stock: 70,
    short_description: "V-carved dual-depth executive desktop solid walnut name plate with chamfered base.",
    description:
      "Executive angled desktop nameplate precision carved from a single block of walnut wood with deep V-carved serif typography and gold infill.",
    specifications: {
      Material: "Solid Black Walnut Block",
      Infill: "Metallic Gold Artisan Infill",
      BaseAngle: "70° Slanted Viewing Angle",
    },
    sku: "CNC-WOD-001",
    subcategory: "Name Plates",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cnc-2",
    name: "CNC Wooden Mandala",
    title: "CNC Wooden Mandala",
    slug: "cnc-cut-wooden-mandala",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image: "/products/cnc-cut-wooden-mandala.jpg",
    image_key: "cnc-cut-wooden-mandala",
    price: 1699,
    discount_price: 1299,
    material: "American Black Walnut Hardwood",
    dimensions: "400mm Diameter × 20mm Depth",
    manufacturing_method: "4-Axis CNC Rotary Relief Milling",
    rating: 5.0,
    review_count: 58,
    bestseller: true,
    stock: 25,
    short_description: "Deep 3D relief carved rotary geometric floral mandala wooden centerpiece in walnut.",
    description:
      "Precision carved circular mandala featuring dramatic relief depths, sculpted petals, and fine detail lines milled from solid black walnut.",
    specifications: {
      Wood: "Solid Black Walnut",
      DepthTiers: "15mm Maximum Relief Depth",
      Hanger: "Integrated Heavy-Duty Keyhole Slot",
    },
    sku: "CNC-WOD-002",
    subcategory: "Wood Relief Art",
    active: true,
    featured: true,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "cnc-3",
    name: "CNC Wooden Box",
    title: "CNC Wooden Box",
    slug: "cnc-cut-wooden-box",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image: "/products/cnc-cut-wooden-box.jpg",
    image_key: "cnc-cut-wooden-box",
    price: 1299,
    discount_price: 999,
    material: "Solid Hardwood Walnut & Maple Inlay",
    dimensions: "180 × 120 × 65 mm",
    manufacturing_method: "Deep Cavity Pocket CNC Milling & Friction Lid Machining",
    rating: 5.0,
    review_count: 33,
    bestseller: true,
    stock: 35,
    short_description: "Billet milled solid hardwood keepsake box with precision friction lid and routed dividers.",
    description:
      "Precision carved keepsake jewelry and electronics storage box hollowed from a single solid block of walnut with flush-fitting friction lid.",
    specifications: {
      Wood: "Solid Walnut with Maple Accent",
      Lid: "CNC Machined Flush Friction Fit",
      Lining: "Black Felt Inlaid Base",
    },
    sku: "CNC-WOD-003",
    subcategory: "Hardwood Boxes",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },
  {
    id: "cnc-4",
    name: "CNC Wooden Wall Panel",
    title: "CNC Wooden Wall Panel",
    slug: "cnc-carved-wooden-wall-panel",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image: "/products/cnc-carved-wooden-wall-panel.jpg",
    image_key: "cnc-carved-wooden-wall-panel",
    price: 2499,
    discount_price: 1999,
    material: "Solid Teak Hardwood & Natural Oil Finish",
    dimensions: "600 × 300 × 25 mm",
    manufacturing_method: "3D Ball-Nose CNC Router Surface Contouring",
    rating: 5.0,
    review_count: 42,
    bestseller: true,
    stock: 20,
    short_description: "3D CNC router carved fluted geometric wave wall panel in solid teak wood.",
    description:
      "Sculptural architectural wooden wall panel featuring fluid organic wave contours milled with 3D ball-nose CNC endmills in natural solid teak wood.",
    specifications: {
      Material: "100% Solid Natural Teak",
      Carving: "Continuous 3D Parametric Wave Contour",
      Mounting: "Interlocking Z-Clip French Cleats",
    },
    sku: "CNC-WOD-004",
    subcategory: "Carved Wall Panels",
    active: true,
    featured: true,
    created_at: "2026-01-04T00:00:00Z",
  },
  {
    id: "cnc-5",
    name: "CNC Wooden Relief",
    title: "CNC Wooden Relief",
    slug: "cnc-wooden-relief-art",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image: "/products/cnc-wooden-relief-art.jpg",
    image_key: "cnc-wooden-relief-art",
    price: 2299,
    discount_price: 1799,
    material: "Multi-Tone Hardwood Veneers & Solid Pine Core",
    dimensions: "500 × 350 × 24 mm",
    manufacturing_method: "3D CNC Topographic Surface Carving & Sculpting",
    rating: 4.9,
    review_count: 27,
    bestseller: true,
    stock: 20,
    short_description: "3D topographic relief landscape carved from multi-ply hardwood on CNC router.",
    description:
      "Multi-layered CNC carved 3D mountain and coastline relief sculpture. High-density step-down routing reveals distinct grain contours and elevation depths.",
    specifications: {
      Material: "Engineered Multi-Species Hardwood",
      CarvingResolution: "0.25mm Stepover Fine Pass",
      Mounting: "Recessed French Cleat Included",
    },
    sku: "CNC-WOD-005",
    subcategory: "Wood Relief Art",
    active: true,
    featured: true,
    created_at: "2026-01-05T00:00:00Z",
  },
  {
    id: "cnc-6",
    name: "CNC Aluminium Bracket",
    title: "CNC Aluminium Bracket",
    slug: "cnc-aluminium-bracket",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image: "/products/cnc-aluminium-bracket.jpg",
    image_key: "cnc-aluminium-bracket",
    price: 799,
    discount_price: 599,
    material: "6061-T6 Billet Aluminum (Bead-Blasted Silver Anodized)",
    dimensions: "80 × 80 × 12 mm",
    manufacturing_method: "3-Axis CNC High-Speed Milling",
    rating: 4.9,
    review_count: 48,
    bestseller: true,
    stock: 60,
    short_description: "Heavy-duty CNC milled aluminum 90-degree corner gusset bracket.",
    description:
      "Precision CNC milled 90° corner bracket machined from aerospace 6061-T6 aluminum. Chamfered edges with counterbored mounting holes for high rigidity frames.",
    specifications: {
      Material: "6061-T6 Billet Aluminum",
      Holes: "4 × M5 Counterbored Slots",
      Tolerance: "±0.02mm",
    },
    sku: "CNC-BRK-006",
    subcategory: "Mounting Brackets",
    active: true,
    featured: true,
    created_at: "2026-01-06T00:00:00Z",
  },
  {
    id: "cnc-7",
    name: "CNC Aluminium Plate",
    title: "CNC Aluminium Plate",
    slug: "cnc-aluminum-fixture-plate",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image: "/products/cnc-aluminum-fixture-plate.jpg",
    image_key: "cnc-aluminum-fixture-plate",
    price: 1899,
    discount_price: 1499,
    material: "Cast Aluminum Tooling Plate (MIC-6)",
    dimensions: "250 × 200 × 15 mm",
    manufacturing_method: "Surface Ground Flatness (±0.01mm) & CNC Matrix Tapping",
    rating: 4.9,
    review_count: 24,
    bestseller: true,
    stock: 25,
    short_description: "Precision ground aluminum tooling fixture base plate with M6 thread grid.",
    description:
      "Ultra-flat cast aluminum jig fixture plate with 25mm grid of alternating M6 threaded clamping holes and precision locating pin reamed holes.",
    specifications: {
      Grid: "25 × 25 mm Pitch M6 Thread Matrix",
      Flatness: "< 0.02mm Across Entire Plate",
      Material: "MIC-6 Stress-Relieved Tooling Plate",
    },
    sku: "CNC-PLT-007",
    subcategory: "Tooling & Fixtures",
    active: true,
    featured: true,
    created_at: "2026-01-07T00:00:00Z",
  },
  {
    id: "cnc-8",
    name: "CNC Machined Gear",
    title: "CNC Machined Gear",
    slug: "cnc-machined-gear",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image: "/products/cnc-machined-gear.jpg",
    image_key: "cnc-machined-gear",
    price: 899,
    discount_price: 699,
    material: "Hardened Carbon Steel (AISI 1045)",
    dimensions: "60mm Pitch Dia × 15mm Face Width (10mm Bore)",
    manufacturing_method: "5-Axis CNC Gear Hobbing & Profile Milling",
    rating: 5.0,
    review_count: 31,
    bestseller: false,
    stock: 45,
    short_description: "High-precision CNC milled steel spur gear with keyed central bore.",
    description:
      "Precision cut involute teeth spur gear with lightening cutouts and keyway slot. Induction heat-treated for high wear resistance in transmission systems.",
    specifications: {
      Module: "Mod 1.5 Involute",
      Teeth: "40T Precision Machined",
      Hardness: "HRC 45-50",
    },
    sku: "CNC-GER-008",
    subcategory: "Gears & Transmission",
    active: true,
    featured: false,
    created_at: "2026-01-08T00:00:00Z",
  },
  {
    id: "cnc-9",
    name: "CNC Machined Bushing",
    title: "CNC Machined Bushing",
    slug: "cnc-machined-bushing",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image: "/products/cnc-machined-bushing.jpg",
    image_key: "cnc-machined-bushing",
    price: 449,
    discount_price: 349,
    material: "Solid Bearing Brass (C36000)",
    dimensions: "8mm ID × 12mm OD × 15mm Length (16mm Flange)",
    manufacturing_method: "CNC Swiss Lathe Precision Turning",
    rating: 4.9,
    review_count: 36,
    bestseller: true,
    stock: 120,
    short_description: "Self-lubricating precision turned brass flanged sleeve bearing bushing.",
    description:
      "Swiss CNC turned flanged brass sleeve bushing engineered for smooth rotary motion and low friction in mechanical linkages and robotic joints.",
    specifications: {
      Material: "High-Grade Bearing Brass",
      Tolerance: "ISO H7 (+0.015/-0 mm)",
      Quantity: "Set of 4 Bushings",
    },
    sku: "CNC-BSH-009",
    subcategory: "Bushings & Bearings",
    active: true,
    featured: true,
    created_at: "2026-01-09T00:00:00Z",
  },
  {
    id: "cnc-10",
    name: "CNC Machined Coupling",
    title: "CNC Machined Coupling",
    slug: "cnc-machined-coupling",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image: "/products/cnc-machined-coupling.jpg",
    image_key: "cnc-machined-coupling",
    price: 649,
    discount_price: 499,
    material: "SUS304 Stainless Steel",
    dimensions: "25mm Outer Dia × 35mm Length (6mm to 8mm Bore)",
    manufacturing_method: "CNC Turning & Wire EDM Spiral Slitting",
    rating: 4.9,
    review_count: 53,
    bestseller: true,
    stock: 80,
    short_description: "Zero-backlash spiral beam flexible stainless steel shaft coupler.",
    description:
      "Solid stainless steel single-piece flexible coupler with spiral flexure slits to compensate for angular, parallel, and axial shaft misalignments.",
    specifications: {
      Material: "Grade 304 Stainless Steel",
      Bore: "6mm to 8mm Dual Clamping",
      MaxTorque: "2.5 N·m",
    },
    sku: "CNC-CPL-010",
    subcategory: "Couplings",
    active: true,
    featured: true,
    created_at: "2026-01-10T00:00:00Z",
  },
  {
    id: "cnc-11",
    name: "CNC Machined Shaft",
    title: "CNC Machined Shaft",
    slug: "cnc-machined-shaft",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image: "/products/cnc-machined-shaft.jpg",
    image_key: "cnc-machined-shaft",
    price: 599,
    discount_price: 449,
    material: "Induction Hardened Steel (CF53 / GCr15)",
    dimensions: "12mm Diameter × 300mm Length",
    manufacturing_method: "CNC Turning, Precision Step Grinding & Keyway Milling",
    rating: 4.8,
    review_count: 24,
    bestseller: false,
    stock: 45,
    short_description: "Induction-hardened linear drive shaft with ground bearing journals and keyway.",
    description:
      "Precision turned and centerless-ground drive shaft with steps for bearing seats, retaining ring circlip grooves, and standard milled keyway.",
    specifications: {
      Tolerance: "ISO h6 Ground Diameter",
      Hardness: "HRC 60-64 Case Hardened",
      Straightness: "< 0.03mm / 300mm",
    },
    sku: "CNC-SHF-011",
    subcategory: "Linear Motion & Shafts",
    active: true,
    featured: false,
    created_at: "2026-01-11T00:00:00Z",
  },
  {
    id: "cnc-12",
    name: "CNC Prototype Part",
    title: "CNC Prototype Part",
    slug: "cnc-machined-prototype-component",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image: "/products/cnc-machined-prototype-component.jpg",
    image_key: "cnc-machined-prototype-component",
    price: 1199,
    discount_price: 899,
    material: "Aerospace 6061-T6 Billet Aluminum",
    dimensions: "95 × 60 × 35 mm",
    manufacturing_method: "4-Axis CNC Milling & Multi-Sided Indexing",
    rating: 5.0,
    review_count: 18,
    bestseller: true,
    stock: 25,
    short_description: "Custom 4-axis milled billet aluminum robotic knuckle link prototype part.",
    description:
      "Complex geometry robotics actuator linkage milled from solid aerospace aluminum with weight reduction pockets and press-fit bearing bores.",
    specifications: {
      Tolerance: "±0.015mm Precision Bores",
      SurfaceFinish: "Ra 0.8 Micron Milled Texture",
      Fasteners: "M4 Threaded Inserts Installed",
    },
    sku: "CNC-PRT-012",
    subcategory: "Prototype Components",
    active: true,
    featured: true,
    created_at: "2026-01-12T00:00:00Z",
  },

  // ==========================================
  // 4. ELECTRONICS PRODUCTS
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
    material: "Lead-Free FR4 PCB & Gold Immersion (ENIG)",
    dimensions: "52 × 28 × 12 mm",
    manufacturing_method: "High-Precision Automated SMT Assembly",
    rating: 4.9,
    review_count: 95,
    bestseller: true,
    stock: 80,
    short_description:
      "ESP32 Wi-Fi + Bluetooth 4.2 LE dual-core development board with Type-C connector.",
    description:
      "High performance 240MHz dual-core Xtensa LX6 microcontroller with integrated 2.4 GHz Wi-Fi, Bluetooth BLE, 4MB Flash memory, and USB-C CP2102 programming chip.",
    specifications: {
      CPU: "Dual-Core 32-bit Xtensa @ 240MHz",
      Connectivity: "Wi-Fi 802.11 b/g/n + BT 4.2 BLE",
      Interface: "USB-C with Native Serial & Auto-Reset",
      GPIOs: "36 Breakout Header Pins",
    },
    sku: "ELEC-ESP-001",
    subcategory: "Microcontrollers",
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
    material: "FR4 PCB Modules & Components",
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
  // 5. DRONES & PARTS
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
    manufacturing_method: "CNC Turned Bell with Japanese NSK Bearings",
    rating: 4.9,
    review_count: 38,
    bestseller: true,
    stock: 18,
    short_description: "Set of 4 high-thrust 2207 2450KV 4S/6S brushless motors for FPV drones.",
    description:
      "Engineered for lightning throttle response and up to 1.8kg thrust per motor. High temperature 220°C copper windings and titanium alloy shaft.",
    specifications: {
      KV: "2450 RPM/V",
      Voltage: "4S - 6S LiPo",
      Stator: "2207 Silicon Steel Laminations",
      Quantity: "Set of 4 Motors",
    },
    sku: "DRN-MTR-002",
    subcategory: "Drone Motors",
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
    discount_price: 399,
    material: "Ultra-Durable Polycarbonate (PC)",
    dimensions: "5.1 inch Diameter × 4.3 inch Pitch",
    manufacturing_method: "High-Precision Injection Molding",
    rating: 4.8,
    review_count: 53,
    bestseller: false,
    stock: 85,
    short_description: "Pack of 8 (4 CW + 4 CCW) durable 5-inch tri-blade FPV propellers.",
    description:
      "Aerodynamic airfoil design providing optimal grip in turns and high top-end speed with minimal propeller wash vibrations.",
    specifications: {
      Size: "5143 Tri-Blade",
      Quantity: "4 Pairs (4 Clockwise + 4 Counter-Clockwise)",
      Mount: "5mm POPO & Center Hole",
    },
    sku: "DRN-PRP-003",
    subcategory: "Propellers",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },

  // ==========================================
  // 6. ACRYLIC PRODUCTS
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
    material: "3mm High-Transparency Cast Acrylic",
    dimensions: "200 × 200 × 250 mm",
    manufacturing_method: "Laser Cutting & Solvent Weld Fabrication",
    rating: 4.8,
    review_count: 29,
    bestseller: false,
    stock: 25,
    short_description: "Showcase display box with black gloss base for models & collectibles.",
    description:
      "Museum clarity 93% light transmission acrylic showcase. Features seamlessly solvent-welded 90° joints and a heavy black acrylic base.",
    specifications: {
      Clarity: "93% Optical Light Transmission",
      Base: "5mm Gloss Black Acrylic",
      Assembly: "Pre-Assembled Sealed Dust Cover",
    },
    sku: "ACR-BOX-001",
    subcategory: "Display Cases",
    active: true,
    featured: true,
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
    material: "10mm Heavyweight Cast Acrylic & Beveled Edges",
    dimensions: "180 × 120 × 40 mm",
    manufacturing_method: "Diamond Polishing & Reverse Laser Engraving",
    rating: 4.9,
    review_count: 41,
    bestseller: true,
    stock: 30,
    short_description: "Custom award trophy with laser-etched university/college crest.",
    description:
      "Prestigious 10mm thick crystal-clear acrylic award featuring diamond-polished beveled facets and precision reverse engraved typography.",
    specifications: {
      Thickness: "10.0mm Monumental Acrylic",
      Edges: "Diamond Buffed Optical Polish",
      Base: "Solid Weighted Clear Acrylic Stand",
    },
    sku: "ACR-TRP-002",
    subcategory: "Awards & Trophies",
    active: true,
    featured: false,
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
    discount_price: 699,
    material: "4mm High-Impact Acrylic with Dual Stabilizer Feet",
    dimensions: "450 × 300 × 150 mm",
    manufacturing_method: "CNC Routed with Flame Polished Edges",
    rating: 4.7,
    review_count: 18,
    bestseller: false,
    stock: 40,
    short_description: "Desktop sneeze guard & machine safety barrier with pass-through slot.",
    description:
      "Free-standing transparent protective barrier designed for laboratory desks, reception counters, or soldering workbenches. Includes interlocking acrylic stabilizer feet.",
    specifications: {
      Dimensions: "450mm Wide × 300mm Tall",
      Thickness: "4mm Impact-Resistant Sheet",
      Mount: "Slot-in Stabilizer Feet (No screws needed)",
    },
    sku: "ACR-SHD-003",
    subcategory: "Protective Barriers",
    active: true,
    featured: false,
    created_at: "2026-01-03T00:00:00Z",
  },

  // ==========================================
  // 7. DIY KITS
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
    material: "Laser-Cut Acrylic Chassis, TT Motors, Arduino Core",
    dimensions: "200 × 150 × 80 mm (Assembled Robot)",
    manufacturing_method: "Kitted Electro-Mechanical STEM Package",
    rating: 4.9,
    review_count: 78,
    bestseller: true,
    stock: 25,
    short_description:
      "2WD obstacle-avoiding & line-tracking autonomous robot car kit for students.",
    description:
      "Complete educational starter kit containing micro-geared motors, ultrasonic sensor, IR tracking modules, motor driver board, and pre-programmed Arduino-compatible brain with guided coding lessons.",
    specifications: {
      Chassis: "Laser-Cut Dual-Layer Transparent Chassis",
      Sensors: "Ultrasonic HC-SR04 + 2x IR Line Sensors",
      Battery: "Rechargeable 18650 Battery Holder & Charger Included",
    },
    sku: "KIT-ROB-001",
    subcategory: "Robotics Kits",
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
    image_key: "board",
    price: 599,
    discount_price: 449,
    material: "High-Grade Double Sided PCB & 120 Discrete Components",
    dimensions: "120 × 90 mm PCB",
    manufacturing_method: "Component Assembly & Electronics Training",
    rating: 4.8,
    review_count: 51,
    bestseller: false,
    stock: 60,
    short_description:
      "Comprehensive SMD & through-hole soldering learning kit with LED flashing circuit.",
    description:
      "Perfect hands-on learning board for students and hobbyists to master through-hole soldering and 0805 SMD component placement. Produces a rotating LED chase effect when assembled correctly.",
    specifications: {
      Components: "120+ Resistors, Capacitors, Transistors, LEDs & ICs",
      Power: "5V USB or 9V Battery Terminal",
      Skill: "Beginner to Intermediate Training",
    },
    sku: "KIT-SLD-002",
    subcategory: "Soldering Kits",
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

export function sanitizeProduct(p: Product): Product {
  const slug = (p.slug || "").toLowerCase().trim();
  const name = (p.name || "").toLowerCase().trim();

  // 1. Direct match by exact slug
  let canonicalSlug = EXACT_PRODUCT_CATEGORY_MAP[slug];

  // 2. Direct match by exact name keywords if slug is unmapped
  if (!canonicalSlug) {
    if (
      name.includes("mandala") ||
      name.includes("lamp") ||
      name.includes("tree of life") ||
      name.includes("laser") ||
      name.includes("engraved") ||
      (name.includes("keychain") && !name.includes("acrylic")) ||
      name.includes("mdf")
    ) {
      canonicalSlug = "laser-cutting";
    } else if (
      name.includes("gearbox") ||
      name.includes("coupling") ||
      name.includes("flanged brass") ||
      name.includes("machined") ||
      name.includes("mounting plate") ||
      name.includes("prototype block") ||
      name.includes("cnc") ||
      name.includes("bushing")
    ) {
      canonicalSlug = "cnc-machining";
    } else if (
      name.includes("drone") ||
      name.includes("propeller") ||
      name.includes("brushless") ||
      name.includes("fpv") ||
      name.includes("quadcopter") ||
      name.includes("landing gear")
    ) {
      canonicalSlug = "drones-parts";
    } else if (
      name.includes("acrylic") ||
      name.includes("display box") ||
      name.includes("transparent") ||
      name.includes("shield") ||
      name.includes("desk sign") ||
      name.includes("name plate") ||
      name.includes("trophy")
    ) {
      canonicalSlug = "acrylic-products";
    } else if (
      name.includes("diy") ||
      name.includes("starter kit") ||
      name.includes("learning kit") ||
      name.includes("robot kit") ||
      name.includes("robotics") ||
      name.includes("speaker build")
    ) {
      canonicalSlug = "diy-kits";
    } else if (
      name.includes("esp32") ||
      name.includes("arduino") ||
      name.includes("sensor kit") ||
      name.includes("sensor module") ||
      name.includes("oled") ||
      name.includes("pcb") ||
      name.includes("microcontroller") ||
      name.includes("soldering practice")
    ) {
      canonicalSlug = "electronics";
    } else {
      canonicalSlug = normalizeCategorySlug(p.category_slug || (p as any).categorySlug || "3d-printing");
    }
  }

  return {
    ...p,
    categorySlug: canonicalSlug,
    category_slug: canonicalSlug,
    category: p.category || canonicalSlug,
  };
}

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error || !data || data.length === 0) {
        return DEFAULT_CATALOG_PRODUCTS.filter((p) => p.slug !== "college-logo-board").map(
          sanitizeProduct,
        );
      }

      const sanitizedDb = data
        .filter((p) => p.slug !== "college-logo-board")
        .map(sanitizeProduct);

      const dbSlugs = new Set(sanitizedDb.map((p) => p.slug));
      const missingDefaults = DEFAULT_CATALOG_PRODUCTS.filter(
        (p) => p.slug !== "college-logo-board" && !dbSlugs.has(p.slug),
      ).map(sanitizeProduct);

      return [...sanitizedDb, ...missingDefaults];
    } catch {
      return DEFAULT_CATALOG_PRODUCTS.filter((p) => p.slug !== "college-logo-board").map(
        sanitizeProduct,
      );
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
  if (match) return sanitizeProduct(match);

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
    if (subMatch) return sanitizeProduct(subMatch);
  }

  return sanitizeProduct(DEFAULT_CATALOG_PRODUCTS[0]!);
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
          if (data) return sanitizeProduct(data);
        }
      } catch {
        // Fallback
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
