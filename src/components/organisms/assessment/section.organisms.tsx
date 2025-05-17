import { useEffect, useState } from 'react';
import { useDeleteTestSectionMutation } from 'store/slices/test-section.slice';
import toast from 'react-hot-toast';
import { SectionList } from './section/section-list.organism';
import { SectionForm } from './section/section-form.organism';
import { TestSectionsSummary } from './section/test-sections-summary';
import { Test, TestSection } from 'models';
import { VTabsRef } from '../tabs/v-tab.organism';
import AssessmentNavigation from './navigation/assessment-navigation.organism';

interface AssessmentSectionProps {
  tabRef: React.RefObject<VTabsRef>;
  test: Test;
  onComplete: OnCompleteHandler<Test>;
}

function AssessmentSection({ tabRef, test, onComplete }: AssessmentSectionProps) {
  const { id: testId } = test ?? {};
  const [actionMode, setActionMode] = useState<ActionMode>('view');
  const [selectedSection, setSelectedSection] = useState<TestSection>();
  const [sections, setSections] = useState<TestSection[]>([]);
  const [deleteTestSection] = useDeleteTestSectionMutation();

  console.log(test);

  useEffect(() => {
    if (test.testSections) {
      setSections(test.testSections);
    }
  }, [test]);

  const triggerAddSection = () => {
    setActionMode('create');
  };

  const triggerEditSection = (section: TestSection) => {
    setSelectedSection(section);
    setActionMode('edit');
  };

  const handleDeleteSection = async (section: TestSection) => {
    try {
      await deleteTestSection({ testId, sectionId: section.id! }).unwrap();

      // Correct way to remove the deleted section
      const updatedTestDetails = {
        ...test,
        testSections: (test?.testSections ?? []).filter((s) => s.id !== section.id),
      };

      onComplete(updatedTestDetails,{skipNavigation: true});
    } catch (error) {
      console.error('Delete section error:', error);
      toast.error('Failed to delete section. Please try again.');
    }
  };

  const handleSectionAdded = async (section: TestSection) => {
    setSections((prev) => {
      if (actionMode === 'edit') {
        // For edit mode, replace the existing section
        return prev.map((s) => (s.id === section.id ? section : s));
      } else {
        // For create mode, add the new section
        return [...prev, section];
      }
    });

    // Prepare the updated test details
    setActionMode('view');
    const updatedTestDetails = {
      ...test,
      testSections:
        actionMode === 'edit'
          ? (test?.testSections ?? []).map((s) => (s.id === section.id ? section : s))
          : [...(test?.testSections ?? []), section],
    };
    onComplete(updatedTestDetails, {skipNavigation: true});
  };

  const handleProceed = (isExit?: boolean) => {
    onComplete(test, { shouldExit: isExit });
    tabRef.current?.nextTab();
  };

  return (
    <div className="flex flex-col gap-4">
      {actionMode === 'view' ? (
        <>
          {sections?.length > 0 && (
            <TestSectionsSummary sections={sections} cutOffPercentage={test.cutoffScorePercentage} />
          )}

          <SectionList
            testSections={sections}
            onAddSection={triggerAddSection}
            onEditSection={triggerEditSection}
            onDeleteSection={handleDeleteSection}
          />
        </>
      ) : (
        <SectionForm
          testId={test!.id}
          testSection={selectedSection}
          onCancel={() => setActionMode('view')}
          onComplete={handleSectionAdded}
        />
      )}

      {actionMode === 'view' && (
        <AssessmentNavigation
          isSaveDisabled={sections.length === 0}
          onPrevious={() => tabRef.current?.prevTab()}
          onSaveProceed={() => handleProceed()}
          onSaveExit={() => handleProceed(true)}
        />
      )}
    </div>
  );
}

export { AssessmentSection };
