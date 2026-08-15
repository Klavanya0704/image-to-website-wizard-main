import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Stars } from "@/components/site/Stars";
import { productImage } from "@/lib/product-images";
import { discountPercent, effectivePrice, inr, num } from "@/lib/format";
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
  const wished = isWishlisted(product.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden bg-surface"
      >
        <img
          src={productImage(product.image_key)}
          alt={product.name}
          loading="lazy"
          width={600}
          height={600}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {off > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
            {off}% OFF
          </span>
        )}
        {product.bestseller && (
          <span className="absolute left-3 top-11 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-gold-foreground">
            Bestseller
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute inset-x-0 bottom-0 bg-topbar/85 py-1.5 text-center text-xs font-semibold text-topbar-foreground">
            Out of stock
          </span>
        )}
      </Link>

      <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => {
            const added = toggleWishlist(product.id);
            toast[added ? "success" : "message"](
              added ? "Added to wishlist" : "Removed from wishlist",
            );
          }}
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card shadow-[var(--shadow-card)] transition-colors hover:text-primary ${
            wished ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-primary" : ""}`} />
        </button>
        {onQuickView && (
          <button
            type="button"
            aria-label="Quick view"
            onClick={() => onQuickView(product)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-[var(--shadow-card)] transition-colors hover:text-primary"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {product.category_slug.replace(/-/g, " ")}
        </p>
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 text-sm font-semibold leading-snug hover:text-primary"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-1.5">
          <Stars rating={num(product.rating)} />
          <span className="text-xs text-muted-foreground">({product.review_count})</span>
        </div>
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-base font-bold text-price">{inr(effectivePrice(product))}</span>
          {off > 0 && (
            <span className="text-xs text-muted-foreground line-through">{inr(product.price)}</span>
          )}
        </div>
        <Button
          size="sm"
          className="mt-2 w-full"
          disabled={product.stock === 0}
          onClick={() => {
            addToCart({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              imageKey: product.image_key,
              price: effectivePrice(product),
            });
            navigate({ to: "/checkout" });
          }}
        >
          <ShoppingCart className="mr-1.5 h-4 w-4" /> Buy Now
        </Button>
      </div>
    </article>
  );
}
