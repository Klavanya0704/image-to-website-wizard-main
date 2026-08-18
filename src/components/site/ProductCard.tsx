import { Link, useNavigate } from "@tanstack/react-router";
import { Star, Zap } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { productImage } from "@/lib/product-images";
import { discountPercent, effectivePrice, inr } from "@/lib/format";
import { formatProductSlug } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product; onQuickView?: (p: Product) => void }) {
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const off = discountPercent(product);
  const safeSlug = formatProductSlug(product);
  const finalPrice = effectivePrice(product);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      imageKey: product.image_key,
      price: finalPrice,
    });
    navigate({ to: "/cart" });
  };

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card p-3.5 shadow-2xs hover:shadow-md transition-all duration-300">
      {/* Clickable Image Stage with Discount Badge */}
      <Link
        to="/product/$slug"
        params={{ slug: safeSlug }}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 cursor-pointer"
      >
        <img
          src={productImage(product?.image_key || product?.slug, product?.name)}
          alt={product?.name || "Product"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Compact Royal Blue Discount Badge */}
        {off > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-[#1455D9] px-2.5 py-0.5 text-[10px] font-black tracking-wider uppercase text-white shadow-2xs">
            {off}% OFF
          </span>
        )}
      </Link>

      {/* Card Content Details */}
      <div className="flex flex-1 flex-col pt-3 justify-between">
        <div>
          {/* Small Category Label */}
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
            {product.category || "3D PRINTING"}
          </span>

          {/* Product Title */}
          <Link
            to="/product/$slug"
            params={{ slug: safeSlug }}
            className="text-[14px] font-bold text-[#0B1736] dark:text-white line-clamp-2 leading-snug min-h-[38px] group-hover:text-[#1455D9] transition-colors flex items-start"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Star Rating with Count */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 my-1.5">
            <div className="flex items-center text-[#F59E0B]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating || 5)
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "text-slate-300 dark:text-slate-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
              ({product.review_count || 38})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-base font-extrabold text-[#0B1736] dark:text-white tracking-tight">
              {inr(finalPrice)}
            </span>
            {product.price > finalPrice && (
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 line-through">
                {inr(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* ⚡ Buy Now Full-Width Pill Button */}
        <Button
          onClick={handleBuyNow}
          className="mt-3 w-full rounded-full bg-[#1455D9] hover:bg-[#0F44B2] text-white font-bold text-xs py-2 shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
        >
          <Zap className="h-3.5 w-3.5 fill-current" /> Buy Now
        </Button>
      </div>
    </article>
  );
}
