import { QuestionResponseDTO } from '@dto/response';
import QuestionSection from '../question-section.component';
import { VLabelledTextArea } from '@components/molecules';
import { useTestRunnerDispatch } from 'test-runner/store';
import { setAnswer } from 'test-runner/store/session';

type EssayQuestionProps = {
  question: QuestionResponseDTO;
  defaultSelection: string;
  index: number;
};

function ShortAnswerQuestion({ question, index, defaultSelection }: EssayQuestionProps) {
  const dispatch = useTestRunnerDispatch();
  const questionId = question.id;

  const handleAnswerChange = (value?: string) => {
    if (!value) return;

    dispatch(setAnswer({ questionId, answer: value }));
  };

  return (
    <div>
      <QuestionSection question={question} index={index} />
      <VLabelledTextArea
        value={defaultSelection}
        name={`essay-answer-${questionId}`}
        placeholder={`Write your ${question.type} response here...`}
        onChange={(v, e) => handleAnswerChange(e?.target.value)}
        disabled={false}
        cols={20}
        rows={5}
        label={undefined}
      />
    </div>
  );
}

export default ShortAnswerQuestion;
