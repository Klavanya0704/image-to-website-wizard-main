import React, { useEffect, useRef } from "react";

/**
 * Premium Realistic 3D Printer Animation (HTML5 Canvas 60fps)
 * Features a bright cinematic workshop environment, brushed aluminum frame,
 * heated glass bed with realistic reflections, and an attractive electric orange & cyan
 * geometric vase built progressively layer-by-layer with molten extrusion and specular highlights.
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
    const LOOP_DURATION = 5000; // 5.0s smooth loop
    const TOTAL_LAYERS = 28;

    // High resolution canvas for crisp retina rendering
    const W = 480;
    const H = 280;
    canvas.width = W;
    canvas.height = H;

    const render = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) % LOOP_DURATION;
      const progress = elapsed / LOOP_DURATION; // 0.0 to 1.0

      let currentLayer = 0;
      let isCompletedShowcase = false;

      if (progress < 0.84) {
        currentLayer = Math.min(TOTAL_LAYERS, Math.floor((progress / 0.84) * TOTAL_LAYERS) + 1);
      } else {
        currentLayer = TOTAL_LAYERS;
        isCompletedShowcase = true;
      }

      ctx.clearRect(0, 0, W, H);

      // 1. Bright Modern Workshop Background with Soft Cinematic Lighting
      const bgGrad = ctx.createRadialGradient(W / 2, H * 0.4, 30, W / 2, H / 2, W * 0.7);
      bgGrad.addColorStop(0, "#1E293B"); // Slate-800 soft studio glow
      bgGrad.addColorStop(0.5, "#0F172A"); // Slate-900
      bgGrad.addColorStop(1, "#090D16"); // Deep frame border
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Soft Workshop Ambient Backlight Bokeh
      const bokehGrad = ctx.createRadialGradient(W * 0.75, H * 0.3, 10, W * 0.75, H * 0.3, 90);
      bokehGrad.addColorStop(0, "rgba(0, 229, 255, 0.22)");
      bokehGrad.addColorStop(1, "rgba(0, 229, 255, 0)");
      ctx.fillStyle = bokehGrad;
      ctx.fillRect(0, 0, W, H);

      const bokehGrad2 = ctx.createRadialGradient(W * 0.25, H * 0.35, 10, W * 0.25, H * 0.35, 80);
      bokehGrad2.addColorStop(0, "rgba(59, 130, 246, 0.2)");
      bokehGrad2.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = bokehGrad2;
      ctx.fillRect(0, 0, W, H);

      // 2. Brushed Aluminum 3D Printer Chassis Frame
      // Left & Right Aluminum Extrusions with Beveled Lighting
      const drawPillar = (x: number) => {
        const pillarGrad = ctx.createLinearGradient(x, 0, x + 22, 0);
        pillarGrad.addColorStop(0, "#334155");
        pillarGrad.addColorStop(0.3, "#64748B");
        pillarGrad.addColorStop(0.6, "#94A3B8"); // Specular reflection
        pillarGrad.addColorStop(0.85, "#475569");
        pillarGrad.addColorStop(1, "#1E293B");
        ctx.fillStyle = pillarGrad;
        ctx.fillRect(x, 15, 22, H - 30);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, 15, 22, H - 30);

        // Vertical Blue LED Chamber Lightbar
        ctx.save();
        ctx.shadowColor = "#00E5FF";
        ctx.shadowBlur = 12;
        ctx.fillStyle = "#00E5FF";
        ctx.fillRect(x === 38 ? x + 16 : x + 3, 30, 3, H - 65);
        ctx.restore();
      };

      drawPillar(38); // Left Pillar
      drawPillar(W - 60); // Right Pillar

      // Top Crossbar Extrusion
      const topBarGrad = ctx.createLinearGradient(0, 15, 0, 32);
      topBarGrad.addColorStop(0, "#64748B");
      topBarGrad.addColorStop(0.5, "#94A3B8");
      topBarGrad.addColorStop(1, "#334155");
      ctx.fillStyle = topBarGrad;
      ctx.fillRect(38, 15, W - 76, 17);
      ctx.strokeRect(38, 15, W - 76, 17);

      // Dual Polished Steel Z-Lead Screws (Threaded Rods)
      const drawLeadScrew = (x: number) => {
        ctx.fillStyle = "#CBD5E1";
        ctx.fillRect(x, 32, 4, H - 65);
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.lineWidth = 0.5;
        for (let y = 35; y < H - 35; y += 4) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + 4, y + 1.5);
          ctx.stroke();
        }
      };
      drawLeadScrew(66);
      drawLeadScrew(W - 70);

      // 3. Heated Glass Bed with High-Gloss Reflection & Blueprint Grid
      const bedY = H - 56;
      const bedLeft = 65;
      const bedRight = W - 65;
      const bedFrontY = H - 30;

      // Aluminum Bed Sub-Plate (Thickness)
      ctx.fillStyle = "#1E293B";
      ctx.beginPath();
      ctx.moveTo(bedLeft, bedY);
      ctx.lineTo(bedRight, bedY);
      ctx.lineTo(bedRight - 22, bedFrontY + 8);
      ctx.lineTo(bedLeft + 22, bedFrontY + 8);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#475569";
      ctx.stroke();

      // Top Mirror Glass Plate
      const glassGrad = ctx.createLinearGradient(0, bedY, 0, bedFrontY);
      glassGrad.addColorStop(0, "#0F172A");
      glassGrad.addColorStop(0.4, "#1E3A8A"); // Blue reflection
      glassGrad.addColorStop(0.8, "#172554");
      glassGrad.addColorStop(1, "#0A0F1D");
      ctx.fillStyle = glassGrad;
      ctx.beginPath();
      ctx.moveTo(bedLeft, bedY);
      ctx.lineTo(bedRight, bedY);
      ctx.lineTo(bedRight - 22, bedFrontY);
      ctx.lineTo(bedLeft + 22, bedFrontY);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Cyan Coordinate Grid Lines on Glass Bed
      ctx.strokeStyle = "rgba(0, 229, 255, 0.35)";
      ctx.lineWidth = 0.8;
      for (let i = 1; i <= 5; i++) {
        const gy = bedY + (bedFrontY - bedY) * (i / 6);
        const inset = 22 * (i / 6);
        ctx.beginPath();
        ctx.moveTo(bedLeft + inset, gy);
        ctx.lineTo(bedRight - inset, gy);
        ctx.stroke();
      }

      // 4. Vibrant Layer-by-Layer 3D Printed Object (Dual-Tone Orange & Cyan Vase)
      const centerX = W / 2;
      const baseCenterY = bedY + 8;
      const layerHeight = 4.0;

      // Under-Glass Mirror Reflection
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.filter = "blur(3px)";
      for (let l = 0; l < currentLayer; l++) {
        const lNorm = l / TOTAL_LAYERS;
        const radius = 15 + Math.sin(lNorm * Math.PI * 0.95) * 22 - lNorm * 7;
        const ry = 3.5;
        const yRefl = baseCenterY + l * (layerHeight * 0.55);

        ctx.fillStyle = l % 2 === 0 ? "#FF6B00" : "#00D2FF";
        ctx.beginPath();
        ctx.ellipse(centerX, yRefl, radius * 1.1, ry, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Draw Volumetric Layers with 3D Specular Shading
      let topLayerY = baseCenterY;
      let topLayerRadius = 15;

      for (let l = 0; l < currentLayer; l++) {
        const lNorm = l / TOTAL_LAYERS;
        // Attractive sculpted geometric vase profile
        const radius = 15 + Math.sin(lNorm * Math.PI * 0.95) * 23 - lNorm * 7;
        const ry = 4.2;
        const layerY = baseCenterY - l * layerHeight;

        topLayerY = layerY;
        topLayerRadius = radius;

        ctx.save();
        // Dynamic dual-tone gradient transition from electric orange base to radiant cyan top
        const layerGrad = ctx.createLinearGradient(
          centerX - radius,
          layerY,
          centerX + radius,
          layerY,
        );

        if (lNorm < 0.5) {
          // Vibrant Warm Layer (Orange / Amber / Gold)
          layerGrad.addColorStop(0, "#C2410C");
          layerGrad.addColorStop(0.3, "#EA580C");
          layerGrad.addColorStop(0.5, "#FDBA74"); // Specular highlight
          layerGrad.addColorStop(0.75, "#F97316");
          layerGrad.addColorStop(1, "#9A3412");
        } else {
          // Radiant High-Tech Cool Layer (Cyan / Sky Blue / Electric Blue)
          layerGrad.addColorStop(0, "#0369A1");
          layerGrad.addColorStop(0.3, "#0284C7");
          layerGrad.addColorStop(0.5, "#E0F2FE"); // Specular highlight
          layerGrad.addColorStop(0.75, "#38BDF8");
          layerGrad.addColorStop(1, "#075985");
        }

        ctx.fillStyle = layerGrad;
        ctx.beginPath();
        ctx.ellipse(centerX, layerY, radius, ry, 0, 0, Math.PI * 2);
        ctx.fill();

        // Edge Contour Ring
        ctx.strokeStyle =
          l === currentLayer - 1 && !isCompletedShowcase ? "#FFFFFF" : "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = l === currentLayer - 1 ? 1.4 : 0.6;
        ctx.stroke();

        // Active Glowing Top Layer Bead
        if (l === currentLayer - 1 && !isCompletedShowcase) {
          ctx.shadowColor = "#00E5FF";
          ctx.shadowBlur = 10;
          ctx.strokeStyle = "#00E5FF";
          ctx.stroke();
        }
        ctx.restore();

        // Geometric Facet Ridges (Sculpted Spiral Look)
        const ridges = 10;
        for (let r = 0; r < ridges; r++) {
          const angle = (r / ridges) * Math.PI * 2 + l * 0.18;
          const rx = centerX + Math.cos(angle) * radius;
          const ryPos = layerY + Math.sin(angle) * ry;

          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.beginPath();
          ctx.arc(rx, ryPos, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. Active Extrusion Printhead & X/Z Gantry Movement
      const sweepFrequency = 12;
      const nozzleOffsetAngle = now * 0.005 * sweepFrequency;
      const nozzleTargetX = isCompletedShowcase
        ? centerX
        : centerX + Math.cos(nozzleOffsetAngle) * (topLayerRadius * 0.88);

      const nozzleTargetY = isCompletedShowcase ? topLayerY - 26 : topLayerY - 5;

      // Horizontal Gantry Crossrail (Moves along Z with layer height)
      const gantryY = nozzleTargetY - 36;
      const railGrad = ctx.createLinearGradient(0, gantryY, 0, gantryY + 8);
      railGrad.addColorStop(0, "#475569");
      railGrad.addColorStop(0.5, "#94A3B8");
      railGrad.addColorStop(1, "#1E293B");
      ctx.fillStyle = railGrad;
      ctx.fillRect(55, gantryY, W - 110, 8);
      ctx.strokeRect(55, gantryY, W - 110, 8);

      // Chrome Dual Linear Rails
      ctx.fillStyle = "#E2E8F0";
      ctx.fillRect(55, gantryY - 4, W - 110, 2);
      ctx.fillRect(55, gantryY + 10, W - 110, 2);

      // Direct-Drive Extruder Printhead Assembly
      const headW = 42;
      const headH = 36;
      const headX = nozzleTargetX - headW / 2;
      const headY = gantryY - 10;

      // Carbon-Fiber Printhead Body
      const headGrad = ctx.createLinearGradient(headX, headY, headX + headW, headY + headH);
      headGrad.addColorStop(0, "#0F172A");
      headGrad.addColorStop(0.3, "#334155");
      headGrad.addColorStop(0.7, "#475569");
      headGrad.addColorStop(1, "#0F172A");
      ctx.fillStyle = headGrad;
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(headX, headY, headW, headH, 5);
      ctx.fill();
      ctx.stroke();

      // Spinning High-Speed Cooling Fan
      ctx.fillStyle = "#0A0F1D";
      ctx.beginPath();
      ctx.arc(headX + headW / 2, headY + 16, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#38BDF8";
      ctx.stroke();

      ctx.save();
      ctx.translate(headX + headW / 2, headY + 16);
      ctx.rotate(now * 0.025);
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 1.4;
      for (let f = 0; f < 4; f++) {
        ctx.rotate((Math.PI * 2) / 4);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 7);
        ctx.stroke();
      }
      ctx.restore();

      // Precision Brass Extruder Nozzle
      const nozzleTipX = nozzleTargetX;
      const nozzleTipY = nozzleTargetY;

      const brassGrad = ctx.createLinearGradient(nozzleTipX - 5, 0, nozzleTipX + 5, 0);
      brassGrad.addColorStop(0, "#B45309");
      brassGrad.addColorStop(0.5, "#FBBF24");
      brassGrad.addColorStop(1, "#D97706");
      ctx.fillStyle = brassGrad;
      ctx.beginPath();
      ctx.moveTo(nozzleTipX - 5, headY + headH);
      ctx.lineTo(nozzleTipX + 5, headY + headH);
      ctx.lineTo(nozzleTipX + 1.8, nozzleTipY);
      ctx.lineTo(nozzleTipX - 1.8, nozzleTipY);
      ctx.closePath();
      ctx.fill();

      // 6. Glowing Molten Filament Extrusion Bead & Contact Plasma
      if (!isCompletedShowcase) {
        ctx.save();
        ctx.shadowColor = "#00E5FF";
        ctx.shadowBlur = 14;

        // Molten Bead
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(nozzleTipX, nozzleTipY + 1, 2.4, 0, Math.PI * 2);
        ctx.fill();

        // Glowing Extrusion Stream
        ctx.strokeStyle = "#00E5FF";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(nozzleTipX, nozzleTipY);
        ctx.lineTo(nozzleTipX, topLayerY);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative w-full h-full bg-[#090D16] overflow-hidden select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
