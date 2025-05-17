import { VICon } from '@components/atoms';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { VTypography } from '../typography/v-typography.mol';

type IConWithLabelProps = DefaultProps & {
  icon: IconType;
  size?: number;
  color?: string;
  label?: ReactNode;
  onClick?: () => void;
  labelClasses?: ClassName;
};

function IConWithLabel({
  icon,
  size = 24,
  color = 'text-theme-primary',
  label,
  onClick,
  className = '',
  labelClasses,
}: IConWithLabelProps) {
  return (
    <div className="flex flex-row justify-center items-center gap-1 cursor-pointer" onClick={onClick}>
      <VICon icon={icon} size={size} color={color} className={className} />
      <VTypography className={labelClasses}>{label}</VTypography>
    </div>
  );
}

export { IConWithLabel };
