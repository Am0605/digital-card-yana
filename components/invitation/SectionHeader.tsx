export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-gold ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70 sm:w-16" />
      <svg viewBox="0 0 48 16" className="h-4 w-12 fill-current">
        <path d="M24 1.2c1.8 3.4 5.6 5.6 9.8 5.6 1.4 0 2.7-.2 3.9-.7-2.6 2.4-6.1 3.8-9.9 3.8-1.4 0-2.7-.2-3.8-.6-1.1.4-2.4.6-3.8.6-3.8 0-7.3-1.4-9.9-3.8 1.2.5 2.5.7 3.9.7 4.2 0 8-2.2 9.8-5.6Z" />
        <circle cx="24" cy="8.4" r="1.35" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70 sm:w-16" />
    </div>
  );
}

export function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="mb-3 text-center font-sans text-[0.7rem] font-medium uppercase tracking-[0.32em] text-gold-deep">
      {children}
    </p>
  );
}

export function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="text-center font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
      {children}
    </h2>
  );
}
