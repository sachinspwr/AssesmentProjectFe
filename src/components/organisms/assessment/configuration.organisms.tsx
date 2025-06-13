import { VToggleButtonGroup } from '@components/molecules/button-group/v-button-group.mol';
import { useEffect, useState } from 'react';
import { ConfigureInstructions, ConfigureRegistrationFields, ConfigureSettings } from './configuration';
import toast from 'react-hot-toast';
import { Test, TestInstructionOption, TestSettingOption } from 'models';
import { TestRegistrationFieldOption } from 'models/test/registration-field-opition';
import { VTabsRef } from '../tabs/v-tab.organism';
import AssessmentNavigation from './navigation/assessment-navigation.organism';
import { useUpdateTestConfigMutation } from 'store/slices/test-assessment.slice';
import { VButton } from '@components/atoms';

export type AssessmentConfigurationProps = {
  tabRef?: React.RefObject<VTabsRef>;
  test: Test;
  onComplete: OnCompleteHandler<Test>;
  viewMode?: 'review' | 'content';
};

function AssessmentConfiguration({ tabRef, test, onComplete, viewMode }: AssessmentConfigurationProps) {
  const [activeTab, setActiveTab] = useState('default');

  const [selectedTestInstructions, setSelectedTestInstructions] = useState<TestInstructionOption[]>([]);
  const [selectedTestSettings, setSelectedTestSettings] = useState<TestSettingOption[]>([]);
  const [selectedRegistrationFields, setSelectedRegistrationFields] = useState<TestRegistrationFieldOption[]>([]);

  const [updateTestConfig, { isLoading: isUpdatingConfig }] = useUpdateTestConfigMutation();

  useEffect(() => {
    if (test) {
      const { testInstructions, testRegistrationFields, testSettings } = test;
      setSelectedRegistrationFields(testRegistrationFields ?? []);
      setSelectedTestInstructions(testInstructions ?? []);
      setSelectedTestSettings(testSettings ?? []);
    }
  }, [test]);

  const handleSave = async (isExit?: boolean, isPublish?: boolean) => {
    const testId = test?.id;
    if (!testId) return;

    try {
      await updateTestConfig({
        testId,
        configData: {
          testInstructionsIds: selectedTestInstructions.map((i) => i.id),
          testSettingsIds: selectedTestSettings.map((s) => s.id),
          testRegistrationFieldIds: selectedRegistrationFields.map((f) => f.id),
        },
      }).unwrap();

      const updatedTest = {
        ...test,
        testRegistrationFields: selectedRegistrationFields,
        testInstructions: selectedTestInstructions,
        testSettings: selectedTestSettings,
      };

      toast.success('Configuration updated successfully');
      onComplete(updatedTest, { shouldExit: !!isExit, shouldPublish: !!isPublish });
    } catch (error) {
      console.error('Error saving configuration:', error);
      toast.error('Something went wrong while saving');
    }
  };

  return (
    <div className="w-full relative">
      <div className="w-[450px] absolute right-0 top-0 flex col-span-3 flex-col gap-2">
        <VToggleButtonGroup
          options={['Default', 'Advance Configuration']}
          variant="primary"
          onChange={(selected) => {
            if (typeof selected === 'string') {
              setActiveTab(selected.toLowerCase().replace(/\s+/g, '-'));
            }
          }}
        />
      </div>

      <div className="mt-6">
        {activeTab === 'default' ? (
          <>
            <ConfigureRegistrationFields
              selectedFields={selectedRegistrationFields}
              setSelectedFields={setSelectedRegistrationFields}
            />
            <ConfigureInstructions
              selectedInstructions={selectedTestInstructions}
              setSelectedInstructions={setSelectedTestInstructions}
              testId={test?.id ?? ''}
            />
          </>
        ) : (
          <ConfigureSettings
            testId={test?.id ?? ''}
            selectedSettings={selectedTestSettings}
            setSelectedSettings={setSelectedTestSettings}
          />
        )}
      </div>

      {viewMode === 'content' ? (
        <AssessmentNavigation
          isLoading={isUpdatingConfig}
          onPrevious={() => tabRef?.current?.prevTab()}
          onSaveExit={() => handleSave(true)}
          onSaveProceed={() => handleSave(true, true)}
          saveProceedLabel={test?.isPublic ? 'Save & Mark for Review' : 'Save & Publish'}
        />
      ) : (
        <VButton variant="link" size="md" className="!w-48 mt-5" onClick={() => handleSave()}>
          Save Configurations
        </VButton>
      )}
    </div>
  );
}

export default AssessmentConfiguration;
