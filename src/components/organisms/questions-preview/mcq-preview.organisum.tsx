import { useMemo, useState } from 'react';
import { VButton, VICon } from '@components/atoms';
import { VCheckboxGroup } from '@components/molecules/checkbox-group/v-checkbox-group.mol';
import { VRadioButtonGroup } from '@components/molecules/radio-button-group/v-radio-group.mol'; // Assuming this exists
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VFormFieldData } from '@types';
import { VModal } from '../modal/v-modal.organism';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { VLabelledInput } from '@components/molecules/index';

type MCQPreviewProps = {
  formData: VFormFieldData;
  mode?: 'preview' | 'review' | 'view';
  selectedAnswers?: string[];
  correctAnswers?: string[];
  selectionType?: 'single' | 'multiple'; // NEW
};

function MCQPreview({
  formData,
  mode = 'preview',
  selectedAnswers = [],
  correctAnswers = [],
  selectionType = 'multiple', // default to checkbox
}: MCQPreviewProps) {

  console.log("FormData in MCQ Preview : ", formData);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

  const parsedOptions = useMemo(() => {
    let optionsArray: string[] = [];

    if (Array.isArray(formData.answerOptions)) {
      optionsArray = formData.answerOptions;
    } else if (typeof formData.answerOptions === 'string') {
      optionsArray = formData.answerOptions.split(',').map((opt: string) => opt.trim());
    }

    return optionsArray.map((opt: string) => {
      let label: string | JSX.Element = opt;

      if (mode === 'review' || mode === 'view') {
        const isCorrect = correctAnswers.includes(opt);
        const isSelected = selectedAnswers.includes(opt);
  
        let colorClass = '';
        if (isCorrect) {
          colorClass = 'text-theme-positive'; // Green
        } else if (isSelected && !isCorrect) {
          colorClass = 'text-theme-negative'; // Red
        }
  
        label = <span className={`${colorClass} ${isCorrect ? 'font-semibold' : ''}`}>{opt}</span>;
      }
  
      return {
        label,
        value: opt,
      };
    });
  }, [formData, correctAnswers, selectedAnswers, mode]);
  
  const handleOptionChange = (values: string[] | string) => {
    const normalized = Array.isArray(values) ? values : [values];
    setSelectedValues(normalized);
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
    console.log('Selected Options:', selectedValues);
  };

  const displayValues = mode === 'preview' ? selectedValues : selectedAnswers;

  const hasGuidelines =
    mode === 'preview'
      ? formData.answerExplanation && formData.answerExplanation !== 'NA'
      : formData.explanation && formData.explanation !== 'NA';

  return (
    <>
      <div className="flex flex-col gap-5">
        {mode === 'preview' ? (
          <div className="flex flex-col gap-2.5">
            <VTypography as="h4">1. {formData.questionText as string}</VTypography>

            {formData.questionExplanation && formData.questionExplanation !== 'NA' && (
              <VTypography as="small" className="text-theme-secondary">
                {formData.questionExplanation as string}
              </VTypography>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            <VTypography as="h4">1. {formData.text as string}</VTypography>

            {formData.explanation && formData.explanation !== 'NA' && (
              <VTypography as="small" className="text-theme-secondary">
                {formData.explanation as string}
              </VTypography>
            )}
          </div>
        )}

        <div className="border-b theme-border-default"></div>

        {mode === 'preview' ? (
          <VTypography as="h6">Select option</VTypography>
        ) : (
          <VTypography as="h6">Selected option</VTypography>
        )}

        {selectionType === 'single' ? (
          <VRadioButtonGroup
            name="mcq-radio"
            direction="vertical"
            defaultValue={displayValues[0]}
            options={parsedOptions as { label: string; value: string }[]} // 👈 Explicit cast
            onChange={(val) => handleOptionChange(val)}
            disabled={mode === 'review' || mode === 'view'}
          />
        ) : (
          <VCheckboxGroup
            name="mcq-checkbox"
            direction="vertical"
            selectedValues={displayValues}
            options={parsedOptions}
            onChange={handleOptionChange}
            disabled={mode === 'review' || mode === 'view'}
          />
        )}

        {mode === 'preview' && (
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
                  {mode === 'preview' ? (formData.answerExplanation as string) : (formData.explanation as string)}
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

      {mode === 'preview' && (
        <VModal title="Hi User" isOpen={isModalOpen} showFooter={false} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col gap-2.5">
            {selectedValues.length > 0 ? (
              <VTypography as="p">You have selected : {selectedValues.join(', ')}</VTypography>
            ) : (
              <VTypography as="p">No options selected</VTypography>
            )}
          </div>
        </VModal>
      )}
    </>
  );
}

export default MCQPreview;
