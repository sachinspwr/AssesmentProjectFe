import { VRadioButtonGroup } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import QuestionSection from './question-section.component';
import { QuestionResponseDTO } from '@dto/response';

type singleChoiceQuestionProps = {
  question: QuestionResponseDTO;
  index: number;
};
const SingleChoiceQuestion = ({ question, index }: singleChoiceQuestionProps) => {
  return (
    <div className="">
      <QuestionSection question={question} index={index} />
      <VTypography as="h5" className="mb-3">
        Select Option
      </VTypography>

      {question.answerOptions && (
        <VRadioButtonGroup
          name="answerOptions"
          direction="vertical"
          options={JSON.parse(question.answerOptions).map((option: string) => ({
            label: option,
            value: option.toLowerCase(),
          }))}
          onChange={(v) => console.log(v)}
        />
      )}
    </div>
  );
};

export default SingleChoiceQuestion;
