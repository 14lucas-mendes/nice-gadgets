interface ProductTitleProps {
  name: string;
  onClick: () => void;
}

export function ProductTitle({ name, onClick }: ProductTitleProps) {
  return (
    <p
      className="font-semibold text-sm line-clamp-2 text-[var(--text-primary)] cursor-pointer hover:underline transition-colors"
      onClick={onClick}
    >
      {name}
    </p>
  );
}
