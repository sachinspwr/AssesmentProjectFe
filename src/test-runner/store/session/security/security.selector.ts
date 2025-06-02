import { TestRunnerState } from "test-runner/store/test-runner.store";

// Root selector
export const selectSecurity = (state: TestRunnerState) => state.security;

// Tab & fullscreen events
export const selectTabSwitches = (state: TestRunnerState) => state.security.tabSwitches;
export const selectFullscreenExits = (state: TestRunnerState) => state.security.fullscreenExits;

// Face detection
export const selectFaceDetection = (state: TestRunnerState) => state.security.faceDetection;
export const selectFaceDetectionAttempts = (state: TestRunnerState) =>
  state.security.faceDetection.attempts;
export const selectFaceDetectionVerified = (state: TestRunnerState) =>
  state.security.faceDetection.verified;
export const selectFaceDetectionLastChecked = (state: TestRunnerState) =>
  state.security.faceDetection.lastChecked;

// Clipboard access
export const selectClipboardAccess = (state: TestRunnerState) => state.security.clipboardAccess;
export const selectPasteAttempts = (state: TestRunnerState) =>
  state.security.clipboardAccess.pasteAttempts;
export const selectCopyAttempts = (state: TestRunnerState) =>
  state.security.clipboardAccess.copyAttempts;
