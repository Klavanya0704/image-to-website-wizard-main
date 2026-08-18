import React, { useEffect, useRef } from "react";

/**
 * Premium Realistic 4-Axis CNC Milling Animation (HTML5 Canvas 60fps)
 * Features an industrial 4-axis CNC spindle, carbide end-mill cutter carving into a 6061-T6
 * aerospace aluminum billet, with high-pressure coolant jets, flying metallic swarf chips,
 * and radiant friction sparks in a smooth 5.0-second seamless loop.
 */
export function ActiveCncMillingAnimation({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const LOOP_DURATION = 5000; // 5.0s seamless loop

    const W = 480;
    const H = 280;
    canvas.width = W;
    canvas.height = H;

    // CNC Pocket Milling Toolpath Coords (Spiral facing / contouring pass)
    const PATH_POINTS = 220;
    const pathCoords: { x: number; y: number }[] = [];
    const centerX = W / 2 + 10;
    const centerY = H / 2 + 18;

    for (let i = 0; i <= PATH_POINTS; i++) {
      const t = (i / PATH_POINTS) * Math.PI * 6; // 3 complete spiral passes
      const r = 10 + (i / PATH_POINTS) * 58;
      const x = centerX + r * Math.cos(t) * 1.15;
      const y = centerY + r * Math.sin(t) * 0.65; // Isometric perspective
      pathCoords.push({ x, y });
    }

    // Metal chips / Swarf particle system
    interface Chip {
      x: number;
      y: number;
      vx: number;
      vy: number;
      rotation: number;
      vRot: number;
      life: number;
      maxLife: number;
      size: number;
      isSpark: boolean;
    }
    const chips: Chip[] = [];

    // Coolant spray droplets system
    interface CoolantDrop {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
    }
    const coolantDrops: CoolantDrop[] = [];

    const render = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) % LOOP_DURATION;
      const progress = elapsed / LOOP_DURATION; // 0.0 to 1.0

      let currentPathIndex = 0;
      let isCompletedShowcase = false;

      if (progress < 0.85) {
        currentPathIndex = Math.floor((progress / 0.85) * PATH_POINTS);
      } else {
        currentPathIndex = PATH_POINTS;
        isCompletedShowcase = true;
      }

      ctx.clearRect(0, 0, W, H);

      // 1. Dark Industrial CNC Machine Enclosure
      const bgGrad = ctx.createRadialGradient(W / 2, H * 0.45, 30, W / 2, H / 2, W * 0.75);
      bgGrad.addColorStop(0, "#1E293B"); // Slate-800 ambient chamber
      bgGrad.addColorStop(0.5, "#0F172A"); // Slate-900
      bgGrad.addColorStop(1, "#070B14");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // T-Slot Heavy Cast Iron Bed Table
      const tableY = H - 65;
      const tableGrad = ctx.createLinearGradient(0, tableY, 0, H);
      tableGrad.addColorStop(0, "#334155");
      tableGrad.addColorStop(0.3, "#1E293B");
      tableGrad.addColorStop(1, "#0F172A");
      ctx.fillStyle = tableGrad;
      ctx.fillRect(20, tableY, W - 40, 60);
      ctx.strokeStyle = "#64748B";
      ctx.lineWidth = 1;
      ctx.strokeRect(20, tableY, W - 40, 60);

      // T-Slot Grooves
      ctx.fillStyle = "#0A0F1D";
      for (let tx = 45; tx < W - 40; tx += 48) {
        ctx.fillRect(tx, tableY + 6, 8, 48);
        ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
        ctx.strokeRect(tx, tableY + 6, 8, 48);
      }

      // 2. Precision Vise & 6061-T6 Aluminum Billet Workpiece
      const blockLeft = 60;
      const blockTop = H / 2 - 36;
      const blockW = W - 120;
      const blockH = 88;

      // Heavy Precision Tooling Vise Clamps (Left & Right)
      ctx.fillStyle = "#1E293B";
      ctx.fillRect(blockLeft - 18, blockTop + 10, 18, blockH - 10);
      ctx.fillRect(blockLeft + blockW, blockTop + 10, 18, blockH - 10);
      ctx.strokeStyle = "#475569";
      ctx.strokeRect(blockLeft - 18, blockTop + 10, 18, blockH - 10);
      ctx.strokeRect(blockLeft + blockW, blockTop + 10, 18, blockH - 10);

      // Aluminum Billet 3D Volume (Isometric Face)
      // Front Face
      const aluFrontGrad = ctx.createLinearGradient(
        0,
        blockTop + blockH * 0.45,
        0,
        blockTop + blockH,
      );
      aluFrontGrad.addColorStop(0, "#94A3B8");
      aluFrontGrad.addColorStop(0.5, "#64748B");
      aluFrontGrad.addColorStop(1, "#334155");
      ctx.fillStyle = aluFrontGrad;
      ctx.fillRect(blockLeft, blockTop + blockH * 0.45, blockW, blockH * 0.55);
      ctx.strokeStyle = "#CBD5E1";
      ctx.strokeRect(blockLeft, blockTop + blockH * 0.45, blockW, blockH * 0.55);

      // Top Machining Surface
      const aluTopGrad = ctx.createLinearGradient(
        blockLeft,
        blockTop,
        blockLeft + blockW,
        blockTop + blockH * 0.45,
      );
      aluTopGrad.addColorStop(0, "#E2E8F0");
      aluTopGrad.addColorStop(0.3, "#F8FAFC"); // High-specular brushed metallic reflection
      aluTopGrad.addColorStop(0.7, "#CBD5E1");
      aluTopGrad.addColorStop(1, "#94A3B8");
      ctx.fillStyle = aluTopGrad;
      ctx.beginPath();
      ctx.moveTo(blockLeft + 20, blockTop);
      ctx.lineTo(blockLeft + blockW - 20, blockTop);
      ctx.lineTo(blockLeft + blockW, blockTop + blockH * 0.45);
      ctx.lineTo(blockLeft, blockTop + blockH * 0.45);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. Progressively Milled Pocket / Scalloped Toolpaths
      if (currentPathIndex > 1) {
        // Deep Carved Pocket Cavity
        ctx.save();
        ctx.fillStyle = "#334155";
        ctx.beginPath();
        for (let i = 0; i <= currentPathIndex; i++) {
          const pt = pathCoords[i];
          if (pt) {
            ctx.arc(pt.x, pt.y, 14, 0, Math.PI * 2);
          }
        }
        ctx.fill();

        // Freshly Machined Mirror Surface with Spiral Flute Grooves
        ctx.fillStyle = "#E2E8F0";
        for (let i = 0; i <= currentPathIndex; i += 3) {
          const pt = pathCoords[i];
          if (pt) {
            ctx.beginPath();
            ctx.ellipse(pt.x, pt.y, 12, 7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // 4. Moving Spindle Toolhead & High-Speed Rotating End-Mill
      const currentPoint = isCompletedShowcase
        ? { x: centerX, y: centerY }
        : pathCoords[currentPathIndex] || { x: centerX, y: centerY };

      const toolX = currentPoint.x;
      const toolTipY = isCompletedShowcase ? currentPoint.y - 18 : currentPoint.y;

      // Heavy CNC Gantry Bridge & Spindle Housing
      const spindleW = 64;
      const spindleH = 55;
      const spindleX = toolX - spindleW / 2;
      const spindleY = toolTipY - 80;

      // Spindle Cast Iron Body
      const spGrad = ctx.createLinearGradient(
        spindleX,
        spindleY,
        spindleX + spindleW,
        spindleY + spindleH,
      );
      spGrad.addColorStop(0, "#0F172A");
      spGrad.addColorStop(0.3, "#334155");
      spGrad.addColorStop(0.6, "#64748B"); // Metallic highlight
      spGrad.addColorStop(1, "#1E293B");
      ctx.fillStyle = spGrad;
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(spindleX, spindleY, spindleW, spindleH, 6);
      ctx.fill();
      ctx.stroke();

      // Precision BT40 Toolholder (Taper & Collet Nut)
      const holderW = 34;
      const holderH = 22;
      const holderX = toolX - holderW / 2;
      const holderY = spindleY + spindleH;

      const holderGrad = ctx.createLinearGradient(
        holderX,
        holderY,
        holderX + holderW,
        holderY + holderH,
      );
      holderGrad.addColorStop(0, "#1E293B");
      holderGrad.addColorStop(0.5, "#94A3B8");
      holderGrad.addColorStop(1, "#334155");
      ctx.fillStyle = holderGrad;
      ctx.strokeStyle = "#CBD5E1";
      ctx.beginPath();
      ctx.moveTo(holderX + 4, holderY);
      ctx.lineTo(holderX + holderW - 4, holderY);
      ctx.lineTo(holderX + holderW, holderY + holderH);
      ctx.lineTo(holderX, holderY + holderH);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // ER32 Collet Nut
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(toolX - 10, holderY + holderH, 20, 6);

      // Solid Carbide 4-Flute End-Mill Cutter (Spinning at 18,000 RPM)
      const cutterH = toolTipY - (holderY + holderH + 6);
      const cutterW = 8;
      const cutterX = toolX - cutterW / 2;
      const cutterY = holderY + holderH + 6;

      // Cutter Shank
      const cutterGrad = ctx.createLinearGradient(
        cutterX,
        cutterY,
        cutterX + cutterW,
        cutterY + cutterH,
      );
      cutterGrad.addColorStop(0, "#94A3B8");
      cutterGrad.addColorStop(0.5, "#F1F5F9"); // Specular blade shine
      cutterGrad.addColorStop(1, "#475569");
      ctx.fillStyle = cutterGrad;
      ctx.fillRect(cutterX, cutterY, cutterW, cutterH);

      // High-Speed Rotating Spiral Flutes (Dynamic spinning motion blur)
      ctx.strokeStyle = "rgba(15, 23, 42, 0.7)";
      ctx.lineWidth = 1.4;
      const flutePhase = (now * 0.04) % 8;
      for (let fy = cutterY + flutePhase; fy < cutterY + cutterH; fy += 7) {
        ctx.beginPath();
        ctx.moveTo(cutterX, fy);
        ctx.lineTo(cutterX + cutterW, fy - 3);
        ctx.stroke();
      }

      // 5. Dual High-Pressure Coolant Jets & Fluid Streams
      // Left Coolant Nozzle
      const nozLeftX = spindleX - 4;
      const nozLeftY = spindleY + 28;
      ctx.strokeStyle = "#38BDF8";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(nozLeftX, nozLeftY);
      ctx.bezierCurveTo(nozLeftX - 10, nozLeftY + 25, toolX - 20, toolTipY - 15, toolX, toolTipY);
      ctx.stroke();

      // Right Coolant Nozzle
      const nozRightX = spindleX + spindleW + 4;
      const nozRightY = spindleY + 28;
      ctx.beginPath();
      ctx.moveTo(nozRightX, nozRightY);
      ctx.bezierCurveTo(nozRightX + 10, nozRightY + 25, toolX + 20, toolTipY - 15, toolX, toolTipY);
      ctx.stroke();

      // Active Coolant Spray Mist & Splash
      if (!isCompletedShowcase) {
        // Spawn Coolant Droplets
        for (let c = 0; c < 3; c++) {
          coolantDrops.push({
            x: toolX + (Math.random() - 0.5) * 8,
            y: toolTipY + (Math.random() - 0.5) * 4,
            vx: (Math.random() - 0.5) * 5,
            vy: -Math.random() * 3 - 1,
            alpha: 0.6,
            size: 2 + Math.random() * 2.5,
          });
        }

        // Spawn Metal Swarf Chips & Sparks
        for (let s = 0; s < 3; s++) {
          chips.push({
            x: toolX,
            y: toolTipY,
            vx: (Math.random() - 0.5) * 7,
            vy: -Math.random() * 5 - 1.5,
            rotation: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.4,
            life: 0,
            maxLife: 15 + Math.random() * 15,
            size: 1.5 + Math.random() * 2,
            isSpark: Math.random() > 0.45,
          });
        }

        // Active Friction Cutting Glow
        ctx.save();
        ctx.shadowColor = "#F59E0B";
        ctx.shadowBlur = 14;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(toolX, toolTipY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 6. Draw Coolant Spray Droplets
      for (let i = coolantDrops.length - 1; i >= 0; i--) {
        const cd = coolantDrops[i];
        if (!cd) continue;
        cd.x += cd.vx;
        cd.y += cd.vy;
        cd.vy += 0.2; // gravity
        cd.alpha -= 0.025;

        if (cd.alpha <= 0) {
          coolantDrops.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(0, 229, 255, ${cd.alpha})`;
        ctx.beginPath();
        ctx.arc(cd.x, cd.y, cd.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 7. Draw Aluminum Swarf Chips & Radiant Sparks
      for (let i = chips.length - 1; i >= 0; i--) {
        const cp = chips[i];
        if (!cp) continue;
        cp.x += cp.vx;
        cp.y += cp.vy;
        cp.vy += 0.35; // gravity
        cp.rotation += cp.vRot;
        cp.life++;

        if (cp.life >= cp.maxLife) {
          chips.splice(i, 1);
          continue;
        }

        const alpha = 1 - cp.life / cp.maxLife;
        ctx.save();
        ctx.translate(cp.x, cp.y);
        ctx.rotate(cp.rotation);

        if (cp.isSpark) {
          // Radiant orange friction spark
          ctx.fillStyle = "#F59E0B";
          ctx.shadowColor = "#F97316";
          ctx.shadowBlur = 8;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(0, 0, cp.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Curled silver aluminum chip
          ctx.fillStyle = "#E2E8F0";
          ctx.strokeStyle = "#64748B";
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.ellipse(0, 0, cp.size * 1.5, cp.size * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }

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
    <div className={`relative w-full h-full bg-[#070B14] overflow-hidden select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
