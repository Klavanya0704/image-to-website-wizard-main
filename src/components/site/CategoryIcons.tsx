import React from "react";

export function Icon3DPrinter({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Printer Frame */}
      <rect x="6" y="8" width="28" height="24" rx="2" stroke="#2563EB" strokeWidth="2.2" />
      <line x1="6" y1="26" x2="34" y2="26" stroke="#2563EB" strokeWidth="2" />
      {/* Linear Rods */}
      <line x1="10" y1="8" x2="10" y2="26" stroke="#93C5FD" strokeWidth="1.5" />
      <line x1="30" y1="8" x2="30" y2="26" stroke="#93C5FD" strokeWidth="1.5" />
      {/* Extruder & Nozzle */}
      <rect x="17" y="11" width="6" height="5" rx="1" fill="#2563EB" />
      <polygon points="18.5,16 21.5,16 20,19" fill="#1D4ED8" />
      {/* Printed Object (Vase outline) */}
      <path
        d="M17 25.5 C16 23, 15 22, 17 20 C18.5 18.5, 21.5 18.5, 23 20 C25 22, 24 23, 23 25.5 Z"
        stroke="#2563EB"
        strokeWidth="1.6"
        fill="#DBEAFE"
      />
    </svg>
  );
}

export function IconLaserCutter({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Laser Carriage Head */}
      <rect
        x="13"
        y="6"
        width="14"
        height="10"
        rx="1.5"
        stroke="#1E293B"
        strokeWidth="2"
        fill="#334155"
      />
      <rect x="16" y="16" width="8" height="4" rx="0.5" fill="#EF4444" />
      {/* Focused Laser Beam */}
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="30"
        stroke="#EF4444"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Laser Plasma Sparks */}
      <circle cx="20" cy="30" r="2.5" fill="#EF4444" />
      <line
        x1="16"
        y1="27"
        x2="24"
        y2="33"
        stroke="#EF4444"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="33"
        x2="24"
        y2="27"
        stroke="#EF4444"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Material Bed Line */}
      <line x1="8" y1="34" x2="32" y2="34" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconCncMilling({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Spindle Body */}
      <rect
        x="14"
        y="6"
        width="12"
        height="11"
        rx="1.5"
        stroke="#0284C7"
        strokeWidth="2"
        fill="#E0F2FE"
      />
      {/* Toolholder */}
      <polygon points="16,17 24,17 22,22 18,22" fill="#0369A1" />
      {/* Rotating Flute End-Mill */}
      <line
        x1="20"
        y1="22"
        x2="20"
        y2="28"
        stroke="#0284C7"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Milled Aluminum Cavity */}
      <path
        d="M10 27 L15 27 C16 27, 16 31, 18 31 L22 31 C24 31, 24 27, 25 27 L30 27"
        stroke="#0284C7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Metal Chips */}
      <circle cx="16" cy="25" r="1" fill="#38BDF8" />
      <circle cx="24" cy="25" r="1" fill="#38BDF8" />
    </svg>
  );
}

export function IconElectronics({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Central IC Body */}
      <rect
        x="12"
        y="12"
        width="16"
        height="16"
        rx="2"
        stroke="#059669"
        strokeWidth="2"
        fill="#D1FAE5"
      />
      {/* Center Silicon Die */}
      <rect x="16" y="16" width="8" height="8" rx="1" fill="#059669" />
      {/* Lead Pins */}
      {/* Top */}
      <line x1="15" y1="7" x2="15" y2="12" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="7" x2="20" y2="12" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <line x1="25" y1="7" x2="25" y2="12" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      {/* Bottom */}
      <line
        x1="15"
        y1="28"
        x2="15"
        y2="33"
        stroke="#059669"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="28"
        x2="20"
        y2="33"
        stroke="#059669"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="25"
        y1="28"
        x2="25"
        y2="33"
        stroke="#059669"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Left */}
      <line x1="7" y1="15" x2="12" y2="15" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <line x1="7" y1="20" x2="12" y2="20" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <line x1="7" y1="25" x2="12" y2="25" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      {/* Right */}
      <line
        x1="28"
        y1="15"
        x2="33"
        y2="15"
        stroke="#059669"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="20"
        x2="33"
        y2="20"
        stroke="#059669"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="25"
        x2="33"
        y2="25"
        stroke="#059669"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconDrone({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Center Drone Body */}
      <ellipse cx="20" cy="20" rx="4.5" ry="3.5" stroke="#7C3AED" strokeWidth="2" fill="#EDE9FE" />
      {/* Arms */}
      <line
        x1="12"
        y1="14"
        x2="28"
        y2="26"
        stroke="#7C3AED"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="26"
        x2="28"
        y2="14"
        stroke="#7C3AED"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* 4 Propeller Rotors */}
      <circle cx="10" cy="12" r="3" stroke="#A78BFA" strokeWidth="1.5" />
      <circle cx="30" cy="12" r="3" stroke="#A78BFA" strokeWidth="1.5" />
      <circle cx="10" cy="28" r="3" stroke="#A78BFA" strokeWidth="1.5" />
      <circle cx="30" cy="28" r="3" stroke="#A78BFA" strokeWidth="1.5" />
    </svg>
  );
}

export function IconAcrylic({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Back Layer Sheet */}
      <rect
        x="13"
        y="9"
        width="15"
        height="18"
        rx="2"
        stroke="#2563EB"
        strokeWidth="2"
        fill="#DBEAFE"
      />
      {/* Front Layer Sheet with Glass Bevel */}
      <rect
        x="9"
        y="13"
        width="15"
        height="18"
        rx="2"
        stroke="#2563EB"
        strokeWidth="2"
        fill="#EFF6FF"
      />
    </svg>
  );
}

export function IconDiyKit({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Toolbox / Gift Open Container */}
      <path d="M9 19 L31 19 L29 32 L11 32 Z" stroke="#D97706" strokeWidth="2" fill="#FEF3C7" />
      <line x1="7" y1="19" x2="33" y2="19" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
      {/* Protruding Tools / Components */}
      {/* Gear / Lightbulb 1 */}
      <circle cx="15" cy="13" r="3" stroke="#F59E0B" strokeWidth="2" fill="#FDE68A" />
      <line x1="15" y1="16" x2="15" y2="19" stroke="#D97706" strokeWidth="1.8" />
      {/* Wrench / Tool 2 */}
      <circle cx="25" cy="13" r="3" stroke="#F59E0B" strokeWidth="2" fill="#FDE68A" />
      <line x1="25" y1="16" x2="25" y2="19" stroke="#D97706" strokeWidth="1.8" />
    </svg>
  );
}
