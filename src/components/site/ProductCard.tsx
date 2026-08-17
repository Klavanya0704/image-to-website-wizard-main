import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Zap, Eye } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Stars } from "@/components/site/Stars";
import { productImage } from "@/lib/product-images";
import { discountPercent, effectivePrice, inr, num } from "@/lib/format";
import { formatProductSlug } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/catalog";

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (p: Product) => void;
}) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const off = discountPercent(product);
  const wished = isWishlisted(product?.id || "");
  const safeSlug = formatProductSlug(product);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(20,85,217,0.12)]">
      {/* Clickable Image Stage */}
      <Link
        to="/product/$slug"
        params={{ slug: safeSlug }}
        className="relative block aspect-square w-full overflow-hidden bg-surface cursor-pointer"
      >
        <img
          src={productImage(product?.image_key)}
          alt={product?.name || "Product"}
          loading="lazy"
          width={600}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Hover "View Details" Overlay Badge */}
        <div className="absolute inset-0 bg-[#0B1736]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="rounded-full bg-white/95 dark:bg-card/95 backdrop-blur-xs px-3.5 py-1.5 text-xs font-black text-[#1455D9] shadow-md uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5" /> View Details
          </span>
        </div>

        {off > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-[#E52320] px-2.5 py-1 text-[11px] font-black text-white shadow-sm tracking-wider uppercase">
            {off}% OFF
          </span>
        )}
        {product?.bestseller && (
          <span className="absolute left-3 top-11 rounded-full bg-[#F5B000] px-2.5 py-1 text-[11px] font-black text-slate-950 shadow-sm tracking-wider uppercase">
            Bestseller
          </span>
        )}
        {product?.stock === 0 && (
          <span className="absolute inset-x-0 bottom-0 bg-topbar/85 py-1.5 text-center text-xs font-semibold text-topbar-foreground">
            Out of stock
          </span>
        )}
      </Link>

      {/* Floating Action Buttons (Wishlist / Quick View) */}
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!product?.id) return;
            const added = toggleWishlist(product.id);
            toast[added ? "success" : "message"](
              added ? "Added to wishlist" : "Removed from wishlist",
            );
          }}
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card shadow-[var(--shadow-card)] transition-transform hover:scale-110 active:scale-95 hover:text-primary cursor-pointer ${
            wished ? "text-primary border-primary" : "text-muted-foreground"
          }`}
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-primary" : ""}`} />
        </button>
        {onQuickView && (
          <button
            type="button"
            aria-label="Quick view"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-[var(--shadow-card)] transition-transform hover:scale-110 active:scale-95 hover:text-primary cursor-pointer"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Card Body Information */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {(product?.category_slug || "lab-gear").replace(/-/g, " ")}
        </p>
        <Link
          to="/product/$slug"
          params={{ slug: safeSlug }}
          className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-[#1455D9] transition-colors"
        >
          {product?.name || "Innovation Product"}
        </Link>
        <div className="flex items-center gap-1.5">
          <Stars rating={num(product?.rating || 5)} />
          <span className="text-xs text-muted-foreground">({product?.review_count || 0})</span>
        </div>
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-base font-bold text-price">{inr(effectivePrice(product))}</span>
          {off > 0 && (
            <span className="text-xs text-muted-foreground line-through">{inr(product.price)}</span>
          )}
        </div>

        {/* Isolated Direct Buy Now Action Button */}
        <Button
          size="sm"
          className="mt-2 w-full bg-[#1455D9] hover:bg-[#0F44B2] text-white font-bold transition-all shadow-xs active:scale-95 cursor-pointer rounded-xl flex items-center justify-center gap-1.5"
          disabled={product?.stock === 0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart({
              productId: product.id,
              slug: safeSlug,
              name: product.name,
              imageKey: product.image_key,
              price: effectivePrice(product),
            });
            navigate({ to: "/checkout" });
          }}
        >
          <Zap className="h-4 w-4 fill-white text-white" /> Buy Now
        </Button>
      </div>
    </article>
  );
}
