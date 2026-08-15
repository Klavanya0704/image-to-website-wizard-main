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
  Sun,
  Moon,
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
  const { cartCount, wishlist, cartSubtotal, theme, toggleTheme } = useStore();
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

          {/* Theme Toggle Switcher */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-[var(--shadow-card)] hover:text-primary transition-all active:scale-95 cursor-pointer shrink-0"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px] text-[#fbbf24] fill-[#fbbf24]" />
            ) : (
              <Moon className="h-[18px] w-[18px] text-[#4a5d55]" />
            )}
          </button>

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

      {/* Category Navigation Bar (Row 2 / Bottom Row) - Desktop & Mobile */}
      <div className="border-t border-b border-border bg-white dark:bg-card shadow-[0_1px_2px_rgba(0,0,0,0.01)] h-[62px] flex items-center">
        <div className="mx-auto flex w-full max-w-[1400px] items-center px-4 md:px-6 h-full">
          {/* Categories scrollable container */}
          <nav className="flex-1 overflow-x-auto no-scrollbar flex items-center justify-start md:justify-center gap-1 md:gap-2 lg:gap-4 py-1 h-full">
            {/* Home */}
            <Link
              to="/"
              className="flex flex-col items-center gap-1 w-[100px] md:w-[120px] py-1 text-center cursor-pointer select-none group relative pb-2 pt-1 transition-all duration-200 text-foreground/80 hover:text-primary h-full justify-center"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Home className="h-[25px] w-[25px] text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-xs font-semibold tracking-wide transition-colors whitespace-nowrap mt-0.5 group-hover:text-primary group-[.is-active]:text-primary">
                Home
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>

            {/* 3D Printing */}
            <Link
              to="/category/$slug"
              params={{ slug: "3d-printing" }}
              className="flex flex-col items-center gap-1 w-[100px] md:w-[120px] py-1 text-center cursor-pointer select-none group relative pb-2 pt-1 transition-all duration-200 text-foreground/80 hover:text-primary h-full justify-center"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Printer className="h-[25px] w-[25px] text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-xs font-semibold tracking-wide transition-colors whitespace-nowrap mt-0.5 group-hover:text-primary group-[.is-active]:text-primary">
                3D Printing
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>

            {/* Laser Cutting */}
            <Link
              to="/category/$slug"
              params={{ slug: "laser-cutting" }}
              className="flex flex-col items-center gap-1 w-[100px] md:w-[120px] py-1 text-center cursor-pointer select-none group relative pb-2 pt-1 transition-all duration-200 text-foreground/80 hover:text-primary h-full justify-center"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Scissors className="h-[25px] w-[25px] text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-xs font-semibold tracking-wide transition-colors whitespace-nowrap mt-0.5 group-hover:text-primary group-[.is-active]:text-primary">
                Laser Cutting
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>

            {/* CNC Machining */}
            <Link
              to="/category/$slug"
              params={{ slug: "cnc-machining" }}
              className="flex flex-col items-center gap-1 w-[100px] md:w-[120px] py-1 text-center cursor-pointer select-none group relative pb-2 pt-1 transition-all duration-200 text-foreground/80 hover:text-primary h-full justify-center"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Settings className="h-[25px] w-[25px] text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-xs font-semibold tracking-wide transition-colors whitespace-nowrap mt-0.5 group-hover:text-primary group-[.is-active]:text-primary">
                CNC Machining
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>

            {/* Electronics */}
            <Link
              to="/category/$slug"
              params={{ slug: "electronics" }}
              className="flex flex-col items-center gap-1 w-[100px] md:w-[120px] py-1 text-center cursor-pointer select-none group relative pb-2 pt-1 transition-all duration-200 text-foreground/80 hover:text-primary h-full justify-center"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Cpu className="h-[25px] w-[25px] text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-xs font-semibold tracking-wide transition-colors whitespace-nowrap mt-0.5 group-hover:text-primary group-[.is-active]:text-primary">
                Electronics
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>

            {/* Drones & Parts */}
            <Link
              to="/category/$slug"
              params={{ slug: "drones-parts" }}
              className="flex flex-col items-center gap-1 w-[100px] md:w-[120px] py-1 text-center cursor-pointer select-none group relative pb-2 pt-1 transition-all duration-200 text-foreground/80 hover:text-primary h-full justify-center"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Plane className="h-[25px] w-[25px] text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-xs font-semibold tracking-wide transition-colors whitespace-nowrap mt-0.5 group-hover:text-primary group-[.is-active]:text-primary">
                Drones &amp; Parts
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>

            {/* Acrylic Products */}
            <Link
              to="/category/$slug"
              params={{ slug: "acrylic-products" }}
              className="flex flex-col items-center gap-1 w-[100px] md:w-[120px] py-1 text-center cursor-pointer select-none group relative pb-2 pt-1 transition-all duration-200 text-foreground/80 hover:text-primary h-full justify-center"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Layers className="h-[25px] w-[25px] text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-xs font-semibold tracking-wide transition-colors whitespace-nowrap mt-0.5 group-hover:text-primary group-[.is-active]:text-primary">
                Acrylic Products
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>

            {/* DIY Kits */}
            <Link
              to="/category/$slug"
              params={{ slug: "diy-kits" }}
              className="flex flex-col items-center gap-1 w-[100px] md:w-[120px] py-1 text-center cursor-pointer select-none group relative pb-2 pt-1 transition-all duration-200 text-foreground/80 hover:text-primary h-full justify-center"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Bot className="h-[25px] w-[25px] text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-xs font-semibold tracking-wide transition-colors whitespace-nowrap mt-0.5 group-hover:text-primary group-[.is-active]:text-primary">
                DIY Kits
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
