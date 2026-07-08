import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/application-confirmed")({
  head: () => ({ meta: [{ title: "Application Received — The Braid Expo" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <section className="mx-auto max-w-xl px-4 sm:px-6 py-24 text-center">
      <div className="h-16 w-16 mx-auto rounded-full bg-primary text-primary-foreground grid place-items-center"><Check className="h-8 w-8" /></div>
      <p className="mt-6 editorial-eyebrow">Application Received</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Welcome to the Expo.</h1>
      <p className="mt-4 text-muted-foreground">We'll review your application and reach out within 48 hours. Meanwhile, follow us for studio updates.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-foreground text-background h-12 px-7 items-center text-xs uppercase tracking-widest font-semibold">Back to home</Link>
    </section>
  ),
});
