import VFilter, { VFilterRef } from '@components/organisms/filter/v-filter.organism';
import { FormFieldData, VFormFields } from '@types';
import { ResultStatus } from '@utils/enums';

interface ResultFilterProps {
  onApplyFilter: (formData: FormFieldData) => void;
  onReset: () => void;
  filterRef: React.RefObject<VFilterRef>;
  filterButtonRef: React.RefObject<HTMLButtonElement>;
}

export function ResultFilter({ onApplyFilter, onReset, filterRef, filterButtonRef }: ResultFilterProps) {
  const filterConfig: VFormFields[] = [
    {
      name: 'participantId',
      type: 'text',
      label: 'Participant',
      position: '1 1 2',
    },
    {
      name: 'internalUserId',
      type: 'text',
      label: 'Internal User',
      position: '1 3 2',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Select Status',
      position: '1 5 2',
      options: Object.values(ResultStatus).map((value) => ({ value, label: value })),
    },
    {
      name: 'testId',
      type: 'text',
      label: 'Test',
      position: '1 7 2',
    },
    {
      name: 'submit',
      type: 'submit',
      label: 'Apply',
      position: '1 9 2',
      classNames: '!mt-8',
    },
    {
      name: 'clear',
      type: 'discard',
      label: 'Clear',
      position: '1 11 2',
      classNames: '!mt-8',
      onClick: onReset,
    },
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
