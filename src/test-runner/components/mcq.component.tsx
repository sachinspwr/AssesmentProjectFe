import { VICon } from '@components/atoms';
import { VCheckboxGroup } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { IoMdStopwatch } from 'react-icons/io';
import { Timer } from './timer.component';
import QuestionSection from './question-section.component';
import { QuestionResponseDTO } from '@dto/response';

type multipleChoiceQuestionProps = {
  question: QuestionResponseDTO;
  index: number;
};
function MultipleChoiceQuestion({ question, index }: multipleChoiceQuestionProps) {
  return (
    <div className="">
      <QuestionSection question={question} index={index} />
      <VTypography as="h5" className="mb-3">
        Select Options
      </VTypography>

      {question.answerOptions && (
        <VCheckboxGroup
          name="answerOptions"
          direction="vertical"
          selectedValues={[]}
          options={JSON.parse(question.answerOptions).map((option: string) => ({
            label: option,
            value: option.toLowerCase(), // Convert value to lowercase for consistency
          }))}
          onChange={(v) => console.log(v)}
        />
      )}
    </div>
  );
}

export { MultipleChoiceQuestion };
