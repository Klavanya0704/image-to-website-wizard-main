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
    gradientOverlay: "",
    bgPosition: "center center",
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
    setMouseOffset({ x: +(x * -8).toFixed(2), y: +(y * -4).toFixed(2) });
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
    }),
    center: {
      x: "0%",
      opacity: 1,
      transition: {
        x: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.65 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.65 },
        opacity: { duration: 0.45 },
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
        className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] h-[520px] max-h-[560px] sm:h-[450px] sm:max-h-[450px] lg:h-[450px] shadow-[0_10px_35px_rgba(7,19,48,0.18)] border border-slate-200/50 dark:border-blue-950/60 isolate flex items-center bg-[#020719]"
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full flex flex-col sm:flex-row items-center justify-between"
          >
            {/* ================================================================= */}
            {/* LEFT ZONE: DEDICATED MARKETING CONTENT AREA (~35% Width) */}
            {/* ================================================================= */}
            <div className="relative z-20 w-full sm:w-[35%] lg:w-[34%] h-full flex flex-col justify-center px-6 sm:px-8 lg:px-10 py-6 sm:py-8 bg-[#020719] shrink-0">
              {/* 1. Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm border backdrop-blur-md w-fit ${currentSlide.badgeColor}`}
              >
                <currentSlide.badgeIcon className="h-3 w-3 text-amber-300 shrink-0" />
                <span className="truncate">{currentSlide.badge}</span>
              </motion.div>

              {/* 2. Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12 }}
                className="mt-2.5 sm:mt-3 text-[28px] xs:text-[32px] sm:text-3xl lg:text-[38px] xl:text-[42px] font-extrabold tracking-tight leading-[1.08] text-white drop-shadow-sm"
              >
                {currentSlide.titleLine1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-cyan-300">
                  {currentSlide.titleLine2}
                </span>
              </motion.h1>

              {/* 3. Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-2 sm:mt-2.5 text-[12px] sm:text-[13px] lg:text-sm text-slate-300 leading-snug font-medium max-w-[340px]"
              >
                {currentSlide.description}
              </motion.p>

              {/* 4. Compact CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.28 }}
                className="mt-4 sm:mt-5 flex items-center gap-2 sm:gap-3 w-full sm:w-auto pointer-events-auto"
              >
                <Link
                  to={currentSlide.primaryCtaLink}
                  className="group/cta inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-[#1455D9] hover:bg-[#0F44B2] text-white px-4 sm:px-5 h-10 sm:h-11 text-xs sm:text-sm font-extrabold shadow-[0_4px_16px_rgba(20,85,217,0.4)] hover:shadow-[0_8px_25px_rgba(20,85,217,0.6)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border border-blue-400/30 text-center truncate"
                >
                  <span>{currentSlide.primaryCtaText}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-1 shrink-0" />
                </Link>

                <Link
                  to={currentSlide.secondaryCtaLink}
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-3.5 sm:px-4 h-10 sm:h-11 text-xs sm:text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 cursor-pointer text-center truncate"
                >
                  <span>{currentSlide.secondaryCtaText}</span>
                </Link>
              </motion.div>

              {/* 5. Benefit Pills */}
              <div className="mt-3.5 sm:mt-5 flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-[11px] font-bold text-white/90">
                {currentSlide.features.map((feat, idx) => (
                  <motion.div
                    key={feat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.35 + idx * 0.06 }}
                    className="flex items-center gap-1 rounded-lg bg-white/5 border border-white/10 px-2 sm:px-2.5 py-0.5 sm:py-1 shadow-2xs"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{feat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Seamless Soft Feathering Seam between Left Zone and Right Zone */}
            <div className="hidden sm:block absolute left-[34%] top-0 bottom-0 w-12 bg-gradient-to-r from-[#020719] to-transparent z-15 pointer-events-none" />

            {/* ================================================================= */}
            {/* RIGHT ZONE: DEDICATED SHOPPING JOURNEY VISUAL SCENE (~65% Width) */}
            {/* ================================================================= */}
            <div className="relative w-full sm:w-[65%] lg:w-[66%] h-full overflow-hidden shrink-0">
              {/* Full Brightness Background Artwork Layer (ZERO dark overlays) */}
              <div
                style={{
                  backgroundImage: `url(${currentSlide.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: currentSlide.bgPosition,
                  transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                  transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="absolute inset-0 w-full h-full bg-no-repeat"
              />

              {/* Slide 2 Gradient Overlay if applicable */}
              {currentSlide.gradientOverlay && (
                <div className={`absolute inset-0 ${currentSlide.gradientOverlay}`} />
              )}

              {/* Store Slide Synchronized Storytelling Animation */}
              {currentSlide.id === "store" && (
                <StoreShoppingJourneyAnimation isActive={currentSlideIndex === 0} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Arrows */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 flex h-[34px] w-[34px] sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 shadow-md transition-all duration-200 cursor-pointer group pointer-events-auto"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex h-[34px] w-[34px] sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 shadow-md transition-all duration-200 cursor-pointer group pointer-events-auto"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </motion.button>

        {/* Bottom Pagination Indicators */}
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
