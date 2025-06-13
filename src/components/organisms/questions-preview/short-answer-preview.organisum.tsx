import { VButton, VICon, VTextArea } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VFormFieldData } from '@types';
import ReviewForm from 'apps/evalytics/components/review-result/review-form.component';
import { useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

type ShortAnswerFormData = VFormFieldData & {
  testQuestionResponses?: { gradingStatus?: string }[];
};

type ShortAnswerPreviewProps = {
  onClose?: () => void;
  formData: VFormFieldData;
  mode?: 'preview' | 'review' | 'view';
  selectedAnswers?: string;
  correctAnswers?: string;
};

function ShortAnswerPreview({ formData, mode = 'preview', selectedAnswers, onClose }: ShortAnswerPreviewProps) {
  const reviewAnswer = selectedAnswers ?? '';
  const [showGuidelines, setShowGuidelines] = useState(false);

  const hasGuidelines = formData.answerExplanation && formData.answerExplanation !== 'NA';

  const gradingStatus = (formData as ShortAnswerFormData)?.testQuestionResponses?.[0]?.gradingStatus;


  return (
    <div className="flex flex-col gap-5">
      {/* Question Text & Explanation */}
      <div className="flex flex-col gap-2.5">
        <VTypography as="h4">1. {formData.questionText as string}</VTypography>
        {formData.questionExplanation && formData.questionExplanation !== 'NA' && (
          <VTypography as="small" className="text-theme-secondary">
            {formData.questionExplanation as string}
          </VTypography>
        )}
      </div>

      <div className="border-b theme-border-default" />

      {/* Answer Section */}
      <div className="flex flex-col gap-2.5">
        {mode === 'preview' ? (
          <VTextArea
            name="shortans"
            placeholder="Enter short answer"
            className="!w-[530px] h-[90px]"
            value={''}
            onChange={() => {}}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <VTypography as="h6">Submitted Answer</VTypography>
            <VTypography as="p">{reviewAnswer || 'No answer submitted.'}</VTypography>
          </div>
        )}
      </div>

      {/* Submit Button (only in preview mode) */}
      {mode === 'preview' && (
        <VButton variant="primary" size="md" className="!w-[74px]">
          Submit
        </VButton>
      )}

      {/* Collapsible Interview Guidelines */}
      {hasGuidelines && (
        <>
          <div className="border-b theme-border-default" />
          <div className="flex flex-col gap-2.5">
            {/* Header Row */}
            <div className="flex items-center justify-between">
              {/* Left Side Icon + Label */}
              <div className="flex items-center gap-2">
                <VTypography as="h6">Interview Guidelines</VTypography>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => setShowGuidelines((prev) => !prev)}
                className="flex items-center gap-1 text-theme-primary font-medium"
              >
                <VICon icon={showGuidelines ? MdArrowDropUp : MdArrowDropDown} className="text-lg" />
              </button>
            </div>

            {/* Collapsible Content */}
            {showGuidelines && (
              <VTypography as="small" className="text-theme-secondary">
                {formData.answerExplanation as string}
              </VTypography>
            )}
          </div>
        </>
      )}

      {mode === 'review' && gradingStatus === 'NEEDS_REVIEW' ? (
        <>
          <ReviewForm onClose={() => onClose} data={formData} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ShortAnswerPreview;
