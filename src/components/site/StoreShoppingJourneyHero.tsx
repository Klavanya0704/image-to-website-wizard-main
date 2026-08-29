import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Check,
  Package,
  Truck,
  Sparkles,
  MapPin,
  MousePointer2,
  CreditCard,
  Layers,
  Box,
  Cpu,
} from "lucide-react";

interface StoreShoppingJourneyHeroProps {
  isActive: boolean;
}

export function StoreShoppingJourneyHero({ isActive }: StoreShoppingJourneyHeroProps) {
  // 4 Core Story Stages (8.0s Loop):
  // Stage 1: Browse Products & Add to Cart (0.0s - 2.0s)
  // Stage 2: Place Order & Checkout (2.0s - 3.8s)
  // Stage 3: Packing & Express Delivery (3.8s - 5.8s)
  // Stage 4: Order Delivered & Confirmed (5.8s - 7.8s)
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    if (!isActive) {
      setStage(1);
      return;
    }

    const t1 = setTimeout(() => setStage(2), 2000);
    const t2 = setTimeout(() => setStage(3), 3800);
    const t3 = setTimeout(() => setStage(4), 5800);
    const t4 = setTimeout(() => setStage(1), 7800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isActive, stage]);

  if (!isActive) return null;

  return (
    <div className="relative w-full h-[340px] max-w-[580px] pointer-events-none select-none overflow-visible flex items-center justify-center">
      {/* ========================================================================= */}
      {/* CONNECTING DOTTED ROUTE PATH ACROSS THE 4 STAGES */}
      {/* ========================================================================= */}
      <svg className="absolute inset-0 w-full h-full overflow-visible z-0 opacity-70">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#1455d9" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Dynamic Curved Path connecting Phone -> Cart -> Packing -> Delivery Route -> Doorstep */}
        <path
          d="M 120 180 Q 200 60 290 140 T 480 230"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="3"
          strokeDasharray="6 6"
        />

        {/* Animated Light Pulse traveling along the path */}
        <motion.circle
          r="4"
          fill="#38bdf8"
          filter="drop-shadow(0 0 6px #38bdf8)"
          animate={{
            cx: [120, 200, 290, 480],
            cy: [180, 85, 140, 230],
          }}
          transition={{
            duration: 7.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Stage Step Labels (Pills at Top) */}
      <div className="absolute top-1 inset-x-2 flex items-center justify-between z-20 text-[9px] font-black uppercase tracking-wider text-slate-300">
        <span className={`transition-colors duration-300 ${stage === 1 ? "text-cyan-300 font-bold" : "opacity-40"}`}>
          1. Browse
        </span>
        <span className={`transition-colors duration-300 ${stage === 2 ? "text-cyan-300 font-bold" : "opacity-40"}`}>
          2. Order
        </span>
        <span className={`transition-colors duration-300 ${stage === 3 ? "text-cyan-300 font-bold" : "opacity-40"}`}>
          3. Pack &amp; Ship
        </span>
        <span className={`transition-colors duration-300 ${stage === 4 ? "text-emerald-300 font-bold" : "opacity-40"}`}>
          4. Delivered
        </span>
      </div>

      {/* ========================================================================= */}
      {/* STAGE 1: BROWSE PRODUCTS ON PHONE & PHYSICAL PRODUCT MOTION INTO CART */}
      {/* ========================================================================= */}
      <div className="absolute left-2 sm:left-4 top-8 w-[175px] h-[250px] rounded-[22px] border-2 border-blue-400/40 bg-gradient-to-b from-[#061947]/95 via-[#030e2e]/95 to-[#020719]/95 backdrop-blur-md p-2.5 shadow-[0_0_30px_rgba(20,85,217,0.4)] flex flex-col justify-between z-10">
        {/* Phone Speaker & Cart Status Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
          <div className="h-1 w-8 bg-white/20 rounded-full mx-auto" />
          <motion.div
            animate={stage >= 1 ? { scale: [1, 1.2, 1] } : {}}
            className="p-1 rounded-full bg-blue-500/30 text-cyan-300 relative"
          >
            <ShoppingCart className="h-3 w-3" />
            {stage >= 2 && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 text-[8px] font-black text-slate-950 flex items-center justify-center">
                1
              </span>
            )}
          </motion.div>
        </div>

        {/* Product Grid inside Phone */}
        <div className="space-y-1.5 my-auto">
          {/* Active Product: 3D Spiral Vase */}
          <div
            className={`rounded-xl border p-1.5 transition-all duration-300 ${
              stage === 1
                ? "border-cyan-400 bg-blue-500/20 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                : "border-white/10 bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-inner">
                <Box className="h-5 w-5 text-cyan-100" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-black text-white truncate">3D Spiral Vase</div>
                <div className="text-[9px] font-bold text-amber-300">₹499</div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.div
              animate={stage >= 2 ? { backgroundColor: "rgb(16, 185, 129)" } : {}}
              className="mt-1.5 py-1 rounded-md bg-[#1455D9] text-center text-[8px] font-black text-white flex items-center justify-center gap-1 shadow-xs"
            >
              {stage >= 2 ? <Check className="h-2.5 w-2.5" /> : null}
              <span>{stage === 1 ? "+ Add to Cart" : "Added to Cart"}</span>
            </motion.div>
          </div>

          {/* Secondary Inactive Products (Laser Cut Tree, Circuit Board) */}
          <div className="rounded-lg border border-white/5 bg-white/5 p-1.5 flex items-center gap-2 opacity-50">
            <div className="h-6 w-6 rounded bg-emerald-600/30 flex items-center justify-center">
              <Layers className="h-3.5 w-3.5 text-emerald-300" />
            </div>
            <span className="text-[8px] font-bold text-slate-300">Laser Cut Art</span>
          </div>
        </div>

        {/* Gliding Finger / Pointer clicking Add to Cart (Stage 1) */}
        {stage === 1 && (
          <motion.div
            initial={{ x: 20, y: 180, opacity: 0 }}
            animate={{ x: 75, y: 130, opacity: 1 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="absolute z-30 text-cyan-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            <MousePointer2 className="h-5 w-5 fill-cyan-400 text-slate-950" />
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ delay: 0.65, duration: 0.4 }}
              className="absolute -left-1 -top-1 h-6 w-6 rounded-full border-2 border-cyan-300"
            />
          </motion.div>
        )}
      </div>

      {/* Physically Flying Product Object Arc across screen into Cart (Stage 1 -> Stage 2) */}
      {stage === 1 && (
        <motion.div
          initial={{ left: "60px", top: "120px", scale: 1, opacity: 0 }}
          animate={{
            left: ["60px", "140px", "240px"],
            top: ["120px", "50px", "130px"],
            scale: [0.8, 1.2, 0.4],
            rotate: [0, 180, 360],
            opacity: [0, 1, 1],
          }}
          transition={{ delay: 0.8, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="absolute z-30 p-2 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-white shadow-[0_0_25px_rgba(56,189,248,0.9)] border border-white"
        >
          <Box className="h-5 w-5" />
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 2: PLACE ORDER & CHECKOUT PANEL (2.0s - 3.8s) */}
      {/* ========================================================================= */}
      {stage === 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.35, ease: "backOut" }}
          className="absolute left-[200px] sm:left-[215px] top-[45px] w-[170px] rounded-2xl bg-[#040E29]/95 border-2 border-blue-400/50 p-2.5 shadow-[0_10px_35px_rgba(7,27,77,0.8),0_0_20px_rgba(56,189,248,0.3)] backdrop-blur-xl z-20 space-y-2"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-1">
            <span className="text-[9px] font-black uppercase text-cyan-300 flex items-center gap-1">
              <CreditCard className="h-3 w-3 text-amber-300" /> Checkout
            </span>
            <span className="text-[8px] font-mono text-emerald-400 font-black">1 Item</span>
          </div>

          <div className="bg-white/5 rounded-lg p-1.5 space-y-1">
            <div className="flex justify-between text-[8px] font-bold text-slate-300">
              <span>3D Spiral Vase</span>
              <span className="text-white">₹499</span>
            </div>
            <div className="flex justify-between text-[9px] font-black text-amber-300 border-t border-white/10 pt-0.5">
              <span>Total</span>
              <span>₹499</span>
            </div>
          </div>

          {/* Place Order Button */}
          <motion.div
            animate={{ scale: [1, 0.95, 1], backgroundColor: ["rgba(20,85,217,1)", "rgba(16,185,129,1)"] }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="w-full py-1.5 rounded-lg bg-[#1455D9] text-center text-[9px] font-black text-white shadow-md flex items-center justify-center gap-1"
          >
            <Check className="h-3 w-3" />
            <span>Place Order</span>
          </motion.div>

          {/* Cursor Clicking Place Order */}
          <motion.div
            initial={{ x: 120, y: 80, opacity: 0 }}
            animate={{ x: 75, y: 70, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute z-30 text-cyan-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            <MousePointer2 className="h-5 w-5 fill-cyan-400 text-slate-950" />
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="absolute -left-1 -top-1 h-6 w-6 rounded-full border-2 border-emerald-400"
            />
          </motion.div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 3: PACKING & DELIVERY VEHICLE DRIVING ALONG ROUTE (3.8s - 5.8s) */}
      {/* ========================================================================= */}
      {stage === 3 && (
        <>
          {/* Packing Box sealing before dispatch */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-[200px] top-[140px] h-16 w-20 rounded-xl bg-gradient-to-b from-[#eab308] to-[#854d0e] border-2 border-amber-200 shadow-[0_10px_25px_rgba(0,0,0,0.7)] p-1 flex flex-col justify-between z-10"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="h-2 bg-amber-100 rounded-xs mx-auto w-full origin-left"
            />
            <div className="text-center text-[7px] font-black text-amber-950 bg-amber-300 py-0.5 rounded-xs">
              ACTE LAB
            </div>
            <div className="h-1.5 w-6 bg-white rounded-xs ml-auto shadow-xs" />
          </motion.div>

          {/* Delivery Van moving smoothly along the route path */}
          <motion.div
            initial={{ left: "220px", top: "140px", rotate: -4 }}
            animate={{
              left: ["220px", "340px", "440px"],
              top: ["140px", "110px", "180px"],
              rotate: [-4, 2, -2],
            }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute z-20 flex items-center gap-1.5"
          >
            {/* Speed Streaks */}
            <div className="space-y-1 -mr-1">
              <div className="h-0.5 w-5 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
              <div className="h-0.5 w-3 bg-cyan-300/60 rounded-full" />
            </div>

            {/* Delivery Vehicle with Parcel in Rear */}
            <div className="relative flex items-center bg-gradient-to-r from-blue-600 to-[#1455D9] text-white px-3 py-2 rounded-xl shadow-[0_10px_28px_rgba(20,85,217,0.9)] border-2 border-cyan-300">
              <div className="h-4 w-4 rounded-xs bg-[#facc15] border border-amber-200 mr-2 shadow-xs" />
              <Truck className="h-4 w-4 text-cyan-200" />
            </div>
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* STAGE 4: ORDER DELIVERED AT DESTINATION & CHECKMARK BLOOM (5.8s - 7.8s) */}
      {/* ========================================================================= */}
      {stage === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="absolute right-4 sm:right-8 bottom-6 flex flex-col items-center z-20"
        >
          {/* Delivered Parcel Box */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="relative h-16 w-20 rounded-xl bg-gradient-to-b from-[#facc15] to-[#78350f] border-2 border-amber-200 shadow-[0_15px_30px_rgba(0,0,0,0.7)] p-1.5 flex flex-col justify-between"
          >
            <div className="h-2 bg-amber-100 rounded-xs mx-auto w-full" />
            <div className="text-center text-[7px] font-black text-amber-950 bg-amber-300 py-0.5 rounded-xs">
              ACTE IDEA LAB
            </div>
            <div className="flex items-center justify-between text-[6px] font-mono text-white bg-black/40 px-1 py-0.5 rounded-xs">
              <span>DELIVERED</span>
              <Check className="h-2 w-2 text-emerald-400" />
            </div>
          </motion.div>

          {/* Clean Elegant Confirmation State: ✓ Order Delivered */}
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "backOut" }}
            className="mt-2.5 flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/70 backdrop-blur-md px-3 py-1 text-[10px] font-black text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          >
            <div className="h-3.5 w-3.5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center">
              <Check className="h-2.5 w-2.5 stroke-[3]" />
            </div>
            <span>✓ Order Delivered</span>
            <Sparkles className="h-3 w-3 text-amber-300 animate-spin" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
