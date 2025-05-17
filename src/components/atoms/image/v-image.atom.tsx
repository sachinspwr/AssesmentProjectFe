import React, { ImgHTMLAttributes } from 'react';

type VImageProps = DefaultProps &
  ImgHTMLAttributes<HTMLImageElement> & {
    wrapperClasses?: string;
    fallbackSrc?: string; // Fallback image when the src is missing
    size?: 'sm' | 'md' | 'lg'; // Size variant
  };

function VImage({
  wrapperClasses,
  className,
  fallbackSrc = 'src/assets/svgs/image-missing.svg',
  alt = 'Image',
  size = 'md', // Default size
  ...rest
}: VImageProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallbackSrc) {
      (e.target as HTMLImageElement).src = fallbackSrc;
    }
  };

  // Size classes mapping
  const sizeClasses = {
    sm: 'max-w-xs',  // 320px
    md: 'max-w-md',  // 448px
    lg: 'max-w-lg'   // 512px
  };

  return (
    <div className={`${wrapperClasses} ${sizeClasses[size]}`}>
      <img {...rest} className={`w-full h-auto object-cover ${className}`} alt={alt} onError={handleError} />
    </div>
  );
}

export { VImage };