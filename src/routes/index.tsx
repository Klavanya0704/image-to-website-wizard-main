import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Truck,
  Clock,
  Box,
  Scissors,
  Settings,
  Cpu,
  Plane,
  Layers,
  Gift,
  Star,
  ShoppingCart,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Headphones,
  CheckCircle2,
  Lock,
  Compass,
  Award,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import heroShowcaseImg from "@/assets/hero-showcase.png";
import { productsQuery } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ACTE IDEA LAB – Where Ideas Become Reality" },
      {
        name: "description",
        content:
          "High-quality 3D printed, laser cut, CNC machined products and electronics for innovators, makers, and creators.",
      },
      { property: "og:title", content: "ACTE IDEA LAB – Where Ideas Become Reality" },
      {
        property: "og:description",
        content:
          "High-quality 3D printed, laser cut, CNC machined products and electronics for innovators, makers, and creators.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const categories = [
  {
    name: "3D Printing",
    icon: Box,
    bg: "bg-[#EBF2FE]",
    iconColor: "text-[#1455D9]",
    slug: "3d-printing",
  },
  {
    name: "Laser Cutting",
    icon: Scissors,
    bg: "bg-[#FEECEB]",
    iconColor: "text-[#E52320]",
    slug: "laser-cutting",
  },
  {
    name: "CNC Machining",
    icon: Settings,
    bg: "bg-[#EDF8EE]",
    iconColor: "text-[#16A34A]",
    slug: "cnc-machining",
  },
  {
    name: "Electronics",
    icon: Cpu,
    bg: "bg-[#F3EEFE]",
    iconColor: "text-[#7C3AED]",
    slug: "electronics",
  },
  {
    name: "Drones & Parts",
    icon: Plane,
    bg: "bg-[#E6F7FE]",
    iconColor: "text-[#00AEEF]",
    slug: "drones-parts",
  },
  {
    name: "Acrylic Products",
    icon: Layers,
    bg: "bg-[#FEEBEF]",
    iconColor: "text-[#E11D48]",
    slug: "acrylic-products",
  },
  {
    name: "DIY Kits",
    icon: Gift,
    bg: "bg-[#FEF6E6]",
    iconColor: "text-[#D97706]",
    slug: "diy-kits",
  },
];

const referenceProducts = [
  {
    id: "ref-1",
    name: "3D Printed Geometric Vase",
    slug: "geometric-spiral-vase",
    category: "3D PRINTING",
    category_slug: "3d-printing",
    image: "/products/prod-vase.jpg",
    rating: 4.8,
    reviews: 120,
    price: 499,
    originalPrice: 599,
    badge: "BEST SELLER",
    badgeColor: "bg-[#1455D9] text-white",
  },
  {
    id: "ref-2",
    name: "Custom Name Keychain",
    slug: "custom-engraved-wooden-keychain",
    category: "LASER CUTTING",
    category_slug: "laser-cutting",
    image: "/products/prod-keychain.jpg",
    rating: 4.9,
    reviews: 95,
    price: 149,
    originalPrice: 199,
    badge: "BEST SELLER",
    badgeColor: "bg-[#16A34A] text-white",
  },
  {
    id: "ref-3",
    name: "Mechanical Coupling",
    slug: "precision-aluminum-shaft-coupler",
    category: "CNC MACHINING",
    category_slug: "cnc-machining",
    image: "/products/prod-coupling.jpg",
    rating: 4.7,
    reviews: 80,
    price: 1299,
    originalPrice: 1599,
    badge: "POPULAR",
    badgeColor: "bg-[#7C3AED] text-white",
  },
  {
    id: "ref-4",
    name: "Tree of Life LED Lamp",
    slug: "tree-of-life-wooden-led-lamp",
    category: "LASER CUTTING",
    category_slug: "laser-cutting",
    image: "/products/prod-tree-lamp.jpg",
    rating: 4.9,
    reviews: 60,
    price: 699,
    originalPrice: 899,
    badge: "NEW ARRIVAL",
    badgeColor: "bg-[#EA580C] text-white",
  },
  {
    id: "ref-5",
    name: "Custom College Logo Stand",
    slug: "custom-acrylic-trophy-plaque",
    category: "ACRYLIC PRODUCTS",
    category_slug: "acrylic-products",
    image: "/products/prod-stand.jpg",
    rating: 4.8,
    reviews: 75,
    price: 1199,
    originalPrice: 1499,
    badge: "BEST SELLER",
    badgeColor: "bg-[#1455D9] text-white",
  },
  {
    id: "ref-6",
    name: "CNC Machined Aluminum Bracket",
    slug: "heavy-duty-l-bracket-cnc",
    category: "CNC MACHINING",
    category_slug: "cnc-machining",
    image: "/products/prod-bracket.jpg",
    rating: 4.7,
    reviews: 110,
    price: 899,
    originalPrice: 1199,
    badge: "POPULAR",
    badgeColor: "bg-[#7C3AED] text-white",
  },
];

function Index() {
  const { addToCart } = useStore();
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 23,
    mins: 45,
    secs: 12,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNextProduct = () => {
    setCarouselIndex((prev) => (prev + 1) % referenceProducts.length);
  };

  const handlePrevProduct = () => {
    setCarouselIndex((prev) => (prev - 1 + referenceProducts.length) % referenceProducts.length);
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-background pb-20 space-y-8 sm:space-y-10">
      {/* 1. Hero Section (Exact Visual Layout & Styling) */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-5 sm:pt-7">
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#E6EFFD] via-[#EFF5FE] to-[#F8FAFD] dark:from-[#0D1E42] dark:via-[#091530] dark:to-[#080F22] border border-[#DCE5F2] dark:border-blue-950/60 p-6 sm:p-10 lg:p-14 shadow-[0_4px_25px_rgba(20,85,217,0.06)]">
          {/* Subtle Radial Glow in background */}
          <div className="absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-[#1455D9]/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Subtitle, CTAs, Trust Badges (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start z-10">
              {/* Blue Pill Eyebrow */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#1455D9] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs">
                ACTE IDEA LAB STORE
              </div>

              {/* Main Headline */}
              <h1 className="mt-4 sm:mt-5 text-4xl sm:text-5xl lg:text-[58px] font-black tracking-tight leading-[1.12] text-[#0B1736] dark:text-white">
                Where Ideas <br />
                <span className="text-[#1455D9] dark:text-[#3B82F6]">Become Reality</span>
              </h1>

              {/* Description */}
              <p className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-[#52627A] dark:text-slate-300 font-medium">
                High-quality 3D printed, laser cut, CNC machined products and electronics for
                innovators, makers, and creators.
              </p>

              {/* Action Buttons */}
              <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] px-7 py-3.5 text-sm font-bold text-white transition-all shadow-[0_4px_14px_rgba(20,85,217,0.3)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#categories"
                  className="inline-flex items-center rounded-xl border border-[#DCE5F2] dark:border-slate-700 bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-slate-800 px-6 py-3.5 text-sm font-bold text-[#0B1736] dark:text-white transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-xs"
                >
                  Explore Categories
                </a>
              </div>

              {/* 4 Small Trust Indicators with Blue Icons */}
              <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-8 text-xs font-bold text-[#52627A] dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#1455D9]" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-[#1455D9]" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-[#1455D9]" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#1455D9]" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Product Composition (5 cols) */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative w-full max-w-[480px] lg:max-w-none group">
                <img
                  src={heroShowcaseImg}
                  alt="ACTE IDEA LAB Innovation Showcase"
                  className="w-full h-auto object-contain rounded-2xl drop-shadow-[0_12px_24px_rgba(20,85,217,0.12)] transition-transform duration-500 group-hover:scale-102"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Student Discount Banner (Blue Version from reference) */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] bg-gradient-to-r from-[#081534] via-[#0B1A40] to-[#0A225C] text-white p-6 sm:p-8 lg:p-10 shadow-lg border border-blue-950/80">
          {/* Subtle wave line pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00AEEF_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Box: Student Discount Badge & Title (7 cols) */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Outlined Student Discount Icon Badge */}
              <div className="flex flex-col items-center justify-center h-24 w-28 shrink-0 rounded-2xl border border-blue-400/30 bg-blue-900/20 p-3 text-center">
                <GraduationCap className="h-7 w-7 text-[#00AEEF] mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 leading-tight">
                  STUDENT DISCOUNT
                </span>
              </div>

              {/* Main Discount Text */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Exclusive Offer for Students
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    15%
                  </span>
                  <span className="text-4xl sm:text-5xl font-black text-[#00AEEF] tracking-tight">
                    OFF
                  </span>
                </div>
                <p className="text-xs text-blue-100/80 font-medium max-w-md">
                  Unlock your creativity with 15% off on all student projects. Verify with student
                  ID.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("STUDENT15");
                      toast.success("Coupon code STUDENT15 copied to clipboard!", {
                        description: "Apply at checkout for 15% instant discount.",
                      });
                    }}
                    className="inline-flex items-center rounded-full border border-blue-400/50 bg-blue-950/40 hover:bg-blue-800/60 px-5 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    Verify Now
                  </button>
                </div>
              </div>
            </div>

            {/* Vertical Divider (Desktop) */}
            <div className="hidden lg:block lg:col-span-1 h-20 border-r border-dashed border-white/20" />

            {/* Right Side: Gift Icon, Limited Time Offer & Countdown Timer (4 cols) */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-row items-center gap-6 justify-between lg:justify-end">
              {/* Circular Gift Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1455D9] text-white shadow-md shrink-0">
                <Gift className="h-6 w-6" />
              </div>

              {/* Countdown Display */}
              <div className="text-center sm:text-left space-y-1">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-blue-300">
                  LIMITED TIME OFFER
                </span>
                <div className="flex items-center gap-2 font-mono text-xl sm:text-2xl font-black tracking-wider text-white">
                  <span>{String(timeLeft.days).padStart(2, "0")}</span>
                  <span className="text-blue-400">:</span>
                  <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                  <span className="text-blue-400">:</span>
                  <span>{String(timeLeft.mins).padStart(2, "0")}</span>
                  <span className="text-blue-400">:</span>
                  <span>{String(timeLeft.secs).padStart(2, "0")}</span>
                </div>
                <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-blue-300/80 px-0.5">
                  <span>DAYS</span>
                  <span>HRS</span>
                  <span>MINS</span>
                  <span>SECS</span>
                </div>
              </div>

              {/* Quick STUDENT15 Copy Pill Button */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText("STUDENT15");
                  toast.success("Coupon code STUDENT15 copied!");
                }}
                className="rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] text-white px-4 py-2 text-xs font-black tracking-wider shadow-sm transition-transform active:scale-95 cursor-pointer uppercase shrink-0"
              >
                STUDENT15
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Shortcut Section (White Rounded Card with 7 Pastel Circular Tiles) */}
      <section id="categories" className="mx-auto max-w-[1400px] px-4 sm:px-6 scroll-mt-24">
        <div className="rounded-[24px] bg-white dark:bg-card border border-[#DCE5F2] dark:border-border p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
            {categories.map(({ name, icon: Icon, bg, iconColor, slug }) => (
              <Link
                key={name}
                to="/category/$slug"
                params={{ slug }}
                className="group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-sm"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${bg} ${iconColor} transition-transform duration-300 group-hover:scale-110 shadow-xs`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <span className="mt-3 text-xs sm:text-sm font-bold text-[#0B1736] dark:text-white group-hover:text-[#1455D9] transition-colors">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Statistics Section (Clean White Card with 4 Blue Stats) */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="rounded-[24px] bg-white dark:bg-card border border-[#DCE5F2] dark:border-border p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#DCE5F2] dark:divide-border">
            <div className="flex flex-col items-center justify-center text-center pt-2 sm:pt-0">
              <span className="text-3xl sm:text-4xl font-black text-[#1455D9] tracking-tight">
                450+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#52627A] dark:text-slate-400 mt-1">
                Projects Delivered
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center pt-4 sm:pt-0 sm:pl-6">
              <span className="text-3xl sm:text-4xl font-black text-[#1455D9] tracking-tight">
                3,200+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#52627A] dark:text-slate-400 mt-1">
                Happy Students
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center pt-4 sm:pt-0 sm:pl-6">
              <span className="text-3xl sm:text-4xl font-black text-[#1455D9] tracking-tight">
                1,100+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#52627A] dark:text-slate-400 mt-1">
                Products Created
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center pt-4 sm:pt-0 sm:pl-6">
              <span className="text-3xl sm:text-4xl font-black text-[#1455D9] tracking-tight">
                85+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#52627A] dark:text-slate-400 mt-1">
                Innovations Workshop
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Service Benefits Section (Quality Assurance, Fast Shipping, Secure Payments, Support) */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="rounded-[24px] bg-white dark:bg-card border border-[#DCE5F2] dark:border-border p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EBF2FE] text-[#1455D9]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0B1736] dark:text-white">
                  Quality Assurance
                </h4>
                <p className="text-xs text-[#52627A] dark:text-slate-400 font-medium">
                  All products are quality checked
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EBF2FE] text-[#1455D9]">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0B1736] dark:text-white">
                  Fast &amp; Reliable Shipping
                </h4>
                <p className="text-xs text-[#52627A] dark:text-slate-400 font-medium">
                  On-time delivery across India
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EBF2FE] text-[#1455D9]">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0B1736] dark:text-white">
                  Secure Payments
                </h4>
                <p className="text-xs text-[#52627A] dark:text-slate-400 font-medium">
                  100% secure payment gateway
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EBF2FE] text-[#1455D9]">
                <Headphones className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0B1736] dark:text-white">
                  Customer Support
                </h4>
                <p className="text-xs text-[#52627A] dark:text-slate-400 font-medium">
                  We&apos;re here to help you
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Featured Products Section (6 Reference Cards Matching Layout) */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1455D9]">
              <Sparkles className="h-4 w-4" /> Featured Products
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1736] dark:text-white tracking-tight">
              Top picks for creators and innovators
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1455D9] hover:underline"
          >
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Carousel Grid with Arrow Navigation */}
        <div className="relative group/carousel">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevProduct}
            aria-label="Previous Products"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-card border border-[#DCE5F2] text-[#0B1736] dark:text-white shadow-md hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNextProduct}
            aria-label="Next Products"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-card border border-[#DCE5F2] text-[#0B1736] dark:text-white shadow-md hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {referenceProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#DCE5F2] dark:border-border bg-white dark:bg-card p-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(20,85,217,0.08)]"
              >
                {/* Product Image Area with Badge */}
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900/50 block"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Status Badge */}
                  <span
                    className={`absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 text-[9px] font-black tracking-wider uppercase shadow-xs ${product.badgeColor}`}
                  >
                    {product.badge}
                  </span>
                </Link>

                {/* Meta details */}
                <div className="flex flex-1 flex-col pt-3 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#52627A] dark:text-slate-400">
                    {product.category}
                  </span>
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="text-xs sm:text-sm font-bold text-[#0B1736] dark:text-white line-clamp-1 hover:text-[#1455D9] transition-colors"
                  >
                    {product.name}
                  </Link>

                  {/* Rating with Orange Stars */}
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#52627A] dark:text-slate-400">
                    <div className="flex items-center text-[#F59E0B]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <span className="ml-1 font-bold text-[#0B1736] dark:text-white">
                      {product.rating}
                    </span>
                    <span>({product.reviews})</span>
                  </div>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-black text-[#0B1736] dark:text-white">
                      {inr(product.price)}
                    </span>
                    <span className="text-xs text-[#52627A]/70 dark:text-slate-500 line-through">
                      {inr(product.originalPrice)}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => {
                      addToCart({
                        productId: product.id,
                        slug: product.slug,
                        name: product.name,
                        imageKey: "vase",
                        price: product.price,
                      });
                      toast.success(`Added "${product.name}" to cart!`);
                    }}
                    className="mt-2 w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] text-white py-2 text-xs font-bold shadow-xs transition-transform active:scale-95 cursor-pointer"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bottom CTA Card ("Have an Idea? We Make It Real.") */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="rounded-[28px] bg-white dark:bg-card border border-[#DCE5F2] dark:border-border p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading & Description (6 cols) */}
            <div className="lg:col-span-6 space-y-3 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1736] dark:text-white tracking-tight">
                Have an Idea? <span className="text-[#1455D9]">We Make It Real.</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#52627A] dark:text-slate-400 font-medium max-w-lg leading-relaxed">
                From concept to creation, we bring your ideas to life with precision and quality.
              </p>
            </div>

            {/* Right Column: 4 Features with Line Icons (6 cols) */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="flex flex-col items-center space-y-1.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBF2FE] text-[#1455D9]">
                  <Compass className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-[#0B1736] dark:text-white">
                  Custom Design
                </span>
                <span className="text-[10px] text-[#52627A] dark:text-slate-400 font-medium">
                  Share your idea
                </span>
              </div>

              <div className="flex flex-col items-center space-y-1.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBF2FE] text-[#1455D9]">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-[#0B1736] dark:text-white">
                  Expert Support
                </span>
                <span className="text-[10px] text-[#52627A] dark:text-slate-400 font-medium">
                  Get expert guidance
                </span>
              </div>

              <div className="flex flex-col items-center space-y-1.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBF2FE] text-[#1455D9]">
                  <Award className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-[#0B1736] dark:text-white">
                  Quality Guarantee
                </span>
                <span className="text-[10px] text-[#52627A] dark:text-slate-400 font-medium">
                  Perfect results
                </span>
              </div>

              <div className="flex flex-col items-center space-y-1.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBF2FE] text-[#1455D9]">
                  <Truck className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-[#0B1736] dark:text-white">
                  On-time Delivery
                </span>
                <span className="text-[10px] text-[#52627A] dark:text-slate-400 font-medium">
                  Always on time
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
