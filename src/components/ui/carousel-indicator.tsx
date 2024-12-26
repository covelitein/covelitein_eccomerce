import * as React from 'react';
import { cn } from '@/lib/utils';

interface CarouselIndicatorProps {
  selectedIndex: number;
  itemCount: number;
  variant?: 'dots' | 'bars' | 'numbers';
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  onSelect?: (index: number) => void;
}

export function CarouselIndicator({
  selectedIndex,
  itemCount,
  variant = 'dots',
  className,
  activeClassName,
  inactiveClassName,
  onSelect,
}: CarouselIndicatorProps) {
  const indicators = Array.from({ length: itemCount }, (_, i) => i);

  const baseStyles = {
    dots: 'h-2 w-2 rounded-full transition-all duration-300',
    bars: 'h-1 flex-1 rounded-sm transition-all duration-300',
    numbers: 'h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
  };

  const activeStyles = {
    dots: 'bg-primary scale-125',
    bars: 'bg-primary',
    numbers: 'bg-primary text-primary-foreground',
  };

  const inactiveStyles = {
    dots: 'bg-muted-foreground/30 hover:bg-muted-foreground/50',
    bars: 'bg-muted-foreground/30 hover:bg-muted-foreground/50',
    numbers: 'bg-muted hover:bg-muted/80 text-muted-foreground',
  };

  return (
    <div
      className={cn(
        'flex gap-2',
        variant === 'bars' ? 'px-4 w-full' : 'justify-center',
        className
      )}
    >
      {indicators.map((index) => (
        <button
          key={index}
          onClick={() => onSelect?.(index)}
          className={cn(
            'cursor-pointer',
            baseStyles[variant],
            index === selectedIndex
              ? cn(activeStyles[variant], activeClassName)
              : cn(inactiveStyles[variant], inactiveClassName)
          )}
          aria-label={`Go to slide ${index + 1}`}
        >
          {variant === 'numbers' && index + 1}
        </button>
      ))}
    </div>
  );
}