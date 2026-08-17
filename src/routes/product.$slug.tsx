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

import { productQuery, productsQuery, reviewsQuery, Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { inr, effectivePrice, discountPercent } from "@/lib/format";
import { productImage, productViewsFor, ProductViewAngle } from "@/lib/product-images";
import { ProductGridSkeleton } from "@/components/site/States";

export const Route = createFileRoute("/product/$slug")({
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const { data: product, isLoading } = useQuery(productQuery(slug));
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
  }, [slug]);

  if (isLoading || !product) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-12">
        <ProductGridSkeleton />
      </div>
    );
  }

  const viewAngles = productViewsFor(product.image_key);
  const fallbackAngle: ProductViewAngle = {
    id: "view-front",
    label: "Front View",
    badgeTitle: "STUDIO FRONT VIEW",
    angle: "0° Elevation",
    src: productImage(product.image_key),
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
          {/* ================= LEFT COLUMN: Item-Specific Multi-Angle Image Gallery (5 Cols) ================= */}
          <div className="lg:col-span-5 flex flex-col gap-4 sticky top-24">
            {/* Main Stage Image with Wishlist Button & Angle Badge */}
            <div className="relative aspect-square w-full rounded-2xl sm:rounded-3xl border border-[#DCE5F2] dark:border-slate-800 bg-white dark:bg-card overflow-hidden p-6 sm:p-8 flex items-center justify-center group shadow-sm">
              {/* Product Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1455D9] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                  <Sparkles className="h-3 w-3" /> ACTE LAB CERTIFIED
                </span>
                {product.bestseller && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F5B000] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#071B4D] shadow-sm">
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* Active Angle Badge (Bottom-Right) */}
              <div className="absolute bottom-4 right-4 z-10 rounded-lg bg-[#0B1736]/90 backdrop-blur-xs border border-white/15 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all">
                <Sliders className="h-3 w-3 text-[#00AEEF]" />
                <span>
                  {currentAngle.badgeTitle} &bull; {currentAngle.angle}
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => {
                  const added = toggleWishlist(product.id);
                  toast[added ? "success" : "message"](
                    added ? "Added to wishlist!" : "Removed from wishlist",
                  );
                }}
                className={`absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE5F2] dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md hover:scale-110 active:scale-95 transition-all text-[#52627A] hover:text-[#1455D9] cursor-pointer ${
                  wished ? "text-[#1455D9] border-[#1455D9] bg-blue-50/50" : ""
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`h-5 w-5 ${wished ? "fill-[#1455D9] text-[#1455D9]" : ""}`} />
              </button>

              {/* Technical CAD Overlay grid if CAD view is active */}
              {currentAngle.viewType === "cad" && (
                <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(to_right,#00AEEF_1px,transparent_1px),linear-gradient(to_bottom,#00AEEF_1px,transparent_1px)] bg-[size:20px_20px] z-5" />
              )}

              {/* High-Resolution Main Photo with View Angle Transform */}
              <img
                src={currentAngle.src}
                alt={`${product.name} - ${currentAngle.label}`}
                className={`h-full w-full object-contain transition-all duration-300 ease-in-out select-none ${
                  currentAngle.stageStyle || ""
                }`}
              />
            </div>

            {/* Product-Specific Multi-Angle Thumbnail Row */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {viewAngles.map((view, idx) => (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex flex-col items-center rounded-xl border-2 overflow-hidden bg-white dark:bg-card p-1.5 transition-all cursor-pointer group ${
                    activeImageIndex === idx
                      ? "border-[#1455D9] shadow-[0_0_12px_rgba(20,85,217,0.25)] scale-102 bg-blue-50/30"
                      : "border-[#DCE5F2] dark:border-slate-800 opacity-80 hover:opacity-100 hover:border-slate-300"
                  }`}
                >
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-900/50 p-1 flex items-center justify-center">
                    <img
                      src={view.src}
                      alt={`${product.name} - ${view.label}`}
                      className={`h-full w-full object-contain transition-all duration-300 ease-in-out ${
                        view.thumbStyle || ""
                      }`}
                    />
                  </div>
                  <span
                    className={`mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-tight truncate w-full text-center ${
                      activeImageIndex === idx
                        ? "text-[#1455D9]"
                        : "text-[#52627A] dark:text-slate-400"
                    }`}
                  >
                    {view.label}
                  </span>
                </button>
              ))}
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
                onClick={() => {
                  navigator.clipboard.writeText("STUDENT15");
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
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] text-white py-3.5 px-6 text-sm font-black tracking-wide shadow-[0_4px_16px_rgba(20,85,217,0.3)] hover:shadow-[0_6px_22px_rgba(20,85,217,0.45)] hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart ({inr(finalPrice * quantity)})</span>
                </button>

                {/* Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#0B1736] hover:bg-[#1E293B] dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#0B1736] py-3.5 px-6 text-sm font-black tracking-wide shadow-md hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
                >
                  <Zap className="h-4 w-4 fill-current text-[#FACC15]" />
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
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#DCE5F2] dark:border-slate-800 bg-white dark:bg-card p-3.5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(20,85,217,0.08)]"
              >
                <Link
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900/50 block"
                >
                  <img
                    src={productImage(p.image_key)}
                    alt={p.name}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-[#1455D9] text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-xs">
                    {p.category_slug.replace(/-/g, " ")}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col pt-3 justify-between space-y-2">
                  <div className="space-y-1">
                    <Link
                      to="/product/$slug"
                      params={{ slug: p.slug }}
                      className="text-xs sm:text-sm font-bold text-[#0B1736] dark:text-white line-clamp-2 leading-[1.35] min-h-[2.6rem] hover:text-[#1455D9] transition-colors"
                    >
                      {p.name}
                    </Link>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-[#52627A] dark:text-slate-400">
                      <Star className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="font-bold text-[#0B1736] dark:text-white">{p.rating}</span>
                      <span>({p.review_count || 50})</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#DCE5F2]/40 dark:border-border/40 mt-auto">
                    <div className="flex items-baseline gap-2 pb-2">
                      <span className="text-base font-black text-[#0B1736] dark:text-white">
                        {inr(effectivePrice(p))}
                      </span>
                      {p.discount_price && (
                        <span className="text-xs text-[#52627A]/70 line-through">
                          {inr(p.price)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        addToCart({
                          productId: p.id,
                          slug: p.slug,
                          name: p.name,
                          imageKey: p.image_key,
                          price: effectivePrice(p),
                        });
                        toast.success(`Added "${p.name}" to cart!`);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] text-white py-2 text-xs font-bold shadow-xs transition-transform active:scale-95 cursor-pointer"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
