import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}

export const ScrollButton: React.FC<ScrollButtonProps> = ({
  direction,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        absolute top-1/2 -translate-y-1/2 z-10
        ${direction === 'left' ? 'left-0' : 'right-0'}
        h-full px-2 py-1
        bg-white/80 backdrop-blur-sm
        disabled:opacity-0 disabled:pointer-events-none
        transition-opacity duration-200
        hover:bg-white/90
        focus:outline-none focus:ring-2 focus:ring-blue-500
      `}
      aria-label={`Scroll ${direction}`}
    >
      {direction === 'left' ? (
        <ChevronLeft className="w-5 h-5" />
      ) : (
        <ChevronRight className="w-5 h-5" />
      )}
    </button>
  );
};