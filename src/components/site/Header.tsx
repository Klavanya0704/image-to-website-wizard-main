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
    bgClass: "bg-blue-50/80 group-hover:bg-blue-100",
  },
  {
    id: "laser-cutting",
    name: "Laser Cutting",
    to: "/category/$slug",
    params: { slug: "laser-cutting" },
    icon: IconLaserCutter,
    bgClass: "bg-red-50/80 group-hover:bg-red-100",
  },
  {
    id: "cnc-machining",
    name: "CNC Machining",
    to: "/category/$slug",
    params: { slug: "cnc-machining" },
    icon: IconCncMilling,
    bgClass: "bg-cyan-50/80 group-hover:bg-cyan-100",
  },
  {
    id: "electronics",
    name: "Electronics",
    to: "/category/$slug",
    params: { slug: "electronics" },
    icon: IconElectronics,
    bgClass: "bg-emerald-50/80 group-hover:bg-emerald-100",
  },
  {
    id: "drones-parts",
    name: "Drones & Parts",
    to: "/category/$slug",
    params: { slug: "drones-parts" },
    icon: IconDrone,
    bgClass: "bg-purple-50/80 group-hover:bg-purple-100",
  },
  {
    id: "acrylic-products",
    name: "Acrylic Products",
    to: "/category/$slug",
    params: { slug: "acrylic-products" },
    icon: IconAcrylic,
    bgClass: "bg-indigo-50/80 group-hover:bg-indigo-100",
  },
  {
    id: "diy-kits",
    name: "DIY Kits",
    to: "/category/$slug",
    params: { slug: "diy-kits" },
    icon: IconDiyKit,
    bgClass: "bg-amber-50/80 group-hover:bg-amber-100",
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
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-card border-b border-slate-100 dark:border-border shadow-xs">
      {/* =========================================================================
          ROW 1 — TOP PRIMARY HEADER ROW
         ========================================================================= */}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 lg:px-10 h-[80px]">
        {/* Mobile Hamburger Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-800">
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

              {/* Mobile Switcher */}
              <div className="p-3 border-b border-border bg-slate-50 flex items-center gap-2">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-medium ${
                    isStoreActive
                      ? "border border-slate-200 bg-white text-slate-700 shadow-xs"
                      : "bg-transparent text-slate-500"
                  }`}
                >
                  <Store className="h-4 w-4" />
                  <span>Store</span>
                </Link>

                <Link
                  to="/makerspace"
                  onClick={() => setMobileOpen(false)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-medium ${
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

        {/* Left: Brand Section + Portal Switcher Buttons */}
        <div className="flex items-center gap-5 shrink-0">
          <Logo />

          {/* Portal Switcher Buttons Side-by-Side */}
          <div className="hidden lg:flex items-center gap-2.5 ml-1">
            {/* Store Button */}
            <Link
              to="/"
              className={`border border-slate-200 bg-white text-slate-700 px-5 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-slate-50 transition-all text-sm cursor-pointer ${
                isStoreActive ? "ring-2 ring-blue-500/20 border-slate-300" : ""
              }`}
            >
              <Store className="h-4 w-4 text-blue-600" />
              <span>Store</span>
            </Link>

            {/* Makerspace Button */}
            <Link
              to="/makerspace"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium flex items-center gap-2 shadow-sm transition-all text-sm cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-white" />
              <span>Makerspace</span>
            </Link>
          </div>
        </div>

        {/* Central Search Input with Embedded Circular Blue Button */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex relative flex-1 max-w-xl mx-4 items-center"
        >
          <input
            type="search"
            placeholder="Search for products, materials, services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-full px-5 py-2.5 pr-12 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 rounded-full p-2 text-white absolute right-1.5 top-1/2 -translate-y-1/2 transition-transform active:scale-95 cursor-pointer flex items-center justify-center"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Right Action Controls: Login/Signup, Wishlist, Cart */}
        <div className="flex items-center gap-5 lg:gap-6 shrink-0">
          {/* Login / Signup */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors focus:outline-none cursor-pointer py-1.5">
                <User className="h-4 w-4 text-slate-600" />
                <span className="hidden sm:inline">
                  {user ? `Hi, ${displayName.split(" ")[0]}` : "Login / Signup"}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
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
                    className="text-destructive font-semibold"
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
            className="flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors p-1"
            title="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* Cart Icon with Blue Badge */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors p-1"
            title="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-2 -top-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-xs">
              {cartCount > 0 ? cartCount : 3}
            </span>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          ROW 2 — CATEGORY NAVIGATION BAR (Matching Reference Image)
         ========================================================================= */}
      <div className="border-t border-slate-100 bg-white shadow-2xs">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between py-2.5 px-4 sm:px-8 overflow-x-auto no-scrollbar gap-2">
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
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg group cursor-pointer shrink-0 transition-colors ${
                    isCatActive
                      ? "text-[#1455D9] font-bold border-b-2 border-[#1455D9] rounded-b-none"
                      : "text-slate-700 hover:text-[#1455D9] font-medium"
                  }`}
                >
                  <Home
                    className={`w-4 h-4 ${isCatActive ? "text-[#1455D9]" : "text-slate-600 group-hover:text-[#1455D9]"}`}
                  />
                  <span className="text-xs">{cat.name}</span>
                </Link>
              );
            }

            const IconComponent = cat.icon!;

            return (
              <Link
                key={cat.id}
                to={cat.to as any}
                params={cat.params as any}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg group cursor-pointer shrink-0 transition-colors ${
                  isCatActive
                    ? "text-[#1455D9] font-bold border-b-2 border-[#1455D9] rounded-b-none"
                    : "text-slate-700 hover:text-[#1455D9] font-medium"
                }`}
              >
                <div className={`p-1 rounded ${cat.bgClass} flex items-center justify-center`}>
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
