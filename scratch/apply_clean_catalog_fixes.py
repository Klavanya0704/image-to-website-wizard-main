import os
import json

with open(r"scratch\onedrive_3d_products_data.json", "r", encoding="utf-8") as f:
    onedrive_3dp = json.load(f)

with open(r"scratch\catalog_84_data.json", "r", encoding="utf-8") as f:
    all_84 = json.load(f)

other_categories_products = [p for p in all_84 if p["categorySlug"] != "3d-printing"]

FULL_CATALOG = []

for p in onedrive_3dp:
    FULL_CATALOG.append({
        "id": p["id"],
        "name": p["title"],
        "title": p["title"],
        "slug": p["slug"],
        "category": "3D Printing",
        "categorySlug": "3d-printing",
        "price": p["price"],
        "original_price": p["originalPrice"],
        "discount": int(round((1 - p["price"] / p["originalPrice"]) * 100)),
        "rating": p["rating"],
        "reviews_count": p["reviews"],
        "stock": p["stock"],
        "description": p["description"],
        "image": p["image"],
        "image_key": p["slug"],
        "active": True,
        "bestseller": True,
        "featured": True,
        "category_slug": "3d-printing",
        "created_at": "2026-08-24T00:00:00.000Z",
        "dimensions": "150 x 150 x 150 mm",
        "discount_price": p["price"],
        "lead_time": "1-2 Business Days",
        "material": "PLA / PETG / Resin",
        "max_order_quantity": 20,
        "min_order_quantity": 1,
        "moq": 1,
        "rating_count": p["reviews"],
        "sku": f"IDEA-3DP-{p['slug'].upper()[:8]}",
        "source": "AICTE IDEA Lab",
        "status": "in_stock",
        "subcategory": "3d-printing",
        "tags": ["3d-printing", "makerspace", "idea-lab"],
        "features": ["3D Printed Prototype", "AICTE IDEA Lab Certified", "PLA/PETG High Quality"],
        "specs": { "Material": "PLA / PETG / Resin", "Origin": "AICTE IDEA Lab", "Process": "FDM / SLA 3D Printing" }
    })

for p in other_categories_products:
    FULL_CATALOG.append({
        "id": p["id"],
        "name": p["name"],
        "title": p["name"],
        "slug": p["slug"],
        "category": p["category"],
        "categorySlug": p["categorySlug"],
        "price": p["price"],
        "original_price": p["originalPrice"],
        "discount": int(round((1 - p["price"] / p["originalPrice"]) * 100)),
        "rating": p["rating"],
        "reviews_count": p["reviews"],
        "stock": p["stock"],
        "description": p["description"],
        "image": p["image"],
        "image_key": p["slug"],
        "active": True,
        "bestseller": True,
        "featured": True,
        "category_slug": p["categorySlug"],
        "created_at": "2026-08-24T00:00:00.000Z",
        "dimensions": "Standard Makerspace Spec",
        "discount_price": p["price"],
        "lead_time": "1-3 Business Days",
        "material": "Industrial Grade",
        "max_order_quantity": 50,
        "min_order_quantity": 1,
        "moq": 1,
        "rating_count": p["reviews"],
        "sku": f"IDEA-{p['categorySlug'].upper()[:4]}-{p['slug'].upper()[:8]}",
        "source": "AICTE IDEA Lab",
        "status": "in_stock",
        "subcategory": p["categorySlug"],
        "tags": [p["categorySlug"], "makerspace", "idea-lab"],
        "features": ["Precision Manufactured", "AICTE IDEA Lab Certified", "Ready for Deployment"],
        "specs": { "Material": "Industrial Grade", "Origin": "AICTE IDEA Lab", "Quality": "100% Tested" }
    })

# 1. Update product-images.ts
image_map_entries = []
for p in FULL_CATALOG:
    image_map_entries.append(f'  "{p["slug"]}": "{p["image"]}",')

product_images_code = f"""// Clean 1-to-1 Product Image Resolution
export const EXACT_SLUG_IMAGE_MAP: Record<string, string> = {{
{chr(10).join(image_map_entries)}
}};

export function productImage(imageKey: string | undefined | null, name?: string | null): string {{
  if (!imageKey) return "/products/v5/3d-printed-winged-mythical-dragon-sculpture.jpg";
  if (imageKey.startsWith("http://") || imageKey.startsWith("https://") || imageKey.startsWith("/products/")) {{
    return imageKey;
  }}
  if (EXACT_SLUG_IMAGE_MAP[imageKey]) {{
    return EXACT_SLUG_IMAGE_MAP[imageKey];
  }}
  return `/products/v5/${{imageKey}}.jpg`;
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
      label: "Engineering View",
      badgeTitle: "CAD ORTHOGRAPHIC",
      angle: "Technical Layout",
      src: main,
      stageStyle: "scale-100 contrast-125 brightness-95",
      thumbStyle: "scale-100 contrast-125",
      viewType: "cad",
    }},
  ];
}}
"""

with open(r"src\lib\product-images.ts", "w", encoding="utf-8") as f:
    f.write(product_images_code)

# 2. Write src/lib/catalog.ts
catalog_code = f"""import {{ queryOptions }} from "@tanstack/react-query";
import {{ supabase }} from "@/integrations/supabase/client";
import type {{ Tables }} from "@/integrations/supabase/types";

export type Product = Tables<"products"> & {{
  categorySlug: string;
  category?: string;
  image?: string;
  title?: string;
  original_price?: number;
  discount?: number;
  rating?: number;
  reviews_count?: number;
  stock?: number;
  tags?: string[];
  features?: string[];
  specs?: Record<string, any>;
  [key: string]: any;
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
{chr(10).join([f'  "{p["slug"]}": "{p["categorySlug"]}",' for p in FULL_CATALOG])}
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
"""

for p in FULL_CATALOG:
    catalog_code += f"""  {{
    id: "{p['id']}",
    name: "{p['name']}",
    title: "{p['title']}",
    slug: "{p['slug']}",
    category: "{p['category']}",
    categorySlug: "{p['categorySlug']}",
    price: {p['price']},
    original_price: {p['original_price']},
    discount: {p['discount']},
    rating: {p['rating']},
    reviews_count: {p['reviews_count']},
    stock: {p['stock']},
    description: "{p['description']}",
    image: "{p['image']}",
    image_key: "{p['slug']}",
    active: true,
    bestseller: true,
    featured: true,
    category_slug: "{p['categorySlug']}",
    created_at: "2026-08-24T00:00:00.000Z",
    dimensions: "{p['dimensions']}",
    discount_price: {p['price']},
    lead_time: "{p['lead_time']}",
    material: "{p['material']}",
    max_order_quantity: {p['max_order_quantity']},
    min_order_quantity: {p['min_order_quantity']},
    moq: {p['moq']},
    rating_count: {p['rating_count']},
    sku: "{p['sku']}",
    source: "AICTE IDEA Lab",
    status: "in_stock",
    subcategory: "{p['categorySlug']}",
    tags: {json.dumps(p['tags'])},
    features: {json.dumps(p['features'])},
    specs: {json.dumps(p['specs'])}
  }},\n"""

catalog_code += """
];

export const CATEGORY_META = {
  "3d-printing": {
    name: "3D Printing",
    description: "FDM & SLA high-precision 3D printed components, prototypes, and fixtures.",
    heroImage: "/products/v5/3d-printed-winged-mythical-dragon-sculpture.jpg"
  },
  "laser-cutting": {
    name: "Laser Cutting",
    description: "Laser cut wood, acrylic, layered art, and bespoke flat-pack enclosures.",
    heroImage: "/products/v4/laser-cut-tree-of-life-wooden-led-lamp.jpg"
  },
  "cnc-machining": {
    name: "CNC Machining",
    description: "Subtractive milled metals, fixtures, gears, and relief hardwood panels.",
    heroImage: "/products/v4/cnc-v-carved-solid-walnut-name-plate.jpg"
  },
  "electronics": {
    name: "Electronics",
    description: "Microcontroller boards, sensor breakout kits, and prototype PCBs.",
    heroImage: "/products/v4/esp32-dual-core-iot-development-board.jpg"
  },
  "drones-parts": {
    name: "Drones & Parts",
    description: "FPV racing frames, brushless motors, propellers, and flight accessories.",
    heroImage: "/products/v4/5-inch-fpv-racing-3k-carbon-fiber-drone-frame.jpg"
  },
  "acrylic-products": {
    name: "Acrylic Products",
    description: "Optical clear display cubes, faceted trophies, and desktop organizers.",
    heroImage: "/products/v4/crystal-clear-cast-acrylic-showcase-cube-box.jpg"
  },
  "diy-kits": {
    name: "DIY Kits",
    description: "Complete hands-on STEM robotics, solar rovers, and IoT project kits.",
    heroImage: "/products/v4/autonomous-4wd-smart-robotic-stem-starter-kit.jpg"
  }
};

export function formatProductSlug(product: { slug?: string; name?: string; title?: string }): string {
  if (product.slug) return product.slug;
  const raw = product.title || product.name || "product";
  return raw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function sanitizeProduct(p: any): Product {
  return {
    ...p,
    title: p.title || p.name,
    name: p.name || p.title,
    categorySlug: p.categorySlug || p.category_slug,
    image: p.image || `/products/v5/${p.slug}.jpg`
  };
}

export async function getProducts(): Promise<Product[]> {
  return DEFAULT_CATALOG_PRODUCTS.map(sanitizeProduct);
}

export function getProductBySlug(slug: string): Product | null {
  const p = DEFAULT_CATALOG_PRODUCTS.find(x => x.slug === slug);
  return p ? sanitizeProduct(p) : null;
}

export const productsQuery = {
  queryKey: ["products"],
  queryFn: getProducts,
  initialData: DEFAULT_CATALOG_PRODUCTS.map(sanitizeProduct),
  staleTime: Infinity
};

export function searchProducts(productsOrQuery: Product[] | string, queryOrCategory?: string): Product[] {
  if (Array.isArray(productsOrQuery)) {
    const list = productsOrQuery;
    const q = (queryOrCategory || "").toLowerCase().trim();
    if (!q) return list;
    return list.filter((p) => {
      const nameMatch = p.name ? p.name.toLowerCase().includes(q) : false;
      const titleMatch = p.title ? p.title.toLowerCase().includes(q) : false;
      const descMatch = p.description ? p.description.toLowerCase().includes(q) : false;
      return nameMatch || titleMatch || descMatch;
    });
  }
  const q = (productsOrQuery || "").toLowerCase().trim();
  const category = queryOrCategory;
  return DEFAULT_CATALOG_PRODUCTS.filter((p) => {
    const matchesQuery = !q || p.name.toLowerCase().includes(q) || (p.title && p.title.toLowerCase().includes(q)) || p.description.toLowerCase().includes(q);
    const matchesCat = !category || p.categorySlug === category;
    return matchesQuery && matchesCat;
  });
}

export function productQuery(slug: string) {
  return {
    queryKey: ["product", slug],
    queryFn: async () => getProductBySlug(slug),
    initialData: () => getProductBySlug(slug) ?? undefined,
    staleTime: Infinity
  };
}

export function getReviewsForProduct(productId: string): Review[] {
  return [
    {
      id: "rev-1",
      product_id: productId,
      user_id: null,
      author_name: "Rahul S.",
      rating: 5,
      comment: "Exceptional quality and precision. Manufactured to high tolerances in the AICTE IDEA Lab.",
      created_at: "2026-08-24T00:00:00.000Z"
    },
    {
      id: "rev-2",
      product_id: productId,
      user_id: null,
      author_name: "Priya M.",
      rating: 5,
      comment: "Arrived quickly and exactly as described. Very sturdy and cleanly finished.",
      created_at: "2026-08-24T00:00:00.000Z"
    }
  ];
}

export function reviewsQuery(productId?: string | null) {
  return {
    queryKey: ["reviews", productId || "default"],
    queryFn: async () => getReviewsForProduct(productId || ""),
    initialData: () => getReviewsForProduct(productId || ""),
    staleTime: Infinity
  };
}
"""

with open(r"src\lib\catalog.ts", "w", encoding="utf-8") as f:
    f.write(catalog_code)

print("Updated src/lib/catalog.ts and src/lib/product-images.ts")
