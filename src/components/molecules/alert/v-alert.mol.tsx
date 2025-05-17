import React, { ReactNode, useState } from 'react';
import { IoCheckmarkCircle, IoCloseOutline } from 'react-icons/io5';
import { MdErrorOutline, MdInfoOutline, MdWarning } from 'react-icons/md';
import { VICon } from '@components/atoms/icon/v-icon.atom';

type VAlertProps = DefaultProps & {
  type: 'primary' | 'positive' | 'negative' | 'warning' | 'default';
  message?: string;
  children?: ReactNode;
};

function VAlert({ type, message, children }: VAlertProps) {
  const [closed, setClosed] = useState(false);

  const handleClose = () => {
    setClosed(true);
  };

  if (closed) {
    return null; // Return null to render nothing if closed
  }

  const getAlertClasses = () => {
    let classes = 'w-fit px-4 py-2 flex justify-between items-center rounded-lg font-medium text-sm ';
    switch (type) {
      case 'positive':
        classes += 'bg-theme-positive-lite text-theme-positive';
        break;
      case 'negative':
        classes += 'bg-theme-negative-lite text-theme-negative';
        break;
      case 'warning':
        classes += 'bg-theme-warning-lite text-theme-warning';
        break;
      case 'primary':
        classes += 'bg-theme-primary-lite text-theme-brand';
        break;
      case 'default':
        classes += 'bg-theme-default-alt text-theme-secondary';
        break;
      default:
        break;
    }
    return classes;
  };

  return (
    <div className={getAlertClasses()}>
      <div className="flex justify-center items-center gap-2">
        <div className="flex justify-center items-center gap-1">
          {type === 'positive' && <VICon icon={IoCheckmarkCircle} size={20} />}
          {type === 'negative' && <VICon icon={MdErrorOutline} size={20} />}
          {type === 'warning' && <VICon icon={MdWarning} size={20} />}
          {type === 'primary' && <VICon icon={MdInfoOutline} size={20} />}
          {message && <p className="text-sm font-medium">{message}</p>}
          {children && <p className="text-sm font-medium">{children}</p>}
        </div>
        <button className="focus:outline-none" onClick={handleClose}>
          <VICon icon={IoCloseOutline} />
        </button>
      </div>
    </div>
  );
}

export { VAlert };
