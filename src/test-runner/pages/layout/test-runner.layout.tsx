// src/pages/test-runner/layout/test-runner.layout.tsx
import { Outlet } from 'react-router-dom';
import { VLoader } from '@components/molecules';
// import { useTestRunnerSelector } from 'test-runner/store';

export function TestRunnerLayout() {
  const isLoading = false;
  //useTestRunnerSelector(state => state.isLoading);
  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <VLoader  />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}