import { VModal } from '@components/organisms/modal/v-modal.organism';

interface ConfirmActionProps {
  title?: string;
  message: string;
  onSubmit: () => void;
  onClose?: () => void;
  okButtonLabel?: string;
  cancelButtonLabel?: string;
  isOpen: boolean;
  className: string;
  showFooter?: boolean;
  width?: number;
  hideCloseButton?: boolean;
}

function ConfirmAction({
  title = 'Confirm Action',
  message,
  onSubmit,
  onClose,
  okButtonLabel = 'Yes',
  cancelButtonLabel = 'No',
  isOpen,
  className = '',
  width = 50,
  showFooter = true,
  hideCloseButton
}: ConfirmActionProps) {
  if (!isOpen) return null;

  const handleModalSubmit = () => {
    onSubmit();
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <VModal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        width={width}
        okButtonLabel={okButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        onSubmit={handleModalSubmit}
        className={className}
        showFooter={showFooter}
        hideCloseButton={hideCloseButton}
      >
        {message}
      </VModal>
    </div>
  );
}

export default ConfirmAction;
