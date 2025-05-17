import { VTab, VTabs, VTabsRef } from '@components/organisms';
import { useRef } from 'react';
import { useAppSelector } from 'store/store';
import TestHeader from 'test-runner/components/test-header.component';
import TestSectionSummary from 'test-runner/components/test-section-summary.component';

const TestInterfacePage = () => {
  const testDetails = useAppSelector((state) => state.testRunner.testDetails);
  const vTabsRef = useRef<VTabsRef>(null);
  const testSections = testDetails?.testSections;

  let tabs = testSections?.map((section) => {
    return {
      name: section?.id,
      label: section?.name,
      content: (
        <>
          <TestSectionSummary key={section?.id} sectionId={section?.id} />
        </>
      ),
    };
  });

  return (
    <>
      {/* {isLoading ? (
        <VLoader position="global" />
      ) : ( */}
      <div className="py-5 px-16">
        <TestHeader />
        <div className="mt-5 bg-white">
          <VTabs ref={vTabsRef} tabs={tabs as VTab[]} />
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default TestInterfacePage;
