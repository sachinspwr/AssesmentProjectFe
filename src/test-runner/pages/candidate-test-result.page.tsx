import { VICon, VStatus } from '@components/atoms';
import { VCheckboxGroup } from '@components/molecules/checkbox/v-checkbox-group.mol';
import { VTitleWithIcon } from '@components/molecules/icon-title/v-title-with-icon.mol';
import { VLoader } from '@components/molecules/index';
import { VProgressBar } from '@components/molecules/progress-bar/v-progress-bar.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VModal } from '@components/organisms';
import { VOverview } from '@components/organisms/overview/v-overview.organism';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { defaultFormatDtTm } from '@utils/functions';
import { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa6';
import { IoMdCall } from 'react-icons/io';
import { useFetchBriefResultQuery, useGetDetailedResultQuery } from 'store/slices/test-result.slice';
import { useAppSelector } from 'store/store';

interface AssessmentData {
  id: string;
  sectionId: string;
  question: string;
  difficultyLevel: string;
  questionType: string;
  duration?: number;
  score?: number | null;
}






const CandidateTestResultPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionInfo, setQuestionInfo] = useState({
    sectionId: '',
    questionId: '',
  });
  const testDetails = useAppSelector((state) => state.testRunner.testDetails);
  const participantId = useAppSelector((state) => state.testRunner.participantId);
  const testId = testDetails?.id;

  const { data:briefResultData, isLoading } =  useFetchBriefResultQuery({
    testId: testId as string,
    participantId: participantId as string,
  });

  

  const resultId = briefResultData?.[0]?.id ?? '';

const { data: detailedResultData, isLoading: detailedLoading } = useGetDetailedResultQuery(
  {
    testId: testId as string,
    resultId,
  },
  {
    skip: !resultId, // Skip until we have a resultId
  }
);

  // const { data:detailedResultData, isLoading:detailedLoading } = useGetDetailedResultQuery({
  //   testId: testId as string,
  //   resultId:briefResultData[0]?.id ?? "" as string,
  // });




  console.log(detailedResultData)

  const assessmentData: AssessmentData[] = detailedResultData?.testQuestionAnswer?.map((que, index) => {
    const questionDetails = detailedResultData?.test?.testSections
      ?.flatMap((section) => section?.question)
      .find((q) => q?.id === que?.questionId);

    return {
      id: que?.questionId,
      sectionId: que?.sectionId,
      question: questionDetails?.questionText || 'Unknown Question',
      difficultyLevel: questionDetails?.difficulty || 'Unknown',
      questionType: questionDetails?.type || 'Unknown',
      duration: questionDetails?.timeLimit ?? 0,
      score: que.finalMarks ? parseFloat(que.finalMarks as string) : 0,
    };
  });

  const columnsConfig: VTableColumn<AssessmentData>[] = [
    {
      key: 'question',
      label: 'Questions',
      customRender: (row: AssessmentData) => <p className="font-[500]  text-theme-primary">{row.question}</p>,
    },
    {
      key: 'difficultyLevel',
      label: 'Difficulty Level',
      customRender: (row: AssessmentData) => <p className="font-[500] text-theme-primary">{row.difficultyLevel}</p>,
    },
    {
      key: 'questionType',
      label: 'Question Type',
      customRender: (row: AssessmentData) => <p className="font-[500] text-theme-primary">{row.questionType}</p>,
    },
    {
      key: 'duration',
      label: 'Duration in Minutes',
      customRender: (row: AssessmentData) => <p className="font-[500] text-theme-primary">{row.duration}</p>,
    },
    {
      key: 'score',
      label: 'Score',
      customRender: (row: AssessmentData) => <p className="font-[500] text-theme-primary">{row.score}</p>,
    },
  ];

  const fullName = `${detailedResultData?.user?.firstName ?? ''} ${detailedResultData?.user?.lastName ?? ''}`;

  const DynamicQuestionModal = ({
    isOpen,
    onClose,
    sectionId,
    questionId,
  }: {
    isOpen: void;
    onClose: void;
    sectionId: string;
    questionId: string;
  }) => {
    const section = detailedResultData?.test?.testSections.find((sec) => sec.id === sectionId);
    const question = section?.question.find((q) => q.id === questionId);
    const answer = detailedResultData.testQuestionAnswer.find((ans) => ans.sectionId === sectionId && ans.questionId === questionId);
  
    if (!section || !question) return null;
  
    const selectedValues = answer?.answerText?.split(',') || [];
  
    const options = question.answerOptions?.split(',')?.map((opt) => ({
      label: opt,
      value: opt,
    }));
  
    return (
      <VModal
        isOpen={isOpen}
        onClose={onClose}
        title={
          <div>
            <VTypography>Question & Answer Overview</VTypography>
            <div className="flex gap-5 items-center mt-2">
              <VTypography color="muted" className="text-xs">
                Marks:{' '}
                <span className="text-theme-primary">
                  {answer?.finalMarks ?? 0}/{question?.marks}
                </span>
              </VTypography>
              <VTypography color="muted" className="text-xs">
                Time Limit: <span className="text-theme-primary">{question?.timeLimit ?? 0} sec</span>
              </VTypography>
              <VTypography color="muted" className="text-xs">
                Difficulty Level: <span className="text-theme-primary">{question?.difficulty}</span>
              </VTypography>
            </div>
          </div>
        }
        width={50}
        showFooter={false}
      >
        <div>
          <VTypography as="h5" color="primary">
            {question.questionText}
          </VTypography>
          {question.questionExplanation && (
            <VTypography className="text-sm" color="muted">
              {question.questionExplanation}
            </VTypography>
          )}
        </div>
  
        <div className="border border-theme-default my-2"></div>
  
        <VCheckboxGroup
          groupLabel="Selected Answer"
          name="answers"
          direction="vertical"
          selectedValues={selectedValues}
          onChange={() => {}}
          options={options}
          disabled={true}
        />
  
        <div className="border border-theme-default my-2"></div>
  
        <div>
          <VTypography as="h5" color="primary">
            Answer Explanation
          </VTypography>
          <VTypography className="text-sm" color="muted">
            {question.answerExplanation || 'No explanation provided.'}
          </VTypography>
        </div>
      </VModal>
    );
  };
  
  return isLoading || detailedLoading ? (
    <VLoader position="global" />
  ) : (
    <div className="py-5 px-16">
      <div className="flex gap-5 items-center">
        {/* <div>
        <VICon icon={FaArrowLeft} className="w-6 h-6" />
      </div> */}
        <div>
          <VTypography as="h3">{fullName}</VTypography>
        </div>
        <div>
          <VStatus
            label={detailedResultData?.testResults[0]?.isPassed ? 'Pass' : 'Fail'}
            type={detailedResultData?.testResults[0]?.isPassed ? 'positive' : 'negative'}
          />
        </div>
      </div>
      <div className="flex gap-36 items-center mt-5">
        <div>
          <VTitleWithIcon as="p" icon={AiOutlineMail} title={detailedResultData?.user?.email} />
        </div>
        {/* <div>
        <VTitleWithIcon as="p" icon={IoMdCall} title={detailedResultData?.user?.} />
      </div> */}
      </div>
      <div className="flex gap-20 items-center mt-4">
        <div>
          <VTypography>
            Total Score: <span className="font-semibold">{detailedResultData?.testResults[0]?.correctionPercentage} % </span> (
            {`${detailedResultData?.testResults[0]?.score} / ${detailedResultData?.testResults[0]?.outOf} `})
          </VTypography>
        </div>
        {/* <div>
        <VTypography>
          Time Taken: <span className="font-semibold">54</span> Mins
        </VTypography>
      </div> */}
        <div>
          <VTypography>
            Test Completed:{' '}
            <span className="font-semibold">{defaultFormatDtTm(detailedResultData?.testResults[0]?.completedAt, false)}</span>
          </VTypography>
        </div>
      </div>
      <div className="border border-theme-default mb-5 mt-5"></div>
      <div>
        <VOverview title="Section-wise performance">
          <div className="px-5 flex flex-col gap-5 pb-5">
            {detailedResultData?.test?.testSections &&
              detailedResultData?.test?.testSections?.map((section) => {
                return <VProgressBar key={section?.id} label={section?.name} completed={section?.score} outOf={section?.outOf} />;
              })}
          </div>
        </VOverview>
      </div>
      <div className="border border-theme-default mb-5 mt-5"></div>
      {/* <div>
      <VTypography as="h5" className="font-bold">
        Logical Reasoning
      </VTypography>
      <VTypography className="text-sm">Candidate Score: Expert</VTypography>
      <ul className="list-disc pl-5 text-sm space-y-1 mt-3">
        <li>
          <span className="text-theme-secondary">It is a long established fact that a reader will be distracted</span>
        </li>
        <li>
          <span className="text-theme-secondary">It is a long established fact that a reader will be distracted</span>
        </li>
        <li>
          <span className="text-theme-secondary">It is a long established fact that a reader will be distracted</span>
        </li>
        <li>
          <span className="text-theme-secondary">It is a long established fact that a reader will be distracted</span>
        </li>
      </ul>
    </div> */}
      <div className="mt-6">
        <VTable<AssessmentData>
          title={`Questions of Assesment (Total ${detailedResultData?.testQuestionAnswer?.length} Questions)`}
          data={assessmentData}
          columns={columnsConfig}
          headerClassName="font-[600]"
          itemsPerPage={5}
          tableClassName="w-full border border-gray-200"
          emptyState={<div>No users found!</div>}
          actionsConfig={[
            {
              action: 'edit',
              responder: (id?: string) => {
                const rowIndex = Number(id);
                const questionId = assessmentData[rowIndex]?.id;
                const sectionId = assessmentData[rowIndex]?.sectionId;

                if (questionId && sectionId) {
                  setQuestionInfo({
                    questionId: questionId,
                    sectionId: sectionId,
                  });
                  setIsModalOpen(true);
                } else {
                  console.error('Invalid question index:', id);
                }
                // alert(id)
                // setSelectedQuestionId(id as string);
                // setIsModalOpen(!isModalOpen);
              },
            },
          ]}
        />

        <DynamicQuestionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sectionId={questionInfo?.sectionId}
          questionId={questionInfo?.questionId}
        />
        {/* <VModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        title={
          <div>
            <VTypography>Question & Answer overview</VTypography>
            <div className="flex gap-5 items-center mt-2">
              <VTypography color="muted" className="text-xs">
                Total Score: <span className="text-theme-primary">10/10</span>
              </VTypography>
              <VTypography color="muted" className="text-xs">
                Time Taken: <span className="text-theme-primary">0.54 Mins</span>
              </VTypography>
              <VTypography color="muted" className="text-xs">
                Difficulty Level: <span className="text-theme-primary">Intermediate</span>
              </VTypography>
            </div>
          </div>
        }
        width={50}
        showFooter={false}
      >
        <div>
          <VTypography as='h5' color='primary'>
            This is sample MCQ question, Lorem Ipsum is simply dummy text of the printing and typesetting industry?
          </VTypography>
          <VTypography className='text-sm' color='muted'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</VTypography>
        </div>
        <div className="border border-theme-default mb-2 mt-2"></div>
        <VCheckboxGroup
          groupLabel="Select Options"
          name="gender1"
          direction="vertical"
          selectedValues={[]}
          options={occupation}
          onChange={(v) => console.log(v)}
        />
        <div className="border border-theme-default mb-2 mt-2"></div>
        <div>
          <VTypography as='h5' color='primary'>
          Interview Guidelines
          </VTypography>
          <VTypography className='text-sm' color='muted'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</VTypography>
        </div>
      </VModal> */}
      </div>
    </div>
  );
};

export default CandidateTestResultPage;
