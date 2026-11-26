'use client';
import { useState } from 'react';
import type { Product } from '../lib/types';
import ProductCard from './ProductCard';
export default function LoadMore({ items, pageSize = 8 }: { items: Product[]; pageSize?: number }) {
  const [n, setN] = useState(pageSize);
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.slice(0, n).map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
      {n < items.length && (
        <div className="mt-6 text-center">
          <button className="rounded border px-4 py-2" onClick={() => setN(n + pageSize)}>
            Daha Fazla Yükle ({items.length - n} ürün)
          </button>
        </div>
      )}
    </div>
  );
}
