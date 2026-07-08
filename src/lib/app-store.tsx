import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product, Service } from "./data";

// ------- Theme (light default; dark optional) -------
type Theme = "light" | "dark";
type ThemeCtx = { theme: Theme; toggle: () => void };
const ThemeContext = createContext<ThemeCtx | null>(null);

// ------- Cart -------
export type CartItem = { product: Product; qty: number };
type CartCtx = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
};
const CartContext = createContext<CartCtx | null>(null);

// ------- Booking modal -------
type BookingCtx = {
  open: boolean;
  service: Service | null;
  openBooking: (s?: Service | null) => void;
  close: () => void;
};
const BookingContext = createContext<BookingCtx | null>(null);

export function AppProviders({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<Service | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const t = localStorage.getItem("tbe-theme") as Theme | null;
      if (t) setTheme(t);
      const c = localStorage.getItem("tbe-cart");
      if (c) setItems(JSON.parse(c));
    } catch {}
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("tbe-theme", theme); } catch {}
  }, [theme, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem("tbe-cart", JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const themeCtx = useMemo<ThemeCtx>(() => ({
    theme,
    toggle: () => setTheme(t => (t === "light" ? "dark" : "light")),
  }), [theme]);

  const cartCtx = useMemo<CartCtx>(() => {
    const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);
    return {
      items,
      subtotal,
      count,
      add: (p, qty = 1) => setItems(prev => {
        const ex = prev.find(i => i.product.id === p.id);
        if (ex) return prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + qty } : i);
        return [...prev, { product: p, qty }];
      }),
      remove: (id) => setItems(prev => prev.filter(i => i.product.id !== id)),
      setQty: (id, qty) => setItems(prev => prev.map(i => i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i)),
      clear: () => setItems([]),
    };
  }, [items]);

  const bookingCtx = useMemo<BookingCtx>(() => ({
    open,
    service,
    openBooking: (s = null) => { setService(s ?? null); setOpen(true); },
    close: () => setOpen(false),
  }), [open, service]);

  return (
    <ThemeContext.Provider value={themeCtx}>
      <CartContext.Provider value={cartCtx}>
        <BookingContext.Provider value={bookingCtx}>
          {children}
        </BookingContext.Provider>
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const c = useContext(ThemeContext);
  if (!c) throw new Error("useTheme outside provider");
  return c;
};
export const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside provider");
  return c;
};
export const useBooking = () => {
  const c = useContext(BookingContext);
  if (!c) throw new Error("useBooking outside provider");
  return c;
};
