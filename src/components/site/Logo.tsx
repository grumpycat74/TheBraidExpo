export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo.svg`}
      alt="The Braid Expo"
      className={`inline-block h-[2.5em] w-auto ${className}`}
    />
  );
}
