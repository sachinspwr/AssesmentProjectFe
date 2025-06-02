import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnswersState {
  [questionId: string]: string;
}

const initialState: AnswersState = {};

export const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      const { questionId, answer } = action.payload;
      state[questionId] = answer;
    },
    clearAnswer: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    rehydrateAnswers: (_, action: PayloadAction<AnswersState>) => action.payload,
  },
});

export const { setAnswer, clearAnswer, rehydrateAnswers } = answersSlice.actions;
export const answersReducer = answersSlice.reducer;