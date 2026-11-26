import Link from 'next/link';
import type { Category } from '../lib/types';
export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {categories.map((c) => (
        <Link key={c.slug} href={`/kategori/${c.slug}`} className="overflow-hidden rounded border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.image}
            alt={c.name}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
          <div className="p-3">
            <h3 className="font-semibold">{c.name}</h3>
            <p className="text-sm text-neutral-600">{c.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
