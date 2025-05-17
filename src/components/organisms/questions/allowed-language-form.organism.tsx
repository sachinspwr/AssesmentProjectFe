import { VChip } from '@components/atoms';
import { VLabelledDropdown } from '@components/molecules/index';
import React, { useState } from 'react';

type AllowedLanguagesFormProps = {
  options: string[]; // Available languages
  onChange: (selected: string[]) => void;
};

export default function AllowedLanguagesForm({ options, onChange }: AllowedLanguagesFormProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const addLanguage = (selectedToAdd: string) => {
    if (selectedToAdd && !selectedLanguages.includes(selectedToAdd)) {
      const updated = [...selectedLanguages, selectedToAdd];
      setSelectedLanguages(updated);
      onChange(updated);
    }
  };

  const removeLanguage = (lang: string) => {
    const updated = selectedLanguages.filter((l) => l !== lang);
    setSelectedLanguages(updated);
    onChange(updated);
  };

  const availableOptions = options.filter((opt) => !selectedLanguages.includes(opt));

  return (
    <div className="space-y-4">
  <div className="grid grid-cols-12 items-end gap-6">
    <div className="col-span-4">
      <VLabelledDropdown
        name="language"
        label="Select Language"
        onChange={(val: string | string[]) => addLanguage(val as string)}
        options={availableOptions.map((x) => ({ label: x, value: x }))}
        placeholder="Choose a language"
      />
    </div>
  </div>

  {selectedLanguages.length > 0 && (
    <div className="flex flex-wrap gap-2">
      {selectedLanguages.map((lang) => (
        <VChip
          key={lang}
          id={lang}
          type="primary"
          label={lang}
          onRemove={() => removeLanguage(lang)}
        />
      ))}
    </div>
  )}
</div>

  );
}
