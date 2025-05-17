import { VRadioButtonGroup } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import InstructionsList from 'apps/admin-console/components/test-configurations/instructions-list.component';
import RegistrationFieldsList from 'apps/admin-console/components/test-configurations/registration-fields-list.component';
import SettingsList from 'apps/admin-console/components/test-configurations/settings-list.component';
import { useState } from 'react';
import { useFetchRegistrationFieldsQuery } from 'store/slices/registration-fields.slice';
import { useFetchTestInstructionsOptionQuery } from 'store/slices/test-instruction-option.slice';
import { useFetchTestSettingsOptionQuery } from 'store/slices/test-setting-option.slice';

type ConfigTabType = 'instructions' | 'registration_fields' | 'settings';

const CONFIG_TAB_OPTIONS = [
  { label: 'Instuctions', value: 'instructions' },
  { label: 'Registration Fields', value: 'registration_fields' },
  { label: 'Settings', value: 'settings' },
];

function TestConfigurations() {
  const testId = '';
  const [activeTab, setActiveTab] = useState<ConfigTabType>('instructions');
  const { data: fields = [], isLoading: isFieldsLoading, refetch: refetchFields } = useFetchRegistrationFieldsQuery();
  const {
    data: instructions = [],
    isLoading: isInstructionsLoading,
    refetch: refetchInstructions,
  } = useFetchTestInstructionsOptionQuery(testId);
  const {
    data: settings = [],
    isLoading: isSettingsLoading,
    refetch: refetchSettings,
  } = useFetchTestSettingsOptionQuery(testId);

  const handleTabChange = (selectedValue: string) => {
    setActiveTab(selectedValue as ConfigTabType);
  };

  function renderActiveContent() {
    if (activeTab === 'instructions') {
      return (
        <div>
          <InstructionsList
            data={instructions}
            loading={isInstructionsLoading}
            onDeleteSuccess={() => {
              refetchInstructions();
            }}
            onAddSuccess={() => refetchInstructions()}
          />
        </div>
      );
    }
    if (activeTab === 'registration_fields') {
      return (
        <div>
          <RegistrationFieldsList
            data={fields}
            loading={isFieldsLoading}
            onDeleteSuccess={() => {
              refetchFields();
            }}
            onAddSuccess={() => refetchFields()}
          />
        </div>
      );
    }
    if (activeTab === 'settings') {
      return (
        <div>
          <SettingsList
            data={settings}
            loading={isSettingsLoading}
            onDeleteSuccess={() => {
              refetchSettings();
            }}
            onAddSuccess={() => refetchSettings()}
          />
        </div>
      );
    }
    return <div>Something</div>;
  }

  return (
    <>
      <VTypography as="h3">Test Configurations</VTypography>
      <div className="my-5 flex justify-between items-center border-b-2 py-4 w-full">
        <VRadioButtonGroup
          name="support-content-tabs"
          options={CONFIG_TAB_OPTIONS}
          defaultValue="instructions"
          direction="horizontal"
          onChange={handleTabChange}
          wrapperClasses="!w-fit"
          className="flex align-middle"
        />
      </div>
      {renderActiveContent()}
    </>
  );
}

export default TestConfigurations;
