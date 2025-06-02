import { VButton, VICon } from '@components/atoms';
import { VLabelledInput, VRadioButtonGroup } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VFormFieldData } from '@types';
import { useState } from 'react';
import { VModal } from '../modal/v-modal.organism';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

type TrueFalsePreviewProps = {
  formData: VFormFieldData;
  mode?: 'preview' | 'review' | 'view';
  selectedAnswers?: string[];
  correctAnswers?: string[];
};

function TrueFalsePreview({ formData, mode = 'preview', selectedAnswers, correctAnswers }: TrueFalsePreviewProps) {
  const reviewSelectedAnswer = selectedAnswers?.[0] ?? '';
  const [showGuidelines, setShowGuidelines] = useState(false);

  const isPreview = mode === 'preview';
  const isReview = mode === 'review';
  const isView = mode === 'view';

  const rawOptions: string[] = Array.isArray(formData.answerOptions)
    ? formData.answerOptions
    : typeof formData.answerOptions === 'string'
      ? formData.answerOptions.split(',').map((opt) => opt.trim())
      : [];

  const options = rawOptions.map((option) => {
    if (isReview || isView) {
      const isCorrect = correctAnswers?.includes(option);
      const isSelectedWrong = selectedAnswers?.includes(option) && !isCorrect;

      let colorClass = '';
      if (isCorrect) {
        colorClass = 'text-theme-positive'; // green
      } else if (isSelectedWrong) {
        colorClass = 'text-theme-negative'; // red
      }

      return {
        label: <span className={`${colorClass} ${isCorrect ? 'font-semibold' : ''}`}>{option}</span>,
        value: option,
      };
    }

    return {
      label: option,
      value: option,
    };
  });

  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionChange = (value: string) => {
    if (isPreview) {
      setSelectedValue(value);
    }
  };

  const handleSubmit = () => {
    if (isPreview) {
      setIsModalOpen(true);
      console.log('Selected Option:', selectedValue);
    }
  };

  const selectedRadioValue = isPreview ? selectedValue ?? '' : reviewSelectedAnswer ?? '';
  const hasGuidelines = isPreview
    ? formData.answerExplanation && formData.answerExplanation !== 'NA'
    : formData.explanation && formData.explanation !== 'NA';

  return (
    <>
      <div className="flex flex-col gap-5">
        {isPreview ? (
          <div className="flex flex-col gap-2.5">
            <VTypography as="h4">1. {formData.questionText as string}</VTypography>
            {(formData.questionExplanation as string) && (formData.questionExplanation as string) !== 'NA' && (
              <VTypography as="small" className="text-theme-secondary">
                {formData.questionExplanation as string}
              </VTypography>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            <VTypography as="h4">1. {formData.text as string}</VTypography>
            {(formData.explanation as string) && (formData.explanation as string) !== 'NA' && (
              <VTypography as="small" className="text-theme-secondary">
                {formData.explanation as string}
              </VTypography>
            )}
          </div>
        )}{' '}
        <div className="border-b theme-border-default"></div>
        <VTypography as="h6">{isPreview ? 'Select option' : 'Selected option'}</VTypography>
        <VRadioButtonGroup
          name="radio"
          options={options}
          defaultValue={selectedRadioValue}
          onChange={handleOptionChange}
          disabled={mode === 'review' || mode === 'view'}
          wrapperClasses={isReview ? 'pointer-events-none opacity-80' : ''}
        />
        {isPreview && (
          <VButton variant="primary" size="md" className="!w-[90px]" onClick={handleSubmit}>
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
                  {isPreview ? (formData.answerExplanation as string) : (formData.explanation as string)}
                </VTypography>
              )}
            </div>
          </>
        )}
        {mode === 'review' ? (
          <>
            <div className="border-b theme-border-default mt-4"></div>
            <div className="flex flex-col gap-2">
              <VTypography as="h6" color="primary" className="mt-2">
                Add score for this question
              </VTypography>
              <VLabelledInput name="score" label="Score" placeholder="Enter Score" required className="w-96" />
              <div className="flex flex-row gap-4 mt-2">
                <VButton variant="secondary" className="!w-[100px]" onClick={onClose}>
                  Cancel
                </VButton>
                <VButton variant="primary" className="!w-[170px]">
                  Review & Submit
                </VButton>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      {/* Preview-only modal */}
      {isPreview && (
        <VModal title="Hi User" isOpen={isModalOpen} showFooter={false} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col gap-2.5">
            {selectedValue ? (
              <VTypography as="p">You have selected: {selectedValue}</VTypography>
            ) : (
              <VTypography as="p">No option selected.</VTypography>
            )}
          </div>
        </VModal>
      )}
    </>
  );
}

export default TrueFalsePreview;
