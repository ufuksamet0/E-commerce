'use client';
import { useState } from 'react';
export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="overflow-hidden rounded border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[i]} alt={name} className="aspect-[3/4] w-full object-cover" />
      </div>
      <div className="mt-2 flex gap-2">
        {images.map((src, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            className={`overflow-hidden rounded border ${k === i ? 'ring-2 ring-black' : ''}`}
            aria-label={`Görsel ${k + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${name} ${k + 1}`} className="h-20 w-16 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
