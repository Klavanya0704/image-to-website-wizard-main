import React, { useEffect, useRef } from "react";

/**
 * Active CO2 Laser Cutter & Engraver Animation (HTML5 Canvas + Vector Graphics)
 * Simulates a high-precision industrial CO2 laser head moving along a vector mandala/gear path,
 * casting an intense red laser beam, burning intricate patterns into birch plywood,
 * and emitting glowing embers, sparks, and subtle laser smoke in a smooth 5-second loop.
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

    // Fixed high-resolution canvas dimensions
    const W = 480;
    const H = 280;
    canvas.width = W;
    canvas.height = H;

    // Generate fixed parametric geometric vector path (Mandala / Precision Gear)
    const PATH_POINTS = 240;
    const pathCoords: { x: number; y: number }[] = [];
    const centerX = W / 2;
    const centerY = H / 2 + 6;
    const maxRadius = 78;

    for (let i = 0; i <= PATH_POINTS; i++) {
      const t = (i / PATH_POINTS) * Math.PI * 8; // 4 full revolutions with harmonic pedals
      // Hypotrochoid / Rose curve equation for intricate mandala pattern
      const r = maxRadius * (0.42 + 0.38 * Math.cos(3.5 * t) + 0.2 * Math.sin(7.0 * t));
      const x = centerX + r * Math.cos(t);
      const y = centerY + r * 0.72 * Math.sin(t); // slight isometric tilt
      pathCoords.push({ x, y });
    }

    // Spark particles system
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

    // Smoke particles system
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
      const progress = elapsed / LOOP_DURATION; // 0.0 to 1.0

      // Progressively burn path up to 88% of cycle, hold completed for remaining 12%
      let currentPathIndex = 0;
      let isCompletedShowcase = false;

      if (progress < 0.88) {
        currentPathIndex = Math.floor((progress / 0.88) * PATH_POINTS);
      } else {
        currentPathIndex = PATH_POINTS;
        isCompletedShowcase = true;
      }

      ctx.clearRect(0, 0, W, H);

      // 1. Dark Laser Machine Enclosure & Honeycomb Cutting Bed
      const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, W * 0.75);
      bgGrad.addColorStop(0, "#111827");
      bgGrad.addColorStop(0.6, "#080D1A");
      bgGrad.addColorStop(1, "#03060D");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Honeycomb Metal Bed Grid
      ctx.strokeStyle = "rgba(75, 85, 99, 0.25)";
      ctx.lineWidth = 0.8;
      const hexSize = 14;
      for (let y = 10; y < H; y += hexSize * 1.5) {
        for (let x = 10; x < W; x += hexSize * 1.732) {
          ctx.beginPath();
          for (let a = 0; a < 6; a++) {
            const angle = (a * Math.PI) / 3;
            const hx = x + hexSize * 0.6 * Math.cos(angle);
            const hy = y + hexSize * 0.6 * Math.sin(angle);
            if (a === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }

      // 2. Warm Birch Plywood Workpiece Sheet
      const sheetMarginX = 54;
      const sheetMarginY = 32;
      const sheetW = W - sheetMarginX * 2;
      const sheetH = H - sheetMarginY * 2;

      // Wood Sheet Shadow & Thickness
      ctx.fillStyle = "#382312";
      ctx.fillRect(sheetMarginX + 3, sheetMarginY + 4, sheetW, sheetH);

      // Wood Grain Texture Gradient
      const woodGrad = ctx.createLinearGradient(
        sheetMarginX,
        sheetMarginY,
        sheetMarginX + sheetW,
        sheetMarginY + sheetH,
      );
      woodGrad.addColorStop(0, "#D4A373");
      woodGrad.addColorStop(0.3, "#E29578");
      woodGrad.addColorStop(0.6, "#DDA15E");
      woodGrad.addColorStop(0.85, "#BC6C25");
      woodGrad.addColorStop(1, "#D4A373");
      ctx.fillStyle = woodGrad;
      ctx.fillRect(sheetMarginX, sheetMarginY, sheetW, sheetH);

      // Subtle Wood Ring Grain Lines
      ctx.strokeStyle = "rgba(107, 68, 35, 0.15)";
      ctx.lineWidth = 1;
      for (let g = 0; g < 6; g++) {
        ctx.beginPath();
        const gy = sheetMarginY + 15 + g * 35;
        ctx.moveTo(sheetMarginX, gy);
        ctx.bezierCurveTo(
          sheetMarginX + sheetW * 0.3,
          gy - 8,
          sheetMarginX + sheetW * 0.7,
          gy + 10,
          sheetMarginX + sheetW,
          gy - 4,
        );
        ctx.stroke();
      }

      // 3. Progressively Burned Engraved Pattern Lines
      if (currentPathIndex > 1 && pathCoords.length > 0 && pathCoords[0]) {
        // Deep Charcoal Cut Grooves
        ctx.strokeStyle = "#1A0F07";
        ctx.lineWidth = 2.2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(pathCoords[0].x, pathCoords[0].y);
        for (let i = 1; i <= currentPathIndex; i++) {
          const pt = pathCoords[i];
          if (pt) {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();

        // Hot Glowing Orange Embers along the active cut path
        if (!isCompletedShowcase) {
          ctx.save();
          ctx.shadowColor = "#F97316";
          ctx.shadowBlur = 8;
          ctx.strokeStyle = "#EA580C";
          ctx.lineWidth = 1.2;
          const trailLength = 22;
          const startTrail = Math.max(0, currentPathIndex - trailLength);
          const startPt = pathCoords[startTrail];
          if (startPt) {
            ctx.beginPath();
            ctx.moveTo(startPt.x, startPt.y);
            for (let i = startTrail; i <= currentPathIndex; i++) {
              const pt = pathCoords[i];
              if (pt) {
                ctx.lineTo(pt.x, pt.y);
              }
            }
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      // 4. Active Laser Head Position & Moving Gantry
      const currentPoint = isCompletedShowcase
        ? { x: centerX, y: centerY }
        : pathCoords[currentPathIndex] || { x: centerX, y: centerY };

      // Gantry X-Rail (Moves horizontally with laser head)
      const gantryY = 22;
      ctx.fillStyle = "#1E293B";
      ctx.fillRect(30, gantryY, W - 60, 8);
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 1;
      ctx.strokeRect(30, gantryY, W - 60, 8);

      // Chrome Linear Bearing Rods
      ctx.fillStyle = "#94A3B8";
      ctx.fillRect(30, gantryY - 3, W - 60, 2);
      ctx.fillRect(30, gantryY + 9, W - 60, 2);

      // Vertical Nozzle Assembly Support (Connecting Rail to Head)
      const headX = currentPoint.x;
      const headY = currentPoint.y - 48;

      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(headX, gantryY + 8);
      ctx.lineTo(headX, headY);
      ctx.stroke();

      // Laser Nozzle Carriage Block
      const blockW = 28;
      const blockH = 26;
      const blockGrad = ctx.createLinearGradient(
        headX - blockW / 2,
        headY,
        headX + blockW / 2,
        headY + blockH,
      );
      blockGrad.addColorStop(0, "#0F172A");
      blockGrad.addColorStop(0.5, "#1E293B");
      blockGrad.addColorStop(1, "#0B132B");
      ctx.fillStyle = blockGrad;
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(headX - blockW / 2, headY, blockW, blockH, 3);
      ctx.fill();
      ctx.stroke();

      // Brass Laser Focal Cone Nozzle
      ctx.fillStyle = "#F59E0B";
      ctx.strokeStyle = "#D97706";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(headX - 6, headY + blockH);
      ctx.lineTo(headX + 6, headY + blockH);
      ctx.lineTo(headX + 2, headY + blockH + 12);
      ctx.lineTo(headX - 2, headY + blockH + 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      const nozzleTipY = headY + blockH + 12;

      // 5. Active Crimson Laser Beam & Focal Plasma Glow
      if (!isCompletedShowcase) {
        ctx.save();

        // High-Intensity Red Laser Beam
        ctx.shadowColor = "#FF0033";
        ctx.shadowBlur = 18;

        // Outer Red Beam Halo
        ctx.strokeStyle = "rgba(255, 0, 51, 0.85)";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(headX, nozzleTipY);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.stroke();

        // Inner Ultra-Bright White Laser Core
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(headX, nozzleTipY);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.stroke();

        // Intense Material Contact Focal Plasma Point
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(currentPoint.x, currentPoint.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Radiating Red/Orange Contact Ring
        ctx.fillStyle = "rgba(255, 0, 51, 0.4)";
        ctx.beginPath();
        ctx.arc(currentPoint.x, currentPoint.y, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Spawn Spark Particles
        for (let s = 0; s < 2; s++) {
          sparks.push({
            x: currentPoint.x,
            y: currentPoint.y,
            vx: (Math.random() - 0.5) * 5,
            vy: -Math.random() * 4 - 1,
            life: 0,
            maxLife: 15 + Math.random() * 15,
            color: Math.random() > 0.4 ? "#FBBF24" : "#EF4444",
            size: 1 + Math.random() * 1.5,
          });
        }

        // Spawn Subtle Smoke Puffs
        if (Math.random() > 0.6) {
          smokeList.push({
            x: currentPoint.x + (Math.random() - 0.5) * 4,
            y: currentPoint.y - 2,
            vx: (Math.random() - 0.5) * 1.2,
            vy: -Math.random() * 1.5 - 0.8,
            alpha: 0.35,
            size: 4 + Math.random() * 5,
          });
        }
      }

      // 6. Update and Draw Smoke Particles
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

        ctx.fillStyle = `rgba(229, 231, 235, ${sm.alpha})`;
        ctx.beginPath();
        ctx.arc(sm.x, sm.y, sm.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 7. Update and Draw Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        if (!sp) continue;
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.25; // gravity
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
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 8. Machine Telemetry HUD (Bottom edge)
      ctx.fillStyle = "rgba(239, 68, 68, 0.85)";
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "left";
      ctx.fillText(
        `LASER: 80W CO2 (10.6µm) | CUT: ${(progress * 100).toFixed(0)}%`,
        sheetMarginX,
        H - 12,
      );

      ctx.textAlign = "right";
      ctx.fillText("SPEED: 350mm/s | AIR: ON", W - sheetMarginX, H - 12);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative w-full h-full bg-[#03060D] overflow-hidden select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
