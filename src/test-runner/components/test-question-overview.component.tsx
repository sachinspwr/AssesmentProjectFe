import InterviewGuidelines from './interview-guidelines.component';
import TestNavigationButtons from './test-navigation-buttons.component';
import { QuestionTypeRenderer } from './question-type-renderer.component';
import { QuestionType } from '@utils/enums';
import { QuestionResponseDTO } from '@dto/response';
import { useAppSelector } from 'store/store';
interface TestQuestionOverviewProps {
  sectionId: string;
}
//testQuestion
const TestQuestionOverview = ({ sectionId }: TestQuestionOverviewProps) => {
  const questionDetails = useAppSelector(
    (state) => state.testRunner.testDetails?.testSection?.filter((section) => section.id == sectionId)[0]?.question
  );
  return (
    <div className="mt-3">
      {questionDetails?.map((question, index) => (
        <QuestionTypeRenderer key={question.id} type={question.type} question={question} index={index + 1} />
      ))}
      <InterviewGuidelines />
      <TestNavigationButtons />
    </div>
  );
};

export default TestQuestionOverview;
