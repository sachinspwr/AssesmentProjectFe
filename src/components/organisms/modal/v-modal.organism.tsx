import { VButton } from '@components/atoms';
import { VICon } from '@components/atoms/icon/v-icon.atom';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { IoCloseOutline } from 'react-icons/io5';

type VModalProps = DefaultProps & {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title: ReactNode;
  okButtonLabel?: string;
  okButtonIcon?: IconType;
  okButtonClasses?: ClassName;
  okButtonDisabled?: boolean;
  cancelButtonLabel?: string;
  cancelButtonIcon?: IconType;
  cancelButtonClasses?: ClassName;
  hideCancelButton?: boolean;
  hideCloseButton?: boolean;
  isLoading?: boolean;
  width?: number;
  height?: {
    value?: number;
    unit?: string;
  };
  classes?: {
    wrapper?: string;
    title?: ClassName;
    titleWrapper?: ClassName;
    body?: ClassName;
    footer?: ClassName;
  };
  showFooter?: boolean;
  children: React.ReactNode;
};

function VModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  okButtonLabel = 'SAVE',
  okButtonIcon,
  okButtonClasses,
  okButtonDisabled,
  cancelButtonLabel = 'CANCEL',
  cancelButtonClasses,
  cancelButtonIcon,
  hideCancelButton = false,
  hideCloseButton = false,
  width,
  height,
  classes,
  showFooter = true,
  isLoading,
  children,
}: VModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`w-full fixed inset-0 flex items-center justify-center 
        bg-theme-default-backdrop bg-opacity-50 z-50 ${classes?.wrapper}`}
    >
      <div
        className="bg-theme-default rounded-lg shadow-lg w-1/3"
        style={{ minWidth: `${width}vw`, maxWidth: '100vw' }}
      >
        {/* model header */}
        <div className={`flex justify-between items-center p-4 border-b ${classes?.titleWrapper}`}>
          <div className={`text-xl font-semibold ${classes?.title}`}>{title}</div>

          {!hideCloseButton && (
            <VICon
              icon={IoCloseOutline}
              onClick={onClose}
              size={28}
              className="p-0.5 hover:rounded-full hover:bg-theme-default-hover"
            />
          )}
        </div>
        {/* modal body */}

        <div
          className={`w-full p-4 overflow-y-auto ${classes?.body}`}
          style={{ minHeight: `${height?.value}${height?.unit}`, maxHeight: '75vh' }}
        >
          {children}
        </div>

        {/* modal footer */}
        {showFooter && (
          <div className={`flex justify-end p-4 border-t`}>
            <div className={`flex justify-end gap-2 ${classes?.footer}`}>
              {!hideCancelButton && (
                <VButton variant="secondary" onClick={onClose} className={cancelButtonClasses}>
                  {cancelButtonIcon && <VICon icon={cancelButtonIcon} size={20} />}
                  {cancelButtonLabel}
                </VButton>
              )}
              <VButton onClick={onSubmit} className={okButtonClasses} disabled={okButtonDisabled} isLoading={isLoading}>
                {okButtonIcon && <VICon icon={okButtonIcon} size={20} />}
                {okButtonLabel}
              </VButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { VModal };
