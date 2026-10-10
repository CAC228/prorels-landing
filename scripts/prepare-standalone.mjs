import { cp } from 'node:fs/promises';
await Promise.all([
  cp('public', '.next/standalone/public', { recursive: true }),
  cp('.next/static', '.next/standalone/.next/static', { recursive: true }),
]);
console.log('Standalone server prepared with public assets and static chunks.');
