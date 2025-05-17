import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type VLinkToProps = DefaultProps & {
  to: string;
  className?: string;
  children: ReactNode;
};

function VLink({ to, className, children }: VLinkToProps) {
  return (
    <Link
      to={to}
      style={{ textUnderlineOffset: '0.25rem' }}
      className={`text-md text-theme-link font-[500] underline decoration-1 ${className}`}
    >
      {children}
    </Link>
  );
}

export { VLink };
