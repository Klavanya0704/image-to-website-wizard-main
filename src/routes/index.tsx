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
          <div className="text-hero-foreground">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              AICTE IDEA Lab Store
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl leading-tight">
              Where Ideas <span className="text-primary font-bold">Become</span> Reality
            </h1>
            <p className="mt-4 max-w-md text-sm md:text-base leading-relaxed opacity-80">
              High-quality 3D printed, laser cut, CNC machined products and electronics for
              innovators, makers, and creators.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:-translate-y-0.5"
              >
                Shop Catalog <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#categories"
                className="inline-flex items-center rounded-lg border border-hero-foreground/30 px-6 py-3 text-sm font-semibold text-hero-foreground transition-colors hover:bg-hero-foreground/10"
              >
                Explore Categories
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs opacity-80">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Premium Quality
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" /> Secure Payments
              </li>
              <li className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" /> Fast Delivery
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

      {/* Student Discount Ticket Banner */}
      <section className="mx-auto max-w-[1400px] px-6 pt-6">
        <div className="relative">
          {/* Main Ticket Outer Container */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#052217] via-[#0A3728] to-[#0D4433] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_32px_0_rgba(10,55,40,0.2)] border border-primary/20 backdrop-blur-sm">
            {/* Ticket Notches */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-background rounded-full -ml-2.5 z-10 border-r border-primary/20" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-background rounded-full -mr-2.5 z-10 border-l border-primary/20" />

            {/* Left Side: Main Ticket Body */}
            <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-6 z-10 pl-2">
              <div className="bg-primary/10 border border-primary/30 p-3 rounded-xl flex items-center justify-center shrink-0">
                <Tag className="h-7 w-7 text-primary animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                  15% OFF FOR STUDENTS
                  <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full animate-bounce">
                    New Offer
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100/80 font-medium max-w-2xl leading-relaxed">
                  Unlock exclusive discount on all 3D printing &amp; innovation gear. Verify student
                  ID at checkout.
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("STUDENT15");
                      toast.success("Coupon STUDENT15 copied to clipboard!", {
                        description: "Use it at checkout to claim your 15% discount.",
                      });
                    }}
                    className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Claim 15% Off
                  </button>
                </div>
              </div>
            </div>

            {/* Perforation Line Divider (only md and up) */}
            <div className="hidden md:block h-20 border-l-2 border-dashed border-white/25 mx-4 z-10" />
            <div className="md:hidden w-full border-t-2 border-dashed border-white/20 my-2 z-10" />

            {/* Right Side: Ticket Stub */}
            <div className="flex flex-col items-center justify-center text-center shrink-0 z-10 pr-2 min-w-[200px]">
              <div
                onClick={() => {
                  navigator.clipboard.writeText("STUDENT15");
                  toast.success("Coupon STUDENT15 copied to clipboard!");
                }}
                className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-center select-all cursor-pointer group hover:bg-white/10 transition-colors w-full"
              >
                <span className="block text-[10px] text-emerald-200/60 font-black uppercase tracking-wider mb-0.5">
                  Coupon Code
                </span>
                <code className="text-sm font-black tracking-widest text-emerald-300 font-mono group-hover:text-white">
                  STUDENT15
                </code>
              </div>

              {/* Barcode Graphic or Badge */}
              <div className="mt-3.5 flex flex-col items-center gap-1 opacity-70">
                <div className="flex gap-0.5 h-6 items-center">
                  <div className="w-1.5 h-full bg-white rounded-sm" />
                  <div className="w-0.5 h-full bg-white rounded-sm" />
                  <div className="w-1 h-full bg-white rounded-sm" />
                  <div className="w-0.5 h-full bg-white rounded-sm" />
                  <div className="w-1.5 h-full bg-white rounded-sm" />
                  <div className="w-0.5 h-full bg-white rounded-sm" />
                  <div className="w-1 h-full bg-white rounded-sm" />
                  <div className="w-2 h-full bg-white rounded-sm" />
                </div>
                <span className="text-[9px] font-bold text-emerald-100/50 uppercase tracking-widest">
                  SPECIAL OFFER
                </span>
              </div>
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
