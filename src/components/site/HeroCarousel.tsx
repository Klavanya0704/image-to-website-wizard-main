import React, { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Truck,
  Headphones,
  Wrench,
  GraduationCap,
  Sparkles,
  Users,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import heroStoreBg from "@/assets/hero-store-bg.png";
import heroMakerspaceBg from "@/assets/hero-makerspace-bg.jpg";

interface SlideData {
  id: "store" | "makerspace";
  badge: string;
  badgeColor: string;
  badgeIcon: React.ComponentType<any>;
  titleLine1: string;
  titleLine2: string;
  titleHighlight: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  features: { icon: React.ComponentType<any>; label: string }[];
  bgImage: string;
  gradientOverlay: string;
  accentGlow: string;
}

const SLIDES: SlideData[] = [
  {
    id: "store",
    badge: "ACTE IDEA LAB STORE",
    badgeColor: "bg-[#1455D9] text-white border-blue-400/30",
    badgeIcon: Sparkles,
    titleLine1: "Where Ideas",
    titleLine2: "Become Reality",
    titleHighlight: "Become Reality",
    description:
      "Discover high-quality 3D printed, laser cut, CNC machined, electronic and maker products for innovators and creators.",
    primaryCtaText: "Shop Catalog",
    primaryCtaLink: "/shop",
    secondaryCtaText: "Explore Categories",
    secondaryCtaLink: "/category/3d-printing",
    features: [
      { icon: ShieldCheck, label: "Premium Quality" },
      { icon: CreditCard, label: "Secure Payments" },
      { icon: Truck, label: "Fast Delivery" },
      { icon: Headphones, label: "Lab Support" },
    ],
    bgImage: heroStoreBg,
    // Store overlay: dark navy/blue vignette on left & bottom to make white text pop while keeping 3D phone visible
    gradientOverlay:
      "bg-gradient-to-r from-[#071330]/92 via-[#0b1f4d]/75 to-[#0b1f4d]/20 lg:from-[#06122d]/95 lg:via-[#091b45]/70 lg:to-transparent",
    accentGlow: "from-blue-600/20 to-indigo-600/10",
  },
  {
    id: "makerspace",
    badge: "ACTE IDEA LAB MAKERSPACE",
    badgeColor: "bg-indigo-600 text-white border-indigo-400/30",
    badgeIcon: Cpu,
    titleLine1: "Build. Innovate.",
    titleLine2: "Create.",
    titleHighlight: "Create.",
    description:
      "A collaborative space where students, innovators and creators design, prototype and build the future.",
    primaryCtaText: "Explore Makerspace",
    primaryCtaLink: "/makerspace",
    secondaryCtaText: "Join the Community",
    secondaryCtaLink: "/makerspace",
    features: [
      { icon: Wrench, label: "Advanced Tools" },
      { icon: GraduationCap, label: "Expert Guidance" },
      { icon: Sparkles, label: "Modern Workspace" },
      { icon: Users, label: "Collaborative Community" },
    ],
    bgImage: heroMakerspaceBg,
    // Makerspace overlay: rich futuristic navy/violet vignette keeping workbench equipment crisp on right
    gradientOverlay:
      "bg-gradient-to-r from-[#03091e]/95 via-[#061236]/80 to-[#07143f]/30 lg:from-[#03091e]/95 lg:via-[#051133]/75 lg:to-transparent",
    accentGlow: "from-purple-600/25 to-blue-600/15",
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
    // Parallax shift: max 8px
    setMouseOffset({ x: +(x * 16).toFixed(2), y: +(y * 12).toFixed(2) });
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext(); // Swiped left -> next
      } else {
        handlePrev(); // Swiped right -> prev
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      <div
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] min-h-[560px] md:min-h-[580px] lg:min-h-[620px] shadow-[0_12px_40px_rgba(7,19,48,0.18)] border border-slate-200/40 dark:border-blue-950/60 isolate flex items-center"
      >
        {/* Animated Background Image & Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {/* Full-bleed background image with subtle parallax offset */}
            <div
              style={{
                backgroundImage: `url(${currentSlide.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center right",
                transform: `scale(1.04) translate3d(${mouseOffset.x * -0.5}px, ${mouseOffset.y * -0.5}px, 0)`,
                transition: "transform 180ms ease-out",
              }}
              className="absolute inset-0 w-full h-full bg-no-repeat"
            />

            {/* Contrast Gradient Overlay (Edge-to-Edge) */}
            <div className={`absolute inset-0 ${currentSlide.gradientOverlay}`} />

            {/* Ambient Accent Color Glow Orb */}
            <div
              className={`absolute -left-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br ${currentSlide.accentGlow} blur-3xl`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Content Container Layered Over Background */}
        <div className="relative z-20 w-full px-6 sm:px-10 lg:px-14 xl:px-16 py-12 sm:py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl lg:max-w-xl xl:max-w-2xl flex flex-col items-start text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-md border backdrop-blur-md ${currentSlide.badgeColor}`}
              >
                <currentSlide.badgeIcon className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
                <span>{currentSlide.badge}</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 sm:mt-5 text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-black tracking-tight leading-[1.1] text-white drop-shadow-sm"
              >
                {currentSlide.titleLine1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300">
                  {currentSlide.titleLine2}
                </span>
              </motion.h1>

              {/* Supporting Text */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-200/95 leading-relaxed font-medium max-w-xl drop-shadow-xs"
              >
                {currentSlide.description}
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
              >
                {/* Primary CTA with animated sliding arrow on hover */}
                <Link
                  to={currentSlide.primaryCtaLink}
                  className="group/cta inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#1455D9] hover:bg-[#0F44B2] text-white px-7 py-3.5 sm:py-4 text-sm font-extrabold shadow-[0_6px_20px_rgba(20,85,217,0.4)] hover:shadow-[0_8px_28px_rgba(20,85,217,0.55)] transition-all duration-300 hover:scale-[1.04] active:scale-95 cursor-pointer w-full sm:w-auto border border-blue-400/30"
                >
                  <span>{currentSlide.primaryCtaText}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1.5" />
                </Link>

                {/* Secondary CTA with glass border */}
                <Link
                  to={currentSlide.secondaryCtaLink}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-6 py-3.5 sm:py-4 text-sm font-bold transition-all duration-300 hover:scale-[1.02] hover:border-white/50 active:scale-95 cursor-pointer w-full sm:w-auto shadow-xs"
                >
                  <span>{currentSlide.secondaryCtaText}</span>
                </Link>
              </motion.div>

              {/* Feature Highlight Pills with hover lift */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 sm:mt-10 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-bold text-white/90"
              >
                {currentSlide.features.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <motion.div
                      key={feat.label}
                      whileHover={{ y: -3, scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 rounded-xl bg-black/25 backdrop-blur-md border border-white/15 px-3 py-2 shadow-xs cursor-default hover:border-blue-400/40 hover:bg-black/35 transition-colors"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{feat.label}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer group"
        >
          <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer group"
        >
          <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Bottom Expanding Pill Indicators */}
        <div className="absolute bottom-5 inset-x-0 z-30 flex items-center justify-center gap-2.5 pointer-events-auto">
          {SLIDES.map((slide, idx) => {
            const isActive = currentSlideIndex === idx;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.badge}`}
                className="relative h-2.5 rounded-full transition-all duration-400 cursor-pointer overflow-hidden group"
                style={{
                  width: isActive ? "42px" : "14px",
                }}
              >
                <div
                  className={`w-full h-full rounded-full transition-colors duration-300 ${
                    isActive
                      ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                      : "bg-white/40 hover:bg-white/70"
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
