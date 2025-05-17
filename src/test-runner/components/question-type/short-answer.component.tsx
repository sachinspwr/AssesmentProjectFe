import { QuestionResponseDTO } from '@dto/response';
import React from 'react';
import QuestionSection from '../question-section.component';
import { VLabelledTextArea } from '@components/molecules/index';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUserAnswer } from 'store/slices/test-runner.slice';
import { RootState } from 'store/store';

type shortAnswerQuestionProps = {
  question: QuestionResponseDTO;
  index: number;
};

const ShortAnswerQuestion = ({ question, index }: shortAnswerQuestionProps) => {
  const dispatch = useDispatch();
  const questionId = question.id;
  const type = question.type;
  const selectedSectionId = useSelector((state: RootState) => state.testRunner.selectedSectionId);

  const section = useSelector((state: RootState) =>
    state.testRunner.sections.find((sec:any) => sec.sectionId === selectedSectionId)
  );
  const userAnswer = section?.userAnswers[questionId]?.answer ?? [];

  const handleAnswerChange = (answer: string[]) => {
    if (!selectedSectionId) return;
    dispatch(setUserAnswer({ sectionId: selectedSectionId, questionId, type, answer }));
  };
  return (
    <div className="">
      <QuestionSection question={question} index={index} />
      <VLabelledTextArea
        value={userAnswer}
        name={`answerOptions-${questionId}`}
        placeholder={`Write a ${question?.type} answer here...`}
        onChange={handleAnswerChange}
        disabled={false}
      />
    </div>
  );
};

export default ShortAnswerQuestion;
