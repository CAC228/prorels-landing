import Image from 'next/image';
import Link from 'next/link';
import { catalogUrl, site } from '@/lib/site';
import { Icon } from './icons';

export function Footer() {
  return <footer className="site-footer">
    <div className="container">
      <div className="footer-top">
        <Link className="footer-brand" href="/" aria-label="ПроРельс — на главную">
          <Image src="/images/brand-sheet.png" width={1280} height={651} sizes="640px" alt="ПроРельс. Рельсы, шпалы, крепёж" />
        </Link>
        <p>Материалы для вашего пути.<br />Поставки по России и СНГ.</p>
        <Link className="text-link light-link" href="/blog">Блог<Icon name="arrow" /></Link>
        <a className="text-link light-link" href={catalogUrl}>Основной каталог<Icon name="outward" /></a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ПроРельс. {site.legalName}<br />ИНН {site.inn} · ОГРН {site.ogrn}</span>
        <a href={`${site.catalogOrigin}/privacy`}>Политика конфиденциальности<Icon name="outward" /></a>
        <span>Информация на сайте<br />не является публичной офертой.</span>
      </div>
    </div>
  </footer>;
}
