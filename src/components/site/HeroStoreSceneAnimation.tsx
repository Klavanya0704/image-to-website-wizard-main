import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MousePointer2,
  Check,
  Package,
  Truck,
  Sparkles,
  MapPin,
  Layers,
} from "lucide-react";

interface HeroStoreSceneAnimationProps {
  isActive: boolean;
}

export function HeroStoreSceneAnimation({ isActive }: HeroStoreSceneAnimationProps) {
  // Timeline:
  // 1: Browse/Select (0.0s - 1.2s)
  // 2: Move into Cart (1.2s - 2.3s)
  // 3: Checkout/Payment (2.3s - 3.2s)
  // 4: Packing (3.2s - 4.2s)
  // 5: Shipping Route (4.2s - 5.8s)
  // 6: Delivery Destination (5.8s - 7.0s)
  // 7: Order Confirmed (7.0s - 8.0s)
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);

  useEffect(() => {
    if (!isActive) {
      setStage(1);
      return;
    }

    const t1 = setTimeout(() => setStage(2), 1200);
    const t2 = setTimeout(() => setStage(3), 2300);
    const t3 = setTimeout(() => setStage(4), 3200);
    const t4 = setTimeout(() => setStage(5), 4200);
    const t5 = setTimeout(() => setStage(6), 5800);
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
      {/* 1. BROWSE & SELECT (0.0s - 1.2s) */}
      {/* ========================================================================= */}
      {stage === 1 && (
        <>
          {/* Glowing Product Node positioned over the phone screen in hero */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.08, 1], opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute right-[42%] sm:right-[38%] lg:right-[34%] top-[38%] sm:top-[34%]"
          >
            {/* Selection Pulse Halo */}
            <div className="absolute -inset-3 rounded-full bg-cyan-400/40 blur-md animate-ping" />
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_0_25px_rgba(56,189,248,0.8)] border border-cyan-200/60">
              <Layers className="h-6 w-6 text-white animate-pulse" />
            </div>
          </motion.div>

          {/* Gliding Pointer Cursor */}
          <motion.div
            initial={{ x: "60vw", y: "60%", opacity: 0 }}
            animate={{ x: "0vw", y: "0%", opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute right-[40%] sm:right-[36%] lg:right-[32%] top-[42%] sm:top-[38%] text-cyan-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
          >
            <MousePointer2 className="h-6 w-6 fill-cyan-300 text-slate-950" />
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="absolute -left-1 -top-1 h-7 w-7 rounded-full border-2 border-cyan-300"
            />
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 2. PRODUCT MOVES INTO SHOPPING CART (1.2s - 2.3s) */}
      {/* ========================================================================= */}
      {stage === 2 && (
        <>
          {/* Animated 3D Product following a curved arc into the shopping cart on the right */}
          <motion.div
            initial={{
              right: "34%",
              top: "34%",
              scale: 1,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              right: ["34%", "24%", "14%"],
              top: ["34%", "18%", "42%"],
              scale: [1, 1.25, 0.7],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="absolute p-2.5 rounded-xl bg-gradient-to-br from-cyan-300 to-blue-600 text-white shadow-[0_0_30px_rgba(56,189,248,0.9)] border border-cyan-100 z-30"
          >
            <Layers className="h-6 w-6 text-white" />
          </motion.div>

          {/* Cart Reaction / Impact Glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.3, 1],
              opacity: [0, 1, 0],
            }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute right-[12%] top-[40%] text-xs font-black text-emerald-300 bg-emerald-950/90 border border-emerald-400 px-2.5 py-1 rounded-full shadow-lg"
          >
            +1 Added to Cart
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 3. CHECKOUT & PAYMENT SUCCESS (2.3s - 3.2s) */}
      {/* ========================================================================= */}
      {stage === 3 && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.6, 1.15, 1], opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="absolute right-[36%] sm:right-[32%] lg:right-[28%] top-[35%] flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/70 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.5)] text-white"
        >
          <div className="h-5 w-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black">
            <Check className="h-3.5 w-3.5 stroke-[3]" />
          </div>
          <span className="text-xs font-black tracking-wide text-emerald-300">
            Payment Verified
          </span>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 4. PACKING & SEALING (3.2s - 4.2s) */}
      {/* ========================================================================= */}
      {stage === 4 && (
        <div className="absolute right-[30%] sm:right-[26%] lg:right-[22%] top-[30%] flex flex-col items-center">
          {/* Ambient Packing Glow */}
          <div className="absolute -inset-4 rounded-full bg-amber-400/20 blur-xl animate-pulse" />

          {/* 3D Parcel Box Materializing */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="relative h-20 w-24 rounded-xl bg-gradient-to-b from-[#eab308] via-[#ca8a04] to-[#854d0e] border-2 border-amber-200/80 shadow-[0_12px_28px_rgba(0,0,0,0.6)] p-1.5 flex flex-col justify-between"
          >
            {/* Animated Sealing Tape Glide */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
              className="h-2.5 bg-amber-100 rounded-xs mx-auto shadow-inner"
            />
            <div className="text-center text-[8px] font-black text-amber-950 bg-amber-300/90 py-0.5 rounded-xs">
              ACTE IDEA LAB
            </div>
          </motion.div>

          {/* Stamp Badge */}
          <motion.div
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3, ease: "backOut" }}
            className="mt-2 text-[10px] font-black text-amber-300 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-amber-400/40"
          >
            📦 Sealed &amp; Dispatched
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SHIPPING ALONG ROUTE (4.2s - 5.8s) */}
      {/* ========================================================================= */}
      {stage === 5 && (
        <div className="absolute inset-x-8 sm:inset-x-16 bottom-[15%] sm:bottom-[20%] h-20">
          {/* Glowing Animated Dotted Route Path Line */}
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            <motion.path
              d="M 100 40 Q 300 10 550 40"
              fill="none"
              stroke="rgba(56, 189, 248, 0.6)"
              strokeWidth="3"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
            />
          </svg>

          {/* Moving Delivery Van with Parcel */}
          <motion.div
            initial={{ left: "10%", top: "25px" }}
            animate={{
              left: ["10%", "50%", "85%"],
              top: ["25px", "10px", "25px"],
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute z-20 flex items-center gap-1.5 bg-[#1455D9] text-white px-3 py-1.5 rounded-xl shadow-[0_8px_25px_rgba(20,85,217,0.8)] border border-cyan-300/50"
          >
            <Truck className="h-5 w-5 text-cyan-200" />
            <div className="text-[10px] font-black leading-none">ACTE EXPRESS</div>
          </motion.div>

          {/* Destination Pin */}
          <div className="absolute right-[10%] top-[15px] text-amber-400 animate-bounce">
            <MapPin className="h-6 w-6 fill-amber-400/40" />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. DELIVERY AT DESTINATION (5.8s - 7.0s) */}
      {/* ========================================================================= */}
      {stage === 6 && (
        <div className="absolute right-[16%] sm:right-[20%] top-[32%] flex flex-col items-center">
          {/* Dropping Delivered Parcel */}
          <motion.div
            initial={{ y: -40, opacity: 0, scale: 0.7 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="h-16 w-20 rounded-xl bg-gradient-to-b from-[#eab308] to-[#854d0e] border-2 border-amber-200 shadow-[0_12px_25px_rgba(0,0,0,0.7)] p-1 flex flex-col justify-between"
          >
            <div className="h-2 bg-amber-100 rounded-xs mx-auto w-full" />
            <div className="text-center text-[7px] font-black text-amber-950 bg-amber-300 py-0.5 rounded-xs">
              ACTE LAB
            </div>
            <div className="text-center text-[7px] font-bold text-white bg-black/40 rounded-xs">
              DELIVERED
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-[10px] font-black text-cyan-300 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-cyan-400/50"
          >
            Arrived at Destination
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. SUCCESS: ORDER DELIVERED (7.0s - 8.0s) */}
      {/* ========================================================================= */}
      {stage === 7 && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="absolute right-[16%] sm:right-[20%] top-[36%] flex items-center gap-2 rounded-full bg-emerald-500/25 border border-emerald-400/80 backdrop-blur-md px-4 py-1.5 shadow-[0_0_30px_rgba(16,185,129,0.5)] text-white"
        >
          <div className="h-5 w-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black">
            <Check className="h-3.5 w-3.5 stroke-[3]" />
          </div>
          <span className="text-xs sm:text-sm font-black text-emerald-300 tracking-wide">
            ✓ Order Delivered Successfully!
          </span>
          <Sparkles className="h-4 w-4 text-amber-300 animate-spin" />
        </motion.div>
      )}
    </div>
  );
}
