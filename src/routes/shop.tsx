import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { SlidersHorizontal, X, RotateCcw, Search, Box, Sparkles } from "lucide-react";
import { productsQuery, searchProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductGridSkeleton } from "@/components/site/States";
import { inr } from "@/lib/format";
import { Button } from "@/components/ui/button";

type ShopSearch = {
  q?: string | undefined;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const qVal = search["q"];
    return {
      q: typeof qVal === "string" ? qVal : undefined,
    };
  },
  component: Shop,
});

const SUGGESTED_KEYWORDS = [
  "3D printing",
  "Vase",
  "Phone Stand",
  "Organizer",
  "Keychains",
  "Acrylic",
  "Drone",
  "ESP32",
  "Sensor",
];

function Shop() {
  const { q = "" } = Route.useSearch();
  const navigate = useNavigate();

  // Load products query
  const { data: allProducts = [], isLoading, error, refetch } = useQuery(productsQuery);

  // States for filter conditions
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Base list of products matching search query
  const searchMatchedProducts = q.trim() ? searchProducts(allProducts, q) : allProducts;

  const maxPriceLimit =
    searchMatchedProducts.length > 0
      ? Math.max(...searchMatchedProducts.map((p) => p.discount_price ?? p.price))
      : 10000;

  // Dynamically configure price filter limits based on search match
  useEffect(() => {
    if (searchMatchedProducts.length > 0) {
      const prices = searchMatchedProducts.map((p) => p.discount_price ?? p.price);
      const max = Math.max(...prices);
      setMaxPrice(max);
    } else {
      setMaxPrice(10000);
    }
  }, [q, allProducts.length]);

  const handleResetFilters = () => {
    setSelectedAvailability("all");
    setMinRating(0);
    setMaxPrice(maxPriceLimit);
    setSortBy("featured");
  };

  const handleKeywordClick = (keyword: string) => {
    navigate({
      to: "/shop",
      search: { q: keyword },
    });
  };

  // Filtered products list
  const filteredProducts = searchMatchedProducts.filter((p) => {
    // Availability Filter
    if (selectedAvailability === "in-stock" && p.stock === 0) {
      return false;
    }
    // Rating Filter
    if (p.rating < minRating) {
      return false;
    }
    // Price Filter
    const price = p.discount_price ?? p.price;
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-44 bg-blue-600/20 rounded-3xl w-full"></div>
            <div className="h-8 w-48 bg-slate-200 rounded mt-8"></div>
          </div>
          <div className="mt-8">
            <ProductGridSkeleton count={8} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-background pb-20">
      {/* 1. Premium Blue-Gradient All Products Hero Banner */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 pt-8">
        <div
          className="relative overflow-hidden rounded-[24px] px-8 py-10 sm:px-12 sm:py-12 shadow-md"
          style={{
            background: "linear-gradient(135deg, #0B3FAE 0%, #1455D9 55%, #4B8DFF 100%)",
            minHeight: "190px",
          }}
        >
          {/* Subtle Decorative Glow & Tech Lines */}
          <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-white/15 blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 -bottom-10 h-48 w-48 rounded-full bg-blue-300/10 blur-2xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center gap-6 z-10 text-white">
            {/* Search Icon In Rounded Square */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-inner">
              <Search className="h-8 w-8 text-white" />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {q.trim() ? `Search Results for "${q}"` : "All Products"}
              </h1>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-white/90 font-medium leading-relaxed">
                {q.trim()
                  ? `Browse through ${searchMatchedProducts.length} items that match your keywords.`
                  : "Explore the complete AICTE IDEA Lab prototyping materials, DIY kits, and custom innovation gear."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Shopping Content Section */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 mt-10">
        {searchMatchedProducts.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-6">
              <Box className="h-10 w-10" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#0B1B3A]">
              No products found for "{q}"
            </h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              We couldn't find matching items. Try broadening your terms or select one of these suggestions:
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SUGGESTED_KEYWORDS.map((kw) => (
                <button
                  key={kw}
                  onClick={() => handleKeywordClick(kw)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:border-[#1455D9] hover:text-[#1455D9] transition-all cursor-pointer shadow-2xs"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Desktop Filters Sidebar (280px wide) */}
            <aside className="hidden lg:block w-[280px] shrink-0">
              <div className="sticky top-28 rounded-[18px] border border-[#E2E8F0] bg-white p-6 shadow-[0_4px_16px_rgba(15,23,42,0.05)] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#0B1B3A]">
                    FILTERS
                  </h3>
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#1455D9] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" /> Reset
                  </button>
                </div>

                {/* Price range */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A] block">
                    MAX PRICE: {inr(maxPrice)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={maxPriceLimit}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    aria-label="Filter by maximum price"
                    className="w-full accent-[#1455D9] bg-slate-200 border border-slate-300 rounded-lg appearance-none h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500 font-semibold">
                    <span>{inr(0)}</span>
                    <span>{inr(maxPriceLimit)}</span>
                  </div>
                </div>

                <div className="border-b border-slate-100" />

                {/* Availability */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A] block">
                    AVAILABILITY
                  </label>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      id="in-stock-only-shop"
                      checked={selectedAvailability === "in-stock"}
                      onChange={(e) =>
                        setSelectedAvailability(e.target.checked ? "in-stock" : "all")
                      }
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-[#1455D9] cursor-pointer"
                    />
                    <label
                      htmlFor="in-stock-only-shop"
                      className="text-xs font-semibold text-slate-700 cursor-pointer select-none"
                    >
                      In Stock Only
                    </label>
                  </div>
                </div>

                <div className="border-b border-slate-100" />

                {/* Rating */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A] block">
                    MINIMUM RATING
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    aria-label="Filter by minimum rating"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-[#0B1B3A] focus:border-[#1455D9] focus:outline-none cursor-pointer shadow-2xs"
                  >
                    <option value="0">All Ratings</option>
                    <option value="4">4★ &amp; Above</option>
                    <option value="3">3★ &amp; Above</option>
                    <option value="2">2★ &amp; Above</option>
                  </select>
                </div>

                <div className="border-b border-slate-100" />

                {/* Clear All Filters button */}
                <button
                  onClick={handleResetFilters}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-2.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Clear Filters
                </button>
              </div>
            </aside>

            {/* Right Products Area */}
            <div className="flex-1 min-w-0">
              {/* Search Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold tracking-tight text-[#0B1B3A]">
                    {q.trim() ? "Search Results" : "All Products"}
                  </h2>
                  <span className="text-sm text-[#64748B] font-semibold mt-0.5">
                    {sortedProducts.length === 1
                      ? "1 product found"
                      : `${sortedProducts.length} products found`}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filters Trigger */}
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="flex lg:hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-[#0B1B3A] shadow-2xs cursor-pointer"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                  </button>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                      SORT BY
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      aria-label="Sort products by"
                      className="rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-xs font-semibold text-[#0B1B3A] focus:border-[#1455D9] focus:outline-none cursor-pointer shadow-2xs"
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

              {/* Product Grid (Exactly 4 cards per row on desktop) */}
              {sortedProducts.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-slate-200 rounded-2xl bg-white">
                  <Box className="mx-auto h-10 w-10 text-slate-400 opacity-60 mb-3" />
                  <h3 className="text-sm font-bold text-[#0B1B3A]">
                    No products found matching your filters.
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Try adjusting your price slider, availability, or rating filters.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4" onClick={handleResetFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/50 backdrop-blur-xs">
          <div className="ml-auto w-full max-w-xs bg-white border-l border-slate-200 p-6 shadow-2xl flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#0B1B3A]">
                  FILTERS
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close mobile filters"
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Price range */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A] block">
                  Max Price: {inr(maxPrice)}
                </label>
                <input
                  type="range"
                  min="0"
                  max={maxPriceLimit}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  aria-label="Filter by maximum price (mobile)"
                  className="w-full accent-[#1455D9] bg-slate-200 border border-slate-300 rounded-lg appearance-none h-2 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 font-semibold">
                  <span>{inr(0)}</span>
                  <span>{inr(maxPriceLimit)}</span>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A] block">
                  Availability
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="in-stock-only-mobile-shop"
                    checked={selectedAvailability === "in-stock"}
                    onChange={(e) => setSelectedAvailability(e.target.checked ? "in-stock" : "all")}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-[#1455D9] cursor-pointer"
                  />
                  <label
                    htmlFor="in-stock-only-mobile-shop"
                    className="text-xs font-semibold text-slate-700 cursor-pointer select-none"
                  >
                    In Stock Only
                  </label>
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A] block">
                  Minimum Rating
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  aria-label="Filter by minimum rating (mobile)"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[#0B1B3A] focus:border-[#1455D9] focus:outline-none cursor-pointer"
                >
                  <option value="0">All Ratings</option>
                  <option value="4">4★ &amp; Above</option>
                  <option value="3">3★ &amp; Above</option>
                  <option value="2">2★ &amp; Above</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-3">
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
                className="flex-1 bg-[#1455D9] hover:bg-[#0B3FAE] text-white font-bold text-xs py-2.5 cursor-pointer"
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
