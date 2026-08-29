import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MousePointer2, Sparkles, Truck } from "lucide-react";

interface StoreShoppingJourneyAnimationProps {
  isActive: boolean;
}

export function StoreShoppingJourneyAnimation({ isActive }: StoreShoppingJourneyAnimationProps) {
  // Deterministic 5-Stage Storytelling Timeline (15-Second Loop):
  // Stage 1 (0.0s – 3.0s): Phone Browsing & Cursor clicks "Add to Cart" + Cart badge 0 -> 1
  // Stage 2 (3.0s – 6.0s): Cursor travels to Checkout & clicks "Place Order" (Order Confirmed)
  // Stage 3 (6.0s – 9.5s): Conveyor belt operates + Package travels under sweeping laser scanner
  // Stage 4 (9.5s – 13.0s): Van drives along the glowing route towards the Location Pin
  // Stage 5 (13.0s – 15.0s): Destination Pin activates with "✓ Order Delivered" & brief celebration
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
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-15">
      {/* ========================================================================= */}
      {/* 1. BROWSE PRODUCTS & ADD TO CART (0.0s – 3.0s) */}
      {/* ========================================================================= */}
      {stage === 1 && (
        <>
          {/* Natural Mouse Cursor gliding into the Phone and clicking "Add to Cart" */}
          <motion.div
            initial={{ left: "10%", top: "65%", opacity: 0 }}
            animate={{
              left: ["10%", "17%", "21.5%"],
              top: ["65%", "68%", "72%"],
              opacity: [0, 1, 1],
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-30 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-cyan-300"
          >
            <MousePointer2 className="h-6 w-6 fill-cyan-400 text-slate-950" />

            {/* Click Ripple on Add to Cart Button */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.8, 0], opacity: [0, 0.9, 0] }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -left-1 -top-1 h-8 w-8 rounded-full border-2 border-cyan-300 bg-cyan-400/30"
            />
          </motion.div>

          {/* Cart Badge Pop (0 -> 1 Counter) */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: [0.6, 1.3, 1],
              opacity: [0, 1, 1],
            }}
            transition={{ delay: 1.4, duration: 0.4, ease: "backOut" }}
            className="absolute left-[26.8%] sm:left-[27.3%] top-[39.5%] sm:top-[38.5%] flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-[9px] font-black text-white shadow-[0_0_10px_rgba(239,68,68,0.9)]"
          >
            1
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 2. PLACE ORDER & CHECKOUT CONFIRMATION (3.0s – 6.0s) */}
      {/* ========================================================================= */}
      {stage === 2 && (
        <>
          {/* Flowing Light Pulse along Route connecting Phone to Checkout */}
          <motion.div
            initial={{ left: "27%", top: "45%", opacity: 0 }}
            animate={{
              left: ["27%", "33%", "39%"],
              top: ["45%", "52%", "55%"],
              opacity: [0, 1, 0.8],
            }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute h-3.5 w-3.5 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(56,189,248,1)]"
          />

          {/* Cursor moving from Phone to "Place Order" button */}
          <motion.div
            initial={{ left: "22%", top: "70%", opacity: 0 }}
            animate={{
              left: ["22%", "32%", "42.5%"],
              top: ["70%", "68%", "73.5%"],
              opacity: [0, 1, 1],
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-30 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-cyan-300"
          >
            <MousePointer2 className="h-6 w-6 fill-cyan-400 text-slate-950" />

            {/* Click Ripple on Place Order Button */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.8, 0], opacity: [0, 0.9, 0] }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -left-1 -top-1 h-8 w-8 rounded-full border-2 border-emerald-400 bg-emerald-400/30"
            />
          </motion.div>

          {/* Place Order Confirmed State Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: [0, 1, 1], scale: [0.95, 1.03, 1] }}
            transition={{ delay: 1.4, duration: 0.4 }}
            className="absolute left-[33.2%] sm:left-[35.5%] lg:left-[37%] bottom-[21.5%] sm:bottom-[22.5%] px-3 py-1.5 rounded-xl bg-emerald-500 text-white flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.8)] border border-emerald-300"
          >
            <Check className="h-3.5 w-3.5 stroke-[3]" />
            <span className="text-[10px] font-black uppercase tracking-wider">Order Placed ✓</span>
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 3. PACK & CONVEYOR BELT MOVEMENT (6.0s – 9.5s) */}
      {/* ========================================================================= */}
      {stage === 3 && (
        <>
          {/* Conveyor Rollers Operating Animation (Moving chrome light lines) */}
          <div className="absolute left-[52%] sm:left-[54%] lg:left-[56%] bottom-[16%] sm:bottom-[17%] w-[20%] h-[5%] overflow-hidden flex items-center justify-between opacity-80">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.div
                key={i}
                animate={{ x: [0, 24] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                className="h-full w-1 bg-cyan-300/80 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
              />
            ))}
          </div>

          {/* Overhead Cyan Laser Scanner Sweeping over Package */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.2, ease: "easeInOut" }}
            className="absolute left-[64%] sm:left-[66%] lg:left-[67%] top-[24%] sm:top-[25%] w-[70px] sm:w-[90px] h-[130px] pointer-events-none flex flex-col items-center z-20"
          >
            {/* Laser Cone Glow */}
            <div className="w-full h-full bg-gradient-to-b from-cyan-400/70 via-cyan-400/25 to-transparent [clip-path:polygon(50%_0%,0%_100%,100%_100%)] blur-xs" />
            {/* Sweeping Laser Line */}
            <motion.div
              animate={{ y: [0, 70, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[25%] w-full h-[2px] bg-cyan-200 shadow-[0_0_15px_rgba(56,189,248,1)]"
            />
          </motion.div>

          {/* 3D Branded ACTE IDEA LAB Box Gliding across the Conveyor */}
          <motion.div
            initial={{ left: "54%", bottom: "28%", opacity: 0 }}
            animate={{
              left: ["54%", "62%", "70%"],
              bottom: ["28%", "27%", "26%"],
              opacity: [0, 1, 1],
            }}
            transition={{ duration: 3.2, ease: "easeInOut" }}
            className="absolute z-25 h-11 w-15 rounded-lg bg-gradient-to-b from-[#eab308] to-[#854d0e] border border-amber-200 shadow-[0_8px_20px_rgba(0,0,0,0.6)] p-1 flex flex-col justify-between"
          >
            <div className="h-1 bg-amber-100/90 rounded-xs mx-auto w-full" />
            <div className="text-center text-[7px] font-black text-amber-950 bg-amber-300 py-0.5 rounded-xs leading-none">
              ACTE LAB
            </div>
            <div className="h-1 w-4 bg-white rounded-xs ml-auto shadow-xs" />
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 4. EXPRESS DELIVERY VAN TRAVELING ALONG ROUTE (9.5s – 13.0s) */}
      {/* ========================================================================= */}
      {stage === 4 && (
        <>
          {/* Progressive Route Illumination Beacon */}
          <motion.div
            initial={{ left: "70%", top: "42%", opacity: 0 }}
            animate={{
              left: ["70%", "78%", "86%"],
              top: ["42%", "34%", "44%"],
              opacity: [0, 1, 0.9],
            }}
            transition={{ duration: 2.8, ease: "easeInOut" }}
            className="absolute h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(56,189,248,1)] z-20"
          />

          {/* ACTE Delivery Van Headlight Light Beams */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.9, 0] }}
            transition={{ duration: 3.2 }}
            className="absolute right-[0%] sm:right-[1%] lg:right-[2%] bottom-[20%] sm:bottom-[21%] w-[140px] h-[50px] pointer-events-none z-20"
          >
            <div className="w-full h-full bg-gradient-to-r from-amber-300/50 via-amber-200/20 to-transparent blur-md [clip-path:polygon(0%_40%,100%_0%,100%_100%,0%_60%)]" />
          </motion.div>

          {/* Dynamic Speed Streaks Behind Van */}
          <motion.div
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="absolute right-[12%] sm:right-[14%] bottom-[26%] w-[10%] h-[3px] bg-cyan-300/80 rounded-full blur-xs shadow-[0_0_8px_rgba(56,189,248,1)]"
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* 5. DESTINATION ARRIVAL & "✓ ORDER DELIVERED" (13.0s – 15.0s) */}
      {/* ========================================================================= */}
      {stage === 5 && (
        <>
          {/* Location Pin Radar Pulse */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.8, 2.4],
              opacity: [0, 0.9, 0],
            }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute right-[6%] sm:right-[7.5%] lg:right-[8.5%] top-[24%] sm:top-[25%] h-14 w-14 rounded-full border-2 border-amber-300 bg-amber-400/25 shadow-[0_0_30px_rgba(251,191,36,0.9)]"
          />

          {/* Elegant Green Delivery Confirmation Capsule */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="absolute right-[4%] sm:right-[5.5%] lg:right-[6.5%] top-[18%] sm:top-[19%] px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 text-white font-black text-[11px] shadow-[0_0_25px_rgba(16,185,129,0.8)] border border-white flex items-center gap-1.5 z-30"
          >
            <div className="h-4 w-4 rounded-full bg-white text-emerald-600 flex items-center justify-center">
              <Check className="h-3 w-3 stroke-[3.5]" />
            </div>
            <span>✓ Order Delivered</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin" />
          </motion.div>
        </>
      )}
    </div>
  );
}
