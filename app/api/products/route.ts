import { NextResponse } from 'next/server';
import { products } from '../../../lib/mock-db';

export function GET() {
  return NextResponse.json({ products });
}
