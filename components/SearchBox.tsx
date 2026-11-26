'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { trNormalize } from '../lib/normalize';
export default function SearchBox() {
  const [q, setQ] = useState('');
  const [sug, setSug] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (q.trim().length < 2) {
      setSug([]);
      return;
    }
    fetch(`/api/suggest?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((d) => setSug(d.names ?? []))
      .catch(() => setSug([]));
  }, [q]);
  void trNormalize;
  return (
    <div className="relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim().length >= 2) router.push(`/arama?q=${encodeURIComponent(q.trim())}`);
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ürün ara"
          className="rounded border px-2 py-1 text-sm"
        />
      </form>
      {sug.length > 0 && (
        <ul className="absolute z-10 mt-1 w-56 rounded border bg-white text-sm shadow">
          {sug.map((n) => (
            <li key={n}>
              <button
                className="block w-full px-2 py-1 text-left hover:bg-neutral-100"
                onClick={() => router.push(`/arama?q=${encodeURIComponent(n)}`)}
              >
                {n}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
