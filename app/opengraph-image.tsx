import { createOgImageResponse, ogImageSize } from '@/lib/og-image';
import { socialMeta } from '@/lib/social';

export const alt = socialMeta.title;
export const size = ogImageSize;
export const contentType = 'image/png';
export const runtime = 'nodejs';

export default async function OpenGraphImage() {
  return createOgImageResponse();
}
