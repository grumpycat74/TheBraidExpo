import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { useBooking, useCart, useTheme } from "@/lib/app-store";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/shop", label: "Shop" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/about", label: "About" },
  { to: "/booth-rental", label: "Booth Rental" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { openBooking } = useBooking();
  const { count } = useCart();
  const { theme, toggle } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/85 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="shrink-0">
          <Logo className="text-lg sm:text-xl" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {NAV.map(n => (
            <Link
              key={n.to}
              to={n.to}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-9 w-9 grid place-items-center rounded-full hover:bg-secondary transition"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <Link to="/cart" aria-label="Cart" className="relative h-9 w-9 grid place-items-center rounded-full hover:bg-secondary transition">
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] grid place-items-center">
                {count}
              </span>
            )}
          </Link>
          <Button
            onClick={() => openBooking()}
            className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 h-9 text-xs tracking-widest uppercase font-semibold"
          >
            Book Now
          </Button>

          <Sheet open={openMenu} onOpenChange={setOpenMenu}>
            <SheetTrigger asChild>
              <button className="lg:hidden h-9 w-9 grid place-items-center rounded-full hover:bg-secondary transition" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] sm:w-96 bg-background border-l border-border p-0">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <Logo className="text-lg" />
                <button onClick={() => setOpenMenu(false)} className="h-8 w-8 grid place-items-center rounded-full hover:bg-secondary" aria-label="Close menu">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="p-5 flex flex-col gap-1">
                {NAV.map(n => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpenMenu(false)}
                    className="text-2xl font-serif py-2.5 border-b border-border/60"
                  >
                    {n.label}
                  </Link>
                ))}
                <Button
                  onClick={() => { setOpenMenu(false); openBooking(); }}
                  className="mt-6 bg-primary text-primary-foreground rounded-full h-12 text-xs tracking-widest uppercase font-semibold"
                >
                  Book Your Appointment
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
