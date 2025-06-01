/* eslint-disable @typescript-eslint/no-explicit-any */
import { VLoader } from '@components/molecules/loader/v-loader.mol';
import { VDynamicForm, VDynamicFormHandle } from '@components/organisms/dynamic-form/v-dynamic-form.organism';
import { BasicTestDetailRequestDTO } from '@dto/request';
import { TestResponseDTO } from '@dto/response';
import { FormFieldData, VFormFieldData, VFormFields } from '@types';
import { TestQuestionFormat, TestStatus } from '@utils/enums';
import { mapper } from 'mapper';
import { Test } from 'models';
import { useMemo, useRef } from 'react';
import toast from 'react-hot-toast';
import { useFetchExperienceLevelQuery } from 'store/slices/experience-level.slice';
import {
  useCreateTestWithBasicDetailMutation,
  usePatchBasicTestDetailMutation,
} from 'store/slices/test-assessment.slice';
import AssessmentNavigation from './navigation/assessment-navigation.organism';
import { VButton } from '@components/atoms';

type AssessmentBasicDetailsProps = {
  test?: Test;
  renderMode: 'create' | 'edit';
  onComplete: OnCompleteHandler<Test>;
  onTestQuestionFormatChange: (format: string) => void;
  mode?: 'edit' | 'view';
  viewMode?: 'review' | 'content';
};

function AssessmentBasicDetails({
  test,
  renderMode,
  onComplete,
  onTestQuestionFormatChange,
  mode = 'edit',
  viewMode,
}: AssessmentBasicDetailsProps) {
  const formRef = useRef<VDynamicFormHandle>(null);
  const exitRef = useRef<boolean>(false);
  const { data: experienceLevels, isLoading: isFetchingExperience } = useFetchExperienceLevelQuery();
  const [createTest, { isLoading: isCreating }] = useCreateTestWithBasicDetailMutation();
  const [patchTest, { isLoading: isUpdating }] = usePatchBasicTestDetailMutation();

  const experienceOptions = useMemo(
    () => [...(experienceLevels?.map((exp) => ({ label: exp.name, value: exp.id })) || [])],
    [experienceLevels]
  );

  const questionFormatOptions = useMemo(
    () =>
      Object.entries(TestQuestionFormat).map(([key, value]) => ({
        value: key,
        label: value,
      })),
    []
  );

  const initialValues = useMemo(() => {
    if (!test) return {};

    return {
      title: test.title,
      description: test.description,
      cutoffScorePercentage: test.cutoffScorePercentage?.toString(),
      isPublic: test.isPublic ?? false,
      randomizeQuestions: test.randomizeQuestions ?? false,
      hasNegativeMarking: test.hasNegativeMarking ?? false,
      status: test.status,
      testQuestionFormat:
        Object.entries(TestQuestionFormat).find(([, value]) => value === test.testQuestionFormat)?.[0] ?? '',
      experienceLevelId: test.experienceLevel?.id,
    } as FormFieldData;
  }, [test]);

  console.log('test.randomizeQuestions:', test?.randomizeQuestions);

  const handleSave = (isExit?: boolean) => {
    exitRef.current = !!isExit;
    formRef.current?.submit();
  };

  const handleFormSubmit = async (formData: VFormFieldData) => {
    console.log('Saving form data:', formData);
    try {
      const requestData = {
        ...formData,
        ...(renderMode === 'create' && { status: TestStatus.Draft }),
        testQuestionFormat: TestQuestionFormat[formData.testQuestionFormat as keyof typeof TestQuestionFormat],
      } as Test;

      const basicReqData = mapper.map(requestData, Test, BasicTestDetailRequestDTO);

      if (test) {
        const { testInstructions, testSettings, testSections } = test;
        await patchTest({ testId: test.id, testData: basicReqData }).unwrap();
        onComplete(
          { ...(basicReqData as Test), id: test.id, testInstructions, testSettings, testSections },
          { shouldExit: exitRef.current }
        );
      } else {
        const testCreated = await createTest(basicReqData).unwrap();
        const mappedTest = mapper.map(testCreated, TestResponseDTO, Test);
        onComplete(mappedTest, { shouldExit: exitRef.current });
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to save assessment. Please try again.');
      throw error;
    }
  };

  const basicDetailConfig: VFormFields[] = [
    // 1. Basic Info (title, description, format, experience)
    {
      type: 'group',

      position: '1 1 12',
      fields: [
        {
          name: 'title',
          label: 'Assessment Title',
          type: 'text',
          placeholder: 'Enter title',
          position: '1 1 12',
          required: true,
        },
        {
          name: 'description',
          type: 'text-area',
          label: 'Description',
          placeholder: 'Add a short description',
          required: true,
          position: '2 1 12',
        },
        {
          name: 'testQuestionFormat',
          label: 'Test Question Format',
          type: 'select',
          options: questionFormatOptions,
          placeholder: 'Select format',
          onChange: (value) => {
            onTestQuestionFormatChange(value);
            console.log('selectedTestFormat:', value);
          },
          required: true,
          position: '3 1 6',
        },
        {
          name: 'experienceLevelId',
          label: 'Experience Level',
          type: 'select',
          options: experienceOptions,
          placeholder: 'Select experience level',
          required: true,
          position: '3 7 6',
        },
      ],
    },

    // 2. Rules & Behavior
    {
      type: 'group',
      label: 'Rules & Behavior',
      position: '4 1 12',
      fields: [
        {
          name: 'randomizeQuestions',
          label: 'Randomise Questions',
          type: 'switch',
          position: '5 1 4',
        },
        {
          name: 'hasNegativeMarking',
          label: 'Has Negative Marking',
          type: 'switch',
          position: '5 5 4',
        },
        {
          name: 'isPublic',
          label: 'Is Public',
          type: 'switch',
          position: '5 9 4',
        },
      ],
    },

    // 3. Review (calculated values)
    {
      type: 'group',
      label: 'Review',
      position: '6 1 12',
      fields: [
        {
          name: 'cutoffScorePercentage',
          label: 'Cutoff Percent (%)',
          type: 'text',
          placeholder: 'Enter cutoff',
          required: true,
          validate: (value) => {
            const num = Number(value);
            if (isNaN(num)) return 'Must be a number';
            if (num < 0) return 'Cannot be negative';
            if (num > 100) return 'Cannot exceed 100%';
            return '';
          },
          position: '7 1 4',
        },
      ],
    },
  ];

  const isSaving = isCreating || isUpdating;

  if (isFetchingExperience) {
    return <VLoader size="md" />;
  }

  return (
    <div className=" w-3/5">
      <VDynamicForm
        key={test?.id || 'create'}
        config={basicDetailConfig}
        onSubmit={handleFormSubmit}
        ref={formRef}
        initialValues={initialValues}
      />
      {viewMode === 'content' ? (
        <AssessmentNavigation
          isLoading={isSaving}
          onSaveProceed={() => handleSave()}
          onSaveExit={() => handleSave(true)}
        />
      ) : (
        <div>
          <VButton variant="link" size="md" className="!w-48 mt-4" onClick={() => handleSave()}>
            Save Basic Details
          </VButton>
        </div>
      )}
    </div>
  );
}

export default AssessmentBasicDetails;
