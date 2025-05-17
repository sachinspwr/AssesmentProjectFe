import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuestionResponseDTO, TestResponseDTO } from '@dto/response';
import { QuestionComponent, TestProgressTracker } from 'test-runner/components';
import { useQuestionManager } from 'test-runner/hooks';
import { useMutation } from 'react-query';
import { apiService } from '@services/api.service';
import { TestSubmitRequestDTO } from '@dto/request';
import SideBarForCodingQuestion from 'test-runner/components/code-editor/sidebar-for-coding-question.component';
import { QuestionType } from '@utils/enums';

function TestQuestionPage() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { test, questions } = location.state as { test: TestResponseDTO; questions: QuestionResponseDTO[] };

  const testDetail = useMemo(() => ({ test, questions }), [test, questions]);

  const { mutate, isLoading } = useMutation(
    async (data: TestSubmitRequestDTO) => await apiService.post(`/tests/${testDetail.test.id!}/submit`, data),
    {
      onSuccess: () => {
        navigate('/test-feedback');
      },
    }
  );

  const {
    question,
    currentQuestionId,
    questionAnswer,
    userAnswers,
    submittedQuestionIds,
    testInviteData,
    handleAnswer,
    handleNext,
    handleBack,
    handleSubmit,
    handleSetActive,
    isLastQuestion,
  } = useQuestionManager(testDetail.test, testDetail.questions);

  const questionIds = useMemo(() => testDetail.questions.map((q) => q.id), [testDetail.questions]);

  return (
    <div className="relative w-full h-full flex justify-around items-center">
      <div className={`relative ml-0 ${!isOpen ? 'w-100' : 'w-8/12'} h-full flex justify-start items-center`}>
        <QuestionComponent
          question={question!}
          currentQuestionId={currentQuestionId}
          questionAnswer={questionAnswer}
          onAnswer={handleAnswer}
          onSubmit={handleSubmit}
          onNext={handleNext}
          onBack={handleBack}
          isLastQuestion={isLastQuestion}
          onTimeElapsed={() => {
            const currentIndex = questionIds.indexOf(currentQuestionId);
            if (currentIndex < questionIds.length - 1) {
              handleSetActive(questionIds[currentIndex + 1]);
            }
          }}
        />
        {/* {loading && <Loader type="local" />} */}
      </div>
      {question?.type == QuestionType.Coding ? (
        <div className={` ${!isOpen ? 'w-0' : 'w-3/12'} flex justify-center items-center`}>
          <SideBarForCodingQuestion isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)}>
            <TestProgressTracker
            testId={testDetail.test.id!}
              questions={questionIds}
              answered={new Set(userAnswers.map((ua) => ua.questionId))}
              submitted={new Set(submittedQuestionIds)}
              active={currentQuestionId}
              totalTimeInMinutes={test.durationInMinutes}
              onSetActiveQuestionId={handleSetActive}
              isSubmittingTest={isLoading}
              onFinish={() => {
                console.log({
                  testId: testDetail.test.id!,
                  testLinkAnonymousUserId: testInviteData?.anonymousUserId,
                  testLinkId: testInviteData?.testLinkId,
                  userId: testInviteData?.id,
                });
                mutate({
                  testId: testDetail.test.id!,
                  testLinkAnonymousUserId: testInviteData?.anonymousUserId,
                  testLinkId: testInviteData?.testLinkId,
                  userId: testInviteData?.id,
                });
              }}
            />
          </SideBarForCodingQuestion>
        </div>
      ) : (
        <div className={` ${!isOpen ? 'w-0' : 'w-3/12'} flex justify-center items-center`}>
          <TestProgressTracker
            testId={testDetail.test.id!}
            questions={questionIds}
            answered={new Set(userAnswers.map((ua) => ua.questionId))}
            submitted={new Set(submittedQuestionIds)}
            active={currentQuestionId}
            totalTimeInMinutes={test.durationInMinutes}
            onSetActiveQuestionId={handleSetActive}
            isSubmittingTest={isLoading}
            onFinish={() => {
              console.log({
                testId: testDetail.test.id!,
                testLinkAnonymousUserId: testInviteData?.anonymousUserId,
                testLinkId: testInviteData?.testLinkId,
                userId: testInviteData?.id,
              });
              mutate({
                testId: testDetail.test.id!,
                testLinkAnonymousUserId: testInviteData?.anonymousUserId,
                testLinkId: testInviteData?.testLinkId,
                userId: testInviteData?.id,
              });
            }}
          />
        </div>
      )}
    </div>
  );
}

export { TestQuestionPage };
