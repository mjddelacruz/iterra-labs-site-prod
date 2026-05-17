import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(135deg, #0a0e14 0%, #121a24 50%, #0a0e14 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #29adf0, #2dd4a0)',
            }}
          />
          <span style={{ fontSize: 36, fontWeight: 700, color: '#ffffff' }}>{siteConfig.name}</span>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: 900,
          }}
        >
          Boutique AI &amp; Cloud Solutions
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: '#94a8c0',
            lineHeight: 1.5,
            maxWidth: 820,
          }}
        >
          Production AI, LLM features &amp; cloud infrastructure — Australia &amp; worldwide.
        </div>
      </div>
    ),
    { ...size },
  );
}
