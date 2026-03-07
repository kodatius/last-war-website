import { LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-bg-secondary/70 py-8">
      <div className="container-shell flex flex-col gap-3 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>Built for [ViKF] | Server #2058</p>
        <p>
          Built by Toxzin and the [ViKF] leadership team |{' '}
          <a href={LINKS.discord} target="_blank" rel="noreferrer" className="text-accent hover:underline">
            Discord
          </a>
        </p>
      </div>
    </footer>
  );
}
