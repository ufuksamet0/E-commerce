import { searchProducts, suggestProducts } from '../../../lib/products';
import ProductCard from '../../../components/ProductCard';
import Link from 'next/link';
export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? '').trim();
  if (q.length < 2)
    return (
      <div>
        <h1 className="text-2xl font-bold">Arama</h1>
        <p className="mt-2 text-sm">Aramak için en az 2 harf yazın.</p>
      </div>
    );
  const results = searchProducts(q, 20);
  const sugg = suggestProducts(q, 6);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Arama: {q}</h1>
      {sugg.length > 0 && (
        <p className="text-sm text-neutral-600">
          Öneriler:{' '}
          {sugg.map((p) => (
            <Link key={p.id} href={`/urun/${p.slug}`} className="mr-2 underline">
              {p.name}
            </Link>
          ))}
        </p>
      )}
      {results.length === 0 ? (
        <p>Sonuç bulunamadı. Farklı bir kelime deneyin.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
