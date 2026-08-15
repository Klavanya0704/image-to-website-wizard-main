import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  ChevronDown,
  Heart,
  Headphones,
  LogOut,
  LayoutDashboard,
  X,
  Store,
  Printer,
  Scissors,
  Settings,
  Cpu,
  Plane,
  Layers,
  Bot,
  MapPin,
  Home,
  Tag,
} from "lucide-react";

import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/store";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { inr } from "@/lib/format";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_LINKS = [
  { name: "Home", to: "/" },
  { name: "Shop", to: "/shop" },
  { name: "3D Printing", to: "/category/3d-printing" },
  { name: "Laser Cutting", to: "/category/laser-cutting" },
  { name: "CNC Machining", to: "/category/cnc-machining" },
  { name: "Electronics", to: "/category/electronics" },
  { name: "Drones & Parts", to: "/category/drones-parts" },
  { name: "Acrylic Products", to: "/category/acrylic-products" },
  { name: "DIY Kits", to: "/category/diy-kits" },
  { name: "About Us", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Bulk Orders", to: "/bulk-orders" },
  { name: "Contact Us", to: "/contact" },
];

// CATEGORIES are statically rendered in the navigation bar to pass TanStack Router's compile checks

export function Header() {
  const { cartCount, wishlist, cartSubtotal } = useStore();
  const { user, isAdmin, displayName, signOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate({
        to: "/shop",
        search: { q: searchTerm.trim() },
      });
    }
  };

  const handleCategorySelect = (slug: string, name: string) => {
    setSelectedCategory(name);
    if (slug === "all") {
      navigate({ to: "/shop" });
    } else {
      navigate({ to: "/category/$slug", params: { slug } });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white dark:bg-card shadow-sm">
      {/* Top Row: Logo, Brand Toggle, Location, Actions (Row 1) */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 h-[72px]">
        {/* Mobile Hamburger (left-aligned on mobile) */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 flex flex-col bg-card">
              <div className="border-b border-border p-5 flex items-center justify-between">
                <Logo />
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 px-3 text-sm font-semibold rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                    activeProps={{ className: "text-primary bg-primary/5" }}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Brand / Logo Area */}
        <div className="flex items-center gap-4">
          <Logo />
          {/* Brand Toggle Pills */}
          <div className="hidden md:flex items-center gap-2 bg-muted p-1 rounded-full text-xs font-semibold">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full shadow-sm cursor-default">
              Store
            </span>
            <Link
              to="/services"
              className="text-muted-foreground hover:text-foreground px-3 py-1 rounded-full transition-colors"
            >
              Makerspace
            </Link>
          </div>
        </div>

        {/* Search Bar - Desktop Centered */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-xl mx-6 h-[44px] items-center rounded-full border border-border bg-background p-1 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-sm transition-all duration-200"
        >
          <input
            type="search"
            placeholder="Search for products, materials, specs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent px-4 h-full text-sm outline-none placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-sm hover:shadow transition-all duration-200 shrink-0"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Right side: Location & Action Items */}
        <div className="flex items-center gap-6 shrink-0">
          {/* Delivery Location Selector */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer select-none">
            <MapPin className="h-4 w-4 text-primary" />
            <div className="leading-tight">
              <span className="block font-medium">Deliver to</span>
              <span className="block font-bold text-foreground hover:text-primary">
                Bengaluru 560001 &gt;
              </span>
            </div>
          </div>

          {/* Login Dropdown Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 bg-primary text-primary-foreground px-5 py-2 rounded-lg font-bold text-sm hover:bg-primary/95 transition-all shadow-sm focus:outline-none">
                {user ? `Hi, ${displayName.split(" ")[0]}` : "Login"}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-1">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user ? (
                <>
                  {isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 font-semibold text-primary"
                        >
                          <LayoutDashboard className="h-4 w-4" /> Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/account">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/addresses">Saved Addresses</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-destructive font-semibold"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="font-bold text-primary">
                      Login / Sign In
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/signup">New Customer? Sign Up</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/track-order">Track Order</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* More Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden sm:flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary transition-colors focus:outline-none py-2">
                More
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 mt-1">
              <DropdownMenuItem asChild>
                <Link to="/shop">All Products</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/services">Our Services</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/bulk-orders">Bulk Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about">About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contact">Contact Support</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative flex items-center gap-1.5 hover:text-primary transition-colors group shrink-0"
            title="Wishlist"
          >
            <div className="relative">
              <Heart className="h-[22px] w-[22px] text-muted-foreground group-hover:text-primary transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground border border-background">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="hidden xl:block text-xs font-bold text-foreground group-hover:text-primary transition-colors">
              Wishlist
            </span>
          </Link>

          {/* Cart Link */}
          <Link
            to="/cart"
            className="flex items-center gap-2.5 hover:text-primary transition-colors group shrink-0"
          >
            <div className="relative">
              <ShoppingCart className="h-[22px] w-[22px] text-muted-foreground group-hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground border border-background">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden xl:block text-xs font-bold text-foreground group-hover:text-primary transition-colors">
              Cart
            </span>
          </Link>
        </div>
      </div>

      {/* Student Discount Ticket Banner (Row 2 / Bottom Row) */}
      <div className="bg-white dark:bg-background border-b border-border py-4 px-4 sm:px-6">
        <div className="mx-auto max-w-[1400px] relative">
          {/* Main Ticket Outer Container */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#052217] via-[#0A3728] to-[#0D4433] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_32px_0_rgba(10,55,40,0.2)] border border-primary/20 backdrop-blur-sm">
            {/* Ticket Notches */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-background rounded-full -ml-2.5 z-10 border-r border-primary/20" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-background rounded-full -mr-2.5 z-10 border-l border-primary/20" />

            {/* Left Side: Main Ticket Body */}
            <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-6 z-10 pl-2">
              <div className="bg-primary/10 border border-primary/30 p-3 rounded-xl flex items-center justify-center shrink-0">
                <Tag className="h-7 w-7 text-primary animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                  15% OFF FOR STUDENTS
                  <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full animate-bounce">
                    New Offer
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100/80 font-medium max-w-2xl leading-relaxed">
                  Unlock exclusive discount on all 3D printing &amp; innovation gear. Verify student
                  ID at checkout.
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("STUDENT15");
                      toast.success("Coupon STUDENT15 copied to clipboard!", {
                        description: "Use it at checkout to claim your 15% discount.",
                      });
                    }}
                    className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Claim 15% Off
                  </button>
                </div>
              </div>
            </div>

            {/* Perforation Line Divider (only md and up) */}
            <div className="hidden md:block h-20 border-l-2 border-dashed border-white/25 mx-4 z-10" />
            <div className="md:hidden w-full border-t-2 border-dashed border-white/20 my-2 z-10" />

            {/* Right Side: Ticket Stub */}
            <div className="flex flex-col items-center justify-center text-center shrink-0 z-10 pr-2 min-w-[200px]">
              <div
                onClick={() => {
                  navigator.clipboard.writeText("STUDENT15");
                  toast.success("Coupon STUDENT15 copied to clipboard!");
                }}
                className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-center select-all cursor-pointer group hover:bg-white/10 transition-colors w-full"
              >
                <span className="block text-[10px] text-emerald-200/60 font-black uppercase tracking-wider mb-0.5">
                  Coupon Code
                </span>
                <code className="text-sm font-black tracking-widest text-emerald-300 font-mono group-hover:text-white">
                  STUDENT15
                </code>
              </div>

              {/* Barcode Graphic or Badge */}
              <div className="mt-3.5 flex flex-col items-center gap-1 opacity-70">
                <div className="flex gap-0.5 h-6 items-center">
                  <div className="w-1.5 h-full bg-white rounded-sm" />
                  <div className="w-0.5 h-full bg-white rounded-sm" />
                  <div className="w-1 h-full bg-white rounded-sm" />
                  <div className="w-0.5 h-full bg-white rounded-sm" />
                  <div className="w-1.5 h-full bg-white rounded-sm" />
                  <div className="w-0.5 h-full bg-white rounded-sm" />
                  <div className="w-1 h-full bg-white rounded-sm" />
                  <div className="w-2 h-full bg-white rounded-sm" />
                </div>
                <span className="text-[9px] font-bold text-emerald-100/50 uppercase tracking-widest">
                  SPECIAL OFFER
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
