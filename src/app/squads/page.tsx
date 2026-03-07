import type { Metadata } from 'next';
import SquadsClient from './SquadsClient';

export const metadata: Metadata = {
  title: 'Squads',
  description: 'Formation and matchup guidance for Tank, Aircraft, and Missile squads.',
};

export default function SquadsPage() {
  return <SquadsClient />;
}
