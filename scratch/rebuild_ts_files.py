import json
import sys
sys.path.append("scratch")
from generate_all_38_hd import PRODUCTS

# Build EXACT_PRODUCT_CATEGORY_MAP
cat_map_lines = []
for p in PRODUCTS:
    cat_map_lines.append(f'  "{p["slug"]}": "{p["category_slug"]}",')

# Aliases
aliases = [
    '  "3d-printed-geometric-vase": "3d-printing",',
    '  "geometric-spiral-vase": "3d-printing",',
    '  "universal-foldable-phone-stand-3d": "3d-printing",',
    '  "mini-desk-organizer": "3d-printing",',
    '  "cable-management-clip-set": "3d-printing",',
    '  "resin-architectural-model": "3d-printing",',
    '  "planter-pot-hex": "3d-printing",',
    '  "custom-name-keychain": "laser-cutting",',
    '  "tree-of-life-lamp": "laser-cutting",',
    '  "laser-cut-desk-organizer": "laser-cutting",',
    '  "wooden-wall-art-mandala": "laser-cutting",',
    '  "laser-engraved-photo-frame": "laser-cutting",',
    '  "custom-acrylic-led-sign": "laser-cutting",',
    '  "cnc-wooden-name-plate": "cnc-machining",',
    '  "cnc-cut-wooden-mandala": "cnc-machining",',
    '  "cnc-cut-wooden-box": "cnc-machining",',
    '  "cnc-carved-wooden-wall-panel": "cnc-machining",',
    '  "cnc-aluminium-bracket": "cnc-machining",',
    '  "cnc-aluminum-fixture-plate": "cnc-machining",',
    '  "cnc-machined-gear": "cnc-machining",',
    '  "esp32-iot-maker-board": "electronics",',
    '  "37-in-1-iot-sensor-module-kit": "electronics",',
    '  "fr4-double-sided-prototype-pcb-10pack": "electronics",',
    '  "fpv-drone-carbon-fiber-frame": "drones-parts",',
    '  "brushless-drone-motor-2207-2450kv": "drones-parts",',
    '  "5-inch-tri-blade-fpv-propellers": "drones-parts",',
    '  "clear-cast-acrylic-display-box": "acrylic-products",',
    '  "custom-acrylic-trophy-plaque": "acrylic-products",',
    '  "transparent-protective-acrylic-shield": "acrylic-products",',
    '  "starter-maker-diy-electronics-kit": "diy-kits",',
    '  "diy-soldering-practice-electronics-kit": "diy-kits",',
    '  "diy-bluetooth-speaker-assembly-kit": "diy-kits",'
]

all_cat_map = cat_map_lines + aliases

# Build DEFAULT_CATALOG_PRODUCTS
prod_objects = []
for p in PRODUCTS:
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

export function sanitizeProduct(p: any): Product {{
  let canonicalSlug = "";
  const exactCat = EXACT_PRODUCT_CATEGORY_MAP[p.slug];
  if (exactCat) {{
    canonicalSlug = exactCat;
  }} else {{
    canonicalSlug = normalizeCategorySlug(p.category_slug || p.categorySlug || p.category || "3d-printing");
  }}

  return {{
    ...p,
    title: p.title || p.name,
    image: p.image || `/products/${{p.slug}}.jpg`,
    categorySlug: canonicalSlug,
    category_slug: canonicalSlug,
    category: p.category || canonicalSlug,
  }};
}}

export const productsQuery = queryOptions({{
  queryKey: ["products"],
  queryFn: async (): Promise<Product[]> => {{
    try {{
      const {{ data, error }} = await supabase
        .from("products")
        .select("*")
        .order("created_at", {{ ascending: false }});
      if (error || !data || data.length === 0) {{
        return DEFAULT_CATALOG_PRODUCTS.map(sanitizeProduct);
      }}

      const sanitizedDb = data.map(sanitizeProduct);
      const dbSlugs = new Set(sanitizedDb.map((p) => p.slug));
      const missingDefaults = DEFAULT_CATALOG_PRODUCTS.filter(
        (p) => !dbSlugs.has(p.slug)
      ).map(sanitizeProduct);

      return [...sanitizedDb, ...missingDefaults];
    }} catch {{
      return DEFAULT_CATALOG_PRODUCTS.map(sanitizeProduct);
    }}
  }},
  staleTime: 60_000,
}});

export function normalizeProductIdentifier(input: string | undefined | null): string {{
  if (!input) return "";
  let decoded = "";
  try {{
    decoded = decodeURIComponent(input);
  }} catch {{
    decoded = input;
  }}
  return decoded
    .toLowerCase()
    .trim()
    .replace(/[\\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}}

export function formatProductSlug(product: {{
  slug?: string | null;
  name?: string | null;
  id?: string | null;
}}): string {{
  if (product.slug && product.slug.trim().length > 0) {{
    return normalizeProductIdentifier(product.slug);
  }}
  if (product.name && product.name.trim().length > 0) {{
    return normalizeProductIdentifier(product.name);
  }}
  return normalizeProductIdentifier(product.id || "product");
}}

export function getProductBySlug(rawSlugOrId: string | undefined | null): Product {{
  const normalized = normalizeProductIdentifier(rawSlugOrId);
  const raw = (rawSlugOrId || "").trim().toLowerCase();

  const match = DEFAULT_CATALOG_PRODUCTS.find((p) => {{
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
  }});
  if (match) return sanitizeProduct(match);

  if (normalized.length > 0) {{
    const subMatch = DEFAULT_CATALOG_PRODUCTS.find((p) => {{
      const pSlugNorm = normalizeProductIdentifier(p.slug);
      const pNameNorm = normalizeProductIdentifier(p.name);
      return (
        pSlugNorm.includes(normalized) ||
        normalized.includes(pSlugNorm) ||
        pNameNorm.includes(normalized) ||
        normalized.includes(pNameNorm) ||
        (p.image_key && normalized.includes(p.image_key))
      );
    }});
    if (subMatch) return sanitizeProduct(subMatch);
  }}

  return sanitizeProduct(DEFAULT_CATALOG_PRODUCTS[0]!);
}}

export function productQuery(rawSlugOrId: string | undefined) {{
  const normalized = normalizeProductIdentifier(rawSlugOrId);
  const raw = (rawSlugOrId || "").trim();

  return queryOptions({{
    queryKey: ["product", normalized || "default"],
    queryFn: async (): Promise<Product> => {{
      try {{
        if (normalized) {{
          const {{ data, error }} = await supabase
            .from("products")
            .select("*")
            .or(`slug.eq.${{normalized}},id.eq.${{normalized}},slug.eq.${{raw}},id.eq.${{raw}}`)
            .maybeSingle();
          if (data) return sanitizeProduct(data);
        }}
      }} catch {{
        // Fallback
      }}

      return getProductBySlug(rawSlugOrId);
    }},
    initialData: () => getProductBySlug(rawSlugOrId),
  }});
}}

export function reviewsQuery(productId: string | undefined) {{
  return queryOptions({{
    queryKey: ["reviews", productId],
    queryFn: async (): Promise<Review[]> => {{
      if (!productId) return [];
      const {{ data, error }} = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", {{ ascending: false }});
      if (error) throw error;
      return data ?? [];
    }},
    enabled: !!productId,
  }});
}}

export const statsQuery = queryOptions({{
  queryKey: ["site_stats"],
  queryFn: async () => {{
    const {{ data, error }} = await supabase.from("site_stats").select("*").order("sort_order");
    if (error) throw error;
    return data ?? [];
  }},
  staleTime: 5 * 60_000,
}});

export function searchProducts(products: Product[], term: string): Product[] {{
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
}}
"""

with open("src/lib/catalog.ts", "w", encoding="utf-8") as f:
    f.write(catalog_ts_content)

print("src/lib/catalog.ts written successfully with all query options!")

# Write src/lib/product-images.ts with productViewsFor and galleryFor
slug_map_entries = []
for p in PRODUCTS:
    slug_map_entries.append(f'  "{p["slug"]}": "/products/{p["slug"]}.jpg",')

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

export function productImage(imageKey: string | undefined | null, name?: string | null): string {{
  if (!imageKey) return "/products/3d-printed-geometric-spiral-vase.jpg";
  if (imageKey.startsWith("http://") || imageKey.startsWith("https://") || imageKey.startsWith("/products/")) {{
    return imageKey;
  }}
  if (EXACT_SLUG_IMAGE_MAP[imageKey]) {{
    return EXACT_SLUG_IMAGE_MAP[imageKey];
  }}
  return `/products/${{imageKey}}.jpg`;
}}

export interface ProductViewAngle {{
  id: string;
  label: string;
  badgeTitle: string;
  angle: string;
  src: string;
  stageStyle: string;
  thumbStyle: string;
  viewType: "front" | "isometric" | "closeup" | "cad";
}}

export function productViewsFor(
  keyOrSlug: string | null | undefined,
  name?: string | null,
): ProductViewAngle[] {{
  const main = productImage(keyOrSlug, name);
  return [
    {{
      id: "view-front",
      label: "Front View",
      badgeTitle: "STUDIO FRONT VIEW",
      angle: "0° Elevation",
      src: main,
      stageStyle: "scale-100 rotate-0 brightness-100 contrast-100",
      thumbStyle: "scale-100 rotate-0",
      viewType: "front",
    }},
    {{
      id: "view-iso",
      label: "3D Isometric",
      badgeTitle: "3D ISOMETRIC PROFILE",
      angle: "45° Oblique Angle",
      src: main,
      stageStyle: "scale-105 -rotate-2 drop-shadow-md",
      thumbStyle: "scale-105 -rotate-2",
      viewType: "isometric",
    }},
    {{
      id: "view-detail",
      label: "Macro Detail",
      badgeTitle: "ZOOMED DETAIL VIEW",
      angle: "Material Texture",
      src: main,
      stageStyle: "scale-125 origin-center contrast-105 saturate-110",
      thumbStyle: "scale-125 origin-center",
      viewType: "closeup",
    }},
    {{
      id: "view-cad",
      label: "Technical CAD",
      badgeTitle: "CAD BLUEPRINT & SPECS",
      angle: "Dimension Tolerances",
      src: main,
      stageStyle: "",
      thumbStyle: "brightness-95 contrast-110",
      viewType: "cad",
    }},
  ];
}}

export function galleryFor(keyOrSlug: string | null | undefined, name?: string | null): string[] {{
  const main = productImage(keyOrSlug, name);
  return [main, main, main, main];
}}
"""

with open("src/lib/product-images.ts", "w", encoding="utf-8") as f:
    f.write(product_images_ts)

print("src/lib/product-images.ts written successfully with all views and galleries!")
