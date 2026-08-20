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
import { toast } from "sonner";

import heroShowcaseImg from "@/assets/hero-showcase.png";
import vaseImg from "@/assets/p-vase.jpg";
import keychainImg from "@/assets/p-keychain.jpg";
import couplingImg from "@/assets/p-cnc.jpg";
import lampImg from "@/assets/p-lamp.jpg";
import standImg from "@/assets/p-stand.jpg";
import { productsQuery } from "@/lib/catalog";
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

const referenceProducts = [
  {
    id: "ref-1",
    name: "3D Printed Geometric Vase",
    slug: "geometric-spiral-vase",
    category: "3D PRINTING",
    category_slug: "3d-printing",
    image: vaseImg,
    imageKey: "vase",
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
    image: keychainImg,
    imageKey: "keychain",
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
    image: couplingImg,
    imageKey: "cnc",
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
    image: lampImg,
    imageKey: "lamp",
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
    image: standImg,
    imageKey: "stand",
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
    image: couplingImg,
    imageKey: "cnc",
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

  const handleNextProduct = () => {
    setCarouselIndex((prev) => (prev + 1) % referenceProducts.length);
  };

  const handlePrevProduct = () => {
    setCarouselIndex((prev) => (prev - 1 + referenceProducts.length) % referenceProducts.length);
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-background pb-20 space-y-8 sm:space-y-10">
      {/* 1. Enhanced Hero Section with Subtle Blue Glow Animation */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-5 sm:pt-7">
        <div
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            e.currentTarget.style.setProperty("--mouse-x", `${x * 20}px`);
            e.currentTarget.style.setProperty("--mouse-y", `${y * 20}px`);
          }}
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-[#EFF6FF] via-[#F4F8FE] to-[#E5F0FD] dark:from-[#0D1E42] dark:via-[#091530] dark:to-[#080F22] border border-[#D9E5F7] dark:border-blue-950/60 p-6 sm:p-10 lg:p-12 xl:py-14 shadow-[0_4px_30px_rgba(20,85,217,0.06)] group"
          style={{ "--mouse-x": "0px", "--mouse-y": "0px" } as React.CSSProperties}
        >
          {/* Subtle Blue Particle / Dot Grid Background */}
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#1455D9_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          {/* Animated Blue Floating Blobs / Glow Orbs */}
          <div
            className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-[#2563EB]/15 blur-3xl pointer-events-none animate-hero-float"
            style={{ transform: "translate3d(var(--mouse-x), var(--mouse-y), 0)" }}
          />
          <div
            className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-[#1455D9]/18 blur-2xl pointer-events-none animate-hero-glow"
            style={{
              transform: "translate3d(calc(var(--mouse-x) * 1.5), calc(var(--mouse-y) * 1.5), 0)",
            }}
          />
          <div
            className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-[#00AEEF]/12 blur-3xl pointer-events-none animate-hero-float-reverse"
            style={{
              transform: "translate3d(calc(var(--mouse-x) * -1), calc(var(--mouse-y) * -1), 0)",
            }}
          />

          {/* 14 Subtle Animated Blue Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { top: "15%", left: "10%", delay: "0s", size: "h-1.5 w-1.5" },
              { top: "25%", left: "38%", delay: "1.5s", size: "h-1 w-1" },
              { top: "70%", left: "18%", delay: "2.8s", size: "h-2 w-2" },
              { top: "45%", left: "48%", delay: "4s", size: "h-1 w-1" },
              { top: "80%", left: "40%", delay: "1.2s", size: "h-1.5 w-1.5" },
              { top: "20%", left: "85%", delay: "3.2s", size: "h-2 w-2" },
              { top: "60%", left: "90%", delay: "0.8s", size: "h-1.5 w-1.5" },
              { top: "85%", left: "75%", delay: "2.1s", size: "h-1 w-1" },
              { top: "35%", left: "70%", delay: "3.7s", size: "h-2 w-2" },
              { top: "10%", left: "55%", delay: "1.9s", size: "h-1.5 w-1.5" },
              { top: "50%", left: "25%", delay: "2.5s", size: "h-1 w-1" },
              { top: "75%", left: "5%", delay: "4.2s", size: "h-1.5 w-1.5" },
            ].map((p, idx) => (
              <span
                key={idx}
                className={`absolute rounded-full bg-[#1455D9]/50 shadow-[0_0_8px_#2563EB] ${p.size}`}
                style={{
                  top: p.top,
                  left: p.left,
                  animation: `heroParticleFloat 6s ease-in-out infinite`,
                  animationDelay: p.delay,
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Column: Heading, Subtitle, CTAs, Trust Badges (6.5 cols) */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start z-10">
              {/* Blue Pill Eyebrow */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#1455D9] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs">
                ACTE IDEA LAB STORE
              </div>

              {/* Main Headline */}
              <h1 className="mt-4 sm:mt-5 text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-black tracking-tight leading-[1.12] text-[#0B1736] dark:text-white">
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
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 shadow-[0_4px_16px_rgba(20,85,217,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(20,85,217,0.45)] active:scale-95 cursor-pointer"
                >
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#categories"
                  className="inline-flex items-center rounded-xl border border-[#D9E5F7] dark:border-slate-700 bg-white dark:bg-card hover:bg-blue-50/50 dark:hover:bg-slate-800 px-6 py-3.5 text-sm font-bold text-[#0B1736] dark:text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1455D9]/40 active:scale-95 cursor-pointer shadow-xs"
                >
                  Explore Categories
                </a>
              </div>

              {/* 4 Small Trust Indicators with Blue Outline Icons */}
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

            {/* Right Column: Hero Product Composition with Floating Animation (5.5 cols) */}
            <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center relative">
              {/* Product Glow Halo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gradient-to-tr from-[#1455D9]/20 to-[#2563EB]/30 blur-3xl animate-hero-glow" />
              </div>

              {/* Product Image with Subtle Float & Mouse Offset */}
              <div
                className="relative w-full max-w-[540px] lg:max-w-none animate-hero-product"
                style={{
                  transform:
                    "translate3d(calc(var(--mouse-x) * 0.4), calc(var(--mouse-y) * 0.4), 0)",
                }}
              >
                <img
                  src={heroShowcaseImg}
                  alt="ACTE IDEA LAB Innovation Showcase"
                  className="w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(20,85,217,0.14)] select-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Student Discount Ticket Banner (Exact Reference Layout) */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#040E29] via-[#071B4D] to-[#0A2E7A] text-white border border-[#D4AF37]/50 shadow-[0_8px_30px_rgba(7,27,77,0.35)] min-h-[220px] flex flex-col md:flex-row items-stretch">
          {/* Subtle gold center glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* LEFT RAIL: Vertical Rotated Brand Text */}
          <div className="hidden md:flex items-center justify-center w-14 lg:w-16 shrink-0 border-r border-[#D4AF37]/30 py-6 z-10 select-none bg-black/10">
            <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] lg:text-[11px] font-bold tracking-[0.28em] text-[#D4AF37] uppercase whitespace-nowrap">
              INNOVATE &bull; CREATE &bull; INSPIRE
            </span>
          </div>

          {/* CENTER CONTENT: Main Offer, Flourish, Heading, Description & 3-Part Box */}
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-7 lg:py-8 lg:px-10 z-10 space-y-3.5">
            {/* Top Filigree Flourish & Sharp Vector Label */}
            <div className="flex flex-col items-center select-none space-y-2">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 text-[#D4AF37]">
                {/* Left Ornamental Wing */}
                <svg
                  viewBox="0 0 120 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 sm:h-5 w-24 sm:w-32 text-[#D4AF37]"
                >
                  <path
                    d="M120 12 C100 12, 85 4, 60 4 C40 4, 25 18, 5 18 C2 18, 0 16, 2 13 C4 10, 8 10, 10 12 C12 14, 8 16, 5 15"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M120 12 C95 12, 80 20, 50 20 C25 20, 15 8, 20 4 C23 2, 28 4, 26 7 C24 10, 20 8, 21 6"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path d="M60 4 L62 9 L67 11 L62 13 L60 18 L58 13 L53 11 L58 9 Z" fill="#D4AF37" />
                </svg>

                {/* Center Gold Circular Star Emblem */}
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-[1.5px] border-[#D4AF37] bg-[#071B4D]/80 shadow-[0_0_12px_rgba(212,175,55,0.35)] shrink-0">
                  <svg viewBox="0 0 24 24" fill="#D4AF37" className="h-4 w-4 sm:h-4.5 sm:w-4.5">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                </div>

                {/* Right Ornamental Wing (Mirrored) */}
                <svg
                  viewBox="0 0 120 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 sm:h-5 w-24 sm:w-32 text-[#D4AF37] scale-x-[-1]"
                >
                  <path
                    d="M120 12 C100 12, 85 4, 60 4 C40 4, 25 18, 5 18 C2 18, 0 16, 2 13 C4 10, 8 10, 10 12 C12 14, 8 16, 5 15"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M120 12 C95 12, 80 20, 50 20 C25 20, 15 8, 20 4 C23 2, 28 4, 26 7 C24 10, 20 8, 21 6"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path d="M60 4 L62 9 L67 11 L62 13 L60 18 L58 13 L53 11 L58 9 Z" fill="#D4AF37" />
                </svg>
              </div>

              {/* Crisp Vector Text */}
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] sm:tracking-[0.3em] text-[#D4AF37] uppercase">
                SPECIAL OFFER &bull; ACTE IDEA LAB
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-none">
              15% OFF FOR STUDENTS
            </h2>

            {/* Decorative Gold Divider under heading */}
            <div className="flex items-center justify-center gap-2 my-1">
              <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
              <span className="h-1.5 w-1.5 rotate-45 border border-[#D4AF37] bg-[#D4AF37]" />
              <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
            </div>

            {/* Description */}
            <p className="text-xs sm:text-[13px] text-slate-200 font-medium max-w-xl text-center leading-relaxed">
              Unlock exclusive discount on all 3D printing &amp; innovation gear. Verify student ID
              at checkout.
            </p>

            {/* Bottom 3-Column Info Box */}
            <div className="w-full max-w-lg rounded-xl border border-[#D4AF37]/50 bg-black/25 backdrop-blur-xs grid grid-cols-3 divide-x divide-[#D4AF37]/40 py-2 mt-1">
              <div className="flex flex-col items-center justify-center px-2">
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">
                  DISCOUNT
                </span>
                <span className="text-xs sm:text-sm font-black text-white mt-0.5">15% OFF</span>
              </div>
              <div className="flex flex-col items-center justify-center px-2">
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">
                  ELIGIBILITY
                </span>
                <span className="text-xs sm:text-sm font-black text-white mt-0.5">STUDENTS</span>
              </div>
              <div className="flex flex-col items-center justify-center px-2">
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">
                  CODE
                </span>
                <span className="text-xs sm:text-sm font-black text-[#FACC15] tracking-wider mt-0.5">
                  STUDENT15
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Vertical Ticket Stub with Cutouts & Gold Button */}
          <div className="relative flex flex-col items-center justify-between border-t md:border-t-0 md:border-l-2 border-dashed border-[#D4AF37]/50 p-6 md:px-8 lg:px-10 shrink-0 bg-black/15 z-10">
            {/* Top and Bottom Notch Cutouts */}
            <div className="hidden md:block absolute -top-3.5 left-0 -translate-x-1/2 w-7 h-7 rounded-full bg-[#F8FAFC] dark:bg-background border border-[#D4AF37]/50 z-20" />
            <div className="hidden md:block absolute -bottom-3.5 left-0 -translate-x-1/2 w-7 h-7 rounded-full bg-[#F8FAFC] dark:bg-background border border-[#D4AF37]/50 z-20" />

            {/* Top Rotated Text */}
            <div className="hidden md:block select-none pb-2">
              <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase whitespace-nowrap">
                CLAIM 15% DISCOUNT
              </span>
            </div>

            {/* Glowing Gold STUDENT15 Button */}
            <button
              onClick={async () => {
                await safeCopyText("STUDENT15");
                toast.success("Coupon code STUDENT15 copied to clipboard!", {
                  description: "Apply at checkout for 15% instant discount.",
                });
              }}
              className="rounded-full bg-gradient-to-r from-[#F5B000] via-[#FACC15] to-[#EAB308] text-[#071B4D] px-7 py-3 text-xs sm:text-sm font-black tracking-wider shadow-[0_0_22px_rgba(245,176,0,0.5)] hover:shadow-[0_0_30px_rgba(245,176,0,0.7)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer uppercase shrink-0"
            >
              STUDENT15
            </button>

            {/* Bottom ID Code */}
            <div className="pt-3 text-center">
              <span className="text-[9px] font-mono text-[#D4AF37] font-bold tracking-wider uppercase">
                ID 8629384 &bull; ACTE
              </span>
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
            {referenceProducts.map((product) => {
              const safeSlug = (
                product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
              ).toLowerCase();
              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#DCE5F2] dark:border-border bg-white dark:bg-card p-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(20,85,217,0.12)]"
                >
                  {/* Product Image Area with Badge */}
                  <Link
                    to="/product/$slug"
                    params={{ slug: safeSlug }}
                    className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900/50 block cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Hover "View Details" Overlay Badge */}
                    <div className="absolute inset-0 bg-[#0B1736]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="rounded-full bg-white/95 dark:bg-card/95 backdrop-blur-xs px-2.5 py-1 text-[10px] font-black text-[#1455D9] shadow-md uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        View Details
                      </span>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 text-[9px] font-black tracking-wider uppercase shadow-xs ${product.badgeColor}`}
                    >
                      {product.badge}
                    </span>
                  </Link>

                  {/* Meta details */}
                  <div className="flex flex-1 flex-col pt-3 justify-between space-y-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#52627A] dark:text-slate-400 block">
                        {product.category}
                      </span>
                      <Link
                        to="/product/$slug"
                        params={{ slug: safeSlug }}
                        className="text-xs sm:text-sm font-bold text-[#0B1736] dark:text-white line-clamp-2 leading-[1.35] min-h-[2.6rem] sm:min-h-[2.75rem] group-hover:text-[#1455D9] transition-colors flex items-start"
                        title={product.name}
                      >
                        {product.name}
                      </Link>

                      {/* Rating with Orange Stars */}
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#52627A] dark:text-slate-400 pt-0.5">
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
                    </div>

                    {/* Price & Action Button Area */}
                    <div className="pt-2 border-t border-[#DCE5F2]/40 dark:border-border/40 mt-auto">
                      <div className="flex items-baseline gap-2 pb-2">
                        <span className="text-base font-black text-[#0B1736] dark:text-white">
                          {inr(product.price)}
                        </span>
                        <span className="text-xs text-[#52627A]/70 dark:text-slate-500 line-through">
                          {inr(product.originalPrice)}
                        </span>
                      </div>

                      {/* Direct Buy Now Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart({
                            productId: product.id,
                            slug: safeSlug,
                            name: product.name,
                            imageKey: product.imageKey,
                            price: product.price,
                          });
                          navigate({ to: "/checkout" });
                        }}
                        className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] text-white py-2 text-xs font-bold shadow-xs transition-transform active:scale-95 cursor-pointer"
                      >
                        <Zap className="h-3.5 w-3.5 fill-white text-white" />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
