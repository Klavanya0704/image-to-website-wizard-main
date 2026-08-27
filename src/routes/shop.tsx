import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { SlidersHorizontal, X, RotateCcw, Search, Box, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { productsQuery, searchProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductGridSkeleton, EmptyState } from "@/components/site/States";
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
  "3D Printing",
  "Laser Cut",
  "Acrylic",
  "Drone",
  "ESP32",
  "Organizer",
  "Keychains",
  "Planter",
  "Wall Art",
  "Robotics",
];

function Shop() {
  const { q = "" } = Route.useSearch();
  const navigate = useNavigate();

  // Load products query
  const { data: allProducts = [], isLoading } = useQuery(productsQuery);

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
    if (selectedAvailability === "in-stock" && (p.stock ?? 0) <= 0) {
      return false;
    }
    if ((p.rating ?? 0) < minRating) {
      return false;
    }
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
      return (b.rating ?? 0) - (a.rating ?? 0);
    }
    if (sortBy === "newest") {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
    }

    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.bestseller && !b.bestseller) return -1;
    if (!a.bestseller && b.bestseller) return 1;
    return 0;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-12">
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
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-3xl p-8 sm:p-10 shadow-md bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white border border-blue-700/40"
        >
          {/* Subtle Decorative Glow */}
          <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 -bottom-10 h-48 w-48 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md text-white border border-white/20 shadow-inner">
                <Search className="h-8 w-8 text-white" />
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {q.trim() ? `Search Results for "${q}"` : "All Marketplace Products"}
                </h1>
                <p className="mt-2 max-w-2xl text-sm sm:text-base text-blue-100 font-medium leading-relaxed">
                  {q.trim()
                    ? `Showing ${searchMatchedProducts.length} items matching your search.`
                    : "Browse our full makerspace collection: 3D prints, laser engravings, CNC components, drones, and STEM kits."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/15 shrink-0 self-start md:self-auto">
              <div>
                <div className="text-2xl font-black text-white">{searchMatchedProducts.length}</div>
                <div className="text-xs font-semibold text-blue-200">Total Items</div>
              </div>
            </div>
          </div>

          {/* Quick Search Tag Pills */}
          <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 mr-1 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Popular:
            </span>
            {SUGGESTED_KEYWORDS.map((kw) => (
              <motion.button
                key={kw}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleKeywordClick(kw)}
                className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-all cursor-pointer ${
                  q.toLowerCase() === kw.toLowerCase()
                    ? "bg-white text-blue-900 font-bold shadow-xs"
                    : "bg-white/15 text-white hover:bg-white/25 border border-white/10"
                }`}
              >
                {kw}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 2. Main Shopping Content Section */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 mt-8">
        {searchMatchedProducts.length === 0 ? (
          <EmptyState
            title={`No products found for "${q}"`}
            description="We couldn't find matching items in the catalog. Try searching for broader terms like 3D printing, acrylic, or drone."
            actionLabel="View All Products"
            actionTo="/shop"
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-[280px] shrink-0">
              <div className="sticky top-28 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-card p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#0B1736] dark:text-white flex items-center gap-1.5">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-[#1455D9]" /> FILTERS
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleResetFilters}
                    className="flex items-center gap-1 text-xs font-bold text-[#1455D9] hover:underline cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" /> Reset
                  </motion.button>
                </div>

                {/* Price range */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="uppercase text-[#52627A] dark:text-slate-400">MAX PRICE</span>
                    <span className="font-black text-[#1455D9] bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-900">
                      {inr(maxPrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={maxPriceLimit}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    aria-label="Filter by maximum price"
                    className="w-full accent-[#1455D9] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>{inr(0)}</span>
                    <span>{inr(maxPriceLimit)}</span>
                  </div>
                </div>

                <div className="border-b border-slate-100 dark:border-slate-800" />

                {/* Availability */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#52627A] dark:text-slate-400 block">
                    AVAILABILITY
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      id="in-stock-only-shop"
                      checked={selectedAvailability === "in-stock"}
                      onChange={(e) =>
                        setSelectedAvailability(e.target.checked ? "in-stock" : "all")
                      }
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-[#1455D9] cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#1455D9] transition-colors select-none">
                      In Stock Only
                    </span>
                  </label>
                </div>

                <div className="border-b border-slate-100 dark:border-slate-800" />

                {/* Rating */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#52627A] dark:text-slate-400 block">
                    MINIMUM RATING
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    aria-label="Filter by minimum rating"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card px-3 py-2 text-xs font-semibold text-[#0B1736] dark:text-white focus:border-[#1455D9] focus:outline-none cursor-pointer shadow-2xs"
                  >
                    <option value="0">All Ratings</option>
                    <option value="4">4★ &amp; Above</option>
                    <option value="3">3★ &amp; Above</option>
                    <option value="2">2★ &amp; Above</option>
                  </select>
                </div>

                <div className="border-b border-slate-100 dark:border-slate-800" />

                {/* Clear All Filters button */}
                <button
                  onClick={handleResetFilters}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-slate-800 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Clear Filters
                </button>
              </div>
            </aside>

            {/* Right Products Area */}
            <div className="flex-1 min-w-0">
              {/* Header toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Showing <span className="font-bold text-[#0B1736] dark:text-white">{sortedProducts.length}</span> products
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="flex lg:hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-[#0B1736] shadow-2xs cursor-pointer"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                  </button>

                  <div className="flex items-center gap-2">
                    <label htmlFor="shop-sort" className="text-xs text-slate-500 font-medium">
                      Sort:
                    </label>
                    <select
                      id="shop-sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card px-3.5 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 focus:border-[#1455D9] focus:outline-none cursor-pointer shadow-2xs"
                    >
                      <option value="featured">Featured First</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                </div>
              </div>

              {sortedProducts.length === 0 ? (
                <EmptyState
                  title="No matching products found"
                  description="Try adjusting your filter settings or search query."
                  actionLabel="Clear All Filters"
                  onAction={handleResetFilters}
                />
              ) : (
                <motion.div
                  key={`shop-grid-${sortBy}-${maxPrice}-${minRating}-${q}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                >
                  {sortedProducts.map((product, idx) => (
                    <ProductCard key={product.id} product={product} index={idx} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex lg:hidden bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="ml-auto w-full max-w-xs bg-white dark:bg-card border-l border-slate-200 dark:border-slate-800 p-6 shadow-2xl flex flex-col justify-between h-full"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Filters
                  </h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted cursor-pointer"
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
                    min="0"
                    max={maxPriceLimit}
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
                      id="in-stock-shop-mobile"
                      checked={selectedAvailability === "in-stock"}
                      onChange={(e) => setSelectedAvailability(e.target.checked ? "in-stock" : "all")}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-[#1455D9] cursor-pointer"
                    />
                    <label
                      htmlFor="in-stock-shop-mobile"
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
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none cursor-pointer"
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
                  className="flex-1 font-semibold text-xs py-2.5 cursor-pointer rounded-xl"
                  onClick={() => {
                    handleResetFilters();
                    setMobileFiltersOpen(false);
                  }}
                >
                  Clear All
                </Button>
                <Button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 bg-[#1455D9] hover:bg-[#0F44B2] text-white font-bold text-xs py-2.5 cursor-pointer rounded-xl"
                >
                  Apply
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
