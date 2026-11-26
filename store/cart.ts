'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export interface CartLine {
  slug: string;
  size: string;
  qty: number;
}
interface CartState {
  lines: CartLine[];
  coupon: string | null;
  add: (slug: string, size: string, qty?: number) => void;
  inc: (slug: string, size: string) => void;
  dec: (slug: string, size: string) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
  setCoupon: (c: string | null) => void;
}
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      coupon: null,
      add: (slug, size, qty = 1) =>
        set((s) => {
          const i = s.lines.findIndex((l) => l.slug === slug && l.size === size);
          if (i >= 0) {
            const lines = [...s.lines];
            lines[i] = { ...lines[i], qty: lines[i].qty + qty };
            return { lines };
          }
          return { lines: [...s.lines, { slug, size, qty }] };
        }),
      inc: (slug, size) =>
        set((s) => ({
          lines: s.lines.map((l) =>
            l.slug === slug && l.size === size ? { ...l, qty: l.qty + 1 } : l,
          ),
        })),
      dec: (slug, size) =>
        set((s) => ({
          lines: s.lines.map((l) =>
            l.slug === slug && l.size === size ? { ...l, qty: Math.max(1, l.qty - 1) } : l,
          ),
        })),
      remove: (slug, size) =>
        set((s) => ({ lines: s.lines.filter((l) => !(l.slug === slug && l.size === size)) })),
      clear: () => set({ lines: [], coupon: null }),
      setCoupon: (c) => set({ coupon: c }),
    }),
    { name: 'ecom-cart' },
  ),
);
export const COUPON_CODE = 'HOSGELDIN10';
export function couponRate(code: string | null): number {
  return code === COUPON_CODE ? 0.1 : 0;
}
