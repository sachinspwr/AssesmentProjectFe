import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { VButton, VICon } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { PartInstructions, PartSectionOverview, PartTestSummary } from 'test-runner/components/overview';
import { TestFlowRoutes } from 'test-runner/core';
import { TbListDetails } from 'react-icons/tb';
import { PrivacyPolicyModal } from 'test-runner/components';
import { useDispatch } from 'react-redux';
import { useTestRunnerSelector, selectTestDetails } from 'test-runner/store';
import { acceptPrivacyPolicy, rejectPrivacyPolicy, selectAcceptedPrivacyPolicy } from 'test-runner/store/participant';
import { ConfirmExitTestModal } from 'test-runner/components/submit';

function TestOverviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Read flag from location.state
  const showPolicyFromRoute = location.state?.showPolicyModal ?? false;

  const [shouldShowPrivacyPolicy, setShouldShowPrivacyPolicy] = useState(showPolicyFromRoute);
  const testDetails = useTestRunnerSelector(selectTestDetails);
  const acceptedPrivacyPolicy = useTestRunnerSelector(selectAcceptedPrivacyPolicy);

  const [showExitModel, setShowExitModel] = useState(false);

  // Handle navigation after accept/reject
  useEffect(() => {
    if (acceptedPrivacyPolicy === true) {
      navigate(TestFlowRoutes.TEST_INTERFACE);
    } else if (acceptedPrivacyPolicy === false && location.pathname !== TestFlowRoutes.PRIVACY_POLICY_REJECTED) {
      navigate(TestFlowRoutes.PRIVACY_POLICY_REJECTED);
    }
  }, [acceptedPrivacyPolicy, navigate, location.pathname]);

  const handleStartTest = () => {
    setShouldShowPrivacyPolicy(true);
  };

  const handleAccept = () => {
    dispatch(acceptPrivacyPolicy());
    setShouldShowPrivacyPolicy(false);
  };

  const handleReject = () => {
    dispatch(rejectPrivacyPolicy());
    setShouldShowPrivacyPolicy(false);
  };

  const handleCancelClick = () => setShowExitModel(true);

  const handleConfirmCancel = () => {
    setShowExitModel(false);
    navigate(TestFlowRoutes.TEST_CANCELLED);
  };

  const handleRejectCancel = () => setShowExitModel(false);

  if (!testDetails) return null;

  return (
    <div className="px-10 my-4 flex flex-col gap-4">
      <VTypography as="h3" className="flex gap-1 justify-start items-center">
        <VICon size={20} icon={TbListDetails} />
        Test Details
      </VTypography>

      <div className="border border-theme-default" />

      <PartTestSummary testDetails={testDetails} />

      <div className="border border-theme-default" />

      <PartSectionOverview test={testDetails} />

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <VTypography as="h4">Instructions</VTypography>
          <VTypography as="p">Rules and regulations for your assessment.</VTypography>
        </div>

        <div className="ml-2">
          <PartInstructions instructions={testDetails?.instructions ?? []} groupByCategory={true} />
        </div>
      </div>

      <div className="border border-theme-default" />

      <div className="flex items-center gap-3">
        <VButton type="button" variant="secondary" className="!w-24" onClick={handleCancelClick}>
          Cancel
        </VButton>
        {/* <VButton type="button" variant="primary" className="!w-48">
          Sample Assessment
        </VButton> */}
        <VButton
          type="button"
          variant="primary"
          className="!w-36"
          onClick={handleStartTest}
          disabled={!testDetails?.sections?.length}
        >
          Start Test
        </VButton>
      </div>

      <PrivacyPolicyModal
        open={shouldShowPrivacyPolicy || acceptedPrivacyPolicy === false}
        onAccept={handleAccept}
        onReject={handleReject}
      />

      <ConfirmExitTestModal
        open={showExitModel}
        onAccept={handleConfirmCancel}
        onReject={handleRejectCancel}
        message="Are you sure you want to leave the test now? Your progress will not be saved, and you’ll need to start over if you return."
        subMessages={['You can come back anytime later using the same test link to resume where you left off.']}
      />
    </div>
  );
}

export default TestOverviewPage;
