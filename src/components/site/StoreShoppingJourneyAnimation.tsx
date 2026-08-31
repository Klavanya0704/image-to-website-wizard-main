import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, MousePointer2, Sparkles } from "lucide-react";

interface StoreShoppingJourneyAnimationProps {
  isActive: boolean;
}

export function StoreShoppingJourneyAnimation({ isActive }: StoreShoppingJourneyAnimationProps) {
  // Deterministic 5-Phase Storytelling Timeline (15-Second Continuous Loop):
  // Phase 1 (0.0s – 3.0s): Browse Phone & Cursor clicks "Add to Cart" + Cart badge pop
  // Phase 2 (3.0s – 6.0s): Flowing pulse to Checkout & Cursor clicks "Place Order" (Confirmed)
  // Phase 3 (6.0s – 9.5s): Flowing pulse to Conveyor + Rollers motion + Robotic Laser Scanner sweep
  // Phase 4 (9.5s – 13.0s): Glowing dotted route illumination & Delivery Van travel
  // Phase 5 (13.0s – 15.0s): Destination Pin pulse & "✓ Order Delivered Successfully!" celebration
  const [phase, setPhase] = useState<1 | 2 | 3 | 4 | 5>(1);

  useEffect(() => {
    if (!isActive) {
      setPhase(1);
      return;
    }

    const t1 = setTimeout(() => setPhase(2), 3000);
    const t2 = setTimeout(() => setPhase(3), 6000);
    const t3 = setTimeout(() => setPhase(4), 9500);
    const t4 = setTimeout(() => setPhase(5), 13000);
    const t5 = setTimeout(() => setPhase(1), 15000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isActive, phase]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-10">
      {/* ========================================================================= */}
      {/* PHASE 1: BROWSE PRODUCTS & ADD TO CART (0.0s – 3.0s) */}
      {/* ========================================================================= */}
      {phase === 1 && (
        <>
          {/* Gliding Cursor moving naturally to Phone "Add to Cart" Button */}
          <motion.div
            initial={{ left: "8%", top: "66%", opacity: 0 }}
            animate={{
              left: ["8%", "13%", "16.8%"],
              top: ["66%", "69%", "72%"],
              opacity: [0, 1, 1],
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-30 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-cyan-300"
          >
            <MousePointer2 className="h-5 w-5 fill-cyan-400 text-slate-950" />

            {/* Tactile Click Ripple on Add to Cart Button */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.8, 0], opacity: [0, 0.85, 0] }}
              transition={{ delay: 1.1, duration: 0.45 }}
              className="absolute -left-1 -top-1 h-7 w-7 rounded-full border-2 border-cyan-300 bg-cyan-400/25"
            />
          </motion.div>

          {/* Cart Badge Increment Pop (0 -> 1 Counter) */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale: [0.7, 1.3, 1],
              opacity: [0, 1, 1],
            }}
            transition={{ delay: 1.3, duration: 0.35, ease: "backOut" }}
            className="absolute left-[26.5%] top-[39.5%] flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-[9px] font-black text-white shadow-[0_0_10px_rgba(239,68,68,0.95)] z-20"
          >
            1
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* PHASE 2: PLACE ORDER & CHECKOUT CONFIRMATION (3.0s – 6.0s) */}
      {/* ========================================================================= */}
      {phase === 2 && (
        <>
          {/* Flowing Light Connection along '>>' arrow from Phone to Checkout */}
          <motion.div
            initial={{ left: "26%", top: "45%", opacity: 0 }}
            animate={{
              left: ["26%", "32%", "37.5%"],
              top: ["45%", "49%", "52%"],
              opacity: [0, 1, 0.85],
            }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,1)] z-20"
          />

          {/* Gliding Cursor moving naturally to Checkout "Place Order" Button */}
          <motion.div
            initial={{ left: "23%", top: "70%", opacity: 0 }}
            animate={{
              left: ["23%", "33%", "42.8%"],
              top: ["70%", "68%", "73%"],
              opacity: [0, 1, 1],
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-30 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-cyan-300"
          >
            <MousePointer2 className="h-5 w-5 fill-cyan-400 text-slate-950" />

            {/* Tactile Click Ripple on Place Order */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.8, 0], opacity: [0, 0.85, 0] }}
              transition={{ delay: 1.1, duration: 0.45 }}
              className="absolute -left-1 -top-1 h-7 w-7 rounded-full border-2 border-emerald-400 bg-emerald-400/25"
            />
          </motion.div>

          {/* Subtle Green Check Confirmation on Place Order Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.9, 0] }}
            transition={{ delay: 1.3, duration: 1.5 }}
            className="absolute left-[38%] bottom-[23%] px-2.5 py-0.5 rounded-lg bg-emerald-500 text-white flex items-center justify-center gap-1 shadow-[0_0_15px_rgba(16,185,129,0.8)] border border-emerald-300 text-[9px] font-black z-20"
          >
            <Check className="h-3 w-3 stroke-[3]" />
            <span>Confirmed</span>
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* PHASE 3: PACK & SHIP / CONVEYOR & ROBOTIC SCANNER (6.0s – 9.5s) */}
      {/* ========================================================================= */}
      {phase === 3 && (
        <>
          {/* Flowing Light Connection along '>>' arrow from Checkout to Conveyor */}
          <motion.div
            initial={{ left: "45%", top: "52%", opacity: 0 }}
            animate={{
              left: ["45%", "50%", "55%"],
              top: ["52%", "48%", "45%"],
              opacity: [0, 1, 0.85],
            }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,1)] z-20"
          />

          {/* Conveyor Rollers Operating Light Motion */}
          <div className="absolute left-[54%] bottom-[16.5%] w-[22%] h-[4%] overflow-hidden flex items-center justify-between opacity-75 z-10">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.div
                key={i}
                animate={{ x: [0, 22] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                className="h-full w-0.5 bg-cyan-300 rounded-full shadow-[0_0_6px_rgba(56,189,248,0.7)]"
              />
            ))}
          </div>

          {/* Robotic Scanner Overhead Cone Beam & Sweeping Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0.95, 0] }}
            transition={{ duration: 3.2, ease: "easeInOut" }}
            className="absolute left-[65%] top-[23%] w-[65px] sm:w-[85px] h-[120px] pointer-events-none flex flex-col items-center z-20"
          >
            {/* Blue Laser Cone */}
            <div className="w-full h-full bg-gradient-to-b from-cyan-400/70 via-cyan-400/25 to-transparent [clip-path:polygon(50%_0%,0%_100%,100%_100%)] blur-xs" />
            {/* Horizontal Sweeping Scanner Line */}
            <motion.div
              animate={{ y: [0, 65, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[26%] w-full h-[2px] bg-cyan-200 shadow-[0_0_12px_rgba(56,189,248,1)]"
            />
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* PHASE 4: DELIVERY VAN ON GLOWING HIGHWAY ROUTE (9.5s – 13.0s) */}
      {/* ========================================================================= */}
      {phase === 4 && (
        <>
          {/* Progressive Light Beacon along Curved Dotted Route */}
          <motion.div
            initial={{ left: "70%", top: "42%", opacity: 0 }}
            animate={{
              left: ["70%", "79%", "88%"],
              top: ["42%", "34%", "44%"],
              opacity: [0, 1, 0.9],
            }}
            transition={{ duration: 2.6, ease: "easeInOut" }}
            className="absolute h-3.5 w-3.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(56,189,248,1)] z-20"
          />

          {/* Delivery Van Headlight Light Beams */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0.85, 0] }}
            transition={{ duration: 3.0 }}
            className="absolute right-[0%] bottom-[20%] w-[110px] h-[45px] pointer-events-none z-20"
          >
            <div className="w-full h-full bg-gradient-to-r from-amber-300/45 via-amber-200/15 to-transparent blur-md [clip-path:polygon(0%_40%,100%_0%,100%_100%,0%_60%)]" />
          </motion.div>

          {/* Speed Streaks Behind Van */}
          <motion.div
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="absolute right-[12%] bottom-[26%] w-[7%] h-[2px] bg-cyan-300/70 rounded-full blur-xs shadow-[0_0_8px_rgba(56,189,248,1)] z-20"
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* PHASE 5: DESTINATION PIN & "✓ ORDER DELIVERED" (13.0s – 15.0s) */}
      {/* ========================================================================= */}
      {stage === 5 && (
        <>
          {/* Location Pin Radar Wave */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.6, 2.2],
              opacity: [0, 0.85, 0],
            }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute right-[6%] top-[24%] h-12 w-12 rounded-full border-2 border-amber-300 bg-amber-400/20 shadow-[0_0_25px_rgba(251,191,36,0.8)] z-20"
          />

          {/* Clean Emerald "✓ Order Delivered Successfully!" Confirmation Capsule */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "backOut" }}
            className="absolute right-[3%] bottom-[10%] px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 text-white font-black text-[10px] sm:text-[11px] shadow-[0_0_20px_rgba(16,185,129,0.9)] border border-white/90 flex items-center gap-1.5 z-30"
          >
            <div className="h-4 w-4 rounded-full bg-white text-emerald-600 flex items-center justify-center">
              <Check className="h-3 w-3 stroke-[3.5]" />
            </div>
            <span>Order Delivered Successfully!</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin" />
          </motion.div>
        </>
      )}
    </div>
  );
}
