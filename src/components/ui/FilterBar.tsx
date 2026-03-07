interface FilterBarProps {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export default function FilterBar({ options, selected, onChange }: FilterBarProps) {
  const toggle = (option: string) => {
    onChange(selected.includes(option) ? selected.filter((value) => value !== option) : [...selected, option]);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition ${
              isSelected
                ? 'border-accent bg-accent text-black'
                : 'border-border bg-bg-secondary text-text-secondary hover:border-accent/60 hover:text-text-primary'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
