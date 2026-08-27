import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Heart,
  ShoppingCart,
  Zap,
  Star,
  CheckCircle,
  Truck,
  Shield,
  RotateCcw,
  Tag,
  ChevronLeft,
  ChevronRight,
  Upload,
  Layers,
  Clock,
  Sparkles,
  Check,
  Copy,
  FileCheck,
  FileCode,
  Sliders,
  Award,
  Box,
} from "lucide-react";
import { toast } from "sonner";

import {
  productQuery,
  productsQuery,
  reviewsQuery,
  Product,
  getProductBySlug,
  DEFAULT_CATALOG_PRODUCTS,
} from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { inr, effectivePrice, discountPercent, safeCopyText } from "@/lib/format";
import { productImage, productViewsFor, ProductViewAngle } from "@/lib/product-images";
import { ProductGridSkeleton } from "@/components/site/States";
import { CadBlueprintView } from "@/components/site/CadBlueprintView";

export const Route = createFileRoute("/product/$slug")({
  component: ProductDetail,
  pendingComponent: () => (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-12">
      <ProductGridSkeleton />
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-16 text-center space-y-4">
      <h2 className="text-2xl font-black text-[#0B1736] dark:text-white">Product Not Found</h2>
      <p className="text-sm text-[#52627A] dark:text-slate-400">
        The requested product could not be loaded. Please browse our catalog.
      </p>
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 rounded-xl bg-[#1455D9] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#0F44B2]"
      >
        Return to Store
      </Link>
    </div>
  ),
});

function ProductDetail() {
  const { slug: rawSlug } = Route.useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const { data: rawProduct } = useQuery(productQuery(rawSlug));
  const product: Product = (rawProduct || getProductBySlug(rawSlug) || DEFAULT_CATALOG_PRODUCTS[0]) as Product;
  const { data: allProducts = [] } = useQuery(productsQuery);
  const { data: reviews = [] } = useQuery(reviewsQuery(product?.id));

  // Image Gallery Selection State
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>("Signal Blue");
  const [selectedInfill, setSelectedInfill] = useState<string>("Standard (20%)");
  const [quantity, setQuantity] = useState<number>(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<"specs" | "fabrication" | "reviews">("specs");

  // Reset active image index when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setUploadedFile(null);
  }, [rawSlug]);

  const viewAngles = productViewsFor(product.image_key || product.slug, product.name);
  const fallbackAngle: ProductViewAngle = {
    id: "view-front",
    label: "Front View",
    badgeTitle: "STUDIO FRONT VIEW",
    angle: "0° Elevation",
    src: productImage(product.image_key || product.slug, product.name),
    stageStyle: "scale-100 rotate-0 brightness-100 contrast-100",
    thumbStyle: "scale-100 rotate-0",
    viewType: "front",
  };
  const currentAngle: ProductViewAngle =
    viewAngles[activeImageIndex] || viewAngles[0] || fallbackAngle;
  const off = discountPercent(product);
  const wished = isWishlisted(product.id);
  const finalPrice = effectivePrice(product);

  const colors = [
    { name: "Signal Blue", hex: "#1455D9" },
    { name: "Matte Black", hex: "#1E293B" },
    { name: "Pure White", hex: "#F8FAFC", border: true },
    { name: "Anodized Silver", hex: "#94A3B8" },
    { name: "Natural Amber", hex: "#F59E0B" },
  ];

  const infillOptions = ["Standard (20%)", "High Strength (50%)", "Solid Industrial (100%)"];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: `${product.name} (${selectedColor})`,
      imageKey: product.image_key,
      price: finalPrice,
    });
    toast.success(`Added "${product.name}" to cart!`, {
      description: `Variant: ${selectedColor} • Qty: ${quantity}`,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: `${product.name} (${selectedColor})`,
      imageKey: product.image_key,
      price: finalPrice,
    });
    navigate({ to: "/cart" });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      toast.success(`CAD file "${file.name}" uploaded successfully!`, {
        description: "Our lab team will review your 3D geometry for fabrication.",
      });
    }
  };

  // 3D Card Stack Auto-Play State
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Auto-play timer every 4 seconds
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % viewAngles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered, viewAngles.length]);

  // Compute 3D Card Stack Position & Perspective Depth (Strictly Contained Bounds)
  const getCardTransform = (index: number) => {
    const total = viewAngles.length;
    const diff = (index - activeImageIndex + total) % total;

    if (diff === 0) {
      // Active Front Card
      return {
        zIndex: 30,
        opacity: 1,
        transform:
          "translate3d(0, 0, 30px) scale(0.96) rotateY(var(--tilt-y, 0deg)) rotateX(var(--tilt-x, 0deg))",
        boxShadow: "0 24px 48px -12px rgba(20, 85, 217, 0.28), 0 0 0 1px rgba(20, 85, 217, 0.16)",
        cursor: "default",
        pointerEvents: "auto" as const,
      };
    }
    if (diff === 1 || (total === 2 && diff === 1)) {
      // Right Stacked Card (Next)
      return {
        zIndex: 20,
        opacity: 0.55,
        transform: "translate3d(16%, 6px, -45px) scale(0.8) rotateY(-14deg) rotate(4deg)",
        boxShadow: "0 12px 25px -10px rgba(0, 0, 0, 0.16)",
        cursor: "pointer",
        pointerEvents: "auto" as const,
      };
    }
    if (diff === total - 1) {
      // Left Stacked Card (Previous)
      return {
        zIndex: 20,
        opacity: 0.55,
        transform: "translate3d(-16%, 6px, -45px) scale(0.8) rotateY(14deg) rotate(-4deg)",
        boxShadow: "0 12px 25px -10px rgba(0, 0, 0, 0.16)",
        cursor: "pointer",
        pointerEvents: "auto" as const,
      };
    }
    // Deep Center Stack (Hidden Back)
    return {
      zIndex: 10,
      opacity: 0,
      transform: "translate3d(0, 12px, -90px) scale(0.68)",
      boxShadow: "none",
      cursor: "pointer",
      pointerEvents: "none" as const,
    };
  };

  // Filter 4 related products from catalog
  const relatedProducts = allProducts.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="bg-[#F8FAFC] dark:bg-background pb-20 space-y-10 sm:space-y-12">
      {/* 1. Breadcrumb Navigation Bar */}
      <div className="bg-white dark:bg-card border-b border-[#DCE5F2] dark:border-border">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-4 sm:px-6 py-3.5 text-xs font-bold text-[#52627A] dark:text-slate-400 uppercase tracking-wider overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-[#1455D9] transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <Link to="/shop" className="hover:text-[#1455D9] transition-colors shrink-0">
            Store
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <Link
            to="/category/$slug"
            params={{ slug: product.category_slug }}
            className="hover:text-[#1455D9] transition-colors shrink-0"
          >
            {product.category_slug.replace(/-/g, " ")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="text-[#0B1736] dark:text-white font-extrabold truncate">
            {product.name}
          </span>
        </div>
      </div>

      {/* 2. Main Product Details Container (2 Columns) */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ================= LEFT COLUMN: 3D Animated Card Stack Gallery (5 Cols) ================= */}
          <div className="lg:col-span-5 flex flex-col gap-4 sticky top-24 [isolation:isolate] z-0">
            {/* 3D Stack Stage Container with Dynamic Tilt & Specular Physics */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={(e) => {
                setIsHovered(false);
                e.currentTarget.style.setProperty("--tilt-x", "0deg");
                e.currentTarget.style.setProperty("--tilt-y", "0deg");
                e.currentTarget.style.setProperty("--glare-opacity", "0");
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                const tiltX = -y * 15;
                const tiltY = x * 15;
                const glareX = ((x + 0.5) * 100).toFixed(1);
                const glareY = ((y + 0.5) * 100).toFixed(1);
                e.currentTarget.style.setProperty("--tilt-x", `${tiltX}deg`);
                e.currentTarget.style.setProperty("--tilt-y", `${tiltY}deg`);
                e.currentTarget.style.setProperty("--glare-x", `${glareX}%`);
                e.currentTarget.style.setProperty("--glare-y", `${glareY}%`);
                e.currentTarget.style.setProperty("--glare-opacity", "0.65");
              }}
              className="relative w-full max-w-[440px] aspect-square mx-auto flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d] select-none overflow-hidden rounded-2xl sm:rounded-3xl border border-[#DCE5F2] dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-2 sm:p-3 shadow-xs"
              style={
                {
                  "--tilt-x": "0deg",
                  "--tilt-y": "0deg",
                  "--glare-x": "50%",
                  "--glare-y": "50%",
                  "--glare-opacity": "0",
                } as React.CSSProperties
              }
            >
              {/* Floating Badges with Soft Continuous Float (Top-Left of Deck) */}
              <div className="absolute top-3 left-3 z-40 flex flex-col gap-1.5 pointer-events-none animate-badge-float">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1455D9] px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                  <Sparkles className="h-3 w-3 animate-pulse" /> ACTE LAB CERTIFIED
                </span>
                {product.bestseller && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F5B000] px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#071B4D] shadow-md">
                    ★ BEST SELLER
                  </span>
                )}
              </div>

              {/* Wishlist Button (Top-Right of Deck) */}
              <button
                type="button"
                onClick={() => {
                  const added = toggleWishlist(product.id);
                  toast[added ? "success" : "message"](
                    added ? "Added to wishlist!" : "Removed from wishlist",
                  );
                }}
                className={`absolute top-3 right-3 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-[#DCE5F2] dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs shadow-sm hover:scale-110 active:scale-95 transition-all text-[#52627A] hover:text-[#1455D9] cursor-pointer ${
                  wished ? "text-[#1455D9] border-[#1455D9] bg-blue-50/80" : ""
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`h-4 w-4 ${wished ? "fill-[#1455D9] text-[#1455D9]" : ""}`} />
              </button>

              {/* 3D Stack Cards */}
              {viewAngles.map((view, idx) => {
                const style = getCardTransform(idx);
                const isActive = activeImageIndex === idx;

                return (
                  <div
                    key={view.id}
                    onClick={() => setActiveImageIndex(idx)}
                    style={style}
                    className={`absolute inset-x-3 inset-y-2 sm:inset-x-4 sm:inset-y-3 rounded-xl sm:rounded-2xl border border-[#DCE5F2] dark:border-slate-800 flex items-center justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group ${
                      view.viewType === "cad"
                        ? "bg-[#07132B] p-0"
                        : "bg-white dark:bg-card p-4 sm:p-6"
                    }`}
                  >
                    {/* Glossy Dynamic Specular Glare Reflection Sheen */}
                    {isActive && (
                      <div
                        className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl transition-opacity duration-300 opacity-[var(--glare-opacity,0)] mix-blend-overlay z-20"
                        style={{
                          background:
                            "radial-gradient(circle 320px at var(--glare-x,50%) var(--glare-y,50%), rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 40%, transparent 80%)",
                        }}
                      />
                    )}

                    {/* Render Real Vector CAD Blueprint Component or Photo Asset */}
                    {view.viewType === "cad" ? (
                      <CadBlueprintView product={product} />
                    ) : (
                      <>
                        {/* Image with specific perspective style */}
                        <img
                          src={view.src}
                          alt={`${product.name} - ${view.label}`}
                          className={`h-full max-h-[300px] sm:max-h-[340px] w-auto object-contain transition-all duration-500 select-none ${
                            isActive ? view.stageStyle : view.thumbStyle
                          }`}
                        />

                        {/* Active Floating Label inside Active Card */}
                        {isActive && (
                          <div className="absolute bottom-2.5 right-2.5 z-10 rounded-lg bg-[#0B1736]/90 backdrop-blur-xs border border-white/15 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider shadow-sm flex items-center gap-1.5 animate-fade-in">
                            <Sliders className="h-3 w-3 text-[#00AEEF]" />
                            <span>
                              {view.badgeTitle} &bull; {view.angle}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}

              {/* Navigation Arrows for 3D Stack */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev - 1 + viewAngles.length) % viewAngles.length);
                }}
                className="absolute left-1.5 top-1/2 -translate-y-1/2 z-40 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 dark:bg-card/95 border border-[#DCE5F2] dark:border-slate-700 text-[#0B1736] dark:text-white shadow-md hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
                aria-label="Previous view"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev + 1) % viewAngles.length);
                }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 z-40 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 dark:bg-card/95 border border-[#DCE5F2] dark:border-slate-700 text-[#0B1736] dark:text-white shadow-md hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
                aria-label="Next view"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Interactive Pagination Dots & Perspective Angle Tabs */}
            <div className="flex flex-col items-center gap-3">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {viewAngles.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeImageIndex === idx
                        ? "w-7 bg-[#1455D9]"
                        : "w-2 bg-[#DCE5F2] dark:bg-slate-700 hover:bg-slate-400"
                    }`}
                    aria-label={`View angle ${idx + 1}`}
                  />
                ))}
              </div>

              {/* 4 Angle Selector Pills with Glowing Active Ring Indicator */}
              <div className="grid grid-cols-4 gap-2.5 w-full">
                {viewAngles.map((view, idx) => (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative flex flex-col items-center justify-center rounded-xl p-2.5 text-center transition-all duration-300 cursor-pointer border ${
                      activeImageIndex === idx
                        ? "border-[#1455D9] bg-blue-50/80 dark:bg-blue-950/60 text-[#1455D9] ring-4 ring-[#1455D9]/30 shadow-[0_0_20px_rgba(20,85,217,0.3)] scale-105"
                        : "border-[#DCE5F2] dark:border-slate-800 bg-white dark:bg-card text-[#52627A] dark:text-slate-400 hover:border-slate-300 hover:scale-102"
                    }`}
                  >
                    {activeImageIndex === idx && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1455D9] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1455D9]"></span>
                      </span>
                    )}
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-tight truncate w-full">
                      {view.label}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-medium opacity-75 truncate w-full">
                      {view.angle}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="rounded-2xl border border-[#DCE5F2] dark:border-slate-800 bg-white dark:bg-card p-4 grid grid-cols-3 gap-2 text-center text-xs font-bold text-[#52627A] dark:text-slate-400">
              <div className="flex flex-col items-center gap-1">
                <Truck className="h-4 w-4 text-[#1455D9]" />
                <span className="text-[11px]">Fast Dispatch</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-[#DCE5F2] dark:border-slate-800 px-1">
                <Shield className="h-4 w-4 text-[#1455D9]" />
                <span className="text-[11px]">Lab Verified</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="h-4 w-4 text-[#1455D9]" />
                <span className="text-[11px]">Maker Guarantee</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Product Details & Controls (7 Cols) ================= */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Category Tag & Stock Status */}
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-[#1455D9] bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                <Layers className="h-3.5 w-3.5" />
                {product.subcategory || product.category_slug.replace(/-/g, " ")}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-lg">
                <CheckCircle className="h-3.5 w-3.5" />
                In Stock ({product.stock} units ready)
              </span>
            </div>

            {/* Main Product Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1736] dark:text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Student Discount Banner */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 px-3 py-1">
                <div className="flex items-center text-[#F59E0B]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-black text-[#0B1736] dark:text-white">
                  {product.rating}
                </span>
                <span className="text-xs font-medium text-[#52627A] dark:text-slate-400">
                  ({product.review_count || 120} reviews)
                </span>
              </div>

              <span className="text-xs text-[#52627A] dark:text-slate-400 font-semibold">
                SKU: <strong className="text-[#0B1736] dark:text-white">{product.sku}</strong>
              </span>
            </div>

            {/* Student Discount Promo Pill Card */}
            <div className="rounded-2xl bg-gradient-to-r from-[#040E29] to-[#0A2E7A] text-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#D4AF37]/50 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#D4AF37] uppercase">
                  <Award className="h-4 w-4" /> AICTE Student Advantage
                </div>
                <p className="text-sm font-extrabold text-white">
                  15% Instant Student Discount Available
                </p>
                <p className="text-xs text-slate-300 font-medium">
                  Apply code <span className="text-[#FACC15] font-bold">STUDENT15</span> at checkout
                  with college ID.
                </p>
              </div>

              <button
                type="button"
                onClick={async () => {
                  await safeCopyText("STUDENT15");
                  toast.success("Coupon code STUDENT15 copied!");
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#F5B000] hover:bg-[#EAB308] text-[#071B4D] px-4 py-2 text-xs font-black tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0 shadow-sm"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>STUDENT15</span>
              </button>
            </div>

            {/* Price Box */}
            <div className="rounded-2xl border border-[#DCE5F2] dark:border-slate-800 bg-white dark:bg-card p-5 space-y-2 shadow-xs">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#0B1736] dark:text-white">
                  {inr(finalPrice)}
                </span>
                {off > 0 && (
                  <>
                    <span className="text-base sm:text-lg font-bold text-[#52627A]/70 dark:text-slate-500 line-through">
                      {inr(product.price)}
                    </span>
                    <span className="rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 text-xs font-black text-[#16A34A] dark:text-emerald-400">
                      Save {inr(product.price - finalPrice)} ({off}% OFF)
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs font-semibold text-[#52627A] dark:text-slate-400">
                Inclusive of all taxes &amp; standard lab fabrication charges.
              </p>
            </div>

            {/* Material & Specs Summary Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-[#DCE5F2] dark:border-slate-800 bg-white dark:bg-card p-3 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-[#52627A] dark:text-slate-400">
                  Material
                </span>
                <p className="text-xs font-bold text-[#0B1736] dark:text-white truncate">
                  {product.material || "PLA Pro Industrial"}
                </p>
              </div>
              <div className="rounded-xl border border-[#DCE5F2] dark:border-slate-800 bg-white dark:bg-card p-3 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-[#52627A] dark:text-slate-400">
                  Fabrication Time
                </span>
                <p className="text-xs font-bold text-[#0B1736] dark:text-white truncate">
                  1-2 Business Days
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1 rounded-xl border border-[#DCE5F2] dark:border-slate-800 bg-white dark:bg-card p-3 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-[#52627A] dark:text-slate-400">
                  Dimensions
                </span>
                <p className="text-xs font-bold text-[#0B1736] dark:text-white truncate">
                  {product.dimensions || "Standard Precision"}
                </p>
              </div>
            </div>

            {/* Customization Options: Color Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="uppercase text-[#52627A] dark:text-slate-400">
                  Select Color / Finish:
                </span>
                <span className="text-[#1455D9]">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold border transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? "border-[#1455D9] bg-blue-50/60 dark:bg-blue-950/40 text-[#1455D9] shadow-xs"
                        : "border-[#DCE5F2] dark:border-slate-800 bg-white dark:bg-card text-[#52627A] hover:border-slate-400"
                    }`}
                  >
                    <span
                      className={`h-3.5 w-3.5 rounded-full ${c.border ? "border border-slate-300" : ""}`}
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Customization Options: Infill / Density */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="uppercase text-[#52627A] dark:text-slate-400">
                  Infill / Mechanical Grade:
                </span>
                <span className="text-[#1455D9]">{selectedInfill}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {infillOptions.map((infill) => (
                  <button
                    key={infill}
                    type="button"
                    onClick={() => setSelectedInfill(infill)}
                    className={`rounded-xl px-3 py-2.5 text-xs font-bold border text-center transition-all cursor-pointer ${
                      selectedInfill === infill
                        ? "border-[#1455D9] bg-[#1455D9] text-white shadow-xs"
                        : "border-[#DCE5F2] dark:border-slate-800 bg-white dark:bg-card text-[#52627A] hover:border-slate-400"
                    }`}
                  >
                    {infill}
                  </button>
                ))}
              </div>
            </div>

            {/* CAD / 3D File Upload Block */}
            <div className="rounded-2xl border-2 border-dashed border-[#1455D9]/40 bg-blue-50/30 dark:bg-blue-950/20 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#0B1736] dark:text-white uppercase tracking-wide">
                  <FileCode className="h-4 w-4 text-[#1455D9]" />
                  <span>Custom CAD / 3D File Upload</span>
                </div>
                <span className="text-[10px] font-bold text-[#1455D9] uppercase">Optional</span>
              </div>
              <p className="text-xs text-[#52627A] dark:text-slate-400 leading-relaxed font-medium">
                Want this item fabricated with custom dimensions or text? Upload your .STL, .STEP,
                .DXF, or .SVG model for direct fabrication review.
              </p>

              <label className="flex flex-col items-center justify-center p-4 border border-[#1455D9]/30 rounded-xl bg-white dark:bg-card hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer text-center">
                <Upload className="h-6 w-6 text-[#1455D9] mb-1.5" />
                <span className="text-xs font-bold text-[#0B1736] dark:text-white">
                  {uploadedFile ? uploadedFile.name : "Click to select or drag & drop CAD file"}
                </span>
                <span className="text-[10px] text-[#52627A] dark:text-slate-400 mt-0.5">
                  Supported formats: .STL, .STEP, .DXF, .SVG, .OBJ (Max 50MB)
                </span>
                <input
                  type="file"
                  accept=".stl,.step,.stp,.dxf,.svg,.obj,.3mf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {uploadedFile && (
                <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-2 text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <FileCheck className="h-4 w-4" /> Ready for fabrication review
                  </span>
                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    className="text-emerald-700 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Quantity Selector & Action CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity Control */}
                <div className="flex items-center justify-between rounded-xl border border-[#DCE5F2] dark:border-slate-800 bg-white dark:bg-card px-3 py-2 sm:w-36 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-base font-bold text-[#0B1736] dark:text-white flex items-center justify-center hover:bg-slate-200 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-sm font-black text-[#0B1736] dark:text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-base font-bold text-[#0B1736] dark:text-white flex items-center justify-center hover:bg-slate-200 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="interactive-buy-btn flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] text-white py-3.5 px-6 text-sm font-black tracking-wide shadow-[0_4px_16px_rgba(20,85,217,0.3)] hover:shadow-[0_6px_22px_rgba(20,85,217,0.45)] cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart ({inr(finalPrice * quantity)})</span>
                </button>

                {/* Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="interactive-buy-btn flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#0B1736] hover:bg-[#1E293B] dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#0B1736] py-3.5 px-6 text-sm font-black tracking-wide shadow-md cursor-pointer"
                >
                  <Zap className="interactive-buy-icon h-4 w-4 fill-current text-[#FACC15]" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. Technical Specs & Lab Certification Tabs ================= */}
        <div className="mt-14 sm:mt-16 rounded-2xl border border-[#DCE5F2] dark:border-slate-800 bg-white dark:bg-card p-6 sm:p-8 shadow-xs">
          {/* Tab Headers */}
          <div className="flex border-b border-[#DCE5F2] dark:border-slate-800 pb-3 gap-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-2 text-sm font-black uppercase tracking-wider transition-colors cursor-pointer shrink-0 border-b-2 -mb-3.5 ${
                activeTab === "specs"
                  ? "border-[#1455D9] text-[#1455D9]"
                  : "border-transparent text-[#52627A] dark:text-slate-400 hover:text-[#0B1736]"
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab("fabrication")}
              className={`pb-2 text-sm font-black uppercase tracking-wider transition-colors cursor-pointer shrink-0 border-b-2 -mb-3.5 ${
                activeTab === "fabrication"
                  ? "border-[#1455D9] text-[#1455D9]"
                  : "border-transparent text-[#52627A] dark:text-slate-400 hover:text-[#0B1736]"
              }`}
            >
              Lab Fabrication &amp; Quality Standards
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-2 text-sm font-black uppercase tracking-wider transition-colors cursor-pointer shrink-0 border-b-2 -mb-3.5 ${
                activeTab === "reviews"
                  ? "border-[#1455D9] text-[#1455D9]"
                  : "border-transparent text-[#52627A] dark:text-slate-400 hover:text-[#0B1736]"
              }`}
            >
              Student &amp; Maker Reviews ({reviews.length || 3})
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-6">
            {activeTab === "specs" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-black text-[#0B1736] dark:text-white mb-2">
                    Product Overview
                  </h3>
                  <p className="text-sm text-[#52627A] dark:text-slate-300 leading-relaxed font-medium">
                    {product.description || product.short_description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-[#DCE5F2] dark:border-slate-800 divide-y divide-[#DCE5F2] dark:divide-slate-800 text-xs font-semibold">
                    <div className="flex justify-between p-3">
                      <span className="text-[#52627A]">Material Grade</span>
                      <span className="text-[#0B1736] dark:text-white font-bold">
                        {product.material || "PLA Pro Matte"}
                      </span>
                    </div>
                    <div className="flex justify-between p-3">
                      <span className="text-[#52627A]">Manufacturing Method</span>
                      <span className="text-[#0B1736] dark:text-white font-bold">
                        {product.manufacturing_method || "Precision FDM / CNC / Laser"}
                      </span>
                    </div>
                    <div className="flex justify-between p-3">
                      <span className="text-[#52627A]">Dimensions</span>
                      <span className="text-[#0B1736] dark:text-white font-bold">
                        {product.dimensions || "Standard Precision"}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#DCE5F2] dark:border-slate-800 divide-y divide-[#DCE5F2] dark:divide-slate-800 text-xs font-semibold">
                    <div className="flex justify-between p-3">
                      <span className="text-[#52627A]">Dimensional Tolerance</span>
                      <span className="text-[#0B1736] dark:text-white font-bold">
                        &plusmn;0.1 mm
                      </span>
                    </div>
                    <div className="flex justify-between p-3">
                      <span className="text-[#52627A]">Quality Certification</span>
                      <span className="text-[#0B1736] dark:text-white font-bold">
                        AICTE IDEA Lab Certified
                      </span>
                    </div>
                    <div className="flex justify-between p-3">
                      <span className="text-[#52627A]">Warranty</span>
                      <span className="text-[#0B1736] dark:text-white font-bold">
                        1 Year Lab Prototyping Warranty
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "fabrication" && (
              <div className="space-y-4 text-sm text-[#52627A] dark:text-slate-300 leading-relaxed font-medium">
                <p>
                  Every unit fabricated through the <strong>ACTE IDEA LAB</strong> undergoes a
                  strict 3-stage quality inspection:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#1455D9] mt-0.5 shrink-0" />
                    <span>
                      <strong>1. Geometry &amp; Infill Verification:</strong> Slicing algorithms and
                      G-code simulations ensure maximum structural integrity.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#1455D9] mt-0.5 shrink-0" />
                    <span>
                      <strong>2. Post-Processing &amp; Deburring:</strong> Laser chamfering,
                      bead-blasting, or heat-treating applied according to product category.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#1455D9] mt-0.5 shrink-0" />
                    <span>
                      <strong>3. Calibration &amp; Caliper Inspection:</strong> Checked with digital
                      micrometers to guarantee precision tolerances.
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                {[
                  {
                    name: "Rahul Sharma (B.Tech Mechanical)",
                    rating: 5,
                    date: "2 days ago",
                    comment:
                      "Exceptional finish and surface quality! Used this for our robotics project submission and the tolerances were spot on.",
                  },
                  {
                    name: "Priya V. (ECE Innovator)",
                    rating: 5,
                    date: "1 week ago",
                    comment:
                      "The student discount with STUDENT15 worked instantly. Fast dispatch from the college lab.",
                  },
                  {
                    name: "Anand K. (Makerspace Lead)",
                    rating: 4,
                    date: "2 weeks ago",
                    comment:
                      "High structural durability and clean packaging. Highly recommend for any engineering team.",
                  },
                ].map((rev, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[#DCE5F2] dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0B1736] dark:text-white">
                        {rev.name}
                      </span>
                      <span className="text-[10px] text-[#52627A] dark:text-slate-400">
                        {rev.date}
                      </span>
                    </div>
                    <div className="flex items-center text-[#F59E0B]">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#52627A] dark:text-slate-300 font-medium">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= 4. Related Innovation Gear Carousel ================= */}
        <div className="mt-14 sm:mt-16 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1455D9]">
                <Box className="h-4 w-4" /> Recommended Products
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1736] dark:text-white tracking-tight">
                Related Innovation Gear
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs sm:text-sm font-bold text-[#1455D9] hover:underline"
            >
              View Full Catalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {relatedProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
