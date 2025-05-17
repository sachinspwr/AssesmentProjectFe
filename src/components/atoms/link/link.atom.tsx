import React, { AnchorHTMLAttributes } from 'react';

type LinkProps = DefaultProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    external?: boolean; // Indicates if the link should open in a new tab
    wrapperClasses?: ClassName;
  };

function Link({ external, children, wrapperClasses, className, ...rest }: LinkProps) {
  const target = external ? '_blank' : '_self';

  return (
    <div className={wrapperClasses}>
      <a {...rest} target={target} className={`cursor-pointer hover:skew ${className}`}>
        {children}
      </a>
    </div>
  );
}

export { Link };
