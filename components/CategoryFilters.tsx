'use client';
import { useRouter, useSearchParams } from 'next/navigation';
export default function CategoryFilters() {
  const router = useRouter();
  const sp = useSearchParams();
  function set(key: string, val: string) {
    const p = new URLSearchParams(sp.toString());
    if (!val) p.delete(key);
    else p.set(key, val);
    router.push(`?${p.toString()}`);
  }
  return (
    <div className="flex flex-wrap gap-2 text-sm">
      <select
        className="rounded border px-2 py-1"
        value={sp.get('beden') ?? ''}
        onChange={(e) => set('beden', e.target.value)}
        aria-label="Beden"
      >
        <option value="">Beden: Tümü</option>
        {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select
        className="rounded border px-2 py-1"
        value={sp.get('renk') ?? ''}
        onChange={(e) => set('renk', e.target.value)}
        aria-label="Renk"
      >
        <option value="">Renk: Tümü</option>
        {[
          'Siyah',
          'Beyaz',
          'Lacivert',
          'Bej',
          'Haki',
          'Bordo',
          'Gri',
          'Mavi',
          'Pembe',
          'Yesil',
        ].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select
        className="rounded border px-2 py-1"
        value={sp.get('sirala') ?? ''}
        onChange={(e) => set('sirala', e.target.value)}
        aria-label="Sıralama"
      >
        <option value="">Sırala</option>
        <option value="fiyat-artan">Fiyat artan</option>
        <option value="fiyat-azalan">Fiyat azalan</option>
        <option value="yeni">Yeniler</option>
      </select>
    </div>
  );
}
