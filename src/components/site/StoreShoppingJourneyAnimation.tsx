import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, MousePointer2, Sparkles } from "lucide-react";

interface StoreShoppingJourneyAnimationProps {
  isActive: boolean;
}

export function StoreShoppingJourneyAnimation({ isActive }: StoreShoppingJourneyAnimationProps) {
  // Deterministic 5-Stage Storytelling Flow (15-Second Continuous Loop):
  // Stage 1 (0.0s – 3.0s): Phone Browsing & Cursor clicks "Add to Cart" + Cart badge pop
  // Stage 2 (3.0s – 6.0s): Cursor moves to Checkout & clicks "Place Order" (Confirmed state)
  // Stage 3 (6.0s – 9.5s): Conveyor belt roller motion + Overhead laser scanner sweep
  // Stage 4 (9.5s – 13.0s): Glowing route highway illumination & Delivery van travel
  // Stage 5 (13.0s – 15.0s): Location Pin pulse & subtle "✓ Order Delivered" indicator
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1);

  useEffect(() => {
    if (!isActive) {
      setStage(1);
      return;
    }

    const t1 = setTimeout(() => setStage(2), 3000);
    const t2 = setTimeout(() => setStage(3), 6000);
    const t3 = setTimeout(() => setStage(4), 9500);
    const t4 = setTimeout(() => setStage(5), 13000);
    const t5 = setTimeout(() => setStage(1), 15000);

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
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-10">
      {/* ========================================================================= */}
      {/* STAGE 1: BROWSE & ADD TO CART INTERACTION (0.0s – 3.0s) */}
      {/* ========================================================================= */}
      {stage === 1 && (
        <>
          {/* Gliding Cursor over the Smartphone "Add to Cart" Button */}
          <motion.div
            initial={{ left: "14%", top: "68%", opacity: 0 }}
            animate={{
              left: ["14%", "18%", "21%"],
              top: ["68%", "70%", "72.5%"],
              opacity: [0, 1, 1],
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-cyan-300"
          >
            <MousePointer2 className="h-5 w-5 fill-cyan-400 text-slate-950" />

            {/* Subtle Button Click Ripple */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.6, 0], opacity: [0, 0.8, 0] }}
              transition={{ delay: 1.1, duration: 0.45 }}
              className="absolute -left-1 -top-1 h-7 w-7 rounded-full border-2 border-cyan-300 bg-cyan-400/25"
            />
          </motion.div>

          {/* Cart Badge Increment Pop (0 -> 1 Counter) */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale: [0.7, 1.25, 1],
              opacity: [0, 1, 1],
            }}
            transition={{ delay: 1.3, duration: 0.35, ease: "backOut" }}
            className="absolute left-[26.9%] sm:left-[27.4%] top-[40%] sm:top-[39%] flex items-center justify-center h-3.5 w-3.5 rounded-full bg-red-500 text-[8px] font-black text-white shadow-[0_0_8px_rgba(239,68,68,0.9)] z-20"
          >
            1
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* STAGE 2: PLACE ORDER INTERACTION (3.0s – 6.0s) */}
      {/* ========================================================================= */}
      {stage === 2 && (
        <>
          {/* Light Pulse traveling along Dotted Route from Phone to Checkout */}
          <motion.div
            initial={{ left: "27.5%", top: "45%", opacity: 0 }}
            animate={{
              left: ["27.5%", "33%", "39%"],
              top: ["45%", "52%", "55%"],
              opacity: [0, 1, 0.8],
            }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,1)] z-20"
          />

          {/* Gliding Cursor over Checkout "Place Order" Button */}
          <motion.div
            initial={{ left: "23%", top: "72%", opacity: 0 }}
            animate={{
              left: ["23%", "33%", "42.5%"],
              top: ["72%", "70%", "74%"],
              opacity: [0, 1, 1],
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-cyan-300"
          >
            <MousePointer2 className="h-5 w-5 fill-cyan-400 text-slate-950" />

            {/* Subtle Button Click Ripple */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.6, 0], opacity: [0, 0.8, 0] }}
              transition={{ delay: 1.1, duration: 0.45 }}
              className="absolute -left-1 -top-1 h-7 w-7 rounded-full border-2 border-emerald-400 bg-emerald-400/25"
            />
          </motion.div>

          {/* Subtle Green Check Confirmation Glow over Place Order Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0.85, 0] }}
            transition={{ delay: 1.3, duration: 1.5 }}
            className="absolute left-[34%] sm:left-[36%] lg:left-[37.5%] bottom-[22%] sm:bottom-[23%] px-2 py-0.5 rounded-lg bg-emerald-500/90 text-white flex items-center justify-center gap-1 shadow-[0_0_15px_rgba(16,185,129,0.7)] border border-emerald-300 text-[9px] font-black z-20"
          >
            <Check className="h-3 w-3 stroke-[3]" />
            <span>Confirmed</span>
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* STAGE 3: CONVEYOR BELT MOVEMENT & LASER SCANNER SWEEP (6.0s – 9.5s) */}
      {/* ========================================================================= */}
      {stage === 3 && (
        <>
          {/* Conveyor Roller Motion Shimmer */}
          <div className="absolute left-[52%] sm:left-[54%] lg:left-[56%] bottom-[16.5%] w-[20%] h-[4%] overflow-hidden flex items-center justify-between opacity-70 z-10">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.div
                key={i}
                animate={{ x: [0, 20] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                className="h-full w-0.5 bg-cyan-300 rounded-full shadow-[0_0_6px_rgba(56,189,248,0.7)]"
              />
            ))}
          </div>

          {/* Overhead Cyan Laser Scanner Beam Sweeping across Boxes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.9, 0] }}
            transition={{ duration: 3.2, ease: "easeInOut" }}
            className="absolute left-[64%] sm:left-[66%] lg:left-[67%] top-[24%] w-[65px] sm:w-[85px] h-[125px] pointer-events-none flex flex-col items-center z-20"
          >
            {/* Laser Cone Glow */}
            <div className="w-full h-full bg-gradient-to-b from-cyan-400/60 via-cyan-400/20 to-transparent [clip-path:polygon(50%_0%,0%_100%,100%_100%)] blur-xs" />
            {/* Horizontal Sweeping Laser Line */}
            <motion.div
              animate={{ y: [0, 65, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[28%] w-full h-[2px] bg-cyan-200 shadow-[0_0_12px_rgba(56,189,248,1)]"
            />
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* STAGE 4: EXPRESS DELIVERY HIGHWAY ROUTE ILLUMINATION (9.5s – 13.0s) */}
      {/* ========================================================================= */}
      {stage === 4 && (
        <>
          {/* Progressive Route Illumination Beacon */}
          <motion.div
            initial={{ left: "70%", top: "42%", opacity: 0 }}
            animate={{
              left: ["70%", "78%", "86%"],
              top: ["42%", "34%", "44%"],
              opacity: [0, 1, 0.85],
            }}
            transition={{ duration: 2.6, ease: "easeInOut" }}
            className="absolute h-3.5 w-3.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(56,189,248,1)] z-20"
          />

          {/* Delivery Van Headlight Light Beams */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0.85, 0] }}
            transition={{ duration: 3.0 }}
            className="absolute right-[0%] sm:right-[1%] lg:right-[2%] bottom-[20%] w-[120px] h-[45px] pointer-events-none z-20"
          >
            <div className="w-full h-full bg-gradient-to-r from-amber-300/45 via-amber-200/15 to-transparent blur-md [clip-path:polygon(0%_40%,100%_0%,100%_100%,0%_60%)]" />
          </motion.div>

          {/* Speed Streaks Behind Van */}
          <motion.div
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="absolute right-[12%] sm:right-[14%] bottom-[26%] w-[8%] h-[2px] bg-cyan-300/70 rounded-full blur-xs shadow-[0_0_8px_rgba(56,189,248,1)] z-20"
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* STAGE 5: DESTINATION PIN ACTIVATION & ORDER DELIVERED (13.0s – 15.0s) */}
      {/* ========================================================================= */}
      {stage === 5 && (
        <>
          {/* Location Pin Radar Pulse */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.6, 2.2],
              opacity: [0, 0.85, 0],
            }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute right-[6%] sm:right-[7.5%] lg:right-[8.5%] top-[24%] h-12 w-12 rounded-full border-2 border-amber-300 bg-amber-400/20 shadow-[0_0_25px_rgba(251,191,36,0.8)] z-20"
          />

          {/* Clean Emerald Delivered Confirmation Capsule Beside Pin */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "backOut" }}
            className="absolute right-[3%] sm:right-[4.5%] lg:right-[5.5%] top-[16%] px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 text-white font-black text-[10px] shadow-[0_0_20px_rgba(16,185,129,0.8)] border border-white flex items-center gap-1.5 z-30"
          >
            <div className="h-3.5 w-3.5 rounded-full bg-white text-emerald-600 flex items-center justify-center">
              <Check className="h-2.5 w-2.5 stroke-[3.5]" />
            </div>
            <span>✓ Order Delivered</span>
            <Sparkles className="h-3 w-3 text-amber-300 animate-spin" />
          </motion.div>
        </>
      )}
    </div>
  );
}
