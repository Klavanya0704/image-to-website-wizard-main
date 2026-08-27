import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
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
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { productsQuery, normalizeCategorySlug } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductGridSkeleton, EmptyState, ErrorState } from "@/components/site/States";
import { inr } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  component: CategoryDetail,
});

interface CategoryMeta {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  badge: string;
}

const CATEGORY_DETAILS: Record<string, CategoryMeta> = {
  "3d-printing": {
    name: "3D Printing",
    description: "Explore our precision FDM, SLA, and resin 3D-printed products and prototypes.",
    icon: Printer,
    badge: "Additive Fabrication",
  },
  "laser-cutting": {
    name: "Laser Cutting",
    description:
      "High-precision laser cutting & engraving across natural hardwood, optical cast acrylic, and layered wood.",
    icon: Scissors,
    badge: "CO2 Precision Laser",
  },
  "cnc-machining": {
    name: "CNC Machining",
    description:
      "Subtractive 3-axis & 5-axis CNC metal milling, custom aluminum couplers, and hardwood 3D relief carving.",
    icon: Settings,
    badge: "Subtractive Milling",
  },
  electronics: {
    name: "Electronics",
    description:
      "Explore IoT microcontroller boards, sensor breakout modules, and prototype development hardware.",
    icon: Cpu,
    badge: "Circuit Hardware",
  },
  "drones-parts": {
    name: "Drones & Parts",
    description:
      "Explore 3K carbon fiber FPV racing frames, high-thrust brushless motors, and precision flight parts.",
    icon: Plane,
    badge: "Aerospace & FPV",
  },
  "acrylic-products": {
    name: "Acrylic Products",
    description:
      "Crystal clear optical acrylic display cubes, custom laser-etched trophies, and desktop organizers.",
    icon: Layers,
    badge: "Optical Acrylic",
  },
  "diy-kits": {
    name: "DIY Kits",
    description:
      "Explore hands-on STEM robotics starter kits, IoT development modules, and maker workshop packages.",
    icon: Bot,
    badge: "Hands-on STEM",
  },
};

const ALL_CATEGORY_PILLS = [
  { slug: "3d-printing", name: "3D Printing" },
  { slug: "laser-cutting", name: "Laser Cutting" },
  { slug: "cnc-machining", name: "CNC Machining" },
  { slug: "electronics", name: "Electronics" },
  { slug: "drones-parts", name: "Drones & Parts" },
  { slug: "acrylic-products", name: "Acrylic Products" },
  { slug: "diy-kits", name: "DIY Kits" },
];

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
    badge: "IDEA Lab",
  };

  // Exact match filter: ONLY products whose categorySlug exactly matches currentCategory
  const categoryProducts = allProducts.filter(
    (item) => item.categorySlug === currentCategory
  );

  const maxPriceLimit =
    categoryProducts.length > 0
      ? Math.max(...categoryProducts.map((p) => p.discount_price ?? p.price))
      : 10000;

  // States for filter conditions
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(maxPriceLimit);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });
  const bannerRef = useRef<HTMLDivElement>(null);

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

  const handleBannerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bannerRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    // Max 6px shift for subtle premium parallax
    setHeroParallax({ x: +(x * 12).toFixed(2), y: +(y * 12).toFixed(2) });
  };

  const handleBannerMouseLeave = () => {
    setHeroParallax({ x: 0, y: 0 });
  };

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
            message="There was an error loading the product catalog. Please try again."
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  // Filter products by user inputs
  const filteredProducts = categoryProducts.filter((product) => {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchName = product.name.toLowerCase().includes(term);
      const matchDesc = product.description?.toLowerCase().includes(term) || false;
      const matchSub = product.subcategory?.toLowerCase().includes(term) || false;
      if (!matchName && !matchDesc && !matchSub) return false;
    }

    if (selectedAvailability === "in-stock" && (product.stock ?? 0) <= 0) {
      return false;
    }

    if (minRating > 0 && (product.rating ?? 0) < minRating) {
      return false;
    }

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

  const IconComp = category.icon;

  return (
    <motion.div
      key={currentCategory}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#F8FAFC] dark:bg-background pb-16"
    >
      {/* Category Quick Pills Bar with interactive hover physics & layoutId */}
      <div className="bg-white/95 dark:bg-card/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-16 z-30 shadow-2xs">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar">
            {ALL_CATEGORY_PILLS.map((cat) => {
              const isActive = currentCategory === cat.slug;
              return (
                <Link
                  key={cat.slug}
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  className="relative group shrink-0 py-1"
                >
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "text-white font-bold"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {cat.name}
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategorySubBarPill"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#1455D9] shadow-sm"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        {/* Animated Category Header Banner with subtle mouse parallax */}
        <div
          ref={bannerRef}
          onMouseMove={handleBannerMouseMove}
          onMouseLeave={handleBannerMouseLeave}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 lg:p-10 mb-8 shadow-md border border-blue-700/40 cursor-default"
        >
          {/* Ambient background glow and grid */}
          <div
            style={{
              transform: `translate(${heroParallax.x * -1}px, ${heroParallax.y * -1}px)`,
              transition: "transform 150ms ease-out",
            }}
            className="absolute top-0 right-0 -mt-8 -mr-8 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"
          />
          <div
            style={{
              transform: `translate(${heroParallax.x * 1.5}px, ${heroParallax.y * 1.5}px)`,
              transition: "transform 150ms ease-out",
            }}
            className="absolute bottom-0 left-1/3 -mb-8 h-48 w-48 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none"
          />

          <div
            style={{
              transform: `translate(${heroParallax.x * 0.4}px, ${heroParallax.y * 0.4}px)`,
              transition: "transform 150ms ease-out",
            }}
            className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="max-w-2xl">
              {/* Category Breadcrumb / Badge */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="flex items-center gap-2 mb-3"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-200 border border-white/10">
                  <Sparkles className="h-3 w-3 text-amber-300" />
                  {category.badge}
                </span>
                <span className="text-xs text-blue-200/80 font-semibold">• AICTE IDEA Lab</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white"
              >
                {category.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-2 text-sm sm:text-base text-blue-100/90 leading-relaxed"
              >
                {category.description}
              </motion.p>
            </div>

            {/* Right Badge Icon & Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shrink-0 self-start md:self-auto shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                <IconComp className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">{categoryProducts.length}</div>
                <div className="text-xs font-semibold text-blue-200">Catalog Products</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
            <span>Showing</span>
            <span className="font-bold text-[#0B1736] dark:text-white">{sortedProducts.length}</span>
            <span>of {categoryProducts.length} products</span>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort-select" className="text-xs text-slate-500 font-medium">
              Sort By:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card px-3.5 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 focus:border-[#1455D9] hover:border-blue-400 focus:outline-none cursor-pointer shadow-2xs transition-colors"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="newest">Newest Additions</option>
            </select>
          </div>
        </div>

        {/* Category Page Main Layout: Left Sidebar + Right Grid */}
        {categoryProducts.length === 0 ? (
          <EmptyState
            title={`No products in ${category.name}`}
            description="We are currently preparing new authentic makerspace prototypes for this category."
            actionLabel="Explore All Products"
            actionTo="/shop"
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Filter Sidebar with entrance animation */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="hidden lg:block w-[280px] shrink-0 sticky top-32 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-card p-5 shadow-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B1736] dark:text-white flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-[#1455D9]" /> Filters
                </span>
                <motion.button
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-[#1455D9] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </motion.button>
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
                      placeholder="Filter title or spec..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-card pl-8.5 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:border-[#1455D9] hover:border-slate-300 focus:bg-white focus:outline-none transition-all"
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
                    <span className="text-xs font-black text-[#1455D9] bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-900">
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
                  <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-1">
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
                  <label className="flex items-center gap-2.5 cursor-pointer group hover:translate-x-0.5 transition-transform">
                    <input
                      type="checkbox"
                      checked={selectedAvailability === "in-stock"}
                      onChange={(e) =>
                        setSelectedAvailability(e.target.checked ? "in-stock" : "all")
                      }
                      className="h-4 w-4 rounded border-slate-300 text-[#1455D9] focus:ring-[#1455D9] accent-[#1455D9] cursor-pointer group-hover:scale-105 transition-transform"
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 select-none group-hover:text-[#1455D9] transition-colors">
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
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-[#1455D9] hover:border-slate-400 focus:outline-none cursor-pointer transition-colors"
                  >
                    <option value="0">All Ratings</option>
                    <option value="4">4★ &amp; Above</option>
                    <option value="3">3★ &amp; Above</option>
                    <option value="2">2★ &amp; Above</option>
                  </select>
                </div>
              </div>
            </motion.aside>

            {/* Right Product Grid with AnimatePresence */}
            <div className="flex-1 min-w-0">
              {/* Mobile Filter Toggle Button */}
              <div className="flex lg:hidden items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-[#52627A]">
                  {sortedProducts.length} Products
                </span>
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-[#0B1736] shadow-2xs cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                </button>
              </div>

              {sortedProducts.length === 0 ? (
                <EmptyState
                  title="No matching products found"
                  description="Try adjusting your search query, price limit, or rating filter."
                  actionLabel="Clear All Filters"
                  onAction={handleResetFilters}
                />
              ) : (
                <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                  <AnimatePresence mode="popLayout">
                    {sortedProducts.map((product, idx) => (
                      <ProductCard key={product.id} product={product} index={idx} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filters Drawer Modal */}
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
    </motion.div>
  );
}
