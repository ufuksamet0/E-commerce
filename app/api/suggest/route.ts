import { NextResponse } from 'next/server';
import { suggestProducts } from '../../../lib/products';
export function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q') ?? '';
  if (q.trim().length < 2) return NextResponse.json({ names: [] });
  return NextResponse.json({ names: suggestProducts(q, 6).map((p) => p.name) });
}
