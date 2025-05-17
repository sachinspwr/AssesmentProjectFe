// ImageComponent.tsx

import React from 'react';

export function Image({ ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img className="rounded-lg shadow-sm my-4 max-w-full h-auto border border-gray-200" loading="lazy" {...props} />
  );
}
