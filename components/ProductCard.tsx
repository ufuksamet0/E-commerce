import Link from 'next/link';
import type { Product } from '../lib/types';
import { tl } from '../lib/format';
export default function ProductCard({ p }: { p: Product }) {
  const soldOut = Object.values(p.stockBySize).every((v) => v === 0);
  return (
    <Link href={`/urun/${p.slug}`} className="overflow-hidden rounded border">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.images[0]}
          alt={p.name}
          className="aspect-[3/4] w-full object-cover"
          loading="lazy"
        />
        {p.isNew && (
          <span className="absolute left-2 top-2 rounded bg-green-600 px-2 py-0.5 text-xs text-white">
            Yeni
          </span>
        )}
        {soldOut && (
          <span className="absolute right-2 top-2 rounded bg-neutral-800 px-2 py-0.5 text-xs text-white">
            Tükendi
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium">{p.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-bold">{tl(p.priceTL)}</span>
          {p.compareAtPrice && (
            <span className="text-sm text-neutral-500 line-through">{tl(p.compareAtPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
