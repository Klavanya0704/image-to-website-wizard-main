import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface StoreShoppingJourneyAnimationProps {
  isActive: boolean;
}

export function StoreShoppingJourneyAnimation({ isActive }: StoreShoppingJourneyAnimationProps) {
  // Single Source of Truth for the 4-Stage Progress Header (16-Second Timer):
  // Stage 1 (0s–4s): 1 Browse
  // Stage 2 (4s–8s): 2 Place Order
  // Stage 3 (8s–12s): 3 Pack & Ship
  // Stage 4 (12s–16s): 4 Delivered
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
      {/* SINGLE CLEAN STAGE NAVIGATION HEADER (EXACTLY ONE ROW, ZERO OBJECT OVERLAYS) */}
      {/* ========================================================================= */}
      <div className="absolute top-4 sm:top-5 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30 max-w-[620px] mx-auto">
        {/* Step 1: Browse */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div
            className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black transition-all duration-300 ${
              stage === 1
                ? "bg-cyan-400 text-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.95)] scale-110"
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
                ? "bg-cyan-400 text-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.95)] scale-110"
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
                ? "bg-cyan-400 text-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.95)] scale-110"
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
                ? "bg-cyan-400 text-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.95)] scale-110"
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
    </div>
  );
}
