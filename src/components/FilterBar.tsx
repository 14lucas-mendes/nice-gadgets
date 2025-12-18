'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useId } from 'react';

type ItemSelectProps = {
  items: {
    label: string;
    value: string;
  }[];
  title: string;
  label: string; // Nova prop para o texto do Label
  value: string;
  setValue: (value: string) => void;
};

export default function FilterBar({ value, title, items, setValue, label }: ItemSelectProps) {
  const id = useId(); // Gera um ID único para acessibilidade

  return (
    <div className="flex flex-col gap-2">
      {/* O Label utiliza o 'id' para focar no select ao ser clicado */}
      <label htmlFor={id} className="text-sm font-medium text-muted-foreground">
        {label}
      </label>

      <Select value={value} onValueChange={setValue}>
        <SelectTrigger id={id} className="w-[176px] h-[40px] border border-[var(--border-light)]">
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
