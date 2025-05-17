import { useEffect, useState, useCallback, useMemo } from 'react';
import { apiService } from '@services/api.service';
import { TestQuestionAnswerRequestDTO } from '@dto/request';
import { tokenService } from '@services/token.service';
import { QuestionResponseDTO, TestResponseDTO } from '@dto/response';
import { Answer } from 'test-runner/types';
import toast from 'react-hot-toast';
import { TokenPayload } from '@dto/token-payload';

const useQuestionManager = (test: TestResponseDTO, initialQuestions: QuestionResponseDTO[]) => {
  const [testInviteData, setTestInviteData] = useState<TokenPayload | null>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(initialQuestions[0]?.id || '');
  const [userAnswers, setUserAnswers] = useState<{ questionId: string; answer: TestQuestionAnswerRequestDTO }[]>([]);
  const [submittedQuestionIds, setSubmittedQuestionIds] = useState<Set<string>>(new Set()); // Track only IDs
  const [loading, setLoading] = useState<boolean>(false);

  const questions = useMemo(() => initialQuestions, [initialQuestions]);

  useEffect(() => {
    const tokenPayload = tokenService.getTokenPayload();
    setTestInviteData(tokenPayload);
  }, []);

  const handleSetActive = useCallback((newQuestionId: string) => {
    setCurrentQuestionId(newQuestionId);
  }, []);

  const handleAnswer = useCallback(
    (questionId: string, answer: Answer) => {
      const newAnswer: TestQuestionAnswerRequestDTO = {
        testId: test.id,
        questionId,
        answer,
      };

      setUserAnswers((prevAnswers) => {
        return prevAnswers.filter((x) => x.questionId !== questionId).concat({ questionId, answer: newAnswer });
      });
    },
    [test]
  );

  const handleNext = useCallback(() => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    if (currentIndex < questions.length - 1) {
      setCurrentQuestionId(questions[currentIndex + 1].id);
    }
  }, [currentQuestionId, questions]);

  const handleBack = useCallback(() => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    if (currentIndex > 0) {
      setCurrentQuestionId(questions[currentIndex - 1].id);
    }
  }, [currentQuestionId, questions]);

  const isLastQuestion = useMemo(() => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    return currentIndex === questions.length - 1;
  }, [currentQuestionId, questions]);

  const handleSubmit = useCallback(async () => {
    const answerToSubmit = userAnswers.find((ua) => ua.questionId === currentQuestionId)?.answer;

    if (!answerToSubmit) {
      toast.error('Select/enter answer to submit.');
      return;
    }

    setLoading(true);
    try {
      const requestPayload: TestQuestionAnswerRequestDTO = {
        ...answerToSubmit,
        testLinkAnonymousUserId: testInviteData?.anonymousUserId,
        testLinkId: testInviteData?.testLinkId,
        answerText: JSON.stringify(answerToSubmit.answer),
      };

      if (!testInviteData?.anonymousUserId) {
        requestPayload.userId = testInviteData?.id;
      }

      await apiService.post<TestQuestionAnswerRequestDTO>(
        `/tests/${test.id}/questions/${currentQuestionId}/answers`,
        requestPayload
      );

      toast.success('Answer submitted and saved!');

      setSubmittedQuestionIds((prevIds) => new Set(prevIds).add(currentQuestionId));

      // Move to the next question if it's not the last one
      if (!isLastQuestion) {
        handleNext();
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
    } finally {
      setLoading(false);
    }
  }, [testInviteData, currentQuestionId, userAnswers, test, isLastQuestion, handleNext]);

  const getCurrentQuestionAnswer = () => userAnswers.find((ua) => ua.questionId === currentQuestionId)?.answer.answer;

  return {
    questions,
    question: questions.find((q) => q.id === currentQuestionId),
    currentQuestionId,
    questionAnswer: getCurrentQuestionAnswer() || [],
    loading,
    userAnswers,
    submittedQuestionIds: Array.from(submittedQuestionIds), // Convert Set to Array
    isLastQuestion,
    testInviteData,
    handleAnswer,
    handleBack,
    handleNext,
    handleSubmit,
    handleSetActive,
  };
};

export { useQuestionManager };
