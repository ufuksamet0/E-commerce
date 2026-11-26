'use client';
import { useState } from 'react';
import type { Product } from '../lib/types';
import ProductCard from './ProductCard';
export default function BestsellerSlider({ items }: { items: Product[] }) {
  const [idx, setIdx] = useState(0);
  const page = 4;
  const max = Math.max(0, items.length - page);
  const vis = items.slice(idx, idx + page);
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold">Çok Satanlar</h2>
        <div className="flex gap-2">
          <button
            className="rounded border px-3 py-1"
            onClick={() => setIdx(Math.max(0, idx - page))}
            aria-label="Önceki"
          >
            ‹
          </button>
          <button
            className="rounded border px-3 py-1"
            onClick={() => setIdx(Math.min(max, idx + page))}
            aria-label="Sonraki"
          >
            ›
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {vis.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
