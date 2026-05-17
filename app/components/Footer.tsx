import Image from "next/image";

export default function Footer() {
  return (
    <footer className="grid grid-cols-1 items-center gap-4 border-t border-line bg-charcoal px-6 py-7 text-center md:grid-cols-3 md:px-14">
      <a
        href="#"
        className="flex items-center justify-center gap-2.5 font-display text-[14px] font-bold tracking-[0.02em] text-white/50 md:justify-start"
      >
        <Image
          src="/iterra_labs_icon only.png"
          alt="Iterra Labs"
          width={15}
          height={30}
          className="h-[30px] w-auto"
        />
        Iterra Labs
      </a>

      <div className="flex justify-center gap-7">
        {[
          ["#about", "About"],
          ["#how", "Process"],
          ["#offerings", "Services"],

          ["#contact", "Contact"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="text-[12px] font-medium tracking-[0.04em] text-faint transition-colors hover:text-muted"
          >
            {label}
          </a>
        ))}
      </div>

      <p className="text-[12px] text-faint md:text-right">
        © 2026 Iterra Labs. All rights reserved.
      </p>
    </footer>
  );
}
