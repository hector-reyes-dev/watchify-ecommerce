import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wachify - Tienda Oficial de Merchandising Netflix',
  description: 'Descubre productos exclusivos de tus series favoritas de Netflix. Ropa, accesorios y coleccionables oficiales.',
  keywords: 'Netflix, merchandising, productos oficiales, series, ropa, accesorios',
  openGraph: {
    title: 'Wachify - Tienda Oficial de Merchandising Netflix',
    description: 'Descubre productos exclusivos de tus series favoritas de Netflix',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}