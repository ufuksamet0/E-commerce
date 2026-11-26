'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart, COUPON_CODE, couponRate } from '../../../store/cart';
import { products } from '../../../lib/mock-db';
import { tl } from '../../../lib/format';
export default function CartPage() {
  const { lines, inc, dec, remove, coupon, setCoupon } = useCart();
  const [code, setCode] = useState(coupon ?? '');
  const [msg, setMsg] = useState('');
  const detailed = lines
    .map((l) => ({ ...l, p: products.find((x) => x.slug === l.slug)! }))
    .filter((x) => x.p);
  const sub = detailed.reduce((a, l) => a + l.p.priceTL * l.qty, 0);
  const rate = couponRate(coupon);
  const discount = Math.round(sub * rate);
  const after = sub - discount;
  const shipping = after === 0 ? 0 : after >= 5000 ? 0 : 120;
  if (lines.length === 0) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-2xl font-bold">Sepetiniz boş</h1>
        <p className="mt-2 text-neutral-600">Hemen alışverişe başlayın.</p>
        <Link href="/" className="mt-4 inline-block rounded bg-black px-4 py-2 text-white">
          Alışverişe Başla
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Sepet</h1>
      {detailed.map((l) => (
        <div key={`${l.slug}-${l.size}`} className="flex items-center gap-3 rounded border p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={l.p.images[0]} alt={l.p.name} className="h-20 w-16 object-cover" />
          <div className="flex-1">
            <p className="font-medium">
              {l.p.name} • {l.size}
            </p>
            <p className="text-sm">{tl(l.p.priceTL)}</p>
            <div className="mt-1 flex items-center gap-2">
              <button className="rounded border px-2" onClick={() => dec(l.slug, l.size)} aria-label="Azalt">
                −
              </button>
              <span>{l.qty}</span>
              <button className="rounded border px-2" onClick={() => inc(l.slug, l.size)} aria-label="Arttır">
                +
              </button>
              <button className="ml-2 text-sm text-red-600" onClick={() => remove(l.slug, l.size)}>
                Sil
              </button>
            </div>
          </div>
          <span className="font-bold">{tl(l.p.priceTL * l.qty)}</span>
        </div>
      ))}
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Kupon kodu"
          className="rounded border px-2 py-1"
        />
        <button
          className="rounded border px-3"
          onClick={() => {
            if (code.trim().toUpperCase() === COUPON_CODE) {
              setCoupon(COUPON_CODE);
              setMsg('Kupon uygulandı: %10');
            } else {
              setCoupon(null);
              setMsg('Geçersiz kupon');
            }
          }}
        >
          Uygula
        </button>
      </div>
      {msg && <p className="text-sm">{msg}</p>}
      <div className="rounded border p-3 text-sm">
        <p>Ara toplam: {tl(sub)}</p>
        {discount > 0 && <p>İndirim: −{tl(discount)}</p>}
        <p>Kargo: {shipping === 0 ? 'Bedava' : tl(shipping)}</p>
        <p className="mt-1 text-base font-bold">Toplam: {tl(after + shipping)}</p>
      </div>
      <Link href="/odeme" className="inline-block rounded bg-black px-4 py-2 text-white">
        Ödemeye Geç
      </Link>
    </div>
  );
}
