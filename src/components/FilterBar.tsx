'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ItemSelectProps = {
  items: {
    label: string;
    value: string;
  }[];
  title: string; // Será usado como placeholder
  value: string;
  setValue: (value: string) => void;
};

export default function FilterBar({ value, title, items, setValue }: ItemSelectProps) {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[176px] h-[40px]">
        {/* O placeholder exibe o 'title' quando nenhum valor está selecionado */}
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
  );
}