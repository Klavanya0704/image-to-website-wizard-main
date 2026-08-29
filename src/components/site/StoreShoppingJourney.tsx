import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  CheckCircle2,
  PackageCheck,
  Truck,
  CreditCard,
  MousePointer2,
  Sparkles,
  MapPin,
  Check,
  Box,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StoreShoppingJourneyProps {
  isActive: boolean;
}

export function StoreShoppingJourney({ isActive }: StoreShoppingJourneyProps) {
  // Step 1: Browse (0.0s - 1.4s)
  // Step 2: Place Order / Checkout (1.4s - 2.8s)
  // Step 3: Packed & Processing (2.8s - 4.0s)
  // Step 4: Express Delivery (4.0s - 5.2s)
  // Step 5: Order Delivered / Confirmed (5.2s - 6.2s)
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  useEffect(() => {
    if (!isActive) {
      setStep(1);
      return;
    }

    const t1 = setTimeout(() => setStep(2), 1400);
    const t2 = setTimeout(() => setStep(3), 2800);
    const t3 = setTimeout(() => setStep(4), 4000);
    const t4 = setTimeout(() => setStep(5), 5200);
    const t5 = setTimeout(() => setStep(1), 6400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isActive, step]);

  if (!isActive) return null;

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] pointer-events-none select-none">
      <AnimatePresence mode="wait">
        {/* ================= STEP 1: BROWSE PRODUCTS & ADD TO CART ================= */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative rounded-2xl bg-[#040E29]/80 backdrop-blur-xl border border-blue-400/40 p-3.5 sm:p-4 shadow-[0_10px_35px_rgba(7,27,77,0.5),0_0_20px_rgba(56,189,248,0.25)]"
          >
            {/* Top Status Header */}
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-2 mb-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-cyan-300">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span>1. Browse &amp; Select Prototype</span>
              </div>
              <div className="flex items-center gap-1 bg-blue-500/20 border border-blue-400/30 px-2 py-0.5 rounded-full text-[10px] font-bold text-white">
                <ShoppingCart className="h-3 w-3 text-cyan-300" />
                <span>Cart (0)</span>
              </div>
            </div>

            {/* Product Item Card */}
            <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2 border border-white/10">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-inner shrink-0">
                <Box className="h-6 w-6 text-cyan-200" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black text-white truncate">3D Spiral Polyhedral Vase</h4>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[11px] font-extrabold text-amber-300">₹499</span>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], backgroundColor: ["rgba(20,85,217,1)", "rgba(16,185,129,1)"] }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="inline-flex items-center gap-1 rounded-md bg-[#1455D9] px-2 py-0.5 text-[10px] font-black text-white shadow-xs"
                  >
                    <span>+ Add to Cart</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Natural Moving Cursor Pointer */}
            <motion.div
              initial={{ x: 30, y: 50, opacity: 0 }}
              animate={{ x: 230, y: 48, opacity: 1 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="absolute text-cyan-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              <MousePointer2 className="h-5 w-5 fill-cyan-400 text-slate-950" />
            </motion.div>

            {/* Flying mini product particle into cart */}
            <motion.div
              initial={{ opacity: 0, x: 220, y: 50, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], x: [220, 270, 310], y: [50, 0, -10], scale: [0.8, 1, 0.4] }}
              transition={{ delay: 0.8, duration: 0.55, ease: "easeOut" }}
              className="absolute rounded-full bg-cyan-400 p-1 text-slate-950 shadow-md"
            >
              <ShoppingCart className="h-2.5 w-2.5" />
            </motion.div>
          </motion.div>
        )}

        {/* ================= STEP 2: PLACE ORDER / 1-CLICK CHECKOUT ================= */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative rounded-2xl bg-[#040E29]/85 backdrop-blur-xl border border-blue-400/40 p-3.5 sm:p-4 shadow-[0_10px_35px_rgba(7,27,77,0.5),0_0_20px_rgba(56,189,248,0.25)]"
          >
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-2 mb-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-cyan-300">
                <CreditCard className="h-3.5 w-3.5 text-amber-300" />
                <span>2. Place Order &amp; Checkout</span>
              </div>
              <span className="text-[10px] font-mono font-black text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                Cart (1) • ₹499
              </span>
            </div>

            <div className="bg-blue-950/40 rounded-xl p-2.5 border border-blue-400/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                <span>Instant Checkout:</span>
                <span className="font-mono text-cyan-300">UPI / Card</span>
              </div>

              {/* Animated Trigger Button */}
              <motion.div
                animate={{ scale: [1, 0.96, 1], backgroundColor: ["rgba(20,85,217,0.9)", "rgba(16,185,129,0.9)"] }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="w-full py-1.5 rounded-lg text-center text-xs font-black text-white shadow-md flex items-center justify-center gap-1.5"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Payment Verified • ₹499</span>
              </motion.div>
            </div>

            {/* Ripple Click Feedback */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cyan-400/40 pointer-events-none"
            />
          </motion.div>
        )}

        {/* ================= STEP 3: ORDER PACKED & PROCESSING ================= */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative rounded-2xl bg-[#040E29]/85 backdrop-blur-xl border border-blue-400/40 p-3.5 sm:p-4 shadow-[0_10px_35px_rgba(7,27,77,0.5),0_0_20px_rgba(56,189,248,0.25)]"
          >
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-2 mb-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-300">
                <PackageCheck className="h-3.5 w-3.5 text-amber-400" />
                <span>3. Quality Checked &amp; Packed</span>
              </div>
              <span className="text-[9px] font-bold text-slate-300">ACTE IDEA LAB</span>
            </div>

            {/* Animated Conveyor Track */}
            <div className="relative overflow-hidden bg-slate-900/60 rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-3">
                {/* Moving Parcel Box */}
                <motion.div
                  initial={{ x: -20, rotate: -4 }}
                  animate={{ x: [0, 40, 80], rotate: [0, 2, 0] }}
                  transition={{ duration: 1.1, ease: "linear" }}
                  className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3 py-1.5 rounded-lg font-black text-xs shadow-md shrink-0"
                >
                  <Box className="h-4 w-4" />
                  <span>PARCEL #892</span>
                </motion.div>

                {/* Motion Track Lines */}
                <div className="flex-1 space-y-1">
                  <div className="h-1 bg-gradient-to-r from-cyan-400/30 to-blue-500/60 rounded-full" />
                  <div className="h-1 bg-gradient-to-r from-cyan-400/20 to-blue-500/40 rounded-full" />
                </div>
              </div>

              <div className="mt-2 text-[10px] font-bold text-cyan-200 flex items-center justify-between">
                <span>Status: Dispatched to Logistics Hub</span>
                <span className="text-emerald-400">✓ Ready</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= STEP 4: FAST EXPRESS DELIVERY ================= */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative rounded-2xl bg-[#040E29]/85 backdrop-blur-xl border border-blue-400/40 p-3.5 sm:p-4 shadow-[0_10px_35px_rgba(7,27,77,0.5),0_0_20px_rgba(56,189,248,0.25)]"
          >
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-2 mb-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-cyan-300">
                <Truck className="h-3.5 w-3.5 text-cyan-400" />
                <span>4. Out for Express Delivery</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-300">ON ROUTE</span>
            </div>

            {/* Moving Delivery Van & Route Path */}
            <div className="relative overflow-hidden bg-slate-900/60 rounded-xl p-3 border border-white/10">
              <div className="relative h-8 flex items-center">
                {/* Dotted Waypoint Path */}
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-cyan-400/40" />

                {/* Animated Moving Van */}
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, 100, 210] }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                  className="relative z-10 flex items-center gap-1.5 bg-[#1455D9] text-white px-2.5 py-1 rounded-lg text-xs font-black shadow-md border border-blue-400/40"
                >
                  <Truck className="h-4 w-4 text-cyan-200" />
                  <span className="text-[10px]">ACTE EXPRESS</span>
                </motion.div>

                {/* Destination Pin */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400 animate-bounce">
                  <MapPin className="h-4 w-4 fill-amber-400/30" />
                </div>
              </div>

              <div className="mt-2 text-[10px] font-bold text-slate-200 flex items-center justify-between">
                <span>Direct Campus &amp; Doorstep Delivery</span>
                <span className="text-cyan-300">Arriving Now</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= STEP 5: ORDER DELIVERED & CONFIRMED ================= */}
        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative rounded-2xl bg-[#040E29]/90 backdrop-blur-xl border border-emerald-400/50 p-3.5 sm:p-4 shadow-[0_10px_35px_rgba(16,185,129,0.35),0_0_20px_rgba(56,189,248,0.25)]"
          >
            <div className="flex items-center justify-between border-b border-emerald-400/30 pb-2 mb-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>5. Order Confirmed &amp; Delivered</span>
              </div>
              <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
            </div>

            <div className="bg-emerald-950/40 rounded-xl p-2.5 border border-emerald-400/30 text-center space-y-1">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-1.5 text-xs font-black text-white"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Delivered Successfully to Student</span>
              </motion.div>
              <p className="text-[10px] font-medium text-slate-300">
                Ready for Testing &amp; Innovation • ACTE IDEA LAB
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
