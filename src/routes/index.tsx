import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Truck,
  Headphones,
  BadgeCheck,
  Box,
  Scissors,
  Cpu,
  CircuitBoard,
  Plane,
  Layers,
  Bot,
  Tag,
} from "lucide-react";
import { toast } from "sonner";

import heroImg from "@/assets/hero.jpg";
import { productsQuery, statsQuery } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductGridSkeleton } from "@/components/site/States";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AICTE IDEA Lab Store – 3D Printing, Laser Cut & Electronics" },
      {
        name: "description",
        content:
          "Shop high-quality 3D printed, laser cut and CNC machined products plus electronics and DIY kits from the AICTE IDEA Lab college innovation store.",
      },
      { property: "og:title", content: "AICTE IDEA Lab Store – Innovate. Create. Inspire." },
      {
        property: "og:description",
        content:
          "3D printed, laser cut, CNC machined products and electronics for innovators, makers and creators.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const categories = [
  { name: "3D Printing", icon: Box, tint: "oklch(0.94 0.04 180)", slug: "3d-printing" },
  { name: "Laser Cutting", icon: Scissors, tint: "oklch(0.94 0.04 40)", slug: "laser-cutting" },
  { name: "CNC Machining", icon: Cpu, tint: "oklch(0.93 0.04 300)", slug: "cnc-machining" },
  { name: "Electronics", icon: CircuitBoard, tint: "oklch(0.95 0.06 90)", slug: "electronics" },
  { name: "Drones & Parts", icon: Plane, tint: "oklch(0.94 0.04 240)", slug: "drones-parts" },
  {
    name: "Acrylic Products",
    icon: Layers,
    tint: "oklch(0.94 0.04 340)",
    slug: "acrylic-products",
  },
  { name: "DIY Kits", icon: Bot, tint: "oklch(0.94 0.04 150)", slug: "diy-kits" },
];

const perks = [
  { icon: BadgeCheck, title: "Quality Assurance", desc: "All products are quality checked" },
  { icon: Truck, title: "Fast & Reliable Shipping", desc: "On-time delivery across India" },
  { icon: CreditCard, title: "Secure Payments", desc: "100% secure payment gateway" },
  { icon: Headphones, title: "Customer Support", desc: "We're here to help you" },
];

function Index() {
  const {
    data: allProducts = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery(productsQuery);
  const { data: liveStats } = useQuery(statsQuery);

  const defaultStats = [
    { label: "Projects Developed", value: "450+" },
    { label: "Students Supported", value: "3,200+" },
    { label: "Products Created", value: "1,100+" },
    { label: "Innovation Workshops", value: "85+" },
  ];

  const stats = liveStats && liveStats.length > 0 ? liveStats : defaultStats;
  const featuredProducts = allProducts.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="mx-auto max-w-[1400px] px-6 pt-6">
        <div
          className="grid items-center gap-8 overflow-hidden rounded-2xl px-6 py-12 md:grid-cols-2 md:px-12 md:py-16"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="text-white">
            <p className="text-sm font-semibold text-[#86EFAC] uppercase tracking-wider">
              AICTE IDEA LAB STORE
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl leading-tight text-white">
              Where Ideas <span className="text-white font-bold">Become</span> Reality
            </h1>
            <p className="mt-4 max-w-md text-sm md:text-base leading-relaxed opacity-85 text-emerald-50">
              High-quality 3D printed, laser cut, CNC machined products and electronics for
              innovators, makers, and creators.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#0A3728] transition-all hover:bg-white/95 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
              >
                Shop Catalog <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#categories"
                className="inline-flex items-center rounded-lg border-[1.5px] border-white px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:-translate-y-0.5 cursor-pointer"
              >
                Explore Categories
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs opacity-90 text-white">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#86EFAC]" /> Premium Quality
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-[#86EFAC]" /> Secure Payments
              </li>
              <li className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#86EFAC]" /> Fast Delivery
              </li>
            </ul>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="AICTE IDEA Lab innovation workspace products"
              width={1200}
              height={800}
              className="h-[300px] md:h-[400px] w-full rounded-xl object-cover shadow-2xl"
            />
            <div className="absolute -bottom-4 -left-4 bg-card border border-border p-4 rounded-xl shadow-lg hidden lg:block max-w-[200px]">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                Lab Tagline
              </p>
              <p className="text-sm font-extrabold text-foreground mt-1">
                Innovate. Create. Inspire. — AICTE IDEA Lab
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vintage Student Discount Ticket Banner */}
      <section className="mx-auto max-w-[1400px] px-6 pt-6">
        <div className="relative">
          {/* Main Ticket Outer Container */}
          <div className="relative overflow-hidden rounded-2xl bg-[#121212] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-[#C5A880]/25">
            {/* Jagged Left Perforations (White/Background Circle Overlays) */}
            <div className="absolute left-0 top-0 bottom-0 w-3 flex flex-col justify-between py-3 -ml-1.5 z-10 overflow-hidden select-none pointer-events-none">
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-white dark:bg-background rounded-full shrink-0"
                />
              ))}
            </div>

            {/* Jagged Right Perforations (White/Background Circle Overlays) */}
            <div className="absolute right-0 top-0 bottom-0 w-3 flex flex-col justify-between py-3 -mr-1.5 z-10 overflow-hidden select-none pointer-events-none">
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-white dark:bg-background rounded-full shrink-0"
                />
              ))}
            </div>

            {/* Left Side: Main Ticket Body */}
            <div className="flex-1 flex flex-col md:flex-row items-center gap-6 z-10 pl-2 w-full">
              {/* Left Vertical text (Desktop only) */}
              <div className="hidden md:block border-r border-[#C5A880]/20 pr-4 shrink-0">
                <span
                  className="font-serif text-[10px] text-[#C5A880] tracking-[0.25em] uppercase select-none opacity-45 block"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  INNOVATE • CREATE • INSPIRE
                </span>
              </div>

              {/* Ticket content */}
              <div className="flex-1 flex flex-col items-center justify-center w-full text-center">
                {/* Top Emblem / Crest & Filigree */}
                <div className="flex flex-col items-center justify-center w-full mb-1">
                  <svg
                    className="w-48 h-12 text-[#C5A880]"
                    viewBox="0 0 200 50"
                    fill="none"
                    stroke="currentColor"
                  >
                    {/* Center Circle Seal */}
                    <circle cx="100" cy="25" r="11" strokeWidth="1" strokeDasharray="3 1.5" />
                    <circle cx="100" cy="25" r="8" strokeWidth="0.75" />
                    {/* Star inside seal */}
                    <path
                      d="M100 20 L102 24 L106 24 L103 26 L104 30 L100 28 L96 30 L97 26 L94 24 L98 24 Z"
                      fill="#C5A880"
                      strokeWidth="0"
                    />
                    {/* Filigree scrolls on left */}
                    <path
                      d="M85 25 C75 15, 65 35, 50 25 C40 17, 50 10, 60 20 C65 25, 60 30, 55 27"
                      strokeWidth="0.75"
                    />
                    <path d="M45 23 C35 20, 30 30, 20 25" strokeWidth="0.5" />
                    {/* Filigree scrolls on right */}
                    <path
                      d="M115 25 C125 15, 135 35, 150 25 C160 17, 150 10, 140 20 C135 25, 140 30, 145 27"
                      strokeWidth="0.75"
                    />
                    <path d="M155 23 C165 20, 170 30, 180 25" strokeWidth="0.5" />
                  </svg>

                  {/* Emblem text */}
                  <div className="text-[9px] font-bold tracking-[0.2em] text-[#C5A880] uppercase -mt-2.5">
                    SPECIAL OFFER • AICTE IDEA LAB
                  </div>
                  <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent mt-1" />
                </div>

                {/* Large Vintage serif title */}
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#F5F2EB] tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-2">
                  15% OFF FOR STUDENTS
                </h2>

                {/* Vintage Divider flourish */}
                <div className="relative flex items-center justify-center w-full mt-2 mb-3">
                  <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/20 to-transparent" />
                  <div className="absolute w-1.5 h-1.5 rotate-45 border border-[#C5A880]/50 bg-[#121212]" />
                </div>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-[#F5F2EB]/80 font-medium max-w-xl leading-relaxed mb-5">
                  Unlock exclusive discount on all 3D printing &amp; innovation gear. Verify student
                  ID at checkout.
                </p>

                {/* Bottom Details Strip */}
                <div className="grid grid-cols-3 border border-[#C5A880]/25 rounded-md overflow-hidden bg-black/35 text-[9px] sm:text-xs text-[#C5A880] tracking-widest font-mono text-center max-w-lg mx-auto w-full shadow-inner">
                  <div className="py-2 border-r border-[#C5A880]/25 px-1.5">
                    <span className="block text-[8px] text-[#C5A880]/50 mb-0.5">DISCOUNT</span>
                    <span className="font-bold text-[#F5F2EB]">15% OFF</span>
                  </div>
                  <div className="py-2 border-r border-[#C5A880]/25 px-1.5">
                    <span className="block text-[8px] text-[#C5A880]/50 mb-0.5">ELIGIBILITY</span>
                    <span className="font-bold text-[#F5F2EB]">STUDENTS</span>
                  </div>
                  <div className="py-2 px-1.5">
                    <span className="block text-[8px] text-[#C5A880]/50 mb-0.5">CODE</span>
                    <span className="font-bold text-[#F5F2EB] select-all">STUDENT15</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Perforation Line Divider (Horizontal on mobile, Vertical on desktop) */}
            <div className="hidden md:flex h-36 items-center relative shrink-0 mx-2 select-none pointer-events-none">
              {/* Semi-circular notch cutouts */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-background border-b border-[#C5A880]/25 z-20" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-background border-t border-[#C5A880]/25 z-20" />
              {/* Vertical dashed line */}
              <div className="h-full border-l-2 border-dashed border-[#C5A880]/30" />
            </div>

            <div className="md:hidden w-full flex items-center relative my-1 select-none pointer-events-none">
              {/* Semi-circular notch cutouts */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-background border-r border-[#C5A880]/25 z-20" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-background border-l border-[#C5A880]/25 z-20" />
              {/* Horizontal dashed line */}
              <div className="w-full border-t-2 border-dashed border-[#C5A880]/30" />
            </div>

            {/* Right Side: Ticket Stub */}
            <div className="flex flex-col items-center justify-center text-center shrink-0 z-10 pr-2 md:pl-2 min-w-[180px] w-full md:w-auto">
              {/* Vertical text stub header */}
              <div className="flex md:flex-row items-center gap-3">
                <span
                  className="hidden md:block font-serif text-[9px] text-[#C5A880] tracking-[0.25em] uppercase select-none opacity-50"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  ADMIT ONE / CLAIM DISCOUNT
                </span>
                <span className="md:hidden font-serif text-[9px] text-[#C5A880] tracking-[0.2em] uppercase select-none opacity-50 mb-2">
                  ADMIT ONE / CLAIM DISCOUNT
                </span>
              </div>

              {/* Gold Coupon Code Badge Button */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText("STUDENT15");
                  toast.success("Coupon STUDENT15 copied to clipboard!", {
                    description: "Use it at checkout to claim your 15% discount.",
                  });
                }}
                className="mt-2 w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A880] text-black text-xs font-black tracking-widest px-6 py-3 rounded-lg hover:brightness-105 active:scale-95 transition-all shadow-md cursor-pointer uppercase border border-black/10 font-mono"
              >
                STUDENT15
              </button>

              {/* Serial Number decoration */}
              <span className="mt-3.5 text-[9px] font-bold text-[#C5A880]/40 tracking-[0.15em] uppercase font-mono">
                № 8629384
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-[1400px] px-6 pt-8 scroll-mt-24">
        <div className="grid grid-cols-2 divide-y divide-x divide-border rounded-2xl border border-border bg-card py-4 shadow-[var(--shadow-card)] sm:grid-cols-4 lg:grid-cols-7 lg:divide-y-0">
          {categories.map(({ name, icon: Icon, tint, slug }) => (
            <Link
              key={name}
              to="/category/$slug"
              params={{ slug }}
              className="group flex flex-col items-center gap-3 px-4 py-4 text-center transition-all hover:bg-muted/10"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                style={{ backgroundColor: tint }}
              >
                <Icon className="h-6 w-6 text-foreground/75" />
              </span>
              <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                {name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="mx-auto max-w-[1400px] px-6 pt-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] divide-y divide-border md:divide-y-0 md:divide-x divide-border">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center text-center p-4 md:p-0"
            >
              <span className="text-3xl font-extrabold tracking-tight text-primary">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground font-medium mt-1 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Perks */}
      <section className="mx-auto max-w-[1400px] px-6 pt-8">
        <div className="grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
          {perks.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 lg:px-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Explore our top-selling innovative lab designs
            </p>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {productsLoading ? (
          <div className="mt-8">
            <ProductGridSkeleton count={6} />
          </div>
        ) : productsError ? (
          <div className="mt-8 text-center text-destructive">
            Failed to load products. Please check your network or try again.
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="mt-8 text-center py-12 border border-dashed border-border rounded-2xl bg-muted/10 text-muted-foreground text-sm">
            No featured products available at the moment. Explore our full shop instead!
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
