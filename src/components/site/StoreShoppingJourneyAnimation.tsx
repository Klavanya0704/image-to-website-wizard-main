import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface StoreShoppingJourneyAnimationProps {
  isActive: boolean;
}

export function StoreShoppingJourneyAnimation({ isActive }: StoreShoppingJourneyAnimationProps) {
  // 5 Storytelling Phases (20-Second Continuous Cycle):
  // Phase 1 (0.0s – 3.5s): Phone "Add to Cart" click & Cart badge pop
  // Phase 2 (3.5s – 7.0s): Dotted path travels to Checkout & "Place Order" click
  // Phase 3 (7.0s – 11.5s): Conveyor laser scanner sweeps over ACTE boxes
  // Phase 4 (11.5s – 16.5s): Delivery van headlights & route travel
  // Phase 5 (16.5s – 20.0s): Destination pin activation & arrival sparkles
  const [phase, setPhase] = useState<1 | 2 | 3 | 4 | 5>(1);

  useEffect(() => {
    if (!isActive) {
      setPhase(1);
      return;
    }

    const t1 = setTimeout(() => setPhase(2), 3500);
    const t2 = setTimeout(() => setPhase(3), 7000);
    const t3 = setTimeout(() => setPhase(4), 11500);
    const t4 = setTimeout(() => setPhase(5), 16500);
    const t5 = setTimeout(() => setPhase(1), 20000);

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
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-15">
      {/* ========================================================================= */}
      {/* PHASE 1: PHONE "ADD TO CART" & CART BADGE PULSE (0.0s – 3.5s) */}
      {/* ========================================================================= */}
      {phase === 1 && (
        <>
          {/* Cyan Click Ripple over Phone "Add to Cart" Cursor */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: [0.6, 2.2, 0],
              opacity: [0, 0.9, 0],
            }}
            transition={{ duration: 1.4, repeat: 1, ease: "easeOut" }}
            className="absolute left-[19%] sm:left-[21%] lg:left-[22.5%] bottom-[23%] sm:bottom-[24%] h-12 w-12 rounded-full border-2 border-cyan-300 bg-cyan-400/30 shadow-[0_0_20px_rgba(56,189,248,0.9)]"
          />

          {/* Cart Icon Notification Glow */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: [0.9, 1.4, 1],
              opacity: [0, 1, 0.8],
            }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute left-[24.5%] sm:left-[25.8%] lg:left-[27.2%] top-[40%] sm:top-[38%] h-8 w-8 rounded-full bg-red-500/40 blur-sm"
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* PHASE 2: ROUTE TO CHECKOUT & "PLACE ORDER" CLICK (3.5s – 7.0s) */}
      {/* ========================================================================= */}
      {phase === 2 && (
        <>
          {/* Flowing Light Pulse from Phone to Checkout along the Dotted Route */}
          <motion.div
            initial={{ left: "26%", top: "44%", opacity: 0 }}
            animate={{
              left: ["26%", "32%", "38%"],
              top: ["44%", "50%", "52%"],
              opacity: [0, 1, 0.8],
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(56,189,248,1)]"
          />

          {/* Cyan Click Ripple over Checkout "Place Order" Cursor */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: [0.6, 2.2, 0],
              opacity: [0, 0.9, 0],
            }}
            transition={{ delay: 1.0, duration: 1.4, ease: "easeOut" }}
            className="absolute left-[38.5%] sm:left-[41.5%] lg:left-[43.5%] bottom-[21%] sm:bottom-[22%] h-12 w-12 rounded-full border-2 border-cyan-300 bg-cyan-400/30 shadow-[0_0_20px_rgba(56,189,248,0.9)]"
          />

          {/* Checkout Confirmed Green Pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ delay: 1.8, duration: 1.0 }}
            className="absolute left-[33%] sm:left-[36%] lg:left-[38%] bottom-[20%] w-[12%] h-[10%] rounded-xl bg-emerald-400/30 blur-md"
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* PHASE 3: CONVEYOR BELT SCANNER & BOX GLIDE (7.0s – 11.5s) */}
      {/* ========================================================================= */}
      {phase === 3 && (
        <>
          {/* Flowing Light Pulse to Conveyor */}
          <motion.div
            initial={{ left: "44%", top: "54%", opacity: 0 }}
            animate={{
              left: ["44%", "50%", "57%"],
              top: ["54%", "48%", "45%"],
              opacity: [0, 1, 0.8],
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(56,189,248,1)]"
          />

          {/* Overhead Cyan Laser Scanner Beam Sweeping across ACTE boxes */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
              opacity: [0, 0.9, 0.9, 0],
              scaleY: [0.2, 1, 1, 0.2],
            }}
            transition={{ duration: 3.2, repeat: 1, ease: "easeInOut" }}
            className="absolute left-[62%] sm:left-[64%] lg:left-[66%] top-[23%] sm:top-[24%] w-[90px] sm:w-[120px] h-[140px] pointer-events-none flex flex-col items-center"
          >
            {/* Cone Light Glow */}
            <div className="w-full h-full bg-gradient-to-b from-cyan-400/60 via-cyan-400/20 to-transparent blur-xs [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" />
            {/* Horizontal Laser Scanning Line */}
            <motion.div
              animate={{ y: [0, 80, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] w-full h-[2px] bg-cyan-200 shadow-[0_0_12px_rgba(56,189,248,1)]"
            />
          </motion.div>

          {/* Active Conveyor Roller Lights */}
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.0, repeat: Infinity }}
            className="absolute left-[52%] sm:left-[55%] lg:left-[57%] bottom-[16%] sm:bottom-[17%] w-[22%] h-[6%] bg-cyan-400/15 rounded-full blur-xs"
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* PHASE 4: DELIVERY VAN ON GLOWING ROUTE (11.5s – 16.5s) */}
      {/* ========================================================================= */}
      {phase === 4 && (
        <>
          {/* Flowing Highway Light along Curved Dotted Path */}
          <motion.div
            initial={{ left: "68%", top: "42%", opacity: 0 }}
            animate={{
              left: ["68%", "76%", "85%"],
              top: ["42%", "34%", "45%"],
              opacity: [0, 1, 0.8],
            }}
            transition={{ duration: 1.6, repeat: 2, ease: "easeInOut" }}
            className="absolute h-3.5 w-3.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(56,189,248,1)]"
          />

          {/* Delivery Van Headlight Light Beams */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0.85, 0] }}
            transition={{ duration: 4.2 }}
            className="absolute right-[0%] sm:right-[1%] lg:right-[2%] bottom-[20%] sm:bottom-[21%] w-[130px] h-[45px] pointer-events-none"
          >
            {/* Yellow Headlight Glow */}
            <div className="w-full h-full bg-gradient-to-r from-amber-300/40 via-amber-200/15 to-transparent blur-md [clip-path:polygon(0%_40%,100%_0%,100%_100%,0%_60%)]" />
          </motion.div>

          {/* Motion Speed Trails */}
          <motion.div
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute right-[12%] sm:right-[14%] bottom-[26%] w-[8%] h-[3px] bg-cyan-300/60 rounded-full blur-xs"
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* PHASE 5: DESTINATION PIN ACTIVATION & ARRIVAL SPARKLES (16.5s – 20.0s) */}
      {/* ========================================================================= */}
      {phase === 5 && (
        <>
          {/* Concentric Radar Wave around Location Pin */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.8, 2.4],
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 1.6, repeat: 1, ease: "easeOut" }}
            className="absolute right-[6%] sm:right-[7.5%] lg:right-[9%] top-[25%] sm:top-[26%] h-14 w-14 rounded-full border-2 border-amber-300 bg-amber-400/20 shadow-[0_0_25px_rgba(251,191,36,0.8)]"
          />

          {/* Golden Celebration Sparkles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute right-[7%] sm:right-[8.5%] lg:right-[10%] top-[27%] sm:top-[28%]"
          >
            <Sparkles className="h-6 w-6 text-amber-300 animate-spin [animation-duration:4s] drop-shadow-[0_0_10px_rgba(251,191,36,1)]" />
          </motion.div>
        </>
      )}
    </div>
  );
}
