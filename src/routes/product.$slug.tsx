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
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const slug = params.slug;
    const product = getProductBySlug(slug);
    return { product, slug };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    return {
      meta: [
        {
          title: product
            ? `${product.name} – ACTE IDEA LAB Store`
            : "Product Details – ACTE IDEA LAB Store",
        },
        {
          name: "description",
          content:
            product?.description ||
            "High-precision makerspace prototypes, 3D printing, laser cutting and electronics.",
        },
      ],
    };
  },
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
  const loaderData = Route.useLoaderData();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const { data: rawProduct } = useQuery(productQuery(rawSlug));
  const product: Product = (loaderData?.product || rawProduct || getProductBySlug(rawSlug) || DEFAULT_CATALOG_PRODUCTS[0]) as Product;
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

  // Related products from the same category
  const relatedProducts = allProducts
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-background pb-20">
      {/* Top Breadcrumb Navigation */}
      <div className="border-b border-[#DCE5F2] dark:border-slate-800 bg-white dark:bg-card">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-3 flex items-center gap-2 text-xs font-semibold text-[#52627A] dark:text-slate-400">
          <Link to="/" className="hover:text-[#1455D9] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to="/category/$slug"
            params={{ slug: product.categorySlug || "3d-printing" }}
            className="hover:text-[#1455D9] transition-colors uppercase font-bold"
          >
            {product.category || product.categorySlug}
          </Link>
          <span>/</span>
          <span className="text-[#0B1736] dark:text-white font-bold truncate max-w-[200px] sm:max-w-md">
            {product.name}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Main 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ================= LEFT COLUMN: Advanced 3D/Angle Deck Image Gallery ================= */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Large Image Stage with Zoom, Badge & Angle Tag */}
            <div className="relative aspect-square w-full rounded-3xl border border-[#DCE5F2] dark:border-slate-800 bg-white dark:bg-card p-6 sm:p-8 flex items-center justify-center overflow-hidden shadow-xs group">
              {/* Top Angle & Badge Pill */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1455D9] text-white px-3 py-1 text-xs font-black tracking-wider uppercase shadow-xs">
                  <Sparkles className="h-3 w-3 text-amber-300" />
                  {currentAngle.badgeTitle}
                </span>
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 text-[11px] font-bold">
                  {currentAngle.angle}
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE5F2] dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-transform active:scale-90 cursor-pointer ${
                  wished ? "text-red-500 bg-red-50" : "text-slate-400 hover:text-red-500"
                }`}
              >
                <Heart className={`h-5 w-5 ${wished ? "fill-current" : ""}`} />
              </button>

              {/* Main Product Image with View Simulation Transform */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <img
                  src={currentAngle.src}
                  alt={`${product.name} - ${currentAngle.label}`}
                  className={`w-full h-full object-contain transition-all duration-300 drop-shadow-md select-none ${currentAngle.stageStyle}`}
                />
              </div>

              {/* Arrow Navigators */}
              <button
                onClick={() =>
                  setActiveImageIndex(
                    (prev) => (prev - 1 + viewAngles.length) % viewAngles.length
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md text-slate-700 dark:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  setActiveImageIndex((prev) => (prev + 1) % viewAngles.length)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md text-slate-700 dark:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* 4 Thumbnail Perspective Selector Deck */}
            <div className="grid grid-cols-4 gap-3">
              {viewAngles.map((angle, idx) => (
                <button
                  key={angle.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square rounded-2xl border-2 p-2 flex flex-col items-center justify-between bg-white dark:bg-card transition-all cursor-pointer overflow-hidden ${
                    activeImageIndex === idx
                      ? "border-[#1455D9] ring-2 ring-blue-500/20 shadow-sm"
                      : "border-[#DCE5F2] dark:border-slate-800 hover:border-slate-400"
                  }`}
                >
                  <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
                    <img
                      src={angle.src}
                      alt={angle.label}
                      className={`h-full w-full object-contain transition-transform ${angle.thumbStyle}`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#0B1736] dark:text-white uppercase tracking-tight text-center truncate w-full mt-1">
                    {angle.label}
                  </span>
                </button>
              ))}
            </div>

            {/* IDEA Lab Blueprint / CAD 2D Technical Drawing Component */}
            <div className="mt-6">
              <CadBlueprintView product={product} />
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Product Configurator & Buy Section ================= */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header / Category / Rating */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-block rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1455D9] border border-blue-200 dark:border-blue-800 px-3 py-1 text-xs font-black uppercase tracking-wider">
                  {product.category || "AICTE IDEA LAB"}
                </span>
                <span className="text-xs font-semibold text-[#16A34A] bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> In Stock ({product.stock || 25} units)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1736] dark:text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews counter */}
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center text-[#F59E0B]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[#0B1736] dark:text-white">
                  {product.rating || 5.0}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-[#52627A] dark:text-slate-400 font-semibold">
                  {reviews.length || product.reviews_count || 42} Lab Verified Reviews
                </span>
              </div>
            </div>

            {/* Pricing Strip with Discount */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-[#DCE5F2] dark:border-slate-800 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-[#0B1736] dark:text-white">
                {inr(finalPrice)}
              </span>
              {product.price > finalPrice && (
                <span className="text-base text-slate-400 line-through font-bold">
                  {inr(product.price)}
                </span>
              )}
              {off > 0 && (
                <span className="rounded-full bg-[#16A34A] text-white px-2.5 py-1 text-xs font-black uppercase tracking-wider">
                  Save {off}%
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-[#52627A] dark:text-slate-300 leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Material & Color Options */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-[#0B1736] dark:text-white uppercase tracking-wider flex items-center justify-between">
                <span>Color / Finish:</span>
                <span className="text-[#1455D9] font-black">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold border transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? "border-[#1455D9] bg-blue-50 text-[#1455D9] shadow-xs"
                        : "border-[#DCE5F2] dark:border-slate-700 bg-white dark:bg-card text-slate-700 dark:text-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <span
                      className={`h-3.5 w-3.5 rounded-full ${
                        c.border ? "border border-slate-300" : ""
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Infill / Density Selector */}
            <div className="space-y-3 pt-1">
              <label className="text-xs font-bold text-[#0B1736] dark:text-white uppercase tracking-wider flex items-center justify-between">
                <span>Structural Infill:</span>
                <span className="text-[#1455D9] font-black">{selectedInfill}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {infillOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedInfill(opt)}
                    className={`rounded-xl px-3 py-2 text-xs font-bold border transition-all cursor-pointer text-center truncate ${
                      selectedInfill === opt
                        ? "border-[#1455D9] bg-blue-50 text-[#1455D9]"
                        : "border-[#DCE5F2] dark:border-slate-700 bg-white dark:bg-card text-slate-700 dark:text-slate-300 hover:border-slate-400"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom 3D CAD Upload Option */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-[#DCE5F2] dark:border-slate-700 bg-white dark:bg-card space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-[#1455D9]" />
                  <span className="text-xs font-bold text-[#0B1736] dark:text-white uppercase tracking-wider">
                    Upload Custom CAD (.STL / .STEP / .DXF)
                  </span>
                </div>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold px-2 py-0.5 rounded-md">
                  Optional
                </span>
              </div>
              <p className="text-xs text-[#52627A] dark:text-slate-400 font-medium">
                Want this customized with your engineering specifications? Upload your design file.
              </p>
              <label className="inline-flex items-center gap-2 text-xs font-bold text-[#1455D9] hover:underline cursor-pointer pt-1">
                <input
                  type="file"
                  accept=".stl,.step,.stp,.dxf,.svg,.obj"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span>{uploadedFile ? `Attached: ${uploadedFile.name}` : "+ Choose 3D CAD Model"}</span>
              </label>
            </div>

            {/* Quantity Selector + Action Buttons */}
            <div className="pt-4 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center rounded-xl border border-[#DCE5F2] dark:border-slate-700 bg-white dark:bg-card p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-base font-bold text-[#0B1736] dark:text-white flex items-center justify-center hover:bg-slate-200 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-black text-[#0B1736] dark:text-white">
                    {quantity}
                  </span>
                  <button
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
              className={`text-sm font-black pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "specs"
                  ? "border-[#1455D9] text-[#1455D9]"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab("fabrication")}
              className={`text-sm font-black pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "fabrication"
                  ? "border-[#1455D9] text-[#1455D9]"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              IDEA Lab Certification &amp; Machine Log
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`text-sm font-black pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "reviews"
                  ? "border-[#1455D9] text-[#1455D9]"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          {/* Tab 1: Specs */}
          {activeTab === "specs" && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-[#DCE5F2] dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Material
                </span>
                <span className="text-sm font-bold text-[#0B1736] dark:text-white mt-1 block">
                  {product.material || "High Grade Polymer / Hardwood / Metal"}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-[#DCE5F2] dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Dimensions
                </span>
                <span className="text-sm font-bold text-[#0B1736] dark:text-white mt-1 block">
                  {product.dimensions || "120 x 85 x 90 mm"}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-[#DCE5F2] dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Fabrication Lead Time
                </span>
                <span className="text-sm font-bold text-[#0B1736] dark:text-white mt-1 block">
                  {product.lead_time || "1-2 Business Days"}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-[#DCE5F2] dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  SKU Identifier
                </span>
                <span className="text-sm font-bold text-[#0B1736] dark:text-white mt-1 block">
                  {product.sku || "IDEA-LAB-PROD"}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-[#DCE5F2] dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Origin
                </span>
                <span className="text-sm font-bold text-[#0B1736] dark:text-white mt-1 block">
                  AICTE IDEA Lab Makerspace (India)
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-[#DCE5F2] dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Quality Standard
                </span>
                <span className="text-sm font-bold text-[#0B1736] dark:text-white mt-1 block">
                  100% Dimensional Inspection Passed
                </span>
              </div>
            </div>
          )}

          {/* Tab 2: Fabrication & Lab Certification */}
          {activeTab === "fabrication" && (
            <div className="mt-6 space-y-4">
              <div className="p-5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-2">
                <div className="flex items-center gap-2 text-sm font-black text-[#1455D9] dark:text-blue-400">
                  <Award className="h-5 w-5" /> AICTE IDEA Lab Certified Prototype
                </div>
                <p className="text-xs text-[#52627A] dark:text-slate-300 leading-relaxed font-medium">
                  This item is fabricated using calibrated machinery in the AICTE IDEA Lab.
                  Every piece undergoes post-processing, deburring, layer inspection, and functional verification.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-[#52627A] dark:text-slate-400">
                <div className="p-3 rounded-lg border border-[#DCE5F2] dark:border-slate-800">
                  • Machine: Industrial FDM / SLA &amp; CO2 Laser
                </div>
                <div className="p-3 rounded-lg border border-[#DCE5F2] dark:border-slate-800">
                  • Layer Resolution: 0.12mm – 0.20mm High Detail
                </div>
                <div className="p-3 rounded-lg border border-[#DCE5F2] dark:border-slate-800">
                  • Thermal Resistance: Up to 60°C (PLA) / 80°C (PETG)
                </div>
                <div className="p-3 rounded-lg border border-[#DCE5F2] dark:border-slate-800">
                  • Inspection: Caliper &amp; Optical Surface Check
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === "reviews" && (
            <div className="mt-6 space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-xl border border-[#DCE5F2] dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B1736] dark:text-white">
                      {rev.author_name}
                    </span>
                    <div className="flex items-center text-[#F59E0B]">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#52627A] dark:text-slate-300">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= 4. Related Products Carousel / Grid ================= */}
        <div className="mt-14 sm:mt-16 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1736] dark:text-white tracking-tight">
              Related {product.category || "IDEA Lab"} Creations
            </h2>
            <Link
              to="/category/$slug"
              params={{ slug: product.categorySlug || "3d-printing" }}
              className="text-xs font-bold text-[#1455D9] hover:underline"
            >
              View More in Category &rarr;
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
