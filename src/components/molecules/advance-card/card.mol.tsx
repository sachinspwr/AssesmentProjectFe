import React, { ReactNode } from 'react';

type CardProps = DefaultProps & {
  title?: ReactNode;
  children: ReactNode;
};

function Card({ title, className, children }: CardProps) {
  return (
    <div className={`bg-skin-theme shadow-skin-theme shadow-md rounded-lg p-6 overflow-hidden ${className}`}>
      {title && <h2 className="text-xl text-center font-semibold mb-4">{title}</h2>}
      <div className="w-full">{children}</div>
    </div>
  );
}

export { Card };
