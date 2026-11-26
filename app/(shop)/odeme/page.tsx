'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart, couponRate } from '../../../store/cart';
import { products } from '../../../lib/mock-db';
import { tl, orderNo } from '../../../lib/format';
import { checkoutSchema } from '../../../lib/validation';
export default function CheckoutPage() {
  const router = useRouter();
  const { lines, clear, coupon } = useCart();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    district: '',
    address: '',
    kvkk: false,
    shipping: 'standart',
    cardNo: '',
    exp: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState('');
  function set(k: string, v: string | boolean) {
    setForm({ ...form, [k]: v });
  }
  if (lines.length === 0 && !done) {
    return (
      <div className="py-10">
        <h1 className="text-2xl font-bold">Sepetiniz boş</h1>
        <p className="mt-2">Ödeme için önce sepetinize ürün ekleyin.</p>
        <button
          className="mt-4 rounded bg-black px-4 py-2 text-white"
          onClick={() => router.push('/')}
        >
          Alışverişe Başla
        </button>
      </div>
    );
  }
  const detailed = lines
    .map((l) => ({ ...l, p: products.find((x) => x.slug === l.slug)! }))
    .filter((x) => x.p);
  const sub = detailed.reduce((a, l) => a + l.p.priceTL * l.qty, 0);
  const discount = Math.round(sub * couponRate(coupon));
  const after = sub - discount;
  const shipCost = form.shipping === 'hizli' ? 195 : after >= 5000 ? 0 : 120;
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = checkoutSchema.safeParse({ ...form });
    if (!parsed.success) {
      setErrors(parsed.error.issues.map((i) => i.message));
      return;
    }
    setErrors([]);
    const no = orderNo();
    setDone(no);
    clear();
    router.push(`/siparis-onay/${encodeURIComponent(no)}`);
  }
  if (done) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-2xl font-bold">Siparişiniz alındı</h1>
        <p className="mt-2">
          Sipariş no: <strong>{done}</strong>
        </p>
        <p className="mt-1 text-sm text-neutral-600">Test modu: ödeme tahsilatı yapılmadı.</p>
        <Link
          href={`/siparis-onay/${encodeURIComponent(done)}`}
          className="mt-4 inline-block rounded bg-black px-4 py-2 text-white"
        >
          Sipariş Detayına Git
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Ödeme</h1>
      <p className="rounded border bg-yellow-50 p-2 text-sm">
        Test modu: bu sayfada gerçek tahsilat yapılmaz. Kart bilgisi yalnızca format kontrolünden
        geçer.
      </p>
      <form onSubmit={submit} className="grid gap-3 md:grid-cols-2">
        <input
          className="rounded border px-2 py-1"
          placeholder="Ad Soyad"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
        />
        <input
          className="rounded border px-2 py-1"
          placeholder="E-posta"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
        />
        <input
          className="rounded border px-2 py-1"
          placeholder="Telefon 05xx xxx xx xx"
          value={form.phone}
          onChange={(e) => set('phone', e.target.value)}
        />
        <input
          className="rounded border px-2 py-1"
          placeholder="İl"
          value={form.city}
          onChange={(e) => set('city', e.target.value)}
        />
        <input
          className="rounded border px-2 py-1"
          placeholder="İlçe"
          value={form.district}
          onChange={(e) => set('district', e.target.value)}
        />
        <input
          className="rounded border px-2 py-1 md:col-span-2"
          placeholder="Adres"
          value={form.address}
          onChange={(e) => set('address', e.target.value)}
        />
        <div className="flex gap-4 text-sm">
          <label>
            <input
              type="radio"
              name="ship"
              checked={form.shipping === 'standart'}
              onChange={() => set('shipping', 'standart')}
            />{' '}
            Standart (120 TL)
          </label>
          <label>
            <input
              type="radio"
              name="ship"
              checked={form.shipping === 'hizli'}
              onChange={() => set('shipping', 'hizli')}
            />{' '}
            Hızlı (195 TL)
          </label>
        </div>
        <input
          className="rounded border px-2 py-1"
          placeholder="Kart No 1234 5678 9012 3456"
          value={form.cardNo}
          onChange={(e) => {
            const d = e.target.value.replace(/[^0-9]/g, '').slice(0, 16);
            set('cardNo', d.replace(/(.{4})/g, '$1 ').trim());
          }}
        />
        <div className="flex gap-2">
          <input
            className="w-1/2 rounded border px-2 py-1"
            placeholder="AA/YY"
            value={form.exp}
            onChange={(e) => set('exp', e.target.value)}
          />
          <input
            className="w-1/2 rounded border px-2 py-1"
            placeholder="CVV"
            value={form.cvv}
            onChange={(e) => set('cvv', e.target.value)}
          />
        </div>
        <label className="text-sm md:col-span-2">
          <input
            type="checkbox"
            checked={form.kvkk as boolean}
            onChange={(e) => set('kvkk', e.target.checked)}
          />{' '}
          KVKK metnini okudum, onaylıyorum.
        </label>
        {errors.length > 0 && (
          <ul className="text-sm text-red-600 md:col-span-2">
            {errors.map((m, i) => (
              <li key={i}>• {m}</li>
            ))}
          </ul>
        )}
        <div className="rounded border p-3 text-sm md:col-span-2">
          <p>
            Ara toplam: {tl(sub)} {discount > 0 && <span>(indirim −{tl(discount)})</span>}
          </p>
          <p>Kargo: {shipCost === 0 ? 'Bedava' : tl(shipCost)}</p>
          <p className="font-bold">Toplam: {tl(after + shipCost)}</p>
        </div>
        <button className="rounded bg-black py-2 text-white md:col-span-2" type="submit">
          Siparişi Tamamla
        </button>
      </form>
    </div>
  );
}
