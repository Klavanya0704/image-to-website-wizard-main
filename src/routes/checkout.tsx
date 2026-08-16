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
  Plus,
  Trash2,
  User,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

type PaymentMethodKey = "recommended" | "upi" | "card" | "cod" | "giftcard" | "netbanking" | "emi";

interface SavedAddress {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  type: "HOME" | "LAB" | "WORK";
  isDefault?: boolean;
}

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
      "#10B981",
      "#34D399",
      "#F59E0B",
      "#EF4444",
      "#3B82F6",
      "#8B5CF6",
      "#EC4899",
      "#FBBF24",
      "#0A3728",
    ];

    const particles: Particle[] = [];

    const spawnCannonLeft = () => {
      for (let i = 0; i < 70; i++) {
        const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.8;
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

    const spawnCannonRight = () => {
      for (let i = 0; i < 70; i++) {
        const angle = (-3 * Math.PI) / 4 + (Math.random() - 0.5) * 0.8;
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

const INITIAL_SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: "addr-1",
    name: "Alex Johnson",
    phone: "+91 98765 43210",
    address: "Room 304, Innovation Block, AICTE IDEA Lab Campus, Outer Ring Rd",
    city: "Bengaluru",
    state: "Karnataka",
    pinCode: "560001",
    type: "LAB",
    isDefault: true,
  },
  {
    id: "addr-2",
    name: "Alex Johnson",
    phone: "+91 98765 43210",
    address: "Flat 4B, Silicon Heights, 12th Cross, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pinCode: "560038",
    type: "HOME",
  },
];

function Checkout() {
  const { cart, clearCart, cartSubtotal, setQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();

  // Accordion Step State: 1 = Login, 2 = Delivery Address, 3 = Order Summary, 4 = Payment Options
  // Land the user directly on Step 2 (Delivery Address)
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(2);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<1 | 2 | 3 | 4>(2);

  // Saved Addresses State
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(INITIAL_SAVED_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("addr-1");
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  // New Address Form State
  const [newFullName, setNewFullName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPinCode, setNewPinCode] = useState("");
  const [newAddressLine, setNewAddressLine] = useState("");
  const [newCity, setNewCity] = useState("Bengaluru");
  const [newState, setNewState] = useState("Karnataka");
  const [newAddressType, setNewAddressType] = useState<"HOME" | "LAB" | "WORK">("LAB");

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
  const [generatedCaptcha, setGeneratedCaptcha] = useState("7492");

  // Processing & Celebration States
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [copiedId, setCopiedId] = useState(false);

  // Snapshot of cart items for celebration modal & calculation after cart clear
  const [purchasedItems, setPurchasedItems] = useState(cart);

  useEffect(() => {
    if (cart.length > 0) {
      setPurchasedItems(cart);
    }
  }, [cart]);

  // Selected address helper
  const selectedAddress =
    savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses[0];

  // Price calculations
  const currentItems = cart.length > 0 ? cart : purchasedItems;
  const totalItemsCount = currentItems.reduce((sum, item) => sum + item.quantity, 0);
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

  // Step 2 Action: "DELIVER HERE"
  const handleDeliverHere = () => {
    if (!selectedAddress) {
      toast.error("Please select or add a delivery address.");
      return;
    }
    toast.success(`Address selected: ${selectedAddress.name} (${selectedAddress.type})`);
    setActiveStep(3);
    if (maxUnlockedStep < 3) {
      setMaxUnlockedStep(3);
    }
  };

  // Handle Save New Address
  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim() || !newPhone.trim() || !newAddressLine.trim() || !newPinCode.trim()) {
      toast.error("Please fill in all required address fields.");
      return;
    }
    const newId = "addr-" + Date.now();
    const newAddr: SavedAddress = {
      id: newId,
      name: newFullName.trim(),
      phone: newPhone.trim(),
      address: newAddressLine.trim(),
      city: newCity.trim(),
      state: newState.trim(),
      pinCode: newPinCode.trim(),
      type: newAddressType,
    };
    setSavedAddresses([...savedAddresses, newAddr]);
    setSelectedAddressId(newId);
    setIsAddingNewAddress(false);
    toast.success("New address added and selected!");
  };

  // Step 3 Action: "CONTINUE TO PAYMENT"
  const handleConfirmOrderSummary = () => {
    if (currentItems.length === 0) {
      toast.error("Your cart is empty. Add items to proceed.");
      return;
    }
    toast.success("Order items confirmed!");
    setActiveStep(4);
    if (maxUnlockedStep < 4) {
      setMaxUnlockedStep(4);
    }
  };

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

      playVictorySound();
      setShowCelebration(true);
      clearCart();
      toast.success("Order Placed Successfully!");

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

          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 dark:border-white/10 bg-card/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl text-center z-20 animate-in zoom-in-95 duration-300">
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

            <div className="mt-5 border border-border/80 bg-muted/30 dark:bg-muted/10 p-4 sm:p-5 rounded-2xl text-left space-y-3 text-xs shadow-inner">
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

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-semibold">Payment Status</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-success bg-success/10 border border-success/20 px-2.5 py-0.5 rounded-full text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  Payment Confirmed (
                  {activePaymentMethod === "cod" ? "COD" : activePaymentMethod.toUpperCase()})
                </span>
              </div>

              <div className="flex justify-between items-start pt-1 border-t border-border/60">
                <span className="text-muted-foreground font-semibold mt-0.5">
                  Estimated Delivery
                </span>
                <span className="font-bold text-foreground text-right max-w-[220px] leading-tight">
                  {estimatedDelivery}
                </span>
              </div>

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

            <div className="mt-6 space-y-3">
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

      {/* Top Stepper Navigation Bar (Interactive Step Header) */}
      <div className="border-b border-border bg-card py-3.5 shadow-sm sticky top-0 z-30">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6">
          <div className="flex items-center justify-between text-xs font-semibold">
            {/* Step 1 Chip */}
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className={`flex items-center gap-2 transition-all cursor-pointer ${
                activeStep === 1
                  ? "text-primary font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  activeStep > 1
                    ? "bg-success text-white"
                    : activeStep === 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {activeStep > 1 ? "✓" : "1"}
              </span>
              <span className="hidden sm:inline">1. LOGIN / ACCOUNT</span>
              <span className="sm:hidden">1. LOGIN</span>
            </button>

            <div className="h-0.5 w-6 sm:w-12 bg-border" />

            {/* Step 2 Chip */}
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className={`flex items-center gap-2 transition-all cursor-pointer ${
                activeStep === 2
                  ? "text-primary font-bold"
                  : activeStep > 2
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  activeStep > 2
                    ? "bg-success text-white"
                    : activeStep === 2
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {activeStep > 2 ? "✓" : "2"}
              </span>
              <span className="hidden sm:inline">2. DELIVERY ADDRESS</span>
              <span className="sm:hidden">2. ADDRESS</span>
            </button>

            <div className="h-0.5 w-6 sm:w-12 bg-border" />

            {/* Step 3 Chip */}
            <button
              type="button"
              disabled={maxUnlockedStep < 3}
              onClick={() => maxUnlockedStep >= 3 && setActiveStep(3)}
              className={`flex items-center gap-2 transition-all ${
                maxUnlockedStep < 3
                  ? "opacity-50 cursor-not-allowed text-muted-foreground"
                  : "cursor-pointer hover:text-foreground"
              } ${activeStep === 3 ? "text-primary font-bold" : ""}`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  activeStep > 3
                    ? "bg-success text-white"
                    : activeStep === 3
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {activeStep > 3 ? "✓" : "3"}
              </span>
              <span className="hidden sm:inline">3. ORDER SUMMARY</span>
              <span className="sm:hidden">3. SUMMARY</span>
            </button>

            <div className="h-0.5 w-6 sm:w-12 bg-border" />

            {/* Step 4 Chip */}
            <button
              type="button"
              disabled={maxUnlockedStep < 4}
              onClick={() => maxUnlockedStep >= 4 && setActiveStep(4)}
              className={`flex items-center gap-2 transition-all ${
                maxUnlockedStep < 4
                  ? "opacity-50 cursor-not-allowed text-muted-foreground"
                  : "cursor-pointer hover:text-foreground"
              } ${activeStep === 4 ? "text-primary font-bold" : ""}`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  activeStep === 4
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                4
              </span>
              <span className="hidden sm:inline">4. PAYMENT OPTIONS</span>
              <span className="sm:hidden">4. PAYMENT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Accordion Layout */}
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 pt-6">
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* Left Main Accordion Column (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            {/* STEP 1 ACCORDION: LOGIN / ACCOUNT */}
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden transition-all">
              {/* Header */}
              <div
                className={`px-5 py-3.5 flex items-center justify-between transition-colors ${
                  activeStep === 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/20 text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-black ${
                      activeStep === 1 ? "bg-white text-primary" : "bg-success text-white"
                    }`}
                  >
                    {activeStep === 1 ? "1" : "✓"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider">
                      1. LOGIN / ACCOUNT
                    </span>
                    {activeStep !== 1 && (
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        — Alex Johnson (+91 98765 43210)
                      </span>
                    )}
                  </div>
                </div>

                {activeStep !== 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="rounded-lg border border-border bg-card px-3 py-1 text-xs font-bold text-primary hover:bg-primary/5 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Edit3 className="h-3 w-3" /> Change
                  </button>
                ) : (
                  <span className="text-[11px] font-semibold opacity-90 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> AICTE Verified Student
                  </span>
                )}
              </div>

              {/* Step 1 Expanded Content */}
              {activeStep === 1 && (
                <div className="p-5 sm:p-6 space-y-4 bg-card animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          Alex Johnson{" "}
                          <span className="text-xs font-normal text-muted-foreground">
                            (+91 98765 43210)
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          student.alex@innovation.edu • AICTE Maker ID: #IDEA-2026-BLR
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-success/15 text-success text-[10px] font-extrabold">
                      LOGGED IN
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-muted-foreground">
                      Order notifications and receipts will be sent to your registered college
                      email.
                    </p>
                    <Button
                      onClick={() => setActiveStep(2)}
                      className="bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer"
                    >
                      CONTINUE TO DELIVERY ADDRESS <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2 ACCORDION: DELIVERY ADDRESS */}
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden transition-all">
              {/* Header */}
              <div
                className={`px-5 py-3.5 flex items-center justify-between transition-colors ${
                  activeStep === 2
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/20 text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-black ${
                      activeStep === 2
                        ? "bg-white text-primary"
                        : activeStep > 2
                          ? "bg-success text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {activeStep > 2 ? "✓" : "2"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider">
                      2. DELIVERY ADDRESS
                    </span>
                    {activeStep !== 2 && selectedAddress && (
                      <span className="text-xs text-muted-foreground hidden md:inline truncate max-w-sm">
                        — {selectedAddress.name}, {selectedAddress.pinCode} ({selectedAddress.type})
                      </span>
                    )}
                  </div>
                </div>

                {activeStep !== 2 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="rounded-lg border border-border bg-card px-3 py-1 text-xs font-bold text-primary hover:bg-primary/5 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Edit3 className="h-3 w-3" /> Change
                  </button>
                ) : (
                  <span className="text-[11px] font-semibold opacity-90 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> Select or Add Address
                  </span>
                )}
              </div>

              {/* Step 2 Expanded Content */}
              {activeStep === 2 && (
                <div className="p-5 sm:p-6 space-y-5 bg-card animate-in fade-in duration-200">
                  {/* Saved Addresses List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Saved Delivery Locations
                      </h3>
                      {!isAddingNewAddress && (
                        <button
                          type="button"
                          onClick={() => setIsAddingNewAddress(true)}
                          className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add a new address
                        </button>
                      )}
                    </div>

                    {savedAddresses.map((addr) => {
                      const isSelected = selectedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedAddressId(addr.id)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "border-primary bg-primary/[3%] shadow-sm"
                              : "border-border hover:bg-muted/20"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <input
                                type="radio"
                                name="delivery-address"
                                checked={isSelected}
                                onChange={() => setSelectedAddressId(addr.id)}
                                className="accent-primary h-4 w-4 mt-0.5 cursor-pointer"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-foreground">
                                    {addr.name}
                                  </span>
                                  <span className="rounded bg-primary/10 px-2 py-0.2 text-[10px] font-bold text-primary">
                                    {addr.type}
                                  </span>
                                  <span className="text-xs text-muted-foreground font-semibold">
                                    {addr.phone}
                                  </span>
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                  {addr.address}, {addr.city}, {addr.state} —{" "}
                                  <span className="font-bold text-foreground">{addr.pinCode}</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Deliver Here Action inside the selected address box */}
                          {isSelected && !isAddingNewAddress && (
                            <div className="mt-4 pt-3 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                              {/* Delivery Speed Selector Chips */}
                              <div className="flex flex-wrap items-center gap-1.5 text-xs w-full sm:w-auto">
                                <span className="text-[10px] font-bold text-muted-foreground mr-1">
                                  Speed:
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeliveryMethod("standard");
                                  }}
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                                    deliveryMethod === "standard"
                                      ? "border-primary bg-primary/10 text-primary"
                                      : "border-border text-muted-foreground hover:bg-muted"
                                  }`}
                                >
                                  Standard (3-4 Days) • ₹80
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeliveryMethod("express");
                                  }}
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                                    deliveryMethod === "express"
                                      ? "border-primary bg-primary/10 text-primary"
                                      : "border-border text-muted-foreground hover:bg-muted"
                                  }`}
                                >
                                  Express (1-2 Days) • ₹150
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeliveryMethod("pickup");
                                  }}
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                                    deliveryMethod === "pickup"
                                      ? "border-primary bg-primary/10 text-primary"
                                      : "border-border text-muted-foreground hover:bg-muted"
                                  }`}
                                >
                                  Lab Pickup • FREE
                                </button>
                              </div>

                              <Button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeliverHere();
                                }}
                                className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs px-6 py-2.5 rounded-xl shadow cursor-pointer uppercase tracking-wider"
                              >
                                DELIVER HERE <ArrowRight className="h-3.5 w-3.5 ml-1" />
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Add New Address Form Modal / Box */}
                  {isAddingNewAddress ? (
                    <form
                      onSubmit={handleSaveNewAddress}
                      className="p-5 rounded-2xl border border-primary/30 bg-muted/20 space-y-4 animate-in fade-in duration-200"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-border">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                          <Plus className="h-4 w-4 text-primary" /> ADD NEW DELIVERY ADDRESS
                        </h4>
                        <button
                          type="button"
                          onClick={() => setIsAddingNewAddress(false)}
                          className="text-xs text-muted-foreground hover:text-foreground font-semibold"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alex Johnson"
                            value={newFullName}
                            onChange={(e) => setNewFullName(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            10-digit Mobile Phone *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 9876543210"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            PIN Code *
                          </label>
                          <input
                            type="text"
                            maxLength={6}
                            required
                            placeholder="6-digit PIN code"
                            value={newPinCode}
                            onChange={(e) => setNewPinCode(e.target.value.replace(/\D/g, ""))}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            City / District *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Bengaluru"
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Flat, House no., Building, Company, Apartment, Lab Room *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Lab 201, Mechanical Block, Innovation Campus"
                            value={newAddressLine}
                            onChange={(e) => setNewAddressLine(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            State *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Karnataka"
                            value={newState}
                            onChange={(e) => setNewState(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Address Type
                          </label>
                          <div className="flex gap-2 pt-1">
                            {(["LAB", "HOME", "WORK"] as const).map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setNewAddressType(type)}
                                className={`px-3 py-1 rounded-md text-[11px] font-bold border transition-all ${
                                  newAddressType === type
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-background text-muted-foreground"
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          type="submit"
                          className="bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-bold px-6 py-2 rounded-xl cursor-pointer"
                        >
                          SAVE AND DELIVER HERE
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsAddingNewAddress(false)}
                          className="text-xs font-semibold px-4 rounded-xl cursor-pointer"
                        >
                          CANCEL
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(true)}
                      className="w-full p-3.5 rounded-xl border border-dashed border-border bg-card hover:bg-muted/20 text-primary text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" /> ADD A NEW ADDRESS
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* STEP 3 ACCORDION: ORDER SUMMARY */}
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden transition-all">
              {/* Header */}
              <div
                className={`px-5 py-3.5 flex items-center justify-between transition-colors ${
                  activeStep === 3
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/20 text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-black ${
                      activeStep === 3
                        ? "bg-white text-primary"
                        : activeStep > 3
                          ? "bg-success text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {activeStep > 3 ? "✓" : "3"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider">
                      3. ORDER SUMMARY
                    </span>
                    {activeStep !== 3 && maxUnlockedStep >= 3 && (
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        — {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"} (
                        {inr(finalPayable)})
                      </span>
                    )}
                  </div>
                </div>

                {activeStep !== 3 && maxUnlockedStep >= 3 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="rounded-lg border border-border bg-card px-3 py-1 text-xs font-bold text-primary hover:bg-primary/5 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Edit3 className="h-3 w-3" /> Change
                  </button>
                ) : activeStep === 3 ? (
                  <span className="text-[11px] font-semibold opacity-90 flex items-center gap-1">
                    <ShoppingBag className="h-3.5 w-3.5" /> Review Items
                  </span>
                ) : null}
              </div>

              {/* Step 3 Expanded Content */}
              {activeStep === 3 && (
                <div className="p-5 sm:p-6 space-y-5 bg-card animate-in fade-in duration-200">
                  <div className="space-y-3 divide-y divide-border/60">
                    {currentItems.map((item) => (
                      <div
                        key={item.productId}
                        className="pt-3 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={productImage(item.imageKey)}
                            alt={item.name}
                            className="h-16 w-16 shrink-0 rounded-xl border border-border object-cover bg-surface"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-foreground truncate max-w-sm">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              Lab Certified • Instant Makerspace Fulfillment
                            </p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-xs font-black text-price">
                                {inr(item.price)}
                              </span>
                              <span className="text-[10px] text-muted-foreground line-through">
                                {inr(Math.round(item.price * 1.25))}
                              </span>
                              <span className="text-[10px] font-bold text-success">20% OFF</span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex items-center gap-4 self-end sm:self-center">
                          <div className="flex items-center border border-border rounded-lg bg-background">
                            <button
                              type="button"
                              onClick={() => setQuantity(item.productId, item.quantity - 1)}
                              className="px-2.5 py-1 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity(item.productId, item.quantity + 1)}
                              className="px-2.5 py-1 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.productId)}
                            className="text-xs font-bold text-destructive hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Notice & Confirm Button */}
                  <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/10 p-4 rounded-xl">
                    <p className="text-xs text-muted-foreground">
                      Order confirmation and fabrication log will be sent to{" "}
                      <span className="font-bold text-foreground">student.alex@innovation.edu</span>
                    </p>

                    <Button
                      onClick={handleConfirmOrderSummary}
                      className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs px-6 py-3 rounded-xl shadow cursor-pointer uppercase tracking-wider"
                    >
                      CONTINUE TO PAYMENT <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 4 ACCORDION: PAYMENT OPTIONS (Flipkart Multi-Tab Two-Panel) */}
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden transition-all">
              {/* Header */}
              <div
                className={`px-5 py-3.5 flex items-center justify-between transition-colors ${
                  activeStep === 4
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/20 text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-black ${
                      activeStep === 4 ? "bg-white text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    4
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider">
                      4. PAYMENT OPTIONS
                    </span>
                    {activeStep !== 4 && maxUnlockedStep >= 4 && (
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        — Ready for checkout
                      </span>
                    )}
                  </div>
                </div>

                {activeStep === 4 && (
                  <span className="text-[11px] font-semibold opacity-90 flex items-center gap-1">
                    <Lock className="h-3.5 w-3.5" /> 256-Bit SSL Encrypted
                  </span>
                )}
              </div>

              {/* Step 4 Expanded Content */}
              {activeStep === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] animate-in fade-in duration-200">
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
                          <div className="text-xs font-bold text-foreground">
                            Gift Card / Voucher
                          </div>
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

                  {/* Right Detail Area for Selected Payment Option (7 cols) */}
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
                          <span>
                            Your card information is encrypted according to RBI guidelines.
                          </span>
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
                            Pay in cash or through UPI QR when your order arrives or at the AICTE
                            Lab pickup desk.
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
              )}
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
                  Items in this order ({currentItems.length})
                </span>
                <div className="max-h-40 overflow-y-auto space-y-2.5 pr-1">
                  {currentItems.map((item) => (
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
