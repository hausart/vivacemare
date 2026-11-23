import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const siteUrl = 'https://hausart.github.io/vivacemare';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Vivacemare | Assessoria de investimentos',
  description:
    'Assessoria de investimentos com visão 360° para pessoas físicas, empresas e clientes Private.',
  metadataBase: new URL(`${siteUrl}/`),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/`,
    siteName: 'Vivacemare',
    title: 'Vivacemare | Assessoria de investimentos',
    description:
      'Assessoria de investimentos com visão 360° para pessoas físicas, empresas e clientes Private.',
    images: [
      {
        url: `${siteUrl}/og-whatsapp-v3.jpg`,
        width: 1200,
        height: 630,
        alt: 'Vivacemare Investimentos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivacemare | Assessoria de investimentos',
    description:
      'Assessoria de investimentos com visão 360° para pessoas físicas, empresas e clientes Private.',
    images: [`${siteUrl}/og-whatsapp-v3.jpg`],
  },
  icons: {
    icon: `${siteUrl}/favicon.png`,
    shortcut: `${siteUrl}/favicon.png`,
    apple: `${siteUrl}/apple-touch-icon.png`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
