import type { NextConfig } from 'next';
import { resolveSiteIdentity } from './src/lib/origin';

const { indexable } = resolveSiteIdentity(process.env);
const config: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'], qualities: [75, 85] },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ...(!indexable ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : []),
    ] }];
  },
};
export default config;
