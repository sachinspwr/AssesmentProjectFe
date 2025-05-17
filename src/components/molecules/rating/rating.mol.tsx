import React, { useState } from 'react';
import { MdStarRate } from 'react-icons/md';

type RatingProps = {
  starCount?: number; // Number of stars to display, default is 5
  starvalue?: number; // Controlled rating value
  onChange?: (rating: number) => void;
  className?: string;
};

function Rating({ starCount = 5, starvalue = 0, onChange, className = '' }: RatingProps) {
  const [hovered, setHovered] = useState<number>(0);

  const handleClick = (rating: number) => {
    if (onChange) {
      onChange(rating);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {Array.from({ length: starCount }, (_, index) => {
        const star = index + 1;
        return (
          <MdStarRate
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className={`cursor-pointer text-2xl ${
              star <= (hovered || starvalue) ? 'text-yellow-500' : 'text-gray-300'
            }`}
          />
        );
      })}
    </div>
  );
}

export { Rating };
