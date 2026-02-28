// ── Circuit Board SVG Background ─────────────────────────────────────────────
export default function CircuitBackground() {
  const horizontalLines = [
    { y: 80, x1: 0, x2: 200 },
    { y: 80, x1: 260, x2: 420 },
    { y: 80, x1: 480, x2: 650 },
    { y: 80, x1: 710, x2: 900 },
    { y: 80, x1: 960, x2: 1200 },
    { y: 180, x1: 0, x2: 120 },
    { y: 180, x1: 180, x2: 380 },
    { y: 180, x1: 440, x2: 560 },
    { y: 180, x1: 620, x2: 820 },
    { y: 180, x1: 880, x2: 1200 },
    { y: 280, x1: 0, x2: 300 },
    { y: 280, x1: 360, x2: 500 },
    { y: 280, x1: 560, x2: 740 },
    { y: 280, x1: 800, x2: 1000 },
    { y: 280, x1: 1060, x2: 1200 },
    { y: 380, x1: 0, x2: 160 },
    { y: 380, x1: 220, x2: 460 },
    { y: 380, x1: 520, x2: 680 },
    { y: 380, x1: 740, x2: 900 },
    { y: 380, x1: 960, x2: 1200 },
    { y: 480, x1: 0, x2: 240 },
    { y: 480, x1: 300, x2: 540 },
    { y: 480, x1: 600, x2: 780 },
    { y: 480, x1: 840, x2: 1200 },
  ];

  const verticalLines = [
    { x: 120, y1: 80, y2: 180 },
    { x: 120, y1: 280, y2: 380 },
    { x: 240, y1: 180, y2: 280 },
    { x: 240, y1: 380, y2: 480 },
    { x: 360, y1: 80, y2: 180 },
    { x: 360, y1: 280, y2: 380 },
    { x: 480, y1: 180, y2: 280 },
    { x: 480, y1: 380, y2: 480 },
    { x: 600, y1: 80, y2: 180 },
    { x: 600, y1: 280, y2: 380 },
    { x: 720, y1: 180, y2: 280 },
    { x: 720, y1: 380, y2: 480 },
    { x: 840, y1: 80, y2: 180 },
    { x: 840, y1: 280, y2: 380 },
    { x: 960, y1: 180, y2: 280 },
    { x: 960, y1: 380, y2: 480 },
    { x: 1080, y1: 80, y2: 180 },
    { x: 1080, y1: 280, y2: 480 },
  ];

  const nodes = [
    { cx: 120, cy: 80 },
    { cx: 240, cy: 180 },
    { cx: 360, cy: 80 },
    { cx: 480, cy: 180 },
    { cx: 600, cy: 80 },
    { cx: 720, cy: 180 },
    { cx: 840, cy: 80 },
    { cx: 960, cy: 180 },
    { cx: 1080, cy: 80 },
    { cx: 120, cy: 280 },
    { cx: 240, cy: 380 },
    { cx: 360, cy: 280 },
    { cx: 480, cy: 380 },
    { cx: 600, cy: 280 },
    { cx: 720, cy: 380 },
    { cx: 840, cy: 280 },
    { cx: 960, cy: 380 },
    { cx: 1080, cy: 280 },
    { cx: 120, cy: 480 },
    { cx: 360, cy: 480 },
    { cx: 600, cy: 480 },
    { cx: 840, cy: 480 },
    { cx: 1080, cy: 480 },
  ];

  const pulses = [
    {
      path: "M0,80 L200,80 L200,180 L380,180 L380,80 L650,80",
      delay: 0,
      dur: 3,
    },
    {
      path: "M0,280 L300,280 L300,180 L560,180 L560,280 L740,280",
      delay: 0.8,
      dur: 3.5,
    },
    {
      path: "M0,480 L240,480 L240,380 L460,380 L460,480 L780,480",
      delay: 1.6,
      dur: 2.8,
    },
    { path: "M1200,180 L880,180 L880,80 L710,80", delay: 0.4, dur: 3.2 },
    {
      path: "M1200,380 L1000,380 L1000,280 L800,280 L800,380 L680,380",
      delay: 1.2,
      dur: 4,
    },
    {
      path: "M600,80 L600,180 L720,180 L720,280 L840,280 L840,180 L960,180 L960,80",
      delay: 2,
      dur: 3.8,
    },
  ];

  return (
    // "text-primary" → currentColor = nilai --primary dari tema aktif
    <div className="absolute inset-0 -z-10 overflow-hidden text-primary">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 560"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="glow-strong"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Garis horizontal ───────────────────────────────────────── */}
        {horizontalLines.map((l, i) => (
          <line
            key={`h-${i}`}
            x1={l.x1}
            y1={l.y}
            x2={l.x2}
            y2={l.y}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}

        {/* ── Garis vertikal ─────────────────────────────────────────── */}
        {verticalLines.map((l, i) => (
          <line
            key={`v-${i}`}
            x1={l.x}
            y1={l.y1}
            x2={l.x}
            y2={l.y2}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}

        {/* ── Node / solder joints ───────────────────────────────────── */}
        {nodes.map((n, i) => (
          <g key={`n-${i}`}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.35"
            />
            <circle
              cx={n.cx}
              cy={n.cy}
              r="2"
              fill="currentColor"
              opacity="0.4"
            />
          </g>
        ))}

        {/* ── Pulse dot yang berlari ─────────────────────────────────── */}
        {pulses.map((p, i) => (
          <g key={`pulse-${i}`}>
            <path id={`track-${i}`} d={p.path} fill="none" stroke="none" />

            {/* Trail glow */}
            <path
              d={p.path}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              opacity="0"
              filter="url(#glow-strong)"
            >
              <animate
                attributeName="opacity"
                values="0;0.5;0"
                dur={`${p.dur}s`}
                repeatCount="indefinite"
                begin={`${p.delay}s`}
              />
            </path>

            {/* Dot */}
            <circle r="3.5" fill="currentColor" filter="url(#glow-strong)">
              <animateMotion
                dur={`${p.dur}s`}
                repeatCount="indefinite"
                begin={`${p.delay}s`}
              >
                <mpath href={`#track-${i}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.9;1"
                dur={`${p.dur}s`}
                repeatCount="indefinite"
                begin={`${p.delay}s`}
              />
            </circle>
          </g>
        ))}

        {/* ── Node berkedip ──────────────────────────────────────────── */}
        {nodes
          .filter((_, i) => i % 3 === 0)
          .map((n, i) => (
            <circle
              key={`blink-${i}`}
              cx={n.cx}
              cy={n.cy}
              r="3"
              fill="currentColor"
              filter="url(#glow)"
            >
              <animate
                attributeName="opacity"
                values="0;0.9;0;0.7;0"
                dur={`${2 + i * 0.7}s`}
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
              />
            </circle>
          ))}
      </svg>
    </div>
  );
}
