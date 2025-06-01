import { VTitleWithIcon } from '@components/molecules/icon-title/v-title-with-icon.mol';
import { VLoader } from '@components/molecules/index';
import QuestionForm from '@components/organisms/questions/question-form.organism';
import { QuestionResponseDTO } from '@dto/response';
import { splitAndCapitalize } from '@utils/functions';
import { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useFetchQuestionByIdQuery } from 'store/slices/questions.slice';

type ManageQuestionpageProps = {
  viewMode?: string;
};

function ManageQuestionpage({ viewMode }: ManageQuestionpageProps) {
  const navigate = useNavigate();
  const { id = '0' } = useParams();
  const [searchParams] = useSearchParams();
  const bootstrapMode = id === '0' ? 'create' : 'edit';
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const { data: question, isLoading } = useFetchQuestionByIdQuery(id, { skip: bootstrapMode === 'create' });

  const handleGoBack = () => {
    isPreview ? setIsPreview(false) : navigate('/questions');
  };

  // Extract mode from query param (edit by default)
  const queryMode = searchParams.get('mode') as 'view' | 'edit';

  return (
    <div>
      <div className="flex gap-5">
        <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={handleGoBack}>
          {viewMode === 'review' ? 'Review' : splitAndCapitalize(isPreview ? 'try' : bootstrapMode)} Question
        </VTitleWithIcon>
      </div>
      <div className="mt-[20px] mb-[20px] border-b theme-border-default"></div>
      {isLoading ? (
        <VLoader type="spinner" />
      ) : (
        <QuestionForm
          mode={queryMode ?? 'edit'}
          viewMode={viewMode ?? 'content'}
          renderMode={bootstrapMode}
          initialValue={bootstrapMode === 'edit' ? question : ({ isPublic: true } as QuestionResponseDTO)}
          isPreview={isPreview}
          setIsPreview={setIsPreview}
          onSuccess={() => navigate('/questions')}
        />
      )}
    </div>
  );
}

export default ManageQuestionpage;
