import { VButton } from '@components/atoms';
import { VCheckboxGroup } from '@components/molecules/checkbox-group/v-checkbox-group.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useState } from 'react';
import { VFormFieldData } from '@types';
import { VModal } from '../modal/v-modal.organism';

type FillInTheBlanksPreviewProps = {
  formData: VFormFieldData;
};

function FillInTheBlanksPreview({ formData }: FillInTheBlanksPreviewProps) {
  const options = formData.answerOptions
    ? (formData.answerOptions as string).split(',').map((option: string) => ({
        label: option.trim(), // Trim whitespace
        value: option.trim(),
      }))
    : [];

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionChange = (values: string[]) => {
    setSelectedValues(values);
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
    console.log('Selected Options:', selectedValues);
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

      <VTypography as="h5">Select options</VTypography>

      <VCheckboxGroup
        name="fillintheblanks"
        direction="vertical"
        selectedValues={selectedValues}
        options={options}
        onChange={handleOptionChange} />

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
        {selectedValues.length > 0 ? (
          <VTypography as="p">You have selected : {selectedValues.join(', ')}</VTypography>
        ) : (
          <VTypography as="p">No options selected</VTypography>
        )}
      </div>
    </VModal>

    </>
  );
}

export default FillInTheBlanksPreview;
