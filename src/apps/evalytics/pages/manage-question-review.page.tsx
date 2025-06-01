import ManageQuestionpage from '@components/pages/question/manage-question.page';
import QuestionReviewHistory from '../components/review-questions/question-review-history.component';
import { useParams } from 'react-router-dom';
import { useFetchQuestionByIdQuery } from 'store/slices/questions.slice';

type ManageReviewpageProps = {
  viewMode?: string;
};

function ManageQuestionReviewpage({ viewMode }: ManageReviewpageProps) {
  const { id: questionId } = useParams<{ id: string }>();
  const { data: questionData } = useFetchQuestionByIdQuery(questionId!, { skip: !questionId });
  return (
    <>
      <ManageQuestionpage viewMode={viewMode ?? 'review'} />
      <QuestionReviewHistory status={questionData?.status} />
    </>
  );
}

export default ManageQuestionReviewpage;
