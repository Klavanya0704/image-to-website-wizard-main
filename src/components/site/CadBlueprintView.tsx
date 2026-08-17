import React, { useState } from "react";
import { Sliders, Layers, Ruler, Crosshair, Check } from "lucide-react";
import { Product } from "@/lib/catalog";

interface CadBlueprintViewProps {
  product: Product;
}

export function CadBlueprintView({ product }: CadBlueprintViewProps) {
  const [showDimensions, setShowDimensions] = useState<boolean>(true);
  const [showInfill, setShowInfill] = useState<boolean>(true);
  const [showCenterlines, setShowCenterlines] = useState<boolean>(true);

  const key = product.image_key || "";
  const isCylinder = key.includes("cnc") || key.includes("coupler") || key.includes("acrylic");
  const isVase = key.includes("vase") || key.includes("organizer");
  const isElectronics =
    key.includes("esp32") || key.includes("drone") || key.includes("board") || key.includes("kit");

  return (
    <div className="relative w-full h-full rounded-xl sm:rounded-2xl bg-[#07132B] text-cyan-400 overflow-hidden flex flex-col justify-between border border-cyan-500/30 select-none shadow-inner">
      {/* 1. Blueprint Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00AEEF 1px, transparent 1px),
            linear-gradient(to bottom, #00AEEF 1px, transparent 1px),
            linear-gradient(to right, rgba(0, 174, 239, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 174, 239, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 10px 10px, 10px 10px",
        }}
      />

      {/* Blueprint Calibration Corner Marks */}
      <div className="absolute top-2 left-2 text-[8px] font-mono text-cyan-400/60 uppercase tracking-widest pointer-events-none">
        [+ 00.00, +00.00]
      </div>
      <div className="absolute top-2 right-2 text-[8px] font-mono text-cyan-400/60 uppercase tracking-widest pointer-events-none">
        [CAD VER 2.4 - ISO 2768-m]
      </div>

      {/* 2. Top Watermark & Meta Header */}
      <div className="relative z-10 px-3 pt-2 flex items-center justify-between text-[9px] font-mono border-b border-cyan-500/20 bg-[#07132B]/80 backdrop-blur-xs">
        <div className="flex items-center gap-1.5 text-cyan-300 font-bold tracking-wider">
          <Crosshair className="h-3 w-3 text-cyan-400 animate-spin-slow" />
          <span>SASI AICTE IDEA LAB &bull; CAD FABRICATION SPEC</span>
        </div>
        <span className="text-cyan-400/70 font-semibold">
          DWG: {product.slug.toUpperCase().slice(0, 14)}
        </span>
      </div>

      {/* 3. Main SVG Blueprint Geometry Stage */}
      <div className="relative flex-1 flex items-center justify-center p-2 sm:p-4">
        <svg
          viewBox="0 0 400 320"
          className="w-full h-full max-h-[260px] drop-shadow-[0_0_8px_rgba(0,174,239,0.35)]"
          style={{ vectorEffect: "non-scaling-stroke" }}
        >
          <defs>
            {/* Dimension Arrow Marker */}
            <marker
              id="dim-arrow-start"
              viewBox="0 0 10 10"
              refX="0"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 10 0 L 0 5 L 10 10 z" fill="#00AEEF" />
            </marker>
            <marker
              id="dim-arrow-end"
              viewBox="0 0 10 10"
              refX="10"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#00AEEF" />
            </marker>
            {/* Infill Pattern (Honeycomb) */}
            <pattern
              id="cad-infill"
              x="0"
              y="0"
              width="16"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M8 0 L16 4.5 L16 13.5 L8 18 L0 13.5 L0 4.5 Z M8 18 L16 22.5 L16 31.5 L8 36 L0 31.5 L0 22.5 Z"
                fill="none"
                stroke="#00AEEF"
                strokeWidth="0.6"
                strokeOpacity="0.4"
              />
            </pattern>
          </defs>

          {/* A. CYLINDRICAL / MECHANICAL PART (Coupler / CNC) */}
          {isCylinder && (
            <g>
              {/* Infill Layer */}
              {showInfill && (
                <rect x="130" y="60" width="140" height="180" rx="4" fill="url(#cad-infill)" />
              )}
              {/* Outer Cylinder Body */}
              <rect
                x="130"
                y="60"
                width="140"
                height="180"
                rx="6"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="2.2"
              />
              {/* Inner Bore Hole (Hidden / Dashed) */}
              <rect
                x="170"
                y="60"
                width="60"
                height="180"
                fill="none"
                stroke="#00AEEF"
                strokeWidth="1.2"
                strokeDasharray="4,4"
              />
              {/* Helical Spiral Flex Cuts */}
              <path
                d="M 130 110 Q 200 130 270 110 M 130 135 Q 200 155 270 135 M 130 160 Q 200 180 270 160 M 130 185 Q 200 205 270 185"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="2"
              />
              {/* Clamping Set Screw Holes */}
              <circle cx="150" cy="85" r="7" fill="#07132B" stroke="#00E5FF" strokeWidth="1.8" />
              <circle cx="150" cy="85" r="3" fill="#00E5FF" />
              <circle cx="250" cy="215" r="7" fill="#07132B" stroke="#00E5FF" strokeWidth="1.8" />
              <circle cx="250" cy="215" r="3" fill="#00E5FF" />

              {/* Centerline */}
              {showCenterlines && (
                <line
                  x1="200"
                  y1="35"
                  x2="200"
                  y2="265"
                  stroke="#FF4B4B"
                  strokeWidth="1"
                  strokeDasharray="10,3,2,3"
                />
              )}

              {/* Dimension Annotations */}
              {showDimensions && (
                <g className="font-mono text-[9px] font-bold" fill="#00E5FF">
                  {/* Height Dimension (Left) */}
                  <line
                    x1="105"
                    y1="60"
                    x2="105"
                    y2="240"
                    stroke="#00AEEF"
                    strokeWidth="1"
                    markerStart="url(#dim-arrow-start)"
                    markerEnd="url(#dim-arrow-end)"
                  />
                  <line
                    x1="125"
                    y1="60"
                    x2="100"
                    y2="60"
                    stroke="#00AEEF"
                    strokeWidth="0.8"
                    strokeDasharray="2,2"
                  />
                  <line
                    x1="125"
                    y1="240"
                    x2="100"
                    y2="240"
                    stroke="#00AEEF"
                    strokeWidth="0.8"
                    strokeDasharray="2,2"
                  />
                  <text x="65" y="155" transform="rotate(-90 65,155)" textAnchor="middle">
                    L = 30.00mm (&plusmn;0.05)
                  </text>

                  {/* Outer Diameter (Top) */}
                  <line
                    x1="130"
                    y1="45"
                    x2="270"
                    y2="45"
                    stroke="#00AEEF"
                    strokeWidth="1"
                    markerStart="url(#dim-arrow-start)"
                    markerEnd="url(#dim-arrow-end)"
                  />
                  <text x="200" y="38" textAnchor="middle">
                    &Oslash; 25.00mm
                  </text>

                  {/* Inner Bore Callout (Bottom) */}
                  <line
                    x1="170"
                    y1="255"
                    x2="230"
                    y2="255"
                    stroke="#00AEEF"
                    strokeWidth="1"
                    markerStart="url(#dim-arrow-start)"
                    markerEnd="url(#dim-arrow-end)"
                  />
                  <text x="200" y="272" textAnchor="middle">
                    &Oslash; 8.00mm H7
                  </text>
                </g>
              )}
            </g>
          )}

          {/* B. VASE / PARAMETRIC ORGANIC 3D GEOMETRY */}
          {isVase && (
            <g>
              {/* Infill Pattern inside vase body */}
              {showInfill && (
                <path
                  d="M 160 50 Q 130 140 110 200 Q 130 250 140 260 L 260 260 Q 270 250 290 200 Q 270 140 240 50 Z"
                  fill="url(#cad-infill)"
                />
              )}
              {/* Outer Spiral Contour */}
              <path
                d="M 160 50 Q 130 140 110 200 Q 130 250 140 260 L 260 260 Q 270 250 290 200 Q 270 140 240 50 Z"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="2.2"
              />
              {/* Internal Isometric Section Ribs */}
              <ellipse
                cx="200"
                cy="50"
                rx="40"
                ry="10"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="1.5"
              />
              <ellipse
                cx="200"
                cy="120"
                rx="55"
                ry="12"
                fill="none"
                stroke="#00AEEF"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <ellipse
                cx="200"
                cy="180"
                rx="85"
                ry="16"
                fill="none"
                stroke="#00AEEF"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <ellipse
                cx="200"
                cy="260"
                rx="60"
                ry="10"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="1.5"
              />

              {/* Twisted Spiral Flutes */}
              <path d="M 160 50 Q 220 150 140 260" fill="none" stroke="#00E5FF" strokeWidth="1.4" />
              <path d="M 200 50 Q 260 150 200 260" fill="none" stroke="#00E5FF" strokeWidth="1.4" />
              <path d="M 240 50 Q 300 150 260 260" fill="none" stroke="#00E5FF" strokeWidth="1.4" />

              {/* Centerline */}
              {showCenterlines && (
                <line
                  x1="200"
                  y1="30"
                  x2="200"
                  y2="280"
                  stroke="#FF4B4B"
                  strokeWidth="1"
                  strokeDasharray="10,3,2,3"
                />
              )}

              {/* Dimensions */}
              {showDimensions && (
                <g className="font-mono text-[9px] font-bold" fill="#00E5FF">
                  {/* Height */}
                  <line
                    x1="80"
                    y1="50"
                    x2="80"
                    y2="260"
                    stroke="#00AEEF"
                    strokeWidth="1"
                    markerStart="url(#dim-arrow-start)"
                    markerEnd="url(#dim-arrow-end)"
                  />
                  <text x="40" y="160" transform="rotate(-90 40,160)" textAnchor="middle">
                    H = 200.0mm
                  </text>

                  {/* Max Width */}
                  <line
                    x1="110"
                    y1="285"
                    x2="290"
                    y2="285"
                    stroke="#00AEEF"
                    strokeWidth="1"
                    markerStart="url(#dim-arrow-start)"
                    markerEnd="url(#dim-arrow-end)"
                  />
                  <text x="200" y="300" textAnchor="middle">
                    &Oslash; MAX = 120.0mm (t = 1.6mm)
                  </text>
                </g>
              )}
            </g>
          )}

          {/* C. ELECTRONICS / IOT / PCB / DEFAULT MECHANISM */}
          {!isCylinder && !isVase && (
            <g>
              {/* PCB Base Outline */}
              <rect
                x="90"
                y="55"
                width="220"
                height="190"
                rx="8"
                fill="#07132B"
                stroke="#00E5FF"
                strokeWidth="2.2"
              />
              {/* Infill Grid / Ground Plane */}
              {showInfill && (
                <rect x="100" y="65" width="200" height="170" rx="4" fill="url(#cad-infill)" />
              )}
              {/* MCU / IC Package */}
              <rect
                x="160"
                y="110"
                width="80"
                height="80"
                rx="4"
                fill="#0A192F"
                stroke="#00E5FF"
                strokeWidth="1.8"
              />
              <circle cx="170" cy="120" r="3" fill="#00E5FF" />
              <text
                x="200"
                y="155"
                fill="#00E5FF"
                textAnchor="middle"
                className="font-mono text-[9px] font-bold"
              >
                MCU-CORE
              </text>

              {/* Pin Headers */}
              <g fill="#00E5FF">
                <rect x="95" y="70" width="8" height="160" rx="2" />
                <rect x="297" y="70" width="8" height="160" rx="2" />
              </g>

              {/* 4 Corner Mounting Holes */}
              <circle cx="105" cy="70" r="5" fill="#07132B" stroke="#00E5FF" strokeWidth="1.5" />
              <circle cx="295" cy="70" r="5" fill="#07132B" stroke="#00E5FF" strokeWidth="1.5" />
              <circle cx="105" cy="230" r="5" fill="#07132B" stroke="#00E5FF" strokeWidth="1.5" />
              <circle cx="295" cy="230" r="5" fill="#07132B" stroke="#00E5FF" strokeWidth="1.5" />

              {/* Centerlines */}
              {showCenterlines && (
                <g stroke="#FF4B4B" strokeWidth="1" strokeDasharray="8,3,2,3">
                  <line x1="200" y1="35" x2="200" y2="265" />
                  <line x1="70" y1="150" x2="330" y2="150" />
                </g>
              )}

              {/* Dimensions */}
              {showDimensions && (
                <g className="font-mono text-[9px] font-bold" fill="#00E5FF">
                  {/* Width (Top) */}
                  <line
                    x1="90"
                    y1="40"
                    x2="310"
                    y2="40"
                    stroke="#00AEEF"
                    strokeWidth="1"
                    markerStart="url(#dim-arrow-start)"
                    markerEnd="url(#dim-arrow-end)"
                  />
                  <text x="200" y="32" textAnchor="middle">
                    W = 54.00mm
                  </text>

                  {/* Height (Right) */}
                  <line
                    x1="325"
                    y1="55"
                    x2="325"
                    y2="245"
                    stroke="#00AEEF"
                    strokeWidth="1"
                    markerStart="url(#dim-arrow-start)"
                    markerEnd="url(#dim-arrow-end)"
                  />
                  <text x="360" y="155" transform="rotate(90 360,155)" textAnchor="middle">
                    H = 48.00mm (&plusmn;0.1mm)
                  </text>
                </g>
              )}
            </g>
          )}
        </svg>
      </div>

      {/* 4. Bottom Interactive CAD Layer Toggles */}
      <div className="relative z-10 px-2 sm:px-3 py-1.5 bg-[#0A192F]/90 backdrop-blur-xs border-t border-cyan-500/25 flex items-center justify-between gap-1 text-[8px] sm:text-[9px] font-mono">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Dimensions Toggle */}
          <button
            type="button"
            onClick={() => setShowDimensions(!showDimensions)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-all border ${
              showDimensions
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/40"
                : "bg-transparent text-cyan-400/40 border-transparent hover:text-cyan-300"
            }`}
          >
            <Ruler className="h-2.5 w-2.5" />
            <span>Dims</span>
            {showDimensions && <Check className="h-2 w-2 text-cyan-400" />}
          </button>

          {/* Infill Structure Toggle */}
          <button
            type="button"
            onClick={() => setShowInfill(!showInfill)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-all border ${
              showInfill
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/40"
                : "bg-transparent text-cyan-400/40 border-transparent hover:text-cyan-300"
            }`}
          >
            <Layers className="h-2.5 w-2.5" />
            <span>Infill</span>
            {showInfill && <Check className="h-2 w-2 text-cyan-400" />}
          </button>

          {/* Centerlines Toggle */}
          <button
            type="button"
            onClick={() => setShowCenterlines(!showCenterlines)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-all border ${
              showCenterlines
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/40"
                : "bg-transparent text-cyan-400/40 border-transparent hover:text-cyan-300"
            }`}
          >
            <Crosshair className="h-2.5 w-2.5" />
            <span>Datum</span>
            {showCenterlines && <Check className="h-2 w-2 text-cyan-400" />}
          </button>
        </div>

        <span className="text-[8px] text-cyan-400/60 font-semibold truncate">
          TOL: &plusmn;0.05mm
        </span>
      </div>
    </div>
  );
}
