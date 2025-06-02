import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationEvent {
  sectionId: string;
  questionId: string;
  timestamp: string;
  eventType: 'manual' | 'auto' | 'timeout';
}

interface CurrentPosition {
  sectionId: string;
  questionId: string;
  confidence: number;
}

interface NavigationState {
  currentQuestionId: string;
  history: NavigationEvent[];
  currentPosition: CurrentPosition;
  navigationType: 'manual' | 'auto';
  currentQuestionIndex: number;
}

const initialState: NavigationState = {
  history: [],
  currentPosition: {
    sectionId: '',
    questionId: '',
    confidence: 0,
  },
  navigationType: 'manual',
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigateToQuestion: (
      state,
      action: PayloadAction<{
        sectionId: string;
        questionId: string;
        eventType: NavigationEvent['eventType'];
      }>
    ) => {
      const { sectionId, questionId, eventType } = action.payload;
      state.history.push({
        sectionId,
        questionId,
        timestamp: new Date().toISOString(),
        eventType,
      });
      state.currentPosition = { sectionId, questionId, confidence: 100 };
    },
    setNavigationType: (state, action: PayloadAction<'manual' | 'auto'>) => {
      state.navigationType = action.payload;
    },
    rehydrateNavigation: (_, action: PayloadAction<NavigationState>) => action.payload,
  },
});

export const { navigateToQuestion, setNavigationType, rehydrateNavigation } = navigationSlice.actions;
export const navigationReducer = navigationSlice.reducer;
