export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 font-serif leading-none ${className}`}>
      <span className="text-foreground font-black tracking-tight">The Braid</span>
      <span className="neon-aqua italic font-black tracking-widest">EXPO</span>
    </span>
  );
}
