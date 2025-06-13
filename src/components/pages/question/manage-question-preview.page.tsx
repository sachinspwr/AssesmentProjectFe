import EssayPreview from '@components/organisms/questions-preview/essay-preview.organisum';
import FillInTheBlanksPreview from '@components/organisms/questions-preview/fill-In-the-blanks-preview.organisum';
import MCQPreview from '@components/organisms/questions-preview/mcq-preview.organisum';
import ShortAnswerPreview from '@components/organisms/questions-preview/short-answer-preview.organisum';
import TrueFalsePreview from '@components/organisms/questions-preview/true-false-preview.organisum';

type ManageQuestionPreviewpageProps = {
  onClose?: () => void;
  type: string;
  formData: any; // Prefer VFormFieldData if available
  mode?: 'preview' | 'review' | 'view';
  selectedAnswers?: string[] | string;
  correctAnswers?: string[] | string;
};

function ManageQuestionPreviewpage({
  type,
  formData,
  mode = 'preview',
  selectedAnswers = [],
  correctAnswers = [],
  onClose
}: ManageQuestionPreviewpageProps) {
  // Normalize to ensure both are arrays
  const normalizedSelectedAnswers = Array.isArray(selectedAnswers)
    ? selectedAnswers
    : selectedAnswers
      ? [selectedAnswers]
      : [];

  const normalizedCorrectAnswers = Array.isArray(correctAnswers)
    ? correctAnswers
    : correctAnswers
      ? [correctAnswers]
      : [];

  const renderPreview = () => {
    if (type === 'Single Choice' || type === 'Multiple Choice') {
      return (
        <MCQPreview
          onClose={onClose}
          formData={formData}
          mode={mode}
          selectedAnswers={normalizedSelectedAnswers}
          correctAnswers={normalizedCorrectAnswers}
          selectionType={type === 'Single Choice' ? 'single' : 'multiple'}
        />
      );
    }

    switch (type) {
      case 'True/False':
        return (
          <TrueFalsePreview
            onClose={onClose}
            formData={formData}
            mode={mode}
            selectedAnswers={normalizedSelectedAnswers}
            correctAnswers={normalizedCorrectAnswers}
          />
        );
      case 'Fill in the Blanks':
        return (
          <FillInTheBlanksPreview
            onClose={onClose}
            formData={formData}
            mode={mode}
            selectedAnswers={normalizedSelectedAnswers}
            correctAnswers={normalizedCorrectAnswers}
          />
        );
      case 'Short Answer':
        return (
          <ShortAnswerPreview
            onClose={onClose}
            formData={formData}
            mode={mode}
            selectedAnswers={normalizedSelectedAnswers}
            correctAnswers={normalizedCorrectAnswers}
          />
        );
      case 'Essay':
        return (
          <EssayPreview
            onClose={onClose}
            formData={formData}
            mode={mode}
            selectedAnswers={normalizedSelectedAnswers}
            correctAnswers={normalizedCorrectAnswers}
          />
        );
      default:
        return <div>Unknown question type</div>;
    }
  };

  return <div>{renderPreview()}</div>;
}

export default ManageQuestionPreviewpage;
