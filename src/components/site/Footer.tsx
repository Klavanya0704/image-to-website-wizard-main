import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B1736] text-white border-t border-[#1E325C]">
      {/* Main Footer Links */}
      <div className="mx-auto max-w-[1400px] grid gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <p className="text-lg font-black tracking-tight text-white">ACTE IDEA LAB</p>
          <p className="text-xs text-[#00AEEF] font-bold tracking-wider uppercase">
            Innovate. Create. Inspire.
          </p>
          <p className="text-xs opacity-70 leading-relaxed max-w-xs">
            A state-of-the-art college innovation hub and fabrication marketplace supporting student
            projects, research prototyping, startup ideas, and DIY kit learning.
          </p>
          {/* Socials */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-topbar-foreground/60 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-topbar-foreground/60 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-topbar-foreground/60 hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-topbar-foreground/60 hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase text-primary mb-4">
            Quick Links
          </p>
          <ul className="space-y-2.5 text-xs opacity-75">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-primary transition-colors">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link to="/bulk-orders" className="hover:text-primary transition-colors">
                Bulk Orders
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Categories */}
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase text-primary mb-4">
            Categories
          </p>
          <ul className="space-y-2.5 text-xs opacity-75">
            <li>
              <Link
                to="/category/$slug"
                params={{ slug: "3d-printing" }}
                className="hover:text-primary transition-colors"
              >
                3D Printing
              </Link>
            </li>
            <li>
              <Link
                to="/category/$slug"
                params={{ slug: "laser-cutting" }}
                className="hover:text-primary transition-colors"
              >
                Laser Cutting
              </Link>
            </li>
            <li>
              <Link
                to="/category/$slug"
                params={{ slug: "cnc-machining" }}
                className="hover:text-primary transition-colors"
              >
                CNC Machining
              </Link>
            </li>
            <li>
              <Link
                to="/category/$slug"
                params={{ slug: "electronics" }}
                className="hover:text-primary transition-colors"
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                to="/category/$slug"
                params={{ slug: "drones-parts" }}
                className="hover:text-primary transition-colors"
              >
                Drones & Parts
              </Link>
            </li>
            <li>
              <Link
                to="/category/$slug"
                params={{ slug: "acrylic-products" }}
                className="hover:text-primary transition-colors"
              >
                Acrylic Products
              </Link>
            </li>
            <li>
              <Link
                to="/category/$slug"
                params={{ slug: "diy-kits" }}
                className="hover:text-primary transition-colors"
              >
                DIY Kits
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Support */}
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase text-primary mb-4">Support</p>
          <ul className="space-y-2.5 text-xs opacity-75">
            <li>
              <Link to="/account" className="hover:text-primary transition-colors">
                My Account
              </Link>
            </li>
            <li>
              <Link to="/account/orders" className="hover:text-primary transition-colors">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/track-order" className="hover:text-primary transition-colors">
                Track Order
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-primary transition-colors">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-primary transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 5: Legal */}
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase text-primary mb-4">Legal</p>
          <ul className="space-y-2.5 text-xs opacity-75">
            <li>
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/refund-policy" className="hover:text-primary transition-colors">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/shipping-policy" className="hover:text-primary transition-colors">
                Shipping Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom copyright */}
      <div className="border-t border-topbar-foreground/10 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} AICTE IDEA Lab. All rights reserved. "Innovate. Create.
        Inspire."
      </div>
    </footer>
  );
}
