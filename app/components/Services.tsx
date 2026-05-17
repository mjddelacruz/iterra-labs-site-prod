const SERVICES: { num: string; name: string; desc: string; icon: React.ReactNode }[] = [
  {
    num: '01',
    name: 'Product Engineering',
    desc: 'End-to-end development from MVP to production-scale. Full-stack web, mobile, or API products — designed, built, tested, and shipped. Then we stay on to help you scale what works.',
    icon: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
  },
  {
    num: '02',
    name: 'AI & Machine Learning',
    desc: 'Custom AI models, LLM-powered features, intelligent document processing, and end-to-end ML pipelines. We turn raw data into a product differentiator — not just a dashboard nobody checks.',
    icon: (
      <>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </>
    ),
  },
  {
    num: '03',
    name: 'Cloud & Infrastructure',
    desc: 'Cloud-native architecture on AWS, GCP, or Azure. CI/CD, Kubernetes, infrastructure-as-code, and cost optimization — built secure and resilient from day one, not bolted on later.',
    icon: (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </>
    ),
  },
  {
    num: '04',
    name: 'UX & Design Systems',
    desc: 'User research, interaction design, and scalable design systems built in Figma and shipped in code. We make your product feel as good as it works.',
    icon: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </>
    ),
  },
  {
    num: '05',
    name: 'Technical Strategy',
    desc: "Architecture reviews, technology selection, build-vs-buy analysis, and AI adoption roadmaps. We help founders make the decisions that compound — and avoid the ones that don't.",
    icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
  },
  {
    num: '06',
    name: 'Embedded Teams',
    desc: 'Dedicated senior engineers who embed directly in your team — your tools, your standups, your culture. Sustained capacity without the overhead of hiring.',
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
];

export default function Services() {
  return (
    <section id="offerings" className="relative overflow-hidden bg-charcoal px-6 py-30">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-4 block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-teal">
              Services
            </span>
            <h2 className="font-display text-[clamp(30px,4vw,50px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white">
              What we build with you.
            </h2>
          </div>
          <a href="#contact" className="whitespace-nowrap text-[13px] font-semibold tracking-[0.04em] text-brand-teal">
            TALK ABOUT YOUR PROJECT →
          </a>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.num}
              className="card-grad-top bg-surface px-8 py-9 transition-colors hover:bg-surface-2"
            >
              <span className="mb-7 block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-faint">
                {s.num}
              </span>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-brand-blue/8">
                <svg viewBox="0 0 24 24" fill="none" stroke="url(#brand-grad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5">
                  {s.icon}
                </svg>
              </div>
              <div className="mb-2.5 font-display text-[17px] font-bold tracking-[-0.01em] text-white">
                {s.name}
              </div>
              <div className="text-[13px] leading-[1.65] text-muted">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
