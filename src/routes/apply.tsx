import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageShell";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

const STEPS = ["Personal", "Professional", "Employment", "Rental", "References", "Sign"] as const;
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Braider Application — The Braid Expo" },
      { name: "description", content: "Apply to join The Braid Expo as a booth-rental stylist. Daily and weekly options." },
    ],
    links: [{ rel: "canonical", href: "/apply" }],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [days, setDays] = useState<string[]>([]);

  const toggleDay = (d: string) => setDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

  return (
    <>
      <PageHero eyebrow="Application" title="Braider application." subtitle="Tell us about you and your work. Takes about 6 minutes." />
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex gap-1.5 mb-8">
          {STEPS.map((_, i) => <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`} />)}
        </div>
        <p className="editorial-eyebrow">Step {step + 1} of {STEPS.length} · {STEPS[step]}</p>

        <form
          onSubmit={(e) => { e.preventDefault(); if (step < STEPS.length - 1) setStep(step + 1); else navigate({ to: "/application-confirmed" }); }}
          className="mt-6 rounded-3xl border border-border bg-card p-6 sm:p-8"
        >
          {step === 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              <input required placeholder="Full name" className="h-11 px-4 rounded-full border border-border bg-background text-sm sm:col-span-2" />
              <input required type="tel" placeholder="Phone" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
              <input required type="email" placeholder="Email" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
              <input required placeholder="Street address" className="h-11 px-4 rounded-full border border-border bg-background text-sm sm:col-span-2" />
              <input required placeholder="City" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
              <input required placeholder="State" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
              <input required placeholder="ZIP code" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-3">
              <input required placeholder="What type of stylist are you?" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
              <div className="grid sm:grid-cols-2 gap-3">
                <input required placeholder="Years of experience" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
                <select className="h-11 px-4 rounded-full border border-border bg-background text-sm">
                  <option>Are you licensed?</option><option>Yes</option><option>No</option>
                </select>
                <select className="h-11 px-4 rounded-full border border-border bg-background text-sm">
                  <option>Do you currently have clients?</option><option>Yes</option><option>No</option>
                </select>
                <input placeholder="Clients per week" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
              </div>
              <input placeholder="Portfolio URL / Instagram handle" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
              <textarea placeholder="Specialty services" rows={3} className="px-4 py-3 rounded-2xl border border-border bg-background text-sm" />
              <select className="h-11 px-4 rounded-full border border-border bg-background text-sm">
                <option>Are you authorized to work in the United States?</option><option>Yes</option><option>No</option>
              </select>
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-3">
              <input placeholder="Previous employer" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
              <input placeholder="Position held" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
              <input placeholder="Length of employment" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
            </div>
          )}
          {step === 3 && (
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="rounded-2xl border border-border p-4 flex items-center gap-3 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input type="radio" name="plan" required /> <div><p className="font-medium">Daily — $55</p><p className="text-xs text-muted-foreground">Best for guest stylists</p></div>
                </label>
                <label className="rounded-2xl border border-border p-4 flex items-center gap-3 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input type="radio" name="plan" required /> <div><p className="font-medium">Weekly — $125</p><p className="text-xs text-muted-foreground">Best for regulars</p></div>
                </label>
              </div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Preferred start date</label>
              <input required type="date" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Availability</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {DAYS.map(d => (
                    <button key={d} type="button" onClick={() => toggleDay(d)} className={`h-9 px-4 rounded-full text-xs uppercase tracking-widest font-semibold border ${days.includes(d) ? "bg-foreground text-background border-foreground" : "border-border"}`}>{d.slice(0, 3)}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="grid gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-2xl border border-border p-4">
                  <p className="editorial-eyebrow">Reference {i}</p>
                  <div className="grid sm:grid-cols-3 gap-3 mt-3">
                    <input required placeholder="Name" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
                    <input required placeholder="Phone" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
                    <input required placeholder="Relationship" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {step === 5 && (
            <div className="grid gap-4">
              <p className="text-sm text-muted-foreground">By signing you confirm the information above is accurate.</p>
              <input required placeholder="Type your full name to sign" className="h-14 px-5 rounded-2xl border border-border bg-background text-lg font-serif italic" />
              <input required type="date" className="h-11 px-4 rounded-full border border-border bg-background text-sm" />
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1 h-11 px-5 rounded-full border border-border text-xs uppercase tracking-widest font-semibold">
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
            ) : <span />}
            <button className="rounded-full bg-primary text-primary-foreground h-11 px-7 text-xs uppercase tracking-widest font-semibold">
              {step < STEPS.length - 1 ? "Continue" : "Submit Application"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
