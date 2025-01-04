import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviews: number;
  showCount?: boolean;
}

export function StarRating({ rating, reviews, showCount = true }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showCount && (
        <span className="text-sm text-gray-600">({reviews} reviews)</span>
      )}
    </div>
  );
}