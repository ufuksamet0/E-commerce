import { categories } from '../../lib/mock-db';
import { bestsellers } from '../../lib/products';
import CategoryGrid from '../../components/CategoryGrid';
import BestsellerSlider from '../../components/BestsellerSlider';
import Link from 'next/link';
export default function Home() {
  const best = bestsellers(8);
  return (
    <div className="space-y-10">
      <section className="rounded bg-neutral-900 p-8 text-white">
        <h1 className="text-3xl font-bold">Yeni Sezon Geldi</h1>
        <p className="mt-2">Kadın, erkek, çocuk ve aksesuarda seçili ürünlerde sezona özel fiyatlar.</p>
        <div className="mt-4 flex gap-2">
          <Link href="/kategori/kadin" className="rounded bg-white px-4 py-2 text-black">
            Kadın
          </Link>
          <Link href="/kategori/erkek" className="rounded border border-white px-4 py-2">
            Erkek
          </Link>
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-bold">Kategoriler</h2>
        <CategoryGrid categories={categories} />
      </section>
      <section>
        <BestsellerSlider items={best} />
      </section>
      <section className="grid grid-cols-1 gap-3 rounded border p-4 text-sm md:grid-cols-3">
        <div>
          <strong>5000 TL üzeri kargo bedava</strong>
          <p className="text-neutral-600">Altı siparişlerde 120 TL.</p>
        </div>
        <div>
          <strong>14 gün koşulsuz iade</strong>
          <p className="text-neutral-600">Mağazada ve online geçerli.</p>
        </div>
        <div>
          <strong>HOSGELDIN10 ile %10 indirim</strong>
          <p className="text-neutral-600">Sepette kuponu uygulamayı unutmayın.</p>
        </div>
      </section>
    </div>
  );
}
