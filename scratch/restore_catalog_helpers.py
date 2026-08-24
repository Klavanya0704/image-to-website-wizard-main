import os

helpers_to_add = """

export function searchProducts(query: string, category?: string): Product[] {
  const q = (query || "").toLowerCase().trim();
  return DEFAULT_CATALOG_PRODUCTS.filter((p) => {
    const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    const matchesCat = !category || p.categorySlug === category;
    return matchesQuery && matchesCat;
  });
}

export function productQuery(slug: string) {
  return {
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    initialData: () => DEFAULT_CATALOG_PRODUCTS.find(p => p.slug === slug),
    staleTime: Infinity
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
}

export function getReviewsForProduct(productId: string): Review[] {
  return [
    {
      id: "rev-1",
      author: "Rahul S.",
      rating: 5,
      date: "2 days ago",
      content: "Exceptional quality and precision. Manufactured to high tolerances in the AICTE IDEA Lab.",
      verified: true
    },
    {
      id: "rev-2",
      author: "Priya M.",
      rating: 5,
      date: "1 week ago",
      content: "Arrived quickly and exactly as described. Very sturdy and cleanly finished.",
      verified: true
    }
  ];
}

export function reviewsQuery(productId: string) {
  return {
    queryKey: ["reviews", productId],
    queryFn: () => getReviewsForProduct(productId),
    initialData: getReviewsForProduct(productId),
    staleTime: Infinity
  };
}
"""

with open(r"src\lib\catalog.ts", "a", encoding="utf-8") as f:
    f.write(helpers_to_add)

print("Appended missing exports to src/lib/catalog.ts.")
