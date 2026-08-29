import React, { useState } from "react";
import { GraduationCap, Copy, Check, Sparkles, Percent, Ticket, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { safeCopyText } from "@/lib/format";

export function StudentOfferBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    await safeCopyText("STUDENT15");
    setCopied(true);
    toast.success("Coupon code STUDENT15 copied to clipboard!", {
      description: "Apply at checkout with your valid college ID for 15% instant discount.",
    });
    setTimeout(() => {
      setCopied(false);
    }, 2200);
  };

  return (
    <section className="mx-auto max-w-[1440px] px-3 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[22px] sm:rounded-[24px] bg-gradient-to-r from-[#03091e] via-[#071b4d] to-[#0d348a] border border-blue-500/30 text-white shadow-[0_10px_35px_rgba(7,27,77,0.35),0_0_25px_rgba(20,85,217,0.18)] isolate"
      >
        {/* Subtle Maker Grid & Tech Dot Matrix Background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Ambient Moving Animated Blue/Cyan Glow Orbs */}
        <motion.div
          animate={{
            x: [-20, 30, -20],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-12 -top-12 h-56 w-56 rounded-full bg-blue-500/30 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            x: [30, -20, 30],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-10 -bottom-10 h-56 w-56 rounded-full bg-cyan-400/25 blur-3xl pointer-events-none"
        />

        {/* Floating Ambient Decorative Maker Elements */}
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-8 top-3 text-cyan-400/20 pointer-events-none hidden md:block"
        >
          <GraduationCap className="h-6 w-6" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 6, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute left-1/3 bottom-2.5 text-blue-300/15 pointer-events-none hidden md:block"
        >
          <Percent className="h-5 w-5" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute right-1/4 top-3 text-amber-300/20 pointer-events-none hidden lg:block"
        >
          <Sparkles className="h-4 w-4" />
        </motion.div>

        {/* Decorative Ticket Side Notches (Desktop & Tablet) */}
        <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#F8FAFC] dark:bg-background border border-blue-500/30 shadow-inner hidden sm:block z-20 pointer-events-none" />
        <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#F8FAFC] dark:bg-background border border-blue-500/30 shadow-inner hidden sm:block z-20 pointer-events-none" />

        {/* Main Content Layout */}
        <div className="relative z-10 px-5 py-4.5 sm:px-8 sm:py-5 lg:px-10 lg:py-6 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          {/* ================= LEFT SIDE: Offer Details ================= */}
          <div className="flex-1 text-center md:text-left space-y-1.5 sm:space-y-2">
            {/* Small Top Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 px-3 py-1 text-[11px] sm:text-xs font-black uppercase tracking-wider text-cyan-300 shadow-xs backdrop-blur-md">
              <GraduationCap className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
              <span>AICTE STUDENT SPECIAL</span>
            </div>

            {/* Headline with Prominent Glowing 15% Highlight */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight tracking-tight">
              Get{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-200 drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                15% Instant Student Discount
              </span>{" "}
              <br className="hidden sm:inline" />
              on All Lab Prototypes
            </h3>

            {/* Supporting Text with Highlighted Coupon Tag */}
            <p className="text-xs sm:text-sm text-slate-300/90 font-medium">
              Apply code{" "}
              <span className="inline-block px-2 py-0.5 rounded-md bg-blue-900/60 border border-blue-400/40 text-amber-300 font-mono font-black text-xs sm:text-[13px] tracking-wide shadow-xs">
                STUDENT15
              </span>{" "}
              during checkout with your college ID.
            </p>
          </div>

          {/* ================= TICKET DASHED SEPARATOR ================= */}
          <div className="hidden md:flex flex-col items-center justify-center self-stretch relative px-2">
            <div className="w-[1px] h-full border-r-2 border-dashed border-blue-400/30 relative">
              {/* Notches on the separator line for authentic coupon feel */}
              <div className="absolute -top-6 -left-[5px] w-2.5 h-2.5 rounded-full bg-blue-950/60 border border-blue-400/40" />
              <div className="absolute -bottom-6 -left-[5px] w-2.5 h-2.5 rounded-full bg-blue-950/60 border border-blue-400/40" />
            </div>
          </div>

          {/* ================= RIGHT SIDE: Interactive Coupon Ticket CTA ================= */}
          <motion.div
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full md:w-auto shrink-0 flex flex-row md:flex-col items-center justify-between md:justify-center gap-3 sm:gap-3.5 p-3 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/15 hover:border-blue-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-300"
          >
            {/* Coupon Value & Code Badge */}
            <div className="text-left md:text-center">
              <div className="flex items-center gap-1.5 justify-start md:justify-center">
                <span className="inline-block px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-xs">
                  15% OFF
                </span>
                <span className="text-[11px] font-bold text-cyan-300 hidden sm:inline">COUPON</span>
              </div>
              <div className="text-base sm:text-lg font-mono font-black text-white tracking-wider mt-0.5 drop-shadow-xs">
                STUDENT15
              </div>
            </div>

            {/* Interactive Copy Button with Animated Success Feedback */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleCopyCode}
              aria-label="Copy coupon code STUDENT15"
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-black tracking-wider shadow-md cursor-pointer transition-all duration-200 border select-none ${
                copied
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  : "bg-[#1455D9] hover:bg-[#0F44B2] text-white border-blue-400/40 shadow-[0_4px_16px_rgba(20,85,217,0.4)] hover:shadow-[0_6px_22px_rgba(20,85,217,0.6)]"
              }`}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center gap-1.5 text-white"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>COPIED!</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>COPY CODE</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
