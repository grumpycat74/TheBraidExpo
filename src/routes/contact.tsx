import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageShell";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Braid Expo" },
      { name: "description", content: "Get in touch with The Braid Expo. Phone, email, address, and studio hours." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="Say Hi" title="Let's talk beauty." subtitle="Booking questions, press, or partnerships — send it over." />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          {[
            { i: Phone, l: "Phone", v: "(555) 123-BRAID" },
            { i: Mail, l: "Email", v: "hello@thebraidexpo.com" },
            { i: MapPin, l: "Studio", v: "123 Beauty Ave, Atlanta, GA" },
            { i: Clock, l: "Hours", v: "Tue–Sat 9AM–7PM · Sun 11AM–5PM" },
          ].map(({ i: Icon, l, v }) => (
            <div key={l} className="flex gap-4 items-start">
              <div className="h-11 w-11 shrink-0 rounded-full bg-secondary grid place-items-center"><Icon className="h-4 w-4" /></div>
              <div>
                <p className="editorial-eyebrow">{l}</p>
                <p className="mt-1 font-serif text-lg">{v}</p>
              </div>
            </div>
          ))}
          <div className="aspect-video rounded-3xl overflow-hidden border border-border bg-secondary grid place-items-center text-sm text-muted-foreground">
            Map preview
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); toast.success("Message sent!"); }} className="rounded-3xl border border-border bg-card p-6 sm:p-8 h-fit">
          <h2 className="font-serif text-2xl">Send a message</h2>
          <div className="mt-5 grid gap-3">
            <input required placeholder="Name" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
            <input required type="email" placeholder="Email" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
            <input placeholder="Subject" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
            <textarea required rows={5} placeholder="Message" className="px-4 py-3 rounded-2xl border border-border bg-background text-sm" />
            <button className="mt-2 rounded-full bg-primary text-primary-foreground h-12 text-xs uppercase tracking-widest font-semibold">Send Message</button>
          </div>
        </form>
      </section>
    </>
  );
}
