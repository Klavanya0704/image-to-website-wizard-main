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
  "3d-printed-geometric-spiral-vase": "3d-printing",
  "foldable-desktop-phone-tablet-stand": "3d-printing",
  "modular-desktop-stationery-organizer": "3d-printing",
  "interlocking-cable-management-clip-pack": "3d-printing",
  "precision-resin-architectural-tower-model": "3d-printing",
  "hexagonal-geometric-succulent-planter-pot": "3d-printing",
  "geometric-spiral-vase": "3d-printing",
  "universal-foldable-phone-stand-3d": "3d-printing",
  "mini-desk-organizer": "3d-printing",
  "cable-management-clip-set": "3d-printing",
  "resin-architectural-model": "3d-printing",
  "planter-pot-hex": "3d-printing",
  "custom-laser-engraved-wooden-keychain": "laser-cutting",
  "laser-cut-tree-of-life-wooden-led-lamp": "laser-cutting",
  "slot-together-plywood-desktop-organizer": "laser-cutting",
  "multi-layered-wooden-mandala-wall-art": "laser-cutting",
  "laser-engraved-hardwood-photo-frame": "laser-cutting",
  "edge-lit-laser-cut-acrylic-led-sign": "laser-cutting",
  "custom-name-keychain": "laser-cutting",
  "tree-of-life-lamp": "laser-cutting",
  "laser-cut-desk-organizer": "laser-cutting",
  "wooden-wall-art-mandala": "laser-cutting",
  "laser-engraved-photo-frame": "laser-cutting",
  "custom-acrylic-led-sign": "laser-cutting",
  "cnc-v-carved-solid-walnut-name-plate": "cnc-machining",
  "cnc-relief-carved-wooden-decorative-panel": "cnc-machining",
  "cnc-milled-hardwood-keepsake-box": "cnc-machining",
  "cnc-machined-6061-aluminium-l-bracket": "cnc-machining",
  "cnc-precision-aluminium-fixture-plate": "cnc-machining",
  "cnc-machined-high-precision-spur-gear": "cnc-machining",
  "cnc-wooden-name-plate": "cnc-machining",
  "cnc-cut-wooden-mandala": "cnc-machining",
  "cnc-cut-wooden-box": "cnc-machining",
  "cnc-carved-wooden-wall-panel": "cnc-machining",
  "cnc-aluminium-bracket": "cnc-machining",
  "cnc-aluminum-fixture-plate": "cnc-machining",
  "cnc-machined-gear": "cnc-machining",
  "mechanical-gearbox-prototype-model": "cnc-machining",
  "mechanical-prototype-model": "cnc-machining",
  "esp32-dual-core-iot-development-board": "electronics",
  "37-piece-iot-sensor-module-starter-kit": "electronics",
  "double-sided-fr4-prototype-pcb-pack": "electronics",
  "arduino-compatible-atmega328p-microcontroller": "electronics",
  "i2c-096-inch-oled-display-module": "electronics",
  "esp32-iot-maker-board": "electronics",
  "37-in-1-iot-sensor-module-kit": "electronics",
  "fr4-double-sided-prototype-pcb-10pack": "electronics",
  "5-inch-fpv-racing-3k-carbon-fiber-drone-frame": "drones-parts",
  "2207-2450kv-high-power-brushless-drone-motor": "drones-parts",
  "5-inch-tri-blade-fpv-drone-propellers-pack": "drones-parts",
  "30a-4-in-1-blheli-s-electronic-speed-controller": "drones-parts",
  "omnidirectional-58ghz-fpv-cloverleaf-antenna": "drones-parts",
  "fpv-drone-carbon-fiber-frame": "drones-parts",
  "brushless-drone-motor-2207-2450kv": "drones-parts",
  "5-inch-tri-blade-fpv-propellers": "drones-parts",
  "crystal-clear-cast-acrylic-showcase-cube-box": "acrylic-products",
  "laser-engraved-beveled-acrylic-award-trophy": "acrylic-products",
  "high-clarity-heavy-duty-acrylic-sneeze-shield": "acrylic-products",
  "desktop-acrylic-slanted-brochure-menu-holder": "acrylic-products",
  "multi-tiered-clear-acrylic-cosmetic-display-riser": "acrylic-products",
  "clear-cast-acrylic-display-box": "acrylic-products",
  "custom-acrylic-trophy-plaque": "acrylic-products",
  "transparent-protective-acrylic-shield": "acrylic-products",
  "autonomous-4wd-smart-robotic-stem-starter-kit": "diy-kits",
  "educational-electronics-soldering-practice-kit": "diy-kits",
  "diy-portable-bluetooth-stereo-speaker-maker-kit": "diy-kits",
  "miniature-solar-powered-stem-rover-buggy-kit": "diy-kits",
  "smart-weather-station-iot-esp8266-maker-kit": "diy-kits",
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
  {
    id: "3dp-1",
    name: "3D Printed Geometric Spiral Vase",
    title: "3D Printed Geometric Spiral Vase",
    slug: "3d-printed-geometric-spiral-vase",
    image: "/products/3d-printed-geometric-spiral-vase.jpg",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "3d-printed-geometric-spiral-vase",
    price: 699,
    discount_price: 499,
    material: "PLA Pro Matte White",
    dimensions: "120 \u00d7 120 \u00d7 200 mm",
    manufacturing_method: "FDM 3D Printing (0.16mm Layer Height)",
    rating: 4.9,
    review_count: 42,
    bestseller: true,
    stock: 45,
    short_description: "Modern spiral twisted geometry 3D printed decorative vase for desk and home.",
    description: "Precision 3D printed geometric spiral vase with intricate twisted mesh geometry. Made from eco-friendly matte white PLA with high tensile strength and coated waterproof inner walls.",
    specifications: {
      "Print Tech": "FDM 3D Printing",
      "Layer Height": "0.16mm Fine",
      "Infill": "20% Gyroid",
      "Weight": "180g",
      "Water Resistance": "Coated Interior"
    },
    sku: "3DP-VASE-001",
    subcategory: "Vases & Decor",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "3dp-2",
    name: "3D Printed Foldable Phone Stand",
    title: "3D Printed Foldable Phone Stand",
    slug: "foldable-desktop-phone-tablet-stand",
    image: "/products/foldable-desktop-phone-tablet-stand.jpg",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "foldable-desktop-phone-tablet-stand",
    price: 349,
    discount_price: 299,
    material: "High-Strength Tough PLA",
    dimensions: "100 \u00d7 75 \u00d7 15 mm (Folded)",
    manufacturing_method: "Print-in-Place FDM Printing",
    rating: 4.8,
    review_count: 56,
    bestseller: true,
    stock: 80,
    short_description: "Adjustable multi-angle 3D printed print-in-place foldable phone and tablet stand.",
    description: "Sturdy, compact print-in-place 3D printed phone stand with 6 adjustable viewing angles. Features integrated cable routing channel and non-slip rubber grip base.",
    specifications: {
      "Compatibility": "Smartphones & Tablets up to 11 inches",
      "Angles": "6 Adjustable Stepped Positions",
      "Weight": "45g"
    },
    sku: "3DP-STN-002",
    subcategory: "Phone Stands",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "3dp-3",
    name: "3D Printed Mini Desk Organizer",
    title: "3D Printed Mini Desk Organizer",
    slug: "modular-desktop-stationery-organizer",
    image: "/products/modular-desktop-stationery-organizer.jpg",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "modular-desktop-stationery-organizer",
    price: 599,
    discount_price: 449,
    material: "Dual-Tone Matte PLA",
    dimensions: "140 \u00d7 90 \u00d7 85 mm",
    manufacturing_method: "FDM Multi-Extrusion 3D Printing",
    rating: 4.7,
    review_count: 29,
    bestseller: false,
    stock: 35,
    short_description: "Compact modular 3D printed desk organizer with pen cups and phone dock.",
    description: "Modern dual-tone 3D printed desk organizer engineered to neatly store pens, stylus, flash drives, and notes with integrated cable pass-through channels.",
    specifications: {
      "Material": "Tough Matte PLA",
      "Compartments": "4 Modular Sections",
      "Weight": "120g"
    },
    sku: "3DP-ORG-003",
    subcategory: "Desk Accessories",
    active: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "3dp-4",
    name: "3D Printed Cable Management Clips Pack",
    title: "3D Printed Cable Management Clips Pack",
    slug: "interlocking-cable-management-clip-pack",
    image: "/products/interlocking-cable-management-clip-pack.jpg",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "interlocking-cable-management-clip-pack",
    price: 249,
    discount_price: 199,
    material: "Semi-Flexible PETG",
    dimensions: "35 \u00d7 18 \u00d7 12 mm (Each)",
    manufacturing_method: "High-Speed Direct Drive FDM 3D Printing",
    rating: 4.9,
    review_count: 38,
    bestseller: true,
    stock: 120,
    short_description: "Pack of 6 precision 3D printed desk cable routing clips.",
    description: "Keep charging cords, USB-C lines, and HDMI cables securely routed across desks or monitors. High elasticity PETG 3D printed clips prevent cable wear.",
    specifications: {
      "Quantity": "6 Clips per Pack",
      "Cable Diameters": "3mm to 8mm Supported",
      "Adhesive": "Pre-applied 3M Heavy-Duty Backing"
    },
    sku: "3DP-CLP-004",
    subcategory: "Cable Clips",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "3dp-5",
    name: "3D Printed Resin Architectural Model",
    title: "3D Printed Resin Architectural Model",
    slug: "precision-resin-architectural-tower-model",
    image: "/products/precision-resin-architectural-tower-model.jpg",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "precision-resin-architectural-tower-model",
    price: 1499,
    discount_price: 1199,
    material: "SLA Photopolymer Resin",
    dimensions: "80 \u00d7 80 \u00d7 220 mm",
    manufacturing_method: "SLA High-Resolution Resin 3D Printing",
    rating: 4.9,
    review_count: 18,
    bestseller: false,
    stock: 15,
    short_description: "Architectural skyscraper scale model 3D printed in smooth resin.",
    description: "Ultra high-resolution SLA resin 3D printed architectural display model featuring fine structural facades, cantilever balconies, and smooth matte finish.",
    specifications: {
      "Print Tech": "SLA UV Resin",
      "Layer Height": "0.05mm Ultra-Fine",
      "Finish": "Micro-sandblasted Matte Translucent"
    },
    sku: "3DP-ARCH-005",
    subcategory: "Architectural Models",
    active: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "3dp-6",
    name: "3D Printed Hexagonal Planter Pot",
    title: "3D Printed Hexagonal Planter Pot",
    slug: "hexagonal-geometric-succulent-planter-pot",
    image: "/products/hexagonal-geometric-succulent-planter-pot.jpg",
    category: "3D Printing",
    category_slug: "3d-printing",
    categorySlug: "3d-printing",
    image_key: "hexagonal-geometric-succulent-planter-pot",
    price: 399,
    discount_price: 299,
    material: "Speckled Marble PLA",
    dimensions: "90 \u00d7 90 \u00d7 80 mm",
    manufacturing_method: "FDM 3D Printing with Drainage Base",
    rating: 4.8,
    review_count: 45,
    bestseller: true,
    stock: 60,
    short_description: "Faceted hexagonal 3D printed succulent planter with integrated drainage.",
    description: "Modern faceted planter pot with internal drainage holes and detachable drip saucer, 3D printed in natural speckled stone-finish PLA.",
    specifications: {
      "Pattern": "Low-Poly Hexagonal",
      "Drainage": "Removable Base Saucer Included",
      "Material": "Stone Marble PLA"
    },
    sku: "3DP-PLT-006",
    subcategory: "Planters",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "lc-1",
    name: "Custom Laser Engraved Wooden Keychain",
    title: "Custom Laser Engraved Wooden Keychain",
    slug: "custom-laser-engraved-wooden-keychain",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "custom-laser-engraved-wooden-keychain",
    price: 199,
    discount_price: 149,
    material: "4mm Birch Plywood & Stainless Steel",
    dimensions: "65 \u00d7 30 \u00d7 4 mm",
    manufacturing_method: "CO2 Laser Cutting & Raster Engraving",
    rating: 4.9,
    review_count: 88,
    bestseller: true,
    stock: 150,
    short_description: "Personalized laser engraved birch wood keychain with dark burnished edges.",
    description: "Precision laser-cut birch keychain with custom typographic engraving, chamfered corners, and rust-resistant steel key ring.",
    specifications: {
      "Material": "Baltic Birch Wood",
      "Laser Precision": "0.1mm Beam Kerf",
      "Hardware": "Nickel-Plated Split Ring"
    },
    sku: "LC-KEY-001",
    subcategory: "Keychains",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "lc-2",
    name: "Laser Cut Tree of Life Wooden LED Lamp",
    title: "Laser Cut Tree of Life Wooden LED Lamp",
    slug: "laser-cut-tree-of-life-wooden-led-lamp",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "laser-cut-tree-of-life-wooden-led-lamp",
    price: 1299,
    discount_price: 999,
    material: "MDF / Plywood with Acrylic Diffuser",
    dimensions: "180 \u00d7 180 \u00d7 240 mm",
    manufacturing_method: "Laser Cutting with Integrated 5V LED",
    rating: 4.9,
    review_count: 64,
    bestseller: true,
    stock: 40,
    short_description: "Intricate laser-cut Tree of Life ambient decorative wooden night lamp.",
    description: "Stunning concentric laser-cut wooden fretwork housing warm white internal LEDs that cast geometric branch patterns across surfaces.",
    specifications: {
      "Power": "USB 5V Powered with Inline Switch",
      "Light Source": "Warm Amber LED Core",
      "Wood Finish": "Natural Sanded Danish Oil"
    },
    sku: "LC-LMP-002",
    subcategory: "Lamps & Lighting",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "lc-3",
    name: "Slot-Together Plywood Desktop Organizer",
    title: "Slot-Together Plywood Desktop Organizer",
    slug: "slot-together-plywood-desktop-organizer",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "slot-together-plywood-desktop-organizer",
    price: 899,
    discount_price: 699,
    material: "6mm Baltic Birch Plywood",
    dimensions: "280 \u00d7 160 \u00d7 140 mm",
    manufacturing_method: "CNC Laser Cut Mortise & Tenon Joinery",
    rating: 4.8,
    review_count: 37,
    bestseller: true,
    stock: 50,
    short_description: "Interlocking birch plywood desk stand with pen holder and letter caddy.",
    description: "Tool-less interlocking laser-cut wooden desktop organizer with dedicated shelves for notebooks, phone stand, and stationery cups.",
    specifications: {
      "Assembly": "Tool-Free Interlocking Friction Fit",
      "Finish": "Hand-Sanded Natural Wood Grain",
      "Weight": "450g"
    },
    sku: "LC-DSK-003",
    subcategory: "Desk Organization",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "lc-4",
    name: "Multi-Layered Wooden Mandala Wall Art",
    title: "Multi-Layered Wooden Mandala Wall Art",
    slug: "multi-layered-wooden-mandala-wall-art",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "multi-layered-wooden-mandala-wall-art",
    price: 1499,
    discount_price: 1199,
    material: "5-Layer Birch & Walnut Plywood",
    dimensions: "300 \u00d7 300 \u00d7 20 mm",
    manufacturing_method: "Multi-Layer Laser Cutting & Hand Stacking",
    rating: 4.9,
    review_count: 52,
    bestseller: true,
    stock: 30,
    short_description: "5-layer 3D laser-cut sacred geometry mandala decorative wall plaque.",
    description: "Mastercrafted 5-layer geometric mandala assembled from precision laser-cut hardwood layers with contrasting natural and stained wood tones.",
    specifications: {
      "Layers": "5 Interlocking Relief Layers",
      "Hanging": "Pre-installed Flush Wall Mount",
      "Weight": "650g"
    },
    sku: "LC-MND-004",
    subcategory: "Wall Art",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "lc-5",
    name: "Laser Engraved Hardwood Photo Frame",
    title: "Laser Engraved Hardwood Photo Frame",
    slug: "laser-engraved-hardwood-photo-frame",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "laser-engraved-hardwood-photo-frame",
    price: 799,
    discount_price: 599,
    material: "Natural Oak & Float Glass",
    dimensions: "220 \u00d7 170 \u00d7 18 mm (For 4x6 Photo)",
    manufacturing_method: "High-Detail Vector & Raster Laser Engraving",
    rating: 4.8,
    review_count: 31,
    bestseller: false,
    stock: 45,
    short_description: "Solid oak wood picture frame with delicate laser engraved floral patterns.",
    description: "Premium solid oak photo frame adorned with intricate laser engraved botanical filigree patterns around the glass photo window.",
    specifications: {
      "Photo Size": "Standard 4 \u00d7 6 Inch (10 \u00d7 15 cm)",
      "Display": "Horizontal or Vertical Easel Stand",
      "Wood": "Kiln-Dried Solid Oak"
    },
    sku: "LC-FRM-005",
    subcategory: "Frames",
    active: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "lc-6",
    name: "Edge-Lit Laser Cut Acrylic LED Sign",
    title: "Edge-Lit Laser Cut Acrylic LED Sign",
    slug: "edge-lit-laser-cut-acrylic-led-sign",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    category: "Laser Cutting",
    category_slug: "laser-cutting",
    categorySlug: "laser-cutting",
    image_key: "edge-lit-laser-cut-acrylic-led-sign",
    price: 1299,
    discount_price: 999,
    material: "Optical Cast Acrylic & Aluminum Base",
    dimensions: "180 \u00d7 140 \u00d7 35 mm",
    manufacturing_method: "Laser Engraving with Aluminum LED Base",
    rating: 4.9,
    review_count: 48,
    bestseller: true,
    stock: 35,
    short_description: "Illuminated laser-etched clear acrylic desk plaque with vibrant LED glow.",
    description: "High-clarity cast acrylic plaque laser-etched with custom college laboratory insignia, illuminated by high-efficiency LED lights embedded in the brushed aluminum base.",
    specifications: {
      "Lighting": "RGB / Cyan LED Base with Touch Switch",
      "Acrylic Thickness": "5mm Optical Grade Cast",
      "Power": "USB 5V Cable Included"
    },
    sku: "LC-SGN-006",
    subcategory: "Acrylic Signs",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cnc-1",
    name: "CNC V-Carved Solid Walnut Name Plate",
    title: "CNC V-Carved Solid Walnut Name Plate",
    slug: "cnc-v-carved-solid-walnut-name-plate",
    image: "/products/cnc-v-carved-solid-walnut-name-plate.jpg",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image_key: "cnc-v-carved-solid-walnut-name-plate",
    price: 699,
    discount_price: 499,
    material: "American Dark Walnut Wood",
    dimensions: "250 \u00d7 60 \u00d7 25 mm",
    manufacturing_method: "3-Axis CNC Router V-Bit Milling",
    rating: 4.9,
    review_count: 41,
    bestseller: true,
    stock: 40,
    short_description: "Executive desk nameplate CNC carved from dark walnut with beveled edges.",
    description: "Carved from premium kiln-dried solid walnut on a precision 3-axis CNC router with deep V-groove lettering and beeswax polish.",
    specifications: {
      "Carving": "60-Degree V-Bit Deep Relief",
      "Wood": "Grade A Dark American Walnut",
      "Base": "Weighted Chamfered Bottom"
    },
    sku: "CNC-WNP-001",
    subcategory: "Wooden CNC Products",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cnc-2",
    name: "CNC Relief-Carved Wooden Decorative Panel",
    title: "CNC Relief-Carved Wooden Decorative Panel",
    slug: "cnc-relief-carved-wooden-decorative-panel",
    image: "/products/cnc-relief-carved-wooden-decorative-panel.jpg",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image_key: "cnc-relief-carved-wooden-decorative-panel",
    price: 2499,
    discount_price: 1999,
    material: "Solid Teak Wood",
    dimensions: "400 \u00d7 200 \u00d7 25 mm",
    manufacturing_method: "3D Rotary Ballnose CNC Milling",
    rating: 4.9,
    review_count: 27,
    bestseller: true,
    stock: 20,
    short_description: "3D parametric wave relief panel carved from solid teak wood on CNC.",
    description: "Continuous 3D geometric wave topography sculpted into solid teak wood using a ballnose CNC milling bit, bringing warm natural texture to walls.",
    specifications: {
      "Tooling": "3mm Ballnose 3D Surface Pass",
      "Wood": "Seasoned Teak Timber",
      "Finish": "Clear Satin Polyurethane"
    },
    sku: "CNC-WPN-002",
    subcategory: "Wooden CNC Products",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cnc-3",
    name: "CNC Milled Hardwood Keepsake Box",
    title: "CNC Milled Hardwood Keepsake Box",
    slug: "cnc-milled-hardwood-keepsake-box",
    image: "/products/cnc-milled-hardwood-keepsake-box.jpg",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image_key: "cnc-milled-hardwood-keepsake-box",
    price: 1299,
    discount_price: 999,
    material: "Solid White Oak",
    dimensions: "150 \u00d7 100 \u00d7 60 mm",
    manufacturing_method: "Pocket & Contour CNC Milling",
    rating: 4.8,
    review_count: 33,
    bestseller: false,
    stock: 25,
    short_description: "Pocket milled solid oak keepsake box with friction-fit lid.",
    description: "Carved from a solid block of white oak on a CNC milling machine. Features a velvet lined interior cavity and tight tolerance magnetic lid closure.",
    specifications: {
      "Cavity": "Deep Pocket CNC Profile",
      "Closure": "Embedded Neodymium Magnets",
      "Finish": "Organic Danish Oil"
    },
    sku: "CNC-WBX-003",
    subcategory: "Wooden CNC Products",
    active: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cnc-4",
    name: "CNC Machined 6061 Aluminium L-Bracket",
    title: "CNC Machined 6061 Aluminium L-Bracket",
    slug: "cnc-machined-6061-aluminium-l-bracket",
    image: "/products/cnc-machined-6061-aluminium-l-bracket.jpg",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image_key: "cnc-machined-6061-aluminium-l-bracket",
    price: 799,
    discount_price: 599,
    material: "6061-T6 Billet Aluminium",
    dimensions: "75 \u00d7 75 \u00d7 25 mm (6mm Wall)",
    manufacturing_method: "3-Axis CNC Vertical Machining Center",
    rating: 4.9,
    review_count: 49,
    bestseller: true,
    stock: 70,
    short_description: "High-strength 90-degree billet aluminium CNC mounting bracket.",
    description: "Rigid 90-degree structural bracket milled from aerospace 6061-T6 aluminium with counterbored M5 holes and silver bead-blasted anodized coating.",
    specifications: {
      "Alloy": "6061-T6 Billet Aluminum",
      "Tolerance": "\u00b10.02 mm",
      "Surface": "Bead-Blasted Clear Anodized"
    },
    sku: "CNC-BRK-004",
    subcategory: "Metal CNC Machining",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cnc-5",
    name: "CNC Precision Aluminium Fixture Plate",
    title: "CNC Precision Aluminium Fixture Plate",
    slug: "cnc-precision-aluminium-fixture-plate",
    image: "/products/cnc-precision-aluminium-fixture-plate.jpg",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image_key: "cnc-precision-aluminium-fixture-plate",
    price: 1899,
    discount_price: 1499,
    material: "Mic-6 Cast Aluminium Tooling Plate",
    dimensions: "200 \u00d7 150 \u00d7 12 mm",
    manufacturing_method: "CNC Face Milled & Tapped M6 Grid",
    rating: 4.8,
    review_count: 22,
    bestseller: false,
    stock: 30,
    short_description: "Precision surfaced aluminium tooling fixture plate with threaded M6 grid.",
    description: "Ultra-flat aluminium tooling plate face-milled on CNC with a precise 25mm grid of M6 threaded mounting holes for prototype clamping and fixturing.",
    specifications: {
      "Flatness": "Within 0.05mm across surface",
      "Grid Pattern": "25mm Spacing M6 Tapped Holes",
      "Material": "Mic-6 Precision Cast Aluminum"
    },
    sku: "CNC-PLT-005",
    subcategory: "Metal CNC Machining",
    active: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cnc-6",
    name: "CNC Machined High-Precision Spur Gear",
    title: "CNC Machined High-Precision Spur Gear",
    slug: "cnc-machined-high-precision-spur-gear",
    image: "/products/cnc-machined-high-precision-spur-gear.jpg",
    category: "CNC Machining",
    category_slug: "cnc-machining",
    categorySlug: "cnc-machining",
    image_key: "cnc-machined-high-precision-spur-gear",
    price: 899,
    discount_price: 699,
    material: "AISI 304 Stainless Steel",
    dimensions: "Outer \u00d8 65 mm, Bore 8 mm (Mod 1.5)",
    manufacturing_method: "CNC Gear Hobbing & Lathe Turning",
    rating: 4.9,
    review_count: 35,
    bestseller: true,
    stock: 50,
    short_description: "Precision hobbed 304 stainless steel spur gear with central keyway.",
    description: "Industrial quality spur gear machined from 304 stainless steel on a CNC lathe with precision tooth profile and broached shaft keyway.",
    specifications: {
      "Module": "1.5 Metric Mod",
      "Teeth Count": "40 Involute Teeth",
      "Material": "AISI 304 Stainless Steel"
    },
    sku: "CNC-GER-006",
    subcategory: "Metal CNC Machining",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "elec-1",
    name: "ESP32 Dual-Core IoT Development Board",
    title: "ESP32 Dual-Core IoT Development Board",
    slug: "esp32-dual-core-iot-development-board",
    image: "/products/esp32-dual-core-iot-development-board.jpg",
    category: "Electronics",
    category_slug: "electronics",
    categorySlug: "electronics",
    image_key: "esp32-dual-core-iot-development-board",
    price: 649,
    discount_price: 499,
    material: "FR4 Matte Black PCB & ESP32-WROOM-32",
    dimensions: "52 \u00d7 28 \u00d7 12 mm",
    manufacturing_method: "SMT Pick & Place Assembly",
    rating: 4.9,
    review_count: 92,
    bestseller: true,
    stock: 100,
    short_description: "Dual-core Wi-Fi & Bluetooth microcontroller board with USB-C.",
    description: "High-performance ESP32 development board featuring 240MHz dual cores, integrated Wi-Fi and Bluetooth, USB-C programming port, and gold pin headers.",
    specifications: {
      "Processor": "Tensilica Xtensa Dual-Core 32-bit LX6",
      "Wireless": "Wi-Fi 802.11 b/g/n + Bluetooth 4.2 BLE",
      "Interface": "USB Type-C CH340 Chipset"
    },
    sku: "EL-ESP-001",
    subcategory: "Microcontrollers",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "elec-2",
    name: "37-Piece IoT Sensor Module Starter Kit",
    title: "37-Piece IoT Sensor Module Starter Kit",
    slug: "37-piece-iot-sensor-module-starter-kit",
    image: "/products/37-piece-iot-sensor-module-starter-kit.jpg",
    category: "Electronics",
    category_slug: "electronics",
    categorySlug: "electronics",
    image_key: "37-piece-iot-sensor-module-starter-kit",
    price: 1899,
    discount_price: 1499,
    material: "Mixed Silicon Sensors on FR4 PCBs",
    dimensions: "200 \u00d7 140 \u00d7 40 mm (Kit Box)",
    manufacturing_method: "Multi-Sensor SMT Production",
    rating: 4.9,
    review_count: 68,
    bestseller: true,
    stock: 40,
    short_description: "Comprehensive 37-sensor breakout module kit for Arduino & ESP32.",
    description: "Essential laboratory sensor kit including ultrasonic distance, digital temperature/humidity, PIR motion, light, sound, relay, and gas detection breakout modules.",
    specifications: {
      "Modules Count": "37 Pre-Soldered Sensor Boards",
      "Compatibility": "Arduino, ESP32, Raspberry Pi (3.3V & 5V)",
      "Packaging": "Compartmentalized Transparent Storage Case"
    },
    sku: "EL-SNS-002",
    subcategory: "Sensors & Modules",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "elec-3",
    name: "Double-Sided FR4 Prototype PCB Pack",
    title: "Double-Sided FR4 Prototype PCB Pack",
    slug: "double-sided-fr4-prototype-pcb-pack",
    image: "/products/double-sided-fr4-prototype-pcb-pack.jpg",
    category: "Electronics",
    category_slug: "electronics",
    categorySlug: "electronics",
    image_key: "double-sided-fr4-prototype-pcb-pack",
    price: 299,
    discount_price: 199,
    material: "1.6mm Green FR4 Glass Fiber",
    dimensions: "50 \u00d7 70 mm (Pack of 10)",
    manufacturing_method: "CNC Drilled & HASL Tin Plated",
    rating: 4.8,
    review_count: 55,
    bestseller: true,
    stock: 150,
    short_description: "10-pack of double-sided plated-through hole universal prototype circuit boards.",
    description: "Professional 2.54mm grid prototype circuit boards with plated-through holes, green solder mask, and clear silkscreen grid markings.",
    specifications: {
      "Grid Pitch": "2.54mm (0.1 inch) Standard Breadboard",
      "Plating": "HASL Lead-Free Tin Plated Copper",
      "Quantity": "10 Universal Boards per Pack"
    },
    sku: "EL-PCB-003",
    subcategory: "Prototyping Boards",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "elec-4",
    name: "Arduino Compatible ATmega328P Microcontroller",
    title: "Arduino Compatible ATmega328P Microcontroller",
    slug: "arduino-compatible-atmega328p-microcontroller",
    image: "/products/arduino-compatible-atmega328p-microcontroller.jpg",
    category: "Electronics",
    category_slug: "electronics",
    categorySlug: "electronics",
    image_key: "arduino-compatible-atmega328p-microcontroller",
    price: 549,
    discount_price: 399,
    material: "Blue FR4 PCB & ATmega328P DIP IC",
    dimensions: "68 \u00d7 53 \u00d7 15 mm",
    manufacturing_method: "Automated SMT & DIP Soldering",
    rating: 4.8,
    review_count: 62,
    bestseller: true,
    stock: 75,
    short_description: "Classic ATmega328P prototyping microcontroller board with 14 digital I/O pins.",
    description: "Standard university lab microcontroller board equipped with 14 digital I/O pins, 6 analog inputs, 16MHz crystal oscillator, and USB connection.",
    specifications: {
      "Core": "ATmega328P @ 16MHz",
      "Operating Voltage": "5V DC (7-12V Input)",
      "Flash Memory": "32 KB"
    },
    sku: "EL-ARD-004",
    subcategory: "Microcontrollers",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "elec-5",
    name: "I2C 0.96-Inch OLED Display Module",
    title: "I2C 0.96-Inch OLED Display Module",
    slug: "i2c-096-inch-oled-display-module",
    image: "/products/i2c-096-inch-oled-display-module.jpg",
    category: "Electronics",
    category_slug: "electronics",
    categorySlug: "electronics",
    image_key: "i2c-096-inch-oled-display-module",
    price: 349,
    discount_price: 249,
    material: "OLED Glass Screen on Blue PCB",
    dimensions: "27 \u00d7 27 \u00d7 4 mm",
    manufacturing_method: "High-Contrast OLED Glass Bonding",
    rating: 4.9,
    review_count: 41,
    bestseller: false,
    stock: 90,
    short_description: "128x64 high-contrast blue I2C monochrome OLED display module.",
    description: "Crisp, self-illuminating 0.96-inch OLED screen with 128x64 resolution and standard 4-pin I2C communication interface for compact IoT readouts.",
    specifications: {
      "Resolution": "128 \u00d7 64 Pixels",
      "Interface": "4-Pin I2C (GND, VCC, SCL, SDA)",
      "Voltage": "3.3V - 5V DC Compatible"
    },
    sku: "EL-DSP-005",
    subcategory: "Displays",
    active: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "drn-1",
    name: "5-Inch FPV Racing 3K Carbon Fiber Drone Frame",
    title: "5-Inch FPV Racing 3K Carbon Fiber Drone Frame",
    slug: "5-inch-fpv-racing-3k-carbon-fiber-drone-frame",
    image: "/products/5-inch-fpv-racing-3k-carbon-fiber-drone-frame.jpg",
    category: "Drones & Parts",
    category_slug: "drones-parts",
    categorySlug: "drones-parts",
    image_key: "5-inch-fpv-racing-3k-carbon-fiber-drone-frame",
    price: 1599,
    discount_price: 1299,
    material: "3K Twill Carbon Fiber & Anodized Aluminum",
    dimensions: "Wheelbase 225 mm (5mm Arms)",
    manufacturing_method: "CNC Carbon Fiber Routing & Chamfering",
    rating: 4.9,
    review_count: 53,
    bestseller: true,
    stock: 35,
    short_description: "High-durability 5-inch freestyle FPV quadcopter carbon fiber airframe.",
    description: "Engineered for durability and agility, this 5-inch FPV racing drone frame features 5mm thick chamfered carbon fiber arms and CNC aluminum camera cage.",
    specifications: {
      "Wheelbase": "225mm Diagonal",
      "Arm Thickness": "5mm 3K Carbon Fiber",
      "Stack Mount": "30.5\u00d730.5mm & 20\u00d720mm Dual Pattern",
      "Weight": "115g"
    },
    sku: "DRN-FRM-001",
    subcategory: "Drone Frames",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "drn-2",
    name: "2207 2450KV High-Power Brushless Drone Motor",
    title: "2207 2450KV High-Power Brushless Drone Motor",
    slug: "2207-2450kv-high-power-brushless-drone-motor",
    image: "/products/2207-2450kv-high-power-brushless-drone-motor.jpg",
    category: "Drones & Parts",
    category_slug: "drones-parts",
    categorySlug: "drones-parts",
    image_key: "2207-2450kv-high-power-brushless-drone-motor",
    price: 3499,
    discount_price: 2999,
    material: "N52H Magnets & Titanium Alloy Shaft",
    dimensions: "Stator \u00d8 22 mm \u00d7 H 7 mm (Pack of 4)",
    manufacturing_method: "Precision CNC Turning & Dynamic Balancing",
    rating: 4.9,
    review_count: 39,
    bestseller: true,
    stock: 25,
    short_description: "Set of 4 high-thrust 2207 2450KV brushless FPV racing motors (4S/6S).",
    description: "High-efficiency brushless motors with oxygen-free copper windings, curved N52H arc magnets, and titanium hollow shafts producing up to 1.8kg thrust per motor.",
    specifications: {
      "KV Rating": "2450 KV (4S-6S Lipo)",
      "Max Thrust": "1,850g per motor",
      "Shaft Diameter": "M5 Steel Threaded Shaft",
      "Quantity": "Set of 4 Motors"
    },
    sku: "DRN-MTR-002",
    subcategory: "Motors",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "drn-3",
    name: "5-Inch Tri-Blade FPV Drone Propellers Pack",
    title: "5-Inch Tri-Blade FPV Drone Propellers Pack",
    slug: "5-inch-tri-blade-fpv-drone-propellers-pack",
    image: "/products/5-inch-tri-blade-fpv-drone-propellers-pack.jpg",
    category: "Drones & Parts",
    category_slug: "drones-parts",
    categorySlug: "drones-parts",
    image_key: "5-inch-tri-blade-fpv-drone-propellers-pack",
    price: 349,
    discount_price: 249,
    material: "Bayer High-Toughness Polycarbonate",
    dimensions: "5.1 \u00d7 4.3 \u00d7 3 (4 Pairs / 8 Blades)",
    manufacturing_method: "Precision High-Pressure Injection Molding",
    rating: 4.8,
    review_count: 61,
    bestseller: true,
    stock: 120,
    short_description: "Pack of 4 pairs (8 pcs) crash-resistant tri-blade FPV racing propellers.",
    description: "High-efficiency 5.1-inch tri-blade propellers engineered for crisp throttle response, high top speed, and extreme impact durability.",
    specifications: {
      "Size": "5.1 inch Diameter \u00d7 4.3 Pitch",
      "Quantity": "4 CW + 4 CCW (4 Pairs)",
      "Center Hole": "5mm Standard M5 POPO Compatible"
    },
    sku: "DRN-PRP-003",
    subcategory: "Propellers",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "drn-4",
    name: "30A 4-in-1 BLHeli_S Electronic Speed Controller",
    title: "30A 4-in-1 BLHeli_S Electronic Speed Controller",
    slug: "30a-4-in-1-blheli-s-electronic-speed-controller",
    image: "/products/30a-4-in-1-blheli-s-electronic-speed-controller.jpg",
    category: "Drones & Parts",
    category_slug: "drones-parts",
    categorySlug: "drones-parts",
    image_key: "30a-4-in-1-blheli-s-electronic-speed-controller",
    price: 1899,
    discount_price: 1499,
    material: "4-Layer 3oz Copper Heavy PCB",
    dimensions: "36 \u00d7 36 mm (Mounting 30.5\u00d730.5mm)",
    manufacturing_method: "High-Current SMT Surface Mount",
    rating: 4.8,
    review_count: 28,
    bestseller: false,
    stock: 30,
    short_description: "30A continuous 4-in-1 BLHeli_S brushless motor ESC board.",
    description: "Integrated 4-in-1 speed controller supporting DShot600 protocols with built-in current sensor and heavy copper heat dissipation layers.",
    specifications: {
      "Continuous Current": "30A \u00d7 4 Channels (Burst 35A)",
      "Input Voltage": "2S - 6S LiPo",
      "Firmware": "BLHeli_S / Bluejay Compatible"
    },
    sku: "DRN-ESC-004",
    subcategory: "Speed Controllers",
    active: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "drn-5",
    name: "Omnidirectional 5.8GHz FPV Cloverleaf Antenna",
    title: "Omnidirectional 5.8GHz FPV Cloverleaf Antenna",
    slug: "omnidirectional-58ghz-fpv-cloverleaf-antenna",
    image: "/products/omnidirectional-58ghz-fpv-cloverleaf-antenna.jpg",
    category: "Drones & Parts",
    category_slug: "drones-parts",
    categorySlug: "drones-parts",
    image_key: "omnidirectional-58ghz-fpv-cloverleaf-antenna",
    price: 499,
    discount_price: 399,
    material: "Semi-Rigid Coaxial Cable & Copper Lobes",
    dimensions: "Length 85 mm, Weight 8.5g",
    manufacturing_method: "High-Frequency RF Calibration",
    rating: 4.9,
    review_count: 34,
    bestseller: false,
    stock: 45,
    short_description: "Circular polarized 5.8GHz video transmitter antenna with SMA connector.",
    description: "Low-loss RHCP circular polarized video antenna tuned for maximum range and penetration in FPV racing and video streaming.",
    specifications: {
      "Frequency Range": "5.6 GHz - 6.0 GHz",
      "Gain": "2.5 dBi RHCP",
      "Connector": "Standard Male SMA"
    },
    sku: "DRN-ANT-005",
    subcategory: "Antennas & Video",
    active: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "acr-1",
    name: "Crystal Clear Cast Acrylic Showcase Cube Box",
    title: "Crystal Clear Cast Acrylic Showcase Cube Box",
    slug: "crystal-clear-cast-acrylic-showcase-cube-box",
    image: "/products/crystal-clear-cast-acrylic-showcase-cube-box.jpg",
    category: "Acrylic Products",
    category_slug: "acrylic-products",
    categorySlug: "acrylic-products",
    image_key: "crystal-clear-cast-acrylic-showcase-cube-box",
    price: 899,
    discount_price: 699,
    material: "3mm Optical Cast Acrylic & Black Base",
    dimensions: "150 \u00d7 150 \u00d7 150 mm",
    manufacturing_method: "Precision Laser Cut & Flame Polished",
    rating: 4.9,
    review_count: 47,
    bestseller: true,
    stock: 50,
    short_description: "Dust-proof crystal clear transparent showcase cube with glossy black base.",
    description: "Museum quality seamless 5-sided acrylic display case engineered to protect collectibles, electronics, and awards with 99% light clarity.",
    specifications: {
      "Light Transmittance": "99.2% Optically Clear",
      "Base": "Glossy Black 5mm Acrylic Pedestal",
      "Joints": "Invisible Solvent-Welded Seams"
    },
    sku: "ACR-BOX-001",
    subcategory: "Display Boxes",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "acr-2",
    name: "Laser Engraved Beveled Acrylic Award Trophy",
    title: "Laser Engraved Beveled Acrylic Award Trophy",
    slug: "laser-engraved-beveled-acrylic-award-trophy",
    image: "/products/laser-engraved-beveled-acrylic-award-trophy.jpg",
    category: "Acrylic Products",
    category_slug: "acrylic-products",
    categorySlug: "acrylic-products",
    image_key: "laser-engraved-beveled-acrylic-award-trophy",
    price: 1199,
    discount_price: 899,
    material: "15mm Thick Solid Cast Acrylic",
    dimensions: "180 \u00d7 120 \u00d7 25 mm",
    manufacturing_method: "Diamond Edge Milled & CO2 Laser Etched",
    rating: 4.9,
    review_count: 36,
    bestseller: true,
    stock: 35,
    short_description: "Prestige custom engraved acrylic corporate award trophy with beveled base.",
    description: "Substantial 15mm thick crystal acrylic award plaque featuring diamond-polished beveled edges and frosted laser engraved insignia.",
    specifications: {
      "Thickness": "15mm Heavy Premium Cast Acrylic",
      "Edge Finish": "Diamond Polished 45\u00b0 Bevel",
      "Engraving": "Sub-Surface Laser Etching"
    },
    sku: "ACR-TRP-002",
    subcategory: "Trophies & Awards",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "acr-3",
    name: "High-Clarity Heavy Duty Acrylic Sneeze Shield",
    title: "High-Clarity Heavy Duty Acrylic Sneeze Shield",
    slug: "high-clarity-heavy-duty-acrylic-sneeze-shield",
    image: "/products/high-clarity-heavy-duty-acrylic-sneeze-shield.jpg",
    category: "Acrylic Products",
    category_slug: "acrylic-products",
    categorySlug: "acrylic-products",
    image_key: "high-clarity-heavy-duty-acrylic-sneeze-shield",
    price: 1499,
    discount_price: 1199,
    material: "5mm Impact-Resistant Cast Acrylic",
    dimensions: "600 \u00d7 500 \u00d7 5 mm",
    manufacturing_method: "CNC Routed with Pass-Through Slot",
    rating: 4.8,
    review_count: 25,
    bestseller: false,
    stock: 25,
    short_description: "Freestanding transparent protective countertop barrier shield with slot.",
    description: "Heavy-duty 5mm optical acrylic protective sneeze guard barrier with rounded safety corners, document transaction slot, and interlocking acrylic support feet.",
    specifications: {
      "Panel Size": "600mm Wide \u00d7 500mm High",
      "Transaction Slot": "250mm \u00d7 100mm Cutout",
      "Base": "Dual Interlocking Slip-On Feet"
    },
    sku: "ACR-SHD-003",
    subcategory: "Safety Barriers",
    active: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "acr-4",
    name: "Desktop Acrylic Slanted Brochure & Menu Holder",
    title: "Desktop Acrylic Slanted Brochure & Menu Holder",
    slug: "desktop-acrylic-slanted-brochure-menu-holder",
    image: "/products/desktop-acrylic-slanted-brochure-menu-holder.jpg",
    category: "Acrylic Products",
    category_slug: "acrylic-products",
    categorySlug: "acrylic-products",
    image_key: "desktop-acrylic-slanted-brochure-menu-holder",
    price: 349,
    discount_price: 249,
    material: "2.5mm Clear Cast Acrylic",
    dimensions: "A5 Size (210 \u00d7 150 \u00d7 60 mm)",
    manufacturing_method: "Heat Line Bending & Laser Cutting",
    rating: 4.8,
    review_count: 52,
    bestseller: true,
    stock: 100,
    short_description: "L-shaped slanted clear acrylic desktop sign and flyer display stand.",
    description: "Seamlessly thermoformed slanted clear acrylic display stand designed for double-sided or single-sided A5 prints, menus, and lab instructions.",
    specifications: {
      "Orientation": "Slanted Portrait L-Stand",
      "Paper Size": "Standard A5 (148 \u00d7 210 mm)",
      "Material": "UV-Resistant Clear Acrylic"
    },
    sku: "ACR-STD-004",
    subcategory: "Display Stands",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "acr-5",
    name: "Multi-Tiered Clear Acrylic Cosmetic Display Riser",
    title: "Multi-Tiered Clear Acrylic Cosmetic Display Riser",
    slug: "multi-tiered-clear-acrylic-cosmetic-display-riser",
    image: "/products/multi-tiered-clear-acrylic-cosmetic-display-riser.jpg",
    category: "Acrylic Products",
    category_slug: "acrylic-products",
    categorySlug: "acrylic-products",
    image_key: "multi-tiered-clear-acrylic-cosmetic-display-riser",
    price: 649,
    discount_price: 499,
    material: "3mm Clear Cast Acrylic",
    dimensions: "200 \u00d7 150 \u00d7 100 mm (3 Tiers)",
    manufacturing_method: "Heat Strip Bending & Polishing",
    rating: 4.9,
    review_count: 39,
    bestseller: false,
    stock: 40,
    short_description: "3-tier stepped clear acrylic display riser shelf for models and products.",
    description: "Multi-tiered transparent acrylic step riser shelf offering clear graduated visibility for electronic prototypes, figures, and cosmetics.",
    specifications: {
      "Tiers": "3 Elevated Step Levels (30mm depth each)",
      "Load Capacity": "Up to 3kg total weight",
      "Clarity": "Glass-like High Gloss Transparency"
    },
    sku: "ACR-RSR-005",
    subcategory: "Display Stands",
    active: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "diy-1",
    name: "Autonomous 4WD Smart Robotic STEM Starter Kit",
    title: "Autonomous 4WD Smart Robotic STEM Starter Kit",
    slug: "autonomous-4wd-smart-robotic-stem-starter-kit",
    image: "/products/autonomous-4wd-smart-robotic-stem-starter-kit.jpg",
    category: "DIY Kits",
    category_slug: "diy-kits",
    categorySlug: "diy-kits",
    image_key: "autonomous-4wd-smart-robotic-stem-starter-kit",
    price: 2799,
    discount_price: 2299,
    material: "Acrylic Chassis, TT Motors, Arduino Shield",
    dimensions: "250 \u00d7 160 \u00d7 80 mm (Assembled)",
    manufacturing_method: "Complete Educational DIY Kit",
    rating: 4.9,
    review_count: 76,
    bestseller: true,
    stock: 40,
    short_description: "All-in-one 4WD obstacle-avoiding educational robotic maker vehicle kit.",
    description: "Comprehensive robotics maker kit equipped with dual-layer acrylic chassis, 4 DC gearmotors, L298N motor driver, HC-SR04 ultrasonic sensor, line tracking module, and full assembly guide.",
    specifications: {
      "Drive System": "4WD Independent TT Geared Motors",
      "Sensors": "Ultrasonic Sonar + 3-Way Line Tracker",
      "Included": "Chassis, Motors, Driver, Microcontroller, Hardware"
    },
    sku: "DIY-ROB-001",
    subcategory: "Robotics Kits",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "diy-2",
    name: "Educational Electronics Soldering Practice Kit",
    title: "Educational Electronics Soldering Practice Kit",
    slug: "educational-electronics-soldering-practice-kit",
    image: "/products/educational-electronics-soldering-practice-kit.jpg",
    category: "DIY Kits",
    category_slug: "diy-kits",
    categorySlug: "diy-kits",
    image_key: "educational-electronics-soldering-practice-kit",
    price: 499,
    discount_price: 399,
    material: "FR4 Solder Practice PCB & Through-Hole Components",
    dimensions: "100 \u00d7 80 mm PCB",
    manufacturing_method: "Through-Hole Soldering Trainer",
    rating: 4.9,
    review_count: 84,
    bestseller: true,
    stock: 100,
    short_description: "Interactive flashing LED soldering training practice kit for beginners.",
    description: "Hands-on soldering practice trainer board with 40+ labeled resistors, diodes, blinking LEDs, 555 timer IC, and buzzer to build practical soldering mastery.",
    specifications: {
      "Components": "45+ Through-Hole Electronic Parts",
      "Circuit Type": "Dual Running LED Chaser & Buzzer",
      "Power": "9V Battery Clip Included"
    },
    sku: "DIY-SLD-002",
    subcategory: "Electronics Training",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "diy-3",
    name: "DIY Portable Bluetooth Stereo Speaker Maker Kit",
    title: "DIY Portable Bluetooth Stereo Speaker Maker Kit",
    slug: "diy-portable-bluetooth-stereo-speaker-maker-kit",
    image: "/products/diy-portable-bluetooth-stereo-speaker-maker-kit.jpg",
    category: "DIY Kits",
    category_slug: "diy-kits",
    categorySlug: "diy-kits",
    image_key: "diy-portable-bluetooth-stereo-speaker-maker-kit",
    price: 1299,
    discount_price: 999,
    material: "Laser Cut Plywood Box & 3W Dual Speakers",
    dimensions: "130 \u00d7 70 \u00d7 60 mm",
    manufacturing_method: "Wood & Electronics Assembly Kit",
    rating: 4.8,
    review_count: 59,
    bestseller: true,
    stock: 50,
    short_description: "Build your own wood enclosure Bluetooth 5.0 stereo audio speaker.",
    description: "Fun maker assembly kit including precision laser-cut wooden acoustic enclosure, two 3W full-range audio drivers, Bluetooth 5.0 amplifier receiver board, and rechargeable lithium battery holder.",
    specifications: {
      "Audio Output": "Dual 3W Full-Range Stereo Drivers",
      "Connectivity": "Bluetooth 5.0 Wireless + AUX In",
      "Assembly": "Snap-fit Wooden Panels + Soldering Free Option"
    },
    sku: "DIY-SPK-003",
    subcategory: "Audio Kits",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "diy-4",
    name: "Miniature Solar Powered STEM Rover Buggy Kit",
    title: "Miniature Solar Powered STEM Rover Buggy Kit",
    slug: "miniature-solar-powered-stem-rover-buggy-kit",
    image: "/products/miniature-solar-powered-stem-rover-buggy-kit.jpg",
    category: "DIY Kits",
    category_slug: "diy-kits",
    categorySlug: "diy-kits",
    image_key: "miniature-solar-powered-stem-rover-buggy-kit",
    price: 399,
    discount_price: 299,
    material: "Lightweight Wood & Photovoltaic Panel",
    dimensions: "120 \u00d7 90 \u00d7 70 mm",
    manufacturing_method: "Green STEM Energy Kit",
    rating: 4.8,
    review_count: 43,
    bestseller: false,
    stock: 70,
    short_description: "Direct solar powered mini electric rover car science kit.",
    description: "Learn renewable photovoltaic energy by assembling this gear-driven miniature solar rover buggy that drives directly under sunlight.",
    specifications: {
      "Power Source": "High-Efficiency 2V Solar Panel",
      "Transmission": "Direct Micro DC Motor & Pinion Gears",
      "Material": "Laser-Cut Basswood Frame"
    },
    sku: "DIY-SLR-004",
    subcategory: "Solar STEM",
    active: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "diy-5",
    name: "Smart Weather Station IoT ESP8266 Maker Kit",
    title: "Smart Weather Station IoT ESP8266 Maker Kit",
    slug: "smart-weather-station-iot-esp8266-maker-kit",
    image: "/products/smart-weather-station-iot-esp8266-maker-kit.jpg",
    category: "DIY Kits",
    category_slug: "diy-kits",
    categorySlug: "diy-kits",
    image_key: "smart-weather-station-iot-esp8266-maker-kit",
    price: 1499,
    discount_price: 1199,
    material: "ESP8266 Board, DHT11 Sensor, OLED Screen",
    dimensions: "150 \u00d7 100 \u00d7 50 mm (Box)",
    manufacturing_method: "IoT Educational Project Kit",
    rating: 4.9,
    review_count: 31,
    bestseller: false,
    stock: 35,
    short_description: "Build an internet-connected ambient temperature & humidity station.",
    description: "Connect to Wi-Fi weather APIs and live sensor telemetry with this ESP8266 IoT weather station kit with 0.96 inch OLED readout and DHT11 environmental sensor.",
    specifications: {
      "Controller": "NodeMCU ESP8266 Wi-Fi Module",
      "Sensors": "DHT11 Temp & Humidity + BMP280 Barometer",
      "Display": "0.96 inch I2C OLED Display"
    },
    sku: "DIY-WTH-005",
    subcategory: "IoT Kits",
    active: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
  }
];

export function sanitizeProduct(p: any): Product {
  let canonicalSlug = "";
  if (p.slug && EXACT_PRODUCT_CATEGORY_MAP[p.slug]) {
    canonicalSlug = EXACT_PRODUCT_CATEGORY_MAP[p.slug];
  } else if (p.category_slug && normalizeCategorySlug(p.category_slug)) {
    canonicalSlug = normalizeCategorySlug(p.category_slug);
  } else if (p.categorySlug && normalizeCategorySlug(p.categorySlug)) {
    canonicalSlug = normalizeCategorySlug(p.categorySlug);
  } else if (p.category && normalizeCategorySlug(p.category)) {
    canonicalSlug = normalizeCategorySlug(p.category);
  }

  return {
    ...p,
    title: p.title || p.name,
    image: p.image || `/products/${p.slug}.jpg`,
    categorySlug: canonicalSlug,
    category_slug: canonicalSlug,
    category: p.category || canonicalSlug,
  };
}

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: async (): Promise<Product[]> => {
    return DEFAULT_CATALOG_PRODUCTS.map(sanitizeProduct);
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
      p.title,
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
