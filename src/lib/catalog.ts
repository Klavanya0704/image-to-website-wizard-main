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
  {
    id: "ref-1",
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
    id: "ref-2",
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
    sku: "LC-KEY-002",
    subcategory: "Personalized Accessories",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "ref-3",
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
    sku: "CNC-CPL-003",
    subcategory: "Robotics & Transmission",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "ref-4",
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
    sku: "LC-LAMP-004",
    subcategory: "Lighting & Gifts",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "ref-5",
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
    sku: "ACR-TRP-005",
    subcategory: "Trophies & Plaques",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "ref-6",
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
    sku: "CNC-BRK-006",
    subcategory: "Hardware & Framing",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "ref-7",
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
    sku: "ELEC-ESP-007",
    subcategory: "Microcontrollers",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "ref-8",
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
    sku: "DRN-FRM-008",
    subcategory: "Drone Frames",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "ref-9",
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
    sku: "3DP-ORG-009",
    subcategory: "Storage & Organizing",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "ref-10",
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
    sku: "KIT-DIY-010",
    subcategory: "Educational Kits",
    active: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
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

export function productQuery(slugOrId: string) {
  return queryOptions({
    queryKey: ["product", slugOrId],
    queryFn: async (): Promise<Product> => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
          .maybeSingle();
        if (data) return data;
      } catch {
        // Fallback to local default catalog
      }

      // Check default catalog by slug or id
      const found = DEFAULT_CATALOG_PRODUCTS.find((p) => p.slug === slugOrId || p.id === slugOrId);
      if (found) return found;

      // Graceful fallback matching category or keyword
      const cleaned = slugOrId.replace(/-/g, " ");
      return {
        id: `mock-${slugOrId}`,
        name: cleaned.replace(/\b\w/g, (c) => c.toUpperCase()),
        slug: slugOrId,
        category_slug: slugOrId.includes("laser")
          ? "laser-cutting"
          : slugOrId.includes("cnc")
            ? "cnc-machining"
            : slugOrId.includes("acrylic")
              ? "acrylic-products"
              : "3d-printing",
        image_key: slugOrId.includes("keychain")
          ? "keychain"
          : slugOrId.includes("lamp")
            ? "lamp"
            : slugOrId.includes("cnc")
              ? "cnc"
              : slugOrId.includes("stand")
                ? "stand"
                : "vase",
        price: 999,
        discount_price: 799,
        material: "Custom Lab Grade Material",
        dimensions: "100 × 100 × 50 mm",
        manufacturing_method: "Precision Fabrication",
        rating: 4.8,
        review_count: 42,
        bestseller: false,
        stock: 50,
        short_description: "Custom engineered product from ACTE IDEA LAB.",
        description: `Custom engineered ${cleaned} manufactured using precision lab equipment at ACTE IDEA LAB. Built with high mechanical strength and premium finish for makers and innovators.`,
        specifications: {
          Precision: "±0.1mm",
          "Quality Grade": "Lab Certified",
          Warranty: "1 Year Replacement",
        },
        sku: `MOCK-${slugOrId.toUpperCase().slice(0, 8)}`,
        subcategory: "Custom Fabrication",
        active: true,
        featured: false,
        created_at: new Date().toISOString(),
      };
    },
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
