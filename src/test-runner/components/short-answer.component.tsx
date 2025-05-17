import { QuestionResponseDTO } from '@dto/response';
import React from 'react';
import QuestionSection from './question-section.component';
import { VLabelledTextArea } from '@components/molecules/index';

type shortAnswerQuestionProps = {
  question: QuestionResponseDTO;
  index: number;
};

const ShortAnswerQuestion = ({ question, index }: shortAnswerQuestionProps) => {
  return (
    <div className="">
      <QuestionSection question={question} index={index} />
      <VLabelledTextArea
        label=""
        placeholder={`Write a ${question?.type} answer here...`}
        name="About You"
        onChange={() => {}}
        disabled={false} // Can be set to true if dropdown should be disabled
      />
    </div>
  );
};

export default ShortAnswerQuestion;
