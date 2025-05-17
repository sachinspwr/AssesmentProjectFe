import { ReactNode } from 'react';
import { VFileInput } from '@components/molecules/file-input/v-file-input.mol';
import { VModal } from '@components/organisms/modal/v-modal.organism';

interface SelectFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeFile: (file: File, originalEvent?: React.ChangeEvent<HTMLInputElement>) => void;
  modalTitle?: string;
  modalWidth?: number;
  okButtonLabel?: string;
  okButtonDisabled?: boolean;
  accept?: string;
  children?: ReactNode;
  onSubmit?: () => void;
  name: string;
  required?: boolean;
  disabled?: boolean;
  showPreview?: boolean;
}

function SelectFileModal({
  isOpen,
  onClose,
  onSubmit,
  onChangeFile,
  showPreview = true,
  name,
  required = false,
  disabled = false,
  modalTitle = 'Upload File',
  modalWidth = 30,
  okButtonLabel = 'Done',
  okButtonDisabled = false,
  accept = '*',
  children,
}: SelectFileModalProps) {
  return (
    <div>
      <VModal
        isOpen={isOpen}
        onClose={onClose}
        title={modalTitle}
        width={modalWidth}
        onSubmit={onSubmit}
        okButtonLabel={okButtonLabel}
        okButtonDisabled={okButtonDisabled}
      >
        <div className='flex flex-col gap-5'>
          <VFileInput
            name={name}
            required={required}
            disabled={disabled}
            showPreview={showPreview}
            onChangeFile={(file) => {
              if (file && onChangeFile) {
                onChangeFile(file);
              }
            } }
            accept={accept} 
          />
          {children}
        </div>
      </VModal>
    </div>
  );
}

export default SelectFileModal;
