import { TestSubmitRequestDTO } from '@dto/request';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { QuestionType } from '@utils/enums';
import { handleQueryResponse } from 'api/api.error';
import { axiosBaseQuery } from 'api/base.query';
import { Test } from 'models';
import { RootState } from 'store/store';

type UserAnswer = {
  type: QuestionType;
  answer: string | string[];
};
export interface AnswerSubmitPayload {
  participantId: string;
  answerText: string;
}
interface SectionState {
  sectionId: string;
  currentQuestionIndex: number;
  userAnswers: {
    [questionId: string]: UserAnswer;
  };
}

export interface ParticipantResponseDTO {
  id: String;
  userId: String;
}

interface TestRunnerState {
  testDetails?: Test;
  selectedSectionId: string | null;
  participantId: string | null;
  sections: SectionState[];
}


//   sectionId,
//   currentIndex,
// qyestionAnswer,
// answer,
// userAnswer
// },
// {
//   sectionId,
//   currentIndex,
// }
// ]
// question
// section obj{
//  section id or tab name , currentIndex
//    }
//
//we have to set the currentQuetsionindex for each section so when
//we back on that section so that question will re render
//section obj with id
// then have inside the currentQuestionIndex
// hit backend api when submit and next then save local data
// for skip question we do not have hit backend apis
// then for the

const initialState: TestRunnerState = {
  testDetails: undefined,
  selectedSectionId: null,
  sections: [],
  participantId: null,
};

const findSectionIndex = (sections: SectionState[], sectionId: string) =>
  sections.findIndex((section) => section.sectionId === sectionId);

export const testRunnerSlice = createSlice({
  name: 'testRunner',
  initialState,
  reducers: {
    setTestDetails: (state, action: PayloadAction<Test>) => {
      state.testDetails = action.payload;
    },
    clearTestDetails: (state) => {
      state.testDetails = undefined;
    },

    setSelectedSection: (state, action: PayloadAction<string>) => {
      const sectionId = action.payload;
      state.selectedSectionId = sectionId;

      const sectionIndex = findSectionIndex(state.sections, sectionId);
      if (sectionIndex === -1) {
        // Create new section if not exists
        state.sections.push({
          sectionId,
          currentQuestionIndex: 0,
          userAnswers: {},
        });
      }
    },
    
    setCurrentQuestionIndexForSection: (state, action: PayloadAction<{ sectionId: string; index: number }>) => {
      const { sectionId, index } = action.payload;
      const section = state.sections.find((s) => s.sectionId === sectionId);

      if (section) {
        // alert("question change in redux"+index+"section"+sectionId)
        section.currentQuestionIndex = index;
      }
    },
    setUserAnswer: (
      state,
      action: PayloadAction<{ sectionId: string; questionId: string; type: QuestionType; answer: string | string[] }>
    ) => {
      const { sectionId, questionId, type, answer } = action.payload;
      const sectionIndex = findSectionIndex(state.sections, sectionId);

      if (sectionIndex === -1) return;

      const section = state.sections[sectionIndex];
      const existingAnswer = section.userAnswers[questionId];

      if (type === QuestionType.MultipleChoice && Array.isArray(answer)) {
        const existingOptions = (existingAnswer?.answer as string[]) || [];
        section.userAnswers[questionId] = {
          type,
          answer: [...new Set([...existingOptions, ...answer])],
        };
        console.log("in mcq",section.userAnswers[questionId])
      } else {
        section.userAnswers[questionId] = { type, answer };
        console.log("in other que",section.userAnswers[questionId])
      }
    },
    nextQuestion: (state, action: PayloadAction<{ sectionId: string; totalQuestions: number }>) => {
      const { sectionId, totalQuestions } = action.payload;
      console.log(`next${sectionId} ${totalQuestions}`);
      const index = findSectionIndex(state.sections, sectionId);
      if (index === -1) return;
      const section = state.sections[index];
      if (section.currentQuestionIndex < totalQuestions - 1) {
        section.currentQuestionIndex += 1;
      }
    },
    prevQuestion: (state, action: PayloadAction<{ sectionId: string }>) => {
      console.log(`prev ${action.payload.sectionId}`);
      const index = findSectionIndex(state.sections, action.payload.sectionId);
      if (index === -1) return;
      const section = state.sections[index];

      if (section.currentQuestionIndex > 0) {
        section.currentQuestionIndex -= 1;
        console.log(`prev currentQuestionIndex ${section.currentQuestionIndex}`);
      }
    },
    clearUserAnswers: (state) => {
      state.sections.forEach((section) => {
        section.userAnswers = {};
      });
    },
    setParticipantId: (state, action: PayloadAction<string>) => {
      state.participantId = action.payload;
    },
  },
});

export const testRunnerApiSlice = createApi({
  reducerPath: 'testRunnerApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getParticipantByUserId: builder.query<ParticipantResponseDTO, string>({
      query: (userId) => ({ url: `/participants/${userId}`, method: 'GET' }),
      onQueryStarted: handleQueryResponse,
    }),
    
    submitAnswer: builder.mutation<unknown, void>({
      queryFn: async (_arg, api, _extraOptions, axiosBaseQuery) => {
        const state = api.getState() as RootState;
        const {
          testRunner: { testDetails, selectedSectionId, participantId, sections },
        } = state;

        if (!testDetails || !selectedSectionId || !participantId) {
          return { error: { status: 400, data: 'Missing required data in state' } };
        }

        const currentSection = sections.find((s: any) => s.sectionId === selectedSectionId);
        if (!currentSection) {
          return { error: { status: 400, data: 'Current section not found' } };
        }

        const currentQuestionIndex = currentSection.currentQuestionIndex;


        const currentSectionFromState = testDetails.testSections?.find(
          (section: any) => section.id === selectedSectionId
        );
        
        const currentQuestion = currentSectionFromState?.questions?.[currentQuestionIndex] ?? null;
        // const currentQuestion = currentSection?.questions?.[currentQuestionIndex] ?? null;
        // const currentQuestion = testDetails.testSections?.find((section: any) => section.id === selectedSectionId).questions[currentQuestionIndex] ?? null

        if (!currentQuestion) {
          return { error: { status: 400, data: 'Question not found' } };
        }

        const questionId = currentQuestion.id;
        const userAnswer = currentSection.userAnswers[questionId];

        if (!userAnswer) {
          return { error: { status: 400, data: 'User answer not found' } };
        }

        const answerText = typeof userAnswer.answer === 'string' ? userAnswer.answer : userAnswer.answer.join(', ');

        console.log(`/tests/${testDetails.id}/sections/${selectedSectionId}/questions/${questionId}/answers`);
        const response = await axiosBaseQuery({
          url: `/tests/${testDetails.id}/sections/${selectedSectionId}/questions/${questionId}/answers`,
          method: 'POST',
          body: {
            participantId,
            answerText,
          },
        });

        return response;
      },
    }),

    submitTestByUser: builder.mutation<unknown, void>({
      async queryFn(_arg, _queryApi, _extraOptions, axiosBaseQuery) {
        const state = _queryApi.getState() as RootState;
        const testId = state.testRunner.testDetails?.id;
        const participantId = state.testRunner.participantId;
    
        if (!testId || !participantId) {
          return { error: { status: 400, data: 'Missing testId or participantId' } };
        }
    
        const result = await axiosBaseQuery({
          url: `/tests/${testId}/submit`,
          method: 'POST',
          body: {
            testId,
            participantId,
          },
        });
    
        return result;
      },
      onQueryStarted: handleQueryResponse,
    }),
    
    
  }),
});

export const { useGetParticipantByUserIdQuery, useSubmitAnswerMutation,useSubmitTestByUserMutation } = testRunnerApiSlice;

export const {
  setTestDetails,
  setSelectedSection,
  setCurrentQuestionIndexForSection,
  setUserAnswer,
  nextQuestion,
  prevQuestion,
  clearUserAnswers,
  setParticipantId,
} = testRunnerSlice.actions;

export default testRunnerSlice.reducer;
