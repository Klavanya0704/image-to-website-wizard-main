import React, { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  Wrench,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import heroStoreBg from "@/assets/hero-store-bg.jpg";
import heroMakerspaceBg from "@/assets/hero-makerspace-bg.jpg";

interface SlideData {
  id: "store" | "makerspace";
  badge: string;
  badgeColor: string;
  badgeIcon: React.ComponentType<any>;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  features: { icon: React.ComponentType<any>; label: string }[];
  bgImage: string;
  gradientOverlay: string;
}

const SLIDES: SlideData[] = [
  {
    id: "store",
    badge: "ACTE IDEA LAB STORE",
    badgeColor: "bg-[#1455D9] text-white border-blue-400/30",
    badgeIcon: Sparkles,
    titleLine1: "Where Ideas",
    titleLine2: "Become Reality",
    description: "Discover quality products for innovators, makers and creators.",
    primaryCtaText: "Shop Catalog",
    primaryCtaLink: "/shop",
    secondaryCtaText: "Explore Categories",
    secondaryCtaLink: "/category/3d-printing",
    features: [
      { icon: ShieldCheck, label: "Premium Quality" },
      { icon: Truck, label: "Fast Delivery" },
      { icon: Headphones, label: "Lab Support" },
    ],
    bgImage: heroStoreBg,
    // Subtle left-to-right gradient to keep typography crisp without washing out the 3D product showcase on right
    gradientOverlay:
      "bg-gradient-to-r from-[#040e28]/90 via-[#071842]/45 to-transparent",
  },
  {
    id: "makerspace",
    badge: "ACTE IDEA LAB MAKERSPACE",
    badgeColor: "bg-indigo-600 text-white border-indigo-400/30",
    badgeIcon: Cpu,
    titleLine1: "Build. Innovate.",
    titleLine2: "Create.",
    description:
      "Design, prototype and build the future with advanced tools and a collaborative makerspace.",
    primaryCtaText: "Explore Makerspace",
    primaryCtaLink: "/makerspace",
    secondaryCtaText: "Join Community",
    secondaryCtaLink: "/makerspace",
    features: [
      { icon: Wrench, label: "Advanced Tools" },
      { icon: GraduationCap, label: "Expert Guidance" },
      { icon: Sparkles, label: "Modern Workspace" },
    ],
    bgImage: heroMakerspaceBg,
    // Subtle left-to-right dark tech gradient keeping workshop machinery crisp on right
    gradientOverlay:
      "bg-gradient-to-r from-[#03091e]/90 via-[#051133]/45 to-transparent",
  },
];

export function HeroCarousel() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide = SLIDES[currentSlideIndex];

  // Auto-play timer: 6 seconds per slide, pauses on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, currentSlideIndex]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    // Very subtle parallax: max 6px
    setMouseOffset({ x: +(x * 12).toFixed(2), y: +(y * 8).toFixed(2) });
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
      <div
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden rounded-[24px] h-[430px] sm:h-[400px] lg:h-[400px] shadow-[0_8px_30px_rgba(7,19,48,0.12)] border border-slate-200/50 dark:border-blue-950/60 isolate flex items-center bg-[#071330]"
      >
        {/* Full-width Edge-to-Edge Animated Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {/* High-Resolution Wide 16:9 Background image covering entire container */}
            <div
              style={{
                backgroundImage: `url(${currentSlide.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center right",
                transform: `scale(1.03) translate3d(${mouseOffset.x * -0.4}px, ${mouseOffset.y * -0.4}px, 0)`,
                transition: "transform 180ms ease-out",
              }}
              className="absolute inset-0 w-full h-full bg-no-repeat"
            />

            {/* Subtle Directional Gradient Overlay */}
            <div className={`absolute inset-0 ${currentSlide.gradientOverlay}`} />
          </motion.div>
        </AnimatePresence>

        {/* Clean Left-Aligned Content Layer */}
        <div className="relative z-20 w-full px-6 sm:px-10 lg:px-12 py-6 sm:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl lg:max-w-lg xl:max-w-xl flex flex-col items-start text-left"
            >
              {/* Compact Badge */}
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm border backdrop-blur-md ${currentSlide.badgeColor}`}
              >
                <currentSlide.badgeIcon className="h-3 w-3 text-amber-300" />
                <span>{currentSlide.badge}</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-[1.06] text-white drop-shadow-sm"
              >
                {currentSlide.titleLine1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-cyan-300">
                  {currentSlide.titleLine2}
                </span>
              </motion.h1>

              {/* Short, Concise Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-2.5 text-xs sm:text-sm lg:text-[15px] text-slate-200/95 leading-snug font-medium max-w-lg drop-shadow-xs"
              >
                {currentSlide.description}
              </motion.p>

              {/* Compact CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.28 }}
                className="mt-5 flex flex-wrap items-center gap-3 w-full sm:w-auto"
              >
                {/* Primary CTA with sliding arrow */}
                <Link
                  to={currentSlide.primaryCtaLink}
                  className="group/cta inline-flex items-center justify-center gap-2 rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] text-white px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold shadow-[0_4px_16px_rgba(20,85,217,0.35)] hover:shadow-[0_6px_22px_rgba(20,85,217,0.5)] transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer border border-blue-400/30"
                >
                  <span>{currentSlide.primaryCtaText}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-1" />
                </Link>

                {/* Secondary CTA */}
                <Link
                  to={currentSlide.secondaryCtaLink}
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-all duration-200 hover:scale-[1.02] hover:border-white/40 active:scale-95 cursor-pointer shadow-2xs"
                >
                  <span>{currentSlide.secondaryCtaText}</span>
                </Link>
              </motion.div>

              {/* Exactly 3 Small Highlight Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-bold text-white/90"
              >
                {currentSlide.features.map((feat) => {
                  return (
                    <motion.div
                      key={feat.label}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1.5 rounded-lg bg-black/25 backdrop-blur-md border border-white/15 px-2.5 py-1 shadow-2xs cursor-default hover:border-blue-400/40 hover:bg-black/35 transition-colors"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                      <span>{feat.label}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Small & Elegant Glassmorphic Navigation Arrows (40px × 40px) */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/25 hover:bg-black/45 text-white backdrop-blur-md border border-white/25 shadow-md hover:scale-108 active:scale-95 transition-all cursor-pointer group"
        >
          <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/25 hover:bg-black/45 text-white backdrop-blur-md border border-white/25 shadow-md hover:scale-108 active:scale-95 transition-all cursor-pointer group"
        >
          <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Subtle Bottom Indicators */}
        <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2 pointer-events-auto">
          {SLIDES.map((slide, idx) => {
            const isActive = currentSlideIndex === idx;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.badge}`}
                className="relative h-2 rounded-full transition-all duration-300 cursor-pointer overflow-hidden group"
                style={{
                  width: isActive ? "32px" : "10px",
                }}
              >
                <div
                  className={`w-full h-full rounded-full transition-colors duration-300 ${
                    isActive
                      ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
