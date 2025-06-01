import { useState } from 'react';
import { VButton } from '@components/atoms';
import CommentCard from '@components/molecules/comment-card/comment-card.mol';
import { VLabelledTextArea } from '@components/molecules';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useNavigate, useParams } from 'react-router-dom';
import { QuestionStatus } from '@utils/enums/question-status.enum';
import { useLoggedInUser } from '@hooks';
import {
  useApproveQuestionMutation,
  useFetchQuestionByIdQuery,
  useRejectQuestionMutation,
} from 'store/slices/questions.slice';

type QuestionReviewHistoryProps = {
  status?: QuestionStatus;
};

function QuestionReviewHistory({ status }: QuestionReviewHistoryProps) {
  const [rejectionReason, setRejectionReason] = useState('');
  const { id: questionId } = useParams<{ id: string }>(); // Get testId from route
  const user = useLoggedInUser();
  const navigate = useNavigate();

  const { data: questionData, isLoading } = useFetchQuestionByIdQuery(questionId!, { skip: !questionId });
  const review = questionData?.questionReview;

  const commentObj = review?.comment
    ? {
        comment: review.comment,
        createdById: user?.id,
        updatedById: user?.id,
        isPublic: true,
        questionId: questionId,
        status: 'Rejected',
      }
    : null;

  const [approveQuestion, { isLoading: isApproving }] = useApproveQuestionMutation();
  const [rejectQuestion, { isLoading: isRejecting }] = useRejectQuestionMutation();

  const handleApprove = async () => {
    try {
      if (!questionId) return;
      await approveQuestion(questionId).unwrap();
      navigate('../question');
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim() || !questionId) return;

    try {
      await rejectQuestion({ questionId, comment: rejectionReason }).unwrap();
      setRejectionReason('');
      navigate('../question');
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

      {status === QuestionStatus.InReview && (
        <>
          <VLabelledTextArea
            name="rejection-reason"
            label="Rejection Reason"
            value={rejectionReason}
            onChange={(val) => setRejectionReason(val)}
          />
          <div className="flex flex-row gap-4">
            <VButton variant="primary" className="!w-36" onClick={handleApprove} isLoading={isApproving}>
              Approve
            </VButton>
            <VButton
              variant="primary"
              className="!w-36"
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

export default QuestionReviewHistory;
