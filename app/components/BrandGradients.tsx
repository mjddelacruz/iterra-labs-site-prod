/**
 * Hidden SVG that defines the brand gradient once.
 * Every icon in the page references it via stroke="url(#brand-grad)".
 * This avoids duplicating <defs><linearGradient/></defs> in every icon.
 */
export default function BrandGradients() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="brand-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#29adf0" />
          <stop offset="1" stopColor="#2dd4a0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
