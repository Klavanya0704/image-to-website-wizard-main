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

// Row 2 Category Navigation Configuration: Clean [icon] Label pairs on a single horizontal line
const CATEGORIES = [
  {
    id: "home",
    name: "Home",
    to: "/",
    icon: Home,
  },
  {
    id: "3d-printing",
    name: "3D Printing",
    to: "/category/$slug",
    params: { slug: "3d-printing" },
    icon: Box,
  },
  {
    id: "laser-cutting",
    name: "Laser Cutting",
    to: "/category/$slug",
    params: { slug: "laser-cutting" },
    icon: Scissors,
  },
  {
    id: "cnc-machining",
    name: "CNC Machining",
    to: "/category/$slug",
    params: { slug: "cnc-machining" },
    icon: Settings,
  },
  {
    id: "electronics",
    name: "Electronics",
    to: "/category/$slug",
    params: { slug: "electronics" },
    icon: Cpu,
  },
  {
    id: "drones-parts",
    name: "Drones & Parts",
    to: "/category/$slug",
    params: { slug: "drones-parts" },
    icon: Plane,
  },
  {
    id: "acrylic-products",
    name: "Acrylic Products",
    to: "/category/$slug",
    params: { slug: "acrylic-products" },
    icon: Layers,
  },
  {
    id: "diy-kits",
    name: "DIY Kits",
    to: "/category/$slug",
    params: { slug: "diy-kits" },
    icon: Gift,
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
  const { cartCount } = useStore();
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
          ROW 1 — MAIN HEADER (72px Bar: Logo, Toggle, Search, Account, Cart)
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
          ROW 2 — CLEAN HORIZONTAL CATEGORY NAVIGATION (54px: [icon] Category Name)
         ========================================================================= */}
      <div className="border-t border-[#E2E8F0] dark:border-border/80 bg-white dark:bg-card h-[54px] flex items-center">
        <div className="mx-auto flex w-full max-w-[1400px] items-center px-4 sm:px-6 h-full">
          <nav className="flex-1 overflow-x-auto no-scrollbar flex items-center justify-start md:justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-10 h-full">
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
                  className={`group relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap ${
                    isCatActive
                      ? "text-[#1455D9] font-bold"
                      : "text-[#263653] dark:text-slate-200 font-semibold hover:text-[#1455D9] hover:bg-[#F4F8FF] dark:hover:bg-slate-800/60"
                  }`}
                >
                  {/* Clean, Small Line Icon (18-20px) directly beside text without any circle wrapper */}
                  <IconComp
                    className={`h-[18px] w-[18px] transition-colors shrink-0 ${
                      isCatActive ? "text-[#1455D9]" : "text-[#52627A] group-hover:text-[#1455D9]"
                    }`}
                  />

                  {/* Category Name (14-15px) */}
                  <span className="leading-none">{cat.name}</span>

                  {/* Clean 3px Blue Underline Indicator directly under active item */}
                  {isCatActive && (
                    <span className="absolute -bottom-[9px] left-1 right-1 h-[3px] bg-[#1455D9] rounded-full shadow-2xs" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
