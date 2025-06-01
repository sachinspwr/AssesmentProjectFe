import { useState } from 'react';
import { VButton } from '@components/atoms';
import CommentCard from '@components/molecules/comment-card/comment-card.mol';
import { VLabelledTextArea } from '@components/molecules';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { TestStatus } from '@utils/enums';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useApproveTestMutation,
  useFetchTestByIdQuery,
  useRejectTestMutation,
} from 'store/slices/test-assessment.slice';
import { QuestionStatus } from '@utils/enums/question-status.enum';
import { useLoggedInUser } from '@hooks';

type TestReviewHistoryProps = {
  status?: TestStatus | QuestionStatus;
};

function TestReviewHistory({ status }: TestReviewHistoryProps) {
  const [rejectionReason, setRejectionReason] = useState('');
  const { id: testId } = useParams<{ id: string }>(); // Get testId from route
  const user = useLoggedInUser();
  const navigate = useNavigate();

  const { data: testData, isLoading } = useFetchTestByIdQuery(testId!, { skip: !testId });
  const review = testData?.testReview;

  const commentObj = review?.comment
    ? {
        comment: review.comment,
        createdById: user?.id,
        updatedById: user?.id,
        isPublic: true,
        testId: testId,
        status: 'Rejected',
      }
    : null;

  const [approveTest, { isLoading: isApproving }] = useApproveTestMutation();
  const [rejectTest, { isLoading: isRejecting }] = useRejectTestMutation();

  const handleApprove = async () => {
    try {
      if (!testId) return;
      await approveTest(testId).unwrap();
      navigate('../test');
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim() || !testId) return;

    try {
      await rejectTest({ testId, comment: rejectionReason }).unwrap();
      setRejectionReason('');
      navigate('../test');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <VTypography as="h4" className="my-4 text-theme-secondary">
        Review History
      </VTypography>

      {isLoading ? (
        <div>Loading comments...</div>
      ) : !commentObj ? (
        <div>No comments yet.</div>
      ) : (
        <CommentCard comment={commentObj} />
      )}

      {status === TestStatus.InReview && (
        <>
          <VLabelledTextArea
            name="rejection-reason"
            label="Rejection Reason"
            value={rejectionReason}
            onChange={(val) => setRejectionReason(val)}
          />
          <div className="flex flex-row gap-4">
            <VButton variant="primary" className="w-36" onClick={handleApprove} isLoading={isApproving}>
              Approve
            </VButton>
            <VButton
              variant="primary"
              className="w-36"
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
              isLoading={isRejecting}
            >
              Reject
            </VButton>
          </div>
        </>
      )}
    </div>
  );
}

export default TestReviewHistory;
