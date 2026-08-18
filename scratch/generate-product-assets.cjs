const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/products');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const additionalAssets = {
  'sensor-kit.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
    <defs>
      <linearGradient id="bgSns" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#022C22"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#bgSns)"/>
    <circle cx="300" cy="300" r="230" fill="#10B981" fill-opacity="0.15"/>
    <ellipse cx="300" cy="510" rx="180" ry="24" fill="#000" fill-opacity="0.6"/>

    <!-- 37-in-1 Sensor Modules Compartment Organizer Case -->
    <g transform="translate(110, 140)">
      <!-- Transparent Organizer Box Grid -->
      <rect x="0" y="0" width="380" height="280" rx="16" fill="#0F172A" stroke="#34D399" stroke-width="2"/>
      <rect x="5" y="5" width="370" height="270" rx="12" fill="#064E3B" fill-opacity="0.3"/>
      
      <!-- Compartment Dividers & Micro Modules -->
      ${Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 5 }).map((_, c) => {
          const x = 15 + c * 70;
          const y = 15 + r * 62;
          const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];
          const modColor = colors[(r * 5 + c) % colors.length];
          return `
            <rect x="${x}" y="${y}" width="65" height="56" rx="6" fill="#022C22" stroke="#059669" stroke-width="1"/>
            <rect x="${x + 10}" y="${y + 8}" width="45" height="32" rx="3" fill="#0F172A" stroke="${modColor}" stroke-width="1.5"/>
            <circle cx="${x + 22}" cy="${y + 24}" r="5" fill="${modColor}"/>
            <circle cx="${x + 42}" cy="${y + 24}" r="3" fill="#FBBF24"/>
            <!-- 3-Pin Header -->
            <line x1="${x + 15}" y1="${y + 44}" x2="${x + 50}" y2="${y + 44}" stroke="#FBBF24" stroke-width="2" stroke-dasharray="4,4"/>
          `;
        }).join('')
      ).join('')}
    </g>
    <rect x="30" y="30" rx="8" width="160" height="26" fill="#047857" fill-opacity="0.2" stroke="#34D399" stroke-width="1"/>
    <text x="110" y="47" fill="#34D399" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="1">37-IN-1 SENSOR SUITE</text>
  </svg>`,

  'prototype-pcb.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
    <defs>
      <linearGradient id="bgPcb" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#064E3B"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#bgPcb)"/>
    <circle cx="300" cy="300" r="230" fill="#10B981" fill-opacity="0.12"/>
    <ellipse cx="300" cy="510" rx="180" ry="24" fill="#000" fill-opacity="0.6"/>

    <!-- Double-Sided FR4 Prototype PCB Perfboards Pack -->
    <g transform="translate(150, 120)">
      <!-- Bottom Layer Board (Shadow offset) -->
      <rect x="25" y="25" width="280" height="240" rx="10" fill="#022C22" stroke="#047857" stroke-width="2"/>
      <!-- Top Prominent Perfboard -->
      <rect x="0" y="0" width="280" height="240" rx="10" fill="#064E3B" stroke="#34D399" stroke-width="2"/>
      <!-- Gold Plated Through-Hole 2.54mm Grid Array -->
      ${Array.from({ length: 8 }).map((_, r) =>
        Array.from({ length: 10 }).map((_, c) => {
          const x = 25 + c * 25;
          const y = 25 + r * 25;
          return `
            <circle cx="${x}" cy="${y}" r="6" fill="#FBBF24" stroke="#D97706" stroke-width="1"/>
            <circle cx="${x}" cy="${y}" r="2" fill="#022C22"/>
          `;
        }).join('')
      ).join('')}
      <!-- Silkscreen labels & Corner Mounting Holes -->
      <circle cx="15" cy="15" r="5" fill="#E2E8F0"/>
      <circle cx="265" cy="15" r="5" fill="#E2E8F0"/>
      <circle cx="15" cy="225" r="5" fill="#E2E8F0"/>
      <circle cx="265" cy="225" r="5" fill="#E2E8F0"/>
      <text x="140" y="232" fill="#A7F3D0" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle" letter-spacing="2">FR4 DOUBLE-SIDED PTH</text>
    </g>
    <rect x="30" y="30" rx="8" width="160" height="26" fill="#047857" fill-opacity="0.2" stroke="#34D399" stroke-width="1"/>
    <text x="110" y="47" fill="#34D399" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="1">10-PACK FR4 PERFBOARD</text>
  </svg>`,

  'drone-propellers.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
    <defs>
      <linearGradient id="bgPrp" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1E1B4B"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
      <linearGradient id="bladeRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EF4444"/>
        <stop offset="100%" stop-color="#991B1B"/>
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#bgPrp)"/>
    <circle cx="300" cy="300" r="230" fill="#EF4444" fill-opacity="0.15"/>
    <ellipse cx="300" cy="510" rx="180" ry="24" fill="#000" fill-opacity="0.6"/>

    <!-- 5-inch Tri-Blade Aerodynamic Propellers -->
    <g transform="translate(300, 280)">
      <!-- 3 Blades at 120 degree angles -->
      ${[0, 120, 240].map(angle => `
        <g transform="rotate(${angle})">
          <!-- Aerodynamic curved airfoil blade -->
          <path d="M 0,-15 C 30,-50, 45,-120, 20,-170 C 0,-185, -20,-160, -20,-120 C -15,-60, -10,-30, 0,-15 Z" fill="url(#bladeRed)" stroke="#FCA5A5" stroke-width="2"/>
          <path d="M 5,-40 Q 20,-100 10,-150" stroke="#FEE2E2" stroke-width="2" opacity="0.6" fill="none"/>
        </g>
      `).join('')}
      <!-- Propeller Center Hub -->
      <circle cx="0" cy="0" r="28" fill="#1E293B" stroke="#F8FAFC" stroke-width="2"/>
      <circle cx="0" cy="0" r="12" fill="#020617" stroke="#EF4444" stroke-width="2"/>
    </g>
    <rect x="30" y="30" rx="8" width="160" height="26" fill="#EF4444" fill-opacity="0.2" stroke="#F87171" stroke-width="1"/>
    <text x="110" y="47" fill="#F87171" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="1">5-INCH TRI-BLADE 4-PR</text>
  </svg>`,
};

for (const [filename, content] of Object.entries(additionalAssets)) {
  fs.writeFileSync(path.join(outDir, filename), content.trim(), 'utf8');
  console.log('Created asset:', filename);
}
