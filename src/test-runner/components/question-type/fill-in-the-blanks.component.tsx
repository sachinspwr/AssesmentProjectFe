import React from 'react';
import QuestionSection from '../question-section.component';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { QuestionResponseDTO } from '@dto/response';
import { setAnswer } from 'test-runner/store/session';
import { useTestRunnerDispatch } from 'test-runner/store';
import { VDropdown } from '@components/molecules';

type FillInTheBlanksQuestionProps = {
  question: QuestionResponseDTO;
  defaultSelection: string;
  index: number;
};

const FillInTheBlanks = React.memo(
  ({ question, index, defaultSelection }: FillInTheBlanksQuestionProps) => {
    const dispatch = useTestRunnerDispatch();
    const questionId = question.id;
    const questionText = question.questionText;

    // Parse answer options safely
    const options = React.useMemo(() => {
      try {
        const parsed = JSON.parse(question.answerOptions || '[]');
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }, [question.answerOptions]);

    // Initialize selected answers from defaultSelection
    const [selectedAnswers, setSelectedAnswers] = React.useState<Record<number, string>>(() => {
      try {
        const parsed = defaultSelection ? JSON.parse(defaultSelection) : {};
        return typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
      } catch {
        return {};
      }
    });

    // Get available options for a specific blank index
    const getAvailableOptions = React.useCallback(
      (blankIndex: number) => {
        return options.filter((option) => {
          // Current selection should always be available
          if (selectedAnswers[blankIndex] === option) return true;
          // Filter out options selected in other blanks
          return !Object.values(selectedAnswers).includes(option);
        });
      },
      [options, selectedAnswers]
    );

    // Handle selection change for a blank
    const handleSelect = React.useCallback((blankIndex: number, value: string) => {
      setSelectedAnswers((prev) => {
        const newAnswers = { ...prev, [blankIndex]: value };
        // Save to store immediately
        dispatch(setAnswer({
          questionId,
          answer: JSON.stringify(newAnswers),
        }));
        return newAnswers;
      });
    }, [dispatch, questionId]);

    // Render question text with dropdowns replacing {0}, {1}, etc.
    const renderQuestionText = () => {
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      const regex = /\{(\d+)\}/g; // Matches {0}, {1}, etc.
      let match;

      while ((match = regex.exec(questionText)) !== null) {
        // Add text before the placeholder
        if (match.index > lastIndex) {
          parts.push(questionText.slice(lastIndex, match.index));
        }

        const blankIndex = parseInt(match[1], 10);
        const availableOptions = getAvailableOptions(blankIndex);

        // Add dropdown for the blank
        parts.push(
          <span key={`blank-${blankIndex}`} className="inline-block mx-1 min-w-[120px]">
            <VDropdown
              name={`blank-${blankIndex}`}
              value={selectedAnswers[blankIndex] || ''}
              onChange={(val) => handleSelect(blankIndex, val)}
              options={availableOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              placeholder="Select"
              disabled={availableOptions.length === 0}
            />
          </span>
        );

        lastIndex = regex.lastIndex;
      }

      // Add remaining text after last placeholder
      if (lastIndex < questionText.length) {
        parts.push(questionText.slice(lastIndex));
      }

      return parts;
    };

    return (
      <div className="mb-5">
        <QuestionSection question={question} index={index} />
        <VTypography as="p" className="whitespace-pre-wrap">
          {renderQuestionText()}
        </VTypography>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.question.id === nextProps.question.id &&
    prevProps.defaultSelection === nextProps.defaultSelection &&
    prevProps.index === nextProps.index
);

export default FillInTheBlanks;