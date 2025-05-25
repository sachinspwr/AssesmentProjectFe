import { useEffect, useMemo, useRef, useState } from 'react';
import { TbArrowLeft } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import {
  selectSelectedTest,
  setSelectedTest,
  useFetchTestByIdQuery,
  usePublishTestMutation,
} from 'store/slices/test-assessment.slice';
import { Icon, VLink } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import AssessmentBasicDetails from '@components/organisms/assessment/basic-details.organisms';
import AssessmentConfiguration from '@components/organisms/assessment/configuration.organisms';
import { AssessmentSection } from '@components/organisms/assessment/section.organisms';
import { VTabs, VTabsRef } from '@components/organisms/tabs/v-tab.organism';
import { VLoader } from '@components/molecules/index';
import { useAppDispatch } from 'store/store';
import { useSelector } from 'react-redux';
import { mapper } from 'mapper';
import { TestResponseDTO } from '@dto/response';
import { Test } from 'models';
import toast from 'react-hot-toast';

type AssessmentMode = 'create' | 'edit';

function ManageAssessment() {
  const navigate = useNavigate();
  const tabRef = useRef<VTabsRef>(null);
  const { id = '0' } = useParams();
  const mode: AssessmentMode = id === '0' ? 'create' : 'edit';
  const dispatch = useAppDispatch();
  const selectedTest = useSelector(selectSelectedTest);
  const [, setTestQuestionFormat] = useState<string | null>(null);


  const { data: testFetched, isLoading: isLoadingTest } = useFetchTestByIdQuery(id, {
    skip: mode === 'create',
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [publishTest] = usePublishTestMutation();

  const pageTitle = useMemo(() => (mode === 'create' ? 'Create Assessment' : 'Edit Assessment'), [mode]);

  useEffect(() => {
    if (testFetched) {
      const test = mapper.map(testFetched, TestResponseDTO, Test);
      dispatch(setSelectedTest(test));
    }
  }, [testFetched, mode, dispatch]);

  const handleSaveComplete: OnCompleteHandler<Test> = async (
    savedTest,
    { shouldExit, shouldPublish, skipNavigation = false } = {}
  ) => {
    dispatch(setSelectedTest(savedTest));
  
    // Handle publishing first, if requested
    if (shouldPublish) {
      try {
        await publishTest(savedTest.id).unwrap();
        toast.success('Test Published');
      } catch (e) {
        toast.error((e as Error).message);
        return; // If publish fails, stop execution
      }
    }
  
    // Decide on the navigation flow
    if (shouldExit) {
      navigate('/assessments');
    }
    
    if(!skipNavigation){
      // If we are not exiting, move to the next tab
      tabRef.current?.nextTab();
    }
  };
  
  const tabs = useMemo(() => {
    return [
      {
        name: 'basicDetails',
        label: 'Basic Details',
        content: (
          <AssessmentBasicDetails
            test={selectedTest!}
            renderMode={mode}
            onComplete={handleSaveComplete}
            onTestQuestionFormatChange={setTestQuestionFormat}

          />
        ),
      },
      {
        name: 'sections',
        label: 'Sections',
        content: <AssessmentSection tabRef={tabRef} test={selectedTest!} onComplete={handleSaveComplete} />,
      },
      {
        name: 'configuration',
        label: 'Configuration',
        content: <AssessmentConfiguration tabRef={tabRef} test={selectedTest!} onComplete={handleSaveComplete} />,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTest, mode]);

  if (isLoadingTest) {
    return <VLoader size="md" />;
  }

  return (
    <div className="relative w-full flex flex-col min-h-screen bg-skin-theme-light">
      <header className="flex justify-between items-center gap-2">
        <div className="flex gap-4 items-center">
          <VLink to="/assessments" aria-label="Back to assessments">
            <Icon icon={TbArrowLeft} size={26} color="#000" />
          </VLink>
          <VTypography as="h3">{pageTitle}</VTypography>
        </div>
      </header>

      <div className="my-4">
        <VTabs tabs={tabs} ref={tabRef} />
      </div>
    </div>
  );
}

export { ManageAssessment };
