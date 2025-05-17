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
const QuestionSection = ({ question, index }: QuestionSectionProps) => {
  return (
    <div>
      <div className="border border-theme-default mb-5 mt-5"></div>
      <div className="flex justify-between">
        <VTypography as="h5">
          {`${index}. ${question?.questionText}`}
          {/* 3.This is sample MCQ question, Lorem Ipsum is simply dummy text of the printing and typesetting industry? */}
        </VTypography>
        <div className="flex items-center gap-2">
          <VTypography as="label" className="text-[12px]" color="muted">
            Time for question(In Mins)
          </VTypography>
          <VICon icon={IoMdStopwatch} size={22} />
          <Timer mode="plain" timeValue={question?.timeLimit} onTimeElapsed={() => {}} />
        </div>
      </div>
      <VTypography as="p" color="muted">
        {question?.questionExplanation}
        {/* question descrpition */}
      </VTypography>
      <div className="border border-theme-default mb-5 mt-5"></div>
    </div>
  );
};

export default QuestionSection;
