import { renderBlogImage } from '@/lib/blog-image';

export const dynamic = 'force-static';

export function GET() {
  return renderBlogImage('Полезные материалы для закупки ВСП', 'Заявки, комплектация и доставка');
}
