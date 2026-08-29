import React, { useState, useRef } from "react";
import { Sparkles, Printer, Scissors, CheckCircle2, Flame } from "lucide-react";
import { motion } from "framer-motion";
import hero3dPrinterImg from "@/assets/hero-3d-printer.jpg";
import heroLaserCutterImg from "@/assets/hero-laser-cutter.jpg";

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

  const IconComp = category.icon;
  const is3DPrinting = slug === "3d-printing";
  const isLaserCutting = slug === "laser-cutting";

  // Category-specific supporting lines
  const supportingText = isLaserCutting
    ? "From intricate engravings to precision-cut prototypes."
    : is3DPrinting
    ? "From rapid prototypes to functional creations."
    : "Engineered for precision fabrication and rapid creation.";

  // Category-specific showcase image
  const showcaseImage = isLaserCutting
    ? heroLaserCutterImg
    : is3DPrinting
    ? hero3dPrinterImg
    : null;

  const countLabel = isLaserCutting
    ? "Active Designs"
    : is3DPrinting
    ? "Active Models"
    : "Catalog Products";

  return (
    <div
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#03091e] via-[#071b4d] to-[#0d348a] text-white p-6 sm:p-8 lg:px-10 lg:py-7 mb-8 shadow-[0_10px_35px_rgba(7,27,77,0.35),0_0_20px_rgba(20,85,217,0.15)] border border-blue-500/30 cursor-default min-h-[220px] lg:h-[250px] flex items-center isolate"
    >
      {/* Background Maker Dot Matrix & Ambient Glows */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Ambient Blue & Cyan Glow Orbs */}
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
      <motion.div
        animate={{
          x: [25, -15, 25],
          opacity: isLaserCutting ? [0.25, 0.45, 0.25] : [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute right-1/4 -bottom-10 h-64 w-64 rounded-full blur-3xl pointer-events-none ${
          isLaserCutting ? "bg-amber-400/15" : "bg-cyan-400/20"
        }`}
      />

      {/* Floating Particles */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-4 text-cyan-300/20 pointer-events-none hidden lg:block"
      >
        <Sparkles className="h-4 w-4" />
      </motion.div>

      {/* Main Content Layout: 2 Columns */}
      <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* ================= LEFT SIDE: Category Information ================= */}
        <div className="max-w-xl xl:max-w-2xl space-y-2">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="flex items-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 backdrop-blur-md px-3 py-1 text-[11px] font-black uppercase tracking-wider text-cyan-300 shadow-xs">
              <Sparkles className="h-3 w-3 text-amber-300 animate-pulse" />
              <span>✦ {category.badge}</span>
            </span>
            <span className="text-xs text-blue-200/80 font-bold">• AICTE IDEA LAB</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-white leading-tight"
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
            <span>{supportingText}</span>
          </motion.div>
        </div>

        {/* ================= RIGHT SIDE: Visual Showcase & Integrated Count ================= */}
        <div className="shrink-0 flex items-center justify-end">
          {showcaseImage ? (
            /* Rich Machine Showcase Card with Floating Physics */
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                transform: `translate3d(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px, 0)`,
                transition: "transform 150ms ease-out",
              }}
              className="relative group/showcase"
            >
              {/* Soft Ambient Laser/Light Backlight Behind Machine */}
              <div
                className={`absolute -inset-2 rounded-2xl blur-xl opacity-75 group-hover/showcase:opacity-100 transition-opacity ${
                  isLaserCutting
                    ? "bg-gradient-to-r from-amber-500/30 via-cyan-500/25 to-blue-500/30"
                    : "bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-indigo-500/30"
                }`}
              />

              {/* Machine Render Container */}
              <div className="relative rounded-2xl border border-white/20 bg-slate-950/60 backdrop-blur-md overflow-hidden shadow-2xl p-1.5 flex items-center gap-3">
                {/* Visual Image */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-36 sm:w-44 lg:w-52 aspect-[16/10] rounded-xl overflow-hidden bg-slate-900"
                >
                  <img
                    src={showcaseImage}
                    alt={isLaserCutting ? "AICTE IDEA Lab CO2 Laser Cutter" : "AICTE IDEA Lab 3D Printer Setup"}
                    className="w-full h-full object-cover rounded-xl select-none transition-transform duration-300 group-hover/showcase:scale-105"
                  />
                  {/* Subtle glossy reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </motion.div>

                {/* Integrated Live Catalog Counter */}
                <div className="pr-3 py-1 flex flex-col justify-center text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300">
                      Live Catalog
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white leading-none mt-1">
                    {productCount}
                  </div>
                  <div className="text-[11px] font-bold text-slate-300 whitespace-nowrap">
                    {countLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* General Category Stats Card with Matching Glass Style */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-3.5 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/30 border border-blue-400/40 text-cyan-300 shadow-inner">
                <IconComp className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">{productCount}</div>
                <div className="text-xs font-bold text-slate-300">Catalog Products</div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
