import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { products } from "@/lib/data";
import { useCart } from "@/lib/app-store";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/shop/$productId")({
  loader: ({ params }) => {
    const product = products.find(p => p.id === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.name} — Shop` : "Product" },
      { name: "description", content: loaderData?.product.description ?? "" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
      <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> Back to shop
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="aspect-square rounded-3xl overflow-hidden bg-secondary border border-border">
          <img src={product.image} alt={product.name} width={800} height={800} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="editorial-eyebrow">{product.category}</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-serif">${product.price}</p>
          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center h-12 rounded-full border border-border">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-11 h-full">–</button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-11 h-full">+</button>
            </div>
            <button onClick={() => { add(product, qty); toast.success("Added to cart"); }} className="flex-1 rounded-full bg-primary text-primary-foreground h-12 px-6 text-xs uppercase tracking-widest font-semibold">
              Add to Cart
            </button>
          </div>

          <div className="mt-10 gold-divider" />
          <ul className="mt-6 text-sm text-muted-foreground space-y-2">
            <li>✦ Ships within 2–3 business days</li>
            <li>✦ Free shipping on orders over $75</li>
            <li>✦ Available for pickup at the studio</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
