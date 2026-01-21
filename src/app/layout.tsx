import Header from '@/components/Header/index';
import './globals.css';
import Footer from '@/components/Footer/index';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CartFavoriteProvider } from '@/context/CartFavoriteContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-between min-h-screen w-full">
        <ThemeProvider>
          <CartFavoriteProvider>
            <Header />

            {children}

            <Footer />
          </CartFavoriteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
