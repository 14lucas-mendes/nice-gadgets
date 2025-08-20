import Header from '@/components/ui/Header';
import './globals.css'
import Footer from '@/components/ui/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased flex flex-col min-h-screen justify-between"
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
