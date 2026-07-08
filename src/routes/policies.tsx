import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = [
  { q: "What is your booking fee policy?", a: "A $50 non-refundable booking fee is required to secure your appointment. It is credited toward your final service balance." },
  { q: "Cancellations and rescheduling", a: "Please give at least 48 hours notice to reschedule. Cancellations within 24 hours forfeit the booking fee." },
  { q: "Late arrivals", a: "A 15-minute grace period is offered. After that, we may need to reschedule and a late fee may apply." },
  { q: "No-shows", a: "No-shows forfeit the booking fee and may be asked to prepay in full for future appointments." },
  { q: "Remaining balance", a: "The remaining balance is due at the appointment in cash, card, or Square-supported payment methods." },
  { q: "Hair preparation", a: "Please arrive with hair freshly washed, blow-dried, and detangled unless a wash service was added." },
  { q: "Is hair included?", a: "Hair is included for most knotless and boho styles. Cornrow-only services do not include hair. Check the service card for details." },
  { q: "Extra charges", a: "Additional length, extra hair, and add-ons (beads, color, etc.) may add to your final total." },
  { q: "Product returns", a: "Unopened products may be returned within 14 days. Hair extensions and gift cards are final sale." },
];

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Policies & FAQ — The Braid Expo" },
      { name: "description", content: "Booking fee, cancellations, hair prep, and everything you need to know before your appointment." },
    ],
    links: [{ rel: "canonical", href: "/policies" }],
  }),
  component: Policies,
});

function Policies() {
  return (
    <>
      <PageHero eyebrow="Policies & FAQ" title="The fine print, in plain English." />
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
        <Accordion type="single" collapsible className="space-y-3">
          {FAQ.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`} className="rounded-2xl border border-border bg-card px-5">
              <AccordionTrigger className="text-left font-serif text-lg hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
