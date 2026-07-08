import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-sm">
          <Logo className="text-2xl" />
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            A modern braiding house rooted in 90s Black beauty culture.
            Premium styles, elevated experience, content-worthy energy.
          </p>
          <form className="mt-6 flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 h-11 px-4 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button className="h-11 px-5 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-widest font-semibold">
              Join
            </button>
          </form>
        </div>

        <div>
          <h4 className="editorial-eyebrow text-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/shop" className="hover:text-primary">Shop</Link></li>
            <li><Link to="/lookbook" className="hover:text-primary">Lookbook</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/booth-rental" className="hover:text-primary">Booth Rental</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="editorial-eyebrow text-foreground">Care</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/policies" className="hover:text-primary">Policies & FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/apply" className="hover:text-primary">Braider Application</Link></li>
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} The Braid Expo. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="h-9 w-9 grid place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="TikTok" className="h-9 w-9 grid place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition text-[11px] font-bold">
              TT
            </a>
            <a href="#" aria-label="Pinterest" className="h-9 w-9 grid place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition text-[11px] font-bold">
              P
            </a>
            <a href="#" aria-label="Facebook" className="h-9 w-9 grid place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
