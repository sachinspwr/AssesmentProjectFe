import { VFormField, VFormFieldData } from '@types';
import { VDynamicForm } from '@components/organisms';
import { VRating } from '@components/molecules';
import { VButton, VLabel } from '@components/atoms';
import { useNavigate } from 'react-router-dom';
import { TestFlowRoutes } from 'test-runner/core/endpoint.constant';

type Props = {
  onSubmit: (formData: VFormFieldData) => void;
  isFormSubmitting: boolean;
};

function ParticipantTestFeedbackForm({ onSubmit, isFormSubmitting }: Props) {
  const navigate = useNavigate();
  const feedbackFormConfig: VFormField[] = [
    {
      name: 'rating',
      type: 'renderItem',
      label: 'Overall Rating',
      required: true,
      position: '1 1 6',
      renderItem: (value, onChange) => (
        <>
          <VLabel> Overall Rating</VLabel>
          <VRating
            starvalue={Number((value as string) ?? 0)}
            isInputMode
            onChange={(val) => onChange(String(val))}
            className="mt-2"
          />
        </>
      ),
    },
    {
      name: 'clarityOfQuestions',
      type: 'renderItem',
      label: 'Clarity of Questions',
      required: true,
      position: '2 1 6',
      renderItem: (value, onChange) => (
        <>
          <VLabel> Clarity of Questions</VLabel>
          <VRating
            starvalue={Number((value as string) ?? 0)}
            isInputMode
            onChange={(val) => onChange(String(val))}
            className="mt-2"
          />
        </>
      ),
    },
    {
      name: 'overallExperience',
      type: 'renderItem',
      label: 'Overall Experience',
      required: true,
      position: '3 1 6',
      renderItem: (value, onChange) => (
        <>
          <VLabel> Overall Experience</VLabel>
          <VRating
            starvalue={Number((value as string) ?? 0)}
            isInputMode
            onChange={(val) => onChange(String(val))}
            className="mt-2"
          />
        </>
      ),
    },
    {
      name: 'recommendationsForImprovement',
      label: 'Recommendations for Improvement',
      type: 'text-area',
      placeholder: 'Provide any suggestions for improvement',
      required: false,
      position: '4 1 12',
    },
    {
      name: 'followUpRequested',
      label: 'Follow-up Requested',
      type: 'checkbox',
      required: false,
      position: '5 1 12',
    },
     {
      name: 'skip',
      type: 'custom',
      customContent: <>
      <VButton variant='secondary' onClick={() =>navigate(TestFlowRoutes.TEST_SIGNOFF) }>
        Skip For Now
      </VButton>
      </>,
      position: '7 1 3',
    },
    {
      name: 'submit',
      type: 'submit',
      label: 'Submit Feedback',
      position: '7 4 4',
    },
  ];

  return <VDynamicForm config={feedbackFormConfig} onSubmit={onSubmit} isFormSubmitting={isFormSubmitting} />;
}

export { ParticipantTestFeedbackForm };
