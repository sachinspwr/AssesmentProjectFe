import { VButton, VICon } from '@components/atoms';
import { VTitleWithIcon } from '@components/molecules/icon-title/v-title-with-icon.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { TestResultResponseDTO } from '@dto/response';
import { defaultFormatDtTm } from '@utils/functions';
import { AiOutlineMail, AiOutlineMobile } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa6';
import { MdOutlineSimCardDownload } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

type CandidateProfileDetailsProps = {
  testResults?: TestResultResponseDTO;
  statusElement?: React.ReactNode; // Custom status
  onDownload?: () => void; // Optional download handler
  showBackButton?: boolean;
  customTitle?: string;
};

export default function CandidateProfileDetails({
  testResults,
  statusElement,
  onDownload,
  showBackButton = true,
  customTitle,
}: CandidateProfileDetailsProps) {
  const navigate = useNavigate();
  const { participant } = testResults;
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <VTitleWithIcon
            as="h3"
            icon={showBackButton ? FaArrowLeft : undefined}
            onClick={showBackButton ? () => navigate(-1) : undefined}
          >
            {customTitle || participant?.profile?.firstName + ' ' + participant?.profile?.lastName}
          </VTitleWithIcon>
          {statusElement}
        </div>

        {onDownload && (
          <VButton className="!w-56" variant="link" size="md" onClick={onDownload}>
            <VICon icon={MdOutlineSimCardDownload} size={16} />
            Download Result
          </VButton>
        )}
      </div>

      {/* Email & Mobile */}
      <div className="flex flex-row gap-20">
        <div className="flex gap-36 items-center mt-5">
          <VTitleWithIcon as="small" icon={AiOutlineMail} title={participant?.email} size={15} />
        </div>
        <div className="flex gap-36 items-center mt-5">
          <VTitleWithIcon as="small" icon={AiOutlineMobile} title={participant?.profile?.phone} size={15} />
        </div>
      </div>

      {/* Score Summary */}
      <div className="flex gap-20 items-center mt-4">
        <VTypography as="small">
          Total Score:{' '}
          <VTypography as="small" className="font-semibold">
            {testResults?.maxPossibleScore ?? 0}%
          </VTypography>{' '}
          ({`${testResults?.percentageScore ?? 0}`}%)
        </VTypography>
        <VTypography as="small">
          Test Completed:{' '}
          <VTypography as="small" className="font-semibold">
            {defaultFormatDtTm(testResults?.completedAt, false)}
          </VTypography>
        </VTypography>
      </div>
    </>
  );
}
