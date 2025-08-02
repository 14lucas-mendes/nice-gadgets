import NavBar from "@/components/NavBar/NavBar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
