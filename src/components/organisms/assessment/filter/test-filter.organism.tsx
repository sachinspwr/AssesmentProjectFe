import { VRangeInput } from '@components/molecules/range-input/v-range-input.mol';
import VFilter, { VFilterRef } from '@components/organisms/filter/v-filter.organism';
import { FormFieldData, VFormFields } from '@types';
import { TestQuestionFormat, TestStatus } from '@utils/enums';

interface TestFilterProps {
  experienceLevel: { id: string; name: string }[];
  scope: string;
  onApplyFilter: (formData: FormFieldData) => void;
  onReset: () => void;
  filterRef: React.RefObject<VFilterRef>;
  filterButtonRef: React.RefObject<HTMLButtonElement>;
}

export function TestFilter({ 
  experienceLevel, 
  onApplyFilter, 
  onReset, 
  filterRef, 
  filterButtonRef 
}: TestFilterProps) {
  const filterConfig: VFormFields[] = [
    {
      name: 'status',
      type: 'select',
      options: Object.values(TestStatus).map(value => ({ value, label: value })),
      label: 'Status',
      position: '1 1 2'
    },
    {
      name: 'testQuestionFormat',
      type: 'select',
      options: Object.values(TestQuestionFormat).map(value => ({ value, label: value })),
      label: 'Question Type',
      position: '1 3 2'
    },
    {
      name: 'experienceLevelId',
      type: 'select',
      options: experienceLevel?.map(({ id, name }) => ({ value: id, label: name })) || [],
      label: 'Experience Level',
      position: '1 5 2'
    },
    {
      name: 'durationRange',
      type: 'renderItem',
      renderItem: (_, onChange) => (
        <VRangeInput
          label="Duration (min)"
          min={1}
          max={300}
          initialMin={null}
          initialMax={null}
          onChange={(min, max) => onChange('', { 
            durationMin: String(min ?? 0), 
            durationMax: String(max ?? 180) 
          })}
        />
      ),
      position: '1 7 2'
    },
    {
      name: 'maxScoreRange',
      type: 'renderItem',
      renderItem: (_, onChange) => (
        <VRangeInput
          label="Marks"
          min={1}
          max={300}
          initialMin={null}
          initialMax={null}
          onChange={(min, max) => onChange('', { 
            maxScoreMin: String(min ?? 0), 
            maxScoreMax: String(max ?? 300) 
          })}
        />
      ),
      position: '1 9 2'
    },
    {
      name: 'submit',
      type: 'submit',
      label: 'Apply',
      position: '1 11 1',
      classNames: '!mt-8'
    },
    {
      name: 'clear',
      type: 'discard',
      label: 'Clear',
      position: '1 12 1',
      classNames: '!mt-8',
      onClick: onReset
    }
  ];

  return (
    <VFilter
      ref={filterRef}
      filterConfig={filterConfig}
      filterToggleRef={filterButtonRef}
      onApplyFilter={onApplyFilter}
      notchPositionFromLeft={10}
    />
  );
}