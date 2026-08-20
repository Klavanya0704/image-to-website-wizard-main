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

import { productsQuery, normalizeCategorySlug } from "@/lib/catalog";
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

function CategoryDetail() {
  const params = Route.useParams() as Record<string, string | undefined>;

  // Parse current URL slug (e.g. "3d-printing")
  const currentCategory = normalizeCategorySlug(params["category"] || params["slug"] || "3d-printing");

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

  // Exact match filter (STRICT: Case-insensitive & normalized categorySlug equality)
  const categoryProducts = allProducts.filter((item) => {
    const rawCategory = item.categorySlug || item.category_slug || item.category;
    return normalizeCategorySlug(rawCategory) === normalizeCategorySlug(currentCategory);
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
          <ErrorState
            title="Failed to load category products"
            description="There was an error loading the product catalog. Please try again."
            retry={refetch}
          />
        </div>
      </div>
    );
  }

  // Filter products by user inputs
  const filteredProducts = categoryProducts.filter((product) => {
    // 1. Search keyword
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchName = product.name.toLowerCase().includes(term);
      const matchDesc = product.description?.toLowerCase().includes(term) || false;
      const matchSub = product.subcategory?.toLowerCase().includes(term) || false;
      if (!matchName && !matchDesc && !matchSub) return false;
    }

    // 2. Availability
    if (selectedAvailability === "in-stock" && (product.stock ?? 0) <= 0) {
      return false;
    }

    // 3. Rating
    if (minRating > 0 && (product.rating ?? 0) < minRating) {
      return false;
    }

    // 4. Price
    const effectivePrice = product.discount_price ?? product.price;
    if (effectivePrice > maxPrice) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discount_price ?? a.price;
    const priceB = b.discount_price ?? b.price;

    switch (sortBy) {
      case "price-asc":
        return priceA - priceB;
      case "price-desc":
        return priceB - priceA;
      case "rating-desc":
        return (b.rating ?? 0) - (a.rating ?? 0);
      case "newest": {
        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
      }
      case "featured":
      default:
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.rating ?? 0) - (a.rating ?? 0);
    }
  });

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedAvailability("all");
    setMinRating(0);
    setMaxPrice(maxPriceLimit);
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-background pb-16">
      {/* Category Navigation Bar */}
      <div className="bg-white dark:bg-card border-b border-slate-200 dark:border-slate-800 sticky top-16 z-30 shadow-2xs">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
            {[
              { slug: "3d-printing", name: "3D Printing" },
              { slug: "laser-cutting", name: "Laser Cutting" },
              { slug: "cnc-machining", name: "CNC Machining" },
              { slug: "electronics", name: "Electronics" },
              { slug: "drones-parts", name: "Drones & Parts" },
              { slug: "acrylic-products", name: "Acrylic Products" },
              { slug: "diy-kits", name: "DIY Kits" },
            ].map((cat) => {
              const isActive = currentCategory === cat.slug;
              return (
                <Link
                  key={cat.slug}
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#1455D9] text-white shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 pt-8 pb-4">
        {/* Category Header: Title + Description + Sort Bar */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1736] dark:text-white">
              {category.name}
            </h1>
            <p className="mt-1 text-sm text-[#52627A] dark:text-slate-400">
              {category.description}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs font-bold text-[#52627A] dark:text-slate-400 whitespace-nowrap">
              {categoryProducts.length} Products
            </span>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-slate-500 font-medium">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-card px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-[#1455D9] focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Page Main Layout: Left Sidebar + Right Grid */}
        {categoryProducts.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-card">
            <Box className="mx-auto h-12 w-12 text-slate-400 opacity-60 mb-4" />
            <h3 className="text-base font-bold text-[#0B1736] dark:text-white">
              No products found in this category.
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We currently don't have any products listed in this fabrication category. Check back soon!
            </p>
            <Link to="/shop" className="inline-block mt-4">
              <Button className="bg-[#1455D9] hover:bg-[#0F44B2] text-white text-xs font-bold px-4 py-2">
                Browse All Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Filter Sidebar (280px Desktop) */}
            <aside className="hidden lg:block w-[280px] shrink-0 sticky top-32 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-card p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B1736] dark:text-white flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-[#1455D9]" /> Filters
                </span>
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-[#1455D9] hover:underline cursor-pointer"
                >
                  Reset All
                </button>
              </div>

              <div className="space-y-5">
                {/* Search */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#52627A] dark:text-slate-400 block mb-2">
                    Search in {category.name}
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search title, spec..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-card pl-8 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:border-[#1455D9] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="border-b border-slate-100 dark:border-slate-800" />

                {/* Price Range Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#52627A] dark:text-slate-400">
                      Max Price
                    </label>
                    <span className="text-xs font-bold text-[#1455D9]">
                      {inr(maxPrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max={maxPriceLimit > 100 ? maxPriceLimit : 2499}
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#1455D9] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-medium text-slate-400 mt-1">
                    <span>{inr(100)}</span>
                    <span>{inr(maxPriceLimit > 100 ? maxPriceLimit : 2499)}</span>
                  </div>
                </div>

                <div className="border-b border-slate-100 dark:border-slate-800" />

                {/* Availability */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#52627A] dark:text-slate-400 block mb-2.5">
                    Availability
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAvailability === "in-stock"}
                      onChange={(e) =>
                        setSelectedAvailability(e.target.checked ? "in-stock" : "all")
                      }
                      className="h-4 w-4 rounded border-slate-300 text-[#1455D9] focus:ring-[#1455D9] accent-[#1455D9]"
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 select-none">
                      In Stock Only
                    </span>
                  </label>
                </div>

                <div className="border-b border-slate-100 dark:border-slate-800" />

                {/* Rating Filter */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#52627A] dark:text-slate-400 block mb-2">
                    Minimum Rating
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
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Price slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">Max Price:</span>
                  <span className="font-bold text-[#1455D9]">{inr(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max={maxPriceLimit > 100 ? maxPriceLimit : 2499}
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#1455D9]"
                />
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
