import { VIConButton } from '@components/molecules/icon-button/v-icon-button.mol';
import { IconType } from 'react-icons';

interface DownloadTemplateFileProps {
  onDownload: () => void;
  isLoading: boolean;
  label?: string;
  icon?: IconType;
  className?: string;
  disabled: boolean;
}

function DownloadTemplateFile({
  onDownload,
  isLoading,
  disabled,
  label = 'Download Template',
  icon,
  className = '',
}: DownloadTemplateFileProps) {
  return (
    <div className={className}>
      <VIConButton variant="link" iconProps={{ icon }} onClick={onDownload} isLoading={isLoading} disabled={disabled}>
        {isLoading ? 'Building Template...' : label}
      </VIConButton>
    </div>
  );
}

export default DownloadTemplateFile;
