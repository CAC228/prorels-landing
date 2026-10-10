import Link from 'next/link';
import { catalogUrl } from '@/lib/site';
import { Icon } from '@/components/icons';
export default function NotFound() {
  return <main className="not-found"><div className="container"><div className="eyebrow">ОШИБКА 404</div><h1>Этот путь<br />пока не проложен.</h1><p>Страница не найдена. Вернитесь на главную или выберите материалы в каталоге.</p><div className="hero-actions"><Link className="button button-orange" href="/">На главную<Icon name="arrow" /></Link><a className="button button-dark" href={catalogUrl}>Смотреть каталог<Icon name="outward" /></a></div></div></main>;
}
