interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <div className="mt-2 h-1 w-24 rounded-full bg-accent" />
      {subtitle ? <p className="mt-3 max-w-3xl text-text-secondary">{subtitle}</p> : null}
    </div>
  );
}
