import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, MousePointer2, Sparkles } from "lucide-react";

import animTruck from "@/assets/anim_truck.png";

interface StoreShoppingJourneyAnimationProps {
  isActive: boolean;
}

export function StoreShoppingJourneyAnimation({ isActive }: StoreShoppingJourneyAnimationProps) {
  // Deterministic 4-Stage Synchronized Timeline (16-Second Continuous Loop):
  // 1. BROWSE (0s – 4s): "1 Browse" active, Phone aura focus, cursor clicks Add to Cart, cart badge pops 0 -> 1
  // 2. PLACE ORDER (4s – 8s): "2 Place Order" active, Checkout aura focus, cursor clicks Place Order, Confirmed checkmark
  // 3. PACK & SHIP (8s – 12s): "3 Pack & Ship" active, Conveyor rollers move, robotic laser sweeps boxes
  // 4. DELIVERED (12s – 16s): "4 Delivered" active, Truck physically drives along route to pin, headlights, radar waves, Delivered badge
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    if (!isActive) {
      setStage(1);
      return;
    }

    const t1 = setTimeout(() => setStage(2), 4000);
    const t2 = setTimeout(() => setStage(3), 8000);
    const t3 = setTimeout(() => setStage(4), 12000);
    const t4 = setTimeout(() => setStage(1), 16000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isActive, stage]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-10">
      {/* ========================================================================= */}
      {/* SINGLE STAGE NAVIGATION ROW (EXACTLY ONE SOURCE OF TRUTH) */}
      {/* ========================================================================= */}
      <div className="absolute top-4 sm:top-5 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30 max-w-[620px] mx-auto">
        {/* Step 1: Browse */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div
            className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black transition-all duration-300 ${
              stage === 1
                ? "bg-cyan-400 text-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.9)] scale-110"
                : "bg-blue-900/60 text-cyan-300 border border-cyan-500/30"
            }`}
          >
            1
          </div>
          <span
            className={`text-[10px] sm:text-xs font-bold tracking-wide transition-colors duration-300 ${
              stage === 1 ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "text-slate-400"
            }`}
          >
            Browse
          </span>
        </div>

        {/* Connector 1-2 */}
        <div className="flex-1 mx-2 sm:mx-3 h-[1px] border-t border-dashed border-cyan-500/40 relative">
          {stage === 2 && (
            <motion.div
              initial={{ left: "0%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute -top-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,1)]"
            />
          )}
        </div>

        {/* Step 2: Place Order */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div
            className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black transition-all duration-300 ${
              stage === 2
                ? "bg-cyan-400 text-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.9)] scale-110"
                : "bg-blue-900/60 text-cyan-300 border border-cyan-500/30"
            }`}
          >
            2
          </div>
          <span
            className={`text-[10px] sm:text-xs font-bold tracking-wide transition-colors duration-300 ${
              stage === 2 ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "text-slate-400"
            }`}
          >
            Place Order
          </span>
        </div>

        {/* Connector 2-3 */}
        <div className="flex-1 mx-2 sm:mx-3 h-[1px] border-t border-dashed border-cyan-500/40 relative">
          {stage === 3 && (
            <motion.div
              initial={{ left: "0%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute -top-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,1)]"
            />
          )}
        </div>

        {/* Step 3: Pack & Ship */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div
            className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black transition-all duration-300 ${
              stage === 3
                ? "bg-cyan-400 text-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.9)] scale-110"
                : "bg-blue-900/60 text-cyan-300 border border-cyan-500/30"
            }`}
          >
            3
          </div>
          <span
            className={`text-[10px] sm:text-xs font-bold tracking-wide transition-colors duration-300 ${
              stage === 3 ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "text-slate-400"
            }`}
          >
            Pack &amp; Ship
          </span>
        </div>

        {/* Connector 3-4 */}
        <div className="flex-1 mx-2 sm:mx-3 h-[1px] border-t border-dashed border-cyan-500/40 relative">
          {stage === 4 && (
            <motion.div
              initial={{ left: "0%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute -top-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,1)]"
            />
          )}
        </div>

        {/* Step 4: Delivered */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div
            className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black transition-all duration-300 ${
              stage === 4
                ? "bg-cyan-400 text-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.9)] scale-110"
                : "bg-blue-900/60 text-cyan-300 border border-cyan-500/30"
            }`}
          >
            4
          </div>
          <span
            className={`text-[10px] sm:text-xs font-bold tracking-wide transition-colors duration-300 ${
              stage === 4 ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "text-slate-400"
            }`}
          >
            Delivered
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. BROWSE — 0s to 4s: Phone Aura Focus & Cursor Clicks Add to Cart */}
      {/* ========================================================================= */}
      {stage === 1 && (
        <>
          {/* Subtle Glowing Aura Focus around Smartphone (No duplicate image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: [0, 0.5, 0.25], scale: [0.98, 1.03, 1] }}
            transition={{ duration: 2.0, repeat: Infinity, repeatType: "reverse" }}
            className="absolute left-[3.5%] top-[17%] w-[25%] h-[75%] rounded-[28px] border-2 border-cyan-400/60 shadow-[0_0_24px_rgba(34,211,238,0.6)] pointer-events-none z-15"
          />

          {/* Cursor moving naturally to Phone "Add to Cart" Button */}
          <motion.div
            initial={{ left: "8%", top: "66%", opacity: 0 }}
            animate={{
              left: ["8%", "13%", "16.8%"],
              top: ["66%", "69%", "72%"],
              opacity: [0, 1, 1],
            }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-30 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-cyan-300"
          >
            <MousePointer2 className="h-5 w-5 fill-cyan-400 text-slate-950" />

            {/* Tactile Click Ripple on Add to Cart Button */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.8, 0], opacity: [0, 0.85, 0] }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="absolute -left-1 -top-1 h-7 w-7 rounded-full border-2 border-cyan-300 bg-cyan-400/25"
            />
          </motion.div>

          {/* Cart Badge Increment Pop (0 -> 1 Counter) */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale: [0.7, 1.35, 1],
              opacity: [0, 1, 1],
            }}
            transition={{ delay: 1.5, duration: 0.4, ease: "backOut" }}
            className="absolute left-[26.5%] top-[39.5%] flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-[9px] font-black text-white shadow-[0_0_10px_rgba(239,68,68,0.95)] z-20"
          >
            1
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 2. PLACE ORDER — 4s to 8s: Pulse to Checkout & Cursor Clicks Place Order */}
      {/* ========================================================================= */}
      {stage === 2 && (
        <>
          {/* Subtle Glowing Aura Focus around Checkout Panel (No duplicate image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: [0, 0.5, 0.25], scale: [0.98, 1.03, 1] }}
            transition={{ duration: 2.0, repeat: Infinity, repeatType: "reverse" }}
            className="absolute left-[30%] top-[21%] w-[26%] h-[68%] rounded-[24px] border-2 border-cyan-400/60 shadow-[0_0_24px_rgba(34,211,238,0.6)] pointer-events-none z-15"
          />

          {/* Flowing Connection Light along '>>' chevron from Phone to Checkout */}
          <motion.div
            initial={{ left: "26%", top: "45%", opacity: 0 }}
            animate={{
              left: ["26%", "32%", "37.5%"],
              top: ["45%", "49%", "52%"],
              opacity: [0, 1, 0.85],
            }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,1)] z-20"
          />

          {/* Cursor moving naturally to Checkout "Place Order" Button */}
          <motion.div
            initial={{ left: "23%", top: "70%", opacity: 0 }}
            animate={{
              left: ["23%", "33%", "42.8%"],
              top: ["70%", "68%", "73%"],
              opacity: [0, 1, 1],
            }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-30 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-cyan-300"
          >
            <MousePointer2 className="h-5 w-5 fill-cyan-400 text-slate-950" />

            {/* Tactile Click Ripple on Place Order */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.8, 0], opacity: [0, 0.85, 0] }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="absolute -left-1 -top-1 h-7 w-7 rounded-full border-2 border-emerald-400 bg-emerald-400/25"
            />
          </motion.div>

          {/* Green Check Confirmation on Place Order Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0.95, 0] }}
            transition={{ delay: 1.5, duration: 2.0 }}
            className="absolute left-[38%] bottom-[23%] px-2.5 py-0.5 rounded-lg bg-emerald-500 text-white flex items-center justify-center gap-1 shadow-[0_0_15px_rgba(16,185,129,0.8)] border border-emerald-300 text-[9px] font-black z-20"
          >
            <Check className="h-3 w-3 stroke-[3]" />
            <span>Confirmed</span>
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 3. PACK & SHIP — 8s to 12s: Conveyor Rollers & Overhead Scanner Laser */}
      {/* ========================================================================= */}
      {stage === 3 && (
        <>
          {/* Flowing Connection Light along '>>' chevron from Checkout to Conveyor */}
          <motion.div
            initial={{ left: "45%", top: "52%", opacity: 0 }}
            animate={{
              left: ["45%", "50%", "55%"],
              top: ["52%", "48%", "45%"],
              opacity: [0, 1, 0.85],
            }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,1)] z-20"
          />

          {/* Conveyor Rollers Continuous Physical Motion */}
          <div className="absolute left-[54%] bottom-[16.5%] w-[22%] h-[4%] overflow-hidden flex items-center justify-between opacity-85 z-10">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.div
                key={i}
                animate={{ x: [0, 22] }}
                transition={{ duration: 0.45, repeat: Infinity, ease: "linear" }}
                className="h-full w-0.5 bg-cyan-300 rounded-full shadow-[0_0_6px_rgba(56,189,248,0.7)]"
              />
            ))}
          </div>

          {/* Moving Laser Light Pulse along the Boxes */}
          <motion.div
            initial={{ left: "58%", opacity: 0 }}
            animate={{ left: ["58%", "68%", "76%"], opacity: [0, 0.85, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="absolute top-[48%] h-10 w-4 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent blur-xs z-15"
          />

          {/* Overhead Scanner Blue Laser Cone & Sweeping Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0.95, 0] }}
            transition={{ duration: 3.6, ease: "easeInOut" }}
            className="absolute left-[65%] top-[23%] w-[65px] sm:w-[85px] h-[120px] pointer-events-none flex flex-col items-center z-20"
          >
            {/* Blue Laser Cone */}
            <div className="w-full h-full bg-gradient-to-b from-cyan-400/70 via-cyan-400/25 to-transparent [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" />
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
      {/* 4. DELIVERED — 12s to 16s: Truck Physically Drives to Destination Pin */}
      {/* ========================================================================= */}
      {stage === 4 && (
        <>
          {/* Progressive Light Beacon along Curved Highway Route */}
          <motion.div
            initial={{ left: "70%", top: "42%", opacity: 0 }}
            animate={{
              left: ["70%", "79%", "88%"],
              top: ["42%", "34%", "44%"],
              opacity: [0, 1, 0.9],
            }}
            transition={{ duration: 3.0, ease: "easeInOut" }}
            className="absolute h-3.5 w-3.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(56,189,248,1)] z-20"
          />

          {/* Truck Physical Travel along Delivery Highway Path */}
          <motion.div
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{
              x: [0, 30, 65, 95],
              y: [0, -14, -28, -16],
              scale: [1, 0.97, 0.93, 0.90],
            }}
            transition={{ duration: 3.5, ease: [0.25, 1, 0.5, 1] }}
            className="absolute left-[77%] top-[39%] w-[22%] h-[38%] z-25 origin-center pointer-events-none"
          >
            <img
              src={animTruck}
              alt="ACTE Delivery Truck in motion"
              className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_0_18px_rgba(56,189,248,0.9)]"
              style={{ imageRendering: "-webkit-optimize-contrast" }}
            />

            {/* Dynamic Headlights attached to Moving Truck */}
            <div className="absolute right-[-15%] bottom-[15%] w-[80px] h-[35px] pointer-events-none bg-gradient-to-r from-amber-300/60 via-amber-200/20 to-transparent [clip-path:polygon(0%_40%,100%_0%,100%_100%,0%_60%)]" />

            {/* Dynamic Speed Trails attached behind Moving Truck */}
            <motion.div
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute left-[-20%] bottom-[20%] w-[35px] h-[3px] bg-cyan-300/80 rounded-full shadow-[0_0_10px_rgba(56,189,248,1)]"
            />
          </motion.div>

          {/* Location Pin Radar Waves */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.6, 2.2],
              opacity: [0, 0.85, 0],
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute right-[6%] top-[24%] h-12 w-12 rounded-full border-2 border-amber-300 bg-amber-400/20 shadow-[0_0_25px_rgba(251,191,36,0.8)] z-20"
          />

          {/* "✓ Order Delivered Successfully!" Celebration Capsule */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "backOut" }}
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
