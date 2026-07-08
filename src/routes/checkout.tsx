import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/app-store";
import { Lock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — The Braid Expo" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    clear();
    toast.success("Order placed!");
    navigate({ to: "/" });
  };

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
      <p className="editorial-eyebrow">Checkout</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Almost yours.</h1>

      <form onSubmit={submit} className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <fieldset className="rounded-3xl border border-border p-6">
            <legend className="editorial-eyebrow px-2">Contact</legend>
            <div className="grid gap-3 sm:grid-cols-2 mt-3">
              <input required placeholder="Full name" className="h-11 px-4 rounded-full border border-border bg-background text-sm sm:col-span-2" />
              <input required type="email" placeholder="Email" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
              <input required type="tel" placeholder="Phone" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
            </div>
          </fieldset>
          <fieldset className="rounded-3xl border border-border p-6">
            <legend className="editorial-eyebrow px-2">Shipping</legend>
            <div className="grid gap-3 sm:grid-cols-2 mt-3">
              <input required placeholder="Street address" className="h-11 px-4 rounded-full border border-border bg-background text-sm sm:col-span-2" />
              <input required placeholder="City" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
              <input required placeholder="State" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
              <input required placeholder="ZIP" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
            </div>
          </fieldset>
          <fieldset className="rounded-3xl border border-border p-6">
            <legend className="editorial-eyebrow px-2">Payment</legend>
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2"><Lock className="h-3 w-3" /> Processed securely via Square.</p>
            <input required placeholder="Card number" className="mt-3 h-11 px-4 w-full rounded-full border border-border bg-background text-sm" />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <input required placeholder="MM / YY" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
              <input required placeholder="CVC" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
            </div>
          </fieldset>
        </div>

        <aside className="rounded-3xl border border-border bg-card p-6 h-fit">
          <h2 className="font-serif text-xl">Order Summary</h2>
          <ul className="mt-4 space-y-3 text-sm max-h-64 overflow-y-auto">
            {items.map(({ product, qty }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span className="min-w-0 truncate">{product.name} × {qty}</span>
                <span className="shrink-0 font-medium">${(product.price * qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="h-px bg-border my-4" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd></div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-border"><dt>Total</dt><dd>${total.toFixed(2)}</dd></div>
          </dl>
          <button className="mt-6 w-full rounded-full bg-primary text-primary-foreground h-12 text-xs uppercase tracking-widest font-semibold">Place Order</button>
        </aside>
      </form>
    </section>
  );
}
