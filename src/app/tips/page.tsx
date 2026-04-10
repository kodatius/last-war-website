import type { Metadata } from 'next';
import TipsClient from './TipsClient';

export const metadata: Metadata = {
  title: 'Tips',
  description: 'Database of 100+ practical Last War strategy tips covering heroes, events, squad composition, resource management, base building, and account progression.',
};

export default function TipsPage() {
  return <TipsClient />;
}
