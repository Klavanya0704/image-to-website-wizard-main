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
  Scissors,
  Settings,
  Cpu,
  Plane,
  Layers,
  Gift,
  Home,
  Box,
  Store,
  Sparkles,
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

// Row 2 Category Navigation configuration with dedicated line icons and subtle color accents
const CATEGORIES = [
  {
    id: "home",
    name: "Home",
    to: "/",
    icon: Home,
    iconColor: "text-[#1455D9]",
    bgColor: "bg-blue-50/80 border-blue-200/80 group-hover:bg-blue-100/80",
    activeBg: "bg-blue-100 border-blue-400 text-[#1455D9] ring-2 ring-blue-500/20",
  },
  {
    id: "3d-printing",
    name: "3D Printing",
    to: "/category/$slug",
    params: { slug: "3d-printing" },
    icon: Box,
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-50/80 border-cyan-200/80 group-hover:bg-cyan-100/80",
    activeBg: "bg-cyan-100 border-cyan-400 text-cyan-700 ring-2 ring-cyan-500/20",
  },
  {
    id: "laser-cutting",
    name: "Laser Cutting",
    to: "/category/$slug",
    params: { slug: "laser-cutting" },
    icon: Scissors,
    iconColor: "text-rose-500",
    bgColor: "bg-rose-50/80 border-rose-200/80 group-hover:bg-rose-100/80",
    activeBg: "bg-rose-100 border-rose-400 text-rose-600 ring-2 ring-rose-500/20",
  },
  {
    id: "cnc-machining",
    name: "CNC Machining",
    to: "/category/$slug",
    params: { slug: "cnc-machining" },
    icon: Settings,
    iconColor: "text-blue-600",
    bgColor: "bg-sky-50/80 border-sky-200/80 group-hover:bg-sky-100/80",
    activeBg: "bg-sky-100 border-sky-400 text-blue-700 ring-2 ring-blue-500/20",
  },
  {
    id: "electronics",
    name: "Electronics",
    to: "/category/$slug",
    params: { slug: "electronics" },
    icon: Cpu,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50/80 border-emerald-200/80 group-hover:bg-emerald-100/80",
    activeBg: "bg-emerald-100 border-emerald-400 text-emerald-700 ring-2 ring-emerald-500/20",
  },
  {
    id: "drones-parts",
    name: "Drones & Parts",
    to: "/category/$slug",
    params: { slug: "drones-parts" },
    icon: Plane,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50/80 border-purple-200/80 group-hover:bg-purple-100/80",
    activeBg: "bg-purple-100 border-purple-400 text-purple-700 ring-2 ring-purple-500/20",
  },
  {
    id: "acrylic-products",
    name: "Acrylic Products",
    to: "/category/$slug",
    params: { slug: "acrylic-products" },
    icon: Layers,
    iconColor: "text-blue-600",
    bgColor: "bg-indigo-50/80 border-indigo-200/80 group-hover:bg-indigo-100/80",
    activeBg: "bg-indigo-100 border-indigo-400 text-indigo-700 ring-2 ring-indigo-500/20",
  },
  {
    id: "diy-kits",
    name: "DIY Kits",
    to: "/category/$slug",
    params: { slug: "diy-kits" },
    icon: Gift,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50/80 border-amber-200/80 group-hover:bg-amber-100/80",
    activeBg: "bg-amber-100 border-amber-400 text-amber-700 ring-2 ring-amber-500/20",
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
  const { cartCount, wishlist } = useStore();
  const { user, isAdmin, displayName, signOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
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
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-card border-b border-[#DCE5F2]/90 dark:border-border shadow-xs">
      {/* =========================================================================
          ROW 1 — MAIN HEADER (Clean, Lightweight 72px Bar)
         ========================================================================= */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 h-[72px]">
        {/* Mobile Hamburger Drawer */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 text-[#0B1736]">
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

              {/* Mobile Section Switcher */}
              <div className="p-3 border-b border-border bg-[#F8FAFD] dark:bg-slate-900/40 flex items-center gap-2">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition-all ${
                    isStoreActive
                      ? "bg-white border-2 border-[#1455D9] text-[#1455D9] shadow-xs"
                      : "bg-white dark:bg-card border border-border text-[#52627A]"
                  }`}
                >
                  <Store className="h-3.5 w-3.5" />
                  <span>Store</span>
                </Link>

                <Link
                  to="/makerspace"
                  onClick={() => setMobileOpen(false)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition-all ${
                    isMakerspaceActive
                      ? "bg-[#1455D9] text-white shadow-xs"
                      : "bg-white dark:bg-card border border-border text-[#52627A]"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
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
                    className="block py-2.5 px-3 text-sm font-semibold rounded-lg text-[#52627A] hover:text-[#1455D9] hover:bg-[#F3F7FF] transition-all"
                    activeProps={{ className: "text-[#1455D9] bg-[#F3F7FF] font-bold" }}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Left: ACTE IDEA LAB Logo + Store / Makerspace Toggle Buttons */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <Logo />

          {/* Section Switcher Toggle Buttons (Store vs Makerspace) */}
          <div className="hidden lg:flex items-center gap-2 ml-2">
            <Link
              to="/"
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                isStoreActive
                  ? "bg-white border-2 border-[#1455D9] text-[#1455D9] shadow-xs"
                  : "bg-white dark:bg-slate-900 border border-[#DCE5F2] dark:border-slate-700 text-[#52627A] dark:text-slate-300 hover:text-[#0B1736] hover:border-blue-300"
              }`}
            >
              <Store className="h-3.5 w-3.5" />
              <span>Store</span>
            </Link>

            <Link
              to="/makerspace"
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                isMakerspaceActive
                  ? "bg-[#1455D9] text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 border border-[#DCE5F2] dark:border-slate-700 text-[#52627A] dark:text-slate-300 hover:text-[#0B1736] hover:border-blue-300"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Makerspace</span>
            </Link>
          </div>
        </div>

        {/* Center: Large Rounded Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md lg:max-w-lg xl:max-w-xl mx-2 lg:mx-6 h-[44px] items-center rounded-full border border-[#DCE5F2] bg-[#F8FAFD] dark:bg-slate-900/50 p-1 focus-within:border-[#1455D9] focus-within:ring-2 focus-within:ring-[#1455D9]/15 shadow-none transition-all duration-200"
        >
          <input
            type="search"
            placeholder="Search for products, materials, services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent px-4 h-full text-xs sm:text-sm text-[#0B1736] dark:text-white outline-none placeholder:text-[#52627A]/70"
          />
          <Button
            type="submit"
            size="icon"
            className="h-8 w-8 rounded-full bg-[#1455D9] hover:bg-[#0F44B2] text-white transition-transform active:scale-95 shrink-0 shadow-xs cursor-pointer"
          >
            <Search className="h-3.5 w-3.5" />
          </Button>
        </form>

        {/* Right: Login / Signup Dropdown, Wishlist, Cart */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {/* Login / Signup */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B1736] dark:text-white hover:text-[#1455D9] transition-colors focus:outline-none cursor-pointer py-1.5">
                <User className="h-4 w-4 text-[#52627A] dark:text-slate-400" />
                <span className="hidden sm:inline">
                  {user ? `Hi, ${displayName.split(" ")[0]}` : "Login / Signup"}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-[#52627A] opacity-60" />
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
                          className="flex items-center gap-2 font-semibold text-[#1455D9]"
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
                    <Link to="/login" className="font-bold text-[#1455D9]">
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
            className="flex items-center justify-center text-[#52627A] hover:text-[#1455D9] transition-colors p-1"
            title="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* Cart Icon with Item Count Badge */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center text-[#F59E0B] hover:text-[#D97706] transition-colors p-1"
            title="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#0B1736] text-[9px] font-black text-white shadow-xs">
              {cartCount > 0 ? cartCount : 3}
            </span>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          ROW 2 — CATEGORY NAVIGATION (Compact 68px Bar with Circular Line Icons)
         ========================================================================= */}
      <div className="border-t border-[#E2E8F0]/80 dark:border-border/80 bg-[#FAFCFF] dark:bg-card/50 h-[68px] flex items-center">
        <div className="mx-auto flex w-full max-w-[1400px] items-center px-4 sm:px-6 h-full">
          <nav className="flex-1 overflow-x-auto no-scrollbar flex items-center justify-start md:justify-center gap-4 sm:gap-6 lg:gap-8 h-full py-1">
            {CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              const isCatActive =
                cat.id === "home"
                  ? pathname === "/" || pathname === "/shop"
                  : pathname === `/category/${cat.id}`;

              return (
                <Link
                  key={cat.id}
                  to={cat.to as any}
                  params={cat.params as any}
                  className={`group relative flex flex-col items-center justify-center h-full px-2 py-1 text-center transition-all cursor-pointer shrink-0 ${
                    isCatActive ? "is-active" : ""
                  }`}
                >
                  {/* Circular Line Icon Container with Subtle Accent Background */}
                  <div
                    className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full border flex items-center justify-center transition-all duration-200 ${
                      isCatActive ? cat.activeBg : `${cat.bgColor} ${cat.iconColor}`
                    }`}
                  >
                    <IconComp className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:scale-110" />
                  </div>

                  {/* Category Label */}
                  <span
                    className={`mt-1 text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
                      isCatActive
                        ? "text-[#1455D9] font-bold"
                        : "text-[#52627A] dark:text-slate-400 group-hover:text-[#1455D9]"
                    }`}
                  >
                    {cat.name}
                  </span>

                  {/* Thin Blue Underline Active Indicator */}
                  <span
                    className={`absolute bottom-0 left-1 right-1 h-[2px] bg-[#1455D9] rounded-full transition-opacity duration-200 ${
                      isCatActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
