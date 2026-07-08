import { Link } from "@tanstack/react-router";
import { Home, Scissors, Calendar, ShoppingBag, MoreHorizontal } from "lucide-react";
import { useBooking } from "@/lib/app-store";

export function MobileBottomNav() {
  const { openBooking } = useBooking();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-16 text-[10px]">
        <Link to="/" className="flex flex-col items-center justify-center gap-1"><Home className="h-4 w-4" /><span>Home</span></Link>
        <Link to="/services" className="flex flex-col items-center justify-center gap-1"><Scissors className="h-4 w-4" /><span>Services</span></Link>
        <button onClick={() => openBooking()} className="relative flex flex-col items-center justify-center">
          <span className="absolute -top-5 h-12 w-12 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-lg shadow-primary/30">
            <Calendar className="h-5 w-5" />
          </span>
          <span className="mt-8 font-semibold text-primary">Book</span>
        </button>
        <Link to="/shop" className="flex flex-col items-center justify-center gap-1"><ShoppingBag className="h-4 w-4" /><span>Shop</span></Link>
        <Link to="/contact" className="flex flex-col items-center justify-center gap-1"><MoreHorizontal className="h-4 w-4" /><span>More</span></Link>
      </div>
    </nav>
  );
}
