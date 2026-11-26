import type { MetadataRoute } from 'next';
import { products, categories } from '../lib/mock-db';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://example.com';
  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/sepet`, lastModified: new Date() },
    { url: `${base}/odeme`, lastModified: new Date() },
  ];
  for (const c of categories)
    urls.push({ url: `${base}/kategori/${c.slug}`, lastModified: new Date() });
  for (const p of products) urls.push({ url: `${base}/urun/${p.slug}`, lastModified: new Date() });
  return urls;
}
