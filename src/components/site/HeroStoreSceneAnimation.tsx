import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

interface HeroStoreSceneAnimationProps {
  isActive: boolean;
}

export function HeroStoreSceneAnimation({ isActive }: HeroStoreSceneAnimationProps) {
  // Timeline Stages (Total 8.2s loop):
  // 1: Product Selection & Elevation (0.0s - 1.5s)
  // 2: Product Curved Arc Trajectory into Cart (1.5s - 2.8s)
  // 3: Cart Physical Impact Bounce & Box Materialization (2.8s - 4.2s)
  // 4: Delivery Van Driving along Route (4.2s - 6.2s)
  // 5: Package Delivered & Emerald Checkmark (6.2s - 8.0s)
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1);

  useEffect(() => {
    if (!isActive) {
      setStage(1);
      return;
    }

    const t1 = setTimeout(() => setStage(2), 1500);
    const t2 = setTimeout(() => setStage(3), 2800);
    const t3 = setTimeout(() => setStage(4), 4200);
    const t4 = setTimeout(() => setStage(5), 6200);
    const t5 = setTimeout(() => setStage(1), 8200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isActive, stage]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-25">
      {/* ========================================================================= */}
      {/* STAGE 1: PRODUCT SELECTION & ELEVATION (0.0s - 1.5s) */}
      {/* ========================================================================= */}
      {stage === 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 0 }}
          animate={{
            opacity: [0, 1, 1],
            scale: [0.7, 1.25, 1.15],
            y: [0, -22, -18],
          }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute right-[36%] sm:right-[32%] lg:right-[30%] top-[38%] sm:top-[34%]"
        >
          {/* Glowing Radial Halo */}
          <div className="absolute -inset-4 rounded-2xl bg-cyan-400/50 blur-lg animate-ping" />

          {/* Bold 3D Product Cube */}
          <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 border-2 border-white shadow-[0_0_35px_rgba(56,189,248,1)] flex items-center justify-center">
            <div className="h-7 w-7 rounded-lg border-2 border-cyan-100 bg-white/30 rotate-45 animate-pulse" />
          </div>

          {/* Selection Ring */}
          <div className="absolute -inset-2 rounded-2xl border-2 border-cyan-300 animate-pulse" />
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 2: PRODUCT PHYSICAL ARC TRAJECTORY INTO CART (1.5s - 2.8s) */}
      {/* ========================================================================= */}
      {stage === 2 && (
        <>
          {/* Moving 3D Product following a wide curved parabolic arc */}
          <motion.div
            initial={{
              right: "30%",
              top: "32%",
              scale: 1.15,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              right: ["30%", "21%", "12%"],
              top: ["32%", "12%", "48%"],
              scale: [1.15, 1.35, 0.4],
              rotate: [0, 240, 540],
              opacity: [1, 1, 0.9],
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-30"
          >
            {/* 3D Product Cube with Comet Trail */}
            <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-tr from-cyan-300 via-blue-500 to-indigo-600 border-2 border-white shadow-[0_0_40px_rgba(56,189,248,1)] flex items-center justify-center">
              <div className="h-7 w-7 rounded-lg border-2 border-white bg-white/40 rotate-45" />
            </div>
          </motion.div>

          {/* Cart Receiving Impact Ring (Bounces on Impact) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.5, 0],
              opacity: [0, 0.9, 0],
            }}
            transition={{ delay: 0.95, duration: 0.35 }}
            className="absolute right-[11%] top-[46%] h-20 w-20 rounded-full border-4 border-cyan-400 bg-cyan-400/30 blur-xs"
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* STAGE 3: CART BOUNCE & PARCEL BOX SEALING (2.8s - 4.2s) */}
      {/* ========================================================================= */}
      {stage === 3 && (
        <div className="absolute right-[18%] sm:right-[15%] lg:right-[13%] top-[36%] sm:top-[32%] flex flex-col items-center">
          {/* Packaging Amber Halo */}
          <div className="absolute -inset-5 rounded-3xl bg-amber-400/30 blur-xl animate-pulse" />

          {/* 3D Parcel Box Materializing with Pop Animation */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0, y: 30 }}
            animate={{
              scale: [0.3, 1.18, 1.0],
              opacity: 1,
              y: [30, -5, 0],
            }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="relative h-20 w-24 rounded-2xl bg-gradient-to-b from-[#facc15] via-[#ca8a04] to-[#78350f] border-2 border-amber-200 shadow-[0_15px_35px_rgba(0,0,0,0.7)] p-2 flex flex-col justify-between overflow-hidden"
          >
            {/* Animated Sealing Tape Line (Zips across top seam) */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, delay: 0.35, ease: "easeInOut" }}
              className="h-3 bg-amber-100 border-y border-amber-900/40 rounded-xs mx-auto w-full origin-left shadow-inner"
            />

            {/* Stamped Shipping Barcode Label */}
            <motion.div
              initial={{ scale: 2.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7, ease: "backOut" }}
              className="bg-white rounded-xs p-1 flex items-center justify-between shadow-md"
            >
              <div className="space-y-0.5">
                <div className="h-1 w-10 bg-slate-900 rounded-xs" />
                <div className="h-1 w-6 bg-slate-900 rounded-xs" />
              </div>
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 4: DELIVERY VEHICLE TRAVELING ALONG ROUTE (4.2s - 6.2s) */}
      {/* ========================================================================= */}
      {stage === 4 && (
        <div className="absolute inset-x-6 sm:inset-x-12 bottom-[10%] sm:bottom-[15%] h-24">
          {/* Glowing Animated Dotted Road Path */}
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            <motion.path
              d="M 80 50 Q 300 10 600 50"
              fill="none"
              stroke="rgba(56, 189, 248, 0.85)"
              strokeWidth="4"
              strokeDasharray="8 8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
            />
          </svg>

          {/* Delivery Van Driving Smoothly from Left to Right */}
          <motion.div
            initial={{ left: "10%", top: "35px", rotate: -4 }}
            animate={{
              left: ["10%", "50%", "88%"],
              top: ["35px", "10px", "35px"],
              rotate: [-4, 3, -1],
            }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute z-20 flex items-center gap-2"
          >
            {/* Speed Wind Streaks */}
            <div className="space-y-1.5 -mr-1">
              <div className="h-1 w-7 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <div className="h-1 w-4 bg-cyan-300/60 rounded-full" />
            </div>

            {/* High-Contrast Delivery Vehicle Body */}
            <div className="relative flex items-center bg-gradient-to-r from-blue-600 to-[#1455D9] text-white px-3.5 py-2.5 rounded-2xl shadow-[0_12px_32px_rgba(20,85,217,1)] border-2 border-cyan-300">
              {/* Parcel in Cargo Bed */}
              <div className="h-5 w-5 rounded-xs bg-[#facc15] border border-amber-200 mr-2.5 shadow-xs flex items-center justify-center">
                <div className="h-1 w-3 bg-amber-900/40 rounded-xs" />
              </div>
              {/* Cab & Rotating Wheels */}
              <div className="flex flex-col items-center">
                <div className="h-3.5 w-5 bg-cyan-200 rounded-xs border border-white" />
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-950 border border-white animate-spin" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-950 border border-white animate-spin" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 5: PACKAGE DELIVERED & EMERALD CHECKMARK BLOOM (6.2s - 8.0s) */}
      {/* ========================================================================= */}
      {stage === 5 && (
        <div className="absolute right-[12%] sm:right-[16%] bottom-[14%] sm:bottom-[18%] flex flex-col items-center">
          {/* Delivered Parcel Touching Down */}
          <motion.div
            initial={{ y: -45, opacity: 0, scale: 0.6 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="relative h-18 w-22 rounded-2xl bg-gradient-to-b from-[#facc15] to-[#78350f] border-2 border-amber-200 shadow-[0_18px_35px_rgba(0,0,0,0.75)] p-1.5 flex flex-col justify-between"
          >
            <div className="h-2.5 bg-amber-100 rounded-xs mx-auto w-full" />
            <div className="h-1.5 w-10 bg-amber-950/40 rounded-full mx-auto" />
            <div className="h-3 w-5 bg-white rounded-xs ml-auto shadow-xs" />
          </motion.div>

          {/* Prominent Emerald Delivery Checkmark Sparkle */}
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 15 }}
            animate={{
              scale: [0, 1.3, 1.0],
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.5, delay: 0.35, ease: "backOut" }}
            className="mt-3 relative flex items-center justify-center"
          >
            <div className="absolute -inset-3 rounded-full bg-emerald-400/60 blur-lg animate-ping" />
            <div className="relative h-11 w-11 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,1)] border-2 border-white">
              <Check className="h-6 w-6 stroke-[3.5] text-white" />
            </div>

            {/* Sparkling Starbursts */}
            <Sparkles className="absolute -right-4 -top-3 h-5 w-5 text-amber-300 animate-spin [animation-duration:4s]" />
            <Sparkles className="absolute -left-4 -bottom-2 h-4 w-4 text-cyan-300 animate-pulse" />
          </motion.div>
        </div>
      )}
    </div>
  );
}
