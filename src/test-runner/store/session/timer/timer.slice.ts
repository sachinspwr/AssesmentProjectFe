import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimersState {
  sectionTimeSpent: Record<string, number>;
  totalElapsed: number;
  lastUpdated: string;
}

const initialState: TimersState = {
  sectionTimeSpent: {},
  totalElapsed: 0,
  lastUpdated: new Date().toISOString(),
};

export const timersSlice = createSlice({
  name: 'timers',
  initialState,
  reducers: {
    incrementTime: (
      state,
      action: PayloadAction<{
        sectionId: string;
        elapsedSeconds: number;
      }>
    ) => {
      const { sectionId, elapsedSeconds } = action.payload;
      state.sectionTimeSpent[sectionId] = (state.sectionTimeSpent[sectionId] || 0) + elapsedSeconds;
      state.totalElapsed += elapsedSeconds;
      state.lastUpdated = new Date().toISOString();
    },
    rehydrateTimers: (_, action: PayloadAction<TimersState>) => action.payload,
  },
});

export const { incrementTime, rehydrateTimers } = timersSlice.actions;
export const timersReducer = timersSlice.reducer;