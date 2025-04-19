import '@/app/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light-finan">
      <body>
        <Header />
        <main className="min-h-screen px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
