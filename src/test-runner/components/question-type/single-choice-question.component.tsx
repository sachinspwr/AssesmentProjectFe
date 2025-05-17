import { VRadioButtonGroup } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import QuestionSection from '../question-section.component';
import { QuestionResponseDTO } from '@dto/response';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUserAnswer } from 'store/slices/test-runner.slice';
import { RootState } from 'store/store';

type singleChoiceQuestionProps = {
  question: QuestionResponseDTO;
  index: number;
};
const SingleChoiceQuestion = ({ question, index }: singleChoiceQuestionProps) => {
  const dispatch = useDispatch();
  const questionId = question.id;
  const type = question.type;
  const selectedSectionId = useSelector((state: RootState) => state.testRunner.selectedSectionId);

  const section = useSelector((state: RootState) =>
    state.testRunner.sections.find((sec) => sec.sectionId === selectedSectionId)
  );
  const userAnswer = section?.userAnswers[questionId]?.answer ?? [];

  const handleAnswerChange = (answer: string | string[]) => {
    if (!selectedSectionId) return;
    dispatch(setUserAnswer({ sectionId: selectedSectionId, questionId, type, answer }));
  };
  return (
    <div className="">
      <QuestionSection question={question} index={index} />
      <VTypography as="h5" className="mb-3">
        Select Option
      </VTypography>

      {question?.answerOptions && (
        <VRadioButtonGroup
          name={`answerOptions-${questionId}`}
          direction="vertical"
          options={question?.answerOptions?.split(',').map((option: string) => ({
            label: option,
            value: option.toLowerCase(),
          }))}
          onChange={handleAnswerChange}
          defaultValue={userAnswer}
        />
      )}
    </div>
  );
};

export default SingleChoiceQuestion;
