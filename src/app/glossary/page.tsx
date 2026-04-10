import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { img } from '@/lib/prefix';

const GlossaryClient = dynamic(() => import('./GlossaryClient'));

export const metadata: Metadata = {
  title: 'Glossary',
  description: '32 key Last War terms with aliases and definitions.',
  openGraph: {
    title: 'Glossary | [ViKF] Alliance',
    description: 'Key Last War terms with aliases and definitions.',
    images: [img('/images/banners/map.png')],
  },
};

export default function GlossaryPage() {
  return <GlossaryClient />;
}
