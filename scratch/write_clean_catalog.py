import json

# Load the PRODUCTS structure from scratch/generate_all_38_hd.py
import sys
sys.path.append("scratch")
from generate_all_38_hd import PRODUCTS

# Construct EXACT_PRODUCT_CATEGORY_MAP
cat_map_lines = []
for p in PRODUCTS:
    cat_map_lines.append(f'  "{p["slug"]}": "{p["category_slug"]}",')

# Also keep aliases if needed
extra_aliases = [
    # 3D Printing
    '  "3d-printed-geometric-vase": "3d-printing",',
    '  "geometric-spiral-vase": "3d-printing",',
    '  "universal-foldable-phone-stand-3d": "3d-printing",',
    '  "mini-desk-organizer": "3d-printing",',
    '  "cable-management-clip-set": "3d-printing",',
    '  "resin-architectural-model": "3d-printing",',
    '  "planter-pot-hex": "3d-printing",',
    # Laser Cutting
    '  "custom-name-keychain": "laser-cutting",',
    '  "tree-of-life-lamp": "laser-cutting",',
    '  "laser-cut-desk-organizer": "laser-cutting",',
    '  "wooden-wall-art-mandala": "laser-cutting",',
    '  "laser-engraved-photo-frame": "laser-cutting",',
    '  "custom-acrylic-led-sign": "laser-cutting",',
    '  "laser-engraved-glass-trophy": "laser-cutting",',
    '  "frosted-glass-laser-engraving": "laser-cutting",',
    '  "laser-cut-acrylic-name-plate": "laser-cutting",',
    '  "acrylic-decorative-panel": "laser-cutting",',
    # CNC Machining
    '  "cnc-wooden-name-plate": "cnc-machining",',
    '  "cnc-cut-wooden-mandala": "cnc-machining",',
    '  "cnc-cut-wooden-box": "cnc-machining",',
    '  "cnc-carved-wooden-wall-panel": "cnc-machining",',
    '  "cnc-wooden-relief-art": "cnc-machining",',
    '  "cnc-aluminium-bracket": "cnc-machining",',
    '  "cnc-aluminum-fixture-plate": "cnc-machining",',
    '  "cnc-machined-gear": "cnc-machining",',
    '  "cnc-machined-bushing": "cnc-machining",',
    '  "cnc-machined-coupling": "cnc-machining",',
    '  "cnc-machined-shaft": "cnc-machining",',
    '  "cnc-machined-prototype-component": "cnc-machining",',
    # Electronics
    '  "esp32-iot-maker-board": "electronics",',
    '  "37-in-1-iot-sensor-module-kit": "electronics",',
    '  "fr4-double-sided-prototype-pcb-10pack": "electronics",',
    # Drones & Parts
    '  "fpv-drone-carbon-fiber-frame": "drones-parts",',
    '  "brushless-drone-motor-2207-2450kv": "drones-parts",',
    '  "5-inch-tri-blade-fpv-propellers": "drones-parts",',
    # Acrylic Products
    '  "clear-cast-acrylic-display-box": "acrylic-products",',
    '  "custom-acrylic-trophy-plaque": "acrylic-products",',
    '  "transparent-protective-acrylic-shield": "acrylic-products",',
    # DIY Kits
    '  "starter-maker-diy-electronics-kit": "diy-kits",',
    '  "diy-soldering-practice-electronics-kit": "diy-kits",',
    '  "diy-bluetooth-speaker-assembly-kit": "diy-kits",'
]

all_cat_map = cat_map_lines + extra_aliases

# Construct DEFAULT_CATALOG_PRODUCTS
prod_objects = []
for p in PRODUCTS:
    specs_json = json.dumps(p["specifications"], indent=6)
    # Fix indent on specs
    specs_str = "{\n" + ",\n".join([f'      {json.dumps(k)}: {json.dumps(v)}' for k, v in p["specifications"].items()]) + "\n    }"
    
    prod_code = f"""  {{
    id: {json.dumps(p["id"])},
    name: {json.dumps(p["name"])},
    title: {json.dumps(p["name"])},
    slug: {json.dumps(p["slug"])},
    image: "/products/{p["slug"]}.jpg",
    category: {json.dumps(p["category"])},
    category_slug: {json.dumps(p["category_slug"])},
    categorySlug: {json.dumps(p["category_slug"])},
    image_key: {json.dumps(p["slug"])},
    price: {p["price"]},
    discount_price: {p["discount_price"]},
    material: {json.dumps(p["material"])},
    dimensions: {json.dumps(p["dimensions"])},
    manufacturing_method: {json.dumps(p["manufacturing_method"])},
    rating: {p["rating"]},
    review_count: {p["review_count"]},
    bestseller: {"true" if p["bestseller"] else "false"},
    stock: {p["stock"]},
    short_description: {json.dumps(p["short_description"])},
    description: {json.dumps(p["description"])},
    specifications: {specs_str},
    sku: {json.dumps(p["sku"])},
    subcategory: {json.dumps(p["subcategory"])},
    active: true,
    featured: {"true" if p["bestseller"] else "false"},
    created_at: "2026-01-01T00:00:00Z",
  }}"""
    prod_objects.append(prod_code)

catalog_ts_content = f"""import {{ queryOptions }} from "@tanstack/react-query";
import {{ supabase }} from "@/integrations/supabase/client";
import type {{ Tables }} from "@/integrations/supabase/types";

export type Product = Tables<"products"> & {{
  categorySlug: string;
  category?: string;
  image?: string;
  title?: string;
}};
export type Category = Tables<"categories">;
export type Review = Tables<"reviews">;
export type Order = Tables<"orders">;
export type OrderItem = Tables<"order_items">;
export type Address = Tables<"addresses">;
export type Enquiry = Tables<"enquiries">;

export function normalizeCategorySlug(s: string | undefined | null): string {{
  if (!s) return "";
  const cleaned = s
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (cleaned === "3d-printing" || cleaned === "3d-print" || cleaned === "3dprinting") {{
    return "3d-printing";
  }}
  if (cleaned === "laser-cutting" || cleaned === "laser-cut" || cleaned === "lasercutting") {{
    return "laser-cutting";
  }}
  if (cleaned === "cnc-machining" || cleaned === "cnc" || cleaned === "cncmachining") {{
    return "cnc-machining";
  }}
  if (cleaned === "electronics" || cleaned === "electronic") {{
    return "electronics";
  }}
  if (
    cleaned === "drones-parts" ||
    cleaned === "drones-and-parts" ||
    cleaned === "drones" ||
    cleaned === "drone-parts"
  ) {{
    return "drones-parts";
  }}
  if (cleaned === "acrylic-products" || cleaned === "acrylic" || cleaned === "acrylics") {{
    return "acrylic-products";
  }}
  if (cleaned === "diy-kits" || cleaned === "diy" || cleaned === "kits") {{
    return "diy-kits";
  }}

  return cleaned;
}}

export const EXACT_PRODUCT_CATEGORY_MAP: Record<string, string> = {{
{chr(10).join(all_cat_map)}
}};

export const categoriesQuery = queryOptions({{
  queryKey: ["categories"],
  queryFn: async (): Promise<Category[]> => {{
    const {{ data, error }} = await supabase.from("categories").select("*").order("sort_order");
    if (error) throw error;
    return data ?? [];
  }},
  staleTime: 5 * 60_000,
}});

export const DEFAULT_CATALOG_PRODUCTS: Product[] = [
{",\n".join(prod_objects)}
];

export const productsQuery = (categorySlug?: string, search?: string) =>
  queryOptions({{
    queryKey: ["products", categorySlug ?? "all", search ?? ""],
    queryFn: async (): Promise<Product[]> => {{
      let query = supabase.from("products").select("*").eq("active", true).order("created_at", {{ ascending: false }});

      if (categorySlug && categorySlug !== "all") {{
        const normalized = normalizeCategorySlug(categorySlug);
        query = query.eq("category_slug", normalized);
      }}

      if (search) {{
        query = query.or(`name.ilike.%${{search}}%,description.ilike.%${{search}}%`);
      }}

      const {{ data, error }} = await query;
      if (error) throw error;

      if (!data || data.length === 0) {{
        let list = DEFAULT_CATALOG_PRODUCTS;
        if (categorySlug && categorySlug !== "all") {{
          const normalized = normalizeCategorySlug(categorySlug);
          list = list.filter((p) => {{
            const exactCat = EXACT_PRODUCT_CATEGORY_MAP[p.slug];
            if (exactCat) return exactCat === normalized;
            return p.category_slug === normalized || p.categorySlug === normalized;
          }});
        }}
        if (search) {{
          const q = search.toLowerCase();
          list = list.filter((p) => (p.name || "").toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q));
        }}
        return list;
      }}

      return (data as Product[]).map((p) => ({{
        ...p,
        title: p.title || p.name,
        image: p.image || `/products/${{p.slug}}.jpg`,
        categorySlug: p.category_slug || normalizeCategorySlug(p.category || ""),
      }}));
    }},
    staleTime: 5 * 60_000,
  }});

export const productBySlugQuery = (slug: string) =>
  queryOptions({{
    queryKey: ["product", slug],
    queryFn: async (): Promise<Product | null> => {{
      const {{ data, error }} = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      if (data) {{
        return {{
          ...(data as Product),
          title: (data as Product).title || (data as Product).name,
          image: (data as Product).image || `/products/${{data.slug}}.jpg`,
          categorySlug: data.category_slug || normalizeCategorySlug((data as any).category || ""),
        }};
      }}
      const local = DEFAULT_CATALOG_PRODUCTS.find((p) => p.slug === slug);
      return local ?? null;
    }},
    staleTime: 5 * 60_000,
  }});
"""

with open("src/lib/catalog.ts", "w", encoding="utf-8") as f:
    f.write(catalog_ts_content)

print("src/lib/catalog.ts written successfully!")

# Update src/lib/product-images.ts
slug_map_entries = []
for p in PRODUCTS:
    slug_map_entries.append(f'  "{p["slug"]}": "/products/{p["slug"]}.jpg",')

# Add previous aliases
for p in PRODUCTS:
    pass

product_images_ts = f"""// Clean 1-to-1 Product Image Resolution
export const EXACT_SLUG_IMAGE_MAP: Record<string, string> = {{
{chr(10).join(slug_map_entries)}
  // Aliases and Legacy Slugs
  "geometric-spiral-vase": "/products/3d-printed-geometric-spiral-vase.jpg",
  "universal-foldable-phone-stand-3d": "/products/foldable-desktop-phone-tablet-stand.jpg",
  "mini-desk-organizer": "/products/modular-desktop-stationery-organizer.jpg",
  "cable-management-clip-set": "/products/interlocking-cable-management-clip-pack.jpg",
  "resin-architectural-model": "/products/precision-resin-architectural-tower-model.jpg",
  "planter-pot-hex": "/products/hexagonal-geometric-succulent-planter-pot.jpg",
  "custom-name-keychain": "/products/custom-laser-engraved-wooden-keychain.jpg",
  "tree-of-life-lamp": "/products/laser-cut-tree-of-life-wooden-led-lamp.jpg",
  "laser-cut-desk-organizer": "/products/slot-together-plywood-desktop-organizer.jpg",
  "wooden-wall-art-mandala": "/products/multi-layered-wooden-mandala-wall-art.jpg",
  "laser-engraved-photo-frame": "/products/laser-engraved-hardwood-photo-frame.jpg",
  "custom-acrylic-led-sign": "/products/edge-lit-laser-cut-acrylic-led-sign.jpg",
  "cnc-wooden-name-plate": "/products/cnc-v-carved-solid-walnut-name-plate.jpg",
  "cnc-cut-wooden-mandala": "/products/cnc-relief-carved-wooden-decorative-panel.jpg",
  "cnc-cut-wooden-box": "/products/cnc-milled-hardwood-keepsake-box.jpg",
  "cnc-carved-wooden-wall-panel": "/products/cnc-relief-carved-wooden-decorative-panel.jpg",
  "cnc-aluminium-bracket": "/products/cnc-machined-6061-aluminium-l-bracket.jpg",
  "cnc-aluminum-fixture-plate": "/products/cnc-precision-aluminium-fixture-plate.jpg",
  "cnc-machined-gear": "/products/cnc-machined-high-precision-spur-gear.jpg",
  "esp32-iot-maker-board": "/products/esp32-dual-core-iot-development-board.jpg",
  "37-in-1-iot-sensor-module-kit": "/products/37-piece-iot-sensor-module-starter-kit.jpg",
  "fr4-double-sided-prototype-pcb-10pack": "/products/double-sided-fr4-prototype-pcb-pack.jpg",
  "fpv-drone-carbon-fiber-frame": "/products/5-inch-fpv-racing-3k-carbon-fiber-drone-frame.jpg",
  "brushless-drone-motor-2207-2450kv": "/products/2207-2450kv-high-power-brushless-drone-motor.jpg",
  "5-inch-tri-blade-fpv-propellers": "/products/5-inch-tri-blade-fpv-drone-propellers-pack.jpg",
  "clear-cast-acrylic-display-box": "/products/crystal-clear-cast-acrylic-showcase-cube-box.jpg",
  "custom-acrylic-trophy-plaque": "/products/laser-engraved-beveled-acrylic-award-trophy.jpg",
  "transparent-protective-acrylic-shield": "/products/high-clarity-heavy-duty-acrylic-sneeze-shield.jpg",
  "starter-maker-diy-electronics-kit": "/products/autonomous-4wd-smart-robotic-stem-starter-kit.jpg",
  "diy-soldering-practice-electronics-kit": "/products/educational-electronics-soldering-practice-kit.jpg",
  "diy-bluetooth-speaker-assembly-kit": "/products/diy-portable-bluetooth-stereo-speaker-maker-kit.jpg",
}};

export function productImage(imageKey: string | undefined | null): string {{
  if (!imageKey) return "/products/3d-printed-geometric-spiral-vase.jpg";
  if (imageKey.startsWith("http://") || imageKey.startsWith("https://") || imageKey.startsWith("/products/")) {{
    return imageKey;
  }}
  if (EXACT_SLUG_IMAGE_MAP[imageKey]) {{
    return EXACT_SLUG_IMAGE_MAP[imageKey];
  }}
  return `/products/${{imageKey}}.jpg`;
}}
"""

with open("src/lib/product-images.ts", "w", encoding="utf-8") as f:
    f.write(product_images_ts)

print("src/lib/product-images.ts written successfully!")
