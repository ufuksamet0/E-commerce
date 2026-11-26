import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
export const metadata: Metadata = {
  title: 'E-Shop | Yeni Sezon Giyim ve Aksesuar',
  description:
    'Kadın, erkek, çocuk giyim ve aksesuarda yeni sezon ürünler. 5000 TL üzeri kargo bedava, 14 gün iade.',
  openGraph: {
    title: 'E-Shop | Yeni Sezon',
    description: 'Kadın, erkek, çocuk giyim ve aksesuar. Hızlı teslimat.',
    locale: 'tr_TR',
    type: 'website',
  },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  return (
    <html lang="tr">
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
