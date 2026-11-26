import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';

export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin-ext'],
  display: 'swap',
  variable: '--font-sans',
});

const fraunces = Fraunces({
  subsets: ['latin-ext'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'E-Shop | Elbise, Üst Giyim, Alt Giyim, Dış Giyim',
  description: 'Elbise, üst giyim, alt giyim ve dış giyimde yeni sezon ürünler. 5000 TL üzeri kargo bedava, 14 gün iade.',
  openGraph: {
    title: 'E-Shop | Yeni Sezon',
    description: 'Elbise, üst giyim, alt giyim ve dış giyim. Hızlı teslimat.',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  const fontVars = [inter.variable, fraunces.variable].join(' ');
  return (
    <html lang="tr" className={fontVars}>
      <body className="font-sans">
        <NextIntlClientProvider locale="tr" messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
