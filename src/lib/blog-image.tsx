import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function renderBlogImage(title: string, category: string) {
  const [font, logo] = await Promise.all([
    readFile(join(process.cwd(), 'public/fonts/GolosText-SemiBold.ttf')),
    readFile(join(process.cwd(), 'public/images/prorels-logo.png')),
  ]);
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#141e26', color: '#fff', fontFamily: 'Golos' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 62px', height: 146, background: '#fff', color: '#141e26' }}>
        {/* ImageResponse renders native images into the PNG, not browser HTML. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo.toString('base64')}`} width={340} height={104} alt="ПроРельс" />
        <span style={{ fontSize: 25 }}>БЛОГ</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '44px 68px 48px', borderBottom: '12px solid #ff5b00' }}>
        <div style={{ color: '#ff8644', fontSize: 23, marginBottom: 24 }}>{category}</div>
        <div style={{ display: 'flex', fontSize: title.length > 60 ? 53 : 60, lineHeight: 1.16, letterSpacing: '-1.5px' }}>{title}</div>
        <div style={{ marginTop: 'auto', color: '#b8c5ce', fontSize: 23 }}>Рельсы · Шпалы · Крепёж</div>
      </div>
    </div>,
    { width: 1200, height: 630, fonts: [{ name: 'Golos', data: new Uint8Array(font).buffer, weight: 600, style: 'normal' }] },
  );
}
