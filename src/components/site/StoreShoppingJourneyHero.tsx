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
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface StoreShoppingJourneyHeroProps {
  isActive: boolean;
}

export function StoreShoppingJourneyHero({ isActive }: StoreShoppingJourneyHeroProps) {
  // 5 Storytelling Phases (20-Second Seamless Loop):
  // Phase 1 (0–4s): Phone Browse & Add to Cart
  // Phase 2 (4–8s): Checkout & Place Order
  // Phase 3 (8–12s): Conveyor Packing & Laser Scan
  // Phase 4 (12–17s): Express Delivery Van Highway Travel
  // Phase 5 (17–20s): Destination Arrival & "✓ Order Delivered"
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1);

  useEffect(() => {
    if (!isActive) {
      setStage(1);
      return;
    }

    const t1 = setTimeout(() => setStage(2), 4000);
    const t2 = setTimeout(() => setStage(3), 8000);
    const t3 = setTimeout(() => setStage(4), 12000);
    const t4 = setTimeout(() => setStage(5), 17000);
    const t5 = setTimeout(() => setStage(1), 20000);

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
    <div className="relative w-full h-[380px] max-w-[760px] pointer-events-none select-none overflow-visible flex flex-col justify-between py-1">
      {/* ========================================================================= */}
      {/* TOP STAGE NAVIGATION (Active stage illuminates with neon cyan halo) */}
      {/* ========================================================================= */}
      <div className="relative z-30 flex items-center justify-between gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 rounded-2xl bg-[#020817]/80 border border-cyan-500/25 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.6)]">
        {[
          { num: 1, label: "Browse Products", active: stage === 1 },
          { num: 2, label: "Place Order", active: stage === 2 },
          { num: 3, label: "Pack & Ship", active: stage === 3 },
          { num: 4, label: "Delivered", active: stage >= 4 },
        ].map((step, idx) => (
          <div
            key={step.num}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all duration-400 ${
              step.active
                ? "bg-gradient-to-r from-[#1455D9] via-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.7)] border border-cyan-300 scale-105"
                : "text-slate-400 opacity-60"
            }`}
          >
            <span
              className={`flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full text-[9px] font-black ${
                step.active ? "bg-white text-slate-950" : "bg-white/10 text-slate-300"
              }`}
            >
              {step.num}
            </span>
            <span className="truncate">{step.label}</span>
            {idx < 3 && <ChevronRight className="h-3.5 w-3.5 text-white/30 ml-1 hidden sm:inline" />}
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* CONNECTING GLOWING LOGISTICS ROUTE PATH */}
      {/* ========================================================================= */}
      <svg className="absolute inset-0 w-full h-full overflow-visible z-0 opacity-90">
        <defs>
          <linearGradient id="logisticsRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#1455d9" />
            <stop offset="70%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Ambient Halo Track */}
        <path
          d="M 100 230 Q 210 100 340 200 T 620 270"
          fill="none"
          stroke="rgba(56, 189, 248, 0.2)"
          strokeWidth="10"
        />

        {/* Dynamic Dotted Road Track */}
        <path
          d="M 100 230 Q 210 100 340 200 T 620 270"
          fill="none"
          stroke="url(#logisticsRouteGrad)"
          strokeWidth="4"
          strokeDasharray="8 6"
        />

        {/* Light Pulse Traveling along Logistics Highway */}
        <motion.circle
          r="6"
          fill="#38bdf8"
          filter="drop-shadow(0 0 10px #38bdf8)"
          animate={{
            cx: [100, 210, 340, 620],
            cy: [230, 115, 200, 270],
          }}
          transition={{
            duration: 19.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* ========================================================================= */}
      {/* MAIN 4-STAGE INTERACTIVE VISUAL LOGISTICS SCENE */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full h-[305px] flex items-center justify-between gap-3 px-1">
        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 1: LARGE SMARTPHONE (Browse Products & Add to Cart) */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className={`relative w-[185px] h-[295px] rounded-[26px] border-2 transition-all duration-500 bg-gradient-to-b from-[#061947]/95 via-[#030e2e]/95 to-[#020719]/95 backdrop-blur-xl p-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between shrink-0 ${
            stage === 1
              ? "border-cyan-400 shadow-[0_0_35px_rgba(56,189,248,0.45)] scale-102"
              : "border-blue-900/50 opacity-80"
          }`}
        >
          {/* Phone Top Notch & Cart Status Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <div className="h-1.5 w-12 bg-white/20 rounded-full" />
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="p-1 rounded-full bg-blue-500/30 text-cyan-300 relative">
                <ShoppingCart className="h-3.5 w-3.5" />
                {stage >= 2 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-emerald-400 text-[9px] font-black text-slate-950 flex items-center justify-center shadow-md animate-bounce">
                    1
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Items inside Screen */}
          <div className="space-y-1.5 my-auto">
            {/* Active Highlighted Product: 3D Spiral Vase */}
            <div
              className={`rounded-xl border p-2 transition-all duration-300 ${
                stage === 1
                  ? "border-cyan-400 bg-blue-600/30 shadow-[0_0_20px_rgba(56,189,248,0.35)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <Box className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-black text-white truncate">3D Spiral Vase</div>
                  <div className="text-[10px] font-bold text-amber-300">₹499</div>
                  <div className="text-[8px] text-cyan-200">In Stock • FDM PLA</div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.div
                animate={
                  stage >= 2
                    ? { backgroundColor: "rgb(16, 185, 129)", scale: [1, 1.05, 1] }
                    : { backgroundColor: "rgb(20, 85, 217)" }
                }
                className="mt-2 py-1.5 rounded-lg text-center text-[9px] font-black text-white flex items-center justify-center gap-1 shadow-md"
              >
                {stage >= 2 ? <Check className="h-3 w-3 stroke-[3]" /> : <ShoppingCart className="h-3 w-3" />}
                <span>{stage === 1 ? "+ Add to Cart" : "Added to Cart ✓"}</span>
              </motion.div>
            </div>

            {/* Secondary Products */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-1.5 flex items-center gap-2 opacity-50">
              <div className="h-6 w-6 rounded bg-emerald-600/40 flex items-center justify-center">
                <Layers className="h-3.5 w-3.5 text-emerald-300" />
              </div>
              <span className="text-[9px] font-bold text-slate-300">Laser Cut Art</span>
              <span className="text-[9px] text-amber-300 ml-auto font-bold">₹799</span>
            </div>
          </div>

          {/* Gliding Cursor Clicking "Add to Cart" (Stage 1: 0–4s) */}
          {stage === 1 && (
            <motion.div
              initial={{ x: 20, y: 220, opacity: 0 }}
              animate={{ x: 80, y: 155, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute z-30 text-cyan-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
            >
              <MousePointer2 className="h-6 w-6 fill-cyan-400 text-slate-950" />
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.8, opacity: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -left-2 -top-2 h-9 w-9 rounded-full border-2 border-cyan-300"
              />
            </motion.div>
          )}
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* STAGE 2: LARGE CHECKOUT & ORDER SUMMARY PANEL (Place Order) */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className={`relative w-[195px] rounded-[24px] border-2 transition-all duration-500 bg-[#040E29]/95 backdrop-blur-xl p-3 shadow-[0_15px_40px_rgba(0,0,0,0.9)] space-y-2.5 shrink-0 ${
            stage === 2
              ? "border-blue-400 shadow-[0_0_35px_rgba(20,85,217,0.7)] scale-105 z-20"
              : "border-white/10 opacity-75 z-10"
          }`}
        >
          {/* Checkout Header */}
          <div className="flex items-center justify-between border-b border-white/15 pb-2">
            <span className="text-[11px] font-black uppercase text-cyan-300 flex items-center gap-1.5">
              <CreditCard className="h-4 w-4 text-amber-300" /> Order Checkout
            </span>
            <span className="text-[9px] font-mono text-emerald-400 font-black bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
              2 Items
            </span>
          </div>

          {/* Line Items */}
          <div className="bg-white/5 rounded-xl p-2.5 space-y-1.5">
            <div className="flex justify-between text-[9px] font-bold text-slate-200">
              <span className="truncate">3D Spiral Vase</span>
              <span className="text-white font-black">₹499</span>
            </div>
            <div className="flex justify-between text-[9px] font-bold text-slate-200">
              <span className="truncate">PLA Filament (1kg)</span>
              <span className="text-white font-black">₹1,299</span>
            </div>
            <div className="flex justify-between text-[8px] font-bold text-emerald-300">
              <span>Standard Shipping</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between text-[11px] font-black text-amber-300 border-t border-white/15 pt-1.5 mt-1">
              <span>Total Amount</span>
              <span>₹1,798</span>
            </div>
          </div>

          {/* Place Order CTA Button */}
          <motion.div
            animate={
              stage >= 3
                ? { backgroundColor: "rgb(16, 185, 129)", scale: [1, 1.05, 1] }
                : stage === 2
                ? { scale: [1, 0.96, 1] }
                : {}
            }
            transition={{ delay: 1.8, duration: 0.5 }}
            className="w-full py-2 rounded-xl bg-[#1455D9] text-center text-[10px] font-black text-white shadow-lg flex items-center justify-center gap-1.5"
          >
            <Check className="h-4 w-4 stroke-[3]" />
            <span>{stage >= 3 ? "Order Confirmed ✓" : "Place Order"}</span>
          </motion.div>

          {/* Cursor Clicking "Place Order" (Stage 2: 4–8s) */}
          {stage === 2 && (
            <motion.div
              initial={{ x: 140, y: 130, opacity: 0 }}
              animate={{ x: 85, y: 110, opacity: 1 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="absolute z-30 text-cyan-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
            >
              <MousePointer2 className="h-6 w-6 fill-cyan-400 text-slate-950" />
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.8, opacity: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="absolute -left-2 -top-2 h-9 w-9 rounded-full border-2 border-emerald-400"
              />
            </motion.div>
          )}
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* STAGES 3 & 4: CONVEYOR PACKING STATION & EXPRESS DELIVERY TRUCK */}
        {/* ----------------------------------------------------------------------- */}
        <div className="relative flex-1 h-[295px] flex flex-col justify-between pl-2">
          {/* Packing Conveyor Belt Station (Stage 3: 8–12s) */}
          <div
            className={`relative rounded-2xl border-2 transition-all duration-500 bg-gradient-to-r from-[#071842]/95 to-[#020719]/95 p-2.5 shadow-xl ${
              stage === 3
                ? "border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.45)] scale-102"
                : "border-white/10 opacity-75"
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-black uppercase text-amber-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Package className="h-4 w-4" /> Packing &amp; Conveyor
              </span>
              <span className="text-[8px] text-cyan-300 font-mono">ACTE DISPATCH</span>
            </div>

            {/* Industrial Conveyor Belt Platform with Laser Scanner Beam */}
            <div className="relative h-16 rounded-xl bg-slate-950 border border-slate-800 flex items-center px-2 overflow-hidden">
              {/* Rotating Conveyor Rollers */}
              <div className="absolute inset-0 flex items-center justify-around opacity-40">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="h-full w-1 bg-slate-600 rounded-full" />
                ))}
              </div>

              {/* Overhead Laser Scanner Beam */}
              {stage === 3 && (
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, 140, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_12px_rgba(56,189,248,1)] z-20"
                />
              )}

              {/* 3D Branded Cardboard Box Traveling on Conveyor */}
              <motion.div
                initial={{ x: 0 }}
                animate={stage >= 3 ? { x: [0, 70, 140] } : {}}
                transition={{ duration: 3.2, ease: "easeInOut" }}
                className="relative z-10 h-11 w-16 rounded-lg bg-gradient-to-b from-[#eab308] to-[#854d0e] border border-amber-200 shadow-lg p-1 flex flex-col justify-between"
              >
                <div className="h-1.5 bg-amber-100/90 rounded-xs mx-auto w-full" />
                <div className="text-center text-[7.5px] font-black text-amber-950 bg-amber-300 py-0.5 rounded-xs leading-none">
                  ACTE IDEA LAB
                </div>
                <div className="h-1 w-5 bg-white rounded-xs ml-auto shadow-xs" />
              </motion.div>
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* Large ACTE Delivery Van on Glowing Road & Final Delivered State */}
          {/* ------------------------------------------------------------------- */}
          <div className="relative h-[140px] rounded-2xl border-2 border-white/10 bg-[#020719]/90 p-2.5 flex flex-col justify-between overflow-hidden shadow-xl">
            <div className="flex items-center justify-between text-[10px] font-black uppercase text-cyan-300">
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4" /> Express Delivery Route
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-mono text-[9px]">
                <MapPin className="h-3.5 w-3.5" /> Destination Doorstep
              </span>
            </div>

            {/* Delivery Vehicle Motion Track (Stage 4 & 5: 12–20s) */}
            <div className="relative h-14 flex items-center">
              {/* Delivery Van Body */}
              <motion.div
                initial={{ x: 0, opacity: 0 }}
                animate={
                  stage >= 4
                    ? {
                        x: [0, 90, 180],
                        opacity: 1,
                      }
                    : { x: 0, opacity: 0 }
                }
                transition={{ duration: 4.8, ease: "easeInOut" }}
                className="relative z-20 flex items-center gap-1.5"
              >
                {/* Wind Motion Trails */}
                <div className="space-y-1 -mr-1">
                  <div className="h-0.5 w-5 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
                  <div className="h-0.5 w-3 bg-cyan-300/60 rounded-full" />
                </div>

                {/* Van Body */}
                <div className="flex items-center bg-gradient-to-r from-blue-600 to-[#1455D9] text-white px-3 py-2 rounded-xl shadow-[0_10px_25px_rgba(20,85,217,0.9)] border-2 border-cyan-300">
                  <div className="h-4 w-4 rounded-xs bg-[#facc15] border border-amber-200 mr-2 shadow-xs" />
                  <Truck className="h-5 w-5 text-cyan-200" />
                </div>
              </motion.div>

              {/* Destination Doorstep Marker */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-emerald-500/30 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.9)]">
                  <MapPin className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Final "✓ Order Delivered" Celebration State (Stage 5: 17–20s) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={stage === 5 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center gap-2 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/30 to-teal-500/30 border border-emerald-400/80 backdrop-blur-md shadow-[0_0_25px_rgba(16,185,129,0.7)]"
            >
              <div className="h-5 w-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center">
                <Check className="h-3.5 w-3.5 stroke-[3.5]" />
              </div>
              <span className="text-[11px] font-black text-emerald-200 tracking-wider">
                ✓ Order Delivered Successfully!
              </span>
              <Sparkles className="h-4 w-4 text-amber-300 animate-spin" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
