import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Calendar, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/lib/app-store";
import { services, products, BOOKING_FEE } from "@/lib/data";
import heroImg from "@/assets/hero-braids.jpg";
import studioImg from "@/assets/studio.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Braid Expo — New Braids, Who This?" },
      { name: "description", content: "Premium knotless, boho, stitch and loc styles. Book online, shop essentials, and step into a content-worthy braiding experience." },
      { property: "og:title", content: "The Braid Expo — New Braids, Who This?" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { openBooking } = useBooking();
  const featured = services.slice(0, 6);
  const shopPreview = products.slice(0, 4);
  const [quickServiceId, setQuickServiceId] = useState<string>(services[0].id);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-20 lg:pt-20 lg:pb-32 grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div className="relative z-10">
            <p className="editorial-eyebrow"><Sparkles className="inline h-3 w-3 -mt-0.5" /> Est. Salon · Beauty Studio · Booth Rentals</p>
            <h1 className="mt-5 font-serif text-[2.75rem] sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              New Braids,<br />
              <span className="italic">Who <span className="neon-aqua">This?</span></span>
            </h1>
            <p className="mt-6 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
              Premium braids, content-worthy energy, and a beauty experience that feels
              like your favorite 90s magazine cover — modernized, polished, unapologetically yours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => openBooking()} className="bg-primary text-primary-foreground rounded-full h-12 px-7 text-xs uppercase tracking-[0.2em] font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                Book Your Appointment <ArrowRight className="h-4 w-4" />
              </Button>
              <Link to="/services" className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-foreground/20 hover:border-foreground text-xs uppercase tracking-[0.2em] font-semibold transition">
                Explore Styles
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1 text-[color:var(--gold)]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-muted-foreground"><span className="font-semibold text-foreground">500+</span> happy clients this season</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-[color:var(--sun)] blur-3xl opacity-40" />
            <div className="absolute -bottom-8 -right-6 h-32 w-32 rounded-full bg-primary blur-3xl opacity-30" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-blush border border-[color:var(--gold)]/40 shadow-2xl shadow-primary/10">
              <img src={heroImg} alt="Editorial portrait of a woman with knotless braids and gold hoop earrings" className="h-full w-full object-cover" width={1024} height={1280} />
              <div className="absolute top-4 left-4 rounded-full bg-background/85 backdrop-blur px-4 py-2 text-[10px] uppercase tracking-[0.22em] font-semibold border border-border">
                <span className="neon-aqua">EXPO</span> · Spring '26
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK BOOK */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="rounded-3xl bg-card border border-border shadow-xl shadow-foreground/5 p-6 sm:p-8 grid gap-6 md:grid-cols-[1fr_auto] items-end">
          <div>
            <p className="editorial-eyebrow"><Calendar className="inline h-3 w-3 -mt-0.5" /> Quick Book</p>
            <h3 className="mt-2 font-serif text-2xl sm:text-3xl">Ready to sit in the chair?</h3>
            <p className="mt-1 text-sm text-muted-foreground">A ${BOOKING_FEE} booking fee is required to secure your appointment. Credited toward your final balance.</p>
            <div className="mt-5 grid sm:grid-cols-[1fr_auto] gap-3">
              <select
                value={quickServiceId}
                onChange={(e) => setQuickServiceId(e.target.value)}
                className="h-12 px-4 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label="Select service"
              >
                {services.map(s => <option key={s.id} value={s.id}>{s.name} — from ${s.price}</option>)}
              </select>
              <Button
                onClick={() => openBooking(services.find(s => s.id === quickServiceId) ?? null)}
                className="bg-primary text-primary-foreground rounded-full h-12 px-7 text-xs uppercase tracking-[0.2em] font-semibold"
              >
                Open Scheduler
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="editorial-eyebrow">Featured Services</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl max-w-xl">The chair is yours. Pick your look.</h2>
          </div>
          <Link to="/services" className="text-sm font-semibold underline underline-offset-4 hover:text-primary">See all services →</Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(s => (
            <article key={s.id} className="group rounded-3xl overflow-hidden bg-card border border-border hover:border-foreground/30 transition-all hover:-translate-y-1">
              <div className="aspect-[4/5] overflow-hidden bg-secondary">
                <img src={s.image} alt={s.name} loading="lazy" width={800} height={1000} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.category}</p>
                <h3 className="mt-1 font-serif text-xl">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{s.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-semibold">from ${s.price}</span>
                    <span className="text-muted-foreground"> · {s.duration}</span>
                  </div>
                  <button onClick={() => openBooking(s)} className="text-xs uppercase tracking-widest font-semibold text-primary hover:underline">Book →</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SHOP PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="editorial-eyebrow">Shop the Look</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl">Beauty essentials, curated.</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold underline underline-offset-4 hover:text-primary">Shop everything →</Link>
        </div>

        <div className="mt-10 grid gap-6 grid-cols-2 lg:grid-cols-4">
          {shopPreview.map(p => (
            <Link key={p.id} to="/shop/$productId" params={{ productId: p.id }} className="group">
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary border border-border">
                <img src={p.image} alt={p.name} loading="lazy" width={800} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-3 text-sm font-medium">{p.name}</p>
              <p className="text-sm text-muted-foreground">${p.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* BRAND MESSAGE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
        <div className="rounded-[2rem] overflow-hidden grid lg:grid-cols-2 border border-border">
          <div className="p-10 sm:p-14 bg-secondary/50 flex flex-col justify-center">
            <p className="editorial-eyebrow">The Braid Expo Experience</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-6xl leading-[0.95]">
              Good hair.<br /><span className="italic">Great <span className="neon-aqua">energy.</span></span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
              A modern braiding house rooted in 90s Black beauty culture. Come for the braids —
              stay for the community, the playlist, the vibe, and photos that belong on your feed.
            </p>
            <div className="mt-8 gold-divider max-w-24" />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/about" className="rounded-full border border-foreground/20 hover:border-foreground h-11 px-6 grid place-items-center text-xs uppercase tracking-[0.2em] font-semibold">Our Story</Link>
              <Link to="/booth-rental" className="rounded-full bg-foreground text-background h-11 px-6 grid place-items-center text-xs uppercase tracking-[0.2em] font-semibold">Braiders — Rent a Booth</Link>
            </div>
          </div>
          <div className="aspect-[4/3] lg:aspect-auto bg-blush">
            <img src={studioImg} alt="Inside The Braid Expo studio" loading="lazy" width={1200} height={900} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 text-center">
        <p className="editorial-eyebrow">Follow the moment</p>
        <h2 className="mt-2 font-serif text-3xl sm:text-5xl">@thebraidexpo</h2>
        <p className="mt-3 text-muted-foreground">Behind the chair, on the feed, on your For You.</p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="#" className="rounded-full border border-border px-5 h-10 grid place-items-center text-xs uppercase tracking-widest font-semibold hover:border-primary hover:text-primary">Instagram</a>
          <a href="#" className="rounded-full border border-border px-5 h-10 grid place-items-center text-xs uppercase tracking-widest font-semibold hover:border-primary hover:text-primary">TikTok</a>
          <a href="#" className="rounded-full border border-border px-5 h-10 grid place-items-center text-xs uppercase tracking-widest font-semibold hover:border-primary hover:text-primary">Pinterest</a>
        </div>
      </section>
    </>
  );
}
