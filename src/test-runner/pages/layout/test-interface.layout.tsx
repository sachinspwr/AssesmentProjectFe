import { VLoader } from '@components/molecules';
import { Outlet } from 'react-router-dom';
import { PartTestSummary } from 'test-runner/components/overview';
import { selectTestDetails, useTestRunnerSelector } from 'test-runner/store';

export default function TestInterfaceLayout() {
  const testDetails = useTestRunnerSelector(selectTestDetails);
  const isLoading = false;

  if (!testDetails) return null;

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Fixed Header */}
      <header className="!fixed top-0 z-10 bg-theme-highlight px-14 py-4 !pb-10 !w-full">
        <PartTestSummary
          testDetails={testDetails}
          showDescription={false}
          showProgress ={true}
          className="!bg-theme-highlight"
        />
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto pt-[110px] px-14 pb-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <VLoader size="lg" />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
