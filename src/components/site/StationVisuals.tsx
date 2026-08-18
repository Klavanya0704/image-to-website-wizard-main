import React, { useEffect, useRef } from "react";

/**
 * 1. 3D Printing Simulation (Inspired by 3D Slicer / CAD software)
 * Features a dark glossy mirror-reflection bed, extruded light-blue stacked spiral layers,
 * and a moving vertical extruder nozzle with molten filament glow.
 */
export function Station3DPrintingSimulation({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center w-full h-full bg-[#070D1E] overflow-hidden select-none ${className}`}
    >
      {/* Dynamic Background Radial Spot Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(30,58,138,0.35)_0%,rgba(7,13,30,0.95)_75%)]" />

      <svg
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain relative z-10"
      >
        <defs>
          <linearGradient id="printBedSurface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="extruderBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="30%" stopColor="#334155" />
            <stop offset="70%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="vaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="30%" stopColor="#E0F2FE" />
            <stop offset="70%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <linearGradient id="reflGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </linearGradient>

          <filter id="cyanRayGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Glossy Obsidian Heated Print Bed (Isometric Perspective) */}
        <polygon
          points="40,150 360,150 310,215 90,215"
          fill="url(#printBedSurface)"
          stroke="#38BDF8"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />

        {/* Mirror Grid Lines on Glossy Bed */}
        <g opacity="0.3" stroke="#00E5FF" strokeWidth="0.8" strokeDasharray="3 3">
          <line x1="80" y1="162" x2="320" y2="162" />
          <line x1="95" y1="176" x2="305" y2="176" />
          <line x1="105" y1="190" x2="295" y2="190" />
          <line x1="120" y1="204" x2="280" y2="204" />
          <line x1="140" y1="150" x2="160" y2="215" />
          <line x1="200" y1="150" x2="200" y2="215" />
          <line x1="260" y1="150" x2="240" y2="215" />
        </g>

        {/* 2. Glass Bed Underside Reflection of Printed Object */}
        <g transform="translate(0, 160) scale(1, -0.6)" opacity="0.35" filter="url(#cyanRayGlow)">
          <path
            d="M188,0 Q176,35 184,70 Q192,85 200,90 Q208,85 216,70 Q224,35 212,0 Z"
            fill="url(#reflGrad)"
          />
        </g>

        {/* 3. Layered 3D Printed Spiral Vase / Cone Structure (Light-Blue Slices) */}
        <g id="printedVase" filter="url(#cyanRayGlow)">
          {/* Sliced Stack Rings */}
          {Array.from({ length: 18 }).map((_, i) => {
            const y = 150 - i * 4.2;
            const progress = i / 18;
            // Vase profile: waist curves outward then tapers at top
            const halfW = 12 + Math.sin(progress * Math.PI * 0.9) * 16 - progress * 4;
            const rx = halfW;
            const ry = 3.2;

            return (
              <g key={i}>
                {/* Layer Rim */}
                <ellipse
                  cx={200}
                  cy={y}
                  rx={rx}
                  ry={ry}
                  fill="url(#vaseGrad)"
                  stroke="#E0F2FE"
                  strokeWidth="0.8"
                  opacity={0.85 + (i % 2) * 0.15}
                />
              </g>
            );
          })}
        </g>

        {/* 4. Active Extrusion Layer Ring */}
        <ellipse
          cx={200}
          cy={74}
          rx={8.5}
          ry={2.8}
          fill="#FFFFFF"
          stroke="#00E5FF"
          strokeWidth="2"
          filter="url(#cyanRayGlow)"
          className="animate-pulse"
        />

        {/* 5. 3D Printer Extruder Head Assembly */}
        <g id="extruderHead" className="animate-nozzle-sweep">
          {/* Upper Stepper Motor Cylinder */}
          <rect
            x="184"
            y="0"
            width="32"
            height="42"
            rx="3"
            fill="url(#extruderBody)"
            stroke="#94A3B8"
            strokeWidth="1"
          />
          {/* Linear Rail Joint */}
          <rect
            x="178"
            y="32"
            width="44"
            height="8"
            rx="2"
            fill="#0F172A"
            stroke="#475569"
            strokeWidth="0.8"
          />
          {/* Lower Hotend Block */}
          <rect
            x="190"
            y="40"
            width="20"
            height="22"
            rx="2"
            fill="#334155"
            stroke="#64748B"
            strokeWidth="0.8"
          />
          {/* Brass V6 Extrusion Nozzle Tip */}
          <polygon
            points="194,62 206,62 201,73 199,73"
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth="0.6"
          />

          {/* Glowing Molten PLA Extrusion Jet Bead */}
          <line
            x1="200"
            y1="73"
            x2="200"
            y2="76"
            stroke="#00E5FF"
            strokeWidth="2.5"
            filter="url(#cyanRayGlow)"
          />
          <circle cx="200" cy="74" r="2.5" fill="#FFFFFF" filter="url(#cyanRayGlow)" />
        </g>

        {/* Subtle Watermark HUD Text */}
        <text
          x="380"
          y="228"
          fill="#38BDF8"
          opacity="0.5"
          fontSize="7"
          fontWeight="bold"
          textAnchor="end"
          fontFamily="monospace"
        >
          CAD SLICER &bull; LAYER 18/18 (0.12mm)
        </text>
      </svg>
    </div>
  );
}

/**
 * 2. CO2 Laser Cutting & Engraving Simulation
 * Features a dark honeycomb table, glowing vector mandala cutting paths,
 * and a high-energy laser focal beam leaving a glowing heat trail with sparks.
 */
export function StationLaserCuttingSimulation({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center w-full h-full bg-[#080B14] overflow-hidden select-none ${className}`}
    >
      {/* Atmospheric Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(220,38,38,0.25)_0%,rgba(8,11,20,0.95)_75%)]" />

      <svg
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain relative z-10"
      >
        <defs>
          <linearGradient id="laserCarriage" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <filter id="laserBeamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Honeycomb Worktable Base */}
        <polygon
          points="50,140 350,140 310,215 90,215"
          fill="#111827"
          stroke="#374151"
          strokeWidth="1"
        />

        {/* Honeycomb Vector Grid */}
        <g opacity="0.2" stroke="#EF4444" strokeWidth="0.8">
          <line x1="80" y1="155" x2="320" y2="155" />
          <line x1="95" y1="175" x2="305" y2="175" />
          <line x1="110" y1="195" x2="290" y2="195" />
          <line x1="130" y1="140" x2="150" y2="215" />
          <line x1="200" y1="140" x2="200" y2="215" />
          <line x1="270" y1="140" x2="250" y2="215" />
        </g>

        {/* Wood/Acrylic Workpiece Tile */}
        <polygon
          points="100,148 300,148 275,200 125,200"
          fill="#1E293B"
          stroke="#EF4444"
          strokeWidth="1.2"
          opacity="0.8"
        />

        {/* Burning Vector Cut Path Geometry (Geometric Rosette) */}
        <g filter="url(#laserBeamGlow)" stroke="#F59E0B" strokeWidth="1.8" opacity="0.9">
          <circle cx="200" cy="174" r="28" strokeDasharray="6 3" />
          <polygon points="200,148 226,188 174,188" stroke="#EF4444" strokeWidth="1.5" />
          <polygon points="200,200 174,160 226,160" stroke="#EF4444" strokeWidth="1.5" />
          <circle cx="200" cy="174" r="14" stroke="#FF0055" strokeWidth="2" />
        </g>

        {/* High-Precision Laser Optics Head Assembly */}
        <g id="laserHeadAssembly" transform="translate(200, 20)">
          {/* Upper Mirror Mount Cylinder */}
          <rect
            x="-18"
            y="0"
            width="36"
            height="42"
            rx="3"
            fill="url(#laserCarriage)"
            stroke="#94A3B8"
            strokeWidth="1"
          />
          {/* Anodized Red Accent Ring */}
          <rect x="-20" y="32" width="40" height="6" rx="1.5" fill="#EF4444" />
          {/* Brass Air-Assist Nozzle */}
          <polygon
            points="-10,42 10,42 4,78 -4,78"
            fill="#D97706"
            stroke="#92400E"
            strokeWidth="0.8"
          />

          {/* Slicing Laser Beam (Vertical Column) */}
          <line
            x1="0"
            y1="78"
            x2="0"
            y2="154"
            stroke="#FF0033"
            strokeWidth="3"
            filter="url(#laserBeamGlow)"
          />
          <line x1="0" y1="78" x2="0" y2="154" stroke="#FFFFFF" strokeWidth="1.2" />

          {/* Cutting Plasma Focal Point */}
          <circle cx="0" cy="154" r="3.5" fill="#FFFFFF" filter="url(#laserBeamGlow)" />
          <circle cx="0" cy="154" r="8" fill="#EF4444" opacity="0.6" filter="url(#laserBeamGlow)" />

          {/* Flying Spark Particles */}
          <circle cx="-12" cy="146" r="1.5" fill="#FBBF24" className="animate-ping" />
          <circle cx="16" cy="144" r="1.2" fill="#FDE047" className="animate-ping" />
          <circle cx="-8" cy="138" r="1" fill="#FF0055" />
          <circle cx="10" cy="136" r="1.2" fill="#F59E0B" />
        </g>

        {/* HUD Text */}
        <text
          x="380"
          y="228"
          fill="#EF4444"
          opacity="0.5"
          fontSize="7"
          fontWeight="bold"
          textAnchor="end"
          fontFamily="monospace"
        >
          CO2 LASER &bull; 80W (VECTOR 450mm/s)
        </text>
      </svg>
    </div>
  );
}

/**
 * 3. 4-Axis CNC Milling & Machining Simulation
 * Features a metallic vice fixture, 6061-T6 aluminum block with carved stepped pockets,
 * high-speed spinning carbide end-mill, and flying metallic chips.
 */
export function StationCNCMillingSimulation({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center w-full h-full bg-[#090E17] overflow-hidden select-none ${className}`}
    >
      {/* Coolant / Blue Lighting Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(14,116,144,0.25)_0%,rgba(9,14,23,0.95)_75%)]" />

      <svg
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain relative z-10"
      >
        <defs>
          <linearGradient id="cncBlockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="40%" stopColor="#94A3B8" />
            <stop offset="80%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <linearGradient id="spindleSteel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="30%" stopColor="#64748B" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="carbideFlute" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* Heavy Iron Vice Table Fixture */}
        <polygon
          points="50,155 350,155 310,215 90,215"
          fill="#0F172A"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* 6061-T6 Aluminum Billet Block */}
        <polygon
          points="110,135 290,135 270,185 130,185"
          fill="url(#cncBlockGrad)"
          stroke="#E2E8F0"
          strokeWidth="1.2"
        />

        {/* Milled Stepped Pocket Cutout */}
        <polygon
          points="150,145 250,145 238,175 162,175"
          fill="#0F172A"
          stroke="#00E5FF"
          strokeWidth="1"
        />

        {/* High-Speed CNC Spindle Assembly & Carbide End-Mill */}
        <g id="spindleAssembly" transform="translate(200, 15)">
          {/* Main Spindle Housing */}
          <rect
            x="-24"
            y="0"
            width="48"
            height="48"
            rx="3"
            fill="url(#spindleSteel)"
            stroke="#94A3B8"
            strokeWidth="1"
          />
          {/* High-Torque ER20 Collet Nut */}
          <polygon
            points="-16,48 16,48 22,68 -22,68"
            fill="#0F172A"
            stroke="#CBD5E1"
            strokeWidth="1.2"
          />

          {/* 4-Flute Solid Carbide Spiral End Mill */}
          <rect
            x="-5.5"
            y="68"
            width="11"
            height="52"
            fill="url(#carbideFlute)"
            stroke="#64748B"
            strokeWidth="0.8"
          />
          {/* Spiral Flute Cut Lines */}
          <path d="M-5.5,74 Q0,80 5.5,86" stroke="#1E293B" strokeWidth="1.5" fill="none" />
          <path d="M-5.5,88 Q0,94 5.5,100" stroke="#1E293B" strokeWidth="1.5" fill="none" />
          <path d="M-5.5,102 Q0,108 5.5,114" stroke="#1E293B" strokeWidth="1.5" fill="none" />

          {/* High-Speed Rotational Velocity Ring */}
          <ellipse
            cx="0"
            cy="120"
            rx="26"
            ry="6"
            stroke="#00E5FF"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            className="animate-spindle-fast opacity-80"
          />

          {/* Cutter Tip Contact Spark Glow */}
          <circle cx="0" cy="120" r="3.5" fill="#F59E0B" />
          <circle cx="-14" cy="112" r="1.5" fill="#FDE047" className="animate-ping" />
          <circle cx="18" cy="114" r="1.5" fill="#FFFFFF" className="animate-ping" />
        </g>

        {/* HUD Text */}
        <text
          x="380"
          y="228"
          fill="#00E5FF"
          opacity="0.5"
          fontSize="7"
          fontWeight="bold"
          textAnchor="end"
          fontFamily="monospace"
        >
          CNC MILL &bull; 18,000 RPM (FEED 1200mm/m)
        </text>
      </svg>
    </div>
  );
}

/**
 * 4. PCB Prototyping & IoT Hardware Simulation
 * Features a deep soldermask substrate with glowing neon cyan circuit traces,
 * QFP microcontroller with blinking status LED and live data packet pulses.
 */
export function StationPCBSimulation({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center w-full h-full bg-[#05111A] overflow-hidden select-none ${className}`}
    >
      {/* Cyan/Green Circuit Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.25)_0%,rgba(5,17,26,0.95)_75%)]" />

      <svg
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain relative z-10"
      >
        <defs>
          <linearGradient id="pcbGreenBed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#064E3B" />
            <stop offset="50%" stopColor="#042F2E" />
            <stop offset="100%" stopColor="#022C22" />
          </linearGradient>

          <filter id="pcbCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* FR4 Circuit Substrate Plate */}
        <polygon
          points="50,140 350,140 310,215 90,215"
          fill="url(#pcbGreenBed)"
          stroke="#059669"
          strokeWidth="1.5"
        />

        {/* Glowing Cyan Copper Routing Traces */}
        <g
          filter="url(#pcbCyanGlow)"
          stroke="#00E5FF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M90,165 L140,165 L165,180 L185,180" />
          <path d="M100,185 L135,185 L155,195 L185,195" />
          <path d="M310,165 L260,165 L235,180 L215,180" />
          <path d="M300,185 L265,185 L245,195 L215,195" />
          <path d="M190,145 L190,165" />
          <path d="M210,145 L210,165" />
        </g>

        {/* Gold Plated Vias */}
        <g fill="#F59E0B" stroke="#B45309" strokeWidth="0.8">
          <circle cx="140" cy="165" r="2.5" />
          <circle cx="135" cy="185" r="2.5" />
          <circle cx="260" cy="165" r="2.5" />
          <circle cx="265" cy="185" r="2.5" />
          <circle cx="190" cy="145" r="2.5" />
          <circle cx="210" cy="145" r="2.5" />
        </g>

        {/* Central SMT Microcontroller IC Chip */}
        <g transform="translate(175, 160)">
          {/* Chip Body */}
          <rect
            x="0"
            y="0"
            width="50"
            height="42"
            rx="3"
            fill="#0F172A"
            stroke="#475569"
            strokeWidth="1.2"
          />
          {/* Marking Text */}
          <text
            x="25"
            y="20"
            fill="#94A3B8"
            fontSize="6.5"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="monospace"
          >
            ESP32-S3
          </text>
          <text
            x="25"
            y="28"
            fill="#00E5FF"
            fontSize="5.5"
            textAnchor="middle"
            fontFamily="monospace"
          >
            IDEA LAB
          </text>

          {/* Blinking Green Status LED */}
          <circle
            cx="40"
            cy="10"
            r="2.5"
            fill="#10B981"
            filter="url(#pcbCyanGlow)"
            className="animate-pulse"
          />

          {/* Left / Right Lead Pins */}
          <line x1="-6" y1="10" x2="0" y2="10" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="-6" y1="20" x2="0" y2="20" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="-6" y1="30" x2="0" y2="30" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="50" y1="10" x2="56" y2="10" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="50" y1="20" x2="56" y2="20" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="50" y1="30" x2="56" y2="30" stroke="#CBD5E1" strokeWidth="1.5" />
        </g>

        {/* HUD Text */}
        <text
          x="380"
          y="228"
          fill="#10B981"
          opacity="0.5"
          fontSize="7"
          fontWeight="bold"
          textAnchor="end"
          fontFamily="monospace"
        >
          PCB MILL &bull; 6mil ISOLATION (PASS)
        </text>
      </svg>
    </div>
  );
}
