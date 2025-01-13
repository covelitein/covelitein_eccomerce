import { useState, useCallback, useRef, useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { MultiSelectProps, Option } from '@/types';
import { SelectedItems } from './multi-select-selected-items';

export function MultiSelect({
  placeholder = 'Select options...',
  emptyMessage = 'No results found.',
  loadingMessage = 'Loading...',
  onLoadOptions,
  onChange,
  maxSelections,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState<number>(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOptions = options.filter((option) => 
    selectedValues.includes(option.value)
  );

  useEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth);
    }

    return () => {
        setWidth(0);
    }
  }, [triggerRef.current]);

  useEffect(() => {
    loadOptions('');
  }, []);

  const loadOptions = useCallback(
    async (inputValue: string) => {
      setLoading(true);
      try {
        const results = await onLoadOptions(inputValue);
        setOptions(results || []);
      } catch (error) {
        console.error('Error loading options:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    },
    [onLoadOptions]
  );

  const handleSelect = useCallback((value: string) => {
    setSelectedValues((current) => {
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : maxSelections && current.length >= maxSelections
        ? current
        : [...current, value];
      
      onChange?.(newValues);
      return newValues;
    });
  }, [maxSelections, onChange]);

  const handleRemove = useCallback((value: string) => {
    setSelectedValues((current) => {
      const newValues = current.filter((v) => v !== value);
      onChange?.(newValues);
      return newValues;
    });
  }, [onChange]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex flex-1 flex-wrap gap-1">
            {selectedOptions.length > 0 ? (
              <SelectedItems
                selectedOptions={selectedOptions}
                onRemove={handleRemove}
              />
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="p-0" 
        style={{ width: width ? `${width}px` : 'auto' }}
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search..."
            value={search}
            onValueChange={(value) => {
              setSearch(value);
              loadOptions(value);
            }}
          />
          <CommandList>
            {loading ? (
              <CommandEmpty>{loadingMessage}</CommandEmpty>
            ) : filteredOptions.length === 0 ? (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedValues.includes(option.value) 
                          ? 'opacity-100' 
                          : 'opacity-0'
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}