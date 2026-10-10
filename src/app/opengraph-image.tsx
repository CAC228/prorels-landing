import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'ПроРельс — рельсы, шпалы и крепёж для железнодорожного пути';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const [logo, railway] = await Promise.all([
    readFile(join(process.cwd(), 'public/images/prorels-logo.png')),
    readFile(join(process.cwd(), 'public/images/railway.jpg')),
  ]);
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#151D25' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 280, background: '#ffffff' }}>
        {/* ImageResponse requires native image elements with explicit dimensions. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo.toString('base64')}`} width={750} height={230} alt="ПроРельс" />
      </div>
      <div style={{ display: 'flex', height: 10, background: '#FB5A00', width: '100%' }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/jpeg;base64,${railway.toString('base64')}`} width={1200} height={340} style={{ objectFit: 'cover', objectPosition: '50% 63%' }} alt="Железнодорожный путь" />
    </div>, size,
  );
}
