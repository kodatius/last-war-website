import CategoryBadge from '@/components/ui/CategoryBadge';
import Card from '@/components/ui/Card';
import { Tip } from '@/types';

interface TipCardProps {
  tip: Tip;
}

export default function TipCard({ tip }: TipCardProps) {
  return (
    <Card className="h-full">
      <CategoryBadge emoji={tip.emoji} label={tip.category} />
      <p className="mt-3 text-sm leading-relaxed">{tip.text}</p>
    </Card>
  );
}
