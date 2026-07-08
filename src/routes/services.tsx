import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageShell";
import { services, SERVICE_CATEGORIES } from "@/lib/data";
import { useBooking } from "@/lib/app-store";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — The Braid Expo" },
      { name: "description", content: "Knotless, boho, stitch, feed-in, kids, and loc styles. Book premium braiding services online." },
      { property: "og:title", content: "Services — The Braid Expo" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [cat, setCat] = useState<string>("All Services");
  const { openBooking } = useBooking();
  const filtered = cat === "All Services" ? services : services.filter(s => s.category === cat);

  return (
    <>
      <PageHero eyebrow="The Menu" title="Braids, done beautifully." subtitle="Every style is priced from — final total depends on length, size, and add-ons. A $50 booking fee secures your seat." />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
          {SERVICE_CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 h-10 px-5 rounded-full text-xs uppercase tracking-widest font-semibold border transition ${cat === c ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/30"}`}
            >{c}</button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(s => (
            <article key={s.id} className="group rounded-3xl overflow-hidden bg-card border border-border">
              <div className="aspect-[4/5] overflow-hidden bg-secondary">
                <img src={s.image} alt={s.name} loading="lazy" width={800} height={1000} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.category}</p>
                <h3 className="mt-1 font-serif text-2xl">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
                  <li>Duration: <span className="text-foreground font-medium">{s.duration}</span></li>
                  <li>Hair: <span className="text-foreground font-medium">{s.hairIncluded ? "Included" : "Not included"}</span></li>
                </ul>
                <div className="mt-5 flex items-center justify-between">
                  <p className="font-serif text-xl">from ${s.price}</p>
                  <button onClick={() => openBooking(s)} className="rounded-full bg-primary text-primary-foreground h-10 px-5 text-xs uppercase tracking-widest font-semibold">
                    Book This Style
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
