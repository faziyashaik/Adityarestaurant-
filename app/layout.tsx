import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'Aditya Restaurant & Hospitality | Kandukur, Andhra Pradesh',
    template: '%s | Aditya Restaurant & Hospitality',
  },
  description:
    'Experience fine dining, luxury hotel rooms, grand function halls, and outdoor catering at Aditya Restaurant & Hospitality in Kandukur, Andhra Pradesh.',
  keywords: [
    'Aditya Restaurant',
    'Aditya Hospitality',
    'Kandukur hotel',
    'Kandukur restaurant',
    'Function hall Kandukur',
    'Catering Kandukur',
    'Pamuru Road hotel',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-[#F7F3ED] text-[#1E1E1E] antialiased min-h-screen flex flex-col justify-between selection:bg-[#741B2A] selection:text-[#C9A23A] overflow-x-hidden">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
