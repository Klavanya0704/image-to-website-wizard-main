import { useState } from "react";
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
  Zap,
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
import { motion } from "framer-motion";
import { toast } from "sonner";

import heroShowcaseImg from "@/assets/hero-showcase.png";
import { productsQuery } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { useStore } from "@/lib/store";
import { inr, safeCopyText } from "@/lib/format";

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

function Index() {
  const { data: allProducts = [] } = useQuery(productsQuery);
  const featuredProducts = allProducts.slice(0, 8);
  const popular3d = allProducts.filter((p) => p.categorySlug === "3d-printing").slice(0, 4);
  const popularLaser = allProducts.filter((p) => p.categorySlug === "laser-cutting").slice(0, 4);

  return (
    <div className="bg-[#F8FAFC] dark:bg-background pb-20 space-y-10 sm:space-y-14">
      {/* 1. Enhanced Hero Section with Smooth Framer Motion & Glow */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-[#EFF6FF] via-[#F4F8FE] to-[#E5F0FD] dark:from-[#0D1E42] dark:via-[#091530] dark:to-[#080F22] border border-[#D9E5F7] dark:border-blue-950/60 p-6 sm:p-10 lg:p-12 xl:py-14 shadow-[0_4px_30px_rgba(20,85,217,0.06)]"
        >
          {/* Subtle Blue Particle / Dot Grid Background */}
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#1455D9_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          {/* Animated Blue Floating Blobs */}
          <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-[#2563EB]/15 blur-3xl pointer-events-none animate-hero-float" />
          <div className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-[#1455D9]/18 blur-2xl pointer-events-none animate-hero-glow" />
          <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-[#00AEEF]/12 blur-3xl pointer-events-none animate-hero-float-reverse" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Column */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#1455D9] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs"
              >
                <Sparkles className="h-3 w-3 text-amber-300" /> ACTE IDEA LAB STORE
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mt-4 sm:mt-5 text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-black tracking-tight leading-[1.12] text-[#0B1736] dark:text-white"
              >
                Where Ideas <br />
                <span className="text-[#1455D9] dark:text-[#3B82F6]">Become Reality</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-[#52627A] dark:text-slate-300 font-medium"
              >
                High-quality 3D printed, laser cut, CNC machined products and electronics for
                innovators, makers, and creators.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
              >
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 shadow-[0_4px_16px_rgba(20,85,217,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(20,85,217,0.45)] active:scale-95 cursor-pointer"
                >
                  Shop Catalog <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#categories"
                  className="inline-flex items-center rounded-xl border border-[#D9E5F7] dark:border-slate-700 bg-white dark:bg-card hover:bg-blue-50/50 dark:hover:bg-slate-800 px-6 py-3.5 text-sm font-bold text-[#0B1736] dark:text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1455D9]/40 active:scale-95 cursor-pointer shadow-xs"
                >
                  Explore Categories
                </a>
              </motion.div>

              {/* Trust Indicators */}
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
                  <span>Lab Support</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Showcase Image */}
            <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center relative">
              <div className="relative w-full max-w-[540px] lg:max-w-none animate-hero-product">
                <img
                  src={heroShowcaseImg}
                  alt="ACTE IDEA LAB Innovation Showcase"
                  className="w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(20,85,217,0.14)] select-none"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Student Discount Coupon Banner */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#040E29] via-[#071B4D] to-[#0A2E7A] text-white border border-[#D4AF37]/50 shadow-[0_8px_30px_rgba(7,27,77,0.35)] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
              <Award className="h-4 w-4" /> AICTE Student Special
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Get 15% Instant Student Discount on All Lab Prototypes
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Apply code <span className="text-[#FACC15] font-black">STUDENT15</span> during checkout with college ID.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={async () => {
              await safeCopyText("STUDENT15");
              toast.success("Coupon code STUDENT15 copied!");
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#F5B000] hover:bg-[#EAB308] text-[#071B4D] px-6 py-3 text-xs font-black tracking-wider shadow-md cursor-pointer shrink-0"
          >
            <span>COPY CODE: STUDENT15</span>
          </motion.button>
        </motion.div>
      </section>

      {/* 3. Category Grid Section with Interactive Hover Cards */}
      <section id="categories" className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1455D9]">
              Fabrication Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1736] dark:text-white tracking-tight">
              Explore Our Makerspace Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-[#1455D9] hover:underline flex items-center gap-1"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5 sm:gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                to="/category/$slug"
                params={{ slug: cat.slug }}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-card shadow-xs hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 text-center cursor-pointer h-full"
                >
                  <div
                    className={`flex h-13 w-13 items-center justify-center rounded-2xl ${cat.bg} ${cat.iconColor} mb-3 group-hover:scale-110 transition-transform duration-300 shadow-inner`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#0B1736] dark:text-white group-hover:text-[#1455D9] transition-colors leading-tight">
                    {cat.name}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Products Section (Live Catalog) */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1455D9]">
              <Sparkles className="h-4 w-4" /> Fresh From The Lab
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1736] dark:text-white tracking-tight">
              Featured Lab Innovations
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-[#1455D9] hover:underline flex items-center gap-1"
          >
            Shop All ({allProducts.length}) <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </section>

      {/* 5. 3D Printing & Laser Cutting Highlights */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Authentic 3D Printing Section */}
        <div>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Additive Manufacturing
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B1736] dark:text-white">
                3D Printed Designs &amp; Prototypes
              </h3>
            </div>
            <Link
              to="/category/$slug"
              params={{ slug: "3d-printing" }}
              className="text-xs sm:text-sm font-bold text-[#1455D9] hover:underline flex items-center gap-1"
            >
              Explore 3D Printing ({allProducts.filter((p) => p.categorySlug === "3d-printing").length}) <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {popular3d.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>

        {/* Authentic Laser Cutting Section */}
        <div>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-red-600">
                CO2 Precision Cutting
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B1736] dark:text-white">
                Laser Cut &amp; Engraved Creations
              </h3>
            </div>
            <Link
              to="/category/$slug"
              params={{ slug: "laser-cutting" }}
              className="text-xs sm:text-sm font-bold text-[#1455D9] hover:underline flex items-center gap-1"
            >
              Explore Laser Cutting ({allProducts.filter((p) => p.categorySlug === "laser-cutting").length}) <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {popularLaser.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Statistics Strip */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white dark:bg-card border border-[#DCE5F2] dark:border-border p-6 sm:p-8 shadow-xs"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#DCE5F2] dark:divide-border">
            <div className="flex flex-col items-center justify-center text-center pt-2 sm:pt-0">
              <span className="text-3xl sm:text-4xl font-black text-[#1455D9] tracking-tight">
                500+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#52627A] dark:text-slate-400 mt-1">
                Prototypes Fabricated
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center pt-4 sm:pt-0 sm:pl-6">
              <span className="text-3xl sm:text-4xl font-black text-[#1455D9] tracking-tight">
                3,500+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#52627A] dark:text-slate-400 mt-1">
                Student Innovators
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center pt-4 sm:pt-0 sm:pl-6">
              <span className="text-3xl sm:text-4xl font-black text-[#1455D9] tracking-tight">
                114
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#52627A] dark:text-slate-400 mt-1">
                Verified Products
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center pt-4 sm:pt-0 sm:pl-6">
              <span className="text-3xl sm:text-4xl font-black text-[#1455D9] tracking-tight">
                100%
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#52627A] dark:text-slate-400 mt-1">
                AICTE IDEA Lab Certified
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 7. Bottom CTA Card */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white dark:bg-card border border-[#DCE5F2] dark:border-border p-6 sm:p-10 lg:p-12 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-3 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1736] dark:text-white tracking-tight">
                Have a Custom Idea? <span className="text-[#1455D9]">We Make It Real.</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#52627A] dark:text-slate-400 font-medium max-w-lg leading-relaxed">
                Upload your CAD model or sketch. Our engineers and makerspace machinery will fabricate it to exact tolerances.
              </p>
              <div className="pt-2">
                <Link
                  to="/makerspace"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] text-white px-6 py-3 text-xs font-bold shadow-sm transition-all"
                >
                  Launch Makerspace Studio <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="flex flex-col items-center space-y-1.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBF2FE] text-[#1455D9]">
                  <Compass className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-[#0B1736] dark:text-white">
                  Custom CAD
                </span>
                <span className="text-[10px] text-[#52627A] dark:text-slate-400 font-medium">
                  3D &amp; Vector
                </span>
              </div>

              <div className="flex flex-col items-center space-y-1.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBF2FE] text-[#1455D9]">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-[#0B1736] dark:text-white">
                  Lab Engineers
                </span>
                <span className="text-[10px] text-[#52627A] dark:text-slate-400 font-medium">
                  Expert guidance
                </span>
              </div>

              <div className="flex flex-col items-center space-y-1.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBF2FE] text-[#1455D9]">
                  <Award className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-[#0B1736] dark:text-white">
                  Lab Verified
                </span>
                <span className="text-[10px] text-[#52627A] dark:text-slate-400 font-medium">
                  Quality check
                </span>
              </div>

              <div className="flex flex-col items-center space-y-1.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBF2FE] text-[#1455D9]">
                  <Truck className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-[#0B1736] dark:text-white">
                  Fast Dispatch
                </span>
                <span className="text-[10px] text-[#52627A] dark:text-slate-400 font-medium">
                  Direct shipping
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
