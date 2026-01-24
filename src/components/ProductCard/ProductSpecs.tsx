interface Spec {
  label: string;
  value: string;
}

interface ProductSpecsProps {
  specs: Spec[];
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <div className="flex flex-col gap-1 font-semibold text-xs text-[var(--text-muted)] border-t pt-2 border-gray-100 dark:border-gray-800">
      {specs.map((spec) => (
        <div key={spec.label} className="flex flex-row justify-between">
          <span>{spec.label}</span>
          <span className="font-bold text-[var(--text-primary)]">{spec.value}</span>
        </div>
      ))}
    </div>
  );
}
