import React, { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  ChevronDown,
  Heart,
  LogOut,
  LayoutDashboard,
  X,
  Home,
  Store,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
import {
  Icon3DPrinter,
  IconLaserCutter,
  IconCncMilling,
  IconElectronics,
  IconDrone,
  IconAcrylic,
  IconDiyKit,
} from "@/components/site/CategoryIcons";

const CATEGORIES = [
  {
    id: "home",
    name: "Home",
    to: "/",
    isHome: true,
  },
  {
    id: "3d-printing",
    name: "3D Printing",
    to: "/category/$slug",
    params: { slug: "3d-printing" },
    icon: Icon3DPrinter,
    bgClass: "bg-blue-50 text-blue-600",
  },
  {
    id: "laser-cutting",
    name: "Laser Cutting",
    to: "/category/$slug",
    params: { slug: "laser-cutting" },
    icon: IconLaserCutter,
    bgClass: "bg-red-50 text-red-600",
  },
  {
    id: "cnc-machining",
    name: "CNC Machining",
    to: "/category/$slug",
    params: { slug: "cnc-machining" },
    icon: IconCncMilling,
    bgClass: "bg-cyan-50 text-cyan-600",
  },
  {
    id: "electronics",
    name: "Electronics",
    to: "/category/$slug",
    params: { slug: "electronics" },
    icon: IconElectronics,
    bgClass: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "drones-parts",
    name: "Drones & Parts",
    to: "/category/$slug",
    params: { slug: "drones-parts" },
    icon: IconDrone,
    bgClass: "bg-purple-50 text-purple-600",
  },
  {
    id: "acrylic-products",
    name: "Acrylic Products",
    to: "/category/$slug",
    params: { slug: "acrylic-products" },
    icon: IconAcrylic,
    bgClass: "bg-indigo-50 text-indigo-600",
  },
  {
    id: "diy-kits",
    name: "DIY Kits",
    to: "/category/$slug",
    params: { slug: "diy-kits" },
    icon: IconDiyKit,
    bgClass: "bg-amber-50 text-amber-600",
  },
];

const MOBILE_NAV_LINKS = [
  { name: "Home", to: "/" },
  { name: "Store", to: "/shop" },
  { name: "Makerspace", to: "/makerspace" },
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

export function Header() {
  const { cartCount, wishlistCount } = useStore();
  const { user, isAdmin, displayName, signOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isMakerspaceActive = pathname.startsWith("/makerspace") || pathname.startsWith("/services");
  const isStoreActive = !isMakerspaceActive;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate({
        to: "/shop",
        search: { q: searchTerm.trim() },
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-card/95 backdrop-blur-md border-b border-slate-200/80 dark:border-border shadow-xs transition-colors">
      {/* =========================================================================
          ROW 1 — TOP PRIMARY MAIN HEADER ROW (~86px Height)
         ========================================================================= */}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 lg:gap-6 px-4 sm:px-6 lg:px-10 h-[86px]">
        {/* Mobile Hamburger Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-11 w-11 text-slate-800">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 flex flex-col bg-card">
              <div className="border-b border-border p-5 flex items-center justify-between">
                <Logo />
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </div>

              {/* Mobile Switcher */}
              <div className="p-3 border-b border-border bg-slate-50 flex items-center gap-2">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold ${
                    isStoreActive
                      ? "border border-slate-200 bg-white text-slate-800 shadow-xs"
                      : "bg-transparent text-slate-500"
                  }`}
                >
                  <Store className="h-4 w-4 text-blue-600" />
                  <span>Store</span>
                </Link>

                <Link
                  to="/makerspace"
                  onClick={() => setMobileOpen(false)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold ${
                    isMakerspaceActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-transparent text-slate-500"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Makerspace</span>
                </Link>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
                {MOBILE_NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 px-3 text-sm font-semibold rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    activeProps={{ className: "text-blue-600 bg-blue-50 font-bold" }}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Left: ACTE IDEA LAB Brand + Portal Switcher Buttons */}
        <div className="flex items-center gap-5 lg:gap-6 shrink-0">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Logo />
          </motion.div>

          {/* Portal Switcher Buttons Side-by-Side */}
          <div className="hidden lg:flex items-center gap-2.5">
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/"
                className={`h-[46px] border border-slate-200 bg-white text-slate-800 px-5 rounded-full font-semibold flex items-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all text-sm cursor-pointer shadow-2xs ${
                  isStoreActive ? "ring-2 ring-blue-500/20 border-slate-300 font-bold" : ""
                }`}
              >
                <Store className="h-4.5 w-4.5 text-blue-600" />
                <span>Store</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/makerspace"
                className="h-[46px] bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-full font-semibold flex items-center gap-2 shadow-xs hover:shadow transition-all text-sm cursor-pointer"
              >
                <Sparkles className="h-4.5 w-4.5 text-white" />
                <span>Makerspace</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Center: Interactive Expanding Search Bar */}
        <form
          onSubmit={handleSearch}
          className={`hidden md:flex relative flex-1 mx-2 lg:mx-4 items-center transition-all duration-300 ${
            searchFocused ? "max-w-2xl" : "max-w-xl"
          }`}
        >
          <div className="w-full relative flex items-center">
            <input
              type="search"
              placeholder="Search for products, materials, services..."
              value={searchTerm}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full h-[52px] rounded-full pl-6 pr-14 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 shadow-2xs ${
                searchFocused
                  ? "bg-white border-2 border-blue-600 shadow-lg shadow-blue-500/10 ring-4 ring-blue-500/15"
                  : "bg-slate-50/90 border border-slate-200 hover:border-slate-300"
              }`}
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.08 }}
              aria-label="Search"
              className="h-10 w-10 bg-blue-600 hover:bg-blue-700 rounded-full text-white absolute right-1.5 top-1/2 -translate-y-1/2 transition-colors cursor-pointer flex items-center justify-center shadow-xs"
            >
              <Search className={`h-4.5 w-4.5 transition-transform duration-200 ${searchFocused ? "scale-110" : ""}`} />
            </motion.button>
          </div>
        </form>

        {/* Right: Action Controls */}
        <div className="flex items-center gap-4 sm:gap-5 lg:gap-6 shrink-0">
          {/* Login / Signup */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-[46px] px-3.5 rounded-full flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-blue-600 hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
              >
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <User className="h-4.5 w-4.5 text-slate-700" />
                </div>
                <span className="hidden sm:inline">
                  {user ? `Hi, ${displayName.split(" ")[0]}` : "Login / Signup"}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-500 hidden sm:inline" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user ? (
                <>
                  {isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 font-semibold text-blue-600"
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
                    className="text-destructive font-semibold cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="font-bold text-blue-600">
                      Login
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

          {/* Wishlist Heart Icon */}
          <Link
            to="/wishlist"
            className="relative h-11 w-11 rounded-full flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            title="Wishlist"
          >
            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }}>
              <Heart className="h-5 w-5" />
            </motion.div>
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon with Bounce Micro-Interaction */}
          <Link
            to="/cart"
            className="relative h-11 w-11 rounded-full flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors group"
            title="Cart"
          >
            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }}>
              <ShoppingCart className="h-5 w-5 group-hover:text-blue-600 transition-colors" />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.span
                key={cartCount}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 600, damping: 20 }}
                className="absolute top-1 right-1 flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white shadow-xs"
              >
                {cartCount > 0 ? cartCount : 0}
              </motion.span>
            </AnimatePresence>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          ROW 2 — CATEGORY NAVIGATION BAR with Interactive Hover Physics & layoutId
         ========================================================================= */}
      <div className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-card shadow-2xs">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between h-[66px] px-4 sm:px-8 overflow-x-auto no-scrollbar gap-2 sm:gap-3 lg:gap-4">
          {CATEGORIES.map((cat) => {
            const isCatActive =
              cat.id === "home"
                ? pathname === "/" || pathname === "/shop"
                : pathname === `/category/${cat.id}` || pathname.startsWith(`/category/${cat.id}`);

            if (cat.isHome) {
              return (
                <Link
                  key={cat.id}
                  to="/"
                  className="relative group shrink-0 py-1"
                >
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`relative z-10 flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                      isCatActive
                        ? "text-[#1455D9] font-black"
                        : "text-slate-700 hover:text-[#1455D9] font-bold"
                    }`}
                  >
                    <Home
                      className={`w-4.5 h-4.5 category-icon transition-transform duration-200 group-hover:scale-115 ${
                        isCatActive ? "text-[#1455D9]" : "text-slate-600 group-hover:text-[#1455D9]"
                      }`}
                    />
                    <span className="category-text text-[13px] sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200">
                      {cat.name}
                    </span>
                  </motion.div>

                  {/* Animated Background Pill Indicator */}
                  {isCatActive && (
                    <motion.div
                      layoutId="activeCategoryHeaderPill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 shadow-2xs"
                    />
                  )}
                </Link>
              );
            }

            const IconComponent = cat.icon!;

            return (
              <Link
                key={cat.id}
                to={cat.to as any}
                params={cat.params as any}
                className="relative group shrink-0 py-1"
              >
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`relative z-10 flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                    isCatActive
                      ? "text-[#1455D9] font-black"
                      : "text-slate-700 hover:text-[#1455D9] font-bold"
                  }`}
                >
                  <div
                    className={`category-icon p-1.5 rounded-lg ${cat.bgClass} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-115 shadow-2xs`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="category-text text-[13px] sm:text-sm whitespace-nowrap group-hover:translate-x-0.5 transition-transform duration-200">
                    {cat.name}
                  </span>
                </motion.div>

                {/* Animated Background Pill Indicator */}
                {isCatActive && (
                  <motion.div
                    layoutId="activeCategoryHeaderPill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 shadow-2xs"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
