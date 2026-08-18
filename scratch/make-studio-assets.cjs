const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "../public/products");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const assets = {
  // 1. 3D Printed Geometric Vase (Black spiral lattice on light wood tabletop)
  "3d-vase.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
    <defs>
      <linearGradient id="wallBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#E2E8F0"/>
        <stop offset="65%" stop-color="#CBD5E1"/>
        <stop offset="66%" stop-color="#D7A15C"/>
        <stop offset="100%" stop-color="#C28945"/>
      </linearGradient>
      <radialGradient id="vaseShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#1E293B" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#1E293B" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="blackMatte" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#334155"/>
        <stop offset="40%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
      <linearGradient id="rimLight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#64748B"/>
        <stop offset="50%" stop-color="#94A3B8"/>
        <stop offset="100%" stop-color="#334155"/>
      </linearGradient>
    </defs>
    <rect width="600" height="500" fill="url(#wallBg)"/>
    <ellipse cx="300" cy="410" rx="140" ry="22" fill="url(#vaseShadow)"/>

    <!-- Black Geometric Spiral Lattice Vase -->
    <g transform="translate(180, 80)">
      <!-- Base & Outer Profile -->
      <path d="M70 320 Q 30 220 50 140 Q 70 50 120 40 Q 170 50 190 140 Q 210 220 170 320 Z" fill="url(#blackMatte)" stroke="#475569" stroke-width="1"/>
      
      <!-- Spiral Woven Strands (Clockwise & Counter-Clockwise Lattice) -->
      ${Array.from({ length: 12 })
        .map((_, i) => {
          const offset = i * 14;
          return `
          <path d="M${60 + offset} 40 Q${190 - offset * 0.5} 180 ${170 - offset} 320" fill="none" stroke="url(#rimLight)" stroke-width="5" stroke-linecap="round"/>
          <path d="M${180 - offset} 40 Q${50 + offset * 0.5} 180 ${70 + offset} 320" fill="none" stroke="#1E293B" stroke-width="5" stroke-linecap="round"/>
          <path d="M${180 - offset} 40 Q${50 + offset * 0.5} 180 ${70 + offset} 320" fill="none" stroke="#64748B" stroke-width="2" stroke-linecap="round"/>
        `;
        })
        .join("")}
      
      <!-- Top Opening Rim -->
      <ellipse cx="120" cy="40" rx="42" ry="12" fill="#0F172A" stroke="#94A3B8" stroke-width="2"/>
      <ellipse cx="120" cy="40" rx="30" ry="8" fill="#020617"/>
    </g>
  </svg>`,

  // 2. Universal Foldable Phone Stand (Black stand with phone on clean light gray background)
  "phone-stand.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
    <defs>
      <linearGradient id="bgPhone" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#F1F5F9"/>
        <stop offset="100%" stop-color="#E2E8F0"/>
      </linearGradient>
      <linearGradient id="phoneDisplay" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDA4AF"/>
        <stop offset="50%" stop-color="#FB7185"/>
        <stop offset="100%" stop-color="#E11D48"/>
      </linearGradient>
      <radialGradient id="standShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#0F172A" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#0F172A" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="600" height="500" fill="url(#bgPhone)"/>
    <ellipse cx="300" cy="410" rx="160" ry="24" fill="url(#standShadow)"/>

    <!-- Matte Black Foldable Phone Stand -->
    <g transform="translate(190, 160)">
      <!-- Weighted Base -->
      <polygon points="40,240 200,240 180,265 20,265" fill="#1E293B" stroke="#475569" stroke-width="2"/>
      <polygon points="40,240 20,265 20,275 40,250" fill="#0F172A"/>
      <polygon points="20,275 180,275 180,265 20,265" fill="#0F172A"/>
      
      <!-- Hinge Joint -->
      <ellipse cx="110" cy="245" rx="18" ry="8" fill="#334155" stroke="#64748B"/>
      
      <!-- Main Stem / Arm -->
      <polygon points="100,245 140,110 160,115 120,250" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>

      <!-- Cradle Shelf & Hooks -->
      <polygon points="60,140 200,105 205,125 65,160" fill="#0F172A" stroke="#334155"/>
      <rect x="70" y="140" width="16" height="30" rx="4" fill="#1E293B" stroke="#475569"/>
      <rect x="180" y="110" width="16" height="30" rx="4" fill="#1E293B" stroke="#475569"/>

      <!-- Smartphone placed on stand (Salmon / Peach Screen) -->
      <g transform="translate(50, -40) rotate(-10)">
        <!-- Phone Frame -->
        <rect x="0" y="0" width="180" height="250" rx="18" fill="#0F172A" stroke="#475569" stroke-width="2"/>
        <!-- Screen -->
        <rect x="8" y="10" width="164" height="230" rx="12" fill="url(#phoneDisplay)"/>
        <!-- Soft screen reflection -->
        <polygon points="8,10 100,10 40,240 8,240" fill="#FFFFFF" fill-opacity="0.15"/>
      </g>
    </g>
  </svg>`,

  // 3. Mini Desk Organizer (White modern desk organizer with pens on pure white studio background)
  "desk-organizer.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
    <defs>
      <linearGradient id="bgWhiteStudio" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="80%" stop-color="#F8FAFC"/>
        <stop offset="100%" stop-color="#E2E8F0"/>
      </linearGradient>
      <linearGradient id="whiteMatte" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="60%" stop-color="#F1F5F9"/>
        <stop offset="100%" stop-color="#CBD5E1"/>
      </linearGradient>
      <radialGradient id="orgShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#64748B" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#64748B" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="600" height="500" fill="url(#bgWhiteStudio)"/>
    <ellipse cx="300" cy="410" rx="150" ry="20" fill="url(#orgShadow)"/>

    <!-- White Modern Desk Organizer Caddy -->
    <g transform="translate(180, 110)">
      <!-- Pens standing inside -->
      <line x1="90" y1="120" x2="65" y2="15" stroke="#1E293B" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="120" x2="65" y2="15" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
      <line x1="120" y1="110" x2="120" y2="5" stroke="#334155" stroke-width="8" stroke-linecap="round"/>
      <line x1="120" y1="110" x2="120" y2="5" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
      <line x1="140" y1="120" x2="165" y2="20" stroke="#475569" stroke-width="7" stroke-linecap="round"/>
      <line x1="140" y1="120" x2="165" y2="20" stroke="#F8FAFC" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Main Organizer Geometric Compartments -->
      <!-- Left Tall Cup -->
      <polygon points="40,260 110,260 130,130 60,130" fill="url(#whiteMatte)" stroke="#94A3B8" stroke-width="1.5"/>
      <ellipse cx="95" cy="130" rx="35" ry="12" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1.5"/>

      <!-- Center Stepped Section -->
      <polygon points="110,260 180,260 200,160 130,160" fill="url(#whiteMatte)" stroke="#94A3B8" stroke-width="1.5"/>
      <ellipse cx="165" cy="160" rx="35" ry="12" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1.5"/>

      <!-- Right Shallow Tray for clips/cards -->
      <polygon points="180,260 230,260 245,210 195,210" fill="url(#whiteMatte)" stroke="#94A3B8" stroke-width="1.5"/>
      <polygon points="40,260 230,260 220,270 30,270" fill="#94A3B8"/>
    </g>
  </svg>`,

  // 4. Cable Management Clip Set (Black and white clips with cables on light gray studio background)
  "cable-clips.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
    <defs>
      <linearGradient id="bgClipsStudio" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#F8FAFC"/>
        <stop offset="100%" stop-color="#E2E8F0"/>
      </linearGradient>
      <radialGradient id="clipShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#64748B" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#64748B" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="matteBlackClip" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#334155"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
      <linearGradient id="matteWhiteClip" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#CBD5E1"/>
      </linearGradient>
    </defs>
    <rect width="600" height="500" fill="url(#bgClipsStudio)"/>
    <ellipse cx="300" cy="380" rx="190" ry="24" fill="url(#clipShadow)"/>

    <!-- Routed White USB Cables running diagonally -->
    <path d="M80 180 Q 250 320 520 220" fill="none" stroke="#CBD5E1" stroke-width="16" stroke-linecap="round"/>
    <path d="M80 180 Q 250 320 520 220" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round"/>
    
    <path d="M120 140 Q 280 290 540 180" fill="none" stroke="#CBD5E1" stroke-width="16" stroke-linecap="round"/>
    <path d="M120 140 Q 280 290 540 180" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round"/>

    <!-- Set of 3D Printed Clips Clamped Over Cables -->
    <!-- Clip 1: White Matte Clip (Left) -->
    <g transform="translate(190, 220)">
      <rect x="0" y="0" width="65" height="70" rx="14" fill="url(#matteWhiteClip)" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="32" cy="30" r="14" fill="#CBD5E1"/>
      <path d="M25 0 L40 0 L40 18 L25 18 Z" fill="#E2E8F0"/>
    </g>

    <!-- Clip 2: Black Matte Clip (Center) -->
    <g transform="translate(280, 240)">
      <rect x="0" y="0" width="70" height="75" rx="14" fill="url(#matteBlackClip)" stroke="#475569" stroke-width="1.5"/>
      <circle cx="35" cy="32" r="14" fill="#020617"/>
      <path d="M28 0 L42 0 L42 18 L28 18 Z" fill="#0F172A"/>
    </g>

    <!-- Clip 3: White Matte Clip (Right) -->
    <g transform="translate(370, 200)">
      <rect x="0" y="0" width="65" height="70" rx="14" fill="url(#matteWhiteClip)" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="32" cy="30" r="14" fill="#CBD5E1"/>
      <path d="M25 0 L40 0 L40 18 L25 18 Z" fill="#E2E8F0"/>
    </g>
  </svg>`,

  // 5. Resin Architectural Model (Detailed gray resin temple/architecture model on clean studio background)
  "architectural-model.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
    <defs>
      <linearGradient id="bgArchStudio" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#F8FAFC"/>
        <stop offset="100%" stop-color="#E2E8F0"/>
      </linearGradient>
      <linearGradient id="grayResin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#94A3B8"/>
        <stop offset="50%" stop-color="#64748B"/>
        <stop offset="100%" stop-color="#475569"/>
      </linearGradient>
      <radialGradient id="archShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#475569" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#475569" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="600" height="500" fill="url(#bgArchStudio)"/>
    <ellipse cx="300" cy="410" rx="170" ry="24" fill="url(#archShadow)"/>

    <!-- Detailed SLA Resin 3D Printed Architectural Temple Model -->
    <g transform="translate(150, 140)">
      <!-- Tiered Base Plinth & Steps -->
      <polygon points="10,240 290,240 280,260 20,260" fill="#475569" stroke="#334155"/>
      <polygon points="30,225 270,225 260,240 40,240" fill="#64748B" stroke="#475569"/>
      <polygon points="50,210 250,210 240,225 60,225" fill="#94A3B8" stroke="#64748B"/>

      <!-- Colonnade (Classical Pillars Array) -->
      ${Array.from({ length: 8 })
        .map((_, i) => {
          const x = 70 + i * 22;
          return `
          <rect x="${x}" y="140" width="10" height="70" rx="2" fill="#E2E8F0" stroke="#64748B" stroke-width="1"/>
          <rect x="${x - 2}" y="136" width="14" height="4" fill="#CBD5E1"/>
          <rect x="${x - 2}" y="206" width="14" height="4" fill="#CBD5E1"/>
        `;
        })
        .join("")}

      <!-- Main Entablature / Architrave -->
      <polygon points="50,136 250,136 240,120 60,120" fill="url(#grayResin)" stroke="#475569"/>
      
      <!-- Tiered Roof & Central Dome / Shikhara Tower -->
      <polygon points="70,120 230,120 210,80 90,80" fill="url(#grayResin)" stroke="#334155"/>
      <polygon points="90,80 210,80 180,40 120,40" fill="url(#grayResin)" stroke="#334155"/>
      <path d="M120 40 Q 150 5 180 40 Z" fill="#CBD5E1" stroke="#475569"/>
      
      <!-- Finial Spire -->
      <line x1="150" y1="5" x2="150" y2="-15" stroke="#E2E8F0" stroke-width="3"/>
      <circle cx="150" cy="-15" r="4" fill="#F8FAFC"/>
    </g>
  </svg>`,

  // 6. Planter Pot – Modern Hex Design (Black hex lattice planter with succulent on white studio background)
  "hex-planter.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
    <defs>
      <linearGradient id="bgPlantStudio" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="85%" stop-color="#F8FAFC"/>
        <stop offset="100%" stop-color="#E2E8F0"/>
      </linearGradient>
      <radialGradient id="plantShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#334155" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#334155" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="succulentGreen" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#4ADE80"/>
        <stop offset="60%" stop-color="#16A34A"/>
        <stop offset="100%" stop-color="#14532D"/>
      </linearGradient>
    </defs>
    <rect width="600" height="500" fill="url(#bgPlantStudio)"/>
    <ellipse cx="300" cy="410" rx="140" ry="20" fill="url(#plantShadow)"/>

    <!-- Green Succulent Plant on Top -->
    <g transform="translate(300, 170)">
      <!-- Succulent Rosette Petals -->
      <path d="M0 0 C -35 -50, -70 -35, -80 0 C -50 15, -25 15, 0 0 Z" fill="url(#succulentGreen)" stroke="#86EFAC" stroke-width="1.5"/>
      <path d="M0 0 C 35 -50, 70 -35, 80 0 C 50 15, 25 15, 0 0 Z" fill="url(#succulentGreen)" stroke="#86EFAC" stroke-width="1.5"/>
      <path d="M0 0 C -15 -80, 15 -80, 0 -95 C -15 -70, -8 -35, 0 0 Z" fill="url(#succulentGreen)" stroke="#86EFAC" stroke-width="1.5"/>
      <path d="M0 0 C -50 -35, -35 -70, -25 -75 C -8 -50, -8 -15, 0 0 Z" fill="url(#succulentGreen)" stroke="#86EFAC" stroke-width="1.5"/>
      <path d="M0 0 C 50 -35, 35 -70, 25 -75 C 8 -50, 8 -15, 0 0 Z" fill="url(#succulentGreen)" stroke="#86EFAC" stroke-width="1.5"/>
      <circle cx="0" cy="-8" r="12" fill="#86EFAC" stroke="#16A34A"/>
    </g>

    <!-- Black Hex Lattice Planter Pot -->
    <g transform="translate(185, 170)">
      <!-- Spherical / Hex Rounded Body -->
      <path d="M30 60 Q 0 150 50 210 Q 115 250 180 210 Q 230 150 200 60 Z" fill="#0F172A" stroke="#334155" stroke-width="2"/>
      
      <!-- Hexagonal Woven Facets Array -->
      ${Array.from({ length: 5 })
        .map((_, r) =>
          Array.from({ length: 6 })
            .map((_, c) => {
              const x = 40 + c * 26 + (r % 2 ? 13 : 0);
              const y = 70 + r * 26;
              return `
            <polygon points="${x},${y} ${x + 10},${y - 5} ${x + 20},${y} ${x + 20},${y + 12} ${x + 10},${y + 17} ${x},${y + 12}" fill="none" stroke="#64748B" stroke-width="2"/>
          `;
            })
            .join(""),
        )
        .join("")}

      <!-- Planter Top Rim -->
      <ellipse cx="115" cy="60" rx="85" ry="20" fill="#020617" stroke="#475569" stroke-width="2"/>
      <ellipse cx="115" cy="60" rx="70" ry="14" fill="#3E2723"/>
    </g>
  </svg>`,
};

for (const [filename, content] of Object.entries(assets)) {
  fs.writeFileSync(path.join(outDir, filename), content.trim(), "utf8");
  console.log("Created studio asset:", filename);
}

console.log("Finished generating all studio product assets.");
