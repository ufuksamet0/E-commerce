'use client';
import Link from 'next/link';
import { useCart } from '../store/cart';
import { Suspense } from 'react';
import SearchBox from './SearchBox';
export default function Header() {
  const lines = useCart((s) => s.lines);
  const count = lines.reduce((a, l) => a + l.qty, 0);
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          E-Shop
        </Link>
        <nav className="flex gap-3 text-sm">
          <Link href="/kategori/kadin">Kadın</Link>
          <Link href="/kategori/erkek">Erkek</Link>
          <Link href="/kategori/cocuk">Çocuk</Link>
          <Link href="/kategori/aksesuar">Aksesuar</Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Suspense>
            <SearchBox />
          </Suspense>
          <Link href="/sepet" className="rounded bg-black px-3 py-1 text-white">
            Sepet ({count})
          </Link>
        </div>
      </div>
    </header>
  );
}
