import { VICon } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import React from 'react';
import { IoMdStopwatch } from 'react-icons/io';
import { Timer } from './timer.component';
import { QuestionResponseDTO } from '@dto/response';

type QuestionSectionProps = {
  question: QuestionResponseDTO;
  index: number; // question number in the test
};
function QuestionSection({ question, index }: QuestionSectionProps) {
  const timeLimit = question.timeLimit;

  return (
    <div>
      <div className="border border-theme-default mb-5 mt-5"></div>
      <div className="flex justify-between">
        <VTypography as="h5">{`${index}. ${question?.questionText}`}</VTypography>
        <div className="flex items-center gap-2">
          <VTypography as="label" className="text-[12px] flex gap-2" color="muted">
            <VICon icon={IoMdStopwatch} size={22} />
          </VTypography>
          <Timer
            duration={timeLimit}
            warningThreshold={timeLimit * 0.5} // 50% of timeLimit
            criticalThreshold={timeLimit * 0.2} // 20% of timeLimit
            mode="minimal"
            className="text-xl font-bold"
          />
        </div>
      </div>
      <VTypography as="p" color="secondary">
        {question?.questionExplanation}
        {/* question descrpition */}
      </VTypography>
      <div className="border border-theme-default mb-5 mt-5"></div>
    </div>
  );
}

export default QuestionSection;
