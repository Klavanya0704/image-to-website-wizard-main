import React, { useEffect, useRef } from "react";

/**
 * Premium Realistic CO2 Laser Cutter & Engraver Animation (HTML5 Canvas 60fps)
 * Features a bright professional machine studio, warm polished birch/cherry wood slab,
 * radiant ruby laser beam with high-contrast bloom, and deep laser-carved grooves with glowing orange embers.
 */
export function ActiveLaserCutterAnimation({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const LOOP_DURATION = 5200; // 5.2s seamless loop

    const W = 480;
    const H = 280;
    canvas.width = W;
    canvas.height = H;

    // Intricate Solar Mandala / Precision Vector Pattern
    const PATH_POINTS = 260;
    const pathCoords: { x: number; y: number }[] = [];
    const centerX = W / 2;
    const centerY = H / 2 + 8;
    const maxRadius = 76;

    for (let i = 0; i <= PATH_POINTS; i++) {
      const t = (i / PATH_POINTS) * Math.PI * 8;
      const r = maxRadius * (0.4 + 0.42 * Math.cos(3.5 * t) + 0.18 * Math.sin(7.0 * t));
      const x = centerX + r * Math.cos(t);
      const y = centerY + r * 0.72 * Math.sin(t);
      pathCoords.push({ x, y });
    }

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;
    }
    const sparks: Spark[] = [];

    interface Smoke {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
    }
    const smokeList: Smoke[] = [];

    const render = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) % LOOP_DURATION;
      const progress = elapsed / LOOP_DURATION;

      let currentPathIndex = 0;
      let isCompletedShowcase = false;

      if (progress < 0.86) {
        currentPathIndex = Math.floor((progress / 0.86) * PATH_POINTS);
      } else {
        currentPathIndex = PATH_POINTS;
        isCompletedShowcase = true;
      }

      ctx.clearRect(0, 0, W, H);

      // 1. Dark Professional Laser Enclosure with Ambient Lighting
      const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, W * 0.75);
      bgGrad.addColorStop(0, "#1E293B");
      bgGrad.addColorStop(0.5, "#0F172A");
      bgGrad.addColorStop(1, "#090D16");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Honeycomb Grid Bed
      ctx.strokeStyle = "rgba(148, 163, 184, 0.22)";
      ctx.lineWidth = 0.8;
      const hexSize = 14;
      for (let y = 8; y < H; y += hexSize * 1.5) {
        for (let x = 8; x < W; x += hexSize * 1.732) {
          ctx.beginPath();
          for (let a = 0; a < 6; a++) {
            const angle = (a * Math.PI) / 3;
            const hx = x + hexSize * 0.58 * Math.cos(angle);
            const hy = y + hexSize * 0.58 * Math.sin(angle);
            if (a === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }

      // 2. Warm High-Contrast Polished Wood Slab
      const sheetMarginX = 50;
      const sheetMarginY = 28;
      const sheetW = W - sheetMarginX * 2;
      const sheetH = H - sheetMarginY * 2;

      // Slab Bevel Shadow
      ctx.fillStyle = "#451A03";
      ctx.fillRect(sheetMarginX + 4, sheetMarginY + 5, sheetW, sheetH);

      // Rich Warm Wood Slab Gradient
      const woodGrad = ctx.createLinearGradient(
        sheetMarginX,
        sheetMarginY,
        sheetMarginX + sheetW,
        sheetMarginY + sheetH,
      );
      woodGrad.addColorStop(0, "#F59E0B"); // Warm honey amber
      woodGrad.addColorStop(0.3, "#D97706");
      woodGrad.addColorStop(0.65, "#B45309"); // Deep golden oak
      woodGrad.addColorStop(0.9, "#92400E");
      woodGrad.addColorStop(1, "#D97706");
      ctx.fillStyle = woodGrad;
      ctx.fillRect(sheetMarginX, sheetMarginY, sheetW, sheetH);

      // Polished Wood Sheen Highlights
      const sheenGrad = ctx.createLinearGradient(
        sheetMarginX,
        sheetMarginY,
        sheetMarginX + sheetW,
        sheetMarginY,
      );
      sheenGrad.addColorStop(0, "rgba(255, 255, 255, 0.1)");
      sheenGrad.addColorStop(0.4, "rgba(255, 255, 255, 0.25)");
      sheenGrad.addColorStop(1, "rgba(255, 255, 255, 0.05)");
      ctx.fillStyle = sheenGrad;
      ctx.fillRect(sheetMarginX, sheetMarginY, sheetW, sheetH);

      // Wood Grain Growth Rings
      ctx.strokeStyle = "rgba(120, 53, 15, 0.22)";
      ctx.lineWidth = 1.2;
      for (let g = 0; g < 6; g++) {
        ctx.beginPath();
        const gy = sheetMarginY + 14 + g * 36;
        ctx.moveTo(sheetMarginX, gy);
        ctx.bezierCurveTo(
          sheetMarginX + sheetW * 0.35,
          gy - 10,
          sheetMarginX + sheetW * 0.65,
          gy + 8,
          sheetMarginX + sheetW,
          gy - 5,
        );
        ctx.stroke();
      }

      // 3. Crisp Laser-Carved Grooves & Glowing Molten Embers
      if (currentPathIndex > 1 && pathCoords.length > 0 && pathCoords[0]) {
        // Deep Charcoal Engraved Channels
        ctx.strokeStyle = "#1C0D02";
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(pathCoords[0].x, pathCoords[0].y);
        for (let i = 1; i <= currentPathIndex; i++) {
          const pt = pathCoords[i];
          if (pt) ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Glowing Hot Embers trailing the active cut
        if (!isCompletedShowcase) {
          ctx.save();
          ctx.shadowColor = "#FF4500";
          ctx.shadowBlur = 12;
          ctx.strokeStyle = "#FF6B00";
          ctx.lineWidth = 1.4;
          const trailLength = 28;
          const startTrail = Math.max(0, currentPathIndex - trailLength);
          const startPt = pathCoords[startTrail];
          if (startPt) {
            ctx.beginPath();
            ctx.moveTo(startPt.x, startPt.y);
            for (let i = startTrail; i <= currentPathIndex; i++) {
              const pt = pathCoords[i];
              if (pt) ctx.lineTo(pt.x, pt.y);
            }
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      // 4. Moving Industrial Laser Head & Gantry
      const currentPoint = isCompletedShowcase
        ? { x: centerX, y: centerY }
        : pathCoords[currentPathIndex] || { x: centerX, y: centerY };

      // Top Gantry Rail
      const gantryY = 20;
      const railGrad = ctx.createLinearGradient(0, gantryY, 0, gantryY + 8);
      railGrad.addColorStop(0, "#475569");
      railGrad.addColorStop(0.5, "#94A3B8");
      railGrad.addColorStop(1, "#1E293B");
      ctx.fillStyle = railGrad;
      ctx.fillRect(25, gantryY, W - 50, 8);
      ctx.strokeRect(25, gantryY, W - 50, 8);

      // Chrome Guides
      ctx.fillStyle = "#E2E8F0";
      ctx.fillRect(25, gantryY - 3, W - 50, 2);
      ctx.fillRect(25, gantryY + 9, W - 50, 2);

      // Laser Carriage Head Assembly
      const headX = currentPoint.x;
      const headY = currentPoint.y - 48;

      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(headX, gantryY + 8);
      ctx.lineTo(headX, headY);
      ctx.stroke();

      // Anodized Aluminum Laser Head Body
      const blockW = 32;
      const blockH = 28;
      const blockGrad = ctx.createLinearGradient(
        headX - blockW / 2,
        headY,
        headX + blockW / 2,
        headY + blockH,
      );
      blockGrad.addColorStop(0, "#0F172A");
      blockGrad.addColorStop(0.4, "#334155");
      blockGrad.addColorStop(0.7, "#64748B");
      blockGrad.addColorStop(1, "#0F172A");
      ctx.fillStyle = blockGrad;
      ctx.strokeStyle = "#EF4444";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(headX - blockW / 2, headY, blockW, blockH, 4);
      ctx.fill();
      ctx.stroke();

      // Precision Brass Nozzle
      const nozzleTipY = headY + blockH + 12;
      ctx.fillStyle = "#F59E0B";
      ctx.beginPath();
      ctx.moveTo(headX - 6, headY + blockH);
      ctx.lineTo(headX + 6, headY + blockH);
      ctx.lineTo(headX + 2, nozzleTipY);
      ctx.lineTo(headX - 2, nozzleTipY);
      ctx.closePath();
      ctx.fill();

      // 5. Radiant Ruby-Red Laser Beam & Volumetric Plasma Bloom
      if (!isCompletedShowcase) {
        ctx.save();

        // Laser Bloom & Lens Flare
        ctx.shadowColor = "#FF0033";
        ctx.shadowBlur = 22;

        // Outer Radiant Beam
        ctx.strokeStyle = "rgba(255, 0, 51, 0.9)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(headX, nozzleTipY);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.stroke();

        // Inner Ultra-Bright Core Beam
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(headX, nozzleTipY);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.stroke();

        // Focal Plasma Contact Point
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(currentPoint.x, currentPoint.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Radiant Corona Ring
        ctx.fillStyle = "rgba(255, 0, 51, 0.45)";
        ctx.beginPath();
        ctx.arc(currentPoint.x, currentPoint.y, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Spark Particle Physics
        for (let s = 0; s < 2; s++) {
          sparks.push({
            x: currentPoint.x,
            y: currentPoint.y,
            vx: (Math.random() - 0.5) * 6,
            vy: -Math.random() * 4 - 1,
            life: 0,
            maxLife: 14 + Math.random() * 14,
            color: Math.random() > 0.3 ? "#FDE047" : "#FF6B00",
            size: 1.2 + Math.random() * 1.5,
          });
        }

        // Smoke Particle Cloud
        if (Math.random() > 0.5) {
          smokeList.push({
            x: currentPoint.x + (Math.random() - 0.5) * 4,
            y: currentPoint.y - 2,
            vx: (Math.random() - 0.5) * 1.2,
            vy: -Math.random() * 1.6 - 0.8,
            alpha: 0.4,
            size: 4 + Math.random() * 5,
          });
        }
      }

      // 6. Draw Smoke Particles
      for (let i = smokeList.length - 1; i >= 0; i--) {
        const sm = smokeList[i];
        if (!sm) continue;
        sm.x += sm.vx;
        sm.y += sm.vy;
        sm.alpha -= 0.012;
        sm.size += 0.4;

        if (sm.alpha <= 0) {
          smokeList.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(241, 245, 249, ${sm.alpha})`;
        ctx.beginPath();
        ctx.arc(sm.x, sm.y, sm.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 7. Draw Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        if (!sp) continue;
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.28;
        sp.life++;

        if (sp.life >= sp.maxLife) {
          sparks.splice(i, 1);
          continue;
        }

        const sparkAlpha = 1 - sp.life / sp.maxLife;
        ctx.save();
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sparkAlpha;
        ctx.shadowColor = sp.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
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
