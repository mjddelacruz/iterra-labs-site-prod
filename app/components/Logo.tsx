type LogoProps = {
  prefix: string;
  className?: string;
};

export default function Logo({ prefix, className }: LogoProps) {
  return (
    <svg viewBox="0 0 56 76" fill="none" className={className}>
      <path d="M18 0L44 0L38 24L12 24Z" fill={`url(#${prefix}-a)`} />
      <path d="M10 28L36 28L28 52L2 52Z" fill={`url(#${prefix}-b)`} />
      <path d="M4 56L24 56L30 76L10 76Z" fill={`url(#${prefix}-c)`} />
      <defs>
        <linearGradient id={`${prefix}-a`} x1="12" y1="0" x2="44" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#29adf0" />
          <stop offset="1" stopColor="#48c4f8" />
        </linearGradient>
        <linearGradient id={`${prefix}-b`} x1="2" y1="28" x2="36" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2dd4a0" />
          <stop offset="1" stopColor="#1b9e78" />
        </linearGradient>
        <linearGradient id={`${prefix}-c`} x1="4" y1="56" x2="30" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1b7a52" />
          <stop offset="1" stopColor="#0f4d34" />
        </linearGradient>
      </defs>
    </svg>
  );
}
