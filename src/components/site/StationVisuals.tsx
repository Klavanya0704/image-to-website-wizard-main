import React from "react";

export function StationVisual3DPrinting({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center w-full h-full overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
      >
        <defs>
          <linearGradient id="printBedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="layerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#1455D9" />
          </linearGradient>
          <linearGradient id="nozzleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="extruderBlock" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Grid Pattern (Iso Perspective) */}
        <g opacity="0.35">
          <line
            x1="40"
            y1="160"
            x2="360"
            y2="160"
            stroke="#94A3B8"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="60"
            y1="140"
            x2="340"
            y2="140"
            stroke="#94A3B8"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="80"
            y1="120"
            x2="320"
            y2="120"
            stroke="#94A3B8"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line x1="90" y1="180" x2="150" y2="100" stroke="#94A3B8" strokeWidth="1" />
          <line x1="170" y1="180" x2="230" y2="100" stroke="#94A3B8" strokeWidth="1" />
          <line x1="250" y1="180" x2="310" y2="100" stroke="#94A3B8" strokeWidth="1" />
        </g>

        {/* Heated Bed Plate */}
        <polygon
          points="70,165 330,165 290,185 110,185"
          fill="url(#printBedGrad)"
          stroke="#38BDF8"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Printed 3D Polyhedral Layer Object */}
        <g filter="url(#glowBlue)">
          {/* Base Layer */}
          <polygon points="140,160 260,160 280,145 160,145" fill="#0284C7" opacity="0.7" />
          {/* Mid Layer 1 */}
          <polygon points="145,152 255,152 272,139 162,139" fill="url(#layerGrad)" opacity="0.85" />
          {/* Mid Layer 2 */}
          <polygon points="152,144 248,144 262,132 166,132" fill="url(#layerGrad)" />
          {/* Current Extruding Top Layer */}
          <polygon points="160,136 240,136 250,126 170,126" fill="#00E5FF" />
          <line
            x1="160"
            y1="136"
            x2="210"
            y2="136"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* Linear X-Axis Gantry Rod */}
        <line
          x1="30"
          y1="45"
          x2="370"
          y2="45"
          stroke="#94A3B8"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="30"
          y1="58"
          x2="370"
          y2="58"
          stroke="#64748B"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Extruder Assembly Toolhead */}
        <g transform="translate(195, 25)">
          {/* Heatsink Block */}
          <rect
            x="-24"
            y="0"
            width="48"
            height="42"
            rx="4"
            fill="url(#extruderBlock)"
            stroke="#94A3B8"
            strokeWidth="1"
          />
          {/* Cooling Fin Lines */}
          <line x1="-20" y1="10" x2="20" y2="10" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="-20" y1="18" x2="20" y2="18" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="-20" y1="26" x2="20" y2="26" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="-20" y1="34" x2="20" y2="34" stroke="#CBD5E1" strokeWidth="1" />

          {/* Brass Heater Block */}
          <rect
            x="-14"
            y="44"
            width="28"
            height="18"
            rx="2"
            fill="url(#nozzleGrad)"
            stroke="#B45309"
            strokeWidth="1"
          />
          {/* Thermistor wire */}
          <path d="M10,50 Q28,35 34,15" stroke="#EF4444" strokeWidth="1.5" fill="none" />

          {/* Brass V6 Nozzle Cone */}
          <polygon
            points="-8,62 8,62 2,78 -2,78"
            fill="url(#nozzleGrad)"
            stroke="#B45309"
            strokeWidth="0.8"
          />

          {/* Molten Filament Extrusion Bead */}
          <line
            x1="0"
            y1="78"
            x2="0"
            y2="110"
            stroke="#00E5FF"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glowBlue)"
          />
          <circle cx="0" cy="111" r="3" fill="#FFFFFF" filter="url(#glowBlue)" />
        </g>

        {/* Heatwave Shimmer Radiations */}
        <path
          d="M120,175 Q125,168 120,162"
          stroke="#F59E0B"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M280,175 Q285,168 280,162"
          stroke="#F59E0B"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

export function StationVisualLaserCutting({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center w-full h-full overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
      >
        <defs>
          <linearGradient id="laserHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="sheetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F87171" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0.25" />
          </linearGradient>
          <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Honeycomb Honeycomb Grid Floor */}
        <g opacity="0.25" stroke="#94A3B8" strokeWidth="1">
          <polygon points="60,160 75,150 90,150 105,160 90,170 75,170" />
          <polygon points="110,160 125,150 140,150 155,160 140,170 125,170" />
          <polygon points="160,160 175,150 190,150 205,160 190,170 175,170" />
          <polygon points="210,160 225,150 240,150 255,160 240,170 225,170" />
          <polygon points="260,160 275,150 290,150 305,160 290,170 275,170" />
          <polygon points="310,160 325,150 340,150 355,160 340,170 325,170" />
        </g>

        {/* Acrylic / Wood Cutting Sheet */}
        <rect
          x="70"
          y="130"
          width="260"
          height="40"
          rx="4"
          fill="url(#sheetGrad)"
          stroke="#EF4444"
          strokeWidth="1.5"
        />

        {/* Vector Cutout Geometry (Gear Profile) */}
        <path
          d="M100,150 L140,150 L150,138 L170,138 L180,150 L210,150"
          stroke="#EF4444"
          strokeWidth="2"
          strokeDasharray="4 2"
        />

        {/* Finished Sliced Line Glow */}
        <line
          x1="100"
          y1="150"
          x2="200"
          y2="150"
          stroke="#FF0055"
          strokeWidth="3"
          filter="url(#laserGlow)"
        />

        {/* Laser Focus Lens Assembly */}
        <g transform="translate(200, 20)">
          {/* Top Optical Mount Cylinder */}
          <rect
            x="-18"
            y="0"
            width="36"
            height="35"
            rx="3"
            fill="url(#laserHeadGrad)"
            stroke="#94A3B8"
            strokeWidth="1.2"
          />
          {/* Lens Indicator Ring */}
          <rect x="-21" y="24" width="42" height="6" rx="2" fill="#E11D48" />

          {/* Brass Air-Assist Cone */}
          <polygon
            points="-12,35 12,35 4,75 -4,75"
            fill="#D97706"
            stroke="#92400E"
            strokeWidth="1"
          />
          <circle cx="0" cy="75" r="2.5" fill="#EF4444" />

          {/* High-Energy Slicing Laser Beam */}
          <line
            x1="0"
            y1="75"
            x2="0"
            y2="130"
            stroke="#FF0033"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#laserGlow)"
          />
          <line
            x1="0"
            y1="75"
            x2="0"
            y2="130"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Cutting Point Plasma Burst & Sparks */}
          <circle cx="0" cy="130" r="4.5" fill="#FFFFFF" filter="url(#laserGlow)" />
          <circle cx="0" cy="130" r="9" fill="#EF4444" opacity="0.6" filter="url(#laserGlow)" />

          {/* Spark Particles */}
          <circle cx="-12" cy="120" r="1.5" fill="#FBBF24" />
          <circle cx="-18" cy="115" r="1" fill="#F59E0B" />
          <circle cx="15" cy="118" r="1.8" fill="#FDE047" />
          <circle cx="22" cy="112" r="1.2" fill="#EF4444" />
          <circle cx="8" cy="108" r="1.2" fill="#FBBF24" />
        </g>
      </svg>
    </div>
  );
}

export function StationVisualCNC({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center w-full h-full overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
      >
        <defs>
          <linearGradient id="metalBillet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id="cutterFlute" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="50%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="spindleBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>

        {/* Machine Base Vice Clamp */}
        <rect
          x="50"
          y="160"
          width="300"
          height="24"
          rx="3"
          fill="#1E293B"
          stroke="#475569"
          strokeWidth="1"
        />
        <circle cx="70" cy="172" r="4" fill="#64748B" />
        <circle cx="330" cy="172" r="4" fill="#64748B" />

        {/* 6061-T6 Aluminum Billet Block */}
        <polygon
          points="90,140 310,140 310,160 90,160"
          fill="url(#metalBillet)"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />
        {/* Milled Pocket Cutout */}
        <path
          d="M150,140 L150,150 L250,150 L250,140"
          fill="#334155"
          stroke="#00E5FF"
          strokeWidth="1.5"
        />

        {/* High-Speed Rotational Motion Arcs */}
        <g transform="translate(200, 115)" opacity="0.75">
          <ellipse
            cx="0"
            cy="0"
            rx="32"
            ry="7"
            stroke="#00E5FF"
            strokeWidth="1.5"
            strokeDasharray="8 4"
          />
          <ellipse
            cx="0"
            cy="12"
            rx="24"
            ry="5"
            stroke="#F59E0B"
            strokeWidth="1"
            strokeDasharray="6 3"
          />
        </g>

        {/* CNC Industrial Spindle Collet & Fluted End-Mill Bit */}
        <g transform="translate(200, 15)">
          {/* Main Spindle Shaft */}
          <rect
            x="-22"
            y="0"
            width="44"
            height="40"
            rx="2"
            fill="url(#spindleBody)"
            stroke="#94A3B8"
            strokeWidth="1"
          />
          {/* Precision ER Collet Nut */}
          <polygon
            points="-16,40 16,40 22,58 -22,58"
            fill="#1E293B"
            stroke="#CBD5E1"
            strokeWidth="1.2"
          />
          <rect x="-18" y="58" width="36" height="12" fill="#0F172A" />

          {/* 4-Flute Solid Carbide End Mill Bit */}
          <rect
            x="-6"
            y="70"
            width="12"
            height="42"
            fill="url(#cutterFlute)"
            stroke="#64748B"
            strokeWidth="0.8"
          />
          {/* Spiral Flute Cuts */}
          <path d="M-6,75 Q0,80 6,85" stroke="#334155" strokeWidth="1.5" fill="none" />
          <path d="M-6,87 Q0,92 6,97" stroke="#334155" strokeWidth="1.5" fill="none" />
          <path d="M-6,99 Q0,104 6,109" stroke="#334155" strokeWidth="1.5" fill="none" />

          {/* Cutting Chips / Metal Swarf Flying */}
          <path d="M-10,120 Q-22,110 -15,100" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
          <circle cx="-16" cy="108" r="1.5" fill="#E2E8F0" />
          <path d="M12,122 Q24,112 18,102" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
          <circle cx="20" cy="106" r="1.5" fill="#E2E8F0" />
        </g>
      </svg>
    </div>
  );
}

export function StationVisualPCB({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center w-full h-full overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
      >
        <defs>
          <linearGradient id="pcbSubstrate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#064E3B" />
            <stop offset="100%" stopColor="#022C22" />
          </linearGradient>
          <linearGradient id="chipBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* FR4 Green Circuit Board Substrate */}
        <rect
          x="50"
          y="30"
          width="300"
          height="140"
          rx="10"
          fill="url(#pcbSubstrate)"
          stroke="#059669"
          strokeWidth="2"
        />

        {/* Mounting Holes */}
        <circle cx="70" cy="50" r="5" fill="#022C22" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="330" cy="50" r="5" fill="#022C22" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="70" cy="150" r="5" fill="#022C22" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="330" cy="150" r="5" fill="#022C22" stroke="#F59E0B" strokeWidth="1.5" />

        {/* Glowing Cyan Copper Traces */}
        <g
          filter="url(#cyanGlow)"
          stroke="#00E5FF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M85,80 L130,80 L150,100" />
          <path d="M85,95 L115,95 L130,110 L150,110" />
          <path d="M85,120 L120,120 L140,120 L150,120" />

          <path d="M250,100 L270,100 L290,80 L315,80" />
          <path d="M250,110 L275,110 L295,95 L315,95" />
          <path d="M250,120 L280,120 L315,120" />

          <path d="M190,50 L190,75" />
          <path d="M210,50 L210,75" />
          <path d="M190,145 L190,125" />
          <path d="M210,145 L210,125" />
        </g>

        {/* Gold Plated Vias & Pads */}
        <g fill="#F59E0B" stroke="#B45309" strokeWidth="0.8">
          <circle cx="130" cy="80" r="2.5" />
          <circle cx="130" cy="110" r="2.5" />
          <circle cx="290" cy="80" r="2.5" />
          <circle cx="295" cy="95" r="2.5" />
          <circle cx="190" cy="50" r="2.5" />
          <circle cx="210" cy="50" r="2.5" />
          <circle cx="190" cy="145" r="2.5" />
          <circle cx="210" cy="145" r="2.5" />
        </g>

        {/* SMT Resistors & Ceramic Capacitors */}
        <g>
          <rect
            x="95"
            y="76"
            width="14"
            height="8"
            rx="1"
            fill="#0F172A"
            stroke="#CBD5E1"
            strokeWidth="1"
          />
          <rect x="95" y="76" width="3" height="8" fill="#CBD5E1" />
          <rect x="106" y="76" width="3" height="8" fill="#CBD5E1" />

          <rect
            x="295"
            y="116"
            width="14"
            height="8"
            rx="1"
            fill="#92400E"
            stroke="#FDE68A"
            strokeWidth="1"
          />
          <rect x="295" y="116" width="3" height="8" fill="#FDE68A" />
          <rect x="306" y="116" width="3" height="8" fill="#FDE68A" />
        </g>

        {/* Main QFP Microcontroller IC Chip */}
        <g transform="translate(170, 70)">
          {/* Chip Body */}
          <rect
            x="0"
            y="0"
            width="60"
            height="60"
            rx="3"
            fill="url(#chipBody)"
            stroke="#475569"
            strokeWidth="1.2"
          />
          {/* Pin 1 Index Dot */}
          <circle cx="8" cy="8" r="2" fill="#64748B" />
          {/* Text Marking */}
          <text
            x="30"
            y="32"
            fill="#94A3B8"
            fontSize="7"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="monospace"
          >
            ESP32-S3
          </text>
          <text
            x="30"
            y="42"
            fill="#00E5FF"
            fontSize="6"
            textAnchor="middle"
            fontFamily="monospace"
          >
            AICTE LAB
          </text>

          {/* Left Pins */}
          <line x1="-8" y1="12" x2="0" y2="12" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="-8" y1="24" x2="0" y2="24" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="-8" y1="36" x2="0" y2="36" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="-8" y1="48" x2="0" y2="48" stroke="#CBD5E1" strokeWidth="2" />

          {/* Right Pins */}
          <line x1="60" y1="12" x2="68" y2="12" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="60" y1="24" x2="68" y2="24" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="60" y1="36" x2="68" y2="36" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="60" y1="48" x2="68" y2="48" stroke="#CBD5E1" strokeWidth="2" />

          {/* Top Pins */}
          <line x1="15" y1="-8" x2="15" y2="0" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="30" y1="-8" x2="30" y2="0" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="45" y1="-8" x2="45" y2="0" stroke="#CBD5E1" strokeWidth="2" />

          {/* Bottom Pins */}
          <line x1="15" y1="60" x2="15" y2="68" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="30" y1="60" x2="30" y2="68" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="45" y1="60" x2="45" y2="68" stroke="#CBD5E1" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
