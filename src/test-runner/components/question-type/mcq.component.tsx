import { VCheckboxGroup } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { QuestionResponseDTO } from '@dto/response';
import QuestionSection from '../question-section.component';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUserAnswer } from 'store/slices/test-runner.slice';
import { RootState } from 'store/store';
import { useMemo } from 'react';
import { ErrorBoundary } from '@components/organisms/error/error-bountry.organism';

type multipleChoiceQuestionProps = {
  question: QuestionResponseDTO;
  index: number;
};
function MultipleChoiceQuestion({ question, index }: multipleChoiceQuestionProps) {
  const dispatch = useDispatch();
  const questionId = question.id;
  const type = question.type;
  const selectedSectionId = useSelector((state: RootState) => state.testRunner.selectedSectionId);

  const section = useSelector((state: RootState) =>
    state.testRunner.sections.find((sec) => sec.sectionId === selectedSectionId)
  );
  // const userAnswer= section?.userAnswers[questionId]?.answer ?? [];
  const rawAnswer = section?.userAnswers[questionId]?.answer;
  // const userAnswer = Array.isArray(rawAnswer) ? rawAnswer : rawAnswer ? [rawAnswer] : [];
  const userAnswer = useMemo(() => {
    if (Array.isArray(rawAnswer)) return rawAnswer;
    if (rawAnswer) return [rawAnswer];
    return [];
  }, [rawAnswer]);
  
  console.log(userAnswer);
  
  const handleAnswerChange = (answer: string[]) => {
    if (!selectedSectionId) return;

    // Check if the answer actually changed
    if (JSON.stringify(userAnswer) === JSON.stringify(answer)) return;

    dispatch(setUserAnswer({ sectionId: selectedSectionId, questionId, type, answer }));

    // if (!selectedSectionId) return;
    // dispatch(setUserAnswer({ sectionId: selectedSectionId, questionId, type, answer }));
  };

  const options = useMemo(() => {
    try {
      return (
        question.answerOptions?.split(',').map((option: string) => ({
          label: option,
          value: option,
        })) ?? []
      );
    } catch (e) {
      console.error('Invalid answer options', e);
      return [];
    }
  }, [question.answerOptions]);

  return (
    <div className="">
      <QuestionSection question={question} index={index} />
      <VTypography as="h5" className="mb-3">
        Select Options
      </VTypography>
         {/* <ErrorBoundary> */}

         {question.answerOptions && (
        <VCheckboxGroup
          name={`answerOptions-${questionId}`}
          direction="vertical"
          selectedValues={userAnswer}
          options={options}
          onChange={(v) => handleAnswerChange(v)}
        />
      )}

         {/* </ErrorBoundary> */}
      

    </div>
  );
}

export { MultipleChoiceQuestion };
