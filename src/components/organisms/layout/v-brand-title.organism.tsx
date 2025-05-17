import { VTitleWithIcon } from '@components/molecules/icon-title/v-title-with-icon.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

type VBrandTitleProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  title?: string;
  className?: string;
  children?: React.ReactNode;
};

function VBrandHeader({ as, title, children, className }: VBrandTitleProps) {
  return (
    <VTitleWithIcon>
      <VTypography as={as ?? 'h1'} color="brand" className={`font-[kufam] font-normal ${className}`}>
        {title}
        {children}
      </VTypography>
    </VTitleWithIcon>
  );
}

export { VBrandHeader };
