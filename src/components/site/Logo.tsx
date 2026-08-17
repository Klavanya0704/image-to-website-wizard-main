import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Brain, Cpu } from "lucide-react";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link to="/" className="flex shrink-0 items-center gap-3 group">
      {/* Official Logo Image with Fallback */}
      <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-white dark:bg-card p-1 border border-border shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
        {!imageError ? (
          <img
            src="/sasi-idealab-logo.png"
            alt="SASI AICTE IDEA Lab Logo"
            className="h-full w-full object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-[#0B5ED7] via-[#0EA5E9] to-[#DC2626] text-white font-black text-xs">
            SASI
          </div>
        )}
      </div>

      {/* Brand Text */}
      <div className="leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={`block text-base sm:text-lg font-black tracking-tight ${
              inverted ? "text-topbar-foreground" : "text-foreground"
            }`}
          >
            <span className="text-[#DC2626] font-extrabold mr-1">SASI</span>
            <span>AICTE IDEA Lab</span>
          </span>
        </div>
        <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B5ED7] dark:text-[#38BDF8]">
          COLLEGE INNOVATION STORE
        </span>
      </div>
    </Link>
  );
}
