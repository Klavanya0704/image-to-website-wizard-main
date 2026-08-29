import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

interface HeroStoreSceneAnimationProps {
  isActive: boolean;
}

export function HeroStoreSceneAnimation({ isActive }: HeroStoreSceneAnimationProps) {
  // Pure Object Timeline (Total: 8.0s loop):
  // 1: Product Selection on Phone Screen (0.0s - 1.0s)
  // 2: Product Physical Arc Motion into Cart (1.0s - 2.5s)
  // 3: Cart Bounce & Parcel Box Materialization (2.5s - 3.5s)
  // 4: Parcel Sealing & Label Stamping (3.5s - 4.5s)
  // 5: Delivery Vehicle Traveling along Route (4.5s - 6.0s)
  // 6: Package Delivered at Destination (6.0s - 7.0s)
  // 7: Visual Delivery Checkmark Sparkle (7.0s - 8.0s)
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);

  useEffect(() => {
    if (!isActive) {
      setStage(1);
      return;
    }

    const t1 = setTimeout(() => setStage(2), 1000);
    const t2 = setTimeout(() => setStage(3), 2500);
    const t3 = setTimeout(() => setStage(4), 3500);
    const t4 = setTimeout(() => setStage(5), 4500);
    const t5 = setTimeout(() => setStage(6), 6000);
    const t6 = setTimeout(() => setStage(7), 7000);
    const t7 = setTimeout(() => setStage(1), 8000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [isActive, stage]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-10">
      {/* ========================================================================= */}
      {/* 1. PRODUCT SELECTION: LIFTS DIRECTLY FROM PHONE SCREEN (0.0s - 1.0s) */}
      {/* ========================================================================= */}
      {stage === 1 && (
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 0 }}
          animate={{
            scale: [0.85, 1.15, 1.08],
            opacity: 1,
            y: [0, -14, -10],
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute right-[35%] sm:right-[31%] lg:right-[29%] top-[34%] sm:top-[30%]"
        >
          {/* Ambient Glowing Selection Ring */}
          <div className="absolute -inset-2.5 rounded-2xl bg-cyan-400/40 blur-md animate-pulse" />

          {/* 3D Product Cube / Model */}
          <div className="relative h-12 w-12 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 border-2 border-white/80 shadow-[0_0_25px_rgba(56,189,248,0.9)] flex items-center justify-center">
            {/* Inner Geometric Hologram Facets */}
            <div className="h-6 w-6 rounded-md border border-cyan-200/90 bg-white/20 rotate-45 animate-spin [animation-duration:8s]" />
          </div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 2. PRODUCT FLIES ALONG CURVED ARC INTO CART (1.0s - 2.5s) */}
      {/* ========================================================================= */}
      {stage === 2 && (
        <>
          {/* Flying Product Object with Motion Blur Trail */}
          <motion.div
            initial={{
              right: "29%",
              top: "30%",
              scale: 1.08,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              right: ["29%", "22%", "15%"],
              top: ["30%", "14%", "44%"],
              scale: [1.08, 1.25, 0.45],
              rotate: [0, 180, 420],
              opacity: [1, 1, 0.9],
            }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-30"
          >
            {/* Glowing Motion Particle Trail */}
            <div className="relative h-12 w-12 rounded-xl bg-gradient-to-tr from-cyan-300 via-blue-500 to-indigo-600 border-2 border-white shadow-[0_0_35px_rgba(56,189,248,1)] flex items-center justify-center">
              <div className="h-6 w-6 rounded-md border border-white bg-white/30 rotate-45" />
            </div>
          </motion.div>

          {/* Cart Receiving Reaction (Physical Bounce) */}
          <motion.div
            initial={{ scale: 1, y: 0 }}
            animate={{
              scale: [1, 1.2, 0.95, 1.05, 1],
              y: [0, 8, -4, 2, 0],
              rotate: [0, -4, 4, -2, 0],
            }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="absolute right-[14%] top-[42%] h-14 w-14 rounded-2xl bg-cyan-400/20 blur-lg pointer-events-none"
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* 3 & 4. PARCEL BOX MATERIALIZATION & SEALING (2.5s - 4.5s) */}
      {/* ========================================================================= */}
      {(stage === 3 || stage === 4) && (
        <div className="absolute right-[20%] sm:right-[17%] lg:right-[15%] top-[38%] sm:top-[35%] flex flex-col items-center">
          {/* Ambient Packaging Glow */}
          <div className="absolute -inset-3 rounded-2xl bg-amber-400/25 blur-lg animate-pulse" />

          {/* Realistic 3D Parcel Box */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "backOut" }}
            className="relative h-16 w-20 rounded-xl bg-gradient-to-b from-[#eab308] via-[#ca8a04] to-[#854d0e] border-2 border-amber-200/90 shadow-[0_12px_30px_rgba(0,0,0,0.65)] p-1.5 flex flex-col justify-between overflow-hidden"
          >
            {/* Sealing Tape Animated Across Top Seam (Stage 4) */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={stage === 4 ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-2.5 bg-amber-100/95 border-y border-amber-900/40 rounded-xs mx-auto w-full origin-left shadow-inner"
            />

            {/* ACTE IDEA LAB Branding Stamp */}
            <div className="text-center my-auto">
              <div className="h-1.5 w-10 bg-amber-950/40 rounded-full mx-auto" />
            </div>

            {/* Stamped White Shipping Barcode Label (Stage 4) */}
            {stage === 4 && (
              <motion.div
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3, ease: "backOut" }}
                className="bg-white rounded-xs p-0.5 flex items-center justify-between shadow-xs"
              >
                <div className="space-y-0.5">
                  <div className="h-0.5 w-7 bg-slate-900 rounded-xs" />
                  <div className="h-0.5 w-5 bg-slate-900 rounded-xs" />
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
              </motion.div>
            )}
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. DELIVERY VEHICLE TRAVELING ALONG GROUND ROUTE (4.5s - 6.0s) */}
      {/* ========================================================================= */}
      {stage === 5 && (
        <div className="absolute inset-x-8 sm:inset-x-14 bottom-[12%] sm:bottom-[16%] h-20">
          {/* Animated Curved Glowing Dotted Path */}
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            <motion.path
              d="M 120 45 Q 320 15 580 45"
              fill="none"
              stroke="rgba(56, 189, 248, 0.75)"
              strokeWidth="3.5"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7 }}
            />
          </svg>

          {/* Animated Moving Delivery Vehicle Carrying the Parcel */}
          <motion.div
            initial={{ left: "15%", top: "30px", rotate: -3 }}
            animate={{
              left: ["15%", "52%", "86%"],
              top: ["30px", "14px", "32px"],
              rotate: [-3, 2, -1],
            }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute z-20 flex items-center gap-1.5"
          >
            {/* Speed Wind Streaks */}
            <div className="space-y-1 -mr-1">
              <div className="h-0.5 w-5 bg-cyan-300 rounded-full animate-pulse" />
              <div className="h-0.5 w-3 bg-cyan-300/60 rounded-full" />
            </div>

            {/* Delivery Vehicle Body */}
            <div className="relative flex items-center bg-[#1455D9] text-white px-3 py-2 rounded-xl shadow-[0_10px_28px_rgba(20,85,217,0.9)] border border-cyan-300/60">
              {/* Mini Parcel in Rear Cargo Bed */}
              <div className="h-4 w-4 rounded-xs bg-[#ca8a04] border border-amber-200 mr-2 shadow-xs" />
              {/* Front Cab */}
              <div className="flex flex-col items-center">
                <div className="h-2.5 w-3.5 bg-cyan-200/80 rounded-xs border border-white/40" />
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="h-2 w-2 rounded-full bg-slate-900 border border-white/60 animate-spin" />
                  <div className="h-2 w-2 rounded-full bg-slate-900 border border-white/60 animate-spin" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6 & 7. PACKAGE DELIVERED AT DESTINATION & CHECKMARK SPARKLE (6.0s - 8.0s) */}
      {/* ========================================================================= */}
      {(stage === 6 || stage === 7) && (
        <div className="absolute right-[14%] sm:right-[18%] bottom-[16%] sm:bottom-[20%] flex flex-col items-center">
          {/* Delivered Parcel Dropping onto Doorstep Platform */}
          <motion.div
            initial={{ y: -35, opacity: 0, scale: 0.7 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="relative h-14 w-18 rounded-xl bg-gradient-to-b from-[#eab308] to-[#854d0e] border-2 border-amber-200/90 shadow-[0_15px_30px_rgba(0,0,0,0.7)] p-1 flex flex-col justify-between"
          >
            <div className="h-2 bg-amber-100 rounded-xs mx-auto w-full" />
            <div className="h-1 w-8 bg-amber-950/40 rounded-full mx-auto" />
            <div className="h-2.5 w-4 bg-white rounded-xs ml-auto shadow-xs" />
          </motion.div>

          {/* Stage 7: Elegant Glowing Emerald Checkmark Bloom */}
          {stage === 7 && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: [0, 1.25, 1], opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "backOut" }}
              className="mt-2.5 relative flex items-center justify-center"
            >
              {/* Emerald Pulse Aura */}
              <div className="absolute -inset-2 rounded-full bg-emerald-400/50 blur-md animate-ping" />

              <div className="relative h-9 w-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.9)] border-2 border-white">
                <Check className="h-5 w-5 stroke-[3.5] text-white drop-shadow-xs" />
              </div>

              {/* Sparkle Stars */}
              <Sparkles className="absolute -right-3 -top-2 h-4 w-4 text-amber-300 animate-spin [animation-duration:4s]" />
              <Sparkles className="absolute -left-3 -bottom-1 h-3.5 w-3.5 text-cyan-300 animate-pulse" />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
