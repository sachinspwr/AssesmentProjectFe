import EssayPreview from '@components/organisms/questions-preview/essay-preview.organisum';
import FillInTheBlanksPreview from '@components/organisms/questions-preview/fill-In-the-blanks-preview.organisum';
import MCQPreview from '@components/organisms/questions-preview/mcq-preview.organisum';
import ShortAnswerPreview from '@components/organisms/questions-preview/short-answer-preview.organisum';
import TrueFalsePreview from '@components/organisms/questions-preview/true-false-preview.organisum';

type ManageQuestionPreviewPageProps = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
};

function ManageQuestionPreviewPage({ type, formData }: ManageQuestionPreviewPageProps) {
  const renderPreview = () => {
    switch (type) {
      case 'Single Choice':
        return <MCQPreview formData={formData} />;
      case 'True/False':
        return <TrueFalsePreview formData={formData} />;
      case 'Fill in the Blanks':
        return <FillInTheBlanksPreview formData={formData} />;
      case 'Short Answer':
        return <ShortAnswerPreview formData={formData} />;
      case 'Essay':
        return <EssayPreview formData={formData} />;
      default:
        return <div>Unknown question type</div>;
    }
  };

  return (
    <>
      <div>{renderPreview()}</div>
    </>
  );
}

export default ManageQuestionPreviewPage;
