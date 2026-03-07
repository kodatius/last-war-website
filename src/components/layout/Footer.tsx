import { LINKS } from '@/lib/constants';
import LocalImage from '@/components/ui/LocalImage';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-bg-secondary/70 py-8">
      <div className="container-shell flex flex-col gap-3 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>Built for [ViKF] | Server #2058</p>
        <div className="flex flex-wrap items-center gap-2">
          <LocalImage
            src="/images/ui/iron.png"
            alt="Iron"
            width={18}
            height={18}
            containerClassName="h-[18px] w-[18px]"
            className="h-full w-full object-contain"
          />
          <LocalImage
            src="/images/ui/food.png"
            alt="Food"
            width={18}
            height={18}
            containerClassName="h-[18px] w-[18px]"
            className="h-full w-full object-contain"
          />
          <LocalImage
            src="/images/ui/coin.png"
            alt="Coin"
            width={18}
            height={18}
            containerClassName="h-[18px] w-[18px]"
            className="h-full w-full object-contain"
          />
          <LocalImage
            src="/images/ui/diamond.png"
            alt="Diamond"
            width={18}
            height={18}
            containerClassName="h-[18px] w-[18px]"
            className="h-full w-full object-contain"
          />
          <p>
            Built by Toxzin and the [ViKF] leadership team |{' '}
            <a href={LINKS.discord} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              Discord
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
