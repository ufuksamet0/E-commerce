import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkoutSchema } from '../../../lib/validation';
import { products } from '../../../lib/mock-db';
import { couponRate } from '../../../store/cart';

const lineSchema = z.object({
  slug: z.string().min(1),
  size: z.string().min(1),
  qty: z.number().int().min(1).max(99),
});

const bodySchema = checkoutSchema.extend({
  lines: z.array(lineSchema).min(1, 'Sepet boş'),
  shipping: z.enum(['standart', 'hizli']).default('standart'),
  coupon: z.string().nullable().optional(),
});

function orderNo(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const r = Math.floor(1000 + Math.random() * 9000);
  return `TR-${y}${m}${day}-${r}`;
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Geçersiz JSON' }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Doğrulama hatası', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const { lines, coupon, shipping } = parsed.data;
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  let subtotal = 0;
  for (const l of lines) {
    const p = bySlug.get(l.slug);
    if (!p) {
      return NextResponse.json({ error: `Ürün bulunamadı: ${l.slug}` }, { status: 400 });
    }
    if (!p.sizes.includes(l.size)) {
      return NextResponse.json({ error: `Geçersiz beden: ${l.slug} / ${l.size}` }, { status: 400 });
    }
    const stock = p.stockBySize[l.size] ?? 0;
    if (l.qty > stock) {
      return NextResponse.json({ error: `Stok yetersiz: ${l.slug} / ${l.size}` }, { status: 400 });
    }
    subtotal += p.priceTL * l.qty;
  }
  const rate = couponRate(coupon ?? null);
  const after = Math.round(subtotal * (1 - rate));
  const shipCost = shipping === 'hizli' ? 195 : after >= 1500 ? 0 : 95;
  const no = orderNo();
  return NextResponse.json({
    orderNo: no,
    subtotal,
    discountRate: rate,
    afterCoupon: after,
    shipping: shipCost,
    total: after + shipCost,
    testMode: true,
  });
}
