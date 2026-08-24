import os
import json

with open(r"scratch\catalog_84_data.json", "r", encoding="utf-8") as f:
    CATALOG_84 = json.load(f)

# 1. Update src/lib/product-images.ts
image_map_entries = []
for p in CATALOG_84:
    image_map_entries.append(f'  "{p["slug"]}": "/products/v4/{p["slug"]}.jpg",')

product_images_ts = f"""// Clean 1-to-1 Product Image Resolution for 84 Catalog Products
export const EXACT_SLUG_IMAGE_MAP: Record<string, string> = {{
{chr(10).join(image_map_entries)}
}};

export function productImage(imageKey: string | undefined | null, name?: string | null): string {{
  if (!imageKey) return "/products/v4/3d-printed-geometric-spiral-vase.jpg";
  if (imageKey.startsWith("http://") || imageKey.startsWith("https://") || imageKey.startsWith("/products/")) {{
    return imageKey;
  }}
  if (EXACT_SLUG_IMAGE_MAP[imageKey]) {{
    return EXACT_SLUG_IMAGE_MAP[imageKey];
  }}
  return `/products/v4/${{imageKey}}.jpg`;
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
    f.write(product_images_ts)
print("Updated src/lib/product-images.ts with 84 image mappings.")

# 2. Update DEFAULT_CATALOG_PRODUCTS in src/lib/catalog.ts
# Read catalog.ts up to DEFAULT_CATALOG_PRODUCTS
with open(r"src\lib\catalog.ts", "r", encoding="utf-8") as f:
    catalog_lines = f.readlines()

header_lines = []
for line in catalog_lines:
    if "export const DEFAULT_CATALOG_PRODUCTS" in line:
        break
    header_lines.append(line)

# Generate formatted DEFAULT_CATALOG_PRODUCTS
catalog_products_code = "export const DEFAULT_CATALOG_PRODUCTS: Product[] = [\n"
for p in CATALOG_84:
    catalog_products_code += f"""  {{
    id: "{p['id']}",
    name: "{p['name']}",
    title: "{p['name']}",
    slug: "{p['slug']}",
    category: "{p['category']}",
    categorySlug: "{p['categorySlug']}",
    price: {p['price']},
    original_price: {p['originalPrice']},
    discount: {int(round((1 - p['price'] / p['originalPrice']) * 100))},
    rating: {p['rating']},
    reviews_count: {p['reviews']},
    stock: {p['stock']},
    description: "{p['description']}",
    image: "{p['image']}",
    image_key: "{p['slug']}",
    tags: ["{p['categorySlug']}", "makerspace", "idea-lab"],
    features: ["Precision Manufactured", "AICTE IDEA Lab Certified", "Ready for Deployment"],
    specs: {{ "Material": "Industrial Grade", "Origin": "AICTE IDEA Lab", "Quality": "100% Tested" }}
  }},\n"""
catalog_products_code += "];\n\n"

# Helper functions at end of catalog.ts
helpers_code = """export const CATEGORY_META = {
  "3d-printing": {
    name: "3D Printing",
    description: "FDM & SLA high-precision 3D printed components, prototypes, and fixtures.",
    heroImage: "/products/v4/3d-printed-geometric-spiral-vase.jpg"
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
    image: p.image || `/products/v4/${p.slug}.jpg`
  };
}

export async function getProducts(): Promise<Product[]> {
  return DEFAULT_CATALOG_PRODUCTS.map(sanitizeProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const p = DEFAULT_CATALOG_PRODUCTS.find(x => x.slug === slug);
  return p ? sanitizeProduct(p) : null;
}

export const productsQuery = {
  queryKey: ["products"],
  queryFn: getProducts,
  initialData: DEFAULT_CATALOG_PRODUCTS.map(sanitizeProduct),
  staleTime: Infinity
};
"""

with open(r"src\lib\catalog.ts", "w", encoding="utf-8") as f:
    f.write("".join(header_lines) + catalog_products_code + helpers_code)

print("Updated src/lib/catalog.ts with complete 84 product catalog and helpers.")
