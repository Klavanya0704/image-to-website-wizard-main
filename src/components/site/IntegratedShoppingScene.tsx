import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Check,
  Sparkles,
  MapPin,
  Box,
  Truck,
  MousePointer2,
  Package,
} from "lucide-react";

interface IntegratedShoppingSceneProps {
  isActive: boolean;
}

export function IntegratedShoppingScene({ isActive }: IntegratedShoppingSceneProps) {
  // 7 Distinct Shopping Journey Phases:
  // 1: Browse / Pointer Hover (0.0s - 1.5s)
  // 2: Add to Cart / Arc Motion (1.5s - 2.6s)
  // 3: Checkout / Payment (2.6s - 3.7s)
  // 4: Packaging / Sealing (3.7s - 4.9s)
  // 5: Shipping / Van Route (4.9s - 6.3s)
  // 6: Doorstep Delivery (6.3s - 7.3s)
  // 7: Order Confirmed (7.3s - 8.4s)
  const [phase, setPhase] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);

  useEffect(() => {
    if (!isActive) {
      setPhase(1);
      return;
    }

    const t1 = setTimeout(() => setPhase(2), 1500);
    const t2 = setTimeout(() => setPhase(3), 2600);
    const t3 = setTimeout(() => setPhase(4), 3700);
    const t4 = setTimeout(() => setPhase(5), 4900);
    const t5 = setTimeout(() => setPhase(6), 6300);
    const t6 = setTimeout(() => setPhase(7), 7300);
    const t7 = setTimeout(() => setPhase(1), 8400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [isActive, phase]);

  if (!isActive) return null;

  return (
    <div className="relative w-full h-[320px] max-w-[480px] pointer-events-none select-none overflow-visible">
      {/* ========================================================================= */}
      {/* PHASE 1 & 2: PHONE INTERFACE, PRODUCT SELECTION & ADD TO CART ARC */}
      {/* ========================================================================= */}
      {(phase === 1 || phase === 2 || phase === 3) && (
        <div className="absolute inset-0">
          {/* Simulated Mobile Phone Screen Canvas (Aligned over hero phone artwork) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-4 top-6 w-[170px] sm:w-[190px] h-[260px] rounded-[24px] border-2 border-blue-400/40 bg-gradient-to-b from-[#061947]/90 via-[#030e2e]/95 to-[#020719]/95 backdrop-blur-md p-3 shadow-[0_0_30px_rgba(20,85,217,0.3)] flex flex-col justify-between overflow-hidden"
          >
            {/* Phone Top Notch & Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <div className="h-1.5 w-10 bg-white/20 rounded-full mx-auto" />
              <div className="absolute right-3 top-2 flex items-center gap-1">
                <motion.div
                  animate={phase === 2 ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className="relative p-1 rounded-full bg-blue-500/30 text-cyan-300"
                >
                  <ShoppingCart className="h-3 w-3" />
                  {phase >= 2 && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 text-[8px] font-black text-slate-950 flex items-center justify-center animate-scale">
                      1
                    </span>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Product Card on Screen */}
            <div className="relative my-auto">
              <motion.div
                animate={
                  phase === 1
                    ? { borderColor: ["rgba(59,130,246,0.3)", "rgba(56,189,248,0.8)", "rgba(59,130,246,0.3)"] }
                    : {}
                }
                transition={{ duration: 1.2, repeat: Infinity }}
                className={`relative rounded-xl border bg-white/5 p-2 transition-all duration-300 ${
                  phase === 1 ? "border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.35)]" : "border-white/10"
                }`}
              >
                {/* 3D Vase / Item Thumbnail */}
                <div className="h-16 w-full rounded-lg bg-gradient-to-br from-blue-500/30 to-indigo-600/40 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    animate={phase === 1 ? { rotateY: [0, 180, 360] } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Box className="h-8 w-8 text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                  </motion.div>
                  {/* Selection Ring */}
                  {phase === 1 && (
                    <div className="absolute inset-0 rounded-lg border-2 border-cyan-400/80 animate-pulse pointer-events-none" />
                  )}
                </div>

                <div className="mt-1.5">
                  <div className="text-[10px] font-black text-white truncate">3D Spiral Vase</div>
                  <div className="text-[9px] font-bold text-amber-300">₹499</div>
                </div>

                {/* Add to cart button */}
                <motion.div
                  animate={phase === 2 ? { scale: [1, 0.94, 1], backgroundColor: "rgb(16, 185, 129)" } : {}}
                  className="mt-1.5 py-1 rounded-md bg-[#1455D9] text-center text-[9px] font-black text-white flex items-center justify-center gap-1 shadow-xs"
                >
                  {phase === 2 ? <Check className="h-2.5 w-2.5" /> : null}
                  <span>{phase === 1 ? "+ Add to Cart" : "Added to Cart"}</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom Checkout UI during Phase 3 */}
            {phase === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-emerald-500/20 border border-emerald-400/40 p-1.5 text-center"
              >
                <div className="flex items-center justify-center gap-1 text-[9px] font-black text-emerald-300">
                  <Check className="h-3 w-3" />
                  <span>1-Click Paid • ₹499</span>
                </div>
              </motion.div>
            )}

            {/* Natural Interactive Cursor Pointer (Phase 1 & 3) */}
            {phase === 1 && (
              <motion.div
                initial={{ x: 20, y: 200, opacity: 0 }}
                animate={{ x: 90, y: 165, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute text-cyan-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] z-30"
              >
                <MousePointer2 className="h-5 w-5 fill-cyan-400 text-slate-950" />
                {/* Finger Tap Ripple */}
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute -left-1 -top-1 h-6 w-6 rounded-full border border-cyan-300"
                />
              </motion.div>
            )}

            {phase === 3 && (
              <motion.div
                initial={{ x: 40, y: 160, opacity: 0 }}
                animate={{ x: 75, y: 220, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute text-cyan-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] z-30"
              >
                <MousePointer2 className="h-5 w-5 fill-cyan-400 text-slate-950" />
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -left-1 -top-1 h-6 w-6 rounded-full border border-emerald-400"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Physically Flying 3D Product Arc Into Cart (Phase 2) */}
          {phase === 2 && (
            <motion.div
              initial={{ x: 80, y: 120, scale: 1, opacity: 1 }}
              animate={{
                x: [80, 160, 240],
                y: [120, 40, 130],
                scale: [1, 1.2, 0.7],
                rotate: [0, 25, 360],
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute z-40 p-2 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.7)]"
            >
              <Box className="h-6 w-6" />
            </motion.div>
          )}

          {/* Plus One "+1" Pop Animation over Bag / Cart */}
          {phase === 2 && (
            <motion.div
              initial={{ x: 240, y: 110, scale: 0.5, opacity: 0 }}
              animate={{ x: 240, y: 70, scale: [0.5, 1.3, 1], opacity: [0, 1, 0] }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute z-40 text-xs font-black text-emerald-400 bg-emerald-950/80 border border-emerald-400 px-2 py-0.5 rounded-full shadow-lg"
            >
              +1 Item Added
            </motion.div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHASE 4: PACKING & SEALING THE PARCEL BOX */}
      {/* ========================================================================= */}
      {phase === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative flex flex-col items-center">
            {/* Ambient Packing Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-amber-500/20 blur-xl" />

            {/* 3D Parcel Box Container */}
            <div className="relative h-28 w-36 rounded-2xl bg-gradient-to-b from-[#ca8a04] via-[#b45309] to-[#78350f] border-2 border-amber-300/60 shadow-[0_15px_35px_rgba(0,0,0,0.6)] p-2 flex flex-col justify-between overflow-hidden">
              {/* Box Top Sealing Tape Glide */}
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                className="h-3 bg-amber-200/90 border-y border-amber-900/30 rounded-xs mx-auto shadow-inner"
              />

              {/* Box Front Logo & Tag */}
              <div className="text-center my-auto">
                <div className="flex items-center justify-center gap-1 text-[10px] font-black text-amber-950 bg-amber-300/80 px-2 py-0.5 rounded-md shadow-xs">
                  <Package className="h-3 w-3" />
                  <span>ACTE IDEA LAB</span>
                </div>
              </div>

              {/* Animated Shipping Label Stamp Effect */}
              <motion.div
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.35, ease: "backOut" }}
                className="bg-white text-slate-950 rounded-md p-1 flex items-center justify-between shadow-md"
              >
                <div className="space-y-0.5">
                  <div className="text-[7px] font-mono font-black">TRACK: #ACTE-892</div>
                  <div className="h-1 w-12 bg-slate-950 rounded-xs" />
                </div>
                <Check className="h-3 w-3 text-emerald-600" />
              </motion.div>
            </div>

            {/* Conveyor Motion Track */}
            <div className="mt-3 w-48 h-2 bg-slate-800 rounded-full border border-white/20 overflow-hidden relative">
              <motion.div
                animate={{ x: [-20, 40] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                className="h-full w-12 bg-cyan-400/50 rounded-full"
              />
            </div>
            <div className="mt-1 text-[10px] font-black text-amber-300 uppercase tracking-wider">
              📦 Sealed &amp; Quality Checked
            </div>
          </div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* PHASE 5: EXPRESS SHIPPING ALONG GLOWING ROUTE */}
      {/* ========================================================================= */}
      {phase === 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex flex-col justify-center px-4"
        >
          {/* Animated Waypoint Path */}
          <div className="relative w-full h-24 flex items-center">
            {/* Glowing Dotted Road / Path */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-cyan-400/60" />

            {/* Pulsing Destination Pin */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400">
              <MapPin className="h-6 w-6 fill-amber-400/30 animate-bounce" />
            </div>

            {/* Moving Delivery Truck with Motion Trails */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: [0, 140, 290] }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
              className="relative z-10 flex items-center gap-2"
            >
              {/* Wind Speed Motion Trails */}
              <div className="space-y-1 -mr-1">
                <div className="h-0.5 w-6 bg-cyan-300/80 rounded-full animate-pulse" />
                <div className="h-0.5 w-4 bg-cyan-300/50 rounded-full" />
              </div>

              {/* 3D Delivery Van */}
              <div className="flex items-center gap-1.5 bg-[#1455D9] text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-[0_10px_25px_rgba(20,85,217,0.7)] border border-blue-300/40">
                <Truck className="h-5 w-5 text-cyan-200" />
                <div>
                  <div className="text-[10px] leading-tight">ACTE EXPRESS</div>
                  <div className="text-[8px] text-cyan-200 font-mono">ON ROUTE</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center text-[10px] font-black text-cyan-300 tracking-wider">
            🚚 Out for Direct Campus Delivery
          </div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* PHASE 6 & 7: DOORSTEP ARRIVAL & ORDER CONFIRMED */}
      {/* ========================================================================= */}
      {(phase === 6 || phase === 7) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          {/* Delivered Parcel Box on Doorstep Platform */}
          <div className="relative flex flex-col items-center">
            {/* Ambient Emerald Halo */}
            <div className="absolute -inset-6 rounded-full bg-emerald-500/25 blur-2xl animate-pulse" />

            {/* Delivered Parcel */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative h-24 w-32 rounded-2xl bg-gradient-to-b from-[#ca8a04] via-[#b45309] to-[#78350f] border-2 border-amber-300/70 shadow-[0_15px_35px_rgba(0,0,0,0.7)] p-2 flex flex-col justify-between"
            >
              <div className="h-2.5 w-full bg-amber-200 rounded-xs mx-auto" />
              <div className="text-center my-auto text-[9px] font-black text-amber-950 bg-amber-300/90 py-0.5 rounded-sm">
                ACTE IDEA LAB
              </div>
              <div className="flex items-center justify-between text-[7px] font-mono text-white/90 bg-black/40 px-1 py-0.5 rounded-xs">
                <span>DELIVERED</span>
                <Check className="h-2.5 w-2.5 text-emerald-400" />
              </div>
            </motion.div>

            {/* Phase 7: Order Confirmed Success Badge */}
            {phase === 7 && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "backOut" }}
                className="mt-3 flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/60 backdrop-blur-md px-3 py-1 text-[11px] font-black text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                <div className="h-4 w-4 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span>✓ Order Delivered Successfully!</span>
                <Sparkles className="h-3 w-3 text-amber-300 animate-spin" />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
