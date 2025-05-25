import React from 'react';
import QuestionSection from '../question-section.component';
import { useState } from 'react';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VDropdown } from '@components/molecules/index';
import { QuestionResponseDTO } from '@dto/response';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUserAnswer } from 'store/slices/test-runner.slice';
import { RootState } from 'store/store';
type fillInTheBlanksQuestionProps = {
  question: QuestionResponseDTO;
  index: number;
};
const FillInTheBlanks = ({ question, index }: fillInTheBlanksQuestionProps) => {
  const questionText = question?.questionText;
  const options = question?.answerOptions?.split(',').map((option: string) => ({
    label: option,
    value: option.toLowerCase(),
  }))
  // State for selected answers
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Get available options for each dropdown (excluding selected ones)
  const getAvailableOptions = (index: number) => {
    return options?.filter(
      (option) =>
        !Object.values(selectedAnswers).includes(option.value) ||
        selectedAnswers[index] === option.value
    );
  };

  const handleSelect = (index: number, value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
    handleAnswerChange(value)
  };

  const dispatch = useDispatch();
  const questionId = question.id;
  const type = question.type;
  const selectedSectionId = useSelector((state: RootState) => state.testRunner.selectedSectionId);

  const section = useSelector((state: RootState) =>
    state.testRunner.sections.find((sec) => sec.sectionId === selectedSectionId)
  );
  const userAnswer = section?.userAnswers[questionId]?.answer ?? [];

  const handleAnswerChange = (answer: string[]) => {
    if (!selectedSectionId) return;
    dispatch(setUserAnswer({ sectionId: selectedSectionId, questionId, type, answer }));
  };
  return (
    <div>
      <div className="border border-theme-default mb-5 mt-5"></div>
      <VTypography as="h5">
        {index}.{' '}
        {questionText.split('____').map(
          (
            part,
            index //3 underscore
          ) =>
            index % 2 === 0 ? (
              part
            ) : (
              // <VDropdown
              //   key={index}
              //   value={selectedAnswers[index]}
              //   onChange={(value) => handleSelect(index,value[0])}
              //   options={getAvailableOptions(index)}
              //   isMultiSelect={false} // Allows multi-selection
              //   placeholder="Select options"
              //   name="dropdown"
              //   showSearch={false} // Optionally show search box
              //   disabled={false} // Can be set to true if dropdown should be disabled
              // />
              <select
                key={index}
                value={selectedAnswers[index] || ''}
                onChange={(e) => handleSelect(index, e.target.value)}
                className="border px-2 py-1 mx-2 rounded"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {getAvailableOptions(index)?.map((option) => (
                  <option key={option.value} value={option.value}>
                  {option.label}
                </option>
                ))}
              </select>
            )
        )}
      </VTypography>
    </div>
  );
};

export default FillInTheBlanks;
