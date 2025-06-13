import { VButton, VICon } from '@components/atoms';
import { VCheckboxGroup } from '@components/molecules/checkbox-group/v-checkbox-group.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useState } from 'react';
import { VFormFieldData } from '@types';
import { VModal } from '../modal/v-modal.organism';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import ReviewForm from 'apps/evalytics/components/review-result/review-form.component';

type FillInTheBlanksFormData = VFormFieldData & {
  testQuestionResponses?: { gradingStatus?: string }[];
};


type FillInTheBlanksPreviewProps = {
  formData: VFormFieldData;
  mode?: 'preview' | 'review' | 'view';
  selectedAnswers?: string[];
  correctAnswers?: string[];
  onClose?: () => void;
};

function FillInTheBlanksPreview({
  formData,
  mode = 'preview',
  selectedAnswers = [],
  correctAnswers = [],
  onClose,
}: FillInTheBlanksPreviewProps) {
  const isPreview = mode === 'preview';
  const isReview = mode === 'review';

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

  const reviewSelectedValues = selectedAnswers ?? [];

  const options = formData.answerOptions
    ? (Array.isArray(formData.answerOptions)
        ? formData.answerOptions
        : (formData.answerOptions as string).split(',')
      ).map((rawOption: string) => {
        const option = rawOption.trim();

        if (isReview) {
          const isCorrect = correctAnswers?.includes(option);
          const isSelectedWrong = selectedAnswers?.includes(option) && !isCorrect;

          let colorClass = '';
          if (isCorrect) colorClass = 'text-theme-positive';
          else if (isSelectedWrong) colorClass = 'text-theme-negative';

          return {
            label: <span className={`${colorClass} ${isCorrect ? 'font-semibold' : ''}`}>{option}</span>,
            value: option,
          };
        }

        return { label: option, value: option };
      })
    : [];

  const handleOptionChange = (values: string[]) => {
    if (isPreview) setSelectedValues(values);
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
    console.log('Selected Options:', selectedValues);
  };

  const displaySelectedValues = isPreview ? selectedValues : reviewSelectedValues;

  const hasGuidelines = formData.answerExplanation && formData.answerExplanation !== 'NA';

  const gradingStatus = (formData as FillInTheBlanksFormData)?.testQuestionResponses?.[0]?.gradingStatus;


  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Question Text */}
        <div className="flex flex-col gap-2.5">
          <VTypography as="h4">1. {formData.questionText as string}</VTypography>
          {(formData.questionExplanation as string) && (formData.questionExplanation as string) !== 'NA' && (
            <VTypography as="small" className="text-theme-secondary px-2">
              {formData.questionExplanation as string}
            </VTypography>
          )}
        </div>

        <div className="border-b theme-border-default" />

        {/* Option Selection */}
        <VTypography as="h6">{isPreview ? 'Select option' : 'Selected option'}</VTypography>

        <VCheckboxGroup
          name="fillintheblanks"
          direction="vertical"
          selectedValues={displaySelectedValues}
          options={options}
          onChange={handleOptionChange}
          wrapperClasses={isReview ? 'pointer-events-none opacity-80' : ''}
          disabled={mode === 'review'}
        />

        {isPreview && (
          <VButton variant="primary" size="md" className="!w-[74px]" onClick={handleSubmit}>
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

      {/* Modal */}
      {isPreview && (
        <VModal title="Hi User" isOpen={isModalOpen} showFooter={false} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col gap-2.5">
            {selectedValues.length > 0 ? (
              <VTypography as="p">You have selected: {selectedValues.join(', ')}</VTypography>
            ) : (
              <VTypography as="p">No options selected.</VTypography>
            )}
          </div>
        </VModal>
      )}
    </>
  );
}

export default FillInTheBlanksPreview;
