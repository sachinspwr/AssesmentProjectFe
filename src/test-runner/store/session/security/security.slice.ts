import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FaceDetectionEvent {
  attempts: number;
  verified: boolean;
  lastChecked: string;
}

interface ClipboardAccess {
  pasteAttempts: number;
  copyAttempts: number;
}

interface SecurityState {
  fullscreenExits: number;
  tabSwitches: number;
  faceDetection: FaceDetectionEvent;
  clipboardAccess: ClipboardAccess;
}

const initialState: SecurityState = {
  fullscreenExits: 0,
  tabSwitches: 0,
  faceDetection: {
    attempts: 0,
    verified: false,
    lastChecked: new Date().toISOString(),
  },
  clipboardAccess: {
    pasteAttempts: 0,
    copyAttempts: 0,
  },
};

export const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
    recordTabSwitch: (state) => {
      state.tabSwitches += 1;
    },
    recordFullscreenExit: (state) => {
      state.fullscreenExits += 1;
    },
    recordFaceDetection: (state, action: PayloadAction<{ verified: boolean }>) => {
      state.faceDetection.attempts += 1;
      state.faceDetection.verified = action.payload.verified;
      state.faceDetection.lastChecked = new Date().toISOString();
    },
    recordClipboardAccess: (state, action: PayloadAction<'paste' | 'copy'>) => {
      action.payload === 'paste'
        ? (state.clipboardAccess.pasteAttempts += 1)
        : (state.clipboardAccess.copyAttempts += 1);
    },
    rehydrateSecurity: (_, action: PayloadAction<SecurityState>) => action.payload,
  },
});

export const {
  recordTabSwitch,
  recordFullscreenExit,
  recordFaceDetection,
  recordClipboardAccess,
  rehydrateSecurity,
} = securitySlice.actions;


export default securitySlice.reducer;
export const securityReducer = securitySlice.reducer;