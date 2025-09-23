
import Header from '@/components/Header';
import './globals.css'
import Footer from '@/components/Footer';
import Container from '@/components/Container';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="flex flex-col min-h-screen w-full"
      >
        <Header />

        <Container>
          {children}
        </Container>
        
        <Footer />
      </body>
    </html>
  );
}
