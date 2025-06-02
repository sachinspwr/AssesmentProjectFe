import React from 'react';
import { VButton } from '@components/atoms';
import { VLoader } from '@components/molecules';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VModal } from '@components/organisms';

interface ConfirmSubmitTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export function ConfirmSubmitTestModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
}: ConfirmSubmitTestModalProps) {
  return (
    <VModal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit Test"
      width={40}
      showFooter={false}
    >
      <VTypography as="h5" className="font-semibold">
        Are you sure you want to submit your test? Once submitted, you cannot make any further
        changes.
      </VTypography>

      <div className="mt-10 mb-5 flex gap-5 justify-end">
        <VButton variant="secondary" className="!w-28 text-nowrap" onClick={onClose}>
          Cancel
        </VButton>
        <VButton
          variant="primary"
          className="!w-56 text-nowrap"
          onClick={onConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? <VLoader size="sm" /> : 'Submit Assignment'}
        </VButton>
      </div>
    </VModal>
  );
}
