const REASONS: { title: string; desc: string; icon: React.ReactNode }[] = [
  {
    title: "Founder-led, start to finish",
    desc: "You'll work directly with the founder — on the sales call, through discovery, and across delivery. No account managers, no handoffs, no junior developers buffering your access. What you see is what you get, and what you get is senior expertise from day one.",
    icon: (
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    ),
  },
  {
    title: "No BS project management",
    desc: "Weekly demos you can actually react to. Async standups in plain English. A shared Slack channel where we respond within the hour — not the next business day.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </>
    ),
  },
  {
    title: "Startup-friendly pricing",
    desc: "Milestone-based payments, phased scopes, and equity conversations for the right fit. We're building a portfolio of great work, not just a revenue line.",
    icon: (
      <>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </>
    ),
  },
  {
    title: "Modular by design",
    desc: "Everything we build is fully documented and designed for a clean handoff — to your team, your next hire, or your next partner. No lock-in, no knowledge silos.",
    icon: (
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    ),
  },
  {
    title: "Experience you can feel",
    desc: "30+ combined years shipping for fintech, healthtech, and enterprise SaaS — the hard scaling problems, the production incidents, the compliance nightmares. That pattern recognition is in every decision we make.",
    icon: (
      <>
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </>
    ),
  },
  {
    title: "Quality without compromise",
    desc: "We left comfortable big-tech salaries because we care about craft. Every endpoint, every deployment, every architectural decision — done properly, tested thoroughly, built to last.",
    icon: (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    ),
  },
];

export default function WhyUs() {
  return (
    <section className="dot-bg-teal relative bg-surface px-6 py-30">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 text-center">
          <span className="mb-4 block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-teal">
            Why Iterra Labs
          </span>
          <h2 className="mb-4.5 font-display text-[clamp(30px,4vw,50px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white">
            The advantage of working
            <br />
            with people who&apos;ve been there.
          </h2>
          <p className="mx-auto max-w-[560px] text-[16px] leading-[1.75] text-muted">
            We&apos;re early stage — no case study wall yet. What we have is
            decades of hard-won, real-world engineering experience and the
            results will follow.
          </p>
        </div>

        <div className="mb-px grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="bg-surface-2 p-9 transition-colors hover:bg-surface-hi"
            >
              <div className="mb-4.5 flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-brand-blue/[0.06]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="url(#brand-grad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  {r.icon}
                </svg>
              </div>
              <div className="mb-2.5 font-display text-[16px] font-bold tracking-[-0.01em] text-white">
                {r.title}
              </div>
              <div className="text-[13px] leading-[1.65] text-muted">
                {r.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
