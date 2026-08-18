import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  Printer,
  Scissors,
  Settings,
  Cpu,
  Plane,
  Layers,
  Bot,
  Box,
  ChevronRight,
  SlidersHorizontal,
  X,
  RotateCcw,
  Search,
} from "lucide-react";

import { productsQuery } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductGridSkeleton, EmptyState, ErrorState } from "@/components/site/States";
import { inr } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/category/$slug")({
  component: CategoryDetail,
});

interface CategoryMeta {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
}

const CATEGORY_DETAILS: Record<string, CategoryMeta> = {
  "3d-printing": {
    name: "3D Printing",
    description: "Explore our 3D printed products, functional prototypes, and maker designs.",
    icon: Printer,
  },
  "laser-cutting": {
    name: "Laser Cutting",
    description:
      "Explore laser-cut and precision engraving products, keychains, and ambient lamps.",
    icon: Scissors,
  },
  "cnc-machining": {
    name: "CNC Machining",
    description:
      "Explore precision CNC machined aluminum couplings, brackets, and structural parts.",
    icon: Settings,
  },
  electronics: {
    name: "Electronics",
    description:
      "Explore microcontroller development boards, sensors, and IoT prototyping hardware.",
    icon: Cpu,
  },
  "drones-parts": {
    name: "Drones & Parts",
    description:
      "Explore racing quadcopter frames, high-thrust brushless motors, and flight accessories.",
    icon: Plane,
  },
  "drones-and-parts": {
    name: "Drones & Parts",
    description:
      "Explore racing quadcopter frames, high-thrust brushless motors, and flight accessories.",
    icon: Plane,
  },
  "acrylic-products": {
    name: "Acrylic Products",
    description:
      "Explore precision-cut acrylic trophies, custom logo plaques, and desktop accessories.",
    icon: Layers,
  },
  "diy-kits": {
    name: "DIY Kits",
    description: "Explore hands-on student STEM maker kits, speaker build sets, and robotics kits.",
    icon: Bot,
  },
};

function normalizeSlug(s: string | undefined | null): string {
  if (!s) return "";
  const cleaned = s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (cleaned === "drones-and-parts" || cleaned === "drones-parts" || cleaned === "drones") {
    return "drones-parts";
  }
  return cleaned;
}

function CategoryDetail() {
  const params = Route.useParams() as Record<string, string | undefined>;

  // Parse current URL slug (e.g. "3d-printing")
  const currentCategory = normalizeSlug(params["category"] || params["slug"] || "3d-printing");

  // Load products query
  const { data: allProducts = [], isLoading, error, refetch } = useQuery(productsQuery);

  const category = CATEGORY_DETAILS[currentCategory] || {
    name: currentCategory
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    description: "Explore our collection of innovative products and fabrication designs.",
    icon: Box,
  };

  // Exact match filter (Case-insensitive & slug normalized)
  const categoryProducts = allProducts.filter((item) => {
    const rawCategory = item.categorySlug || item.category_slug || item.category || "";
    const itemCategorySlug = normalizeSlug(rawCategory);
    return itemCategorySlug === currentCategory;
  });

  // States for filter conditions
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const maxPriceLimit =
    categoryProducts.length > 0
      ? Math.max(...categoryProducts.map((p) => p.discount_price ?? p.price))
      : 10000;

  // Reset filter inputs and update price slider when category changes
  useEffect(() => {
    if (categoryProducts.length > 0) {
      const prices = categoryProducts.map((p) => p.discount_price ?? p.price);
      const max = Math.max(...prices);
      setMaxPrice(max);
    } else {
      setMaxPrice(10000);
    }
    setSearchTerm("");
    setSelectedAvailability("all");
    setMinRating(0);
    setSortBy("featured");
    setMobileFiltersOpen(false);
  }, [currentCategory, allProducts.length]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 bg-muted rounded"></div>
          <div className="h-32 bg-muted rounded-2xl w-full"></div>
        </div>
        <div className="mt-12">
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <ErrorState message="Could not load category products." onRetry={() => refetch()} />
      </div>
    );
  }

  // 2. Sidebar Search & Price Filter Synchronization:
  // Apply search input, price slider, and availability filters *after* filtering by the active category
  const filteredProducts = categoryProducts.filter((product) => {
    // Search query within active category
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      const matchText = [
        product.name,
        product.subcategory,
        product.short_description,
        product.description,
        product.material,
        product.sku,
      ]
        .join(" ")
        .toLowerCase();
      if (!matchText.includes(q)) {
        return false;
      }
    }

    // Availability Filter
    if (selectedAvailability === "in-stock" && product.stock === 0) {
      return false;
    }

    // Rating Filter
    if (product.rating < minRating) {
      return false;
    }

    // Price Range Filter
    const price = product.discount_price ?? product.price;
    if (price > maxPrice) {
      return false;
    }

    return true;
  });

  // Sorted products list
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discount_price ?? a.price;
    const priceB = b.discount_price ?? b.price;

    if (sortBy === "price-asc") {
      return priceA - priceB;
    }
    if (sortBy === "price-desc") {
      return priceB - priceA;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    if (sortBy === "newest") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    // Default fallback is "featured"
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.bestseller && !b.bestseller) return -1;
    if (!a.bestseller && b.bestseller) return 1;
    return 0;
  });

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedAvailability("all");
    setMinRating(0);
    setMaxPrice(maxPriceLimit);
    setSortBy("featured");
  };

  return (
    <div className="pb-20">
      {/* Category Hero */}
      <section className="mx-auto max-w-[1400px] px-6 pt-6">
        <div
          className="relative overflow-hidden rounded-2xl px-6 py-10 md:px-12 md:py-12 border border-border"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6 z-10">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-[var(--shadow-card)]">
              <category.icon className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 mb-1">
                <Link to="/" className="hover:underline">
                  Home
                </Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white">{category.name}</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                {category.name}
              </h1>
              <p className="mt-2 max-w-2xl text-sm md:text-base text-[#E2E8F0] leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Content Section */}
      <section className="mx-auto max-w-[1400px] px-6 mt-10">
        {categoryProducts.length === 0 ? (
          <EmptyState
            title={`No ${category.name} products available yet`}
            description="New products for this category are being fabricated and added soon. Stay tuned!"
            actionLabel="Browse All Products"
            actionTo="/shop"
            icon={<Box className="h-12 w-12" />}
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Side Panel */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Filters
                  </h3>
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" /> Reset
                  </button>
                </div>

                {/* In-Category Search Box */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Search in {category.name}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={`e.g. ${categoryProducts[0]?.name.split(" ")[0] || "product"}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 pl-8 text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                    <Search className="h-3.5 w-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Price range */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Max Price: {inr(maxPrice)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={maxPriceLimit}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#1455D9] bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg appearance-none h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                    <span>{inr(0)}</span>
                    <span>{inr(maxPriceLimit)}</span>
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Availability
                  </label>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      id="in-stock-only-desktop"
                      checked={selectedAvailability === "in-stock"}
                      onChange={(e) =>
                        setSelectedAvailability(e.target.checked ? "in-stock" : "all")
                      }
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
                    />
                    <label
                      htmlFor="in-stock-only-desktop"
                      className="text-xs font-semibold text-foreground/80 cursor-pointer select-none"
                    >
                      In Stock Only
                    </label>
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Minimum Rating
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none cursor-pointer"
                  >
                    <option value="0">All Ratings</option>
                    <option value="4">4★ &amp; Above</option>
                    <option value="3">3★ &amp; Above</option>
                    <option value="2">2★ &amp; Above</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Products display area */}
            <div className="flex-1">
              {/* Header Sort bar */}
              <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-border">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold tracking-tight text-foreground">
                    {category.name} Catalog
                  </h2>
                  <span className="text-xs text-muted-foreground font-semibold mt-0.5">
                    {sortedProducts.length === 1
                      ? "1 product found"
                      : `${sortedProducts.length} products found`}
                    {searchTerm && ` for "${searchTerm}"`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="flex lg:hidden items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-bold hover:bg-muted transition-colors cursor-pointer"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Sort By
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none cursor-pointer"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Rating</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product grid or Empty state */}
              {sortedProducts.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-border rounded-2xl bg-muted/10">
                  <Box className="mx-auto h-10 w-10 text-muted-foreground opacity-60 mb-3" />
                  <h3 className="text-sm font-bold text-foreground">
                    No products found in this category matching your filters.
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                    Try loosening your search term, price range, or rating constraint.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4" onClick={handleResetFilters}>
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Mobile Filters Drawer Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-background/80 backdrop-blur-sm">
          <div className="ml-auto w-full max-w-xs bg-card border-l border-border p-6 shadow-2xl flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Filters
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* In-Category Search Box (Mobile) */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Search in {category.name}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={`e.g. search...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 pl-8 text-xs font-semibold focus:border-primary focus:outline-none"
                  />
                  <Search className="h-3.5 w-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Price range */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Max Price: {inr(maxPrice)}
                </label>
                <input
                  type="range"
                  min="0"
                  max={maxPriceLimit}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#1455D9] bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg appearance-none h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                  <span>{inr(0)}</span>
                  <span>{inr(maxPriceLimit)}</span>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Availability
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="in-stock-only-mobile"
                    checked={selectedAvailability === "in-stock"}
                    onChange={(e) => setSelectedAvailability(e.target.checked ? "in-stock" : "all")}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
                  />
                  <label
                    htmlFor="in-stock-only-mobile"
                    className="text-xs font-semibold text-foreground/80 cursor-pointer select-none"
                  >
                    In Stock Only
                  </label>
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Minimum Rating
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none cursor-pointer"
                >
                  <option value="0">All Ratings</option>
                  <option value="4">4★ &amp; Above</option>
                  <option value="3">3★ &amp; Above</option>
                  <option value="2">2★ &amp; Above</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex gap-3">
              <Button
                variant="outline"
                className="flex-1 font-semibold text-xs py-2.5 cursor-pointer"
                onClick={() => {
                  handleResetFilters();
                  setMobileFiltersOpen(false);
                }}
              >
                Clear All
              </Button>
              <Button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-xs py-2.5 cursor-pointer"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
