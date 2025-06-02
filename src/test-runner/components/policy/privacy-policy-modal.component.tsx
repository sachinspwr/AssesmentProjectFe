import { useState, useEffect } from 'react';
import { VModal } from '@components/organisms';
import PrivacyPolicyContent from './privacy-policy-content.component';

interface PrivacyPolicyModalProps {
  open: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export function PrivacyPolicyModal({ open, onAccept, onReject }: PrivacyPolicyModalProps) {
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
      title="Agreement"
      isOpen={isOpen}
      onSubmit={() => onAccept()}
      onClose={() => onReject()}
      className="max-h-[90vh]"
      width={40}
      okButtonLabel="Accept"
      cancelButtonLabel="Reject"
      cancelButtonClasses="!text-theme-on-negative !bg-theme-negative !border-theme-negative"
      hideCloseButton={true}
    >
      <div className="flex flex-col h-full">
        <PrivacyPolicyContent />
      </div>
    </VModal>
  );
}

export default PrivacyPolicyModal;