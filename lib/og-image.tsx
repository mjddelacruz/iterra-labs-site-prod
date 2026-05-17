import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const ogImageSize = { width: 1200, height: 630 };

const LOGO_FILE = 'iterra labs white logo copy.png';
const LOGO_WIDTH = 1788;
const LOGO_HEIGHT = 882;

async function loadLogoDataUrl(): Promise<string> {
  const buffer = await readFile(join(process.cwd(), 'public', LOGO_FILE));
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

export async function createOgImageResponse() {
  const logoSrc = await loadLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
        }}
      >
        <img
          src={logoSrc}
          alt="iterra labs"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          style={{
            width: 1100,
            height: 542,
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    ogImageSize,
  );
}
