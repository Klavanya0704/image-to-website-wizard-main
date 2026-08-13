import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
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
} from "lucide-react";

import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/store";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
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
  const { cartCount, wishlist } = useStore();
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
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card shadow-[var(--shadow-card)]">
      {/* Top announcement bar */}
      <div className="bg-topbar text-topbar-foreground py-2 text-xs font-medium">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6">
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Welcome to AICTE IDEA Lab — Innovation Meets Creation
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/track-order"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <User className="h-3.5 w-3.5" /> Track Order
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Headphones className="h-3.5 w-3.5" /> Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4">
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

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-5 py-3 border-b border-border">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-full border border-border bg-background py-2 pl-4 pr-10 text-sm outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </form>

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

              {/* Mobile Footer Auth */}
              <div className="border-t border-border p-5 bg-muted/30">
                {user ? (
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Hello, {displayName}</div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button asChild size="sm" variant="outline" className="w-full">
                        <Link to="/account" onClick={() => setMobileOpen(false)}>
                          My Account
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          signOut();
                          setMobileOpen(false);
                        }}
                        className="w-full"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link to="/login" onClick={() => setMobileOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link to="/signup" onClick={() => setMobileOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Logo />

        {/* Search & Category Selector - Desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-xl items-center rounded-full border border-border bg-background p-1 focus-within:border-primary transition-colors"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 shrink-0 gap-1.5 rounded-full px-4 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                {selectedCategory}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Product Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleCategorySelect("all", "All Categories")}>
                All Categories
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategorySelect("3d-printing", "3D Printing")}>
                3D Printing
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleCategorySelect("laser-cutting", "Laser Cutting")}
              >
                Laser Cutting
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleCategorySelect("cnc-machining", "CNC Machining")}
              >
                CNC Machining
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategorySelect("electronics", "Electronics")}>
                Electronics
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleCategorySelect("drones-parts", "Drones & Parts")}
              >
                Drones & Parts
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleCategorySelect("acrylic-products", "Acrylic Products")}
              >
                Acrylic Products
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategorySelect("diy-kits", "DIY Kits")}>
                DIY Kits
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="h-5 w-px bg-border mx-1" />

          <input
            type="search"
            placeholder="Search for products, materials, specs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
          />

          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/95 transition-all"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Top actions (Right Side) */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Account Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 group text-left cursor-pointer">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-foreground transition-colors group-hover:border-primary">
                    <User className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </span>
                  <span className="hidden sm:block leading-tight">
                    <span className="block text-[11px] text-muted-foreground font-medium">
                      Hello,
                    </span>
                    <span className="block text-sm font-bold truncate max-w-[100px]">
                      {displayName}
                    </span>
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
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
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <User className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              <span className="hidden sm:block leading-tight">
                <span className="block text-[11px] text-muted-foreground font-medium">
                  My Account
                </span>
                <span className="block text-sm font-bold">Login / Signup</span>
              </span>
            </Link>
          )}

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-primary transition-colors group"
          >
            <Heart className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {wishlist.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground border border-background">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-primary transition-colors group"
          >
            <ShoppingCart className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground border border-background">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Desktop Main Navigation Links (Level 1) */}
      <div className="hidden md:block border-t border-border bg-muted/20">
        <div className="mx-auto flex max-w-[1400px] items-center px-6 py-2">
          <nav className="flex items-center gap-8">
            <Link
              to="/"
              className="shrink-0 pb-1.5 pt-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary border-b-2 border-transparent transition-all"
              activeProps={{ className: "border-primary text-foreground font-bold" }}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="shrink-0 pb-1.5 pt-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary border-b-2 border-transparent transition-all"
              activeProps={{ className: "border-primary text-foreground font-bold" }}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="shrink-0 pb-1.5 pt-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary border-b-2 border-transparent transition-all"
              activeProps={{ className: "border-primary text-foreground font-bold" }}
            >
              About Us
            </Link>
            <Link
              to="/services"
              className="shrink-0 pb-1.5 pt-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary border-b-2 border-transparent transition-all"
              activeProps={{ className: "border-primary text-foreground font-bold" }}
            >
              Services
            </Link>
            <Link
              to="/bulk-orders"
              className="shrink-0 pb-1.5 pt-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary border-b-2 border-transparent transition-all"
              activeProps={{ className: "border-primary text-foreground font-bold" }}
            >
              Bulk Orders
            </Link>
            <Link
              to="/contact"
              className="shrink-0 pb-1.5 pt-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary border-b-2 border-transparent transition-all"
              activeProps={{ className: "border-primary text-foreground font-bold" }}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>

      {/* Category Navigation Bar (Level 2) - Desktop & Mobile */}
      <div className="border-t border-b border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
        <div className="mx-auto flex max-w-[1400px] items-center px-4 md:px-6">
          {/* Categories scrollable container */}
          <nav className="flex-1 overflow-x-auto no-scrollbar flex items-center justify-start md:justify-center gap-1 md:gap-2 lg:gap-6 py-1">
            {/* 3D Printing */}
            <Link
              to="/category/$slug"
              params={{ slug: "3d-printing" }}
              className="flex flex-col items-center gap-1 px-4 py-1.5 text-center cursor-pointer select-none group relative pb-2.5 pt-2 transition-all duration-200 text-foreground/80 hover:text-primary"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Printer className="h-7 w-7 text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-[13px] font-semibold tracking-wide transition-colors whitespace-nowrap mt-1 group-hover:text-primary group-[.is-active]:text-primary">
                3D Printing
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2.5px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>

            {/* Laser Cutting */}
            <Link
              to="/category/$slug"
              params={{ slug: "laser-cutting" }}
              className="flex flex-col items-center gap-1 px-4 py-1.5 text-center cursor-pointer select-none group relative pb-2.5 pt-2 transition-all duration-200 text-foreground/80 hover:text-primary"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Scissors className="h-7 w-7 text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-[13px] font-semibold tracking-wide transition-colors whitespace-nowrap mt-1 group-hover:text-primary group-[.is-active]:text-primary">
                Laser Cutting
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2.5px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>

            {/* CNC Machining */}
            <Link
              to="/category/$slug"
              params={{ slug: "cnc-machining" }}
              className="flex flex-col items-center gap-1 px-4 py-1.5 text-center cursor-pointer select-none group relative pb-2.5 pt-2 transition-all duration-200 text-foreground/80 hover:text-primary"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Settings className="h-7 w-7 text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-[13px] font-semibold tracking-wide transition-colors whitespace-nowrap mt-1 group-hover:text-primary group-[.is-active]:text-primary">
                CNC Machining
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2.5px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>

            {/* Electronics */}
            <Link
              to="/category/$slug"
              params={{ slug: "electronics" }}
              className="flex flex-col items-center gap-1 px-4 py-1.5 text-center cursor-pointer select-none group relative pb-2.5 pt-2 transition-all duration-200 text-foreground/80 hover:text-primary"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Cpu className="h-7 w-7 text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-[13px] font-semibold tracking-wide transition-colors whitespace-nowrap mt-1 group-hover:text-primary group-[.is-active]:text-primary">
                Electronics
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2.5px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>

            {/* Drones & Parts */}
            <Link
              to="/category/$slug"
              params={{ slug: "drones-parts" }}
              className="flex flex-col items-center gap-1 px-4 py-1.5 text-center cursor-pointer select-none group relative pb-2.5 pt-2 transition-all duration-200 text-foreground/80 hover:text-primary"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Plane className="h-7 w-7 text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-[13px] font-semibold tracking-wide transition-colors whitespace-nowrap mt-1 group-hover:text-primary group-[.is-active]:text-primary">
                Drones &amp; Parts
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2.5px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>

            {/* Acrylic Products */}
            <Link
              to="/category/$slug"
              params={{ slug: "acrylic-products" }}
              className="flex flex-col items-center gap-1 px-4 py-1.5 text-center cursor-pointer select-none group relative pb-2.5 pt-2 transition-all duration-200 text-foreground/80 hover:text-primary"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Layers className="h-7 w-7 text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-[13px] font-semibold tracking-wide transition-colors whitespace-nowrap mt-1 group-hover:text-primary group-[.is-active]:text-primary">
                Acrylic Products
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2.5px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>

            {/* DIY Kits */}
            <Link
              to="/category/$slug"
              params={{ slug: "diy-kits" }}
              className="flex flex-col items-center gap-1 px-4 py-1.5 text-center cursor-pointer select-none group relative pb-2.5 pt-2 transition-all duration-200 text-foreground/80 hover:text-primary"
              activeProps={{
                className: "text-primary is-active",
              }}
            >
              <Bot className="h-7 w-7 text-primary/75 transition-colors group-hover:text-primary group-[.is-active]:text-primary" />
              <span className="text-[11px] md:text-[13px] font-semibold tracking-wide transition-colors whitespace-nowrap mt-1 group-hover:text-primary group-[.is-active]:text-primary">
                DIY Kits
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2.5px] rounded-full bg-primary opacity-0 group-[.is-active]:opacity-100 transition-opacity" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
