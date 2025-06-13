import React from 'react';
import { VCheckboxGroup } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { QuestionResponseDTO } from '@dto/response';
import QuestionSection from '../question-section.component';
import { setAnswer } from 'test-runner/store/session';
import { useTestRunnerDispatch } from 'test-runner/store';

type MultipleChoiceQuestionProps = {
  question: QuestionResponseDTO;
  defaultSelection: string;
  index: number;
};

const MultipleChoiceQuestion = React.memo(
  ({ index, question, defaultSelection }: MultipleChoiceQuestionProps) => {
    const dispatch = useTestRunnerDispatch();
    const questionId = question.id;

    // Convert comma-separated string to array of unique selected values (lowercase)
    const selectedValues = React.useMemo(() => {
      if (!defaultSelection || defaultSelection === '') return [];
      
      return Array.from(
        new Set(
          defaultSelection
            .split(',')
            .map((item) => item.trim().toLowerCase())
            .filter(Boolean)
        )
      );
    }, [defaultSelection]);

    // Stable callback for answer changes
    const handleAnswerChange = React.useCallback(
      (selectedOptions: string[]) => {
        const uniqueOptions = Array.from(
          new Set(
            selectedOptions
              .map((opt) => opt.trim().toLowerCase())
              .filter(Boolean)
          ));
        
        const answerString = uniqueOptions.join(',');

         // call this
        // dispatch(saveAnswer(sessionToken!, sectionId, questionId, answerString));
        dispatch(
          setAnswer({
            questionId,
            answer: answerString,
          })
        );
      },
      [dispatch, questionId]
    );

    // Parse and normalize answer options
    const options = React.useMemo(() => {
      const uniqueOptions = Array.from(
        new Set(
          question.answerOptions
            ?.split(',')
            .map((option) => option.trim())
            .filter(Boolean)
        )
      );

      return uniqueOptions.map((option) => ({
        label: option,
        value: option.toLowerCase(),
      }));
    }, [question.answerOptions]);

    return (
      <div className="">
        <QuestionSection question={question} index={index} />
        <VTypography as="h5" className="mb-3">
          Select Options (Multiple)
        </VTypography>

        {options.length > 0 && (
          <VCheckboxGroup
            key={question.id}
            name={`mcq-${questionId}`}
            direction="vertical"
            selectedValues={selectedValues}
            options={options}
            onChange={handleAnswerChange}
          />
        )}
      </div>
    );
  },
  // Custom comparison function for props
  (prevProps, nextProps) => 
    prevProps.question.id === nextProps.question.id &&
    prevProps.defaultSelection === nextProps.defaultSelection &&
    prevProps.index === nextProps.index
);

export { MultipleChoiceQuestion };