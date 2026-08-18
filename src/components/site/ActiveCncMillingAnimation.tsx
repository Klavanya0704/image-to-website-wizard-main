import React, { useEffect, useRef } from "react";

/**
 * Premium Realistic 4-Axis CNC Milling Animation (HTML5 Canvas 60fps)
 * Visibly transforms a raw rectangular aluminum block into a precision-machined aerospace bracket:
 * Phase 1: Step Milling outer mounting flanges
 * Phase 2: Deep pocketing center cavity
 * Phase 3: Drilling 4 counterbored mounting holes
 * Phase 4: Retract & showcase the finished machined component
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
    const LOOP_DURATION = 5400; // 5.4s seamless loop

    const W = 480;
    const H = 280;
    canvas.width = W;
    canvas.height = H;

    // Part center & dimensions
    const partCenterX = W / 2;
    const partCenterY = H / 2 + 16;
    const stockW = 200;
    const stockH = 74;
    const stockLeft = partCenterX - stockW / 2;
    const stockTop = partCenterY - stockH / 2;

    // Counterbored hole coordinates on the bracket
    const holePositions = [
      { x: stockLeft + 24, y: stockTop + 20 },
      { x: stockLeft + stockW - 24, y: stockTop + 20 },
      { x: stockLeft + 24, y: stockTop + stockH - 20 },
      { x: stockLeft + stockW - 24, y: stockTop + stockH - 20 },
    ];

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

      // Machining Phases:
      // 0.00 - 0.28: Phase 1 -> Step Milling left & right shoulders
      // 0.28 - 0.58: Phase 2 -> Pocket Milling center cavity
      // 0.58 - 0.82: Phase 3 -> Drilling & counterboring 4 corner bolt holes
      // 0.82 - 1.00: Phase 4 -> Spindle retracts, showcase finished component
      const p1 = Math.min(1, Math.max(0, (progress - 0.0) / 0.28));
      const p2 = Math.min(1, Math.max(0, (progress - 0.28) / 0.3));
      const p3 = Math.min(1, Math.max(0, (progress - 0.58) / 0.24));
      const isShowcase = progress >= 0.82;

      ctx.clearRect(0, 0, W, H);

      // 1. Dark Heavy Machine Enclosure & Precision T-Slot Table
      const bgGrad = ctx.createRadialGradient(W / 2, H * 0.4, 20, W / 2, H / 2, W * 0.75);
      bgGrad.addColorStop(0, "#1E293B"); // Slate-800 soft lighting
      bgGrad.addColorStop(0.5, "#0F172A"); // Slate-900
      bgGrad.addColorStop(1, "#070A12");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Cast Iron Machine Base
      const tableY = H - 55;
      const tableGrad = ctx.createLinearGradient(0, tableY, 0, H);
      tableGrad.addColorStop(0, "#334155");
      tableGrad.addColorStop(0.4, "#1E293B");
      tableGrad.addColorStop(1, "#0F172A");
      ctx.fillStyle = tableGrad;
      ctx.fillRect(20, tableY, W - 40, 50);
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 1;
      ctx.strokeRect(20, tableY, W - 40, 50);

      // Precision Machine Fixture Vises (Holding the stock securely)
      const viseW = 22;
      const viseH = 68;
      ctx.fillStyle = "#1E293B";
      ctx.fillRect(stockLeft - viseW - 2, stockTop + 4, viseW, viseH);
      ctx.fillRect(stockLeft + stockW + 2, stockTop + 4, viseW, viseH);
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 1;
      ctx.strokeRect(stockLeft - viseW - 2, stockTop + 4, viseW, viseH);
      ctx.strokeRect(stockLeft + stockW + 2, stockTop + 4, viseW, viseH);

      // 2. Workpiece: Transformation from Raw Aluminum Block -> Finished Bracket
      // Draw Base Raw Aluminum Block (Isometric Perspective)
      const isometOffsetX = 18;
      const isometOffsetY = 14;

      // Workpiece Front Wall (Thickness)
      const frontWallGrad = ctx.createLinearGradient(
        0,
        stockTop + stockH,
        0,
        stockTop + stockH + 18,
      );
      frontWallGrad.addColorStop(0, "#64748B");
      frontWallGrad.addColorStop(0.5, "#475569");
      frontWallGrad.addColorStop(1, "#1E293B");
      ctx.fillStyle = frontWallGrad;
      ctx.fillRect(stockLeft, stockTop + stockH, stockW, 18);
      ctx.strokeStyle = "#94A3B8";
      ctx.strokeRect(stockLeft, stockTop + stockH, stockW, 18);

      // Workpiece Top Main Body
      const aluTopGrad = ctx.createLinearGradient(
        stockLeft,
        stockTop,
        stockLeft + stockW,
        stockTop + stockH,
      );
      aluTopGrad.addColorStop(0, "#CBD5E1");
      aluTopGrad.addColorStop(0.35, "#F1F5F9"); // Specular brushed metal highlight
      aluTopGrad.addColorStop(0.7, "#CBD5E1");
      aluTopGrad.addColorStop(1, "#94A3B8");
      ctx.fillStyle = aluTopGrad;
      ctx.fillRect(stockLeft, stockTop, stockW, stockH);
      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 1.2;
      ctx.strokeRect(stockLeft, stockTop, stockW, stockH);

      // --- STAGE 1 MACHINED FEATURES: Stepped Flange Shoulders (Left & Right) ---
      if (p1 > 0) {
        const stepCutDepth = 12 * p1;
        const stepWidth = 36 * p1;

        // Left Step Shoulder (Milled Down)
        ctx.fillStyle = "#94A3B8";
        ctx.fillRect(stockLeft, stockTop, stepWidth, stockH);
        // Step Floor Texture (Machined Swirls)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 0.8;
        for (let y = stockTop + 6; y < stockTop + stockH; y += 8) {
          ctx.beginPath();
          ctx.moveTo(stockLeft, y);
          ctx.lineTo(stockLeft + stepWidth, y);
          ctx.stroke();
        }
        // Step Inner Drop Edge
        ctx.fillStyle = "#475569";
        ctx.fillRect(stockLeft + stepWidth - 2, stockTop, 2, stockH);

        // Right Step Shoulder (Milled Down)
        ctx.fillStyle = "#94A3B8";
        ctx.fillRect(stockLeft + stockW - stepWidth, stockTop, stepWidth, stockH);
        for (let y = stockTop + 6; y < stockTop + stockH; y += 8) {
          ctx.beginPath();
          ctx.moveTo(stockLeft + stockW - stepWidth, y);
          ctx.lineTo(stockLeft + stockW, y);
          ctx.stroke();
        }
        // Right Step Inner Drop Edge
        ctx.fillStyle = "#475569";
        ctx.fillRect(stockLeft + stockW - stepWidth, stockTop, 2, stockH);
      }

      // --- STAGE 2 MACHINED FEATURES: Deep Center Pocket Cavity ---
      if (p2 > 0) {
        const pocketMarginX = 46;
        const pocketMarginY = 14;
        const maxPocketW = stockW - pocketMarginX * 2;
        const maxPocketH = stockH - pocketMarginY * 2;
        const currentPocketW = maxPocketW * p2;
        const currentPocketH = maxPocketH * p2;
        const pLeft = partCenterX - currentPocketW / 2;
        const pTop = partCenterY - currentPocketH / 2;

        // Deep Shadow Pocket Cavity
        ctx.fillStyle = "#1E293B";
        ctx.beginPath();
        ctx.roundRect(pLeft, pTop, currentPocketW, currentPocketH, 6);
        ctx.fill();

        // Machined Mirror Pocket Floor with Toolpath Scallop Circles
        const pocketFloorGrad = ctx.createLinearGradient(
          pLeft,
          pTop,
          pLeft + currentPocketW,
          pTop + currentPocketH,
        );
        pocketFloorGrad.addColorStop(0, "#64748B");
        pocketFloorGrad.addColorStop(0.5, "#CBD5E1"); // Shiny mirror pass
        pocketFloorGrad.addColorStop(1, "#475569");
        ctx.fillStyle = pocketFloorGrad;
        ctx.beginPath();
        ctx.roundRect(pLeft + 3, pTop + 3, currentPocketW - 6, currentPocketH - 6, 4);
        ctx.fill();

        // Circular Toolpath Rings on Pocket Floor
        ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
        ctx.lineWidth = 0.8;
        for (let r = 8; r < currentPocketW / 2 - 4; r += 7) {
          ctx.beginPath();
          ctx.ellipse(partCenterX, partCenterY, r, r * 0.48, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Inner Chamfer Highlight
        ctx.strokeStyle = "#00E5FF";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(pLeft, pTop, currentPocketW, currentPocketH, 6);
        ctx.stroke();
      }

      // --- STAGE 3 MACHINED FEATURES: 4 Precision Counterbored Bolt Holes ---
      if (p3 > 0) {
        const drilledCount = Math.floor(p3 * 4) + 1;

        for (let i = 0; i < 4; i++) {
          const hole = holePositions[i];
          if (!hole) continue;

          if (i < drilledCount) {
            // Counterbore Outer Recess (Larger Diameter)
            ctx.fillStyle = "#475569";
            ctx.beginPath();
            ctx.arc(hole.x, hole.y, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Inner Drilled Through-Hole (Dark Deep Bore)
            ctx.fillStyle = "#090D16";
            ctx.beginPath();
            ctx.arc(hole.x, hole.y, 4.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#00E5FF";
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // 3. Dynamic Moving CNC Spindle & End-Mill Cutter
      let targetToolX = partCenterX;
      let targetToolY = partCenterY;
      let isCutting = false;

      if (progress < 0.28) {
        // Phase 1: Milling Shoulders
        isCutting = true;
        const sideT = (progress / 0.28) * Math.PI * 4;
        if (progress < 0.14) {
          // Left Shoulder Milling
          targetToolX = stockLeft + 16 + Math.cos(sideT) * 12;
          targetToolY = stockTop + stockH * (progress / 0.14);
        } else {
          // Right Shoulder Milling
          targetToolX = stockLeft + stockW - 16 + Math.cos(sideT) * 12;
          targetToolY = stockTop + stockH * ((progress - 0.14) / 0.14);
        }
      } else if (progress < 0.58) {
        // Phase 2: Pocketing Center
        isCutting = true;
        const pocketT = ((progress - 0.28) / 0.3) * Math.PI * 6;
        const radiusX = 38 * ((progress - 0.28) / 0.3);
        const radiusY = 18 * ((progress - 0.28) / 0.3);
        targetToolX = partCenterX + Math.cos(pocketT) * radiusX;
        targetToolY = partCenterY + Math.sin(pocketT) * radiusY;
      } else if (progress < 0.82) {
        // Phase 3: Drilling Holes
        isCutting = true;
        const holeIdx = Math.min(3, Math.floor(((progress - 0.58) / 0.24) * 4));
        const activeHole = holePositions[holeIdx] || { x: partCenterX, y: partCenterY };
        targetToolX = activeHole.x;
        targetToolY = activeHole.y;
      } else {
        // Phase 4: Showcase (Retracted)
        isCutting = false;
        targetToolX = partCenterX;
        targetToolY = stockTop - 18;
      }

      const toolTipY = isShowcase ? stockTop - 22 : targetToolY;
      const toolX = targetToolX;

      // Heavy CNC Gantry Bridge & Spindle Housing
      const spindleW = 60;
      const spindleH = 50;
      const spindleX = toolX - spindleW / 2;
      const spindleY = toolTipY - 78;

      // Cast-Iron Spindle Housing
      const spGrad = ctx.createLinearGradient(
        spindleX,
        spindleY,
        spindleX + spindleW,
        spindleY + spindleH,
      );
      spGrad.addColorStop(0, "#0F172A");
      spGrad.addColorStop(0.35, "#334155");
      spGrad.addColorStop(0.65, "#64748B");
      spGrad.addColorStop(1, "#1E293B");
      ctx.fillStyle = spGrad;
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(spindleX, spindleY, spindleW, spindleH, 5);
      ctx.fill();
      ctx.stroke();

      // Precision BT40 Toolholder
      const holderW = 32;
      const holderH = 20;
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

      // Collet Nut
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(toolX - 9, holderY + holderH, 18, 5);

      // Solid Carbide 4-Flute End-Mill Cutter (18,000 RPM high-speed rotation)
      const cutterH = toolTipY - (holderY + holderH + 5);
      const cutterW = 7;
      const cutterX = toolX - cutterW / 2;
      const cutterY = holderY + holderH + 5;

      const cutterGrad = ctx.createLinearGradient(
        cutterX,
        cutterY,
        cutterX + cutterW,
        cutterY + cutterH,
      );
      cutterGrad.addColorStop(0, "#94A3B8");
      cutterGrad.addColorStop(0.5, "#FFFFFF"); // Specular blade shine
      cutterGrad.addColorStop(1, "#475569");
      ctx.fillStyle = cutterGrad;
      ctx.fillRect(cutterX, cutterY, cutterW, cutterH);

      // Spinning Spiral Flutes Motion Blur
      ctx.strokeStyle = "rgba(15, 23, 42, 0.75)";
      ctx.lineWidth = 1.4;
      const flutePhase = (now * 0.045) % 8;
      for (let fy = cutterY + flutePhase; fy < cutterY + cutterH; fy += 6) {
        ctx.beginPath();
        ctx.moveTo(cutterX, fy);
        ctx.lineTo(cutterX + cutterW, fy - 3);
        ctx.stroke();
      }

      // 4. Coolant Jets, Flying Swarf Chips & Sparks
      if (isCutting) {
        // Dual Coolant Streams
        const nozLeftX = spindleX - 4;
        const nozLeftY = spindleY + 24;
        ctx.strokeStyle = "#00E5FF";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(nozLeftX, nozLeftY);
        ctx.bezierCurveTo(nozLeftX - 10, nozLeftY + 22, toolX - 18, toolTipY - 12, toolX, toolTipY);
        ctx.stroke();

        const nozRightX = spindleX + spindleW + 4;
        const nozRightY = spindleY + 24;
        ctx.beginPath();
        ctx.moveTo(nozRightX, nozRightY);
        ctx.bezierCurveTo(
          nozRightX + 10,
          nozRightY + 22,
          toolX + 18,
          toolTipY - 12,
          toolX,
          toolTipY,
        );
        ctx.stroke();

        // Spawn Coolant Splash Droplets
        for (let c = 0; c < 3; c++) {
          coolantDrops.push({
            x: toolX + (Math.random() - 0.5) * 8,
            y: toolTipY + (Math.random() - 0.5) * 4,
            vx: (Math.random() - 0.5) * 6,
            vy: -Math.random() * 3.5 - 1,
            alpha: 0.65,
            size: 1.8 + Math.random() * 2.2,
          });
        }

        // Spawn Aluminum Swarf Chips & Sparks
        for (let s = 0; s < 3; s++) {
          chips.push({
            x: toolX,
            y: toolTipY,
            vx: (Math.random() - 0.5) * 7,
            vy: -Math.random() * 5 - 1.5,
            rotation: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.45,
            life: 0,
            maxLife: 14 + Math.random() * 14,
            size: 1.5 + Math.random() * 2,
            isSpark: Math.random() > 0.4,
          });
        }

        // Contact Cutting Point Radiant Highlight
        ctx.save();
        ctx.shadowColor = "#F59E0B";
        ctx.shadowBlur = 14;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(toolX, toolTipY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. Draw Coolant Spray Droplets
      for (let i = coolantDrops.length - 1; i >= 0; i--) {
        const cd = coolantDrops[i];
        if (!cd) continue;
        cd.x += cd.vx;
        cd.y += cd.vy;
        cd.vy += 0.2;
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

      // 6. Draw Aluminum Chips & Sparks
      for (let i = chips.length - 1; i >= 0; i--) {
        const cp = chips[i];
        if (!cp) continue;
        cp.x += cp.vx;
        cp.y += cp.vy;
        cp.vy += 0.35;
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
          ctx.fillStyle = "#F59E0B";
          ctx.shadowColor = "#F97316";
          ctx.shadowBlur = 8;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(0, 0, cp.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
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
    <div className={`relative w-full h-full bg-[#070A12] overflow-hidden select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
