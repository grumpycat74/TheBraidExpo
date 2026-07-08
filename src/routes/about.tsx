import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageShell";
import { useBooking } from "@/lib/app-store";
import studio from "@/assets/studio.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Braid Expo" },
      { name: "description", content: "The story behind The Braid Expo — a modern braiding house rooted in 90s Black beauty culture." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { openBooking } = useBooking();
  return (
    <>
      <PageHero eyebrow="Our Story" title="A love letter to Black beauty." subtitle="Built on braids, community, culture, and a soft spot for the 90s magazine covers we grew up on." />
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <div className="rounded-3xl overflow-hidden aspect-[16/10] bg-blush border border-border">
          <img src={studio} alt="Inside the studio" loading="lazy" width={1200} height={900} className="h-full w-full object-cover" />
        </div>
        <div className="prose prose-neutral max-w-none">
          <p className="text-xl font-serif italic leading-relaxed">
            "I wanted a chair that felt like home, and a brand that felt like the cover of a magazine my mother used to buy."
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            The Braid Expo was born from years of braiding hair on the kitchen floor, in dorm rooms, and in
            borrowed booths. It's a modern beauty destination for the girl who wants her braids <em>and</em> the
            experience — clean space, curated playlists, thoughtful details, and finish work that photographs.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We serve women, kids, and clients across every texture. We host guest braiders. We stock the
            products we swear by. And we make room for the next generation of stylists through our booth rental program.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { k: "Founded", v: "2024" },
            { k: "Stylists", v: "6+" },
            { k: "Styles created", v: "1,200+" },
          ].map(x => (
            <div key={x.k} className="rounded-3xl border border-border p-6 bg-card text-center">
              <p className="editorial-eyebrow">{x.k}</p>
              <p className="mt-2 font-serif text-3xl">{x.v}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => openBooking()} className="rounded-full bg-primary text-primary-foreground h-12 px-7 text-xs uppercase tracking-widest font-semibold">Book with us</button>
          <a href="#" className="rounded-full border border-foreground/20 h-12 px-7 grid place-items-center text-xs uppercase tracking-widest font-semibold">Follow on Instagram</a>
        </div>
      </section>
    </>
  );
}
