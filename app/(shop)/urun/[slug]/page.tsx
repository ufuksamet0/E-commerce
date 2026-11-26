import { notFound } from 'next/navigation';
import { getProduct, related } from '../../../../lib/products';
import { tl } from '../../../../lib/format';
import ProductGallery from '../../../../components/ProductGallery';
import Accordion from '../../../../components/Accordion';
import AddToCart from '../../../../components/AddToCart';
import ProductCard from '../../../../components/ProductCard';
export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const rel = related(p, 4);
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <ProductGallery images={p.images} name={p.name} />
        <div>
          <h1 className="text-2xl font-bold">{p.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xl font-bold">{tl(p.priceTL)}</span>
            {p.compareAtPrice && (
              <span className="text-neutral-500 line-through">{tl(p.compareAtPrice)}</span>
            )}
          </div>
          <div className="mt-2 flex gap-2">
            {p.colors.map((c) => (
              <span key={c.name} className="flex items-center gap-1 text-sm">
                <span
                  className="inline-block h-4 w-4 rounded-full border"
                  style={{ background: c.hex }}
                />
                {c.name}
              </span>
            ))}
          </div>
          <AddToCart product={p} />
          <div className="mt-4">
            <Accordion title="Kumaş & Bakım">
              <p>Kumaş: {p.fabric}</p>
              <p>{p.care}</p>
            </Accordion>
            <Accordion title="Teslimat & İade">
              <p>5000 TL üzeri kargo bedava, altı 120 TL. 14 gün koşulsuz iade.</p>
            </Accordion>
          </div>
        </div>
      </div>
      <div>
        <h2 className="mb-3 text-lg font-bold">Benzer Ürünler</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {rel.map((r) => (
            <ProductCard key={r.id} p={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
