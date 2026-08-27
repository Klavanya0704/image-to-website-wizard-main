import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Star, Zap, Heart, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
    }, 120);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.07, 0.45),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="interactive-product-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-card p-3.5 shadow-xs"
    >
      {/* Clickable Image Stage with Discount Badge & Animated Wishlist Button */}
      <Link
        to="/product/$slug"
        params={{ slug: safeSlug }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative block h-56 w-full overflow-hidden rounded-xl bg-slate-100/80 dark:bg-slate-900/80 cursor-pointer isolate [perspective:800px]"
      >
        <img
          src={
            product.image ||
            productImage(
              product?.image_key || product?.slug,
              product?.title || product?.name
            )
          }
          alt={product.title || product.name || "Product"}
          loading="lazy"
          style={{
            transform: isHovered
              ? `scale(1.06) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`
              : "scale(1) rotateX(0deg) rotateY(0deg)",
          }}
          className="interactive-product-image h-56 w-full object-cover rounded-xl"
        />

        {/* Ambient subtle image gradient on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none z-10">
          {/* Animated Royal Blue Discount Badge */}
          {off > 0 ? (
            <motion.span
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: Math.min(index * 0.07 + 0.15, 0.5),
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
              className="rounded-full bg-[#1455D9] px-2.5 py-0.5 text-[11px] font-black tracking-wider uppercase text-white shadow-sm border border-blue-400/30 select-none"
            >
              {off}% OFF
            </motion.span>
          ) : (
            <div />
          )}

          {/* Animated Wishlist Heart Button */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 1.25, rotate: -12 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={handleToggleWishlist}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className={`pointer-events-auto flex h-8.5 w-8.5 items-center justify-center rounded-full backdrop-blur-md shadow-sm transition-colors duration-200 cursor-pointer ${
              wished
                ? "bg-red-50 text-red-500 border border-red-200 dark:bg-red-950/80 dark:border-red-800"
                : "bg-white/90 text-slate-400 hover:text-red-500 border border-slate-200/80 dark:bg-slate-900/90 dark:border-slate-700"
            }`}
          >
            <motion.div
              animate={{ scale: wished ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`h-4 w-4 transition-colors duration-200 ${
                  wished ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </motion.div>
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
        <div className="mt-3 w-full">
          <Button
            onClick={handleBuyNow}
            className="interactive-buy-btn w-full rounded-full bg-[#1455D9] hover:bg-[#0F44B2] text-white font-bold text-xs py-2.5 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            {isAdding ? (
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-300" /> Adding...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Zap className="interactive-buy-icon h-3.5 w-3.5 fill-current" /> Buy Now
              </span>
            )}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
