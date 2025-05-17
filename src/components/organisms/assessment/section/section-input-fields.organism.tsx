import { VDynamicForm } from '@components/organisms/dynamic-form/v-dynamic-form.organism';
import { mapToFormFieldData, VFormFields } from '@types';
import { TestSection } from 'models';
import { useEffect, useState } from 'react';

interface SectionInputFieldsProps {
  sectionDetails?: TestSection;
  onSectionDetailChange: (value: TestSection) => void;
}

export function SectionInputFields({ sectionDetails, onSectionDetailChange }: SectionInputFieldsProps) {
  const [sectionDetail, setSectionDetail] = useState<TestSection>(sectionDetails ?? new TestSection());

  useEffect(() => {
    onSectionDetailChange(sectionDetail);
  }, [sectionDetail, onSectionDetailChange]);

  const sectionFormConfig: VFormFields[] = [
    {
      type: 'group',
      label: '',
      position: '0  0 0',
      fields: [
        {
          name: 'name',
          label: 'Section Heading',
          type: 'text',
          required: true,
          placeholder: 'Section Heading',
          position: '1 1 3',
          onChange: (value) => setSectionDetail((prev) => ({ ...prev, name: value })),
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
          required: true,
          placeholder: 'Enter description',
          position: '1 4 4',
          onChange: (value) => setSectionDetail((prev) => ({ ...prev, description: value })),
        },
        {
          name: 'cutoffScore',
          label: 'Cutoff Score(%)',
          type: 'number',
          required: true,
          placeholder: 'Enter cut off for score',
          position: '1 8 2',
          validate: (value) => {
            const num = Number(value);
            if (isNaN(num)) return 'Must be a number';
            if (num < 0) return 'Cannot be negative';
            if (num > 100) return 'Cannot exceed 100%';
            return '';
          },
          onChange: (value) => {
            setSectionDetail((prev) => ({ ...prev, cutoffScore: Number(value) }));
          },
        },
        {
          name: 'divider',
          type: 'custom',
          customContent: <hr className="my-4" />,
          position: '2 1 12',
        },
      ],
    },
  ];

  return (
    <VDynamicForm
      config={sectionFormConfig}
      initialValues={mapToFormFieldData(sectionDetail)}
      onSubmit={() => {}} // No submit needed since we're using onChange
      renderMode="edit"
      isFormSubmitting={false}
    />
  );
}
