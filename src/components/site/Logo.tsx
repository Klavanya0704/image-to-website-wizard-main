import { Link } from "@tanstack/react-router";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5 group select-none">
      {/* Geometric Ribbon / M Icon from Reference */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-transparent transition-transform group-hover:scale-105 duration-200">
        <svg viewBox="0 0 36 36" fill="none" className="h-8 w-8">
          {/* Left Red/Orange Fold */}
          <path d="M6 26L12 10L17 20L11 26H6Z" fill="#E52320" />
          {/* Top Yellow/Amber Accent */}
          <path d="M12 10L18 6L24 10L18 16L12 10Z" fill="#F5B000" />
          {/* Center Sky Blue Fold */}
          <path d="M18 16L24 10L30 26H25L18 16Z" fill="#00AEEF" />
          {/* Right Royal Blue Fold */}
          <path d="M17 20L18 16L25 26H19L17 20Z" fill="#1455D9" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="leading-tight">
        <span
          className={`block text-base sm:text-[17px] font-black tracking-tight ${
            inverted ? "text-topbar-foreground" : "text-[#0B1736] dark:text-white"
          }`}
        >
          ACTE IDEA LAB
        </span>
        <span className="block text-[10px] font-semibold text-[#52627A] dark:text-slate-400">
          Innovate. Create. Inspire.
        </span>
      </div>
    </Link>
  );
}
