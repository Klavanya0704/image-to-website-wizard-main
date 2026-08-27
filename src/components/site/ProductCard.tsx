import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Star, Zap, Heart, Check } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { productImage } from "@/lib/product-images";
import { discountPercent, effectivePrice, inr } from "@/lib/format";
import { formatProductSlug } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/catalog";

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (p: Product) => void;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const off = discountPercent(product);
  const safeSlug = formatProductSlug(product);
  const finalPrice = effectivePrice(product);
  const wished = isWishlisted(product.id);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      imageKey: product.image_key,
      price: finalPrice,
    });
    setTimeout(() => {
      navigate({ to: "/cart" });
    }, 150);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.32,
        delay: Math.min((index % 6) * 0.04, 0.24),
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-card p-3.5 shadow-xs hover:shadow-xl hover:border-blue-300/80 dark:hover:border-blue-600/50 transition-all duration-300 transform-gpu"
    >
      {/* Clickable Image Stage with Discount Badge & Wishlist Button */}
      <Link
        to="/product/$slug"
        params={{ slug: safeSlug }}
        className="relative block h-56 w-full overflow-hidden rounded-xl bg-slate-100/80 dark:bg-slate-900/80 cursor-pointer isolate transform-gpu"
      >
        <motion.img
          src={
            product.image ||
            productImage(
              product?.image_key || product?.slug,
              product?.title || product?.name
            )
          }
          alt={product.title || product.name || "Product"}
          loading="lazy"
          animate={{ scale: isHovered ? 1.04 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-56 w-full object-cover rounded-xl"
        />

        {/* Ambient subtle image gradient on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none z-10">
          {/* Animated Royal Blue Discount Badge */}
          {off > 0 ? (
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-full bg-[#1455D9] px-2.5 py-0.5 text-[11px] font-black tracking-wider uppercase text-white shadow-sm border border-blue-400/30"
            >
              {off}% OFF
            </motion.span>
          ) : (
            <div />
          )}

          {/* Quick Wishlist Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleToggleWishlist}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className={`pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md shadow-sm transition-all duration-200 ${
              wished
                ? "bg-red-50 text-red-500 border border-red-200 dark:bg-red-950/80 dark:border-red-800"
                : "bg-white/90 text-slate-400 hover:text-red-500 border border-slate-200/80 dark:bg-slate-900/90 dark:border-slate-700"
            }`}
          >
            <Heart
              className={`h-4 w-4 transition-transform duration-200 ${
                wished ? "fill-red-500 text-red-500 scale-110" : ""
              }`}
            />
          </motion.button>
        </div>
      </Link>

      {/* Card Content Details */}
      <div className="flex flex-1 flex-col pt-3 justify-between">
        <div>
          {/* Small Category Label */}
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
            {product.category || "3D PRINTING"}
          </span>

          {/* Product Title */}
          <Link
            to="/product/$slug"
            params={{ slug: safeSlug }}
            className="text-[15px] font-bold text-[#0B1736] dark:text-white line-clamp-2 leading-snug min-h-[42px] group-hover:text-[#1455D9] transition-colors flex items-start"
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
              ({product.reviews_count || product.review_count || 38})
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

        {/* ⚡ Buy Now Full-Width Pill Button with Micro-Interaction */}
        <motion.div
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          className="mt-3 w-full"
        >
          <Button
            onClick={handleBuyNow}
            className="w-full rounded-full bg-[#1455D9] hover:bg-[#0F44B2] hover:shadow-md hover:shadow-blue-500/20 text-white font-bold text-xs py-2.5 flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200 active:scale-[0.98]"
          >
            <motion.div
              animate={{ x: isHovered ? 2 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5"
            >
              {isAdding ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-300" /> Adding...
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5 fill-current" /> Buy Now
                </>
              )}
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </motion.article>
  );
}
