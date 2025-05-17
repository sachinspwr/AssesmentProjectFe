import React, { ImgHTMLAttributes } from 'react';

type ImageProps = DefaultProps &
  ImgHTMLAttributes<HTMLImageElement> & {
    wrapperClasses?: ClassName;
  };

function Image({ wrapperClasses, className, ...rest }: ImageProps) {
  return (
    <div className={wrapperClasses}>
      <img {...rest} className={className} />
    </div>
  );
}

export { Image };
