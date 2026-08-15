import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const { cart, clearCart, cartSubtotal } = useStore();
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentOption, setPaymentOption] = useState("upi");

  // Sub-payment option details
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  // Checkout state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");

  // Price calculations
  const subtotal = cartSubtotal;
  const discount = subtotal * 0.15; // STUDENT15 15% discount
  const shippingFee = deliveryMethod === "pickup" ? 0 : deliveryMethod === "express" ? 150 : 80;
  const taxes = (subtotal - discount) * 0.18; // 18% GST
  const total = subtotal - discount + taxes + shippingFee;

  const handleSkipCelebration = () => {
    setShowCelebration(false);
    setIsSuccess(true);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address || !pinCode) {
      toast.error("Please fill in all shipping details.");
      return;
    }
    if (paymentOption === "upi" && !upiId) {
      toast.error("Please enter your UPI ID.");
      return;
    }
    if (paymentOption === "card" && (!cardNumber || !cardExpiry || !cardCvv)) {
      toast.error("Please fill in all card details.");
      return;
    }
    if (paymentOption === "netbanking" && !selectedBank) {
      toast.error("Please select a bank.");
      return;
    }

    setIsProcessing(true);
    // Simulate payment and order generation
    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = "IDEA-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);

      // Calculate estimated delivery
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

      // Show celebration modal
      setShowCelebration(true);
      clearCart();
      toast.success("Order placed successfully!");

      // Start countdown
      let currentCountdown = 5;
      const interval = setInterval(() => {
        currentCountdown -= 1;
        setCountdown(currentCountdown);
        if (currentCountdown <= 0) {
          clearInterval(interval);
          setShowCelebration(false);
          setIsSuccess(true);
        }
      }, 1000);
    }, 2500);
  };

  // If order is completed successfully
  if (isSuccess) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-success/10 text-success mb-6">
          <CheckCircle className="h-12 w-12" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Order Confirmed!
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Thank you for your order. Your fabrication request has been queued at the AICTE Idea Lab.
        </p>
        <div className="mt-6 border border-border bg-muted/20 p-4 rounded-xl">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            Order Reference ID
          </p>
          <p className="text-lg font-black text-foreground mt-1 tracking-wider">{orderId}</p>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/95 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // If cart is empty and not completed
  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Browse Products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12">
      {/* Celebratory Modal Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          {/* Confetti Container */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 60 }).map((_, idx) => {
              const colors = ["#ffd700", "#ff4757", "#2ed573", "#1e90ff", "#ffa500", "#ff6b81"];
              const randomColor = colors[idx % colors.length];
              const randomLeft = Math.random() * 100;
              const randomDelay = Math.random() * 4;
              const randomDuration = 3 + Math.random() * 2;
              const randomScale = 0.5 + Math.random() * 1;
              return (
                <div
                  key={idx}
                  className="confetti-piece"
                  style={{
                    left: `${randomLeft}%`,
                    animationDelay: `${randomDelay}s`,
                    animationDuration: `${randomDuration}s`,
                    backgroundColor: randomColor,
                    transform: `scale(${randomScale})`,
                  }}
                />
              );
            })}
          </div>

          <style
            dangerouslySetInnerHTML={{
              __html: `
            @keyframes confetti-fall {
              0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
            .confetti-piece {
              position: absolute;
              width: 10px;
              height: 10px;
              top: -10px;
              animation: confetti-fall 4s linear infinite;
            }
            @keyframes scaleCheck {
              0% { transform: scale(0); opacity: 0; }
              50% { transform: scale(1.2); }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes drawCheck {
              0% { stroke-dashoffset: 48; }
              100% { stroke-dashoffset: 0; }
            }
            .animate-checkmark-circle {
              animation: scaleCheck 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            }
            .animate-checkmark-path {
              stroke-dasharray: 48;
              stroke-dashoffset: 48;
              animation: drawCheck 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
            }
          `,
            }}
          />

          {/* Modal Box */}
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-card p-8 shadow-2xl text-center z-10 animate-in fade-in zoom-in-95 duration-300">
            {/* Animated SVG Success Video / Micro-animation */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-success/10 text-success mb-6 animate-checkmark-circle">
              <svg
                className="h-14 w-14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  className="animate-checkmark-path"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-black tracking-tight text-foreground">
              Order Successfully Placed! 🎉
            </h2>
            <p className="mt-2 text-xs text-muted-foreground font-semibold">
              Your college innovation order is verified and scheduled.
            </p>

            {/* Details Box */}
            <div className="mt-6 border border-border bg-muted/20 p-5 rounded-2xl text-left space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-medium">Order Reference</span>
                <span className="font-extrabold text-foreground">{orderId}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-medium">Payment Status</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-success bg-success/10 border border-success/15 px-2 py-0.5 rounded-full text-[10px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  Confirmed
                </span>
              </div>
              <div className="flex justify-between items-start text-xs pt-1 border-t border-border/60">
                <span className="text-muted-foreground font-medium mt-0.5">Estimated Delivery</span>
                <span className="font-bold text-foreground text-right max-w-[200px] leading-tight">
                  {estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Countdown / CTA */}
            <div className="mt-8 space-y-3">
              <Button
                onClick={handleSkipCelebration}
                className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-extrabold py-3.5 rounded-xl transition-all shadow-md text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                View Order Details <ArrowRight className="h-3.5 w-3.5" />
              </Button>
              <p className="text-[10px] text-muted-foreground font-semibold">
                Redirecting automatically in{" "}
                <span className="text-foreground font-bold">{countdown}</span> seconds...
              </p>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
        Secure Checkout
      </h1>
      <p className="text-xs sm:text-sm text-muted-foreground font-semibold mt-1">
        Provide fabrication delivery preferences and verify payment.
      </p>

      <form onSubmit={handleCompleteOrder} className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Left Column (Shipping & Payment) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2 border-b border-border pb-3">
              <MapPin className="h-4.5 w-4.5 text-primary" /> Shipping Address
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4.5 py-3 text-sm font-medium placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4.5 py-3 text-sm font-medium placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Delivery Address
              </label>
              <input
                type="text"
                required
                placeholder="Flat / House no, Building, Street address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4.5 py-3 text-sm font-medium placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
              />
            </div>
            <div className="space-y-1.5 max-w-xs">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                PIN Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="6-digit PIN code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ""))}
                className="w-full rounded-xl border border-border bg-background px-4.5 py-3 text-sm font-medium placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Delivery Method */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2 border-b border-border pb-3">
              <Truck className="h-4.5 w-4.5 text-primary" /> Delivery Method
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <label
                className={`border rounded-xl p-4 flex flex-col justify-between gap-3 cursor-pointer select-none transition-all ${
                  deliveryMethod === "standard"
                    ? "border-primary bg-primary/[2%]"
                    : "border-border hover:bg-muted/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Standard Delivery</span>
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === "standard"}
                    onChange={() => setDeliveryMethod("standard")}
                    className="accent-primary"
                  />
                </div>
                <div className="leading-tight">
                  <span className="block text-[10px] text-muted-foreground font-semibold">
                    Takes 3-5 days
                  </span>
                  <span className="block text-sm font-extrabold text-price mt-1">₹80.00</span>
                </div>
              </label>

              <label
                className={`border rounded-xl p-4 flex flex-col justify-between gap-3 cursor-pointer select-none transition-all ${
                  deliveryMethod === "express"
                    ? "border-primary bg-primary/[2%]"
                    : "border-border hover:bg-muted/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Express Shipping</span>
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === "express"}
                    onChange={() => setDeliveryMethod("express")}
                    className="accent-primary"
                  />
                </div>
                <div className="leading-tight">
                  <span className="block text-[10px] text-muted-foreground font-semibold">
                    Takes 1-2 days
                  </span>
                  <span className="block text-sm font-extrabold text-price mt-1">₹150.00</span>
                </div>
              </label>

              <label
                className={`border rounded-xl p-4 flex flex-col justify-between gap-3 cursor-pointer select-none transition-all ${
                  deliveryMethod === "pickup"
                    ? "border-primary bg-primary/[2%]"
                    : "border-border hover:bg-muted/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Lab Pickup</span>
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === "pickup"}
                    onChange={() => setDeliveryMethod("pickup")}
                    className="accent-primary"
                  />
                </div>
                <div className="leading-tight">
                  <span className="block text-[10px] text-muted-foreground font-semibold">
                    Pickup at AICTE Lab
                  </span>
                  <span className="block text-sm font-extrabold text-success mt-1">FREE</span>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Options */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2 border-b border-border pb-3">
              <CreditCard className="h-4.5 w-4.5 text-primary" /> Payment Option
            </h2>
            <div className="space-y-3">
              {/* UPI */}
              <div
                className={`border rounded-xl p-4 transition-all ${
                  paymentOption === "upi" ? "border-primary bg-primary/[1%]" : "border-border"
                }`}
              >
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentOption === "upi"}
                    onChange={() => setPaymentOption("upi")}
                    className="accent-primary"
                  />
                  <Smartphone className="h-4.5 w-4.5 text-muted-foreground" />
                  <span className="text-xs font-bold text-foreground">
                    UPI (GPay / PhonePe / Paytm)
                  </span>
                </label>
                {paymentOption === "upi" && (
                  <div className="mt-4 pl-7 max-w-xs space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="username@okaxis"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-medium placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Card */}
              <div
                className={`border rounded-xl p-4 transition-all ${
                  paymentOption === "card" ? "border-primary bg-primary/[1%]" : "border-border"
                }`}
              >
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentOption === "card"}
                    onChange={() => setPaymentOption("card")}
                    className="accent-primary"
                  />
                  <CreditCard className="h-4.5 w-4.5 text-muted-foreground" />
                  <span className="text-xs font-bold text-foreground">Credit / Debit Card</span>
                </label>
                {paymentOption === "card" && (
                  <div className="mt-4 pl-7 max-w-md space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
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
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-medium placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div className="grid gap-3 grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
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
                          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-medium placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          CVV
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          placeholder="XXX"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-medium placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Netbanking */}
              <div
                className={`border rounded-xl p-4 transition-all ${
                  paymentOption === "netbanking"
                    ? "border-primary bg-primary/[1%]"
                    : "border-border"
                }`}
              >
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentOption === "netbanking"}
                    onChange={() => setPaymentOption("netbanking")}
                    className="accent-primary"
                  />
                  <Building className="h-4.5 w-4.5 text-muted-foreground" />
                  <span className="text-xs font-bold text-foreground">Net Banking</span>
                </label>
                {paymentOption === "netbanking" && (
                  <div className="mt-4 pl-7 max-w-xs space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Select Bank
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none cursor-pointer"
                    >
                      <option value="">Choose bank...</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Order Summary Summary) */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground pb-4 border-b border-border">
              Items Summary
            </h3>

            {/* Items display */}
            <div className="max-h-60 overflow-y-auto space-y-3.5 pr-2">
              {cart.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                    <img
                      src={productImage(item.imageKey)}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-foreground line-clamp-2 leading-snug">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">
                      Qty: {item.quantity} × {inr(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground">{inr(subtotal)}</span>
              </div>

              <div className="flex justify-between text-xs font-semibold text-success items-center">
                <span className="flex items-center gap-1">Order Coupon (STUDENT15)</span>
                <span className="font-bold">- {inr(discount)}</span>
              </div>

              <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                <span>GST Tax (18%)</span>
                <span className="text-foreground">{inr(taxes)}</span>
              </div>

              <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                <span>Shipping &amp; Handling</span>
                <span className="text-foreground">
                  {shippingFee === 0 ? "FREE" : inr(shippingFee)}
                </span>
              </div>

              <div className="border-t border-border pt-4 flex justify-between text-base font-extrabold text-foreground">
                <span>Total Amount</span>
                <span className="text-price text-lg font-black">{inr(total)}</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-extrabold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] text-sm flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                  Processing payment...
                </>
              ) : (
                <>
                  Complete Order <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-muted/5 p-4 flex gap-3 text-xs leading-relaxed text-muted-foreground">
            <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-foreground block">AICTE Idea Lab Guarantee</span>
              All orders are executed locally using industry-grade tools. You can track construction
              metrics on your profile.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
