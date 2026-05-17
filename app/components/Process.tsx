const PHASES: { num: string; title: string; desc: string; icon: React.ReactNode }[] = [
  {
    num: 'PHASE 01',
    title: 'Discover',
    desc: 'Deep-dive into your business, users, and competitive landscape. No assumptions — rigorous discovery before a single line of code is written. Typically 1–2 weeks.',
    icon: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
  },
  {
    num: 'PHASE 02',
    title: 'Design',
    desc: "Wireframes, interactive prototypes, and a complete design system built collaboratively. You approve what we're building before engineering begins.",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </>
    ),
  },
  {
    num: 'PHASE 03',
    title: 'Build',
    desc: "Two-week agile sprints. A live demo every sprint. Daily async standups in your Slack. You're never left wondering what's happening or why a decision was made.",
    icon: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
  },
  {
    num: 'PHASE 04',
    title: 'Launch & Grow',
    desc: "We deploy, monitor production metrics, and run structured post-launch iterations. The relationship doesn't end at launch — we stay on as a growth partner.",
    icon: (
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </>
    ),
  },
];

export default function Process() {
  return (
    <section id="how" className="dot-bg-blue relative overflow-hidden bg-surface px-6 py-30">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-18 text-center">
          <span className="mb-4 block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-teal">
            Our process
          </span>
          <h2 className="mb-4.5 font-display text-[clamp(30px,4vw,50px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white">
            A clear path from idea to impact.
          </h2>
          <p className="mx-auto max-w-[560px] text-[16px] leading-[1.75] text-muted">
            Every engagement follows a proven four-phase process designed to reduce risk, stay on budget, and consistently deliver production-grade work.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((p) => (
            <div
              key={p.num}
              className="card-grad-bot relative bg-surface-2 px-8 py-10 transition-colors hover:bg-surface-hi"
            >
              <span className="mb-6 block font-display text-[11px] font-bold tracking-[0.14em] text-brand-teal">
                {p.num}
              </span>
              <div className="mb-5 flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-line bg-brand-blue/8">
                <svg viewBox="0 0 24 24" fill="none" stroke="url(#brand-grad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  {p.icon}
                </svg>
              </div>
              <div className="mb-2.5 font-display text-[17px] font-bold tracking-[-0.01em] text-white">
                {p.title}
              </div>
              <div className="text-[13px] leading-[1.65] text-muted">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
