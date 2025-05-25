import EssayPreview from '@components/organisms/questions-preview/essay-preview.organisum';
import FillInTheBlanksPreview from '@components/organisms/questions-preview/fill-In-the-blanks-preview.organisum';
import MCQPreview from '@components/organisms/questions-preview/mcq-preview.organisum';
import ShortAnswerPreview from '@components/organisms/questions-preview/short-answer-preview.organisum';
import TrueFalsePreview from '@components/organisms/questions-preview/true-false-preview.organisum';

type ManageQuestionPreviewPageProps = {
  type: string;
  formData: any; // Prefer VFormFieldData if available
  mode?: 'preview' | 'review';
  selectedAnswers?: string[] | string;
  correctAnswers?: string[] | string;
};

function ManageQuestionPreviewPage({
  type,
  formData,
  mode = 'preview',
  selectedAnswers = [] ,
  correctAnswers = [],
}: ManageQuestionPreviewPageProps) {
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
            formData={formData}
            mode={mode}
            selectedAnswers={normalizedSelectedAnswers}
            correctAnswers={normalizedCorrectAnswers}
          />
        );
      case 'Fill in the Blanks':
        return (
          <FillInTheBlanksPreview
            formData={formData}
            mode={mode}
            selectedAnswers={normalizedSelectedAnswers}
            correctAnswers={normalizedCorrectAnswers}
          />
        );
      case 'Short Answer':
        return (
          <ShortAnswerPreview
            formData={formData}
            mode={mode}
            selectedAnswers={normalizedSelectedAnswers}
            correctAnswers={normalizedCorrectAnswers}
          />
        );
      case 'Essay':
        return (
          <EssayPreview
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

export default ManageQuestionPreviewPage;
