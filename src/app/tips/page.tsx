import type { Metadata } from 'next';
import TipsClient from './TipsClient';

export const metadata: Metadata = {
  title: 'Tips',
  description: '108+ practical tips covering heroes, events, resources, and progression.',
};

export default function TipsPage() {
  return <TipsClient />;
}
