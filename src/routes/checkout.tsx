import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import { productImage } from "@/lib/product-images";
import { inr } from "@/lib/format";
import {
  CreditCard,
  MapPin,
  Truck,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Building,
  Smartphone,
  QrCode,
  Gift,
  Lock,
  Sparkles,
  ChevronRight,
  Edit3,
  Check,
  AlertCircle,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

type PaymentMethodKey = "recommended" | "upi" | "card" | "cod" | "giftcard" | "netbanking" | "emi";

// Web Audio API victory chime generator
function playVictorySound() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Melodic victory chord sequence: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz), C6 (1046.5Hz)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const now = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + index * 0.09);

      gain.gain.setValueAtTime(0, now + index * 0.09);
      gain.gain.linearRampToValueAtTime(0.22, now + index * 0.09 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.09 + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.09);
      osc.stop(now + index * 0.09 + 0.75);
    });
  } catch (e) {
    console.debug("Victory audio note skipped:", e);
  }
}

// Particle definition for Canvas Confetti & Fireworks
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRotation: number;
  shape: "rect" | "circle";
  alpha: number;
  gravity: number;
  drag: number;
}

// Canvas Confetti & Fireworks Cannons Component
function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const colors = [
      "#10B981", // Emerald
      "#34D399", // Mint
      "#F59E0B", // Amber Gold
      "#EF4444", // Coral
      "#3B82F6", // Sky Blue
      "#8B5CF6", // Violet
      "#EC4899", // Pink
      "#FBBF24", // Sun Gold
      "#0A3728", // Forest Green
    ];

    const particles: Particle[] = [];

    // Left cannon burst
    const spawnCannonLeft = () => {
      for (let i = 0; i < 70; i++) {
        const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.8; // ~45 deg upwards right
        const speed = 14 + Math.random() * 22;
        particles.push({
          x: 0,
          y: height * 0.85,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 6 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)] ?? "#10B981",
          rotation: Math.random() * Math.PI * 2,
          vRotation: (Math.random() - 0.5) * 0.2,
          shape: Math.random() > 0.4 ? "rect" : "circle",
          alpha: 1,
          gravity: 0.35 + Math.random() * 0.15,
          drag: 0.965,
        });
      }
    };

    // Right cannon burst
    const spawnCannonRight = () => {
      for (let i = 0; i < 70; i++) {
        const angle = (-3 * Math.PI) / 4 + (Math.random() - 0.5) * 0.8; // ~135 deg upwards left
        const speed = 14 + Math.random() * 22;
        particles.push({
          x: width,
          y: height * 0.85,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 6 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)] ?? "#10B981",
          rotation: Math.random() * Math.PI * 2,
          vRotation: (Math.random() - 0.5) * 0.2,
          shape: Math.random() > 0.4 ? "rect" : "circle",
          alpha: 1,
          gravity: 0.35 + Math.random() * 0.15,
          drag: 0.965,
        });
      }
    };

    // Center fireworks explosion
    const spawnCenterFireworks = () => {
      const cx = width / 2;
      const cy = height * 0.3;
      for (let i = 0; i < 90; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 16;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 5 + Math.random() * 7,
          color: colors[Math.floor(Math.random() * colors.length)] ?? "#F59E0B",
          rotation: Math.random() * Math.PI * 2,
          vRotation: (Math.random() - 0.5) * 0.3,
          shape: Math.random() > 0.5 ? "rect" : "circle",
          alpha: 1,
          gravity: 0.22,
          drag: 0.97,
        });
      }
    };

    // Trigger initial bursts
    spawnCannonLeft();
    spawnCannonRight();
    setTimeout(spawnCenterFireworks, 250);
    setTimeout(spawnCannonLeft, 800);
    setTimeout(spawnCannonRight, 1000);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (!p) continue;

        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRotation;
        p.alpha -= 0.0035;

        if (p.alpha <= 0 || p.y > height + 50) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.65);
        }

        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10 w-full h-full" />
  );
}

function Checkout() {
  const { cart, clearCart, cartSubtotal } = useStore();
  const navigate = useNavigate();

  // Snapshot of cart items for the celebration modal
  const [purchasedItems, setPurchasedItems] = useState(cart);

  // Shipping & Contact Details
  const [name, setName] = useState("Alex Johnson");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [email, setEmail] = useState("student.alex@innovation.edu");
  const [address, setAddress] = useState("Room 304, Innovation Block, AICTE IDEA Lab Campus");
  const [pinCode, setPinCode] = useState("560001");
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Delivery Method Selection
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express" | "pickup">(
    "standard",
  );

  // Payment Options Tab State
  const [activePaymentMethod, setActivePaymentMethod] = useState<PaymentMethodKey>("recommended");

  // Sub-method states
  const [recommendedSub, setRecommendedSub] = useState<"gpay" | "phonepe" | "qr">("gpay");
  const [upiSub, setUpiSub] = useState<"id" | "phonepe" | "gpay" | "paytm">("id");
  const [upiId, setUpiId] = useState("");
  const [isUpiVerified, setIsUpiVerified] = useState(false);

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Netbanking bank selection
  const [selectedBank, setSelectedBank] = useState("");

  // Gift Card / Voucher
  const [voucherCode, setVoucherCode] = useState("STUDENT15");
  const [voucherApplied, setVoucherApplied] = useState(true);

  // COD Captcha
  const [captchaInput, setCaptchaInput] = useState("");
  const [generatedCaptcha] = useState("7492");

  // Processing & Celebration States
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [copiedId, setCopiedId] = useState(false);

  // Update snapshot when cart changes before checkout
  useEffect(() => {
    if (cart.length > 0) {
      setPurchasedItems(cart);
    }
  }, [cart]);

  // Price calculations
  const totalItemsCount = (cart.length > 0 ? cart : purchasedItems).reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const effectiveSubtotal =
    cart.length > 0
      ? cartSubtotal
      : purchasedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const mrpTotal = Math.round(effectiveSubtotal * 1.25);
  const mrpDiscount = mrpTotal - effectiveSubtotal;
  const studentCouponDiscount = voucherApplied ? Math.round(effectiveSubtotal * 0.15) : 0;
  const deliveryCharges = deliveryMethod === "pickup" ? 0 : deliveryMethod === "express" ? 150 : 80;
  const handlingFee = 0;
  const subtotalAfterDiscounts = effectiveSubtotal - studentCouponDiscount;
  const taxes = Math.round(subtotalAfterDiscounts * 0.18);
  const finalPayable = subtotalAfterDiscounts + taxes + deliveryCharges + handlingFee;
  const totalSavings = mrpDiscount + studentCouponDiscount;

  const handleVerifyUpi = () => {
    if (!upiId || !upiId.includes("@")) {
      toast.error("Please enter a valid UPI ID (e.g. yourname@oksbi)");
      return;
    }
    setIsUpiVerified(true);
    toast.success("UPI ID verified: Alex Johnson (AICTE Student)");
  };

  const handleApplyVoucher = () => {
    if (
      voucherCode.trim().toUpperCase() === "STUDENT15" ||
      voucherCode.trim().toUpperCase() === "IDEA2026"
    ) {
      setVoucherApplied(true);
      toast.success("Coupon applied! 15% extra discount added.");
    } else {
      toast.error("Invalid voucher code. Try 'STUDENT15' for 15% student discount.");
    }
  };

  const handleCopyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopiedId(true);
      toast.success("Order ID copied to clipboard!");
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    navigate({ to: "/" });
  };

  const handlePlaceOrder = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!name.trim() || !address.trim() || !pinCode.trim()) {
      setIsEditingAddress(true);
      toast.error("Please complete your delivery address details.");
      return;
    }

    if (activePaymentMethod === "upi" && upiSub === "id" && !upiId.trim()) {
      toast.error("Please enter your UPI ID.");
      return;
    }

    if (activePaymentMethod === "card") {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        toast.error("Please fill in complete Card details.");
        return;
      }
    }

    if (activePaymentMethod === "netbanking" && !selectedBank) {
      toast.error("Please choose your bank for Net Banking.");
      return;
    }

    if (activePaymentMethod === "cod" && captchaInput !== generatedCaptcha) {
      toast.error("Please enter the correct security captcha.");
      return;
    }

    if (activePaymentMethod === "emi") {
      toast.error("EMI is currently unavailable for this order size.");
      return;
    }

    setIsProcessing(true);

    // Freeze purchased items snapshot before clearing cart
    setPurchasedItems(cart);

    // Simulate order placement with celebration modal overlay
    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = "IDEA-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);

      const estimatedDate = new Date();
      estimatedDate.setDate(
        estimatedDate.getDate() +
          (deliveryMethod === "pickup" ? 1 : deliveryMethod === "express" ? 2 : 4),
      );
      const dateStr = estimatedDate.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setEstimatedDelivery(dateStr);

      // Play Victory Chime Sound
      playVictorySound();

      // Launch full-screen animated celebratory modal overlay
      setShowCelebration(true);
      clearCart();
      toast.success("Order Placed Successfully!");

      // Start 5-second auto-redirect countdown
      let currentCountdown = 5;
      const interval = setInterval(() => {
        currentCountdown -= 1;
        setCountdown(currentCountdown);
        if (currentCountdown <= 0) {
          clearInterval(interval);
          setShowCelebration(false);
          navigate({ to: "/" });
        }
      }, 1000);
    }, 1500);
  };

  // If cart is empty and celebration is not active
  if (cart.length === 0 && !showCelebration && !orderId) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted/10 text-muted-foreground mb-6">
          <Truck className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please add items to your cart before proceeding to the checkout and payment portal.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/95 shadow-md transition-all cursor-pointer"
        >
          Browse Innovation Catalog <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface/30 pb-24 relative">
      {/* Full-Screen Animated Celebratory Modal Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-300">
          {/* Active Canvas Confetti Cannon & Fireworks */}
          <ConfettiCanvas />

          <style
            dangerouslySetInnerHTML={{
              __html: `
            @keyframes bouncePopIn {
              0% { transform: scale(0.3) translateY(-30px); opacity: 0; }
              60% { transform: scale(1.1) translateY(0); opacity: 1; }
              100% { transform: scale(1) translateY(0); opacity: 1; }
            }
            @keyframes checkmarkDraw {
              0% { stroke-dashoffset: 50; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes pulseGlow {
              0%, 100% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.45); transform: scale(1); }
              50% { box-shadow: 0 0 45px rgba(16, 185, 129, 0.75); transform: scale(1.05); }
            }
            @keyframes textSlideDown {
              0% { transform: translateY(-20px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            .animate-pop-badge {
              animation: bouncePopIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, pulseGlow 2.5s infinite 0.7s;
            }
            .animate-check-svg {
              stroke-dasharray: 50;
              stroke-dashoffset: 50;
              animation: checkmarkDraw 0.5s ease-out 0.45s forwards;
            }
            .animate-title-slide {
              animation: textSlideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
            }
          `,
            }}
          />

          {/* Glassmorphic Order Confirmation Card */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 dark:border-white/10 bg-card/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl text-center z-20 animate-in zoom-in-95 duration-300">
            {/* Pop-in Glowing Green Checkmark Badge */}
            <div className="relative mx-auto mb-5 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white shadow-xl animate-pop-badge">
              <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 animate-ping" />
              <svg
                className="h-10 w-10 sm:h-12 sm:w-12 drop-shadow-md"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3.2"
              >
                <path
                  className="animate-check-svg"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Title & Tagline with Slide-Down Animation */}
            <div className="animate-title-slide">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-extrabold uppercase tracking-wider mb-2">
                <ShieldCheck className="h-3.5 w-3.5" /> AICTE IDEA LAB CONFIRMED
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                🎉 Order Placed Successfully!
              </h2>
              <p className="mt-1 text-xs text-muted-foreground font-semibold">
                Your innovation gear has been logged into the makerspace fabrication queue.
              </p>
            </div>

            {/* Glassmorphic Order Details Box */}
            <div className="mt-5 border border-border/80 bg-muted/30 dark:bg-muted/10 p-4 sm:p-5 rounded-2xl text-left space-y-3 text-xs shadow-inner">
              {/* Order ID with Copy Action */}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-semibold">Order Reference ID</span>
                <button
                  type="button"
                  onClick={handleCopyOrderId}
                  className="flex items-center gap-1.5 font-mono font-black text-foreground hover:text-primary transition-colors bg-background/80 px-2.5 py-1 rounded-lg border border-border text-xs cursor-pointer active:scale-95"
                >
                  <span>{orderId}</span>
                  {copiedId ? (
                    <Check className="h-3.5 w-3.5 text-success" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </button>
              </div>

              {/* Payment Status */}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-semibold">Payment Status</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-success bg-success/10 border border-success/20 px-2.5 py-0.5 rounded-full text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  Payment Confirmed (
                  {activePaymentMethod === "cod" ? "COD" : activePaymentMethod.toUpperCase()})
                </span>
              </div>

              {/* Estimated Delivery */}
              <div className="flex justify-between items-start pt-1 border-t border-border/60">
                <span className="text-muted-foreground font-semibold mt-0.5">
                  Estimated Delivery
                </span>
                <span className="font-bold text-foreground text-right max-w-[220px] leading-tight">
                  {estimatedDelivery}
                </span>
              </div>

              {/* Total Paid & Savings */}
              <div className="flex justify-between items-center pt-1 border-t border-border/60">
                <span className="text-muted-foreground font-semibold">Total Paid</span>
                <div className="text-right">
                  <span className="font-black text-sm text-price">{inr(finalPayable)}</span>
                  {studentCouponDiscount > 0 && (
                    <span className="block text-[10px] text-success font-bold">
                      Saved {inr(studentCouponDiscount)} with STUDENT15
                    </span>
                  )}
                </div>
              </div>

              {/* Purchased Items Thumbnail Row */}
              {purchasedItems.length > 0 && (
                <div className="pt-2 border-t border-border/60">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1.5">
                    Items In This Order ({purchasedItems.length})
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {purchasedItems.map((item) => (
                      <div
                        key={item.productId}
                        className="h-12 w-12 shrink-0 rounded-lg border border-border bg-surface overflow-hidden relative"
                        title={item.name}
                      >
                        <img
                          src={productImage(item.imageKey)}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute bottom-0 right-0 bg-black/75 text-[9px] font-bold text-white px-1 rounded-tl">
                          ×{item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Countdown Progress & Primary Action Button */}
            <div className="mt-6 space-y-3">
              {/* Animated Countdown Progress Bar */}
              <div className="w-full bg-muted/40 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(countdown / 5) * 100}%` }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <Button
                  onClick={handleCloseCelebration}
                  className="flex-1 bg-primary hover:bg-primary/95 text-primary-foreground font-black py-3.5 rounded-xl transition-all shadow-md text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  Return to Store <ArrowRight className="h-3.5 w-3.5" />
                </Button>
                <Link
                  to="/shop"
                  onClick={() => setShowCelebration(false)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-4 py-3 text-xs font-bold text-foreground hover:bg-muted transition-all active:scale-95 cursor-pointer"
                >
                  Browse Catalog <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>

              <p className="text-[11px] text-muted-foreground font-semibold">
                Auto-redirecting to homepage in{" "}
                <span className="text-foreground font-bold">{countdown}</span>s...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top Stepper Navigation Bar (Flipkart Style) */}
      <div className="border-b border-border bg-card py-3">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6">
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-[10px] font-bold text-white">
                ✓
              </span>
              <span className="hidden sm:inline">1. LOGIN / ACCOUNT</span>
            </div>
            <div className="h-0.5 w-8 bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-[10px] font-bold text-white">
                ✓
              </span>
              <span className="hidden sm:inline">2. DELIVERY ADDRESS</span>
            </div>
            <div className="h-0.5 w-8 bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-[10px] font-bold text-white">
                ✓
              </span>
              <span className="hidden sm:inline">3. ORDER SUMMARY</span>
            </div>
            <div className="h-0.5 w-8 bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-primary font-bold">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                4
              </span>
              <span>PAYMENT OPTIONS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Container */}
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 pt-6">
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* Left & Center Main Panel (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Step 2 Preview: Delivery Address Bar */}
            <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">
                    2
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        DELIVERY ADDRESS
                      </span>
                      <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        HOME / LAB
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-bold text-foreground">
                      {name} <span className="font-normal text-muted-foreground ml-2">{phone}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                      {address} — <span className="font-bold text-foreground">{pinCode}</span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/5 transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  {isEditingAddress ? "Close" : "Change"}
                </button>
              </div>

              {/* Collapsible Address Edit Form */}
              {isEditingAddress && (
                <div className="mt-4 pt-4 border-t border-border grid gap-3 sm:grid-cols-2 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Street Address / Lab Location
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ""))}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      size="sm"
                      onClick={() => {
                        setIsEditingAddress(false);
                        toast.success("Delivery address updated");
                      }}
                      className="w-full text-xs font-bold"
                    >
                      Save &amp; Deliver Here
                    </Button>
                  </div>
                </div>
              )}

              {/* Delivery Method Speed Chips */}
              <div className="mt-3 pt-3 border-t border-border/60 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[11px] font-bold text-muted-foreground">Delivery Speed:</span>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("standard")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all ${
                    deliveryMethod === "standard"
                      ? "border-primary bg-primary/10 text-primary font-bold"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  Standard (3-4 Days) • ₹80
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("express")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all ${
                    deliveryMethod === "express"
                      ? "border-primary bg-primary/10 text-primary font-bold"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  Express (1-2 Days) • ₹150
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all ${
                    deliveryMethod === "pickup"
                      ? "border-primary bg-primary/10 text-primary font-bold"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  Lab Pickup • FREE
                </button>
              </div>
            </div>

            {/* Step 4 Main Card: Payment Options Split / Accordion (Flipkart Style) */}
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
              <div className="bg-primary px-5 py-3.5 flex items-center justify-between text-primary-foreground">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary text-xs font-black">
                    4
                  </div>
                  <h2 className="text-sm font-extrabold uppercase tracking-wider">
                    PAYMENT OPTIONS
                  </h2>
                </div>
                <span className="text-[11px] font-semibold opacity-90 flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5" /> 256-Bit SSL Encrypted
                </span>
              </div>

              {/* Two-Panel Flipkart Payment Layout (Sidebar Tabs on Left, Active Form on Right) */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
                {/* Left Sidebar Tabs (5 cols) */}
                <div className="md:col-span-5 border-r border-border bg-muted/15 flex flex-col divide-y divide-border/60">
                  {/* 1. Recommended for You */}
                  <button
                    type="button"
                    onClick={() => setActivePaymentMethod("recommended")}
                    className={`p-4 text-left flex items-center justify-between transition-colors cursor-pointer ${
                      activePaymentMethod === "recommended"
                        ? "bg-card border-l-4 border-l-primary font-bold shadow-sm"
                        : "hover:bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles
                        className={`h-4 w-4 ${activePaymentMethod === "recommended" ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <div>
                        <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          Recommended
                          <span className="bg-success/15 text-success text-[9px] font-extrabold px-1.5 py-0.2 rounded">
                            FASTEST
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground block mt-0.5">
                          UPI 1-Click Payment
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-60" />
                  </button>

                  {/* 2. UPI */}
                  <button
                    type="button"
                    onClick={() => setActivePaymentMethod("upi")}
                    className={`p-4 text-left flex items-center justify-between transition-colors cursor-pointer ${
                      activePaymentMethod === "upi"
                        ? "bg-card border-l-4 border-l-primary font-bold shadow-sm"
                        : "hover:bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone
                        className={`h-4 w-4 ${activePaymentMethod === "upi" ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <div>
                        <div className="text-xs font-bold text-foreground">UPI</div>
                        <span className="text-[10px] text-muted-foreground block mt-0.5">
                          Google Pay, PhonePe, Paytm
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-60" />
                  </button>

                  {/* 3. Credit / Debit / ATM Card */}
                  <button
                    type="button"
                    onClick={() => setActivePaymentMethod("card")}
                    className={`p-4 text-left flex items-center justify-between transition-colors cursor-pointer ${
                      activePaymentMethod === "card"
                        ? "bg-card border-l-4 border-l-primary font-bold shadow-sm"
                        : "hover:bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard
                        className={`h-4 w-4 ${activePaymentMethod === "card" ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <div>
                        <div className="text-xs font-bold text-foreground">
                          Credit / Debit / ATM Card
                        </div>
                        <span className="text-[10px] text-muted-foreground block mt-0.5">
                          Visa, MasterCard, RuPay
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-60" />
                  </button>

                  {/* 4. Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setActivePaymentMethod("cod")}
                    className={`p-4 text-left flex items-center justify-between transition-colors cursor-pointer ${
                      activePaymentMethod === "cod"
                        ? "bg-card border-l-4 border-l-primary font-bold shadow-sm"
                        : "hover:bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck
                        className={`h-4 w-4 ${activePaymentMethod === "cod" ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <div>
                        <div className="text-xs font-bold text-foreground">Cash on Delivery</div>
                        <span className="text-[10px] text-muted-foreground block mt-0.5">
                          Pay cash / UPI on delivery
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-60" />
                  </button>

                  {/* 5. Gift Card / Lab Voucher */}
                  <button
                    type="button"
                    onClick={() => setActivePaymentMethod("giftcard")}
                    className={`p-4 text-left flex items-center justify-between transition-colors cursor-pointer ${
                      activePaymentMethod === "giftcard"
                        ? "bg-card border-l-4 border-l-primary font-bold shadow-sm"
                        : "hover:bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Gift
                        className={`h-4 w-4 ${activePaymentMethod === "giftcard" ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <div>
                        <div className="text-xs font-bold text-foreground">Gift Card / Voucher</div>
                        <span className="text-[10px] text-muted-foreground block mt-0.5">
                          Have an IDEA Lab coupon?
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-60" />
                  </button>

                  {/* 6. Net Banking */}
                  <button
                    type="button"
                    onClick={() => setActivePaymentMethod("netbanking")}
                    className={`p-4 text-left flex items-center justify-between transition-colors cursor-pointer ${
                      activePaymentMethod === "netbanking"
                        ? "bg-card border-l-4 border-l-primary font-bold shadow-sm"
                        : "hover:bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building
                        className={`h-4 w-4 ${activePaymentMethod === "netbanking" ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <div>
                        <div className="text-xs font-bold text-foreground">Net Banking</div>
                        <span className="text-[10px] text-muted-foreground block mt-0.5">
                          All Indian Banks supported
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-60" />
                  </button>

                  {/* 7. EMI (Unavailable) */}
                  <button
                    type="button"
                    onClick={() => setActivePaymentMethod("emi")}
                    className={`p-4 text-left flex items-center justify-between transition-colors cursor-pointer opacity-60 ${
                      activePaymentMethod === "emi"
                        ? "bg-card border-l-4 border-l-muted-foreground font-bold shadow-sm"
                        : "hover:bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                          EMI (Easy Installments)
                          <span className="text-[9px] font-bold bg-muted px-1.5 py-0.2 rounded text-muted-foreground">
                            UNAVAILABLE
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground block mt-0.5">
                          Not applicable below ₹5,000
                        </span>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Right / Center Detail Area for Selected Option (7 cols) */}
                <div className="md:col-span-7 p-5 sm:p-6 bg-card flex flex-col justify-between">
                  {/* View 1: Recommended */}
                  {activePaymentMethod === "recommended" && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-sm font-bold text-foreground">
                          Recommended Fast Payment
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Instant checkout using UPI. Choose your preferred app:
                        </p>
                      </div>

                      <div className="space-y-3">
                        <label
                          onClick={() => setRecommendedSub("gpay")}
                          className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                            recommendedSub === "gpay"
                              ? "border-primary bg-primary/[3%]"
                              : "border-border hover:bg-muted/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="rec-opt"
                              checked={recommendedSub === "gpay"}
                              onChange={() => setRecommendedSub("gpay")}
                              className="accent-primary h-4 w-4 cursor-pointer"
                            />
                            <div>
                              <span className="text-xs font-bold text-foreground block">
                                Google Pay UPI
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                Pay instantly via linked bank account
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-primary">GPay</span>
                        </label>

                        <label
                          onClick={() => setRecommendedSub("phonepe")}
                          className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                            recommendedSub === "phonepe"
                              ? "border-primary bg-primary/[3%]"
                              : "border-border hover:bg-muted/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="rec-opt"
                              checked={recommendedSub === "phonepe"}
                              onChange={() => setRecommendedSub("phonepe")}
                              className="accent-primary h-4 w-4 cursor-pointer"
                            />
                            <div>
                              <span className="text-xs font-bold text-foreground block">
                                PhonePe UPI
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                Pay via PhonePe QR / Intent
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-purple-600">PhonePe</span>
                        </label>

                        <label
                          onClick={() => setRecommendedSub("qr")}
                          className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                            recommendedSub === "qr"
                              ? "border-primary bg-primary/[3%]"
                              : "border-border hover:bg-muted/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="rec-opt"
                              checked={recommendedSub === "qr"}
                              onChange={() => setRecommendedSub("qr")}
                              className="accent-primary h-4 w-4 cursor-pointer"
                            />
                            <div>
                              <span className="text-xs font-bold text-foreground block">
                                Show Dynamic Lab QR Code
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                Scan with any UPI app on phone
                              </span>
                            </div>
                          </div>
                          <QrCode className="h-5 w-5 text-muted-foreground" />
                        </label>
                      </div>

                      {recommendedSub === "qr" && (
                        <div className="p-4 rounded-xl bg-muted/20 border border-border text-center space-y-2">
                          <div className="mx-auto flex h-28 w-28 items-center justify-center bg-white p-2 rounded-lg border border-border shadow-sm">
                            <QrCode className="h-24 w-24 text-slate-800" />
                          </div>
                          <p className="text-[11px] font-bold text-foreground">
                            Scan to pay {inr(finalPayable)} directly to AICTE IDEA LAB
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* View 2: UPI */}
                  {activePaymentMethod === "upi" && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-sm font-bold text-foreground">UPI Payment Options</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Select your UPI method or provide your Virtual Payment Address (VPA):
                        </p>
                      </div>

                      <div className="space-y-3">
                        {/* Enter UPI ID */}
                        <div
                          className={`p-4 rounded-xl border transition-all ${
                            upiSub === "id" ? "border-primary bg-primary/[2%]" : "border-border"
                          }`}
                        >
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="upi-sub"
                              checked={upiSub === "id"}
                              onChange={() => setUpiSub("id")}
                              className="accent-primary h-4 w-4 cursor-pointer"
                            />
                            <span className="text-xs font-bold text-foreground">
                              Enter UPI ID / VPA
                            </span>
                          </label>

                          {upiSub === "id" && (
                            <div className="mt-3 pl-7 space-y-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="e.g. mobile@upi or name@oksbi"
                                  value={upiId}
                                  onChange={(e) => {
                                    setUpiId(e.target.value);
                                    setIsUpiVerified(false);
                                  }}
                                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium focus:border-primary focus:outline-none"
                                />
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={handleVerifyUpi}
                                  className="text-xs font-bold px-4"
                                >
                                  {isUpiVerified ? "Verified ✓" : "Verify"}
                                </Button>
                              </div>
                              <p className="text-[10px] text-muted-foreground">
                                A payment request will be sent to your UPI application.
                              </p>
                            </div>
                          )}
                        </div>

                        {/* PhonePe */}
                        <label
                          onClick={() => setUpiSub("phonepe")}
                          className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                            upiSub === "phonepe"
                              ? "border-primary bg-primary/[2%]"
                              : "border-border hover:bg-muted/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="upi-sub"
                              checked={upiSub === "phonepe"}
                              onChange={() => setUpiSub("phonepe")}
                              className="accent-primary h-4 w-4 cursor-pointer"
                            />
                            <span className="text-xs font-bold text-foreground">PhonePe</span>
                          </div>
                          <span className="text-xs font-bold text-purple-600">PhonePe</span>
                        </label>

                        {/* Google Pay */}
                        <label
                          onClick={() => setUpiSub("gpay")}
                          className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                            upiSub === "gpay"
                              ? "border-primary bg-primary/[2%]"
                              : "border-border hover:bg-muted/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="upi-sub"
                              checked={upiSub === "gpay"}
                              onChange={() => setUpiSub("gpay")}
                              className="accent-primary h-4 w-4 cursor-pointer"
                            />
                            <span className="text-xs font-bold text-foreground">Google Pay</span>
                          </div>
                          <span className="text-xs font-bold text-primary">GPay</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* View 3: Credit / Debit / ATM Card */}
                  {activePaymentMethod === "card" && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-sm font-bold text-foreground">Card Details</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Enter your card number, expiry, and CVV.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Card Number
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              maxLength={19}
                              placeholder="XXXX XXXX XXXX XXXX"
                              value={cardNumber}
                              onChange={(e) =>
                                setCardNumber(
                                  e.target.value
                                    .replace(/\D/g, "")
                                    .replace(/(.{4})/g, "$1 ")
                                    .trim(),
                                )
                              }
                              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none tracking-wider"
                            />
                            <CreditCard className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            placeholder="Name as on card"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-medium focus:border-primary focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              Valid Thru (MM/YY)
                            </label>
                            <input
                              type="text"
                              maxLength={5}
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) =>
                                setCardExpiry(
                                  e.target.value
                                    .replace(/\D/g, "")
                                    .replace(/(.{2})/g, "$1/")
                                    .replace(/\/$/, ""),
                                )
                              }
                              className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-semibold focus:border-primary focus:outline-none text-center"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              CVV / CVC
                            </label>
                            <input
                              type="password"
                              maxLength={3}
                              placeholder="•••"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                              className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-semibold focus:border-primary focus:outline-none text-center"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1 text-[10px] text-muted-foreground">
                        <Lock className="h-3.5 w-3.5 text-success shrink-0" />
                        <span>Your card information is encrypted according to RBI guidelines.</span>
                      </div>
                    </div>
                  )}

                  {/* View 4: Cash on Delivery */}
                  {activePaymentMethod === "cod" && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-sm font-bold text-foreground">
                          Cash / Counter on Delivery
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Pay in cash or through UPI QR when your order arrives or at the AICTE Lab
                          pickup desk.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-foreground">
                            Verify Security Code:
                          </span>
                          <span className="bg-primary/10 text-primary font-mono text-sm font-black px-3 py-1 rounded tracking-widest border border-primary/20">
                            {generatedCaptcha}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Enter numbers shown above
                          </label>
                          <input
                            type="text"
                            maxLength={4}
                            placeholder="Enter 4-digit code"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono font-bold tracking-widest focus:border-primary focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* View 5: Gift Card / Voucher */}
                  {activePaymentMethod === "giftcard" && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-sm font-bold text-foreground">
                          Gift Card / Lab Coupon
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Apply student vouchers, scholarship codes, or lab grants:
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter code (e.g. STUDENT15)"
                            value={voucherCode}
                            onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold tracking-wider uppercase focus:border-primary focus:outline-none"
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleApplyVoucher}
                            className="text-xs font-bold px-4"
                          >
                            Apply
                          </Button>
                        </div>

                        {voucherApplied && (
                          <div className="p-3 rounded-lg bg-success/10 border border-success/20 flex items-center justify-between text-xs text-success font-bold">
                            <span className="flex items-center gap-1.5">
                              <Check className="h-4 w-4" /> STUDENT15 Applied (15% OFF)
                            </span>
                            <span>- {inr(studentCouponDiscount)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* View 6: Net Banking */}
                  {activePaymentMethod === "netbanking" && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-sm font-bold text-foreground">Net Banking</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Choose from popular banks or select from all Indian banks:
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          { id: "sbi", name: "State Bank of India" },
                          { id: "hdfc", name: "HDFC Bank" },
                          { id: "icici", name: "ICICI Bank" },
                          { id: "axis", name: "Axis Bank" },
                        ].map((bank) => (
                          <label
                            key={bank.id}
                            className={`p-3 rounded-lg border cursor-pointer flex items-center gap-2 transition-all ${
                              selectedBank === bank.id
                                ? "border-primary bg-primary/5 font-bold text-foreground"
                                : "border-border text-muted-foreground hover:bg-muted/20"
                            }`}
                          >
                            <input
                              type="radio"
                              name="bank-opt"
                              checked={selectedBank === bank.id}
                              onChange={() => setSelectedBank(bank.id)}
                              className="accent-primary h-3.5 w-3.5"
                            />
                            <span className="text-[11px] truncate">{bank.name}</span>
                          </label>
                        ))}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Or Select Other Bank
                        </label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none cursor-pointer"
                        >
                          <option value="">Choose bank...</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                          <option value="pnb">Punjab National Bank</option>
                          <option value="bob">Bank of Baroda</option>
                          <option value="canara">Canara Bank</option>
                          <option value="union">Union Bank of India</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* View 7: EMI (Unavailable) */}
                  {activePaymentMethod === "emi" && (
                    <div className="space-y-4 animate-in fade-in duration-200 text-center py-8">
                      <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto opacity-40" />
                      <div>
                        <h3 className="text-sm font-bold text-foreground">
                          EMI Not Eligible For This Order
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                          Equated Monthly Installments are reserved for machinery and bulk lab
                          orders above ₹5,000.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bottom Action Bar for Center Panel (Flipkart Style Place Order CTA) */}
                  <div className="mt-8 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-left w-full sm:w-auto">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                        Total Amount Payable
                      </span>
                      <span className="text-lg font-black text-price">{inr(finalPayable)}</span>
                    </div>

                    <Button
                      type="button"
                      disabled={isProcessing || activePaymentMethod === "emi"}
                      onClick={handlePlaceOrder}
                      className="w-full sm:w-auto min-w-[200px] bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs sm:text-sm py-3.5 px-8 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          PLACE ORDER <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Price Details Card (4 Columns - Sticky Sidebar) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="sticky top-24 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
              {/* Top Security Header */}
              <div className="bg-muted/30 px-5 py-3 border-b border-border flex items-center gap-2 text-xs font-bold text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-success" />
                <span>100% SAFE AND SECURE PAYMENTS</span>
              </div>

              <div className="p-5 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
                  PRICE DETAILS
                </h3>

                <div className="space-y-3 text-xs">
                  {/* Price MRP */}
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>
                      Total MRP ({totalItemsCount} {totalItemsCount === 1 ? "item" : "items"})
                    </span>
                    <span className="text-foreground font-semibold">{inr(mrpTotal)}</span>
                  </div>

                  {/* MRP Discount */}
                  <div className="flex justify-between items-center text-success font-semibold">
                    <span>Catalog Discount</span>
                    <span>- {inr(mrpDiscount)}</span>
                  </div>

                  {/* Student Coupon Discount */}
                  {voucherApplied && (
                    <div className="flex justify-between items-center text-success font-semibold">
                      <span>Student Discount (STUDENT15)</span>
                      <span>- {inr(studentCouponDiscount)}</span>
                    </div>
                  )}

                  {/* Delivery Charges */}
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Delivery Charges</span>
                    {deliveryCharges === 0 ? (
                      <span className="text-success font-bold">FREE</span>
                    ) : (
                      <span className="text-foreground font-semibold">{inr(deliveryCharges)}</span>
                    )}
                  </div>

                  {/* Prototyping & Handling */}
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Prototyping &amp; Handling</span>
                    <span className="text-success font-bold">FREE</span>
                  </div>

                  {/* Taxes GST */}
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>GST (18%)</span>
                    <span className="text-foreground font-semibold">{inr(taxes)}</span>
                  </div>
                </div>

                {/* Total Payable */}
                <div className="pt-3 border-t border-dashed border-border flex justify-between items-center text-base font-black text-foreground">
                  <span>Total Amount</span>
                  <span className="text-price text-lg font-black">{inr(finalPayable)}</span>
                </div>

                {/* Savings Banner */}
                {totalSavings > 0 && (
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-xs font-bold text-success text-center">
                    🎉 You will save {inr(totalSavings)} on this order
                  </div>
                )}
              </div>

              {/* Items in Cart Summary Accordion / Preview */}
              <div className="border-t border-border bg-muted/10 p-4 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Items in this order ({(cart.length > 0 ? cart : purchasedItems).length})
                </span>
                <div className="max-h-40 overflow-y-auto space-y-2.5 pr-1">
                  {(cart.length > 0 ? cart : purchasedItems).map((item) => (
                    <div key={item.productId} className="flex items-center gap-3 text-xs">
                      <img
                        src={productImage(item.imageKey)}
                        alt={item.name}
                        className="h-10 w-10 rounded border border-border object-cover bg-surface"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-foreground">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          Qty: {item.quantity} × {inr(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AICTE Trust Badges Card */}
            <div className="rounded-xl border border-border bg-card p-4 text-xs text-muted-foreground space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2.5 font-bold text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span>AICTE IDEA Lab Certified Makerspace</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All components are verified by laboratory instructors. Fabrication tolerances comply
                with national makerspace specifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
