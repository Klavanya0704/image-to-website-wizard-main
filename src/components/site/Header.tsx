import { useState } from "react";
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
  Printer,
  Scissors,
  Settings,
  Cpu,
  Plane,
  Layers,
  Gift,
  Home,
  Box,
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

export function Header() {
  const { cartCount, wishlist } = useStore();
  const { user, isAdmin, displayName, signOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
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

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-card border-b border-[#DCE5F2]/80 dark:border-border/80">
      {/* Top Header Bar */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 h-[72px]">
        {/* Mobile Hamburger */}
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

              {/* Mobile Nav Links */}
              <nav className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
                {NAV_LINKS.map((link) => (
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

        {/* Brand / Logo Area */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Large Rounded Search Bar - Desktop Centered */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8 h-[46px] items-center rounded-full border border-[#DCE5F2] bg-[#F8FAFD] dark:bg-card p-1 focus-within:border-[#1455D9] focus-within:ring-2 focus-within:ring-[#1455D9]/15 shadow-none transition-all duration-200"
        >
          <input
            type="search"
            placeholder="Search for products, materials, services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent px-4 h-full text-sm text-[#0B1736] dark:text-white outline-none placeholder:text-[#52627A]/70"
          />
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 rounded-full bg-[#1455D9] hover:bg-[#0F44B2] text-white transition-transform active:scale-95 shrink-0 shadow-sm cursor-pointer"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Right side: Login / Signup, Wishlist, Cart */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
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

          {/* Cart Icon with Orange Badge from reference */}
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

      {/* Category Navigation Bar (Row 2) - Clean, Lightweight Line Tabs */}
      <div className="border-t border-[#DCE5F2]/60 dark:border-border/60 bg-white dark:bg-card h-[46px] flex items-center">
        <div className="mx-auto flex w-full max-w-[1400px] items-center px-4 sm:px-6 h-full">
          <nav className="flex-1 overflow-x-auto no-scrollbar flex items-center justify-start md:justify-center gap-6 sm:gap-8 h-full">
            {/* Home */}
            <Link
              to="/"
              className="flex items-center gap-1.5 py-2 text-xs font-bold transition-all relative whitespace-nowrap text-[#52627A] hover:text-[#1455D9] h-full"
              activeProps={{
                className: "text-[#1455D9] font-black is-active",
              }}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1455D9] rounded-full opacity-0 group-[.is-active]:opacity-100 [.is-active>&]:opacity-100 transition-opacity" />
            </Link>

            {/* 3D Printing */}
            <Link
              to="/category/$slug"
              params={{ slug: "3d-printing" }}
              className="flex items-center gap-1.5 py-2 text-xs font-semibold transition-all relative whitespace-nowrap text-[#52627A] hover:text-[#1455D9] h-full"
              activeProps={{
                className: "text-[#1455D9] font-black is-active",
              }}
            >
              <Box className="h-4 w-4" />
              <span>3D Printing</span>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1455D9] rounded-full opacity-0 [.is-active>&]:opacity-100 transition-opacity" />
            </Link>

            {/* Laser Cutting */}
            <Link
              to="/category/$slug"
              params={{ slug: "laser-cutting" }}
              className="flex items-center gap-1.5 py-2 text-xs font-semibold transition-all relative whitespace-nowrap text-[#52627A] hover:text-[#1455D9] h-full"
              activeProps={{
                className: "text-[#1455D9] font-black is-active",
              }}
            >
              <Scissors className="h-4 w-4" />
              <span>Laser Cutting</span>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1455D9] rounded-full opacity-0 [.is-active>&]:opacity-100 transition-opacity" />
            </Link>

            {/* CNC Machining */}
            <Link
              to="/category/$slug"
              params={{ slug: "cnc-machining" }}
              className="flex items-center gap-1.5 py-2 text-xs font-semibold transition-all relative whitespace-nowrap text-[#52627A] hover:text-[#1455D9] h-full"
              activeProps={{
                className: "text-[#1455D9] font-black is-active",
              }}
            >
              <Settings className="h-4 w-4" />
              <span>CNC Machining</span>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1455D9] rounded-full opacity-0 [.is-active>&]:opacity-100 transition-opacity" />
            </Link>

            {/* Electronics */}
            <Link
              to="/category/$slug"
              params={{ slug: "electronics" }}
              className="flex items-center gap-1.5 py-2 text-xs font-semibold transition-all relative whitespace-nowrap text-[#52627A] hover:text-[#1455D9] h-full"
              activeProps={{
                className: "text-[#1455D9] font-black is-active",
              }}
            >
              <Cpu className="h-4 w-4" />
              <span>Electronics</span>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1455D9] rounded-full opacity-0 [.is-active>&]:opacity-100 transition-opacity" />
            </Link>

            {/* Drones & Parts */}
            <Link
              to="/category/$slug"
              params={{ slug: "drones-parts" }}
              className="flex items-center gap-1.5 py-2 text-xs font-semibold transition-all relative whitespace-nowrap text-[#52627A] hover:text-[#1455D9] h-full"
              activeProps={{
                className: "text-[#1455D9] font-black is-active",
              }}
            >
              <Plane className="h-4 w-4" />
              <span>Drones &amp; Parts</span>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1455D9] rounded-full opacity-0 [.is-active>&]:opacity-100 transition-opacity" />
            </Link>

            {/* Acrylic Products */}
            <Link
              to="/category/$slug"
              params={{ slug: "acrylic-products" }}
              className="flex items-center gap-1.5 py-2 text-xs font-semibold transition-all relative whitespace-nowrap text-[#52627A] hover:text-[#1455D9] h-full"
              activeProps={{
                className: "text-[#1455D9] font-black is-active",
              }}
            >
              <Layers className="h-4 w-4" />
              <span>Acrylic Products</span>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1455D9] rounded-full opacity-0 [.is-active>&]:opacity-100 transition-opacity" />
            </Link>

            {/* DIY Kits */}
            <Link
              to="/category/$slug"
              params={{ slug: "diy-kits" }}
              className="flex items-center gap-1.5 py-2 text-xs font-semibold transition-all relative whitespace-nowrap text-[#52627A] hover:text-[#1455D9] h-full"
              activeProps={{
                className: "text-[#1455D9] font-black is-active",
              }}
            >
              <Gift className="h-4 w-4" />
              <span>DIY Kits</span>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1455D9] rounded-full opacity-0 [.is-active>&]:opacity-100 transition-opacity" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
