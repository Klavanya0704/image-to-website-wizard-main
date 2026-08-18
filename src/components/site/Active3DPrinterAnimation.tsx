import React, { useEffect, useRef } from "react";

/**
 * Active 3D Printer Animation (HTML5 Canvas + Vector Graphics)
 * Simulates an active FDM 3D printer building a blue geometric vase layer-by-layer
 * with a moving printhead, molten extrusion bead, blue LED chassis lighting, and smooth looping.
 */
export function Active3DPrinterAnimation({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const LOOP_DURATION = 5000; // 5.0 seconds per print cycle
    const TOTAL_LAYERS = 26;

    // Fixed internal resolution for sharp rendering
    const W = 480;
    const H = 280;
    canvas.width = W;
    canvas.height = H;

    const render = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) % LOOP_DURATION;
      const progress = elapsed / LOOP_DURATION; // 0.0 to 1.0

      // Calculate current layer being printed (0 to TOTAL_LAYERS)
      // First 85% of time: printing layers 1 to TOTAL_LAYERS
      // Last 15% of time: showcase completed object before smooth cycle reset
      let currentLayer = 0;
      let isCompletedShowcase = false;

      if (progress < 0.85) {
        currentLayer = Math.min(TOTAL_LAYERS, Math.floor((progress / 0.85) * TOTAL_LAYERS) + 1);
      } else {
        currentLayer = TOTAL_LAYERS;
        isCompletedShowcase = true;
      }

      ctx.clearRect(0, 0, W, H);

      // 1. Dark Futuristic Background & Radial Ambience
      const bgGrad = ctx.createRadialGradient(W / 2, H * 0.45, 20, W / 2, H / 2, W * 0.7);
      bgGrad.addColorStop(0, "#081329");
      bgGrad.addColorStop(0.6, "#040915");
      bgGrad.addColorStop(1, "#02040A");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Background Digital Tech Grid Dots
      ctx.fillStyle = "rgba(0, 229, 255, 0.08)";
      for (let x = 30; x < W; x += 24) {
        for (let y = 20; y < H - 50; y += 24) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. 3D Printer Chassis Frame
      // Outer Frame Pillars
      ctx.fillStyle = "#0F172A";
      ctx.strokeStyle = "#1E293B";
      ctx.lineWidth = 1.5;

      // Left & Right Aluminum Extrusions
      ctx.fillRect(40, 18, 20, H - 36);
      ctx.strokeRect(40, 18, 20, H - 36);
      ctx.fillRect(W - 60, 18, 20, H - 36);
      ctx.strokeRect(W - 60, 18, 20, H - 36);

      // Top Crossbar
      ctx.fillRect(40, 18, W - 80, 16);
      ctx.strokeRect(40, 18, W - 80, 16);

      // Blue LED Lightbars along the vertical frame pillars
      const ledGlow = ctx.createLinearGradient(0, 25, 0, H - 30);
      ledGlow.addColorStop(0, "#00E5FF");
      ledGlow.addColorStop(0.5, "#1455D9");
      ledGlow.addColorStop(1, "#00E5FF");

      ctx.fillStyle = ledGlow;
      ctx.shadowColor = "#00E5FF";
      ctx.shadowBlur = 10;
      ctx.fillRect(56, 36, 2.5, H - 72);
      ctx.fillRect(W - 58, 36, 2.5, H - 72);
      ctx.shadowBlur = 0; // reset

      // 3. Heated Glass Print Bed (Isometric Perspective)
      const bedY = H - 58;
      const bedLeft = 70;
      const bedRight = W - 70;
      const bedFrontY = H - 32;

      // Bed Thickness / Side Plate
      ctx.fillStyle = "#0A0F1D";
      ctx.beginPath();
      ctx.moveTo(bedLeft, bedY);
      ctx.lineTo(bedRight, bedY);
      ctx.lineTo(bedRight - 25, bedFrontY + 6);
      ctx.lineTo(bedLeft + 25, bedFrontY + 6);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#1E293B";
      ctx.stroke();

      // Top Glass Bed Surface
      const glassGrad = ctx.createLinearGradient(0, bedY, 0, bedFrontY);
      glassGrad.addColorStop(0, "#0B1528");
      glassGrad.addColorStop(0.5, "#0E1E38");
      glassGrad.addColorStop(1, "#060B14");
      ctx.fillStyle = glassGrad;
      ctx.beginPath();
      ctx.moveTo(bedLeft, bedY);
      ctx.lineTo(bedRight, bedY);
      ctx.lineTo(bedRight - 25, bedFrontY);
      ctx.lineTo(bedLeft + 25, bedFrontY);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Grid Lines on Glass Bed
      ctx.strokeStyle = "rgba(0, 229, 255, 0.22)";
      ctx.lineWidth = 0.8;
      for (let i = 1; i <= 4; i++) {
        const gy = bedY + (bedFrontY - bedY) * (i / 5);
        const inset = 25 * (i / 5);
        ctx.beginPath();
        ctx.moveTo(bedLeft + inset, gy);
        ctx.lineTo(bedRight - inset, gy);
        ctx.stroke();
      }

      // 4. Layer-by-Layer Geometric Spiral Vase Object
      const centerX = W / 2;
      const baseCenterY = bedY + 8;
      const layerHeight = 4.2;

      // Draw Glass Mirror Reflection underneath the bed
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.filter = "blur(2px)";
      for (let l = 0; l < currentLayer; l++) {
        const lNorm = l / TOTAL_LAYERS;
        const radius = (14 + Math.sin(lNorm * Math.PI * 0.95) * 18 - lNorm * 6) * 1.1;
        const ry = 3.2;
        const yRefl = baseCenterY + l * (layerHeight * 0.5);

        ctx.fillStyle = "#0284C7";
        ctx.beginPath();
        ctx.ellipse(centerX, yRefl, radius, ry, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Draw Object Layers from Base to Current Layer
      let topLayerY = baseCenterY;
      let topLayerRadius = 14;

      for (let l = 0; l < currentLayer; l++) {
        const lNorm = l / TOTAL_LAYERS;
        // Vase profile: narrow base, wide middle, tapered elegant top rim
        const radius = 14 + Math.sin(lNorm * Math.PI * 0.95) * 20 - lNorm * 6;
        const ry = 4.0;
        const layerY = baseCenterY - l * layerHeight;

        topLayerY = layerY;
        topLayerRadius = radius;

        // Layer Sliced Contour Ring
        ctx.save();
        const layerGrad = ctx.createLinearGradient(
          centerX - radius,
          layerY,
          centerX + radius,
          layerY,
        );
        layerGrad.addColorStop(0, "#0284C7");
        layerGrad.addColorStop(0.3, "#38BDF8");
        layerGrad.addColorStop(0.5, "#E0F2FE");
        layerGrad.addColorStop(0.7, "#38BDF8");
        layerGrad.addColorStop(1, "#0369A1");

        ctx.fillStyle = layerGrad;
        ctx.strokeStyle =
          l === currentLayer - 1 && !isCompletedShowcase ? "#00E5FF" : "rgba(224, 242, 254, 0.4)";
        ctx.lineWidth = 0.8;

        if (l === currentLayer - 1 && !isCompletedShowcase) {
          ctx.shadowColor = "#00E5FF";
          ctx.shadowBlur = 8;
        }

        ctx.beginPath();
        ctx.ellipse(centerX, layerY, radius, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Faceted Vase Spiral Ridge Accents (Low-poly geometric structure)
        const ridges = 8;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 0.6;
        for (let r = 0; r < ridges; r++) {
          const angle = (r / ridges) * Math.PI * 2 + l * 0.15;
          const rx = centerX + Math.cos(angle) * radius;
          const ryPos = layerY + Math.sin(angle) * ry;
          ctx.beginPath();
          ctx.arc(rx, ryPos, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = "#E0F2FE";
          ctx.fill();
        }
      }

      // 5. Active Extrusion Printhead & X/Z Gantry Movement
      // The printhead sweeps around the current top layer in X
      const sweepFrequency = 14;
      const nozzleOffsetAngle = now * 0.006 * sweepFrequency;
      const nozzleTargetX = isCompletedShowcase
        ? centerX
        : centerX + Math.cos(nozzleOffsetAngle) * (topLayerRadius * 0.85);

      const nozzleTargetY = isCompletedShowcase ? topLayerY - 24 : topLayerY - 6;

      // Horizontal Gantry Crossrail (moves in Z with layer height)
      const gantryY = nozzleTargetY - 34;
      ctx.fillStyle = "#1E293B";
      ctx.fillRect(60, gantryY, W - 120, 6);
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 1;
      ctx.strokeRect(60, gantryY, W - 120, 6);

      // Chrome Linear Smooth Rods
      ctx.fillStyle = "#94A3B8";
      ctx.fillRect(60, gantryY - 4, W - 120, 2);
      ctx.fillRect(60, gantryY + 8, W - 120, 2);

      // Printhead Carriage Assembly (Moves along X)
      const headW = 38;
      const headH = 34;
      const headX = nozzleTargetX - headW / 2;
      const headY = gantryY - 8;

      // Carriage Body
      const carriageGrad = ctx.createLinearGradient(headX, headY, headX + headW, headY);
      carriageGrad.addColorStop(0, "#0F172A");
      carriageGrad.addColorStop(0.4, "#334155");
      carriageGrad.addColorStop(0.7, "#64748B");
      carriageGrad.addColorStop(1, "#0F172A");
      ctx.fillStyle = carriageGrad;
      ctx.strokeStyle = "#94A3B8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(headX, headY, headW, headH, 4);
      ctx.fill();
      ctx.stroke();

      // Extruder Cooling Fan Grill
      ctx.fillStyle = "#0F172A";
      ctx.beginPath();
      ctx.arc(headX + headW / 2, headY + 14, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#38BDF8";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Spinning Fan Blades Indicator
      ctx.save();
      ctx.translate(headX + headW / 2, headY + 14);
      ctx.rotate(now * 0.02);
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 1.2;
      for (let f = 0; f < 3; f++) {
        ctx.rotate((Math.PI * 2) / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 6);
        ctx.stroke();
      }
      ctx.restore();

      // Brass Extrusion Nozzle Tip
      const nozzleTipX = nozzleTargetX;
      const nozzleTipY = nozzleTargetY;

      ctx.fillStyle = "#F59E0B";
      ctx.strokeStyle = "#D97706";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(nozzleTipX - 4, headY + headH);
      ctx.lineTo(nozzleTipX + 4, headY + headH);
      ctx.lineTo(nozzleTipX + 1.5, nozzleTipY);
      ctx.lineTo(nozzleTipX - 1.5, nozzleTipY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // 6. Active Molten PLA Extrusion Glowing Bead & Spark Ray
      if (!isCompletedShowcase) {
        ctx.save();
        ctx.shadowColor = "#00E5FF";
        ctx.shadowBlur = 12;

        // Molten Bead
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(nozzleTipX, nozzleTipY + 1, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Extrusion Ray onto top layer
        ctx.strokeStyle = "#00E5FF";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(nozzleTipX, nozzleTipY);
        ctx.lineTo(nozzleTipX, topLayerY);
        ctx.stroke();

        // Micro Layer Heat Particles
        ctx.fillStyle = "#E0F2FE";
        const p1X = nozzleTipX + Math.sin(now * 0.02) * 4;
        const p1Y = topLayerY - 2;
        ctx.beginPath();
        ctx.arc(p1X, p1Y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 7. Subtle Active HUD Telemetry Overlay (Top Right & Bottom Left)
      ctx.fillStyle = "rgba(0, 229, 255, 0.75)";
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "left";
      ctx.fillText(
        `Z-AXIS: ${(currentLayer * 0.12).toFixed(2)}mm (${currentLayer}/${TOTAL_LAYERS})`,
        50,
        H - 14,
      );

      ctx.textAlign = "right";
      ctx.fillText("NOZZLE: 215°C | BED: 60°C", W - 50, H - 14);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative w-full h-full bg-[#02040A] overflow-hidden select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
