import type { SVGProps } from 'react';

const paths = {
  book: <><path d="M12 5v16M3 3h5a4 4 0 0 1 4 2 4 4 0 0 1 4-2h5v16h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3V3Z" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  outward: <><path d="M6 18 18 6M6 6h12v12" /></>,
  pin: <><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  phone: <><path d="m5 3 4 1 1 5-3 2a16 16 0 0 0 6 6l2-3 5 1 1 4c-1 3-5 3-8 1C7 17 3 12 3 7c0-2 1-3 2-4Z" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 6 9 7 9-7" /></>,
  rails: <><path d="m8 3-4 18M16 3l4 18M7 6h10M6 11h12M5 17h14" /></>,
  box: <><path d="m3 7 9-4 9 4v11l-9 4-9-4V7Zm0 0 9 4 9-4M12 11v11M7.5 5l9 4" /></>,
  document: <><path d="M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8M8 16h6" /></>,
  truck: <><path d="M2 5h12v12H2V5Zm12 5h4l4 4v3h-8M17 10v4h5" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
  factory: <><path d="M3 21V9l6 3V7l6 5V3h4l2 18H3ZM6 17h1m4 0h1m4 0h1" /></>,
  crane: <><path d="M6 21V3h3v18M2 21h11M3 5h17L9 2M18 5v8m0 0v2a2 2 0 0 1-4 0M6 9l3 4-3 4" /></>,
  terminal: <><path d="m2 9 10-6 10 6M4 8v13h16V8M8 21v-9h8v9M8 15h8M8 18h8" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
} as const;

export type IconName = keyof typeof paths;
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
