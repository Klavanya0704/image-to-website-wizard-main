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

import heroStoreJourney from "@/assets/hero-store-journey.png";
import heroMakerspaceBg from "@/assets/hero-makerspace-bg.jpg";
import { StoreShoppingJourneyAnimation } from "@/components/site/StoreShoppingJourneyAnimation";

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
  bgPosition: string;
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
    bgImage: heroStoreJourney,
    gradientOverlay:
      "bg-gradient-to-t from-[#020719]/95 via-[#020719]/80 to-transparent sm:bg-gradient-to-r sm:from-[#020719]/95 sm:via-[#020719]/50 sm:via-38% sm:to-transparent",
    bgPosition: "center right",
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
    bgPosition: "70% 25%",
  },
];

export function HeroCarousel() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide = SLIDES[currentSlideIndex];

  // Auto-play timer: 8.5 seconds per slide, pauses on hover/touch
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 8500);
    return () => clearInterval(interval);
  }, [isHovered, currentSlideIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768 || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: +(x * -12).toFixed(2), y: +(y * -6).toFixed(2) });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Mobile Touch Swipe Handlers with vertical scroll protection
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      setIsHovered(false);
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
    setIsHovered(false);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.02,
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1.0,
      transition: {
        x: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.7 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.7 },
        opacity: { duration: 0.5 },
      },
    }),
  };

  return (
    <section className="mx-auto max-w-[1440px] px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4">
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] h-[520px] max-h-[560px] sm:h-[450px] sm:max-h-[450px] lg:h-[450px] shadow-[0_10px_35px_rgba(7,19,48,0.18)] border border-slate-200/50 dark:border-blue-950/60 isolate flex items-end sm:items-center bg-[#071330]"
      >
        {/* Full-width Directional Animated Background Image */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
          >
            {/* Background Image Asset Container */}
            <div
              style={{
                backgroundImage: `url(${currentSlide.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: currentSlide.bgPosition,
                transform: `scale(1.01) translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="absolute inset-0 w-full h-full bg-no-repeat"
            />

            {/* Gradient Overlay for Text Contrast */}
            <div className={`absolute inset-0 ${currentSlide.gradientOverlay}`} />
          </motion.div>
        </AnimatePresence>

        {/* Live Synchronized Storytelling Animation over the Store Shopping Image */}
        {currentSlide.id === "store" && (
          <StoreShoppingJourneyAnimation isActive={currentSlideIndex === 0} />
        )}

        {/* Responsive Content Layer: Left text & CTAs */}
        <div className="relative z-20 w-full px-5 sm:px-10 lg:px-12 pt-6 pb-12 sm:py-8 flex flex-col justify-end sm:justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              className="max-w-xl lg:max-w-md xl:max-w-[460px] flex flex-col items-start text-left shrink-0"
            >
              {/* 1. Badge: 0ms delay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm border backdrop-blur-md ${currentSlide.badgeColor}`}
              >
                <currentSlide.badgeIcon className="h-3 w-3 text-amber-300 shrink-0" />
                <span className="truncate">{currentSlide.badge}</span>
              </motion.div>

              {/* 2. Main Headline: 100ms delay */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="mt-2.5 sm:mt-3 text-[32px] xs:text-[34px] sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.05] text-white drop-shadow-sm"
              >
                {currentSlide.titleLine1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-cyan-300">
                  {currentSlide.titleLine2}
                </span>
              </motion.h1>

              {/* 3. Description: 180ms delay */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-2 sm:mt-2.5 text-[13px] sm:text-sm lg:text-[15px] text-slate-200/95 leading-snug font-medium max-w-[320px] sm:max-w-lg drop-shadow-xs"
              >
                {currentSlide.description}
              </motion.p>

              {/* 4. Compact CTA Buttons: 260ms delay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 sm:mt-5 flex items-center gap-2 sm:gap-3 w-full sm:w-auto"
              >
                {/* Primary CTA with hover lift and arrow motion */}
                <Link
                  to={currentSlide.primaryCtaLink}
                  className="group/cta flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] text-white px-4 sm:px-5 h-11 sm:h-12 text-xs sm:text-sm font-extrabold shadow-[0_4px_16px_rgba(20,85,217,0.35)] hover:shadow-[0_8px_25px_rgba(20,85,217,0.6)] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.97] cursor-pointer border border-blue-400/30 text-center truncate"
                >
                  <span>{currentSlide.primaryCtaText}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-1.5 shrink-0" />
                </Link>

                {/* Secondary CTA with hover lift */}
                <Link
                  to={currentSlide.secondaryCtaLink}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-3.5 sm:px-4 h-11 sm:h-12 text-xs sm:text-sm font-bold transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] hover:border-white/40 active:scale-[0.97] cursor-pointer shadow-2xs text-center truncate"
                >
                  <span>{currentSlide.secondaryCtaText}</span>
                </Link>
              </motion.div>

              {/* 5. Highlight Benefits: Staggered entry from 350ms */}
              <div className="mt-3.5 sm:mt-5 flex flex-wrap items-center gap-1.5 sm:gap-3 text-[11px] sm:text-xs font-bold text-white/90">
                {currentSlide.features.map((feat, idx) => (
                  <motion.div
                    key={feat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.45 + idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-center gap-1 rounded-md sm:rounded-lg bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/15 hover:border-cyan-400/50 px-2 py-0.5 sm:px-2.5 sm:py-1 shadow-2xs cursor-default transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03]"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{feat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Small & Elegant Glassmorphic Navigation Arrows with Hover & Tap Physics */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 flex h-[34px] w-[34px] sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] transition-all duration-200 cursor-pointer group"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:-translate-x-1" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex h-[34px] w-[34px] sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] transition-all duration-200 cursor-pointer group"
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
                onClick={() => {
                  setDirection(idx > currentSlideIndex ? 1 : -1);
                  setCurrentSlideIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}: ${slide.badge}`}
                className="relative h-1.5 sm:h-2 rounded-full transition-all duration-400 cursor-pointer overflow-hidden group"
                style={{
                  width: isActive ? "36px" : "10px",
                }}
              >
                <div
                  className={`w-full h-full rounded-full transition-all duration-400 ${
                    isActive
                      ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
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
