import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  sequenceNumber: number;
  activityStatus: 'active' | 'idle' | 'paused' | 'ended';
  clientTimestamp: string;
}

const initialState: SessionState = {
  sequenceNumber: 0,
  activityStatus: 'idle',
  clientTimestamp: new Date().toISOString(),
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    incrementSequence: (state) => {
      state.sequenceNumber += 1;
      state.clientTimestamp = new Date().toISOString();
    },
    setActivityStatus: (state, action: PayloadAction<SessionState['activityStatus']>) => {
      state.activityStatus = action.payload;
      state.clientTimestamp = new Date().toISOString();
    },
    rehydrateSession: (_, action: PayloadAction<SessionState>) => action.payload,
  },
});

export const { incrementSequence, setActivityStatus, rehydrateSession } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;