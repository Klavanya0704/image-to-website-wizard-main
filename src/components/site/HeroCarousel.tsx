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
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

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
  bgPositionMobile: string;
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
    gradientOverlay:
      "bg-gradient-to-t from-[#040e28]/95 via-[#071842]/70 to-[#071842]/20 sm:bg-gradient-to-r sm:from-[#040e28]/90 sm:via-[#071842]/45 sm:to-transparent",
    bgPositionMobile: "72% 20%",
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
    gradientOverlay:
      "bg-gradient-to-t from-[#03091e]/95 via-[#051133]/70 to-[#051133]/20 sm:bg-gradient-to-r sm:from-[#03091e]/90 sm:via-[#051133]/45 sm:to-transparent",
    bgPositionMobile: "70% 25%",
  },
];

export function HeroCarousel() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const currentSlide = SLIDES[currentSlideIndex];

  // Auto-play timer: 6 seconds per slide, pauses on hover/touch
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
    if (shouldReduceMotion || window.innerWidth < 768 || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    // Max 6-8px smooth parallax
    setMouseOffset({ x: +(x * 14).toFixed(2), y: +(y * 10).toFixed(2) });
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Mobile Touch Swipe Handlers with vertical scroll protection
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      setIsPaused(false);
      return;
    }
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    setIsPaused(false);
  };

  // Cinematic Slide Transition Variants (650ms, cubic-bezier easing)
  const slideVariants = {
    initial: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : 30,
      scale: shouldReduceMotion ? 1 : 1.02,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier
      },
    },
    exit: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -20,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="mx-auto max-w-[1440px] px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4">
      <div
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] h-[520px] max-h-[560px] sm:h-[400px] sm:max-h-[400px] lg:h-[400px] shadow-[0_8px_30px_rgba(7,19,48,0.12)] border border-slate-200/50 dark:border-blue-950/60 isolate flex items-end sm:items-center bg-[#071330]"
      >
        {/* Full-width Edge-to-Edge Animated Background Image with Cinematic Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {/* Background image with parallax and continuous subtle micro-motion */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1.0, 1.02, 1.0],
                    }
              }
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: `url(${currentSlide.bgImage})`,
                backgroundSize: "cover",
                transform: `scale(1.02) translate3d(${mouseOffset.x * -0.5}px, ${mouseOffset.y * -0.5}px, 0)`,
                transition: "transform 180ms ease-out",
              }}
              className="absolute inset-0 w-full h-full bg-no-repeat bg-[position:72%_15%] sm:bg-[position:center_right]"
            />

            {/* Responsive Directional Gradient Overlay */}
            <div className={`absolute inset-0 ${currentSlide.gradientOverlay}`} />
          </motion.div>
        </AnimatePresence>

        {/* Responsive Content Layer: bottom-anchored on mobile, center-left on desktop */}
        <div className="relative z-20 w-full px-5 sm:px-10 lg:px-12 pt-6 pb-12 sm:py-8 flex flex-col justify-end sm:justify-center">
          <AnimatePresence mode="wait">
            <div
              key={currentSlide.id}
              className="max-w-xl lg:max-w-lg xl:max-w-xl flex flex-col items-start text-left"
            >
              {/* 1. Badge: 0ms delay */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm border backdrop-blur-md ${currentSlide.badgeColor}`}
              >
                <currentSlide.badgeIcon className="h-3 w-3 text-amber-300 shrink-0" />
                <span className="truncate">{currentSlide.badge}</span>
              </motion.div>

              {/* 2. Main Headline: 100ms delay */}
              <motion.h1
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-2.5 sm:mt-3 text-[32px] xs:text-[34px] sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.05] text-white drop-shadow-sm"
              >
                {currentSlide.titleLine1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-cyan-300">
                  {currentSlide.titleLine2}
                </span>
              </motion.h1>

              {/* 3. Description: 180ms delay */}
              <motion.p
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="mt-2 sm:mt-2.5 text-[13px] sm:text-sm lg:text-[15px] text-slate-200/95 leading-snug font-medium max-w-[320px] sm:max-w-lg drop-shadow-xs"
              >
                {currentSlide.description}
              </motion.p>

              {/* 4. Compact CTA Buttons: 260ms delay */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 sm:mt-5 flex items-center gap-2 sm:gap-3 w-full sm:w-auto"
              >
                {/* Primary CTA with hover lift and arrow motion */}
                <Link
                  to={currentSlide.primaryCtaLink}
                  className="group/cta flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] text-white px-4 sm:px-5 h-11 sm:h-12 text-xs sm:text-sm font-extrabold shadow-[0_4px_16px_rgba(20,85,217,0.35)] hover:shadow-[0_6px_24px_rgba(20,85,217,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 cursor-pointer border border-blue-400/30 text-center truncate"
                >
                  <span>{currentSlide.primaryCtaText}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-1.5 shrink-0" />
                </Link>

                {/* Secondary CTA with hover lift */}
                <Link
                  to={currentSlide.secondaryCtaLink}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-3.5 sm:px-4 h-11 sm:h-12 text-xs sm:text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white/40 active:scale-95 cursor-pointer shadow-2xs text-center truncate"
                >
                  <span>{currentSlide.secondaryCtaText}</span>
                </Link>
              </motion.div>

              {/* 5. Highlight Benefits: Staggered entry from 340ms */}
              <div className="mt-3.5 sm:mt-5 flex flex-wrap items-center gap-1.5 sm:gap-3 text-[11px] sm:text-xs font-bold text-white/90">
                {currentSlide.features.map((feat, idx) => (
                  <motion.div
                    key={feat.label}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.34 + idx * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-center gap-1 rounded-md sm:rounded-lg bg-black/30 hover:bg-black/45 backdrop-blur-md border border-white/15 hover:border-white/30 px-2 py-0.5 sm:px-2.5 sm:py-1 shadow-2xs cursor-default transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{feat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatePresence>
        </div>

        {/* Small & Elegant Glassmorphic Navigation Arrows with Hover Physics */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 flex h-[34px] w-[34px] sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/55 text-white backdrop-blur-md border border-white/20 shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all duration-200 cursor-pointer group"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:-translate-x-1" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex h-[34px] w-[34px] sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/55 text-white backdrop-blur-md border border-white/20 shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all duration-200 cursor-pointer group"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </motion.button>

        {/* Subtle Bottom Indicators with Smooth Width Expansion */}
        <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2 pointer-events-auto">
          {SLIDES.map((slide, idx) => {
            const isActive = currentSlideIndex === idx;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.badge}`}
                className="relative h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer overflow-hidden group"
                style={{
                  width: isActive ? "28px" : "8px",
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
