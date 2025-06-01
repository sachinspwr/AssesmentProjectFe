import { VLoader } from '@components/molecules/index';
import { VDynamicForm } from '@components/organisms';
import AssessmentBasicDetails from '@components/organisms/assessment/basic-details.organisms';
import AssessmentConfiguration from '@components/organisms/assessment/configuration.organisms';
import { AssessmentSection } from '@components/organisms/assessment/section.organisms';
import { TestResponseDTO } from '@dto/response';
import { VFormFields } from '@types';
import { mapper } from 'mapper';
import { Test } from 'models';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectSelectedTest, setSelectedTest, useFetchTestByIdQuery } from 'store/slices/test-assessment.slice';
import { useAppDispatch } from 'store/store';
import TestReviewHistory from 'apps/evalytics/components/review-test/test-review-history.component';

type AssessmentMode = 'create' | 'edit';

type ReviewTestFormProps = {
  viewMode?: 'content' | 'review';
};

function ReviewTestForm({ viewMode }: ReviewTestFormProps) {
  const { id = '0' } = useParams();
  const mode: AssessmentMode = id === '0' ? 'create' : 'edit';

  const selectedTest = useSelector(selectSelectedTest);
  console.log(selectedTest);
  const [, setTestQuestionFormat] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const { data: testFetched, isLoading: isLoadingTest } = useFetchTestByIdQuery(id, {
    skip: mode === 'create',
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (testFetched) {
      const test = mapper.map(testFetched, TestResponseDTO, Test);
      dispatch(setSelectedTest(test));
    }
  }, [dispatch, testFetched]);

  const testformConfig: VFormFields[] = [
    {
      type: 'group',
      label: 'Basic Details',
      position: '1 1 12',
      fields: [
        {
          name: 'custom',
          type: 'custom',
          customContent: (
            <div>
              <AssessmentBasicDetails
                test={selectedTest!}
                onComplete={handleSaveComplete}
                onTestQuestionFormatChange={setTestQuestionFormat}
                renderMode={'edit'}
                viewMode={viewMode}
              />
            </div>
          ),
          position: '2 1 12',
        },
      ],
    },
    {
      name: 'custom',
      type: 'custom',
      customContent: <div className="border-b-2 my-auto"></div>,
      position: '3 1 12',
    },
    {
      type: 'group',
      label: 'Sections',
      position: '4 1 12',
      fields: [
        {
          name: 'sections',
          type: 'custom',
          customContent: (
            <div>
              {' '}
              <AssessmentSection test={selectedTest!} onComplete={handleSaveComplete} viewMode={viewMode} />
            </div>
          ),
          position: '5 1 12',
        },
      ],
    },
    {
      name: 'custom',
      type: 'custom',
      customContent: <div className="border-b-2 my-auto"></div>,
      position: '6 1 12',
    },
    {
      type: 'group',
      label: 'Configuration',
      position: '7 1 12',
      fields: [
        {
          name: 'configuration',
          type: 'custom',
          customContent: (
            <div>
              <AssessmentConfiguration test={selectedTest!} onComplete={handleSaveComplete} viewMode={viewMode} />
            </div>
          ),
          position: '8 1 12',
        },
      ],
    },
    {
      name: 'custom',
      type: 'custom',
      customContent: <div className="border-b-2 my-auto"></div>,
      position: '9 1 12',
    },
  ];

  if (isLoadingTest) {
    return <VLoader size="md" />;
  }

  return (
    <>
      <VDynamicForm config={testformConfig} onSubmit={() => {}} />
      <TestReviewHistory status={selectedTest?.status} />
    </>
  );
}

export default ReviewTestForm;

function handleSaveComplete(
  data: Test,
  options?:
    | { shouldExit?: boolean | undefined; shouldPublish?: boolean | undefined; skipNavigation?: boolean | undefined }
    | undefined
): void {
  throw new Error('Function not implemented.');
}
