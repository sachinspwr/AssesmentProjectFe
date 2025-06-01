import { VModal } from '@components/organisms/modal/v-modal.organism';

interface DetectMaintenanceProps {
  title?: string;
  message: string;
  onSubmit: () => void;
  onClose?: () => void;
  okButtonLabel?: string;
  cancelButtonLabel?: string;
  isOpen: boolean;
  showFooter?: boolean;
}

function DetectMaintenance({
  title,
  message,
  onSubmit,
  onClose,
  okButtonLabel = 'Yes',
  cancelButtonLabel = 'No',
  isOpen,
  showFooter = true,
}: DetectMaintenanceProps) {
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
        width={50}
        okButtonLabel={okButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        onSubmit={handleModalSubmit}
        showFooter={showFooter}
      >
        {message}
      </VModal>
    </div>
  );
}

export default DetectMaintenance;
