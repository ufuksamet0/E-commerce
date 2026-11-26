import Header from '../../components/Header';
import Footer from '../../components/Footer';
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
}
