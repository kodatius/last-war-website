import LayoutShell from '@/components/layout/LayoutShell';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Rajdhani } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const rajdhani = Rajdhani({ subsets: ['latin'], variable: '--font-rajdhani', weight: ['700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://vikfalliande.github.io/last-war-website'),
  title: {
    default: '[ViKF] Alliance - Last War Strategy Portal',
    template: '%s | [ViKF] Alliance',
  },
  description: 'Strategic headquarters for the [ViKF] alliance on Last War: Survival Server #2058. Comprehensive guides for heroes, events, squads, tips, and more.',
  keywords: ['Last War: Survival', 'Strategy', 'Gaming', 'ViKF Alliance', 'Server 2058'],
  authors: [{ name: '[ViKF] Alliance' }],
  openGraph: {
    title: '[ViKF] Alliance - Last War Strategy Portal',
    description: 'Strategic headquarters for the [ViKF] alliance. Comprehensive guides for heroes, events, squads, tips, and more.',
    type: 'website',
    locale: 'en_US',
    url: 'https://vikfalliande.github.io/last-war-website',
    images: [
      {
        url: '/last-war-website/og-image.png',
        width: 1200,
        height: 630,
        alt: '[ViKF] Alliance Last War Strategy Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '[ViKF] Alliance - Last War Strategy Portal',
    description: 'Strategic headquarters for the [ViKF] alliance on Last War: Survival',
    images: ['/last-war-website/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'theme-color': '#0a0a0f',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable}`}>
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
