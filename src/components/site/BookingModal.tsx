import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useBooking } from "@/lib/app-store";
import { BOOKING_FEE, services } from "@/lib/data";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, Lock } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const STEPS = ["Service", "Date & Time", "Your Info", "Payment"] as const;

function nextDates(n: number) {
  const out: Date[] = [];
  const today = new Date();
  for (let i = 1; i <= n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d);
  }
  return out;
}

const TIME_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];

export function BookingModal() {
  const { open, service, close, openBooking } = useBooking();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [info, setInfo] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (open) {
      setStep(0);
      setServiceId(service?.id ?? null);
      setDate(null);
      setTime(null);
      setInfo({ name: "", email: "", phone: "" });
    }
  }, [open, service]);

  const selected = useMemo(() => services.find(s => s.id === serviceId) ?? null, [serviceId]);
  const dates = useMemo(() => nextDates(14), []);

  const canNext =
    (step === 0 && selected) ||
    (step === 1 && date && time) ||
    (step === 2 && info.name && info.email && info.phone) ||
    step === 3;

  const submit = () => {
    close();
    navigate({ to: "/booking-confirmed" });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? openBooking(service) : close())}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-background border border-border rounded-3xl overflow-hidden max-h-[92vh] overflow-y-auto">
        <DialogTitle className="sr-only">Book an appointment</DialogTitle>
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-border/60">
          <div className="flex items-center justify-between">
            <p className="editorial-eyebrow">Book Your Appointment</p>
            <p className="text-xs text-muted-foreground">Step {step + 1} / {STEPS.length}</p>
          </div>
          <div className="mt-3 flex gap-1.5">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`} />
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 min-w-0">
          {step === 0 && (
            <div>
              <h2 className="font-serif text-2xl">Choose your style</h2>
              <p className="text-sm text-muted-foreground mt-1">Select a service to begin. A ${BOOKING_FEE} booking fee is required to secure your appointment.</p>
              <div className="mt-6 grid gap-2 max-h-80 overflow-y-auto pr-1">
                {services.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    className={`text-left p-4 rounded-2xl border transition flex items-center justify-between gap-4 ${serviceId === s.id ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30"}`}
                  >
                    <div className="min-w-0">
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{s.category} · {s.duration}</p>
                    </div>
                    <p className="text-sm font-semibold shrink-0">from ${s.price}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && selected && (
            <div>
              <h2 className="font-serif text-2xl">Pick a date & time</h2>
              <p className="text-sm text-muted-foreground mt-1">{selected.name} · {selected.duration}</p>

              <div className="mt-5">
                <p className="editorial-eyebrow mb-3">Select a date</p>
                <div className="flex flex-wrap gap-2">
                  {dates.map(d => {
                    const active = date?.toDateString() === d.toDateString();
                    return (
                      <button
                        key={d.toISOString()}
                        onClick={() => { setDate(d); setTime(null); }}
                        className={`shrink-0 w-16 h-20 rounded-2xl border flex flex-col items-center justify-center transition ${active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground/30"}`}
                      >
                        <span className="text-[10px] uppercase tracking-widest">{d.toLocaleDateString(undefined, { weekday: "short" })}</span>
                        <span className="text-xl font-serif">{d.getDate()}</span>
                        <span className="text-[10px] uppercase">{d.toLocaleDateString(undefined, { month: "short" })}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {date && (
                <div className="mt-6">
                  <p className="editorial-eyebrow mb-3">Available times</p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {TIME_SLOTS.map(t => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`h-11 rounded-full text-xs font-medium border transition ${time === t ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground/30"}`}
                      >{t}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-serif text-2xl">Your information</h2>
              <p className="text-sm text-muted-foreground mt-1">We'll send confirmation and reminders here.</p>
              <div className="mt-5 grid gap-3">
                <input placeholder="Full name" value={info.name} onChange={e => setInfo({ ...info, name: e.target.value })} className="h-12 px-4 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                <input placeholder="Email address" type="email" value={info.email} onChange={e => setInfo({ ...info, email: e.target.value })} className="h-12 px-4 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                <input placeholder="Phone number" type="tel" value={info.phone} onChange={e => setInfo({ ...info, phone: e.target.value })} className="h-12 px-4 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
            </div>
          )}

          {step === 3 && selected && date && time && (
            <div>
              <h2 className="font-serif text-2xl">Secure your booking</h2>
              <p className="text-sm text-muted-foreground mt-1">A ${BOOKING_FEE} booking fee is credited toward your final balance.</p>

              <div className="mt-5 p-5 rounded-2xl border border-border bg-secondary/40 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{selected.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">When</span><span className="font-medium">{date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })} · {time}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium">{selected.duration}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Service total</span><span className="font-medium">from ${selected.price}</span></div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between text-base"><span className="font-semibold">Booking fee (today)</span><span className="font-serif text-xl">${BOOKING_FEE}</span></div>
              </div>

              <div className="mt-4 p-4 rounded-xl border border-border text-xs text-muted-foreground flex items-start gap-3">
                <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                <p>Payments are processed securely via Square. By continuing you agree to our booking & cancellation policies.</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-3">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep(s => s - 1)} className="rounded-full">
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
          ) : <span />}
          {step < 3 ? (
            <Button disabled={!canNext} onClick={() => setStep(s => s + 1)} className="rounded-full bg-primary text-primary-foreground h-11 px-8 uppercase text-xs tracking-widest font-semibold">
              Continue
            </Button>
          ) : (
            <Button onClick={submit} className="rounded-full bg-primary text-primary-foreground h-11 px-8 uppercase text-xs tracking-widest font-semibold">
              <Check className="h-4 w-4" /> Pay ${BOOKING_FEE} & Confirm
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
