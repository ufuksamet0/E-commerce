import { NextResponse } from 'next/server';
import { z } from 'zod';

const bodySchema = z.object({
  cardNo: z.string().regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 'Kart numarası 16 hane olmalı'),
  amount: z.number().positive().optional(),
  orderNo: z.string().optional(),
});

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
      { error: 'Kart doğrulanamadı (test modu)', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  return NextResponse.json({
    approved: true,
    testMode: true,
    orderNo: parsed.data.orderNo ?? null,
    amount: parsed.data.amount ?? null,
  });
