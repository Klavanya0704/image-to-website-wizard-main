import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MousePointer2, Sparkles } from "lucide-react";

interface StoreShoppingJourneyAnimationProps {
  isActive: boolean;
}

export function StoreShoppingJourneyAnimation({ isActive }: StoreShoppingJourneyAnimationProps) {
  // Deterministic 4-Stage Storytelling Timeline (15-Second Continuous Loop):
  // Stage 1 (0.0s – 3.2s): Step 1 Browse -> Cursor clicks "Add to Cart" + Cart badge pop (0 -> 1)
  // Stage 2 (3.2s – 6.5s): Step 2 Place Order -> Connection flows to Checkout & Cursor clicks "Place Order" (Confirmed)
  // Stage 3 (6.5s – 10.5s): Step 3 Pack & Ship -> Connection flows to Conveyor + Rollers & Robotic Laser Scanner sweep
  // Stage 4 (10.5s – 15.0s): Step 4 Delivered -> Van travels route + Location Pin pulse + "Order Delivered Successfully!"
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    if (!isActive) {
      setStage(1);
      return;
    }

    const t1 = setTimeout(() => setStage(2), 3200);
    const t2 = setTimeout(() => setStage(3), 6500);
    const t3 = setTimeout(() => setStage(4), 10500);
    const t4 = setTimeout(() => setStage(1), 15000);

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
      {/* TOP 4-STEP GLOWING JOURNEY PROGRESS PILLS */}
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
              transition={{ duration: 0.8, ease: "easeInOut" }}
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
              transition={{ duration: 0.8, ease: "easeInOut" }}
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
              transition={{ duration: 0.8, ease: "easeInOut" }}
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
      {/* STAGE 1: BROWSE PRODUCTS & ADD TO CART (0.0s – 3.2s) */}
      {/* ========================================================================= */}
      {stage === 1 && (
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
      {/* STAGE 2: PLACE ORDER & CHECKOUT CONFIRMATION (3.2s – 6.5s) */}
      {/* ========================================================================= */}
      {stage === 2 && (
        <>
          {/* Flowing Light Connection along '>>' chevron arrow from Phone to Checkout */}
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
      {/* STAGE 3: PACK & SHIP / CONVEYOR & ROBOTIC SCANNER (6.5s – 10.5s) */}
      {/* ========================================================================= */}
      {stage === 3 && (
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
      {/* STAGE 4: DELIVERY VAN ON GLOWING HIGHWAY ROUTE (10.5s – 15.0s) */}
      {/* ========================================================================= */}
      {stage === 4 && (
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
