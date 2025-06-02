// providers/TestRunnerProvider.tsx
import { Provider as ReduxProvider } from 'react-redux';
import { testRunnerStore } from '../store/test-runner.store';
import { ReactNode } from 'react';

interface TestRunnerProviderProps {
  children: ReactNode;
}

export function TestRunnerProvider({ children }: TestRunnerProviderProps) {
  return <ReduxProvider store={testRunnerStore}>{children}</ReduxProvider>;
}