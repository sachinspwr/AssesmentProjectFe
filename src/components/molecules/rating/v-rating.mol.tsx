import React, { useState } from 'react';
import { MdStarRate } from 'react-icons/md';

type VRatingProps = {
  starCount?: number;
  starvalue?: number;
  onChange?: (rating: number) => void;
  className?: string;
  isInputMode?: boolean;
  unselectedBg?: string;
  selectedBg?: string;
};

function VRating({
  starCount = 5,
  starvalue = 0,
  onChange,
  className = '',
  isInputMode = false,
  unselectedBg = 'text-gray-300',
  selectedBg = 'text-theme-brand',
}: VRatingProps) {
  const [hovered, setHovered] = useState<number>(0);
  const [currentRating, setCurrentRating] = useState<number>(starvalue);

  // Helper function to determine the star type based on the rating value
  const getStarType = (index: number) => {
    if (currentRating >= index + 1) {
      return 'full'; // Full star
    }
    if (currentRating >= index + 0.5) {
      return 'half'; // Half star
    }
    return 'empty'; // Empty star
  };

  const handleClick = (rating: number) => {
    if (isInputMode) {
      const roundedRating = Math.round(rating);
      if (onChange) {
        onChange(roundedRating);
      }
      setCurrentRating(roundedRating);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`} role="radiogroup" aria-label="Rating">
      {Array.from({ length: starCount }, (_, index) => {
        const star = index + 1;
        const starType = getStarType(star);

        return (
          <div
            key={star}
            onClick={() => handleClick(star + 1)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="relative cursor-pointer"
            role="radio"
            aria-checked={star <= (hovered || currentRating)} // Highlight stars as checked
            aria-label={`${star} star`}
          >
            {/* Full Star */}
            {starType === 'full' && (
              <MdStarRate className={`text-2xl ${selectedBg} transition-colors duration-200 ease-in-out`} />
            )}
            {/* Half Star */}
            {starType === 'half' && (
              <MdStarRate className={`text-2xl ${selectedBg}`} style={{ clipPath: 'inset(0 50% 0 0)' }} />
            )}
            {/* Empty Star */}
            {starType === 'empty' && (
              <MdStarRate className={`text-2xl ${unselectedBg} transition-colors duration-200 ease-in-out`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export { VRating };
