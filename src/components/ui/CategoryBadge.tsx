interface CategoryBadgeProps {
  emoji: string;
  label: string;
}

export default function CategoryBadge({ emoji, label }: CategoryBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-bg-tertiary px-3 py-1 text-xs text-text-primary">
      <span>{emoji}</span>
      <span>{label}</span>
    </span>
  );
}
