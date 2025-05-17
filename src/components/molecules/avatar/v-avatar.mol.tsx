import React from 'react';

interface VAvatarProps {
  imageUrl?: string; // URL of the avatar image
  altText: string; // Alt text for the image
  initials: string; // Fallback initials if the image is unavailable
  size?: string;
  wrapperClass?: string;
  initalsClass?: string;
}

function VAvatar({ imageUrl, altText, initials, wrapperClass, initalsClass, size = 'h-8 w-8' }: VAvatarProps) {
  return (
    <div
      className={`rounded-full border ${size} bg-theme-primary-lite  flex items-center justify-center overflow-hidden ${wrapperClass}`}
    >
      {imageUrl ? (
        <img
          className="rounded-full w-full h-full object-cover"
          src={imageUrl}
          alt={altText}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <span className={`text-theme-on-default font-semibold text-sm ${initalsClass}`}>{initials}</span>
      )}
    </div>
  );
}

export { VAvatar };
