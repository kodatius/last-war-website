import type { Metadata } from 'next';
import GlossaryClient from './GlossaryClient';

export const metadata: Metadata = {
  title: 'Glossary',
  description: 'Complete Last War: Survival glossary with 32 essential gaming terms, aliases, and definitions for alliance members and new players.',
};

export default function GlossaryPage() {
  return <GlossaryClient />;
}
