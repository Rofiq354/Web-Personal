// ── Circuit Board Background ──────────────────────────────────────────────────
export default function CircuitBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-80 dark:opacity-70"
        style={{
          backgroundImage: "url('/circuit.svg')",
          backgroundSize: "350px 350px",
          backgroundRepeat: "repeat",
        }}
      />

      <div
        className="absolute inset-0 hidden dark:block opacity-15"
        style={{
          backgroundImage: "url('/circuit.svg')",
          backgroundSize: "120px 120px",
          backgroundRepeat: "repeat",
          filter: "invert(1) sepia(1) saturate(2) hue-rotate(5deg)",
        }}
      />

      <div
        className="absolute inset-0 animate-pulse"
        style={{
          backgroundImage: `radial-gradient(circle, color-mix(in srgb, var(--color-primary) 40%, transparent) 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
          backgroundPosition: "60px 60px",
          opacity: 0.2,
          animationDuration: "3s",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-b from-background/60 via-transparent to-background/60" />
      <div className="absolute inset-0 bg-linear-to-r from-background/50 via-transparent to-background/50" />
    </div>
  );
}
