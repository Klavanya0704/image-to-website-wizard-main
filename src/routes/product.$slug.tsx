import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Zap,
  Star,
  CheckCircle,
  Truck,
  Shield,
  RotateCcw,
  Tag,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

import { productQuery, reviewsQuery } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { inr, effectivePrice, discountPercent, num } from "@/lib/format";
import { productImage } from "@/lib/product-images";
import { ProductGridSkeleton, ErrorState } from "@/components/site/States";
import { Stars } from "@/components/site/Stars";

export const Route = createFileRoute("/product/$slug")({
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const { data: product, isLoading, error, refetch } = useQuery(productQuery(slug));
  const { data: reviews = [] } = useQuery(reviewsQuery(product?.id));

  const [selectedVariant, setSelectedVariant] = useState<string>("Standard");

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-64 bg-muted rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-muted rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-10 w-3/4 bg-muted rounded"></div>
              <div className="h-6 w-1/4 bg-muted rounded"></div>
              <div className="h-20 w-full bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <ErrorState
          message={error ? "Failed to load product details." : "Product not found."}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const off = discountPercent(product);
  const wished = isWishlisted(product.id);
  const finalPrice = effectivePrice(product);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      imageKey: product.image_key,
      price: finalPrice,
    });
    toast.success("Added to cart", { description: product.name });
  };

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      imageKey: product.image_key,
      price: finalPrice,
    });
    navigate({ to: "/cart" });
  };

  // Static variant options
  const variants = ["Standard", "Premium Pro", "DIY Kit Edition"];

  return (
    <div className="bg-white dark:bg-background pb-20">
      {/* Breadcrumbs */}
      <div className="bg-muted/10 border-b border-border">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-6 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            to="/category/$slug"
            params={{ slug: product.category_slug }}
            className="hover:text-primary transition-colors"
          >
            {product.category_slug.replace(/-/g, " ")}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-bold truncate max-w-[200px] md:max-w-none">
            {product.name}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT SIDE: Image + Action Buttons (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Image Container with Wishlist overlay */}
            <div className="relative border border-border rounded-2xl overflow-hidden bg-surface group flex items-center justify-center p-4">
              <img
                src={productImage(product.image_key)}
                alt={product.name}
                className="w-full max-h-[480px] object-contain transition-transform duration-300 group-hover:scale-102"
              />
              <button
                type="button"
                onClick={() => {
                  const added = toggleWishlist(product.id);
                  toast[added ? "success" : "message"](
                    added ? "Added to wishlist" : "Removed from wishlist",
                  );
                }}
                className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white shadow-md hover:scale-105 active:scale-95 transition-all text-muted-foreground hover:text-primary ${
                  wished ? "text-primary border-primary bg-primary/5" : ""
                }`}
              >
                <Heart className={`h-5 w-5 ${wished ? "fill-primary text-primary" : ""}`} />
              </button>
            </div>

            {/* Action Buttons below image */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 h-13 rounded-xl bg-muted dark:bg-card border border-border text-foreground hover:bg-muted/80 dark:hover:bg-muted/10 font-bold transition-all disabled:opacity-50"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 h-13 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 font-bold transition-all shadow-md hover:shadow disabled:opacity-50"
              >
                <Zap className="h-5 w-5 fill-current" />
                Buy at {inr(finalPrice)}
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Product Meta & Detail Info (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Header info */}
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                {product.subcategory || product.category_slug.replace(/-/g, " ")}
              </p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating badge */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 bg-primary text-primary-foreground text-xs font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                {product.rating} <Star className="h-3 w-3 fill-current" />
              </span>
              <span className="text-xs font-bold text-muted-foreground">
                {product.review_count} Ratings &amp; Reviews
              </span>
              <span className="h-3 w-px bg-border"></span>
              <span className="text-xs font-bold text-primary">
                In Stock ({product.stock} units)
              </span>
            </div>

            {/* Pricing Section */}
            <div className="border-t border-b border-border py-4 flex items-baseline gap-4">
              <span className="text-3xl font-extrabold text-price">{inr(finalPrice)}</span>
              {off > 0 && (
                <>
                  <span className="text-sm font-bold text-muted-foreground line-through">
                    {inr(product.price)}
                  </span>
                  <span className="text-sm font-extrabold text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                    {off}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Variant selector */}
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">
                Select Edition / Variant
              </span>
              <div className="flex flex-wrap gap-2.5">
                {variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      selectedVariant === v
                        ? "border-primary bg-primary/5 text-primary shadow-sm"
                        : "border-border hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Offer Banner */}
            <div className="border border-border rounded-2xl p-5 bg-muted/5 relative overflow-hidden">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-foreground mb-3.5 flex items-center gap-1.5">
                <Tag className="h-4 w-4 text-primary" /> Available Offers
              </h3>
              <ul className="space-y-2.5 text-xs text-muted-foreground font-semibold">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-foreground">Bank Offer:</strong> Get 5% Unlimited
                    Cashback on AICTE Student Advantage Cards.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-foreground">Partner Offer:</strong> Sign up for
                    MakerClub and receive 100 fabrication credits.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-foreground">Special Discount:</strong> Additional 10%
                    off on bulk orders above 10 units.
                  </span>
                </li>
              </ul>
            </div>

            {/* Delivery details */}
            <div className="border border-border rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-primary" /> Delivery &amp; Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary shrink-0" />
                  <span>1 Year Lab Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-primary shrink-0" />
                  <span>7 Days Prototyping Exchange</span>
                </div>
              </div>
            </div>

            {/* Specifications Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-foreground">Product Description</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium">
                {product.description || product.short_description || "No description available."}
              </p>

              {product.material && (
                <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 text-xs font-semibold">
                  <span className="text-muted-foreground">Material</span>
                  <span className="text-foreground font-bold">{product.material}</span>
                </div>
              )}
              {product.sku && (
                <div className="grid grid-cols-2 gap-4 border-t border-border pt-2 text-xs font-semibold">
                  <span className="text-muted-foreground">SKU / Model</span>
                  <span className="text-foreground font-bold">{product.sku}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
