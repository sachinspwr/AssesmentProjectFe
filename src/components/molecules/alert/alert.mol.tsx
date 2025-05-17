// Alert.tsx

import { Icon } from '@components/atoms';
import React, { ReactNode, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { IoMdCheckmark } from 'react-icons/io';
import { BsInfoCircle } from 'react-icons/bs';
import { TiWarningOutline } from 'react-icons/ti';
import { MdError } from 'react-icons/md';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message?: string;
  children?: ReactNode;
}

function Alert({ type, message, children }: AlertProps) {
  const [closed, setClosed] = useState(false);

  const handleClose = () => {
    setClosed(true);
  };

  if (closed) {
    return null; // Return null to render nothing if closed
  }

  const getAlertClasses = () => {
    let classes = 'rounded-lg p-3 mb-4';
    switch (type) {
      case 'success':
        classes += ' bg-green-200 text-green-800';
        break;
      case 'error':
        classes += ' bg-red-200 text-red-800';
        break;
      case 'warning':
        classes += ' bg-yellow-200 text-yellow-800';
        break;
      case 'info':
        classes += ' bg-blue-200 text-blue-800';
        break;
      default:
        break;
    }
    return classes;
  };

  return (
    <div className={getAlertClasses()}>
      <div className="flex items-center justify-between gap-2 ">
        <div className="flex items-center gap-1">
          {type === 'success' && <Icon icon={IoMdCheckmark} />}
          {type === 'error' && <Icon icon={MdError} />}
          {type === 'warning' && <Icon icon={TiWarningOutline} />}
          {type === 'info' && <Icon icon={BsInfoCircle} />}
          {message && <p className="text-sm font-medium">{message}</p>}
          {children && <p className="text-sm font-medium">{children}</p>}
        </div>
        <Icon icon={IoCloseOutline} onClick={handleClose} />
      </div>
    </div>
  );
}

export { Alert };
