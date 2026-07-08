import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/booking-confirmed")({
  head: () => ({ meta: [{ title: "Booking Confirmed — The Braid Expo" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <section className="mx-auto max-w-xl px-4 sm:px-6 py-24 text-center">
      <div className="h-16 w-16 mx-auto rounded-full bg-primary text-primary-foreground grid place-items-center"><Check className="h-8 w-8" /></div>
      <p className="mt-6 editorial-eyebrow">You're on the books</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">See you in the chair.</h1>
      <p className="mt-4 text-muted-foreground">A confirmation email and text reminder are on their way. Come with hair washed, blown out, and detangled.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-foreground text-background h-12 px-7 items-center text-xs uppercase tracking-widest font-semibold">Back to home</Link>
    </section>
  ),
});
