const FOUNDERS = [
  {
    initials: "AK",
    avClass: "bg-gradient-to-br from-[#29adf0] to-[#1a85cc]",
    name: "Michael Dela Cruz",
    role: "Founder",
    bio: "20+ years of experience bridging business and technology across large-scale enterprise systems. He has a proven track record in deploying AI/ML platforms, building AI-as-a-Service tooling, and delivering scalable cloud-native solutions across Azure and AWS. As founder of Iterra Labs, Michael helps organizations turn complex data, AI, and cloud challenges into practical, production-ready business outcomes.",
  },
];

const VALUES: { title: string; desc: string; icon: React.ReactNode }[] = [
  {
    title: "Speed without shortcuts",
    desc: "We move fast because we've done this before. Experience is our shortcut — not sloppy code or skipped tests.",
    icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  },
  {
    title: "Radical transparency",
    desc: "You'll always know what we're doing, why, and what's coming. No surprises — ever.",
    icon: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: "Outcomes over outputs",
    desc: "Lines of code mean nothing if they don't move your business. We measure what actually matters.",
    icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
  },
  {
    title: "AI-first by default",
    desc: "We don't bolt on AI as an afterthought. Every product we architect considers AI augmentation from the first decision point.",
    icon: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
  },
];

export default function About() {
  return (
    <section id="about" className="bg-mist px-6 py-30">
      <div className="mx-auto max-w-180">
        <div>
          <span className="mb-4 block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-teal">
            About us
          </span>
          <h2 className="mb-4.5 font-display text-[clamp(30px,4vw,50px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-charcoal">
            Built from real-world industry experience.
          </h2>
          <p className="mx-auto mb-9 max-w-180 text-[16px] leading-[1.75] text-[#4a5a6e]">

            Iterra Labs is a boutique AI and cloud solutions provider based in
            Australia, giving ambitious startups and growing businesses access to
            the same caliber of AI engineering, cloud architecture, and product
            design that used to be reserved for billion-dollar organizations —
            with founder-led delivery from day one.
            <br />
            <br />
            After years of working across enterprise systems, cloud platforms, data
            engineering, and AI, we saw a clear need: businesses do not just need more
            technology advice. They need people who can understand the problem, design the
            right solution, and help deliver it properly
            <br />
            <br />
            Our model combines hands-on technical leadership with a trusted network of
            experienced professionals across AI, cloud, software engineering, data, and
            product delivery. This allows us to support clients with the focus of a
            specialist consultancy and the execution capability of a broader technology
            team.
            <br />
            <br />
            We enjoy working closely with businesses that want to modernize, move faster,
            and build systems that create real value — not just impressive demos.
          </p>
          {/*
          <div className="mb-12">
            <h3 className="mb-6 font-display text-[22px] font-bold tracking-[-0.02em] text-charcoal">
              Meet the founder
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {FOUNDERS.map((f) => (
                <article
                  key={f.name}
                  className="rounded-[10px] border border-[#e8edf4] bg-white p-5"
                >
                  <div
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full font-display text-[13px] font-bold text-white ${f.avClass}`}
                    aria-hidden="true"
                  >
                    {f.initials}
                  </div>
                  <h4 className="mb-0.5 font-display text-[15px] font-bold text-charcoal">
                    {f.name}
                  </h4>
                  <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-teal">
                    {f.role}
                  </p>
                  <p className="text-[13px] leading-[1.6] text-[#5a6a80]">{f.bio}</p>
                </article>
              ))}
            </div>
          </div> */}

          <div className="flex flex-col gap-4.5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="flex items-start gap-3.5 rounded-[10px] border border-[#e8edf4] bg-white p-4.5 transition-colors hover:border-brand-blue/30"
              >
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg border border-brand-blue/20 bg-gradient-to-br from-brand-blue/10 to-brand-teal/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#brand-grad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[15px] w-[15px]"
                  >
                    {v.icon}
                  </svg>
                </div>
                <div>
                  <div className="mb-0.5 font-display text-[14px] font-bold text-charcoal">
                    {v.title}
                  </div>
                  <div className="text-[13px] leading-[1.55] text-[#5a6a80]">
                    {v.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
