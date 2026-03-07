import CategoryBadge from '@/components/ui/CategoryBadge';
import Card from '@/components/ui/Card';
import LocalImage from '@/components/ui/LocalImage';
import { Tip } from '@/types';

interface TipCardProps {
  tip: Tip;
}

const heroIds = [
  'adam',
  'carlie',
  'dva',
  'fiona',
  'kimberly',
  'lucius',
  'marshall',
  'mason',
  'mcgregor',
  'monica',
  'morrison',
  'murphy',
  'richard',
  'sarah',
  'scarlett',
  'schuyler',
  'stetmann',
  'swift',
  'tesla',
  'venom',
  'violet',
  'williams',
] as const;

function getTipImage(tip: Tip): { src: string; alt: string } | null {
  const normalized = tip.text.toLowerCase();

  if (tip.category === 'Resources') {
    if (normalized.includes('iron')) return { src: '/images/ui/iron.png', alt: 'Iron resource' };
    if (normalized.includes('food')) return { src: '/images/ui/food.png', alt: 'Food resource' };
    if (normalized.includes('gold') || normalized.includes('coin')) return { src: '/images/ui/coin.png', alt: 'Coin resource' };
    return { src: '/images/ui/diamond.png', alt: 'Diamond resource' };
  }

  if (tip.category === 'Heroes') {
    const foundHero = heroIds.find((heroId) => normalized.includes(heroId));
    if (foundHero) return { src: `/images/heroes/${foundHero}.png`, alt: `${foundHero} portrait` };
    return { src: '/images/heroes/kimberly.png', alt: 'Featured hero portrait' };
  }

  return null;
}

export default function TipCard({ tip }: TipCardProps) {
  const tipImage = getTipImage(tip);

  return (
    <Card className="h-full">
      <CategoryBadge emoji={tip.emoji} label={tip.category} />
      {tipImage ? (
        <LocalImage
          src={tipImage.src}
          alt={tipImage.alt}
          width={56}
          height={56}
          containerClassName="mt-3 h-14 w-14 overflow-hidden rounded-md border border-border bg-bg-tertiary"
          className="h-full w-full object-cover"
          fallbackText="Tip"
        />
      ) : null}
      <p className="mt-3 text-sm leading-relaxed">{tip.text}</p>
    </Card>
  );
}
