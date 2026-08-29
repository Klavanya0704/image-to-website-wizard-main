import React, { useState, useRef } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

// Category Hero Showcase Visual Assets
import hero3dPrinterImg from "@/assets/hero-3d-printer.jpg";
import heroLaserCutterImg from "@/assets/hero-laser-cutter.jpg";
import heroCncMachiningImg from "@/assets/hero-cnc-machining.jpg";
import heroElectronicsImg from "@/assets/hero-electronics.jpg";
import heroDronesImg from "@/assets/hero-drones.jpg";
import heroAcrylicImg from "@/assets/hero-acrylic.jpg";
import heroDiyKitsImg from "@/assets/hero-diy-kits.jpg";

interface CategoryHeroProps {
  slug: string;
  category: {
    name: string;
    description: string;
    icon: React.ComponentType<any>;
    badge: string;
  };
  productCount: number;
}

interface CategoryConfig {
  supportingText: string;
  showcaseImage: string;
  imageAlt: string;
  countLabel: string;
  accentGlow: string;
  backlight: string;
}

const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  "3d-printing": {
    supportingText: "From digital designs to real-world creations.",
    showcaseImage: hero3dPrinterImg,
    imageAlt: "AICTE IDEA Lab 3D Printer Setup",
    countLabel: "Active Models",
    accentGlow: "bg-purple-500/25",
    backlight: "from-purple-500/35 via-cyan-500/25 to-blue-500/35",
  },
  "laser-cutting": {
    supportingText: "From intricate engravings to precision-cut prototypes.",
    showcaseImage: heroLaserCutterImg,
    imageAlt: "AICTE IDEA Lab CO2 Laser Cutter",
    countLabel: "Active Designs",
    accentGlow: "bg-amber-400/25",
    backlight: "from-amber-500/35 via-cyan-500/25 to-blue-500/35",
  },
  "cnc-machining": {
    supportingText: "Engineered for precision fabrication and rapid creation.",
    showcaseImage: heroCncMachiningImg,
    imageAlt: "AICTE IDEA Lab CNC Milling Center",
    countLabel: "Milled Parts",
    accentGlow: "bg-sky-400/25",
    backlight: "from-slate-400/35 via-cyan-500/25 to-blue-500/35",
  },
  electronics: {
    supportingText: "Build connected ideas from circuit to prototype.",
    showcaseImage: heroElectronicsImg,
    imageAlt: "AICTE IDEA Lab Electronics Prototyping Workbench",
    countLabel: "Circuit Modules",
    accentGlow: "bg-emerald-400/25",
    backlight: "from-emerald-500/35 via-cyan-500/25 to-blue-500/35",
  },
  "drones-parts": {
    supportingText: "Build, customize and take your ideas to the sky.",
    showcaseImage: heroDronesImg,
    imageAlt: "AICTE IDEA Lab FPV Racing Drone Workshop",
    countLabel: "Flight Hardware",
    accentGlow: "bg-violet-500/25",
    backlight: "from-violet-500/35 via-cyan-500/25 to-blue-500/35",
  },
  "acrylic-products": {
    supportingText: "Transparent design with precision-crafted detail.",
    showcaseImage: heroAcrylicImg,
    imageAlt: "AICTE IDEA Lab Optical Acrylic Showcase",
    countLabel: "Custom Designs",
    accentGlow: "bg-teal-400/25",
    backlight: "from-teal-500/35 via-purple-500/25 to-blue-500/35",
  },
  "diy-kits": {
    supportingText: "Learn by building, experimenting and creating.",
    showcaseImage: heroDiyKitsImg,
    imageAlt: "AICTE IDEA Lab Hands-on STEM Robotics DIY Kit",
    countLabel: "Maker Kits",
    accentGlow: "bg-orange-500/25",
    backlight: "from-orange-500/35 via-amber-400/25 to-emerald-500/35",
  },
};

export function CategoryHero({ slug, category, productCount }: CategoryHeroProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const bannerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bannerRef.current || window.innerWidth < 768) return;
    const rect = bannerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    // Max 5px subtle parallax
    setMouseOffset({ x: +(x * 10).toFixed(2), y: +(y * 10).toFixed(2) });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const config = CATEGORY_CONFIGS[slug] || {
    supportingText: "Engineered for precision fabrication and rapid creation.",
    showcaseImage: hero3dPrinterImg,
    imageAlt: `${category.name} Showcase`,
    countLabel: "Catalog Products",
    accentGlow: "bg-blue-500/25",
    backlight: "from-blue-500/35 via-cyan-500/25 to-indigo-500/35",
  };

  return (
    <div
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-[22px] sm:rounded-[24px] bg-gradient-to-r from-[#03091e] via-[#071b4d] to-[#0d348a] text-white p-5 sm:p-7 lg:px-10 lg:py-7 mb-7 sm:mb-8 shadow-[0_10px_35px_rgba(7,27,77,0.35),0_0_20px_rgba(20,85,217,0.15)] border border-blue-500/30 cursor-default min-h-[220px] lg:h-[250px] flex items-center isolate"
    >
      {/* Background Maker Dot Matrix & Ambient Glows */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Ambient Deep Blue Glow Orb */}
      <motion.div
        animate={{
          x: [-15, 25, -15],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl pointer-events-none"
      />

      {/* Category-Specific Dynamic Ambient Glow Orb */}
      <motion.div
        animate={{
          x: [25, -15, 25],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute right-1/4 -bottom-10 h-64 w-64 rounded-full blur-3xl pointer-events-none ${config.accentGlow}`}
      />

      {/* Floating Sparkle Elements */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-4 text-cyan-300/20 pointer-events-none hidden lg:block"
      >
        <Sparkles className="h-4 w-4" />
      </motion.div>

      {/* Main Content Layout: 2 Columns */}
      <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
        {/* ================= LEFT SIDE: Category Information ================= */}
        <div className="max-w-xl xl:max-w-2xl space-y-2 text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="flex items-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 backdrop-blur-md px-3 py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-cyan-300 shadow-xs">
              <Sparkles className="h-3 w-3 text-amber-300 animate-pulse" />
              <span>✦ {category.badge}</span>
            </span>
            <span className="text-[11px] sm:text-xs text-blue-200/80 font-bold">• AICTE IDEA LAB</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="text-2xl sm:text-3xl lg:text-[40px] font-black tracking-tight text-white leading-tight"
          >
            {category.name}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="text-xs sm:text-sm text-slate-200/95 leading-relaxed max-w-lg font-medium"
          >
            {category.description}
          </motion.p>

          {/* Supporting line */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25 }}
            className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-cyan-300/90 pt-0.5"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span>{config.supportingText}</span>
          </motion.div>
        </div>

        {/* ================= RIGHT SIDE: Visual Showcase & Integrated Count ================= */}
        <div className="shrink-0 flex items-center justify-start md:justify-end">
          {/* Rich Category Showcase Card with Interactive Floating Physics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              transform: `translate3d(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px, 0)`,
              transition: "transform 150ms ease-out",
            }}
            className="relative group/showcase w-full sm:w-auto"
          >
            {/* Ambient Backlight Halo Behind Visual */}
            <div
              className={`absolute -inset-2 rounded-2xl blur-xl opacity-75 group-hover/showcase:opacity-100 transition-opacity bg-gradient-to-r ${config.backlight}`}
            />

            {/* Machine Render Container */}
            <div className="relative rounded-2xl border border-white/20 bg-slate-950/60 backdrop-blur-md overflow-hidden shadow-2xl p-1.5 flex items-center justify-between sm:justify-start gap-3">
              {/* Visual Image */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-32 sm:w-44 lg:w-52 aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 shrink-0"
              >
                <img
                  src={config.showcaseImage}
                  alt={config.imageAlt}
                  className="w-full h-full object-cover rounded-xl select-none transition-transform duration-300 group-hover/showcase:scale-105"
                />
                {/* Subtle glossy reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Integrated Live Catalog Counter */}
              <div className="pr-3 py-1 flex flex-col justify-center text-left">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 whitespace-nowrap">
                    Live Catalog
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white leading-none mt-1">
                  {productCount}
                </div>
                <div className="text-[11px] font-bold text-slate-300 whitespace-nowrap">
                  {config.countLabel}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
