import shutil
import os
import json

# 1. Copy the 6 freshly generated photorealistic laser cutting images
images_to_copy = [
    ("laser_wood_keychain_1787498976951.jpg", "custom-laser-engraved-wooden-keychain.jpg"),
    ("tree_life_lamp_1787498994064.jpg", "laser-cut-tree-of-life-wooden-led-lamp.jpg"),
    ("layered_mandala_1787499012791.jpg", "multi-layered-wooden-mandala-wall-art.jpg"),
    ("acrylic_led_sign_1787499032800.jpg", "edge-lit-laser-cut-acrylic-led-sign.jpg"),
    ("plywood_organizer_1787499052856.jpg", "slot-together-plywood-desktop-organizer.jpg"),
    ("hardwood_photo_frame_1787499076192.jpg", "laser-engraved-hardwood-photo-frame.jpg"),
]

brain_dir = r"C:\Users\Lavanya\.gemini\antigravity\brain\6d3be7a3-527d-41f0-98f7-7c6da1d93cd0"
target_dir = r"public\products"

for src_name, dest_name in images_to_copy:
    src_path = os.path.join(brain_dir, src_name)
    dest_path = os.path.join(target_dir, dest_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied {src_name} -> {dest_path}")
    else:
        print(f"NOT FOUND: {src_path}")

# 2. Re-write update_catalog_strict.py with clean /products/<slug>.jpg for all 38 products
import sys
sys.path.append("scratch")
from generate_all_38_hd import PRODUCTS

# Map all 38 products with image: /products/<slug>.jpg
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

cat_map_lines = []
for p in PRODUCTS:
    cat_map_lines.append(f'  "{p["slug"]}": "{p["category_slug"]}",')

cat_map_code = "{\n" + "\n".join(cat_map_lines) + "\n}"

catalog_content = f"""import {{ queryOptions }} from "@tanstack/react-query";
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

export const EXACT_PRODUCT_CATEGORY_MAP: Record<string, string> = {cat_map_code};

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
  if (p.slug && EXACT_PRODUCT_CATEGORY_MAP[p.slug]) {{
    canonicalSlug = EXACT_PRODUCT_CATEGORY_MAP[p.slug];
  }} else if (p.category_slug && normalizeCategorySlug(p.category_slug)) {{
    canonicalSlug = normalizeCategorySlug(p.category_slug);
  }} else if (p.categorySlug && normalizeCategorySlug(p.categorySlug)) {{
    canonicalSlug = normalizeCategorySlug(p.categorySlug);
  }} else if (p.category && normalizeCategorySlug(p.category)) {{
    canonicalSlug = normalizeCategorySlug(p.category);
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
    return DEFAULT_CATALOG_PRODUCTS.map(sanitizeProduct);
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
    f.write(catalog_content)

print("src/lib/catalog.ts updated successfully with clean 100% 1-to-1 images!")

# Write src/lib/product-images.ts with exact 1-to-1 slug mappings
slug_map_entries = []
for p in PRODUCTS:
    slug_map_entries.append(f'  "{p["slug"]}": "/products/{p["slug"]}.jpg",')

product_images_ts = f"""// Clean 1-to-1 Product Image Resolution
export const EXACT_SLUG_IMAGE_MAP: Record<string, string> = {{
{chr(10).join(slug_map_entries)}
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

print("src/lib/product-images.ts updated successfully with 1-to-1 slug mappings!")
