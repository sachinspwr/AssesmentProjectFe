import React, { useEffect, useMemo, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

import { VICon, VInput } from '@components/atoms';
import { VCheckbox } from '@components/molecules/checkbox/v-checkbox.mol';
import { VLoader } from '@components/molecules/loader/v-loader.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

import { splitAndCapitalize } from '@utils/functions';
import { TestSettingOption } from 'models';
import { useFetchTestSettingsOptionQuery } from 'store/slices/test-setting-option.slice';

interface AdvancedSettingsProps {
  testId: string;
  selectedSettings: TestSettingOption[];
  setSelectedSettings: (selected: TestSettingOption[]) => void;
  onLoadingPrereq?: (status: boolean) => void;
}

function ConfigureSettings({
  testId,
  selectedSettings,
  setSelectedSettings,
  onLoadingPrereq,
}: AdvancedSettingsProps) {
  const { data: testSettingsOption, isLoading } = useFetchTestSettingsOptionQuery({ testId });

  const [applyRecommended, setApplyRecommended] = useState(false);
  const [previousSelection, setPreviousSelection] = useState<TestSettingOption[]>([]);

  const recommendedSettingIds = useMemo(() => {
    if (!Array.isArray(testSettingsOption)) return [];
    return testSettingsOption
      .filter((setting) => setting?.isRecommended)
      .map((setting) => setting.id);
  }, [testSettingsOption]);

  const isRecommended = (setting: TestSettingOption): boolean => {
    return setting?.isRecommended ?? false;
  };

  const groupedSettings = useMemo(() => {
    if (!Array.isArray(testSettingsOption)) return {};

    return testSettingsOption.reduce((acc: Record<string, TestSettingOption[]>, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = [];
      }
      acc[setting.category].push(setting as TestSettingOption);
      return acc;
    }, {} as Record<string, TestSettingOption[]>);
  }, [testSettingsOption]);

  const handleApplyRecommendedChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      setPreviousSelection(selectedSettings);
      const recommended = testSettingsOption?.filter((setting) =>
        recommendedSettingIds.includes(setting.id)
      ) ?? [];
      setSelectedSettings(recommended as TestSettingOption[]);
    } else {
      setSelectedSettings(previousSelection);
    }

    setApplyRecommended(isChecked);
  };

  const handleCheckboxChange = (setting: TestSettingOption) => {
    const isAlreadySelected = selectedSettings.some((v) => v.id === setting.id);
    const newSelection = isAlreadySelected
      ? selectedSettings.filter((v) => v.id !== setting.id)
      : [...selectedSettings, setting];

    setSelectedSettings(newSelection);

    if (applyRecommended && recommendedSettingIds.includes(setting.id)) {
      const stillRecommendedSelected = newSelection.some((selected) =>
        recommendedSettingIds.includes(selected.id)
      );

      if (!stillRecommendedSelected) {
        setApplyRecommended(false);
      }
    }
  };

  useEffect(() => {
    onLoadingPrereq?.(isLoading);
  }, [isLoading, onLoadingPrereq]);

  return (
    <div>
      <div className="flex flex-col items-start gap-3">
        <VTypography as="h3" className="font-semibold">
          Advanced Settings
        </VTypography>

        <VTypography as="p">
          Adjust test settings to match your requirements
        </VTypography>

        {recommendedSettingIds.length > 0 && (
          <VCheckbox
            name="apply-recommended-settings"
            label="Apply recommended settings"
            value=""
            checked={applyRecommended}
            onChange={(_, e) => handleApplyRecommendedChange(e!)}
            wrapperClasses="ml-4 mt-2"
          />
        )}
      </div>

      <div className="mt-4 my-5 grid gap-4">
        {isLoading ? (
          <VLoader size="md" />
        ) : (
          <div role="group" aria-labelledby="advanced-settings-group" className="space-y-8 ml-4">
            {Object.entries(groupedSettings).map(([category, items]) => (
              <div key={category}>
                <VTypography as="h6" className="font-medium !text-theme-secondary">
                  {splitAndCapitalize(category)}
                </VTypography>

                <div className="ml-2 mt-2 space-y-3">
                  {items.map((setting) => (
                    <div key={setting.id} className="flex items-center">
                      <VCheckbox
                        name="advanced-settings"
                        label={
                          <div className="flex items-center gap-1">
                            {setting.description}
                            {isRecommended(setting) && (
                              <VICon
                                title="recommended"
                                icon={FaCheckCircle}
                                size={10}
                                className="mt-0.5 text-theme-positive"
                              />
                            )}
                          </div>
                        }
                        value={setting.id}
                        checked={selectedSettings.some((v) => v.id === setting.id)}
                        onChange={() => handleCheckboxChange(setting)}
                        wrapperClasses="flex items-center"
                      />

                      {setting.valueType === 'number' && (
                        <VInput
                          name={setting.id}
                          value={setting.value.toString()}
                          className="!w-2/12 !py-0 !px-2"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { ConfigureSettings };
