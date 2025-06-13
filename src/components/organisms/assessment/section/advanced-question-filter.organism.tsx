import { VChip } from '@components/atoms/chip/v-chip.component';
import { VDropdown } from '@components/molecules';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { DifficultyLevel, QuestionType, MatchOn, Operator } from '@utils/enums';
import { useFetchSubjectsQuery } from 'store/slices/subject.slice';
import { useEffect, useState } from 'react';
import VFilter, { VFilterRef } from '@components/organisms/filter/v-filter.organism';
import { VFormFields } from '@types';
import { QuestionRequestDTO, SearchCriteria, SearchRequestDTO } from '@dto/request';
import { VRangeInput } from '@components/molecules/range-input/v-range-input.mol';
import { useFetchExperienceLevelQuery } from 'store/slices/experience-level.slice';
import { useFetchIndustriesQuery } from 'store/slices/industry.slice';
import { useFetchDomainsQuery } from 'store/slices/domain.slice';
import { useFetchIndustryRolesQuery } from 'store/slices/industry-role.slice';
import { DomainResponseDTO } from '@dto/response/domain-response.dto';
import { IndustryRoleResponseDTO } from '@dto/response/industry-role-response.dto';

interface FiltersProps {
  selectedFilters: {
    subjectId?: string;
    durationMin?: string;
    type?: string;
    difficulty?: string;
    topic?: string;
    tags?: string;
  };
  onFilterChange: (filters: {
    subjectId?: string;
    type?: string;
    difficulty?: string;
    durationMin?: string;
    topic?: string;
    tags?: string;
  }) => void;
}

export function SectionQuestionFilter({ selectedFilters, onFilterChange }: FiltersProps) {
  const { data: subjects = [] } = useFetchSubjectsQuery();

  const filterOptions = [
    {
      key: 'subjectId',
      label: 'Subject',
      options: [
        { label: 'All Subjects', value: '' },
        ...subjects.map((subject) => ({
          label: subject.name,
          value: subject.id,
        })),
      ],
    },
    {
      key: 'type',
      label: 'Question Type',
      options: [
        { label: 'All Types', value: '' },
        ...Object.entries(QuestionType).map(([, value]) => ({
          label: value,
          value,
        })),
      ],
    },
    {
      key: 'difficulty',
      label: 'Difficulty',
      options: [
        { label: 'All Levels', value: '' },
        ...Object.entries(DifficultyLevel).map(([key, value]) => ({
          label: value,
          value: key,
        })),
      ],
    },
  ];

  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({
      ...selectedFilters,
      [key]: value || undefined, // Convert empty string to undefined
    });
  };

  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...selectedFilters };
    delete newFilters[key as keyof typeof selectedFilters];
    onFilterChange(newFilters);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 w-2/3 items-center">
        {filterOptions.map(({ key, label, options }) => (
          <div key={key} className="flex flex-col">
            <VTypography as="p" className="py-1">
              {label}
            </VTypography>
            <VDropdown
              options={options}
              value={selectedFilters[key as keyof typeof selectedFilters] || ''}
              placeholder={label}
              name={key}
              onChange={(value) => handleFilterChange(key, value as string)}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {Object.entries(selectedFilters).map(([key, value]) => {
          if (!value) return null;

          const filterLabel = filterOptions.find((f) => f.key === key)?.label || key;
          const optionLabel =
            filterOptions.find((f) => f.key === key)?.options.find((o) => o.value === value)?.label || value;

          return (
            <VChip
              key={key}
              id={key}
              label={`${filterLabel}: ${optionLabel}`}
              onRemove={() => handleRemoveFilter(key)}
            />
          );
        })}
      </div>
    </div>
  );
}

interface AdvancedQuestionFilterProps {
  onFilterApply: (searchRequest: SearchRequestDTO<QuestionRequestDTO>) => void;
  onReset: () => void;
  scope: string;
  selectedTestFormat: string | null;
  filterRef: React.RefObject<VFilterRef>;
  filterButtonRef: React.RefObject<HTMLButtonElement>;
}
export function AdvancedQuestionFilter({ onFilterApply, onReset, selectedTestFormat, filterRef, filterButtonRef }: AdvancedQuestionFilterProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [industryDomains, setIndustryDomains] = useState<DomainResponseDTO[]>([]);
  const [domainRoles, setDomainRoles] = useState<IndustryRoleResponseDTO[]>([]);
  const { data: subjects = [] } = useFetchSubjectsQuery();
  const { data: experience_level = [] } = useFetchExperienceLevelQuery();
  const { data: industries = [] } = useFetchIndustriesQuery();
  const { data: domains = [] } = useFetchDomainsQuery();
  const { data: industryRoles = [] } = useFetchIndustryRolesQuery();
  
  useEffect(() => {
      const filteredDomains = domains.filter((domain) => domain.industryId === selectedIndustry) ?? [];
      setIndustryDomains(filteredDomains);
  
      const filteredRoles = industryRoles.filter((role) => role.domainId === selectedDomain) ?? [];
      setDomainRoles(filteredRoles);
    }, [selectedIndustry, selectedDomain, domains, industryRoles]);
    
  // Open the filter by default when component mounts
  useEffect(() => {
    if (filterRef.current) {
      filterRef.current.toggleFilter();
    }
  }, []);

  const questionTypeOptions = Object.values(QuestionType).map(type => ({
    label: type,
    value: type,
  }));    

  console.log(questionTypeOptions);

  console.log(selectedTestFormat);
  
  const filteredOptions = selectedTestFormat === 'Hybrid'
  ? questionTypeOptions // Show all types
  : selectedTestFormat
    ? questionTypeOptions.filter(option => option.value === selectedTestFormat)
    : questionTypeOptions;

  
    console.log(filteredOptions);
    const filterConfig: VFormFields[] = [
    {
      type: 'group',
      label: '',
      position: '1 1 12',
      fields: [
        {
          name: 'industryId',
          label: 'Industry',
          type: 'select',
          placeholder: 'Select Industry',
          options: industries.map((industry: { id: string; name: string }) => ({
            value: industry.id,
            label: industry.name,
          })),
          onChange: (selectedValue) => {
            setSelectedIndustry(selectedValue);
          },
          position: '1 1 3',
        },
        {
          name: 'domainId',
          label: 'Domain',
          type: 'select',
          placeholder: 'Select Domain',
          options: industryDomains.map((domain: { id: string; name: string }) => ({
            value: domain.id,
            label: domain.name,
          })),
          onChange: (selectedValue) => {
            setSelectedDomain(selectedValue);
          },
          position: '1 4 3',
        },
        {
          name: 'industryRoleId',
          label: 'Domain Role',
          type: 'select',
          placeholder: 'Select Domain Role',
          options: domainRoles.map((industryRoles: { id: string; name: string }) => ({
            value: industryRoles.id,
            label: industryRoles.name,
          })),
          position: '1 7 3',
        },
        {
          name: 'subjectId',
          type: 'select',
          label: 'Subject',
          position: '1 10 3',
          options: [
            { label: 'All Subjects', value: 'null' },
            ...subjects.map((subject) => ({
              label: subject.name,
              value: subject.id,
            })),
          ],
        },
        {
          name: 'topic',
          type: 'text',
          label: 'Topic',
          placeholder: 'Filter by topic',
          position: '2 1 3',
        },
        {
          name: 'type',
          type: 'select',
          label: 'Question Type',
          position: '2 4 3',
          options: filteredOptions,
        },
        {
          name: 'difficulty',
          type: 'select',
          label: 'Difficulty Level',
          position: '2 7 3',
          options: [
            { label: 'All Levels', value: 'null' },
            ...Object.entries(DifficultyLevel).map(([key, value]) => ({
              label: value,
              value: key,
            })),
          ],
        },
        {
          name: 'experienceLevelId',
          label: 'Experience Level',
          type: 'select',
          placeholder: 'Select Experience Level',
          options: experience_level.map((experience: { id: string; name: string }) => ({
            value: experience.id,
            label: experience.name,
          })),
          position: '2 10 3',
        },
      ],
    },
    {
      type: 'group',
      label: '',
      position: '3 1 3',
      fields: [
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
          position: '3 1 3'
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
          position: '3 4 3'
        },
        {
          name: 'tags',
          type: 'text',
          label: 'Tags',
          placeholder: 'Comma separated tags',
          position: '3 7 3',
        },
        {
          name: 'submit',
          label: 'Apply',
          type: 'submit',
          position: '3 10 2',
          classNames: '!mt-8',
        },
        {
          name: 'clear',
          type: 'discard',
          label: 'Reset',
          position: '3 12 2',
          classNames: '!mt-8',
          onClick() {
            onReset?.(); 
          },
        },
      ],
    },
  ];

  return (
    <div className="">
      <VFilter
        initiallyOpen={true}
        ref={filterRef}
        filterToggleRef={filterButtonRef}
        filterConfig={filterConfig}
        onApplyFilter={(formData) => {
          const searchCriteria: SearchCriteria<QuestionRequestDTO>[] = [];
        
          Object.entries(formData).forEach(([key, value]) => {
            if (!value || value === '') return;
    
            const trimmedKey = key.trim();
      
            if (trimmedKey === 'durationMin') {
              searchCriteria.push({
                operator: Operator.AND,
                field: 'timeLimit',
                matchOn: MatchOn.GREATER_THAN,
                value: Number(value),
              });
            } else if (trimmedKey === 'durationMax') {
              searchCriteria.push({
                operator: Operator.AND,
                field: 'timeLimit',
                matchOn: MatchOn.LESS_THAN,
                value: Number(value),
              });
            } else if (trimmedKey === 'maxScoreMin') {
              searchCriteria.push({
                operator: Operator.AND,
                field: 'marks',
                matchOn: MatchOn.GREATER_THAN,
                value: Number(value),
              });
            } else if (trimmedKey === 'maxScoreMax') {
              searchCriteria.push({
                operator: Operator.AND,
                field: 'marks',
                matchOn: MatchOn.LESS_THAN,
                value: Number(value),
              });
            } else if (!['durationRange', 'maxScoreRange'].includes(trimmedKey)) {
              searchCriteria.push({
                operator: Operator.AND,
                field: trimmedKey as keyof QuestionRequestDTO,
                value: value as string,
                matchOn: MatchOn.EQUAL,
              });
            }
          });
    
         onFilterApply(SearchRequestDTO.default(searchCriteria));
        }}

        notchPositionFromLeft={10}
      />
    </div>
  );
}
