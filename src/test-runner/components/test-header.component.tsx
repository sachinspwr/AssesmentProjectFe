import { VICon } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { FaArrowLeft } from 'react-icons/fa6';
import { IoMdStopwatch } from 'react-icons/io';
import { Timer } from './timer.component';
import { useAppSelector } from 'store/store';
import { VModal } from '@components/organisms';
import { VLoader } from '@components/molecules/index';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSubmitTestByUserMutation } from 'store/slices/test-runner.slice';

const TestHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [toastShown, setToastShown] = useState(false);
  const [submitTestByUser, { isLoading, isSuccess, error }] = useSubmitTestByUserMutation();
  const handleTick = (remainingTime: number) => {
    if (remainingTime <= 10 && !toastShown) {
      toast.success('Test will be auto-submitted in 10 seconds!',{duration:1000});
      setToastShown(true);
    }
  };

  const handleTimeElapsed = async() => {
    setShowModal(true);
      try {
          await submitTestByUser().unwrap();
          toast.success('Test submitted successfully');
          navigate('/test-runner/sign-off');
          // maybe navigate or show success alert
        } catch (err) {
          console.error('Submission failed:', err);
        }
  };




  const testDetails = useAppSelector((state) => state.testRunner.testDetails);
  const totalQuestions = parseInt(testDetails?.totalQuestions) || 0;


  const attemptedQuestions = useAppSelector((state) => {
    return state.testRunner.sections.reduce((total, section) => {
      return total + Object.keys(section.userAnswers).length;
    }, 0);
  });
  const cutoffMarks = Math.floor(
    (((testDetails?.cutoffScorePercentage as number) / 100) * testDetails?.maxScore) as number
  );
  const progressPercentage = totalQuestions > 0 ? (attemptedQuestions / totalQuestions) * 100 : 0;
  return (
    <div className="">
      {/* bg-theme-highlight  for bg color */}
      <div className="flex items-center gap-5">
        {/* <VICon icon={FaArrowLeft} size={18} /> */}
        <VTypography as="h4">Test Details</VTypography>
      </div>
      <div className="flex justify-between items-center">
        <div className="mt-5 flex gap-5 items-center">
          <div>
            <VTypography as="small" color="muted">
              Total Sections:{' '}
              <VTypography as="small" className="font-semibold">
                {testDetails?.testSections?.length}
              </VTypography>
            </VTypography>
          </div>
          <div>
            <VTypography as="small" color="muted">
              Total Questions:{' '}
              <VTypography as="small" className="font-semibold">
                {testDetails?.totalQuestions}
              </VTypography>
            </VTypography>
          </div>
          <div>
            <VTypography as="small" color="muted">
              Level:
              <VTypography as="small" className="font-semibold">
                {testDetails?.experienceLevel?.name ?? 'N/A'}
              </VTypography>
            </VTypography>
          </div>
          <div>
            <VTypography as="small" color="muted">
              Pass Criteria:
              <VTypography as="small" className="font-semibold">
                {`${cutoffMarks} / ${testDetails?.maxScore}`}
              </VTypography>
            </VTypography>
          </div>
          <div>
            <VTypography as="small" color="muted">
              Duration:
              <VTypography as="small" className="font-semibold">
                {`${testDetails?.durationInMinutes} Min`}
              </VTypography>
            </VTypography>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <div className="!min-w-80">
            <div className="flex justify-between mb-1 ">
              <VTypography className="text-sm font-semibold">Progress</VTypography>
              <VTypography color="muted" className="text-sm text-theme-secondary">
                {`${progressPercentage.toFixed(0)}% (${attemptedQuestions}/${totalQuestions})`}
              </VTypography>
            </div>
            <div className="h-2 bg-theme-muted rounded">
              <div className={`h-full bg-theme-positive rounded`} style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <VICon icon={IoMdStopwatch} size={22} />
            <Timer
              mode="plain"
              timeValue={testDetails?.durationInMinutes}
              onTimeElapsed={handleTimeElapsed}
              onTick={handleTick}
            />
          </div>
        </div>
      </div>
      <VModal hideCancelButton={true} isOpen={showModal} title="Auto Submitting" showFooter={false}>
        <VLoader position="inline" />
        <VTypography as="h5">Your test time has ended. Auto-submitting your answers...</VTypography>
      </VModal>
    </div>
  );
};

export default TestHeader;
