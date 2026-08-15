import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { productImage } from "@/lib/product-images";
import { inr } from "@/lib/format";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Percent, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cart")({
  component: Cart,
});

function Cart() {
  const { cart, setQuantity, removeFromCart, cartSubtotal } = useStore();
  const navigate = useNavigate();

  const subtotal = cartSubtotal;
  const discount = subtotal * 0.15;
  const taxes = (subtotal - discount) * 0.18; // 18% GST typical for technology products in India
  const total = subtotal - discount + taxes;

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted/10 text-muted-foreground mb-6">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Your cart is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Looks like you haven't added any products or maker gear to your cart yet.
        </p>
        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/95 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
        Shopping Cart
      </h1>
      <p className="text-xs sm:text-sm text-muted-foreground font-semibold mt-1">
        Manage your items and proceed to fabrication checkout.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Shopping List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-surface">
                  <img
                    src={productImage(item.imageKey)}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <Link
                    to="/product/$slug"
                    params={{ slug: item.slug }}
                    className="font-bold text-sm sm:text-base text-foreground hover:text-primary transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1 capitalize">
                    Category: {item.slug.replace(/-/g, " ")}
                  </p>
                  <p className="text-sm font-bold text-price mt-2">{inr(item.price)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t border-border sm:border-t-0">
                {/* Quantity Selector */}
                <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                  <button
                    onClick={() => setQuantity(item.productId, item.quantity - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded bg-card hover:bg-muted text-foreground transition-all cursor-pointer shadow-sm disabled:opacity-50"
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-foreground">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(item.productId, item.quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded bg-card hover:bg-muted text-foreground transition-all cursor-pointer shadow-sm"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-extrabold text-sm sm:text-base text-foreground">
                    {inr(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground pb-4 border-b border-border">
              Order Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between text-xs sm:text-sm font-semibold text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground">{inr(subtotal)}</span>
              </div>

              <div className="flex justify-between text-xs sm:text-sm font-semibold text-success bg-success/5 px-3 py-2 rounded-xl border border-success/15 items-center">
                <span className="flex items-center gap-1.5 font-bold">
                  <Percent className="h-3.5 w-3.5" /> Student Discount (15% off)
                </span>
                <span className="font-extrabold">- {inr(discount)}</span>
              </div>

              <div className="flex justify-between text-xs sm:text-sm font-semibold text-muted-foreground">
                <span>Taxes (GST 18%)</span>
                <span className="text-foreground">{inr(taxes)}</span>
              </div>

              <div className="border-t border-border pt-4 flex justify-between text-base font-extrabold text-foreground">
                <span>Total Price</span>
                <span className="text-price text-lg font-black">{inr(total)}</span>
              </div>
            </div>

            <Button
              onClick={() => navigate({ to: "/checkout" })}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-extrabold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] mt-2 text-sm flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-muted/5 p-4 flex gap-3 text-xs leading-relaxed text-muted-foreground">
            <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-foreground block">Student ID Verification</span>
              Please ensure you have a valid Student ID card. It will be verified during checkout or
              pickup at the AICTE Idea Lab.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
