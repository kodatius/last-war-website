import Card from '@/components/ui/Card';

interface FormationCardProps {
  name: string;
  heroes: string[];
  description: string;
}

export default function FormationCard({ name, heroes, description }: FormationCardProps) {
  return (
    <Card>
      <h3 className="text-xl font-semibold">{name}</h3>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-5">
        {heroes.map((hero, index) => (
          <div key={`${hero}-${index}`} className="rounded-md border border-border bg-bg-tertiary px-2 py-2 text-center">
            {hero}
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-text-secondary">{description}</p>
    </Card>
  );
}
