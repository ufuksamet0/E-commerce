import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'E-Shop | Elbise, Üst Giyim, Alt Giyim, Dış Giyim',
  description: '5000 TL üzeri kargo bedava, 14 gün iade.',
  openGraph: {
    title: 'E-Shop | Yeni Sezon',
    description: 'Elbise, üst giyim, alt giyim ve dış giyim. Hızlı teslimat.',
    locale: 'tr_TR',
    type: 'website',
  },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  return (
    <html lang="tr">
      <body>
        <NextIntlClientProvider locale="tr" messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
