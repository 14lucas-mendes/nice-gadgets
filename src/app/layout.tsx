
import Header from '@/components/Header';
import './globals.css'
import Footer from '@/components/Footer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CartFavoriteProvider } from '@/context/CartFavoriteContext';

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
        <CartFavoriteProvider>
          <Header />

          {children}
        
          
        </CartFavoriteProvider>
      </body>
    </html>
  );
}
