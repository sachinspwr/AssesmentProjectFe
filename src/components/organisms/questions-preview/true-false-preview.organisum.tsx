import { VButton } from '@components/atoms';
import { VRadioButtonGroup } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VFormFieldData } from '@types';
import { useState } from 'react';
import { VModal } from '../modal/v-modal.organism';

type TrueFalsePreviewProps = {
  formData: VFormFieldData;
};

function TrueFalsePreview({ formData }: TrueFalsePreviewProps) {

  const options = formData.answerOptions
    ? (formData.answerOptions as string).split(',').map((option: string) => ({
        label: option.trim(), // Trim whitespace
        value: option.trim(),
      }))
    : [];

  const [selectedValue, setSelectedValue] = useState<string | null>(null); // Change to a single value
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionChange = (value: string) => {
    setSelectedValue(value); // Set the selected value
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
    console.log('Selected Option:', selectedValue);
    // Handle submission logic here
  };

  return (
    <><div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        <VTypography as="h4">1. {formData.questionText as string}</VTypography>
        {(formData.questionExplanation as string) && (formData.questionExplanation as string) !== 'NA' && (
          <VTypography as="small">{formData.questionExplanation as string}</VTypography>
        )}
      </div>

      <div className="border-b theme-border-default"></div>

      <VTypography as="h5">Select right options</VTypography>

      <VRadioButtonGroup name="radio" options={options} onChange={handleOptionChange} />

      <VButton variant="primary" size="md" className="!w-[74px]" onClick={() => handleSubmit()}></VButton>

      {(formData.answerExplanation as string) && (formData.answerExplanation as string) !== 'NA' && (
        <>
          <div className="border-b theme-border-default"></div>
          <div className="flex flex-col gap-2.5">
            <VTypography as="h5">Interview Guidelines</VTypography>
            <VTypography as="small">{formData.answerExplanation as string}</VTypography>
          </div>
        </>
      )}
    </div>
    
    <VModal
      title="Hi User"
      isOpen={isModalOpen}
      showFooter={false}
      onClose={() => setIsModalOpen(false)}
    >
      <div className="flex flex-col gap-2.5">
        {selectedValue ? (
          <VTypography as="p">You have selected : {selectedValue}</VTypography>
        ) : (
          <VTypography as="p">No option selected.</VTypography>
        )}
      </div>
    </VModal>
</>

  );
}

export default TrueFalsePreview;
