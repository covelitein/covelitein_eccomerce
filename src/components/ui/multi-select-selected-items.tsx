import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Option } from '@/types';

interface SelectedItemsProps {
  selectedOptions: Option[];
  onRemove: (value: string) => void;
}

export function SelectedItems({ selectedOptions, onRemove }: SelectedItemsProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {selectedOptions.map((option) => (
        <Badge
          key={option.value}
          className="mr-1 mb-1 bg-blue-500 text-white"
        >
          {option.label}
          <button
            className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onRemove(option.value);
              }
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={() => onRemove(option.value)}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}