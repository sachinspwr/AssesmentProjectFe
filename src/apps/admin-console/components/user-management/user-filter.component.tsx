import VFilter, { VFilterRef } from "@components/organisms/filter/v-filter.organism";
import { SearchCriteria, SearchRequestDTO, UserRequestDTO } from "@dto/request";
import { VFormFields } from "@types";
import { MatchOn, Operator } from "@utils/enums";

interface UserFilterProps {
  onApplyFilter: (searchRequest: SearchRequestDTO<UserRequestDTO>) => void;
  onReset: () => void;
  filterRef: React.RefObject<VFilterRef>;
  filterButtonRef: React.RefObject<HTMLButtonElement>;
}

function UserFilter({ onApplyFilter, onReset, filterRef, filterButtonRef }: UserFilterProps) {
  const filterConfig: VFormFields[] = [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter First Name',
      position: '1 1 2',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      position: '1 3 2',
    },
    {
      name: 'mobile',
      type: 'text',
      label: 'Mobile No',
      placeholder: 'Enter Mobile No.',
      position: '1 5 2',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company',
      placeholder: 'Enter Company',
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
    <>
      <VFilter
        ref={filterRef}
        filterConfig={filterConfig}
        filterToggleRef={filterButtonRef}
        onApplyFilter={(formData) => {
          const searchCriteria: SearchCriteria<UserRequestDTO>[] = [];
        
          Object.entries(formData).forEach(([key, value]) => {
            if (!value || value === '') return;
        
            const criteria: SearchCriteria<UserRequestDTO> = {
              field: key as keyof UserRequestDTO,
              value: value as string,
              operator: Operator.AND,
              matchOn: MatchOn.EQUAL,
            };
        
            searchCriteria.push(criteria);
          });
        
          if (searchCriteria.length === 0) {
            // No filters selected, call onReset instead of applying empty filters
            onReset();
            return;
          }
        
          const searchRequest = SearchRequestDTO.default(searchCriteria);
          onApplyFilter(searchRequest);
        }}
        
        notchPositionFromLeft={10}
      />
    </>
  );
}

export default UserFilter;
