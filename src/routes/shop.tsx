import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageShell";
import { products, PRODUCT_CATEGORIES } from "@/lib/data";
import { useCart } from "@/lib/app-store";
import { toast } from "sonner";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — The Braid Expo" },
      { name: "description", content: "Braiding hair, edge control, silk bonnets, oils, and gift cards. Beauty essentials curated by The Braid Expo." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");
  const { add } = useCart();

  let list = cat === "All" ? products : products.filter(p => p.category === cat);
  if (q) list = list.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <>
      <PageHero eyebrow="Beauty Supply" title="Shop the essentials." subtitle="Everything we use in the chair — bottled, boxed, and ready to travel home with you." />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <div className="flex gap-2 overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap">
            {PRODUCT_CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`shrink-0 h-9 px-4 rounded-full text-xs uppercase tracking-widest font-semibold border transition ${cat === c ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/30"}`}>{c}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products..." className="h-10 px-4 rounded-full border border-border bg-background text-sm w-full lg:w-56 focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <select value={sort} onChange={e => setSort(e.target.value as "featured" | "low" | "high")} className="h-10 px-3 rounded-full border border-border bg-background text-sm">
              <option value="featured">Featured</option>
              <option value="low">Price: Low</option>
              <option value="high">Price: High</option>
            </select>
          </div>
        </div>

        <div className="mt-10 grid gap-6 grid-cols-2 lg:grid-cols-4">
          {list.map(p => (
            <div key={p.id} className="group">
              <Link to="/shop/$productId" params={{ productId: p.id }} className="block aspect-square rounded-2xl overflow-hidden bg-secondary border border-border">
                <img src={p.image} alt={p.name} loading="lazy" width={800} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </Link>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{p.category}</p>
                  <Link to="/shop/$productId" params={{ productId: p.id }} className="font-medium text-sm hover:underline">{p.name}</Link>
                  <p className="text-sm">${p.price}</p>
                </div>
                <button onClick={() => { add(p); toast.success("Added to cart"); }} className="shrink-0 h-9 px-3 rounded-full bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-semibold">Add</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
