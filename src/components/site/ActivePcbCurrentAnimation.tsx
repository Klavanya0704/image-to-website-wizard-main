import React, { useEffect, useRef } from "react";

/**
 * Premium Realistic PCB Current & Signal Flow Animation (HTML5 Canvas 60fps)
 * Simulates a high-tech FR4 circuit board with central QFP microcontroller,
 * peripheral SMD components, gold ENIG pads, orthogonal copper routing traces,
 * and bright electric cyan/blue current packet pulses streaming between components in a 5.0s loop.
 */
export function ActivePcbCurrentAnimation({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const LOOP_DURATION = 4800; // 4.8s seamless loop

    const W = 480;
    const H = 280;
    canvas.width = W;
    canvas.height = H;

    const centerX = W / 2;
    const centerY = H / 2;

    // Define multi-segment orthogonal circuit trace paths
    interface Point {
      x: number;
      y: number;
    }
    interface Trace {
      points: Point[];
      color: string;
      speed: number;
      phase: number;
      pulseCount: number;
      direction: "inward" | "outward";
    }

    const traces: Trace[] = [
      // Left Bus -> Central Processor
      {
        points: [
          { x: 30, y: 70 },
          { x: 110, y: 70 },
          { x: 150, y: 110 },
          { x: centerX - 36, y: 110 },
        ],
        color: "#00E5FF",
        speed: 1.0,
        phase: 0.0,
        pulseCount: 2,
        direction: "inward",
      },
      {
        points: [
          { x: 30, y: 140 },
          { x: 120, y: 140 },
          { x: centerX - 36, y: 140 },
        ],
        color: "#38BDF8",
        speed: 1.2,
        phase: 0.25,
        pulseCount: 3,
        direction: "inward",
      },
      {
        points: [
          { x: 30, y: 210 },
          { x: 100, y: 210 },
          { x: 140, y: 170 },
          { x: centerX - 36, y: 170 },
        ],
        color: "#00E5FF",
        speed: 1.1,
        phase: 0.5,
        pulseCount: 2,
        direction: "inward",
      },

      // Top Bus -> Central Processor
      {
        points: [
          { x: 170, y: 20 },
          { x: 170, y: 65 },
          { x: centerX - 18, y: centerY - 36 },
        ],
        color: "#00E5FF",
        speed: 1.3,
        phase: 0.15,
        pulseCount: 2,
        direction: "inward",
      },
      {
        points: [
          { x: centerX, y: 20 },
          { x: centerX, y: centerY - 36 },
        ],
        color: "#60A5FA",
        speed: 0.9,
        phase: 0.4,
        pulseCount: 2,
        direction: "inward",
      },
      {
        points: [
          { x: 310, y: 20 },
          { x: 310, y: 65 },
          { x: centerX + 18, y: centerY - 36 },
        ],
        color: "#00E5FF",
        speed: 1.2,
        phase: 0.65,
        pulseCount: 2,
        direction: "inward",
      },

      // Central Processor -> Right IoT / Memory Peripherals
      {
        points: [
          { x: centerX + 36, y: 110 },
          { x: 330, y: 110 },
          { x: 370, y: 70 },
          { x: 450, y: 70 },
        ],
        color: "#00E5FF",
        speed: 1.1,
        phase: 0.2,
        pulseCount: 2,
        direction: "outward",
      },
      {
        points: [
          { x: centerX + 36, y: 140 },
          { x: 360, y: 140 },
          { x: 450, y: 140 },
        ],
        color: "#38BDF8",
        speed: 1.4,
        phase: 0.45,
        pulseCount: 3,
        direction: "outward",
      },
      {
        points: [
          { x: centerX + 36, y: 170 },
          { x: 340, y: 170 },
          { x: 380, y: 210 },
          { x: 450, y: 210 },
        ],
        color: "#00E5FF",
        speed: 1.0,
        phase: 0.7,
        pulseCount: 2,
        direction: "outward",
      },

      // Central Processor -> Bottom Crystal / Radio Circuit
      {
        points: [
          { x: centerX - 18, y: centerY + 36 },
          { x: 170, y: 215 },
          { x: 170, y: 260 },
        ],
        color: "#34D399",
        speed: 1.0,
        phase: 0.35,
        pulseCount: 2,
        direction: "outward",
      },
      {
        points: [
          { x: centerX + 18, y: centerY + 36 },
          { x: 310, y: 215 },
          { x: 310, y: 260 },
        ],
        color: "#00E5FF",
        speed: 1.2,
        phase: 0.8,
        pulseCount: 2,
        direction: "outward",
      },
    ];

    // Precalculate total length of each trace for accurate parameterization
    const getTraceLength = (pts: Point[]) => {
      let total = 0;
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        if (p0 && p1) {
          total += Math.hypot(p1.x - p0.x, p1.y - p0.y);
        }
      }
      return total;
    };

    const getPointAlongTrace = (pts: Point[], dist: number): Point => {
      let traveled = 0;
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        if (!p0 || !p1) continue;

        const segLen = Math.hypot(p1.x - p0.x, p1.y - p0.y);
        if (traveled + segLen >= dist) {
          const t = segLen === 0 ? 0 : (dist - traveled) / segLen;
          return {
            x: p0.x + (p1.x - p0.x) * t,
            y: p0.y + (p1.y - p0.y) * t,
          };
        }
        traveled += segLen;
      }
      return pts[pts.length - 1] || { x: 0, y: 0 };
    };

    const traceLengths = traces.map((tr) => getTraceLength(tr.points));

    const render = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) % LOOP_DURATION;
      const progress = elapsed / LOOP_DURATION; // 0.0 to 1.0

      ctx.clearRect(0, 0, W, H);

      // 1. High-Tech Dark Emerald & Navy FR4 Substrate
      const pcbGrad = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, W * 0.75);
      pcbGrad.addColorStop(0, "#082F24"); // Rich Emerald Green Core
      pcbGrad.addColorStop(0.5, "#061F1A");
      pcbGrad.addColorStop(1, "#030E0B"); // Deep PCB edge
      ctx.fillStyle = pcbGrad;
      ctx.fillRect(0, 0, W, H);

      // Subtle PCB Ground Plane Micro-Grid Pattern
      ctx.fillStyle = "rgba(16, 185, 129, 0.04)";
      for (let x = 8; x < W; x += 14) {
        for (let y = 8; y < H; y += 14) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Copper Ground Shield Pour Borders
      ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
      ctx.lineWidth = 1;
      ctx.strokeRect(16, 14, W - 32, H - 28);
      ctx.strokeRect(20, 18, W - 40, H - 36);

      // 2. Copper Traces (Gold ENIG Solder Mask Traces)
      for (const tr of traces) {
        ctx.strokeStyle = "rgba(5, 150, 105, 0.4)"; // Deep emerald copper trace
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        const p0 = tr.points[0];
        if (p0) {
          ctx.moveTo(p0.x, p0.y);
          for (let i = 1; i < tr.points.length; i++) {
            const pt = tr.points[i];
            if (pt) ctx.lineTo(pt.x, pt.y);
          }
          ctx.stroke();
        }

        // Inner Bright Trace Core
        ctx.strokeStyle = "rgba(110, 231, 183, 0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Via Pad Rings along endpoints
        for (const pt of tr.points) {
          ctx.fillStyle = "#F59E0B"; // Gold ENIG via
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#030E0B"; // Via hole
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Active Glowing Current/Signal Packet Pulses along Traces
      for (let tIdx = 0; tIdx < traces.length; tIdx++) {
        const tr = traces[tIdx];
        const totalLen = traceLengths[tIdx];
        if (!tr || !totalLen || totalLen === 0) continue;

        for (let p = 0; p < tr.pulseCount; p++) {
          const pulseOffset = (p / tr.pulseCount + tr.phase) % 1.0;
          const cycleProgress = (progress * tr.speed + pulseOffset) % 1.0;
          const currentDist =
            tr.direction === "inward" ? cycleProgress * totalLen : (1 - cycleProgress) * totalLen;

          const pulsePos = getPointAlongTrace(tr.points, currentDist);

          // Draw Glowing Current Pulse Packet
          ctx.save();
          ctx.shadowColor = tr.color;
          ctx.shadowBlur = 12;

          // Radiant Pulse Corona
          ctx.fillStyle = tr.color;
          ctx.beginPath();
          ctx.arc(pulsePos.x, pulsePos.y, 3.8, 0, Math.PI * 2);
          ctx.fill();

          // High-Energy White Core
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(pulsePos.x, pulsePos.y, 1.8, 0, Math.PI * 2);
          ctx.fill();

          // Tail comet glow
          const trailDist = Math.max(
            0,
            tr.direction === "inward" ? currentDist - 12 : currentDist + 12,
          );
          const trailPos = getPointAlongTrace(tr.points, trailDist);
          ctx.strokeStyle = tr.color;
          ctx.lineWidth = 2.2;
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.moveTo(pulsePos.x, pulsePos.y);
          ctx.lineTo(trailPos.x, trailPos.y);
          ctx.stroke();

          ctx.restore();
        }
      }

      // 4. Peripheral SMD Electronic Components
      // Component 1: SOIC-8 Flash Memory Chip (Top-Left)
      const drawChip = (cx: number, cy: number, cw: number, ch: number, label: string) => {
        // Chip Drop Shadow
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(cx - cw / 2 + 2, cy - ch / 2 + 2, cw, ch);

        // Epoxy Molded Body
        const chipGrad = ctx.createLinearGradient(cx - cw / 2, cy, cx + cw / 2, cy);
        chipGrad.addColorStop(0, "#0F172A");
        chipGrad.addColorStop(0.5, "#1E293B");
        chipGrad.addColorStop(1, "#0F172A");
        ctx.fillStyle = chipGrad;
        ctx.beginPath();
        ctx.roundRect(cx - cw / 2, cy - ch / 2, cw, ch, 3);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Pin 1 Index Dot
        ctx.fillStyle = "#64748B";
        ctx.beginPath();
        ctx.arc(cx - cw / 2 + 5, cy - ch / 2 + 5, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Silver Lead Solder Pins
        ctx.fillStyle = "#E2E8F0";
        for (let py = cy - ch / 2 + 5; py <= cy + ch / 2 - 5; py += 6) {
          ctx.fillRect(cx - cw / 2 - 4, py - 1, 4, 2);
          ctx.fillRect(cx + cw / 2, py - 1, 4, 2);
        }
      };

      drawChip(70, 70, 36, 24, "MEM");
      drawChip(70, 210, 36, 24, "PWR");
      drawChip(410, 70, 38, 26, "RF");
      drawChip(410, 210, 38, 26, "DAC");

      // Surface-Mount Ceramic Capacitors (0805 Package)
      const drawCap = (cx: number, cy: number, horizontal = true) => {
        const w = horizontal ? 12 : 6;
        const h = horizontal ? 6 : 12;
        ctx.fillStyle = "#B45309"; // Ceramic brown body
        ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
        ctx.fillStyle = "#E2E8F0"; // Silver endcaps
        if (horizontal) {
          ctx.fillRect(cx - w / 2, cy - h / 2, 3, h);
          ctx.fillRect(cx + w / 2 - 3, cy - h / 2, 3, h);
        } else {
          ctx.fillRect(cx - w / 2, cy - h / 2, w, 3);
          ctx.fillRect(cx - w / 2, cy + h / 2 - 3, w, 3);
        }
      };

      drawCap(120, 110, true);
      drawCap(120, 170, true);
      drawCap(360, 110, true);
      drawCap(360, 170, true);
      drawCap(240, 235, false);

      // Crystal Oscillator Metal Can (Top Center)
      ctx.fillStyle = "#CBD5E1";
      ctx.strokeStyle = "#94A3B8";
      ctx.beginPath();
      ctx.roundRect(240 - 18, 40 - 8, 36, 16, 4);
      ctx.fill();
      ctx.stroke();

      // 5. Central QFP-64 High-Performance Microcontroller Processor
      const procSize = 72;
      const procLeft = centerX - procSize / 2;
      const procTop = centerY - procSize / 2;

      // Computing Energy Aura Wave (Radiates when signals enter)
      const auraPulse = Math.sin(now * 0.006) * 0.5 + 0.5;
      const auraGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        procSize * 0.4,
        centerX,
        centerY,
        procSize * 1.1,
      );
      auraGrad.addColorStop(0, `rgba(0, 229, 255, ${0.35 * auraPulse})`);
      auraGrad.addColorStop(0.6, `rgba(16, 185, 129, ${0.2 * auraPulse})`);
      auraGrad.addColorStop(1, "rgba(0, 229, 255, 0)");
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, procSize * 1.1, 0, Math.PI * 2);
      ctx.fill();

      // Microcontroller Perimeter Lead Pins (QFP-64)
      ctx.fillStyle = "#E2E8F0";
      const pinCount = 10;
      const pinSpacing = procSize / (pinCount + 1);

      // Top & Bottom Pins
      for (let i = 1; i <= pinCount; i++) {
        const px = procLeft + i * pinSpacing;
        ctx.fillRect(px - 1, procTop - 6, 2, 6);
        ctx.fillRect(px - 1, procTop + procSize, 2, 6);
      }
      // Left & Right Pins
      for (let i = 1; i <= pinCount; i++) {
        const py = procTop + i * pinSpacing;
        ctx.fillRect(procLeft - 6, py - 1, 6, 2);
        ctx.fillRect(procLeft + procSize, py - 1, 6, 2);
      }

      // Processor IC Body
      const procGrad = ctx.createLinearGradient(
        procLeft,
        procTop,
        procLeft + procSize,
        procTop + procSize,
      );
      procGrad.addColorStop(0, "#0F172A");
      procGrad.addColorStop(0.4, "#1E293B");
      procGrad.addColorStop(0.7, "#334155");
      procGrad.addColorStop(1, "#0F172A");
      ctx.fillStyle = procGrad;
      ctx.beginPath();
      ctx.roundRect(procLeft, procTop, procSize, procSize, 6);
      ctx.fill();
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Central Silicon Die Hologram / Geometric Core
      ctx.fillStyle = "#0A0F1D";
      ctx.beginPath();
      ctx.roundRect(centerX - 18, centerY - 18, 36, 36, 4);
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 229, 255, 0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Central Core Processing Aura
      ctx.save();
      ctx.shadowColor = "#00E5FF";
      ctx.shadowBlur = 10;
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(centerX - 10, centerY - 10, 20, 20);

      // Rotating Inner Data Grid
      ctx.translate(centerX, centerY);
      ctx.rotate(now * 0.002);
      ctx.fillStyle = "#00E5FF";
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Pin 1 Indicator
      ctx.fillStyle = "#F59E0B";
      ctx.beginPath();
      ctx.arc(procLeft + 8, procTop + 8, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // 6. Blinking Surface-Mount Diagnostic Status LEDs (Emerald & Cyan)
      const drawLed = (lx: number, ly: number, color: string, freq: number) => {
        const isLit = Math.sin(now * 0.008 * freq) > -0.2;
        ctx.save();
        ctx.fillStyle = "#1E293B";
        ctx.fillRect(lx - 4, ly - 3, 8, 6);

        if (isLit) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 10;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(lx, ly, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
          ctx.beginPath();
          ctx.arc(lx, ly, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      };

      drawLed(W - 40, 35, "#10B981", 1.2); // Green Power LED
      drawLed(W - 40, 50, "#00E5FF", 2.0); // Cyan Data LED
      drawLed(W - 40, 65, "#F59E0B", 1.6); // Amber Activity LED
      drawLed(40, 35, "#10B981", 1.0); // Left Power LED

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative w-full h-full bg-[#030E0B] overflow-hidden select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
