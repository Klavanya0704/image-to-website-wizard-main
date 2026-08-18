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
    description: "Explore our high-quality 3D printed products and prototypes.",
    icon: Printer,
  },
  "laser-cutting": {
    name: "Laser Cutting",
    description:
      "Explore our high-precision laser-cut acrylic signs, wooden coasters, and custom keychains.",
    icon: Scissors,
  },
  "cnc-machining": {
    name: "CNC Machining",
    description:
      "Explore high-accuracy CNC milled aluminum couplings, mounting brackets, and brass bushings.",
    icon: Settings,
  },
  electronics: {
    name: "Electronics",
    description:
      "Explore IoT microcontroller boards, sensor kits, and prototype development hardware.",
    icon: Cpu,
  },
  "drones-parts": {
    name: "Drones & Parts",
    description:
      "Explore carbon fiber FPV racing frames, high-thrust brushless motors, and tri-blade propellers.",
    icon: Plane,
  },
  "drones-and-parts": {
    name: "Drones & Parts",
    description:
      "Explore carbon fiber FPV racing frames, high-thrust brushless motors, and tri-blade propellers.",
    icon: Plane,
  },
  "acrylic-products": {
    name: "Acrylic Products",
    description:
      "Explore clear acrylic display boxes, custom engraved award trophies, and protective shields.",
    icon: Layers,
  },
  "diy-kits": {
    name: "DIY Kits",
    description:
      "Explore hands-on robotics STEM starter kits, soldering training kits, and Bluetooth speaker sets.",
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
  const [maxPrice, setMaxPrice] = useState<number>(2499);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const maxPriceLimit =
    categoryProducts.length > 0
      ? Math.max(...categoryProducts.map((p) => p.discount_price ?? p.price))
      : 2499;

  // Reset filter inputs and update price slider when category changes
  useEffect(() => {
    if (categoryProducts.length > 0) {
      const prices = categoryProducts.map((p) => p.discount_price ?? p.price);
      const max = Math.max(...prices);
      setMaxPrice(max);
    } else {
      setMaxPrice(2499);
    }
    setSearchTerm("");
    setSelectedAvailability("all");
    setMinRating(0);
    setSortBy("featured");
    setMobileFiltersOpen(false);
  }, [currentCategory, allProducts.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-background">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-8">
          <div className="animate-pulse space-y-4 mb-8">
            <div className="h-8 w-48 bg-muted rounded"></div>
            <div className="h-4 w-96 bg-muted rounded"></div>
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-background">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-12">
          <ErrorState message="Could not load category products." onRetry={() => refetch()} />
        </div>
      </div>
    );
  }

  // Sidebar Search & Price Filter Synchronization
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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-background pb-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 pt-8">
        {/* 1. Category Title + Description + Sort Dropdown (Single Horizontal Row) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0B1736] dark:text-white">
              {category.name}
            </h1>
            <p className="text-sm text-[#52627A] dark:text-slate-400 mt-1 font-medium">
              {category.description}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="text-xs font-semibold text-[#52627A] dark:text-slate-400">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products by"
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card px-3.5 py-2 text-xs font-semibold text-[#0B1736] dark:text-white focus:border-[#1455D9] focus:outline-none cursor-pointer shadow-2xs"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* 2. Main 2-Column Content Layout */}
        {categoryProducts.length === 0 ? (
          <EmptyState
            title={`No ${category.name} products available yet`}
            description="New products for this category are being fabricated and added soon. Stay tuned!"
            actionLabel="Browse All Products"
            actionTo="/shop"
            icon={<Box className="h-12 w-12" />}
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Desktop Filter Sidebar (~280px wide) */}
            <aside className="hidden lg:block w-[280px] shrink-0">
              <div className="sticky top-28 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card p-5 shadow-2xs space-y-5">
                {/* Search In Category */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
                    SEARCH IN {category.name}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 px-3 py-2 pl-8 pr-8 text-xs font-medium focus:border-[#1455D9] focus:bg-white focus:outline-none"
                    />
                    <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        aria-label="Clear search input"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="border-b border-slate-100 dark:border-slate-800" />

                {/* Price Range Slider */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
                    MAX PRICE: {inr(maxPrice)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={maxPriceLimit}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    aria-label="Filter by maximum price"
                    className="w-full accent-[#1455D9] bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg appearance-none h-1.5 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                    <span>{inr(0)}</span>
                    <span>{inr(maxPriceLimit)}</span>
                  </div>
                </div>

                <div className="border-b border-slate-100 dark:border-slate-800" />

                {/* Availability */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
                    AVAILABILITY
                  </label>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      id="in-stock-only-desktop"
                      checked={selectedAvailability === "in-stock"}
                      onChange={(e) =>
                        setSelectedAvailability(e.target.checked ? "in-stock" : "all")
                      }
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-[#1455D9] cursor-pointer"
                    />
                    <label
                      htmlFor="in-stock-only-desktop"
                      className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none"
                    >
                      In Stock Only
                    </label>
                  </div>
                </div>

                <div className="border-b border-slate-100 dark:border-slate-800" />

                {/* Minimum Rating */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
                    MINIMUM RATING
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    aria-label="Filter by minimum rating"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-card px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-[#1455D9] focus:outline-none cursor-pointer"
                  >
                    <option value="0">All Ratings</option>
                    <option value="4">4★ &amp; Above</option>
                    <option value="3">3★ &amp; Above</option>
                    <option value="2">2★ &amp; Above</option>
                  </select>
                </div>

                <div className="border-b border-slate-100 dark:border-slate-800" />

                {/* Reset Filters */}
                <button
                  onClick={handleResetFilters}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-slate-800 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Clear Filters
                </button>
              </div>
            </aside>

            {/* Right Product Grid (4 columns on Desktop) */}
            <div className="flex-1 min-w-0">
              {/* Mobile Filter Toggle Button */}
              <div className="flex lg:hidden items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-[#52627A]">
                  {sortedProducts.length} Products
                </span>
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-[#0B1736] shadow-2xs cursor-pointer"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                </button>
              </div>

              {sortedProducts.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-card">
                  <Box className="mx-auto h-10 w-10 text-slate-400 opacity-60 mb-3" />
                  <h3 className="text-sm font-bold text-[#0B1736] dark:text-white">
                    No products found in this category matching your filters.
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Try loosening your search term, price range, or rating constraint.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4" onClick={handleResetFilters}>
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-background/80 backdrop-blur-sm">
          <div className="ml-auto w-full max-w-xs bg-white dark:bg-card border-l border-slate-200 dark:border-slate-800 p-6 shadow-2xl flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Filters
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close mobile filters"
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
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 pl-8 text-xs font-semibold focus:border-primary focus:outline-none"
                  />
                  <Search className="h-3.5 w-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
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
                  aria-label="Filter by maximum price (mobile)"
                  className="w-full accent-[#1455D9] bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg appearance-none h-1.5 cursor-pointer"
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
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-[#1455D9] cursor-pointer"
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
                  aria-label="Filter by minimum rating (mobile)"
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
                className="flex-1 bg-[#1455D9] hover:bg-[#0F44B2] text-white font-bold text-xs py-2.5 cursor-pointer"
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
