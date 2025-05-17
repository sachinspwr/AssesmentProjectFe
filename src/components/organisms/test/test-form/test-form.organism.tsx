/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/function-component-definition */
import React, { useMemo, useRef, forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { FormFieldData, FormFields } from '@types';
import { DynamicForm, DynamicFormHandle } from '@components/organisms';
import { apiService } from '@services/api.service';
import { useQuery } from 'react-query';
import { CategoryOf, TestQuestionFormat, TestStatus } from '@utils/enums';
import { CategoryResponseDTO, } from '@dto/response';
import { Stepper } from '@components/molecules/index';
import { FaUser } from 'react-icons/fa6';
import { MdCreditScore } from 'react-icons/md';
import { BsListCheck } from 'react-icons/bs';
import { VscPreview } from 'react-icons/vsc';
import { Button } from '@components/atoms';

type TestFormProps = DefaultProps & {
  showSubmit?: boolean;
  OnAddQuestion: (formData: FormFieldData) => void;
};

const TestForm = forwardRef<DynamicFormHandle, TestFormProps>(({ className, OnAddQuestion }, ref) => {
  const basicFormRef = useRef<DynamicFormHandle>(null);
  const scoreFormRef = useRef<DynamicFormHandle>(null);
  const instructionFormRef = useRef<DynamicFormHandle>(null);
  const [formData, setFormdata] = useState<FormFieldData>({} as FormFieldData);
  const [defaultTestInstructionIds, setDefaultTestInstructionIds] = useState<string[]>([]);
  const [defaultTestSettingIds, setDefaultTestSettingIds] = useState<string[]>([]);
  let max_score = 0;
  const [steps, setSteps] = useState([
    {
      name: 'step1',
      label: 'Basic',
      icon: FaUser,
      isActive: true,
      isCompleted: false,
    },
    {
      name: 'step2',
      label: 'Score',
      icon: MdCreditScore,
      isActive: false,
      isCompleted: false,
    },
    {
      name: 'step3',
      label: 'Instructions',
      icon: BsListCheck,
      isActive: false,
      isCompleted: false,
    },
    {
      name: 'step4',
      label: 'Review',
      icon: VscPreview,
      isActive: false,
      isCompleted: false,
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: categories } = useQuery<CategoryResponseDTO[], Error>(
    ['categories', CategoryOf.Question],
    async () => await apiService.get<CategoryResponseDTO[]>(`categories?categoryOf=${CategoryOf.Test}`),
    {
      staleTime: 60000,
      cacheTime: 300000,
      refetchOnWindowFocus: false,
    }
  );

  const { data: testinstruction } = useQuery<any[], Error>(
    ['testinstruction'],
    async () => await apiService.get<any[]>(`tests/instructions/get`),
    {
      staleTime: 60000,
      cacheTime: 300000,
      refetchOnWindowFocus: false,
    }
  );

  const { data: testsettings } = useQuery<any[], Error>(
    ['testsettings'],
    async () => await apiService.get<any[]>(`tests/settings/get`),
    {
      staleTime: 60000,
      cacheTime: 300000,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (testsettings) {
      const ids = testsettings.map((setting) => setting.id);
      setDefaultTestSettingIds(ids);
    }
  }, [testsettings]);

  const basicForm = useMemo<FormFields[]>(() => {
    return [
      {
        type: 'group',
        fields: [
          {
            name: 'categoryId',
            label: 'Category',
            type: 'select',
            options: categories?.map((x) => ({ label: x.name, value: x.id }) as { value: string; label: string }) || [],
            required: true,
          },
          {
            name: 'testQuestionFormat',
            label: 'Test Question Format',
            type: 'select',
            options: Object.entries(TestQuestionFormat).map(([, value]) => ({ value: value, label: value })),
            required: true,
          },
        ],
      },
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        required: true,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text-area',
        required: true,
      },
      {
        name: 'isPublic',
        label: 'Mark Test Public',
        type: 'checkbox',
        required: false,
      },
    ];
  }, [categories]);

  const scoreForm = useMemo<FormFields[]>(() => {
    return [
      {
        type: 'group',
        fields: [
          {
            name: 'maxScore',
            label: 'Max Score',
            type: 'number',
            required: true,
            validate(value) {
              if (Number(value) < 0) {
                return 'Max Score must be positive number';
              } else if (Number(value) === 0) {
                return 'Max Score should not be 0';
              }
              max_score = Number(value);
              return '';
            },
          },
          {
            name: 'cutoffScore',
            label: 'Cut Of Score',
            type: 'number',
            required: true,
            validate(value) {
              if (Number(value) < 0) {
                return 'Cut Of Score must be positive number';
              } else if (Number(value) === 0) {
                return 'The Cut Off Score should not be 0';
              } else if (Number(value) >= max_score) {
                return 'The Cut Off Score must be less than Max Score';
              }
              return '';
            },
          },
        ],
      },
      {
        type: 'group',
        fields: [
          {
            name: 'durationInMinutes',
            label: 'Time Limit (Min)',
            type: 'number',
            required: true,
            validate(value) {
              if (Number(value) < 0) {
                return 'Time Limit must be positive number';
              } else if (Number(value) === 0) {
                return 'Time Limit should not be 0';
              }
              return '';
            },
          },
          {
            name: 'status',
            label: 'Test Status',
            type: 'select',
            options: Object.entries(TestStatus).map(([, value]) => ({ value: value, label: value })),
            required: true,
          },
        ],
      },

      {
        name: 'tags',
        label: 'Tags',
        type: 'list',
        required: false,
      },
    ];
  }, []);

  const uniqueCategories = useMemo(() => {
    const categories = testinstruction?.map((x) => x.category) || [];
    return [...new Set(categories)];
  }, [testinstruction]);

  // @ts-expect-error ignore for build
  const instructionCheckboxes = useMemo<FormFields[]>(() => {
    if (!selectedCategory) return [];
    return (
      testinstruction
        ?.filter((x) => x.category === selectedCategory)
        .map((x) => ({
          name: `${x.key} ${x.value}`,
          label: `${x.key} ${x.value}`,
          type: 'checkbox',
          required: false,
          value: formData[`${x.id}`] || '',
          onChange: (isChecked: boolean) => {
            setDefaultTestInstructionIds((prev) => {
              if (isChecked) {
                return [...prev, x.id];
              } else {
                return prev.filter((id) => id !== x.id);
              }
            });
          },
        })) || []
    );
  }, [selectedCategory, testinstruction, formData]);

  const instructionForm = useMemo<FormFields[]>(() => {
    return [
      {
        name: 'instructions',
        label: 'Select Instructions ',
        type: 'select',
        options: uniqueCategories.map((category) => ({ label: category, value: category })),
        required: true,
        onChange: (value) => setSelectedCategory(value),
      },
      ...instructionCheckboxes,
    ];
  }, [uniqueCategories, instructionCheckboxes]);

  const handleFormSubmit = (stepName: string, formData: FormFieldData) => {
    const updatedFormData = {
      ...formData,
      defaultTestInstructionIds,
      defaultTestSettingIds,
    };
    setFormdata((prev: FormFieldData) => ({ ...prev, ...updatedFormData }));
    setSteps((prevSteps) => prevSteps.map((step) => (step.name === stepName ? { ...step, isCompleted: true } : step)));
  };

  useImperativeHandle(ref, () => ({
    submit: () => basicFormRef.current?.submit(),
  }));

  useEffect(() => {
    if (steps.find((x) => x.name == 'step3')?.isCompleted) {
      setSteps((prevSteps) => prevSteps.map((step) => (step.name === 'step4' ? { ...step, isCompleted: true } : step)));
    }
  }, [steps]);

  const allKeys = [...basicForm, ...scoreForm, ...instructionForm].flatMap((x) => (x.type === 'group' ? x.fields : x));

  return (
    <div className={` ${className}`}>
      <Stepper steps={steps}>
        <div id="step1" className="px-10">
          <DynamicForm
            ref={basicFormRef}
            config={basicForm}
            showSubmit={true}
            submitButtonLabel="Next"
            submitButtonClasses={{ wrapper: 'absolute right-5 bottom-5 flex justify-end ' }}
            onSubmit={(formData) => handleFormSubmit('step1', formData)}
            className=""
          />
        </div>
        <div id="step2" className="px-10">
          <DynamicForm
            ref={scoreFormRef}
            config={scoreForm}
            showSubmit={true}
            onSubmit={(formData) => handleFormSubmit('step2', formData)}
            submitButtonLabel="Next"
            submitButtonClasses={{ wrapper: 'absolute right-5 bottom-5 flex justify-end ' }}
            className=""
          />
        </div>
        <div id="step3" className="px-10">
          <DynamicForm
            ref={instructionFormRef}
            config={instructionForm}
            showSubmit={true}
            onSubmit={(formData) => {
              handleFormSubmit('step3', formData);
            }}
            submitButtonLabel="Next"
            submitButtonClasses={{ wrapper: 'absolute right-5 bottom-5 flex justify-end ' }}
            className=""
          />
        </div>
        <div id="step4" className="flex flex-col gap-2 px-10">
          <div className="overflow-x-auto " style={{ maxHeight: '320px' }}>
          </div>
          <div className="flex justify-end absolute right-5 bottom-5">
            <Button className="" onClick={() => OnAddQuestion(formData)}>
              Continue to Add Questions
            </Button>
          </div>
        </div>
      </Stepper>
    </div>
  );
});

export { TestForm };
