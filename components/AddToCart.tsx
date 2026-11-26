'use client';
import { useState } from 'react';
import { useCart } from '../store/cart';
import type { Product } from '../lib/types';
export default function AddToCart({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const [err, setErr] = useState('');
  const [showSizes, setShowSizes] = useState(false);
  const add = useCart((s) => s.add);
  function submit() {
    if (!size) {
      setErr('Lütfen beden seçin');
      setShowSizes(true);
      return;
    }
    if ((product.stockBySize[size] ?? 0) <= 0) {
      setErr('Seçili beden stokta yok');
      return;
    }
    add(product.slug, size, 1);
    setErr('');
    alert('Sepete eklendi');
  }
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">Beden seç</span>
        <button className="text-sm underline" onClick={() => setShowSizes(!showSizes)}>
          Beden Tablosu
        </button>
      </div>
      {showSizes && (
        <p className="mt-1 text-xs text-neutral-600">XS: 34 • S: 36 • M: 38 • L: 40 • XL: 42</p>
      )}
      <div className="mt-2 flex gap-2">
        {product.sizes.map((s) => {
          const out = (product.stockBySize[s] ?? 0) <= 0;
          return (
            <button
              key={s}
              disabled={out}
              onClick={() => setSize(s)}
              className={`rounded border px-3 py-1 ${size === s ? 'bg-black text-white' : ''} ${
                out ? 'opacity-40 line-through' : ''
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>
      {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
      <button onClick={submit} className="mt-4 w-full rounded bg-black py-2 text-white">
        Sepete Ekle
      </button>
    </div>
  );
}
