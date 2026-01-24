'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useId } from 'react';

interface FilterItem {
  label: string;
  value: string;
}

interface FilterBarProps {
  items: readonly FilterItem[];
  title: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
}

export default function FilterBar({ value, title, items, setValue, label }: FilterBarProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-[var(--text-muted)]">
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
