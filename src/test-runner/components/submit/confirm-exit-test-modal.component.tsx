import { useState, useEffect } from 'react';
import { VModal } from '@components/organisms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

interface ConfirmExitTestModalProps {
  title?: string;
  open: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  message?: string;
  subMessages?: string[];
  isAcceptLoading?: boolean;
  acceptButtonLabel?: string;
  rejectButtonLabel?: string;
  hideCancelButton?: boolean;
  okButtonClasses?: string;
  showFooter?: boolean;
}

export function ConfirmExitTestModal({
  title = 'Confirm Test Exit',
  open,
  onAccept,
  onReject,
  message = "You're about to leave the test session.",
  subMessages = [
    'Your progress will be saved automatically.',
    'You may resume the test at any time using your original test link.',
  ],
  acceptButtonLabel = 'Exit',
  rejectButtonLabel = 'Continue',
  isAcceptLoading,
  okButtonClasses,
  hideCancelButton = false,
  showFooter,
}: ConfirmExitTestModalProps) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <VModal
      title={title}
      isOpen={isOpen}
      onSubmit={onAccept}
      onClose={onReject}
      width={40}
      okButtonLabel={acceptButtonLabel}
      cancelButtonLabel={rejectButtonLabel}
      isOkLoading={isAcceptLoading}
      cancelButtonClasses="!w-28 !text-theme-on-positive !bg-theme-positive !border-theme-positive"
      okButtonClasses={`!w-28 !text-theme-on-negative !bg-theme-negative !border-theme-negative ${okButtonClasses}`}
      hideCloseButton={true}
      hideCancelButton={hideCancelButton}
      showFooter={showFooter}
    >
      <div className="flex flex-col gap-4 text-md text-theme-on-surface">
        <VTypography as="p" className="font-medium">
          {message}
        </VTypography>

        {subMessages.length > 0 && (
          <ul className="list-inside space-y-2 pl-2">
            {subMessages.map((msg, index) => (
              <li key={index} className="text-theme-on-surface-variant">
                <VTypography as="p">{msg}</VTypography>
              </li>
            ))}
          </ul>
        )}
      </div>
    </VModal>
  );
}

export default ConfirmExitTestModal;
