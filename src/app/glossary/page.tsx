import type { Metadata } from 'next';
import GlossaryClient from './GlossaryClient';

export const metadata: Metadata = {
  title: 'Glossary',
  description: '32 key Last War terms with aliases and definitions.',
};

export default function GlossaryPage() {
  return <GlossaryClient />;
}
