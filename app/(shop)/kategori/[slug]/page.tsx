import { notFound } from 'next/navigation';
import { getCategory, categoryProducts } from '../../../../lib/products';
import CategoryFilters from '../../../../components/CategoryFilters';
import LoadMore from '../../../../components/LoadMore';
export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { renk?: string; beden?: string; sirala?: string };
}) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();
  let items = categoryProducts(params.slug);
  const { renk, beden, sirala } = searchParams;
  if (beden) items = items.filter((p) => p.sizes.includes(beden));
  if (renk) items = items.filter((p) => p.colors.some((c) => c.name === renk));
  if (sirala === 'fiyat-artan') items = [...items].sort((a, b) => a.priceTL - b.priceTL);
  else if (sirala === 'fiyat-azalan') items = [...items].sort((a, b) => b.priceTL - a.priceTL);
  else if (sirala === 'yeni') items = [...items].sort((a, b) => Number(b.isNew) - Number(a.isNew));
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{cat.name}</h1>
      <p className="text-sm text-neutral-600">{cat.description}</p>
      <CategoryFilters />
      {items.length === 0 ? <p>Bu filtrede ürün bulunamadı.</p> : <LoadMore items={items} />}
    </div>
  );
}
