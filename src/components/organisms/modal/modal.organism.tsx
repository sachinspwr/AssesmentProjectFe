import { Button, Icon } from '@components/atoms';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { IoCloseOutline } from 'react-icons/io5';
import { LuSaveAll } from 'react-icons/lu';

type ModalProps = DefaultProps & {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title: ReactNode;
  okButtonLabel?: string;
  okButtonIcon?: IconType;
  okButtonClasses?: ClassName;
  cancelButtonLabel?: string;
  cancelButtonIcon?: IconType;
  cancelButtonClasses?: ClassName;
  hideCancelButton?: boolean;
  hideCloseButton?: boolean;
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

function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  okButtonLabel = 'SAVE',
  okButtonIcon = LuSaveAll,
  okButtonClasses,
  cancelButtonLabel = 'CANCEL',
  cancelButtonClasses,
  cancelButtonIcon = IoCloseOutline,
  hideCancelButton = false,
  hideCloseButton = false,
  width,
  height,
  classes,
  showFooter = true,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`w-full fixed inset-0 flex items-center justify-center 
        bg-skin-theme-invert-light bg-opacity-50 z-50 ${classes?.wrapper}`}
    >
      <div className="bg-skin-theme rounded-lg shadow-lg w-1/3" style={{ minWidth: `${width}vw`, maxWidth: '100vw' }}>
        {/* model header */}
        <div className={`flex justify-between items-center p-4 border-b ${classes?.titleWrapper}`}>
          <div className={`text-xl font-semibold ${classes?.title}`}>{title}</div>

          {!hideCloseButton && (
              <Icon icon={IoCloseOutline} onClick={onClose} className="hover:rounded-full hover:bg-gray-200" />
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
          <div className={`flex justify-end p-4 border-t gap-2 ${classes?.footer}`}>
            {!hideCancelButton && (
              <Button
                onClick={onClose}
                varient="no-background-border"
                className={`flex flex-row justify-center items-center bg-skin-theme-light
                font-bold text-red-700  focus:!ring-1 focus:ring-red-800 ${cancelButtonClasses}`}
              >
                <Icon icon={cancelButtonIcon} size={20} /> {cancelButtonLabel}
              </Button>
            )}
            <Button
              onClick={onSubmit}
              varient="no-background-border"
              className={`flex flex-row gap-1 justify-center items-center bg-skin-theme-light
               font-bold text-green-700 focus:!ring-1 focus:ring-green-600 ${okButtonClasses}`}
            >
              <Icon icon={okButtonIcon} size={20} />
              <div>{okButtonLabel}</div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export { Modal };
