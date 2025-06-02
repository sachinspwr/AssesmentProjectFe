import { TestRunnerState } from "test-runner/store/test-runner.store";

// Root selector
export const selectTimers = (state: TestRunnerState) => state.timers;

// Total elapsed time
export const selectTotalElapsed = (state: TestRunnerState) => state.timers.totalElapsed;

// Last updated timestamp
export const selectLastUpdated = (state: TestRunnerState) => state.timers.lastUpdated;

// All section times
export const selectSectionTimeSpent = (state: TestRunnerState) => state.timers.sectionTimeSpent;

// Time spent for a specific section
export const selectTimeSpentBySection = (sectionId: string) => 
  (state: TestRunnerState) => state.timers.sectionTimeSpent[sectionId] || 0;
