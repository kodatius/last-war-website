import { LINKS } from '@/lib/constants';

interface DiscordButtonProps {
  className?: string;
}

export default function DiscordButton({ className }: DiscordButtonProps) {
  return (
    <a
      href={LINKS.discord}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 font-semibold text-black transition hover:bg-accent-light ${className ?? ''}`}
    >
      Join Discord
    </a>
  );
}
