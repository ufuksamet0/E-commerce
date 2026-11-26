import Link from 'next/link';

export const dynamic = 'force-dynamic';

export function generateMetadata({ params }: { params: { no: string } }) {
  return {
    title: `Sipariş Onayı ${params.no} | Ecom MVP`,
    description: 'Siparişiniz test modunda alındı.',
  };
}

export default function SiparisOnayPage({ params }: { params: { no: string } }) {
  const no = decodeURIComponent(params.no);
  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold">Siparişiniz Alındı (Test Modu)</h1>
      <p className="mt-2">
        Sipariş No: <span className="font-mono font-bold">{no}</span>
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Bu mock teslimattır; ödeme alınmadı, kargo yapılmaz.
      </p>
      <Link href="/" className="mt-6 inline-block rounded bg-black px-4 py-2 text-white">
        Alışverişe Devam Et
      </Link>
    </div>
  );
}
