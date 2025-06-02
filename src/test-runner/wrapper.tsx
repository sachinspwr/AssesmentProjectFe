// TestRunnerWrapper.tsx
import { Outlet } from 'react-router-dom';
import { TestRunnerProvider } from './providers';

export default function TestRunnerWrapper() {
  return (
    <TestRunnerProvider>
      <Outlet />
    </TestRunnerProvider>
  );
}
