import { VChip } from '@components/atoms/chip/v-chip.component';
import { VDropdown } from '@components/molecules';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { DifficultyLevel, QuestionType, MatchOn, Operator } from '@utils/enums';
import { useFetchSubjectsQuery } from 'store/slices/subject.slice';
import { useEffect, useRef } from 'react';
import VFilter, { VFilterRef } from '@components/organisms/filter/v-filter.organism';
import { VFormFields } from '@types';
import { QuestionRequestDTO, SearchCriteria, SearchRequestDTO } from '@dto/request';

interface FiltersProps {
  selectedFilters: {
    subjectId?: string;
    type?: string;
    difficulty?: string;
    topic?: string;
    tags?: string;
  };
  onFilterChange: (filters: {
    subjectId?: string;
    type?: string;
    difficulty?: string;
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

interface SectionQuestionAdvanceProps {
  onFilterApply: (searchRequest: SearchRequestDTO<QuestionRequestDTO>) => void;
}
export function SectionQuestionAdvanceFilter({ onFilterApply }: SectionQuestionAdvanceProps) {
  const filterRef = useRef<VFilterRef>(null);
  const { data: subjects = [] } = useFetchSubjectsQuery();

  // Open the filter by default when component mounts
  useEffect(() => {
    if (filterRef.current) {
      filterRef.current.toggleFilter();
    }
  }, []);

  const filterConfig: VFormFields[] = [
    {
      type: 'group',
      label: '',
      position: '1 1 12',
      fields: [
        {
          name: 'subjectId',
          type: 'select',
          label: 'Subject',
          position: '1 1 3',
          options: [
            { label: 'All Subjects', value: '' },
            ...subjects.map((subject) => ({
              label: subject.name,
              value: subject.id,
            })),
          ],
        },
        {
          name: 'type',
          type: 'select',
          label: 'Question Type',
          position: '1 4 3',
          options: [
            { label: 'All Types', value: '' },
            ...Object.entries(QuestionType).map(([, value]) => ({
              label: value,
              value,
            })),
          ],
        },
        {
          name: 'difficulty',
          type: 'select',
          label: 'Difficulty Level',
          position: '1 7 3',
          options: [
            { label: 'All Levels', value: '' },
            ...Object.entries(DifficultyLevel).map(([key, value]) => ({
              label: value,
              value: key,
            })),
          ],
        },
        {
          name: 'topic',
          type: 'text',
          label: 'Topic',
          placeholder: 'Filter by topic',
          position: '1 10 3',
        },
      ],
    },
    {
      type: 'group',
      label: '',
      position: '2 1 12',
      fields: [
        {
          name: 'tags',
          type: 'text',
          label: 'Tags',
          placeholder: 'Comma separated tags',
          position: '2 1 3',
        },
        {
          name: 'marks',
          type: 'number',
          label: 'Marks',
          placeholder: 'Maximum marks',
          position: '2 4 3',
        },
        {
          name: 'timeLimit',
          type: 'number',
          label: 'Time Limit (min)',
          placeholder: 'Filter by duration',
          position: '2 7 3',
        },
        {
          name: 'submit',
          label: 'Apply',
          type: 'submit',
          position: '2 10 2',
          classNames: '!mt-8',
        },
        {
          name: 'clear',
          type: 'discard',
          label: 'Reset',
          position: '2 12 1',
          classNames: '!mt-8',
        },
      ],
    },
  ];

  return (
    <div className="mb-6">
      <VFilter
        initiallyOpen={true}
        ref={filterRef}
        filterConfig={filterConfig}
        onApplyFilter={(formData) => {
          const searchCriteria = Object.entries(formData)
            .filter(([, value]) => value !== '' && value !== undefined)
            .map(
              ([field, value]) =>
                ({
                  operator: Operator.AND,
                  field,
                  matchOn: MatchOn.LIKE,
                  value,
                }) as SearchCriteria<QuestionRequestDTO>
            );

          onFilterApply(SearchRequestDTO.default(searchCriteria));
        }}
        notchPositionFromLeft={10}
      />
    </div>
  );
}
