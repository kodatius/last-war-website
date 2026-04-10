import { LINKS } from '@/lib/constants';
import LocalImage from '@/components/ui/LocalImage';
import Link from 'next/link';
import { img } from '@/lib/prefix';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-bg-secondary/70 py-8">
      <div className="container-shell flex flex-col gap-3 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>Built for [FATE] | Server #2058</p>
        <div className="flex flex-wrap items-center gap-2">
          <LocalImage
            src={img('/images/ui/iron.png')}
            alt="Iron"
            width={18}
            height={18}
            containerClassName="h-[18px] w-[18px]"
            className="h-full w-full object-contain"
          />
          <LocalImage
            src={img('/images/ui/food.png')}
            alt="Food"
            width={18}
            height={18}
            containerClassName="h-[18px] w-[18px]"
            className="h-full w-full object-contain"
          />
          <LocalImage
            src={img('/images/ui/coin.png')}
            alt="Coin"
            width={18}
            height={18}
            containerClassName="h-[18px] w-[18px]"
            className="h-full w-full object-contain"
          />
          <LocalImage
            src={img('/images/ui/diamond.png')}
            alt="Diamond"
            width={18}
            height={18}
            containerClassName="h-[18px] w-[18px]"
            className="h-full w-full object-contain"
          />
          <p>
            Built by Toxzin and the [FATE] leadership team |{' '}
            <Link href="/about" className="text-accent hover:underline">
              About
            </Link>{' '}
            |{' '}
            <Link href="/glossary" className="text-accent hover:underline">
              Glossary
            </Link>{' '}
            |{' '}
            <a href={LINKS.discord} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              Discord
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
