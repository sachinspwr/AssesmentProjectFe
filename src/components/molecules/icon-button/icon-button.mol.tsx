import { Button, Icon, IconProps } from '@components/atoms';
import React from 'react';

// Define the Props interface
type IConButtonProps = DefaultProps & {
  type?: 'button' | 'submit';
  varient?: 'fill' | 'bordered' | 'no-background-border';
  iconProps: IconProps;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  children?: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
};

// Define the Button component using function declaration syntax
function IConButton(iconButtonProps: IConButtonProps) {
  return (
    <Button {...iconButtonProps} className={`flex justify-center items-center gap-1 ${iconButtonProps?.className}`}>
      {!iconButtonProps.isLoading && iconButtonProps.iconPosition === 'left' && iconButtonProps.iconProps && (
        <Icon {...iconButtonProps.iconProps} />
      )}
      {iconButtonProps.children}
      {!iconButtonProps.isLoading && iconButtonProps.iconPosition === 'right' && iconButtonProps.iconProps && (
        <Icon {...iconButtonProps.iconProps} />
      )}
    </Button>
  );
}

export { IConButton };
