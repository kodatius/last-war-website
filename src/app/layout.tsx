import LayoutShell from '@/components/layout/LayoutShell';
import { ToastProvider } from '@/components/ui/Toast';
import { img } from '@/lib/prefix';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Rajdhani } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const rajdhani = Rajdhani({ subsets: ['latin'], variable: '--font-rajdhani', weight: ['700'] });

export const metadata: Metadata = {
  title: {
    default: '[ViKF] Alliance',
    template: '%s | [ViKF] Alliance',
  },
  description: 'Strategy HQ for [ViKF] alliance on Server #2058.',
  openGraph: {
    title: '[ViKF] Alliance',
    description: 'Static strategy base for heroes, events, squads, tips, glossary, and quizzes.',
    images: [img('/images/banners/game.jpg')],
  },
  other: {
    'theme-color': '#0a0a0f',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable}`}>
      <body>
        <ToastProvider>
          <LayoutShell>{children}</LayoutShell>
        </ToastProvider>
      </body>
    </html>
  );
}
