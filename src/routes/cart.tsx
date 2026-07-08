import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/app-store";
import { X } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — The Braid Expo" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, setQty, subtotal } = useCart();
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
      <p className="editorial-eyebrow">Your Bag</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Cart</h1>

      {items.length === 0 ? (
        <div className="mt-12 text-center border border-border rounded-3xl p-14">
          <p className="text-muted-foreground">Your bag is empty.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary text-primary-foreground h-11 px-6 items-center text-xs uppercase tracking-widest font-semibold">Browse the shop</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <ul className="space-y-4">
            {items.map(({ product, qty }) => (
              <li key={product.id} className="flex gap-4 p-4 rounded-2xl border border-border bg-card">
                <img src={product.image} alt={product.name} width={100} height={100} className="h-24 w-24 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <button onClick={() => remove(product.id)} className="h-8 w-8 grid place-items-center rounded-full hover:bg-secondary" aria-label="Remove"><X className="h-4 w-4" /></button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center h-9 rounded-full border border-border text-sm">
                      <button onClick={() => setQty(product.id, qty - 1)} className="w-8">–</button>
                      <span className="w-8 text-center">{qty}</span>
                      <button onClick={() => setQty(product.id, qty + 1)} className="w-8">+</button>
                    </div>
                    <p className="font-semibold">${(product.price * qty).toFixed(2)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="rounded-3xl border border-border bg-card p-6 h-fit">
            <h2 className="font-serif text-xl">Order Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd></div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between text-base font-semibold"><dt>Total</dt><dd>${total.toFixed(2)}</dd></div>
            </dl>
            <Link to="/checkout" className="mt-6 flex rounded-full bg-primary text-primary-foreground h-12 items-center justify-center text-xs uppercase tracking-widest font-semibold">
              Checkout
            </Link>
            <p className="mt-3 text-[11px] text-center text-muted-foreground">Secure checkout via Square</p>
          </aside>
        </div>
      )}
    </section>
  );
}
