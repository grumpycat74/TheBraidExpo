import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageShell";
import { lookbook } from "@/lib/data";
import { useBooking } from "@/lib/app-store";

const FILTERS = ["All", "Knotless", "Boho", "Stitch", "Kids", "Ponytails", "Locs"];

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook — The Braid Expo" },
      { name: "description", content: "A modern braid lookbook: knotless, boho, stitch, ponytails, and locs styled at The Braid Expo." },
    ],
    links: [{ rel: "canonical", href: "/lookbook" }],
  }),
  component: LookbookPage,
});

function LookbookPage() {
  const [f, setF] = useState("All");
  const { openBooking } = useBooking();
  const list = f === "All" ? lookbook : lookbook.filter(l => l.category === f);

  return (
    <>
      <PageHero eyebrow="Lookbook" title="The catalog." subtitle="Every look was made in this house. Tap one to book that exact vibe." />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex gap-2 flex-wrap justify-center">
          {FILTERS.map(x => (
            <button key={x} onClick={() => setF(x)} className={`h-10 px-5 rounded-full text-xs uppercase tracking-widest font-semibold border transition ${f === x ? "bg-foreground text-background border-foreground" : "border-border"}`}>{x}</button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 grid-cols-2 md:grid-cols-3">
          {list.map(l => (
            <figure key={l.id} className="group relative overflow-hidden rounded-3xl bg-secondary border border-border">
              <img src={l.image} alt={l.category} loading="lazy" width={800} height={1000} className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <figcaption className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => openBooking()} className="rounded-full bg-primary text-primary-foreground h-10 px-5 text-[10px] uppercase tracking-widest font-semibold">
                  Book This Look
                </button>
              </figcaption>
              <div className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest font-semibold border border-border">{l.category}</div>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
