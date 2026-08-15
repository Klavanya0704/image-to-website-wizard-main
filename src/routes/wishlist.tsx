import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/lib/store";
import { productsQuery } from "@/lib/catalog";
import { productImage } from "@/lib/product-images";
import { inr } from "@/lib/format";
import { Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/wishlist")({
  component: Wishlist,
});

function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, removeFromWishlist } = useStore();
  const { data: allProducts = [], isLoading } = useQuery(productsQuery);

  const wishedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (product: any) => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      imageKey: product.image_key,
      price: product.discount_price ?? product.price,
    });
    removeFromWishlist(product.id);
    toast.success("Moved item to cart!");
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded-2xl w-full"></div>
        </div>
      </div>
    );
  }

  if (wishedProducts.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted/10 text-muted-foreground mb-6">
          <Heart className="h-12 w-12" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Your wishlist is empty
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Keep track of items you love by clicking the heart icon on product cards.
        </p>
        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/95 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Browse Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
        My Wishlist
      </h1>
      <p className="text-xs sm:text-sm text-muted-foreground font-semibold mt-1">
        Your saved maker gear and innovation products.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {wishedProducts.map((product) => {
          const isOutOfStock = product.stock === 0;
          const finalPrice = product.discount_price ?? product.price;

          return (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] hover:shadow-md transition-all duration-300"
            >
              {/* Product Image */}
              <Link
                to="/product/$slug"
                params={{ slug: product.slug }}
                className="relative block overflow-hidden bg-surface aspect-square"
              >
                <img
                  src={productImage(product.image_key)}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {isOutOfStock && (
                  <span className="absolute inset-x-0 bottom-0 bg-topbar/80 py-1.5 text-center text-xs font-semibold text-topbar-foreground">
                    Out of stock
                  </span>
                )}
              </Link>

              {/* Card Details */}
              <div className="flex flex-1 flex-col p-4 gap-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {product.category_slug.replace(/-/g, " ")}
                </p>
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  className="line-clamp-2 text-sm font-semibold text-foreground hover:text-primary transition-colors flex-1"
                >
                  {product.name}
                </Link>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-base font-bold text-price">{inr(finalPrice)}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isOutOfStock
                        ? "bg-destructive/10 text-destructive border border-destructive/15"
                        : "bg-success/10 text-success border border-success/15"
                    }`}
                  >
                    {isOutOfStock ? "Out of Stock" : "In Stock"}
                  </span>
                </div>

                {/* Move to Cart and Delete Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-border/60">
                  <Button
                    onClick={() => handleMoveToCart(product)}
                    disabled={isOutOfStock}
                    className="flex-1 bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" /> Move to Cart
                  </Button>
                  <Button
                    onClick={() => {
                      toggleWishlist(product.id);
                      toast.message("Removed from wishlist");
                    }}
                    variant="outline"
                    className="p-2 h-9 w-9 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors cursor-pointer shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
