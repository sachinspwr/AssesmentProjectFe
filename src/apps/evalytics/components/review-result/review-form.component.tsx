import { VButton } from '@components/atoms';
import { VLabelledInput, VLabelledTextArea } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import React, { useState } from 'react';
import { useAddTestReviewMutation } from 'store/slices/test-review.slice';

function ReviewForm({ onClose, data }: { onClose: () => void; data?: any }) {
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState('');

  const [addTestReview, { isLoading}] = useAddTestReviewMutation();

  console.log("Data : ", data);
  const respid = data.testQuestionResponses?.[0].id

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFeedbackChange = (value: string, _event?: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(value);
  };

  const handleScoreChange = (value: string) => {
    setScore(value);
  };

  const handleSubmit = async () => {
    try {
      const body = {
        feedback,
        score: parseFloat(score), // Convert string to number if required
        // include other required fields like testResultId, questionId etc.
        responseId: respid
      };

      await addTestReview({ body }).unwrap();
      onClose(); // Close modal if successful
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <VTypography as="h6" color="primary" className="mt-2">
        Add score for this question
      </VTypography>

      <VLabelledInput
        name="score"
        label="Score"
        placeholder="Enter Score"
        required
        className="w-96"
        onChange={handleScoreChange}
      />

      <VLabelledTextArea
        name="feedback"
        label="Feedback"
        placeholder="Enter Feedback"
        className="w-96"
        value={feedback}
        onChange={handleFeedbackChange}
      />

      <div className="flex flex-row gap-4 mt-2">
        <VButton variant="secondary" className="!w-[100px]" onClick={onClose}>
          Cancel
        </VButton>
        <VButton
          variant="primary"
          className="!w-[170px]"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Review & Submit
        </VButton>
      </div>
    </div>
  );
}

export default ReviewForm;
