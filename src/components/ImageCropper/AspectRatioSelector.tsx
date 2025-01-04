import React from 'react';
import { AspectRatio } from '@/types';
import { clsx } from 'clsx';

type Props = {
  aspectRatios: AspectRatio[];
  currentRatio: number;
  onChange: (ratio: number) => void;
};

export const AspectRatioSelector: React.FC<Props> = ({
  aspectRatios,
  currentRatio,
  onChange
}) => {
  return (
    <div className="flex gap-2">
      {aspectRatios.map((ratio) => (
        <button
          key={ratio.label}
          onClick={() => onChange(ratio.value)}
          className={clsx(
            'px-3 py-1 text-sm rounded-full transition-colors',
            currentRatio === ratio.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          )}
        >
          {ratio.label}
        </button>
      ))}
    </div>
  );
};