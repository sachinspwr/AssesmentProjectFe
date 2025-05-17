// Avatar.tsx

import React from 'react';

interface AvatarProps {
  imageUrl?: string;
  altText: string;
  initials: string;
  size?: string;
}

function Avatar({ imageUrl, altText, initials, size = 'h-8 w-8' }: AvatarProps) {
  const avatarSize = size;
  return (
    <div className={`rounded-full border ${avatarSize} flex items-center justify-center overflow-hidden`}>
      {imageUrl ? (
        <img
          className="rounded-full w-full h-auto"
          src={imageUrl}
          alt={altText}
          onError={(e) => {
            e.currentTarget.style.display = 'none'; // Hide image if it fails to load
          }}
        />
      ) : (
        <span className="text-skin-theme font-semibold text-sm">{initials}</span>
      )}
    </div>
  );
}

export { Avatar };
