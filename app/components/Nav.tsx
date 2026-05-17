'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      nav.style.background =
        window.scrollY > 40 ? 'rgba(10,14,20,0.97)' : 'rgba(10,14,20,0.85)';
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-[200] flex h-16 items-center justify-between border-b border-line bg-charcoal/85 px-6 backdrop-blur-xl backdrop-saturate-150 md:px-14"
    >
      <a href="#" className="flex items-center">
        <Image
          src="/iterra%20labs%20white%20logo%20copy.png"
          alt="Iterra Labs"
          width={81}
          height={40}
          priority
          className="h-10 w-auto"
        />
      </a>

      <ul className="hidden items-center gap-9 md:flex">
        <li><a href="#about" className="text-[13px] font-medium text-muted tracking-[0.02em] transition-colors hover:text-white">About</a></li>
        <li><a href="#how" className="text-[13px] font-medium text-muted tracking-[0.02em] transition-colors hover:text-white">Process</a></li>
        <li><a href="#offerings" className="text-[13px] font-medium text-muted tracking-[0.02em] transition-colors hover:text-white">Services</a></li>
        <li>
          <a
            href="#contact"
            className="rounded-md bg-brand-blue px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.05em] text-charcoal transition-opacity hover:opacity-85"
          >
            Get in touch
          </a>
        </li>
      </ul>
    </nav>
  );
}
