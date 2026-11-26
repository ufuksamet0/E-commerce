# E-commerce MVP

TR: Next.js 14 App Router + TypeScript strict + Tailwind + zustand (persist `ecom-cart`) + zod + next-intl (tr varsayılan).

## Kurulum

```bash
npm install
npm run dev
```

## Demo akışı

- `/` hero + 4 kategori + 8 bestseller slider + vaat bandı (5000 TL kargo bedava, 14 gün iade)
- `/kategori/[slug]` grid + filtre (?renk&beden&sirala) + load-more + tükendi + 404
- `/urun/[slug]` galeri + compareAtPrice + beden zorunlu + stok kontrol + benzer 4'lü
- `/sepet` satır +/-, sil, kargo 5000 üstü ücretsiz (altı 120 TL), kupon `HOSGELDIN10` %10, localStorage persist
- `/odeme` misafir checkout + validasyon (ad, e-posta, TR telefon, il/ilçe/adres, KVKK) + kargo Standart 120 / Hızlı 195 + mock kart + sipariş no `TR-YYYYMMDD-XXXX`
- `/arama?q=` en az 2 harf, 6 öneri, TR normalize

## Mock notu

Test modu: ödeme gerçek tahsilat yapmaz. Kart bilgileri yalnızca format olarak doğrulanır. Siparişler localStorage'da tutulur, DB yoktur. Görseller picsum.photos placeholder'dır.

## CI

`lint`, `tsc --noEmit`, `build`, `prettier --check` GitHub Actions ile çalışır.
