import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageShell";
import { Check } from "lucide-react";

export const Route = createFileRoute("/booth-rental")({
  head: () => ({
    meta: [
      { title: "Booth Rental — The Braid Expo" },
      { name: "description", content: "Rent a booth at The Braid Expo. Daily and weekly options for licensed braiders and stylists." },
    ],
    links: [{ rel: "canonical", href: "/booth-rental" }],
  }),
  component: BoothPage,
});

const PLANS = [
  { name: "Daily Booth Rental", price: 55, unit: "/ day", features: ["Access to studio Wi-Fi", "Shared reception", "Bring your own supplies", "Perfect for guest stylists"] },
  { name: "Weekly Booth Rental", price: 125, unit: "/ week", features: ["Everything in Daily", "Priority scheduling", "Featured in our stylist directory", "Storage locker access"], featured: true },
];

function BoothPage() {
  return (
    <>
      <PageHero eyebrow="For Stylists" title="Join The Braid Expo." subtitle="A polished studio, a community of stylists, and clients who take their beauty seriously." />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 grid gap-6 md:grid-cols-2">
        {PLANS.map(p => (
          <div key={p.name} className={`rounded-3xl border p-8 ${p.featured ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
            {p.featured && <p className="editorial-eyebrow text-primary">Most Popular</p>}
            <h2 className="mt-2 font-serif text-3xl">{p.name}</h2>
            <p className="mt-4 font-serif text-5xl">${p.price}<span className="text-base text-muted-foreground font-sans">{p.unit}</span></p>
            <ul className="mt-6 space-y-2 text-sm">
              {p.features.map(f => <li key={f} className="flex gap-2 items-start"><Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />{f}</li>)}
            </ul>
            <Link to="/apply" className="mt-8 flex rounded-full bg-foreground text-background h-12 items-center justify-center text-xs uppercase tracking-widest font-semibold">Apply Now</Link>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center pb-14">
        <h3 className="font-serif text-3xl">Ready to rent your booth?</h3>
        <p className="mt-3 text-muted-foreground">Fill out the braider application and we'll be in touch within 48 hours.</p>
        <Link to="/apply" className="mt-6 inline-flex rounded-full bg-primary text-primary-foreground h-12 px-8 items-center text-xs uppercase tracking-widest font-semibold">Start Application</Link>
      </section>
    </>
  );
}
