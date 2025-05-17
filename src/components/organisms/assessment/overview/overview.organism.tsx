import { TestResponseDTO } from '@dto/response';
import { VOverview } from '../../overview/v-overview.organism';
import { VButton, VICon, VStatus } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { MdLaunch, MdOutlineWatchLater } from 'react-icons/md';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { GoPeople } from 'react-icons/go';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { clearSelectedTest, useDeleteTestMutation } from 'store/slices/test-assessment.slice';
import { useState } from 'react';
import ConfirmAction from '../confirm-action/confirm-action.organisms';
import { useAppDispatch } from 'store/store';
import { formatDuration } from '@utils/functions';
import { TbExternalLink } from 'react-icons/tb';

type AssessmentOverviewProps = {
  test: TestResponseDTO;
  onDeleteSuccess: () => void;
};

function AssessmentOverview({ test, onDeleteSuccess }: AssessmentOverviewProps) {
  const [deleteTest] = useDeleteTestMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function
  const dispatch = useAppDispatch();

  const handleEditClick = () => {
    dispatch(clearSelectedTest());
    navigate(`/assessments/${test.id}`); // Navigate to ManageAssessment page
  };

  const handleDeleteTest = async (testid: string) => {
    await deleteTest(testid).unwrap();
    onDeleteSuccess();
  };

  const cutoffMarks = Math.floor((test.cutoffScorePercentage / 100) * test.maxScore);

  return (
    <>
      <VOverview
        key={test?.id}
        title={test?.title}
        overViewLableChildren={<div className='flex justify-end text-theme-muted'>
        <VStatus type="positive" label={test?.status} />
        <VICon onClick={()=>navigate(`/test-runner/${test?.id}/bootstrap`)} icon={MdLaunch} className='ml-3'/>
        </div>}
      >
        <div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-8 mb-2 p-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-theme-highlight">
                <VICon type="react-icons" icon={FaRegCalendarAlt} size={20} className="mx-2 text-theme-on-secondary" />
              </div>
              <div>
                <VTypography as="h5" className="text-sm text-theme-secondary">
                  Test Format
                </VTypography>
                {/* <h2 className="text-sm font-medium text-theme-primary">Candidates</h2> */}
                <VTypography as="p" color="secondary" className="text-xs text-nowrap">
                  {test.testQuestionFormat}
                </VTypography>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-theme-highlight">
                <VICon
                  type="react-icons"
                  icon={MdOutlineWatchLater}
                  size={20}
                  className="mx-2 text-theme-on-secondary"
                />
              </div>
              <div>
                <VTypography as="h5" className="text-sm text-theme-secondary">
                  Duration
                </VTypography>
                <VTypography as="p" color="secondary" className="text-xs">
                  {`${formatDuration(test?.durationInMinutes ?? 0)}`}
                </VTypography>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-theme-highlight">
                <VICon
                  type="react-icons"
                  icon={RiQuestionnaireLine}
                  size={20}
                  className="mx-2 text-theme-on-secondary"
                />
              </div>
              <div>
                <VTypography as="h5" className="text-sm text-theme-secondary text-nowrap">
                  Total Questions
                </VTypography>
                <VTypography as="p" color="secondary" className="text-xs">
                  {test?.totalQuestions ?? 0}
                </VTypography>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-theme-highlight">
                <VICon type="react-icons" icon={GoPeople} size={20} className="mx-2 text-theme-on-secondary" />
              </div>
              <div>
                <VTypography as="h5" className="text-sm text-theme-secondary">
                  Cutoff
                </VTypography>
                <VTypography as="p" color="secondary" className="text-xs">
                  {cutoffMarks}/{test.maxScore ?? 0}
                </VTypography>
              </div>
            </div>
          </div>
          <div className="border border-theme-default"></div>
          <div className="flex">
            <VButton variant="link" onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>
              {<VTypography color="negative">Delete</VTypography>}
            </VButton>
            <div className="border-l border-theme-default"></div>
            <VButton variant="link" onClick={handleEditClick}>
              Edit
            </VButton>
          </div>
        </div>
      </VOverview>
      <ConfirmAction
        title="Confirm Deletion"
        message="Are you sure you want to delete this test ?"
        onSubmit={() => handleDeleteTest(test?.id)}
        onClose={() => setIsDeleteModalOpen(false)}
        isOpen={isDeleteModalOpen}
      />
    </>
  );
}

export default AssessmentOverview;
