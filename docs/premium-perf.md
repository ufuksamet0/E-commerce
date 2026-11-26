# Premium Redesign - T-R5 Performans / Regresyon Notlari

Baz: main c52212f. Branch: redesign/premium.
Kilitler: TR tek dil, DB yok, env yok, dark mode yok, gold yok.

Renkler: zemin FDF8F6, vurgu E8B4B8 dusty rose, destek peach FFD9B8 mint BFE3C6 lilac CFC3E8 sky BFD9E8.

Font: govde Inter latin-ext display swap, baslik Fraunces latin-ext display swap. Tanim app/layout.tsx icinde.

next/image kurali: priority yalnizca hero, diger kullanimlarda sizes zorunlu. public aynen, picsum.photos remotePatterns acik.

Animasyon: tek paket framer-motion, yalnizca lazy import lib/motion-lazy.tsx, izinli Hero Card Drawer SearchBar. Global CSS-only, reduced-motion globals.css icinde.

Config: output standalone aynen, Dockerfile COPY public aynen, tailwind extend renk + font.

CI: lint + typecheck + build + format check aynen. Bundle raporu npm run analyze ile. Lighthouse zorunlu degil.

T-R6 checklist: 4 slug 200, 32 urun 8/8/8/8, stock 0 tukendi, TL tr-TR, ecom-cart persist, mock odeme, TR metadata tr_TR, mobil + desktop.
